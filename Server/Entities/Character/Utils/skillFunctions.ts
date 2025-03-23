import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { validateSkillLearning } from "../../../Game/Battle/Calculators/isSkillPlayable";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";
import { skillRepository } from "../../Skills/SkillRepository";
import { Character } from "../Character";
import {
	getExpNeededForSkill,
	getLevelContribution,
} from "../getLevelContribution";

enum LearnSkillResult {
	Success,
	SkillAlreadyLearned,
}

enum TrainSkillResult {
	SuccessWithLevelUp,
	SuccessWithoutLevelUp,
	SuccessButMaxLevelReached,
	SkillNotLearned,
}

export function learnSkill(
	actor: Character,
	skillID: string
): LearnSkillResult {
	const skill = skillRepository.getSkill(skillID);
	if (actor.skills[skillID]) {
		return LearnSkillResult.SkillAlreadyLearned;
	}

	if (validateSkillLearning(actor, skill.meta.requirement)) {
		actor.skills[skillID] = {
			id: skillID,
			name: skill.meta.name,
			level: 1,
			exp: 0,
			description: skill.meta.description,
			tier: skill.meta.tier,
			equipmentNeeded: skill.meta.equipmentNeeded.weapon
				? skill.meta.equipmentNeeded.weapon
				: [],
			consume: skill.meta.consume,
			produce: skill.meta.produce,
			isSpell: skill.meta.isSpell,
			isReaction: skill.meta.isReaction,
			isWeaponAttack: skill.meta.isWeaponAttack,
		};
	}

	return LearnSkillResult.Success;
}

export function trainSkill(
	actor: Character,
	skillID: string
): TrainSkillResult {
	let skill;
	skill = actor.skills[skillID];
	if (skill === undefined) {
		skill = actor.activeSkills.find((s) => s.id === skillID);
	}
	if (skill === undefined) {
		return TrainSkillResult.SkillNotLearned;
	}

	function tierToMaxLevel(tier: Tier) {
		switch (tier) {
			case Tier.common || Tier.uncommon:
				return 5;
			case Tier.rare || Tier.epic:
				return 7;
			case Tier.legendary || Tier.unique:
				return 10;
			case Tier.divine:
				return 15;
			default:
				return 5;
		}
	}

	let maxLevel = tierToMaxLevel(skill.tier);

	if (skill.level >= maxLevel) {
		return TrainSkillResult.SuccessButMaxLevelReached;
	}

	const expNeeded = getExpNeededForSkill(skill.level, skill.tier);

	const expGained =
		Dice.rollTwenty() +
		StatMod.value(actor.attribute(CharacterStatusEnum.intelligence));
	skill.exp += expGained;
	if (skill.exp >= expNeeded) {
		skill.level++;
		skill.exp -= expNeeded;
		actor.gainStatTracker(getLevelContribution(skill.level, skill.tier));
		return TrainSkillResult.SuccessWithLevelUp;
	}
	return TrainSkillResult.SuccessWithoutLevelUp;
}
