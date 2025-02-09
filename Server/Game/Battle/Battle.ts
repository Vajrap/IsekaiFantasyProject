import { Party } from "../../Entities/Party/Party";
import { BattleReport } from "./BattleReport";
import { ActionDetails, ActorSkillEffect, TargetSkillEffect } from "../../API/BattleReportDTO";
import { skillRepository } from "../../Entities/Skills/SkillRepository";
import { Skill } from "../../Entities/Skills/Skill";
import { DamageTypes } from "../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { Character, consumeActionObject } from "../../Entities/Character/Character";
import { TargetPartyType, TargetType } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { EventEmitter } from "ws";
import { SkillActionType } from "../../Entities/Skills/SubClasses/SkillActiveEffect";
import { Dice } from "../../Utility/Dice";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { GameEnvironment } from "../../../Common/DTOsEnumsInterfaces/Map/GameEnvironment";
import { TimeOfDay } from "../../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { GameTimeInterface } from "../../../Common/DTOsEnumsInterfaces/GameTimeInterface";
export class Battle {
    isOngoing: boolean;
    partyA: Party;
    partyB: Party;
    allParticipants: Character[];
    battleReport: BattleReport
    UID: string;
    battlePromiseResolve!: (value: boolean | PromiseLike<boolean>) => void;
    battlePromiseReject!: (reason?: any) => void;
    private eventEmitter = new EventEmitter();

    constructor(
        partyA: Party, 
        partyB: Party,
        location: LocationName,
        environment: GameEnvironment,
        gameTime: GameTimeInterface
    ) {
        this.isOngoing = true;
        this.partyA = partyA;
        this.partyB = partyB;
        this.allParticipants = [...partyA.getPosssibleTargetsAsCharacterArray(), ...partyB.getPosssibleTargetsAsCharacterArray()];
        this.battleReport = new BattleReport(partyA, partyB, location, environment, gameTime);
        this.sortParticipantsBySpeed();
        this.UID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

    startBattle(): Promise<BattleReport> {
        return new Promise((resolve, reject) => {
            try {
                this.battleLoop();
                resolve(this.battleReport); // Resolve the promise when the battle is over
            } catch (error) {
                reject(error);
            }
        });
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
        this.isOngoing = true;
        let turnCount = 0;
        console.log(`Start Battle Loop for turn: ${turnCount}`);
    
        while (this.isOngoing) {
            for (const actor of this.allParticipants) {
                if (!actor || actor.isDead) {
                    continue;
                }
    
                // Update AB gauge for the actor
                this.updateabGauge(actor);
    
                if (actor.abGauge >= 100) {
                    turnCount++;
                    console.log(`Turn: ${turnCount}`);
    
                    // Optional turn limit check
                    if (turnCount >= 100) {
                        console.log('Turn limit reached. Ending battle.');
                        this.isOngoing = false;
                        break;
                    }
    
                    // Reset AB gauge and process the actor's turn
                    actor.abGauge = 0;
                    const index = this.allParticipants.indexOf(actor);
                    this.allParticipants.push(this.allParticipants.splice(index, 1)[0]);
    
                    if (actor.resolveEffect().success === true) {
                        console.log(`${actor.name} takes turn.`);
                        await this.startActorTurn(actor); // Actor takes their turn
                    } else {
                        console.log(`${actor.name} is unable to take turn.`);
                    }
    
                    // Check for battle end after the actor's turn
                    const battleStatus = this.checkBattleEnd();
                    if (battleStatus.result === 'End') {
                        this.isOngoing = false;

                        for (const actor of this.allParticipants) {
                            actor.setAllBattleBonusToZero()
                                .clearBuffsAndDebuffs();
                        }
    
                        if (battleStatus.outcome === 'WIN') {
                            console.log(`Winner: ${battleStatus.winner?.partyID}, Defeated: ${battleStatus.defeated?.partyID}`);
                            this.emit("battleEnd", this.battleReport);
                        } else if (battleStatus.outcome === 'DRAW') {
                            console.log('Battle ended in a draw.');
                            this.emit("battleEnd", this.battleReport);
                        }
                        break;
                    }
                }
            }
    
            // End battle if not ongoing
            if (!this.isOngoing) {
                break;
            }
        }
    }
    
    // private async battleLoop() {
    //     this.isOngoing = true;
    //     let turnCount = 0;
    //     console.log(`Start Battle Loop for turn: ${turnCount}`);
    
    //     while (this.isOngoing) {
    //         // Loop through all participants to update their AB gauge
    //         for (const actor of this.allParticipants) {
    //             // Skip if the actor is not valid or is dead
    //             if (!actor || actor.isDead) {
    //                 continue;
    //             }
    
    //             // Update AB gauge for the actor
    //             this.updateabGauge(actor);
    
    //             // Check if the actor is ready to act (AB gauge >= 100)
    //             if (actor.abGauge >= 100) {
    //                 turnCount++;
    //                 console.log(`Turn: ${turnCount}`);
    
    //                 // Turn limit condition (Optional, if there's a max turn rule)
    //                 if (turnCount >= 100) {
    //                     console.log('Turn limit reached. Ending battle.');
    //                     this.isOngoing = false;
    //                     break;
    //                 }
    
    //                 // Reset the AB gauge after the actor's turn starts
    //                 actor.abGauge = 0;
    
    //                 // Move actor to the end of the participant queue
    //                 const index = this.allParticipants.indexOf(actor);
    //                 this.allParticipants.push(this.allParticipants.splice(index, 1)[0]);
    
    //                 // Check if actor can resolve effect (e.g., skip turn if stunned)
    //                 if (actor.resolveEffect()) {
    //                     console.log(`Effect Resolved: ${actor.name} takes turn.`);
    //                     await this.startActorTurn(actor); // Handle the actor's turn
    //                 } else {
    //                     console.log(`${actor.name} is unable to take turn.`);
    //                 }
    
    //                 // After the actor takes the turn, check if the battle should end
    //                 const isBattleEnd = this.checkBattleEnd();
    //                 switch (isBattleEnd) {
    //                     case 'End':
    //                         this.isOngoing = false;
    //                         break;
    //                     case 'Continue':
    //                         this.isOngoing = true;
    //                         break;
    //                 }
    //             }
    //         }
    
    //         // If the battle is no longer ongoing or the turn limit is reached, exit the loop
    //         if (!this.isOngoing) {
    //             break;
    //         }
    //     }
    
    //     // End turn and check battle outcome
    //     // this.endTurnCheck();
    //     this.emit("battleEnd", this.battleReport); // Emit the final report at the end of the battle
    // }

    updateabGauge(actor: Character) {
        let abGaugeIncrement = Math.max(actor.status.agility(), 1);
        const hasteBuff = actor.buffsAndDebuffs.haste;
        const slowBuff = actor.buffsAndDebuffs.slow
        const timeWarpBuff = actor.buffsAndDebuffs.timeWarp;
        if (hasteBuff > 0) {
            abGaugeIncrement *= 2;
        }
        if (slowBuff > 0) {
            abGaugeIncrement /= 2;
        }
        if (timeWarpBuff > 0) {
            abGaugeIncrement += 25;
        }
        actor.abGauge += abGaugeIncrement;
    }

    //MARK: Start Actor Turn
    async startActorTurn(actor: Character, iteration = 0) {
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
        let {skillThatCanBePlay, skillLevel, skillPosition} = await actor.getSkillThatCanBePlay();
        
        //3. Determine consumeActionObject
        const target = this.getTargetFromTargetType(
            actor, 
            skillThatCanBePlay.activeEffect[0].targetTypes, 
            this.getSelfGroup(actor), 
            this.getOppositeGroup(actor)
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
            this.getSelfGroup(actor), 
            this.getOppositeGroup(actor), 
            skillThatCanBePlay, 
            skillLevel,
            skillPosition
        );

        //5th. Add actionDetails to battleReport: Battle Report will collect every events that happen in the battle
        //Then the report will be send to the client, so the client can display the battle in the frontend
        if (actionDetails.actionDetails) {
            this.battleReport.addTurn(actionDetails.actionDetails);
        }
    }

    private getTargetFromTargetType(actor: Character, targetType: TargetType, selfGroup: Party, oppositeGroup: Party, exception: Character[] = []): Character[] {
        const isConfused = actor.buffsAndDebuffs.confuse > 0;

        let mustTargetOpposite = false;

        if (isConfused) {
            console.log (`${actor.name} is confused and must roll a D2 to determine the target group.`);
            const roll = Dice.roll(DiceEnum.OneD2).sum;
            console.log(`${actor.name} rolled a ${roll} for confusion check.`);
            if (roll === 1) {
                mustTargetOpposite = true;
            } else {
                mustTargetOpposite = false;
            }
        }

        switch (targetType.targetPartyOrSelf) {
            case TargetPartyType.Self:
                return [actor];
            case TargetPartyType.Ally:
                if (mustTargetOpposite) {
                    return oppositeGroup.getTargetsFromTargetType(targetType, actor, exception);
                } else {
                    return selfGroup.getTargetsFromTargetType(targetType, actor, exception);
                }
            case TargetPartyType.Enemy:
                if (mustTargetOpposite) {
                    return selfGroup.getTargetsFromTargetType(targetType, actor, exception);
                } else {
                    return oppositeGroup.getTargetsFromTargetType(targetType, actor, exception);
                }
            default:
                throw new Error(`TargetType ${targetType.targetPartyOrSelf} is not implemented`);
        }
    }

    async actorPlayActiveSkill(
        actor: Character, 
        targets: Character[], 
        selfParty: Party, 
        oppositeParty: Party, 
        skill: Skill, 
        skillLevel: number,
        skillPosition: number
    ): Promise<{
        skill: {skillID: string, level: number},
        skillObject: Skill | null, 
        actionDetails: ActionDetails | null,
    }> {
        let weapons = [];
        if (actor.equipments.mainHand && actor.equipments.mainHand.weaponSpecificType != null) { weapons.push(actor.equipments.mainHand.weaponSpecificType) };
        if (actor.equipments.offHand && actor.equipments.offHand.weaponSpecificType != null) { weapons.push(actor.equipments.offHand.weaponSpecificType) };

        console.log(`${actor.name} is using ${skill.name}`);
        this.actorRemoveResource(actor, skill, skillLevel);
        let positiveTargets: Character[] = [];
        let negativeTargets: Character[] = [];
        let castMessage = `${actor.name} ${skill.isSpell ?"is casting" : "is using"} ${skill.name}`;
        let sequenceMessages: string[] = [];

        //TODO: Implement these, for Frontend
        let actorSkillEffects: ActorSkillEffect[] = [];
        let positiveTargetSkillEffects: TargetSkillEffect[] = []
        let negativeTargetSkillEffects: TargetSkillEffect[] = []

        for (const activeEffect of skill.activeEffect) {
            if (targets === null) {
                console.log(`No target found for ${actor.name}`);
                // skill: {skillID: string, level: number},
                // skillObject: Skill | null, 
                // actionDetails: ActionDetails | null,
                return { 
                    skill:{skillID: skill.id, level: skillLevel}, 
                    skillObject: skill, 
                    actionDetails: null 
                };
            }
        
            for (const actionObject of activeEffect.skillActionObjects) {
                for (const target of targets) {
                    let consumedResult = consumeActionObject(
                        actor,
                        actionObject, 
                        skillLevel, 
                        target, 
                        skill.isSpell, 
                        skill.isWeaponAttack,
                        skill.isAuto
                    );
                        
                    switch (actionObject.type) {
                        case SkillActionType.Negative:
                            negativeTargets.push(target);
                            sequenceMessages.push(`${actor.name} deals ${consumedResult.damageObjectResult.baseDamage} ${consumedResult.damageObjectResult.damageType} damage to ${target.name} ${consumedResult.damageObjectResult.isHit ? '' : 'but missed'} ${consumedResult.damageObjectResult.isCrit ? 'Critical Hit!' : ''}`);
                            break;
                        case SkillActionType.Positive:
                            positiveTargets.push(target);
                            sequenceMessages.push(`${actor.name} heals ${consumedResult.damageObjectResult.baseDamage} ${consumedResult.damageObjectResult.damageType} damage to ${target.name} ${consumedResult.damageObjectResult.isHit ? '' : 'but missed'} ${consumedResult.damageObjectResult.isCrit ? 'Critical Heal!' : ''}`);
                            break;
                    }
                }
            }
        }

        this.actorAddResource(actor, skill, skillLevel);

        let actionDetails = new ActionDetails(
            actor,
            negativeTargets,
            positiveTargets,
            actorSkillEffects,
            negativeTargetSkillEffects,
            positiveTargetSkillEffects,
            castMessage,
            sequenceMessages
        )

        return { 
            skill:{skillID: skill.id, level: skillLevel}, 
            skillObject: skill, 
            actionDetails 
        };
    }

    async actorMoveToNextActiveSkill(actor: Character, skillPosition: number, selfParty: Party, oppositeParty: Party, targets: Character[]): Promise<{
        skill: {skillID: string, level: number},
        skillObject: Skill | null, 
        actionDetails: ActionDetails | null 
    }> {
        skillPosition++;

        if (skillPosition >= actor.activeSkills.length) {
            let skillObject =
                actor.attribute("strength") > actor.attribute("planar")
                    ? skillRepository.getSkill('auto_physical')
                    : skillRepository.getSkill('auto_magical')
    
            console.log(`Available target length: ${targets.length}`);
            return await this.actorPlayActiveSkill(
                actor,
                targets,
                selfParty,
                oppositeParty,
                await skillObject,
                1,
                -1
            );
        } else {
            let skill = actor.activeSkills[skillPosition];
            return await this.actorPlayActiveSkill(
                actor, 
                targets, 
                selfParty, 
                oppositeParty,
                skill.skill,
                skill.level,
                skillPosition
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
                        (amountRangeFromLevel[1] - amountRangeFromLevel[0] + 1)
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
        if (sp[level -1 ] != undefined && sp[level - 1] != 0) {
            actor.spDown(sp[level - 1]);
        }
        for (const { element, amount } of elements) {
            actor.resources[element as keyof typeof actor.resources] -=
                amount[level - 1];
        }
    }

    checkBattleEnd(): { result: 'End' | 'Continue', outcome?: 'WIN' | 'DRAW', winner?: Party, defeated?: Party } {
        const allPartyADead = this.isAllPartyADead();
        const allPartyBDead = this.isAllPartyBDead();
    
        if (allPartyADead && allPartyBDead) {
            console.log(`Both parties are dead. The battle ends in a draw.`);
            return { result: 'End', outcome: 'DRAW' };
        }
    
        if (allPartyADead) {
            console.log(`Party A is dead. Party B wins.`);
            this.battleEndedCalc(this.partyB, this.partyA);
            return { result: 'End', outcome: 'WIN', winner: this.partyB, defeated: this.partyA };
        }
    
        if (allPartyBDead) {
            console.log(`Party B is dead. Party A wins.`);
            this.battleEndedCalc(this.partyA, this.partyB);
            return { result: 'End', outcome: 'WIN', winner: this.partyA, defeated: this.partyB };
        }
    
        return { result: 'Continue' };
    }

    //MARK: Battle Ended
    battleEndedCalc(winnerParty: Party, defeatedParty: Party) {
        // Commented out because unSummon is not implemented yet
        // for (const character of [...winnerParty.characters]) {
        //     if (character != "none" && character.isSummoned === true) {
        //         const summon = character as Summon;
        //         summon.unSummon(winnerParty);
        //     }
        // }
        // for (const character of [...defeatedParty.characters]) {
        //     if (character != "none" && character.isSummoned === true) {
        //         const summon = character as Summon;
        //         summon.unSummon(defeatedParty);
        //     }
        // }

        this.victoryPartyGainEXP(winnerParty, defeatedParty);
    }

    victoryPartyGainEXP(vicrotiedParty: Party, defeatedParty: Party) {
        let allVictoriedPartyEXPValue:number = 0;
        let allVictoriedPartyNumber:number = 0;
        for (const actor of vicrotiedParty.getPosssibleTargetsAsCharacterArray()) {
            if (actor!==null) { allVictoriedPartyEXPValue += actor.level; allVictoriedPartyNumber++}
        }
        const victoriedPartyEXP = allVictoriedPartyEXPValue / allVictoriedPartyNumber;

        let allDefeatedPartyEXPValue:number = 0;
        let allDefeatedPartyNumber:number = 0;
        for (const actor of defeatedParty.getPosssibleTargetsAsCharacterArray()) {
            if (actor!==null) { allDefeatedPartyEXPValue += actor.level; allDefeatedPartyNumber++}
        }
        const defeatedPartyEXP = allDefeatedPartyEXPValue / allDefeatedPartyNumber;

        const expGained = Math.max(victoriedPartyEXP - defeatedPartyEXP, 0) + (2 * allDefeatedPartyNumber);
        for (const actor of vicrotiedParty.getPosssibleTargetsAsCharacterArray()) {
            if (actor!==null && actor.isDead === false) { actor.exp += expGained; }
        }
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
        const ifAllPartyADead = this.partyA.characters.every(actor => {
            if (!actor || actor === "none" || actor.isDead) {
                console.log(`${actor && actor !== "none" ? actor.name : 'None'} is dead or invalid. Current HP: ${actor && actor !== "none" ? actor.currentHP : 'N/A'}`);
                return true;
            } else {
                return false;
            }
        });
        return ifAllPartyADead;
    }

    isAllPartyBDead() {
        const ifAllPartyBDead = this.partyB.characters.every(actor => {
            if (!actor || actor === "none" || actor.isDead) {
                console.log(`${actor && actor !== "none" ? actor.name : 'None'} is dead or invalid. Current HP: ${actor && actor !== "none" ? actor.currentHP : 'N/A'}`);
                return true;
            } else {
                return false;
            }
        });
        return ifAllPartyBDead;
    }

    getOppositeGroup(actor: Character) {
        if (this.partyA.characters.some(a => a && a !== "none" && a.id === actor.id)) {
            return this.partyB;
        }
        if (this.partyB.characters.some(a => a && a !== "none" && a.id === actor.id)) {
            return this.partyA;
        }
        else {
            throw new Error(`Actor is not in any group`);
        }
    }
    
    getSelfGroup(actor: Character){
        if (this.partyA.characters.some(a => a && a !== "none" && a.id === actor.id)) {
            return this.partyA;
        }
        if (this.partyB.characters.some(a => a && a !== "none" && a.id === actor.id)) {
            return this.partyB;
        }
        else {
            throw new Error(`Actor is not in any group`);
        }
    }
}


