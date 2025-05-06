export class SkillLearningRequirement {
  preRequireSkillID: string[];
  preRequireElements: { element: string; value: number }[];
  preRequireProficiencies: { proficiency: string; value: number }[];
  preRequireAttributes: { attribute: string; value: number }[];
  preRequireArtisans: { artisan: string; value: number }[];
  preRequireCharacterLevel: number;
  preRequireCharacterTrait: string[];
  constructor({
    preRequireSkillID,
    preRequireElements,
    preRequireProficiencies,
    preRequireAttributes,
    preRequireArtisans,
    preRequireCharacterLevel,
    preRequireCharacterTrait,
  }: {
    preRequireSkillID?: string[];
    preRequireElements?: { element: string; value: number }[];
    preRequireProficiencies?: { proficiency: string; value: number }[];
    preRequireAttributes?: { attribute: string; value: number }[];
    preRequireArtisans?: { artisan: string; value: number }[];
    preRequireCharacterLevel?: number;
    preRequireCharacterTrait?: string[];
  }) {
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
