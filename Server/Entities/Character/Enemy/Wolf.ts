import { EnemyArchetype } from "./Enemy";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { CharacterType } from "../Enums/CharacterType";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { CharacterAlignment } from "../Subclasses/CharacterAlignment";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { Character } from "../Character";

const baseWolfArchetype = {
    type: CharacterType.beast,
    gender: "NONE" as const,
    race: RaceEnum.BEAST,
    alignment: new CharacterAlignment({law: 0, chaos: 0, good: 0, evil: 0}),
    baseACRange: { min: 8, max: 10 },
    arcaneAptitudeRange: { min: 0, max: 5 },
    traits: [TraitEnum.trait_bodySize_medium]
};

export class BasicWolfArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.wolf_basic,
            level: 2,
            HPrange: { min: 12, max: 18 },
            MPrange: { min: 0, max: 5 },
            SPrange: { min: 15, max: 25 },
            attributeRange: {
                strength: { min: 12, max: 14 },
                dexterity: { min: 14, max: 16 },
                constitution: { min: 10, max: 12 },
                intelligence: { min: 3, max: 5 },
                wisdom: { min: 8, max: 10 },
                charisma: { min: 5, max: 7 },
                luck: { min: 3, max: 5 },
                leadership: { min: 1, max: 3 },
                breath: { min: 3, max: 5 },
                planar: { min: 1, max: 3 }
            },
            proficiencyRange: {
                bareHand: { min: 2, max: 3 }
            },
            battlerRange: {
                hit: { min: 10, max: 15 },
                dodge: { min: 5, max: 10 },
                pCRT: { min: 5, max: 10 },
                pATK: { min: 10, max: 15 }
            },
            ...baseWolfArchetype
        });
    }

    create() {
        return this.createEnemy("A wild wolf with sharp teeth and quick movements. It hunts in packs and is dangerous when cornered.", "wolf_basic.png");
    }
}

export class DireWolfArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.dire_wolf,
            level: 5,
            HPrange: { min: 25, max: 35 },
            MPrange: { min: 0, max: 10 },
            SPrange: { min: 30, max: 40 },
            attributeRange: {
                strength: { min: 14, max: 18 },
                dexterity: { min: 15, max: 17 },
                constitution: { min: 12, max: 16 },
                intelligence: { min: 4, max: 6 },
                wisdom: { min: 10, max: 12 },
                charisma: { min: 6, max: 8 }
            },
            proficiencyRange: {
                bareHand: { min: 3, max: 5 }
            },
            battlerRange: {
                hit: { min: 12, max: 18 },
                dodge: { min: 8, max: 12 },
                pCRT: { min: 8, max: 12 },
                pATK: { min: 12, max: 18 }
            },
            ...baseWolfArchetype
        });
    }

    create() {
        return this.createEnemy("A massive wolf with dark fur and glowing eyes. Much larger and more dangerous than a normal wolf, it can take down large prey with ease.", "dire_wolf.png");
    }
}

const basicWolf = new BasicWolfArchetype();
const direWolf = new DireWolfArchetype();

export const wolfEnemyRepository = [basicWolf, direWolf]; 