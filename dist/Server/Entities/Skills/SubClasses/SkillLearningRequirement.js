export class SkillLearningRequirement {
    constructor({ preRequireSkillID, preRequireElements, preRequireProficiencies, preRequireAttributes, preRequireArtisans, preRequireCharacterLevel, preRequireCharacterTrait, }) {
        this.preRequireSkillID = preRequireSkillID;
        this.preRequireElements = preRequireElements;
        this.preRequireProficiencies = preRequireProficiencies;
        this.preRequireAttributes = preRequireAttributes;
        this.preRequireArtisans = preRequireArtisans;
        this.preRequireCharacterLevel = preRequireCharacterLevel;
        this.preRequireCharacterTrait = preRequireCharacterTrait;
    }
}
