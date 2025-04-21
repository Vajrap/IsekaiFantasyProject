import { Dice } from "../../Utility/Dice";
import { RegionNameEnum } from "../../../Common/DTOsEnumsInterfaces/Map/RegionNameEnum";
import { MobCharacterEnum } from "../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { TravelMethodEnum } from "../../../Common/DTOsEnumsInterfaces/Map/TravelMethodEnum";
import { shuffle } from "../../Utility/util";
import { RandomEventCard } from "../RandomEventCard/RandomEventCard";

export enum PartyActions {
  TRAVEL = "travel",
  REST = "rest",
  TRAIN = "train",
}

export class Region {
  name: RegionNameEnum;
  randomEventsDeck: RandomEventCard[];
  discardedEventCards: RandomEventCard[] = [];
  possibleEnemies: MobCharacterEnum[];
  speedBonus: RegionSpeedBonus;
  constructor(
    name: RegionNameEnum,
    randomEvents: RandomEventCard[],
    possibleEnemies: MobCharacterEnum[],
    speedBonus: RegionSpeedBonus,
  ) {
    this.name = name;
    this.randomEventsDeck = shuffle(randomEvents);
    this.possibleEnemies = possibleEnemies;
    this.speedBonus = speedBonus;
  }

  getRandomEvent(): RandomEventCard {
    if (this.randomEventsDeck.length === 0) {
      this.randomEventsDeck = shuffle(this.discardedEventCards);
    }

    const event = this.randomEventsDeck[0];
    this.discardedEventCards.push(event);
    this.randomEventsDeck.shift();

    return event;
  }

  getSpeedBonusModifire(travelMethod: TravelMethodEnum): number {
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

  rollForEnemies(bonusRoll: number): {
    enemyList: MobCharacterEnum[];
    enemyCombatPolicy: "engage" | "strategic" | "evasive";
  } {
    const enemies: MobCharacterEnum[] = [];
    const numberOfEnemies = this.rollNumberOfEnemies(bonusRoll);
    for (let i = 0; i < numberOfEnemies; i++) {
      const randomIndex = Math.floor(
        Math.random() * this.possibleEnemies.length,
      );
      enemies.push(this.possibleEnemies[randomIndex]);
    }
    let diceRoll = Dice.rollTwenty();
    const enemyCombatPolicy =
      diceRoll < 7 ? "engage" : diceRoll < 15 ? "strategic" : "evasive";
    return { enemyList: enemies, enemyCombatPolicy };
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

function makeDummyRegion(): Region {
  const dummyRegion = new Region(
    RegionNameEnum.GrassLand_1,
    [],
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
  region_blueSkyMountainSect,
];

export function getRegionFromName(name: RegionNameEnum): Region {
  const region = regions.find((region) => region.name === name);
  if (!region) {
    throw new Error("Region not found");
  }
  return region;
}
