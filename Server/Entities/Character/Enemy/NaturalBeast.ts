import { CharacterType } from "../Enums/CharacterType";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { EnemyArchetype } from "./Enemy";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ResourceNameEnum } from "../../Items/Resource/ResourceNameEnum";


// Base wolf archetype with common traits and stats for wolf-type enemies
const baseWolfArchetype = {
    type: CharacterType.beast,
    gender: "NONE" as const,
    race: RaceEnum.BEAST,
    level: 1,
    alignment: { good: 0, evil: 0, law: 0, chaos: 5 }, // Wolves are slightly chaotic but neutral
    HPrange: { min: 8, max: 10 },
    MPrange: { min: 3, max: 6 },
    SPrange: { min: 8, max: 12 },
    attributeRange: {
        strength: { min: 10, max: 12 },
        dexterity: { min: 12, max: 14 },
        agility: { min: 12, max: 14 },
        vitality: { min: 8, max: 10 },
        endurance: { min: 10, max: 12 },
        intelligence: { min: 4, max: 6 },
        willpower: { min: 8, max: 10 },
        charisma: { min: 2, max: 4 },
        luck: { min: 6, max: 8 },
        leadership: { min: 4, max: 6 }, // Pack animals have some leadership
        breath: { min: 6, max: 8 },
        planar: { min: 1, max: 3 }
    },
    baseACRange: { min: 5, max: 7 },
    arcaneAptitudeRange: { min: 0, max: 1 },
    traits: [],
    dropList: [
        { itemID: ResourceNameEnum.resource_wolf_meat, chance: 0.8 },
        { itemID: ResourceNameEnum.resource_wolf_pelt, chance: 0.6 }
    ],
    activeSkills: [
        { skillID: "skill_bite", level: 1 }
    ]
};

// Wolf - Common forest predator
export class WolfArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.wolf,
            type: baseWolfArchetype.type,
            gender: baseWolfArchetype.gender,
            level: baseWolfArchetype.level,
            race: baseWolfArchetype.race,
            alignment: baseWolfArchetype.alignment,
            HPrange: baseWolfArchetype.HPrange,
            MPrange: baseWolfArchetype.MPrange,
            SPrange: baseWolfArchetype.SPrange,
            attributeRange: baseWolfArchetype.attributeRange,
            proficiencyRange: {
                bareHand: { min: 3, max: 5 } // Natural weapons (teeth/claws)
            },
            battlerRange: {
                pATK: { min: 2, max: 4 },
                pHIT: { min: 3, max: 5 },
                dodge: { min: 2, max: 4 }
            },
            equipments: {
                mainHand: null,
                offHand: null,
                armor: null,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: baseWolfArchetype.baseACRange,
            traits: [...baseWolfArchetype.traits],
            activeSkills: [...baseWolfArchetype.activeSkills],
            dropList: baseWolfArchetype.dropList,
            givenExpRange: { min: 15, max: 20 },
            givenGoldRange: { min: 0, max: 0 },
            preferredPosition: 'front'
        });
    }
}

// Dire Wolf - Larger, more dangerous wolf
export class DireWolfArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.dire_wolf,
            type: baseWolfArchetype.type,
            gender: baseWolfArchetype.gender,
            level: baseWolfArchetype.level + 3,
            race: baseWolfArchetype.race,
            alignment: { good: 0, evil: 5, law: 0, chaos: 10 }, // More aggressive and chaotic
            HPrange: { min: 12, max: 16 },
            MPrange: baseWolfArchetype.MPrange,
            SPrange: { min: 12, max: 16 },
            attributeRange: {
                ...baseWolfArchetype.attributeRange,
                strength: { min: 13, max: 15 },
                agility: { min: 13, max: 15 },
                endurance: { min: 12, max: 14 }
            },
            proficiencyRange: {
                bareHand: { min: 5, max: 7 }
            },
            battlerRange: {
                pATK: { min: 4, max: 6 },
                pHIT: { min: 4, max: 6 },
                pCRT: { min: 2, max: 4 },
                dodge: { min: 3, max: 5 }
            },
            equipments: {
                mainHand: null,
                offHand: null,
                armor: null,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: { min: 7, max: 9 },
            traits: [...baseWolfArchetype.traits],
            activeSkills: [
                { skillID: "skill_bite", level: 2 },
                { skillID: "skill_howl", level: 1 }
            ],
            dropList: [
                ...baseWolfArchetype.dropList,
                { itemID: ResourceNameEnum.resource_wolf_fang, chance: 0.65 }
            ],
            givenExpRange: { min: 30, max: 40 },
            givenGoldRange: { min: 0, max: 0 },
            preferredPosition: 'front'
        });
    }
}

// Base bear archetype
const baseBearArchetype = {
    type: CharacterType.beast,
    gender: "NONE" as const,
    race: RaceEnum.BEAST,
    level: 5,
    alignment: { good: 0, evil: 0, law: 5, chaos: 0 }, // Bears are territorial but neutral
    HPrange: { min: 15, max: 20 },
    MPrange: { min: 3, max: 6 },
    SPrange: { min: 12, max: 15 },
    attributeRange: {
        strength: { min: 14, max: 16 },
        dexterity: { min: 8, max: 10 },
        agility: { min: 8, max: 10 },
        vitality: { min: 12, max: 14 },
        endurance: { min: 13, max: 15 },
        intelligence: { min: 4, max: 6 },
        willpower: { min: 10, max: 12 },
        charisma: { min: 2, max: 4 },
        luck: { min: 6, max: 8 },
        leadership: { min: 1, max: 3 },
        breath: { min: 8, max: 10 },
        planar: { min: 1, max: 3 }
    },
    baseACRange: { min: 8, max: 10 }, // Natural armor from thick hide
    arcaneAptitudeRange: { min: 0, max: 1 },
    traits: [TraitEnum.trait_bodySize_large],
    dropList: [
        { itemID: ResourceNameEnum.resource_culinary_meat_bear, chance: 0.9 },
        { itemID: ResourceNameEnum.resource_bear_pelt, chance: 0.7 },
        { itemID: ResourceNameEnum.resource_bear_claw, chance: 0.4 }
    ],
    activeSkills: [
        { skillID: "skill_claw_swipe", level: 1 }
    ]
};

// Bear - Powerful forest predator
export class BearArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.bear,
            type: baseBearArchetype.type,
            gender: baseBearArchetype.gender,
            level: baseBearArchetype.level,
            race: baseBearArchetype.race,
            alignment: baseBearArchetype.alignment,
            HPrange: baseBearArchetype.HPrange,
            MPrange: baseBearArchetype.MPrange,
            SPrange: baseBearArchetype.SPrange,
            attributeRange: baseBearArchetype.attributeRange,
            proficiencyRange: {
                bareHand: { min: 5, max: 7 } // Natural weapons (claws)
            },
            battlerRange: {
                pATK: { min: 5, max: 7 },
                pDEF: { min: 3, max: 5 },
                pHIT: { min: 3, max: 5 }
            },
            equipments: {
                mainHand: null,
                offHand: null,
                armor: null,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: baseBearArchetype.baseACRange,
            traits: [...baseBearArchetype.traits],
            activeSkills: [...baseBearArchetype.activeSkills],
            dropList: baseBearArchetype.dropList,
            givenExpRange: { min: 40, max: 60 },
            givenGoldRange: { min: 0, max: 0 },
            preferredPosition: 'front'
        });
    }
}

// Base spider archetype
const baseSpiderArchetype = {
    type: CharacterType.insect,
    gender: "NONE" as const,
    race: RaceEnum.INSECT,
    level: 3,
    alignment: { good: 0, evil: 5, law: 0, chaos: 5 }, // Spiders are ambush predators
    HPrange: { min: 8, max: 12 },
    MPrange: { min: 5, max: 8 },
    SPrange: { min: 8, max: 12 },
    attributeRange: {
        strength: { min: 8, max: 10 },
        dexterity: { min: 12, max: 14 },
        agility: { min: 10, max: 12 },
        vitality: { min: 6, max: 8 },
        endurance: { min: 8, max: 10 },
        intelligence: { min: 2, max: 4 },
        willpower: { min: 6, max: 8 },
        charisma: { min: 1, max: 3 },
        luck: { min: 6, max: 8 },
        leadership: { min: 1, max: 3 },
        breath: { min: 4, max: 6 },
        planar: { min: 1, max: 3 }
    },
    baseACRange: { min: 6, max: 8 }, // Exoskeleton provides some protection
    arcaneAptitudeRange: { min: 0, max: 2 },
    traits: [TraitEnum.trait_poison_immunity],
    dropList: [
        { itemID: ResourceNameEnum.resource_spider_leg, chance: 0.8 },
        { itemID: ResourceNameEnum.resource_spider_silk, chance: 0.4 }
    ],
    activeSkills: [
        { skillID: "skill_bite", level: 1 },
        { skillID: "skill_web_shot", level: 1 }
    ]
};

// Giant Spider - Venomous ambush predator
export class GiantSpiderArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.giant_spider,
            type: baseSpiderArchetype.type,
            gender: baseSpiderArchetype.gender,
            level: baseSpiderArchetype.level,
            race: baseSpiderArchetype.race,
            alignment: baseSpiderArchetype.alignment,
            HPrange: baseSpiderArchetype.HPrange,
            MPrange: baseSpiderArchetype.MPrange,
            SPrange: baseSpiderArchetype.SPrange,
            attributeRange: baseSpiderArchetype.attributeRange,
            proficiencyRange: {
                bareHand: { min: 3, max: 5 } // Fangs and mandibles
            },
            battlerRange: {
                pATK: { min: 3, max: 5 },
                pHIT: { min: 4, max: 6 },
                pDEF: { min: 2, max: 4 }
            },
            equipments: {
                mainHand: null,
                offHand: null,
                armor: null,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: baseSpiderArchetype.baseACRange,
            traits: [...baseSpiderArchetype.traits],
            activeSkills: [
                ...baseSpiderArchetype.activeSkills,
                { skillID: "skill_venom_spray", level: 1 }
            ],
            dropList: [
                ...baseSpiderArchetype.dropList,
                { itemID: ResourceNameEnum.resource_venom_sac, chance: 0.2 }
            ],
            givenExpRange: { min: 25, max: 40 },
            givenGoldRange: { min: 0, max: 0 },
            preferredPosition: 'front'
        });
    }
}

// Instantiate the archetypes
const wolf = new WolfArchetype();
const direWolf = new DireWolfArchetype();
const bear = new BearArchetype();
const giantSpider = new GiantSpiderArchetype();

// Export the natural beast enemy repository
export const naturalBeastEnemyRepository = [
    wolf,
    direWolf,
    bear,
    giantSpider
]; 