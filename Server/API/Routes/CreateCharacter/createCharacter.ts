import { 
    CreateCharacterResponse,
    CharacterCreationResponseStatus,
    ClassEnum,
    BackgroundEnum,
    RaceEnum
} from '../../../../Common/RequestResponse/characterCreation';
import { UserID } from '../../../Authenticate/UserID';
import { db } from '../../../Database';
import { Party } from '../../../Entities/Party/Party';
import { Result, success, failure } from '../../../../Common/Lib/Result'
import { Character, setCharacterStatus } from '../../../Entities/Character/Character';
import { CharacterDB } from '../../../Database/Character/CharacterDB';

export async function createCharacterHandler(    
    characterName: string,
    portrait: string, 
    race: RaceEnum,
    className: ClassEnum,
    background: BackgroundEnum,
    gender: "MALE" | "FEMALE",
    userID: string
): Promise<Result<CreateCharacterResponse>> {
    const userResult = await validateUser(userID);
    if (!userResult.success) return userResult;

    const nameResult = await validateCharacterName(characterName);
    if (!nameResult.success) return nameResult;

    const creationResult = await createCharacterAndParty(userID, characterName, portrait, gender, race, className, background);
    if (!creationResult.success) return creationResult;

    return success({
        status: CharacterCreationResponseStatus.SUCCESS,
        message: 'Character created successfully',
    });
}


async function validateUser(userID: string): Promise<Result<true>> {
    const user = await db.read<UserID>('users', 'userID', userID);
    if (!user) {
        return failure('USER_NOT_FOUND', 'User does not exist.');
    }
    if (user.characterID) {
        return failure('USER_HAS_CHARACTER', 'User already has a character.');
    }
    return success(true);
}

async function validateCharacterName(name: string): Promise<Result<true>> {
    if (name.length < 3) {
        return failure('INVALID_NAME', 'Name must be at least 3 characters long.');
    }
    const existingCharacter = await db.read('Characters', 'name', name);
    if (existingCharacter) {
        return failure('NAME_TAKEN', 'Name is already taken.');
    }
    return success(true);
}

async function createAndSaveCharacter(
    userID: string,
    characterName: string,
    portrait: string,
    gender: "MALE" | "FEMALE",
    race: RaceEnum,
    className: ClassEnum,
    background: BackgroundEnum
): Promise<Result<Character>> {
    const character = new Character(
        {
            id: userID,
            name: characterName,
            gender,
            portrait,
        }
    );

    await setCharacterStatus(character, className, race, background);

    const characterData:CharacterDB = {
        id: character.id,
        partyID: character.partyID,
        name: character.name,
        type: character.type,
        gender: character.gender,
        portrait: character.portrait,
        background: character.background,
        race: character.race,
        alignment: character.alignment,
        mood: character.mood,
        energy: character.energy,
        fame: character.fame,
        level: character.level,
        gold: character.gold,
        exp: character.exp,
        isDead: character.isDead,
        lastTarget: character.lastTarget,
        raceHP: character.raceHP,
        raceMP: character.raceMP,
        raceSP: character.raceSP,
        baseHP: character.baseHP,
        baseMP: character.baseMP,
        baseSP: character.baseSP,
        bonusHP: character.bonusHP,
        bonusMP: character.bonusMP,
        bonusSP: character.bonusSP,
        currentHP: character.currentHP,
        currentMP: character.currentMP,
        currentSP: character.currentSP,
        status: character.status, // Assuming this matches CharacterStatusDB
        equipments:{
            mainHand: character.equipments.mainHand? character.equipments.mainHand.id : null,
            offHand: character.equipments.offHand? character.equipments.offHand.id : null,
            armor: character.equipments.armor? character.equipments.armor.id : null,
            headwear: character.equipments.headwear? character.equipments.headwear.id : null,
            boots: character.equipments.boots? character.equipments.boots.id : null,
            gloves: character.equipments.gloves? character.equipments.gloves.id : null,
            necklace: character.equipments.necklace? character.equipments.necklace.id : null,
            ring_R: character.equipments.ring_R? character.equipments.ring_R.id : null,
            ring_L: character.equipments.ring_L? character.equipments.ring_L.id : null,
        }, // Assuming this matches CharacterEquipmentDB
        internals: character.internals.map((internal) => ({
            internal: internal.internal.id,
            level: internal.level,
            exp: internal.exp,
        })),
        activeInternal: character.activeInternal
            ? {
                  internal: character.activeInternal.internal.id,
                  level: character.activeInternal.level,
                  exp: character.activeInternal.exp,
              }
            : null,
        traits: character.traits.map((trait) => trait.id),
        skills: character.skills.map((skill) => ({
            skill: skill.skill.id,
            level: skill.level,
            exp: skill.exp,
        })),
        activeSkills: character.activeSkills.map((skill) => ({
            skill: skill.skill.id,
            level: skill.level,
            exp: skill.exp,
        })),
        position: character.position,
        itemsBag: {}, // Assuming `itemsBag` is an object with `items`
        baseAC: character.baseAC,
        location: character.location,
        isSummoned: character.isSummoned,
        arcaneAptitude: 0,
        bagSize: character.bagSize,
        storyFlags: character.storyFlags,
        relation: {},
    }

    await db.writeNew(
        {
            tableName: 'characters',
            primaryKeyColumnName: 'id',
            primaryKeyValue: userID,
        },
        Object.entries(characterData).map(([key, value]) => ({
            dataKey: key,
            value,
        }))
    );

    return success(character);
}

async function createAndSaveParty(character: Character): Promise<Result<true>> {
    const party = new Party([character]);
    await db.writeNew(
        {
            tableName: 'Parties',
            primaryKeyColumnName: 'partyID',
            primaryKeyValue: party.partyID,
        },
        [
            {dataKey: 'partyID', value: party.partyID},
            {dataKey: 'character_1_id', value: party.characters[0] === "none" ? "none" : party.characters[0].id},
            {dataKey: 'character_2_id', value: party.characters[1] === "none" ? "none" : party.characters[1].id},
            {dataKey: 'character_3_id', value: party.characters[2] === "none" ? "none" : party.characters[2].id},
            {dataKey: 'character_4_id', value: party.characters[3] === "none" ? "none" : party.characters[3].id},
            {dataKey: 'character_5_id', value: party.characters[4] === "none" ? "none" : party.characters[4].id},
            {dataKey: 'character_6_id', value: party.characters[5] === "none" ? "none" : party.characters[5].id},
            {dataKey: 'day_1', value: party.actionsList.day1},
            {dataKey: 'day_2', value: party.actionsList.day2},
            {dataKey: 'day_3', value: party.actionsList.day3},
            {dataKey: 'day_4', value: party.actionsList.day4},
            {dataKey: 'day_5', value: party.actionsList.day5},
            {dataKey: 'day_6', value: party.actionsList.day6},
            {dataKey: 'day_7', value: party.actionsList.day7},
            {dataKey: 'isTraveling', value: party.isTraveling},
        ]
    );

    return success(true);
}

async function createCharacterAndParty(
    userID: string,
    characterName: string,
    portrait: string,
    gender: "MALE" | "FEMALE",
    race: RaceEnum,
    className: ClassEnum,
    background: BackgroundEnum
): Promise<Result<true>> {
    // Check if a character or party already exists
    const characterExists = await db.read('Characters', 'id', userID);
    if (characterExists) {
        return failure('CHARACTER_ALREADY_EXISTS', 'A character for this user already exists.');
    }

    const partyExists = await db.read('Parties', 'partyID', userID);
    if (partyExists) {
        return failure('PARTY_ALREADY_EXISTS', 'A party for this user already exists.');
    }
    
    // Create the character
    const characterCreationProcess = await createAndSaveCharacter(userID, characterName, portrait, gender, race, className, background);
    if (characterCreationProcess.success === false) { return failure('CHARACTER_CREATION_FAILED', 'Failed to create character.'); }

    // Create the party
    const partyCreationProcess = await createAndSaveParty(characterCreationProcess.data);
    if (partyCreationProcess.success === false) { return failure('PARTY_CREATION_FAILED', 'Failed to create party.'); }

    return success(true);
}