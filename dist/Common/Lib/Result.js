export function success(data) {
    return { success: true, data };
}
// Failure is specifically used for errors. If, let's say user login with wrong username or password, it should fall into success block not failure block.
export function failure(status, message) {
    return {
        success: false,
        error: { status, message }
    };
}
export function unwrap(result) {
    if (result.success) {
        return result.data;
    }
    else {
        throw new Error(result.error.message);
    }
}
