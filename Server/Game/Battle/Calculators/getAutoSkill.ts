import { Skill } from "../../../Entities/Skills/Skill";
import { skillRepository } from "../../../Entities/Skills/SkillRepository";

export async function getAutoSkill(strength: number, planar: number): Promise<{
	skillThatCanBePlay: Skill;
	skillLevel: number;
	skillPosition: number;
}> {
	const autoSkillId = strength > planar ? "auto_physical" : "auto_magical";
	const skill = await skillRepository.getSkill(autoSkillId);
	return {
		skillThatCanBePlay: skill,
		skillLevel: 1,
		skillPosition: -1,
	};
}