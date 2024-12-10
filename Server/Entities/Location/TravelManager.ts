import { TravelWebSocketService } from "../../API/WebSocket/TravelWebSocketService";
import { Dice } from "../Utility/Dice";
import { Region } from "./Region";
import { CharacterStatus } from "../../Entities/Character/Subclasses/CharacterStatus";
import { StatMod } from "../Utility/StatMod";

export enum TravelMethod {
    walk = 'walk',
    horse = 'horse',
    caravan = 'caravan'
}

//Party.travelManager = new TravelManager();
//When Player start a travel, it's actually the party that start the travel
//The party would then call methods, like party.travelManager.initiateTravel(path: string[], characterStatus: CharacterStatus, travelMethod: TravelMethod)

export class TravelManager {
    partyID: string;
    path: GameLocation[] = [];
    currentLocation: GameLocation;
    currentLocationIndex: number = -1;
    distanceCovered: number = 0;
    wsService: TravelWebSocketService;
    isTraveling: boolean = false;
    currentTravelMethod: TravelMethod;

    constructor(partyID: string, currentLocation: GameLocation) {
        this.partyID = partyID;
        this.currentLocation = currentLocation;
        this.wsService = travelWebSocketService;
        this.currentTravelMethod = TravelMethod.walk;
    }

    addLocationToPath(location: GameLocation):boolean {
        if (this.path.length === 0) {
            if (this.currentLocation.checkIfLocationConnected(location)) {
                this.path.push(location);
                return true;
            } else {
                console.log('Location not connected:', location.name);
                return false;
            }
        } else {
            let lastLocation = this.path[this.path.length - 1];
            if (lastLocation.checkIfLocationConnected(location)) {
                this.path.push(location);
                return true;
            } else {
                console.log('Location not connected:', location.name);
                return false;
            }
        }
    }

    removeLocationFromPath(location: GameLocation):boolean {
        //Can only remove the location at the last position of the path
        if (this.path[this.path.length - 1] === location) {
            this.path.pop();
            return true;
        } else {
            return false;
        }
    }

    async travel(status: CharacterStatus, travelMethod: TravelMethod) {
        if (this.path.length === 0) {
            console.log('No path set');
            return;
        }
        
        this.isTraveling = true;

        const nextLocation = this.path[this.currentLocationIndex + 1];

        const randomEventChance = Dice.roll('1d20').sum;
        let isRandomEventSuccess = true;

        let regionToUse: Region;
        if (this.distanceCovered < 100) {
            regionToUse = this.currentLocation.mainRegion;
        } else {
            regionToUse = this.currentLocation.region;
        }

        if (randomEventChance <= 5) {
            const bonusChance = StatMod.value(status.luck());

            const event = regionToUse.getRandomEvent('travel', bonusChance);
            if (event !== undefined) {
                isRandomEventSuccess = await event.executeFromParty(this.partyID);
            }
        }

        const baseTravelSpeed = 100;
        const speedBonus = StatMod.value(status.agility());

        if (isRandomEventSuccess) {
            this.distanceCovered += 
            this.distanceCovered += baseTravelSpeed + speedBonus + this.getSpeedModifierFromRegion(regionToUse, travelMethod);
            this.checkIfArrived(nextLocation);
        } else {
            console.log('Travel event failed');
        }
    }

    getSpeedModifierFromRegion(region: Region, travelMethod: TravelMethod): number {
        let speedModifier = 0;
        speedModifier = region.getSpeedBonusModifire(travelMethod);
        return speedModifier;
    }

    checkIfArrived(targetLocation: GameLocation) {
        if (this.distanceCovered >= this.currentLocation.calculateDistanceTo(targetLocation)) {
            this.currentLocationIndex++;
            this.currentLocation = this.path[this.currentLocationIndex];
            this.distanceCovered = 0;
            this.wsService.broadcast(JSON.stringify({
                type: 'location_arrival',
                partyID: this.partyID,
                location: this.currentLocation.name
            }));
        } else {
            this.wsService.broadcast(JSON.stringify({
                type: 'travel_update',
                partyID: this.partyID,
                currentLocation: this.currentLocation.name,
                distanceCovered: this.distanceCovered
            }));
        }

        if (this.currentLocationIndex === this.path.length - 1) {
            this.arrivedAtDestination();
        }
    }

    arrivedAtDestination() {
        console.log('Arrived at destination:', this.path[this.path.length - 1].name);
        this.isTraveling = false;
        this.wsService.broadcast(JSON.stringify({
            type: 'destination_arrival',
            partyID: this.partyID,
            destination: this.path[this.path.length - 1].name
        }));
    }

    getTravelProgress(): number {
        return this.currentLocationIndex / (this.path.length - 1);
    }

    getTravelTimeLeft(travelSpeed: number): number {
        let remainingDistance = 0;
        for (let i = this.currentLocationIndex; i < this.path.length - 1; i++) {
            remainingDistance += this.path[i].calculateDistanceTo(this.path[i + 1]);
        }
        return remainingDistance / travelSpeed;
    }
}

//WS Specs
// {
//     type: 'travel_update',
//     partyID: string,
//     currentLocation: string,
//     distanceCovered: number
// }
// {
//     type: 'location_arrival',
//     partyID: string,
//     location: string
// }
// {
//     type: 'destination_arrival',
//     partyID: string,
//     destination: string
// }
