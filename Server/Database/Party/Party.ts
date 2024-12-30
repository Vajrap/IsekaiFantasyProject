import { createTableIfNotExists } from "../Seeding";

export async function createPartyTableIfNotExist() {
    const tableName = 'parties';
    const tableStructure = `
        partyID TEXT PRIMARY KEY,
        characters JSON DEFAULT '["none", "none", "none", "none", "none", "none"]',
        actionsList JSON DEFAULT '{"day1": {"slot_1": "Rest", "slot_2": "Rest", "slot_3": "Rest", "slot_4": "Rest"}, 
                                  "day2": {"slot_1": "Rest", "slot_2": "Rest", "slot_3": "Rest", "slot_4": "Rest"}, 
                                  "day3": {"slot_1": "Rest", "slot_2": "Rest", "slot_3": "Rest", "slot_4": "Rest"}, 
                                  "day4": {"slot_1": "Rest", "slot_2": "Rest", "slot_3": "Rest", "slot_4": "Rest"}, 
                                  "day5": {"slot_1": "Rest", "slot_2": "Rest", "slot_3": "Rest", "slot_4": "Rest"}, 
                                  "day6": {"slot_1": "Rest", "slot_2": "Rest", "slot_3": "Rest", "slot_4": "Rest"}, 
                                  "day7": {"slot_1": "Rest", "slot_2": "Rest", "slot_3": "Rest", "slot_4": "Rest"}}',
        isTraveling BOOLEAN DEFAULT FALSE,
        location TEXT DEFAULT 'None'
    `;

    await createTableIfNotExists(tableName, tableStructure, [], 'partyID');
}
