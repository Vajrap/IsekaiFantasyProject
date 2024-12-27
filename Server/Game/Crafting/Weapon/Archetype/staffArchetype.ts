import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Quarterstaff
export const quarterstaffArchetype = new GearArchetype({
    baseID: "quarter_staff",
    baseName: "Quarterstaff",
    baseImage: "quarter_staff.png",
    baseCost: 80,
    baseWeight: 4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.staff_quarter,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d4",
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'melee',  // Can be used both for melee and casting
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,  // More wood for a long, durable staff
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        head: {
            quantity: 1,
            acceptableMaterials: [ResourceType.jewel, ResourceType.ingot]
        }
    }
});

// Long Staff
export const longStaffArchetype = new GearArchetype({
    baseID: "long_staff",
    baseName: "Long Staff",
    baseImage: "long_staff.png",
    baseCost: 100,
    baseWeight: 6,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.staff_long,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'melee',  // Primarily for close combat
    },
    resourceNeeded: {
        shaft: {
            quantity: 3,  // Heavier, larger shaft
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        head: {
            quantity: 1,
            acceptableMaterials: [ResourceType.jewel, ResourceType.ingot]
        }
    }
});

// Magic Staff
export const magicStaffArchetype = new GearArchetype({
    baseID: "magic_staff",
    baseName: "Magic Staff",
    baseImage: "magic_staff.png",
    baseCost: 150,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.staff_magic,
    handle: 2,  // Two-handed
    attackStats: {
        physicalDiceEnum: "1d4",  // Minimal physical damage, focused on magic
        magicalDiceEnum: "1d8",
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Best used for casting spells
    },
    resourceNeeded: {
        shaft: {
            quantity: 2,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        head: {
            quantity: 1,
            acceptableMaterials: [ResourceType.jewel, ResourceType.jewel]
        }
    }
});