import { Character } from "../../Entities/Character/Character";

export async function event_skill_learn(character: Character, skillID: string) {
  await character.learnSkill(skillID);
}

export async function event_skill_train(character: Character, skillID: string) {
  await character.trainSkill(skillID);
}
