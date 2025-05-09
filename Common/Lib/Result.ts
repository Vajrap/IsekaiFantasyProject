export type Result<T> = 
    | { success: true; data: T }
    | { success: false; error: { status: string; message: string } };

export function success<T>(data: T): Result<T> {
    return { success: true, data };
}
 
// Failure is specifically used for errors. If, let's say user login with wrong username or password, it should fall into success block not failure block.
export function failure(status: string, message: string): Result<never> {
    return { 
        success: false, 
        error: { status, message } 
    };
}

export function unwrap<T>(result: Result<T>): T {
    if (result.success) {
        return result.data;
    } else {
        throw new Error(result.error.message);
    }
}