import { CharacterArchetype } from "../../Entities/Character/Subclasses/CharacterArchetype";
import { createTableIfNotExists } from "../Seeding";
import { GoblinSeed } from "./Goblin";
import { NPCCharacterSeed } from "./NPC";
import { OrcSeed } from "./Orc";

export const CharacterSeed: CharacterArchetype[] = [
    ...NPCCharacterSeed,
    ...GoblinSeed,
    ...OrcSeed
]

export async function createCharacterTableIfNotExists() {
    const tableName = 'Characters';
    const tableStructure = `
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        gender TEXT,
        type TEXT,
        level INTEGER,
        portrait TEXT,
        race TEXT,
        background TEXT,
        alignment TEXT,
        mood INTEGER,
        energy INTEGER,
        fame INTEGER,
        gold INTEGER,
        exp INTEGER,
        isDead BOOLEAN,
        lastTarget TEXT,
        currentHP INTEGER,
        currentMP INTEGER,
        currentSP INTEGER,
        attributes TEXT,
        proficiencies TEXT,
        battlers TEXT,
        elements TEXT,
        artisans TEXT,
        equipments TEXT,
        internals TEXT,
        activeInternal TEXT,
        traits TEXT,
        skills TEXT,
        activeSkills TEXT,
        position INTEGER,
        itemsBag TEXT,
        baseAC INTEGER,
        location TEXT,
        isSummoned BOOLEAN,
        arcaneAptitude INTEGER,
        classModifier TEXT
    `;

    await createTableIfNotExists(tableName, tableStructure, CharacterSeed, 'id', true);
}