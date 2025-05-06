import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Spear_Dory, Spear_Halberd, Spear_Javelin } from "./Spear";

const spear_dory = new Spear_Dory({
    id: WeaponEnum.spear_dory,
    name: 'Dory',
    description: 'A traditional spear used by infantry soldiers.',
    image: 'spear_dory.jpg',
    cost: new ItemCost(50, 0, 0.2), // 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Increased reach"
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const spear_dory_one = new Spear_Dory({
    id: WeaponEnum.spear_dory_one,
    name: 'Dory + 1',
    description: 'A well-crafted infantry spear with improved balance.',
    image: 'spear_dory_one.jpg',
    cost: new ItemCost(50, 25, 0.2), // 5 Silver + 2.5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const spear_dory_two = new Spear_Dory({
    id: WeaponEnum.spear_dory_two,
    name: 'Dory + 2',
    description: 'A masterfully crafted infantry spear with perfect weight distribution and a razor-sharp tip.',
    image: 'spear_dory_two.jpg',
    cost: new ItemCost(50, 50, 0.2), // 5 Silver + 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const spear_javelin = new Spear_Javelin({
    id: WeaponEnum.spear_javelin,
    name: 'Javelin',
    description: 'A lightweight spear designed for throwing.',
    image: 'spear_javelin.jpg',
    cost: new ItemCost(30, 0, 0.2), // 3 Silver
    weight: 1500, // 1.5 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Improved throwing accuracy"
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.both,
        handle: 1
    },
    defenseStats: {}
});

const spear_javelin_one = new Spear_Javelin({
    id: WeaponEnum.spear_javelin_one,
    name: 'Javelin + 1',
    description: 'A well-balanced lightweight spear with improved aerodynamics.',
    image: 'spear_javelin_one.jpg',
    cost: new ItemCost(30, 15, 0.2), // 3 Silver + 1.5 Silver
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.both,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const spear_javelin_two = new Spear_Javelin({
    id: WeaponEnum.spear_javelin_two,
    name: 'Javelin + 2',
    description: 'A perfectly balanced lightweight spear with exceptional aerodynamics and a razor-sharp tip.',
    image: 'spear_javelin_two.jpg',
    cost: new ItemCost(30, 30, 0.2), // 3 Silver + 3 Silver
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8, // Upgraded from 1d6 to 1d8
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.both,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const spear_halberd = new Spear_Halberd({
    id: WeaponEnum.spear_halberd,
    name: 'Halberd',
    description: 'A long polearm with an axe blade for versatile combat.',
    image: 'spear_halberd.jpg',
    cost: new ItemCost(100, 0, 0.2), // 1 Gold
    weight: 3500, // 3.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Improved anti-armor effectiveness"
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.TwoD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -2
    },
    defenseStats: {}
});

const spear_halberd_one = new Spear_Halberd({
    id: WeaponEnum.spear_halberd_one,
    name: 'Halberd + 1',
    description: 'A well-crafted polearm with excellent weight distribution.',
    image: 'spear_halberd_one.jpg',
    cost: new ItemCost(100, 50, 0.2), // 1 Gold + 5 Silver
    weight: 3500, // 3.5 kg
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
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});

const spear_halberd_two = new Spear_Halberd({
    id: WeaponEnum.spear_halberd_two,
    name: 'Halberd + 2',
    description: 'A masterfully crafted polearm with perfect balance and a razor-sharp edge.',
    image: 'spear_halberd_two.jpg',
    cost: new ItemCost(100, 100, 0.2), // 1 Gold + 1 Gold
    weight: 3500, // 3.5 kg
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
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.dexterity,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});

// Export the repository for all spears
export const spearRepository = {
    spear_dory,
    spear_dory_one,
    spear_dory_two,
    spear_javelin,
    spear_javelin_one,
    spear_javelin_two,
    spear_halberd,
    spear_halberd_one,
    spear_halberd_two
};