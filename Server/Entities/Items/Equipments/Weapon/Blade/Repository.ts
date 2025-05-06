import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Blade_Katana, Blade_Scimitar, Blade_Cutlass, Blade_Falchion } from "./Blade";

const blade_katana = new Blade_Katana({
    id: WeaponEnum.blade_katana,
    name: 'Katana',
    description: 'A finely crafted curved blade.',
    image: 'blade_katana.jpg',
    cost: new ItemCost(300, 0, 0.2), // 3 Gold
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
        physicalDiceEnum: DiceEnum.OneD10,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1
    },
    defenseStats: {}
});

const blade_katana_one = new Blade_Katana({
    id: WeaponEnum.blade_katana_one,
    name: 'Katana + 1',
    description: 'A finely crafted curved blade with superior balance.',
    image: 'blade_katana_one.jpg',
    cost: new ItemCost(300, 150, 0.2), // 3 Gold + 1.5 Gold
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
        physicalDiceEnum: DiceEnum.OneD10,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: 0 // Improved from -1 to 0
    },
    defenseStats: {}
});

const blade_katana_two = new Blade_Katana({
    id: WeaponEnum.blade_katana_two,
    name: 'Katana + 2',
    description: 'A masterfully crafted katana with razor-sharp edge.',
    image: 'blade_katana_two.jpg',
    cost: new ItemCost(300, 300, 0.2), // 3 Gold + 3 Gold
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
        physicalDiceEnum: DiceEnum.OneD12, // Upgraded from 1d10 to 1d12
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: 0 // Improved from -1 to 0
    },
    defenseStats: {}
});

const blade_scimitar = new Blade_Scimitar({
    id: WeaponEnum.blade_scimitar,
    name: 'Scimitar',
    description: 'A curved blade for slicing.',
    image: 'blade_scimitar.jpg',
    cost: new ItemCost(250, 0, 0.2), // 2 Gold, 5 Silver
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
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const blade_scimitar_one = new Blade_Scimitar({
    id: WeaponEnum.blade_scimitar_one,
    name: 'Scimitar + 1',
    description: 'A finely curved blade for slicing with exceptional balance.',
    image: 'blade_scimitar_one.jpg',
    cost: new ItemCost(250, 125, 0.2), // 2 Gold 5 Silver + 1 Gold 2.5 Silver
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
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const blade_scimitar_two = new Blade_Scimitar({
    id: WeaponEnum.blade_scimitar_two,
    name: 'Scimitar + 2',
    description: 'A masterfully curved blade with a razor-sharp edge.',
    image: 'blade_scimitar_two.jpg',
    cost: new ItemCost(250, 250, 0.2), // 2 Gold 5 Silver + 2 Gold 5 Silver
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
        physicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const blade_cutlass = new Blade_Cutlass({
    id: WeaponEnum.blade_cutlass,
    name: 'Cutlass',
    description: 'A short, slightly curved blade.',
    image: 'blade_cutlass.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
    weight: 1400, // 1.4 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const blade_cutlass_one = new Blade_Cutlass({
    id: WeaponEnum.blade_cutlass_one,
    name: 'Cutlass + 1',
    description: 'A short, slightly curved blade with excellent balance.',
    image: 'blade_cutlass_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 1400, // 1.4 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const blade_cutlass_two = new Blade_Cutlass({
    id: WeaponEnum.blade_cutlass_two,
    name: 'Cutlass + 2',
    description: 'A short, perfectly balanced curved blade with razor-sharp edge.',
    image: 'blade_cutlass_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 1400, // 1.4 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.slash,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD8, // Upgraded from 1d6 to 1d8
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 1,
        physicalHitModifier: 1
    },
    defenseStats: {}
});

const blade_falchion = new Blade_Falchion({
    id: WeaponEnum.blade_falchion,
    name: 'Falchion',
    description: 'A heavy, broad, and curved blade.',
    image: 'blade_falchion.jpg',
    cost: new ItemCost(350, 0, 0.2), // 3 Gold, 5 Silver
    weight: 3500, // 3.5 kg
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

const blade_falchion_one = new Blade_Falchion({
    id: WeaponEnum.blade_falchion_one,
    name: 'Falchion + 1',
    description: 'A heavy, broad, and curved blade with improved balance.',
    image: 'blade_falchion_one.jpg',
    cost: new ItemCost(350, 175, 0.2), // 3 Gold 5 Silver + 1 Gold 7.5 Silver
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
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});

const blade_falchion_two = new Blade_Falchion({
    id: WeaponEnum.blade_falchion_two,
    name: 'Falchion + 2',
    description: 'A masterfully crafted heavy, broad, and curved blade with excellent balance.',
    image: 'blade_falchion_two.jpg',
    cost: new ItemCost(350, 350, 0.2), // 3 Gold 5 Silver + 3 Gold 5 Silver
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
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -1 // Improved from -2 to -1
    },
    defenseStats: {}
});

// Export the repository for all blades
export const bladeRepository = {
    blade_katana,
    blade_katana_one,
    blade_katana_two,
    blade_scimitar,
    blade_scimitar_one,
    blade_scimitar_two,
    blade_cutlass,
    blade_cutlass_one,
    blade_cutlass_two,
    blade_falchion,
    blade_falchion_one,
    blade_falchion_two
};