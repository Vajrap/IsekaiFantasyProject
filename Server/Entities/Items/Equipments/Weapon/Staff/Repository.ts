import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Staff_Long, Staff_Magic, Staff_Quarter } from "./Staff";

const staff_quarter = new Staff_Quarter({
    id: WeaponEnum.staff_quarter,
    name: 'Quarterstaff',
    description: 'A simple wooden staff used for self-defense.',
    image: 'staff_quarter.jpg',
    cost: new ItemCost(0, 5), // 5 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const staff_long = new Staff_Long({
    id: WeaponEnum.staff_long,
    name: 'Long Staff',
    description: 'A long staff for extended reach.',
    image: 'staff_long.jpg',
    cost: new ItemCost(0, 8), // 8 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 2
    },
    defenseStats: {}
});

const staff_magic = new Staff_Magic({
    id: WeaponEnum.staff_magic,
    name: 'Magic Staff',
    description: 'A staff imbued with magical energy.',
    image: 'staff_magic.jpg',
    cost: new ItemCost(1, 5), // 1 Gold, 5 Silver
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

// Export the repository for all staffs
export const staffRepository = {
    staff_quarter,
    staff_long,
    staff_magic
};