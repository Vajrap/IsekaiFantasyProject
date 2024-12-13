var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CharacterCreationResponseStatus } from '../../../Common/RequestResponse/characterCreation.js';
import { raceDwarf, raceDwarfling, raceElven, raceElvon, raceHalfElf, raceHalfOrc, raceHalfTriton, raceHalfling, raceHuman, raceOrc, raceTriton, classCleric, classFighter, classGuardian, classHexbinder, classMage, classOccultist, classScout, classSkirmisher, classSoldier, classSpellblade, classTemplar, classWarden, backgroundAbandonedFarmhand, backgroundApprenticeScribe, backgroundFallenNobility, backgroundFailedCraftsman, backgroundInnkeepersChild, backgroundDesertedMilitary, backgroundMageApprentice, backgroundMercsChild, backgroundStreetUrchin, backgroundTavernBrawler, backgroundTraineeInCaravan, backgroundWanderingMusician } from '../../../Common/Entity/raceClassBackground.js';
import { env } from '../../env.js';
export class CharacterCreationModel {
    constructor() {
        this.portraitNumber = 1;
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
    sendCharacterCreationRequest(characterName, portrait) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${env.ip()}/createCharacter`;
                const jsonData = {
                    characterName: characterName,
                    portrait: portrait,
                    race: this.selectedRace,
                    class: this.selectedClass,
                    background: this.selectedBackground,
                    gender: this.selectedGender,
                    token: localStorage.getItem('isekaiFantasy_token') || ''
                };
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const raw = yield response.json();
                const responseData = raw.result;
                console.log('Character Creation Parsed Response:', raw);
                return responseData;
            }
            catch (error) {
                let message = {
                    status: CharacterCreationResponseStatus.FATAL_ERROR,
                    message: "Unexpeted Error"
                };
                return message;
            }
            ;
        });
    }
    selectRace(race) {
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
                const attributeKey = key;
                this.attributes[attributeKey] -=
                    previousRaceObject.attributes[attributeKey];
            }
        }
        this.selectedRace = race;
        for (const key in raceObject.attributes) {
            const attributeKey = key;
            this.attributes[attributeKey] +=
                raceObject.attributes[attributeKey];
        }
    }
    selectClass(classEnum) {
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
                const attributeKey = key;
                this.attributes[attributeKey] -=
                    previousClassObject.attributes[attributeKey];
            }
            for (const key in previousClassObject.proficiencies) {
                const proficiencyKey = key;
                this.proficiencies[proficiencyKey] -=
                    previousClassObject.proficiencies[proficiencyKey];
            }
        }
        this.selectedClass = classEnum;
        for (const key in classObject.attributes) {
            const attributeKey = key;
            this.attributes[attributeKey] +=
                classObject.attributes[attributeKey];
        }
        for (const key in classObject.proficiencies) {
            const proficiencyKey = key;
            this.proficiencies[proficiencyKey] +=
                classObject.proficiencies[proficiencyKey];
        }
    }
    ;
    selectBackground(backGroundEnum) {
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
                const attributeKey = key;
                this.attributes[attributeKey] -=
                    previousBackground.attributes[attributeKey];
            }
            for (const key in previousBackground.proficiencies) {
                const proficiencyKey = key;
                this.proficiencies[proficiencyKey] -=
                    previousBackground.proficiencies[proficiencyKey];
            }
            for (const key in previousBackground.artisans) {
                const artisanKey = key;
                this.artisans[artisanKey] -=
                    previousBackground.artisans[artisanKey];
            }
        }
        this.selectedBackground = backGroundEnum;
        for (const key in backGroundObject.attributes) {
            const attributeKey = key;
            this.attributes[attributeKey] +=
                backGroundObject.attributes[attributeKey];
        }
        for (const key in backGroundObject.proficiencies) {
            const proficiencyKey = key;
            this.proficiencies[proficiencyKey] +=
                backGroundObject.proficiencies[proficiencyKey];
        }
        for (const key in backGroundObject.artisans) {
            const artisanKey = key;
            this.artisans[artisanKey] +=
                backGroundObject.artisans[artisanKey];
        }
    }
    selectGender(gender) {
        this.selectedGender = gender;
    }
    portraitL() {
        if (this.portraitNumber === 1) {
            this.portraitNumber = 20;
        }
        else {
            this.portraitNumber -= 1;
        }
    }
    portraitR() {
        if (this.portraitNumber === 20) {
            this.portraitNumber = 1;
        }
        else {
            this.portraitNumber += 1;
        }
    }
}
export function matchRace(race) {
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
export function matchClass(className) {
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
export function matchBackground(background) {
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
