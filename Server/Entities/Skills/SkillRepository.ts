import { autoAttackSkills } from "./ClassesSkills/AutoAttackSkills";
import { clericSkills } from "./ClassesSkills/ClericSkills";
import { druidSkills } from "./ClassesSkills/DruidSkills";
import { fighterSkills } from "./ClassesSkills/FighterSkills";
import { mageSkills } from "./ClassesSkills/MageSkills";
import { rogueSkills } from "./ClassesSkills/RogueSkills";
import { warlockSkills } from "./ClassesSkills/WarlockSkills";
import { monsterSkills } from "./ClassesSkills/MonsterSkills";
import { ActiveSkill, Skill, SkillEnum } from "./Skill";

class SkillRepository {
  skills: { [key: string]: Skill };
  constructor(skills: Skill[]) {
    this.skills = {};
    for (const skill of skills) {
      this.skills[skill.meta.id] = skill;
    }
  }

  getSkill(skillID: string): Skill {
    const skill = this.skills[skillID];
    if (!skill) throw new Error(`Skill ${skillID} not found.`);
    return skill;
  }

  getAutoSkill(type: "physical" | "magical"): ActiveSkill {
    const skillID = type === "physical" 
      ? SkillEnum.AUTO_PHYSICAL 
      : SkillEnum.AUTO_MAGICAL;
    
    const skill = this.skills[skillID];
    if (!skill) throw new Error(`can't find auto skill`);
    if (!(skill instanceof ActiveSkill))
      throw new Error(`Skill type mismatched`);
    return skill;
  }

  getActiveSkill(skillID: string): ActiveSkill {
    const skill = this.skills[skillID];
    if (!skill) throw new Error(`can't find skill: ${skillID}`);
    if (!(skill instanceof ActiveSkill))
      throw new Error(`Skill type mismatched: ${skillID} is not an ActiveSkill`);
    return skill;
  }
}

export const skillRepository = new SkillRepository([
  ...autoAttackSkills,
  ...clericSkills,
  ...druidSkills,
  ...fighterSkills,
  ...mageSkills,
  ...rogueSkills,
  ...warlockSkills,
  ...monsterSkills,
]);
