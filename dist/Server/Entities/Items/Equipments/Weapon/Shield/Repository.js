import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Shield_Buckler, Shield_Kite, Shield_Round, Shield_Tower } from "./Shield";
import { TraitEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
const shield_buckler = new Shield_Buckler({
    id: WeaponEnum.shield_buckler,
    name: 'Buckler Shield',
    description: 'A small, lightweight shield for quick parrying.',
    image: 'shield_buckler.jpg',
    cost: new ItemCost(50, 0, 0.2), // 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel',
    specialTrait: [TraitEnum.trait_parry_1],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 1,
    }
});
const shield_buckler_one = new Shield_Buckler({
    id: WeaponEnum.shield_buckler_one,
    name: 'Buckler Shield + 1',
    description: 'A small, lightweight shield for quick parrying.',
    image: 'shield_buckler_one.jpg',
    cost: new ItemCost(50, 25, 0.2), // 5 Silver + 2.5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel',
    specialTrait: [TraitEnum.trait_parry_1],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 1,
    }
});
const shield_buckler_two = new Shield_Buckler({
    id: WeaponEnum.shield_buckler_two,
    name: 'Buckler Shield + 2',
    description: 'A small, lightweight shield for quick parrying.',
    image: 'shield_buckler_two.jpg',
    cost: new ItemCost(50, 50, 0.2), // 5 Silver + 5 Silver
    weight: 2000, // 2 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel',
    specialTrait: [TraitEnum.trait_parry_1],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 2,
    }
});
const shield_round = new Shield_Round({
    id: WeaponEnum.shield_round,
    name: 'Round Shield',
    description: 'A balanced shield suitable for many situations.',
    image: 'shield_round.jpg',
    cost: new ItemCost(80, 0, 0.2), // 8 Silver
    weight: 4000, // 4 kg
    tier: Tier.common,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Leather',
    specialTrait: [TraitEnum.trait_parry_2],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 1,
        dodge: -1
    }
});
const shield_round_one = new Shield_Round({
    id: WeaponEnum.shield_round_one,
    name: 'Round Shield + 1',
    description: 'A balanced shield suitable for many situations.',
    image: 'shield_round_one.jpg',
    cost: new ItemCost(80, 40, 0.2), // 8 Silver + 4 Silver
    weight: 4000, // 4 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Leather',
    specialTrait: [TraitEnum.trait_parry_2],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 2,
        dodge: -1
    }
});
const shield_round_two = new Shield_Round({
    id: WeaponEnum.shield_round_two,
    name: 'Round Shield + 2',
    description: 'A balanced shield suitable for many situations.',
    image: 'shield_round_two.jpg',
    cost: new ItemCost(80, 80, 0.2), // 8 Silver + 8 Silver
    weight: 4000, // 4 kg
    tier: Tier.uncommon,
    jewelSlots: 0,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Leather',
    specialTrait: [TraitEnum.trait_parry_2],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD4,
    },
    defenseStats: {
        pDEF: 2,
    }
});
const shield_kite = new Shield_Kite({
    id: WeaponEnum.shield_kite,
    name: 'Kite Shield',
    description: 'A medium shield offering balanced protection.',
    image: 'shield_kite.jpg',
    cost: new ItemCost(100, 0, 0.2), // 1 Gold
    weight: 5000, // 5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Wood',
    specialTrait: [TraitEnum.trait_parry_3],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 2,
        dodge: -2
    }
});
const shield_kite_one = new Shield_Kite({
    id: WeaponEnum.shield_kite_one,
    name: 'Kite Shield + 1',
    description: 'A medium shield offering balanced protection.',
    image: 'shield_kite_one.jpg',
    cost: new ItemCost(100, 50, 0.2), // 1 Gold + 50 Silver
    weight: 5000, // 5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Wood',
    specialTrait: [TraitEnum.trait_parry_3],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 2,
        dodge: -1
    }
});
const shield_kite_two = new Shield_Kite({
    id: WeaponEnum.shield_kite_two,
    name: 'Kite Shield + 2',
    description: 'A medium shield offering balanced protection.',
    image: 'shield_kite_two.jpg',
    cost: new ItemCost(100, 100, 0.2), // 1 Gold + 1 Gold
    weight: 5000, // 5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Steel and Wood',
    specialTrait: [TraitEnum.trait_parry_3],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 3,
        dodge: -1
    }
});
const shield_tower = new Shield_Tower({
    id: WeaponEnum.shield_tower,
    name: 'Tower Shield',
    description: 'A large shield offering maximum protection.',
    image: 'shield_tower.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
    weight: 10000, // 10 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Reinforced Steel',
    specialTrait: [TraitEnum.trait_parry_4],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 3,
        dodge: -3
    }
});
const shield_tower_one = new Shield_Tower({
    id: WeaponEnum.shield_tower_one,
    name: 'Tower Shield + 1',
    description: 'A large shield offering maximum protection.',
    image: 'shield_tower_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 10000, // 10 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Reinforced Steel',
    specialTrait: [TraitEnum.trait_parry_4],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 3,
        mDEF: 1,
        dodge: -3
    }
});
const shield_tower_two = new Shield_Tower({
    id: WeaponEnum.shield_tower_two,
    name: 'Tower Shield + 2',
    description: 'A large shield offering maximum protection.',
    image: 'shield_tower_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 10000, // 10 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'Reinforced Steel',
    specialTrait: [TraitEnum.trait_parry_4],
    attackStats: {
        physicalDiceEnum: DiceEnum.OneD6,
    },
    defenseStats: {
        pDEF: 4,
        mDEF: 1,
        dodge: -3
    }
});
// Export the repository for all shields
export const shieldRepository = {
    shield_buckler,
    shield_buckler_one,
    shield_buckler_two,
    shield_round,
    shield_round_one,
    shield_round_two,
    shield_kite,
    shield_kite_one,
    shield_kite_two,
    shield_tower,
    shield_tower_one,
    shield_tower_two,
};
