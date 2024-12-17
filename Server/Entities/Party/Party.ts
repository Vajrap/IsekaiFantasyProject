import { Dice } from "../../Utility/Dice";
import { Character, PlayerCharacter } from "../Character/Character";
import { TargetConditionFilters, TargetSelectionScope, TargetSortingOptions, TargetTauntConsideration, TargetType } from "../../Utility/Enum/TargetTypes";
import { CharacterStatusEnum } from "../../Utility/Enum/CharacterStatusTypes";
import { LocationActionEnum } from "../../Utility/Enum/LocationActions+Events";
import { DiceEnum } from "../../Utility/Enum/DamageDIce";

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
	// actionsList = 7 days object, each day with 4 slots
	actionsList: {
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
	isTemporarilyBattleScenePartyForTargeting: boolean = false;
	isTraveling: boolean = false;
	// Should move to LocationEnum
	location: string = "None";
	// travelManager: TravelManager;
	// currentLocation: GameLocation;

	//we would normally only allow creation of a party with an array of one character, but in battle we need to create a party with multiple characters
	//When Player character was created, it created a party of itself, so it's one character in a party.

	constructor(
		characters: Character[],
		isTemporarilyBattleScenePartyForTargeting: boolean = false
	) {
		this.characters[0] = characters[0] as Character;
		this.isTemporarilyBattleScenePartyForTargeting =
			isTemporarilyBattleScenePartyForTargeting;
		this.partyID = isTemporarilyBattleScenePartyForTargeting
			? "temp"
			: characters[0].id;
		console.log(this.characters[0].id)
		if (this.partyID === "temp") {
			this.addCharactersToTemporarilyBattleSceneParty(characters);
		} else {
			//Normal creation of party when player character is created; the party id is the same as the player character id: Player character will 'ALWAYS' be in this party!
			this.characters[0] = characters[0] as Character;
			this.characters[0].partyID = this.partyID;
		}
		// this.currentLocation = gameMap.locations.find(location => location.name === 'None') as GameLocation;
		// this.travelManager = new TravelManager(this.partyID, this.currentLocation)
	}

	getPlayerCharacter(): PlayerCharacter {
		return this.characters.find(
			(character): character is PlayerCharacter => character !== "none"
		) as PlayerCharacter;
	}

	//this only used for temporarily battle scene party for targeting
	addCharactersToTemporarilyBattleSceneParty(characters: Character[]) {
		for (const character of characters) {
			this.characters.push(character);
		}
	}

	async addCharacterToParty(character: Character) {
		console.log(`Adding ${character.name} to party`);
		if (this.isPartyFull()) {
			return "Party is full";
		}
		for (let i = 0; i < 5; i++) {
			console.log(`Checking slot ${i}`);
			if (this.characters[i] === "none") {
				console.log(`Replacing slot ${i} with ${character.name}`);
				this.characters[i] = character;
				character.position = i;
				character.partyID = this.partyID;
				break;
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

	//Travel Methods
	// initiateTravel(travelMethod: TravelMethod) {
	//     const playerCharacter = this.getPlayerCharacter();
	//     this.travelManager.currentTravelMethod = travelMethod;
	//     this.travelManager.travel(playerCharacter.status, travelMethod);
	// }

	// //Actions Methods
	// setActions(time:number, action: LocationAction) {
	//     this.actionsList[time] = action;
	// }

	// performAction(slot: number) {
	//     for (const character of this.characters) {
	//         const action = this.actionsList[slot];
	//         if (action) {
	//             action.action(character);
	//         }
	//     }
	// }

	getAllTauntingCharacters(): Character[] {
		let characters = [];
		for (const character of this.characters) {
			if (character !== "none" && character.buffsAndDebuffs.taunt >= 1) {
				characters.push(character);
			}
		}
		return characters;
	}

	// getTargetsFromTargetType(targetType: TargetType, actor: Character, exception: Character[]): Character[] {
	//     console.log(`getTargetsFromTargetType called for ${actor.name}`);
	//     let tauntingTargets = this.getAllTauntingCharacters();
	//     if (tauntingTargets.length === 1) { return tauntingTargets; }
	//     if (tauntingTargets.length > 1 ) {
	//         let frontTaunting = tauntingTargets.filter((character) => character.position < 3);
	//         let backTaunting = tauntingTargets.filter((character) => character.position > 2);
	//         let sortedTaunting = frontTaunting.concat(backTaunting);
	//         let diceRoll = Dice.roll(DiceEnum.OneD20).sum;
	//         let count = 0;
	//         for (const character of sortedTaunting) {
	//             if (character.position < 3) {
	//                 count += 2;
	//             } else {
	//                 count += 1;
	//             }
	//             if (diceRoll <= count) {
	//                 return [character];
	//             }
	//         }
	//     }

	//     if (targetType.targetScope === TargetSelectionScope.All) {
	//         if (targetType.targetConditionFilter === TargetConditionFilters.IsDead) {
	//             return this.getDeadTargets().intoCharacterArray();
	//         }
	//         return this.getPossibleTargetsAsCharacterArray();
	//     }

	//     if (targetType.targetScope === TargetSelectionScope.FrontRow) {
	//         return this.getAllFrontRowTargets();
	//     }

	//     if (targetType.targetScope === TargetSelectionScope.BackRow) {
	//         return this.getAllBackRowTargets();
	//     }

	//     if (targetType.targetScope === TargetSelectionScope.FrontRowShiftable) {
	//         let row = this.getAllFrontRowTargets();
	//         if (row.length === 0) {
	//             row = this.getAllBackRowTargets();
	//         }
	//         return row;
	//     }

	//     if (targetType.targetScope === TargetSelectionScope.BackRowShiftable) {
	//         let row = this.getAllBackRowTargets();
	//         if (row.length === 0) {
	//             row = this.getAllFrontRowTargets();
	//         }
	//         return row;
	//     }

	//     if (targetType.targetScope === TargetSelectionScope.Single) {
	//         if (targetType.targetConditionFilter === TargetConditionFilters.IsDead) {
	//             let deadTarget = this.getOneDeadTarget(actor);
	//             return deadTarget ? [deadTarget] : [];
	//         }
	//     }

	//     //Other Cases
	//     let possibleTargets = this.getPossibleTargetsExceptExceptions(exception).intoCharacterArray();
	//     switch (targetType.targetConditionFilter) {
	//         case TargetConditionFilters.HasTrait:
	//             //TODO: Trait filtering
	//             // possibleTargets.filter((character) => character.traits.includes());
	//             break;
	//         case TargetConditionFilters.HasBuffOrDebuff:
	//             possibleTargets.filter((character) => {
	//                 if (targetType.targetBuffOrDebuffCondition !== 'none') {
	//                     return character.buffsAndDebuffs[targetType.targetBuffOrDebuffCondition.buffOrDebuff] ?? 0 > 0;
	//                 }
	//                 return false;
	//             });
	//             break;
	//         case TargetConditionFilters.IsDead:
	//             possibleTargets = this.getDeadTargets().intoCharacterArray();
	//             break;
	//         case TargetConditionFilters.None:
	//             possibleTargets = this.getPossibleTargets().intoCharacterArray();
	//             break;
	//     }

	//     if (!possibleTargets) { return []; }

	//     //The Edge sorting only return the first target.
	//     switch (targetType.targetSortingOption) {
	//         case TargetSortingOptions.HighestHP:
	//             possibleTargets.sort((a, b) => b.currentHP - a.currentHP);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.LowestHP:
	//             possibleTargets.sort((a, b) => a.currentHP - b.currentHP);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.HighestMP:
	//             possibleTargets.sort((a, b) => b.currentMP - a.currentMP);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.LowestMP:
	//             possibleTargets.sort((a, b) => a.currentMP - b.currentMP);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.HighestSP:
	//             possibleTargets.sort((a, b) => b.currentSP - a.currentSP);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.LowestSP:
	//             possibleTargets.sort((a, b) => a.currentSP - b.currentSP);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.Fastest:
	//             possibleTargets.sort((a, b) => b.attribute("agility") - a.attribute("agility"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.Slowest:
	//             possibleTargets.sort((a, b) => a.attribute("agility") - b.attribute("agility"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.HighestPhysicalAttack:
	//             possibleTargets.sort((a, b) => b.battler("pATK") - a.battler("pATK"));
	//             return [possibleTargets[0]]
	//         case TargetSortingOptions.LowestPhysicalAttack:
	//             possibleTargets.sort((a, b) => a.battler("pATK") - b.battler("pATK"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.HighestMagicalAttack:
	//             possibleTargets.sort((a, b) => b.battler("mATK") - a.battler("mATK"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.LowestMagicalAttack:
	//             possibleTargets.sort((a, b) => a.battler("mATK") - b.battler("mATK"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.HighestPhysicalDefense:
	//             possibleTargets.sort((a, b) => b.battler("pDEF") - a.battler("pDEF"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.LowestPhysicalDefense:
	//             possibleTargets.sort((a, b) => a.battler("pDEF") - b.battler("pDEF"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.HighestMagicalDefense:
	//             possibleTargets.sort((a, b) => b.battler("mDEF") - a.battler("mDEF"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.LowestMagicalDefense:
	//             possibleTargets.sort((a, b) => a.battler("mDEF") - b.battler("mDEF"));
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.HighestLevel:
	//             possibleTargets.sort((a, b) => b.level - a.level);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.LowestLevel:
	//             possibleTargets.sort((a, b) => a.level - b.level);
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.PreferredFrontRow:
	//             possibleTargets = this.getPreferredRowTargets('front').intoCharacterArray();
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.PreferredBackRow:
	//             possibleTargets = this.getPreferredRowTargets('back').intoCharacterArray();
	//             return [possibleTargets[0]];
	//         case TargetSortingOptions.None:
	//             let diceRoll = Dice.roll(DiceEnum.OneD20).sum;
	//             let count = 0;
	//             for (const character of possibleTargets) {
	//                 if (character.position < 3) {
	//                     count += 3;
	//                 } else {
	//                     count += 1;
	//                 }
	//                 if (diceRoll <= count) {
	//                     return [character];
	//                 }
	//             }
	//     }

	//     return [this.getOneRandomTargetTauntNotCount(actor)];
	// }

	getTargetsFromTargetType(
		targetType: TargetType,
		actor: Character,
		exception: Character[]
	): Character[] {

		// Check for taunt first
		let tauntingTargets = this.getAllTauntingCharacters();

		if (tauntingTargets.length === 1) {
			return tauntingTargets;
		}
		if (tauntingTargets.length > 1) {
			let frontTaunting = tauntingTargets.filter(
				(character) => character.position < 3
			);
			let backTaunting = tauntingTargets.filter(
				(character) => character.position > 2
			);
			let sortedTaunting = frontTaunting.concat(backTaunting);
			let diceRoll = Dice.roll(DiceEnum.OneD20).sum;
			let count = 0;
			for (const character of sortedTaunting) {
				if (character.position < 3) {
					count += 2;
				} else {
					count += 1;
				}
				if (diceRoll <= count) {
					return [character];
				}
			}
		}

		// Handling different target scopes and conditions
		if (targetType.targetScope === TargetSelectionScope.All) {
			if (targetType.targetConditionFilter === TargetConditionFilters.IsDead) {
				return this.getDeadTargets().intoCharacterArray();
			}
			return this.getPossibleTargetsAsCharacterArray();
		}

		if (targetType.targetScope === TargetSelectionScope.AllFrontRow) {
			return this.getAllFrontRowTargets();
		}

		if (targetType.targetScope === TargetSelectionScope.AllBackRow) {
			return this.getAllBackRowTargets();
		}

		if (targetType.targetScope === TargetSelectionScope.AllFrontRowShiftable) {
			let row = this.getAllFrontRowTargets();
			if (row.length === 0) {
				row = this.getAllBackRowTargets();
			}
			return row;
		}

		if (targetType.targetScope === TargetSelectionScope.AllBackRowShiftable) {
			let row = this.getAllBackRowTargets();
			if (row.length === 0) {
				row = this.getAllFrontRowTargets();
			}
			return row;
		}

		if (targetType.targetScope === TargetSelectionScope.Single) {
			if (targetType.targetConditionFilter === TargetConditionFilters.IsDead) {
				let deadTarget = this.getOneDeadTarget(actor);
				return deadTarget ? [deadTarget] : [];
			}

			if (targetType.targetConditionFilter === TargetConditionFilters.IsSummoned) {
				let summonedTarget = this.getOneSummonedTarget(actor);
				return summonedTarget ? [summonedTarget] : [];
			}
		}


		// Get possible targets and filter exceptions
		let possibleTargets =
			this.getPossibleTargetsExceptExceptions(exception).intoCharacterArray();

		if (possibleTargets.length === 0) {
			return [];
		}

		// The Edge sorting only returns the first target.
		switch (targetType.targetSortingOption) {
			case TargetSortingOptions.HighestHP:
				possibleTargets.sort((a, b) => b.currentHP - a.currentHP);
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestHP:
				possibleTargets.sort((a, b) => a.currentHP - b.currentHP);
				return [possibleTargets[0]];
			case TargetSortingOptions.HighestMP:
				possibleTargets.sort((a, b) => b.currentMP - a.currentMP);
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestMP:
				possibleTargets.sort((a, b) => a.currentMP - b.currentMP);
				return [possibleTargets[0]];
			case TargetSortingOptions.HighestSP:
				possibleTargets.sort((a, b) => b.currentSP - a.currentSP);
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestSP:
				possibleTargets.sort((a, b) => a.currentSP - b.currentSP);
				return [possibleTargets[0]];
			case TargetSortingOptions.Fastest:
				possibleTargets.sort(
					(a, b) => b.attribute("agility") - a.attribute("agility")
				);
				return [possibleTargets[0]];
			case TargetSortingOptions.Slowest:
				possibleTargets.sort(
					(a, b) => a.attribute("agility") - b.attribute("agility")
				);
				return [possibleTargets[0]];
			case TargetSortingOptions.HighestPhysicalAttack:
				possibleTargets.sort((a, b) => b.battler("pATK") - a.battler("pATK"));
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestPhysicalAttack:
				possibleTargets.sort((a, b) => a.battler("pATK") - b.battler("pATK"));
				return [possibleTargets[0]];
			case TargetSortingOptions.HighestMagicalAttack:
				possibleTargets.sort((a, b) => b.battler("mATK") - a.battler("mATK"));
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestMagicalAttack:
				possibleTargets.sort((a, b) => a.battler("mATK") - b.battler("mATK"));
				return [possibleTargets[0]];
			case TargetSortingOptions.HighestPhysicalDefense:
				possibleTargets.sort((a, b) => b.battler("pDEF") - a.battler("pDEF"));
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestPhysicalDefense:
				possibleTargets.sort((a, b) => a.battler("pDEF") - b.battler("pDEF"));
				return [possibleTargets[0]];
			case TargetSortingOptions.HighestMagicalDefense:
				possibleTargets.sort((a, b) => b.battler("mDEF") - a.battler("mDEF"));
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestMagicalDefense:
				possibleTargets.sort((a, b) => a.battler("mDEF") - b.battler("mDEF"));
				return [possibleTargets[0]];
			case TargetSortingOptions.HighestLevel:
				possibleTargets.sort((a, b) => b.level - a.level);
				return [possibleTargets[0]];
			case TargetSortingOptions.LowestLevel:
				possibleTargets.sort((a, b) => a.level - b.level);
				return [possibleTargets[0]];
			case TargetSortingOptions.PreferredFrontRow:
				possibleTargets =
					this.getPreferredRowTargets("front").intoCharacterArray();
				return [possibleTargets[0]];
			case TargetSortingOptions.PreferredBackRow:
				possibleTargets =
					this.getPreferredRowTargets("back").intoCharacterArray();
				return [possibleTargets[0]];
			case TargetSortingOptions.None:
				let diceRoll = Dice.roll(DiceEnum.OneD20).sum;
				let count = 0;
				for (const character of possibleTargets) {
					if (character.position < 3) {
						count += 3;
					} else {
						count += 1;
					}
					if (diceRoll <= count) {
						return [character];
					}
				}
		}

		return [this.getOneRandomTargetTauntNotCount(actor)];
	}

	//one random target taunting count
	getOneRandomTargetTauntCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.getTargetRandomlyFor(actor);
	}
	//one random target taunting not count
	getOneRandomTargetTauntNotCount(actor: Character): Character {
		return this.getPossibleTargets().getTargetRandomlyFor(actor);
	}
	//one random target except exceptions taunting count
	getOneRandomTargetExceptExceptionsTauntCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.getTargetRandomlyFor(actor);
	}
	//one random target except exceptions taunting not count
	getOneRandomTargetExceptExceptionsTauntNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.getTargetRandomlyFor(actor);
	}
	//one target with least current hp taunting count
	getRandomTargetWithLeastCurrentHPTauntCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("least", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with least current hp taunting not count
	getRandomTargetWithLeastCurrentHPNotTauntCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("least", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with least current hp except exceptions taunting count
	getRandomTargetWithLeastCurrentHPExceptExceptionsTauntCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("least", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with least current hp except exceptions taunting not count
	getRandomTargetWithLeastCurrentHPExceptExceptionsTauntNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("least", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most current hp taunting count
	getRandomTargetWithMostCurrentHPTauntCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("most", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most current hp taunting not count
	getRandomTargetWithMostCurrentHPNotTauntCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("most", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most current hp except exceptions taunting count
	getRandomTargetWithMostCurrentHPExceptExceptionsTauntCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("most", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most current hp except exceptions taunting not count
	getRandomTargetWithMostCurrentHPExceptExceptionsTauntNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("most", "currentHP")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target preferred front row taunting count
	getOnePreferredFrontRowTauntCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.getPreferredRowTargets("front")
			.getTargetRandomlyFor(actor);
	}
	//one target preferred front row taunting not count
	getOnePreferredFrontRowTauntNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.getPreferredRowTargets("front")
			.getTargetRandomlyFor(actor);
	}
	//one target preferred front row except exceptions taunting count
	getOnePreferredFrontRowExceptExceptionsTauntCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.getPreferredRowTargets("front")
			.getTargetRandomlyFor(actor);
	}
	//one target preferred front row except exceptions taunting not count
	getOnePreferredFrontRowExceptExceptionsTauntNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.getPreferredRowTargets("front")
			.getTargetRandomlyFor(actor);
	}
	//one target preferred back row taunting count
	getOnePreferredBackRowTauntCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.getPreferredRowTargets("back")
			.getTargetRandomlyFor(actor);
	}
	//one target preferred back row taunting not count
	getOnePreferredBackRowTauntNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.getPreferredRowTargets("back")
			.getTargetRandomlyFor(actor);
	}
	//one target preferred back row except exceptions taunting count
	getOnePreferredBackRowExceptExceptionsTauntCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.getPreferredRowTargets("back")
			.getTargetRandomlyFor(actor);
	}
	//one target preferred back row except exceptions taunting not count
	getOnePreferredBackRowExceptExceptionsTauntNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.getPreferredRowTargets("back")
			.getTargetRandomlyFor(actor);
	}
	//one target that is slowest taunting count
	getOneSlowestTauntingCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("least", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is slowest taunting not count
	getOneSlowestTauntingNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("least", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is slowest except exceptions taunting count
	getOneSlowestExceptExceptionsTauntingCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("least", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is slowest except exceptions taunting not count
	getOneSlowestExceptExceptionsTauntingNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("least", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is fastest taunting count
	getOneFastestTauntingCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("most", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is fastest taunting not count
	getOneFastestTauntingNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("most", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is fastest except exceptions taunting count
	getOneFastestExceptExceptionsTauntingCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("most", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is fastest except exceptions taunting not count
	getOneFastestExceptExceptionsTauntingNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("most", "attribute", "agility")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical attack taunting count
	getOneMostPhysicalAttackTauntingCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("most", "battler", "pATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical attack taunting not count
	getOneMostPhysicalAttackTauntingNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("most", "battler", "pATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical attack except exceptions taunting count
	getOneMostPhysicalAttackExceptExceptionsTauntingCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("most", "battler", "pATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical attack except exceptions taunting not count
	getOneMostPhysicalAttackExceptExceptionsTauntingNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("most", "battler", "pATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical attack taunting count
	getOneMostMagicalAttackTauntingCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("most", "battler", "mATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical attack taunting not count
	getOneMostMagicalAttackTauntingNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("most", "battler", "mATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical attack except exceptions taunting count
	getOneMostMagicalAttackExceptExceptionsTauntingCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("most", "battler", "mATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical attack except exceptions taunting not count
	getOneMostMagicalAttackExceptExceptionsTauntingNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("most", "battler", "mATK")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical defense taunting count
	getOneMostPhysicalDefenseTauntingCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("most", "battler", "pDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical defense taunting not count
	getOneMostPhysicalDefenseTauntingNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("most", "battler", "pDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical defense except exceptions taunting count
	getOneMostPhysicalDefenseExceptExceptionsTauntingCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("most", "battler", "pDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most physical defense except exceptions taunting not count
	getOneMostPhysicalDefenseExceptExceptionsTauntingNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("most", "battler", "pDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical defense taunting count
	getOneMostMagicalDefenseTauntingCount(actor: Character): Character {
		return this.getPossibleTargets()
			.filterForTauntTargets()
			.sortedBy("most", "battler", "mDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical defense taunting not count
	getOneMostMagicalDefenseTauntingNotCount(actor: Character): Character {
		return this.getPossibleTargets()
			.sortedBy("most", "battler", "mDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical defense except exceptions taunting count
	getOneMostMagicalDefenseExceptExceptionsTauntingCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.filterForTauntTargets()
			.sortedBy("most", "battler", "mDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target with most magical defense except exceptions taunting not count
	getOneMostMagicalDefenseExceptExceptionsTauntingNotCount(
		actor: Character,
		exceptions: Character[]
	): Character {
		return this.getPossibleTargets()
			.filterOutExceptions(exceptions)
			.sortedBy("most", "battler", "mDEF")
			.getTargetFromSortedTargetsFor(actor);
	}
	//one target that is dead
	getOneDeadTarget(actor: Character): Character | null {
		const deadTargets = this.getDeadTargets().characters;
		if (deadTargets.length === 0) {
			return null;
		}
		return this.getDeadTargets().getTargetRandomlyFor(actor);
	}

	getOneSummonedTarget(actor: Character): Character | null {
		const summonedTargets = this.characters.filter(
			(character): character is Character =>
				character !== "none" && character.isSummoned
		);
		if (summonedTargets.length === 0) {
			return null;
		}
		return new Party(summonedTargets, true).getTargetRandomlyFor(actor);
	}

	getAllFrontRowTargets(): Character[] {
		return this.getFrontRowAsCharacterArray().filter(
			(character): character is Character => !character.isDead
		);
	}

	getAllBackRowTargets(): Character[] {
		return this.getBackRowAsCharacterArray().filter(
			(character): character is Character => !character.isDead
		);
	}

	getAllPossibleTargetsAsParty(): Party {
		return this.getPossibleTargets();
	}

	getAllPossibleTargets(): Character[] {
		return this.getPossibleTargetsAsCharacterArray();
	}

	getPossibleTargetsAsCharacterArray(): Character[] {
		const targets = this.characters.filter(
			(character): character is Character => {
				const isNotNone = character !== "none";
				const isNotDead = character !== "none" && !character.isDead;
				const isNotNull = character !== null;
				return isNotNone && isNotDead && isNotNull;
			}
		);

		return targets;
	}

	getPossibleTargets(): Party {
		const possibleTargets = this.getPossibleTargetsAsCharacterArray();
		return new Party(possibleTargets, true);
	}

	getPossibleTargetsExceptExceptions(exceptions: Character[]): Party {
		const possibleTargets = this.getPossibleTargetsAsCharacterArray().filter(
			(character) => !exceptions.includes(character)
		);
		return new Party(possibleTargets, true);
	}

	getDeadTargets(): Party {
		const deadTargets = this.characters.filter(
			(character): character is Character =>
				character !== "none" && character.isDead
		);
		return new Party(deadTargets, true);
	}

	getFrontRowAsCharacterArray(): Character[] {
		let frontRow: Character[] = [];
		for (const character of this.characters) {
			if (character != "none" && character.position < 3) {
				frontRow.push(character);
			}
		}
		return frontRow;
	}

	getFrontRow(): Party {
		return new Party(this.getFrontRowAsCharacterArray(), true);
	}

	getBackRowAsCharacterArray(): Character[] {
		let backRow: Character[] = [];
		for (const character of this.characters) {
			if (character != "none" && character.position > 2) {
				backRow.push(character);
			}
		}
		return backRow;
	}

	getBackRow(): Party {
		return new Party(this.getBackRowAsCharacterArray(), true);
	}

	getPreferredRowTargets(rowType: "front" | "back"): Party {
		const possibleTargets = this.getPossibleTargets();
		const possibleFrontRowTargets =
			possibleTargets.getFrontRowAsCharacterArray();
		const isFrontRowContainTaunt = possibleFrontRowTargets.some(
			(character) => character.buffsAndDebuffs?.taunt ?? 0 > 0
		);
		const possibleBackRowTargets = possibleTargets.getBackRowAsCharacterArray();
		const isBackRowContainTaunt = possibleBackRowTargets.some(
			(character) => character.buffsAndDebuffs?.taunt ?? 0 > 0
		);

		if (isFrontRowContainTaunt) {
			return new Party(possibleFrontRowTargets, true);
		} else if (isBackRowContainTaunt) {
			return new Party(possibleBackRowTargets, true);
		}

		const roll = Dice.roll(DiceEnum.OneD20).sum;

		const preferredRowTargets =
			rowType === "front" ? possibleFrontRowTargets : possibleBackRowTargets;
		const alternativeRowTargets =
			rowType === "front" ? possibleBackRowTargets : possibleFrontRowTargets;

		if (roll > 15) {
			return alternativeRowTargets.length > 0
				? new Party(alternativeRowTargets, true)
				: new Party(preferredRowTargets, true);
		} else {
			return preferredRowTargets.length > 0
				? new Party(preferredRowTargets, true)
				: new Party(alternativeRowTargets, true);
		}

		throw new Error(
			`unexpected error in getPreferredRowTargets method. rowType: ${rowType}, roll: ${roll}`
		);
	}

	filterOutExceptions(exceptions: Character[]): Party {
		const filteredCharacters = this.characters.filter(
			(character): character is Character =>
				character !== "none" && !exceptions.includes(character)
		);
		return new Party(filteredCharacters, true);
	}

	filterOutExceptionsAndReturnAsCharacterArray(
		exceptions: Character[]
	): Character[] {
		const filteredCharacters = this.characters.filter(
			(character): character is Character =>
				character !== "none" && !exceptions.includes(character)
		);
		return filteredCharacters;
	}

	filterForTauntTargets(): Party {
		return new Party(
			this.filterForTauntTargetsAndReturnAsCharacterArray(),
			true
		);
	}

	filterForTauntTargetsAndReturnAsCharacterArray(): Character[] {
		let tauntTargets: Character[] = [];
		for (const character of this.characters) {
			if (character != "none" && (character.buffsAndDebuffs?.taunt ?? 0) > 0) {
				tauntTargets.push(character);
			}
		}
		if (tauntTargets.length > 0) {
			return tauntTargets;
		} else {
			return this.characters as Character[];
		}
	}

	//Last method to get single target
	getTargetRandomlyFor(actor: Character): Character {
		const possibleTargets = this.getPossibleTargetsAsCharacterArray();
		
		let randomIndex = Math.floor(Math.random() * possibleTargets.length);

		if (possibleTargets[randomIndex] === undefined) {
			throw new Error("Randomly selected target is undefined!");
		}

		if (possibleTargets[randomIndex]?.buffsAndDebuffs?.stealth >= 1) {
			// If there is only one possible target, return it, else we'll check forever
			if (possibleTargets.length === 1) {
				console.log(`Target Stealth and is only one`)
				return possibleTargets[randomIndex];
			}
			if (this.stealthVisibleRollCheck(actor, possibleTargets[randomIndex])) {
				return possibleTargets[randomIndex];
			} else {
				return this.getTargetRandomlyFor(actor);
			}
		}

		return possibleTargets[randomIndex];
	}

	getTargetFromSortedTargetsFor(actor: Character): Character {
		for (const target of this.characters) {
			if (target != "none" && target.buffsAndDebuffs?.stealth >= 1) {
				if (this.stealthVisibleRollCheck(actor, target)) {
					return target;
				}
			}
		}
		return this.characters[0] as Character;
	}

	sortedBy(
		magnitude: "least" | "most",
		property: keyof Character,
		propertyArgument?: string
	): Party {
		return new Party(
			this.sortedByAndReturnAsCharacterArray(
				magnitude,
				property,
				propertyArgument
			),
			true
		);
	}

	sortedByAndReturnAsCharacterArray(
		magnitude: "least" | "most",
		property: keyof Character,
		propertyArgument?: string
	): Character[] {
		return this.characters
			.filter((character): character is Character => character !== null) // Filter out null values
			.sort((a, b) => {
				let aValue, bValue;

				if (propertyArgument) {
					aValue = a[property](propertyArgument);
					bValue = b[property](propertyArgument);
				} else if (typeof a[property] === "function") {
					aValue = (a[property] as Function)();
					bValue = (b[property] as Function)();
				} else {
					aValue = a[property];
					bValue = b[property];
				}

				if (magnitude === "least") {
					return aValue - bValue || 0;
				} else if (magnitude === "most") {
					return bValue - aValue || 0;
				}

				return 0;
			});
	}

	stealthVisibleRollCheck(actor: Character, target: Character): Boolean {
		const roll = Dice.roll(DiceEnum.OneD20).sum;
		const actorBonus = actor.getModifier(CharacterStatusEnum.intelligence);
		const targetBonus = target.getModifier(CharacterStatusEnum.dexterity);
		if (roll === 20 || roll + actorBonus >= 14 + targetBonus) {
			return true;
		} else if (roll === 1 || roll + actorBonus < 14 + targetBonus) {
			return false;
		}
		return false;
	}

	getPosssibleTargetsAsCharacterArray(): Character[] {
		return this.characters.filter(
			(character): character is Character =>
				character !== "none" && !character.isDead
		);
	}

	intoCharacterArray(): Character[] {
		return this.characters.filter(
			(character): character is Character => character !== "none"
		);
	}
}