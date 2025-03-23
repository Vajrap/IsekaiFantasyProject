import { WeaponSpecificType, WeaponType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { CharacterStatus } from "../../../Entities/Character/Subclasses/CharacterStatus";
import { Skill } from "../../../Entities/Skills/Skill";
import { SkillConsume } from "../../../Entities/Skills/SubClasses/SkillConsume";
import { SkillEquipmentRequirement } from "../../../Entities/Skills/SubClasses/SkillEquipmentRequirement";
import { SkillLearningRequirement } from "../../../Entities/Skills/SubClasses/SkillLearningRequirement";
import { Character } from "../../../Entities/Character/Character";

export function isSkillPlayable(character: Character,skill: Skill, level: number): boolean {
    if (skill.meta.isReaction) return false;
    let weapons:WeaponSpecificType[] = []
    if (character.equipments.mainHand?.weaponSpecificType != undefined && character.equipments.mainHand.weaponSpecificType != null) { weapons.push(character.equipments.mainHand.weaponSpecificType) }
    if (character.equipments.offHand?.weaponSpecificType != undefined && character.equipments.offHand.weaponSpecificType != null) { weapons.push(character.equipments.offHand.weaponSpecificType) }
    if (!validateEquipment(weapons, skill.meta.equipmentNeeded)) { 
        return false 
    };
    if (!validateSkillConsume(character, skill.meta.consume, level)) return false;
    return true;
}

export function validateSkillLearning(character: Character, requirement: SkillLearningRequirement): boolean {
    let isValid = true;

    if (requirement.preRequireCharacterLevel) {
        if (character.level < requirement.preRequireCharacterLevel) {
            isValid = false;
        }
    }

    if (requirement.preRequireSkillID) {
        const knownSkillIDs = [
            ...Object.keys(character.skills),
            ...character.activeSkills.map((s) => s.id),
        ];
        const allSkillsKnown = requirement.preRequireSkillID.every((id) =>
            knownSkillIDs.includes(id)
        );
        if (!allSkillsKnown) {
            isValid = false;
        }
    }

    if (requirement.preRequireElements) {
        for (const elementRequired of requirement.preRequireElements) {
            if (character.status.elements[elementRequired.element as keyof CharacterStatus['elements']].base < elementRequired.value) {
                isValid = false;
            }
        }
    }

    if (requirement.preRequireProficiencies) {
        for (const proficiencyRequired of requirement.preRequireProficiencies) {
            if (character.status.proficiencies[proficiencyRequired.proficiency as keyof CharacterStatus['proficiencies']].base < proficiencyRequired.value) {
                isValid = false;
            }
        }
    }

    if (requirement.preRequireAttributes) {
        for (const attributeRequired of requirement.preRequireAttributes) {
            if (character.status.attributes[attributeRequired.attribute as keyof CharacterStatus['attributes']].base < attributeRequired.value) {
                isValid = false;
            }
        }
    }

    if (requirement.preRequireArtisans) {
        for (const artisanRequired of requirement.preRequireArtisans) {
            if (character.status.artisans[artisanRequired.artisan as keyof CharacterStatus['artisans']].base < artisanRequired.value) {
                isValid = false;
            }
        }
    }

    if (requirement.preRequireCharacterTrait) {
        if (!character.traits.some(trait => requirement.preRequireCharacterTrait?.includes(trait.id))) {
            isValid = false;
        }
    }

    return isValid;
}

export function validateEquipment(equipments: WeaponSpecificType[], equipmentNeeded: SkillEquipmentRequirement): boolean {
    if (equipmentNeeded.weapon?.length === 0 && equipmentNeeded.weapon !== undefined) { 
        return true; 
    }

    // Case where the skill requires bare hands; user must 'NOT' equip any weapon
    if (equipmentNeeded.weapon?.length === 1) {
        if (equipmentNeeded.weapon[0] === WeaponType.bare_hand) {
            if (equipments.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    if (equipmentNeeded.weapon) {
        let weaponNeeded = equipmentNeeded.weapon
        if (equipments.length === 0) { return false };
        if (equipments.some((weapon) => weaponNeeded.includes(weapon))) {
            return true;
        } else {
            return false;
        }
    }
    return true
}

export function validateSkillConsume(character: Character, consume: SkillConsume, skillLevel: number): boolean {
    if (consume.hp[skillLevel] > character.currentHP) {
        return false
    }
    if (consume.mp[skillLevel] > character.currentMP) {
        return false
    }
    if (consume.sp[skillLevel] > character.currentSP) {
        return false
    }

    for (const element of consume.elements) {
        if (character.element(element.element) < element.amount[skillLevel]) {
            return false;
        }
    }

    return true;
}