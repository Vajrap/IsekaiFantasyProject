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
    cost: new ItemCost(15, 0, 0.2), // 1 Gold, 5 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const axe_great = new Axe_Great({
    id: WeaponEnum.axe_great,
    name: 'Great Axe',
    description: 'A massive axe used for devastating strikes.',
    image: 'axe_great.jpg',
    cost: new ItemCost(25, 0, 0.2), // 2 Gold, 5 Silver
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
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 2,
        physicalHitModifier: -2
    },
    defenseStats: {}
});

// Export the repository for all axes
export const axeRepository = {
    axe_broad,
    axe_great
};