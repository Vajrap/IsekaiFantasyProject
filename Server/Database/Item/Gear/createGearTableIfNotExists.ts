import { createTableIfNotExists } from "../../Seeding";

// Database table creation logic
export async function createGearTableIfNotExists() {
    const tableName = 'Gears';
    const tableStructure = `
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        crafter TEXT,
        image TEXT,
        cost INTEGER,
        weight INTEGER,
        tier TEXT,
        gearType TEXT,
        specificType TEXT,
        jewelSlots INTEGER,
        slottedJewels TEXT,
        maxJewelGrade TEXT,
        defenseStats TEXT,
        attackStats TEXT,
        material TEXT,
        spellCastingDamageMultiplier REAL,
        spellCastingPenaltyHit INTEGER,
        arcaneAptitude REAL,
        specialTrait TEXT,
        class TEXT
    `;

    await createTableIfNotExists(
        tableName, 
        tableStructure, 
        // [...GearSeedArmor, ...GearSeedCloth, ...GearSeedHeadwear, ...GearSeedNecklace, ...GearSeedRings, ...GearSeedWeapon],
        [], 
        'id'
    );
}