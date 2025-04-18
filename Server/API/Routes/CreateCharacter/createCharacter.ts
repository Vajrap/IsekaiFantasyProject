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
import { Character } from '../../../Entities/Character/Character';
import { game } from '../../../Game/Game';

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


    // const creationResult = await createCharacterAndParty(userID, characterName, portrait, gender, race, className, background);
    // if (!creationResult.success) return creationResult;

    return success({
        status: CharacterCreationResponseStatus.SUCCESS,
        message: 'Character created successfully',
    });
}


async function validateUser(userID: string): Promise<Result<true>> {
    const user = await db.read<UserID>('users', 'userID', userID);

    if (user === null || user === undefined) {
        return failure('USER_NOT_FOUND', 'User does not exist.');
    }

    if (user.characterID) {
        return failure('USER_HAS_CHARACTER', 'User already has a character.');
    }

    return success(true);
}

async function validateCharacterName(name: string): Promise<Result<{status: string; message: string}>> {
    if (name.length < 3) {
        return success({status: 'NAME_TOO_SHORT', message: 'Name is too short.'});
    }
    const existingCharacter = await db.read('Characters', 'name', name);
    if (existingCharacter) {
        return success({status: 'NAME_ALREADY_EXISTS', message: 'Name already exists.'});
    }
    return success({status: 'SUCCESS', message: 'Name is valid.'});
}

// async function createAndSaveCharacter(
//     userID: string,
//     characterName: string,
//     portrait: string,
//     gender: "MALE" | "FEMALE",
//     race: RaceEnum,
//     className: ClassEnum,
//     background: BackgroundEnum
// ): Promise<Result<Character>> {
//     const character = new Character(
//         {
//             id: userID,
//             name: characterName,
//             gender,
//             portrait,
//         }
//     );

//     // Set the character as a player character; This is the only plcae where this is done.
//     character.isPlayerCharacter = true;

//     await setCharacterStatus(character, className, race, background);

//     for (const skill in character.skills) {
//         // It's a record map between ID and SkillMeta
//         const a = character.skills[skill]
//     }

//     const characterData:CharacterDB = {
//         id: character.id,
//         partyID: character.partyID,
//         name: character.name,
//         type: character.type,
//         gender: character.gender,
//         portrait: character.portrait,
//         background: character.background,
//         race: character.race,
//         alignment: character.alignment,
//         mood: character.mood,
//         energy: character.energy,
//         fame: character.fame,
//         level: character.level,
//         gold: character.gold,
//         exp: character.statTracker,
//         isDead: character.isDead,
//         lastTarget: character.lastTarget,
//         raceHP: character.raceHP,
//         raceMP: character.raceMP,
//         raceSP: character.raceSP,
//         baseHP: character.baseHP,
//         baseMP: character.baseMP,
//         baseSP: character.baseSP,
//         bonusHP: character.bonusHP,
//         bonusMP: character.bonusMP,
//         bonusSP: character.bonusSP,
//         currentHP: character.currentHP,
//         currentMP: character.currentMP,
//         currentSP: character.currentSP,
//         status: character.status, // Assuming this matches CharacterStatusDB
//         equipments:{
//             mainHand: character.equipments.mainHand? character.equipments.mainHand.id : null,
//             offHand: character.equipments.offHand? character.equipments.offHand.id : null,
//             armor: character.equipments.armor? character.equipments.armor.id : null,
//             headwear: character.equipments.headwear? character.equipments.headwear.id : null,
//             boots: character.equipments.boots? character.equipments.boots.id : null,
//             gloves: character.equipments.gloves? character.equipments.gloves.id : null,
//             necklace: character.equipments.necklace? character.equipments.necklace.id : null,
//             ring_R: character.equipments.ring_R? character.equipments.ring_R.id : null,
//             ring_L: character.equipments.ring_L? character.equipments.ring_L.id : null,
//         }, // Assuming this matches CharacterEquipmentDB
//         traits: character.traits.map((trait) => trait.id),
//         skills: 
//         activeSkills: character.activeSkills,
//         position: character.position,
//         itemsBag: {}, // Assuming `itemsBag` is an object with `items`
//         baseAC: character.baseAC,
//         location: character.location,
//         isSummoned: character.isSummoned,
//         arcaneAptitude: 100,
//         bagSize: character.bagSize,
//         storyFlags: character.storyFlags,
//         relation: {},
//         isPlayerCharacter: character.isPlayerCharacter,
//     }

//     await db.writeNew(
//         {
//             tableName: 'characters',
//             primaryKeyColumnName: 'id',
//             primaryKeyValue: userID,
//         },
//         Object.entries(characterData).map(([key, value]) => ({
//             dataKey: key,
//             value,
//         }))
//     );

//     return success(character);
// }

async function createAndSaveParty(character: Character): Promise<Result<Party>> {
    const party = new Party([character]);
    const dbObject = party.toDatabase();

    await db.writeNew(
        {
            tableName: 'Parties',
            primaryKeyColumnName: 'partyID',
            primaryKeyValue: dbObject.partyID,
        },
        [
            { dataKey: 'partyID', value: dbObject.partyID },
            { dataKey: 'characters', value: dbObject.characters },
            { dataKey: 'actionSequence', value: dbObject.actionSequence },
            { dataKey: 'isTraveling', value: dbObject.isTraveling },
            { dataKey: 'location', value: dbObject.location },
        ]
    );

    return success(party);
}

// async function createCharacterAndParty(
//     userID: string,
//     characterName: string,
//     portrait: string,
//     gender: "MALE" | "FEMALE",
//     race: RaceEnum,
//     className: ClassEnum,
//     background: BackgroundEnum
// ): Promise<Result<true>> {
//     // Check if a character or party already exists
//     const characterExists = await db.read('Characters', 'id', userID);
//     if (characterExists) {
//         return failure('CHARACTER_ALREADY_EXISTS', 'A character for this user already exists.');
//     }

//     const partyExists = await db.read('Parties', 'partyID', userID);
//     if (partyExists) {
//         return failure('PARTY_ALREADY_EXISTS', 'A party for this user already exists.');
//     }
    
//     // Create the character
//     const characterCreationProcess = await createAndSaveCharacter(userID, characterName, portrait, gender, race, className, background);
//     if (characterCreationProcess.success === false) { return failure('CHARACTER_CREATION_FAILED', 'Failed to create character.'); }

//     // Create the party
//     const partyCreationProcess = await createAndSaveParty(characterCreationProcess.data);
//     if (partyCreationProcess.success === false) { return failure('PARTY_CREATION_FAILED', 'Failed to create party.'); }

//     game.characterManager.addCharacter(characterCreationProcess.data);
//     game.partyManager.addParty(partyCreationProcess.data);

//     return success(true);
// }