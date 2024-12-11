export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    status: LoginResponseStatus;
    message: string;
    userID?: string;
    characterID?: string;
    token?: string;
    tokenExpiredAt?: string;
}

export enum LoginResponseStatus {
    Failed = 'ล้มเหลว',
    LoggedInWithNoCharacter = 'เข้าสู่ระบบสร้างตัวละคร',
    LoggedInWithCharacter = 'เข้าสู่ระบบสำเร็จ'
}

export interface AutoLoginRequest {
    token: string;
}