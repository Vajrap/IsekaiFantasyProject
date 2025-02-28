import { Dice } from "../../Utility/Dice";
import { Character } from "../Character/Character";
import { TargetConditionFilters, TargetSelectionScope, TargetSortingOptions, TargetTauntConsideration, TargetType } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { LocationActionEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
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
	isTemporarilyBattleScenePartyForTargeting: boolean = false;
	isTraveling: boolean = false;
	// Should move to LocationEnum
	location: LocationName = LocationName.None;
	currentLocation: LocationName;

	//we would normally only allow creation of a party with an array of one character, but in battle we need to create a party with multiple characters
	//When Player character was created, it created a party of itself, so it's one character in a party.

	constructor(
		characters: Character[],
		isTemporarilyBattleScenePartyForTargeting: boolean = false,
		location?: LocationName,
		firstEnemyPosition?: number
	) {
		this.characters[0] = characters[0] as Character;
		this.isTemporarilyBattleScenePartyForTargeting =
			isTemporarilyBattleScenePartyForTargeting;
		this.partyID = isTemporarilyBattleScenePartyForTargeting
			? "temp"
			: characters[0].id;
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
	
// export class TargetType {
// 	targetPartyOrSelf: TargetPartyType;
// 	targetScope: TargetSelectionScope | 'none';
// 	targetConditionFilter: TargetConditionFilters | 'none';
// 	targetSortingOption: TargetSortingOptions | 'none';
// 	tauntConsideration: TargetTauntConsideration | 'none';
// 	targetBuffOrDebuffCondition: { buffOrDebuff: BuffsAndDebuffsEnum, value: number} | 'none';

	// getTargetsFromTargetType(
	// 	targetType: TargetType,
	// 	actor: Character,
	// 	exception: Character[]
	// ): Character[] {
	// 	// Check for taunt first
	// 	let targets;
	// 	if (targetType.tauntConsideration === TargetTauntConsideration.TauntCount) {
	// 		targets = this.getAllTauntingCharacters();
	// 	} else {
	// 		targets = this.getPossibleTargetsAsCharacterArray();
	// 	}

	// 	// If only 1 target possible, return it
	// 	if (targets.length === 1) { 
	// 		return targets; 
	// 	}

	// 	// Handling different target scopes and conditions
	// 	if (targetType.targetScope === TargetSelectionScope.All) {
	// 		if (targetType.targetConditionFilter === TargetConditionFilters.IsDead) {
	// 			return this.getDeadTargets().intoCharacterArray();
	// 		}
	// 		return this.getPossibleTargetsAsCharacterArray();
	// 	}

	// 	if (targetType.targetScope === TargetSelectionScope.AllFrontRow) {
	// 		return this.getAllFrontRowTargets();
	// 	}

	// 	if (targetType.targetScope === TargetSelectionScope.AllBackRow) {
	// 		return this.getAllBackRowTargets();
	// 	}

	// 	if (targetType.targetScope === TargetSelectionScope.AllFrontRowShiftable) {
	// 		let row = this.getAllFrontRowTargets();
	// 		if (row.length === 0) {
	// 			row = this.getAllBackRowTargets();
	// 		}
	// 		return row;
	// 	}

	// 	if (targetType.targetScope === TargetSelectionScope.AllBackRowShiftable) {
	// 		let row = this.getAllBackRowTargets();
	// 		if (row.length === 0) {
	// 			row = this.getAllFrontRowTargets();
	// 		}
	// 		return row;
	// 	}

	// 	if (targetType.targetScope === TargetSelectionScope.Single) {
	// 		if (targetType.targetConditionFilter === TargetConditionFilters.IsDead) {
	// 			let deadTarget = this.getOneDeadTarget(actor);
	// 			return deadTarget ? [deadTarget] : [];
	// 		}

	// 		if (targetType.targetConditionFilter === TargetConditionFilters.IsSummoned) {
	// 			let summonedTarget = this.getOneSummonedTarget(actor);
	// 			return summonedTarget ? [summonedTarget] : [];
	// 		}
	// 	}

	// 	// Get possible targets and filter exceptions
	// 	let possibleTargets =
	// 		this.getPossibleTargetsExceptExceptions(exception).intoCharacterArray();

	// 	if (possibleTargets.length === 0) {
	// 		return [];
	// 	}

	// 	if (targetType.targetSortingOption !== "none") {
	// 		possibleTargets = this.sortTargets(possibleTargets, targetType.targetSortingOption);
	// 	}

	// 	return [this.getOneRandomTargetTauntNotCount(actor)];
	// }


	// private getAllTauntingCharacters(): Character[] {
	// 	let characters = [];
	// 	for (const character of this.characters) {
	// 		if (character !== "none" && character.buffsAndDebuffs.taunt >= 1) {
	// 			characters.push(character);
	// 		}
	// 	}
	// 	return characters;
	// }

	// private isEdgeSelection(sortingOption: TargetSortingOptions): boolean {
	// 	return sortingOption != TargetSortingOptions.None &&
	// 		sortingOption != TargetSortingOptions.PreferredFrontRow &&
	// 		sortingOption != TargetSortingOptions.PreferredBackRow;
	// }

	// private sortTargets(targets: Character[], sortingOption: TargetSortingOptions): Character[] {
	// 	if (sortingOption === TargetSortingOptions.None) return targets;
	// 	let isEdge = this.isEdgeSelection(sortingOption);

	// 	const sortingMap: { [key in TargetSortingOptions]: (a: Character, b: Character) => number } = {
	// 		[TargetSortingOptions.HighestHP]: (a: Character, b: Character) => b.currentHP - a.currentHP,
	// 		[TargetSortingOptions.LowestHP]: (a: Character, b: Character) => a.currentHP - b.currentHP,
	// 		[TargetSortingOptions.HighestMP]: (a: Character, b: Character) => b.currentMP - a.currentMP,
	// 		[TargetSortingOptions.LowestMP]: (a: Character, b: Character) => a.currentMP - b.currentMP,
	// 		[TargetSortingOptions.HighestSP]: (a: Character, b: Character) => b.currentSP - a.currentSP,
	// 		[TargetSortingOptions.LowestSP]: (a: Character, b: Character) => a.currentSP - b.currentSP,
	// 		[TargetSortingOptions.Fastest]: (a: Character, b: Character) => b.attribute("agility") - a.attribute("agility"),
	// 		[TargetSortingOptions.Slowest]: (a: Character, b: Character) => a.attribute("agility") - b.attribute("agility"),
	// 		[TargetSortingOptions.HighestPhysicalAttack]: (a: Character, b: Character) => b.battler("pATK") - a.battler("pATK"),
	// 		[TargetSortingOptions.LowestPhysicalAttack]: (a: Character, b: Character) => a.battler("pATK") - b.battler("pATK"),
	// 		[TargetSortingOptions.HighestMagicalAttack]: (a: Character, b: Character) => b.battler("mATK") - a.battler("mATK"),
	// 		[TargetSortingOptions.LowestMagicalAttack]: (a: Character, b: Character) => a.battler("mATK") - b.battler("mATK"),
	// 		[TargetSortingOptions.HighestPhysicalDefense]: (a: Character, b: Character) => b.battler("pDEF") - a.battler("pDEF"),
	// 		[TargetSortingOptions.LowestPhysicalDefense]: (a: Character, b: Character) => a.battler("pDEF") - b.battler("pDEF"),
	// 		[TargetSortingOptions.HighestMagicalDefense]: (a: Character, b: Character) => b.battler("mDEF") - a.battler("mDEF"),
	// 		[TargetSortingOptions.LowestMagicalDefense]: (a: Character, b: Character) => a.battler("mDEF") - b.battler("mDEF"),
	// 		[TargetSortingOptions.HighestLevel]: (a: Character, b: Character) => b.level - a.level,
	// 		[TargetSortingOptions.LowestLevel]: (a: Character, b: Character) => a.level - b.level,
	// 		[TargetSortingOptions.PreferredFrontRow]: (a, b) => a.position - b.position,
	// 		[TargetSortingOptions.PreferredBackRow]: (a, b) => b.position - a.position,
	// 		[TargetSortingOptions.None]: () => 0
	// 	};

	// 	if (sortingOption in sortingMap) {
	// 		return targets.sort(sortingMap[sortingOption]);
	// 	}

	// 	if (isEdge) {
	// 		return [targets[0]];
	// 	}

	// 	return [this.getWeightedRandomTarget(targets)];
	// }

	// private getRandomTarget(targets: Character[]): Character {
	// 	if (targets.length === 0) throw new Error("No valid targets found!");
	
	// 	const roll = Dice.rollTwenty();
	// 	const targetIndex = roll % targets.length;
	
	// 	return targets[targetIndex];
	// }

	// private getWeightedRandomTarget(targets: Character[]): Character {
	// 	if (targets.length === 0) throw new Error("No valid targets found!");
	
	// 	let totalWeight = 0;
	// 	const weightMap: number[] = [];
	
	// 	for (let i = 0; i < targets.length; i++) {
	// 		let weight = targets.length - i; // Higher position = higher weight
	// 		totalWeight += weight;
	// 		weightMap.push(totalWeight);
	// 	}
	
	// 	const roll = Math.floor(Math.random() * totalWeight) + 1;
	
	// 	for (let i = 0; i < weightMap.length; i++) {
	// 		if (roll <= weightMap[i]) {
	// 			return targets[i];
	// 		}
	// 	}
	
	// 	return targets[targets.length - 1];
	// }

	// //one random target taunting not count
	// private getOneRandomTargetTauntNotCount(actor: Character): Character {
	// 	return this.getPossibleTargets().getTargetRandomlyFor(actor);
	// }
	
	// private getOneDeadTarget(actor: Character): Character | null {
	// 	const deadTargets = this.getDeadTargets().characters;
	// 	if (deadTargets.length === 0) {
	// 		return null;
	// 	}
	// 	return this.getDeadTargets().getTargetRandomlyFor(actor);
	// }

	// private getOneSummonedTarget(actor: Character): Character | null {
	// 	const summonedTargets = this.characters.filter(
	// 		(character): character is Character =>
	// 			character !== "none" && character.isSummoned
	// 	);
	// 	if (summonedTargets.length === 0) {
	// 		return null;
	// 	}
	// 	return new Party(summonedTargets, true).getTargetRandomlyFor(actor);
	// }

	// private getAllFrontRowTargets(): Character[] {
	// 	return this.getFrontRowAsCharacterArray().filter(
	// 		(character): character is Character => !character.isDead
	// 	);
	// }

	// private getAllBackRowTargets(): Character[] {
	// 	return this.getBackRowAsCharacterArray().filter(
	// 		(character): character is Character => !character.isDead
	// 	);
	// }

	// private getPossibleTargetsAsCharacterArray(): Character[] {
	// 	const targets = this.characters.filter(
	// 		(character): character is Character => {
	// 			const isNotNone = character !== "none";
	// 			const isNotDead = character !== "none" && !character.isDead;
	// 			const isNotNull = character !== null;
	// 			return isNotNone && isNotDead && isNotNull;
	// 		}
	// 	);

	// 	return targets;
	// }

	// private getPossibleTargets(): Party {
	// 	const possibleTargets = this.getPossibleTargetsAsCharacterArray();
	// 	return new Party(possibleTargets, true);
	// }

	// private getPossibleTargetsExceptExceptions(exceptions: Character[]): Party {
	// 	const possibleTargets = this.getPossibleTargetsAsCharacterArray().filter(
	// 		(character) => !exceptions.includes(character)
	// 	);
	// 	return new Party(possibleTargets, true);
	// }

	// private getDeadTargets(): Party {
	// 	const deadTargets = this.characters.filter(
	// 		(character): character is Character =>
	// 			character !== "none" && character.isDead
	// 	);
	// 	return new Party(deadTargets, true);
	// }

	// private getFrontRowAsCharacterArray(): Character[] {
	// 	let frontRow: Character[] = [];
	// 	for (const character of this.characters) {
	// 		if (character != "none" && character.position < 3) {
	// 			frontRow.push(character);
	// 		}
	// 	}
	// 	return frontRow;
	// }

	// private getBackRowAsCharacterArray(): Character[] {
	// 	let backRow: Character[] = [];
	// 	for (const character of this.characters) {
	// 		if (character != "none" && character.position > 2) {
	// 			backRow.push(character);
	// 		}
	// 	}
	// 	return backRow;
	// }

	// private getTargetRandomlyFor(actor: Character): Character {
	// 	const possibleTargets = this.getPossibleTargetsAsCharacterArray();
		
	// 	let randomIndex = Math.floor(Math.random() * possibleTargets.length);

	// 	if (possibleTargets[randomIndex] === undefined) {
	// 		throw new Error("Randomly selected target is undefined!");
	// 	}

	// 	if (possibleTargets[randomIndex]?.buffsAndDebuffs?.stealth >= 1) {
	// 		// If there is only one possible target, return it, else we'll check forever
	// 		if (possibleTargets.length === 1) {
	// 			return possibleTargets[randomIndex];
	// 		}

	// 		// If there are more than one possible target, we'll try 5 times to find a visible target
	// 		let attempts = 5;
	// 		while (
	// 			!this.stealthVisibleRollCheck(actor, possibleTargets[randomIndex]) &&
	// 			attempts > 0
	// 		) {
	// 			randomIndex = Math.floor(Math.random() * possibleTargets.length);
	// 			attempts--;
	// 		} // If we still can't find a visible
	// 		if (attempts === 0) {
	// 			return this.getWeightedRandomTarget(possibleTargets
	// 				.filter((target) => target !== possibleTargets[randomIndex]));
	// 			}
	// 	}

	// 	return possibleTargets[randomIndex];
	// }

	// private stealthVisibleRollCheck(actor: Character, target: Character): Boolean {
	// 	const roll = Dice.roll(DiceEnum.OneD20).sum;
	// 	const actorBonus = actor.getModifier(CharacterStatusEnum.intelligence);
	// 	const targetBonus = target.getModifier(CharacterStatusEnum.dexterity);
	// 	if (roll === 20 || roll + actorBonus >= 14 + targetBonus) {
	// 		return true;
	// 	} else if (roll === 1 || roll + actorBonus < 14 + targetBonus) {
	// 		return false;
	// 	}
	// 	return false;
	// }

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

/*
export class TargetType {
    targetPartyOrSelf: TargetPartyType;
    targetScope: TargetSelectionScope | 'none';
    targetConditionFilter: TargetConditionFilters | 'none';
    targetSortingOption: TargetSortingOptions | 'none';
    tauntConsideration: TargetTauntConsideration | 'none';
    targetBuffOrDebuffCondition: { buffOrDebuff: BuffsAndDebuffsEnum, value: number} | 'none';
    constructor(
        targetPartyOrSelf: TargetPartyType,
        targetScope?: TargetSelectionScope,
        targetConditionFilter?: TargetConditionFilters,
        targetSortingOption?: TargetSortingOptions,
        tauntConsideration?: TargetTauntConsideration,
        targetBuffOrDebuffCondition?: {buffOrDebuff: BuffsAndDebuffsEnum, value: number}
    ) 
    {
        this.targetPartyOrSelf = targetPartyOrSelf;
        this.targetScope = targetScope || 'none';
        this.targetConditionFilter = targetConditionFilter || 'none';
        this.targetSortingOption = targetSortingOption || 'none';
        this.tauntConsideration = tauntConsideration || 'none';
        this.targetBuffOrDebuffCondition = targetBuffOrDebuffCondition || 'none';
    }
}

  export enum TargetPartyType {
    Self = 'self',
    Ally = 'ally',
    Enemy = 'enemy',
  }
  
  No shifting means that the target selection will only consider the front row or back row
  If used 'Single' the game mechanic will follow the default behavior which more likely to target the front row
  When use 'SingleFrontRowShiftable' meaning that, it will only rolled for the front row, only if the front row is empty, it will shift to the back row
  We also need an 'OppositeRow' ? meaning if user is in front row, it will target the back row, and vice versa?
  
  export enum TargetSelectionScope {
    Single = 'single',
    SingleFrontRowShiftable = 'frontRowShiftable', // Prioritize front row but shift to back row if empty
    SingleBackRowShiftable = 'backRowShiftable',   // Prioritize back row but shift to front row if empty
    SingleFrontRow = 'frontRow',                   // Only front row, no shifting
    SingleBackRow = 'backRow',                     // Only back row, no shifting
    All = 'all',
    AllFrontRowShiftable = 'frontRowShiftable', // Prioritize front row but shift to back row if empty
    AllBackRowShiftable = 'backRowShiftable',   // Prioritize back row but shift to front row if empty
    AllFrontRow = 'frontRow',                   // Only front row, no shifting
    AllBackRow = 'backRow',                     // Only back row, no shifting
    OppositeRow = 'oppositeRow',                 // Target the opposite row
	OppositeRowShiftable = 'oppositeRowShiftable', // Target the opposite row, but shift to the other row
  }
  
  export enum TargetConditionFilters {
    None = 'none',
    HasTrait = 'hasTrait',
    HasBuffOrDebuff = 'hasBuffOrDebuff',
    IsDead = 'isDead',
    IsSummoned = 'isSummonned'
  }
  
  export enum TargetSortingOptions {
    None = 'none',
    LowestHP = 'lowestHP',
    HighestHP = 'highestHP',
    LowestMP = 'lowestMP',
    HighestMP = 'highestMP',
    LowestSP = 'lowestSP',
    HighestSP = 'highestSP',
    PreferredFrontRow = 'preferredFrontRow',
    PreferredBackRow = 'preferredBackRow',
    LowestPhysicalAttack = 'lowestPhysicalAttack',
    HighestPhysicalAttack = 'highestPhysicalAttack',
    LowestMagicalAttack = 'lowestMagicalAttack',
    HighestMagicalAttack = 'highestMagicalAttack',
    LowestPhysicalDefense = 'lowestPhysicalDefense',
    HighestPhysicalDefense = 'highestPhysicalDefense',
    LowestMagicalDefense = 'lowestMagicalDefense',
    HighestMagicalDefense = 'highestMagicalDefense',
    LowestLevel = 'lowestLevel',
    HighestLevel = 'highestLevel',
    Fastest = 'fastest',
    Slowest = 'slowest',
  }
  
  export enum TargetTauntConsideration {
    TauntCount = 'tauntCount',     // Consider taunt count for targeting
    NoTauntCount = 'noTauntCount', // Ignore taunt count
  }

  export enum BuffsAndDebuffsEnum {
    none = 'none',
    stun = 'stun',
    blind = 'blind',
    slow = 'slow',
    bleed = 'bleed',
    poison = 'poison',
    bound = 'bound',
    paralyse = 'paralyse',
    burn = 'burn',
    awed = 'awed',
    cursed = 'cursed',
    freeze = 'freeze',
    confuse = 'confuse',
    fear = 'fear',
    entangled = 'entangled',
    soaked = 'soaked',
    stoneSkin = 'stoneSkin',
    counterAttack_1 = 'counterAttack_1',
    counterAttack_2 = 'counterAttack_2',
    counterAttackCharge_1 = 'counterAttackCharge_1',
    counterAttackCharge_2 = 'counterAttackCharge_2',
    cautious = 'cautious',
    focus = 'focus',
    defend = 'defend',
    defensiveStance_1 = 'defensiveStance_1',
    defensiveStance_2 = 'defensiveStance_2',
    defensiveStance_3 = 'defensiveStance_3',
    taunt = 'taunt',
    arcaneShield = 'arcaneShield',
    timeWarp = 'timeWarp',
    weaponMagicalCoating = 'weaponMagicalCoating',
    stealth = 'stealth',
    bless = 'bless',
    haste = 'haste',
    shielded = 'shielded',
    inspiration = 'inspiration',
    fightingSpirit_1 = 'fightingSpirit_1',
    fightingSpirit_2 = 'fightingSpirit_2',
    fightingSpirit_3 = 'fightingSpirit_3',
    divineShield = 'divineShield',
    manaShield = 'manaShield',
    zealotsFury = 'zealotsFury',
    primalRoar_1 = 'primalRoar_1',
    primalRoar_2 = 'primalRoar_2',
    primalRoar_3 = 'primalRoar_3',
    poisonCoating_1 = 'poisonCoating_1',
    poisonCoating_2 = 'poisonCoating_2',
    poisonCoating_3 = 'poisonCoating_3',
    berserkerRage_1 = 'berserkerRage_1',
    berserkerRage_2 = 'berserkerRage_2',
    berserkerRage_3 = 'berserkerRage_3',
    innerFocus_1 = 'innerFocus_1',
    innerFocus_2 = 'innerFocus_2',
    innerFocus_3 = 'innerFocus_3',
    chiCirculation = 'chiCirculation',
    battleCry_1 = 'battleCry_1',
    battleCry_2 = 'battleCry_2',
    battleCry_3 = 'battleCry_3',
    isSummoned = 'isSummoned',
    rejuvenate = 'rejuvenate',
    cleanse = 'cleanse',
    desperation = 'desperation',
    mage_reflex = 'mage_reflex',
    demonic_empowerment = 'demonic_empowerment',
    frost_shield = 'frost_shield',
  }

*/

