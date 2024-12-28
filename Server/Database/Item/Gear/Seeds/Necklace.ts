// import { TraitEnum } from "../../../../Entities/Traits/TraitEnums";
// import { EquipmentType, GearType } from "../../../../../Common/Enums/Item/EquipmentTypes";
// import { Tier } from "../../../../Utility/Tier";
// import { GearInstance } from "../../../../Entities/Items/GearInstance/GearInstance";

// export enum NecklaceSeedEnum {
//     // Common
//     necklace_bare_bronze = 'necklace_bare_bronze',
//     necklace_bare_copper = 'necklace_bare_copper',

//     // Uncommon
//     necklace_bare_silver = 'necklace_bare_silver',
//     necklace_bare_gold = 'necklace_bare_gold',

//     // Rare
//     necklace_amulet_gold_perfect_ruby = 'necklace_amulet_gold_perfect_ruby',
//     necklace_amulet_gold_perfect_emerald = 'necklace_amulet_gold_perfect_emerald',
//     necklace_amulet_gold_perfect_aquamarine = 'necklace_amulet_gold_perfect_aquamarine',
//     necklace_amulet_gold_perfect_sapphire = 'necklace_amulet_gold_perfect_sapphire',

//     // Epic
//     necklace_amulet_gold_perfect_diamond = 'necklace_amulet_gold_perfect_diamond',
//     necklace_amulet_gold_perfect_onyx = 'necklace_amulet_gold_perfect_onyx',
// }

// export const GearSeedNecklace: GearInstance[] = [
//     // MARK: - Common Rings
//     new GearInstance({
//         id: 'necklace_bare_bronze',
//         name: 'Bronze Necklace',
//         crafter: 'Unknown',
//         description: 'A simple bronze necklace.',
//         image: 'necklace_bare_bronze.png',
//         // Bronce ingot cost 360
//         cost: 660,
//         weight: 1,
//         tier: Tier.common,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [],
//         material: 'Bronze',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: 'necklace_bare_copper',
//         name: 'Copper Necklace',
//         crafter: 'Unknown',
//         description: 'A simple copper necklace.',
//         image: 'necklace_bare_copper.png',
//         // Copper ingot cost 150
//         cost: 450,  
//         weight: 1,
//         tier: Tier.common,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [],
//         material: 'Copper',
//         class: 'accessory'
//     }),

//     // MARK: - Uncommon Rings
//     new GearInstance({
//         id: 'necklace_bare_silver',
//         name: 'Silver Necklace',
//         crafter: 'Unknown',
//         description: 'A simple silver necklace.',
//         image: 'necklace_bare_silver.png',
//         // Silver ingot cost 1510
//         cost: 2500,
//         weight: 1,
//         tier: Tier.uncommon,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [],
//         material: 'Silver',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: 'necklace_bare_gold',
//         name: 'Gold Necklace',
//         crafter: 'Unknown',
//         description: 'A simple gold necklace.',
//         image: 'necklace_bare_gold.png',
//         // Gold ingot cost 2010
//         cost: 3000,
//         weight: 1,
//         tier: Tier.uncommon,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     // MARK: - Rare Rings
//     // perfect ruby, emereald, aquamarine and sapphire cost 10000 + gold 2010 + skill cost for rare should be high, like 5000
//     new GearInstance({
//         id: 'necklace_amulet_gold_perfect_ruby',
//         name: 'Ruby Amulet',
//         crafter: 'Unknown',
//         description: 'A gold amulet with a perfect ruby.',
//         image: 'necklace_amulet_gold_ruby.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [TraitEnum.trait_strength_02, TraitEnum.trait_endurance_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: 'necklace_amulet_gold_perfect_emerald',
//         name: 'Emerald Amulet',
//         crafter: 'Unknown',
//         description: 'A gold amulet with a perfect emerald.',
//         image: 'necklace_amulet_gold_emerald.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [TraitEnum.trait_vitality_02, TraitEnum.trait_willpower_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: 'necklace_amulet_gold_perfect_aquamarine',
//         name: 'Aquamarine Amulet',
//         crafter: 'Unknown',
//         description: 'A gold amulet with a perfect aquamarine.',
//         image: 'necklace_amulet_gold_aquamarine.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [TraitEnum.trait_breath_02, TraitEnum.trait_planar_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: 'necklace_amulet_gold_perfect_sapphire',
//         name: 'Sapphire Amulet',
//         crafter: 'Unknown',
//         description: 'A gold amulet with a perfect sapphire.',
//         image: 'necklace_amulet_gold_sapphire.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [TraitEnum.trait_dexterity_02, TraitEnum.trait_agility_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     // MARK: - Epic Rings
//     // perfect diamond and onyx cost 20000 + gold 2010 + skill cost for epic, maybe 7500
//     new GearInstance({
//         id: 'necklace_amulet_gold_perfect_diamond',
//         name: 'Diamond Amulet',
//         crafter: 'Unknown',
//         description: 'A gold amulet with a perfect diamond.',
//         image: 'necklace_amulet_gold_diamond.png',
//         cost: 27500,
//         weight: 1,
//         tier: Tier.epic,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [TraitEnum.trait_charisma_02, TraitEnum.trait_luck_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: 'necklace_amulet_gold_perfect_onyx',
//         name: 'Onyx Amulet',
//         crafter: 'Unknown',
//         description: 'A gold amulet with a perfect onyx.',
//         image: 'necklace_amulet_gold_onyx.png',
//         cost: 27500,
//         weight: 1,
//         tier: Tier.epic,
//         gearType: GearType.necklace,
//         specificType: EquipmentType.necklace,
//         specialTrait: [TraitEnum.trait_intelligence_02, TraitEnum.trait_leadership_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),
// ];

