import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Mace_Hammer, Mace_Morningstar, Mace_Warhammer } from "./Mace";

const mace_morningstar = new Mace_Morningstar({
    id: WeaponEnum.mace_morningstar,
    name: 'Morningstar',
    description: 'A spiked mace combining blunt and piercing damage.',
    image: 'mace_morningstar.jpg',
    cost: new ItemCost(10, 0, 0.2), // 1 Gold
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

const mace_hammer = new Mace_Hammer({
    id: WeaponEnum.mace_hammer,
    name: 'Hammer',
    description: 'A heavy hammer for delivering powerful strikes.',
    image: 'mace_hammer.jpg',
    cost: new ItemCost(15, 0, 0.2), // 1 Gold, 5 Silver
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

const mace_warhammer = new Mace_Warhammer({
    id: WeaponEnum.mace_warhammer,
    name: 'Warhammer',
    description: 'A massive two-handed hammer for crushing foes.',
    image: 'mace_warhammer.jpg',
    cost: new ItemCost(20, 0, 0.2), // 2 Gold
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

// Export the repository for all maces
export const maceRepository = {
    mace_morningstar,
    mace_hammer,
    mace_warhammer
};