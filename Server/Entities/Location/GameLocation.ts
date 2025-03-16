import { Character } from "../../Entities/Character/Character";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { LocationActionEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { RegionNameEnum } from "../../../Common/DTOsEnumsInterfaces/Map/RegionNameEnum";
import { Party } from "../Party/Party";
import { PartyType } from "../Party/PartyType";
import { checkIfCombatInitiated } from "../../Game/Battle/Calculators/checkIfCombatInitiated";
import { executeTradeEvent } from "../Event/Trade/executeTradeEvent";
import {
	DayOfWeek,
	TimeOfDay,
} from "../../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { eventRepository } from "../../Game/GameEvent/Events";

export class GameLocation {
	id: LocationName;
	description: string;
	actions: LocationActionEnum[];
	connectedLocations: { location: GameLocation; distance: number }[] = [];
	mainRegion: RegionNameEnum;
	region: RegionNameEnum;
	parties: Party[] = [];

	constructor(
		id: LocationName,
		description: string,
		actions: LocationActionEnum[],
		mainRegion: RegionNameEnum,
		region: RegionNameEnum
	) {
		this.id = id;
		this.description = description;
		this.actions = actions;
		this.mainRegion = mainRegion;
		this.region = region;
	}

	addConnection(location: GameLocation, distance: number) {
		this.connectedLocations.push({ location, distance });
	}

	calculateDistanceTo(location: GameLocation): number {
		let distanceToGo = 0;
		for (const connectedLocation of this.connectedLocations) {
			if (connectedLocation.location === location) {
				distanceToGo = connectedLocation.distance;
			}
		}
		if (distanceToGo === 0) {
			throw new Error("error Distance must not be 0");
		}
		return distanceToGo;
	}

	partyMoveIn(party: Party) {
		const partyLeader = party.characters.find(
			(character) => character != "none" && character.id === party.partyID
		);

		if (!partyLeader || partyLeader === undefined || partyLeader === "none") {
			throw new Error("Party leader not found");
		}

		const isMoreThanOne =
			party.characters.filter((character) => character !== "none").length > 1;

		// TODO: Turns from console.log to logger that can be shown in the UI
		console.log(
			`${partyLeader.name} ${isMoreThanOne ? "and His party" : ""} entered ${
				this.id
			}`
		);

		this.parties.push(party);

		// this.checkEncounterEvent(party);
	}

	partyMoveOut(party: Party) {
		const partyLeader = party.characters.find(
			(character) => character != "none" && character.id === party.partyID
		);

		if (!partyLeader || partyLeader === undefined || partyLeader === "none") {
			throw new Error("Party leader not found");
		}

		const isMoreThanOne =
			party.characters.filter((character) => character !== "none").length > 1;
		console.log(
			`${partyLeader.name} ${isMoreThanOne ? "and His party" : ""} left ${
				this.id
			}`
		);

		this.parties = this.parties.filter((p) => p !== party);
	}

	checkIfLocationConnected(location: GameLocation): boolean {
		return this.connectedLocations.some((loc) => loc.location === location);
	}

	getAllCharactersInLocation(): Character[] {
		return this.parties.reduce(
			(characters: Character[], party) =>
				characters.concat(
					party.characters.filter((character) => character !== "none")
				),
			[]
		);
	}

	getAllActions(): LocationActionEnum[] {
		return this.actions;
	}

	checkAndTriggerEncounterEvent(partyA: Party, partyB: Party) {
		if (!this.parties.includes(partyA) && !this.parties.includes(partyB)) {
			throw new Error("Party not in location");
		}
		if (checkIfCombatInitiated(partyA, partyB)) {
			eventRepository.battleEvent(partyA, partyB, this.id);
			return;
		}
		this.handleNeutralEncounter(partyA, partyB);
		return;
	}

	private handleNeutralEncounter(partyA: Party, partyB: Party) {
		const merchantTypes = new Set([PartyType.merchant]);
		const scholarTypes = new Set([PartyType.scholar, PartyType.hermit]);
		const militaryTypes = new Set([
			PartyType.knight,
			PartyType.soldier,
			PartyType.nobleRetinue,
		]);
		const rogueTypes = new Set([
			PartyType.rogue,
			PartyType.bandit,
			PartyType.criminal,
			PartyType.raider,
		]);
		const nobleTypes = new Set([PartyType.nobleRetinue]);
		const religiousTypes = new Set([PartyType.pilgrim, PartyType.hermit]);
		const laborTypes = new Set([PartyType.peasant, PartyType.artisan]);

		if (
			(merchantTypes.has(partyA.behavior.partyType) &&
				!this.isHostile(partyB)) ||
			(merchantTypes.has(partyB.behavior.partyType) && !this.isHostile(partyA))
		) {
			executeTradeEvent(partyA, partyB);
			return;
		}

		if (
			scholarTypes.has(partyA.behavior.partyType) &&
			scholarTypes.has(partyB.behavior.partyType)
		) {
			//TODO: Implement knowledge exchange (increase intelligence, gain skills, share lore)
			return;
		}

		if (
			militaryTypes.has(partyA.behavior.partyType) &&
			militaryTypes.has(partyB.behavior.partyType)
		) {
			//TODO: Implement friendly duels, combat training, or tactical discussions
			return;
		}

		if (
			nobleTypes.has(partyA.behavior.partyType) &&
			militaryTypes.has(partyB.behavior.partyType)
		) {
			//TODO: Implement recruitment event where nobles hire knights or mercenaries
			return;
		}

		if (
			rogueTypes.has(partyA.behavior.partyType) &&
			rogueTypes.has(partyB.behavior.partyType)
		) {
			//TODO: Implement underworld deals (black market trades, secretive missions, bounties)
			return;
		}

		if (
			religiousTypes.has(partyA.behavior.partyType) &&
			religiousTypes.has(partyB.behavior.partyType)
		) {
			//TODO: Implement blessings, confessions, or divine favor system
			return;
		}

		if (
			laborTypes.has(partyA.behavior.partyType) &&
			merchantTypes.has(partyB.behavior.partyType)
		) {
			//TODO: Implement crafting offers, trade deals, or job assignments
			return;
		}

		//TODO: Handle situations where no action occurs but relations improve slightly over time
		return;
	}

	private isHostile(party: Party): boolean {
		return [PartyType.bandit, PartyType.raider, PartyType.criminal].includes(
			party.behavior.partyType
		);
	}

	async processEncounters(day: DayOfWeek, phase: TimeOfDay) {
		if (this.parties.length === 0) return;

		let justArrivedParties = this.parties
			.filter((party) => party.justArrived)
			.sort(() => Math.random() - 0.5);

		if (justArrivedParties.length === 0) return;

		let otherParties = this.parties.filter((party) => !party.justArrived);

		if (otherParties.length === 0 && justArrivedParties.length <= 1) return;

		let encounteredParties = new Set<Party>();

		if (justArrivedParties.length === 1 && otherParties.length === 1) {
			await this.checkAndTriggerEncounterEvent(
				justArrivedParties[0],
				otherParties[0]
			);
			justArrivedParties[0].justArrived = false;
			return;
		}

		if (otherParties.length === 0 && justArrivedParties.length === 2) {
			await this.checkAndTriggerEncounterEvent(
				justArrivedParties[0],
				justArrivedParties[1]
			);
			justArrivedParties[0].justArrived = false;
			justArrivedParties[1].justArrived = false;
			return;
		}

		for (let party of justArrivedParties) {
			if (encounteredParties.has(party)) continue;

			let potentialPartners = [
				...otherParties.filter((other) => !encounteredParties.has(other)),
				...justArrivedParties.filter(
					(other) => other !== party && !encounteredParties.has(other)
				),
			];

			if (potentialPartners.length === 0) continue;

			let partner =
				potentialPartners[Math.floor(Math.random() * potentialPartners.length)];

			this.checkAndTriggerEncounterEvent(party, partner);

			encounteredParties.add(party);
			encounteredParties.add(partner);
			party.justArrived = false;
			partner.justArrived = false;
		}
	}

	async processActions(day: DayOfWeek, phase: TimeOfDay): Promise<void> {
		if (this.parties.length === 0) return;

        for (let party of this.parties) {
            const action = party.actionSequence[day][phase];

            if (action === LocationActionEnum.Travel) return

            switch (action) {
                case LocationActionEnum.Camping:
                    break;
                case LocationActionEnum.HouseRest:
                    break;
                case LocationActionEnum.Inn:
                    break;
                case LocationActionEnum.Rest:
                    break;
                default:
                    break;
            }
        }
    }
}
