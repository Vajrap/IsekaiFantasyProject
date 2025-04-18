import {
  ActorSkillEffect,
  TargetSkillEffect,
  TurnReport,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
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
import { Trait, TraitRepository } from "../../Traits/Trait";

const skill_shadow_bolt = new ActiveSkill(
  {
    id: `skill_shadow_bolt`,
    name: `Shadow Bolt`,
    tier: Tier.common,
    description: `Launch a bolt of shadow energy dealing 1d6 chaos damage + intelligence modifier. Additional damage per level. This skill crit and hit gain bonus from intelligence`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: [],
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 7],
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
          element: FundamentalElementTypes.chaos,
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
    executor: skill_shadow_bolt_exec,
  },
);

function skill_shadow_bolt_exec(
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
    "Shadow Bolt",
  );
  if (!(target instanceof Character)) return target;

  const isSpell = true;
  const hitStat = AttributeEnum.intelligence;
  const critStat = AttributeEnum.intelligence;
  let [crit, hitChance] = calculateCritAndHit(
    character,
    target,
    isSpell,
    hitStat,
    critStat,
  );

  let damage =
    Dice.roll(DiceEnum.OneD6).sum +
    StatMod.value(character.status.intelligence()) +
    (skillLevel - 1);
  if (crit) damage *= 2;

  const damageType = DamageTypes.chaos;

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
    skillName: "Shadow Bolt",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: damageType,
  });

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_shadow_bolt",
    actorSkillEffect: ActorSkillEffect.Chaos_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: TargetSkillEffect.Chaos_1,
      },
    ],
    castString,
  };
}

const skill_dark = new ActiveSkill(
  {
    id: `skill_dark`,
    name: `Dark`,
    tier: Tier.common,
    description: `Cover an enemy in darkness, forcing them to make an intelligence save (DC 8 + level) or be blinded for 2 turns.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.chaos,
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
            [1, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isWeaponAttack: false,
    executor: skill_dark_exec,
  },
);

function skill_dark_exec(
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

  const target = trySelectOneTarget(character, enemies, targetType, "Dark");
  if (!(target instanceof Character)) return target;

  const castString = `${character.name} attempts to blind ${target.name} with darkness!`;

  const dc = 8 + skillLevel;
  const saveRoll = target.saveRoll(CharacterStatusEnum.intelligence);
  const duration = 2;

  if (saveRoll < dc) {
    const buffResult = receiveDebuff(
      target,
      BuffsAndDebuffsEnum.blind,
      duration,
    );
    if (buffResult.result) {
      return {
        character: turnCharacterIntoInterface(character),
        skill: "skill_dark",
        actorSkillEffect: ActorSkillEffect.Chaos_Cast,
        targets: [
          {
            character: turnCharacterIntoInterface(target),
            damageTaken: 0,
            effect: TargetSkillEffect.blind,
          },
        ],
        castString: `${castString} ${target.name} is blinded for ${duration} turns!`,
      };
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_dark",
    actorSkillEffect: ActorSkillEffect.Chaos_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: 0,
        effect: TargetSkillEffect.None,
      },
    ],
    castString: `${castString} ${target.name} resists the darkness!`,
  };
}

const skill_curse = new ActiveSkill(
  {
    id: `skill_curse`,
    name: `Curse`,
    tier: Tier.uncommon,
    description: `Curse a target, forcing them to make a willpower save (DC 8 + level) or suffer -2 to all saving throws for 2 turns.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      mp: [5, 5, 5, 5, 5],
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
          element: FundamentalElementTypes.none,
          amountRange: [
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [1, 1],
          ],
        }),
      ],
    }),
    isSpell: true,
    isWeaponAttack: false,
    executor: skill_curse_exec,
  },
);

function skill_curse_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  const targetType: TargetType = {
    scope: TargetScope.Single,
    taunt: TargetTauntConsideration.NoTauntCount,
  };

  const target = trySelectOneTarget(character, enemies, targetType, "Curse");
  if (!(target instanceof Character)) return target;

  const castString = `${character.name} attempts to curse ${target.name}!`;

  const dc = 8 + skillLevel;
  const saveRoll = target.saveRoll(CharacterStatusEnum.willpower);
  const duration = 2;

  if (saveRoll < dc) {
    const buffResult = receiveDebuff(
      target,
      BuffsAndDebuffsEnum.cursed,
      duration,
    );
    if (buffResult.result) {
      return {
        character: turnCharacterIntoInterface(character),
        skill: "skill_curse",
        actorSkillEffect: ActorSkillEffect.Chaos_Cast,
        targets: [
          {
            character: turnCharacterIntoInterface(target),
            damageTaken: 0,
            effect: TargetSkillEffect.cursed,
          },
        ],
        castString: `${castString} ${target.name} is cursed for ${duration} turns!`,
      };
    }
  }

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_curse",
    actorSkillEffect: ActorSkillEffect.Chaos_Cast,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: 0,
        effect: TargetSkillEffect.None,
      },
    ],
    castString: `${castString} ${target.name} resists the curse!`,
  };
}

const skill_war_caster = new PassiveSkill(
  {
    id: `skill_war_caster`,
    name: `War Caster`,
    tier: Tier.uncommon,
    description: `Gain the War Caster trait, allowing use of magic while wearing heavy armor. Additionally give heal equal to skill level every turn`,
    requirement: noRequirementNeeded,
  },
  {
    adding: (character: Character, skillLevel: number) => {
      character.gainTrait(TraitRepository.trait_warCaster);
    },
    removing: (character: Character, skillLevel: number) => {
      character.removeTrait(TraitRepository.trait_warCaster);
    },
    takingTurn: (character: Character, skillLevel: number) => {
      character.hpUp(skillLevel);
    },
  },
);

export const warlockSkills: Skill[] = [
  skill_shadow_bolt,
  skill_dark,
  skill_curse,
  skill_war_caster,
];
