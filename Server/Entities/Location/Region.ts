import { Dice } from "../../Utility/Dice";
import { LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { RegionNameEnum } from "../../../Common/DTOsEnumsInterfaces/Map/RegionNameEnum";
import { MobCharacterEnum } from "../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { TravelMethodEnum } from "../../../Common/DTOsEnumsInterfaces/Map/TravelMethodEnum";

export enum PartyActions {
    TRAVEL = 'travel',
    REST = 'rest',
    TRAIN = 'train',
}
export class Region {
    name: RegionNameEnum
    // When we get event, we first check what kind of action the player is doing
    // Example, travel, the possible events will be from array of eventsByAction.travel
    // Then we roll a dice to get a random event
    eventsByAction: {
        travel: {event: LocationEventEnum, chanceCeiling: number}[],
        rest: {event: LocationEventEnum, chanceCeiling: number}[],
        train: {event: LocationEventEnum, chanceCeiling: number}[],
    }
    possibleEnemies: MobCharacterEnum[]
    speedBonus: RegionSpeedBonus
    constructor(
        name: RegionNameEnum,
        eventsByAction: {
            travel: {event: LocationEventEnum, chanceCeiling: number}[],
            rest: {event: LocationEventEnum, chanceCeiling: number}[],
            train: {event: LocationEventEnum, chanceCeiling: number}[],
        },
        possibleEnemies: MobCharacterEnum[],
        speedBonus: RegionSpeedBonus
    ) {
        this.name = name
        this.eventsByAction = eventsByAction
        this.possibleEnemies = possibleEnemies
        this.speedBonus = speedBonus
    }

    getRandomEvent(action: PartyActions, bonusChance: number = 0): LocationEventEnum {
        const randomRollSum = Dice.rollTwenty() + bonusChance;
        const eventList = this.eventsByAction[action]
        for (const event of eventList) {
            if (randomRollSum <= event.chanceCeiling) {
                return event.event
            }
        }
        return LocationEventEnum.None;
    }

    getSpeedBonusModifire(travelMethod: TravelMethodEnum ): number {
        switch (travelMethod) {
            case TravelMethodEnum.walk:
                return this.speedBonus.walk;
            case TravelMethodEnum.horse:
                return this.speedBonus.horse;
            case TravelMethodEnum.caravan:
                return this.speedBonus.caravan;
            default:
                return 0;
        }
    }
    
    rollForEnemies(bonusRoll: number): {enemyList: MobCharacterEnum[], enemyCombatPolicy: "engage" | "strategic" | "evasive"} {
        const enemies: MobCharacterEnum[] = []
        const numberOfEnemies = this.rollNumberOfEnemies(bonusRoll)
        for (let i = 0; i < numberOfEnemies; i++) {
            const randomIndex = Math.floor(Math.random() * this.possibleEnemies.length)
            enemies.push(this.possibleEnemies[randomIndex])
        }
        let diceRoll = Dice.rollTwenty()
        const enemyCombatPolicy = diceRoll < 7 ? "engage" : diceRoll < 15 ? "strategic" : "evasive"
        return {enemyList: enemies, enemyCombatPolicy}
    }

    rollNumberOfEnemies(bonusRoll: number): number {
        const roll = Dice.rollTwenty() + bonusRoll;
        if (roll >= 18) return 1;
        if (roll >= 15) return 2;
        if (roll >= 11) return 3;
        if (roll >= 7) return 4;
        if (roll >= 4) return 5;
        return 6;               
    }
    
}

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


// export enum RegionNameEnum {
//     GrassLand_1 = 'Grass Land 1',
//     GrassLand_2 = 'Grass Land 2',
//     GrassLand_3 = 'Grass Land 3',
//     Forest_1 = 'Forest 1',
//     Forest_2 = 'Forest 2',
//     Forest_3 = 'Forest 3',
//     Mountain_1 = 'Mountain 1',
//     Mountain_2 = 'Mountain 2',
//     Mountain_3 = 'Mountain 3',
//     Desert_1 = 'Desert 1',
//     Desert_2 = 'Desert 2',
//     Desert_3 = 'Desert 3',
//     SnowPlain_1 = 'Snow Plain 1',
//     SnowPlain_2 = 'Snow Plain 2',
//     SnowPlain_3 = 'Snow Plain 3',
//     OceanTide = 'Ocean Tide',
//     MistGarde = 'Mist Garde',
//     BerrisGrove = 'Berris Grove',
//     EmberFalls = 'Ember Falls',
//     SmoothShore = 'Smooth Shore',
//     WhiteOakEstate = 'White Oak Estate',
//     IvoryForest = 'Ivory Forest',
//     CelestialSwordSect = 'Celestial Sword Sect',
//     FairViewFarm = 'Fair View Farm',
//     SaltyLake = 'Salty Lake',
//     Fyornar = 'Fyornar',
//     TheTrident = 'The Trident',
//     GreatWhiteCrossing = 'Great White Crossing',
//     BleakWatch = 'Bleak Watch',
//     Goldhem = 'Goldhem',
//     SleekMeadow = 'Sleek Meadow',
//     SleetWallows = 'Sleet Wallows',
//     FreeAppleWood = 'Free Apple Wood',
//     MightGrave = 'Might Grave',
//     NarrowBridge = 'Narrow Bridge',
//     CloudShade = 'Cloud Shade',
//     MountHeaven = 'Mount Heaven',
//     SpiritSide = 'Spirit Side',
//     ShadowKeep = 'Shadow Keep',
//     LittleGiant = 'Little Giant',
//     UmbralVeil = 'Umbral Veil',
//     SpringPoint = 'Spring Point',
//     LushWood = 'Lush Wood',
//     PineBorn = 'Pine Born',
//     HeartfeltPond = 'Heartfelt Pond',
//     MadPass = 'Mad Pass',
//     BlueSkyMountainSect = 'Blue Sky Mountain Sect'
// }

function makeDummyRegion(): Region {
    const dummyRegion = new Region(
        RegionNameEnum.GrassLand_1,
        {
            travel: [{ event: LocationEventEnum.None, chanceCeiling: 15 }],
            rest: [{ event: LocationEventEnum.RestCamp, chanceCeiling: 20 }],
            train: [{ event: LocationEventEnum.AttributeTrain, chanceCeiling: 20 }],
        },
        [],
        new RegionSpeedBonus(1, 3, 2),
    );
    return dummyRegion;
}

const region_grassLand_1 = makeDummyRegion();
const region_grassLand_2 = makeDummyRegion();
const region_grassLand_3 = makeDummyRegion();
const region_forest_1 = makeDummyRegion();
const region_forest_2 = makeDummyRegion();
const region_forest_3 = makeDummyRegion();
const region_mountain_1 = makeDummyRegion();
const region_mountain_2 = makeDummyRegion();
const region_mountain_3 = makeDummyRegion();
const region_desert_1 = makeDummyRegion();
const region_desert_2 = makeDummyRegion();
const region_desert_3 = makeDummyRegion();
const region_snowPlain_1 = makeDummyRegion();
const region_snowPlain_2 = makeDummyRegion();
const region_snowPlain_3 = makeDummyRegion();
const region_oceanTide = makeDummyRegion();
const region_mistGarde = makeDummyRegion();
const region_berrisGrove = makeDummyRegion();
const region_emberFalls = makeDummyRegion();
const region_smoothShore = makeDummyRegion();
const region_whiteOakEstate = makeDummyRegion();
const region_ivoryForest = makeDummyRegion();
const region_celestialSwordSect = makeDummyRegion();
const region_fairViewFarm = makeDummyRegion();
const region_saltyLake = makeDummyRegion();
const region_fyornar = makeDummyRegion();
const region_theTrident = makeDummyRegion();
const region_greatWhiteCrossing = makeDummyRegion();
const region_bleakWatch = makeDummyRegion();
const region_goldhem = makeDummyRegion();
const region_sleekMeadow = makeDummyRegion();
const region_sleetWallows = makeDummyRegion();
const region_freeAppleWood = makeDummyRegion();
const region_mightGrave = makeDummyRegion();
const region_narrowBridge = makeDummyRegion();
const region_cloudShade = makeDummyRegion();
const region_mountHeaven = makeDummyRegion();
const region_spiritSide = makeDummyRegion();
const region_shadowKeep = makeDummyRegion();
const region_littleGiant = makeDummyRegion();
const region_umbralVeil = makeDummyRegion();
const region_springPoint = makeDummyRegion();
const region_lushWood = makeDummyRegion();
const region_pineBorn = makeDummyRegion();
const region_heartfeltPond = makeDummyRegion();
const region_madPass = makeDummyRegion();
const region_blueSkyMountainSect = makeDummyRegion();

export const regions = [
    region_grassLand_1,
    region_grassLand_2,
    region_grassLand_3,
    region_forest_1,
    region_forest_2,
    region_forest_3,
    region_mountain_1,
    region_mountain_2,
    region_mountain_3,
    region_desert_1,
    region_desert_2,
    region_desert_3,
    region_snowPlain_1,
    region_snowPlain_2,
    region_snowPlain_3,
    region_oceanTide,
    region_mistGarde,
    region_berrisGrove,
    region_emberFalls,
    region_smoothShore,
    region_whiteOakEstate,
    region_ivoryForest,
    region_celestialSwordSect,
    region_fairViewFarm,
    region_saltyLake,
    region_fyornar,
    region_theTrident,
    region_greatWhiteCrossing,
    region_bleakWatch,
    region_goldhem,
    region_sleekMeadow,
    region_sleetWallows,
    region_freeAppleWood,
    region_mightGrave,
    region_narrowBridge,
    region_cloudShade,
    region_mountHeaven,
    region_spiritSide,
    region_shadowKeep,
    region_littleGiant,
    region_umbralVeil,
    region_springPoint,
    region_lushWood,
    region_pineBorn,
    region_heartfeltPond,
    region_madPass,
    region_blueSkyMountainSect
]

export function getRegionFromName(name: RegionNameEnum): Region {
    const region = regions.find(region => region.name === name)
        if (!region) {
            throw new Error('Region not found')
        }
        return region
}