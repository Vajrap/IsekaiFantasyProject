import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Morning Star
export const morningStarArchetype = new GearArchetype({
    baseID: "morning_star",
    baseName: "Morning Star",
    baseImage: "morning_star.png",
    baseCost: 150,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.mace_morningStar,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d8",  // Strong physical damage
        magicalDiceEnum: "1d2",  // Minor magical damage
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'melee',  // Ideal for close combat
    },
    resourceNeeded: {
        shaft: {
            quantity: 1,  // Shaft of the weapon
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        head: {
            quantity: 1,  // Spiked or flanged head
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Flail
export const flailArchetype = new GearArchetype({
    baseID: "flail",
    baseName: "Flail",
    baseImage: "flail.png",
    baseCost: 140,
    baseWeight: 4.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.mace_flail,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d8",  // High physical damage due to momentum
        magicalDiceEnum: "1d2",  // Minimal magical damage
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'melee',  // Best for close-range combat
    },
    resourceNeeded: {
        shaft: {
            quantity: 1,  // Handle or shaft
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        head: {
            quantity: 1,  // The head includes the chain part for simplicity
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// Club
export const clubArchetype = new GearArchetype({
    baseID: "club",
    baseName: "Club",
    baseImage: "club.png",
    baseCost: 80,
    baseWeight: 3.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.mace_club,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d6",  // Moderate physical damage
        magicalDiceEnum: "1d2",  // Minimal magical damage
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'melee',  // Best for close-range combat
    },
    resourceNeeded: {
        shaft: {
            quantity: 1,  // The entire club may just be a solid piece
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]  // Can be wooden or reinforced
        },
        head: {
            quantity: 1,  // Optional reinforced head part
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

// War Hammer
export const warHammerArchetype = new GearArchetype({
    baseID: "war_hammer",
    baseName: "War Hammer",
    baseImage: "war_hammer.png",
    baseCost: 160,
    baseWeight: 6,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.mace_warHammer,
    handle: 2,  // Two-handed for extra power
    attackStats: {
        physicalDiceEnum: "1d10",  // High physical damage
        magicalDiceEnum: "1d2",  // Minimal magical damage
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'melee',  // Best for close-range heavy strikes
        bonus: {
            pHIT: -2,  // Harder to hit due to weight
        }
    },
    resourceNeeded: {
        shaft: {
            quantity: 1,  // Longer handle for two-handed strikes
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        head: {
            quantity: 2,  // Heavy striking head
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});