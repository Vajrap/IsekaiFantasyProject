import { SkillConsume, SkillProduce } from "./SubClasses/SkillConsume";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Character } from "../Character/Character";
import { GameTime } from "../../Game/TimeAndDate/GameTime";
import { TurnReport } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../Party/Party";
import { WeaponSpecificType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";

/**
 * Enum containing all skill IDs in the game
 * Organized by skill type/class for better readability
 */
export enum SkillEnum {
  // Auto attacks
  AUTO_PHYSICAL = "skill_auto_physical",
  AUTO_MAGICAL = "skill_auto_magical",
  
  // Fighter skills
  POWER_STRIKE = "skill_power_strike",
  DEFENSIVE_STANCE = "skill_defensive_stance",
  RECKLESS_ATTACK = "skill_reckless_attack",
  SECOND_WIND = "skill_second_wind",
  TRIPLE_SLASH = "skill_triple_slash",
  
  // Rogue skills
  BACKSTAB = "skill_back_stab",
  POISONED_BLADE = "skill_poisoned_blade",
  STEALTH = "skill_stealth",
  
  // Mage skills
  FIREBALL = "skill_fireball",
  FROSTBOLT = "skill_frostbolt",
  LIGHTNING_BOLT = "skill_lightning_bolt",
  ARCANE_MISSILE = "skill_arcane_missile",
  
  // Cleric skills
  HEAL = "skill_aid",
  SMITE = "skill_smite",
  BLESSING = "skill_blessing",
  HOLY_BLAST = "skill_holy_blast",
  CHANT = "skill_chant",
  
  // Druid skills
  ENTANGLE = "skill_entangle",
  WILDSHAPE = "skill_wildshape",
  NATURE_TOUCH = "skill_nature_touch",
  
  // Warlock skills
  SHADOW_BOLT = "skill_shadow_bolt",
  LIFE_DRAIN = "skill_life_drain",
  CURSE = "skill_curse",
  
  // Beast/Animal skills
  BITE = "skill_bite",
  CLAW_SWIPE = "skill_claw_swipe",
  MAUL = "skill_maul",
  HOWL = "skill_howl",
  PACK_HUNT = "skill_pack_hunt",
  
  // Snake specific skills
  VENOM_BITE = "skill_venom_bite",
  CONSTRICTIVE_COIL = "skill_constrictive_coil",
  
  // Spider skills
  VENOM_SPRAY = "skill_venom_spray",
  WEB_SHOT = "skill_web_shot"
}

export class Skill {
  meta: {
    id: string;
    name: string;
    tier: Tier;
    description: string;
    requirement: SkillLearningRequirement;
  };
  constructor(meta: {
    id: string;
    name: string;
    tier: Tier;
    description: string;
    requirement: SkillLearningRequirement;
  }) {
    this.meta = meta;
  }
}

export class ActiveSkill extends Skill {
  equipmentNeeded: WeaponSpecificType[];
  consume: SkillConsume;
  produce: SkillProduce;
  isSpell: boolean;
  isWeaponAttack: boolean;
  executor: (
    character: Character,
    allies: Party,
    enemies: Party,
    skillLevel: number,
    context: { time: GameTime; location: LocationName },
  ) => TurnReport;
  constructor(
    meta: {
      id: string;
      name: string;
      tier: Tier;
      description: string;
      requirement: SkillLearningRequirement;
    },
    data: {
      equipmentNeeded: WeaponSpecificType[];
      consume: SkillConsume;
      produce: SkillProduce;
      isSpell: boolean;
      isWeaponAttack: boolean;
      executor: (
        character: Character,
        allies: Party,
        enemies: Party,
        skillLevel: number,
        context: { time: GameTime; location: LocationName },
      ) => TurnReport;
    },
  ) {
    super(meta);
    this.equipmentNeeded = data.equipmentNeeded;
    this.consume = data.consume;
    this.produce = data.produce;
    this.isSpell = data.isSpell;
    this.isWeaponAttack = data.isWeaponAttack;
    this.executor = data.executor;
  }
}

export class PassiveSkill extends Skill {
  adding: (character: Character, skillLevel: number) => void;
  removing: (character: Character, skillLevel: number) => void;
  takingTurn: (character: Character, skillLevel: number) => void;

  constructor(
    meta: {
      id: string;
      name: string;
      tier: Tier;
      description: string;
      requirement: SkillLearningRequirement;
    },
    data: {
      adding: (character: Character, skillLevel: number) => void;
      removing: (character: Character, skillLevel: number) => void;
      takingTurn: (character: Character, skillLevel: number) => void;
    },
  ) {
    super(meta);
    this.adding = data.adding;
    this.removing = data.removing;
    this.takingTurn = data.takingTurn;
  }
}
