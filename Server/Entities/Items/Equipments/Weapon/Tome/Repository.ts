import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Tome_Bible, Tome_Codex, Tome_Grimoire } from "./Tome";

const tome_bible = new Tome_Bible({
    id: WeaponEnum.tome_bible,
    name: 'Holy Bible',
    description: 'A sacred tome containing religious scriptures.',
    image: 'tome_bible.jpg',
    cost: new ItemCost(20, 0, 0.2), // 2 Gold
    weight: 500, // 0.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'parchment',
    specialTrait: [], // TODO: Add traits like "Boost divine magic damage"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.order,
        physicalDiceEnum: null,
        physicalDamageStat: null,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.willpower,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

const tome_grimoire = new Tome_Grimoire({
    id: WeaponEnum.tome_grimoire,
    name: 'Grimoire',
    description: 'A dark tome filled with forbidden knowledge.',
    image: 'tome_grimoire.jpg',
    cost: new ItemCost(30, 0, 0.2), // 3 Gold
    weight: 700, // 0.7 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'leather and parchment',
    specialTrait: [], // TODO: Add traits like "Boost chaos magic damage"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.chaos,
        physicalDiceEnum: null,
        physicalDamageStat: null,
        magicalDiceEnum: DiceEnum.OneD10,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

const tome_codex = new Tome_Codex({
    id: WeaponEnum.tome_codex,
    name: 'Ancient Codex',
    description: 'A scholarly tome containing ancient wisdom.',
    image: 'tome_codex.jpg',
    cost: new ItemCost(40, 0, 0.2), // 4 Gold
    weight: 900, // 0.9 kg
    tier: Tier.rare,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'reinforced parchment',
    specialTrait: [], // TODO: Add traits like "Boost planar magic damage"
    attackStats: {
        physicalType: null,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: null,
        physicalDamageStat: null,
        magicalDiceEnum: DiceEnum.TwoD6,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

// Export the repository for all tomes
export const tomeRepository = {
    tome_bible,
    tome_grimoire,
    tome_codex
};