import { SkillConsume, SkillProduce } from "./SubClasses/SkillConsume";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Character } from "../Character/Character";
import { GameTime } from "../../Game/TimeAndDate/GameTime";
import { TurnReport } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../Party/Party";
import { WeaponSpecificType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";


export class Skill {
	meta: {
		id: string;
		name: string;
		tier: Tier;
		description: string;
		requirement: SkillLearningRequirement;
		equipmentNeeded: WeaponSpecificType[];
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
			equipmentNeeded: WeaponSpecificType[];
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
