import { EquipmentType, GearType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearInstance } from "../../../../Entities/Items/GearInstance/GearInstance";
import { TraitEnum } from "../../../../Entities/Traits/TraitEnums";

export enum ClothSeedEnum {
    cloth_cotton = 'cloth_cotton',
    cloth_hemp = 'cloth_hemp',
    cloth_wool = 'cloth_wool',
    cloth_silk = 'cloth_silk',
    cloth_linen = 'cloth_linen',
    cloth_bamboo_fiber = 'cloth_bamboo_fiber',
    cloth_jute = 'cloth_jute',
    cloth_spider_silk = 'cloth_spider_silk',
    cloth_mammoth_wool = 'cloth_mammoth_wool',
    cloth_moonlit_cotton = 'cloth_moonlit_cotton',
    cloth_arcane_silk = 'cloth_arcane_silk',
    cloth_eldritch_mammoth_wool = 'cloth_eldritch_mammoth_wool'
}

export const GearSeedCloth: GearInstance[] = [
    // MARK: - Common Clothes
    new GearInstance({
        id: 'cloth_cotton',
        name: 'Cotton Clothes',
        crafter: 'Unknown',
        description: 'Simple and comfortable cotton clothing.',
        image: 'cloth_cotton.png',
        cost: 100,  // Increased price for common material
        weight: 1,
        tier: Tier.common,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Cotton',
        class: 'cloth',
    }),

    new GearInstance({
        id: 'cloth_hemp',
        name: 'Hemp Clothes',
        crafter: 'Unknown',
        description: 'Rough and durable hempen clothing.',
        image: 'cloth_hemp.png',
        cost: 150,  // Higher cost due to durability
        weight: 1,
        tier: Tier.common,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Hemp',
        class: 'cloth',
    }),
    

    new GearInstance({
        id: 'cloth_wool',
        name: 'Wool Clothes',
        crafter: 'Unknown',
        description: 'Warm woolen clothing, ideal for cold weather.',
        image: 'cloth_wool.png',
        cost: 250,  // Wool is more valuable
        weight: 2,
        tier: Tier.common,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Wool',
        class: 'cloth',
    }),
    

    // MARK: - Uncommon Clothes
    new GearInstance({
        id: 'cloth_silk',
        name: 'Silk Clothes',
        crafter: 'Unknown',
        description: 'Elegant silk clothing, soft and luxurious.',
        image: 'cloth_silk.png',
        cost: 1200,  // Price jump for uncommon luxury material
        weight: 1,
        tier: Tier.uncommon,
        gearType: GearType.equipment,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Silk',
        class: 'cloth',
    }),
    

    new GearInstance({
        id: 'cloth_linen',
        name: 'Linen Clothes',
        crafter: 'Unknown',
        description: 'Light and breathable linen clothing.',
        image: 'cloth_linen.png',
        cost: 900,  // Linen as a more durable fabric
        weight: 1,
        tier: Tier.uncommon,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Linen',
        class: 'cloth',
    }),
    

    // MARK: - Rare Clothes
    new GearInstance({
        id: 'cloth_bamboo_fiber',
        name: 'Bamboo Fiber Clothes',
        crafter: 'Unknown',
        description: 'Soft bamboo fiber clothes, eco-friendly and durable.',
        image: 'cloth_bamboo_fiber.png',
        cost: 5000,  // Significant price increase for rare material
        weight: 1,
        tier: Tier.rare,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Bamboo Fiber',
        class: 'cloth',
    }),
    

    new GearInstance({
        id: 'cloth_jute',
        name: 'Jute Clothes',
        crafter: 'Unknown',
        description: 'Rough and coarse jute clothing, durable and functional.',
        image: 'cloth_jute.png',
        cost: 4000,  // Rare, but less luxurious than bamboo
        weight: 2,
        tier: Tier.rare,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Jute',
        class: 'cloth',
    }),
    

    // MARK: - Epic Clothes
    new GearInstance({
        id: 'cloth_spider_silk',
        name: 'Spider Silk Clothes',
        crafter: 'Unknown',
        description: 'Light, rare, and silky smooth clothing woven from spider silk.',
        image: 'cloth_spider_silk.png',
        cost: 25000,  // Rare and exotic material, priced accordingly
        weight: 1,
        tier: Tier.epic,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Spider Silk',
        class: 'cloth',
    }),
    

    new GearInstance({
        id: 'cloth_mammoth_wool',
        name: 'Mammoth Wool Clothes',
        crafter: 'Unknown',
        description: 'Exceptionally warm clothes made from rare mammoth wool.',
        image: 'cloth_mammoth_wool.png',
        cost: 60000,  // Premium, rare material with high price
        weight: 3,
        tier: Tier.epic,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Mammoth Wool',
        class: 'cloth',
    }),
    

    // MARK: - Legendary Clothes
    new GearInstance({
        id: 'cloth_moonlit_cotton',
        name: 'Moonlit Cotton Clothes',
        crafter: 'Unknown',
        description: 'Clothes woven from cotton under the light of a full moon, enhancing magical properties.',
        image: 'cloth_moonlit_cotton.png',
        cost: 120000,  // Highly rare and mystical material
        weight: 1,
        tier: Tier.legendary,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [TraitEnum.trait_planar_01],
        material: 'Moonlit Cotton',
        class: 'cloth',
        arcaneAptitude: 5,
        
    }),

    new GearInstance({
        id: 'cloth_arcane_silk',
        name: 'Arcane Silk Clothes',
        crafter: 'Unknown',
        description: 'Clothes made from arcane silk, imbued with magical energy to enhance spellcasting.',
        image: 'cloth_arcane_silk.png',
        cost: 200000,  // Arcane-infused material, priced significantly higher
        weight: 1,
        tier: Tier.unique,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [TraitEnum.trait_planar_01],
        material: 'Arcane Silk',
        class: 'cloth',
        arcaneAptitude: 10,
        
    }),

    new GearInstance({
        id: 'cloth_eldritch_mammoth_wool',
        name: 'Eldritch Mammoth Wool Clothes',
        crafter: 'Unknown',
        description: 'A rare, otherworldly variation of mammoth wool infused with eldritch energies.',
        image: 'cloth_eldritch_mammoth_wool.png',
        cost: 300000,  // Extremely rare, high price for eldritch-infused material
        weight: 3,
        tier: Tier.unique,
        gearType: GearType.cloth,
        specificType: EquipmentType.cloth,
        specialTrait: [],
        material: 'Eldritch Mammoth Wool',
        class: 'cloth',
        arcaneAptitude: 5,
        
    }),
];