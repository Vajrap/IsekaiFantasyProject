import { TraitEnum } from "../../../../Entities/Traits/TraitEnums";
import { EquipmentType, GearType } from "../../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearInstance } from "../../../../Entities/Items/GearInstance/GearInstance";

export enum GearSeedHeadwearEnum {
    // Common
    headwear_hood_cloth = 'headwear_hood_cloth',
    headwear_hood_leather = 'headwear_hood_leather',
    headwear_cap_cloth = 'headwear_cap_cloth',
    headwear_cap_wool = 'headwear_cap_wool',

    // Uncommon
    headwear_hood_fur = 'headwear_hood_fur',
    headwear_cap_silk = 'headwear_cap_silk',
    headwear_helm_bronze = 'headwear_helm_bronze',
    headwear_helm_chain = 'headwear_helm_chain',

    // Rare
    headwear_helm_iron = 'headwear_helm_iron',
    headwear_helm_steel = 'headwear_helm_steel',
    headwear_circlet_silver = 'headwear_circlet_silver',
    headwear_circlet_gold = 'headwear_circlet_gold',

    // Epic
    headwear_helm_mithril = 'headwear_helm_mithril',
    headwear_circlet_mithril = 'headwear_circlet_mithril',
    headwear_hood_spider_silk = 'headwear_hood_spider_silk',

    // Legendary
    headwear_helm_dragonscale = 'headwear_helm_dragonscale',
    headwear_circlet_dragonbone = 'headwear_circlet_dragonbone',
}

export const GearSeedHeadwear: GearInstance[] = [
    // MARK: - Common Headwear
    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_hood_cloth,
        name: 'Cloth Hood',
        crafter: 'Unknown',
        description: 'A simple hood made of cloth.',
        image: 'headwear_hood_cloth.png',
        cost: 300,
        weight: 1,
        tier: Tier.common,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 1,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Cloth',
        class: 'cloth',
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_hood_leather,
        name: 'Leather Hood',
        crafter: 'Unknown',
        description: 'A simple hood made of leather.',
        image: 'headwear_hood_leather.png',
        cost: 400,
        weight: 1,
        tier: Tier.common,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 1,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Leather',
        class: 'light'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_cap_cloth,
        name: 'Cloth Cap',
        crafter: 'Unknown',
        description: 'A simple cap made of cloth.',
        image: 'headwear_cap_cloth.png',
        cost: 200,
        weight: 1,
        tier: Tier.common,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 1,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Cloth',
        class: 'cloth'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_cap_wool,
        name: 'Wool Cap',
        crafter: 'Unknown',
        description: 'A simple cap made of wool.',
        image: 'headwear_cap_wool.png',
        cost: 300,
        weight: 1,
        tier: Tier.common,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 1,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Wool',
        class: 'cloth'
    }),

    // MARK: - Uncommon Headwear
    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_hood_fur,
        name: 'Fur Hood',
        crafter: 'Unknown',
        description: 'A warm hood made of fur.',
        image: 'headwear_hood_fur.png',
        cost: 600,
        weight: 2,
        tier: Tier.uncommon,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 1,
            bluntDEF: 1,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Fur',
        class: 'light'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_cap_silk,
        name: 'Silk Cap',
        crafter: 'Unknown',
        description: 'A luxurious cap made of silk.',
        image: 'headwear_cap_silk.png',
        cost: 1200,
        weight: 1,
        tier: Tier.uncommon,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 1,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Silk',
        class: 'cloth'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_helm_bronze,
        name: 'Bronze Helm',
        crafter: 'Unknown',
        description: 'A sturdy helm made of bronze.',
        image: 'headwear_helm_bronze.png',
        cost: 800,
        weight: 3,
        tier: Tier.uncommon,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 1,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Bronze',
        class: 'light'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_helm_chain,
        name: 'Chain Helm',
        crafter: 'Unknown',
        description: 'A protective helm made of chainmail.',
        image: 'headwear_helm_chain.png',
        cost: 1000,
        weight: 4,
        tier: Tier.uncommon,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 1,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Chainmail',
        class: 'medium'
    }),

    // MARK: - Rare Headwear
    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_helm_iron,
        name: 'Iron Helm',
        crafter: 'Unknown',
        description: 'A heavy helm made of iron.',
        image: 'headwear_helm_iron.png',
        cost: 1200,
        weight: 5,
        tier: Tier.rare,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 2,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Iron',
        class: 'medium'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_helm_steel,
        name: 'Steel Helm',
        crafter: 'Unknown',
        description: 'A strong helm made of steel.',
        image: 'headwear_helm_steel.png',
        cost: 4500,
        weight: 6,
        tier: Tier.rare,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 1,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Steel',
        class: 'heavy'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_circlet_silver,
        name: 'Silver Circlet',
        crafter: 'Unknown',
        description: 'An elegant circlet made of silver.',
        image: 'headwear_circlet_silver.png',
        cost: 3000,
        weight: 1,
        tier: Tier.rare,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [TraitEnum.trait_charisma_01],
        material: 'Silver',
        class: 'accessory'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_circlet_gold,
        name: 'Gold Circlet',
        crafter: 'Unknown',
        description: 'A regal circlet made of gold.',
        image: 'headwear_circlet_gold.png',
        cost: 15000,
        weight: 1,
        tier: Tier.rare,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 0,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [TraitEnum.trait_charisma_01],
        material: 'Gold',
        class: 'accessory'
    }),

    // MARK: - Epic Headwear
    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_helm_mithril,
        name: 'Mithril Helm',
        crafter: 'Unknown',
        description: 'A rare helm made of mithril.',
        image: 'headwear_helm_mithril.png',
        cost: 100000,
        weight: 3,
        tier: Tier.epic,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 1,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 1,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Mithril',
        class: 'light'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_circlet_mithril,
        name: 'Mithril Circlet',
        crafter: 'Unknown',
        description: 'A rare circlet made of mithril.',
        image: 'headwear_circlet_mithril.png',
        cost: 80000,
        weight: 1,
        tier: Tier.epic,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 1,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 1,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [TraitEnum.trait_charisma_01],
        material: 'Mithril',
        class: 'accessory'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_hood_spider_silk,
        name: 'Spider Silk Hood',
        crafter: 'Unknown',
        description: 'A light hood made of spider silk.',
        image: 'headwear_hood_spider_silk.png',
        cost: 76000,
        weight: 1,
        tier: Tier.epic,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 2,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Spider Silk',
        class: 'cloth'
    }),

    // MARK: - Legendary Headwear
    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_helm_dragonscale,
        name: 'Dragonscale Helm',
        crafter: 'Unknown',
        description: 'A legendary helm made of dragonscale.',
        image: 'headwear_helm_dragonscale.png',
        cost: 350000,
        weight: 5,
        tier: Tier.legendary,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 2,
            slashDEF: 0,
            bluntDEF: 0,
            pierceDEF: 0,
            mDEF: 2,
            geoDEF: 0,
            waterDEF: 0,
            airDEF: 0,
            fireDEF: 0,
            orderDEF: 0,
            chaosDEF: 0,
            dodge: 0
        },
        specialTrait: [],
        material: 'Dragonscale',
        class: 'medium'
    }),

    new GearInstance({
        id: GearSeedHeadwearEnum.headwear_circlet_dragonbone,
        name: 'Dragonbone Circlet',
        crafter: 'Unknown',
        description: 'A legendary circlet made of dragonbone.',
        image: 'headwear_circlet_dragonbone.png',
        cost: 250000,
        weight: 1,
        tier: Tier.legendary,
        gearType: GearType.headwear,
        specificType: EquipmentType.headWear,
        defenseStats: {
            pDEF: 0,
            slashDEF: 1,
            bluntDEF: 1,
            pierceDEF: 1,
            mDEF: 0,
            geoDEF: 1,
            waterDEF: 1,
            airDEF: 1,
            fireDEF: 1,
            orderDEF: 1,
            chaosDEF: 1,
            dodge: 0
        },
        specialTrait: [],
        material: 'Dragonbone',
        class: 'accessory'
    }),
];
/*

*/