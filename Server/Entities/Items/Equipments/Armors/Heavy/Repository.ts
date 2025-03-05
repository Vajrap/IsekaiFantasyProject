import { ArmorEnum, ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { HeavyArmor } from "./HeavyArmor";

const heavy_ring = new HeavyArmor({
    id: ArmorEnum.heavy_ring,
    name: 'Ring Mail',
    description: 'Armor made of interlocked metal rings.',
    image: 'heavy_ring.png',
    cost: { baseCost: 5000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 20000,
    tier: Tier.common,
    armorType: ArmorType.heavy,
    material: 'Metal',
    defenseStats: {
        slashDEF: 5,
        bluntDEF: 3,
        pierceDEF: 5,
        dodge: -10,
    }
});

const heavy_chain = new HeavyArmor({
    id: ArmorEnum.heavy_chain,
    name: 'Chain Mail',
    description: 'Heavy armor made of interlocked metal rings.',
    image: 'heavy_chain.png',
    cost: { baseCost: 7000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 25000,
    tier: Tier.common,
    armorType: ArmorType.heavy,
    material: 'Metal',
    defenseStats: {
        slashDEF: 6,
        bluntDEF: 3,
        pierceDEF: 6,
        dodge: -12,
    }
});

const heavy_splint = new HeavyArmor({
    id: ArmorEnum.heavy_splint,
    name: 'Splint Armor',
    description: 'Armor reinforced with metal splints.',
    image: 'heavy_splint.png',
    cost: { baseCost: 9000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 30000,
    tier: Tier.uncommon,
    armorType: ArmorType.heavy,
    material: 'Metal',
    defenseStats: {
        slashDEF: 7,
        bluntDEF: 4,
        pierceDEF: 6,
        dodge: -13,
    }
});

const heavy_plate = new HeavyArmor({
    id: ArmorEnum.heavy_plate,
    name: 'Plate Armor',
    description: 'Full suit of plate armor.',
    image: 'heavy_plate.png',
    cost: { baseCost: 15000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 35000,
    tier: Tier.uncommon,
    armorType: ArmorType.heavy,
    material: 'Metal',
    defenseStats: {
        slashDEF: 8,
        bluntDEF: 5,
        pierceDEF: 7,
        dodge: -15,
    }
});

export const heavyArmorRepository = {
    heavy_ring,
    heavy_chain,
    heavy_splint,
    heavy_plate
}