import { EquipmentType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { TraitEnum } from "../../../../Entities/Traits/TraitEnums";

// Armor would have specific type of at least light, medium, heavy: Cloth is just for shirt, pants
export enum GearSeedArmorEnum {
    // Common
    armor_light_leather = 'armor_light_leather',
    armor_light_hide = 'armor_light_hide',

    // Uncommon
    armor_light_chain = 'armor_light_chain',
    armor_medium_breastplate = 'armor_medium_breastplate',
    armor_medium_scalemail = 'armor_medium_scalemail',
    armor_medium_chainmail = 'armor_medium_chainmail',

    // Rare
    armor_heavy_bandedmail = 'armor_heavy_bandedmail',
    armor_heavy_splintmail = 'armor_heavy_splintmail',
    armor_heavy_fullplate = 'armor_heavy_fullplate',

    // Epic
    armor_light_mithril = 'armor_light_mithril',                
    armor_light_silver = 'armor_light_silver',                  
    armor_medium_mithril = 'armor_medium_mithril',              
    armor_medium_dragonlingLeather = 'armor_medium_dragonlingLeather', 
    armor_heavy_mithril = 'armor_heavy_mithril',                
    armor_heavy_gold = 'armor_heavy_gold',                      

    // Legendary
    armor_medium_dragonscale = 'armor_medium_dragonscale',     
    armor_heavy_titansteel = 'armor_heavy_titansteel',         

    // Unique (unique items that are already in game with NPCs)
}

// export const GearSeedArmor: GearInstance[] = [
//     // MARK: - Common
//     // Light Armor - Leather
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_light_leather,
//         name: 'Leather Armor',
//         crafter: 'Unknown',
//         description: 'A simple set of light leather armor.',
//         image: 'armor_light_leather.png',
//         cost: 800,
//         weight: 5,
//         tier: Tier.common,
//         gearType: GearType.armor,
//         specificType: EquipmentType.lightArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 1,
//             bluntDEF: 1,
//             pierceDEF: 1,
//             mDEF: 0,
//             geoDEF: 0,
//             waterDEF: 0,
//             airDEF: 0,
//             fireDEF: 0,
//             orderDEF: 0,
//             chaosDEF: 0,
//             dodge: 0, // Neutral for leather
//         },
//         specialTrait: [],
//         material: "Leather",
//         spellCastingDamageMultiplier: 0.7,
//         spellCastingPenaltyHit: -2,
//         class: 'light',
//     }),

//     // Light Armor - Hide
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_light_hide,
//         name: 'Hide Armor',
//         crafter: 'Unknown',
//         description: 'Armor made from animal hide, offering basic protection.',
//         image: 'armor_light_hide.png',
//         cost: 1000,
//         weight: 6,
//         tier: Tier.common,
//         gearType: GearType.armor,
//         specificType: EquipmentType.lightArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 2,
//             bluntDEF: 1,
//             pierceDEF: 1,
//             mDEF: 0,
//             geoDEF: 0,
//             waterDEF: 0,
//             airDEF: 0,
//             fireDEF: 0,
//             orderDEF: 0,
//             chaosDEF: 0,
//             dodge: -1, // Slight weight reduction in mobility
//         },
//         specialTrait: [],
//         material: "Hide",
//         spellCastingDamageMultiplier: 0.6,
//         spellCastingPenaltyHit: -3,
//         class: 'light',
//     }),

//     // MARK: - Uncommon
//     // Light Armor - Chain
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_light_chain,
//         name: 'Chain Shirt',
//         crafter: 'Unknown',
//         description: 'A lightweight chain shirt offering good protection.',
//         image: 'armor_light_chain.png',
//         cost: 1500,
//         weight: 7,
//         tier: Tier.uncommon,
//         gearType: GearType.armor,
//         specificType: EquipmentType.lightArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 2,
//             bluntDEF: 2,
//             pierceDEF: 2,
//             mDEF: 0,
//             geoDEF: 0,
//             waterDEF: 0,
//             airDEF: 0,
//             fireDEF: 0,
//             orderDEF: 0,
//             chaosDEF: 0,
//             dodge: -2, // Chain mail reduces mobility slightly
//         },
//         specialTrait: [],
//         material: "Steel",
//         spellCastingDamageMultiplier: 0.5,
//         spellCastingPenaltyHit: -4,
//         class: 'light',
//     }),

//     // Medium Armor - Breastplate
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_medium_breastplate,
//         name: 'Breastplate',
//         crafter: 'Unknown',
//         description: 'A metal breastplate designed to protect the torso.',
//         image: 'armor_medium_breastplate.png',
//         cost: 1800,
//         weight: 10,
//         tier: Tier.uncommon,
//         gearType: GearType.armor,
//         specificType: EquipmentType.mediumArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 3,
//             bluntDEF: 3,
//             pierceDEF: 2,
//             mDEF: 0,
//             geoDEF: 1,
//             waterDEF: 1,
//             airDEF: 1,
//             fireDEF: 1,
//             orderDEF: 0,
//             chaosDEF: 0,
//             dodge: -2,
//         },
//         specialTrait: [],
//         material: "Steel",
//         spellCastingDamageMultiplier: 0.5,
//         spellCastingPenaltyHit: -4,
//         class: 'medium',
//     }),

//     // Medium Armor - Scale Mail
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_medium_scalemail,
//         name: 'Scale Mail',
//         crafter: 'Unknown',
//         description: 'Armor with overlapping metal scales for improved protection.',
//         image: 'armor_medium_scalemail.png',
//         cost: 2000,
//         weight: 12,
//         tier: Tier.uncommon,
//         gearType: GearType.armor,
//         specificType: EquipmentType.mediumArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 3,
//             bluntDEF: 2,
//             pierceDEF: 3,
//             mDEF: 0,
//             geoDEF: 1,
//             waterDEF: 1,
//             airDEF: 1,
//             fireDEF: 1,
//             orderDEF: 0,
//             chaosDEF: 0,
//             dodge: -2,
//         },
//         specialTrait: [],
//         material: "Steel",
//         spellCastingDamageMultiplier: 0.5,
//         spellCastingPenaltyHit: -4,
//         class: 'medium',
//     }),

//     // Medium Armor - Chainmail
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_medium_chainmail,
//         name: 'Chainmail',
//         crafter: 'Unknown',
//         description: 'A full set of medium chainmail armor for balanced protection.',
//         image: 'armor_medium_chainmail.png',
//         cost: 2200,
//         weight: 15,
//         tier: Tier.uncommon,
//         gearType: GearType.armor,
//         specificType: EquipmentType.mediumArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 2,
//             bluntDEF: 2,
//             pierceDEF: 3,
//             mDEF: 0,
//             geoDEF: 1,
//             waterDEF: 1,
//             airDEF: 1,
//             fireDEF: 1,
//             orderDEF: 0,
//             chaosDEF: 0,
//             dodge: -2,
//         },
//         specialTrait: [],
//         material: "Steel",
//         spellCastingDamageMultiplier: 0.4,
//         spellCastingPenaltyHit: -5,
//         class: 'medium',
//     }),

//     // MARK: - Rare
//     // Heavy Armor - Banded Mail
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_heavy_bandedmail,
//         name: 'Banded Mail',
//         crafter: 'Unknown',
//         description: 'Heavy armor reinforced with metal bands for added protection.',
//         image: 'armor_heavy_bandedmail.png',
//         cost: 9500, // Close to 10k to reflect its rare and heavy nature
//         weight: 25,
//         tier: Tier.rare,
//         gearType: GearType.armor,
//         specificType: EquipmentType.heavyArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 4,
//             bluntDEF: 4,
//             pierceDEF: 3,
//             mDEF: 0,
//             geoDEF: 2,
//             waterDEF: 2,
//             airDEF: 2,
//             fireDEF: 2,
//             orderDEF: 2,
//             chaosDEF: 2,
//             dodge: -3, // Heavy armor reduces mobility significantly
//         },
//         specialTrait: [],
//         material: "Steel",
//         spellCastingDamageMultiplier: 0.4, // Heavy penalty for spellcasters
//         spellCastingPenaltyHit: -5, // Significant spell accuracy reduction
//         class: 'heavy',
//     }),

//     // Heavy Armor - Splint Mail
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_heavy_splintmail,
//         name: 'Splint Mail',
//         crafter: 'Unknown',
//         description: 'Heavy armor made from vertical metal strips (splints) for superior defense.',
//         image: 'armor_heavy_splintmail.png',
//         cost: 12500, // Strong price increase due to better defense and higher material cost
//         weight: 28,
//         tier: Tier.rare,
//         gearType: GearType.armor,
//         specificType: EquipmentType.heavyArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 4,
//             bluntDEF: 4,
//             pierceDEF: 3,
//             mDEF: 0,
//             geoDEF: 2,
//             waterDEF: 2,
//             airDEF: 2,
//             fireDEF: 2,
//             orderDEF: 2,
//             chaosDEF: 2,
//             dodge: -3,
//         },
//         specialTrait: [],
//         material: "Steel",
//         spellCastingDamageMultiplier: 0.3, // Even greater penalty for spellcasters
//         spellCastingPenaltyHit: -6, // Greater spell accuracy reduction
//         class: 'heavy',
//     }),

//     // Heavy Armor - Full Plate Armor
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_heavy_fullplate,
//         name: 'Full Plate Armor',
//         crafter: 'Unknown',
//         description: 'A full suit of heavy plate armor providing exceptional protection in battle.',
//         image: 'armor_heavy_fullplate.png',
//         cost: 16000, // Extremely expensive due to its top-tier protection and material
//         weight: 35,
//         tier: Tier.rare,
//         gearType: GearType.armor,
//         specificType: EquipmentType.heavyArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 5,
//             bluntDEF: 4,
//             pierceDEF: 4,
//             mDEF: 0,
//             geoDEF: 3,
//             waterDEF: 3,
//             airDEF: 3,
//             fireDEF: 3,
//             orderDEF: 2,
//             chaosDEF: 2,
//             dodge: -4,
//         },
//         specialTrait: [],
//         material: "Steel",
//         spellCastingDamageMultiplier: 0.3, // Harsh penalty for spellcasters
//         spellCastingPenaltyHit: -6, // Major reduction in spell accuracy
//         class: 'heavy',
//     }),

//     // MARK: - Epic
//     // Light Armor - Mithril
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_light_mithril,
//         name: 'Mithril Light Armor',
//         crafter: 'Unknown',
//         description: 'A lightweight, incredibly strong armor forged from mithril.',
//         image: 'armor_light_mithril.png',
//         cost: 150000, // Rare and very valuable
//         weight: 4,
//         tier: Tier.epic,
//         gearType: GearType.armor,
//         specificType: EquipmentType.armor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 3,
//             bluntDEF: 2,
//             pierceDEF: 3,
//             mDEF: 0, // Exceptional magic resistance
//             geoDEF: 3,
//             waterDEF: 3,
//             airDEF: 3,
//             fireDEF: 3,
//             orderDEF: 3,
//             chaosDEF: 3,
//             dodge: 0,
//         },
//         specialTrait: [],
//         material: "Mithril",
//         spellCastingDamageMultiplier: 0.8,
//         spellCastingPenaltyHit: -1,
//         class: 'light',
//     }),

//     // Light Armor - Silver
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_light_silver,
//         name: 'Silver Light Armor',
//         crafter: 'Unknown',
//         description: 'A beautiful set of silver armor, light yet protective.',
//         image: 'armor_light_silver.png',
//         cost: 120000, // Highly valuable material
//         weight: 5,
//         tier: Tier.epic,
//         gearType: GearType.armor,
//         specificType: EquipmentType.lightArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 2,
//             bluntDEF: 2,
//             pierceDEF: 2,
//             mDEF: 0, 
//             geoDEF: 4,
//             waterDEF: 4,
//             airDEF: 4,
//             fireDEF: 4,
//             orderDEF: 4,
//             chaosDEF: 4,
//             dodge: 0,
//         },
//         specialTrait: [],
//         material: "Silver",
//         spellCastingDamageMultiplier: 0.7,
//         spellCastingPenaltyHit: 0,
//         class: 'light',
//     }),

//     // Medium Armor - Mithril
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_medium_mithril,
//         name: 'Mithril Medium Armor',
//         crafter: 'Unknown',
//         description: 'Mithril medium armor offering the perfect balance of defense and weight.',
//         image: 'armor_medium_mithril.png',
//         cost: 180000, // Mithril in medium armor form is incredibly rare
//         weight: 10,
//         tier: Tier.epic,
//         gearType: GearType.armor,
//         specificType: EquipmentType.mediumArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 4,
//             bluntDEF: 4,
//             pierceDEF: 4,
//             mDEF: 0,
//             geoDEF: 4,
//             waterDEF: 4,
//             airDEF: 4,
//             fireDEF: 4,
//             orderDEF: 4,
//             chaosDEF: 4,
//             dodge: -1,
//         },
//         specialTrait: [],
//         material: "Mithril",
//         spellCastingDamageMultiplier: 0.6,
//         spellCastingPenaltyHit: -2,
//         class: 'medium',
//     }),


//     // Medium Armor - Dragonling Leather
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_medium_dragonlingLeather,
//         name: 'Dragonling Leather Armor',
//         crafter: 'Unknown',
//         description: 'Armor made from the hide of a dragonling, offering great protection and flexibility.',
//         image: 'armor_medium_dragonlingLeather.png',
//         cost: 220000, // Extremely rare material from dragonlings
//         weight: 10,
//         tier: Tier.epic,
//         gearType: GearType.armor,
//         specificType: EquipmentType.mediumArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 5,
//             bluntDEF: 4,
//             pierceDEF: 4,
//             mDEF: 0,
//             geoDEF: 3,
//             waterDEF: 3,
//             airDEF: 3,
//             orderDEF: 3,
//             chaosDEF: 0,
//             fireDEF: 4,
//             dodge: -1,
//         },
//         specialTrait: [],
//         material: "Dragonling Leather",
//         spellCastingDamageMultiplier: 0.6,
//         spellCastingPenaltyHit: -2,
//         class: 'medium',
//     }),

//     // Heavy Armor - Mithril
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_heavy_mithril,
//         name: 'Mithril Heavy Armor',
//         crafter: 'Unknown',
//         description: 'A rare and valuable suit of heavy mithril armor, offering superior protection.',
//         image: 'armor_heavy_mithril.png',
//         cost: 250000, // High-end epic armor
//         weight: 25,
//         tier: Tier.epic,
//         gearType: GearType.armor,
//         specificType: EquipmentType.heavyArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 6,
//             bluntDEF: 5,
//             pierceDEF: 5,
//             mDEF: 0, 
//             geoDEF: 5,
//             waterDEF: 5,
//             airDEF: 5,
//             fireDEF: 5,
//             orderDEF: 5,
//             chaosDEF: 5,
//             dodge: -3,
//         },
//         specialTrait: [],
//         material: "Mithril",
//         spellCastingDamageMultiplier: 0.4,
//         spellCastingPenaltyHit: -4,
//         class: 'heavy',
//     }),

//     // Heavy Armor - Gold
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_heavy_gold,
//         name: 'Gold Heavy Armor',
//         crafter: 'Unknown',
//         description: 'A luxurious yet protective heavy armor crafted from gold.',
//         image: 'armor_heavy_gold.png',
//         cost: 300000, // Gold is extremely valuable in heavy armor
//         weight: 28,
//         tier: Tier.epic,
//         gearType: GearType.armor,
//         specificType: EquipmentType.heavyArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 5,
//             bluntDEF: 5,
//             pierceDEF: 4,
//             mDEF: 0, // High magical protection
//             geoDEF: 4,
//             waterDEF: 4,
//             airDEF: 4,
//             fireDEF: 4,
//             orderDEF: 4,
//             chaosDEF: 4,
//             dodge: -4,
//         },
//         specialTrait: [],
//         material: "Gold",
//         spellCastingDamageMultiplier: 0.3,
//         spellCastingPenaltyHit: -4,
//         class: 'heavy',
//     }),

//     // MARK: - Legendary
//     // Medium Armor - Dragonscale
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_medium_dragonscale,
//         name: 'Dragonscale Armor',
//         crafter: 'Unknown',
//         description: 'Armor forged from the scales of a legendary dragon, offering unmatched protection and magical resistance.',
//         image: 'armor_medium_dragonscale.png',
//         cost: 500000, // Extremely rare and valuable material
//         weight: 12,
//         tier: Tier.legendary,
//         gearType: GearType.armor,
//         specificType: EquipmentType.mediumArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 6,
//             bluntDEF: 5,
//             pierceDEF: 5,
//             mDEF: 0,  // Superior magical defense
//             fireDEF: 6,  // Significant fire resistance due to dragon origin
//             airDEF: 4,   // Slight air resistance
//             geoDEF: 4,
//             waterDEF: 4,
//             orderDEF: 4,
//             chaosDEF: 4,
//             dodge: -1,
//         },
//         specialTrait: [],
//         material: "Dragonscale",
//         spellCastingDamageMultiplier: 0.6,
//         spellCastingPenaltyHit: -3,
//         class: 'medium',
//     }),

//     // Heavy Armor - Titansteel
//     new GearInstance({
//         id: GearSeedArmorEnum.armor_heavy_titansteel,
//         name: 'Titansteel Heavy Armor',
//         crafter: 'Unknown',
//         description: 'A nearly indestructible suit of heavy armor made from titansteel, granting overwhelming protection.',
//         image: 'armor_heavy_titansteel.png',
//         cost: 700000, // One of the most expensive materials available
//         weight: 40,
//         tier: Tier.legendary,
//         gearType: GearType.armor,
//         specificType: EquipmentType.heavyArmor,
//         defenseStats: {
//             pDEF: 0,
//             slashDEF: 8,
//             bluntDEF: 7,
//             pierceDEF: 7,
//             mDEF: 0,  // Decent magic protection despite being a heavy armor
//             geoDEF: 6, // Bonus geo resistance from titansteel properties
//             fireDEF: 6, // Bonus fire resistance
//             waterDEF: 6,
//             airDEF: 6,
//             orderDEF: 6,
//             chaosDEF: 6,
//             dodge: -6,  // Very heavy and difficult to move in
//         },
//         specialTrait: [],
//         material: "Titansteel",
//         spellCastingDamageMultiplier: 0.3,
//         spellCastingPenaltyHit: -5,
//         class: 'heavy',
//     }),
// ];