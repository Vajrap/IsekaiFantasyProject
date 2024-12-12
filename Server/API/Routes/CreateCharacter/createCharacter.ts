import { 
    CreateCharacterResponse,
    CharacterCreationResponseStatus
} from '../../../../Common/RequestResponse/characterCreation';
import { 
    raceDwarf, 
    raceDwarfling, 
    raceElven, 
    raceElvon, 
    raceHalfElf, 
    raceHalfOrc, 
    raceHalfTriton,
    raceHalfling, 
    raceHuman, 
    raceOrc, 
    raceTriton,
    classCleric,
    classFighter,
    classGuardian,
    classHexbinder,
    classMage,
    classOccultist,
    classScout,
    classSkirmisher,
    classSoldier,
    classSpellblade,
    classTemplar,
    classWarden,
    backgroundAbandonedFarmhand,
    backgroundApprenticeScribe,
    backgroundFallenNobility,
    backgroundFailedCraftsman,
    backgroundInnkeepersChild,
    backgroundDesertedMilitary,
    backgroundMageApprentice,
    backgroundMercsChild,
    backgroundStreetUrchin,
    backgroundTavernBrawler,
    backgroundTraineeInCaravan,
    backgroundWanderingMusician 
} from '../../../../Common/Entity/raceClassBackground';
import { db } from '../../../Database';

export async function createCharacterHandler(    
    characterName: string,
    portrait: string,
    race: string,
    className: string,
    background: string,
    token: string
): Promise<CreateCharacterResponse> {
    const user = await db.read('users', 'token', token);
    if (!user) {
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

    const raceDate = getRace(race);
    const classData = getClass(className);
    const backgroundData = getBackground(background);

    console.log('raceData', raceDate);
    console.log('classData', classData);
    console.log('backgroundData', backgroundData);

    return {
        // TODO: Implement character creation logic here
        //proxy
        status: CharacterCreationResponseStatus.SUCCESS,
        message: 'Character created successfully'
    };
}

function getRace(race: string) {
    switch (race) {
        case 'HUMAN':
            return raceHuman
        case 'ELVEN':
            return raceElven
        case 'ELVON':
            return raceElvon
        case 'DWARF':
            return raceDwarf
        case 'DWARFLING':
            return raceDwarfling
        case 'HALFLING':
            return raceHalfling
        case 'HALF-ELF':
            return raceHalfElf
        case 'HALF-ORC':
            return raceHalfOrc
        case 'HALF-TRITON':
            return raceHalfTriton
        case 'ORC':
            return raceOrc
        case 'TRITON':
            return raceTriton
    }
}

function getClass(className: string) {
    switch (className) {
        case 'CLERIC':
            return classCleric
        case 'MAGE':
            return classMage
        case 'SCOUT':
            return classScout
        case 'HEXBINDER':
            return classHexbinder
        case 'FIGHTER':
            return classFighter
        case 'WARDEN':
            return classWarden
        case 'GUARDIAN':
            return classGuardian
        case 'SPELLBLADE':
            return classSpellblade
        case 'SKIRMISHER':
            return classSkirmisher
        case 'OCCULTIST':
            return classOccultist
        case 'SOLDIER':
            return classSoldier
        case 'TEMPLAR':
            return classTemplar
    }
}

function getBackground(background: string) {
    switch (background) {
        case 'ABANDONED_FARMHAND':
            return backgroundAbandonedFarmhand
        case 'APPRENTICE_SCRIBE':
            return backgroundApprenticeScribe
        case 'FALLEN_NOBILITY':
            return backgroundFallenNobility
        case 'FAILED_CRAFTSMAN':
            return backgroundFailedCraftsman
        case 'INNKEEPERS_CHILD':
            return backgroundInnkeepersChild
        case 'DESERTED_MILITARY':
            return backgroundDesertedMilitary
        case 'MAGE_APPRENTICE':
            return backgroundMageApprentice
        case 'MERCS_CHILD':
            return backgroundMercsChild
        case 'STREET_URCHIN':
            return backgroundStreetUrchin
        case 'TAVERN_BRAWLER':
            return backgroundTavernBrawler
        case 'TRAINEE_IN_CARAVAN':
            return backgroundTraineeInCaravan
        case 'WANDERING_MUSICIAN':
            return backgroundWanderingMusician
    }
}
