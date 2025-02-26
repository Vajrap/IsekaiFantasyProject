import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { BuffsAndDebuffsEnum } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { EffectReturnObject } from "../../Game/Battle/EffectResolverAndAppender/EffectSend + Receive Objects";
import { DamageObject } from "../../Utility/DamageObject";
import { SkillApplyEffect } from "../Skills/SubClasses/SkillActiveEffect";
import { Character } from "./Character";

export function weaponAttackAdditionalEffect(
    actor: Character,
    target: Character,
    skillLevel: number,
): EffectReturnObject [] {
    let returnEffects: EffectReturnObject[] = [];

    if (actor.buffsAndDebuffs.poisonCoating_1 > 0) {
        let effectResult = actor.inflictEffect(
            target,
            new SkillApplyEffect({
                applyWithoutHit: [false],
                effectName: [BuffsAndDebuffsEnum.poison],
                effectHitBase: [9999],
                effectHitBonus: [],
                effectDuration: [3],
                effectDurationBonus: [],
                effectStatForResistance: CharacterStatusEnum.none,
            }),
            skillLevel
        );
        returnEffects.push(effectResult);
    }

    if (actor.buffsAndDebuffs.poisonCoating_2 > 0) {
        let effectResult = actor.inflictEffect(
            target,
            new SkillApplyEffect({
                applyWithoutHit: [false],
                effectName: [BuffsAndDebuffsEnum.poison],
                effectHitBase: [9999],
                effectHitBonus: [],
                effectDuration: [4],
                effectDurationBonus: [],
                effectStatForResistance: CharacterStatusEnum.none,
            }),
            skillLevel
        );
        returnEffects.push(effectResult);
    }

    if (actor.buffsAndDebuffs.poisonCoating_3 > 0) {
        let effectResult = actor.inflictEffect(
            target,
            new SkillApplyEffect({
                applyWithoutHit: [false],
                effectName: [BuffsAndDebuffsEnum.poison],
                effectHitBase: [9999],
                effectHitBonus: [],
                effectDuration: [5],
                effectDurationBonus: [],
                effectStatForResistance: CharacterStatusEnum.none,
            }),
            skillLevel
        );
        returnEffects.push(effectResult);
    }

    return returnEffects
}


            