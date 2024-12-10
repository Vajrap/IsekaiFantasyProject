import { UserID,  } from '../../../Authenticate/UserID';
import { DB, db } from '../../../Database';
import { RegisterRequest, RegisterReponseStatus, RegisterResponse  } from '../../../../Common/RequestResponse/register';
import { Request } from 'express';

export async function registerHander(req: Request): Promise<RegisterResponse> {
    const request = req.body as RegisterRequest;

    let [username, password] = [request.username, request.password];

    const [validateSuccess, response] = await validateUser(username, password);

    if (!validateSuccess) {
        return response || { status: RegisterReponseStatus.Failed, message: 'Unknown error' };
    } else {
        await registerUser(username, password);
        return { status: RegisterReponseStatus.Registered, message: 'User registered' };
    }
}

async function validateUser(username: string, password: string): Promise<[boolean, RegisterResponse|null]> {
    // user exists
    if (await validateIfUserExists(username)) {
        return [false, { status: RegisterReponseStatus.Failed, message: 'User already exists' }];
    }
    // username at least 5 characters
    if (username.length < 5) {
        return [false, { status: RegisterReponseStatus.Failed, message: 'Username must be at least 5 characters long' }];
    }
    // password at least 8 characters
    if (password.length < 8) {
        return [false, { status: RegisterReponseStatus.Failed, message: 'Password must be at least 8 characters long' }];
    }
    // at least 1 number
    if (password.match(/[0-9]/) === null) {
        return [false, { status: RegisterReponseStatus.Failed, message: 'Password must contain at least 1 number' }];
    }
    // at least 1 lowercase letter
    if (password.match(/[a-z]/) === null) {
        return [false, { status: RegisterReponseStatus.Failed, message: 'Password must contain at least 1 lowercase letter' }];
    }
    // at least 1 uppercase letter
    if (password.match(/[A-Z]/) === null) {
        return [false, { status: RegisterReponseStatus.Failed, message: 'Password must contain at least 1 uppercase letter' }];
    }

    return [true, null];
}

async function validateIfUserExists(username: string) {
    try {
        const row = await db.read('users', 'username', username);
        return !!row; // true if row exists, false otherwise
    } catch (err) {
        console.error('Error validating if user exists');
        throw err;
    }
}

async function registerUser(username: string, password: string) {
    const user = new UserID(username, password);
    console.log(user);
    await db.writeNew(
        {
            tableName:'users', 
            primaryKeyColumnName: 'username', 
            primaryKeyValue: user.username
            }, 
        [
            { dataKey: 'password', value: password }, 
            { dataKey: 'userID', value: user.userID }
        ]
    );
}
