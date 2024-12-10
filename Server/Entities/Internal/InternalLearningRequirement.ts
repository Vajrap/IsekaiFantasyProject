export class InternalLearningRequirement {
    preRequireElements?: {element: string, value: number}[];
    preRequireCharacterLevel?: number;
    constructor(
        preRequireElements?: {element: string, value: number}[], 
        preRequireCharacterLevel?: number
    ) {
        this.preRequireElements = preRequireElements;
        this.preRequireCharacterLevel = preRequireCharacterLevel;
    }
}