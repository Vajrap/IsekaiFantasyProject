import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Wand_Magic, Wand_Scepter } from "./Wand";
const wand_magic = new Wand_Magic({
    id: WeaponEnum.wand_magic,
    name: 'Magic Wand',
    description: 'A basic wand for novice spellcasters.',
    image: 'wand_magic.jpg',
    cost: new ItemCost(50, 0, 0.2), // 5 Silver
    weight: 200, // 0.2 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Wood',
    specialTrait: [], // TODO: Add traits like "Boost arcane spell damage"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});
const wand_magic_one = new Wand_Magic({
    id: WeaponEnum.wand_magic_one,
    name: 'Magic Wand + 1',
    description: 'A finely crafted wand with enhanced magical conductivity.',
    image: 'wand_magic_one.jpg',
    cost: new ItemCost(50, 25, 0.2), // 5 Silver + 2.5 Silver
    weight: 200, // 0.2 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Wood',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
const wand_magic_two = new Wand_Magic({
    id: WeaponEnum.wand_magic_two,
    name: 'Magic Wand + 2',
    description: 'A masterfully crafted wand with exceptional magical conductivity and focus.',
    image: 'wand_magic_two.jpg',
    cost: new ItemCost(50, 50, 0.2), // 5 Silver + 5 Silver
    weight: 200, // 0.2 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Wood',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD8, // Upgraded from 1d6 to 1d8
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
const wand_scepter = new Wand_Scepter({
    id: WeaponEnum.wand_scepter,
    name: 'Scepter',
    description: 'An ornate wand used by skilled spellcasters.',
    image: 'wand_scepter.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
    weight: 800, // 0.8 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Gold and Crystal',
    specialTrait: [], // TODO: Add traits like "Reduce mana cost of spells"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});
const wand_scepter_one = new Wand_Scepter({
    id: WeaponEnum.wand_scepter_one,
    name: 'Scepter + 1',
    description: 'A finely crafted scepter with enhanced magical conductivity.',
    image: 'wand_scepter_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 800, // 0.8 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Gold and Crystal',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
const wand_scepter_two = new Wand_Scepter({
    id: WeaponEnum.wand_scepter_two,
    name: 'Scepter + 2',
    description: 'A masterfully crafted scepter with exceptional magical conductivity and focus.',
    image: 'wand_scepter_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 800, // 0.8 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Gold and Crystal',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
// Export the repository for all wands
export const wandRepository = {
    wand_magic,
    wand_magic_one,
    wand_magic_two,
    wand_scepter,
    wand_scepter_one,
    wand_scepter_two
};
