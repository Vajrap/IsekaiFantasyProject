import { ArmorEnum, ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { MediumArmor } from "./MediumArmor";

const medium_studded = new MediumArmor({
    id: ArmorEnum.medium_studded,
    name: 'Studded Leather',
    description: 'Leather armor reinforced with metal studs.',
    image: 'medium_studded.png',
    cost: { baseCost: 1500, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 7000,
    tier: Tier.common,
    armorType: ArmorType.medium,
    material: 'Leather and Metal',
    defenseStats: {
        slashDEF: 3,
        bluntDEF: 3,
        pierceDEF: 2,
        dodge: -4,
    }
});

const medium_chain = new MediumArmor({
    id: ArmorEnum.medium_chain,
    name: 'Chain Shirt',
    description: 'A shirt made of interlocked metal rings.',
    image: 'medium_chain.png',
    cost: { baseCost: 3000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 10000,
    tier: Tier.common,
    armorType: ArmorType.medium,
    material: 'Metal',
    defenseStats: {
        slashDEF: 4,
        bluntDEF: 2,
        pierceDEF: 3,
        dodge: -5,
    }
});

const medium_scale = new MediumArmor({
    id: ArmorEnum.medium_scale,
    name: 'Scale Mail',
    description: 'Armor made of overlapping metal scales.',
    image: 'medium_scale.png',
    cost: { baseCost: 5000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 12000,
    tier: Tier.common,
    armorType: ArmorType.medium,
    material: 'Metal',
    defenseStats: {
        slashDEF: 5,
        bluntDEF: 2,
        pierceDEF: 4,
        dodge: -6,
    }
});

const medium_breastplate = new MediumArmor({
    id: ArmorEnum.medium_breastplate,
    name: 'Breastplate',
    description: 'A solid metal plate covering the torso.',
    image: 'medium_breastplate.png',
    cost: { baseCost: 8000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 10000,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Metal',
    defenseStats: {
        slashDEF: 6,
        bluntDEF: 3,
        pierceDEF: 5,
        dodge: -7,
    }
});

const medium_half_plate = new MediumArmor({
    id: ArmorEnum.medium_half_plate,
    name: 'Half-Plate',
    description: 'A set of partial plate armor.',
    image: 'medium_half_plate.png',
    cost: { baseCost: 10000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 15000,
    tier: Tier.uncommon,
    armorType: ArmorType.medium,
    material: 'Metal',
    defenseStats: {
        slashDEF: 7,
        bluntDEF: 3,
        pierceDEF: 5,
        dodge: -8,
    }
});

export const mediumArmorRepository = {
    medium_studded,
    medium_chain,
    medium_scale,
    medium_breastplate,
    medium_half_plate
}