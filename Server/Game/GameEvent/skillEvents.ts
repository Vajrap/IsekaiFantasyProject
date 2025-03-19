import { Character } from "../../Entities/Character/Character";
import { screamer } from "../../Utility/Screamer/Screamer";

export const TRAIN_EVENT = 'TRAIN_EVENT';
export const LEARN_EVENT_END = 'LEARN_EVENT_END';
export const LEARN_EVENT_PROGRESS = 'LEARN_EVENT_PROGRESS';

// TODO: need to add learning progress, else it'll be one time learn;
export async function event_skill_learn(character: Character, skillID: string, oneTimeLearn: boolean = false) {
  if (oneTimeLearn) {
    await character.learnSkill(skillID);
    screamTrainEvent(character, skillID, LEARN_EVENT_END);
  } else {

    // Need progress bar for learning
    await character.learnSkill(skillID);
    screamTrainEvent(character, skillID, LEARN_EVENT_PROGRESS);
  }
}

export async function event_skill_train(character: Character, skillID: string) {
  await character.trainSkill(skillID);
  screamTrainEvent(character, skillID, TRAIN_EVENT);
}

function screamTrainEvent(character: Character, skillID: string, trainType: string) {
  screamer.scream(
    trainType,
      {
          character: character.intoInterface(),
          skillID: skillID,
      }
  );
}