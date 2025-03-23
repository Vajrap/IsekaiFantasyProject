import { SkillConsume, SkillProduce } from "./SubClasses/SkillConsume";
import { SkillEquipmentRequirement } from "./SubClasses/SkillEquipmentRequirement";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Character } from "../Character/Character";
import { GameTime } from "../../Game/TimeAndDate/GameTime";
import {
	ActorSkillEffect,
	TargetSkillEffect,
} from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { CharacterInterface } from "../../../Common/RequestResponse/characterWS";
import {
	SkillConsumeInterface,
	SkillProduceInterface,
} from "../../../Common/DTOsEnumsInterfaces/Skill/Consume+Produce";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../Party/Party";

export interface TurnReport {
	character: CharacterInterface;
	skill: string;
	actorSkillEffect: ActorSkillEffect;
	consume: SkillConsumeInterface;
	produce: SkillProduceInterface;
	targets: TargetData[];
	castString: string;
}

interface TargetData {
	character: CharacterInterface;
	damageTaken: number;
	effect: TargetSkillEffect | "none";
}

export class Skill {
	meta: {
		id: string;
		name: string;
		tier: Tier;
		description: string;
		requirement: SkillLearningRequirement;
		equipmentNeeded: SkillEquipmentRequirement;
		castString: string;
		consume: SkillConsume;
		produce: SkillProduce;
		isSpell: boolean;
		isAuto: boolean;
		isWeaponAttack: boolean;
		isReaction: boolean;
	};
	executor: (
		character: Character,
		allies: Party,
		enemies: Party,
		context: { time: GameTime; location: LocationName }
	) => TurnReport;
	constructor(
		meta: {
			id: string;
			name: string;
			tier: Tier;
			description: string;
			requirement: SkillLearningRequirement;
			equipmentNeeded: SkillEquipmentRequirement;
			castString: string;
			consume: SkillConsume;
			produce: SkillProduce;
			isSpell: boolean;
			isAuto: boolean;
			isWeaponAttack: boolean;
			isReaction: boolean;
		},
		executor: (
			character: Character,
			allies: Party,
			enemies: Party,
			context: { time: GameTime; location: LocationName }
		) => TurnReport
	) {
		this.meta = meta;
		this.executor = executor;
	}
}
