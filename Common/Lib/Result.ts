export type Result<T> = 
    | { success: true; data: T }
    | { success: false; error: { status: string; message: string } };


export function success<T>(data: T): Result<T> {
    return { success: true, data };
}
    
export function failure(status: string, message: string): Result<never> {
    return { 
        success: false, 
        error: { status, message } 
    };
}