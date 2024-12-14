import { UserID, UserDBRow } from '../../../Authenticate/UserID';
import { db } from '../../../Database';
import { RegisterReponseStatus, RegisterResponse  } from '../../../../Common/RequestResponse/register';
import bcrypt from "bcrypt";

export async function registerHandler(
    username: string,
    password: string
): Promise<RegisterResponse> {
    const existingUser = await findExistingUser(username);
    if (existingUser) {
        return { 
            status: RegisterReponseStatus.Failed, 
            message: "ผู้ใช้นี้มีอยู่แล้ว" 
        }; 
    }

    console.log(username, password)
    const {isValid, response} = await validateUser(username, password);

    if (!isValid) {
        return response || { status: RegisterReponseStatus.Failed, message: 'ข้อผิดพลาดที่ไม่รู้จัก' };
    } else {
        await registerUser(username, password);
        return { status: RegisterReponseStatus.Registered, message: 'ลงทะเบียนสำเร็จ' };
    }
}

type ValidationResult = { isValid: boolean, response?: RegisterResponse };

async function validateUser(username: string, password: string): Promise<ValidationResult> {
    // ผู้ใช้มีอยู่แล้ว
    if (await validateIfUserExists(username)) {
        return { isValid: false, response: { status: RegisterReponseStatus.Failed, message: 'ผู้ใช้นี้มีอยู่แล้ว' } };
    }
    // ชื่อผู้ใช้อย่างน้อย 5 ตัวอักษร
    if (username.length < 5) {
        return { isValid: false, response: { status: RegisterReponseStatus.Failed, message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 5 ตัวอักษร' } };
    }
    // รหัสผ่านอย่างน้อย 8 ตัวอักษร
    if (password.length < 8) {
        return { isValid: false, response: { status: RegisterReponseStatus.Failed, message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' } };
    }
    // อย่างน้อย 1 ตัวเลข
    if (password.match(/[0-9]/) === null) {
        return { isValid: false, response: { status: RegisterReponseStatus.Failed, message: 'รหัสผ่านต้องมีอย่างน้อย 1 ตัวเลข' } };
    }
    // อย่างน้อย 1 ตัวอักษรพิมพ์เล็ก
    if (password.match(/[a-z]/) === null) {
        return { isValid: false, response: { status: RegisterReponseStatus.Failed, message: 'รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษรพิมพ์เล็ก' } };
    }
    // อย่างน้อย 1 ตัวอักษรพิมพ์ใหญ่
    if (password.match(/[A-Z]/) === null) {
        return { isValid: false, response: { status: RegisterReponseStatus.Failed, message: 'รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษรพิมพ์ใหญ่' } };
    }

    return { isValid: true };
}

async function findExistingUser(username: string): Promise<UserID | null> {
    try {
        return await db.read<UserID>('users', 'username', username);
    } catch (err) {
        console.error(`Error finding user: ${username}`, err);
        throw err;
    }
}

async function validateIfUserExists(username: string) {
    try {
        const row = await db.read('users', 'username', username);
        return !!row; // true if row exists, false otherwise
    } catch (err) {
        throw err;
    }
}

async function registerUser(username: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserID(username, password);
    await db.writeNew(
        {
            tableName:'users', 
            primaryKeyColumnName: 'username', 
            primaryKeyValue: user.username
            }, 
        [
            { dataKey: 'password', value: hashPassword }, 
            { dataKey: 'userID', value: user.userID }
        ]
    );
}
