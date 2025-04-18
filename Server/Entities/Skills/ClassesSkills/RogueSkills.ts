import {
  ActorSkillEffect,
  TargetSkillEffect,
  TurnReport,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { WeaponSpecificType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { ActiveSkill, Skill } from "../Skill";
import {
  ElementConsume,
  ElementProduce,
  SkillConsume,
  SkillProduce,
} from "../SubClasses/SkillConsume";
import {
  calculateCritAndHit,
  noEquipmentNeeded,
  noRequirementNeeded,
} from "../Utils";
import { Character } from "../../Character/Character";
import { Party } from "../../Party/Party";
import {
  BuffsAndDebuffsEnum,
  TargetScope,
  TargetTauntConsideration,
  TargetType,
} from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { trySelectOneTarget } from "../../../Game/Battle/TargetSelectionProcess";
import { AttributeEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { Dice } from "../../../Utility/Dice";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { StatMod } from "../../../Utility/StatMod";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { createCastString } from "../Utils/makeCastString";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { receiveDebuff } from "../../Character/Utils/buffsAndDebuffsFunctions";

const skill_triple_slash = new ActiveSkill(
  {
    id: `skill_triple_slash`,
    name: `Triple Slash`,
    tier: Tier.common,
    description: `“Slash the enemy three times, each hit dealing 0.3x weapon damage (+0.05 per level). Each consecutive hit slightly increases critical chance. Damage is based on Dexterity and may critically hit.”.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: [
      WeaponSpecificType.sword_long,
      WeaponSpecificType.sword_short,
      WeaponSpecificType.blade_katana,
      WeaponSpecificType.blade_cutlass,
      WeaponSpecificType.blade_falchion,
      WeaponSpecificType.blade_scimitar,
      WeaponSpecificType.dagger_knife,
      WeaponSpecificType.dagger_stiletto,
    ],
    consume: new SkillConsume({
      sp: [5, 6, 7, 8, 9],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.none,
          amount: [2, 2, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.air,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
      ],
    }),
    isSpell: false,
    isWeaponAttack: true,
    executor: skill_triple_slash_exec,
  },
);

function skill_triple_slash_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const targetType: TargetType = {
    scope: TargetScope.Single,
    taunt: TargetTauntConsideration.TauntCount,
  };

  const target = trySelectOneTarget(
    character,
    enemies,
    targetType,
    "Triple Slash",
  );
  if (!(target instanceof Character)) return target;

  const weapon = character.getWeapon();
  let baseMultiplier = 0.3;
  if (skillLevel > 1) baseMultiplier += (skillLevel - 1) * 0.05;
  let castString = `${character.name} uses Triple Slash on ${target.name}!`;
  let totalDamage = 0;

  const isSpell = false;
  const hitStat = AttributeEnum.dexterity;
  const critStat = AttributeEnum.luck;

  const dice =
    weapon != "none" ? weapon.attackStats!.physicalDiceEnum : DiceEnum.TwoD6;

  const damageType =
    weapon != "none" ? weapon.attackStats!.physicalType : DamageTypes.slash;

  let allCritBonus = 0;

  for (let i = 0; i < 3; i++) {
    let additionalCrit = i;
    if (skillLevel === 5) additionalCrit += 1;
    character.status.battlers.pCRT.bonus += additionalCrit;
    allCritBonus += additionalCrit;
    let [crit, hitChance] = calculateCritAndHit(
      character,
      target,
      isSpell,
      hitStat,
      critStat,
    );

    let damage =
      Dice.roll(dice).sum * baseMultiplier +
      StatMod.value(character.status.dexterity());
    if (crit) damage *= 2;
    if (character.position < 3) damage = damage * 0.7;

    let result = target.receiveDamage({
      attacker: character,
      damage,
      hitChance,
      damageType,
      locationName: context.location,
    });

    if (result.dHit) {
      totalDamage += result.damage;
      castString += ` Hit ${i + 1} deals ${result.damage} damage${
        crit ? " (Critical!)" : ""
      }!`;
    } else {
      castString += ` Hit ${i + 1} missed!`;
    }
  }

  character.status.battlers.pCRT.bonus -= allCritBonus;

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_triple_slash",
    actorSkillEffect: ActorSkillEffect.Slash,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: totalDamage,
        effect: TargetSkillEffect.NoElement_Slash_1,
      },
    ],
    castString,
  };
}

const skill_poisoned_blade = new ActiveSkill(
  {
    id: `skill_poisoned_blade`,
    name: `Poisoned Blade`,
    tier: Tier.common,
    description: `Attack with a weapon imbued with poison, dealing damage and poisoning the target for 3 turns. +1 damage per level, +1 duration at level 5.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: [
      WeaponSpecificType.dagger_knife,
      WeaponSpecificType.dagger_stiletto,
    ],
    consume: new SkillConsume({
      sp: [5, 5, 5, 5, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.chaos,
          amount: [1, 1, 1, 1, 1],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.geo,
          amount: [1, 1, 1, 1, 1],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.air,
          amountRange: [
            [0, 2],
            [0, 2],
            [0, 2],
            [0, 2],
            [0, 2],
          ],
        }),
      ],
    }),
    isSpell: false,
    isWeaponAttack: true,
    executor: skill_poisoned_blade_exec,
  },
);

function skill_poisoned_blade_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const targetType: TargetType = {
    scope: TargetScope.Single,
    taunt: TargetTauntConsideration.TauntCount,
  };

  const target = trySelectOneTarget(
    character,
    enemies,
    targetType,
    "Poisoned Blade",
  );
  if (!(target instanceof Character)) return target;

  const weapon = character.getWeapon();

  const isSpell = false;
  const hitStat = AttributeEnum.dexterity;
  const critStat = AttributeEnum.luck;
  let [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  const dice =
    weapon != "none" ? weapon.attackStats!.physicalDiceEnum : DiceEnum.TwoD6;

  let damage =
    Dice.roll(dice).sum +
    StatMod.value(character.status.dexterity()) +
    skillLevel;
  if (crit) damage *= 2;
  if (character.position < 3) damage *= 0.7;

  const damageType = DamageTypes.pierce;

  let result = target.receiveDamage({
    attacker: character,
    damage,
    hitChance,
    damageType,
    locationName: context.location,
  });

  let castString = createCastString({
    actor: character,
    target: target,
    skillName: "Poisoned Blade",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: damageType,
  });

  if (result.dHit) {
    const poisonDuration = skillLevel >= 5 ? 4 : 3;
    const buffResult = receiveDebuff(
      target,
      BuffsAndDebuffsEnum.poison,
      poisonDuration,
    );
    if (buffResult.result) {
      castString += ` ${target.name} is poisoned for ${poisonDuration} turns!`;
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_poisoned_blade",
    actorSkillEffect: ActorSkillEffect.Poison_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.poison,
      },
    ],
    castString,
  };
}

const skill_stealth = new ActiveSkill(
  {
    id: `skill_stealth`,
    name: `Stealth`,
    tier: Tier.common,
    description: `Enter stealth mode. Must pass a DC10 agility save (DC reduced by 1 per level). Duration increased at level 5.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      sp: [5, 5, 5, 5, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.none,
          amount: [3, 3, 3, 3, 3],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.air,
          amountRange: [
            [0, 2],
            [0, 2],
            [0, 2],
            [0, 2],
            [0, 2],
          ],
        }),
        new ElementProduce({
          element: FundamentalElementTypes.fire,
          amountRange: [
            [0, 2],
            [0, 2],
            [0, 2],
            [0, 2],
            [0, 2],
          ],
        }),
      ],
    }),
    isSpell: false,
    isWeaponAttack: false,
    executor: skill_stealth_exec,
  },
);

function skill_stealth_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const dc = 10 - (skillLevel - 1);
  const saveRoll = character.saveRoll(CharacterStatusEnum.agility);
  const success = saveRoll >= dc;
  const duration = skillLevel >= 5 ? 3 : 2;

  let castString = `${character.name} attempts to enter stealth mode. `;

  if (success) {
    const buffResult = receiveDebuff(
      character,
      BuffsAndDebuffsEnum.stealth,
      duration,
    );
    if (buffResult.result) {
      castString += `Successfully enters stealth for ${duration} turns!`;
    }
  } else {
    castString += `Failed to enter stealth!`;
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_stealth",
    actorSkillEffect: ActorSkillEffect.Chaos_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(character),
        damageTaken: 0,
        effect: TargetSkillEffect.stealth,
      },
    ],
    castString,
  };
}

const skill_back_stab = new ActiveSkill(
  {
    id: `skill_back_stab`,
    name: `Back Stab`,
    tier: Tier.common,
    description: `Attack from behind, dealing 1.2 weapon damage. If used while in stealth, deal additional 80% damage and remove stealth. If target is poisoned, each turn of poison left will increase damage by 40%. Damage increases by level.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: [
      WeaponSpecificType.dagger_knife,
      WeaponSpecificType.dagger_stiletto,
    ],
    consume: new SkillConsume({
      sp: [5, 5, 5, 5, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.air,
          amount: [2, 2, 2, 2, 1],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.fire,
          amount: [1, 1, 1, 1, 1],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.none,
          amountRange: [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
          ],
        }),
      ],
    }),
    isSpell: false,
    isWeaponAttack: true,
    executor: skill_back_stab_exec,
  },
);

function skill_back_stab_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const targetType: TargetType = {
    scope: TargetScope.Single,
    taunt: TargetTauntConsideration.TauntCount,
  };

  const target = trySelectOneTarget(
    character,
    enemies,
    targetType,
    "Back Stab",
  );
  if (!(target instanceof Character)) return target;

  const weapon = character.getWeapon();

  const isSpell = false;
  const hitStat = AttributeEnum.dexterity;
  const critStat = AttributeEnum.luck;
  let [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  const dice =
    weapon != "none" ? weapon.attackStats!.physicalDiceEnum : DiceEnum.TwoD6;

  // Calculate damage multiplier
  let damageMultiplier = 1.2 + skillLevel * 0.1; // Base multiplier + level bonus
  if (character.buffsAndDebuffs.stealth > 0) {
    damageMultiplier += 0.8;
  }
  if (target.buffsAndDebuffs.poison > 0) {
    damageMultiplier += 0.4 * target.buffsAndDebuffs.poison;
  }

  let damage =
    Dice.roll(dice).sum * damageMultiplier +
    StatMod.value(character.status.dexterity());
  if (crit) damage *= 2;

  const damageType = DamageTypes.pierce;

  let result = target.receiveDamage({
    attacker: character,
    damage,
    hitChance,
    damageType,
    locationName: context.location,
  });

  let castString = createCastString({
    actor: character,
    target: target,
    skillName: "Back Stab",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: damageType,
  });

  if (result.dHit) {
    if (character.buffsAndDebuffs.stealth > 0) {
      character.buffsAndDebuffs.stealth = 0;
      castString += ` ${character.name} leaves stealth!`;
    }
    if (target.buffsAndDebuffs.poison > 0) {
      target.buffsAndDebuffs.poison = 0;
      castString += ` ${target.name}'s poison is consumed!`;
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_back_stab",
    actorSkillEffect: ActorSkillEffect.Chaos_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.NoElement_Pierce_1,
      },
    ],
    castString,
  };
}

export const rogueSkills: Skill[] = [
  skill_triple_slash,
  skill_poisoned_blade,
  skill_stealth,
  skill_back_stab,
];
