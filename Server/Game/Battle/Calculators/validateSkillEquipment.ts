import { CharacterEquipments } from "../../../Entities/Character/Subclasses/CharacterEquipments";
import { Skill } from "../../../Entities/Skills/Skill";

export function validateSkillEquipment(equipment: CharacterEquipments, skill: Skill): boolean {
    return skill.validateEquipment({
        weapon: [
            equipment.mainHand?. weaponSpecificType || "none",
            equipment.offHand?. weaponSpecificType || "none"
        ]
    });
}