import { ArmorEnum, ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
import { Cloth } from "./Cloth";

const cloth_robe = new Cloth({
    id: ArmorEnum.cloth_robe,
    name: 'Robe',
    description: 'A simple robe.',
    image: 'cloth_robe.png',
    cost: { baseCost: 100, bonusCost: 0 },
    weight: 1500,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cotton',
    defenseStats: {}
});

const cloth_tattered = new Cloth({
    id: ArmorEnum.cloth_tattered,
    name: 'Tattered Cloth',
    description: 'A worn-out piece of cloth, barely functional.',
    image: 'cloth_tattered.png',
    cost: { baseCost: 50, bonusCost: 0 },
    weight: 1200,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Rough Fabric',
    defenseStats: {}
});

const cloth_silk = new Cloth({
    id: ArmorEnum.cloth_silk,
    name: 'Silk Cloth',
    description: 'A luxurious silk fabric, smooth and elegant.',
    image: 'cloth_silk.png',
    cost: { baseCost: 500, bonusCost: 0 },
    weight: 1300,
    tier: Tier.uncommon,
    armorType: ArmorType.cloth,
    material: 'Silk',
    defenseStats: {}
});

const cloth_common = new Cloth({
    id: ArmorEnum.cloth_common,
    name: 'Common Cloth',
    description: 'A basic cloth used by ordinary folk.',
    image: 'cloth_common.png',
    cost: { baseCost: 80, bonusCost: 0 },
    weight: 1400,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cotton',
    defenseStats: {}
});

const cloth_fine = new Cloth({
    id: ArmorEnum.cloth_fine,
    name: 'Fine Cloth',
    description: 'A well-made cloth of high-quality fabric.',
    image: 'cloth_fine.png',
    cost: { baseCost: 300, bonusCost: 0 },
    weight: 1350,
    tier: Tier.uncommon,
    armorType: ArmorType.cloth,
    material: 'Fine Cotton',
    defenseStats: {}
});

const cloth_plain = new Cloth({
    id: ArmorEnum.cloth_plain,
    name: 'Plain Cloth',
    description: 'An unadorned, simple piece of cloth.',
    image: 'cloth_plain.png',
    cost: { baseCost: 90, bonusCost: 0 },
    weight: 1400,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cotton',
    defenseStats: {}
});

const cloth_decorated = new Cloth({
    id: ArmorEnum.cloth_decorated,
    name: 'Decorated Cloth',
    description: 'A cloth adorned with patterns and embroidery.',
    image: 'cloth_decorated.png',
    cost: { baseCost: 400, bonusCost: 0 },
    weight: 1450,
    tier: Tier.uncommon,
    armorType: ArmorType.cloth,
    material: 'Embroidered Fabric',
    defenseStats: {}
});

const cloth_rugged = new Cloth({
    id: ArmorEnum.cloth_rugged,
    name: 'Rugged Cloth',
    description: 'A durable cloth suited for tough environments.',
    image: 'cloth_rugged.png',
    cost: { baseCost: 120, bonusCost: 0 },
    weight: 1600,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Rough Cotton',
    defenseStats: {}
});

const cloth_simple = new Cloth({
    id: ArmorEnum.cloth_simple,
    name: 'Simple Cloth',
    description: 'A basic piece of cloth with minimal design.',
    image: 'cloth_simple.png',
    cost: { baseCost: 70, bonusCost: 0 },
    weight: 1400,
    tier: Tier.common,
    armorType: ArmorType.cloth,
    material: 'Cotton',
    defenseStats: {}
});

export const clothRepository = {
    cloth_robe,
    cloth_tattered,
    cloth_silk,
    cloth_common,
    cloth_fine,
    cloth_plain,
    cloth_decorated,
    cloth_rugged,
    cloth_simple
}