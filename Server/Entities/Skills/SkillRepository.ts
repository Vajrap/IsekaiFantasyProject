import { autoAttackSkills } from "./ClassesSkills/AutoAttackSkills";
import { clericSkills } from "./ClassesSkills/ClericSkills";
import { ActiveSkill, Skill } from "./Skill";

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
    const skill =
      type === "physical"
        ? this.skills[`skill_auto_physical`]
        : this.skills[`skill_auto_magical`];
    if (!skill) throw new Error(`can't find auto skill`);
    if (!(skill instanceof ActiveSkill))
      throw new Error(`Skill type mismatched`);
    return skill;
  }

  getActiveSkill(skillID: string): ActiveSkill {
    const skill = this.skills[`skill_auto_physical`];
    if (!skill) throw new Error(`can't find auto skill`);
    if (!(skill instanceof ActiveSkill))
      throw new Error(`Skill type mismatched`);
    return skill;
  }
}

export const skillRepository = new SkillRepository([
  ...autoAttackSkills,
  ...clericSkills,
]);
