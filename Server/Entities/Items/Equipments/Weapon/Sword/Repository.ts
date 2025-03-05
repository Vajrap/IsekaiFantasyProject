import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Sword_Great, Sword_Long, Sword_Rapier, Sword_Short } from "./Sword";

const sword_short = new Sword_Short({
    id: WeaponEnum.sword_short,
    name: 'Short Sword',
    description: 'A short sword.',
    image: 'sword_short.jpg',
    cost: new ItemCost(5, 0, 0.2), // 5 Silver
    weight: 1000, // 1 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const sword_long = new Sword_Long({
    id: WeaponEnum.sword_long,
    name: 'Long Sword',
    description: 'A longer blade for greater reach.',
    image: 'sword_long.jpg',
    cost: new ItemCost(10, 0, 0.2), // 1 Gold
    weight: 1500, // 1.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const sword_great = new Sword_Great({
    id: WeaponEnum.sword_great,
    name: 'Great Sword',
    description: 'A massive two-handed sword for devastating blows.',
    image: 'sword_great.jpg',
    cost: new ItemCost(20, 0, 0.2), // 2 Gold
    weight: 3000, // 3 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.TwoD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -2
    },
    defenseStats: {}
});

const sword_rapier = new Sword_Rapier({
    id: WeaponEnum.sword_rapier,
    name: 'Rapier',
    description: 'A thin, precise blade for quick thrusts.',
    image: 'sword_rapier.jpg',
    cost: new ItemCost(15, 0, 0.2), // 1 Gold, 5 Silver
    weight: 1200, // 1.2 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

// Export the repository for all swords
export const swordRepository = {
    sword_short,
    sword_long,
    sword_great,
    sword_rapier
};