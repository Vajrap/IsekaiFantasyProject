import { CharacterStatus } from "../../../Entities/Character/Subclasses/CharacterStatus";

export class SkillLearningRequirement {
    preRequireSkillID?: string[];
    preRequireElements?: {element: string, value: number}[];
    preRequireProficiencies?: {proficiency: string, value: number}[];
    preRequireAttributes?: {attribute: string, value: number}[];
    preRequireArtisans?: {artisan: string, value: number}[];
    preRequireCharacterLevel?: number;
    preRequireCharacterTrait?: string[];
    constructor({
        preRequireSkillID, 
        preRequireElements, 
        preRequireProficiencies,
        preRequireAttributes,
        preRequireArtisans,
        preRequireCharacterLevel, 
        preRequireCharacterTrait,
        
    }: {
        preRequireSkillID?: string[], 
        preRequireElements?: {element: string, value: number}[], 
        preRequireProficiencies?: {proficiency: string, value: number}[],
        preRequireAttributes?: {attribute: string, value: number}[],
        preRequireArtisans?: {artisan: string, value: number}[],
        preRequireCharacterLevel?: number,
        preRequireCharacterTrait?: string[]
    }) {
        this.preRequireSkillID = preRequireSkillID;
        this.preRequireElements = preRequireElements;
        this.preRequireProficiencies = preRequireProficiencies;
        this.preRequireAttributes = preRequireAttributes;
        this.preRequireArtisans = preRequireArtisans;
        this.preRequireCharacterLevel = preRequireCharacterLevel;
        this.preRequireCharacterTrait = preRequireCharacterTrait;
    }
}