import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../../Common/DTOsEnumsInterfaces/Item/EquipmentTypes";
import { Tier } from "../../../../../Common/DTOsEnumsInterfaces/Tier";
import { GearArchetype } from "../../GearArcheType";

export const brandistockArchetype = new GearArchetype({
    baseID: "brandistock",
    baseName: "Brandistock",
    baseImage: "brandistock.png",
    baseCost: 100,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_Brandistock,
    handle: 2,  // Two-handed weapon
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'both',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // Increased shaft material to reflect length
            acceptableMaterials: [ResourceType.plank]
        },
        edge: {
            quantity: 2,  // Slightly more material for the spear edge
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const doryArchetype = new GearArchetype({
    baseID: "dory",
    baseName: "Dory",
    baseImage: "dory.png",
    baseCost: 90,
    baseWeight: 4.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_dory,
    handle: 2,  // Two-handed spear
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // Extra wood for longer shaft
            acceptableMaterials: [ResourceType.plank]
        },
        edge: {
            quantity: 2,  // More material for a durable spear edge
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const glaiveArchetype = new GearArchetype({
    baseID: "glaive",
    baseName: "Glaive",
    baseImage: "glaive.png",
    baseCost: 150,
    baseWeight: 6,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_glaive,
    handle: 2,  // Two-handed polearm
    attackStats:{
        physicalDiceEnum: "1d10",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'both',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // Extra wood due to longer polearm
            acceptableMaterials: [ResourceType.plank]
        },
        edge: {
            quantity: 2,  // More metal for the large edge
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const guisarmeArchetype = new GearArchetype({
    baseID: "guisarme",
    baseName: "Guisarme",
    baseImage: "guisarme.png",
    baseCost: 160,
    baseWeight: 6.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_guisarme,
    handle: 2,  // Two-handed polearm
    attackStats:{
        physicalDiceEnum: "1d10",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'both',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // More wood for a long handle
            acceptableMaterials: [ResourceType.plank]
        },
        edge: {
            quantity: 2,  // Additional metal for the polearm's large edge
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const jiArchetype = new GearArchetype({
    baseID: "ji",
    baseName: "Ji",
    baseImage: "ji.png",
    baseCost: 170,
    baseWeight: 7,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_ji,
    handle: 2,  // Two-handed polearm
    attackStats:{
        physicalDiceEnum: "1d10",
        magicalDiceEnum: "1d4",
        physicalType: "slash",  // Ji is a hybrid slashing spear
        magicalType: "arcane",
        preferredPosition: 'both',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // Extra wood for the long shaft
            acceptableMaterials: [ResourceType.plank]
        },
        edge: {
            quantity: 2,  // More metal for a larger, complex edge
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const halberdArchetype = new GearArchetype({
    baseID: "halberd",
    baseName: "Halberd",
    baseImage: "halberd.png",
    baseCost: 180,
    baseWeight: 7,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_halberd,
    handle: 2,  // Two-handed weapon
    attackStats:{
        physicalDiceEnum: "2d6",  // High due to size and leverage
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'both',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // More wood for the long polearm
            acceptableMaterials: [ResourceType.plank]
        },
        edge: {
            quantity: 3,  // More metal for the halberd's complex design
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const tridentArchetype = new GearArchetype({
    baseID: "trident",
    baseName: "Trident",
    baseImage: "trident.png",
    baseCost: 140,
    baseWeight: 5.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_trident,
    handle: 2,  // Two-handed weapon
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'both',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // Long shaft for the trident
            acceptableMaterials: [ResourceType.plank]
        },
        edges: {
            quantity: 3,  // Three-pronged edges require more metal
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const javelinArchetype = new GearArchetype({
    baseID: "javelin",
    baseName: "Javelin",
    baseImage: "javelin.png",
    baseCost: 80,
    baseWeight: 3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.spear_javelin,
    handle: 1,  // One-handed, throwable
    attackStats:{
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
        magicalType: "arcane",
        preferredPosition: 'ranged',
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // Still needs more wood due to length, even if throwable
            acceptableMaterials: [ResourceType.plank]
        },
        edge: {
            quantity: 1,  // Smaller edge since it's meant to be thrown
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});
