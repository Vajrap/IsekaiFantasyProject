import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Buckler Shield
export const bucklerArchetype = new GearArchetype({
    baseID: "buckler",
    baseName: "Buckler Shield",
    baseImage: "buckler.png",
    baseCost: 60,
    baseWeight: 2,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.shield_buckler,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d2",  // Very low attack power
        magicalDiceEnum: "1d2",
        physicalType: "blunt",  // Buckler strikes are blunt
        magicalType: "arcane",
        bonus: {
            pDEF: 2,  // Light physical defense
            dodge: -1,  // Minor reduction in agility due to shield
        },
        preferredPosition: 'melee',  // For close-range combat
    },
    resourceNeeded: {
        body: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot, ResourceType.plank]
        },
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.leather, ResourceType.plank]
        }
    }
});

// Kite Shield
export const kiteShieldArchetype = new GearArchetype({
    baseID: "kite_shield",
    baseName: "Kite Shield",
    baseImage: "kite_shield.png",
    baseCost: 120,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.shield_kite,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d4",  // Low attack power
        magicalDiceEnum: "1d2",
        physicalType: "blunt",
        magicalType: "arcane",
        bonus: {
            pDEF: 4,  // Moderate physical defense
            mDEF: 2,  // Some magical defense
            pHIT: -1,  // Slight reduction in hit chance due to weight
            dodge: -2,  // Reduced agility from larger shield
        },
        preferredPosition: 'melee',  // Used in close-range defense
    },
    resourceNeeded: {
        body: {
            quantity: 2,  // Larger body
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.leather, ResourceType.plank]
        }
    }
});

// Tower Shield
export const towerShieldArchetype = new GearArchetype({
    baseID: "tower_shield",
    baseName: "Tower Shield",
    baseImage: "tower_shield.png",
    baseCost: 180,
    baseWeight: 8,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.shield_tower,
    handle: 1,  // One-handed, but very heavy
    attackStats: {
        physicalDiceEnum: "1d4",  // Minimal attack power
        magicalDiceEnum: "1d2",
        physicalType: "blunt",
        magicalType: "arcane",
        bonus: {
            pDEF: 6,  // High physical defense
            pHIT: -2,  // Significant reduction in hit chance due to weight
            mDEF: 2,  // Some magical defense
            dodge: -3,  // Major reduction in agility due to shield size
        },
        preferredPosition: 'melee',  // Best for close-range high-defense combat
    },
    resourceNeeded: {
        body: {
            quantity: 3,  // Large body
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.leather, ResourceType.plank]
        }
    }
});

// Round Shield
export const roundShieldArchetype = new GearArchetype({
    baseID: "round_shield",
    baseName: "Round Shield",
    baseImage: "round_shield.png",
    baseCost: 100,
    baseWeight: 4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.shield_round,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d4",  // Decent attack power for a shield
        magicalDiceEnum: "1d2",
        physicalType: "blunt",
        magicalType: "arcane",
        bonus: {
            pDEF: 3,  // Moderate physical defense
            mDEF: 1,  // Minor magical defense
            pHIT: -1,  // Small hit penalty due to weight
            dodge: -2,  // Some reduction in agility due to size
        },
        preferredPosition: 'melee',  // Used in close-range combat
    },
    resourceNeeded: {
        body: {
            quantity: 2,  // Standard size
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.leather, ResourceType.plank]
        }
    }
});