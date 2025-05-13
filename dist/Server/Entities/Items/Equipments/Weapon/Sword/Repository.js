import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Sword_Great, Sword_Long, Sword_Rapier, Sword_Short } from "./Sword";
const sword_short = new Sword_Short({
    id: WeaponEnum.sword_short,
    name: 'Short Sword',
    description: 'A short sword.',
    image: 'sword_short.jpg',
    cost: new ItemCost(50, 0, 0.2), // 5 Silver
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
const sword_short_one = new Sword_Short({
    id: WeaponEnum.sword_short_one,
    name: 'Short Sword + 1',
    description: 'A good short sword, with +1 to hit.',
    image: 'sword_short_one.jpg',
    cost: new ItemCost(50, 25, 0.2), // 5 Silver + 2.5 Silver
    weight: 1000, // 1 kg
    tier: Tier.uncommon,
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
        handle: 1,
        physicalHitModifier: 1,
    },
    defenseStats: {}
});
const sword_short_two = new Sword_Short({
    id: WeaponEnum.sword_short_two,
    name: 'Short Sword + 2',
    description: 'A good short sword, sharper than the average short sword.',
    image: 'sword_short_two.jpg',
    cost: new ItemCost(50, 50, 0.2), // 5 Silver + 5 Silver
    weight: 1000, // 1 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1,
    },
    defenseStats: {}
});
const sword_long = new Sword_Long({
    id: WeaponEnum.sword_long,
    name: 'Long Sword',
    description: 'A longer blade for greater reach.',
    image: 'sword_long.jpg',
    cost: new ItemCost(100, 0, 0.2), // 1 Gold
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
const sword_long_one = new Sword_Long({
    id: WeaponEnum.sword_long_one,
    name: 'Long Sword + 1',
    description: 'A longer blade for greater reach, with +1 to hit.',
    image: 'sword_long_one.jpg',
    cost: new ItemCost(100, 50, 0.2), // 1 Gold + 5 Silver
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
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
        handle: 1,
        physicalHitModifier: 1,
    },
    defenseStats: {}
});
const sword_long_two = new Sword_Long({
    id: WeaponEnum.sword_long_two,
    name: 'Long Sword + 2',
    description: 'A longer blade for greater reach and a sharper edge, with +1 to hit.',
    image: 'sword_long_two.jpg',
    cost: new ItemCost(100, 100, 0.2), // 1 Gold + 1 Gold
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1,
    },
    defenseStats: {}
});
const sword_great = new Sword_Great({
    id: WeaponEnum.sword_great,
    name: 'Great Sword',
    description: 'A massive two-handed sword for devastating blows.',
    image: 'sword_great.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
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
const sword_great_one = new Sword_Great({
    id: WeaponEnum.sword_great_one,
    name: 'Great Sword + 1',
    description: 'A massive two-handed sword for devastating blows, with +1 to hit.',
    image: 'sword_great_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 3000, // 3 kg
    tier: Tier.uncommon,
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
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});
const sword_great_two = new Sword_Great({
    id: WeaponEnum.sword_great_two,
    name: 'Great Sword + 2',
    description: 'A massive two-handed sword with exceptional balance and a razor-sharp edge.',
    image: 'sword_great_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 3000, // 3 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.TwoD8, // Upgraded from 2d6 to 2d8
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});
const sword_rapier = new Sword_Rapier({
    id: WeaponEnum.sword_rapier,
    name: 'Rapier',
    description: 'A thin, precise blade for quick thrusts.',
    image: 'sword_rapier.jpg',
    cost: new ItemCost(150, 0, 0.2), // 1 Gold, 5 Silver
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
const sword_rapier_one = new Sword_Rapier({
    id: WeaponEnum.sword_rapier_one,
    name: 'Rapier + 1',
    description: 'A thin, precise blade for quick thrusts with exceptional balance.',
    image: 'sword_rapier_one.jpg',
    cost: new ItemCost(150, 75, 0.2), // 1 Gold 5 Silver + 7.5 Silver
    weight: 1200, // 1.2 kg
    tier: Tier.uncommon,
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
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const sword_rapier_two = new Sword_Rapier({
    id: WeaponEnum.sword_rapier_two,
    name: 'Rapier + 2',
    description: 'An expertly crafted rapier with perfect balance and a deadly tip.',
    image: 'sword_rapier_two.jpg',
    cost: new ItemCost(150, 150, 0.2), // 1 Gold 5 Silver + 1 Gold 5 Silver
    weight: 1200, // 1.2 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10, // Upgraded from d8 to d10
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
// Export the repository for all swords
export const swordRepository = {
    sword_short,
    sword_short_one,
    sword_short_two,
    sword_long,
    sword_long_one,
    sword_long_two,
    sword_great,
    sword_great_one,
    sword_great_two,
    sword_rapier,
    sword_rapier_one,
    sword_rapier_two
};
