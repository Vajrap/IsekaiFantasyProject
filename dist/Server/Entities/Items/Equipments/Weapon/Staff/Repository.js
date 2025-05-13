import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Staff_Long, Staff_Magic, Staff_Quarter } from "./Staff";
const staff_quarter = new Staff_Quarter({
    id: WeaponEnum.staff_quarter,
    name: 'Quarterstaff',
    description: 'A simple wooden staff used for self-defense.',
    image: 'staff_quarter.jpg',
    cost: new ItemCost(50, 0, 0.2), // 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [], // TODO: Add traits like "Improved block chance"
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});
const staff_quarter_one = new Staff_Quarter({
    id: WeaponEnum.staff_quarter_one,
    name: 'Quarterstaff + 1',
    description: 'A well-balanced wooden staff with reinforced striking ends.',
    image: 'staff_quarter_one.jpg',
    cost: new ItemCost(50, 25, 0.2), // 5 Silver + 2.5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const staff_quarter_two = new Staff_Quarter({
    id: WeaponEnum.staff_quarter_two,
    name: 'Quarterstaff + 2',
    description: 'A masterfully crafted wooden staff with perfect balance and reinforced striking surfaces.',
    image: 'staff_quarter_two.jpg',
    cost: new ItemCost(50, 50, 0.2), // 5 Silver + 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8, // Upgraded from 1d6 to 1d8
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const staff_long = new Staff_Long({
    id: WeaponEnum.staff_long,
    name: 'Long Staff',
    description: 'A long staff for extended reach.',
    image: 'staff_long.jpg',
    cost: new ItemCost(80, 0, 0.2), // 8 Silver
    weight: 2500, // 2.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [], // TODO: Add traits like "Improved reach"
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.TwoD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.melee,
        handle: 2
    },
    defenseStats: {}
});
const staff_long_one = new Staff_Long({
    id: WeaponEnum.staff_long_one,
    name: 'Long Staff + 1',
    description: 'A well-balanced long staff with reinforced striking ends.',
    image: 'staff_long_one.jpg',
    cost: new ItemCost(80, 40, 0.2), // 8 Silver + 4 Silver
    weight: 2500, // 2.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.TwoD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const staff_long_two = new Staff_Long({
    id: WeaponEnum.staff_long_two,
    name: 'Long Staff + 2',
    description: 'A masterfully crafted long staff with perfect balance and reinforced striking surfaces.',
    image: 'staff_long_two.jpg',
    cost: new ItemCost(80, 80, 0.2), // 8 Silver + 8 Silver
    weight: 2500, // 2.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.TwoD8, // Upgraded from 2d6 to 2d8
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const staff_magic = new Staff_Magic({
    id: WeaponEnum.staff_magic,
    name: 'Magic Staff',
    description: 'A staff imbued with magical energy.',
    image: 'staff_magic.jpg',
    cost: new ItemCost(150, 0, 0.2), // 1 Gold, 5 Silver
    weight: 3000, // 3 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'enchanted wood',
    specialTrait: [], // TODO: Add traits like "Increased magic attack"
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.TwoD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2
    },
    defenseStats: {}
});
const staff_magic_one = new Staff_Magic({
    id: WeaponEnum.staff_magic_one,
    name: 'Magic Staff + 1',
    description: 'A staff with enhanced magical conductivity and energy focus.',
    image: 'staff_magic_one.jpg',
    cost: new ItemCost(150, 75, 0.2), // 1 Gold 5 Silver + 7.5 Silver
    weight: 3000, // 3 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'enchanted wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.TwoD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
const staff_magic_two = new Staff_Magic({
    id: WeaponEnum.staff_magic_two,
    name: 'Magic Staff + 2',
    description: 'A staff with exceptional magical conductivity and perfect energy focus.',
    image: 'staff_magic_two.jpg',
    cost: new ItemCost(150, 150, 0.2), // 1 Gold 5 Silver + 1 Gold 5 Silver
    weight: 3000, // 3 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'enchanted wood',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.TwoD8, // Upgraded from 2d6 to 2d8
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 2,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
// Export the repository for all staffs
export const staffRepository = {
    staff_quarter,
    staff_quarter_one,
    staff_quarter_two,
    staff_long,
    staff_long_one,
    staff_long_two,
    staff_magic,
    staff_magic_one,
    staff_magic_two
};
