import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Enemy } from "../../Entities/Character/Enemy/Enemy";
import { Party } from "../../Entities/Party/Party";
import { screamer } from "../../Utility/Screamer/Screamer";

export enum BattleType {
  Normal = "Normal",
  Training = "Training",
  Arena = "Arena",
  Scripted = "Scripted",
  NoReward = "NoReward",
}

export const battleTypeConfig: Record<
  BattleType,
  {
    allowXP: boolean;
    allowLoot: boolean;
    resetHealth: boolean;
    allowDeath: boolean;
  }
> = {
  [BattleType.Normal]: {
    allowXP: true,
    allowLoot: true,
    resetHealth: false,
    allowDeath: true,
  },
  [BattleType.Training]: {
    allowXP: true,
    allowLoot: false,
    resetHealth: true,
    allowDeath: false,
  },
  [BattleType.Arena]: {
    allowXP: true,
    allowLoot: true,
    resetHealth: false,
    allowDeath: false,
  },
  [BattleType.Scripted]: {
    allowXP: true,
    allowLoot: true,
    resetHealth: false,
    allowDeath: true,
  },
  [BattleType.NoReward]: {
    allowXP: false,
    allowLoot: false,
    resetHealth: false,
    allowDeath: false,
  },
};

export const EVENT_BATTLE = "EVENT_BATTLE";

export function event_battle(
  partyA: Party,
  partyB: Party,
  location: LocationName,
  battleType: BattleType,
): void {
  screamer.scream(EVENT_BATTLE, {
    partyA: partyA,
    partyB: partyB,
    location: location,
    battleType: battleType,
  });
}

export function assignPreferredPosition(
  enemy: Enemy,
  possiblePositions: number[],
): number {
  let preferredPositions =
    enemy.preferredPosition === "front"
      ? possiblePositions.filter((pos) => pos < 3)
      : enemy.preferredPosition === "back"
        ? possiblePositions.filter((pos) => pos >= 3)
        : [...possiblePositions];

  if (preferredPositions.length === 0) {
    preferredPositions = [...possiblePositions]; // Fallback
  }

  return preferredPositions[
    Math.floor(Math.random() * preferredPositions.length)
  ];
}
