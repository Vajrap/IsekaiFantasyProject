import { SkillConsume, SkillProduce } from "./SubClasses/SkillConsume";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Character } from "../Character/Character";
import { GameTime } from "../../Game/TimeAndDate/GameTime";
import { TurnReport } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../Party/Party";
import { WeaponSpecificType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { extend } from "vue";

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
