import { AttributeEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition, WeaponEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ItemCost } from "../../../ItemCost";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Tome_Bible, Tome_Codex, Tome_Grimoire } from "./Tome";

const tome_bible = new Tome_Bible({
    id: WeaponEnum.tome_bible,
    name: 'Holy Bible',
    description: 'A sacred tome containing religious scriptures.',
    image: 'tome_bible.jpg',
    cost: new ItemCost(200, 0, 0.2), // 2 Gold
    weight: 500, // 0.5 kg
    tier: Tier.common,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'parchment',
    specialTrait: [], // TODO: Add traits like "Boost divine magic damage"
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.order,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD8,
        magicalDamageStat: AttributeEnum.willpower,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

const tome_bible_one = new Tome_Bible({
    id: WeaponEnum.tome_bible_one,
    name: 'Holy Bible + 1',
    description: 'A sacred tome with enhanced divine energy and clarity of scripture.',
    image: 'tome_bible_one.jpg',
    cost: new ItemCost(200, 100, 0.2), // 2 Gold + 1 Gold
    weight: 500, // 0.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'parchment',
    specialTrait: [],
    attackStats: {

    },
    defenseStats: {}
});

const tome_bible_two = new Tome_Bible({
    id: WeaponEnum.tome_bible_two,
    name: 'Holy Bible + 2',
    description: 'A sacred tome with exceptional divine energy and profound religious insights.',
    image: 'tome_bible_two.jpg',
    cost: new ItemCost(200, 200, 0.2), // 2 Gold + 2 Gold
    weight: 500, // 0.5 kg
    tier: Tier.uncommon,
    jewelSlots: 1,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'parchment',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.order,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD10, // Upgraded from 1d8 to 1d10
        magicalDamageStat: AttributeEnum.willpower,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});

const tome_grimoire = new Tome_Grimoire({
    id: WeaponEnum.tome_grimoire,
    name: 'Grimoire',
    description: 'A dark tome filled with forbidden knowledge.',
    image: 'tome_grimoire.jpg',
    cost: new ItemCost(300, 0, 0.2), // 3 Gold
    weight: 700, // 0.7 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'leather and parchment',
    specialTrait: [], // TODO: Add traits like "Boost chaos magic damage"
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.chaos,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD10,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

const tome_grimoire_one = new Tome_Grimoire({
    id: WeaponEnum.tome_grimoire_one,
    name: 'Grimoire + 1',
    description: 'A dark tome with enhanced chaotic energy and deeper forbidden knowledge.',
    image: 'tome_grimoire_one.jpg',
    cost: new ItemCost(300, 150, 0.2), // 3 Gold + 1.5 Gold
    weight: 700, // 0.7 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'leather and parchment',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.chaos,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD10,
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});

const tome_grimoire_two = new Tome_Grimoire({
    id: WeaponEnum.tome_grimoire_two,
    name: 'Grimoire + 2',
    description: 'A dark tome with exceptional chaotic energy and profound secrets of forbidden magic.',
    image: 'tome_grimoire_two.jpg',
    cost: new ItemCost(300, 300, 0.2), // 3 Gold + 3 Gold
    weight: 700, // 0.7 kg
    tier: Tier.uncommon,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'leather and parchment',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.chaos,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.OneD12, // Upgraded from 1d10 to 1d12
        magicalDamageStat: AttributeEnum.planar,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});

const tome_codex = new Tome_Codex({
    id: WeaponEnum.tome_codex,
    name: 'Ancient Codex',
    description: 'A scholarly tome containing ancient wisdom.',
    image: 'tome_codex.jpg',
    cost: new ItemCost(400, 0, 0.2), // 4 Gold
    weight: 900, // 0.9 kg
    tier: Tier.rare,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'reinforced parchment',
    specialTrait: [], // TODO: Add traits like "Boost planar magic damage"
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.TwoD6,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1
    },
    defenseStats: {}
});

const tome_codex_one = new Tome_Codex({
    id: WeaponEnum.tome_codex_one,
    name: 'Ancient Codex + 1',
    description: 'A scholarly tome with enhanced arcane energy and clearer ancient wisdom.',
    image: 'tome_codex_one.jpg',
    cost: new ItemCost(400, 200, 0.2), // 4 Gold + 2 Gold
    weight: 900, // 0.9 kg
    tier: Tier.rare,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'reinforced parchment',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD4,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.TwoD6,
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});

const tome_codex_two = new Tome_Codex({
    id: WeaponEnum.tome_codex_two,
    name: 'Ancient Codex + 2',
    description: 'A scholarly tome with exceptional arcane energy and profound ancient secrets.',
    image: 'tome_codex_two.jpg',
    cost: new ItemCost(400, 400, 0.2), // 4 Gold + 4 Gold
    weight: 900, // 0.9 kg
    tier: Tier.rare,
    jewelSlots: 2,
    slottedJewels: [],
    maxJewelGrade: null,
    material: 'reinforced parchment',
    specialTrait: [],
    attackStats: {
        physicalType: DamageTypes.blunt,
        magicalType: DamageTypes.arcane,
        physicalDiceEnum: DiceEnum.OneD6,
        physicalDamageStat: AttributeEnum.strength,
        magicalDiceEnum: DiceEnum.TwoD8, // Upgraded from 2d6 to 2d8
        magicalDamageStat: AttributeEnum.intelligence,
        preferredPosition: PreferredPosition.ranged,
        handle: 1,
        magicalHitModifier: 1
    },
    defenseStats: {}
});

// Export the repository for all tomes
export const tomeRepository = {
    tome_bible,
    tome_bible_one,
    tome_bible_two,
    tome_grimoire,
    tome_grimoire_one,
    tome_grimoire_two,
    tome_codex,
    tome_codex_one,
    tome_codex_two
};