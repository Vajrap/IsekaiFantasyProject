import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { DiceEnum } from "../../../../Common/DIceEnum";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { BuffsAndDebuffsEnum, TargetType } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";

export class SkillActiveEffect {
    targetTypes: TargetType;
    skillActionObjects: SkillActionObject[];
    constructor(
        targetTypes: TargetType,
        skillActionObjects: SkillActionObject[],
    ) {
        this.targetTypes = targetTypes;
        this.skillActionObjects = skillActionObjects;
    }
}

export interface SpecialEffectResult {
    damage?: number,
    damageMultiplier?: number,
    buffsOrDebuffs?: {
        type: BuffsAndDebuffsEnum;
        duration: number;
    },
}

export class SkillActionObject {
    type: SkillActionType;  // Type of skill
    subType: SkillActionSubType;
    damageDiceBase: DiceEnum[];
    damageType: DamageTypes[];
    damageModifierStat: CharacterStatusEnum[];
    damageModifierBonus: number[];
    damageMultiplier: number[];
    hitBase: number[];
    hitStat: CharacterStatusEnum[][];
    trueHit: boolean;
    trueHitDice: DiceEnum;
    trueHitDC: number;
    trueHitFailDamageMultiplier: number;
    saveStat: CharacterStatusEnum;
    saveDiceIfTrueHit: DiceEnum;
    critBase: number[];
    critStat: CharacterStatusEnum[][];
    applyEffect: SkillApplyEffect[][];
    traitBasedModifier: {trait:TraitEnum, modifier: number}[];
    buffBasedModifier: {buff: BuffsAndDebuffsEnum, stackNeeded: number, value: number}[];
    specialEffect: {
        condition: {
            actor?: {
                stat: {
                    type: CharacterStatusEnum,
                    value: number
                },
                trait: TraitEnum,
                buff: {
                    type: BuffsAndDebuffsEnum, 
                    stack: number
                },
            }
            target?: {
                stat: {
                    type: CharacterStatusEnum,
                    value: number
                },
                trait: TraitEnum,
                buff: {
                    type: BuffsAndDebuffsEnum, 
                    stack: number
                },
            }
            skillLevel?:number
        }, 
        effect: SpecialEffectResult,
    }[];
    preferredPositionDamageModifier: { position: PreferredPositionEnum, penaltyModifier: number };

    constructor({
        type,
        subType,
        damageDiceBase,
        damageType,
        damageModifierStat,
        damageModifierBonus,
        damageMultiplier,
        hitBase,
        hitStat,
        trueHit,
        trueHitDice,
        trueHitDC,
        trueHitFailDamageMultiplier,
        saveStat,
        saveDiceIfTrueHit,
        critBase,
        critStat,
        applyEffect,
        traitBasedModifier,
        buffBasedModifier,
        specialEffect,
        preferredPositionDamageModifier,
    }: {
        type: SkillActionType;
        subType: SkillActionSubType;
        damageDiceBase: DiceEnum[];
        damageType: DamageTypes[];
        damageModifierStat: CharacterStatusEnum[];
        damageModifierBonus: number[];
        damageMultiplier?: number[];
        hitBase: number[];
        hitStat: CharacterStatusEnum[][];
        trueHit?: boolean;
        trueHitDice?: DiceEnum;
        trueHitDC?: number;
        trueHitFailDamageMultiplier?: number;
        saveStat?: CharacterStatusEnum;
        saveDiceIfTrueHit?: DiceEnum;
        critBase: number[];
        critStat: CharacterStatusEnum[][];
        applyEffect: SkillApplyEffect[][];
        traitBasedModifier?: {trait: TraitEnum, modifier: number}[];
        buffBasedModifier?: {buff: BuffsAndDebuffsEnum, stackNeeded: number, value: number}[];
        specialEffect?: {
            condition: {
                actor?: {
                    stat: {
                        type: CharacterStatusEnum,
                        value: number
                    },
                    trait: TraitEnum,
                    buff: {
                        type: BuffsAndDebuffsEnum, 
                        stack: number
                    },
                }
                target?: {
                    stat: {
                        type: CharacterStatusEnum,
                        value: number
                    },
                    trait: TraitEnum,
                    buff: {
                        type: BuffsAndDebuffsEnum, 
                        stack: number
                    },
                }
                skillLevel?:number
            }, 
            effect: SpecialEffectResult
        }[],
        preferredPositionDamageModifier?: {
            position: PreferredPositionEnum, 
            penaltyModifier: number
        };
    }) {
        this.type = type;
        this.subType = subType;
        this.damageDiceBase = damageDiceBase;
        this.damageType = damageType;
        this.damageModifierStat = damageModifierStat;
        this.damageModifierBonus = damageModifierBonus;
        this.damageMultiplier = damageMultiplier? damageMultiplier : [1];
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
        this.traitBasedModifier = traitBasedModifier? traitBasedModifier : [{trait: TraitEnum.None, modifier: 1}];
        this.buffBasedModifier = buffBasedModifier? buffBasedModifier : [{buff: BuffsAndDebuffsEnum.none, stackNeeded: 99, value: 1}];
        this.specialEffect = specialEffect ? specialEffect : [];
        this.preferredPositionDamageModifier = preferredPositionDamageModifier ? preferredPositionDamageModifier : { position: PreferredPositionEnum.Any, penaltyModifier: 1 };
    }
}

export enum SkillActionType {
    Positive = "Positive",
    Negative = "Negative",
}

export enum SkillActionSubType {
    Damage = "Damage",
    Heal = "Heal",
    Buff = "Buff",
    Debuff = "Debuff",

    BuffAndDebuff = "BuffAndDebuff",

    DamageAndDebuff = "DamageAndDebuff",
    DamageAndBuff = "DamageAndBuff",
    
    HealAndBuff = "HealAndBuff",
    HealAndDebuff = "HealAndDebuff",

    DamageAndHeal = "DamageAndHeal",
    DamageHealAndBuff = "DamageHealAndBuff",
    DamageHealAndDebuff = "DamageHealAndDebuff",
}

export enum PreferredPositionEnum {
    FrontToAny = "FrontToAny",
    FrontToFront = "FrontToFront",
    FrontToBack = "FrontToBack",
    BackToAny = "BackToAny",
    BackToFront = "BackToFront",
    BackToBack = "BackToBack",
    AnyToFront = "AnyToFront",
    AnyToBack = "AnyToBack",
    Any = "Any",
    Range = "AnyRange", // This means Front to Back, Back to Front, or Back to Back
    MiddleRange = "MiddleRange",     // Front-Back or Back-Front, No Back-Back
}

export class SkillApplyEffect {
    applyWithoutHit: boolean[];
    effectName: BuffsAndDebuffsEnum[];
    effectHitBase: number[];
    effectHitBonus: CharacterStatusEnum[][];
    effectDuration: number[];
    effectDurationBonus: CharacterStatusEnum[];
    effectStatForResistance: CharacterStatusEnum;

    constructor({
        applyWithoutHit,
        effectName,
        effectHitBase,
        effectHitBonus,
        effectDuration,
        effectDurationBonus,
        effectStatForResistance,
    }: {
        applyWithoutHit: boolean[];
        effectName: BuffsAndDebuffsEnum[];
        effectHitBase: number[];
        effectHitBonus: CharacterStatusEnum[][];
        effectDuration: number[];
        effectDurationBonus: CharacterStatusEnum[];
        effectStatForResistance: CharacterStatusEnum;
    }) {
        this.applyWithoutHit = applyWithoutHit;
        this.effectName = effectName;
        this.effectHitBase = effectHitBase;
        this.effectHitBonus = effectHitBonus;
        this.effectDuration = effectDuration;
        this.effectStatForResistance = effectStatForResistance;
        this.effectDurationBonus = effectDurationBonus? effectDurationBonus : [];
    }
}
