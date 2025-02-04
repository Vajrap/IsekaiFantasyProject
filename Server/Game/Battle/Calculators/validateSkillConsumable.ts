import { CharacterResources } from "../../../Entities/Character/Subclasses/CharacterResources";
import { SkillConsume } from "../../../Entities/Skills/SubClasses/SkillConsume";

export function validateSkillConsumable(consume: SkillConsume, level: number, resources: CharacterResources, hp: number, mp: number, sp: number): boolean {
    return consume.validateConsume(level, resources, hp, mp, sp)
}