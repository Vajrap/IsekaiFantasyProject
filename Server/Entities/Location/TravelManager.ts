import { getRegionFromName, Region, PartyActions } from "./Region";
import { TravelMethodEnum } from "../../../Common/DTOsEnumsInterfaces/Map/TravelMethodEnum";
import { Dice } from "../../Utility/Dice";
import { StatMod } from "../../Utility/StatMod";
import { screamer } from "../../Utility/Screamer/Screamer";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../Party/Party";
import { GameLocation } from "./GameLocation";
import { getLocationByName } from "./Locations";
import { gameEvent_battleEvent } from "../../Game/GameEvent/GameEvent";
import { LocationActionEnum, LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { getEnemyFromRepository } from "../Character/Enemy/EnemyRepository";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { Enemy } from "../Character/Enemy/Enemy";
import { DayOfWeek, TimeOfDay } from "../../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { checkIfCombatInitiated } from "../../Game/Battle/Calculators/checkIfCombatInitiated";

//Party.travelManager = new TravelManager();
//When Player start a travel, it's actually the party that start the travel
//The party would then call methods, like party.travelManager.initiateTravel(path: string[], characterStatus: CharacterStatus, travelMethod: TravelMethod)

export interface travelingParty {
	party: Party;
	currentLocation: GameLocation;
	currentLocationIndex: number;
	distanceCovered: number;
	path: GameLocation[];
	isTraveling: boolean;
	currentTravelMethod: TravelMethodEnum;

	getNextLocation(): GameLocation;
	arrivedNextLocation(): void;
	checkIfArrivingNextLocation(): boolean;
}

export class travelingPartyImpl implements travelingParty {
	party: Party;
	currentLocation: GameLocation;
	currentLocationIndex: number;
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
		this.currentLocationIndex = 0;
		this.distanceCovered = 0;
		this.path = path;
		this.isTraveling = false;
		this.currentTravelMethod = currentTravelMethod;
	}

	getCurrentLocation(): GameLocation {
		return this.currentLocation;
	}

	getNextLocation(): GameLocation {
		return this.currentLocationIndex < this.path.length - 1 
			? this.path[this.currentLocationIndex + 1] 
			: this.currentLocation;
	}

	arrivedNextLocation(): void {
		if (this.currentLocationIndex < this.path.length - 1) {
			this.currentLocationIndex++;
			this.currentLocation = this.path[this.currentLocationIndex];
			this.distanceCovered = 0;

			let location = this.currentLocation;
			location.partyMoveIn(this.party);
		}
	}

	checkIfArrivingNextLocation(): boolean {
		if (this.currentLocationIndex >= this.path.length - 1) {
			return false;
		}
		const nextLocation = this.path[this.currentLocationIndex + 1];

		return this.distanceCovered >= this.currentLocation.calculateDistanceTo(nextLocation);
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

	async allTravel(day: DayOfWeek, phase: TimeOfDay) {
		let travelingParties = Object.values(this.travelingParties).filter(party =>
            party?.party?.actionSequence?.[day]?.[phase] === LocationActionEnum.Travel
        );

		if (travelingParties.length === 0) return;

		travelingParties.sort ((a, b) => {
			let aSpeed = a.party.getPartyAverageAgility();
			let bSpeed = b.party.getPartyAverageAgility();
			return bSpeed - aSpeed;
		})

		for (const travelingParty of travelingParties) {
				await this.travel(travelingParty);
				this.checkPartyArrived(travelingParty);
		}
	}

	updateDistace(party: travelingParty, isEventHappened: boolean = false) {
		let region: Region;
		if (party.distanceCovered < 100) {
			region = getRegionFromName(party.currentLocation.mainRegion);
		} else {
			region = getRegionFromName(party.currentLocation.region);
		}

		const { travelSpeed, averageLuckModifier } = getTravelSpeedAndAverageLuckModifier(party);

		let deviation = Dice.roll(DiceEnum.OneD10).sum - 5;

		let thisTravelDistance = Math.max(0, travelSpeed + deviation);

		if (isEventHappened) {
			let progressFactor = thisTravelDistance / 100;
			let slowFactor = 1 - (Math.random() * progressFactor);
			thisTravelDistance *= slowFactor;
		}
		
		party.distanceCovered += thisTravelDistance;	
	}

	async travel(party: travelingParty) {
		// Early return if the party has no path or already arrived at the last location in the path. Which shouldn't happen.
		if (party.path.length === 0 || party.currentLocationIndex === party.path.length - 1) return;

		/*
			Game Phase Advancement:
			
			The game consists of **4 phases per day**, with each phase lasting **15 minutes in real life**. 
			At the start of each phase, the following events occur **in order**:

			1. Encounter Events:
			   - Any party with a **'justArrived' flag** has recently entered a location.
			   - **All 'justArrived' parties are shuffled randomly** to ensure fairness.
			   - One by one, each **randomly picks** an encounter partner from **any party** at the same location (including stationary ones).
			   - The selected pair resolves an **EncounterEvent** based on their relationship (battle, trade, or social interaction).
			   - **If the paired party was also 'justArrived',** it will no longer be available for future encounters in this phase.
			   - **This continues until all 'justArrived' parties are processed.**
			   - After resolving encounters, **all 'justArrived' flags are removed**.

			2. Stationary Actions:
			   - Any party **not traveling** resolves its actions for this phase.
			   - Examples: **Training, resting, trading, preparing for battle.**
			   - Stationary parties **can still be chosen** for Encounter Events.

			3. Travel:
			   - **All traveling parties move forward in their path.**
			   - **Order of movement:** Parties are sorted by **highest agility first.**
			   - **For each traveling party:**
			     1. **Determine if they will reach the next location** within this phase.
			     2. If **NOT reaching** the next location:
			        - Check for **random events** from the **current region's event pool.**
			        - If an event occurs, resolve it **before** continuing travel.
			        - The event **reduces the party’s travel distance**.
			     3. If **reaching** the next location:
			        - Check for **random events** from the **current region's event pool.**
			        - If an event occurs, resolve it **before** finalizing arrival.
			        - If the remaining distance **still allows reaching the next location** after the event, continue:
			            - Check for **random events** from the **new region's event pool**.
			            - If an event occurs, resolve it before the phase ends.
			        - If **no event happens,** the party simply arrives.
			   - **Upon arrival, the party is marked as 'justArrived'.**
			
			🔹 **Key Improvements in This System**
			   - **Encounter Order is Fair & Chaotic** → No bias toward high-luck parties.
			   - **Encounters Happen First** → Travel events don’t interfere with encounters.
			   - **Random Events Adjust Travel Distance Properly** → Ensuring region accuracy.
			   - **Agility Only Affects Travel Speed** → No impact on encounter order.
		*/

		// Check if random 'Event' happens during travel.
		let regionToUse: Region;
		if (party.distanceCovered < 100) {
			regionToUse = getRegionFromName(party.currentLocation.mainRegion);
		} else {
			regionToUse = getRegionFromName(party.currentLocation.region);
		}
		
		const randomEventChance = Dice.rollTwenty();
		let eventEnum = regionToUse.getRandomEvent(PartyActions.TRAVEL, randomEventChance);
		let isEventHappen = false;
		
		switch (eventEnum) {
			case LocationEventEnum.AttributeTrain:
				// TODO:
			case LocationEventEnum.ArtisanTrain:
				// TODO:
			case LocationEventEnum.ProficiencyTrain:
				// TODO:
			case LocationEventEnum.SkillTrain:
				// TODO:
			case LocationEventEnum.BattleEvent:
				const averageLuckModifier = getAverageLuckModifier(party);
				isEventHappen = await this._executeBattleEvent(party, averageLuckModifier);
				isEventHappen = true;
			case LocationEventEnum.TravelEvent:
				// TODO:
		}
		
		this.updateDistace(party, isEventHappen);
		
		if (!party.checkIfArrivingNextLocation()) {
			// Not arrived at next location, so might trigger random events
		} else {
			// Arrived at next location, might trigger encounter events
			party.arrivedNextLocation();
			const location = party.currentLocation;
			// let encounterEventHappened = location.checkAndTriggerEncounterEvent(party.party)
			
		}

		// Mood and energy decrease
		for (const character of party.party.characters) {
			let pace = party.party.behavior.travelPace;
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

	checkPartyArrived(travelingParty: travelingParty) {
		const nextLocation = travelingParty.getNextLocation();

		if (travelingParty.isTraveling === false) {
			return;
		}

		if (nextLocation === null) {
			// Shouldn't be happen?
			throw new Error(`Next location is null, partyID: ${travelingParty.party.partyID}`);
		}

		if (
			travelingParty.distanceCovered >=
			travelingParty.currentLocation.calculateDistanceTo(nextLocation)
		) {
			travelingParty.currentLocationIndex++;
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
			this.travelingParties[partyID].currentLocationIndex /
			(this.travelingParties[partyID].path.length - 1)
		);
	}

	getTravelTimeLeft(partyID: string): number {
		let remainingDistance = 0;
		let travelingParty = this.travelingParties[partyID];

		for (
			let i = travelingParty.currentLocationIndex;
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


// MARK: Helper functions
function getAverageLuckModifier(party: travelingParty): number {
	let totalLuck = 0;
	let allCharacters = 0;
	for (const character of party.party.characters) {
		if (character !== "none") {
			totalLuck += character.status.luck();
			allCharacters++;
		}
	}

	return StatMod.value(totalLuck / allCharacters)
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