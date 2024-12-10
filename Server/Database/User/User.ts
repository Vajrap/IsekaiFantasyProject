// Database Entity

import { v4 as uuidv4 } from 'uuid';

export class DBUser {
    username: string;
    password: string;
    userID: string;
    characterID: string;

    constructor(userID: string, username: string, password: string, characterID?: string) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.characterID = characterID || '';
    }
}