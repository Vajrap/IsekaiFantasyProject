import { RingEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Ring } from "./Ring";
const simple_band = new Ring({
    id: RingEnum.simple_band,
    name: 'Simple Band',
    description: 'A plain band of iron or a similar cheap material.',
    image: 'simple_band.png',
    cost: { baseCost: 50, bonusCost: 0, possibleDeviation: 0.2 }, // 50 copper
    weight: 10, // grams
    tier: Tier.common,
    material: 'Iron',
});
const gold_ring = new Ring({
    id: RingEnum.gold_ring,
    name: 'Gold Ring',
    description: 'A shiny gold ring, symbolic of wealth and status.',
    image: 'gold_ring.png',
    cost: { baseCost: 10000, bonusCost: 0, possibleDeviation: 0.2 }, // 10,000 copper = 1 gold
    weight: 20, // grams
    tier: Tier.rare,
    material: 'Gold',
});
const silver_ring = new Ring({
    id: RingEnum.silver_ring,
    name: 'Silver Ring',
    description: 'A sleek silver ring, elegant and understated.',
    image: 'silver_ring.png',
    cost: { baseCost: 1000, bonusCost: 0, possibleDeviation: 0.2 }, // 1,000 copper = 10 silver
    weight: 15, // grams
    tier: Tier.uncommon,
    material: 'Silver',
});
const signet_ring = new Ring({
    id: RingEnum.signet_ring,
    name: 'Signet Ring',
    description: 'A ring bearing an engraved symbol, used for seals or as a family crest.',
    image: 'signet_ring.png',
    cost: { baseCost: 15000, bonusCost: 0, possibleDeviation: 0.2 }, // 15,000 copper = 1.5 gold
    weight: 25, // grams
    tier: Tier.rare,
    material: 'Gold or Silver',
});
export const ringRepository = {
    simple_band,
    gold_ring,
    silver_ring,
    signet_ring,
};
