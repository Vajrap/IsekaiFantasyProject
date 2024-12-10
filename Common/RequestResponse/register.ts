export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface RegisterResponse {
    status: RegisterReponseStatus;
    message: string;
}

export enum RegisterReponseStatus {
    Failed = 'failed',
    Registered = 'registered'
}