import { beastSkills } from "./BeastSkills";
import { snakeSkills } from "./SnakeSkills";
import { spiderSkills } from "./SpiderSkills";
import { Skill } from "../../Skill";

// Combine all monster-specific skills
export const monsterSkills: Skill[] = [
    ...beastSkills,
    ...snakeSkills,
    ...spiderSkills
]; 