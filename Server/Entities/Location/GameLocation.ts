import { Character } from "../../Entities/Character/Character";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { LocationActionEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { RegionNameEnum } from "../../../Common/DTOsEnumsInterfaces/Map/RegionNameEnum";
import { Party } from "../Party/Party";
import { PartyType } from "../Party/PartyType";
import { checkIfCombatInitiated } from "../../Game/Battle/Calculators/checkIfCombatInitiated";
import { executeTradeEvent } from "../Event/Trade/executeTradeEvent";

export class GameLocation {
    id: LocationName;
    description: string;
    actions: LocationActionEnum[];
    connectedLocations: { location: GameLocation, distance: number }[] = [];
    mainRegion: RegionNameEnum;
    region: RegionNameEnum;
    parties: Party[] = [];

    constructor(id: LocationName, description: string, actions: LocationActionEnum[], mainRegion: RegionNameEnum, region: RegionNameEnum) {
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
        let distanceToGo = 0
        for (const connectedLocation of this.connectedLocations) {
            if (connectedLocation.location === location) {
                distanceToGo = connectedLocation.distance
            }
        }
        if (distanceToGo === 0 ){ throw new Error('error Distance must not be 0') }
        return distanceToGo
    }

    partyMoveIn(party: Party) {
        const partyLeader = party.characters.find(character => character != 'none' && character.id === party.partyID);

        if (!partyLeader || partyLeader === undefined || partyLeader === 'none') { 
            throw new Error('Party leader not found') 
        }

        const isMoreThanOne = party.characters.filter(character => character !== 'none').length > 1;

        // TODO: Turns from console.log to logger that can be shown in the UI
        console.log(`${partyLeader.name} ${isMoreThanOne? 'and His party': ''} entered ${this.id}`);

        this.parties.push(party);

        // this.checkEncounterEvent(party);
    }

    partyMoveOut(party: Party) {
        const partyLeader = party.characters.find(character => character != 'none' && character.id === party.partyID);

        if (!partyLeader || partyLeader === undefined || partyLeader === 'none') { 
            throw new Error('Party leader not found') 
        }

        const isMoreThanOne = party.characters.filter(character => character !== 'none').length > 1;
        console.log(`${partyLeader.name} ${isMoreThanOne? 'and His party': ''} left ${this.id}`);

        this.parties = this.parties.filter(p => p !== party);
    }

    checkIfLocationConnected(location: GameLocation): boolean {
        return this.connectedLocations.some(loc => loc.location === location);
    }

    getAllCharactersInLocation(): Character[] {
        return this.parties.reduce((characters: Character[], party) => characters.concat(party.characters.filter(character => character !== 'none')), []);
    }

    getAllActions(): LocationActionEnum[] {
        return this.actions;
    }

    // Should separate into many checking functions, travelManager would check them one by one and execute the first one that returns true;
    // That meas, the event handler needed to be push out of this class
    async checkAndTriggerEncounterEvent(party: Party): Promise<boolean> {
        if (!this.parties.includes(party)) { throw new Error('Party not in location'); }
        for (const otherParty of this.parties) {
            if (otherParty !== party) {
                if (checkIfCombatInitiated(party, otherParty, otherParty.behavior.combatPolicy)) {
                    // console.log('Combat initiated');
                    // This should just send out the result of checking, not the battle itself
                    // gameEvent_battleEvent.execute({ 
                    //     party: party, 
                    //     enemyParty: otherParty, 
                    //     location: this.id 
                    // });
                    // return true;
                } 

                if (this.handleNeutralEncounter(party, otherParty)) {
                    return true;
                }
            }
        }
        return false;
    }

    private handleNeutralEncounter(partyA: Party, partyB: Party): boolean {
        const merchantTypes = new Set([PartyType.merchant]);
        const scholarTypes = new Set([PartyType.scholar, PartyType.hermit]);
        const militaryTypes = new Set([PartyType.knight, PartyType.soldier, PartyType.nobleRetinue]);
        const rogueTypes = new Set([PartyType.rogue, PartyType.bandit, PartyType.criminal, PartyType.raider]);
        const nobleTypes = new Set([PartyType.nobleRetinue]);
        const religiousTypes = new Set([PartyType.pilgrim, PartyType.hermit]);
        const laborTypes = new Set([PartyType.peasant, PartyType.artisan]);
    
        if (
            (merchantTypes.has(partyA.behavior.partyType) && !this.isHostile(partyB)) ||
            (merchantTypes.has(partyB.behavior.partyType) && !this.isHostile(partyA))
        ) {
            executeTradeEvent(partyA, partyB);
            return true;
        }
    
        if (scholarTypes.has(partyA.behavior.partyType) && scholarTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement knowledge exchange (increase intelligence, gain skills, share lore)
            return true;
        }
    
        if (militaryTypes.has(partyA.behavior.partyType) && militaryTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement friendly duels, combat training, or tactical discussions
            return true;
        }
    
        if (nobleTypes.has(partyA.behavior.partyType) && militaryTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement recruitment event where nobles hire knights or mercenaries
            return true;
        }
    
        if (rogueTypes.has(partyA.behavior.partyType) && rogueTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement underworld deals (black market trades, secretive missions, bounties)
            return true;
        }
    
        if (religiousTypes.has(partyA.behavior.partyType) && religiousTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement blessings, confessions, or divine favor system
            return true;
        }
    
        if (laborTypes.has(partyA.behavior.partyType) && merchantTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement crafting offers, trade deals, or job assignments
            return true;
        }
    
        //TODO: Handle situations where no action occurs but relations improve slightly over time
    
        return false;
    }
    
    private isHostile(party: Party): boolean {
        return [PartyType.bandit, PartyType.raider, PartyType.criminal].includes(party.behavior.partyType);
    }
}



