import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Bow_Long, Bow_Short, Bow_Cross } from "./Bow";
const bow_long = new Bow_Long({
    id: WeaponEnum.bow_long,
    name: 'Long Bow',
    description: 'A powerful bow for long-range attacks.',
    image: 'bow_long.jpg',
    cost: new ItemCost(150, 0, 0.2), // 1 Gold, 5 Silver
    weight: 1500, // 1.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2
    },
    defenseStats: {}
});
const bow_long_one = new Bow_Long({
    id: WeaponEnum.bow_long_one,
    name: 'Long Bow + 1',
    description: 'A finely crafted long bow with improved accuracy.',
    image: 'bow_long_one.jpg',
    cost: new ItemCost(150, 75, 0.2), // 1 Gold 5 Silver + 7.5 Silver
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const bow_long_two = new Bow_Long({
    id: WeaponEnum.bow_long_two,
    name: 'Long Bow + 2',
    description: 'A masterfully crafted long bow with exceptional power and accuracy.',
    image: 'bow_long_two.jpg',
    cost: new ItemCost(150, 150, 0.2), // 1 Gold 5 Silver + 1 Gold 5 Silver
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const bow_short = new Bow_Short({
    id: WeaponEnum.bow_short,
    name: 'Short Bow',
    description: 'A compact bow for quick attacks.',
    image: 'bow_short.jpg',
    cost: new ItemCost(100, 0, 0.2), // 1 Gold
    weight: 1200, // 1.2 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2
    },
    defenseStats: {}
});
const bow_short_one = new Bow_Short({
    id: WeaponEnum.bow_short_one,
    name: 'Short Bow + 1',
    description: 'A finely crafted short bow with improved accuracy.',
    image: 'bow_short_one.jpg',
    cost: new ItemCost(100, 50, 0.2), // 1 Gold + 5 Silver
    weight: 1200, // 1.2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const bow_short_two = new Bow_Short({
    id: WeaponEnum.bow_short_two,
    name: 'Short Bow + 2',
    description: 'A masterfully crafted short bow with exceptional power and accuracy.',
    image: 'bow_short_two.jpg',
    cost: new ItemCost(100, 100, 0.2), // 1 Gold + 1 Gold
    weight: 1200, // 1.2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8, // Upgraded from 1d6 to 1d8
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const bow_cross = new Bow_Cross({
    id: WeaponEnum.bow_cross,
    name: 'Crossbow',
    description: 'A mechanically assisted bow for precise shots.',
    image: 'bow_cross.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
    weight: 2500, // 2.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood and steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2
    },
    defenseStats: {}
});
const bow_cross_one = new Bow_Cross({
    id: WeaponEnum.bow_cross_one,
    name: 'Crossbow + 1',
    description: 'A finely crafted crossbow with improved accuracy.',
    image: 'bow_cross_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 2500, // 2.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood and steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const bow_cross_two = new Bow_Cross({
    id: WeaponEnum.bow_cross_two,
    name: 'Crossbow + 2',
    description: 'A masterfully crafted crossbow with exceptional power and pinpoint accuracy.',
    image: 'bow_cross_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 2500, // 2.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood and steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
// Export the repository for all bows
export const bowRepository = {
    bow_long,
    bow_long_one,
    bow_long_two,
    bow_short,
    bow_short_one,
    bow_short_two,
    bow_cross,
    bow_cross_one,
    bow_cross_two
};
