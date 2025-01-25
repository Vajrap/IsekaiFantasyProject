import { RaceEnum } from "../../../Common/RequestResponse/characterCreation";
import { CharacterType } from "../../Entities/Character/Subclasses/CharacterType";
import { createTableIfNotExists } from "../Seeding";
// import { NPCCharacterSeed } from "./NPC";
import { RelationEnum } from "../../../Common/DTOsEnumsInterfaces/Character/RelationEnums";
import { CharacterDB } from "./CharacterDB";

// export const CharacterSeed: CharacterDB[] = [
//     ...NPCCharacterSeed,
// ]

export async function createCharacterTableIfNotExists() {
    const tableName = 'Characters';
    // Map CharacterDB fields to database column types
    const fieldTypes: Record<keyof CharacterDB, string> = {
        id: 'TEXT PRIMARY KEY',
        partyID: 'TEXT',
        name: 'TEXT NOT NULL',
        type: 'TEXT',
        gender: 'TEXT',
        portrait: 'TEXT',
        background: 'TEXT',
        race: 'TEXT',
        alignment: 'TEXT',
        mood: 'INTEGER',
        energy: 'INTEGER',
        fame: 'INTEGER',
        level: 'INTEGER',
        gold: 'INTEGER',
        exp: 'INTEGER',
        isDead: 'BOOLEAN',
        lastTarget: 'TEXT',
        raceHP: 'INTEGER',
        raceMP: 'INTEGER',
        raceSP: 'INTEGER',
        baseHP: 'INTEGER',
        baseMP: 'INTEGER',
        baseSP: 'INTEGER',
        bonusHP: 'INTEGER',
        bonusMP: 'INTEGER',
        bonusSP: 'INTEGER',
        currentHP: 'INTEGER',
        currentMP: 'INTEGER',
        currentSP: 'INTEGER',
        status: 'TEXT',
        equipments: 'TEXT',
        internals: 'TEXT',
        activeInternal: 'TEXT',
        traits: 'TEXT',
        skills: 'TEXT',
        activeSkills: 'TEXT',
        position: 'INTEGER',
        itemsBag: 'TEXT',
        baseAC: 'INTEGER',
        location: 'TEXT',
        isSummoned: 'BOOLEAN',
        arcaneAptitude: 'INTEGER',
        bagSize: 'INTEGER',
        storyFlags: 'TEXT',
        relation: 'TEXT',
    };

    const tableStructure = Object.entries(fieldTypes)
        .map(([field, type]) => `${field} ${type}`)
        .join(',\n');

    // await createTableIfNotExists(tableName, tableStructure, CharacterSeed, 'id');
    await createTableIfNotExists(tableName, tableStructure, [], 'id');
}