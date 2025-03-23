export type TargetType = {
    scope: TargetScope;
    row?: TargetRow;
    filter?: TargetConditionFilter;
    sort?: TargetSortingOptions;
    taunt?: TargetTauntConsideration;
};

export enum TargetPartyType {
    Self = 'self',
    Ally = 'ally',
    Enemy = 'enemy',
}

export enum TargetScope {
    Single = 'single',
    All = 'all',
}

export enum TargetRow {
    Front = 'front',
    Back = 'back',
    ShiftableFront = 'shiftableFront',
    ShiftableBack = 'shiftableBack',
    Opposite = 'opposite',
    OppositeShiftable = 'oppositeShiftable',
}

export type TargetConditionFilter =
    | { type: 'buffOrDebuff', buff: BuffsAndDebuffsEnum, value: number }
    | { type: 'trait', trait: string, value: number }
    | { type: 'isDead' }
    | { type: 'isSummoned' };

export enum TargetSortingOptions {
    None = 'none',
    LowestHP = 'lowestHP',
    HighestHP = 'highestHP',
    LowestMP = 'lowestMP',
    HighestMP = 'highestMP',
    LowestSP = 'lowestSP',
    HighestSP = 'highestSP',
    PreferredFrontRow = 'preferredFrontRow',
    PreferredBackRow = 'preferredBackRow',
    LowestPhysicalAttack = 'lowestPhysicalAttack',
    HighestPhysicalAttack = 'highestPhysicalAttack',
    LowestMagicalAttack = 'lowestMagicalAttack',
    HighestMagicalAttack = 'highestMagicalAttack',
    LowestPhysicalDefense = 'lowestPhysicalDefense',
    HighestPhysicalDefense = 'highestPhysicalDefense',
    LowestMagicalDefense = 'lowestMagicalDefense',
    HighestMagicalDefense = 'highestMagicalDefense',
    LowestLevel = 'lowestLevel',
    HighestLevel = 'highestLevel',
    Fastest = 'fastest',
    Slowest = 'slowest',
}

export enum TargetTauntConsideration {
    TauntCount = 'tauntCount',     // Consider taunt count for targeting
    NoTauntCount = 'noTauntCount', // Ignore taunt count
}

export enum BuffsAndDebuffsEnum {
    // 💥 Debuffs
    stun = 'stun',
    blind = 'blind',
    slow = 'slow',
    bleed = 'bleed',
    poison = 'poison',
    bound = 'bound',
    paralyse = 'paralyse',
    burn = 'burn',
    awed = 'awed',
    cursed = 'cursed',
    freeze = 'freeze',
    confuse = 'confuse',
    fear = 'fear',
    entangled = 'entangled',
    soaked = 'soaked',
    // 🛡️ Defensive Buffs
    stoneSkin = 'stoneSkin',
    shield = 'shield',
    stealth = 'stealth',
    arcaneShield = 'arcaneShield',
    divineShield = 'divineShield',
    manaShield = 'manaShield',
    // ⚔️ Counter and Reactive
    counterAttack_1 = 'counterAttack_1',
    counterAttack_2 = 'counterAttack_2',
    counterAttackCharge_1 = 'counterAttackCharge_1',
    counterAttackCharge_2 = 'counterAttackCharge_2',
    taunt = 'taunt',
    reflect = 'reflect',
    ward = 'ward',
    // ⚔️ Combat Buffs
    cautious = 'cautious',
    focus = 'focus',
    defensiveStance_1 = 'defensiveStance_1',
    defensiveStance_2 = 'defensiveStance_2',
    defensiveStance_3 = 'defensiveStance_3',
    fightingSpirit_1 = 'fightingSpirit_1',
    fightingSpirit_2 = 'fightingSpirit_2',
    fightingSpirit_3 = 'fightingSpirit_3',
    primalRoar_1 = 'primalRoar_1',
    primalRoar_2 = 'primalRoar_2',
    primalRoar_3 = 'primalRoar_3',
    berserkerRage_1 = 'berserkerRage_1',
    berserkerRage_2 = 'berserkerRage_2',
    berserkerRage_3 = 'berserkerRage_3',
    innerFocus_1 = 'innerFocus_1',
    innerFocus_2 = 'innerFocus_2',
    innerFocus_3 = 'innerFocus_3',
    battleCry_1 = 'battleCry_1',
    battleCry_2 = 'battleCry_2',
    battleCry_3 = 'battleCry_3',
    zealotsFury = 'zealotsFury',
    poisonCoating_1 = 'poisonCoating_1',
    poisonCoating_2 = 'poisonCoating_2',
    poisonCoating_3 = 'poisonCoating_3',
    // 🔮 Magic & Utility
    haste = 'haste',
    inspiration = 'inspiration',
    bless = 'bless',
    rejuvenate = 'rejuvenate',
    cleanse = 'cleanse',
    demonic_empowerment = 'demonic_empowerment',
    mage_reflex = 'mage_reflex',
    timeWarp = 'timeWarp',
    frost_shield = 'frost_shield',
    petrify = 'petrify',
    choking = 'choking',
    corrupt = 'corrupt',
    wither = 'wither',
}
