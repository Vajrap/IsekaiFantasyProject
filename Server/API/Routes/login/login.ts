import { UserID, UserDBRow } from '../../../Authenticate/UserID';
import { DB, db } from '../../../Database';

namespace Constant {
    export const status_error = 'error';
    export const status_success = 'success';
    export const message_user_does_not_exist = 'ชื่อผู้ใช้งานนี้ไม่มีอยู่ในระบบ กรุณาลองใหม่อีกครั้ง';
    export const message_wrong_password = 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
}

interface UserDoesNotExistResponse {
    status: typeof Constant.status_error;
    message: typeof Constant.message_user_does_not_exist;
}

interface WrongPasswordResponse {
    status: typeof Constant.status_error;
    message: typeof Constant.message_wrong_password;
}

interface LoggedInWithCharacterResponse {
    status: typeof Constant.status_success;
    message: 'Logged in with character';
    characterID: string;
    userID: string;
}

interface LoggedInWithoutCharacterResponse {
    status: typeof Constant.status_success;
    message: 'Logged in without character';
}

class LoginAuthenticator {
    db: DB;
    constructor(){
        this.db = db;
    }

    async login(username: string, password: string) {
        const existingUser = await this.findExistingUser(username);
        if (!existingUser) {
            return { 
                status: Constant.status_error, 
                message: Constant.message_user_does_not_exist 
            } as UserDoesNotExistResponse;
        }

        const isPasswordCorrect = await existingUser.validateInputPassword(password);

        if (!isPasswordCorrect) {
            return { 
                status: Constant.status_error, 
                message: Constant.message_wrong_password 
            } as WrongPasswordResponse;
        }

        const characterID = existingUser.characterID;
        if (!characterID) {
            console.log(existingUser);
            return { 
                status: Constant.status_success, 
                message: 'Logged in without character',
                userID: existingUser.userID
            } as LoggedInWithoutCharacterResponse;
        } else if (characterID) {
            return { 
                status: Constant.status_success, 
                message: 'Logged in with character', 
                characterID: characterID,
                userID: existingUser.userID
            } as LoggedInWithCharacterResponse;
        }
    }

    private async findExistingUser(username: string): Promise<UserID | undefined> {
        try {
            const row: UserDBRow = await this.db.read('users', 'username', username);
            if (!row) {
                return undefined;
            }
            return UserID.createFromDBRow(row);
        } catch (err) {
            console.error('Error finding existing user.');
            throw err;
        }
    }
}

export const loginAuthenticator = new LoginAuthenticator();