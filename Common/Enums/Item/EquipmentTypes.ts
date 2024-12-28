export enum ItemType {
    equipment = 'equipment',
    consumable = 'consumable',
    resource = 'resource'
}

export enum EquipmentType {
    weapon = 'weapon',
    armor = 'armor',
    cloth = 'cloth',
    headWear = 'headWear',
    accessory = 'accessory',
}

export enum ArmorType {
    cloth = 'cloth',
    light = 'light',
    medium = 'medium',
    heavy = 'heavy'
}

export enum AccessoryType {
    ring = 'ring',
    necklace = 'necklace',
}

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