import { Character } from "../../Entities/Character/Character";
import {
	learnSkill,
	trainSkill,
} from "../../Entities/Character/Utils/skillFunctions";
import { turnCharacterIntoInterface } from "../../Entities/Character/Utils/turnCharacterIntoInterface";
import { skillRepository } from "../../Entities/Skills/SkillRepository";
import { Dice } from "../../Utility/Dice";
import { screamer } from "../../Utility/Screamer/Screamer";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { StatMod } from "../../Utility/StatMod";

export const TRAIN_EVENT = "TRAIN_EVENT";
export const LEARN_EVENT_END = "LEARN_EVENT_END";
export const LEARN_EVENT_PROGRESS = "LEARN_EVENT_PROGRESS";
export const LEARN_EVENT_LEARN = "LEARN_EVENT_LEARN";

// TODO: need to add learning progress, else it'll be one time learn;
export async function event_skill_learn(
	character: Character,
	skillID: string,
	oneTimeLearn: boolean = false
) {
	if (oneTimeLearn) {
		learnSkill(character, skillID);
		screamTrainEvent(character, skillID, LEARN_EVENT_END);
	} else {
		const tier = skillRepository.getSkill(skillID).meta.tier;

		function getBaseAndBonusRange(tier: Tier): { base: number, bonusDice: DiceEnum } {
			switch (tier) {
				case Tier.common: return { base: 30, bonusDice: DiceEnum.OneD6 };
				case Tier.uncommon: return { base: 25, bonusDice: DiceEnum.OneD6 };
				case Tier.rare: return { base: 20, bonusDice: DiceEnum.OneD6 };
				case Tier.epic: return { base: 15, bonusDice: DiceEnum.OneD4 };
				case Tier.legendary: return { base: 10, bonusDice: DiceEnum.OneD4 };
				case Tier.unique: return { base: 5, bonusDice: DiceEnum.OneD4 };
				case Tier.divine: return { base: 1, bonusDice: DiceEnum.OneD2 };
				default: return { base: 0, bonusDice: DiceEnum.OneD2 };
			}
		}

		const { base, bonusDice } = getBaseAndBonusRange(tier);
		const randomBonus = Dice.roll(bonusDice).sum;
    const intelligenceBonus = Math.round(StatMod.value(character.status.intelligence())/2);
		const percentage = base + randomBonus + intelligenceBonus;

		if (!character.skillLearningProgress[skillID]) {
			character.skillLearningProgress[skillID] = { process: 0 };
		}

		character.skillLearningProgress[skillID].process += percentage;

		if (character.skillLearningProgress[skillID].process >= 100) {
			delete character.skillLearningProgress[skillID];
			learnSkill(character, skillID);
			screamTrainEvent(character, skillID, LEARN_EVENT_LEARN);
		} else {
			screamTrainEvent(character, skillID, LEARN_EVENT_PROGRESS);
		}
	}
}

export async function event_skill_train(character: Character, skillID: string) {
	trainSkill(character, skillID);
	screamTrainEvent(character, skillID, TRAIN_EVENT);
}

function screamTrainEvent(
	character: Character,
	skillID: string,
	trainType: string
) {
	screamer.scream(trainType, {
		character: turnCharacterIntoInterface(character),
		skillID: skillID,
	});
}
