import { PassiveSkill } from "../../Skills/Skill";
import { skillRepository } from "../../Skills/SkillRepository";
import { Character } from "../Character";

export function moveSkillToDeck(actor: Character, skillID: string) {
  if (!actor.skills[skillID]) {
    throw new Error(`Skill not found in Character's skills`);
  }
  const skillMeta = actor.skills[skillID];
  if (skillMeta.type === "Passive") {
    throw new Error(`Passive skills cannot be moved to the active deck`);
  }
  actor.activeSkills.push(skillMeta);
  delete actor.skills[skillID];
}

export function moveDeckToSkill(actor: Character, skillID: string) {
  let haveSkill = false;
  let skillMeta;
  for (const meta of actor.activeSkills) {
    if (meta.id === skillID) {
      haveSkill = true;
      skillMeta = meta;
      break;
    }
  }
  if ((haveSkill = false || skillMeta === undefined)) {
    throw new Error(`Skill not found in Character's active skills`);
  }
  if (skillMeta.type === `Passive`) {
    const skill = skillRepository.getSkill(skillID);
    if (!(skill instanceof PassiveSkill)) {
      throw new Error(`Wrong skill type.`);
    }
    skill.removing(actor);
  }
  actor.skills[skillID] = {
    id: skillID,
    name: skillMeta.name,
    type: skillMeta.type,
    description: skillMeta.description,
    tier: skillMeta.tier,
    level: skillMeta.level,
    exp: skillMeta.exp,
    consume: skillMeta.consume,
    produce: skillMeta.produce,
    equipmentNeeded: skillMeta.equipmentNeeded,
    isSpell: skillMeta.isSpell,
  };
  actor.activeSkills = actor.activeSkills.filter((meta) => meta.id !== skillID);
}
