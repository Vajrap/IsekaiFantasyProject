import {
  SkillConsume,
  SkillProduce,
} from "Server/Entities/Skills/SubClasses/SkillConsume";
import { Tier } from "../Tier";

export type SkillMeta = {
  id: string;
  name: string;
  level: number;
  exp: number;
  description: string;
  tier: Tier;
  type: `Active` | `Passive`;
  equipmentNeeded: string[];
  consume: SkillConsume;
  produce: SkillProduce;
  isSpell: boolean;
};

export type CharacterSkills = Record<string, SkillMeta>;
