import { SkillActionSubType, SkillApplyEffect, SpecialEffectResult } from "Server/Entities/Skills/SubClasses/SkillActiveEffect";
import { BuffsAndDebuffsEnum } from "../TargetTypes";
import { TraitEnum } from "../TraitEnums";
import { CharacterStatusEnum } from "../Character/CharacterStatusTypes";
import { DiceEnum } from "../DiceEnum";
import { DamageTypes } from "../DamageTypes";

export interface DamageObjectDTO {
    baseDamage: number;
    type: DamageTypes;
    crit: boolean;
    hit: number;
    trueHit: boolean;
    trueHitDice: DiceEnum;
    trueHitDC: number;
    trueHitFailDamageMultiplier: number;
    saveStat: CharacterStatusEnum;
    applyEffect: SkillApplyEffect[];
    skillActionSubType: SkillActionSubType;
    traitBasedModifier: {
        trait: TraitEnum;
        modifier: number;
    };
    buffBasedModifier: {
        buff: BuffsAndDebuffsEnum;
        stackNeeded: number;
        value: number;
    };
    specialEffect: {
        condition: {
            actor?: {
                stat: {
                    type: CharacterStatusEnum;
                    value: number;
                };
                trait: TraitEnum;
                buff: {
                    type: BuffsAndDebuffsEnum;
                    stack: number;
                };
            };
            target?: {
                stat: {
                    type: CharacterStatusEnum;
                    value: number;
                };
                trait: TraitEnum;
                buff: {
                    type: BuffsAndDebuffsEnum;
                    stack: number;
                };
            };
            skillLevel?: number;
        };
        effect: SpecialEffectResult;
    };
}

