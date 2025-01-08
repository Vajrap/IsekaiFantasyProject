import { Character } from "../../Entities/Character/Character";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { LocationActionEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { RegionNameEnum } from "../../../Common/DTOsEnumsInterfaces/Map/RegionNameEnum";
import { Party } from "../Party/Party";

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
}