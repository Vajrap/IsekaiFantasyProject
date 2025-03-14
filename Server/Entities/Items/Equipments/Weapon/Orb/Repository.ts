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
    cost: new ItemCost(20, 0, 0.2), // 2 Gold
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
        physicalDiceEnum: null,
        physicalDamageStat: null,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

const orb_crystal = new Orb_Crystal({
    id: WeaponEnum.orb_crystal,
    name: 'Crystal Orb',
    description: 'A pristine crystal orb for precise spellcasting.',
    image: 'orb_crystal.jpg',
    cost: new ItemCost(30, 0, 0.2), // 3 Gold
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
        physicalDiceEnum: null,
        physicalDamageStat: null,
        magicalDiceEnum: DiceEnum.OneD10,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

// Export the repository for all orbs
export const orbRepository = {
    orb_metallic,
    orb_crystal
};