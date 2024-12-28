import { createTableIfNotExists } from "../../Seeding";
// import { GearSeedArmor } from "./Seeds/Armor";
// import { GearSeedCloth } from "./Seeds/Cloth";
// import { GearSeedHeadwear } from "./Seeds/HeadWear";
// import { GearSeedNecklace } from "./Seeds/Necklace";
// import { GearSeedRings } from "./Seeds/Ring";
// import { GearSeedWeapon } from "./Seeds/Weapon";

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