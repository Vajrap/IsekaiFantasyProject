import { ResourceType } from "../../../../Database/Item/Resource/resource";
import { GearType, WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { GearArchetype } from "../../GearArcheType";

export const shortSwordArchetype = new GearArchetype({
    baseID: "short_sword",
    baseName: "Short Sword",
    baseImage: "short_sword.png",
    baseCost: 100,
    baseWeight: 3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_short,
    handle: 1,
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
            acceptableMaterials: [ResourceType.plank, ResourceType.ingot]
        }
    }
});

export const longSwordArchetype = new GearArchetype({
    baseID: "long_sword",
    baseName: "Long Sword",
    baseImage: "long_sword.png",
    baseCost: 120,
    baseWeight: 4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_long,
    handle: 1,
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

export const zweihanderArchetype = new GearArchetype({
    baseID: "zweihander",
    baseName: "Zweihander",
    baseImage: "zweihander.png",
    baseCost: 180,
    baseWeight: 6,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_zweihander,
    handle: 2,
    attackStats:{
        physicalDiceEnum: "2d6",
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        bonus: {
            pHIT: -3,  // Hard to hit due to weight
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


export const greatswordArchetype = new GearArchetype({
    baseID: "great_sword",
    baseName: "Great Sword",
    baseImage: "great_sword.png",
    baseCost: 160,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_great,
    handle: 2,
    attackStats:{
        physicalDiceEnum: "2d6",
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        bonus: {
            pHIT: -2, 
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

export const jianArchetype = new GearArchetype({
    baseID: "jian",
    baseName: "Jian",
    baseImage: "jian.png",
    baseCost: 110,
    baseWeight: 3,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_jian,
    handle: 1,
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

export const rapierArchetype = new GearArchetype({
    baseID: "rapier",
    baseName: "Rapier",
    baseImage: "rapier.png",
    baseCost: 130,
    baseWeight: 2.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_rapier,
    handle: 1,
    attackStats:{
        physicalDiceEnum: "1d6",
        magicalDiceEnum: "1d4",
        physicalType: "pierce",
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

export const broadswordArchetype = new GearArchetype({
    baseID: "broad_sword",
    baseName: "Broad Sword",
    baseImage: "broad_sword.png",
    baseCost: 150,
    baseWeight: 4,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_broad,
    handle: 1,
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

export const claymoreArchetype = new GearArchetype({
    baseID: "claymore",
    baseName: "Claymore",
    baseImage: "claymore.png",
    baseCost: 170,
    baseWeight: 6,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_claymore,
    handle: 2,
    attackStats:{
        physicalDiceEnum: "2d6",
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        bonus: {
            pHIT: -2,
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

export const bastardSwordArchetype = new GearArchetype({
    baseID: "bastard_sword",
    baseName: "Bastard Sword",
    baseImage: "bastard_sword.png",
    baseCost: 140,
    baseWeight: 4.5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_bastard,
    handle: 2,
    attackStats:{
        physicalDiceEnum: "1d10",
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

export const flambergeArchetype = new GearArchetype({
    baseID: "flamberge",
    baseName: "Flamberge",
    baseImage: "flamberge.png",
    baseCost: 160,
    baseWeight: 5,
    baseTier: Tier.common,
    gearType: GearType.weapon,
    specificType: WeaponType.sword_flamberge,
    handle: 2,
    attackStats:{
        physicalDiceEnum: "2d6",
        magicalDiceEnum: "1d6",
        physicalType: "slash",
        magicalType: "arcane",
        preferredPosition: 'melee',
        bonus: {
            pHIT: -2,
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
