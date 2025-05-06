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
import { trySelectOneTarget } from "../../../Game/Battle/TargetSelectionProcess";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { ActiveSkill, PassiveSkill, Skill } from "../Skill";
import {
  ElementConsume,
  ElementProduce,
  SkillConsume,
  SkillProduce,
} from "../SubClasses/SkillConsume";
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
import {
  skillExecNoTargetReport,
  skillExecSpellCastFailDueToArmorReport,
} from "../Utils/report";
import { Weapon } from "../../Items/Equipments/Weapon/Weapon";
import { receiveBuff } from "../../Character/Utils/buffsAndDebuffsFunctions";

const skill_heal = new ActiveSkill(
  {
    id: "skill_aid",
    name: "Aid",
    tier: Tier.common,
    description: `Heals one ally with least HP. The amount of healing is 1D4 + willpower modifier. Amount of healing is increased by 1D2 for each level of the skill, at level 5 base dice change to 2D4`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 7],
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
    isWeaponAttack: false,
    executor: skill_heal_exec,
  },
);

function skill_heal_exec(
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

  const baseDice = skillLevel === 5 ? DiceEnum.OneD4 : DiceEnum.TwoD4;
  let healing = Math.max(
    Dice.roll(baseDice).sum +
      StatMod.value(character.status.willpower()) +
      levelingHeal,
    0,
  );

  const crit = Dice.rollTwenty() === 20;
  if (crit) {
    healing = Math.floor((healing *= 1.5));
  }

  healing = getSpellDamageAfterArmorPenalty(character, healing);

  let result = target.receiveHeal({
    actor: character,
    healing: healing,
  });

  const castString = createCastString({
    actor: character,
    target: target,
    skillName: `healing touch`,
    healing: result.heal,
    crit: crit,
    dHit: result.healHit,
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

const skill_smite = new ActiveSkill(
  {
    id: "skill_smite",
    name: "Smite",
    tier: Tier.common,
    description: `Attack one enemy, dealing 1.2 times weapon's physical damage (+0.1 per level) (+strength, +charisma) if the target is undead, damage is doubled. If the user is in the back row, damage is halved.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: [
      WeaponSpecificType.sword_great,
      WeaponSpecificType.sword_long,
      WeaponSpecificType.sword_short,
      WeaponSpecificType.mace_hammer,
      WeaponSpecificType.mace_morningstar,
      WeaponSpecificType.mace_warhammer,
      WeaponSpecificType.tome_bible,
    ],
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
    isWeaponAttack: true,
    executor: skill_smite_exec,
  },
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

const skill_chant = new PassiveSkill(
  {
    id: "skill_chant",
    name: "Chant",
    tier: Tier.common,
    description: `You quietly recite sacred texts, calming your mind. Regain 3 MP every turn.`,
    requirement: noRequirementNeeded,
  },
  {
    adding: (character: Character, skillLevel: number) => {},
    removing: (character: Character, skillLevel: number) => {},
    takingTurn: (character: Character, skillLevel: number) => {
      character.mpUp(3);
    },
  },
);

const skill_blessing = new ActiveSkill(
  {
    id: "skill_blessing",
    name: "Blessing",
    tier: Tier.common,
    description: `Bless all party members for 1 turn, all blessed party members gain 1d4 to all saving throws. At level 3 and 5 duration increases to 2 and 3 turns respectively.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
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
    isWeaponAttack: false,
    executor: skill_blessing_exec,
  },
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

const skill_holy_blast = new ActiveSkill(
  {
    id: "skill_holy_blast",
    name: "Holy Blast",
    tier: Tier.uncommon,
    description: `Blast the enemy with order energy dealing 1.3 times weapon magical damage (+ 0.1 per skill level) (+ charisma).`,
    requirement: noRequirementNeeded,
  },
  {
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
    isWeaponAttack: false,
    executor: skill_holy_blast_exec,
  },
);

function skill_holy_blast_exec(
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

export const clericSkills: Skill[] = [
  skill_smite,
  skill_heal,
  skill_holy_blast,
  skill_chant,
  skill_blessing,
];
