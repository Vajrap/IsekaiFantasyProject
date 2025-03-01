import { getRegionFromName, Region } from "./Region";
import { TravelMethodEnum } from "../../../Common/DTOsEnumsInterfaces/Map/TravelMethodEnum";
import { Dice } from "../../Utility/Dice";
import { StatMod } from "../../Utility/StatMod";
import { screamer } from "../../Utility/Screamer/Screamer";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../Party/Party";
import { GameLocation } from "./GameLocation";
import { getLocationByName } from "./Locations";
import {
	gameEvent_artisanTrain,
	gameEvent_attributeTrain,
	gameEvent_battleEvent,
	gameEvent_proficiencyTrain,
	gameEvent_skillTrain,
} from "../../Game/GameEvent/GameEvent";
import { LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { getEnemyFromRepository } from "../Character/Enemy/EnemyRepository";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { Enemy } from "../Character/Enemy/Enemy";
import { AttributeEnum } from "../Character/Subclasses/CharacterDataEnum";

//Party.travelManager = new TravelManager();
//When Player start a travel, it's actually the party that start the travel
//The party would then call methods, like party.travelManager.initiateTravel(path: string[], characterStatus: CharacterStatus, travelMethod: TravelMethod)

export interface travelingParty {
	party: Party;
	currentLocation: GameLocation;
	currentLocationIndexZeroBase: number;
	distanceCovered: number;
	path: GameLocation[];
	isTraveling: boolean;
	currentTravelMethod: TravelMethodEnum;

	nextLocation(): GameLocation | null;
}

export class travelingPartyImpl implements travelingParty {
	party: Party;
	currentLocation: GameLocation;
	currentLocationIndexZeroBase: number;
	distanceCovered: number;
	path: GameLocation[];
	isTraveling: boolean;
	currentTravelMethod: TravelMethodEnum;

	constructor(
		party: Party,
		path: GameLocation[],
		currentTravelMethod: TravelMethodEnum
	) {
		this.party = party;
		this.currentLocation = path[0];
		this.currentLocationIndexZeroBase = 0;
		this.distanceCovered = 0;
		this.path = path;
		this.isTraveling = false;
		this.currentTravelMethod = currentTravelMethod;
	}

	nextLocation(): GameLocation | null {
		// Ensure there is a next location within bounds.
		if (this.currentLocationIndexZeroBase < this.path.length - 1) {
			return this.path[this.currentLocationIndexZeroBase + 1];
		}
		// Return null if at the last location or path is invalid.
		return null;
	}
}

export class TravelManager {
	travelingParties: { [partyID: string]: travelingParty } = {};

	constructor() {}

	addParty(party: Party) {
		const location = getLocationByName(party.location);

		const travelingParty = new travelingPartyImpl(
			party,
			[location],
			TravelMethodEnum.walk
		);

		this.travelingParties[party.partyID] = travelingParty;
	}

	addLocationToPath(partyID: string, locationName: LocationName): boolean {
		const party = this.travelingParties[partyID];
		if (party === undefined || party === null) {
			throw new Error(
				`Party with id ${partyID} not found in addLocationToPath`
			);
		}

		let currentLocation = party.currentLocation;

		let targetLocationObj = getLocationByName(locationName);

		if (party.path.length === 0) {
			if (currentLocation.checkIfLocationConnected(targetLocationObj)) {
				party.path.push(targetLocationObj);
				return true;
			} else {
				console.log("Location not connected:", locationName);
				return false;
			}
		} else {
			// This check if the adding location is connected to the 'last location of this path' or not.
			let lastLocation = party.path[party.path.length - 1];
			if (lastLocation.checkIfLocationConnected(targetLocationObj)) {
				party.path.push(targetLocationObj);
				screamer.scream("ADDED_LOCATION_TO_PATH", {
					location: locationName,
				});
				return true;
			} else {
				console.log("Location not connected:", locationName);
				screamer.scream("LOCATION_NOT_CONNECTED", {
					location: locationName,
				});
				return false;
			}
		}
	}

	removeLocationFromPath(partyID: string, location: GameLocation): boolean {
		const party = this.travelingParties[partyID];
		if (party.isTraveling === true) {
			screamer.scream("CANT_REMOVE_LOCATION_WHILE_TRAVELING", {});
			return false;
		}

		// If it's the location in position 0, we can't remove it.
		if (location === party.path[0]) {
			screamer.scream("CANT_REMOVE_STARTING_LOCATION", {});
			return false;
		}

		//Can only remove the location at the last position of the path
		if (party.path[party.path.length - 1] === location) {
			party.path.pop();
			screamer.scream("LOCATION_PATH_REMOVED", {});
			return true;
		} else {
			screamer.scream("CAN_REMOVE_ONLY_LAST_LOCATION_IN_PATH", {});
			return false;
		}
	}

	async allTravel() {
		for (const partyID in this.travelingParties) {
			await this.travel(partyID);
		}
		this.checkArrival();
	}

	async travel(partyID: string) {
		const travelingParty = this.travelingParties[partyID];
		if (travelingParty === undefined || travelingParty === null) {
			throw new Error(`Party with id ${partyID} not found in travel`);
		}

		if (travelingParty.path.length === 0) return;
		if (travelingParty.currentLocationIndexZeroBase === travelingParty.path.length - 1) return;

		const nextLocation = travelingParty.nextLocation();
		if (nextLocation === null) return;

		travelingParty.isTraveling = true;

		const { travelSpeed, averageLuckModifier } = getTravelSpeedAndAverageLuckModifier(travelingParty);

		const randomEventChance = Dice.rollTwenty();
	
		let isRandomEventSuccess = true;

		let regionToUse: Region;
		if (travelingParty.distanceCovered < 100) {
			regionToUse = getRegionFromName(travelingParty.currentLocation.mainRegion);
		} else {
			regionToUse = getRegionFromName(travelingParty.currentLocation.region);
		}

		if (randomEventChance <= 5) {
			const eventEnum = regionToUse.getRandomEvent("travel", averageLuckModifier);

            // TODO: Implement the rest of the random events
			switch (eventEnum) {
				case LocationEventEnum.AttributeTrain:
					isRandomEventSuccess = true
				case LocationEventEnum.ArtisanTrain:
					isRandomEventSuccess = true
				case LocationEventEnum.ProficiencyTrain:
					isRandomEventSuccess = true
				case LocationEventEnum.SkillTrain:
					isRandomEventSuccess = true
				case LocationEventEnum.BattleEvent:
					isRandomEventSuccess = await this._executeBattleEvent(travelingParty, averageLuckModifier);
				case LocationEventEnum.TravelEvent:

				// TODO: possible other casese
				// case LocationEventEnum.QuestGiverEvent: event = gameE
				// case LocationEventEnum.QuestUpdateEvent:
				// case LocationEventEnum.ItemPickupEvent:

				default:
					break;
			}
        }

		if (isRandomEventSuccess) {
			let deviation = Dice.roll(DiceEnum.OneD10).sum - 5;
			travelingParty.distanceCovered += Math.max(0, travelSpeed + deviation);
		} else {
			console.log("Travel event failed");
		}

		// Mood and energy decrease
		for (const character of travelingParty.party.characters) {
			let pace = travelingParty.party.behavior.travelPace;
			if (character !== "none") {
				character.moodDown((Dice.roll(DiceEnum.OneD4).sum + (pace === 'fast' ? 8 : pace === 'normal' ? 5 : 2)))
				character.energyDown((Dice.roll(DiceEnum.OneD6).sum + (pace === 'fast' ? 20 : pace === 'normal' ? 15 : 10)))
			}
		}
	}

	getSpeedModifierFromRegion(
		region: Region,
		travelMethod: TravelMethodEnum
	): number {
		let speedModifier = 0;
		speedModifier = region.getSpeedBonusModifire(travelMethod);
		return speedModifier;
	}

	checkArrival() {
		for (const partyID in this.travelingParties) {
			this.checkPartyArrived(partyID);
		}
	}

	checkPartyArrived(partyID: string) {
		const travelingParty = this.travelingParties[partyID];

		const nextLocation = travelingParty.nextLocation();

		if (travelingParty === null || travelingParty === undefined) {
			throw new Error(
				`traveling party ID and Entity mismatched for partyID ${partyID}`
			);
		}

		if (travelingParty.isTraveling === false) {
			return;
		}

		if (nextLocation === null) {
			// Is this Error?
			throw new Error(`Next location is null for partyID ${partyID}`);
		}

		if (
			travelingParty.distanceCovered >=
			travelingParty.currentLocation.calculateDistanceTo(nextLocation)
		) {
			travelingParty.currentLocationIndexZeroBase++;
			travelingParty.currentLocation = nextLocation;
			travelingParty.distanceCovered = 0;

			let isAtDestination =
				travelingParty.currentLocation === nextLocation ? true : false;

			screamer.scream(
				isAtDestination ? "DESTINATION_ARRIVED" : "LOCATION_ARRIVED",
				{
					partyID: travelingParty.party.partyID,
					location: travelingParty.currentLocation.id,
				}
			);

			// If the party has arrived at the destination, set isTraveling to false and path to the destination.
			if (isAtDestination) {
				travelingParty.isTraveling = false;
				travelingParty.path = [nextLocation];
			}
		} else {
			screamer.scream("TRAVEL_UPDATE", {
				partyID: travelingParty.party.partyID,
				currentLocation: travelingParty.currentLocation.id,
				distanceCovered: travelingParty.distanceCovered,
			});
		}
	}

	getTravelProgress(partyID: string): number {
		return (
			this.travelingParties[partyID].currentLocationIndexZeroBase /
			(this.travelingParties[partyID].path.length - 1)
		);
	}

	getTravelTimeLeft(partyID: string): number {
		let remainingDistance = 0;
		let travelingParty = this.travelingParties[partyID];

		for (
			let i = travelingParty.currentLocationIndexZeroBase;
			i < travelingParty.path.length - 1;
			i++
		) {
			remainingDistance += travelingParty.path[i].calculateDistanceTo(
				travelingParty.path[i + 1]
			);
		}

		let travelSpeed =
			getTravelSpeedAndAverageLuckModifier(travelingParty).travelSpeed;

		return remainingDistance / travelSpeed;
	}

    // MARK: Event executions:
    async _executeBattleEvent(travelingParty: travelingParty, averageLuckModifier: number): Promise<boolean> {
		let regionToUse: Region;

		if (travelingParty.distanceCovered < 100) {
			regionToUse = getRegionFromName(travelingParty.currentLocation.mainRegion);
		} else {
			regionToUse = getRegionFromName(travelingParty.currentLocation.region);
		}

		const { enemyList, enemyCombatPolicy } = regionToUse.rollForEnemies(averageLuckModifier);
		// TODO: Check if battle is initiated
		if (!checkIfCombatInitiated(travelingParty.party, new Party([]), enemyCombatPolicy)) {
			// Return if the traveling party can move forward or not, so when no battle is initiated, the party can continue to move forward.
			return true;
		}

		let possiblePositions = [0, 1, 2, 3, 4, 5];
		let enemies = [];
		for (const enemyEnum of enemyList) {
			enemies.push(getEnemyFromRepository(enemyEnum));
		}

		if (enemies.length === 0) {
			throw new Error("Enemy length while creating party is 0");
		}

		 let firstEnemyPosition = assignPreferredPosition(enemies[0], possiblePositions);
		 const enemyParty = new Party([enemies[0]], travelingParty.currentLocation.id, firstEnemyPosition);
		 possiblePositions = possiblePositions.filter(pos => pos !== firstEnemyPosition);
	 
		 for (let i = 1; i < enemies.length; i++) {
			 let enemyPosition = assignPreferredPosition(enemies[i], possiblePositions);
			 enemyParty.addCharacterToParty(enemies[i], enemyPosition);
			 possiblePositions = possiblePositions.filter(pos => pos !== enemyPosition);
		 }
	 
		 return await gameEvent_battleEvent.execute({ 
			 party: travelingParty.party, 
			 enemyParty, 
			 location: travelingParty.currentLocation.id 
		 }) as boolean;
	}
}

function checkIfCombatInitiated(party: Party, enemyParty: Party, enemyCombatPolicy: string): boolean {
	let policy_A = party.behavior.combatPolicy
	let policy_B = enemyCombatPolicy

	if (policy_A === "strategic") {
		policy_A = evaluateAndDecide(party, enemyParty);
	}
	if (policy_B === "strategic") {
		policy_B = evaluateAndDecide(enemyParty, party);
	}

	if (policy_A === "evasive" && policy_B === "evasive") {
		return false;
	}

	if (policy_A === "engage" && policy_B === "engage") {
		return true;
	}

	if (policy_A === "engage" && policy_B === "evasive") {
		return resolveChase(party, enemyParty)
	}

	if (policy_A === "evasive" && policy_B === "engage") {
		return resolveChase(enemyParty, party)
	}

	return false;
}

function resolveChase(chasingParty: Party, fleeingParty: Party): boolean {
	let chaseInitiative = Dice.roll(DiceEnum.OneD6).sum;
	let fleeInitiative = Dice.roll(DiceEnum.OneD6).sum;

	for (const character of chasingParty.characters) {
		if (character !== "none") {
			chaseInitiative += StatMod.value(character.status.agility());
		}
	}
	for (const character of fleeingParty.characters) {
		if (character !== "none") {
			fleeInitiative += StatMod.value(character.status.agility());
		}
	}

	return chaseInitiative > fleeInitiative;
}

function evaluateAndDecide(party: Party, enemyParty: Party): "engage" | "evasive" {
	let leader = party.getPartyMemberWithHighestAttr(AttributeEnum.INTELLIGENCE);
	const intModifier = StatMod.value(leader.status.intelligence());
	const intelligenceDeviation = 5 - Math.min(intModifier, 5);
	let operation = Dice.rollTwenty() >= 10 ? "plus" : "minus";

	let PS = assetPartyStrength(party);
	let EPS = assetPartyStrength(enemyParty) + (operation === "plus" ? intelligenceDeviation : -intelligenceDeviation);

	return EPS > PS ? "evasive" : "engage";
}

function assetPartyStrength(party: Party): number {
	let totalLevel = 0;
	let totalMember = 0;
	for (const character of party.characters) {
		if (character !== "none") {
			totalLevel += character.level;
			totalMember++;
		}
	}
	return totalMember > 0 ? totalLevel / totalMember : 1;
}

function getTravelSpeedAndAverageLuckModifier(party: travelingParty): {
	travelSpeed: number;
	averageLuckModifier: number;
} {
	let numberOfCharacter = 0;
	let totalAgility = 0;
	let totalLuck = 0;
	for (const character of party.party.characters) {
		if (character !== "none") {
			numberOfCharacter++;
			totalAgility += character.status.agility();
			totalLuck += character.status.luck();
		}
	}

	const region = getRegionFromName(party.currentLocation.region);

	let paceModifier = 0;
	switch (party.party.behavior.travelPace) {
		case 'fast': paceModifier = 20; break;
		case 'normal': paceModifier = 0; break;
		case 'slow': paceModifier = -20; break;
		default: paceModifier = 0;
	}

	return {
		travelSpeed: 100 + StatMod.value(totalAgility / numberOfCharacter) + region.getSpeedBonusModifire(party.currentTravelMethod) + paceModifier,
		averageLuckModifier: StatMod.value(totalLuck / numberOfCharacter),
	};
}

function assignPreferredPosition(enemy: Enemy, possiblePositions: number[]): number {
    let preferredPositions = enemy.preferredPosition === "front" 
        ? possiblePositions.filter(pos => pos < 3)
        : enemy.preferredPosition === "back"
        ? possiblePositions.filter(pos => pos >= 3)
        : [...possiblePositions];

    if (preferredPositions.length === 0) {
        preferredPositions = [...possiblePositions]; // Fallback
    }

    return preferredPositions[Math.floor(Math.random() * preferredPositions.length)];
}