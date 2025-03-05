import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Dagger_Knife, Dagger_Stiletto } from "./Dagger";


const dagger_stiletto = new Dagger_Stiletto({
    id: WeaponEnum.dagger_stiletto,
    name: 'Stiletto',
    description: 'A slim, sharp dagger designed for piercing.',
    image: 'dagger_stiletto.jpg',
    cost: new ItemCost(2, 0, 0.2), // 2 Silver
    weight: 300, // 300 grams
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Easier to conceal"
    attackStats: {
        physicalType: DamageTypes.pierce,
        magicalType: null,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.dexterity,
        magicalDiceEnum: null,
        magicalDamageStat: null,
        preferredPosition: PreferredPosition.melee,
        handle: 1
    },
    defenseStats: {}
});

const dagger_knife = new Dagger_Knife({
    id: WeaponEnum.dagger_knife,
    name: 'Knife',
    description: 'A versatile dagger suitable for slashing and cutting.',
    image: 'dagger_knife.jpg',
    cost: new ItemCost(4, 0, 0.2), // 4 Silver
    weight: 500, // 500 grams
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'steel',
    specialTrait: [], // TODO: Add traits like "Bonus to artisan checks"
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

// Export the repository for all daggers
export const daggerRepository = {
    dagger_stiletto,
    dagger_knife
};