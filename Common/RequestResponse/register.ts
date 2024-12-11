export interface RegisterRequest {
    username: string;
    password: string;
}

export interface RegisterResponse {
    status: RegisterReponseStatus;
    message: string;
}

export enum RegisterReponseStatus {
    Failed = 'ล้มเหลว',
    Registered = 'ลงทะเบียนสำเร็จ'
}