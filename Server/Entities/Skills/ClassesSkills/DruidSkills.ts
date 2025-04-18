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
import { Weapon } from "../../Items/Equipments/Weapon/Weapon";
import {
  BuffsAndDebuffsEnum,
  TargetScope,
  TargetSortingOptions,
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
import { skillExecSpellCastFailDueToArmorReport } from "../Utils/report";

const skill_entangle = new ActiveSkill(
  {
    id: "skill_entangle",
    name: "Entangle",
    tier: Tier.common,
    description: `Deal 1d4 geo damage to one enemy (+willpower) and entangle it for 2 turns. Entangled target needs to roll DC8 strength save or be unable to move. Damage +1 per level and at level 5, entangle duration increases to 3 turns.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [3, 3, 3, 3, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.geo,
          amount: [1, 1, 1, 1, 2],
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
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isWeaponAttack: false,
    executor: skill_entangle_exec,
  },
);

function skill_entangle_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "entangle");

  const targetType: TargetType = {
    scope: TargetScope.Single,
    taunt: TargetTauntConsideration.TauntCount,
  };

  const target = trySelectOneTarget(character, enemies, targetType, "entangle");
  if (!(target instanceof Character)) return target;

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.luck;
  let [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  let damage =
    Dice.roll(DiceEnum.OneD4).sum +
    StatMod.value(character.status.willpower()) +
    (skillLevel - 1);
  if (crit) damage *= 2;

  damage = getSpellDamageAfterArmorPenalty(character, damage);

  let result = target.receiveDamage({
    attacker: character,
    damage,
    hitChance,
    damageType: DamageTypes.geo,
    locationName: context.location,
  });

  let castString = createCastString({
    actor: character,
    target: target,
    skillName: "entangle",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: DamageTypes.geo,
  });

  if (result.dHit) {
    const duration = skillLevel >= 5 ? 3 : 2;
    const debuff = receiveDebuff(
      target,
      BuffsAndDebuffsEnum.entangled,
      duration,
    );
    if (debuff.result) {
      castString += ` ${target.name} is entangled for ${duration} turns!`;
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_entangle",
    actorSkillEffect: ActorSkillEffect.Geo_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.entangled,
      },
    ],
    castString,
  };
}

const skill_healing_touch = new ActiveSkill(
  {
    id: "skill_healing_touch",
    name: "Healing Touch",
    tier: Tier.common,
    description: `Heal a party member for 1d4 hp (+willpower). Each level gives +1 healing, at level 5 ignore armor penalty.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [3, 3, 3, 3, 3],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.geo,
          amount: [1, 1, 1, 1, 1],
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
    isSpell: true,
    isWeaponAttack: false,
    executor: skill_healing_touch_exec,
  },
);

function skill_healing_touch_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (skillLevel < 5 && !isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "healing touch");

  const targetType: TargetType = {
    scope: TargetScope.Single,
    sort: TargetSortingOptions.LowestHP,
  };

  const target = trySelectOneTarget(
    character,
    allies,
    targetType,
    "healing touch",
  );
  if (!(target instanceof Character)) return target;

  let healing = Math.max(
    Dice.roll(DiceEnum.OneD4).sum +
      StatMod.value(character.status.willpower()) +
      (skillLevel - 1),
    0,
  );

  const crit = Dice.rollTwenty() + StatMod.value(character.status.luck()) >= 20;
  if (crit) healing *= 1.5;

  if (skillLevel < 5) {
    healing = getSpellDamageAfterArmorPenalty(character, healing);
  }

  const result = target.receiveHeal({
    actor: character,
    healing: healing,
  });

  const castString = createCastString({
    actor: character,
    target: target,
    skillName: "healing touch",
    healing: result.heal,
    crit: crit,
    dHit: result.healHit,
  });

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_healing_touch",
    actorSkillEffect: ActorSkillEffect.Geo_Cast,
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

const skill_rock_spike = new ActiveSkill(
  {
    id: "skill_rock_spike",
    name: "Rock Spike",
    tier: Tier.uncommon,
    description: `Summon a sharp rock spike dealing 2d6 + vitality damage. Target must make a DC (8 + level) save or suffer Bleed for 2 turns. At level 5, bleed duration increases to 3 turns.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 6],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.geo,
          amount: [2, 2, 2, 2, 2],
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
    isSpell: true,
    isWeaponAttack: false,
    executor: skill_rock_spike_exec,
  },
);

function skill_rock_spike_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (!isSpellCastSuccessConcerningArmor(character))
    return skillExecSpellCastFailDueToArmorReport(character, "rock spike");

  const targetType: TargetType = {
    scope: TargetScope.Single,
    taunt: TargetTauntConsideration.TauntCount,
  };

  const target = trySelectOneTarget(
    character,
    enemies,
    targetType,
    "rock spike",
  );
  if (!(target instanceof Character)) return target;

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.luck;
  let [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  let damage =
    Dice.roll(DiceEnum.TwoD6).sum + StatMod.value(character.status.vitality());
  if (crit) damage *= 2;

  damage = getSpellDamageAfterArmorPenalty(character, damage);

  let result = target.receiveDamage({
    attacker: character,
    damage,
    hitChance,
    damageType: DamageTypes.geo,
    locationName: context.location,
  });

  let castString = createCastString({
    actor: character,
    target: target,
    skillName: "rock spike",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: DamageTypes.geo,
  });

  if (result.dHit) {
    const dc = 8 + skillLevel;
    const saveRoll = target.saveRoll(CharacterStatusEnum.endurance);
    if (saveRoll < dc) {
      const duration = skillLevel >= 5 ? 3 : 2;
      const debuff = receiveDebuff(target, BuffsAndDebuffsEnum.bleed, duration);
      if (debuff.result) {
        castString += ` ${target.name} is bleeding!`;
      }
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_rock_spike",
    actorSkillEffect: ActorSkillEffect.Geo_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Geo_2,
      },
    ],
    castString,
  };
}

const skill_spear_throw = new ActiveSkill(
  {
    id: "skill_spear_throw",
    name: "Spear Throw",
    tier: Tier.uncommon,
    description: `Throws a spear, dealing 0.8 times weapon damage (+dexterity). If user and target are in different rows, deals 1.5 times damage instead. +1 damage per level, at level 5 base multiplier increases by 0.2.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: [
      WeaponSpecificType.spear_dory,
      WeaponSpecificType.spear_javelin,
    ],
    consume: new SkillConsume({
      sp: [5, 7, 8, 10, 10],
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
    isSpell: false,
    isWeaponAttack: true,
    executor: skill_spear_throw_exec,
  },
);

function skill_spear_throw_exec(
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
    "spear throw",
  );
  if (!(target instanceof Character)) return target;

  const weapon = character.getWeapon();
  if (!(weapon instanceof Weapon)) {
    throw new Error("Exceptional: No weapon found");
  }

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

  let rowModifier = 1.0;

  if (character.position < 3) {
    if (target.position < 3) rowModifier = 0.8;
    if (target.position >= 3) rowModifier = 1.2;
  }
  if (character.position >= 3) {
    if (target.position < 3) rowModifier = 1.2;
    if (target.position >= 3) rowModifier = 1.5;
  }

  if (skillLevel >= 5) rowModifier += 0.2;

  let damage =
    Dice.roll(weapon.attackStats!.physicalDiceEnum).sum * rowModifier +
    StatMod.value(character.status.dexterity()) +
    (skillLevel - 1);
  if (crit) damage *= 2;

  const result = target.receiveDamage({
    attacker: character,
    damage,
    hitChance,
    damageType: DamageTypes.pierce,
    locationName: context.location,
  });

  const castString = createCastString({
    actor: character,
    target: target,
    skillName: "spear throw",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: DamageTypes.pierce,
  });

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_spear_throw",
    actorSkillEffect: ActorSkillEffect.Pierce,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.NoElement_Pierce_2,
      },
    ],
    castString,
  };
}

export const druidSkills: Skill[] = [
  skill_entangle,
  skill_healing_touch,
  skill_rock_spike,
  skill_spear_throw,
];
