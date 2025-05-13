import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Orb_Crystal, Orb_Metallic } from "./Orb";
const orb_metallic = new Orb_Metallic({
    id: WeaponEnum.orb_metallic,
    name: 'Metal Orb',
    description: 'A dense metallic orb used for channeling magical energy.',
    image: 'orb_metallic.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
    weight: 1500, // 1.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'metal',
    specialTrait: [], // TODO: Add traits like "Increases magical attack power"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});
const orb_metallic_one = new Orb_Metallic({
    id: WeaponEnum.orb_metallic_one,
    name: 'Metal Orb + 1',
    description: 'A dense metallic orb with enhanced magical conductivity.',
    image: 'orb_metallic_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'metal',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
const orb_metallic_two = new Orb_Metallic({
    id: WeaponEnum.orb_metallic_two,
    name: 'Metal Orb + 2',
    description: 'A dense metallic orb with exceptional magical conductivity and focus.',
    image: 'orb_metallic_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 1500, // 1.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'metal',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
const orb_crystal = new Orb_Crystal({
    id: WeaponEnum.orb_crystal,
    name: 'Crystal Orb',
    description: 'A pristine crystal orb for precise spellcasting.',
    image: 'orb_crystal.jpg',
    cost: new ItemCost(300, 0, 0.2), // 3 Gold
    weight: 1000, // 1 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'crystal',
    specialTrait: [], // TODO: Add traits like "Increases critical chance of magical attacks"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD10,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});
const orb_crystal_one = new Orb_Crystal({
    id: WeaponEnum.orb_crystal_one,
    name: 'Crystal Orb + 1',
    description: 'A pristine crystal orb with enhanced magical focus and clarity.',
    image: 'orb_crystal_one.jpg',
    cost: new ItemCost(300, 150, 0.2), // 3 Gold + 1.5 Gold
    weight: 1000, // 1 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'crystal',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD10,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
const orb_crystal_two = new Orb_Crystal({
    id: WeaponEnum.orb_crystal_two,
    name: 'Crystal Orb + 2',
    description: 'A flawless crystal orb with exceptional magical focus and clarity.',
    image: 'orb_crystal_two.jpg',
    cost: new ItemCost(300, 300, 0.2), // 3 Gold + 3 Gold
    weight: 1000, // 1 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'crystal',
    specialTrait: [],
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD12, // Upgraded from 1d10 to 1d12
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});
// Export the repository for all orbs
export const orbRepository = {
    orb_metallic,
    orb_metallic_one,
    orb_metallic_two,
    orb_crystal,
    orb_crystal_one,
    orb_crystal_two
};
