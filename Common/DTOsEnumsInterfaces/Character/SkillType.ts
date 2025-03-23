import { SkillConsume, SkillProduce } from "Server/Entities/Skills/SubClasses/SkillConsume";
import { Tier } from "../Tier";

export type SkillMeta = {
	id: string;
	name: string;
	level: number;
	exp: number;
	description: string;
	tier: Tier;
	equipmentNeeded: string[];
	consume: SkillConsume;
	produce: SkillProduce;
	isSpell: boolean;
	isReaction: boolean;
	isWeaponAttack: boolean;
};

export type CharacterSkills = Record<string, SkillMeta>;
