import { AttributeEnum } from "../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { PreferredPosition } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Character } from "../Character/Character";
import { ActorSkillEffect } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Dice } from "../../Utility/Dice";
import { StatMod } from "../../Utility/StatMod";
import { turnCharacterIntoInterface } from "../Character/Utils/turnCharacterIntoInterface";
import { TurnReport } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { ArmorType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { TraitEnum } from "../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";

export enum DamageSourceType {
  Physical,
  Magical,
}

export const noRequirementNeeded = new SkillLearningRequirement({
  preRequireSkillID: [],
  preRequireElements: [],
  preRequireProficiencies: [],
  preRequireAttributes: [],
  preRequireArtisans: [],
  preRequireCharacterLevel: 0,
  preRequireCharacterTrait: [],
});

export const noEquipmentNeeded = [];

export function extractWeaponStats(
  character: Character,
  damageSource: DamageSourceType,
): {
  damageDice: DiceEnum;
  bonusStat: AttributeEnum;
  damageType: DamageTypes;
  preferredPosition: PreferredPosition;
  bonus: number;
} {
  const weapon = character.getWeapon();
  let damageDice: DiceEnum = DiceEnum.OneD6;
  let bonusStat: AttributeEnum =
    damageSource === DamageSourceType.Physical
      ? AttributeEnum.strength
      : AttributeEnum.planar;
  let damageType: DamageTypes =
    damageSource === DamageSourceType.Physical
      ? DamageTypes.blunt
      : DamageTypes.arcane;
  let preferredPosition: PreferredPosition =
    damageSource === DamageSourceType.Physical
      ? PreferredPosition.melee
      : PreferredPosition.ranged;
  let bonus = 0;

  if (weapon !== "none" && weapon.attackStats) {
    if (damageSource === DamageSourceType.Magical) {
      damageDice = weapon.attackStats.magicalDiceEnum;
      bonusStat = weapon.attackStats.magicalDamageStat;
      damageType = weapon.attackStats.magicalType;
      bonus =
        weapon.attackStats.bonus.mATK +
        (damageType === DamageTypes.geo
          ? weapon.attackStats.bonus.geo
          : damageType === DamageTypes.water
            ? weapon.attackStats.bonus.water
            : damageType === DamageTypes.air
              ? weapon.attackStats.bonus.air
              : weapon.attackStats.bonus.fire);
    } else {
      damageDice = weapon.attackStats.physicalDiceEnum;
      bonusStat = weapon.attackStats.physicalDamageStat;
      damageType = weapon.attackStats.physicalType;
      bonus =
        weapon.attackStats.bonus.pATK +
        (damageType === DamageTypes.slash
          ? weapon.attackStats.bonus.slash
          : damageType === DamageTypes.pierce
            ? weapon.attackStats.bonus.pierce
            : weapon.attackStats.bonus.blunt);
    }
    preferredPosition = weapon.attackStats.preferredPosition;
  }

  return { damageDice, bonusStat, damageType, preferredPosition, bonus };
}

export function buildCastString(base: string, effect?: string): string {
  return effect ? `${base} ${effect}` : base;
}

export function calculateCritAndHit(
  character: Character,
  target: Character,
  hitStat?: AttributeEnum,
  critStat?: AttributeEnum,
): [boolean, number] {
  const hitRoll = Dice.rollTwenty();
  if (hitRoll === 1) return [false, 1];

  let [hitModifier, critModifier] = [0, 0];
  if (hitStat) hitModifier = StatMod.value(character.status[hitStat]());
  if (critStat) critModifier = StatMod.value(character.status[critStat]());

  if (hitRoll + critModifier >= 20) return [true, 20];

  return [false, hitRoll + hitModifier];
}

export function applyOnHitEffects(
  character: Character,
  target: Character,
  incomingDamage: number,
): [onHitString: string, outPutDamage: number] {
  let onHitString = "";
  let outPutDamage = incomingDamage;

  // Poison coating
  if (character.buffsAndDebuffs.poisonCoating_3 > 0) {
    target.buffsAndDebuffs.poison += 3;
    onHitString += `${character.name} applied 3 stacks of poison to ${target.name}. `;
  } else if (character.buffsAndDebuffs.poisonCoating_2 > 0) {
    target.buffsAndDebuffs.poison += 2;
    onHitString += `${character.name} applied 2 stacks of poison to ${target.name}. `;
  } else if (character.buffsAndDebuffs.poisonCoating_1 > 0) {
    target.buffsAndDebuffs.poison += 1;
    onHitString += `${character.name} applied 1 stack of poison to ${target.name}. `;
  }

  return [onHitString.trim(), outPutDamage];
}

const spellDamagePenalty = {
  medium: 0.7,
  heavy: 0.4,
};

const spellHitPenalty = {
  medium: 3,
  heavy: 5,
};

export function getSpellDamageAfterArmorPenalty(
  character: Character,
  spellDamage: number,
): number {
  const armor = character.equipments.armor;
  const hasWarCaster = character.traits.some(
    (t) => t.id === TraitEnum.trait_warCaster,
  );
  if (!armor) return spellDamage;

  switch (armor.armorType) {
    case ArmorType.medium:
      return hasWarCaster
        ? spellDamage
        : spellDamage * spellDamagePenalty.medium;
    case ArmorType.heavy:
      return hasWarCaster
        ? spellDamage * spellDamagePenalty.medium
        : spellDamage * spellDamagePenalty.heavy;
    default:
      return spellDamage;
  }
}

export function getSpellHitAfterArmorPenalty(
  character: Character,
  spellHit: number,
): number {
  const armor = character.equipments.armor;
  const hasWarCaster = character.traits.some(
    (t) => t.id === TraitEnum.trait_warCaster,
  );
  if (!armor) return spellHit;

  switch (armor.armorType) {
    case ArmorType.medium:
      return hasWarCaster ? spellHit : spellHit - spellHitPenalty.medium;
    case ArmorType.heavy:
      return hasWarCaster
        ? spellHit - spellHitPenalty.medium
        : spellHit - spellHitPenalty.heavy;
    default:
      return spellHit;
  }
}
