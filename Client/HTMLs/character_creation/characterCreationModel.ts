import { 
    CharacterAttributesInterface, 
    CharacterProficienciesInterface, 
    CharacterArtisansInterface, 
    CreateCharacterRequest, 
    CreateCharacterResponse, 
    CharacterCreationResponseStatus 
} from '../../../Common/RequestResponse/characterCreation.js';
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
} from '../../../Common/Entity/raceClassBackground.js';
import { env } from '../../env.js';
export class CharacterCreationModel {
    attributes: CharacterAttributesInterface;
    proficiencies: CharacterProficienciesInterface;
    artisans: CharacterArtisansInterface;
    selectedClass: string;
    selectedRace: string;
    selectedBackground: string;
    selectedGender: "MALE" | "FEMALE"
    portraitNumber: number = 1;
    constructor() {
        this.attributes = {
            charisma: 6,
            luck: 6,
            intelligence: 6,
            leadership: 6,
            vitality: 6,
            willpower: 6,
            breath: 6,
            planar: 6,
            dexterity: 6,
            agility: 6,
            strength: 6,
            endurance: 6,
        };

        this.proficiencies = {
            bareHand: 6,
            sword: 6,
            blade: 6,
            dagger: 6,
            spear: 6,
            axe: 6,
            mace: 6,
            shield: 6,
            bow: 6,
            magicWand: 6,
            staff: 6,
            tome: 6,
            orb: 6,
        };

        this.artisans = {
            mining: 6,
            smithing: 6,
            woodCutting: 6,
            carpentry: 6,
            foraging: 6,
            weaving: 6,
            skinning: 6,
            tanning: 6,
            jewelry: 6,
            cooking: 6,
            alchemy: 6,
            enchanting: 6,
        };
        
        this.selectedClass = "CLERIC";
        this.selectedRace = "HUMAN";
        this.selectedBackground = "MAGE_APPRENTICE";
        this.selectedGender = "MALE";
        this.portraitNumber = 1;
    }
    async sendCharacterCreationRequest( 
        characterName: string, 
        portrait: string
    ): Promise<CreateCharacterResponse> {

        try {
            const url = `${env.ip()}/createCharacter`;
            const jsonData: CreateCharacterRequest = {
                characterName: characterName,
                portrait: portrait,
                race: this.selectedRace,
                class: this.selectedClass,
                background: this.selectedBackground,
                gender: this.selectedGender,
                // token: localStorage.getItem('isekaiFantasy_token') || ''
                userID: localStorage.getItem('isekaiFantasy_userID') || ''
            };
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });
                    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const raw = await response.json();
            const responseData: CreateCharacterResponse = raw.result;
            
            console.log('Character Creation Parsed Response:', raw);
    
            return responseData;
        } catch (error) {
            let message: CreateCharacterResponse = {
                status: CharacterCreationResponseStatus.FATAL_ERROR,
                message: "Unexpeted Error"
            } 
            return message;
        };
    
    }

    selectRace(race: string) {
        const raceObject = matchRace(race);
        if (raceObject == null) {
            console.error('Invalid Race');
            return;
        }
        
        if (this.selectedRace != null) {
            const previousRaceObject = matchRace(this.selectedRace);
            if (previousRaceObject == null) { 
                console.error('Invalid Previous Race');
                return; 
            }
            for (const key in previousRaceObject.attributes) {
                const attributeKey = key as keyof CharacterAttributesInterface;
                this.attributes[attributeKey] -=
                (previousRaceObject.attributes as CharacterAttributesInterface)[attributeKey];
            }
        }
    
        this.selectedRace = race;
        for (const key in raceObject.attributes) {
            const attributeKey = key as keyof CharacterAttributesInterface;
            this.attributes[attributeKey] +=
            (raceObject.attributes as CharacterAttributesInterface)[attributeKey];
        }
    }

    selectClass(classEnum: string) {
        const classObject = matchClass(classEnum);
        if (classObject == null) {
            console.error('Invalid Class');
            return;
        }

        if (this.selectedClass != null) {
            const previousClassObject = matchClass(this.selectedClass);
            if (previousClassObject == null) {
                console.error('Invalid Previous Class');
                return;
            }
            for (const key in previousClassObject.attributes) {
                const attributeKey = key as keyof CharacterAttributesInterface;
                this.attributes[attributeKey] -= 
                (previousClassObject.attributes as CharacterAttributesInterface)[attributeKey];
            }
            for (const key in previousClassObject.proficiencies) {
                const proficiencyKey = key as keyof CharacterProficienciesInterface;
                this.proficiencies[proficiencyKey] -= 
                (previousClassObject.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
            }
        }
        this.selectedClass = classEnum;

        for (const key in classObject.attributes) {
            const attributeKey = key as keyof CharacterAttributesInterface;
            this.attributes[attributeKey] += 
            (classObject.attributes as CharacterAttributesInterface)[attributeKey];
        }
        for (const key in classObject.proficiencies) {
            const proficiencyKey = key as keyof CharacterProficienciesInterface;
            this.proficiencies[proficiencyKey] += 
            (classObject.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
        }
    };

    selectBackground(backGroundEnum: string) {
        const backGroundObject = matchBackground(backGroundEnum);
        if (backGroundObject == null) {
            console.error('Invalid Background');
            return;
        }
        if (this.selectedBackground != null) {
            const previousBackground = matchBackground(this.selectedBackground);
            if (previousBackground == null) {
                console.error('Invalid Previous Background');
                return;
            }
            for (const key in previousBackground.attributes) {
                const attributeKey = key as keyof CharacterAttributesInterface;
                this.attributes[attributeKey] -= 
                (previousBackground.attributes as CharacterAttributesInterface)[attributeKey];
            }
            for (const key in previousBackground.proficiencies) {
                const proficiencyKey = key as keyof CharacterProficienciesInterface;
                this.proficiencies[proficiencyKey] -=
                (previousBackground.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
            }
            for (const key in previousBackground.artisans) {
                const artisanKey = key as keyof CharacterArtisansInterface;
                this.artisans[artisanKey] -=
                (previousBackground.artisans as CharacterArtisansInterface)[artisanKey];
            }        
        }
        this.selectedBackground = backGroundEnum;

        for (const key in backGroundObject.attributes) {
            const attributeKey = key as keyof CharacterAttributesInterface;
            this.attributes[attributeKey] +=
            (backGroundObject.attributes as CharacterAttributesInterface)[attributeKey];
        }
        for (const key in backGroundObject.proficiencies) {
            const proficiencyKey = key as keyof CharacterProficienciesInterface;
            this.proficiencies[proficiencyKey] +=
            (backGroundObject.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
        }
        for (const key in backGroundObject.artisans) {
            const artisanKey = key as keyof CharacterArtisansInterface;
            this.artisans[artisanKey] +=
            (backGroundObject.artisans as CharacterArtisansInterface)[artisanKey];
        }
    }

    selectGender(gender: "MALE" | "FEMALE") {
        this.selectedGender = gender;
    }

    portraitL() {
        if (this.portraitNumber === 1) {
            this.portraitNumber = 20;
        } else {
            this.portraitNumber -= 1;
        }
    }

    portraitR() {
        if (this.portraitNumber === 20) {
            this.portraitNumber = 1;
        } else {
            this.portraitNumber += 1;
        }
    }
}

export function matchRace(race: string) {
    switch (race) {
        case 'HUMAN':
            return raceHuman;
        case "ELVEN":
            return raceElven;
        case "ORC":
            return raceOrc;
        case "TRITON":
            return raceTriton;
        case "DWARF":
            return raceDwarf;
        case "HALFLING":
            return raceHalfling;
        case "HALF_ELF":
            return raceHalfElf;
        case "HALF_ORC":
            return raceHalfOrc;
        case "HALF_TRITON":
            return raceHalfTriton;
        case "DWARFLING":
            return raceDwarfling;
        case "ELVON":
            return raceElvon;
        default:
            return null;
    }
}

export function matchClass(className: string) {
    switch (className) {
        case "CLERIC":
            return classCleric;
        case "FIGHTER":
            return classFighter;
        case "GUARDIAN":
            return classGuardian;
        case "HEXBINDER":
            return classHexbinder;
        case "MAGE":
            return classMage;
        case "OCCULTIST":
            return classOccultist;
        case "SCOUT":
            return classScout;
        case "SKIRMISHER":
            return classSkirmisher;
        case "SOLDIER":
            return classSoldier;
        case "SPELLBLADE":
            return classSpellblade;
        case "TEMPLAR":
            return classTemplar;
        case "WARDEN":
            return classWarden;
        default:
            return null;
    }
}

export function matchBackground(background: string) {
    switch (background) {
        case "MAGE_APPRENTICE":
            return backgroundMageApprentice;
        case "DESERTED_MILITARY":
            return backgroundDesertedMilitary;
        case "TAVERN_BRAWLER":
            return backgroundTavernBrawler;
        case "FALLEN_NOBILITY":
            return backgroundFallenNobility;
        case "MERCS_CHILD":
            return backgroundMercsChild;
        case "TRAINEE_IN_CARAVAN":
            return backgroundTraineeInCaravan;
        case "WANDERING_MUSICIAN":
            return backgroundWanderingMusician;
        case "APPRENTICE_SCRIBE":
            return backgroundApprenticeScribe;
        case "ABANDONED_FARMHAND":
            return backgroundAbandonedFarmhand;
        case "STREET_URCHIN":
            return backgroundStreetUrchin;
        case "FAILED_CRAFTSMAN":
            return backgroundFailedCraftsman;
        case "INNKEEPERS_CHILD":
            return backgroundInnkeepersChild;
        default:
            return null;
    }
}



export const characterCreationModel = new CharacterCreationModel();
