import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Long Bow
export const longBowArchetype = new GearArchetype({
    baseID: "long_bow",
    baseName: "Long Bow",
    baseImage: "long_bow.png",
    baseCost: 120,
    baseWeight: 2,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.bow_long,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Best used in ranged combat
    },
    resourceNeeded: {
        limbs: {
            quantity: 2,
            acceptableMaterials: [ResourceType.plank]
        },
        string: {
            quantity: 1,
            acceptableMaterials: [ResourceType.fabric]
        },
        triggerOrPulleys: {
            quantity: 0,  // No trigger or pulleys for traditional bows
            acceptableMaterials: []
        }
    }
});

// Short Bow
export const shortBowArchetype = new GearArchetype({
    baseID: "short_bow",
    baseName: "Short Bow",
    baseImage: "short_bow.png",
    baseCost: 80,
    baseWeight: 1.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.bow_short,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Ideal for ranged combat
    },
    resourceNeeded: {
        limbs: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank]
        },
        string: {
            quantity: 1,
            acceptableMaterials: [ResourceType.fabric]
        },
        triggerOrPulleys: {
            quantity: 0,  // No trigger or pulleys for traditional bows
            acceptableMaterials: []
        }
    }
});

// Crossbow
export const crossBowArchetype = new GearArchetype({
    baseID: "cross_bow",
    baseName: "Cross Bow",
    baseImage: "cross_bow.png",
    baseCost: 150,
    baseWeight: 4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.bow_cross,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d10",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Best used at a distance
    },
    resourceNeeded: {
        limbs: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank]
        },
        string: {
            quantity: 1,
            acceptableMaterials: [ResourceType.fabric]
        },
        triggerOrPulleys: {
            quantity: 1,  // Crossbows require a trigger mechanism
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Compound Bow
export const compoundBowArchetype = new GearArchetype({
    baseID: "compound_bow",
    baseName: "Compound Bow",
    baseImage: "compound_bow.png",
    baseCost: 180,
    baseWeight: 2.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.bow_compound,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d6",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Excellent for long-range precision
    },
    resourceNeeded: {
        limbs: {
            quantity: 2,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]  // Compound bows may have metal components
        },
        string: {
            quantity: 1,
            acceptableMaterials: [ResourceType.fabric]
        },
        triggerOrPulleys: {
            quantity: 2,  // Compound bows use pulleys
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Recurve Bow
export const recurveBowArchetype = new GearArchetype({
    baseID: "recurve_bow",
    baseName: "Recurve Bow",
    baseImage: "recurve_bow.png",
    baseCost: 130,
    baseWeight: 2,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.bow_recurve,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Optimal for ranged combat
    },
    resourceNeeded: {
        limbs: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank]
        },
        string: {
            quantity: 1,
            acceptableMaterials: [ResourceType.fabric]
        },
        triggerOrPulleys: {
            quantity: 0,  // No trigger or pulleys for traditional bows
            acceptableMaterials: []
        }
    }
});