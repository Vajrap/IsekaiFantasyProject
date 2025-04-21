import { Character } from "../Entities/Character/Character";
import { BuffsAndDebuffs } from "../Entities/Character/Subclasses/BuffsAndDebuffs";
import { ActiveSkill, Skill } from "../Entities/Skills/Skill";
import { CharacterType } from "../Entities/Character/Enums/CharacterType";
import { CharacterStatusEnum } from "../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { CharacterResources } from "../Entities/Character/Subclasses/CharacterResources";
import {
  CharacterDataInterface,
  ActionDetailsInterface,
  ActorSkillEffect,
  TargetSkillEffect,
} from "../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { WeaponSpecificType } from "../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";

export function createCharacterDataInterface(
  character: Character,
): CharacterDataInterface {
  return {
    characterID: character.id,
    name: character.name,
    currentHP: character.currentHP,
    maxHP: character.maxHP(),
    currentMP: character.currentMP,
    maxMP: character.maxMP(),
    currentSP: character.currentSP,
    maxSP: character.maxSP(),
    resources: filterResources(character.resources),
    buffsAndDebuffs: filterBuffs(character.buffsAndDebuffs),
    isDead: character.isDead,
    position: character.position,
    portrait: character.portrait,
  };
}

function filterResources(resources: CharacterResources) {
  return Object.fromEntries(
    Object.entries(resources).filter(([key, value]) => (value as number) > 0),
  );
}

function filterBuffs(buffsAndDebuffs: BuffsAndDebuffs) {
  return Object.fromEntries(
    Object.entries(buffsAndDebuffs).filter(([key, value]) => value > 0),
  );
}

export function createActionDetailsInterface(
  actor: Character,
  targets: Character[],
  positiveTargets: Character[],
  actorSkillEffect: ActorSkillEffect[],
  targetSkillEffect: TargetSkillEffect[],
  positiveTargetSkillEffect: TargetSkillEffect[],
  castMessage: string,
  sequenceMessage: string[] = [],
): ActionDetailsInterface {
  return {
    actor: createCharacterDataInterface(actor),
    targets: targets.map((target) => createCharacterDataInterface(target)),
    positiveTargets: positiveTargets.map((target) =>
      createCharacterDataInterface(target),
    ),
    actorSkillEffect: actorSkillEffect,
    targetSkillEffect: targetSkillEffect,
    positiveTargetSkillEffect: positiveTargetSkillEffect,
    castMessage: castMessage,
    sequenceMessage: sequenceMessage,
  };
}

export class SkillData {
  id: string;
  name: string;
  description: string;
  requirement: {
    preRequireCharacterLevel: number;
    preRequireCharacterTrait: string[];
    preRequireElements: { element: string; value: number }[];
    preRequireSkillID: string[];
  };
  equipmentNeeded: WeaponSpecificType[];
  consume: {
    hp: number[];
    mp: number[];
    sp: number[];
    elements: { element: string; amount: number[] }[];
  };
  produce: {
    elements: { element: string; amountRange: [number, number][] }[];
  };

  constructor(skill: Skill, actor: Character) {
    this.id = skill.meta.id;
    this.name = skill.meta.name;
    this.description = this.makeDescription(actor, skill);
    this.requirement = {
      preRequireCharacterLevel:
        skill.meta.requirement.preRequireCharacterLevel || 0,
      preRequireCharacterTrait:
        skill.meta.requirement.preRequireCharacterTrait || [],
      preRequireElements: skill.meta.requirement.preRequireElements || [],
      preRequireSkillID: skill.meta.requirement.preRequireSkillID || [],
    };
    this.equipmentNeeded =
      skill instanceof ActiveSkill ? skill.equipmentNeeded : [];
    this.consume = {
      hp: skill instanceof ActiveSkill ? skill.consume.hp : [],
      mp: skill instanceof ActiveSkill ? skill.consume.mp : [],
      sp: skill instanceof ActiveSkill ? skill.consume.sp : [],
      elements: skill instanceof ActiveSkill ? skill.consume.elements : [],
    };
    this.produce = {
      elements: skill instanceof ActiveSkill ? skill.produce.elements : [],
    };
  }

  makeDescription(character: Character, skill: Skill): string {
    const getStatModifier = (status: CharacterStatusEnum): number => {
      return character.getModifier(status);
    };

    const placeholders: { [key: string]: number } = {
      "{strengthModifier}": getStatModifier(CharacterStatusEnum.strength),
      "{enduranceModifier}": getStatModifier(CharacterStatusEnum.endurance),
      "{charismaModifier}": getStatModifier(CharacterStatusEnum.charisma),
      "{luckModifier}": getStatModifier(CharacterStatusEnum.luck),
      "{intelligenceModifier}": getStatModifier(
        CharacterStatusEnum.intelligence,
      ),
      "{leadershipModifier}": getStatModifier(CharacterStatusEnum.leadership),
      "{vitalityModifier}": getStatModifier(CharacterStatusEnum.vitality),
      "{willpowerModifier}": getStatModifier(CharacterStatusEnum.willpower),
      "{breathModifier}": getStatModifier(CharacterStatusEnum.breath),
      "{planarModifier}": getStatModifier(CharacterStatusEnum.planar),
      "{dexterityModifier}": getStatModifier(CharacterStatusEnum.dexterity),
      "{agilityModifier}": getStatModifier(CharacterStatusEnum.agility),
      "{pATKModifier}": getStatModifier(CharacterStatusEnum.pATK),
      "{pHITModifier}": getStatModifier(CharacterStatusEnum.pHIT),
      "{pCRTModifier}": getStatModifier(CharacterStatusEnum.pCRT),
      "{pDEFModifier}": getStatModifier(CharacterStatusEnum.pDEF),
      "{mATKModifier}": getStatModifier(CharacterStatusEnum.mATK),
      "{mHITModifier}": getStatModifier(CharacterStatusEnum.mHIT),
      "{mCRTModifier}": getStatModifier(CharacterStatusEnum.mCRT),
      "{mDEFModifier}": getStatModifier(CharacterStatusEnum.mDEF),
      "{slashModifier}": getStatModifier(CharacterStatusEnum.slash),
      "{pierceModifier}": getStatModifier(CharacterStatusEnum.pierce),
      "{bluntModifier}": getStatModifier(CharacterStatusEnum.blunt),
      "{dodgeModifier}": getStatModifier(CharacterStatusEnum.dodge),
      "{orderModifier}": getStatModifier(CharacterStatusEnum.order),
      "{chaosModifier}": getStatModifier(CharacterStatusEnum.chaos),
      "{geoModifier}": getStatModifier(CharacterStatusEnum.geo),
      "{waterModifier}": getStatModifier(CharacterStatusEnum.water),
      "{airModifier}": getStatModifier(CharacterStatusEnum.air),
      "{fireModifier}": getStatModifier(CharacterStatusEnum.fire),
      "{bareHandModifier}": getStatModifier(CharacterStatusEnum.bareHand),
      "{swordModifier}": getStatModifier(CharacterStatusEnum.sword),
      "{bladeModifier}": getStatModifier(CharacterStatusEnum.blade),
      "{daggerModifier}": getStatModifier(CharacterStatusEnum.dagger),
      "{spearModifier}": getStatModifier(CharacterStatusEnum.spear),
      "{axeModifier}": getStatModifier(CharacterStatusEnum.axe),
      "{maceModifier}": getStatModifier(CharacterStatusEnum.mace),
      "{shieldModifier}": getStatModifier(CharacterStatusEnum.shield),
      "{bowModifier}": getStatModifier(CharacterStatusEnum.bow),
      "{magicWandModifier}": getStatModifier(CharacterStatusEnum.magicWand),
      "{staffModifier}": getStatModifier(CharacterStatusEnum.staff),
      "{tomeModifier}": getStatModifier(CharacterStatusEnum.tome),
      "{orbModifier}": getStatModifier(CharacterStatusEnum.orb),
      // '{level}': this.level,
    };

    let description = skill.meta.description;
    for (const [key, value] of Object.entries(placeholders)) {
      description = description.replace(
        new RegExp(`\\${key}`, "g"),
        value.toString(),
      );
    }
    return description;
  }
}

export interface CharacterDTO {
  characterID: string;
  partyID: string | "none";
  name: string;
  gender: "male" | "female" | "none";
  type: CharacterType;
  level: number;
  portrait: string;
  background: string;
  alignment: { law: number; chaos: number; good: number; evil: number };
  mood: number;
  energy: number;
  fame: number;
  gold: number;
  exp: number;
  isDead: boolean;
  lastTarget: string;
  currentHP: number;
  currentMP: number;
  currentSP: number;
  attributes: {
    charisma: { base: number; exp: number };
    luck: { base: number; exp: number };
    intelligence: { base: number; exp: number };
    leadership: { base: number; exp: number };
    vitality: { base: number; exp: number };
    willpower: { base: number; exp: number };
    breath: { base: number; exp: number };
    planar: { base: number; exp: number };
    dexterity: { base: number; exp: number };
    agility: { base: number; exp: number };
    strength: { base: number; exp: number };
    endurance: { base: number; exp: number };
  };
  proficiencies: {
    bareHand: { base: number; exp: number };
    sword: { base: number; exp: number };
    blade: { base: number; exp: number };
    dagger: { base: number; exp: number };
    spear: { base: number; exp: number };
    axe: { base: number; exp: number };
    mace: { base: number; exp: number };
    shield: { base: number; exp: number };
    bow: { base: number; exp: number };
    magicWand: { base: number; exp: number };
    staff: { base: number; exp: number };
    tome: { base: number; exp: number };
    orb: { base: number; exp: number };
  };
  battlers: {
    pATK: { base: number; exp: number };
    pHIT: { base: number; exp: number };
    pCRT: { base: number; exp: number };
    pDEF: { base: number; exp: number };
    mATK: { base: number; exp: number };
    mHIT: { base: number; exp: number };
    mCRT: { base: number; exp: number };
    mDEF: { base: number; exp: number };
    chiWarmATK: { base: number; exp: number };
    chiColdATK: { base: number; exp: number };
    chiWarmDEF: { base: number; exp: number };
    chiColdDEF: { base: number; exp: number };
    slash: { base: number; exp: number };
    pierce: { base: number; exp: number };
    blunt: { base: number; exp: number };
    dodge: { base: number; exp: number };
  };
  elements: {
    order: { base: number; exp: number };
    chaos: { base: number; exp: number };
    geo: { base: number; exp: number };
    water: { base: number; exp: number };
    air: { base: number; exp: number };
    fire: { base: number; exp: number };
  };
  artisans: {
    tailoring: { base: number; exp: number };
    leatherWorking: { base: number; exp: number };
    smithing: { base: number; exp: number };
    woodWorking: { base: number; exp: number };
    jewelCrafting: { base: number; exp: number };
    alchemy: { base: number; exp: number };
    cooking: { base: number; exp: number };
    enchanting: { base: number; exp: number };
  };
  equipments: {
    mainHand: string | null;
    offHand: string | null;
    armor: string | null;
    accessory: string | null;
  };
  internals: { internalID: string; level: number; exp: number }[];
  activeInternal: string;
  traits: string[];
  skills: { skillID: string; level: number; exp: number }[];
  activeSkills: { skillID: string; level: number; exp: number }[];
  position: number;
  itemsBag: string[];
  baseAC: number;
  location: string;
  isSummoned: boolean;
  arcaneAptitude: number;
}
