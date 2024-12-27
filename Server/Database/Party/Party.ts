import { createTableIfNotExists } from "../Seeding";

export async function createPartyTableIfNotExist() {
    const tableName = 'parties';
    const tableStructure = `
        partyID TEXT PRIMARY KEY,
        character_1_id TEXT DEFAULT "none",
        character_2_id TEXT DEFAULT "none",
        character_3_id TEXT DEFAULT "none",
        character_4_id TEXT DEFAULT "none",
        character_5_id TEXT DEFAULT "none",
        character_6_id TEXT DEFAULT "none",
        actionsSequence TEXT DEFAULT '[]',
        actions_1 TEXT,
        actions_2 TEXT,
        actions_3 TEXT,
        actions_4 TEXT,
        isTraveling BOOLEAN DEFAULT FALSE
    `;

    await createTableIfNotExists(tableName, tableStructure, [], 'partyID');
}
