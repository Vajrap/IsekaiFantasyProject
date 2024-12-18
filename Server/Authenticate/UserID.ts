import { v4 as uuidv4 } from 'uuid';

interface LoggedInWithCharacterResponse {
    status: 'success';
    message: 'Logged in with character';
    characterID: string; // ID of the character associated with the user
    userID: string; // ID of the user
}

interface LoggedInWithoutCharacterResponse {
    status: 'success';
    message: 'Logged in without character';
}

// Interface for Database Row
export interface UserDBRow {
    username: string;
    password: string;
    userID: string;
    characterID: string;
}

export class UserID {
    username: string;
    password: string;
    userID: string
    characterID: string = ""
    token: string = ""
    tokenExpiresAt: Date = new Date()

    constructor(username: string, password: string) {
        this.userID = uuidv4();
        this.username = username;
        this.password = password;
    }
}


