import { db } from "../../Database";
import { Skill } from "./Skill";
import * as AutoAttackSkills from './ClassesSkills/AutoAttackSkills';

export class SkillRepository {
    skills: { [key: string]: Skill };

    constructor() {
        this.skills = {};
    }
    
    async loadSkillsFromDB() {
        try {
            const skills = await db.readAll<Skill[]>('skills');

            for (const skill of skills) {
                this.skills[skill.id] = skill;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getSkill(id: string): Promise<Skill> {
        if (id === 'auto_physical') {
            return AutoAttackSkills.skill_auto_physical;
        }
        
        if (id === 'auto_magical') {
            return AutoAttackSkills.skill_auto_magical;
        }

        let skill = this.skills[id];

        if (skill === null || skill === undefined) {
            const dbSkill = await db.read<Skill>('skills', 'id', id);
            if (dbSkill !== null) {
                skill = dbSkill;
            }
        }
        
        if (skill === null || skill === undefined) {
            throw new Error(`Skill ${id} not found`);
        }
        
        return skill;
    }
}

export const skillRepository = new SkillRepository();