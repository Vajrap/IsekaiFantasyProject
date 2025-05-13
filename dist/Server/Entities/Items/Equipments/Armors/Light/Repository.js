import { LightArmor } from "./LightArmor";
import { ArmorEnum, ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Tier } from "../../../../../../Common/DTOsEnumsInterfaces/Tier";
const light_padded = new LightArmor({
    id: ArmorEnum.light_padded,
    name: 'Padded Armor',
    description: 'Armor made of padded cloth.',
    image: 'light_padded.png',
    cost: { baseCost: 500, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 3000,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Cotton',
    defenseStats: {
        slashDEF: 1,
        bluntDEF: 2,
        pierceDEF: 1,
        dodge: -1,
    }
});
const light_leather = new LightArmor({
    id: ArmorEnum.light_leather,
    name: 'Leather Armor',
    description: 'Light armor crafted from treated leather.',
    image: 'light_leather.png',
    cost: { baseCost: 1000, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 5000,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Leather',
    defenseStats: {
        slashDEF: 2,
        bluntDEF: 2,
        pierceDEF: 2,
        dodge: -2,
    }
});
const light_hide = new LightArmor({
    id: ArmorEnum.light_hide,
    name: 'Hide Armor',
    description: 'Armor made of thick hides and furs.',
    image: 'light_hide.png',
    cost: { baseCost: 750, bonusCost: 0, possibleDeviation: 0.2 },
    weight: 6000,
    tier: Tier.common,
    armorType: ArmorType.light,
    material: 'Hide',
    defenseStats: {
        slashDEF: 2,
        bluntDEF: 3,
        pierceDEF: 1,
        dodge: -3,
    }
});
export const lightArmorRepository = {
    light_padded,
    light_leather,
    light_hide
};
