import { ArmorType, HeadwearEnum } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Tier } from "../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Headwear } from "./Headwear";

const cloth_cap = new Headwear({
    id: HeadwearEnum.cloth_cap,
    name: 'Cloth Cap',
    description: 'A light cap that does not restrict movement.',
    image: 'cloth_cap.png',
    cost: { baseCost: 50, bonusCost: 0 },
    weight: 250,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cloth',
    defenseStats: {}
});

const cloth_hood = new Headwear({
    id: HeadwearEnum.cloth_hood,
    name: 'Cloth Hood',
    description: 'A simple hood made of cloth, offering no additional protection.',
    image: 'cloth_hood.png',
    cost: { baseCost: 60, bonusCost: 0 },
    weight: 300,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cloth',
    defenseStats: {}
});

const cloth_hat = new Headwear({
    id: HeadwearEnum.cloth_hat,
    name: 'Cloth Hat',
    description: 'A decorative hat offering no protection.',
    image: 'cloth_hat.png',
    cost: { baseCost: 80, bonusCost: 0 },
    weight: 200,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cloth',
    defenseStats: {}
});

const light_helm = new Headwear({
    id: HeadwearEnum.light_helm,
    name: 'Light Helm',
    description: 'A small helm offering minimal protection.',
    image: 'light_helm.png',
    cost: { baseCost: 500, bonusCost: 0 },
    weight: 1500,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Leather',
    defenseStats: {
        slashDEF: 1
    },
    // TODO: trait reduces saving throw needed when getting stunned by 1.
    specialTrait: []
});

const light_leather_cap = new Headwear({
    id: HeadwearEnum.light_leather_cap,
    name: 'Light Leather Cap',
    description: 'A cap made of leather offering slight protection.',
    image: 'light_leather_cap.png',
    cost: { baseCost: 300, bonusCost: 0 },
    weight: 750,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Leather',
    defenseStats: {
        bluntDEF: 1
    }
});

const medium_helm = new Headwear({
    id: HeadwearEnum.medium_helm,
    name: 'Medium Helm',
    description: 'A medium helm providing balanced protection.',
    image: 'medium_helm.png',
    cost: { baseCost: 1000, bonusCost: 0 },
    weight: 2500,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Iron',
    defenseStats: {
        pierceDEF: 1
    },
    // TODO: trait reduces bleeding effect duration by 1 turn.
    specialTrait: []
});

const medium_chain_coif = new Headwear({
    id: HeadwearEnum.medium_chain_coif,
    name: 'Medium Chain Coif',
    description: 'A chain coif offering minimal protection for the head.',
    image: 'medium_chain_coif.png',
    cost: { baseCost: 1200, bonusCost: 0 },
    weight: 3000,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Steel',
    defenseStats: {
        slashDEF: 1
    }
});

const heavy_helm = new Headwear({
    id: HeadwearEnum.heavy_helm,
    name: 'Heavy Helm',
    description: 'A large helm providing decent protection.',
    image: 'heavy_helm.png',
    cost: { baseCost: 2000, bonusCost: 0 },
    weight: 4000,
    tier: Tier.rare,
    armorType: ArmorType.heavy,
    material: 'Steel',
    defenseStats: {
        bluntDEF: 1
    },
    // TODO: trait reduces knockdown duration by 1 turn.
    specialTrait: []
});

const heavy_full_helm = new Headwear({
    id: HeadwearEnum.heavy_full_helm,
    name: 'Heavy Full Helm',
    description: 'A full-coverage helm offering superior protection.',
    image: 'heavy_full_helm.png',
    cost: { baseCost: 2500, bonusCost: 0 },
    weight: 4500,
    tier: Tier.rare,
    armorType: ArmorType.heavy,
    material: 'Steel',
    defenseStats: {
        pierceDEF: 1
    },
    // TODO: trait reduces damage from head-specific attacks by 10%.
    specialTrait: []
});

export const headwearRepository = {
    cloth_cap,
    cloth_hood,
    cloth_hat,
    light_helm,
    light_leather_cap,
    medium_helm,
    medium_chain_coif,
    heavy_helm,
    heavy_full_helm
};