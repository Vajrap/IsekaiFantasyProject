import {
  ActorSkillEffect,
  TargetSkillEffect,
  TurnReport,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { AttributeEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
  BuffsAndDebuffsEnum,
  TargetRow,
  TargetScope,
  TargetTauntConsideration,
  TargetType,
} from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import {
  selectTargets,
  trySelectOneTarget,
} from "../../../Game/Battle/TargetSelectionProcess";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";
import { Character } from "../../Character/Character";
import { receiveDebuff } from "../../Character/Utils/buffsAndDebuffsFunctions";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { Party } from "../../Party/Party";
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
  noEquipmentNeeded,
  noRequirementNeeded,
} from "../Utils";
import { skillExecNoTargetReport } from "../Utils/report";

// MARK: Mage skills
// Common
// 1. Magic missiles
// 2. Flame Burst
// 3. Focus (Passive)
// 4. Mana Surge
//
// Uncommon
// 1. Mana Shield

const skill_magic_missiles = new ActiveSkill(
  {
    id: "skill_magic_missiles",
    name: "Magic Missiles",
    tier: Tier.common,
    description: `Shoots 3 magical missiles at random targets, dealing 1D6 arcane damage. At level 2 3 4 the number of missiles increases to 4 5 6 respectively. At level 5 shoot 7 missiles`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [3, 4, 5, 6, 8],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.none,
          amount: [2, 2, 3, 3, 4],
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
    executor: skill_magic_missiles_exec,
  },
);

function skill_magic_missiles_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  let missileCounts = 3 + (skillLevel - 1);
  if (skillLevel === 5) missileCounts += 1;

  const targetType: TargetType = {
    scope: TargetScope.Single,
    taunt: TargetTauntConsideration.NoTauntCount,
  };

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const planarBonus = StatMod.value(character.status.planar());

  let castString = `${character.name} cast arcane missiles, `;
  let targets = [];
  for (let i = 0; i < missileCounts; i++) {
    const target = trySelectOneTarget(
      character,
      enemies,
      targetType,
      "magic missile",
    );
    if (!(target instanceof Character)) break;
    const [crit, hitChance] = calculateCritAndHit(
      character,
      target,
      isSpell,
      hitStat,
    );

    let damage = Dice.roll(DiceEnum.OneD6).sum + planarBonus;
    damage = getSpellDamageAfterArmorPenalty(character, damage);

    let result = target.receiveDamage({
      attacker: character,
      damage: damage,
      hitChance,
      damageType: DamageTypes.arcane,
      locationName: context.location,
    });
    if (result.dHit) {
      castString += `${target.name} taken ${result.damage} arcane damage;`;
      targets.push({
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Arcane_1,
      });
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: `skill_magic_missiles`,
    actorSkillEffect: ActorSkillEffect.Arcane_Cast,
    targets,
    castString,
  };
}

const skill_flame_burst = new ActiveSkill(
  {
    id: "skill_flame_burst",
    name: "Flame Burst",
    tier: Tier.common,
    description: `Throw a flame sweeping enemies on front line, dealing 2D6 fire damage to each enemies, each enemies must roll DC8 endurance save or get burn for 2 turns. Each level add + 1 damage, at level 5 damage + 2 and burn duration + 1.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 7],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.fire,
          amount: [2, 2, 2, 2, 2],
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
    executor: skill_flame_burst_exec,
  },
);

function skill_flame_burst_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const targetType: TargetType = {
    scope: TargetScope.All,
    row: TargetRow.Front,
  };
  const targets = selectTargets(enemies, character, targetType);
  if (targets.length === 0)
    return skillExecNoTargetReport(character, "flame burst");

  const isSpell = true;
  const burnDuration = skillLevel === 5 ? 3 : 2;

  let castString = `${character.name} casts Flame burst, `;
  const bonusPlanar = StatMod.value(character.status.planar());

  let targetsRecord = [];

  for (const target of targets) {
    const [_, hitChance] = calculateCritAndHit(
      character,
      target,
      isSpell,
      AttributeEnum.intelligence,
    );

    let damage = Dice.roll(DiceEnum.TwoD6).sum;
    damage += skillLevel === 5 ? skillLevel : skillLevel - 1;
    damage += bonusPlanar;

    const result = target.receiveDamage({
      attacker: character,
      damage,
      hitChance,
      damageType: DamageTypes.fire,
      locationName: context.location,
    });
    let scopeString = `${target.name} take ${damage} fire damage`;
    if (result.dHit) {
      const save = target.saveRoll(CharacterStatusEnum.endurance);
      if (save < 8) {
        receiveDebuff(target, BuffsAndDebuffsEnum.burn, burnDuration);
        scopeString += `, and burnt for ${burnDuration} turns.`;
      }
    }

    targetsRecord.push({
      character: turnCharacterIntoInterface(target),
      damageTaken: result.damage,
      effect: TargetSkillEffect.Fire_1,
    });

    castString += scopeString;
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_flame_burst",
    actorSkillEffect: ActorSkillEffect.Fire_Magical,
    targets: targetsRecord,
    castString,
  };
}

const skill_focus = new PassiveSkill(
  {
    id: "skill_focus",
    name: "Focus",
    tier: Tier.common,
    description:
      "Focus on controlling your planar energy, each level gain +1 to M.Hit and M.Atk but also -1 P.Def",
    requirement: noRequirementNeeded,
  },
  {
    adding: (character: Character, skillLevel: number) => {
      character.status.battlers.mHIT.battle += skillLevel;
      character.status.battlers.mATK.battle += skillLevel;
      character.status.battlers.pDEF.battle -= skillLevel;
    },
    removing: (character: Character, skillLevel: number) => {
      character.status.battlers.mHIT.battle -= skillLevel;
      character.status.battlers.mATK.battle -= skillLevel;
      character.status.battlers.pDEF.battle += skillLevel;
    },
    takingTurn: (character: Character, skillLevel: number) => {},
  },
);

const skill_mana_surge = new ActiveSkill(
  {
    id: "skill_mana_surge",
    name: "Mana Surge",
    tier: Tier.common,
    description:
      "Casts a spell that shoots a ball of mana at a random enemy dealing arcane damage. The target must roll Planar saving throw to avoid being paralyzed for 2 turns.",
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [5, 5, 6, 6, 7],
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
    isSpell: true,
    isWeaponAttack: false,
    executor: skill_mana_surge_exec,
  },
);

function skill_mana_surge_exec(
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
    "mana surge",
  );
  if (!(target instanceof Character)) {
    return skillExecNoTargetReport(character, "mana surge");
  }

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const planarBonus = StatMod.value(character.status.planar());

  const [_, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
  );

  let damage = Dice.roll(DiceEnum.TwoD6).sum + planarBonus + (skillLevel - 1);
  damage = getSpellDamageAfterArmorPenalty(character, damage);

  const result = target.receiveDamage({
    attacker: character,
    damage: damage,
    hitChance,
    damageType: DamageTypes.arcane,
    locationName: context.location,
  });

  let castString = `${character.name} casts mana surge at ${target.name}, `;
  const targets = [];

  if (result.dHit) {
    castString += `dealing ${result.damage} arcane damage`;
    const paralyzed =
      target.saveRoll(CharacterStatusEnum.planar) < 8 + skillLevel;

    if (paralyzed) {
      receiveDebuff(target, BuffsAndDebuffsEnum.paralyse, 2);
      castString += ` and paralyzing them for 2 turns.`;
    } else {
      castString += `. Target resisted paralysis.`;
    }

    targets.push({
      character: turnCharacterIntoInterface(target),
      damageTaken: result.damage,
      effect: TargetSkillEffect.Arcane_2,
    });
  } else {
    castString += `but missed.`;
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_mana_surge",
    actorSkillEffect: ActorSkillEffect.Arcane_Cast,
    targets,
    castString,
  };
}

const skill_mana_shield = new ActiveSkill(
  {
    id: "skill_mana_shield",
    name: "Mana Shield",
    tier: Tier.uncommon,
    description:
      "Casts a spell that creates a shield made of mana around the user. The shield stack is equal to half of user current mana, the shield will absorb damage until it's broken or the battle ends.",
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.water,
          amount: [2, 2, 2, 2, 1],
        }),
        new ElementConsume({
          element: FundamentalElementTypes.air,
          amount: [2, 2, 2, 2, 1],
        }),
      ],
    }),
    produce: new SkillProduce({
      elements: [
        new ElementProduce({
          element: FundamentalElementTypes.none,
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
    isSpell: true,
    isWeaponAttack: false,
    executor: skill_mana_shield_exec,
  },
);

function skill_mana_shield_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const halfOfCurrentMana = Math.floor(character.currentMP / 2);
  let shieldAmount = getSpellDamageAfterArmorPenalty(
    character,
    halfOfCurrentMana,
  );

  if (skillLevel >= 5) {
    shieldAmount = Math.floor(shieldAmount * 1.2); // 20% boost at level 5
  }

  character.mpDown(halfOfCurrentMana);
  receiveDebuff(character, BuffsAndDebuffsEnum.manaShield, shieldAmount);

  const castString = `${character.name} creates a mana shield absorbing up to ${shieldAmount} damage.`;

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_mana_shield",
    actorSkillEffect: ActorSkillEffect.Arcane_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(character),
        damageTaken: 0,
        effect: TargetSkillEffect.manaShield,
      },
    ],
    castString,
  };
}

export const mageSkills: Skill[] = [
  skill_magic_missiles,
  skill_flame_burst,
  skill_focus,
  skill_mana_surge,
  skill_mana_shield,
];
