//MARK: Cleric Skills
/*
1. Smite
2. Orderic Blast
3. Blessing
4. Holy Water
5. Ball of Light
6. Heal
7. Divine's Fury
8. Divine Shield
9. Divine Intervention
10. Harmony
11. Inspiration
12. Laoh's Blessing
13. Judgement of Laoh
14. Holy Nova
*/

import {
  ActorSkillEffect,
  TargetSkillEffect,
  TurnReport,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { WeaponSpecificType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
  BuffsAndDebuffsEnum,
  TargetScope,
  TargetSortingOptions,
  TargetTauntConsideration,
  TargetType,
} from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import {
  selectMultipleTargets,
  selectOneTarget,
  selectTargets,
  trySelectOneTarget,
} from "../../../Game/Battle/TargetSelectionProcess";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { Skill } from "../Skill";
import {
  ElementConsume,
  ElementProduce,
  SkillConsume,
  SkillProduce,
} from "../SubClasses/SkillConsume";
import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement";
import {
  calculateCritAndHit,
  getSpellDamageAfterArmorPenalty,
  isSpellCastSuccessConcerningArmor,
  noEquipmentNeeded,
  noRequirementNeeded,
} from "../Utils";
import { Character } from "../../Character/Character";
import { Party } from "../../Party/Party";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { Dice } from "../../../Utility/Dice";
import { CharacterType } from "../../Character/Enums/CharacterType";
import { StatMod } from "../../../Utility/StatMod";
import { AttributeEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { DamageMultiplierFromBothPositions } from "../../../Utility/DamageMultiplierFromPosition";
import { createCastString } from "../Utils/makeCastString";
import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { TraitRepository } from "../../Traits/Trait";
import { ArmorType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import {
  skillExecNoTargetReport,
  skillExecSpellCastFailDueToArmorReport,
} from "../Utils/report";
import { Weapon } from "../../Items/Equipments/Weapon/Weapon";
import {
  receiveBuff,
  receiveDebuff,
} from "../../Character/Utils/buffsAndDebuffsFunctions";

const skill_smite = new Skill(
  {
    id: "skill_smite",
    name: "Smite",
    tier: Tier.common,
    description: `Attack one enemy, dealing 1.2 times weapon's physical damage (+0.1 per level) (+strength, +charisma) if the target is undead, damage is doubled. If the user is in the back row, damage is halved.`,
    requirement: noRequirementNeeded,
    equipmentNeeded: [
      WeaponSpecificType.sword_great,
      WeaponSpecificType.sword_long,
      WeaponSpecificType.sword_short,
      WeaponSpecificType.mace_hammer,
      WeaponSpecificType.mace_morningstar,
      WeaponSpecificType.mace_warhammer,
      WeaponSpecificType.tome_bible,
    ],
    castString: "use smite",
    consume: new SkillConsume({
      sp: [5, 5, 5, 5, 5],
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
          element: FundamentalElementTypes.order,
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
    isAuto: false,
    isWeaponAttack: true,
    isReaction: false,
  },
  skill_smite_exec,
);

function skill_smite_exec(
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

  const target = trySelectOneTarget(character, enemies, targetType, "smite");
  if (!(target instanceof Character)) return target;

  let weapon = character.getWeapon();
  if (!(weapon instanceof Weapon))
    throw new Error("Exceptional: No weapon found");

  const isSpell = true;
  const hitStat = AttributeEnum.dexterity;
  const critStat = AttributeEnum.luck;
  let [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  let damage =
    Dice.roll(weapon.attackStats!.physicalDiceEnum).sum *
      (1.2 + 0.1 * skillLevel) +
    (StatMod.value(character.status.strength()) +
      StatMod.value(character.status.charisma()));

  if (target.type === CharacterType.undead) damage *= 2;
  if (crit) damage *= 2;

  const damageModifierFromPosition = DamageMultiplierFromBothPositions.get({
    preferredActorPosition: "front",
    preferredTargetPosition: "front",
    rightModifier: 1,
    middleGroundModifier: 0.75,
    wrongModifier: 0.5,
    actorPosition: character.position,
    targetPosition: target.position,
  });

  damage *= damageModifierFromPosition;

  let result = target.receiveDamage({
    attacker: character,
    damage: damage,
    hitChance: hitChance,
    damageType: DamageTypes.order,
    locationName: context.location,
  });

  let castString = createCastString({
    actor: character,
    target: target,
    skillName: "smite",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: DamageTypes.order,
  });

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_smite",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Order_1,
      },
    ],
    castString,
  };
}

const skill_aid = new Skill(
  {
    id: "skill_aid",
    name: "Aid",
    tier: Tier.common,
    description: `Heals one ally with least HP. The amount of healing is 1D4 + willpower modifier. Amount of healing is increased by 1D2 for each level of the skill.`,
    requirement: noRequirementNeeded,
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast aid",
    consume: new SkillConsume({
      mp: [3, 3, 3, 3, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.water,
          amount: [1, 1, 1, 1, 1],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.none,
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
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_aid_exec,
);

function skill_aid_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "aid");

  const targetType: TargetType = {
    scope: TargetScope.Single,
    sort: TargetSortingOptions.LowestHP,
  };
  const target = trySelectOneTarget(character, allies, targetType, "aid");
  if (!(target instanceof Character))
    return skillExecNoTargetReport(character, "aid");

  let levelingHeal = 0;
  for (let i = 1; i <= skillLevel; i++) {
    levelingHeal += Dice.roll(DiceEnum.OneD2).sum;
  }

  let healing = Math.max(
    Dice.roll(DiceEnum.OneD4).sum +
      StatMod.value(character.status.willpower()) +
      levelingHeal,
    0,
  );

  const crit = Dice.rollTwenty() === 20;
  if (crit) {
    healing = Math.floor((healing *= 1.5));
  }

  healing = getSpellDamageAfterArmorPenalty(character, healing);

  const castString = `${character.name} casts Aid on ${target.name}, ${
    crit ? "with critical" : ""
  } healing ${healing} HP.`;

  let result = target.receiveHeal({
    actor: character,
    healing: healing,
  });

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_aid",
    actorSkillEffect: ActorSkillEffect.Water_Magical,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.heal,
        effect: TargetSkillEffect.heal,
      },
    ],
    castString,
  };
}

const skill_orderic_blast = new Skill(
  {
    id: "skill_orderic_blast",
    name: "Orderic Blast",
    tier: Tier.uncommon,
    description: `Blast the enemy with order energy dealing 1.3 times weapon magical damage (+ 0.1 per skill level) (+ charisma).`,
    requirement: noRequirementNeeded,
    equipmentNeeded: [
      WeaponSpecificType.wand_magic,
      WeaponSpecificType.wand_scepter,
      WeaponSpecificType.orb_crystal,
      WeaponSpecificType.orb_metallic,
      WeaponSpecificType.staff_long,
      WeaponSpecificType.staff_magic,
      WeaponSpecificType.staff_quarter,
      WeaponSpecificType.tome_bible,
      WeaponSpecificType.tome_codex,
    ],
    castString: "cast orderic blast",
    consume: new SkillConsume({
      mp: [5, 5, 6, 6, 7],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [1, 1, 1, 1, 1],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.fire,
          amountRange: [
            [0, 1],
            [0, 1],
            [1, 1],
            [1, 1],
            [1, 2],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_orderic_blast_exec,
);

function skill_orderic_blast_exec(
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
    "orderic blast",
  );
  if (!(target instanceof Character)) return target;

  let weapon = character.getWeapon();
  if (!(weapon instanceof Weapon))
    throw new Error("Exceptional: No weapon found");

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.luck;
  const [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  let damage =
    Dice.roll(weapon.attackStats!.magicalDiceEnum).sum *
      (1.3 + 0.1 * skillLevel) +
    StatMod.value(character.status.charisma());

  if (crit) damage *= 2;
  damage = getSpellDamageAfterArmorPenalty(character, damage);

  let result = target.receiveDamage({
    attacker: character,
    damage: damage,
    hitChance: hitChance,
    damageType: DamageTypes.order,
    locationName: context.location,
  });

  let castString = `${character.name} cast orderic blast on ${target.name}, `;
  if (crit) castString += `CRITICAL! `;
  if (result.dHit) {
    castString += `dealing (damage=${result.damage}) order damage.`;
  } else {
    castString += `but missed!`;
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_orderic_blast",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Order_2,
      },
    ],
    castString,
  };
}

const skill_blessing = new Skill(
  {
    id: "skill_blessing",
    name: "Blessing",
    tier: Tier.common,
    description: `Bless all party members for 1 turn, all blessed party members gain 1d4 to all saving throws. At level 3 and 5 duration increases to 2 and 3 turns respectively.`,
    requirement: noRequirementNeeded,
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast blessing",
    consume: new SkillConsume({
      mp: [7, 6, 5, 4, 3],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [1, 1, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.water,
          amountRange: [
            [0, 1],
            [0, 1],
            [1, 1],
            [1, 1],
            [1, 2],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_blessing_exec,
);

function skill_blessing_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "blessing");

  const _: TargetType = { scope: TargetScope.All };

  const isSpell = true;
  const duration = skillLevel === 5 ? 3 : skillLevel >= 3 ? 2 : 1;

  let castString = `${character.name} casts Blessing on all allies.`;

  let targets = [];
  for (const target of allies.characters) {
    if (target && target !== "none") {
      const buffResult = receiveBuff(
        target,
        BuffsAndDebuffsEnum.bless,
        duration,
      );

      if (buffResult.result) {
        targets.push({
          character: turnCharacterIntoInterface(target),
          damageTaken: 0,
          effect: TargetSkillEffect.bless,
        });
      }

      castString += buffResult.message;
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_blessing",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets,
    castString,
  };
}

const skill_holy_water = new Skill(
  {
    id: "skill_holy_water",
    name: "Holy Water",
    tier: Tier.uncommon,
    description: `Deals 1d3 damage to all enemies (+ Charisma Modifier) and target must roll DC10 willpower save or get Awed for 2 turns. Awed target saving throws are -2. Each level deal additional 1 damage.`,
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [
        { element: FundamentalElementTypes.order, value: 1 },
      ],
      preRequireCharacterLevel: 3,
      preRequireCharacterTrait: [],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast holy water",
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.water,
          amount: [2, 2, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.order,
          amountRange: [
            [1, 2],
            [1, 2],
            [1, 2],
            [1, 2],
            [1, 2],
          ],
        }),
        new ElementProduce({
          element: FundamentalElementTypes.geo,
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
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_holy_water_exec,
);

function skill_holy_water_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "holy water");

  const targetType: TargetType = {
    scope: TargetScope.All,
    taunt: TargetTauntConsideration.TauntCount,
  };
  const avaliableTargets = selectMultipleTargets(
    character,
    enemies,
    targetType,
  );
  if (avaliableTargets.length === 0) {
    return skillExecNoTargetReport(character, "cast holy water");
  }

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.luck;
  let castString = `${character.name} casts Holy Water, attacking all enemies.`;

  let targets = [];

  let damage =
    Dice.roll(DiceEnum.OneD3).sum +
    StatMod.value(character.status.charisma()) +
    skillLevel;
  damage = getSpellDamageAfterArmorPenalty(character, damage);

  for (const target of avaliableTargets) {
    //Can't crit
    const [_, hitChance] = calculateCritAndHit(
      character,
      target,
      isSpell,
      hitStat,
      critStat,
    );

    let result = target.receiveDamage({
      attacker: character,
      damage: damage,
      hitChance: hitChance,
      damageType: DamageTypes.order,
      locationName: context.location,
    });

    castString += `\n${target.name} ${
      result.dHit
        ? `takes ${result.damage} order damage.`
        : `avoided the attack.`
    }`;

    if (result.dHit) {
      const [diceRoll, baseModifier, buffModifier] = target.saveRoll(
        CharacterStatusEnum.willpower,
      );
      if (diceRoll + baseModifier + buffModifier < 10) {
        const debuffResult = receiveDebuff(target, BuffsAndDebuffsEnum.awed, 2);
        castString += debuffResult.message;
      }
    }

    targets.push({
      character: turnCharacterIntoInterface(target),
      damageTaken: result.damage,
      effect: TargetSkillEffect.Order_1,
    });
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_holy_water",
    actorSkillEffect: ActorSkillEffect.Holy_Cast,
    targets,
    castString,
  };
}

const skill_ball_of_light = new Skill(
  {
    id: "skill_ball_of_light",
    name: "Ball of Light",
    tier: Tier.uncommon,
    description:
      "Shoot a Ball of Light at the target, dealing 1d8 order damage at an enemy. If the target is in awed state, player may roll for 12DC if the roll is higher will attack again. DC -1 per level",
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [
        { element: FundamentalElementTypes.order, value: 1 },
      ],
      preRequireCharacterLevel: 3,
      preRequireCharacterTrait: [TraitRepository.trait_faithful.id],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast ball of light",
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [1, 1, 1, 1, 1],
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
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_ball_of_light_exec,
);

function skill_ball_of_light_exec(
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
    "ball of light",
  );
  if (!(target instanceof Character)) return target;

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.luck;

  let castString = `${character.name} casts Ball of Light at ${target.name}.`;
  let targets = [];

  const [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  let damage =
    Dice.roll(DiceEnum.OneD8).sum + StatMod.value(character.status.charisma());
  if (crit) damage *= 2;
  damage = getSpellDamageAfterArmorPenalty(character, damage);

  let result = target.receiveDamage({
    attacker: character,
    damage: damage,
    hitChance: hitChance,
    damageType: DamageTypes.order,
    locationName: context.location,
  });

  castString += `\n${target.name} ${
    result.dHit ? `takes ${result.damage} order damage.` : `avoided the attack.`
  }`;

  if (result.dHit) {
    targets.push({
      character: turnCharacterIntoInterface(target),
      damageTaken: result.damage,
      effect: TargetSkillEffect.Order_1,
    });

    // Check for second attack if target is awed
    if (target.buffsAndDebuffs.awed > 0) {
      const roll = Dice.roll(DiceEnum.OneD20).sum + skillLevel;
      if (roll > 12 - skillLevel) {
        castString += `\nSince ${target.name} is in Awed state, ${character.name} attacks again!`;

        const secondResult = target.receiveDamage({
          attacker: character,
          damage: damage,
          hitChance: hitChance,
          damageType: DamageTypes.order,
          locationName: context.location,
        });

        castString += `\n${target.name} ${
          secondResult.dHit
            ? `takes ${secondResult.damage} order damage.`
            : `avoided the second attack.`
        }`;

        if (secondResult.dHit) {
          targets[0].damageTaken += secondResult.damage;
        }
      }
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_ball_of_light",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets,
    castString,
  };
}

const skill_divines_fury = new Skill(
  {
    id: "skill_divines_fury",
    name: "Divine's Fury",
    tier: Tier.rare,
    description:
      "Deals 2d6 order damage to all enemies, enemy then need to roll DC10 will power save or get Awed for 2 turns. Each level adds 1d2 to the damage roll.",
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [
        { element: FundamentalElementTypes.order, value: 1 },
      ],
      preRequireCharacterLevel: 7,
      preRequireCharacterTrait: [TraitRepository.trait_faithful.id],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast divine's fury",
    consume: new SkillConsume({
      mp: [7, 7, 7, 7, 10, 10, 10],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [2, 2, 2, 2, 2, 2, 2],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.fire,
          amount: [2, 2, 2, 2, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.geo,
          amountRange: [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_divines_fury_exec,
);

function skill_divines_fury_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const targetType: TargetType = {
    scope: TargetScope.All,
    taunt: TargetTauntConsideration.TauntCount,
  };
  const availableTargets = selectMultipleTargets(
    character,
    enemies,
    targetType,
  );
  if (availableTargets.length === 0) {
    return skillExecNoTargetReport(character, "cast divine's fury");
  }

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.luck;

  let castString = `${character.name} casts Divine's Fury on all enemies.`;
  let targets = [];

  let damage =
    Dice.roll(DiceEnum.TwoD6).sum + StatMod.value(character.status.charisma());
  for (let i = 1; i <= skillLevel; i++) {
    damage += Dice.roll(DiceEnum.OneD2).sum;
  }

  damage = getSpellDamageAfterArmorPenalty(character, damage);

  for (const target of availableTargets) {
    const [crit, hitChance] = calculateCritAndHit(
      character,
      target,
      isSpell,
      hitStat,
      critStat,
    );

    let finalDamage = damage;
    if (crit) {
      finalDamage *= 2;
    }

    let result = target.receiveDamage({
      attacker: character,
      damage: finalDamage,
      hitChance: hitChance,
      damageType: DamageTypes.order,
      locationName: context.location,
    });

    castString += `\n${target.name} ${
      result.dHit
        ? `takes ${result.damage} order damage.`
        : `avoided the attack.`
    }`;

    if (result.dHit) {
      targets.push({
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Order_3,
      });

      const saveRolls = target.saveRoll(CharacterStatusEnum.willpower);
      const save = saveRolls[0] + saveRolls[1] + saveRolls[2];
      if (save < 10) {
        const debuffResult = receiveDebuff(target, BuffsAndDebuffsEnum.awed, 2);
        castString += debuffResult.message;
      }
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_divines_fury",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets,
    castString,
  };
}

const skill_divine_intervention = new Skill(
  {
    id: "skill_divine_intervention",
    name: "Divine Intervention",
    tier: Tier.rare,
    description: `Revive a dead party member with DC13 willpower save, resurrected character got 1D6 + 5 + vitality Modifier HP back. Each level decrease the DC by 1 and HP by 1D3. DC + 2 3 4 when wearing light, medium and heavy armor respectively.`,
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [
        { element: FundamentalElementTypes.order, value: 5 },
      ],
      preRequireCharacterLevel: 0,
      preRequireCharacterTrait: [TraitRepository.trait_faithful.id],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast divine intervention",
    consume: new SkillConsume({
      sp: [3, 3, 3, 3, 3, 3, 3],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [3, 3, 3, 3, 3, 3, 3],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.air,
          amount: [2, 2, 2, 2, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.geo,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
        new ElementProduce({
          element: FundamentalElementTypes.water,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_divine_intervention_exec,
);

function skill_divine_intervention_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const target = allies.getOneDeadTarget(character);
  if (!target) return skillExecNoTargetReport(character, "divine intervention");

  const castString = `${character.name} casts Divine Intervention on ${target.name}.`;
  const armorTier = character.equipments.getArmorTier();
  const penalty =
    armorTier === "light"
      ? 2
      : armorTier === "medium"
        ? 3
        : armorTier === "heavy"
          ? 4
          : 0;

  const reviveDC = 13 + penalty - skillLevel;
  const diceRoll = Dice.rollTwenty();

  let message;
  let success = false;

  if (diceRoll >= reviveDC) {
    target.isDead = false;
    let healing =
      Dice.roll(DiceEnum.OneD6).sum +
      5 +
      StatMod.value(character.status.vitality());
    for (let i = 1; i <= skillLevel; i++) {
      healing -= Dice.roll(DiceEnum.OneD3).sum;
    }
    target.hpUp(healing);
    message = `${character.name} successfully revives ${target.name}, restoring them to ${target.currentHP} HP.`;
    success = true;
  } else {
    message = `${character.name} attempts to revive ${target.name} but fails.`;
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_divine_intervention",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: 0,
        effect: success ? TargetSkillEffect.heal : TargetSkillEffect.None,
      },
    ],
    castString: castString + " " + message,
  };
}

const skill_harmony = new Skill(
  {
    id: "skill_harmony",
    name: "Harmony",
    tier: Tier.epic,
    description: `Deals damage to enemy twice, once with order and once with chaos, each attack deals 1d6 damage (+ willpower). If target is in awed status, the first attack will deal 2d6 damage. If target is in cursed status, the second attack will deal 2d6 damage. Each level increases the damage of each attack by 1 and at level 7 on each attack the user might roll for 14DC willpower to add awed or cursed status to the target for 2 turns.`,
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [
        { element: FundamentalElementTypes.order, value: 1 },
      ],
      preRequireCharacterLevel: 8,
      preRequireCharacterTrait: [TraitRepository.trait_enlightened.id],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast harmony",
    consume: new SkillConsume({
      mp: [5, 5, 7, 7, 8, 9, 10],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [2, 2, 2, 2, 2, 2, 2],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.chaos,
          amount: [2, 2, 2, 2, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.order,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
        new ElementProduce({
          element: FundamentalElementTypes.chaos,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_harmony_exec,
);

function skill_harmony_exec(
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
  const target = trySelectOneTarget(character, enemies, targetType, "harmony");
  if (!(target instanceof Character)) return target;

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.luck;
  const [_, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  let castString = `${character.name} casts Harmony on ${target.name}.`;
  let targets = [];

  let damageOrder =
    Dice.roll(DiceEnum.OneD6).sum +
    skillLevel +
    StatMod.value(character.status.willpower());
  if (target.buffsAndDebuffs.awed > 0) {
    damageOrder += Dice.roll(DiceEnum.OneD6).sum;
  }
  damageOrder = getSpellDamageAfterArmorPenalty(character, damageOrder);

  let damageChaos =
    Dice.roll(DiceEnum.OneD6).sum +
    skillLevel +
    StatMod.value(character.status.willpower());
  if (target.buffsAndDebuffs.cursed > 0) {
    damageChaos += Dice.roll(DiceEnum.OneD6).sum;
  }
  damageChaos = getSpellDamageAfterArmorPenalty(character, damageChaos);

  let resultOrder = target.receiveDamage({
    attacker: character,
    damage: damageOrder,
    hitChance: hitChance,
    damageType: DamageTypes.order,
    locationName: context.location,
  });

  castString += `\n${target.name} ${
    resultOrder.dHit
      ? `takes ${resultOrder.damage} order damage.`
      : `avoided the attack.`
  }`;

  if (resultOrder.dHit) {
    targets.push({
      character: turnCharacterIntoInterface(target),
      damageTaken: resultOrder.damage,
      effect: TargetSkillEffect.Order_1,
    });
  }

  if (skillLevel >= 7) {
    const roll =
      Dice.rollTwenty() + StatMod.value(character.status.willpower());
    if (roll > 14) {
      const debuffResult = receiveDebuff(
        target,
        target.buffsAndDebuffs.awed > 0
          ? BuffsAndDebuffsEnum.cursed
          : BuffsAndDebuffsEnum.awed,
        2,
      );
      castString += debuffResult.message;
    }
  }

  let resultChaos = target.receiveDamage({
    attacker: character,
    damage: damageChaos,
    hitChance: hitChance,
    damageType: DamageTypes.chaos,
    locationName: context.location,
  });

  castString += `\n${target.name} ${
    resultChaos.dHit
      ? `takes ${resultChaos.damage} chaos damage.`
      : `avoided the attack.`
  }`;

  if (resultChaos.dHit) {
    targets.push({
      character: turnCharacterIntoInterface(target),
      damageTaken: resultChaos.damage,
      effect: TargetSkillEffect.Chaos_1,
    });
  }

  if (skillLevel >= 7) {
    const roll =
      Dice.rollTwenty() + StatMod.value(character.status.willpower());
    if (roll > 14) {
      const debuffResult = receiveDebuff(
        target,
        target.buffsAndDebuffs.awed > 0
          ? BuffsAndDebuffsEnum.cursed
          : BuffsAndDebuffsEnum.awed,
        2,
      );
      castString += debuffResult.message;
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_harmony",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets,
    castString,
  };
}

const skill_inspiration = new Skill(
  {
    id: "skill_inspiration",
    name: "Inspiration",
    tier: Tier.uncommon,
    description: `Give an inspiring speech to all party members, all party members get +2 bonus for all saving roll for 1 turn. At level 3 and 5 duration increases to 2 and 3 turns respectively.`,
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [],
      preRequireCharacterLevel: 3,
      preRequireCharacterTrait: [],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast inspiration",
    consume: new SkillConsume({
      mp: [5, 5, 4, 3, 0],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.none,
          amount: [1, 1, 1, 1, 1],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.order,
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
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_inspiration_exec,
);

function skill_inspiration_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "inspiration");

  const targetType: TargetType = {
    scope: TargetScope.All,
  };
  const availableTargets = selectMultipleTargets(character, allies, targetType);
  if (availableTargets.length === 0) {
    return skillExecNoTargetReport(character, "cast inspiration");
  }

  let castString = `${character.name} gives an inspiring speech to all party members.`;
  let targets = [];

  let duration = 1;
  if (skillLevel >= 3) duration += 1;
  if (skillLevel === 5) duration += 1;

  for (const target of availableTargets) {
    const buffResult = receiveBuff(
      target,
      BuffsAndDebuffsEnum.inspiration,
      duration,
    );

    if (buffResult.result) {
      targets.push({
        character: turnCharacterIntoInterface(target),
        damageTaken: 0,
        effect: TargetSkillEffect.inspiration,
      });
    }

    castString += buffResult.message;
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_inspiration",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets,
    castString,
  };
}

const skill_laoh_blessing = new Skill(
  {
    id: `skill_laoh_blessing`,
    name: "Laoh's Blessing",
    tier: Tier.legendary,
    description: `Heal all party members for 1d6 plus charisma modifier, and have a DC10 chance to grant them bless status for 2 turn. Each level increases the healing by 2 point, the DC decreases by 1 2 3 at level 3 5 7 respectively.`,
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [
        { element: FundamentalElementTypes.order, value: 10 },
      ],
      preRequireCharacterLevel: 10,
      preRequireCharacterTrait: [TraitRepository.trait_faithful.id],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast Laoh's Blessing",
    consume: new SkillConsume({
      mp: [10, 10, 9, 9, 8, 8, 7, 7, 6, 6],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.geo,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
        new ElementProduce({
          element: FundamentalElementTypes.water,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_laoh_blessing_exec,
);

function skill_laoh_blessing_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "blessing");

  const targetType: TargetType = {
    scope: TargetScope.All,
    taunt: TargetTauntConsideration.TauntCount,
  };
  const availableTargets = selectMultipleTargets(character, allies, targetType);
  if (availableTargets.length === 0) {
    return skillExecNoTargetReport(character, "cast Laoh's Blessing");
  }

  let castString = `${character.name} casts Laoh's Blessing on all party members.`;
  let targets = [];

  const baseHealing =
    StatMod.value(character.status.charisma()) + skillLevel * 2;

  let dc = 10;
  if (skillLevel >= 3) dc -= 1;
  if (skillLevel >= 5) dc -= 1;
  if (skillLevel >= 7) dc -= 1;

  for (const target of availableTargets) {
    let healing = baseHealing + Dice.roll(DiceEnum.OneD6).sum;
    let bless = Dice.rollTwenty() > dc;

    let healResult = target.receiveHeal({
      actor: character,
      healing,
    });

    if (healResult.healHit) {
      castString += `\n${target.name} heals for ${healResult.heal} HP.`;
      targets.push({
        character: turnCharacterIntoInterface(target),
        damageTaken: -healResult.heal,
        effect: TargetSkillEffect.heal,
      });
    }

    let buffResult = {
      result: false,
      message: ``,
    };

    if (bless) {
      buffResult = receiveBuff(target, BuffsAndDebuffsEnum.bless, 2);
      castString += buffResult.message;
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_laoh_blessing",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets,
    castString,
  };
}

const skill_judgement_of_laoh = new Skill(
  {
    id: "skill_judgement_of_laoh",
    name: "Judgement of Laoh",
    tier: Tier.legendary,
    description:
      "Deal 2d6 order damage to all enemies and inflict Awed status for 2 turns. At level 4, damage increases to 3d6. At level 6, Awed duration increases to 3 turns. At level 8, damage increases to 4d6. At level 10, also inflicts Weakened status for 2 turns.",
    requirement: new SkillLearningRequirement({
      preRequireSkillID: [],
      preRequireElements: [
        { element: FundamentalElementTypes.order, value: 10 },
      ],
      preRequireCharacterLevel: 10,
      preRequireCharacterTrait: [TraitRepository.trait_faithful.id],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast Judgement of Laoh",
    consume: new SkillConsume({
      mp: [15, 15, 15, 15, 12, 12, 12, 10, 10, 10],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.fire,
          amount: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.chaos,
          amountRange: [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_judgement_of_laoh_exec,
);

function skill_judgement_of_laoh_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "blessing");

  const targetType: TargetType = {
    scope: TargetScope.All,
  };
  const availableTargets = selectMultipleTargets(
    character,
    enemies,
    targetType,
  );
  if (availableTargets.length === 0) {
    return skillExecNoTargetReport(character, "cast Judgement of Laoh");
  }

  const isSpell = true;

  let castString = `${character.name} calls upon Laoh's divine judgment.`;
  let targets = [];

  let damageDice = DiceEnum.TwoD6;
  if (skillLevel >= 4) damageDice = DiceEnum.ThreeD6;
  if (skillLevel >= 8) damageDice = DiceEnum.FourD6;

  let awedDuration = 2;
  if (skillLevel >= 6) awedDuration = 3;

  for (const target of availableTargets) {
    const damage = Dice.roll(damageDice).sum;

    const result = target.receiveDamage({
      attacker: character,
      damage,
      hitChance: 100,
      damageType: DamageTypes.order,
      locationName: context.location,
    });

    if (result.dHit) {
      receiveBuff(target, BuffsAndDebuffsEnum.awed, awedDuration);

      if (skillLevel === 10) {
        receiveBuff(target, BuffsAndDebuffsEnum.awed, 2);
      }

      targets.push({
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Order_3,
      });
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_judgement_of_laoh",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets,
    castString,
  };
}

const skill_holy_nova = new Skill(
  {
    id: "skill_holy_nova",
    name: "Holy Nova",
    tier: Tier.legendary,
    description: `Deals 2d6 order damage to all enemies and heals all party members for 2d6 (+ charisma modifier). Each level increases the damage and healing by 1, at level 10 the damage and healing will be 3d6.`,
    requirement: new SkillLearningRequirement({
      preRequireElements: [{ element: "order", value: 1 }],
      preRequireCharacterLevel: 10,
      preRequireCharacterTrait: [TraitRepository.trait_faithful.id],
    }),
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast Holy Nova",
    consume: new SkillConsume({
      mp: [10, 10, 12, 12, 14, 14, 16, 16, 18, 18],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.order,
          amount: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.fire,
          amount: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.chaos,
          amountRange: [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_holy_nova_exec,
);

function skill_holy_nova_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "blessing");

  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "blessing");

  const targetType: TargetType = {
    scope: TargetScope.All,
  };
  const availableOppositeTargets = selectMultipleTargets(
    character,
    enemies,
    targetType,
  );
  const availableAllyTargets = selectMultipleTargets(
    character,
    allies,
    targetType,
  );

  const isSpell = true;

  if (
    availableOppositeTargets.length === 0 &&
    availableAllyTargets.length === 0
  ) {
    return skillExecNoTargetReport(character, "cast Holy nove");
  }

  let diceFace = skillLevel >= 10 ? DiceEnum.ThreeD6 : DiceEnum.TwoD6;

  let charismaModifier = StatMod.value(character.status.charisma());

  let castString = `${character.name} cast holy nova,`;
  let targetsResult = [];

  for (const target of availableOppositeTargets) {
    let damage = Dice.roll(diceFace).sum + charismaModifier;
    damage = getSpellDamageAfterArmorPenalty(character, damage);

    let result = target.receiveDamage({
      attacker: character,
      damage,
      hitChance: 100,
      damageType: DamageTypes.order,
      locationName: context.location,
    });
    if (result.dHit) {
      targetsResult.push({
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Order_3,
      });
    }
    castString += `\n${target.name} takes ${result.damage} order damage.`;
  }

  for (const ally of availableAllyTargets) {
    let healing = Dice.roll(diceFace).sum + charismaModifier;
    healing = getSpellDamageAfterArmorPenalty(character, healing);
    let healResult = ally.receiveHeal({
      actor: character,
      healing,
    });
    if (healResult.healHit) {
      targetsResult.push({
        character: turnCharacterIntoInterface(ally),
        damageTaken: -healResult.heal,
        effect: TargetSkillEffect.heal,
      });
    }
    castString += `\n${ally.name} heals for ${healResult.heal} HP.`;
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_holy_nova",
    actorSkillEffect: ActorSkillEffect.Order_Cast,
    targets: targetsResult,
    castString,
  };
}

export const clericSkills = [
  skill_smite,
  skill_aid,
  skill_orderic_blast,
  skill_blessing,
  skill_holy_water,
  skill_ball_of_light,
  skill_divines_fury,
  skill_divine_intervention,
  skill_harmony,
  skill_inspiration,
  skill_laoh_blessing,
  skill_judgement_of_laoh,
  skill_holy_nova,
];
