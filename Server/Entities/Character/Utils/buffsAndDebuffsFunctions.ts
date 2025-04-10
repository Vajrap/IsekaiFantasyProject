import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { EffectAppender } from "../../../Game/Battle/EffectResolverAndAppender/EffectAppender";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";
import { Character } from "../Character";
import { CharacterType } from "../Enums/CharacterType";

export function receiveBuff(
  character: Character,
  buff: BuffsAndDebuffsEnum,
  duration: number,
): {
  result: boolean;
  message: string;
} {
  let appendingResult = true;
  let additionalMessage = ``;
  // TODO: additional, some Trait or existing buff might affect the duration of the buff, need to manually check for those here.
  if (
    character.buffsAndDebuffs.cursed > 0 &&
    character.buffsAndDebuffs.bless < character.buffsAndDebuffs.cursed
  ) {
    const save = Dice.rollTwenty() + StatMod.value(character.status.luck());
    if (save < 10 + character.buffsAndDebuffs.cursed) {
      return { result: false, message: "Buff failed due to curse." };
    }
  }
  if (
    buff === BuffsAndDebuffsEnum.bless &&
    character.type === CharacterType.undead
  ) {
    return { result: false, message: "Undead cannot be blessed." };
  }
  if (
    buff === BuffsAndDebuffsEnum.rejuvenate &&
    character.type === CharacterType.undead
  ) {
    return { result: false, message: "Undead cannot be rejuvenated." };
  }

  let appenderFunction = EffectAppender[buff];
  appenderFunction(character, duration);

  additionalMessage += `\n${character.name} got ${buff} for ${duration} turns.`;
  return { result: appendingResult, message: additionalMessage };
}

export function receiveDebuff(
  character: Character,
  debuff: BuffsAndDebuffsEnum,
  duration: number,
): {
  result: boolean;
  message: string;
} {
  let appendingResult = true;
  let additionalMessage = ``;
  // TODO: Same as above, but the condition checking here is for debuffs appended only
  if (
    character.buffsAndDebuffs.bless > 0 &&
    character.buffsAndDebuffs.cursed < character.buffsAndDebuffs.bless
  ) {
    const save = Dice.rollTwenty() + StatMod.value(character.status.luck());
    if (save > 10 - character.buffsAndDebuffs.bless) {
      return { result: false, message: "Debuff failed due to bless." };
    }
  }
  if (
    debuff === BuffsAndDebuffsEnum.bleed &&
    character.type === CharacterType.undead
  ) {
    return { result: false, message: "Undead cannot bleed." };
  }
  if (
    debuff === BuffsAndDebuffsEnum.poison &&
    character.type === CharacterType.undead
  ) {
    return { result: false, message: "Undead cannot be poisoned." };
  }
  if (
    debuff === BuffsAndDebuffsEnum.burn &&
    character.buffsAndDebuffs.freeze > 0
  ) {
    character.buffsAndDebuffs.freeze = 0;
    additionalMessage += `Freeze debuff removed.`;
  }
  if (
    debuff === BuffsAndDebuffsEnum.burn &&
    character.buffsAndDebuffs.soaked > 0
  ) {
    return { result: false, message: "Soaked target cannot be burned." };
  }
  if (
    debuff === BuffsAndDebuffsEnum.freeze &&
    character.buffsAndDebuffs.burn > 0
  ) {
    character.buffsAndDebuffs.burn = 0;
    additionalMessage += `Burn debuff removed.`;
  }
  if (
    debuff === BuffsAndDebuffsEnum.freeze &&
    character.type === CharacterType.undead
  ) {
    return { result: false, message: "Undead cannot be frozen." };
  }
  if (
    debuff === BuffsAndDebuffsEnum.soaked &&
    character.buffsAndDebuffs.burn > 0
  ) {
    character.buffsAndDebuffs.burn = 0;
    additionalMessage += `Burn debuff removed.`;
  }

  let appenderFuntion = EffectAppender[debuff];
  appenderFuntion(character, duration);

  additionalMessage += ` \n${character.name} got ${debuff} for ${duration} turns.`;
  return { result: appendingResult, message: additionalMessage };
}
