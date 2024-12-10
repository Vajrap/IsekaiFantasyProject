import { Character } from "../../../Entities/Character/Character";
import { CharacterArchetype } from "../../../Entities/Character/Subclasses/CharacterArchetype";

export class NPC extends Character {
	description: string;
	portrait: string;
    constructor(
		id:string,
		name:string, 
		gender:'male' | 'female', 
		archetype?: CharacterArchetype,
		description?: string,
		portrait?: string
	){
        super(id, name, gender, archetype)
		this.description = description || 'A normal looking person'
		this.portrait = portrait || 'No portrait available'
    }
}