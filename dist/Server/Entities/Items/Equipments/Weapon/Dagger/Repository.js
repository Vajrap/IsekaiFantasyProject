import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Dagger_Knife, Dagger_Parrying, Dagger_Stiletto, Dagger_Kunai, Dagger_Throwing } from "./Dagger";
const dagger_knife = new Dagger_Knife({
    id: WeaponEnum.dagger_knife,
    name: 'Knife',
    description: 'A small, versatile cutting tool that can be used as a weapon in a pinch.',
    image: 'dagger_knife.jpg',
    cost: new ItemCost(100, 0, 0.02), // 1 Gold
    weight: 200, // 0.2 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee
    },
    defenseStats: {}
});
const dagger_knife_one = new Dagger_Knife({
    id: WeaponEnum.dagger_knife_one,
    name: 'Knife + 1',
    description: 'A finely crafted knife with a razor-sharp edge.',
    image: 'dagger_knife_one.jpg',
    cost: new ItemCost(100, 50, 0.02), // 1 Gold + 0.5 Gold
    weight: 200, // 0.2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const dagger_knife_two = new Dagger_Knife({
    id: WeaponEnum.dagger_knife_two,
    name: 'Knife + 2',
    description: 'A masterfully crafted knife with perfect balance and a razor-sharp edge.',
    image: 'dagger_knife_two.jpg',
    cost: new ItemCost(100, 100, 0.02), // 1 Gold + 1 Gold
    weight: 200, // 0.2 kg
    tier: Tier.rare,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6, // Upgraded from 1d4 to 1d6
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const dagger_parrying = new Dagger_Parrying({
    id: WeaponEnum.dagger_parrying,
    name: 'Parrying Dagger',
    description: 'A dagger with a large hand guard, designed to be held in the off-hand to parry attacks.',
    image: 'dagger_parrying.jpg',
    cost: new ItemCost(200, 0, 0.05), // 2 Gold
    weight: 300, // 0.3 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee
    },
    defenseStats: {
        dodge: 1
    }
});
const dagger_parrying_one = new Dagger_Parrying({
    id: WeaponEnum.dagger_parrying_one,
    name: 'Parrying Dagger + 1',
    description: 'A finely crafted parrying dagger with an improved hand guard and balance.',
    image: 'dagger_parrying_one.jpg',
    cost: new ItemCost(200, 100, 0.05), // 2 Gold + 1 Gold
    weight: 300, // 0.3 kg
    tier: Tier.rare,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        physicalHitModifier: 1
    },
    defenseStats: {
        dodge: 1
    }
});
const dagger_parrying_two = new Dagger_Parrying({
    id: WeaponEnum.dagger_parrying_two,
    name: 'Parrying Dagger + 2',
    description: 'A masterfully crafted parrying dagger with superior defensive capabilities.',
    image: 'dagger_parrying_two.jpg',
    cost: new ItemCost(200, 200, 0.05), // 2 Gold + 2 Gold
    weight: 300, // 0.3 kg
    tier: Tier.epic,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6, // Upgraded from 1d4 to 1d6
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        physicalHitModifier: 1
    },
    defenseStats: {
        dodge: 1
    }
});
const dagger_stiletto = new Dagger_Stiletto({
    id: WeaponEnum.dagger_stiletto,
    name: 'Stiletto',
    description: 'A slender dagger with a needle-like point.',
    image: 'dagger_stiletto.jpg',
    cost: new ItemCost(150, 0, 0.03), // 1.5 Gold
    weight: 250, // 0.25 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
    },
    defenseStats: {}
});
const dagger_stiletto_one = new Dagger_Stiletto({
    id: WeaponEnum.dagger_stiletto_one,
    name: 'Stiletto + 1',
    description: 'A finely crafted stiletto.',
    image: 'dagger_stiletto_one.jpg',
    cost: new ItemCost(150, 75, 0.03), // 1.5 Gold + 0.75 Gold
    weight: 250, // 0.25 kg
    tier: Tier.rare,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        physicalHitModifier: 1,
    },
    defenseStats: {}
});
const dagger_stiletto_two = new Dagger_Stiletto({
    id: WeaponEnum.dagger_stiletto_two,
    name: 'Stiletto + 2',
    description: 'A masterfully crafted stiletto.',
    image: 'dagger_stiletto_two.jpg',
    cost: new ItemCost(150, 150, 0.03), // 1.5 Gold + 1.5 Gold
    weight: 250, // 0.25 kg
    tier: Tier.epic,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6, // Upgraded from 1d4 to 1d6
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.melee,
        physicalHitModifier: 1,
    },
    defenseStats: {}
});
const dagger_kunai = new Dagger_Kunai({
    id: WeaponEnum.dagger_kunai,
    name: 'Kunai',
    description: 'A versatile blade that can be used as both a melee weapon and a throwing weapon.',
    image: 'dagger_kunai.jpg',
    cost: new ItemCost(120, 0, 0.025), // 1.2 Gold
    weight: 220, // 0.22 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.both
    },
    defenseStats: {}
});
const dagger_kunai_one = new Dagger_Kunai({
    id: WeaponEnum.dagger_kunai_one,
    name: 'Kunai + 1',
    description: 'A finely crafted kunai with improved balance for both melee and throwing.',
    image: 'dagger_kunai_one.jpg',
    cost: new ItemCost(120, 60, 0.025), // 1.2 Gold + 0.6 Gold
    weight: 220, // 0.22 kg
    tier: Tier.rare,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.both,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const dagger_kunai_two = new Dagger_Kunai({
    id: WeaponEnum.dagger_kunai_two,
    name: 'Kunai + 2',
    description: 'A masterfully crafted kunai with perfect balance and a razor-sharp edge.',
    image: 'dagger_kunai_two.jpg',
    cost: new ItemCost(120, 120, 0.025), // 1.2 Gold + 1.2 Gold
    weight: 220, // 0.22 kg
    tier: Tier.epic,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6, // Upgraded from 1d4 to 1d6
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.both,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const dagger_throwing = new Dagger_Throwing({
    id: WeaponEnum.dagger_throwing,
    name: 'Throwing Knives',
    description: 'A set of small, balanced knives designed specifically for throwing.',
    image: 'dagger_throwing.jpg',
    cost: new ItemCost(150, 0, 0.03), // 1.5 Gold
    weight: 250, // 0.25 kg (for the set)
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged
    },
    defenseStats: {}
});
const dagger_throwing_one = new Dagger_Throwing({
    id: WeaponEnum.dagger_throwing_one,
    name: 'Throwing Knives + 1',
    description: 'A set of finely crafted throwing knives with improved balance and accuracy.',
    image: 'dagger_throwing_one.jpg',
    cost: new ItemCost(150, 75, 0.03), // 1.5 Gold + 0.75 Gold
    weight: 250, // 0.25 kg (for the set)
    tier: Tier.rare,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD4,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
const dagger_throwing_two = new Dagger_Throwing({
    id: WeaponEnum.dagger_throwing_two,
    name: 'Throwing Knives + 2',
    description: 'A set of masterfully crafted throwing knives with perfect balance and deadly accuracy.',
    image: 'dagger_throwing_two.jpg',
    cost: new ItemCost(150, 150, 0.03), // 1.5 Gold + 1.5 Gold
    weight: 250, // 0.25 kg (for the set)
    tier: Tier.epic,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD6, // Upgraded from 1d4 to 1d6
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        physicalHitModifier: 1
    },
    defenseStats: {}
});
// Export all daggers
export const daggerRepository = {
    dagger_knife,
    dagger_knife_one,
    dagger_knife_two,
    dagger_parrying,
    dagger_parrying_one,
    dagger_parrying_two,
    dagger_stiletto,
    dagger_stiletto_one,
    dagger_stiletto_two,
    dagger_kunai,
    dagger_kunai_one,
    dagger_kunai_two,
    dagger_throwing,
    dagger_throwing_one,
    dagger_throwing_two
};
