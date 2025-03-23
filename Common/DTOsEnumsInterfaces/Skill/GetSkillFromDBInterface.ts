import { Skill } from "../../../Server/Entities/Skills/Skill";

export interface GetSkillFromDBInterface {
	status: "FOUND" | "SKILL_NOT_FOUND";
	message: Skill | null;
}

export function foundSkill(skill: Skill): GetSkillFromDBInterface {
	return {
		status: "FOUND",
		message: skill,
	};
}

export function skillNotFound(): GetSkillFromDBInterface {
	return {
		status: "SKILL_NOT_FOUND",
		message: null,
	};
}
