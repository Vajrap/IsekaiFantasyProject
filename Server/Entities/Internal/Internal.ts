import { PassiveStatusBonus } from '../BonusEffect/PassiveStatusBonus';
import { InternalLearningRequirement } from './InternalLearningRequirement';
import { Tier } from '../../../Common/DTOsEnumsInterfaces/Tier';
import { TraitRepository } from '../Traits/Trait';

export class Internal {
    id: string;
    name: string;
    description: string;
    requirement: InternalLearningRequirement;
    passiveBonus: PassiveStatusBonus[];
    activeEffect: string[];
    growth: InternalGrowth;
    tier: Tier;

    constructor(
        id: string, 
        name: string, 
        description: string,
        requirement: InternalLearningRequirement, 
        passiveBonus: PassiveStatusBonus[], 
        activeEffect: string[],
        tier: Tier
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.requirement = requirement;
        this.passiveBonus = passiveBonus;
        this.activeEffect = activeEffect;
        this.growth = InternalGrowthManager.getGrowth(tier);
        this.tier = tier;
    }

    neededExp(level: number): number {     
        return level < this.growth.expNeeded.length ? this.growth.expNeeded[level - 1] : Infinity;
    }

    getInternalActiveTraits(internalLevel: number): string[] {
        if (internalLevel <= 3) {
            return [];
        }
        let bonusLevelIndex = 0;
        if (internalLevel > 3 && internalLevel <= 6) {
            bonusLevelIndex = 0;
        } else if (internalLevel > 6 && internalLevel <= 9) {
            bonusLevelIndex = 1;
        } else if (internalLevel > 9 && internalLevel <= 14) {
            bonusLevelIndex = 2;
        } else if (internalLevel > 14 && internalLevel <= 19) {
            bonusLevelIndex = 3;
        } else if (internalLevel > 19 && internalLevel <= 24) {
            bonusLevelIndex = 4;
        } else if (internalLevel > 24 && internalLevel <= 29) {
            bonusLevelIndex = 5;
        } else if (internalLevel === 30) {
            bonusLevelIndex = 6;
        }

        return [this.activeEffect[bonusLevelIndex]];
    }
}

class InternalGrowth {
    maxLevel: number;
    expNeeded: number[];

    constructor(maxLevel: number, expNeeded: number[]) {
        this.maxLevel = maxLevel;
        this.expNeeded = expNeeded;
    }
}

class InternalGrowthManager {
    static commonGrowth = new InternalGrowth(10, [
        50, 100, 150, 200, 250, // Level 1-5
        300, 350, 400, 450, 500  // Level 6-10
    ]);

    static uncommonGrowth = new InternalGrowth(10, [
        70, 140, 210, 280, 350, // Level 1-5
        420, 490, 560, 630, 700  // Level 6-10
    ]);

    static rareGrowth = new InternalGrowth(15, [
        200, 400, 600, 800, 1000,  // Level 1-5
        1200, 1400, 1600, 1800, 2000, // Level 6-10
        2200, 2400, 2600, 2800, 3000  // Level 11-15
    ]);

    static epicGrowth = new InternalGrowth(15, [
        250, 500, 750, 1000, 1250, // Level 1-5
        1500, 1750, 2000, 2250, 2500, // Level 6-10
        2750, 3000, 3250, 3500, 3750  // Level 11-15
    ]);

    static legendaryGrowth = new InternalGrowth(20, [
        300, 600, 900, 1200, 1500,  // Level 1-5
        1800, 2100, 2400, 2700, 3000, // Level 6-10
        3300, 3600, 3900, 4200, 4500, // Level 11-15
        4800, 5100, 5400, 5700, 6000  // Level 16-20
    ]);

    static uniqueGrowth = new InternalGrowth(20, [
        350, 700, 1050, 1400, 1750, // Level 1-5
        2100, 2450, 2800, 3150, 3500, // Level 6-10
        3850, 4200, 4550, 4900, 5250, // Level 11-15
        5600, 5950, 6300, 6650, 7000  // Level 16-20
    ]);

    static divineGrowth = new InternalGrowth(30, [
        1000, 2000, 3000, 4000, 5000, // Level 1-5
        6000, 7000, 8000, 9000, 10000, // Level 6-10
        11000, 12000, 13000, 14000, 15000, // Level 11-15
        16000, 17000, 18000, 19000, 20000, // Level 16-20
        21000, 22000, 23000, 24000, 25000, // Level 21-25
        26000, 27000, 28000, 29000, 30000  // Level 26-30
    ]);

    static getGrowth(tier: Tier): InternalGrowth {
        switch (tier) {
            case Tier.common:
                return this.commonGrowth;
            case Tier.uncommon:
                return this.uncommonGrowth;
            case Tier.rare:
                return this.rareGrowth;
            case Tier.epic:
                return this.epicGrowth;
            case Tier.legendary:
                return this.legendaryGrowth;
            case Tier.unique:
                return this.uniqueGrowth;
            case Tier.divine:
                return this.divineGrowth;
            default:
                throw new Error('Invalid internal tier.');
        }
    }
}

//Internal skills rules
//Common Rarity: Internal skills of rarity class common. (max level = 10)
//1. PassiveStatusBonus: Each level on Internal skill will give 3 points of passive bonus to the character based on elemetal attribute.
//2. At level 5 and 10 the PassiveStatusBonus given is 7 points which means addition 4 points.
//3. ActiveStatusBonus and ActiveEffect: Internal have 3 levels of active bonus and active effect.
//4. Internal level 1-3: ActiveStatusBonus and ActiveEffect are not available.
//5. Internal level 4-6: ActiveStatusBonus and ActiveEffect level 1 [index 0].
//6. Internal level 7-9: ActiveStatusBonus and ActiveEffect level 2 [index 1].
//7. Internal level 10: ActiveStatusBonus and ActiveEffect level 3 [index 2].
//8. ActiveStatusBonus Level 1, 2, 3: will give 5, 10, 15 points of bonus respectively.

//Uncommon Rarity: Internal skills of rarity class uncommon. (max level = 10)
//1. PassiveStatusBonus: Each level on Internal skill will give 4 points of passive bonus to the character based on elemetal attribute.
//2. At level 5 and 10 the PassiveStatusBonus given is 9 points which means addition 5 points.
//3. ActiveStatusBonus and ActiveEffect: Internal have 3 levels of active bonus and active effect.
//4. Internal level 1-3: ActiveStatusBonus and ActiveEffect are not available.
//5. Internal level 4-6: ActiveStatusBonus and ActiveEffect level 1 [index 0].
//6. Internal level 7-9: ActiveStatusBonus and ActiveEffect level 2 [index 1].
//7. Internal level 10: ActiveStatusBonus and ActiveEffect level 3 [index 2].
//8. ActiveStatusBonus Level 1, 2, 3: will give 7, 14, 21 points of bonus respectively.

//Rare Rarity: Internal skills of rarity class rare. (max level = 15)
//1. PassiveStatusBonus: Each level on Internal skill will give 4 points of passive bonus to the character based on elemetal attribute.
//2. At level 5, 10 and 15 the PassiveStatusBonus given is 9 points which means addition 5 points.
//3. ActiveStatusBonus and ActiveEffect: Internal have 4 levels of active bonus and active effect.
//4. Internal level 1-3: ActiveStatusBonus and ActiveEffect are not available.
//5. Internal level 4-6: ActiveStatusBonus and ActiveEffect level 1 [index 0].
//6. Internal level 7-9: ActiveStatusBonus and ActiveEffect level 2 [index 1].
//7. Internal level 10-14: ActiveStatusBonus and ActiveEffect level 3 [index 2].
//8. Internal level 15: ActiveStatusBonus and ActiveEffect level 4 [index 3].
//9. ActiveStatusBonus Level 1, 2, 3, 4: will give 7, 14, 21, 28 points of bonus respectively.
//We can see that Rare is just an upgrade from Uncommon, the only difference is the max level and the number of active bonus and effect.

//Epic Rarity: Internal skills of rarity class epic. (max level = 15)
//1. PassiveStatusBonus: Each level on Internal skill will give 5 points of passive bonus to the character based on elemetal attribute.
//2. At level 5, 10 and 15 the PassiveStatusBonus given is 11 points which means addition 6 points.
//3. ActiveStatusBonus and ActiveEffect: Internal have 4 levels of active bonus and active effect.
//4. Internal level 1-3: ActiveStatusBonus and ActiveEffect are not available.
//5. Internal level 4-6: ActiveStatusBonus and ActiveEffect level 1 [index 0].
//6. Internal level 7-9: ActiveStatusBonus and ActiveEffect level 2 [index 1].
//7. Internal level 10-14: ActiveStatusBonus and ActiveEffect level 3 [index 2].
//8. Internal level 15: ActiveStatusBonus and ActiveEffect level 4 [index 3].
//9. ActiveStatusBonus Level 1, 2, 3, 4: will give 9, 18, 27, 36 points of bonus respectively.
//Epic is the real upgrage from lower tier, the passive bonus is increased by 1 point and the active bonus and effect is increased by 2 points.

//Legendary Rarity: Internal skills of rarity class legendary. (max level = 20)
//1. PassiveStatusBonus: Each level on Internal skill will give 5 points of passive bonus to the character based on elemetal attribute.
//2. At level 5, 10, 15 and 20 the PassiveStatusBonus given is 11 points which means addition 6 points.
//3. ActiveStatusBonus and ActiveEffect: Internal have 5 levels of active bonus and active effect.
//4. Internal level 1-3: ActiveStatusBonus and ActiveEffect are not available.
//5. Internal level 4-6: ActiveStatusBonus and ActiveEffect level 1 [index 0].
//6. Internal level 7-9: ActiveStatusBonus and ActiveEffect level 2 [index 1].
//7. Internal level 10-14: ActiveStatusBonus and ActiveEffect level 3 [index 2].
//8. Internal level 15-19: ActiveStatusBonus and ActiveEffect level 4 [index 3].
//9. Internal level 20: ActiveStatusBonus and ActiveEffect level 5 [index 4].
//10. ActiveStatusBonus Level 1, 2, 3, 4, 5: will give 11, 22, 33, 44, 55 points of bonus respectively.

//Unique Rarity: Internal skills of rarity class unique. (max level = 20)
//1. PassiveStatusBonus: Each level on Internal skill will give 6 points of passive bonus to the character based on elemetal attribute.
//2. At level 5, 10, 15 and 20 the PassiveStatusBonus given is 13 points which means addition 7 points.
//3. ActiveStatusBonus and ActiveEffect: Internal have 5 levels of active bonus and active effect.
//4. Internal level 1-3: ActiveStatusBonus and ActiveEffect are not available.
//5. Internal level 4-6: ActiveStatusBonus and ActiveEffect level 1 [index 0].
//6. Internal level 7-9: ActiveStatusBonus and ActiveEffect level 2 [index 1].
//7. Internal level 10-14: ActiveStatusBonus and ActiveEffect level 3 [index 2].
//8. Internal level 15-19: ActiveStatusBonus and ActiveEffect level 4 [index 3].
//9. Internal level 20: ActiveStatusBonus and ActiveEffect level 5 [index 4].
//10. ActiveStatusBonus Level 1, 2, 3, 4, 5: will give 11, 22, 33, 44, 55 points of bonus respectively.

//Divine Rarity: Internal skills of rarity class divine. (max level = 30)
//1. PassiveStatusBonus: Each level on Internal skill will give 6 points of passive bonus to the character based on elemetal attribute.
//2. At level 5, 10, 15, 20, 25 and 30 the PassiveStatusBonus given is 13 points which means addition 7 points.
//3. ActiveStatusBonus and ActiveEffect: Internal have 6 levels of active bonus and active effect.
//4. Internal level 1-3: ActiveStatusBonus and ActiveEffect are not available.
//5. Internal level 4-6: ActiveStatusBonus and ActiveEffect level 1 [index 0].
//6. Internal level 7-9: ActiveStatusBonus and ActiveEffect level 2 [index 1].
//7. Internal level 10-14: ActiveStatusBonus and ActiveEffect level 3 [index 2].
//8. Internal level 15-19: ActiveStatusBonus and ActiveEffect level 4 [index 3].
//9. Internal level 20-24: ActiveStatusBonus and ActiveEffect level 5 [index 4].
//10. Internal level 25-29: ActiveStatusBonus and ActiveEffect level 6 [index 5].
//11. Internal level 30: ActiveStatusBonus and ActiveEffect level 7 [index 6].
//12. ActiveStatusBonus Level 1, 2, 3, 4, 5, 6, 7: will give 11, 22, 33, 44, 55, 66, 77 points of bonus respectively.

//Elemental and attributes connection - adjacent elements
//1.Order: Charisma, Luck: adjacent to Geo and Water.
//2.Water: Breath, Planar: adjacent to Order and Air.
//3.Air: Agility, Dexterity: adjacent to Water and Chaos.
//4.Chaos: Intelligence, Leadership: adjacent to Air and Fire.
//5.Fire: Strength, Endurance: adjacent to Chaos and Geo.
//6.Geo: Vitality, Willpower: adjacent to Fire and Order.

export const internalHarmony = new Internal(
    'internalHarmony',
    'Basic Breathing Technique(Harmony)',
    'The very basic of breathing technique, foundation of all internal skills, focus on balancing both the warm and cold energy in the body.',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 2, planar: 1, vitality: 2, strength: 1, breath: 1}),
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 1, planar: 1, vitality: 1}),
        new PassiveStatusBonus({dexterity: 2, planar: 1, vitality: 2, strength: 1, breath: 1})
    ],
    [
        TraitRepository.trait_inner_harmony_01.id,
        TraitRepository.trait_inner_harmony_02.id,
        TraitRepository.trait_inner_harmony_03.id
    ],
    Tier.common
)

//Warm would give Strength, Endurance, and Breath
export const internalWarm = new Internal(
    'internalWarm',
    'Warm Breathing Technique',
    'A Breathing technique where one focus on the warm element in their body.',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 2, endurance: 1, intelligence: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({breath: 1, strength: 2, endurance: 1, intelligence: 1, vitality: 1, willpower: 1}),
    ],
    //activeEffect
    [
        TraitRepository.trait_inner_warm_01.id,
        TraitRepository.trait_inner_warm_02.id,
        TraitRepository.trait_inner_warm_03.id
    ],
    Tier.common
)

//Cold would give Breath, Charisma, and Planar
export const internalCold = new Internal(
    'internalCold',
    'Cold Breathing Technique',
    'A Breathing technique where one focus on the cold element in their body.',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 2, planar: 1, intelligence: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 1, planar: 1}),
        new PassiveStatusBonus({breath: 1, charisma: 2, planar: 1, intelligence: 1, agility: 1, dexterity: 1}),
    ],
    //activeEffect
    [
        TraitRepository.trait_inner_cold_01.id,
        TraitRepository.trait_inner_cold_02.id,
        TraitRepository.trait_inner_cold_03.id
    ],
    Tier.common
)

export const internal_none_01 = new Internal(
    'internal_none_01',
    'None',
    'No internal skill',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({}),
        new PassiveStatusBonus({})
    ],
    //activeEffect
    [],
    Tier.common
)

export const internal_order_01 = new Internal(
    'internal_order_01',
    'Lectio Divina',
    'Focusing on the divine order of the universe, the character gain insight about the world and the divine. This internal boosts charisma and vitality, and if activated, it grants a bonus to mDEF and pDEF. Also gain special bonus on healing skills',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1, vitality: 1, willpower: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1}),
        new PassiveStatusBonus({order: 1, charisma: 1, luck: 1, vitality: 1, willpower: 1, breath: 1, planar: 1}),
    ],
    //activeEffect
    [
        // K.buffsAndDebuffs.lectioDivina_01,
        // K.buffsAndDebuffs.lectioDivina_02,
        // K.buffsAndDebuffs.lectioDivina_03
    ],
    Tier.common
)

export const internal_water_01 = new Internal(
    'internal_water_01',
    'Aqua Vitae',
    'The character learns the ancient technique of breathing water energy to manipulate the world. This internal boosts water and breath, and if activated, it grants a bonus to mDEF and mHIT. Also gain special bonus on healing skills',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1, charisma: 1, luck: 1, dexterity: 1, agility: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({water: 1, breath: 1, planar: 1, charisma: 1, luck: 1, dexterity: 1, agility: 1}),
    ],
    //activeEffect
    [
        // K.buffsAndDebuffs.aquaVitae_01,
        // K.buffsAndDebuffs.aquaVitae_02,
        // K.buffsAndDebuffs.aquaVitae_03
    ],
    Tier.common
)

export const internal_air_01 = new Internal(
    'internal_air_01',
    'Aeromancy',
    'The character learns the ancient technique of breathing air energy to manipulate the world. This internal boosts air and agility, and if activated, it grants a bonus to pDEF and dodge. Also gain special bonus on debuff skills',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1, breath: 1, planar: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1}),
        new PassiveStatusBonus({air: 1, agility: 1, dexterity: 1, breath: 1, planar: 1, intelligence: 1, leadership: 1}),
    ],
    //activeEffect
    [
        // K.buffsAndDebuffs.aeromancy_01,
        // K.buffsAndDebuffs.aeromancy_02,
        // K.buffsAndDebuffs.aeromancy_03
    ],
    Tier.common
)

export const internal_chaos_01 = new Internal(
    'internal_chaos_01',
    'Eldrtich hex breathing technique',
    //Main attribute in chaos: Intelligence -> Leadership, sub stats for this one would be str, dex
    'The character learns the ancient technique of breathing chaos energy to manipulate the world. This internal boosts chaos and intelligence, and if activated, it grants a bonus to mATK and mCRT. Also gain special bonus on debuff skills',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1, strength: 1, endurance: 1, dexterity: 1, agility: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1}),
        new PassiveStatusBonus({chaos: 1, intelligence: 1, leadership: 1, strength: 1, endurance: 1, dexterity: 1, agility: 1}),
    ],
    //activeEffect
    [
        // K.buffsAndDebuffs.eldritchHexBreathingTechnique_01,
        // K.buffsAndDebuffs.eldritchHexBreathingTechnique_02,
        // K.buffsAndDebuffs.eldritchHexBreathingTechnique_03
    ],
    Tier.common
)

export const internal_fire_01 = new Internal(
    'internal_fire_01',
    'Fighting Spirit',
    `A technique that focus on how to stand firm in a battle field.`,
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1, intelligence: 1, leadership: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, strength: 1, endurance: 1, intelligence: 1, leadership: 1, vitality: 1, willpower: 1}),
    ],
    //activeEffect
    [
        // K.buffsAndDebuffs.pyromancy_01,
        // K.buffsAndDebuffs.pyromancy_02,
        // K.buffsAndDebuffs.pyromancy_03
    ],
    Tier.common
)


export const internal_fire_02 = new Internal(
    'internal_fire_02',
    'Inner Fire',
    'A Breathing technique where one focus on the fire element in their body.',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 2, planar: 1, intelligence: 1, vitality: 1, endurance: 1}),
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 1, planar: 1}),
        new PassiveStatusBonus({fire: 1, breath: 2, planar: 1, intelligence: 1, vitality: 1, endurance: 1}),
    ],
    //activeEffect
    [
        // K.buffsAndDebuffs.innerFire_01,
        // K.buffsAndDebuffs.innerFire_02,
        // K.buffsAndDebuffs.innerFire_03
    ],
    Tier.common
)


export const internal_geo_01 = new Internal(
    'internal_geo_01',
    'Forest Breeze',
    'The character learns the ancient technique of breathing earth energy to manipulate the world. This internal boosts geo and vitality, and if activated, it grants a bonus to pDEF and mDEF. Also gain special bonus on healing skills',
    new InternalLearningRequirement(
        [], 0
    ),
    //passiveBonus
    [
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1, charisma: 1, luck: 1, strength: 1, endurance: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1}),
        new PassiveStatusBonus({geo: 1, vitality: 1, willpower: 1, charisma: 1, luck: 1, strength: 1, endurance: 1}),
    ],
    //activeEffect
    [
        // K.buffsAndDebuffs.geomancy_01,
        // K.buffsAndDebuffs.geomancy_02,
        // K.buffsAndDebuffs.geomancy_03
    ],
    Tier.common
)

export const InternalRepository = {
    'internalHarmony': internalHarmony,
    'internalCold': internalCold,
    'internalWarm': internalWarm,
    'internal_air_01': internal_air_01,
    'internal_chaos_01': internal_chaos_01,
    'internal_fire_01': internal_fire_01,
    'internal_fire_02': internal_fire_02,
    'internal_geo_01': internal_geo_01,
    'internal_none_01': internal_none_01,
    'internal_order_01': internal_order_01,
    'internal_water_01': internal_water_01
};