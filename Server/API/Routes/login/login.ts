import { UserID, UserDBRow } from '../../../Authenticate/UserID';
import { db } from '../../../Database';
import { LoginResponse, LoginResponseStatus} from '../../../../Common/RequestResponse/login'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Character } from '../../../Entities/Character/Character';

export async function loginHandler(
    username: string,
    password: string
): Promise<LoginResponse> {
    console.log(`Login Handler called`)
    const existingUser = await findExistingUser(username);
    if (!existingUser) { 
        console.log('User not found');
        return { 
            status: LoginResponseStatus.Failed, 
            message: "ไม่มีผู้ใช้นี้ในระบบ" 
        }; 
    }

    if (!await isPasswordCorrect(password, existingUser.password)) {
        return {
            status: LoginResponseStatus.Failed,
            message: "รหัสผ่านไม่ถูกต้อง"
        };
    }

    return loginMethod(existingUser);
}

export async function autoLoginHandler(token: string): Promise<LoginResponse> {
    const existingUser = await findExistingUserByToken(token);

    // Silently fail if the user is not found, still this is suspicious, since there shouldn't be a token send to the server in the first place.
    if (!existingUser || existingUser === undefined) {
        return {
            status: LoginResponseStatus.Failed,
            message: "ไม่พบผู้ใช้นี้ในระบบ"
        };
    }

    return loginMethod(existingUser);
}

async function loginMethod(existingUser: UserID) {
    let tokenResult = await generateToken(existingUser);
    const playerCharacter = await db.read<Character>('playerCharacters', 'id', existingUser.userID);

    let status = playerCharacter ? LoginResponseStatus.LoggedInWithCharacter : LoginResponseStatus.LoggedInWithNoCharacter;

    return {
        status: status,
        message: "เข้าสู่ระบบสำเร็จ",
        userID: existingUser.userID,
        token: tokenResult.token,
        tokenExpiredAt: tokenResult.tokenExpiresAt.toISOString()
    }
}

async function findExistingUser(username: string): Promise<UserID | null> {
    try {
        return await db.read<UserID>('users', 'username', username);
    } catch (err) {
        console.error(`Error finding user: ${username}`, err);
        throw err;
    }
}

async function findExistingUserByToken(token: string): Promise<UserID | null> {
    try {
        return await db.read<UserID>('users', 'token', token);
    } catch (err) {
        console.error(`Error finding user by token: ${token}`, err);
        throw err;
    }
}

async function isPasswordCorrect(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

interface TokenResult {
    token: string;
    tokenExpiresAt: Date;
}

async function generateToken(existingUser: UserID): Promise<TokenResult> {
    // Check if the user's token is still valid, of so, return it
    if (existingUser.token && existingUser.tokenExpiresAt) {
        const tokenExpiresAt = new Date(existingUser.tokenExpiresAt);
        if (tokenExpiresAt > new Date()) {
            return {
                token: existingUser.token,
                tokenExpiresAt: existingUser.tokenExpiresAt
            };
        }
    }

    // Token is expired or undefined; generate a new one
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week
    // ! This SaveToken is not used during production since it'll cause the live server's HTML to refresh every time data is update and cause wrong Front End Scenario/
    // await saveTokenIntoExistingUser({ token, tokenExpiresAt }, existingUser?.userID ?? '');
    
    return { token, tokenExpiresAt };
}

async function saveTokenIntoExistingUser(tokenResult: TokenResult, userID: string) {
    try {
        await db.writeOver(
            {
                tableName: 'users',
                primaryKeyColumnName: 'userID',
                primaryKeyValue: userID
            }, 
            [
                { dataKey: 'token', value: tokenResult.token },
                { dataKey: 'tokenExpiresAt', value: tokenResult.tokenExpiresAt.toISOString() }
            ]
        )
    } catch (err) {
        console.error('Error saving token into existing user.');
        throw err;
    }
}
