import { Character } from "../../Entities/Character/Character";
import { LocationName } from "../../../Common/Enums/Map/LocationNames";
import { LocationActionEnum } from "../../../Common/Enums/Map/LocationActions+Events";
import { RegionNameEnum } from "../../../Common/Enums/Map/RegionNameEnum";
import { Party } from "../Party/Party";

export class GameLocation {
    id: LocationName;
    description: string;
    actions: LocationActionEnum[];
    connectedLocations: { location: GameLocation, distance: number }[] = [];
    mainRegion: RegionNameEnum;
    region: RegionNameEnum;
    characters: Character[] = [];

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

    characterMoveIn(character: Character) {
        console.log(`${character.name} entered ${this.id}`);
        character.location = this.id;
        this.characters.push(character);
    }

    partyMoveIn(party: Party) {
        const partyLeader = party.characters.find(character => character != 'none' && character.id === party.partyID);
        if (!partyLeader || partyLeader === undefined || partyLeader === 'none') { throw new Error('Party leader not found') }
        const isMoreThanOne = party.characters.filter(character => character !== 'none').length > 1;
        console.log(`${partyLeader.name} ${isMoreThanOne? 'and His party': ''} entered ${this.id}`);
        party.characters.forEach(character => {
            if (character !== 'none') {
                character.location = this.id;
                this.characters.push(character);
            }
        });
    }

    characterMoveOut(character: Character) {
        console.log(`${character.name} left ${this.id}`);
        this.characters = this.characters.filter(char => char !== character);
        character.location = LocationName.None;
    }

    partyMoveOut(party: Party) {
        const partyLeader = party.characters.find(character => character != 'none' && character.id === party.partyID);
        if (!partyLeader || partyLeader === undefined || partyLeader === 'none') { throw new Error('Party leader not found') }
        const isMoreThanOne = party.characters.filter(character => character !== 'none').length > 1;
        console.log(`${partyLeader.name} ${isMoreThanOne? 'and His party': ''} left ${this.id}`);
        party.characters.forEach(character => {
            if (character !== 'none') {
                this.characters = this.characters.filter(char => char !== character);
                character.location = LocationName.None;
            }
        });
    }

    checkIfLocationConnected(location: GameLocation): boolean {
        return this.connectedLocations.some(loc => loc.location === location);
    }
}