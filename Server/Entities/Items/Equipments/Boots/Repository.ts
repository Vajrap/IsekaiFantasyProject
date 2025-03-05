import { ArmorType, BootsEnum } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Tier } from "../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Boots } from "./Boots";

const cloth_boots = new Boots({
    id: BootsEnum.cloth_boots,
    name: 'Cloth Boots',
    description: 'Soft boots made of cloth, offering basic comfort.',
    image: 'cloth_boots.png',
    cost: { baseCost: 50, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 300,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cloth',
    defenseStats: {},
    // TODO: trait increases movement speed slightly on non-rough terrain.
    specialTrait: []
});

const cloth_slippers = new Boots({
    id: BootsEnum.cloth_slippers,
    name: 'Cloth Slippers',
    description: 'Lightweight slippers offering no real protection.',
    image: 'cloth_slippers.png',
    cost: { baseCost: 30, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 200,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cloth',
    defenseStats: {},
    // TODO: trait increases stealth checks slightly on smooth surfaces.
    specialTrait: []
});

const light_boots = new Boots({
    id: BootsEnum.light_boots,
    name: 'Light Boots',
    description: 'Durable boots offering moderate support.',
    image: 'light_boots.png',
    cost: { baseCost: 150, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 800,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Leather',
    defenseStats: {},
    // TODO: trait reduces fatigue when traveling on foot over long distances.
    specialTrait: []
});

const light_leather_boots = new Boots({
    id: BootsEnum.light_leather_boots,
    name: 'Light Leather Boots',
    description: 'Sturdy leather boots for rough terrains.',
    image: 'light_leather_boots.png',
    cost: { baseCost: 200, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 1000,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Leather',
    defenseStats: {},
    // TODO: trait increases jumping distance slightly.
    specialTrait: []
});

const medium_boots = new Boots({
    id: BootsEnum.medium_boots,
    name: 'Medium Boots',
    description: 'Reinforced boots offering better durability.',
    image: 'medium_boots.png',
    cost: { baseCost: 400, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 1500,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Reinforced Leather',
    defenseStats: {},
    // TODO: trait reduces penalties for walking on rough terrain.
    specialTrait: []
});

const medium_chain_boots = new Boots({
    id: BootsEnum.medium_chain_boots,
    name: 'Medium Chain Boots',
    description: 'Chain boots providing ankle protection.',
    image: 'medium_chain_boots.png',
    cost: { baseCost: 600, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 2500,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Steel',
    defenseStats: {},
    // TODO: trait reduces tripping chances on uneven ground.
    specialTrait: []
});

const heavy_greaves = new Boots({
    id: BootsEnum.heavy_greaves,
    name: 'Heavy Greaves',
    description: 'Steel greaves designed for leg protection.',
    image: 'heavy_greaves.png',
    cost: { baseCost: 800, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 3500,
    tier: Tier.rare,
    armorType: ArmorType.heavy,
    material: 'Steel',
    defenseStats: {},
    // TODO: trait reduces knockback from frontal attacks.
    specialTrait: []
});

const heavy_plate_boots = new Boots({
    id: BootsEnum.heavy_plate_boots,
    name: 'Heavy Plate Boots',
    description: 'Solid plate boots providing exceptional durability.',
    image: 'heavy_plate_boots.png',
    cost: { baseCost: 1200, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 5000,
    tier: Tier.rare,
    armorType: ArmorType.heavy,
    material: 'Steel',
    defenseStats: {},
    // TODO: trait increases stability in combat, reducing stagger chances.
    specialTrait: []
});

export const bootsRepository = {
    cloth_boots,
    cloth_slippers,
    light_boots,
    light_leather_boots,
    medium_boots,
    medium_chain_boots,
    heavy_greaves,
    heavy_plate_boots
};