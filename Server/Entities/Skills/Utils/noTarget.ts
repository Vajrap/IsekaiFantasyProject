import { ActorSkillEffect, TurnReport } from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Character } from "../../Character/Character";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";

export function noTarget(character: Character, castString: string): TurnReport {
	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_aid",
		actorSkillEffect: ActorSkillEffect.None,
		consume: { hp: [], mp: [], sp: [], elements: [] },
		produce: { elements: [] },
		targets: [],
		castString: `${character.name} tried to ${castString} but found no valid target.`,
	};
}
