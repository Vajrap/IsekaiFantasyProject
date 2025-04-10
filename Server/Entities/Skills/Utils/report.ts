import {
  ActorSkillEffect,
  TurnReport,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { Character } from "../../Character/Character";

export function skillExecNoTargetReport(
  character: Character,
  skillName: string,
): TurnReport {
  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_auto_physical",
    actorSkillEffect: ActorSkillEffect.None,
    targets: [],
    castString: `${character.name} tried to use ${skillName} but there was no target.`,
  };
}

export function skillExecSpellCastFailDueToArmorReport(
  character: Character,
  spellName: string,
): TurnReport {
  return {
    character: turnCharacterIntoInterface(character),
    skill: spellName,
    actorSkillEffect: ActorSkillEffect.None,
    targets: [],
    castString: `${character.name} tried to cast ${spellName} but failed due to armor.`,
  };
}
