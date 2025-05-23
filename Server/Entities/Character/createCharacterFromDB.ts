import { CharacterDB } from "../../Database/Character/CharacterDB";
import { Equipment } from "../Items/Equipments/Equipment";
import { getItem, itemRepository } from "../Items/Repository";
import { ActiveSkill } from "../Skills/Skill";
import { skillRepository } from "../Skills/SkillRepository";
import { TraitRepository } from "../Traits/Trait";
import { Character } from "./Character";
import { CharacterAlignment } from "./Subclasses/CharacterAlignment";
import { CharacterEquipments } from "./Subclasses/CharacterEquipments";
import { CharacterStatus } from "./Subclasses/CharacterStatus";

export async function createCharacterFromDB(
  dbCharacter: CharacterDB,
): Promise<Character> {
  const character = new Character({
    id: dbCharacter.id,
    name: dbCharacter.name,
    gender: dbCharacter.gender,
    portrait: dbCharacter.portrait,
  });

  character.partyID = dbCharacter.partyID;
  character.type = dbCharacter.type;
  character.background = dbCharacter.background;
  character.race = dbCharacter.race;
  character.alignment = new CharacterAlignment({
    law: dbCharacter.alignment.law,
    chaos: dbCharacter.alignment.chaos,
    good: dbCharacter.alignment.good,
    evil: dbCharacter.alignment.evil,
  });
  character.mood = dbCharacter.mood;
  character.energy = dbCharacter.energy;
  character.satiety = dbCharacter.satiety;
  character.fame = dbCharacter.fame;
  character.level = dbCharacter.level;
  character.gold = dbCharacter.gold;
  character.statTracker = dbCharacter.exp;
  character.isDead = dbCharacter.isDead;
  character.lastTarget = dbCharacter.lastTarget;
  character.raceHP = dbCharacter.raceHP;
  character.raceMP = dbCharacter.raceMP;
  character.raceSP = dbCharacter.raceSP;
  character.baseHP = dbCharacter.baseHP;
  character.baseMP = dbCharacter.baseMP;
  character.baseSP = dbCharacter.baseSP;
  character.bonusHP = dbCharacter.bonusHP;
  character.bonusMP = dbCharacter.bonusMP;
  character.bonusSP = dbCharacter.bonusSP;
  character.currentHP = dbCharacter.currentHP;
  character.currentMP = dbCharacter.currentMP;
  character.currentSP = dbCharacter.currentSP;
  character.status = new CharacterStatus();
  character.status.attributes = dbCharacter.status.attributes;
  character.status.proficiencies = dbCharacter.status.proficiencies;
  character.status.battlers = dbCharacter.status.battlers;
  character.status.artisans = dbCharacter.status.artisans;
  character.status.elements = dbCharacter.status.elements;
  character.isPlayerCharacter = dbCharacter.isPlayerCharacter;

  character.equipments = new CharacterEquipments();

  const equipSlots = [
    "mainHand",
    "offHand",
    "armor",
    "headwear",
    "gloves",
    "boots",
    "necklace",
    "ring_R",
    "ring_L",
  ] as const;

  for (const slot of equipSlots) {
    const itemId = dbCharacter.equipments[slot];
    if (itemId) {
      character.equipments[slot] = getItem(itemId) as Equipment;
    }
  }

  if (dbCharacter.traits.length > 0) {
    for (const trait of dbCharacter.traits) {
      const traitInstance =
        TraitRepository[trait as keyof typeof TraitRepository];
      if (!traitInstance) {
        throw new Error(`Trait ${trait} not found in TraitRepository`);
      }
      character.gainTrait(traitInstance);
    }
  }

  character.position = dbCharacter.position;
  character.baseAC = dbCharacter.baseAC;
  character.location = dbCharacter.location;
  character.isSummoned = dbCharacter.isSummoned;
  character.arcaneAptitude.aptitude = dbCharacter.arcaneAptitude;
  character.bagSize = dbCharacter.bagSize;
  character.storyFlags = dbCharacter.storyFlags;
  for (const meta of dbCharacter.skills) {
    const skill = skillRepository.getSkill(meta.id);
    const isActive = skill instanceof ActiveSkill;
    const equipmentNeeded = isActive
      ? (skill.equipmentNeeded as string[])
      : [""];
    const consume = isActive ? skill.consume : {};
    const produce = isActive ? skill.produce : {};
    const isSpell = isActive ? skill.isSpell : false;
    const type = isActive ? `Active` : `Passive`;
    character.activeSkills.push({
      id: meta.id,
      name: skill.meta.name,
      level: meta.level,
      exp: meta.exp,
      description: skill.meta.description,
      tier: skill.meta.tier,
      equipmentNeeded,
      consume,
      produce,
      isSpell,
      type,
    });
  }

  for (const meta of dbCharacter.activeSkills) {
    const skill = skillRepository.getSkill(meta.id);
    const isActive = skill instanceof ActiveSkill;
    const equipmentNeeded = isActive
      ? (skill.equipmentNeeded as string[])
      : [""];
    const consume = isActive ? skill.consume : {};
    const produce = isActive ? skill.produce : {};
    const isSpell = isActive ? skill.isSpell : false;
    const type = isActive ? `Active` : `Passive`;
    character.activeSkills.push({
      id: meta.id,
      name: skill.meta.name,
      level: meta.level,
      exp: meta.exp,
      description: skill.meta.description,
      tier: skill.meta.tier,
      equipmentNeeded,
      consume,
      produce,
      isSpell,
      type,
    });
  }

  for (const itemId in dbCharacter.itemsBag) {
    const itemObj = getItem(itemId);
    const quantity = dbCharacter.itemsBag[itemId];
    character.itemsBag.items.push({ item: itemObj, quantity });
  }

  character.relation = dbCharacter.relation;

  return character;
}
