import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Blade_Katana, Blade_Scimitar, Blade_Cutlass, Blade_Falchion } from "./Blade";

const blade_katana = new Blade_Katana({
    id: WeaponEnum.blade_katana,
    name: 'Katana',
    description: 'A finely crafted curved blade.',
    image: 'blade_katana.jpg',
    cost: new ItemCost(30, 0), // 3 Gold
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 2
    },
    defenseStats: {}
});

const blade_scimitar = new Blade_Scimitar({
    id: WeaponEnum.blade_scimitar,
    name: 'Scimitar',
    description: 'A curved blade for slicing.',
    image: 'blade_scimitar.jpg',
    cost: new ItemCost(25, 0), // 2 Gold, 5 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const blade_cutlass = new Blade_Cutlass({
    id: WeaponEnum.blade_cutlass,
    name: 'Cutlass',
    description: 'A short, slightly curved blade.',
    image: 'blade_cutlass.jpg',
    cost: new ItemCost(20, 0), // 2 Gold
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const blade_falchion = new Blade_Falchion({
    id: WeaponEnum.blade_falchion,
    name: 'Falchion',
    description: 'A heavy, broad, and curved blade.',
    image: 'blade_falchion.jpg',
    cost: new ItemCost(35, 0), // 3 Gold, 5 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 2
    },
    defenseStats: {}
});

// Export the repository for all blades
export const bladeRepository = {
    blade_katana,
    blade_scimitar,
    blade_cutlass,
    blade_falchion
};