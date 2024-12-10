import { v4 as uuidv4 } from 'uuid';

const sessions = new Map();

export function generateSessionToken(userId: string) {
    const sessionToken = uuidv4();
    sessions.set(sessionToken, userId);
    return sessionToken;
}

export function validateSessionToken(sessionToken: string) {
    return sessions.has(sessionToken);
}

export function getUserIdFromSessionToken(sessionToken: string) {
    return sessions.get(sessionToken);
}

export function invalidateSessionToken(sessionToken: string) {
    sessions.delete(sessionToken);
}
