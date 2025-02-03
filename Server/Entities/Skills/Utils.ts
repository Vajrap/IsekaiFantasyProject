import { SkillEquipmentRequirement } from "./SubClasses/SkillEquipmentRequirement"
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement"

export const noRequirementNeeded = new SkillLearningRequirement({
    preRequireSkillID: [],
    preRequireElements: [],
    preRequireProficiencies: [],
    preRequireAttributes: [],
    preRequireArtisans: [],
    preRequireCharacterLevel: 0,
    preRequireCharacterTrait: []
})

export const noEquipmentNeeded = new SkillEquipmentRequirement({
    weapon: [],
})