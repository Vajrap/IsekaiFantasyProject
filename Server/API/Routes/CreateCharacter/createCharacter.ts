import { 
    CreateCharacterResponse,
    CharacterCreationResponseStatus,
    ClassEnum,
    BackgroundEnum,
    RaceEnum
} from '../../../../Common/RequestResponse/characterCreation';
import { db } from '../../../Database';
import { Character, setCharacterStatus } from '../../../Entities/Character/Character';
import { v4 as uuidv4 } from 'uuid';

export async function createCharacterHandler(    
    characterName: string,
    portrait: string,
    race: RaceEnum,
    className: ClassEnum,
    background: BackgroundEnum,
    gender: "MALE" | "FEMALE",
    token: string
): Promise<CreateCharacterResponse> {
    const user = await db.read('users', 'token', token);

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

    const existingCharacter = await db.read('players', 'name', characterName);

    if (existingCharacter) {
        return {
            status: CharacterCreationResponseStatus.FAILED,
            message: 'ชื่อตัวละครนี้ถูกใช้ไปแล้ว'
        };
    }

    const character = new Character(
        uuidv4(),
        characterName,
        gender,
    );

    await setCharacterStatus(
        character,
        className,
        race,
        background,
    );
    
    console.log('character', character);

    return {
        // TODO: Implement character creation logic here
        //proxy        
        status: CharacterCreationResponseStatus.SUCCESS,
        message: 'Character created successfully'
    };
}
