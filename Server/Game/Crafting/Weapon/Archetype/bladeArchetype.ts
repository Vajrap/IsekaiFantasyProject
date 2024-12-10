import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

export const katanaArchetype = new GearArchetype({
    baseID: "katana",
    baseName: "Katana",
    baseImage: "katana.png",
    baseCost: 150,
    baseWeight: 3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_katana,
    handle: 1,
    attackStats:{
        physicalDiceEnum: "1d10",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        bonus: {
            pHIT: -1,  // Slightly harder to hit due to the long, narrow blade
        }
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 3,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const scimitarArchetype = new GearArchetype({
    baseID: "scimitar",
    baseName: "Scimitar",
    baseImage: "scimitar.png",
    baseCost: 140,
    baseWeight: 3.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_scimitar,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 3,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const falchionArchetype = new GearArchetype({
    baseID: "falchion",
    baseName: "Falchion",
    baseImage: "falchion.png",
    baseCost: 130,
    baseWeight: 4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_falchion,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 3,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const cutlassArchetype = new GearArchetype({
    baseID: "cutlass",
    baseName: "Cutlass",
    baseImage: "cutlass.png",
    baseCost: 110,
    baseWeight: 3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_cutlass,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 2,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const saberArchetype = new GearArchetype({
    baseID: "saber",
    baseName: "Saber",
    baseImage: "saber.png",
    baseCost: 120,
    baseWeight: 2.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_saber,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 2,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const broadBladeArchetype = new GearArchetype({
    baseID: "broad_blade",
    baseName: "Broad Blade",
    baseImage: "broad_blade.png",
    baseCost: 140,
    baseWeight: 4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_boradblade,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 3,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const macheteArchetype = new GearArchetype({
    baseID: "machete",
    baseName: "Machete",
    baseImage: "machete.png",
    baseCost: 100,
    baseWeight: 2.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_machete,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 2,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const khopeshArchetype = new GearArchetype({
    baseID: "khopesh",
    baseName: "Khopesh",
    baseImage: "khopesh.png",
    baseCost: 130,
    baseWeight: 3.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_khopesch,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 3,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const daoArchetype = new GearArchetype({
    baseID: "dao",
    baseName: "Dao",
    baseImage: "dao.png",
    baseCost: 120,
    baseWeight: 3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_dao,
    handle: 1,  // One-handed
    attackStats:{
        physicalDiceEnum: "1d8",
        magicalDiceEnum: "1d4",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
    },
    resourceNeeded: {
        handle: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 3,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const randaoArchetype = new GearArchetype({
    baseID: "randao",
    baseName: "Randao",
    baseImage: "randao.png",
    baseCost: 180,
    baseWeight: 6,  // Heavier due to its size
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_randao,
    handle: 2,  // Two-handed weapon
    attackStats:{
        physicalDiceEnum: "2d6",  // Higher damage for a large weapon
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        bonus: {
            pHIT: -2,  // Harder to hit due to its weight and size
        }
    },
    resourceNeeded: {
        handle: {
            quantity: 2,  // Requires more materials for a larger handle
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 4,  // More material required for a large blade
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});

export const zhanmadaoArchetype = new GearArchetype({
    baseID: "zhanmadao",
    baseName: "Zhanmadao",
    baseImage: "zhanmadao.png",
    baseCost: 220,
    baseWeight: 7,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.blade_zhanmadao,
    handle: 2,  // Two-handed
    attackStats:{
        physicalDiceEnum: "2d6",  // High due to anti-armor use
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        bonus: {
            pHIT: -3,  // Harder to hit due to size
        }
    },
    resourceNeeded: {
        handle: {
            quantity: 2,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        hilt: {
            quantity: 1,
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        },
        edge: {
            quantity: 4,
            acceptableMaterials: [ResourceType.ingot]
        }
    }
});
