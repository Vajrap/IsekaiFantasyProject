import { 
    CreateCharacterResponse,
    CharacterCreationResponseStatus,
    ClassEnum,
    BackgroundEnum,
    RaceEnum
} from '../../../../Common/RequestResponse/characterCreation';
import { UserID } from '../../../Authenticate/UserID';
import { db } from '../../../Database';
import { PlayerCharacter } from '../../../Entities/Character/Character';
import { Party } from '../../../Entities/Party/Party';
import { Result, success, failure } from '../../../../Common/Lib/Result'

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
    const existingCharacter = await db.read('PlayerCharacters', 'name', name);
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
): Promise<Result<PlayerCharacter>> {
    const character = new PlayerCharacter(
        characterName,
        gender,
        race,
        className,
        background,
        userID,
        portrait
    );

    await db.writeNew(
        {
            tableName: 'PlayerCharacters',
            primaryKeyColumnName: 'id',
            primaryKeyValue: userID,
        },
        [
            {dataKey: 'id', value: character.id},
            {dataKey: 'name', value: character.name},
            {dataKey: 'gender', value: character.gender},
            {dataKey: 'type', value: character.type},
            {dataKey: 'level', value: character.level},
            {dataKey: 'portrait', value: character.portrait},
            {dataKey: 'race', value: character.race},
            {dataKey: 'background', value: character.background},
            {dataKey: 'alignment', value: character.alignment},
            {dataKey: 'mood', value: character.mood},
            {dataKey: 'energy', value: character.energy},
            {dataKey: 'fame', value: character.fame},
            {dataKey: 'gold', value: character.gold},
            {dataKey: 'exp', value: character.exp},
            {dataKey: 'isDead', value: character.isDead},
            {dataKey: 'lastTarget', value: character.lastTarget},
            {dataKey: 'currentHP', value: character.currentHP},
            {dataKey: 'currentMP', value: character.currentMP},
            {dataKey: 'currentSP', value: character.currentSP},
            {dataKey: 'attributes', value: character.status.attributes},
            {dataKey: 'proficiencies', value: character.status.proficiencies},
            {dataKey: 'battlers', value: character.status.battlers},
            {dataKey: 'elements', value: character.status.elements},
            {dataKey: 'artisans', value: character.status.artisans},
            {dataKey: 'equipments', value: character.equipments},
            {dataKey: 'internals', value: character.internals},
            {dataKey: 'activeInternal', value: character.activeInternal},
            {dataKey: 'traits', value: character.traits},
            {dataKey: 'skills', value: character.skills},
            {dataKey: 'activeSkills', value: character.activeSkills},
            {dataKey: 'position', value: character.position},
            {dataKey: 'itemsBag', value: character.itemsBag},
            {dataKey: 'baseAC', value: character.baseAC},
            {dataKey: 'location', value: character.location},
            {dataKey: 'isSummoned', value: character.isSummoned},
            {dataKey: 'arcaneAptitude', value: character.arcaneAptitude},
            {dataKey: 'bagSize', value: character.bagSize},
            {dataKey: 'storyFlags', value: character.storyFlags}
        ]
    );

    return success(character);
}

async function createAndSaveParty(character: PlayerCharacter): Promise<Result<true>> {
    const party = new Party([character]);
    await db.writeNew(
        {
            tableName: 'Parties',
            primaryKeyColumnName: 'partyID',
            primaryKeyValue: party.partyID,
        },
        [
            {dataKey: 'partyID', value: party.partyID},
            {dataKey: 'character_1_id', value: party.characters[0] === "none" ? "none": party.characters[0].id},
            {dataKey: 'character_2_id', value: party.characters[1] === "none" ? "none": party.characters[1].id},
            {dataKey: 'character_3_id', value: party.characters[2] === "none" ? "none": party.characters[2].id},
            {dataKey: 'character_4_id', value: party.characters[3] === "none" ? "none": party.characters[3].id},
            {dataKey: 'character_5_id', value: party.characters[4] === "none" ? "none": party.characters[4].id},
            {dataKey: 'character_6_id', value: party.characters[5] === "none" ? "none": party.characters[5].id},
            {dataKey: 'actionsSequence', value: party.actionsSequence},
            {dataKey: 'actions_1', value: party.actionsList[0]},
            {dataKey: 'actions_2', value: party.actionsList[1]},
            {dataKey: 'actions_3', value: party.actionsList[2]},
            {dataKey: 'actions_4', value: party.actionsList[3]},
            {dataKey: 'isTraveling', value: party.isTravelling},
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
    const characterExists = await db.read('PlayerCharacters', 'id', userID);
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