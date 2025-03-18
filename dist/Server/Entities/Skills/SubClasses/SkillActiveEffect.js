import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
export class SkillActiveEffect {
    constructor(targetTypes, skillActionObjects) {
        this.targetTypes = targetTypes;
        this.skillActionObjects = skillActionObjects;
    }
}
export class SkillActionObject {
    constructor({ type, subType, damageDiceBase, damageType, damageModifierStat, damageModifierBonus, damageMultiplier, hitBase, hitStat, trueHit, trueHitDice, trueHitDC, trueHitFailDamageMultiplier, saveStat, saveDiceIfTrueHit, critBase, critStat, applyEffect, traitBasedModifier, buffBasedModifier, specialEffect, preferredPositionDamageModifier, }) {
        this.type = type;
        this.subType = subType;
        this.damageDiceBase = damageDiceBase;
        this.damageType = damageType;
        this.damageModifierStat = damageModifierStat;
        this.damageModifierBonus = damageModifierBonus;
        this.damageMultiplier = damageMultiplier ? damageMultiplier : [1];
        this.hitBase = hitBase;
        this.hitStat = hitStat;
        this.trueHit = trueHit ? trueHit : false;
        this.trueHitDice = trueHitDice ? trueHitDice : DiceEnum.OneD6;
        this.trueHitDC = trueHitDC ? trueHitDC : 0;
        this.trueHitFailDamageMultiplier = trueHitFailDamageMultiplier ? trueHitFailDamageMultiplier : 1;
        this.saveStat = saveStat ? saveStat : CharacterStatusEnum.none;
        this.saveDiceIfTrueHit = saveDiceIfTrueHit ? saveDiceIfTrueHit : DiceEnum.OneD6;
        this.critBase = critBase;
        this.critStat = critStat;
        this.applyEffect = applyEffect;
        this.traitBasedModifier = traitBasedModifier ? traitBasedModifier : [{ trait: TraitEnum.None, modifier: 1 }];
        this.buffBasedModifier = buffBasedModifier ? buffBasedModifier : [{ buff: BuffsAndDebuffsEnum.none, stackNeeded: 99, value: 1 }];
        this.specialEffect = specialEffect ? specialEffect : [];
        this.preferredPositionDamageModifier = preferredPositionDamageModifier ? preferredPositionDamageModifier : { position: PreferredPositionEnum.Any, penaltyModifier: 1 };
    }
}
export var SkillActionType;
(function (SkillActionType) {
    SkillActionType["Positive"] = "Positive";
    SkillActionType["Negative"] = "Negative";
})(SkillActionType || (SkillActionType = {}));
export var SkillActionSubType;
(function (SkillActionSubType) {
    SkillActionSubType["Damage"] = "Damage";
    SkillActionSubType["Heal"] = "Heal";
    SkillActionSubType["Buff"] = "Buff";
    SkillActionSubType["Debuff"] = "Debuff";
    SkillActionSubType["BuffAndDebuff"] = "BuffAndDebuff";
    SkillActionSubType["DamageAndDebuff"] = "DamageAndDebuff";
    SkillActionSubType["DamageAndBuff"] = "DamageAndBuff";
    SkillActionSubType["HealAndBuff"] = "HealAndBuff";
    SkillActionSubType["HealAndDebuff"] = "HealAndDebuff";
    SkillActionSubType["DamageAndHeal"] = "DamageAndHeal";
    SkillActionSubType["DamageHealAndBuff"] = "DamageHealAndBuff";
    SkillActionSubType["DamageHealAndDebuff"] = "DamageHealAndDebuff";
})(SkillActionSubType || (SkillActionSubType = {}));
export var PreferredPositionEnum;
(function (PreferredPositionEnum) {
    PreferredPositionEnum["FrontToAny"] = "FrontToAny";
    PreferredPositionEnum["FrontToFront"] = "FrontToFront";
    PreferredPositionEnum["FrontToBack"] = "FrontToBack";
    PreferredPositionEnum["BackToAny"] = "BackToAny";
    PreferredPositionEnum["BackToFront"] = "BackToFront";
    PreferredPositionEnum["BackToBack"] = "BackToBack";
    PreferredPositionEnum["AnyToFront"] = "AnyToFront";
    PreferredPositionEnum["AnyToBack"] = "AnyToBack";
    PreferredPositionEnum["Any"] = "Any";
    PreferredPositionEnum["Range"] = "AnyRange";
    PreferredPositionEnum["MiddleRange"] = "MiddleRange";
})(PreferredPositionEnum || (PreferredPositionEnum = {}));
export class SkillApplyEffect {
    constructor({ applyWithoutHit, effectName, effectHitBase, effectHitBonus, effectDuration, effectDurationBonus, effectStatForResistance, }) {
        this.applyWithoutHit = applyWithoutHit;
        this.effectName = effectName;
        this.effectHitBase = effectHitBase;
        this.effectHitBonus = effectHitBonus;
        this.effectDuration = effectDuration;
        this.effectStatForResistance = effectStatForResistance;
        this.effectDurationBonus = effectDurationBonus ? effectDurationBonus : [];
    }
}
