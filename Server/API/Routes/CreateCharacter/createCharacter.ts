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

export async function createCharacterHandler(    
    characterName: string,
    portrait: string,
    race: RaceEnum,
    className: ClassEnum,
    background: BackgroundEnum,
    gender: "MALE" | "FEMALE",
    userID: string
): Promise<CreateCharacterResponse> {
    const user = await db.read<UserID>('users', 'userID', userID);

    if (!user || user === null) {
        return {
            status: CharacterCreationResponseStatus.FATAL_ERROR,
            message: 'FATAL ERROR! User not found'
        };
    }

    if (user.characterID) {
        return {
            status: CharacterCreationResponseStatus.FATAL_ERROR,
            message: 'FATAL ERROR! User already has a character'
        };
    }

    if (characterName.length < 3) {
        return {
            status: CharacterCreationResponseStatus.FAILED,
            message: 'ตัวละครต้องมีชื่อมากกว่า 3 ตัวอักษรขึ้นไป'
        };
    }

    const existingCharacter = await db.read('PlayerCharacters', 'name', characterName);

    if (existingCharacter) {
        return {
            status: CharacterCreationResponseStatus.FAILED,
            message: 'ชื่อตัวละครนี้ถูกใช้ไปแล้ว'
        };
    }

    const character = new PlayerCharacter(
        characterName,
        gender,
        race,
        className,
        background,
        user.userID,
        portrait
    );

    const party = new Party([character])
    
    // Then save both character and party to the database
    // The reason we need party here is because party is how user control their character, through oarty of the main Character.
    
    await db.writeNew(
        {
            tableName: 'PlayerCharacters',
            primaryKeyColumnName: 'id',
            primaryKeyValue: user.userID,
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

    return {
        // TODO: Implement character creation logic here
        status: CharacterCreationResponseStatus.SUCCESS,
        message: 'Character created successfully'
    };
}
