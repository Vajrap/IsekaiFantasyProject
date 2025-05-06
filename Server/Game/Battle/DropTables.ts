import { ResourceNameEnum } from '../../Entities/Items/Resource/ResourceNameEnum';

// Define drop table interface
export interface DropEntry {
    resourceId: ResourceNameEnum;
    chance: number; // 0-100 percentage
    minQuantity: number;
    maxQuantity: number;
}

export interface DropTable {
    guaranteed?: DropEntry[];
    common: DropEntry[];
    uncommon: DropEntry[];
    rare: DropEntry[];
}

// Natural Beast Drop Tables
export const WOLF_DROPS: DropTable = {
    guaranteed: [
        { resourceId: ResourceNameEnum.wolf_meat, chance: 100, minQuantity: 1, maxQuantity: 2 }
    ],
    common: [
        { resourceId: ResourceNameEnum.wolf_pelt, chance: 75, minQuantity: 1, maxQuantity: 1 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.wolf_fang, chance: 40, minQuantity: 1, maxQuantity: 2 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.skinner_fang_razor, chance: 5, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const BEAR_DROPS: DropTable = {
    guaranteed: [
        { resourceId: ResourceNameEnum.culinary_meat_bear, chance: 100, minQuantity: 2, maxQuantity: 4 }
    ],
    common: [
        { resourceId: ResourceNameEnum.bear_pelt, chance: 80, minQuantity: 1, maxQuantity: 1 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.bear_claw, chance: 45, minQuantity: 1, maxQuantity: 2 }
    ],
    rare: []
};

export const GIANT_SPIDER_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.spider_leg, chance: 85, minQuantity: 1, maxQuantity: 4 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.spider_silk, chance: 50, minQuantity: 1, maxQuantity: 2 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.venom_sac, chance: 20, minQuantity: 1, maxQuantity: 1 }
    ]
};

// Humanoid Drop Tables
export const GOBLIN_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.goblin_ear, chance: 75, minQuantity: 1, maxQuantity: 1 },
        { resourceId: ResourceNameEnum.crude_weapon, chance: 60, minQuantity: 1, maxQuantity: 1 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.gold_coins, chance: 40, minQuantity: 5, maxQuantity: 15 }
    ],
    rare: []
};

export const CULTIST_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.gold_coins, chance: 80, minQuantity: 10, maxQuantity: 30 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.occult_symbol, chance: 45, minQuantity: 1, maxQuantity: 1 },
        { resourceId: ResourceNameEnum.ritual_component, chance: 35, minQuantity: 1, maxQuantity: 2 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.spell_scroll, chance: 15, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const SKELETAL_WARRIOR_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.bone_fragment, chance: 85, minQuantity: 1, maxQuantity: 3 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.ancient_weapon, chance: 40, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.soul_essence, chance: 15, minQuantity: 1, maxQuantity: 1 }
    ]
};

// Magical Creature Drop Tables
export const SLIME_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.slime_jelly, chance: 80, minQuantity: 1, maxQuantity: 2 },
        { resourceId: ResourceNameEnum.slime_residue, chance: 65, minQuantity: 1, maxQuantity: 3 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.slime_core, chance: 35, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: []
};

export const GIANT_SLIME_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.slime_jelly, chance: 100, minQuantity: 3, maxQuantity: 6 },
        { resourceId: ResourceNameEnum.slime_residue, chance: 90, minQuantity: 2, maxQuantity: 5 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.slime_core, chance: 75, minQuantity: 1, maxQuantity: 3 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.giant_slime_core, chance: 35, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const FIRE_ELEMENTAL_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.fire_slime_essence, chance: 70, minQuantity: 1, maxQuantity: 2 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.ember_core, chance: 45, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.fire_crystal, chance: 15, minQuantity: 1, maxQuantity: 1 }
    ]
};

// Mythical Beast Drop Tables
export const GRIFFIN_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.culinary_meat_fowl, chance: 80, minQuantity: 2, maxQuantity: 4 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.griffin_feather, chance: 50, minQuantity: 1, maxQuantity: 3 },
        { resourceId: ResourceNameEnum.griffin_talon, chance: 40, minQuantity: 1, maxQuantity: 2 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.griffin_hide, chance: 25, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const WYVERN_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.wyvern_scale, chance: 75, minQuantity: 2, maxQuantity: 5 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.wyvern_venom_sac, chance: 45, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.wyvern_wing_membrane, chance: 20, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const DRAGON_DROPS: DropTable = {
    guaranteed: [
        { resourceId: ResourceNameEnum.gold_coins, chance: 100, minQuantity: 500, maxQuantity: 1000 }
    ],
    common: [
        { resourceId: ResourceNameEnum.culinary_meat_dragon, chance: 75, minQuantity: 2, maxQuantity: 4 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.dragon_fang, chance: 50, minQuantity: 1, maxQuantity: 2 },
        { resourceId: ResourceNameEnum.alchemy_gland_fire_dragon, chance: 45, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.leather_dragon, chance: 30, minQuantity: 1, maxQuantity: 1 },
        { resourceId: ResourceNameEnum.ingredient_blood_dragon, chance: 30, minQuantity: 1, maxQuantity: 1 }
    ]
};

// Undead and Spirit Drop Tables
export const ZOMBIE_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.rotting_flesh, chance: 85, minQuantity: 1, maxQuantity: 3 },
        { resourceId: ResourceNameEnum.tattered_clothing, chance: 65, minQuantity: 1, maxQuantity: 1 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.zombie_tooth, chance: 35, minQuantity: 1, maxQuantity: 2 }
    ],
    rare: []
};

export const GHOST_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.haunted_trinket, chance: 60, minQuantity: 1, maxQuantity: 1 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.spirit_essence, chance: 40, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.ectoplasm, chance: 20, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const WRAITH_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.wraith_shroud, chance: 70, minQuantity: 1, maxQuantity: 1 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.soul_essence, chance: 50, minQuantity: 1, maxQuantity: 2 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.shadow_essence, chance: 25, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const LICH_DROPS: DropTable = {
    guaranteed: [
        { resourceId: ResourceNameEnum.gold_coins, chance: 100, minQuantity: 300, maxQuantity: 800 }
    ],
    common: [
        { resourceId: ResourceNameEnum.lich_dust, chance: 75, minQuantity: 1, maxQuantity: 3 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.necromantic_tome, chance: 45, minQuantity: 1, maxQuantity: 1 },
        { resourceId: ResourceNameEnum.soul_essence, chance: 60, minQuantity: 2, maxQuantity: 4 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.phylactery, chance: 10, minQuantity: 1, maxQuantity: 1 }
    ]
};

// Eldritch/Otherworldly Drop Tables
export const MIND_FLAYER_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.strange_artifact, chance: 70, minQuantity: 1, maxQuantity: 2 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.psychic_crystal, chance: 45, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.elder_brain_fragment, chance: 15, minQuantity: 1, maxQuantity: 1 }
    ]
};

export const VOID_HORROR_DROPS: DropTable = {
    common: [
        { resourceId: ResourceNameEnum.alien_tissue, chance: 80, minQuantity: 2, maxQuantity: 4 },
        { resourceId: ResourceNameEnum.chaos_fragment, chance: 65, minQuantity: 1, maxQuantity: 3 }
    ],
    uncommon: [
        { resourceId: ResourceNameEnum.reality_shard, chance: 40, minQuantity: 1, maxQuantity: 1 }
    ],
    rare: [
        { resourceId: ResourceNameEnum.void_essence, chance: 20, minQuantity: 1, maxQuantity: 1 }
    ]
};

// Map monster types to their drop tables
export const monsterDropTables: {[key: string]: DropTable} = {
    'wolf': WOLF_DROPS,
    'bear': BEAR_DROPS,
    'giant_spider': GIANT_SPIDER_DROPS,
    'goblin': GOBLIN_DROPS,
    'cultist': CULTIST_DROPS,
    'skeletal_warrior': SKELETAL_WARRIOR_DROPS,
    'slime': SLIME_DROPS,
    'giant_slime': GIANT_SLIME_DROPS,
    'fire_elemental': FIRE_ELEMENTAL_DROPS,
    'griffin': GRIFFIN_DROPS,
    'wyvern': WYVERN_DROPS,
    'dragon': DRAGON_DROPS,
    'zombie': ZOMBIE_DROPS,
    'ghost': GHOST_DROPS,
    'wraith': WRAITH_DROPS,
    'lich': LICH_DROPS,
    'mind_flayer': MIND_FLAYER_DROPS,
    'void_horror': VOID_HORROR_DROPS
}; 