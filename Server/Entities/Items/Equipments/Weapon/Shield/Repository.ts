import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Shield_Buckler, Shield_Kite, Shield_Round, Shield_Tower } from "./Shield";

const shield_buckler = new Shield_Buckler({
    id: WeaponEnum.shield_buckler,
    name: 'Buckler Shield',
    description: 'A small, lightweight shield for quick parrying.',
    image: 'shield_buckler.jpg',
    cost: new ItemCost(5, 0, 0.2), // 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel',
    specialTrait: [], // TODO: Add traits like "Increased parry chance"
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 1,
    }
});

const shield_kite = new Shield_Kite({
    id: WeaponEnum.shield_kite,
    name: 'Kite Shield',
    description: 'A medium shield offering balanced protection.',
    image: 'shield_kite.jpg',
    cost: new ItemCost(10, 0, 0.2), // 1 Gold
    weight: 5000, // 5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Wood',
    specialTrait: [], // TODO: Add traits like "Reduce physical damage"
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 2,
    }
});

const shield_tower = new Shield_Tower({
    id: WeaponEnum.shield_tower,
    name: 'Tower Shield',
    description: 'A large shield offering maximum protection.',
    image: 'shield_tower.jpg',
    cost: new ItemCost(20, 0, 0.2), // 2 Gold
    weight: 10000, // 10 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Reinforced Steel',
    specialTrait: [], // TODO: Add traits like "Increase blocking area"
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 3,
    }
});

const shield_round = new Shield_Round({
    id: WeaponEnum.shield_round,
    name: 'Round Shield',
    description: 'A balanced shield suitable for many situations.',
    image: 'shield_round.jpg',
    cost: new ItemCost(8, 0, 0.2), // 8 Silver
    weight: 4000, // 4 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Leather',
    specialTrait: [], // TODO: Add traits like "Balanced defense and mobility"
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 1,
    }
});

// Export the repository for all shields
export const shieldRepository = {
    shield_buckler,
    shield_kite,
    shield_tower,
    shield_round
};