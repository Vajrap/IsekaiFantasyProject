import { ArmorType, GlovesEnum } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Tier } from "../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Gloves } from "./Gloves";

const cloth_gloves = new Gloves({
    id: GlovesEnum.cloth_gloves,
    name: 'Cloth Gloves',
    description: 'Simple cloth gloves offering comfort and utility.',
    image: 'cloth_gloves.png',
    cost: { baseCost: 50, bonusCost: 0 },
    weight: 200,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cloth',
    defenseStats: {},
    // TODO: trait increases artisan checks (e.g., crafting or tailoring) by 1.
    specialTrait: []
});

const cloth_bracers = new Gloves({
    id: GlovesEnum.cloth_bracers,
    name: 'Cloth Bracers',
    description: 'Light bracers made of cloth for minimal protection.',
    image: 'cloth_bracers.png',
    cost: { baseCost: 75, bonusCost: 0 },
    weight: 300,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cloth',
    defenseStats: {},
    // TODO: trait reduces fatigue for repetitive crafting tasks.
    specialTrait: []
});

const light_gloves = new Gloves({
    id: GlovesEnum.light_gloves,
    name: 'Light Gloves',
    description: 'Thin gloves offering better grip.',
    image: 'light_gloves.png',
    cost: { baseCost: 100, bonusCost: 0 },
    weight: 250,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Leather',
    defenseStats: {},
    // TODO: trait increases hit modifier by 1 when using daggers or bows.
    specialTrait: []
});

const light_leather_bracers = new Gloves({
    id: GlovesEnum.light_leather_bracers,
    name: 'Light Leather Bracers',
    description: 'Leather bracers providing minor wrist support.',
    image: 'light_leather_bracers.png',
    cost: { baseCost: 150, bonusCost: 0 },
    weight: 400,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Leather',
    defenseStats: {},
    // TODO: trait increases parrying effectiveness slightly with swords.
    specialTrait: []
});

const medium_gloves = new Gloves({
    id: GlovesEnum.medium_gloves,
    name: 'Medium Gloves',
    description: 'Durable gloves for handling tough environments.',
    image: 'medium_gloves.png',
    cost: { baseCost: 250, bonusCost: 0 },
    weight: 500,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Reinforced Leather',
    defenseStats: {},
    // TODO: trait increases artisan checks for blacksmithing or mining by 1.
    specialTrait: []
});

const medium_chain_bracers = new Gloves({
    id: GlovesEnum.medium_chain_bracers,
    name: 'Medium Chain Bracers',
    description: 'Chain-linked bracers for wrist protection.',
    image: 'medium_chain_bracers.png',
    cost: { baseCost: 400, bonusCost: 0 },
    weight: 1200,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Steel',
    defenseStats: {},
    // TODO: trait reduces fatigue from prolonged weapon usage.
    specialTrait: []
});

const heavy_gauntlets = new Gloves({
    id: GlovesEnum.heavy_gauntlets,
    name: 'Heavy Gauntlets',
    description: 'Sturdy gauntlets designed for battlefield use.',
    image: 'heavy_gauntlets.png',
    cost: { baseCost: 800, bonusCost: 0 },
    weight: 2000,
    tier: Tier.rare,
    armorType: ArmorType.heavy,
    material: 'Steel',
    defenseStats: {},
    // TODO: trait increases weapon hit modifier by 1 for blunt weapons.
    specialTrait: []
});

const heavy_plate_bracers = new Gloves({
    id: GlovesEnum.heavy_plate_bracers,
    name: 'Heavy Plate Bracers',
    description: 'Plate bracers providing exceptional wrist protection.',
    image: 'heavy_plate_bracers.png',
    cost: { baseCost: 1000, bonusCost: 0 },
    weight: 2500,
    tier: Tier.rare,
    armorType: ArmorType.heavy,
    material: 'Steel',
    defenseStats: {},
    // TODO: trait reduces knockback effects during combat.
    specialTrait: []
});

export const glovesRepository = {
    cloth_gloves,
    cloth_bracers,
    light_gloves,
    light_leather_bracers,
    medium_gloves,
    medium_chain_bracers,
    heavy_gauntlets,
    heavy_plate_bracers
};