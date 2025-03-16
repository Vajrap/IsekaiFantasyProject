// import { Dice } from "../../Utility/Dice";
// import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
// import { LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
// import { screamer } from "../../Utility/Screamer/Screamer";
// import { GameEventParams } from "./type";

// export class GameEvent<T extends keyof GameEventParams> {
//     name: T;
//     execute: (params: GameEventParams[T]) => Promise<any>;
    
//     constructor(
//         name: T,
//         execute: (params: GameEventParams[T]) => Promise<any>
//     ) {
//         this.name = name;
//         this.execute = execute;
//     }
    
//     async executeWithParams(params: GameEventParams[T]): Promise<any> {
//         return await this.execute(params);
//     }
// }

// //These events are not include the random events chance, these are the base events themselves.
// const gameEvent_rest = new GameEvent<LocationEventEnum.RestEvent>(
//     LocationEventEnum.RestEvent, 
//     async ({ party }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }

//         for (const character of party.characters) {
//             if (character === undefined || character === null || character === 'none') {
//                 continue;
//             }
//             character.hpUp(character.maxHP()! * (Dice.rollTwenty() / 15) + character.getModifier(CharacterStatusEnum.vitality));
//             character.mpUp(character.maxMP()! * (Dice.rollTwenty() / 15) + character.getModifier(CharacterStatusEnum.intelligence));
//             character.spUp(character.maxSP()! * (Dice.rollTwenty() / 15) + character.getModifier(CharacterStatusEnum.endurance));
//             character.moodUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()) + (character.attribute('willpower')/2)), 0) + 10
//             );
//             character.energyUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 50
//             );
//         }

//         return true;
//     }
// );

// const gameEvent_innRest = new GameEvent<LocationEventEnum.InnRest>(
//     LocationEventEnum.InnRest,
//     async ({ party }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }
        
//         for (const character of party.characters) {
//             if (character === undefined || character === null || character === 'none') {
//                 continue;
//             }
//             character.hpUp((character.maxHP()! * (Dice.rollTwenty() / 10)) + character.getModifier(CharacterStatusEnum.vitality));
//             character.mpUp((character.maxMP()! * (Dice.rollTwenty() / 10)) + character.getModifier(CharacterStatusEnum.intelligence));
//             character.spUp((character.maxSP()! * (Dice.rollTwenty() / 10)) + character.getModifier(CharacterStatusEnum.endurance));
//             character.moodUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()/5) + (character.attribute('willpower')/2)), 0) + 25
//             );
//             character.energyUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 65
//             );
//         }

//         return true;
//     }
// );

// const gameEvent_houseRest = new GameEvent<LocationEventEnum.HouseRest>(
//     LocationEventEnum.HouseRest,
//     async ({ party }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }

//         for (const character of party.characters) {
//             if (character === undefined || character === null || character === 'none') {
//                 continue;
//             }
//             character.hpUp((character.maxHP()! * (Dice.rollTwenty() / 5)) + character.getModifier(CharacterStatusEnum.vitality));
//             character.mpUp((character.maxMP()! * (Dice.rollTwenty() / 5)) + character.getModifier(CharacterStatusEnum.intelligence));
//             character.spUp((character.maxSP()! * (Dice.rollTwenty() / 5)) + character.getModifier(CharacterStatusEnum.endurance));
//             character.moodUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()/5) + (character.attribute('willpower')/2)), 0) + 30
//             );
//             character.energyUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 70
//             );
//         }

//         return true;
//     }
// );

// const gameEvent_campRest = new GameEvent<LocationEventEnum.CampRest>(
//     LocationEventEnum.CampRest,
//     async ({ party, useItem }) => {
//         if (party === undefined || party === null) { throw new Error("Party is undefined"); }
//         if (useItem === undefined || useItem === null) { throw new Error("Need to assign useItem value to campRest"); }

//         for (const character of party.characters) {
//             if (character === undefined || character === null || character === 'none') {
//                 continue;
//             }
//             character.hpUp((character.maxHP()! * (Dice.rollTwenty() / (useItem ? 20 : 15))) + character.getModifier(CharacterStatusEnum.vitality));
//             character.mpUp((character.maxMP()! * (Dice.rollTwenty() / (useItem ? 20 : 15))) + character.getModifier(CharacterStatusEnum.intelligence));
//             character.spUp((character.maxSP()! * (Dice.rollTwenty() / (useItem ? 20 : 15))) + character.getModifier(CharacterStatusEnum.endurance));
//             character.moodUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()/5) + (character.attribute('willpower')/2)), 0) + 15
//             );
//             character.energyUp(Math.max(Math.floor(
//                 (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 55
//             );
//         }

//         return true;
//     }
// );

// const gameEvent_attributeTrain = new GameEvent<LocationEventEnum.AttributeTrain>(
//     LocationEventEnum.AttributeTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("AttributeName is undefined, needed to verify the attribute trained"); }

//         const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
//         const learningDice = Dice.rollTwenty();
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);
        
//         return true;
//     }
// );

// const gameEvent_artisanTrain = new GameEvent<LocationEventEnum.ArtisanTrain>(
//     LocationEventEnum.ArtisanTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the artisan trained"); }
        
//         const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
//         const learningDice = Dice.rollTwenty();
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);

//         return true;
//     }
// );

// const gameEvent_proficiencyTrain = new GameEvent<LocationEventEnum.ProficiencyTrain>(
//     LocationEventEnum.ProficiencyTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1}) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the proficiency trained"); }
        
//         const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
//         const learningDice = Dice.rollTwenty();
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);

//         return true;
//     }
// );

// const gameEvent_skillTrain = new GameEvent<LocationEventEnum.SkillTrain>(
//     LocationEventEnum.SkillTrain,
//     async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the skill trained"); }
        
//         const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
//         const learningDice = Dice.rollTwenty();
//         const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

//         const skill = actor.skills.find(skill => skill.skill.id === trainTarget);
//         if (skill === undefined || skill === null) { throw new Error("Skill is undefined"); }

//         actor.trainSkill(skill.skill.id, trainingExpGain);   

//         actor.skills

//         return true;
//     }
// )

// const gameEvent_skillLearn = new GameEvent<LocationEventEnum.SkillLearn>(
//     LocationEventEnum.SkillLearn,
//     async ({ actor, skillToLearn }) => {
//         if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
//         if (skillToLearn === undefined || skillToLearn === null) { throw new Error("Skill is undefined"); }
        
//         return actor.learnSkill(skillToLearn.id);
//     }
// )

// const gameEvent_battleEvent = new GameEvent<LocationEventEnum.BattleEvent>(
//     LocationEventEnum.BattleEvent,
//     async ({ party, enemyParty, location }) => { 
//         try {
//             await screamer.scream(
//                 'START_BATTLE_EVENT',
//                 {
//                     party: party,
//                     enemyParty: enemyParty,
//                     location: location,
//                 }
//             )
//             // TODO: This means the screamer needed to return battle result, long way to go.
//         } catch (error) {
//             console.error(error);
//             return false;
//         }
//     }
// )

// export { gameEvent_rest, gameEvent_innRest, gameEvent_houseRest, gameEvent_campRest, gameEvent_attributeTrain, gameEvent_artisanTrain, gameEvent_proficiencyTrain, gameEvent_skillTrain, gameEvent_skillLearn, gameEvent_battleEvent };

// export const gameEvents = [
//     gameEvent_rest, gameEvent_innRest, gameEvent_houseRest, gameEvent_campRest, gameEvent_attributeTrain, gameEvent_artisanTrain, gameEvent_proficiencyTrain, gameEvent_skillTrain, gameEvent_skillLearn, gameEvent_battleEvent
// ]
