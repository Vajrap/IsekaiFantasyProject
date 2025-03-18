export class TargetType {
    constructor(targetPartyOrSelf, targetScope, targetConditionFilter, targetSortingOption, tauntConsideration, targetBuffOrDebuffCondition, targetTraitCondition) {
        this.targetPartyOrSelf = targetPartyOrSelf;
        this.targetScope = targetScope || 'none';
        this.targetConditionFilter = targetConditionFilter || 'none';
        this.targetSortingOption = targetSortingOption || 'none';
        this.tauntConsideration = tauntConsideration || 'none';
        this.targetBuffOrDebuffCondition = targetBuffOrDebuffCondition || 'none';
        this.targetTraitCondition = targetTraitCondition || 'none';
    }
}
export var TargetPartyType;
(function (TargetPartyType) {
    TargetPartyType["Self"] = "self";
    TargetPartyType["Ally"] = "ally";
    TargetPartyType["Enemy"] = "enemy";
})(TargetPartyType || (TargetPartyType = {}));
// No shifting means that the target selection will only consider the front row or back row
// If used 'Single' the game mechanic will follow the default behavior which more likely to target the front row
// When use 'SingleFrontRowShiftable' meaning that, it will only rolled for the front row, only if the front row is empty, it will shift to the back row
// We also need an 'OppositeRow' ? meaning if user is in front row, it will target the back row, and vice versa?
export var TargetSelectionScope;
(function (TargetSelectionScope) {
    TargetSelectionScope["Single"] = "single";
    TargetSelectionScope["SingleFrontRowShiftable"] = "frontRowShiftable";
    TargetSelectionScope["SingleBackRowShiftable"] = "backRowShiftable";
    TargetSelectionScope["SingleFrontRow"] = "frontRow";
    TargetSelectionScope["SingleBackRow"] = "backRow";
    TargetSelectionScope["All"] = "all";
    TargetSelectionScope["AllFrontRowShiftable"] = "frontRowShiftable";
    TargetSelectionScope["AllBackRowShiftable"] = "backRowShiftable";
    TargetSelectionScope["AllFrontRow"] = "frontRow";
    TargetSelectionScope["AllBackRow"] = "backRow";
    TargetSelectionScope["OppositeRow"] = "oppositeRow";
    TargetSelectionScope["OppositeRowShiftable"] = "oppositeRowShiftable";
})(TargetSelectionScope || (TargetSelectionScope = {}));
export var TargetConditionFilters;
(function (TargetConditionFilters) {
    TargetConditionFilters["None"] = "none";
    TargetConditionFilters["HasTrait"] = "hasTrait";
    TargetConditionFilters["HasBuffOrDebuff"] = "hasBuffOrDebuff";
    TargetConditionFilters["IsDead"] = "isDead";
    TargetConditionFilters["IsSummoned"] = "isSummonned";
})(TargetConditionFilters || (TargetConditionFilters = {}));
export var TargetSortingOptions;
(function (TargetSortingOptions) {
    TargetSortingOptions["None"] = "none";
    TargetSortingOptions["LowestHP"] = "lowestHP";
    TargetSortingOptions["HighestHP"] = "highestHP";
    TargetSortingOptions["LowestMP"] = "lowestMP";
    TargetSortingOptions["HighestMP"] = "highestMP";
    TargetSortingOptions["LowestSP"] = "lowestSP";
    TargetSortingOptions["HighestSP"] = "highestSP";
    TargetSortingOptions["PreferredFrontRow"] = "preferredFrontRow";
    TargetSortingOptions["PreferredBackRow"] = "preferredBackRow";
    TargetSortingOptions["LowestPhysicalAttack"] = "lowestPhysicalAttack";
    TargetSortingOptions["HighestPhysicalAttack"] = "highestPhysicalAttack";
    TargetSortingOptions["LowestMagicalAttack"] = "lowestMagicalAttack";
    TargetSortingOptions["HighestMagicalAttack"] = "highestMagicalAttack";
    TargetSortingOptions["LowestPhysicalDefense"] = "lowestPhysicalDefense";
    TargetSortingOptions["HighestPhysicalDefense"] = "highestPhysicalDefense";
    TargetSortingOptions["LowestMagicalDefense"] = "lowestMagicalDefense";
    TargetSortingOptions["HighestMagicalDefense"] = "highestMagicalDefense";
    TargetSortingOptions["LowestLevel"] = "lowestLevel";
    TargetSortingOptions["HighestLevel"] = "highestLevel";
    TargetSortingOptions["Fastest"] = "fastest";
    TargetSortingOptions["Slowest"] = "slowest";
})(TargetSortingOptions || (TargetSortingOptions = {}));
export var TargetTauntConsideration;
(function (TargetTauntConsideration) {
    TargetTauntConsideration["TauntCount"] = "tauntCount";
    TargetTauntConsideration["NoTauntCount"] = "noTauntCount";
})(TargetTauntConsideration || (TargetTauntConsideration = {}));
export var BuffsAndDebuffsEnum;
(function (BuffsAndDebuffsEnum) {
    BuffsAndDebuffsEnum["none"] = "none";
    BuffsAndDebuffsEnum["stun"] = "stun";
    BuffsAndDebuffsEnum["blind"] = "blind";
    BuffsAndDebuffsEnum["slow"] = "slow";
    BuffsAndDebuffsEnum["bleed"] = "bleed";
    BuffsAndDebuffsEnum["poison"] = "poison";
    BuffsAndDebuffsEnum["bound"] = "bound";
    BuffsAndDebuffsEnum["paralyse"] = "paralyse";
    BuffsAndDebuffsEnum["burn"] = "burn";
    BuffsAndDebuffsEnum["awed"] = "awed";
    BuffsAndDebuffsEnum["cursed"] = "cursed";
    BuffsAndDebuffsEnum["freeze"] = "freeze";
    BuffsAndDebuffsEnum["confuse"] = "confuse";
    BuffsAndDebuffsEnum["fear"] = "fear";
    BuffsAndDebuffsEnum["entangled"] = "entangled";
    BuffsAndDebuffsEnum["soaked"] = "soaked";
    BuffsAndDebuffsEnum["stoneSkin"] = "stoneSkin";
    BuffsAndDebuffsEnum["counterAttack_1"] = "counterAttack_1";
    BuffsAndDebuffsEnum["counterAttack_2"] = "counterAttack_2";
    BuffsAndDebuffsEnum["counterAttackCharge_1"] = "counterAttackCharge_1";
    BuffsAndDebuffsEnum["counterAttackCharge_2"] = "counterAttackCharge_2";
    BuffsAndDebuffsEnum["cautious"] = "cautious";
    BuffsAndDebuffsEnum["focus"] = "focus";
    BuffsAndDebuffsEnum["defend"] = "defend";
    BuffsAndDebuffsEnum["defensiveStance_1"] = "defensiveStance_1";
    BuffsAndDebuffsEnum["defensiveStance_2"] = "defensiveStance_2";
    BuffsAndDebuffsEnum["defensiveStance_3"] = "defensiveStance_3";
    BuffsAndDebuffsEnum["taunt"] = "taunt";
    BuffsAndDebuffsEnum["arcaneShield"] = "arcaneShield";
    BuffsAndDebuffsEnum["timeWarp"] = "timeWarp";
    BuffsAndDebuffsEnum["weaponMagicalCoating"] = "weaponMagicalCoating";
    BuffsAndDebuffsEnum["stealth"] = "stealth";
    BuffsAndDebuffsEnum["bless"] = "bless";
    BuffsAndDebuffsEnum["haste"] = "haste";
    BuffsAndDebuffsEnum["shielded"] = "shielded";
    BuffsAndDebuffsEnum["inspiration"] = "inspiration";
    BuffsAndDebuffsEnum["fightingSpirit_1"] = "fightingSpirit_1";
    BuffsAndDebuffsEnum["fightingSpirit_2"] = "fightingSpirit_2";
    BuffsAndDebuffsEnum["fightingSpirit_3"] = "fightingSpirit_3";
    BuffsAndDebuffsEnum["divineShield"] = "divineShield";
    BuffsAndDebuffsEnum["manaShield"] = "manaShield";
    BuffsAndDebuffsEnum["zealotsFury"] = "zealotsFury";
    BuffsAndDebuffsEnum["primalRoar_1"] = "primalRoar_1";
    BuffsAndDebuffsEnum["primalRoar_2"] = "primalRoar_2";
    BuffsAndDebuffsEnum["primalRoar_3"] = "primalRoar_3";
    BuffsAndDebuffsEnum["poisonCoating_1"] = "poisonCoating_1";
    BuffsAndDebuffsEnum["poisonCoating_2"] = "poisonCoating_2";
    BuffsAndDebuffsEnum["poisonCoating_3"] = "poisonCoating_3";
    BuffsAndDebuffsEnum["berserkerRage_1"] = "berserkerRage_1";
    BuffsAndDebuffsEnum["berserkerRage_2"] = "berserkerRage_2";
    BuffsAndDebuffsEnum["berserkerRage_3"] = "berserkerRage_3";
    BuffsAndDebuffsEnum["innerFocus_1"] = "innerFocus_1";
    BuffsAndDebuffsEnum["innerFocus_2"] = "innerFocus_2";
    BuffsAndDebuffsEnum["innerFocus_3"] = "innerFocus_3";
    BuffsAndDebuffsEnum["chiCirculation"] = "chiCirculation";
    BuffsAndDebuffsEnum["battleCry_1"] = "battleCry_1";
    BuffsAndDebuffsEnum["battleCry_2"] = "battleCry_2";
    BuffsAndDebuffsEnum["battleCry_3"] = "battleCry_3";
    BuffsAndDebuffsEnum["isSummoned"] = "isSummoned";
    BuffsAndDebuffsEnum["rejuvenate"] = "rejuvenate";
    BuffsAndDebuffsEnum["cleanse"] = "cleanse";
    BuffsAndDebuffsEnum["desperation"] = "desperation";
    BuffsAndDebuffsEnum["mage_reflex"] = "mage_reflex";
    BuffsAndDebuffsEnum["demonic_empowerment"] = "demonic_empowerment";
    BuffsAndDebuffsEnum["frost_shield"] = "frost_shield";
})(BuffsAndDebuffsEnum || (BuffsAndDebuffsEnum = {}));
