export class SkillLearningRequirement {
    constructor({ preRequireSkillID, preRequireElements, preRequireProficiencies, preRequireAttributes, preRequireArtisans, preRequireCharacterLevel, preRequireCharacterTrait, }) {
        this.preRequireSkillID = preRequireSkillID ? preRequireSkillID : [];
        this.preRequireElements = preRequireElements ? preRequireElements : [];
        this.preRequireProficiencies = preRequireProficiencies
            ? preRequireProficiencies
            : [];
        this.preRequireAttributes = preRequireAttributes
            ? preRequireAttributes
            : [];
        this.preRequireArtisans = preRequireArtisans ? preRequireArtisans : [];
        this.preRequireCharacterLevel = preRequireCharacterLevel
            ? preRequireCharacterLevel
            : 0;
        this.preRequireCharacterTrait = preRequireCharacterTrait
            ? preRequireCharacterTrait
            : [];
    }
}
