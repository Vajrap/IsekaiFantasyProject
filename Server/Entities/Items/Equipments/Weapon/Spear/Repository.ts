import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Spear_Dory, Spear_Halberd, Spear_Javelin } from "./Spear";

const spear_dory = new Spear_Dory({
    id: WeaponEnum.spear_dory,
    name: 'Dory',
    description: 'A traditional spear used by infantry soldiers.',
    image: 'spear_dory.jpg',
    cost: new ItemCost(0, 5), // 5 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const spear_javelin = new Spear_Javelin({
    id: WeaponEnum.spear_javelin,
    name: 'Javelin',
    description: 'A lightweight spear designed for throwing.',
    image: 'spear_javelin.jpg',
    cost: new ItemCost(0, 3), // 3 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.both,
        handle: 1
    },
    defenseStats: {}
});

const spear_halberd = new Spear_Halberd({
    id: WeaponEnum.spear_halberd,
    name: 'Halberd',
    description: 'A long polearm with an axe blade for versatile combat.',
    image: 'spear_halberd.jpg',
    cost: new ItemCost(1, 0), // 1 Gold
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -2
    },
    defenseStats: {}
});

// Export the repository for all spears
export const spearRepository = {
    spear_dory,
    spear_javelin,
    spear_halberd
};