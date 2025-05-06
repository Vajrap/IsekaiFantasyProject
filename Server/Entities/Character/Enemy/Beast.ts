import { EnemyArchetype } from "./Enemy";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { ResourceNameEnum } from "../../Items/Resource/ResourceNameEnum";
import { CharacterType } from "../Enums/CharacterType";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { CharacterAlignment } from "../Subclasses/CharacterAlignment";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";


// WOLF - Common wild beast
export const WolfArchetype = new EnemyArchetype({
    name: MobCharacterEnum.wolf,
    gender: "NONE",
    type: CharacterType.beast,
    level: 2,
    race: RaceEnum.BEAST,
    alignment: new CharacterAlignment({ law: 0, chaos: 0, good: 0, evil: 0 }),
    HPrange: {
        min: 8,
        max: 10
    },
    MPrange: {
        min: 0,
        max: 0
    },
    SPrange: {
        min: 12,
        max: 15
    },
    attributeRange: {
        strength: {
            min: 10,
            max: 12
        },
        dexterity: {
            min: 14,
            max: 16
        },
        constitution: {
            min: 10,
            max: 12
        },
        intelligence: {
            min: 4,
            max: 5
        },
        wisdom: {
            min: 8,
            max: 10
        },
        charisma: {
            min: 5,
            max: 6
        }
    },
    proficiencyRange: {},
    battlerRange: {
        initiative: {
            min: 4,
            max: 5
        },
        pATK: {
            min: 3,
            max: 4
        },
        mATK: {
            min: 0,
            max: 0
        },
        pDEF: {
            min: 1,
            max: 2
        },
        mDEF: {
            min: 1,
            max: 2
        },
        dodge: {
            min: 4,
            max: 5
        },
        hit: {
            min: 4,
            max: 5
        }
    },
    elementRange: {},
    artisanRange: {},
    traits: [
        TraitEnum.trait_bodySize_medium
    ],
    activeSkills: [
        { skillID: "skill_bite", level: 1 },
        { skillID: "skill_howl", level: 1 }
    ],
    equipments: {
        mainHand: null,
        offHand: null,
        cloth: null,
        headWear: null,
        armor: null,
        necklace: null,
        ring: null
    },
    baseACRange: {
        min: 8,
        max: 9
    },
    arcaneAptitudeRange: {
        min: 0,
        max: 0
    },
    dropList: [
        { itemID: ResourceNameEnum.resource_wolf_pelt, chance: 0.7 },
        { itemID: ResourceNameEnum.resource_wolf_fang, chance: 0.4 }
    ]
});

// BEAR - Powerful solitary beast
export const BearArchetype = new EnemyArchetype({
    name: MobCharacterEnum.bear,
    gender: "NONE",
    type: CharacterType.beast,
    level: 4,
    race: RaceEnum.BEAST,
    alignment: new CharacterAlignment({ law: 0, chaos: 0, good: 0, evil: 0 }),
    HPrange: {
        min: 20,
        max: 25
    },
    MPrange: {
        min: 0,
        max: 0
    },
    SPrange: {
        min: 15,
        max: 20
    },
    attributeRange: {
        strength: {
            min: 18,
            max: 20
        },
        dexterity: {
            min: 8,
            max: 10
        },
        constitution: {
            min: 16,
            max: 18
        },
        intelligence: {
            min: 4,
            max: 5
        },
        wisdom: {
            min: 8,
            max: 10
        },
        charisma: {
            min: 5,
            max: 6
        }
    },
    proficiencyRange: {},
    battlerRange: {
        initiative: {
            min: 2,
            max: 3
        },
        pATK: {
            min: 5,
            max: 6
        },
        mATK: {
            min: 0,
            max: 0
        },
        pDEF: {
            min: 4,
            max: 5
        },
        mDEF: {
            min: 2,
            max: 3
        },
        dodge: {
            min: 1,
            max: 2
        },
        hit: {
            min: 4,
            max: 5
        }
    },
    elementRange: {},
    artisanRange: {},
    traits: [
        TraitEnum.trait_bodySize_large
    ],
    activeSkills: [
        { skillID: "skill_claw_swipe", level: 2 },
        { skillID: "skill_maul", level: 1 }
    ],
    equipments: {
        mainHand: null,
        offHand: null,
        cloth: null,
        headWear: null,
        armor: null,
        necklace: null,
        ring: null
    },
    baseACRange: {
        min: 12,
        max: 14
    },
    arcaneAptitudeRange: {
        min: 0,
        max: 0
    },
    dropList: [
        { itemID: ResourceNameEnum.resource_bear_pelt, chance: 0.9 },
        { itemID: ResourceNameEnum.resource_bear_claw, chance: 0.6 },
        { itemID: ResourceNameEnum.resource_bear_meat, chance: 0.5 }
    ]
});

// GIANT SPIDER - Poisonous, web-casting beast
export const GiantSpiderArchetype = new EnemyArchetype({
    name: MobCharacterEnum.giant_spider,
    gender: "NONE",
    type: CharacterType.beast,
    level: 3,
    race: RaceEnum.INSECT,
    alignment: new CharacterAlignment({ law: 0, chaos: 0, good: 0, evil: 0 }),
    HPrange: {
        min: 12,
        max: 15
    },
    MPrange: {
        min: 5,
        max: 8
    },
    SPrange: {
        min: 10,
        max: 12
    },
    attributeRange: {
        strength: {
            min: 12,
            max: 14
        },
        dexterity: {
            min: 16,
            max: 18
        },
        constitution: {
            min: 10,
            max: 12
        },
        intelligence: {
            min: 3,
            max: 4
        },
        wisdom: {
            min: 10,
            max: 12
        },
        charisma: {
            min: 2,
            max: 3
        }
    },
    proficiencyRange: {},
    battlerRange: {
        initiative: {
            min: 4,
            max: 6
        },
        pATK: {
            min: 3,
            max: 4
        },
        mATK: {
            min: 1,
            max: 2
        },
        pDEF: {
            min: 2,
            max: 3
        },
        mDEF: {
            min: 1,
            max: 2
        },
        dodge: {
            min: 4,
            max: 5
        },
        hit: {
            min: 5,
            max: 6
        }
    },
    elementRange: {},
    artisanRange: {},
    traits: [
        TraitEnum.trait_venomous,
        TraitEnum.trait_poison_immunity
    ],
    activeSkills: [
        { skillID: "skill_bite", level: 1 },
        { skillID: "skill_venom_spray", level: 1 },
        { skillID: "skill_web_shot", level: 1 }
    ],
    equipments: {
        mainHand: null,
        offHand: null,
        cloth: null,
        headWear: null,
        armor: null,
        necklace: null,
        ring: null
    },
    baseACRange: {
        min: 10,
        max: 12
    },
    arcaneAptitudeRange: {
        min: 1,
        max: 2
    },
    dropList: [
        { itemID: ResourceNameEnum.resource_spider_leg, chance: 0.7 },
        { itemID: ResourceNameEnum.resource_venom_sac, chance: 0.4 },
        { itemID: ResourceNameEnum.resource_spider_silk, chance: 0.5 }
    ]
});

// DIRE WOLF - Enhanced wolf, pack leader
export const DireWolfArchetype = new EnemyArchetype({
    name: MobCharacterEnum.dire_wolf,
    gender: "NONE",
    type: CharacterType.beast,
    level: 5,
    race: RaceEnum.BEAST,
    alignment: new CharacterAlignment({ law: 0, chaos: 0, good: 0, evil: 0 }),
    HPrange: {
        min: 16,
        max: 20
    },
    MPrange: {
        min: 0,
        max: 0
    },
    SPrange: {
        min: 18,
        max: 22
    },
    attributeRange: {
        strength: {
            min: 16,
            max: 18
        },
        dexterity: {
            min: 16,
            max: 18
        },
        constitution: {
            min: 14,
            max: 16
        },
        intelligence: {
            min: 6,
            max: 8
        },
        wisdom: {
            min: 12,
            max: 14
        },
        charisma: {
            min: 8,
            max: 10
        }
    },
    proficiencyRange: {},
    battlerRange: {
        initiative: {
            min: 5,
            max: 6
        },
        pATK: {
            min: 5,
            max: 6
        },
        mATK: {
            min: 0,
            max: 0
        },
        pDEF: {
            min: 3,
            max: 4
        },
        mDEF: {
            min: 2,
            max: 3
        },
        dodge: {
            min: 5,
            max: 6
        },
        hit: {
            min: 5,
            max: 6
        }
    },
    elementRange: {},
    artisanRange: {},
    traits: [
        TraitEnum.trait_bodySize_large
    ],
    activeSkills: [
        { skillID: "skill_bite", level: 2 },
        { skillID: "skill_maul", level: 1 },
        { skillID: "skill_howl", level: 2 }
    ],
    equipments: {
        mainHand: null,
        offHand: null,
        cloth: null,
        headWear: null,
        armor: null,
        necklace: null,
        ring: null
    },
    baseACRange: {
        min: 12,
        max: 14
    },
    arcaneAptitudeRange: {
        min: 0,
        max: 0
    },
    dropList: [
        { itemID: ResourceNameEnum.resource_wolf_meat, chance: 0.8 },
        { itemID: ResourceNameEnum.resource_wolf_pelt, chance: 0.5 },
        { itemID: ResourceNameEnum.resource_wolf_fang, chance: 0.2 }
    ]
});

// Export the beast enemies repository with archetypes (not instances)
export const beastEnemyRepository = [
    WolfArchetype,
    BearArchetype,
    GiantSpiderArchetype,
    DireWolfArchetype
]; 