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

        let skill = new Skill (
            this.skills[id].id,
            this.skills[id].name,
            this.skills[id].baseDescription,
            this.skills[id].requirement,
            this.skills[id].equipmentNeeded,
            this.skills[id].activeEffect,
            this.skills[id].consume,
            this.skills[id].produce,
            this.skills[id].tier,
            this.skills[id].isSpell,
            this.skills[id].isAuto,
            this.skills[id].isWeaponAttack,
            this.skills[id].isReaction
        )

        if (skill === null || skill === undefined) {
            const dbSkill = await db.getSkill(id);

            console.log(dbSkill);

            if (dbSkill !== null) {
                skill = new Skill(
                    dbSkill.id,
                    dbSkill.name,
                    dbSkill.baseDescription,
                    dbSkill.requirement,
                    dbSkill.equipmentNeeded,
                    dbSkill.activeEffect,
                    dbSkill.consume,
                    dbSkill.produce,
                    dbSkill.tier,
                    dbSkill.isSpell,
                    dbSkill.isAuto,
                    dbSkill.isWeaponAttack,
                    dbSkill.isReaction
                );
            }
        }
        
        if (skill === null || skill === undefined) {
            throw new Error(`Skill ${id} not found`);
        }
        
        return skill;
    }
}

export const skillRepository = new SkillRepository();