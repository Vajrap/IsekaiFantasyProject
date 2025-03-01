import { Character } from "../Character/Character";
import { LocationActionEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { PartyInterface } from "../../../Common/RequestResponse/characterWS";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";

export class Party {
	partyID: string;
	characters: (Character | "none")[] = [
		"none",
		"none",
		"none",
		"none",
		"none",
		"none",
	];
	// actionSequence = 7 days object, each day with 4 slots
	actionSequence: {
		day1: { slot_1: LocationActionEnum, slot_2: LocationActionEnum, slot_3: LocationActionEnum, slot_4: LocationActionEnum },
		day2: { slot_1: LocationActionEnum, slot_2: LocationActionEnum, slot_3: LocationActionEnum, slot_4: LocationActionEnum },
		day3: { slot_1: LocationActionEnum, slot_2: LocationActionEnum, slot_3: LocationActionEnum, slot_4: LocationActionEnum },
		day4: { slot_1: LocationActionEnum, slot_2: LocationActionEnum, slot_3: LocationActionEnum, slot_4: LocationActionEnum },
		day5: { slot_1: LocationActionEnum, slot_2: LocationActionEnum, slot_3: LocationActionEnum, slot_4: LocationActionEnum },
		day6: { slot_1: LocationActionEnum, slot_2: LocationActionEnum, slot_3: LocationActionEnum, slot_4: LocationActionEnum },
		day7: { slot_1: LocationActionEnum, slot_2: LocationActionEnum, slot_3: LocationActionEnum, slot_4: LocationActionEnum },
	} = {
		day1: { slot_1: LocationActionEnum.Rest, slot_2: LocationActionEnum.Rest, slot_3: LocationActionEnum.Rest, slot_4: LocationActionEnum.Rest },
		day2: { slot_1: LocationActionEnum.Rest, slot_2: LocationActionEnum.Rest, slot_3: LocationActionEnum.Rest, slot_4: LocationActionEnum.Rest },
		day3: { slot_1: LocationActionEnum.Rest, slot_2: LocationActionEnum.Rest, slot_3: LocationActionEnum.Rest, slot_4: LocationActionEnum.Rest },
		day4: { slot_1: LocationActionEnum.Rest, slot_2: LocationActionEnum.Rest, slot_3: LocationActionEnum.Rest, slot_4: LocationActionEnum.Rest },
		day5: { slot_1: LocationActionEnum.Rest, slot_2: LocationActionEnum.Rest, slot_3: LocationActionEnum.Rest, slot_4: LocationActionEnum.Rest },
		day6: { slot_1: LocationActionEnum.Rest, slot_2: LocationActionEnum.Rest, slot_3: LocationActionEnum.Rest, slot_4: LocationActionEnum.Rest },
		day7: { slot_1: LocationActionEnum.Rest, slot_2: LocationActionEnum.Rest, slot_3: LocationActionEnum.Rest, slot_4: LocationActionEnum.Rest },
	};
	isTraveling: boolean = false;
	location: LocationName = LocationName.None;
	currentLocation: LocationName;

	constructor(
		characters: Character[],
		location?: LocationName,
		firstEnemyPosition?: number
	) {
		this.characters[0] = characters[0] as Character;
		this.partyID = characters[0].id;
		if (this.partyID === "temp") {
			this.addCharactersToTemporarilyBattleSceneParty(characters);
		} else {
			//Normal creation of party when player character is created; the party id is the same as the player character id: Player character will 'ALWAYS' be in this party!
			this.characters[0] = characters[0] as Character;
			this.characters[0].partyID = this.partyID;
			this.characters[0].position = firstEnemyPosition ? firstEnemyPosition : 1;
		}
		this.currentLocation = location ?? LocationName.None;
	}

	leader(): Character {
		// leader is the character with the same id
		return this.characters.find(
			character => character != "none" && character.id === this.partyID
		) as Character;
	}

	getPlayerCharacter(): Character {
		return this.characters.find(
			character => character != "none" && character.isPlayerCharacter
		) as Character;
	}

	//this only used for temporarily battle scene party for targeting
	addCharactersToTemporarilyBattleSceneParty(characters: Character[]) {
		for (const character of characters) {
			this.characters.push(character);
		}
	}

	async addCharacterToParty(character: Character, position?: number) {
		if (this.isPartyFull()) {
			return "Party is full";
		}
		if (position !== undefined) {
			if (position < 0 || position > 5) {
				throw new Error("Character Position in Party must be between 0 - 5");
			}
			for (let i = 0; i < 6; i++) {
				const currentIndex = (position + i) % 6; // Wrap around using modulo
				if (this.characters[currentIndex] === "none") {
					this.characters[currentIndex] = character;
					character.position = currentIndex;
					character.partyID = this.partyID;
					return;
				}
			}
		} else {
			for (let i = 0; i < 6; i++) {
				if (this.characters[i] === "none") {
					this.characters[i] = character;
					character.position = i;
					character.partyID = this.partyID;
					break;
				}
			}
		}
	}

	isPartyFull(): Boolean {
		for (let i = 0; i < 5; i++) {
			if (this.characters[i] === "none") {
				return false;
			}
		}
		return true;
	}

	isAllDead(): Boolean {
		for (const character of this.characters) {
			if (character != "none" && !character.isDead) {
				return false;
			}
		}
		return true;
	}

	removeCharacterFromParty(character: Character) {
		//IF THE PLAYER CHARACTER IS LEAVING ITS OWN PARTY, THAT IS ABSURD! SO WE WILL NOT ALLOW IT!
		if (character.id === this.partyID) {
			return "Player character cannot leave its own party";
		}
		const index = this.characters.indexOf(character);
		if (index !== -1) {
			this.characters[index] = "none";
			character.partyID = "none";
			character.position = 0;
		}
	}

	getPartyMember(id: string): Character | undefined {
		for (const character of this.characters) {
			if (character !== "none" && character.id === id) {
				return character;
			} else {
				return undefined;
			}
		}
	}

	changeCharacterPosition(character: Character, newPosition: number) {
		if (newPosition < 0 || newPosition > 5) {
			throw new Error("Character Position in Party must be between 0 - 5");
		}

		for (let otherCharacter of this.characters) {
			if (
				otherCharacter !== "none" &&
				otherCharacter.position === newPosition
			) {
				otherCharacter.position = character.position;
			}
		}
		character.position = newPosition;
	}

	getPosssibleTargetsAsCharacterArray(): Character[] {
		return this.characters.filter(
			(character): character is Character => character !== "none"
		);
	}

	intoCharacterArray(): Character[] {
		return this.characters.filter(
			(character): character is Character => character !== "none"
		);
	}

	toDatabase(): {
        partyID: string;
        characters: string[];
        actionSequence: string;
        isTraveling: boolean;
        location: string;
    } {
        return {
            partyID: this.partyID,
			characters: this.characters.map(character =>  character === "none" ? "none" : character.id),            
			actionSequence: JSON.stringify(this.actionSequence),
            isTraveling: this.isTraveling,
            location: this.location,
        };
    }

	intoInterface(): PartyInterface {
		return {
			partyID: this.partyID,
			location: this.location,
			isTraveling: this.isTraveling,
			characters: this.characters.map(character => character === "none" ? "none" : character.intoInterface()),
			// TODO: Implement actionsSequence
			actionSequence: this.actionSequence,
			actionsList: [],
		}
	}

	getAvailableCharacters(): Character[] {
		return this.characters.filter(character => character !== "none");
	}
}
