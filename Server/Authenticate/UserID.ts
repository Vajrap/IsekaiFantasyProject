import { PlayerCharacter } from "../Entities/Character/Character";
import { game } from "../server";
import { Database } from "sqlite3";
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
    
    async validateInputPassword(inputPassword: string): Promise<boolean> {
        return inputPassword === this.password;
    }

    async getCharacterFromCharacterID(): Promise<PlayerCharacter | undefined> {
        let character = game.characterManager.getPlayerCharacterByCharacterID(this.characterID);
        if (character) {
            return character;
        } else {
            return undefined;
        }
    }

    static createFromDBRow(row: UserDBRow): UserID {
        const user = new UserID(row.username, row.password);
        user.userID = row.userID;
        user.characterID = row.characterID;
        return user;
    }

    insertIntoDB(db: Database): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO users (id, username, password, userID, characterID) VALUES (?, ?, ?, ?)",
                [this.username, this.password, this.userID, this.characterID],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
}


