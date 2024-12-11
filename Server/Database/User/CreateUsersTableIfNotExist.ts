import { createTableIfNotExists } from "../Seeding";

export async function createUsersTableIfNotExist() {
    const tableName = 'users';
    const tableStructure = `
        username TEXT PRIMARY KEY,
        password TEXT,
        userID TEXT,
        characterID TEXT,
        token TEXT,
        tokenExpiredAt TIMESTAMP
    `;

    await createTableIfNotExists(tableName, tableStructure, [], 'username', false);
}
