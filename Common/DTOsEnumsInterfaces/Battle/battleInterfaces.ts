import { CharacterInterface } from "../../RequestResponse/characterWS";
import {
  SkillConsumeByTurnInterface,
  SkillProduceByTurnInterface,
} from "../Skill/Consume+Produce";
import { GameTimeInterface } from "../GameTimeInterface";

interface TargetData {
  character: CharacterInterface;
  damageTaken: number;
  effect: TargetSkillEffect | "none";
}

export interface TurnReport {
  character: CharacterInterface;
  skill: string;
  actorSkillEffect: ActorSkillEffect;
  targets: TargetData[];
  castString: string;
}

export interface CharacterDataInterface {
  characterID: string;
  name: string;
  currentHP: number;
  maxHP: number;
  currentMP: number;
  maxMP: number;
  currentSP: number;
  maxSP: number;
  resources: { [key: string]: number };
  buffsAndDebuffs: { [key: string]: number };
  isDead: boolean;
  position: number;
  portrait: string;
}

export interface ActionDetailsInterface {
  actor: CharacterDataInterface;
  targets: CharacterDataInterface[];
  positiveTargets: CharacterDataInterface[];
  actorSkillEffect: ActorSkillEffect[];
  targetSkillEffect: TargetSkillEffect[];
  positiveTargetSkillEffect: TargetSkillEffect[];
  castMessage: string;
  sequenceMessage: string[];
}

export enum ActorSkillEffect {
  None = "none",
  Slash = "slash",
  Blunt = "blunt",
  Pierce = "pierce",
  //AutoAttack
  NoElement_Physical = "noElement_physical",
  NoElement_Magical = "noElement_magical",
  Order_Physical = "order_physical",
  Order_Magical = "order_magical",
  Water_Physical = "water_physical",
  Water_Magical = "water_magical",
  Air_Physical = "air_physical",
  Air_Magical = "air_magical",
  Chaos_Physical = "chaos_physical",
  Chaos_Magical = "chaos_magical",
  Geo_Physical = "geo_physical",
  Geo_Magical = "geo_magical",
  Fire_Physical = "fire_physical",
  Fire_Magical = "fire_magical",
  Ice_Physical = "ice_physical",
  Ice_Magical = "ice_magical",
  Spirit_Physical = "spirit_physical",
  Spirit_Magical = "spirit_magical",
  Lightning_Physical = "lightning_physical",
  Lightning_Magical = "lightning_magical",
  Demonic_Physical = "demonic_physical",
  Demonic_Magical = "demonic_magical",
  Metal_Physical = "metal_physical",
  Metal_Magical = "metal_magical",
  Angelic_Physical = "angelic_physical",
  Angelic_Magical = "angelic_magical",
  Human_Physical = "human_physical",
  Human_Magical = "human_magical",
  Ghost_Physical = "ghost_physical",
  Ghost_Magical = "ghost_magical",
  Holy_Physical = "holy_physical",
  Holy_Magical = "holy_magical",
  Life_Physical = "life_physical",
  Life_Magical = "life_magical",
  Poison_Physical = "poison_physical",
  Poison_Magical = "poison_magical",
  Dark_Physical = "dark_physical",
  Dark_Magical = "dark_magical",

  //Cast
  NoElement_Cast = "noElement_cast",
  Order_Cast = "order_cast",
  Ice_Cast = "ice_cast",
  Water_Cast = "water_cast",
  Spirit_Cast = "spirit_cast",
  Air_Cast = "air_cast",
  Lightning_Cast = "lightning_cast",
  Chaos_Cast = "chaos_cast",
  Demonic_Cast = "demonic_cast",
  Fire_Cast = "fire_cast",
  Metal_Cast = "metal_cast",
  Geo_Cast = "geo_cast",
  Angelic_Cast = "angelic_cast",
  Human_Cast = "human_cast",
  Ghost_Cast = "ghost_cast",
  Holy_Cast = "holy_cast",
  Life_Cast = "life_cast",
  Poison_Cast = "poison_cast",
  Dark_Cast = "dark_cast",
  Arcane_Cast = "arcane_cast",
  //Chi, Internal Power
  NoElement_Chi = "noElement_chi",
  Order_Chi = "order_chi",
  Ice_Chi = "ice_chi",
  Water_Chi = "water_chi",
  Spirit_Chi = "spirit_chi",
  Air_Chi = "air_chi",
  Lightning_Chi = "lightning_chi",
  Chaos_Chi = "chaos_chi",
  Demonic_Chi = "demonic_chi",
  Fire_Chi = "fire_chi",
  Metal_Chi = "metal_chi",
  Geo_Chi = "geo_chi",
  Angelic_Chi = "angelic_chi",
  Human_Chi = "human_chi",
  Ghost_Chi = "ghost_chi",
  Holy_Chi = "holy_chi",
  Life_Chi = "life_chi",
  Poison_Chi = "poison_chi",
  Dark_Chi = "dark_chi",
  None_Chi = "none_chi",
}

export enum TargetSkillEffect {
  None = "none",
  NoElement = "noElement",
  //Hit
  Miss = "miss",
  NoElement_Slash_1 = "noElement_slash_1",
  NoElement_Slash_2 = "noElement_slash_2",
  NoElement_Slash_3 = "noElement_slash_3",
  NoElement_Blunt_1 = "noElement_blunt_1",
  NoElement_Blunt_2 = "noElement_blunt_2",
  NoElement_Blunt_3 = "noElement_blunt_3",
  NoElement_Pierce_1 = "noElement_pierce_1",
  NoElement_Pierce_2 = "noElement_pierce_2",
  NoElement_Pierce_3 = "noElement_pierce_3",
  //Element_Hit
  Order_1 = "order_1",
  Order_2 = "order_2",
  Order_3 = "order_3",
  Ice_1 = "ice_1",
  Ice_2 = "ice_2",
  Ice_3 = "ice_3",
  Water_1 = "water_1",
  Water_2 = "water_2",
  Water_3 = "water_3",
  Spirit_1 = "spirit_1",
  Spirit_2 = "spirit_2",
  Spirit_3 = "spirit_3",
  Air_1 = "air_1",
  Air_2 = "air_2",
  Air_3 = "air_3",
  Lightning_1 = "lightning_1",
  Lightning_2 = "lightning_2",
  Lightning_3 = "lightning_3",
  Chaos_1 = "chaos_1",
  Chaos_2 = "chaos_2",
  Chaos_3 = "chaos_3",
  Demonic_1 = "demonic_1",
  Demonic_2 = "demonic_2",
  Demonic_3 = "demonic_3",
  Fire_1 = "fire_1",
  Fire_2 = "fire_2",
  Fire_3 = "fire_3",
  Metal_1 = "metal_1",
  Metal_2 = "metal_2",
  Metal_3 = "metal_3",
  Geo_1 = "geo_1",
  Geo_2 = "geo_2",
  Geo_3 = "geo_3",
  Angelic_1 = "angelic_1",
  Angelic_2 = "angelic_2",
  Angelic_3 = "angelic_3",
  Human_1 = "human_1",
  Human_2 = "human_2",
  Human_3 = "human_3",
  Ghost_1 = "ghost_1",
  Ghost_2 = "ghost_2",
  Ghost_3 = "ghost_3",
  Holy_1 = "holy_1",
  Holy_2 = "holy_2",
  Holy_3 = "holy_3",
  Life_1 = "life_1",
  Life_2 = "life_2",
  Life_3 = "life_3",
  Poison_1 = "poison_1",
  Poison_2 = "poison_2",
  Poison_3 = "poison_3",
  Dark_1 = "dark_1",
  Dark_2 = "dark_2",
  Dark_3 = "dark_3",
  Arcane_1 = "arcane_1",
  Arcane_2 = "arcane_2",
  Arcane_3 = "arcane_3",
  //Debuff
  stun = "stun",
  blind = "blind",
  slow = "slow",
  bleed = "bleed",
  poison = "poison",
  bound = "bound",
  paralyse = "paralyse",
  burn = "burn",
  awed = "awed",
  cursed = "cursed",
  freeze = "freeze",
  confuse = "confuse",
  fear = "fear",
  entangled = "entangled",
  soaked = "soaked",
  //Buff
  stoneSkin = "stoneSkin-buff",
  counterAttack_1 = "counterAttack-buff",
  counterAttack_2 = "counterAttack-buff",
  counterAttackCharge_1 = "counterAttackCharge-buff",
  counterAttackCharge_2 = "counterAttackCharge-buff",
  cautious = "cautious-buff",
  focus = "focus-buff",
  defend = "defend-buff",
  defensiveStance_1 = "defensiveStance-buff",
  defensiveStance_2 = "defensiveStance-buff",
  taunt = "taunt-buff",
  arcaneShield = "arcaneShield-buff",
  timeWarp = "timeWarp-buff",
  weaponMagicalCoating = "weaponMagicalCoating-buff",
  stealth = "stealth-buff",
  bless = "bless-buff",
  haste = "haste-buff",
  shielded = "shielded-buff",
  inspiration = "inspiration-buff",
  fightingSpirit_1 = "fightingSpirit-buff",
  fightingSpirit_2 = "fightingSpirit-buff",
  fightingSpirit_3 = "fightingSpirit-buff",
  divineShield = "divineShield-buff",
  manaShield = "manaShield-buff",
  zealotsFury = "zealotsFury-buff",
  primalRoar = "primalRoar-buff",
  Medidtate = "medidtate-buff",
  SpiritSword = "spiritSword-buff",
  //Heal
  heal = "heal",
  //Absorb resources
  absorbResource = "absorbResource",
}

export interface BattleReportInterface {
  startingPartyAMembers: CharacterDataInterface[];
  partyAPlayer: string | "none";
  startingPartyBMembers: CharacterDataInterface[];
  partyBPlayer: string | "none";
  battleTurn: TurnReport[];
  location: string;
  gameTime: GameTimeInterface;
}
