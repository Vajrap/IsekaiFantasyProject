import { CharacterEquipments } from "../../../Entities/Character/Subclasses/CharacterEquipments";
import { CharacterResources } from "../../../Entities/Character/Subclasses/CharacterResources";
import { Skill } from "../../../Entities/Skills/Skill";
import { validateSkillConsumable } from "./validateSkillConsumable";
import { validateSkillEquipment } from "./validateSkillEquipment";

export function isSkillPlayable(resources: CharacterResources, hp: number, mp: number, sp: number, equipments: CharacterEquipments,skill: Skill, level: number): boolean {
    if (skill.isReaction) return false;
    if (!validateSkillEquipment(equipments, skill)) return false;
    if (!validateSkillConsumable(skill.consume, level, resources, hp, mp, sp)) return false;
    return true;
}