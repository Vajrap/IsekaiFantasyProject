import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Wand_Magic, Wand_Scepter } from "./Wand";

const wand_magic = new Wand_Magic({
    id: WeaponEnum.wand_magic,
    name: 'Magic Wand',
    description: 'A basic wand for novice spellcasters.',
    image: 'wand_magic.jpg',
    cost: new ItemCost(5, 0, 0.2), // 5 Silver
    weight: 200, // 0.2 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Wood',
    specialTrait: [], // TODO: Add traits like "Boost arcane spell damage"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.planar,
        magicalDiceEnum: DiceEnum.OneD6,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

const wand_scepter = new Wand_Scepter({
    id: WeaponEnum.wand_scepter,
    name: 'Scepter',
    description: 'An ornate wand used by skilled spellcasters.',
    image: 'wand_scepter.jpg',
    cost: new ItemCost(20, 0, 0.2), // 2 Gold
    weight: 800, // 0.8 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Gold and Crystal',
    specialTrait: [], // TODO: Add traits like "Reduce mana cost of spells"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD8,
        physicalDamageStat: AttributeEnum.planar,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

// Export the repository for all wands
export const wandRepository = {
    wand_magic,
    wand_scepter
};