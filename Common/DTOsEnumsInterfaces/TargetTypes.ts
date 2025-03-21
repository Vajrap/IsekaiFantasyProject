export class TargetType {
    targetPartyOrSelf: TargetPartyType;
    targetScope: TargetSelectionScope | 'none';
    targetConditionFilter: TargetConditionFilters | 'none';
    targetSortingOption: TargetSortingOptions | 'none';
    tauntConsideration: TargetTauntConsideration | 'none';
    targetBuffOrDebuffCondition: { buffOrDebuff: BuffsAndDebuffsEnum, value: number} | 'none';
    targetTraitCondition: { trait: string, value: number} | 'none';
    constructor(
        targetPartyOrSelf: TargetPartyType,
        targetScope?: TargetSelectionScope,
        targetConditionFilter?: TargetConditionFilters,
        targetSortingOption?: TargetSortingOptions,
        tauntConsideration?: TargetTauntConsideration,
        targetBuffOrDebuffCondition?: {buffOrDebuff: BuffsAndDebuffsEnum, value: number},
        targetTraitCondition?: { trait: string, value: number}
    ) 
    {
        this.targetPartyOrSelf = targetPartyOrSelf;
        this.targetScope = targetScope || 'none';
        this.targetConditionFilter = targetConditionFilter || 'none';
        this.targetSortingOption = targetSortingOption || 'none';
        this.tauntConsideration = tauntConsideration || 'none';
        this.targetBuffOrDebuffCondition = targetBuffOrDebuffCondition || 'none';
        this.targetTraitCondition = targetTraitCondition || 'none';
    }
}

  export enum TargetPartyType {
    Self = 'self',
    Ally = 'ally',
    Enemy = 'enemy',
  }
  
  // No shifting means that the target selection will only consider the front row or back row
  // If used 'Single' the game mechanic will follow the default behavior which more likely to target the front row
  // When use 'SingleFrontRowShiftable' meaning that, it will only rolled for the front row, only if the front row is empty, it will shift to the back row
  // We also need an 'OppositeRow' ? meaning if user is in front row, it will target the back row, and vice versa?
  export enum TargetSelectionScope {
    Single = 'single',
    SingleFrontRowShiftable = 'frontRowShiftable', // Prioritize front row but shift to back row if empty
    SingleBackRowShiftable = 'backRowShiftable',   // Prioritize back row but shift to front row if empty
    SingleFrontRow = 'frontRow',                   // Only front row, no shifting
    SingleBackRow = 'backRow',                     // Only back row, no shifting
    All = 'all',
    AllFrontRowShiftable = 'frontRowShiftable', // Prioritize front row but shift to back row if empty
    AllBackRowShiftable = 'backRowShiftable',   // Prioritize back row but shift to front row if empty
    AllFrontRow = 'frontRow',                   // Only front row, no shifting
    AllBackRow = 'backRow',                     // Only back row, no shifting
    OppositeRow = 'oppositeRow',                 // Target the opposite row
    OppositeRowShiftable = 'oppositeRowShiftable', // Target the opposite row, but shift to the other row if empty
  }
  
  export enum TargetConditionFilters {
    None = 'none',
    HasTrait = 'hasTrait',
    HasBuffOrDebuff = 'hasBuffOrDebuff',
    IsDead = 'isDead',
    IsSummoned = 'isSummonned'
  }
  
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
