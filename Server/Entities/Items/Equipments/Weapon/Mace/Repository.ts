import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Mace_Hammer, Mace_Morningstar, Mace_Warhammer } from "./Mace";

const mace_morningstar = new Mace_Morningstar({
    id: WeaponEnum.mace_morningstar,
    name: 'Morningstar',
    description: 'A spiked mace combining blunt and piercing damage.',
    image: 'mace_morningstar.jpg',
    cost: new ItemCost(100, 0, 0.2), // 1 Gold
    weight: 2000, // 2 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Bonus against armored enemies"
    attackStats: {
        physicalType: DamageTypes.blunt,
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

const mace_morningstar_one = new Mace_Morningstar({
    id: WeaponEnum.mace_morningstar_one,
    name: 'Morningstar + 1',
    description: 'A well-balanced spiked mace with reinforced spikes.',
    image: 'mace_morningstar_one.jpg',
    cost: new ItemCost(100, 50, 0.2), // 1 Gold + 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const mace_morningstar_two = new Mace_Morningstar({
    id: WeaponEnum.mace_morningstar_two,
    name: 'Morningstar + 2',
    description: 'A masterfully crafted spiked mace with perfect balance and hardened spikes.',
    image: 'mace_morningstar_two.jpg',
    cost: new ItemCost(100, 100, 0.2), // 1 Gold + 1 Gold
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const mace_hammer = new Mace_Hammer({
    id: WeaponEnum.mace_hammer,
    name: 'Hammer',
    description: 'A heavy hammer for delivering powerful strikes.',
    image: 'mace_hammer.jpg',
    cost: new ItemCost(150, 0, 0.2), // 1 Gold, 5 Silver
    weight: 2500, // 2.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Bonus to breaking shields"
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: -1
    },
    defenseStats: {}
});

const mace_hammer_one = new Mace_Hammer({
    id: WeaponEnum.mace_hammer_one,
    name: 'Hammer + 1',
    description: 'A well-balanced heavy hammer with reinforced striking surface.',
    image: 'mace_hammer_one.jpg',
    cost: new ItemCost(150, 75, 0.2), // 1 Gold 5 Silver + 7.5 Silver
    weight: 2500, // 2.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD10,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 0 // Improved from -1 to 0
    },
    defenseStats: {}
});

const mace_hammer_two = new Mace_Hammer({
    id: WeaponEnum.mace_hammer_two,
    name: 'Hammer + 2',
    description: 'A masterfully crafted hammer with perfect balance and a hardened striking surface.',
    image: 'mace_hammer_two.jpg',
    cost: new ItemCost(150, 150, 0.2), // 1 Gold 5 Silver + 1 Gold 5 Silver
    weight: 2500, // 2.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD12, // Upgraded from 1d10 to 1d12
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 0 // Improved from -1 to 0
    },
    defenseStats: {}
});

const mace_warhammer = new Mace_Warhammer({
    id: WeaponEnum.mace_warhammer,
    name: 'Warhammer',
    description: 'A massive two-handed hammer for crushing foes.',
    image: 'mace_warhammer.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
    weight: 3000, // 3 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Reduced movement penalty for heavy weapons"
    attackStats: {
        physicalType: DamageTypes.blunt,
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

const mace_warhammer_one = new Mace_Warhammer({
    id: WeaponEnum.mace_warhammer_one,
    name: 'Warhammer + 1',
    description: 'A massive two-handed hammer with improved balance and hardened striking surface.',
    image: 'mace_warhammer_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 3000, // 3 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
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

const mace_warhammer_two = new Mace_Warhammer({
    id: WeaponEnum.mace_warhammer_two,
    name: 'Warhammer + 2',
    description: 'A masterfully crafted two-handed hammer with exceptional balance and a reinforced striking surface.',
    image: 'mace_warhammer_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 3000, // 3 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
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

// Export the repository for all maces
export const maceRepository = {
    mace_morningstar,
    mace_morningstar_one,
    mace_morningstar_two,
    mace_hammer,
    mace_hammer_one,
    mace_hammer_two,
    mace_warhammer,
    mace_warhammer_one,
    mace_warhammer_two
};