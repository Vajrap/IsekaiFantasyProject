import { Party } from "../../Entities/Party/Party";
import { BattleReport } from "./BattleReport";
import { ActiveSkill, PassiveSkill, Skill } from "../../Entities/Skills/Skill";
import { DamageTypes } from "../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { Character } from "../../Entities/Character/Character";
// import { EventEmitter } from "ws";
import { Dice } from "../../Utility/Dice";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { GameTimeInterface } from "../../../Common/DTOsEnumsInterfaces/GameTimeInterface";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { GameTime } from "../TimeAndDate/GameTime";
import { GameLocation } from "../../Entities/Location/GameLocation";
import { isSkillPlayable } from "./Calculators/isSkillPlayable";
import { resolveBuffsAndDebuffs } from "./EffectResolverAndAppender/resolveBuffsAndDebuffs";
import { skillRepository } from "../../Entities/Skills/SkillRepository";
import { BattleReportInterface } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { screamer } from "../../Utility/Screamer/Screamer";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { getLocationByName } from "../../Entities/Location/Locations";
import { BattleType, battleTypeConfig } from "../GameEvent/battleEvent";

enum BattleStatus {
  END = "END",
  DRAW_END = "DRAW_END",
  CONTINUE = "CONTINUE",
}

export const END_BATTLE = "EndBattle";

export class Battle {
  isOngoing: boolean;
  partyA: Party;
  partyB: Party;
  allParticipants: Character[];
  battleReport: BattleReport;
  UID: string;
  battlePromiseResolve!: (value: boolean | PromiseLike<boolean>) => void;
  battlePromiseReject!: (reason?: any) => void;
  // Battle Ended with winner party and losing party 'BOTH' gain experience
  //
  location: GameLocation;
  battleType: BattleType;
  // private eventEmitter = new EventEmitter();

  constructor(
    partyA: Party,
    partyB: Party,
    location: LocationName,
    gameTime: GameTimeInterface,
    battleType: BattleType,
  ) {
    this.isOngoing = true;
    this.partyA = partyA;
    this.partyB = partyB;
    this.allParticipants = [
      ...partyA.getPosssibleTargetsAsCharacterArray(),
      ...partyB.getPosssibleTargetsAsCharacterArray(),
    ];
    this.battleReport = new BattleReport(partyA, partyB, location, gameTime);
    this.sortParticipantsBySpeed();
    this.UID =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.location = getLocationByName(location);
    this.battleType = battleType;
  }

  async startBattle() {
    await this.battleLoop();
    const result = this.makeReportInterface(this.battleReport);
    // console.log(result.battleTurn);
    screamer.scream(END_BATTLE, result);
  }

  private sortParticipantsBySpeed() {
    this.allParticipants.sort((a, b) => {
      const rollA = Math.floor(Dice.roll(DiceEnum.OneD20).sum / 4);
      const rollB = Math.floor(Dice.roll(DiceEnum.OneD20).sum / 4);
      const speedA = rollA + a.attribute("agility");
      const speedB = rollB + b.attribute("agility");
      return speedB - speedA;
    });
  }

  private makeReportInterface(battle: BattleReport): BattleReportInterface {
    return {
      startingPartyAMembers: battle.startingPartyAMembers,
      partyAPlayer: battle.partyAPlayer,
      startingPartyBMembers: battle.startingPartyBMembers,
      partyBPlayer: battle.partyBPlayer,
      battleTurn: battle.battleTurn,
      location: battle.location,
      gameTime: battle.gameTime,
    };
  }

  /*
        battleLoop
        1. Loop through all participants
        2. Update their abGauge
        3. If abGauge >= 100, start actor's turn
            3.1. Resolve effect, if false(like being stunned), skip the turn
            3.2. determine skill that can be played
            3.3. determine target
            3.4. play skill
        4. Check battle end condition
        5. If battle is ongoing, continue the loop
    */

  private async battleLoop() {
    if (this.allParticipants.length === 0) {
      throw new Error("No participants found in the battle.");
    }

    this.isOngoing = true;
    let turnCount = 0;
    console.log(`Start Battle Loop for turn: ${turnCount}`);

    while (this.isOngoing) {
      if (turnCount >= 100) {
        console.log("Turn limit reached. Ending battle.");
        this.isOngoing = false;
        break;
      }

      for (const actor of this.allParticipants) {
        if (!actor || actor.isDead) {
          continue;
        }

        this.updateabGauge(actor);

        if (actor.abGauge >= 100) {
          turnCount++;
          console.log(`Turn: ${turnCount}`);

          // TODO: RESOLVE EFFECTS NOT AS ACTOR METHOD
          // Reset AB gauge and process the actor's turn
          actor.abGauge = 0;
          if (resolveBuffsAndDebuffs(actor)) {
            console.log(`${actor.name} takes turn.`);
            this.startActorTurn(actor);
            this.allParticipants.push(
              this.allParticipants.shift() as Character,
            );
          } else {
            console.log(`${actor.name} is unable to take turn.`);
          }

          // Check for battle end after the actor's turn
          const battleStatus = this.checkBattleEnd();
          if (
            battleStatus.status === BattleStatus.END ||
            battleStatus.status === BattleStatus.DRAW_END
          ) {
            this.isOngoing = false;
            this.handleBattleEnd(battleStatus);
            break;
          }
        }
      }

      if (!this.isOngoing) {
        break;
      }
    }
  }

  private handleBattleEnd(battleStatus: {
    status: BattleStatus;
    winner?: Party;
    defeated?: Party;
  }) {
    for (const actor of this.allParticipants) {
      actor.setAllBattleBonusToZero().clearBuffsAndDebuffs();
    }

    const battleType = battleTypeConfig[this.battleType];

    if (battleType.allowXP && battleStatus.winner && battleStatus.defeated) {
      this.battleEndedCalc(
        battleStatus.status,
        battleStatus.winner,
        battleStatus.defeated,
      );
    }

    if (battleType.allowLoot) {
    }

    if (!battleType.allowDeath) {
      for (const actor of this.allParticipants) {
        if (actor.isDead) {
          actor.isDead = false;
          actor.hpUp(1);
        }
      }
    }

    if (battleType.resetHealth) {
      for (const actor of this.allParticipants) {
        actor.isDead = false;
        actor.hpUp(actor.maxHP());
        actor.mpUp(actor.maxMP());
        actor.spUp(actor.maxSP());
      }
    }
  }

  private updateabGauge(actor: Character) {
    let abGaugeIncrement = Math.max(actor.status.agility(), 10);
    const hasteBuff = actor.buffsAndDebuffs.haste;
    const slowBuff = actor.buffsAndDebuffs.slow;
    const timeWarpBuff = actor.buffsAndDebuffs.timeWarp;
    if (hasteBuff > 0) {
      abGaugeIncrement *= Math.pow(2, hasteBuff);
    }
    if (slowBuff > 0) {
      abGaugeIncrement /= Math.pow(2, slowBuff);
    }
    if (timeWarpBuff > 0) {
      abGaugeIncrement += 25 * timeWarpBuff;
    }
    actor.abGauge += abGaugeIncrement;
  }

  //MARK: Start Actor Turn
  private startActorTurn(actor: Character) {
    actor.replenishResources();
    this.activePassiveSkillEffect(actor);

    let { skillThatCanBePlay, skillLevel } = this.getSkillThatCanBePlayForActor(
      actor,
      0,
    );

    this.actorRemoveResource(actor, skillThatCanBePlay, skillLevel);
    const result = skillThatCanBePlay.executor(
      actor,
      this.getSelfGroup(actor),
      this.getOppositeGroup(actor),
      skillLevel,
      { time: GameTime, location: this.location.id },
    );

    this.actorAddResource(actor, skillThatCanBePlay, skillLevel);

    this.battleReport.addTurn(result);
  }

  private activePassiveSkillEffect(actor: Character) {
    for (const skill of actor.activeSkills) {
      const skillObj = skillRepository.getSkill(skill.id);
      if (skillObj instanceof PassiveSkill) {
        skillObj.takingTurn(actor, skill.level);
      }
    }
  }

  private getSkillThatCanBePlayForActor(
    actor: Character,
    skillPosition?: number,
  ): {
    skillThatCanBePlay: ActiveSkill;
    skillLevel: number;
    skillPosition: number;
  } {
    if (!skillPosition) {
      skillPosition = 0;
    }

    if (skillPosition >= actor.activeSkills.length) {
      const isPhysic = actor.status.strength() > actor.status.planar();
      return isPhysic
        ? {
            skillThatCanBePlay: skillRepository.getAutoSkill("physical"),
            skillLevel: 1,
            skillPosition: 0,
          }
        : {
            skillThatCanBePlay: skillRepository.getAutoSkill("magical"),
            skillLevel: 1,
            skillPosition: 0,
          };
    }

    if (actor.activeSkills[skillPosition].type === "Passive") {
      return this.moveToNextSkill(actor, skillPosition);
    }

    const skillID = actor.activeSkills[skillPosition].id;
    const level = actor.activeSkills[skillPosition].level;

    const skill = skillRepository.getActiveSkill(skillID);

    if (!isSkillPlayable(actor, skill, level)) {
      return this.moveToNextSkill(actor, skillPosition);
    }

    return {
      skillThatCanBePlay: skill,
      skillLevel: level,
      skillPosition: skillPosition,
    };
  }

  private moveToNextSkill(
    actor: Character,
    skillPosition: number,
  ): {
    skillThatCanBePlay: ActiveSkill;
    skillLevel: number;
    skillPosition: number;
  } {
    skillPosition++;
    return this.getSkillThatCanBePlayForActor(actor, skillPosition);
  }

  private actorAddResource(
    actor: Character,
    skill: ActiveSkill,
    level: number,
  ) {
    if (!skill.produce) {
      return;
    }
    const { elements } = skill.produce;

    for (const { element, amountRange } of elements) {
      const amountRangeFromLevel = amountRange[level - 1];
      const amount =
        Math.floor(
          Math.random() *
            (amountRangeFromLevel[1] - amountRangeFromLevel[0] + 1),
        ) + amountRangeFromLevel[0];
      actor.resources[element as keyof typeof actor.resources] += amount;
    }
  }

  private actorRemoveResource(
    actor: Character,
    skill: ActiveSkill,
    level: number,
  ) {
    const { hp, mp, sp, elements } = skill.consume;
    if (hp[level - 1] != undefined && hp[level - 1] != 0) {
      actor.hpDown(actor, hp[level - 1], DamageTypes.resource);
    }
    if (mp[level - 1] != undefined && mp[level - 1] != 0) {
      actor.mpDown(mp[level - 1]);
    }
    if (sp[level - 1] != undefined && sp[level - 1] != 0) {
      actor.spDown(sp[level - 1]);
    }
    for (const { element, amount } of elements) {
      actor.resources[element as keyof typeof actor.resources] -=
        amount[level - 1];
    }
  }

  private checkBattleEnd(): {
    status: BattleStatus;
    winner?: Party;
    defeated?: Party;
  } {
    const allPartyADead = this.isAllPartyADead();
    const allPartyBDead = this.isAllPartyBDead();

    if (allPartyADead && allPartyBDead) {
      console.log(`Both parties are dead. The battle ends in a draw.`);
      return { status: BattleStatus.DRAW_END };
    }

    if (allPartyADead) {
      console.log(`Party A is dead. Party B wins.`);
      return {
        status: BattleStatus.END,
        winner: this.partyB,
        defeated: this.partyA,
      };
    }

    if (allPartyBDead) {
      console.log(`Party B is dead. Party A wins.`);
      return {
        status: BattleStatus.END,
        winner: this.partyA,
        defeated: this.partyB,
      };
    }

    return { status: BattleStatus.CONTINUE };
  }

  //MARK: Battle Ended
  private battleEndedCalc(
    battleStatus: BattleStatus,
    winnerParty: Party,
    defeatedParty: Party,
  ) {
    const possibleAttributesToBeTrained = [
      CharacterStatusEnum.strength,
      CharacterStatusEnum.agility,
      CharacterStatusEnum.endurance,
      CharacterStatusEnum.breath,
      CharacterStatusEnum.planar,
      CharacterStatusEnum.dexterity,
    ];

    const timesOfTraining = 3;
    const { winnerExp, loserExp } = this.experienceCalculation(
      battleStatus,
      winnerParty,
      defeatedParty,
    );

    const trainCharacters = (party: Party, exp: number) => {
      for (const character of party.characters.filter((c) => c !== "none")) {
        for (let i = 0; i < timesOfTraining; i++) {
          let trainedAttribute =
            possibleAttributesToBeTrained[
              Math.floor(Math.random() * possibleAttributesToBeTrained.length)
            ];
          character.train(trainedAttribute);
        }
      }
    };

    trainCharacters(winnerParty, winnerExp);
    trainCharacters(defeatedParty, loserExp);

    // TODO: Implement looting system
  }

  private getPartyStrength(party: Party): number {
    let partyLevel = 0;
    let partyLength = 0;
    for (let i = 0; i < party.characters.length; i++) {
      if (party.characters[i] !== "none") {
        break;
      } else {
        if (party.characters[i] !== "none") {
          partyLevel += (party.characters[i] as Character).level;
          partyLength++;
        }
      }
    }
    return partyLevel / partyLength;
  }

  private experienceCalculation(
    battleStatus: BattleStatus,
    winner: Party,
    loser: Party,
  ): { winnerExp: number; loserExp: number } {
    let baseExp = 30;

    let winner_ps = this.getPartyStrength(winner);
    let loser_ps = this.getPartyStrength(loser);

    let party_a_base_exp: number;
    let party_b_base_exp: number;
    let diff: number;

    if (winner_ps > loser_ps) {
      diff = winner_ps - loser_ps;
      let scale = diff * 0.05;
      party_a_base_exp = Math.max(baseExp - baseExp * scale, baseExp * 0.1);
      party_b_base_exp = baseExp + baseExp * scale;
    } else if (winner_ps < loser_ps) {
      diff = loser_ps - winner_ps;
      let scale = diff * 0.05;
      party_a_base_exp = baseExp + baseExp * scale;
      party_b_base_exp = Math.max(baseExp - baseExp * scale, baseExp * 0.1);
    } else {
      party_a_base_exp = baseExp;
      party_b_base_exp = baseExp;
    }

    let winnerExp = Math.floor(party_a_base_exp);
    let loserExp = Math.floor(party_b_base_exp);

    if (battleStatus === BattleStatus.DRAW_END) {
      winnerExp = Math.floor(winnerExp / 2);
      loserExp = Math.floor(loserExp / 2);
    } else {
      winnerExp = Math.floor(winnerExp);
      loserExp = Math.floor(loserExp / 2);
    }

    return { winnerExp, loserExp };
  }

  private isAllPartyADead() {
    const ifAllPartyADead = this.partyA.characters.every((actor) => {
      if (!actor || actor === "none" || actor.isDead) {
        return true;
      } else {
        return false;
      }
    });
    return ifAllPartyADead;
  }

  private isAllPartyBDead() {
    const ifAllPartyBDead = this.partyB.characters.every((actor) => {
      if (!actor || actor === "none" || actor.isDead) {
        return true;
      } else {
        return false;
      }
    });
    return ifAllPartyBDead;
  }

  private getOppositeGroup(actor: Character) {
    if (
      this.partyA.characters.some((a) => a && a !== "none" && a.id === actor.id)
    ) {
      return this.partyB;
    }
    if (
      this.partyB.characters.some((a) => a && a !== "none" && a.id === actor.id)
    ) {
      return this.partyA;
    } else {
      throw new Error(`Actor is not in any group`);
    }
  }

  private getSelfGroup(actor: Character) {
    if (
      this.partyA.characters.some((a) => a && a !== "none" && a.id === actor.id)
    ) {
      return this.partyA;
    }
    if (
      this.partyB.characters.some((a) => a && a !== "none" && a.id === actor.id)
    ) {
      return this.partyB;
    } else {
      throw new Error(`Actor is not in any group`);
    }
  }
}
