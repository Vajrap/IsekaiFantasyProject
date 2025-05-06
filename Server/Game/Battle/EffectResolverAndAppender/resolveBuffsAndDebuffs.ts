import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Character } from "../../../Entities/Character/Character";
import { EffectResolver } from "./EffectResolver";

export function resolveBuffsAndDebuffs(character: Character): boolean {
  let canContinue = true;
  for (const effect in character.buffsAndDebuffs) {
    if (character.buffsAndDebuffs[effect as BuffsAndDebuffsEnum] <= 0) break;
    const resolverFunction = EffectResolver[effect as BuffsAndDebuffsEnum];
    if (typeof resolverFunction === "function") {
      const result = resolverFunction(character);
      if (!result) {
        canContinue = false;
      }
    }
  }
  return canContinue;
}
