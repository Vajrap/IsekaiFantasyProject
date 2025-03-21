import { Party } from "../../Entities/Party/Party";
import { BattleReport } from "./BattleReport";
import {
  ActorSkillEffect,
  TargetSkillEffect,
  ActionDetailsInterface,
} from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { skillRepository } from "../../Entities/Skills/SkillRepository";
import { Skill } from "../../Entities/Skills/Skill";
import { DamageTypes } from "../../../Common/DTOsEnumsInterfaces/DamageTypes";
import {
  Character,
  consumeActionObject,
} from "../../Entities/Character/Character";
import {
  TargetPartyType,
  TargetType,
} from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { EventEmitter } from "ws";
import { SkillActionType } from "../../Entities/Skills/SubClasses/SkillActiveEffect";
import { Dice } from "../../Utility/Dice";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { GameEnvironment } from "../../../Common/DTOsEnumsInterfaces/Map/GameEnvironment";
import { GameTimeInterface } from "../../../Common/DTOsEnumsInterfaces/GameTimeInterface";
import { createActionDetailsInterface } from "../../API/BattleReportDTO";
import { TargetSelectionProcess } from "./TargetSelectionProcess";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";

enum BattleStatus {
  END = "END",
  DRAW_END = "DRAW_END",
  CONTINUE = "CONTINUE",
}

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

  private eventEmitter = new EventEmitter();

  constructor(
    partyA: Party,
    partyB: Party,
    location: LocationName,
    gameTime: GameTimeInterface,
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
  }

  on(event: string, listener: (...args: any[]) => void) {
    this.eventEmitter.on(event, listener);
  }

  off(event: string, listener: (...args: any[]) => void) {
    this.eventEmitter.off(event, listener);
  }

  emit(event: string, ...args: any[]) {
    this.eventEmitter.emit(event, ...args);
  }

  sortParticipantsBySpeed() {
    this.allParticipants.sort((a, b) => {
      const rollA = Math.floor(Dice.roll(DiceEnum.OneD20).sum / 4);
      const rollB = Math.floor(Dice.roll(DiceEnum.OneD20).sum / 4);
      const speedA = rollA + a.attribute("agility");
      const speedB = rollB + b.attribute("agility");
      return speedB - speedA;
      // Descending order, highest speed first
    });
  }

  async startBattle(): Promise<BattleReport> {
    try {
      await this.battleLoop();
      return this.battleReport;
    } catch (error) {
      throw error;
    }
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

          // Reset AB gauge and process the actor's turn
          actor.abGauge = 0;
          if (actor.resolveEffect().success) {
            console.log(`${actor.name} takes turn.`);
            await this.startActorTurn(actor);
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

    if (battleStatus.status === BattleStatus.END) {
      console.log(
        `Winner: ${battleStatus.winner?.partyID}, Defeated: ${battleStatus.defeated?.partyID}`,
      );
      this.emit("battleEnd", this.battleReport);
    } else if (battleStatus.status === BattleStatus.DRAW_END) {
      console.log("Battle ended in a draw.");
      this.emit("battleEnd", this.battleReport);
    }
  }

  updateabGauge(actor: Character) {
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
  async startActorTurn(actor: Character) {
    /*
            when actor takes turn it,
            1. gains resources from elements modifier
            2. looping through skill in activeSkills and check if any can be played get the first one that can be played
                2.1 if none can be played, play auto attack skill.
            3. determine target, based on target type
                3.1 if no target found, end the turn.
            4. play skill
        */
    //1. Gain Resource from elements modifier
    actor.replenishResources();

    //2. Loop through skills to get a skill that can be played this must return Skill,
    //even if there is no valid skill in the set, this still must return auto attack skill.
    let { skillThatCanBePlay, skillLevel } =
      await actor.getSkillThatCanBePlay();
    if (skillThatCanBePlay.activeEffect.length === 0) {
      throw new Error(`No active effect found for ${actor.name}`);
    }

    //3. Determine consumeActionObject
    const target = this.getTargetFromTargetType(
      actor,
      skillThatCanBePlay.activeEffect[0].targetTypes,
      this.getSelfGroup(actor),
      this.getOppositeGroup(actor),
    );

    //3.1 If no target found, end the turn
    if (target.length === 0) {
      console.log(`No valid target found for ${actor.name}, ending turn.`);
      return;
    }

    //4th. Play Skill
    const actionDetails = await this.actorPlayActiveSkill(
      actor,
      target,
      skillThatCanBePlay,
      skillLevel,
    );

    //5th. Add actionDetails to battleReport: Battle Report will collect every events that happen in the battle
    //Then the report will be send to the client, so the client can display the battle in the frontend
    if (actionDetails.actionDetails) {
      this.battleReport.addTurn(actionDetails.actionDetails);
    }
  }

  private getTargetFromTargetType(
    actor: Character,
    targetType: TargetType,
    selfGroup: Party,
    oppositeGroup: Party,
    exception: Character[] = [],
  ): Character[] {
    const isConfused = actor.buffsAndDebuffs.confuse > 0;

    const mustTargetOpposite = isConfused
      ? Dice.roll(DiceEnum.OneD2).sum === 1
      : false;

    switch (targetType.targetPartyOrSelf) {
      case TargetPartyType.Self:
        return [actor];
      case TargetPartyType.Ally:
      case TargetPartyType.Enemy:
        const targetGroup = mustTargetOpposite
          ? targetType.targetPartyOrSelf === TargetPartyType.Ally
            ? oppositeGroup
            : selfGroup
          : targetType.targetPartyOrSelf === TargetPartyType.Ally
            ? selfGroup
            : oppositeGroup;
        let targetSelection = new TargetSelectionProcess(
          targetGroup,
          actor,
          targetType,
          exception,
        );
        return targetSelection.targets;
      default:
        throw new Error(
          `TargetType ${targetType.targetPartyOrSelf} is not implemented`,
        );
    }
  }

  async actorPlayActiveSkill(
    actor: Character,
    targets: Character[],
    skill: Skill,
    skillLevel: number,
  ): Promise<{
    skill: { skillID: string; level: number };
    skillObject: Skill | null;
    actionDetails: ActionDetailsInterface | null;
  }> {
    if (targets.length === 0) {
      console.log(`No target found for ${actor.name}`);
      return {
        skill: { skillID: skill.id, level: skillLevel },
        skillObject: skill,
        actionDetails: null,
      };
    }

    console.log(`${actor.name} is using ${skill.name}`);

    let positiveTargets: Character[] = [];
    let negativeTargets: Character[] = [];
    let castMessage = `${actor.name} ${skill.isSpell ? "is casting" : "is using"} ${skill.name}`;
    let sequenceMessages: string[] = [];

    //TODO: Implement these, for Frontend
    let actorSkillEffects: ActorSkillEffect[] = [];
    let positiveTargetSkillEffects: TargetSkillEffect[] = [];
    let negativeTargetSkillEffects: TargetSkillEffect[] = [];

    for (const activeEffect of skill.activeEffect) {
      for (const actionObject of activeEffect.skillActionObjects) {
        for (const target of targets) {
          let consumedResult = consumeActionObject(
            actor,
            actionObject,
            skillLevel,
            target,
            skill.isSpell,
            skill.isWeaponAttack,
            skill.isAuto,
          );

          const isHealing = actionObject.type === SkillActionType.Positive;
          const actionVerb = isHealing ? "heals" : "deals";
          const criticalVerb = isHealing ? "Critical Heal!" : "Critical Hit!";

          sequenceMessages.push(
            `${actor.name} ${actionVerb} ${consumedResult.damageObjectResult.baseDamage} ${consumedResult.damageObjectResult.damageType} damage to ${target.name} ${consumedResult.damageObjectResult.isHit ? "" : "but missed"} ${consumedResult.damageObjectResult.isCrit ? criticalVerb : ""}`,
          );
        }
      }
    }

    try {
      this.actorRemoveResource(actor, skill, skillLevel);
    } finally {
      this.actorAddResource(actor, skill, skillLevel);
    }

    let actionDetails = createActionDetailsInterface(
      actor,
      negativeTargets,
      positiveTargets,
      actorSkillEffects,
      negativeTargetSkillEffects,
      positiveTargetSkillEffects,
      castMessage,
      sequenceMessages,
    );

    return {
      skill: { skillID: skill.id, level: skillLevel },
      skillObject: skill,
      actionDetails,
    };
  }

  async actorMoveToNextActiveSkill(
    actor: Character,
    skillPosition: number,
    selfParty: Party,
    oppositeParty: Party,
    targets: Character[],
  ): Promise<{
    skill: { skillID: string; level: number };
    skillObject: Skill | null;
    actionDetails: ActionDetailsInterface | null;
  }> {
    skillPosition++;

    if (skillPosition >= actor.activeSkills.length) {
      let skillObject =
        actor.attribute("strength") > actor.attribute("planar")
          ? skillRepository.getSkill("auto_physical")
          : skillRepository.getSkill("auto_magical");

      console.log(`Available target length: ${targets.length}`);
      return await this.actorPlayActiveSkill(
        actor,
        targets,
        await skillObject,
        1,
      );
    } else {
      let skill = actor.activeSkills[skillPosition];
      return await this.actorPlayActiveSkill(
        actor,
        targets,
        skill.skill,
        skill.level,
      );
    }
  }

  actorAddResource(actor: Character, skill: Skill, level: number) {
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

  actorRemoveResource(actor: Character, skill: Skill, level: number) {
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

  checkBattleEnd(): { status: BattleStatus; winner?: Party; defeated?: Party } {
    const allPartyADead = this.isAllPartyADead();
    const allPartyBDead = this.isAllPartyBDead();

    if (allPartyADead && allPartyBDead) {
      console.log(`Both parties are dead. The battle ends in a draw.`);
      return { status: BattleStatus.DRAW_END };
    }

    if (allPartyADead) {
      console.log(`Party A is dead. Party B wins.`);
      this.battleEndedCalc(this.partyB, this.partyA);
      return {
        status: BattleStatus.END,
        winner: this.partyB,
        defeated: this.partyA,
      };
    }

    if (allPartyBDead) {
      console.log(`Party B is dead. Party A wins.`);
      this.battleEndedCalc(this.partyA, this.partyB);
      return {
        status: BattleStatus.END,
        winner: this.partyA,
        defeated: this.partyB,
      };
    }

    return { status: BattleStatus.CONTINUE };
  }

  //MARK: Battle Ended
  battleEndedCalc(winnerParty: Party, defeatedParty: Party) {
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

  getPartyStrength(party: Party): number {
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

  experienceCalculation(
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
    let loserExp = Math.floor(party_b_base_exp / 2);

    return { winnerExp, loserExp };
  }

  // isAllPartyADead() {
  //     const ifAllPartyADead = this.partyA.characters.every(actor => !actor || actor === "none" || actor.isDead);
  //     console.log('Checking if all party A members are dead or invalid: ', ifAllPartyADead);
  //     return ifAllPartyADead;
  // }

  // isAllPartyBDead() {
  //     const ifAllPartyBDead = this.partyB.characters.every(actor => !actor || actor === "none" || actor.isDead);
  //     console.log('Checking if all party B members are dead or invalid: ', ifAllPartyBDead);
  //     return ifAllPartyBDead;
  // }
  isAllPartyADead() {
    const ifAllPartyADead = this.partyA.characters.every((actor) => {
      if (!actor || actor === "none" || actor.isDead) {
        return true;
      } else {
        return false;
      }
    });
    return ifAllPartyADead;
  }

  isAllPartyBDead() {
    const ifAllPartyBDead = this.partyB.characters.every((actor) => {
      if (!actor || actor === "none" || actor.isDead) {
        return true;
      } else {
        return false;
      }
    });
    return ifAllPartyBDead;
  }

  getOppositeGroup(actor: Character) {
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

  getSelfGroup(actor: Character) {
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
