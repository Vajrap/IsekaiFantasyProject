export function success(data) {
    return { success: true, data };
}
export function failure(status, message) {
    return {
        success: false,
        error: { status, message }
    };
}
