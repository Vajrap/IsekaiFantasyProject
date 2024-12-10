import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Magic Wand
export const magicWandArchetype = new GearArchetype({
    baseID: "magic_wand",
    baseName: "Magic Wand",
    baseImage: "magic_wand.png",
    baseCost: 100,
    baseWeight: 1,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.wand_magic,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d2",  // Minimal physical damage
        magicalDiceEnum: "1d6",
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Best for casting spells at a distance
    },
    resourceNeeded: {
        shaft: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot, ResourceType.bone]
        },
        head: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot, ResourceType.jewel]
        }
    }
});

// Scepter
export const scepterArchetype = new GearArchetype({
    baseID: "scepter",
    baseName: "Scepter",
    baseImage: "scepter.png",
    baseCost: 120,
    baseWeight: 2,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.wand_scepter,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d6",
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'both',  // Best for magic and spellcasting
    },
    resourceNeeded: {
        shaft: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot, ResourceType.bone]
        },
        head: {
            quantity: 2,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});