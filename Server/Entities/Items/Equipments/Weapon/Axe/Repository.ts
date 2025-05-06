import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Axe_Broad, Axe_Great } from "./Axe";
import { ItemCost } from "../../../ItemCost";

const axe_broad = new Axe_Broad({
    id: WeaponEnum.axe_broad,
    name: 'Broad Axe',
    description: 'A heavy axe designed for chopping and combat.',
    image: 'axe_broad.jpg',
    cost: new ItemCost(150, 0, 0.2), // 1 Gold, 5 Silver
    weight: 2000, // 2 kg
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
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const axe_broad_one = new Axe_Broad({
    id: WeaponEnum.axe_broad_one,
    name: 'Broad Axe + 1',
    description: 'A well-balanced heavy axe with a sharper edge.',
    image: 'axe_broad_one.jpg',
    cost: new ItemCost(150, 75, 0.2), // 1 Gold 5 Silver + 7.5 Silver
    weight: 2000, // 2 kg
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
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const axe_broad_two = new Axe_Broad({
    id: WeaponEnum.axe_broad_two,
    name: 'Broad Axe + 2',
    description: 'A masterfully crafted axe with perfect balance and a razor-sharp edge.',
    image: 'axe_broad_two.jpg',
    cost: new ItemCost(150, 150, 0.2), // 1 Gold 5 Silver + 1 Gold 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const axe_great = new Axe_Great({
    id: WeaponEnum.axe_great,
    name: 'Great Axe',
    description: 'A massive axe used for devastating strikes.',
    image: 'axe_great.jpg',
    cost: new ItemCost(250, 0, 0.2), // 2 Gold, 5 Silver
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
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -2
    },
    defenseStats: {}
});

const axe_great_one = new Axe_Great({
    id: WeaponEnum.axe_great_one,
    name: 'Great Axe + 1',
    description: 'A massive axe with improved balance for devastating strikes.',
    image: 'axe_great_one.jpg',
    cost: new ItemCost(250, 125, 0.2), // 2 Gold 5 Silver + 1 Gold 2.5 Silver
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
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});

const axe_great_two = new Axe_Great({
    id: WeaponEnum.axe_great_two,
    name: 'Great Axe + 2',
    description: 'A masterfully crafted great axe with perfect balance and a razor-sharp edge.',
    image: 'axe_great_two.jpg',
    cost: new ItemCost(250, 250, 0.2), // 2 Gold 5 Silver + 2 Gold 5 Silver
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
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});

// Export the repository for all axes
export const axeRepository = {
    axe_broad,
    axe_broad_one,
    axe_broad_two,
    axe_great,
    axe_great_one,
    axe_great_two
};