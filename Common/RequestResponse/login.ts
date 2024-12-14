export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    status: LoginResponseStatus;
    message: string;
    userID?: string;
    token?: string;
    tokenExpiredAt?: string;
}

export enum LoginResponseStatus {
    Failed = 'Failed',
    LoggedInWithNoCharacter = 'LoggedInWithNoCharacter',
    LoggedInWithCharacter = 'LoggedInWithCharacter'
}

export interface AutoLoginRequest {
    token: string;
}