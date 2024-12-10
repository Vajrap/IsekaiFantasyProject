import { createTableIfNotExists } from "../Seeding";

export async function createGameTimeTableIfNotExists() {
    const tableName = 'GameTime';
    const tableStructure = `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dayPassed INTEGER NOT NULL,
        day INTEGER NOT NULL,
        hour INTEGER NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL
    `;

    // You can pass an empty array for now since there's no seed data
    await createTableIfNotExists(tableName, tableStructure, [], 'id');
}