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
  noEquipmentNeeded,
  noRequirementNeeded,
} from "../Utils";
import { Character } from "../../Character/Character";
import { Party } from "../../Party/Party";
import { Weapon } from "../../Items/Equipments/Weapon/Weapon";
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
import { DamageMultiplierFromBothPositions } from "../../../Utility/DamageMultiplierFromPosition";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import {
  receiveBuff,
  receiveDebuff,
} from "../../Character/Utils/buffsAndDebuffsFunctions";
import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { createCastString } from "../Utils/makeCastString";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { skillExecNoTargetReport } from "../Utils/report";

const skill_power_strike = new ActiveSkill(
  {
    id: `skill_power_strike`,
    name: `Power Strike`,
    tier: Tier.common,
    description: `Deal a powerful strike that deals 1.1 times weapon damage, target will need to roll DC5 endurance save or get stunned for 1 turn. Each level add + 0.1 damage and  +1 DC but -1 to accuracy.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: [
      WeaponSpecificType.axe_broad,
      WeaponSpecificType.axe_great,
      WeaponSpecificType.bare_hand,
      WeaponSpecificType.blade_katana,
      WeaponSpecificType.blade_cutlass,
      WeaponSpecificType.blade_falchion,
      WeaponSpecificType.blade_scimitar,
      WeaponSpecificType.mace_hammer,
      WeaponSpecificType.mace_warhammer,
      WeaponSpecificType.mace_morningstar,
      WeaponSpecificType.spear_dory,
      WeaponSpecificType.spear_halberd,
      WeaponSpecificType.staff_long,
      WeaponSpecificType.staff_quarter,
      WeaponSpecificType.sword_long,
      WeaponSpecificType.sword_great,
      WeaponSpecificType.sword_short,
    ],
    consume: new SkillConsume({
      sp: [3, 3, 4, 4, 5],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.none,
          amount: [1, 1, 1, 2, 2],
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
            [0, 1],
            [0, 1],
            [0, 1],
          ],
        }),
      ],
    }),
    isSpell: false,
    isWeaponAttack: true,
    executor: skill_power_strike_exec,
  },
);

function skill_power_strike_exec(
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
    "Power Strike",
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

  hitChance -= skillLevel - 1;

  const dice =
    weapon != "none" ? weapon.attackStats!.physicalDiceEnum : DiceEnum.TwoD6;

  let damage =
    Dice.roll(dice).sum * (1 + skillLevel / 10) +
    StatMod.value(character.status.strength());
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
  const damageType =
    weapon != "none" ? weapon.attackStats!.physicalType : DamageTypes.blunt;

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
    skillName: "Power Strike",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: DamageTypes.order,
  });

  if (result.dHit) {
    const dc = 5 + (skillLevel - 1);
    const save = target.saveRoll(CharacterStatusEnum.endurance);
    if (save < dc) {
      const buffResult = receiveDebuff(target, BuffsAndDebuffsEnum.stun, 1);
      if (buffResult.result) {
        castString += ` ${target.name} is stunned!`;
      }
    }
  }

  let actorSkillEffect =
    damageType === DamageTypes.slash
      ? ActorSkillEffect.Slash
      : damageType === DamageTypes.pierce
        ? ActorSkillEffect.Pierce
        : ActorSkillEffect.Blunt;

  let targetSkillEffect =
    damageType === DamageTypes.slash
      ? TargetSkillEffect.NoElement_Slash_1
      : damageType === DamageTypes.pierce
        ? TargetSkillEffect.NoElement_Pierce_1
        : TargetSkillEffect.NoElement_Blunt_1;

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_power_strike",
    actorSkillEffect,
    targets: [
      {
        character: turnCharacterIntoInterface(target),
        damageTaken: result.damage,
        effect: targetSkillEffect,
      },
    ],
    castString,
  };
}

const skill_defensive_stance = new PassiveSkill(
  {
    id: `skill_defensive_stance`,
    name: `Defensive Stance`,
    tier: Tier.common,
    description: `Get into a defensive position, each level add + 1 to P.Def and M.Def but also - 1 to P.Atk and M.Atk`,
    requirement: noRequirementNeeded,
  },
  {
    adding: (character: Character, skillLevel: number) => {
      character.status.battlers.pDEF.bonus += skillLevel;
      character.status.battlers.mDEF.bonus += skillLevel;
      character.status.battlers.pATK.bonus -= skillLevel;
      character.status.battlers.mATK.bonus -= skillLevel;
    },
    removing: (character: Character, skillLevel: number) => {
      character.status.battlers.pDEF.bonus -= skillLevel;
      character.status.battlers.mDEF.bonus -= skillLevel;
      character.status.battlers.pATK.bonus += skillLevel;
      character.status.battlers.mATK.bonus += skillLevel;
    },
    takingTurn: (character: Character, skillLevel: number) => {},
  },
);

const skill_power_stance = new PassiveSkill(
  {
    id: `skill_power_stance`,
    name: `Power Stance`,
    tier: Tier.common,
    description: `Prepare to attack with more power, each level add + 1 to P.ATK, and -1 to agility`,
    requirement: noRequirementNeeded,
  },
  {
    adding: (character: Character, skillLevel: number) => {
      character.status.battlers.pATK.bonus += skillLevel;
      character.status.attributes.agility.bonus -= skillLevel;
    },
    removing: (character: Character, skillLevel: number) => {
      character.status.battlers.pATK.bonus -= skillLevel;
      character.status.attributes.agility.bonus += skillLevel;
    },
    takingTurn: (character: Character, skillLevel: number) => {},
  },
);

const skill_taunt = new ActiveSkill(
  {
    id: `skill_taunt`,
    name: `Taunt`,
    tier: Tier.common,
    description: `Shouted and call foes to focus on oneself for 3 turns. User 'MUST' be on the front line, else the taunt effect will not apply.`,
    requirement: noRequirementNeeded,
  },
  {
    equipmentNeeded: noEquipmentNeeded,
    consume: new SkillConsume({
      sp: [3, 3, 3, 3, 3],
      elements: [
        new ElementConsume({
          element: FundamentalElementTypes.geo,
          amount: [3, 3, 2, 2, 1],
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
            [1, 1],
            [1, 1],
            [1, 1],
          ],
        }),
        new ElementProduce({
          element: FundamentalElementTypes.fire,
          amountRange: [
            [0, 1],
            [0, 1],
            [1, 1],
            [1, 1],
            [1, 1],
          ],
        }),
      ],
    }),
    isSpell: false,
    isWeaponAttack: false,
    executor: skill_taunt_exec,
  },
);

function skill_taunt_exec(
  character: Character,
  allies: Party,
  enemies: Party,
  skillLevel: number,
  context: { time: GameTime; location: LocationName },
): TurnReport {
  if (character.position < 3) {
    return {
      character: turnCharacterIntoInterface(character),
      skill: "skill_auto_physical",
      actorSkillEffect: ActorSkillEffect.None,
      targets: [],
      castString: `${character.name} tried to use taunt enemies but was in the wrong position.`,
    };
  }

  const duration = skillLevel === 5 ? 4 : 3;

  receiveBuff(character, BuffsAndDebuffsEnum.taunt, duration);

  return {
    character: turnCharacterIntoInterface(character),
    skill: "skill_taunt",
    actorSkillEffect: ActorSkillEffect.Geo_Physical,
    targets: [],
    castString: `${character.name} taunt enemies for ${duration} turns.`,
  };
}

export const fighterSkills: Skill[] = [
  skill_power_strike,
  skill_defensive_stance,
  skill_power_stance,
  skill_taunt,
];
