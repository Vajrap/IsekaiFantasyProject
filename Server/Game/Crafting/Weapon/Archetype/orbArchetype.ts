import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

// Orb
export const orbArchetype = new GearArchetype({
    baseID: "orb",
    baseName: "Orb",
    baseImage: "orb.png",
    baseCost: 200,
    baseWeight: 1.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.orb,
    handle: 1,  // One-handed
    attackStats: {
        physicalDiceEnum: "1d2",  // Minimal physical damage
        magicalDiceEnum: "1d8",  // Strong magical potential
        physicalType: "blunt",
        magicalType: "arcane",
        preferredPosition: 'ranged',  // Best used for spellcasting from a distance
    },
    resourceNeeded: {
        core: {
            quantity: 1,  // Core essence of the orb
            acceptableMaterials: [ResourceType.jewel]
        },
        enclosure: {
            quantity: 1,  // Exterior part to protect and hold the core
            acceptableMaterials: [ResourceType.ingot, ResourceType.plank]
        }
    }
});
