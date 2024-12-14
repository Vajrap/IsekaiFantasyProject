import { createTableIfNotExists } from "../Seeding";

export async function createGameTimeTableIfNotExists() {
    const tableName = 'GameTime';
    const tableStructure = `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dayPassed INTEGER NOT NULL,
        gameDateDay INTEGER NOT NULL,
        gameDateHour INTEGER NOT NULL,
        gameDateMonth INTEGER NOT NULL,
        gameDateYear INTEGER NOT NULL
    `;

    // You can pass an empty array for now since there's no seed data
    await createTableIfNotExists(tableName, tableStructure, [], 'id');
}


// const { dayPassed, gameDateDay, gameDateHour, gameDateMonth, gameDateYear } = result;
