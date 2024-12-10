import { Dice } from "../Utility/Dice";
import { LocationEventEnum } from "../Utility/Enum/LocationActions+Events"
import { MobCharacterEnum } from "../Utility/Enum/MobCharacterEnum";
import { RegionNameEnum } from "../Utility/Enum/RegionNameEnum";

export class RegionSpeedBonus {
    walk: number;
    horse: number;
    caravan: number;
    constructor(walk: number, horse: number, caravan: number) {
        this.walk = walk;
        this.horse = horse;
        this.caravan = caravan;
    }
}

export class Region {
    name: RegionNameEnum
    events: {
        rest: {event: LocationEventEnum, chanceCeiling: number}[],
        stroll: {event: LocationEventEnum, chanceCeiling: number}[],
        train: {event: LocationEventEnum, chanceCeiling: number}[],
        travel: {event: LocationEventEnum, chanceCeiling: number}[],
    }
    possibleEnemies: MobCharacterEnum[]
    speedBonus: RegionSpeedBonus
    constructor(
        name: RegionNameEnum,
        events: {
            rest: {event: LocationEventEnum, chanceCeiling: number}[],
            stroll: {event: LocationEventEnum, chanceCeiling: number}[],
            train: {event: LocationEventEnum, chanceCeiling: number}[],
            travel: {event: LocationEventEnum, chanceCeiling: number}[],
        },
        possibleEnemies: MobCharacterEnum[],
        speedBonus: RegionSpeedBonus
    ) {
        this.name = name
        this.events = events
        this.possibleEnemies = possibleEnemies
        this.speedBonus = speedBonus
    }

    getRandomEvent(action: string, bonusChance: number = 0): LocationEventEnum {
        const randomRollSum = Dice.roll('1d20').sum + bonusChance;


        for (const event of this.events[action as keyof Region["events"]]){
            if (randomRollSum <= event.chanceCeiling) {
                return event.event
            }
        }
        throw new Error('No event found, The Region events are not set up correctly')
    }

    getSpeedBonusModifire(travelMethod: 'walk' | 'horse' | 'caravan' ): number {
        switch (travelMethod) {
            case 'walk':
                return this.speedBonus.walk;
            case 'horse':
                return this.speedBonus.horse;
            case 'caravan':
                return this.speedBonus.caravan;
            default:
                return 0;
        }
    }
    
    rollForEnemies(bonusRoll: number): MobCharacterEnum[] {
        const enemies: MobCharacterEnum[] = []
        const numberOfEnemies = this.rollNumberOfEnemies(bonusRoll)
        for (let i = 0; i < numberOfEnemies; i++) {
            const randomIndex = Math.floor(Math.random() * this.possibleEnemies.length)
            enemies.push(this.possibleEnemies[randomIndex])
        }
        return enemies
    }

    rollNumberOfEnemies(bonusRoll: number): number {
        const roll = Dice.roll('1d20').sum + bonusRoll;
        if (roll >= 18) return 1;
        if (roll >= 15) return 2;
        if (roll >= 11) return 3;
        if (roll >= 7) return 4;
        if (roll >= 4) return 5;
        return 6;               
    }
    
}
