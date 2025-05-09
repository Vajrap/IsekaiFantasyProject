import { Character } from "../../Entities/Character/Character";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { LocationActionEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { RegionNameEnum } from "../../../Common/DTOsEnumsInterfaces/Map/RegionNameEnum";
import { Party } from "../Party/Party";
import { PartyType } from "../Party/PartyType";
import { checkIfCombatInitiated } from "../../Game/Battle/Calculators/checkIfCombatInitiated";
import {
  DayOfWeek,
  TimeOfDay,
} from "../../../Common/DTOsEnumsInterfaces/TimeOfDay";
import {
  event_rest_camp,
  event_rest_force,
  event_rest_house,
  event_rest_inn_comfortable,
  event_rest_inn_luxury,
  event_rest_inn_poor,
  event_rest_inn_premium,
} from "../../Game/GameEvent/restEvents";
import { BattleType, event_battle } from "../../Game/GameEvent/battleEvent";
import { executeTradeEvent } from "../../Game/Trade/executeTradeEvent";
import { Dice } from "../../Utility/Dice";
import { updateRelation } from "../Character/Utils/updateRelation";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { exchangeKnowledge } from "../Information/exchangeKnowledge";
import { getRegionFromName } from "./Region";
import { StatMod } from "../../Utility/StatMod";
import { getEnemyFromRepository } from "../Character/Enemy/EnemyRepository";
import { learnSkill } from "../Character/Utils/skillFunctions";
import { event_train } from "../../Game/GameEvent/trains";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { event_craft } from "../../Game/GameEvent/craftEvent";
import { assignPreferredPosition } from "../../Game/GameEvent/battleEvent";
import { didRandomEventTrigger } from "./didRandomEventTrigger";
import { Enemy } from "../Character/Enemy";

export enum LocationInnType {
  Poor = "Poor",
  Comfortable = "Comfortable",
  Premium = "Premium",
  Luxury = "Luxury",
  None = "None",
}

export class GameLocation {
  id: LocationName;
  actions: LocationActionEnum[];
  description: string;
  connectedLocations: { location: GameLocation; distance: number }[] = [];
  mainRegion: RegionNameEnum;
  region: RegionNameEnum;
  parties: Party[] = [];
  innType: LocationInnType = LocationInnType.None;
  eventDC: number;

  constructor(
    id: LocationName,
    description: string,
    actions: LocationActionEnum[],
    mainRegion: RegionNameEnum,
    region: RegionNameEnum,
    eventDC?: number,
    innType?: LocationInnType,
  ) {
    this.id = id;
    this.description = description;
    this.actions = actions;
    this.mainRegion = mainRegion;
    this.region = region;
    this.eventDC = eventDC ? eventDC : 10;
    innType ? (this.innType = innType) : (this.innType = LocationInnType.None);
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
      (character) => character != "none" && character.id === party.partyID,
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
      }`,
    );

    this.parties.push(party);
  }

  partyMoveOut(party: Party) {
    const partyLeader = party.characters.find(
      (character) => character != "none" && character.id === party.partyID,
    );

    if (!partyLeader || partyLeader === undefined || partyLeader === "none") {
      throw new Error("Party leader not found");
    }

    const isMoreThanOne =
      party.characters.filter((character) => character !== "none").length > 1;
    console.log(
      `${partyLeader.name} ${isMoreThanOne ? "and His party" : ""} left ${
        this.id
      }`,
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
          party.characters.filter((character) => character !== "none"),
        ),
      [],
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
      event_battle(partyA, partyB, this.id, BattleType.Normal);
      return;
    }
    this.handleNeutralEncounter(partyA, partyB);
    return;
  }

  private handleNeutralEncounter(partyA: Party, partyB: Party) {
    const typeA = partyA.behavior.partyType;
    const typeB = partyB.behavior.partyType;

    const isScholar = (type: PartyType) =>
      [PartyType.scholar, PartyType.hermit].includes(type);
    const isMilitary = (type: PartyType) =>
      [PartyType.knight, PartyType.soldier, PartyType.nobleRetinue].includes(
        type,
      );
    const isMerchant = (type: PartyType) => type === PartyType.merchant;
    const isRogue = (type: PartyType) =>
      [
        PartyType.rogue,
        PartyType.bandit,
        PartyType.criminal,
        PartyType.raider,
      ].includes(type);
    const isNoble = (type: PartyType) => type === PartyType.nobleRetinue;
    const isReligious = (type: PartyType) =>
      [PartyType.pilgrim, PartyType.hermit].includes(type);
    const isLabor = (type: PartyType) =>
      [PartyType.peasant, PartyType.artisan].includes(type);

    if (
      (isMerchant(typeA) && !this.isHostile(partyB)) ||
      (isMerchant(typeB) && !this.isHostile(partyA))
    ) {
      executeTradeEvent(partyA, partyB);
      exchangeKnowledge(partyA, partyB);
    }

    if (isScholar(typeA) && isScholar(typeB)) {
      exchangeKnowledge(partyA, partyB, "scholarly");
    }

    if (isMilitary(typeA) && isMilitary(typeB)) {
      exchangeKnowledge(partyA, partyB, "military");
    }

    if (isNoble(typeA) && isMilitary(typeB)) {
      exchangeKnowledge(partyA, partyB, "military");
    }

    if (isMilitary(typeA) && isNoble(typeB)) {
      exchangeKnowledge(partyA, partyB, "military");
    }

    if (isRogue(typeA) && isRogue(typeB)) {
      exchangeKnowledge(partyA, partyB, "underworld");
    }

    if (isReligious(typeA) && isReligious(typeB)) {
      exchangeKnowledge(partyA, partyB, "religious");
    }

    if (isLabor(typeA) && isLabor(typeB)) {
      exchangeKnowledge(partyA, partyB, "folk");
    }

    updateRelation(partyA, partyB, Dice.roll(DiceEnum.OneD2).sum);
    return;
  }

  private isHostile(party: Party): boolean {
    return [PartyType.bandit, PartyType.raider, PartyType.criminal].includes(
      party.behavior.partyType,
    );
  }

  async processEncounters() {
    if (this.parties.length < 2) return;

    const shuffled = [...this.parties].sort(() => Math.random() - 0.5);

    const candidates = shuffled.filter((party) => Dice.rollTwenty() % 2 === 1);

    if (candidates.length < 2) return;

    const encountered = new Set<Party>();
    for (let i = 0; i < candidates.length - 1; i++) {
      const candidateA = candidates[i];
      if (encountered.has(candidateA)) continue;

      for (let j = i + 1; j < candidates.length; j++) {
        const candidateB = candidates[j];
        if (encountered.has(candidateB)) continue;

        this.checkAndTriggerEncounterEvent(candidateA, candidateB);
        encountered.add(candidateA);
        encountered.add(candidateB);
      }
    }
  }

  async processActions(day: DayOfWeek, phase: TimeOfDay): Promise<void> {
    if (this.parties.length === 0) return;

    for (let party of this.parties) {
      const action = party.actionSequence[day][phase];

      if (!this.actions.includes(action.type)) {
        console.warn(
          `Party with ID:${party.partyID} Action: ${action.type} at ${day}: ${phase} not allowed in ${this.id};`,
        );
        action.type = LocationActionEnum.Rest;
      }

      if (action.type === LocationActionEnum.Travel) return;

      switch (action.type) {
        case LocationActionEnum.Rest ||
          LocationActionEnum.Inn ||
          LocationActionEnum.Camping ||
          LocationActionEnum.HouseRest:
          handleRestAction(party, this, action.type);
          break;
        case LocationActionEnum.TrainAttribute ||
          LocationActionEnum.TrainProficiency ||
          LocationActionEnum.TrainArtisan ||
          LocationActionEnum.TrainSkill:
          handleTrainAction(party, this, action.detail);
          break;
        case LocationActionEnum.LearnSkill:
          handleLearnSkillAction(party, this, action.detail);
          break;
        case LocationActionEnum.Craft:
          handleCraftAction(party, this);
          break;
        case LocationActionEnum.None:
          event_rest_force(party);
          break;
        case LocationActionEnum.Stroll:
          handleStrollAction(party, this);
          break;
      }
    }
  }
}
function handleRandomEvent(party: Party, location: GameLocation) {
  const region = getRegionFromName(location.region);
  const event = region.getRandomEvent();
  event.effect(party);
}

function handleRestAction(
  party: Party,
  location: GameLocation,
  restType:
    | LocationActionEnum.Rest
    | LocationActionEnum.Camping
    | LocationActionEnum.HouseRest
    | LocationActionEnum.Inn,
) {
  if (didRandomEventTrigger(location.eventDC, "train")) {
    handleRandomEvent(party, location);
  } else {
    switch (restType) {
      case LocationActionEnum.Rest:
        event_rest_force(party);
        break;
      case LocationActionEnum.Camping:
        event_rest_camp(party);
        break;
      case LocationActionEnum.HouseRest:
        event_rest_house(party);
        break;
      case LocationActionEnum.Inn:
        switch (location.innType) {
          case LocationInnType.None:
            event_rest_force(party);
            break;
          case LocationInnType.Poor:
            event_rest_inn_poor(party);
            break;
          case LocationInnType.Comfortable:
            event_rest_inn_comfortable(party);
            break;
          case LocationInnType.Premium:
            event_rest_inn_premium(party);
            break;
          case LocationInnType.Luxury:
            event_rest_inn_luxury(party);
            break;
        }
    }
  }
}

function handleTrainAction(
  party: Party,
  location: GameLocation,
  detail: string,
) {
  if (didRandomEventTrigger(location.eventDC, "train")) {
    handleRandomEvent(party, location);
  } else {
    const playerCharacter = party.getPlayerCharacter();
    if (playerCharacter === "none") return;
    event_train(playerCharacter, detail as CharacterStatusEnum);
  }
}

function handleLearnSkillAction(
  party: Party,
  location: GameLocation,
  detail: string,
) {
  if (didRandomEventTrigger(location.eventDC, "learn")) {
    handleRandomEvent(party, location);
  } else {
    const learningPlayerCharacter = party.getPlayerCharacter();
    if (!learningPlayerCharacter) return;
    if (learningPlayerCharacter === "none") return;
    learnSkill(learningPlayerCharacter, detail);
  }
}

function handleCraftAction(party: Party, location: GameLocation) {
  if (didRandomEventTrigger(location.eventDC, "craft")) {
    handleRandomEvent(party, location);
  } else {
    event_craft(party);
  }
}

function handleStrollAction(party: Party, location: GameLocation) {
  handleRandomEvent(party, location);
}

export function handleBattleEvent(party: Party, location: GameLocation) {
  const region = getRegionFromName(location.region);
  const { enemyList, enemyCombatPolicy } = region.rollForEnemies(
    StatMod.value(party.getPartyAverageLuck()),
  );

  if (enemyList.length === 0) return;

  let possiblePositions = [0, 1, 2, 3, 4, 5];
  const enemies = enemyList.map(getEnemyFromRepository);
  const firstEnemyPosition = assignPreferredPosition(
    enemies[0] as Enemy,
    possiblePositions,
  );

  const enemyParty = new Party([enemies[0]], location.id, firstEnemyPosition);
  possiblePositions = possiblePositions.filter(
    (pos) => pos !== firstEnemyPosition,
  );

  for (let i = 1; i < enemies.length; i++) {
    const pos = assignPreferredPosition(enemies[i] as Enemy, possiblePositions);
    enemyParty.addCharacterToParty(enemies[i], pos);
    possiblePositions = possiblePositions.filter((p) => p !== pos);
  }

  event_battle(party, enemyParty, location.id, BattleType.Normal);
}
