import {
  TurnReport,
  ActorSkillEffect,
  TargetSkillEffect,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { ArmorType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
  TargetType,
  TargetScope,
  TargetSortingOptions,
} from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { selectOneTarget } from "../../../Game/Battle/TargetSelectionProcess";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";
import { Character } from "../../Character/Character";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { Party } from "../../Party/Party";
import { getSpellDamageAfterArmorPenalty } from "../Utils";
import { noTarget } from "../Utils/noTarget";
import { undefined } from "./ClericSkills";

export function skill_aid_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const targetType: TargetType = {
    scope: TargetScope.Single,
    sort: TargetSortingOptions.LowestHP,
  };
  const target = selectOneTarget(character, allies, targetType);

  if (target === "NO_TARGET") {
    return noTarget(character, "cast aid");
  }

  if (
    character.equipments.armor?.armorType != ArmorType.cloth &&
    character.equipments.armor?.armorType != ArmorType.light &&
    character.equipments.armor != undefined
  ) {
    const hitRoll = Dice.rollTwenty();
    let armorType = character.equipments.armor.armorType;
    switch (armorType) {
      case armorType === ArmorType.medium:
    }
  }

  let levelingHeal = 0;
  for (let i = 1; i <= skillLevel; i++) {
    levelingHeal += Dice.roll(DiceEnum.OneD2).sum;
  }

  let healing = Math.max(
    +Dice.roll(DiceEnum.OneD4).sum +
      StatMod.value(character.status.willpower()) +
      levelingHeal,
    0,
  );

  const crit = Dice.rollTwenty() === 20;
  if (crit) {
    healing = Math.floor((healing *= 1.5));
  }

  healing = getSpellDamageAfterArmorPenalty(character, healing);

  const castString = `${character.name} casts Aid on ${target.name}, ${crit ? "with critical" : ""} healing ${healing} HP.`;

  let result = target.receiveHeal({
    actor: character,
    healing: healing,
  });

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_aid",
    actorSkillEffect: ActorSkillEffect.Water_Magical,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.heal,
        effect: TargetSkillEffect.heal,
      },
    ],
    castString,
  };
}
