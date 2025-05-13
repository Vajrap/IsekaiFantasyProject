import { NecklaceEnum } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Necklace } from "./Necklace";
const leather_necklace = new Necklace({
    id: NecklaceEnum.leather_necklace,
    name: 'Leather Necklace',
    description: 'A simple necklace made of leather cord.',
    image: 'leather_necklace.png',
    cost: { baseCost: 30, bonusCost: 0, possibleDeviation: 0.2 }, // 30 copper
    weight: 50, // grams
    tier: Tier.common,
    material: 'Leather',
});
const gold_chain = new Necklace({
    id: NecklaceEnum.gold_chain,
    name: 'Gold Chain',
    description: 'A luxurious gold chain, a mark of affluence.',
    image: 'gold_chain.png',
    cost: { baseCost: 20000, bonusCost: 0, possibleDeviation: 0.2 }, // 20,000 copper = 2 gold
    weight: 50, // grams
    tier: Tier.rare,
    material: 'Gold',
});
const silver_chain = new Necklace({
    id: NecklaceEnum.silver_chain,
    name: 'Silver Chain',
    description: 'A beautiful silver chain with a subtle shine.',
    image: 'silver_chain.png',
    cost: { baseCost: 5000, bonusCost: 0, possibleDeviation: 0.2 }, // 5,000 copper = 50 silver
    weight: 45, // grams
    tier: Tier.uncommon,
    material: 'Silver',
});
export const necklaceRepository = {
    leather_necklace,
    gold_chain,
    silver_chain,
};
