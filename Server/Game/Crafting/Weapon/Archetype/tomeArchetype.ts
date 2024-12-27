import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Bible
export const bibleArchetype = new GearArchetype({
    baseID: "bible",
    baseName: "Bible",
    baseImage: "bible.png",
    baseCost: 100,
    baseWeight: 2,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.tome_bible,
    handle: 1,  // One-handed, as a book or tome
    attackStats: {
        physicalDiceEnum: "1d2",  // Minimal physical damage
        magicalDiceEnum: "1d6",  // Focused on divine magic
        physicalType: "blunt",  // If used to strike, it's blunt
        magicalType: "order",  // Divine or holy magic source
        preferredPosition: 'ranged',  // Ideal for casting spells from afar
    },
    resourceNeeded: {
        binding: {
            quantity: 1,
            acceptableMaterials: [ResourceType.leather, ResourceType.ingot, ResourceType.wood]
        },
        core: {
            quantity: 1,
            acceptableMaterials: [ResourceType.parchment, ResourceType.jewel]
        }
    }
});

// Grimoire
export const grimoireArchetype = new GearArchetype({
    baseID: "grimoire",
    baseName: "Grimoire",
    baseImage: "grimoire.png",
    baseCost: 150,
    baseWeight: 2.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.tome_grimoire,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d2",  // Minimal physical damage
        magicalDiceEnum: "1d8",  // Focused on arcane or dark magic
        physicalType: "blunt",
        magicalType: "chaos",  // Source of powerful arcane magic
        preferredPosition: 'ranged',  // Best for casting spells at a distance
    },
    resourceNeeded: {
        binding: {
            quantity: 1,
            acceptableMaterials: [ResourceType.leather, ResourceType.ingot, ResourceType.wood]
        },
        core: {
            quantity: 1,
            acceptableMaterials: [ResourceType.parchment, ResourceType.jewel]
        }
    }
});

// Codex
export const codexArchetype = new GearArchetype({
    baseID: "codex",
    baseName: "Codex",
    baseImage: "codex.png",
    baseCost: 130,
    baseWeight: 3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.tome_codex,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d2",  // Minimal physical damage
        magicalDiceEnum: "1d6",  // Balanced magical knowledge
        physicalType: "blunt",
        magicalType: "arcane",  // Source of knowledge and law magic
        preferredPosition: 'ranged',  // Ideal for casting from a distance
    },
    resourceNeeded: {
        binding: {
            quantity: 1,
            acceptableMaterials: [ResourceType.ingot, ResourceType.leather, ResourceType.wood]
        },
        core: {
            quantity: 1,
            acceptableMaterials: [ResourceType.parchment, ResourceType.jewel]
        }
    }
});