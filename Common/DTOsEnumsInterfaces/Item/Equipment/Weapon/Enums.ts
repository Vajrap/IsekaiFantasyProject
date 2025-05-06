export enum WeaponType {
    sword = 'sword',
    blade = 'blade',
    spear = 'spear',
    axe = 'axe',
    bow = 'bow',
    dagger = 'dagger',
    wand = 'wand',
    staff = 'staff',
    tome = 'tome',
    orb = 'orb',
    mace = 'mace',
    shield = 'shield',
    bare_hand = 'bare_hand',
}

export enum WeaponSpecificType {
    sword_short = 'sword_short',
    sword_long = 'sword_long',
    sword_great = 'sword_great',
    sword_rapier = 'sword_rapier',

    blade_katana = 'blade_katana',
    blade_scimitar = 'blade_scimitar',
    blade_cutlass = 'blade_cutlass',
    blade_falchion = 'blade_falchion',

    spear_dory = 'spear_dory',
    spear_javelin = 'spear_javelin',
    spear_halberd = 'spear_halberd',

    axe_broad = 'axe_broad',
    axe_great = 'axe_great',

    bow_long = 'bow_long',
    bow_short = 'bow_short',
    bow_cross = 'bow_cross',

    dagger_stiletto = 'dagger_stiletto',
    dagger_knife = 'dagger_knife',
    dagger_kunai = 'dagger_kunai',
    dagger_parrying = 'dagger_parrying',
    dagger_throwing = 'dagger_throwing',

    wand_magic = 'wand_magic',
    wand_scepter = 'wand_scepter',
    
    staff_quarter = 'staff_quarter',
    staff_long = 'staff_long',
    staff_magic = 'staff_magic',

    tome_bible = 'tome_bible',
    tome_grimoire = 'tome_grimoire',
    tome_codex = 'tome_codex',

    orb_metallic = 'orb_metallic',
    orb_crystal = 'orb_crystal',

    mace_morningstar = 'mace_morningstar',
    mace_hammer = 'mace_hammer',
    mace_warhammer = 'mace_warhammer',

    shield_buckler = 'shield_buckler',
    shield_kite = 'shield_kite',
    shield_tower = 'shield_tower',
    shield_round = 'shield_round',

    //Only used when skill require user to 'NOT' equip any weapon
    bare_hand = 'bare_hand',

    none = 'none'
}

export enum PreferredPosition {
    melee = 'melee',
    ranged = 'ranged',
    both = 'both'
}

export enum WeaponEnum {
    sword_short = 'sword_short', // common
    sword_short_one = 'sword_short_one', // uncommon the + 1 version
    sword_short_two = 'sword_short_two', // rare the + 2 version
    sword_long = 'sword_long', // common
    sword_long_one = 'sword_long_one', // uncommon the + 1 version
    sword_long_two = 'sword_long_two', // rare the + 2 version
    sword_great = 'sword_great', // common
    sword_great_one = 'sword_great_one', // uncommon the + 1 version
    sword_great_two = 'sword_great_two', // rare the + 2 version
    sword_rapier = 'sword_rapier', // common
    sword_rapier_one = 'sword_rapier_one', // uncommon the + 1 version
    sword_rapier_two = 'sword_rapier_two', // rare the + 2 version

    blade_katana = 'blade_katana', // common
    blade_katana_one = 'blade_katana_one', // uncommon the + 1 version
    blade_katana_two = 'blade_katana_two', // rare the + 2 version

    blade_scimitar = 'blade_scimitar', // common
    blade_scimitar_one = 'blade_scimitar_one', // uncommon the + 1 version
    blade_scimitar_two = 'blade_scimitar_two', // rare the + 2 version

    blade_cutlass = 'blade_cutlass', // common
    blade_cutlass_one = 'blade_cutlass_one', // uncommon the + 1 version
    blade_cutlass_two = 'blade_cutlass_two', // rare the + 2 version

    blade_falchion = 'blade_falchion', // common
    blade_falchion_one = 'blade_falchion_one', // uncommon the + 1 version
    blade_falchion_two = 'blade_falchion_two', // rare the + 2 version

    spear_dory = 'spear_dory', // common
    spear_dory_one = 'spear_dory_one', // uncommon the + 1 version
    spear_dory_two = 'spear_dory_two', // rare the + 2 version

    spear_javelin = 'spear_javelin', // common
    spear_javelin_one = 'spear_javelin_one', // uncommon the + 1 version
    spear_javelin_two = 'spear_javelin_two', // rare the + 2 version

    spear_halberd = 'spear_halberd', // common
    spear_halberd_one = 'spear_halberd_one', // uncommon the + 1 version
    spear_halberd_two = 'spear_halberd_two', // rare the + 2 version

    axe_broad = 'axe_broad', // common
    axe_broad_one = 'axe_broad_one', // uncommon the + 1 version
    axe_broad_two = 'axe_broad_two', // rare the + 2 version

    axe_great = 'axe_great', // common
    axe_great_one = 'axe_great_one', // uncommon the + 1 version
    axe_great_two = 'axe_great_two', // rare the + 2 version

    bow_long = 'bow_long', // common
    bow_long_one = 'bow_long_one', // uncommon the + 1 version
    bow_long_two = 'bow_long_two', // rare the + 2 version

    bow_short = 'bow_short', // common
    bow_short_one = 'bow_short_one', // uncommon the + 1 version
    bow_short_two = 'bow_short_two', // rare the + 2 version

    bow_cross = 'bow_cross', // common
    bow_cross_one = 'bow_cross_one', // uncommon the + 1 version
    bow_cross_two = 'bow_cross_two', // rare the + 2 version

    dagger_stiletto = 'dagger_stiletto', // common
    dagger_stiletto_one = 'dagger_stiletto_one', // uncommon the + 1 version
    dagger_stiletto_two = 'dagger_stiletto_two', // rare the + 2 version

    dagger_knife = 'dagger_knife', // common
    dagger_knife_one = 'dagger_knife_one', // uncommon the + 1 version
    dagger_knife_two = 'dagger_knife_two', // rare the + 2 version

    dagger_kunai = 'dagger_kunai', // common
    dagger_kunai_one = 'dagger_kunai_one', // uncommon the + 1 version
    dagger_kunai_two = 'dagger_kunai_two', // rare the + 2 version

    dagger_parrying = 'dagger_parrying', // common
    dagger_parrying_one = 'dagger_parrying_one', // uncommon the + 1 version
    dagger_parrying_two = 'dagger_parrying_two', // rare the + 2 version

    dagger_throwing = 'dagger_throwing', // common
    dagger_throwing_one = 'dagger_throwing_one', // uncommon the + 1 version
    dagger_throwing_two = 'dagger_throwing_two', // rare the + 2 version

    wand_magic = 'wand_magic', // common
    wand_magic_one = 'wand_magic_one', // uncommon the + 1 version
    wand_magic_two = 'wand_magic_two', // rare the + 2 version

    wand_scepter = 'wand_scepter', // common
    wand_scepter_one = 'wand_scepter_one', // uncommon the + 1 version
    wand_scepter_two = 'wand_scepter_two', // rare the + 2 version

    staff_quarter = 'staff_quarter', // common
    staff_quarter_one = 'staff_quarter_one', // uncommon the + 1 version
    staff_quarter_two = 'staff_quarter_two', // rare the + 2 version

    staff_long = 'staff_long', // common
    staff_long_one = 'staff_long_one', // uncommon the + 1 version
    staff_long_two = 'staff_long_two', // rare the + 2 version

    staff_magic = 'staff_magic', // common
    staff_magic_one = 'staff_magic_one', // uncommon the + 1 version
    staff_magic_two = 'staff_magic_two', // rare the + 2 version

    tome_bible = 'tome_bible', // common
    tome_bible_one = 'tome_bible_one', // uncommon the + 1 version
    tome_bible_two = 'tome_bible_two', // rare the + 2 version

    tome_grimoire = 'tome_grimoire', // common
    tome_grimoire_one = 'tome_grimoire_one', // uncommon the + 1 version
    tome_grimoire_two = 'tome_grimoire_two', // rare the + 2 version

    tome_codex = 'tome_codex', // common
    tome_codex_one = 'tome_codex_one', // uncommon the + 1 version
    tome_codex_two = 'tome_codex_two', // rare the + 2 version

    orb_metallic = 'orb_metallic', // common
    orb_metallic_one = 'orb_metallic_one', // uncommon the + 1 version
    orb_metallic_two = 'orb_metallic_two', // rare the + 2 version

    orb_crystal = 'orb_crystal', // common
    orb_crystal_one = 'orb_crystal_one', // uncommon the + 1 version
    orb_crystal_two = 'orb_crystal_two', // rare the + 2 version

    mace_morningstar = 'mace_morningstar', // common
    mace_morningstar_one = 'mace_morningstar_one', // uncommon the + 1 version
    mace_morningstar_two = 'mace_morningstar_two', // rare the + 2 version

    mace_hammer = 'mace_hammer', // common
    mace_hammer_one = 'mace_hammer_one', // uncommon the + 1 version
    mace_hammer_two = 'mace_hammer_two', // rare the + 2 version

    mace_warhammer = 'mace_warhammer', // common
    mace_warhammer_one = 'mace_warhammer_one', // uncommon the + 1 version
    mace_warhammer_two = 'mace_warhammer_two', // rare the + 2 version

    shield_buckler = 'shield_buckler', // common
    shield_buckler_one = 'shield_buckler_one', // uncommon the + 1 version
    shield_buckler_two = 'shield_buckler_two', // rare the + 2 version

    shield_kite = 'shield_kite', // common
    shield_kite_one = 'shield_kite_one', // uncommon the + 1 version
    shield_kite_two = 'shield_kite_two', // rare the + 2 version

    shield_tower = 'shield_tower', // common
    shield_tower_one = 'shield_tower_one', // uncommon the + 1 version
    shield_tower_two = 'shield_tower_two', // rare the + 2 version

    shield_round = 'shield_round', // common
    shield_round_one = 'shield_round_one', // uncommon the + 1 version
    shield_round_two = 'shield_round_two', // rare the + 2 version
}