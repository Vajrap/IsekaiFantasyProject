import { Character } from "../../Entities/Character/Character";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
  LocationActionEnum,
  LocationEventEnum,
} from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
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
import { event_train } from "../../Game/GameEvent/trains";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { getRegionFromName } from "./Region";
import { StatMod } from "../../Utility/StatMod";
import { event_craft } from "../../Game/GameEvent/craftEvent";
import { learnSkill, trainSkill } from "../Character/Utils/skillFunctions";
import { Dice } from "../../Utility/Dice";
import { RelationEnum } from "../../../Common/DTOsEnumsInterfaces/Character/RelationEnums";

export enum LocationInnType {
  Poor = "Poor",
  Comfortable = "Comfortable",
  Premium = "Premium",
  Luxury = "Luxury",
  None = "None",
}

export class GameLocation {
  id: LocationName;
  description: string;
  actions: LocationActionEnum[];
  connectedLocations: { location: GameLocation; distance: number }[] = [];
  mainRegion: RegionNameEnum;
  region: RegionNameEnum;
  parties: Party[] = [];
  innType: LocationInnType = LocationInnType.None;

  constructor(
    id: LocationName,
    description: string,
    actions: LocationActionEnum[],
    mainRegion: RegionNameEnum,
    region: RegionNameEnum,
    innType?: LocationInnType,
  ) {
    this.id = id;
    this.description = description;
    this.actions = actions;
    this.mainRegion = mainRegion;
    this.region = region;
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

    // this.checkEncounterEvent(party);
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
      updateRelation(partyA, partyB, 2);
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

      if (action.type === LocationActionEnum.Travel) return;

      switch (action.type) {
        case LocationActionEnum.Camping:
          let camp_randomEvent = determineRandomEvent(
            this.region,
            party,
            "rest",
          );
          if (camp_randomEvent !== LocationEventEnum.None) {
            executeRandomEventFromLocationEventEnum(camp_randomEvent);
            break;
          } else {
            event_rest_camp(party);
            break;
          }
        case LocationActionEnum.HouseRest:
          let house_randomEvent = determineRandomEvent(
            this.region,
            party,
            "rest",
          );
          if (house_randomEvent !== LocationEventEnum.None) {
            executeRandomEventFromLocationEventEnum(house_randomEvent);
            break;
          } else {
            event_rest_house(party);
            break;
          }
        case LocationActionEnum.Inn:
          if (this.innType === LocationInnType.None) {
            console.warn(
              `Error: Inn type 'Non' for location ${this.id}, party ${party.partyID}`,
            );
            return;
          }
          let inn_randomEvent = determineRandomEvent(
            this.region,
            party,
            "rest",
          );
          if (inn_randomEvent !== LocationEventEnum.None) {
            executeRandomEventFromLocationEventEnum(inn_randomEvent);
            break;
          }
          switch (this.innType) {
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
            default:
              console.warn(
                `Error: Inn type '${this.innType}' not found for location ${this.id}, party ${party.partyID}`,
              );
              break;
          }
          break;
        case LocationActionEnum.Rest:
          event_rest_force(party);
          break;
        case LocationActionEnum.TrainArtisan ||
          LocationActionEnum.TrainAttribute ||
          LocationActionEnum.TrainProficiency ||
          LocationActionEnum.TrainSkill:
          const statTrainingPlayerCharacter = party.getPlayerCharacter();
          if (!statTrainingPlayerCharacter) return;
          event_train(
            statTrainingPlayerCharacter,
            action.detail as CharacterStatusEnum,
          );
          break;
        case LocationActionEnum.LearnSkill:
          const learningPlayerCharacter = party.getPlayerCharacter();
          if (!learningPlayerCharacter) return;
          learnSkill(learningPlayerCharacter, action.detail);
          break;
        case LocationActionEnum.TrainSkill:
          const trainingPlayerCharacter = party.getPlayerCharacter();
          if (!trainingPlayerCharacter) return;
          trainSkill(trainingPlayerCharacter, action.detail);
          break;
        case LocationActionEnum.Craft:
          event_craft(party);
          break;
        default:
          break;
      }
    }
  }
}

function determineRandomEvent(
  regionName: RegionNameEnum,
  party: Party,
  action: "travel" | "rest" | "train" | "stroll",
): LocationEventEnum {
  return getRegionFromName(regionName).getRandomEvent(
    action,
    StatMod.value(party.getPartyAverageLuck()),
  );
}

function executeRandomEventFromLocationEventEnum(
  eventEnum: LocationEventEnum,
): Function {
  return () => {};
}

function updateRelation(partyA: Party, partyB: Party, amount: number) {
  for (const baseCharacter of partyA.characters) {
    if (baseCharacter != "none") {
      for (const targetCharacter of partyB.characters) {
        if (targetCharacter != "none") {
          baseCharacter.relation[targetCharacter.id].value += amount;
        }
      }
    }
  }
}

function updateStatus(characterA: Character, characterB: Character) {
  const value =
    (characterA.relation[characterB.id].value +
      characterB.relation[characterA.id].value) /
    2;

  const specialRelation = [
    RelationEnum.Lover,
    RelationEnum.Spouse,
    RelationEnum.RomanticInterest,
    RelationEnum.SecretAdmirer,
    RelationEnum.Hirer,
    RelationEnum.Hired,
  ];

  let a_to_b = characterA.relation[characterB.id].status;
  let b_to_a = characterB.relation[characterA.id].status;
  if (specialRelation.includes(a_to_b) || specialRelation.includes(b_to_a))
    return;

  const relationStatusMap = new Map<[number, number], RelationEnum>([
    [[-100, -81], RelationEnum.Nemesis],
    [[-80, -61], RelationEnum.BitterRival],
    [[-60, -41], RelationEnum.Hostile],
    [[-40, -21], RelationEnum.Disliked],
    [[-20, 19], RelationEnum.Neutral],
    [[20, 39], RelationEnum.Acquaintance],
    [[40, 59], RelationEnum.Familiar],
    [[60, 79], RelationEnum.Friend],
    [[80, 95], RelationEnum.CloseFriend],
    [[96, 100], RelationEnum.TrustedCompanion],
  ]);

  for (const [[min, max], status] of relationStatusMap) {
    if (value >= min && value <= max) {
      characterA.relation[characterB.id].status = status;
      characterB.relation[characterA.id].status = status;
      break;
    }
  }
}
