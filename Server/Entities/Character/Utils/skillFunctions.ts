import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { validateSkillLearning } from "../../../Game/Battle/Calculators/isSkillPlayable";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";
import { ActiveSkill, PassiveSkill } from "../../Skills/Skill";
import { skillRepository } from "../../Skills/SkillRepository";
import { noSkillConsume, noSkillProduce } from "../../Skills/Utils";
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
  skillID: string,
): LearnSkillResult {
  let skill = skillRepository.getSkill(skillID);
  if (actor.skills[skillID]) {
    return LearnSkillResult.SkillAlreadyLearned;
  }

  console.log(actor.skills);

  const isActive = skill instanceof ActiveSkill;
  if (isActive) {
    skill instanceof ActiveSkill;
  } else {
    skill instanceof PassiveSkill;
  }

  console.log(`isActive: ${isActive}`);

  if (validateSkillLearning(actor, skill.meta.requirement)) {
    console.log(`Validated skill learning`);
    actor.skills[skillID] = {
      id: skillID,
      name: skill.meta.name,
      level: 1,
      exp: 0,
      description: skill.meta.description,
      tier: skill.meta.tier,
      type: isActive ? "Active" : "Passive",
      equipmentNeeded: isActive ? skill.equipmentNeeded : [],
      consume: isActive ? skill.consume : noSkillConsume,
      produce: isActive ? skill.produce : noSkillProduce,
      isSpell: isActive ? skill.isSpell : false,
    };
  }

  return LearnSkillResult.Success;
}

export function trainSkill(
  actor: Character,
  skillID: string,
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
