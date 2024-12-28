import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { AttributeEnum } from "../../../../Entities/Character/Subclasses/CharacterDataEnum";
import { GearType, WeaponType } from "../../../../../Common/DTOsEnumsInterfaces/Item/EquipmentTypes";
import { Tier } from "../../../../../Common/DTOsEnumsInterfaces/Tier";
import { GearArchetype } from "../../GearArcheType";

export const broadAxeArchetype = new GearArchetype({
    baseID: "broad_axe",
    baseName: "Broad Axe",
    baseImage: "broad_axe.png",
    baseCost: 130,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.axe_broad,
    handle: 2,  // Two-handed axe
    attackStats:{
        physicalDiceEnum: "1d10",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        physicalDamageStat: AttributeEnum.STRENGTH,
        magicalDamageStat: AttributeEnum.PLANAR,
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 2,  // Larger, broader head
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const shepherdAxeArchetype = new GearArchetype({
    baseID: "shepherd_axe",
    baseName: "Shepherd Axe",
    baseImage: "shepherd_axe.png",
    baseCost: 100,
    baseWeight: 3.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.axe_shepherd,
    handle: 1,  // One-handed axe
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        physicalDamageStat: AttributeEnum.STRENGTH,
        magicalDamageStat: AttributeEnum.PLANAR,
    },
    resourceNeeded: {
        handle: {
            quantity: 1,  // Single hand axe
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        decorator: {
            quantity: 1,  // Decorative axe head
            acceptableMaterials: [ResourceType.ingot]
        },
        edge: {
            quantity: 1,  // Smaller axe head
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const greatAxeArchetype = new GearArchetype({
    baseID: "great_axe",
    baseName: "Great Axe",
    baseImage: "great_axe.png",
    baseCost: 180,
    baseWeight: 6,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.axe_great,
    handle: 2,  // Two-handed axe
    attackStats:{
        physicalDiceEnum: "2d6",  // High damage due to size
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        physicalDamageStat: AttributeEnum.STRENGTH,
        magicalDamageStat: AttributeEnum.PLANAR,
        bonus: {
            pHIT: -2,  // Lower hit chance due to weight and size
        }
    },
    resourceNeeded: {
        handle: {
            quantity: 2,  // Longer handle for the large axe
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        decorator: {
            quantity: 1,  // Decorative axe head
            acceptableMaterials: [ResourceType.ingot]
        },
        edge: {
            quantity: 3,  // Heavy edge for devastating attacks
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const splittingMaulArchetype = new GearArchetype({
    baseID: "splitting_maul",
    baseName: "Splitting Maul",
    baseImage: "splitting_maul.png",
    baseCost: 160,
    baseWeight: 6.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.axe_spliitingMaul,
    handle: 2,  // Two-handed weapon
    attackStats:{
        physicalDiceEnum: "2d6",  // High damage due to heavy head
        magicalDiceEnum: "1d4",
        physicalType: "blunt",  // Mauls are used more for splitting and blunt force
        magicalType: "arcane",
        preferredPosition: 'melee',
        physicalDamageStat: AttributeEnum.STRENGTH,
        magicalDamageStat: AttributeEnum.PLANAR,
        bonus: {
            pHIT: -3,  // Harder to hit due to heaviness
        }
    },
    resourceNeeded: {
        handle: {
            quantity: 2,  // Large, sturdy handle
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        decorator: {
            quantity: 1,  // Decorative axe head
            acceptableMaterials: [ResourceType.ingot]
        },
        head: {
            quantity: 3,  // Heavy head for splitting maul
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const warAxeArchetype = new GearArchetype({
    baseID: "war_axe",
    baseName: "War Axe",
    baseImage: "war_axe.png",
    baseCost: 150,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.axe_war,
    handle: 1,  // One-handed axe, but can be used with two hands as well
    attackStats:{
        physicalDiceEnum: "1d10",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        physicalDamageStat: AttributeEnum.STRENGTH,
        magicalDamageStat: AttributeEnum.PLANAR,
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        decorator: {
            quantity: 1,  // Decorative axe head
            acceptableMaterials: [ResourceType.ingot]
        },
        edge: {
            quantity: 2,  // Larger blade for a war axe
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});
