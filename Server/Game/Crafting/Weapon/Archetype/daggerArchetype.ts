import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Dirk
export const dirkArchetype = new GearArchetype({
    baseID: "dirk",
    baseName: "Dirk",
    baseImage: "dirk.png",
    baseCost: 50,
    baseWeight: 1.2,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.dagger_dirk,
    attackStats: {
        physicalDiceEnum: "1d4",
        magicalDiceEnum: "1d2",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        grip: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Stiletto
export const stilettoArchetype = new GearArchetype({
    baseID: "stiletto",
    baseName: "Stiletto",
    baseImage: "stiletto.png",
    baseCost: 60,
    baseWeight: 1,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.dagger_stiletto,
    attackStats: {
        physicalDiceEnum: "1d4",
        magicalDiceEnum: "1d2",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        grip: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Knife
export const knifeArchetype = new GearArchetype({
    baseID: "knife",
    baseName: "Knife",
    baseImage: "knife.png",
    baseCost: 40,
    baseWeight: 0.8,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.dagger_knife,
    attackStats: {
        physicalDiceEnum: "1d3",
        magicalDiceEnum: "1d2",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        grip: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Kris
export const krisArchetype = new GearArchetype({
    baseID: "kris",
    baseName: "Kris",
    baseImage: "kris.png",
    baseCost: 70,
    baseWeight: 1.4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.dagger_kris,
    attackStats: {
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d3",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        grip: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Khukuri
export const khukuriArchetype = new GearArchetype({
    baseID: "khukuri",
    baseName: "Khukuri",
    baseImage: "khukuri.png",
    baseCost: 90,
    baseWeight: 1.8,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.dagger_khukuri,
    attackStats: {
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d3",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        grip: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Rondel
export const rondelArchetype = new GearArchetype({
    baseID: "rondel",
    baseName: "Rondel",
    baseImage: "rondel.png",
    baseCost: 80,
    baseWeight: 1.3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.dagger_rondel,
    attackStats: {
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d2",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        grip: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});