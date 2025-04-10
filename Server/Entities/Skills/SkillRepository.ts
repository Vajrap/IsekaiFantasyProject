import { autoAttackSkills } from "./ClassesSkills/AutoAttackSkills";
import { clericSkills } from "./ClassesSkills/ClericSkills";
import { Skill } from "./Skill";

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
}

export const skillRepository = new SkillRepository([
  ...autoAttackSkills,
  ...clericSkills,
]);
