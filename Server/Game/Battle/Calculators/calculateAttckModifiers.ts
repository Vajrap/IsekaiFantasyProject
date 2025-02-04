import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { CharacterBattleContext } from "../../../Entities/Character/CharacterBattleContext";


export function calculateAttackModifiers(
    damageObject: {
        traitBasedModifier: { trait: TraitEnum; modifier: number };
        buffBasedModifier: { buff: BuffsAndDebuffsEnum; stackNeeded: number; value: number };
    },
    target: CharacterBattleContext
) {
    const targetTraits = target.actorTraits;
    const traitModifier =
        damageObject.traitBasedModifier.trait in targetTraits
            ? damageObject.traitBasedModifier.modifier
            : 1;

    const targetBuffs = target.actorBuffs;
    const buffModifier =
        damageObject.buffBasedModifier.buff === BuffsAndDebuffsEnum.none
            ? 1
            : targetBuffs[damageObject.buffBasedModifier.buff] >= damageObject.buffBasedModifier.stackNeeded
                ? damageObject.buffBasedModifier.value
                : 1;

    return { traitModifier, buffModifier };
}