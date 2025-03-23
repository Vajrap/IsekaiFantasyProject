import {
	BackgroundEnum,
	RaceEnum,
} from "../../../../Common/RequestResponse/characterCreation";
import { CharacterInterface } from "../../../../Common/RequestResponse/characterWS";
import { Character } from "../Character";

export function turnCharacterIntoInterface(
	character: Character
): CharacterInterface {
	return {
		id: character.id,
		partyID: character.partyID,
		name: character.name,
		type: character.type,
		gender: character.gender,
		portrait: character.portrait,
		background:
			BackgroundEnum[character.background as keyof typeof BackgroundEnum],
		race: RaceEnum[character.race as keyof typeof RaceEnum],
		alignment: character.alignment.intoInterface(),
		mood: character.mood,
		energy: character.energy,
		fame: character.fame,
		level: character.level,
		gold: character.gold,
		isDead: character.isDead,
		status: character.status.intoInterface(),
		equipment: character.equipments.intoInterface(),
		traits: character.traits.map((trait) => ({
			id: trait.id,
			name: trait.name,
			description: trait.description,
		})),
		skills: character.skills,
		activeSkills: character.activeSkills,
		position: character.position,
		itemsBag: character.itemsBag.intoInterface(),
		arcaneAptitude: character.arcaneAptitude.intoInterface(),
		bagSize: character.bagSize,
		currentHP: character.currentHP,
		currentMP: character.currentMP,
		currentSP: character.currentSP,
		maxHP: character.maxHP(),
		maxMP: character.maxMP(),
		maxSP: character.maxSP(),
	};
}
