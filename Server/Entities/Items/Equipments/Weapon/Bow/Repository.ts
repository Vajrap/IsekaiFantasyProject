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
    cost: new ItemCost(15, 0, 0.2), // 1 Gold, 5 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.ranged,
        handle: 2
    },
    defenseStats: {}
});

const bow_short = new Bow_Short({
    id: WeaponEnum.bow_short,
    name: 'Short Bow',
    description: 'A compact bow for quick attacks.',
    image: 'bow_short.jpg',
    cost: new ItemCost(10, 0, 0.2), // 1 Gold
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.ranged,
        handle: 2
    },
    defenseStats: {}
});

const bow_cross = new Bow_Cross({
    id: WeaponEnum.bow_cross,
    name: 'Crossbow',
    description: 'A mechanically assisted bow for precise shots.',
    image: 'bow_cross.jpg',
    cost: new ItemCost(20, 0, 0.2), // 2 Gold
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.ranged,
        handle: 2
    },
    defenseStats: {}
});

// Export the repository for all bows
export const bowRepository = {
    bow_long,
    bow_short,
    bow_cross
};