// import { GearInstance } from "../../../../Entities/Items/GearInstance/GearInstance";
// import { TraitEnum } from "../../../../Entities/Traits/TraitEnums";
// import { EquipmentType, GearType } from "../../../../../Common/Enums/Item/EquipmentTypes";
// import { Tier } from "../../../../Utility/Tier";

// export enum RingSeedEnum {
//     // Common
//     ring_bare_bronze = 'ring_bare_bronze',
//     ring_bare_copper = 'ring_bare_copper',

//     // Uncommon
//     ring_bare_silver = 'ring_bare_silver',
//     ring_bare_gold = 'ring_bare_gold',

//     // Rare (signet rings with jewels)
//     ring_signet_gold_ruby = 'ring_signet_gold_ruby',
//     ring_signet_gold_emerald = 'ring_signet_gold_emerald',
//     ring_signet_gold_sapphire = 'ring_signet_gold_sapphire',
//     ring_signet_gold_aquamarine = 'ring_signet_gold_aquamarine',

//     // Epic
//     ring_signet_gold_diamond = 'ring_signet_gold_diamond',
//     ring_signet_gold_onyx = 'ring_signet_gold_onyx',
// }

// export const GearSeedRings: GearInstance[] = [
//     // MARK: - Common Rings
//     new GearInstance({
//         id: RingSeedEnum.ring_bare_bronze,
//         name: 'Bronze Ring',
//         crafter: 'Unknown',
//         description: 'A simple bronze ring.',
//         image: 'ring_bare_bronze.png',
//         cost: 500,
//         weight: 1,
//         tier: Tier.common,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [],
//         material: 'Bronze',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: RingSeedEnum.ring_bare_copper,
//         name: 'Copper Ring',
//         crafter: 'Unknown',
//         description: 'A simple copper ring.',
//         image: 'ring_bare_copper.png',
//         cost: 400,
//         weight: 1,
//         tier: Tier.common,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [],
//         material: 'Copper',
//         class: 'accessory'
//     }),

//     // MARK: - Uncommon Rings
//     new GearInstance({
//         id: RingSeedEnum.ring_bare_silver,
//         name: 'Silver Ring',
//         crafter: 'Unknown',
//         description: 'A simple silver ring.',
//         image: 'ring_bare_silver.png',
//         cost: 2000,
//         weight: 1,
//         tier: Tier.uncommon,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [],
//         material: 'Silver',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: RingSeedEnum.ring_bare_gold,
//         name: 'Gold Ring',
//         crafter: 'Unknown',
//         description: 'A simple gold ring.',
//         image: 'ring_bare_gold.png',
//         cost: 3000,
//         weight: 1,
//         tier: Tier.uncommon,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     // MARK: - Rare Rings
//     new GearInstance({
//         id: RingSeedEnum.ring_signet_gold_ruby,
//         name: 'Ruby Signet Ring',
//         crafter: 'Unknown',
//         description: 'A gold signet ring with a perfect ruby.',
//         image: 'ring_signet_gold_ruby.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [TraitEnum.trait_strength_02, TraitEnum.trait_endurance_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: RingSeedEnum.ring_signet_gold_emerald,
//         name: 'Emerald Signet Ring',
//         crafter: 'Unknown',
//         description: 'A gold signet ring with a perfect emerald.',
//         image: 'ring_signet_gold_emerald.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [TraitEnum.trait_vitality_02, TraitEnum.trait_willpower_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: RingSeedEnum.ring_signet_gold_aquamarine,
//         name: 'Aquamarine Signet Ring',
//         crafter: 'Unknown',
//         description: 'A gold signet ring with a perfect aquamarine.',
//         image: 'ring_signet_gold_aquamarine.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [TraitEnum.trait_breath_02, TraitEnum.trait_planar_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: RingSeedEnum.ring_signet_gold_sapphire,
//         name: 'Sapphire Signet Ring',
//         crafter: 'Unknown',
//         description: 'A gold signet ring with a perfect sapphire.',
//         image: 'ring_signet_gold_sapphire.png',
//         cost: 15000,
//         weight: 1,
//         tier: Tier.rare,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [TraitEnum.trait_dexterity_02, TraitEnum.trait_agility_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     // MARK: - Epic Rings
//     new GearInstance({
//         id: RingSeedEnum.ring_signet_gold_diamond,
//         name: 'Diamond Signet Ring',
//         crafter: 'Unknown',
//         description: 'A gold signet ring with a perfect diamond.',
//         image: 'ring_signet_gold_diamond.png',
//         cost: 27500,
//         weight: 1,
//         tier: Tier.epic,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [TraitEnum.trait_charisma_02, TraitEnum.trait_luck_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),

//     new GearInstance({
//         id: RingSeedEnum.ring_signet_gold_onyx,
//         name: 'Onyx Signet Ring',
//         crafter: 'Unknown',
//         description: 'A gold signet ring with a perfect onyx.',
//         image: 'ring_signet_gold_onyx.png',
//         cost: 27500,
//         weight: 1,
//         tier: Tier.epic,
//         gearType: GearType.ring,
//         specificType: EquipmentType.ring,
//         specialTrait: [TraitEnum.trait_intelligence_02, TraitEnum.trait_leadership_02],
//         material: 'Gold',
//         class: 'accessory'
//     }),
// ];