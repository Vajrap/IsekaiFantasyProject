// import { Internal } from "../../Entities/Internal/Internal";
// import { InternalResponseType } from "../../API/ResponseTypes/Internal";
// import { Skill } from "../../Entities/Skills/Skill";
// import { Dice } from "../../Utility/Dice";
// import { CharacterStatusEnum } from "../../Utility/Enum/CharacterStatusTypes";
// import { PlayerCharacter } from "../../Entities/Character/Character";
// import { game } from "../../server";

// export class GameEvent<T> {
//     name: string;
//     execute: (param: T) => Promise<any>;
//     constructor(
//         name: string,
//         execute: (param: T) => Promise<any>,
//     ) {
//         this.name = name;
//         this.execute = execute;
//     }
//     async executeFromParty(partyID: string): Promise<any> {
//         const party = game.partyManager.parties.find(party => party.partyID === partyID);
//         if (party as unknown as T) {
//             return await this.execute(party as unknown as T);
//         } else {
//             throw new Error("The provided party cannot be cast to the required parameter type.");
//         }
//     }
//     async executeFromPlayerCharacter(player: PlayerCharacter): Promise<any> {
//         if (player as unknown as T) {
//             return await this.execute(player as unknown as T);
//         } else {
//             throw new Error("The provided player character cannot be cast to the required parameter type.");
//         }
//     }
//     async executeBattleEvent(party: Party, enemyParties: Character[]): Promise<any> {
//         if(({ party, enemyParties } as unknown as T)) {
//             return await this.execute({ party, enemyParties } as unknown as T);
//         } else {
//             throw new Error("The provided party and enemy parties cannot be cast to the required parameter type.");
//         }
//     }
// }

// enum EventType {
//     //Random event
//     RanomEvent = "randomEvent", //Not sure if this is needed yet

//     //Resting events
//     RestEvent = "rest", //Resting only take 1 argument, the party
//     InnRest = "innRest", //InnResting only take 1 argument, the party
//     HouseRest = "houseRest", //HouseResting only take 1 argument, the party
//     CampRest = "campRest", //CampResting take 2 arguments, the party and a boolean to determine if the party use item to rest

//     //Training events
//     AttributeTrain = "attributeTrain", //Attribute training take 2 arguments, the actor and the attribute to train
//     ArtisanTrain = "artisanTrain", //Artisan training take 2 arguments, the actor and the artisan to train
//     ProficiencyTrain = "proficiencyTrain", //Proficiency training take 2 arguments, the actor and the proficiency to train
//     SkillTrain = "skillTrain", //Skill training take 2 arguments, the actor and the skill to train
//     InternalSkillTrain = "internalSkillTrain", //Internal skill training take 2 arguments, the actor and the internal skill to train

//     //Learning events
//     SkillLearn = "skillLearn", //Skill learning take 2 arguments, the actor and the skill to learn
//     InternalSkillLearn = "internalSkillLearn", //Internal skill learning take 2 arguments, the actor and the internal skill to learn

//     //Explorations and Travel events
//     StrollEvent = "strollEvent", //Stroll event take 3 arguments, the party, the player, and the event() -> {} to execute, maybe about gaining insight or call a check to call for another event

//     //Combat events
//     BattleEvent = "battleEvent", //Start combat, take party and pre-defined enemy party (needed implementation)

//     //Dialogue events
//     DialogueEvent = "dialogueEvent", //Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome

//     //Quest events
//     QuestGiverEvent = "questGiverEvent", //Take character and quest, might check if the character has the quest already, if true -> update quest instead.
//     QuestUpdateEvent = "questUpdateEvent",
//     QuestCompleteEvent = "questCompleteEvent",

//     //Item events
//     ItemPickupEvent = "itemPickupEvent", //Take character and item, add item to character inventory
//     ItemShopEvent = "itemShopEvent", //Take character and shop, open shop interface, buy/sell items
// }

// type RandomEvent = {
//     party: Party;
//     actor: PlayerCharacter;
// }

// type RestEvent = {
//     party: Party;
// }

// type CampRestEvent = {
//     party: Party;
//     useItem: boolean;
// }

// type TrainEvent = {
//     actor: PlayerCharacter;
//     trainTarget: CharacterStatusEnum;
//     bonusTrainingExp?: number;
// }

// type SkillLearnEvent = {
//     actor: PlayerCharacter;
//     skillToLearn: Skill;
// }

// type InternalSkillLearnEvent = {
//     actor: PlayerCharacter;
//     internalToLearn: Internal;
// }

// type TravelEvent = {
//     party: Party;
//     player: PlayerCharacter;
//     startingLocation: Location;
//     destination: Location;
// }

// type StrollEvent = {
//     party: Party;
//     player: PlayerCharacter;
//     event: GameEvent<RandomEvent>;
// }

// type BattleEvent = {
//     party: Party;
//     enemyParties: Party[]; //Take multiple enemy party defined by the location and then randomly choose one to fight
// }


// //These events are not include the random events chance, these are the base events themselves.
// const gameEvent_rest = new GameEvent <RestEvent>(
//     EventType.RestEvent, 
//     async ({ party }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }

//         for (const character of party.characters) {
//             if (character === undefined || character === null) {
//                 continue;
//             }
//             character.hpUp(character.maxHP()! * (Dice.roll('1d20').sum / 15) + character.getModifier('attributes', 'vitality'));
//             character.mpUp(character.maxMP()! * (Dice.roll('1d20').sum / 15) + character.getModifier('attributes', 'intelligence'));
//             character.spUp(character.maxSP()! * (Dice.roll('1d20').sum / 15) + character.getModifier('attributes', 'endurance'));
//             character.moodUp((Dice.roll('1d20').sum * 1.5) + character.attribute('willpower'));
//             character.energyUp((Dice.roll('1d20').sum) + character.attribute('vitality') + 50);
//         }

//         return true;
//     }
// );

// const gameEvent_innRest = new GameEvent<RestEvent>(
//     EventType.InnRest,
//     async ({ party }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }
        
//         for (const character of party.characters) {
//             if (character === undefined || character === null) {
//                 continue;
//             }
//             character.hpUp((character.maxHP()! * (Dice.roll('1d20').sum / 10)) + character.getModifier('attributes', 'vitality'));
//             character.mpUp((character.maxMP()! * (Dice.roll('1d20').sum / 10)) + character.getModifier('attributes', 'intelligence'));
//             character.spUp((character.maxSP()! * (Dice.roll('1d20').sum / 10)) + character.getModifier('attributes', 'endurance'));
//             character.moodUp((Dice.roll('1d20').sum * 2.5) + character.attribute('willpower'));
//             character.energyUp((Dice.roll('1d20').sum) + character.attribute('vitality') + 65);
//         }

//         return true;
//     }
// );

// const gameEvent_houseRest = new GameEvent<RestEvent>(
//     EventType.HouseRest,
//     async ({ party }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }

//         for (const character of party.characters) {
//             if (character === undefined || character === null) {
//                 continue;
//             }
//             character.hpUp((character.maxHP()! * (Dice.roll('1d20').sum / 5)) + character.getModifier('attributes', 'vitality'));
//             character.mpUp((character.maxMP()! * (Dice.roll('1d20').sum / 5)) + character.getModifier('attributes', 'intelligence'));
//             character.spUp((character.maxSP()! * (Dice.roll('1d20').sum / 5)) + character.getModifier('attributes', 'endurance'));
//             character.moodUp((Dice.roll('1d20').sum * 3) + character.attribute('willpower'));
//             character.energyUp((Dice.roll('1d20').sum) + character.attribute('vitality') + 70);
//         }

//         return true;
//     }
// );

// const gameEvent_campRest = new GameEvent<CampRestEvent>(
//     EventType.CampRest,
//     async ({ party, useItem }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }
//         if (useItem === undefined || useItem === null) { throw new Error("Need to assign useItem value to campRest"); }

//         for (const character of party.characters) {
//             if (character === undefined || character === null) {
//                 continue;
//             }
//             character.hpUp((character.maxHP()! * (Dice.roll('1d20').sum / (useItem ? 20 : 15))) + character.getModifier('attributes', 'vitality'));
//             character.mpUp((character.maxMP()! * (Dice.roll('1d20').sum / (useItem ? 20 : 15))) + character.getModifier('attributes', 'intelligence'));
//             character.spUp((character.maxSP()! * (Dice.roll('1d20').sum / (useItem ? 20 : 15))) + character.getModifier('attributes', 'endurance'));
//             character.moodUp((Dice.roll('1d20').sum * (useItem ? 2 : 1.5)) + character.attribute('willpower'));
//             character.energyUp((Dice.roll('1d20').sum) + character.attribute('vitality') + 55);
//         }

//         return true;
//     }
// );

// const gameEvent_attributeTrain = new GameEvent<TrainEvent>(
//     EventType.AttributeTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("AttributeName is undefined, needed to verify the attribute trained"); }

//         const learningBonus = actor.getModifier('attributes', 'intelligence') + actor.getModifier('attributes', 'willpower');
//         const learningDice = Dice.roll('1d20').sum;
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);
        
//         return true;
//     }
// );

// const gameEvent_artisanTrain = new GameEvent<TrainEvent>(
//     EventType.ArtisanTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the artisan trained"); }
        
//         const learningBonus = actor.getModifier('attributes', 'intelligence') + actor.getModifier('attributes', 'willpower');
//         const learningDice = Dice.roll('1d20').sum;
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);

//         return true;
//     }
// );

// const gameEvent_proficiencyTrain = new GameEvent<TrainEvent>(
//     EventType.ProficiencyTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the proficiency trained"); }
        
//         const learningBonus = actor.getModifier('attributes', 'intelligence') + actor.getModifier('attributes', 'willpower');
//         const learningDice = Dice.roll('1d20').sum;
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);

//         return true;
//     }
// );

// const gameEvent_skillTrain = new GameEvent<TrainEvent>(
//     EventType.SkillTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the skill trained"); }
        
//         const learningBonus = actor.getModifier('attributes', 'intelligence') + actor.getModifier('attributes', 'willpower');
//         const learningDice = Dice.roll('1d20').sum;
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         const skill = actor.skills.find(skill => skill.skillID === trainTarget);
//         if (skill === undefined || skill === null) { throw new Error("Skill is undefined"); }

//         actor.trainSkill(skill.skillID, trainingExpGain);   

//         return true;
//     }
// )

// const gameEvent_internalSkillTrain = new GameEvent<TrainEvent>(
//     EventType.InternalSkillTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the internal skill trained"); }
        
//         const learningBonus = actor.getModifier('attributes', 'intelligence') + actor.getModifier('attributes', 'willpower');
//         const learningDice = Dice.roll('1d20').sum;
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         const internal = actor.internals.find(internal => internal.internalID === trainTarget);
//         if (internal === undefined || internal === null) { throw new Error("Internal Skill is undefined"); }

//         actor.trainInternal(internal.internalID, trainingExpGain);

//         return true;
//     }
// )

// const gameEvent_skillLearn = new GameEvent<SkillLearnEvent>(
//     EventType.SkillLearn,
//     async ({ actor, skillToLearn }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (skillToLearn === undefined || skillToLearn === null) { throw new Error("Skill is undefined"); }
        
//         return actor.learnSkill(skillToLearn.id);
//     }
// )

// const gameEvent_internalSkillLearn = new GameEvent<InternalSkillLearnEvent>(
//     EventType.InternalSkillLearn,
//     async ({ actor, internalToLearn }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (internalToLearn === undefined || internalToLearn === null) { throw new Error("Internal Skill is undefined"); }
//         if (internalToLearn.requirement) {
//             return actor.learnInternal(internalToLearn.id);
//         } else {
//             return InternalResponseType.SuccessNotEligibleToLearn;
//         }   
//     }
// )

// const gameEvent_strollEvent = new GameEvent<StrollEvent>(
//     EventType.StrollEvent,
//     async ({ party, player, event }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }
//         if (player === undefined || player === null) { throw new Error("Player is undefined"); }
//         if (event === undefined || event === null) { throw new Error("Event is undefined"); }
//         await event.execute({ party: party, actor: player });

//         return true;
//     }
// )

// const gameEvent_battleEvent = new GameEvent<BattleEvent>(
//     EventType.BattleEvent,
//     async ({ party, enemyParties }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }
//         if (enemyParties === undefined || enemyParties === null) { throw new Error("EnemyParty is undefined"); }

//         let dice = Dice.roll('1d20').sum
//         let enemyParty = enemyParties[Math.floor(dice / (20 / enemyParties.length))];
        
//         try {
//             return await game.battleWsManager.startNewBattle(party, enemyParty);
//         } catch (error) {
//             console.error(error);
//             return false;
//         }
//     }
// )



// export { RestEvent, CampRestEvent, TrainEvent, SkillLearnEvent, InternalSkillLearnEvent, EventType, RandomEvent, TravelEvent, StrollEvent, BattleEvent };
// export { gameEvent_rest, gameEvent_innRest, gameEvent_houseRest, gameEvent_campRest, gameEvent_attributeTrain, gameEvent_artisanTrain, gameEvent_proficiencyTrain, gameEvent_skillTrain, gameEvent_internalSkillTrain, gameEvent_skillLearn, gameEvent_internalSkillLearn, gameEvent_strollEvent, gameEvent_battleEvent };