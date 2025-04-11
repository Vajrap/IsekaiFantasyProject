//MARK: Druid skills
/*
1. Entangle
2. Healing Touch
3. Spear Throw
4. Absorb Resource
5. Wild Growth
6. Poisoned Land
7. Nature's Wrath
8. Rock Spike
9. Lava Burst
10. Tidal Wave
11. Stone skin
12. Primal Roar
13. Cataclysm
14. Summon Familiar
15. Sylvain's Protection
*/

import {
  ActorSkillEffect,
  TargetSkillEffect,
  TurnReport,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { AttributeEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import {
  WeaponSpecificType,
  WeaponType,
} from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
  BuffsAndDebuffsEnum,
  TargetScope,
  TargetTauntConsideration,
  TargetType,
} from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { trySelectOneTarget } from "../../../Game/Battle/TargetSelectionProcess";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";
import { Character } from "../../Character/Character";
import { receiveDebuff } from "../../Character/Utils/buffsAndDebuffsFunctions";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { Spear } from "../../Items/Equipments/Weapon/Spear/Spear";
import { Weapon } from "../../Items/Equipments/Weapon/Weapon";
import { Party } from "../../Party/Party";
import { Skill } from "../Skill";
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
import { createCastString } from "../Utils/makeCastString";
import { skillExecNoTargetReport } from "../Utils/report";

const skill_entangle = new Skill(
  {
    id: "skill_entangle",
    name: "Entangle",
    tier: Tier.common,
    description: `Deal 1d4 geo damage to one enemy (+willpower) and entangle it for 2 turns. Entangled target need to roll 8DC strength save at the start of their turn or else they will be unable to move in that turn. Damage + 1 per level and when skill level = 5, entangle = 3 tursn. `,
    requirement: noRequirementNeeded,
    equipmentNeeded: noEquipmentNeeded,
    castString: "cast entangle",
    consume: new SkillConsume({
      mp: [3, 3, 3, 3, 5],
      elements: [
        {
          element: FundamentalElementTypes.none,
          amount: [2, 2, 2, 2, 3],
        },
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
    isSpell: true,
    isAuto: false,
    isWeaponAttack: false,
    isReaction: false,
  },
  skill_entangle_exec,
);

function skill_entangle_exec(
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
  const target = trySelectOneTarget(character, allies, targetType, "entangle");
  if (!(target instanceof Character))
    return skillExecNoTargetReport(character, "entangle");

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
    Dice.roll(DiceEnum.OneD4).sum +
    (skillLevel - 1) +
    StatMod.value(character.status.willpower());
  if (crit) damage *= 2;
  damage = getSpellDamageAfterArmorPenalty(character, damage);

  let result = target.receiveDamage({
    attacker: character,
    damage: damage,
    hitChance: hitChance,
    damageType: DamageTypes.geo,
    locationName: context.location,
  });

  let castString = `${character.name} cast entangle on ${target.name},`;
  if (crit) castString += `CRITICAL! `;
  if (result.dHit) {
    castString += `dealing ${result.damage} geo damage, `;
  } else {
    castString += `but missed!`;
  }

  if (result.dHit) {
    let debuffResult = receiveDebuff(
      target,
      BuffsAndDebuffsEnum.entangled,
      skillLevel === 5 ? 3 : 2,
    );
    if (debuffResult.result) {
      castString += debuffResult.message;
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

const skill_spear_throw = new Skill(
  {
    id: "skill_spear_throw",
    name: "Spear throw",
    tier: Tier.common,
    description: `Throws a spear at the target, dealing 0.8 times weapon damage (+dexterity), if user and target is on a different row (back/front) the damage will be 1.5 times. Every level gives additional 1 damage, at level 5, base damage + 0.2 times. Spear used by this skill will be removed from user's hand, but will still be in item bag, only weapon with 'returning magic' will not be removed.`,
    requirement: noRequirementNeeded,
    equipmentNeeded: [
      WeaponSpecificType.spear_dory,
      WeaponSpecificType.spear_javelin,
    ],
    castString: "throw spear",
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
    isAuto: false,
    isWeaponAttack: true,
    isReaction: false,
  },
  skill_spear_throw_exec,
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

  let weapon = character.getWeapon();
  if (weapon instanceof Weapon) {
    if (weapon.weaponType != WeaponType.spear) {
      throw new Error("Exceptional: Wrong weapon type");
    }
  } else {
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

  let rowModifier: number = 1;
  if (character.position < 3) {
    // case user === front row
    if (target.position < 3) rowModifier = 0.8; // target front row
    if (target.position >= 3) rowModifier = 1.5; // target back row
  }
  if (character.position >= 3) {
    // case user === back row
    if (target.position < 3) rowModifier = 1.5; // target front row
    if (target.position >= 3) rowModifier = 0.8;
  }

  if (skillLevel >= 5) rowModifier += 0.2;

  let damage =
    Dice.roll(weapon.attackStats!.physicalDiceEnum).sum +
    (skillLevel - 1) +
    StatMod.value(character.status.dexterity());
  if (crit) damage *= 2;
  damage *= rowModifier;

  const result = target.receiveDamage({
    attacker: character,
    damage: damage,
    hitChance: hitChance,
    damageType: DamageTypes.pierce,
    locationName: context.location,
  });

  let castString = createCastString({
    actor: character,
    target: target,
    skillName: "spear throw",
    damage: result.damage,
    dHit: result.dHit,
    crit: crit,
    damageType: result.damageType,
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

// SkillRepository.skill_druid_02 = new Skill(
//     `skill_druid_02`,
//     `Spear Throw`,
//     `Throws a spear at the target, dealing 0.8 times damage, if thrown from backrow to front row or frontrow to backrow deal 1.5 times damage, if thrown from back row to back row, deal 2.5 times damage`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [],
//         preRequireCharacterLevel: 1,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['spear'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredBackRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const weapon = SkillRepository.skill_druid_03.equipmentNeeded.getWeapon(actor);
//             if (!weapon) throw new Error('Exceptional: No weapon found');

//             const castMessage = `(actor=${actor.name}) throws a spear at (target=${target.name}).`;
//             const sequenceMessage = [];
//             const targets = [];

//             let damageMultiplier = 0.8;
//             if (actor.position !== null && actor.position < 2 && target.position !== null && target.position > 2) {
//                 damageMultiplier = 1.5;
//             }
//             if (actor.position !== null && actor.position > 2 && target.position !== null && target.position < 2) {
//                 damageMultiplier = 1.5;
//             }
//             if (actor.position !== null && actor.position > 2 && target.position !== null && target.position > 2) {
//                 damageMultiplier = 2.5;
//             }

//             damageMultiplier += ((level-1)/2)

//             let message = `(actor=${actor.name}) throws a spear at (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: 0,
//                 damageType: DamageTypes.pierce,
//                 damageMultiplier: damageMultiplier
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) pierce damage.` : message += `but Missed!`;
//             sequenceMessage.push(message);
//             targets.push(target);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.NoElement_Pierce_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [0,0,0,0,0],
//         sp: [5,7,8,10,11],
//         elements: [
//             new ElementConsume({ element: 'none', amount: [2,2,2,2,2]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'geo',
//             amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//         })]
//     }),
//     Tier.common
// )

// SkillRepository.skill_druid_03 = new Skill(
//     `skill_druid_03`,
//     `Healing Touch`,
//     `Heals a party member with lowest HP for 4d2 hp, can not target self.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'geo', value: 1}
//         ],
//         preRequireCharacterLevel: 0,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const target = selfParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');

//             const castMessage = `(actor=${actor.name}) casts Healing Touch on (target=${target.name}).`;
//             const sequenceMessage = [];
//             const targets = [];

//             const healAmount = actor.heal({
//                 target: target,
//                 healingDice: '4d2',
//                 healingStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalHealing: (level-1)/2
//             });
//             sequenceMessage.push(`(actor=${actor.name}) casts Healing Touch on (target=${target.name}), healing (heal=${healAmount.heal}) HP.`);
//             targets.push(target);

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Human_Cast],
//                 [],
//                 [TargetSkillEffect.heal],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [5,5,4,4,3],
//         sp: [0,0,0,0,0],
//         elements: [new ElementConsume({
//             element: 'geo',
//             amount: [1,1,1,1,1]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'order',
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_druid_04 = new Skill(
//     `skill_druid_04`,
//     `Absorb Resource`,
//     `Target must roll a 8DC willpower save or user will steals all of target's resources and add them to the user.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'geo', value: 2 },
//             { element: 'chaos', value: 2 }
//         ],
//         preRequireCharacterLevel: 7,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const penalty = actor.getArmorPentaltyForSpellCastingDamage();

//             const castMessage = `(actor=${actor.name}) attempts to absorb resources from (target=${target.name}).`;
//             const sequenceMessage = [];
//             const targets = [target];

//             const [diceRoll, baseModifier, buffModifier] = target.saveRoll(new CharacterStatusModifier("willpower"));
//             const saves = (diceRoll + baseModifier + buffModifier);

//             if (saves >= ((8+(level-1))*penalty)) {
//                 sequenceMessage.push(`(actor=${actor.name}) (skill=attempts) to absorb resources from (target=${target.name}) but fails.`);
//                 return new ActionDetails(
//                     actor,
//                     targets,
//                     [],
//                     [ActorSkillEffect.NoElement_Cast],
//                     [TargetSkillEffect.Arcane_2],
//                     [],
//                     castMessage,
//                     sequenceMessage
//                 );
//             }

//             const targetResources = target.resources;
//             let availableResource: string[] = [];
//             for (const resource in targetResources) {
//                 if (targetResources[resource as keyof CharacterResources] > 0) {
//                     availableResource.push(resource);
//                 }
//             }
//             if (availableResource.length === 0) {
//                 sequenceMessage.push(`(actor=${actor.name}) (skill=attempts) to absorb resources from (target=${target.name}) but there are no resources to absorb.`);
//                 return new ActionDetails(
//                     actor,
//                     targets,
//                     [],
//                     [ActorSkillEffect.NoElement_Cast],
//                     [TargetSkillEffect.Arcane_2],
//                     [],
//                     castMessage,
//                     sequenceMessage
//                 );
//             }

//             for (const resource in targetResources) {
//                 let amount = targetResources[resource as keyof CharacterResources];
//                 target.resources[resource as keyof CharacterResources] -= amount;
//                 actor.resources[resource as keyof CharacterResources] += amount;
//             }

//             sequenceMessage.push(`(actor=${actor.name}) (skill=absorbs) resources from (target=${target.name}).`);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.Arcane_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,5,5,5,5,5],
//         sp: [5,5,5,5,5,5,5],
//         elements: [
//             new ElementConsume( {element: 'geo',  amount: [4,4,4,4,4,4,4]} ),
//             new ElementConsume( {element: 'chaos',  amount: [4,4,4,4,4,4,4]} )
//         ]
//     }),
//     new SkillProduce({
//         elements: []
//     }),
//     Tier.epic
// )

// SkillRepository.skill_druid_05 = new Skill(
//     `skill_druid_05`,
//     `Wild Growth`,
//     `Heals all party members for 2d4(+charisma) hp.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'geo', value: 1 }
//         ],
//         preRequireCharacterLevel: 7,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const castMessage = `(actor=${actor.name}) casts Wild Growth to heal all party members.`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of selfParty.characters) {
//                 if (target) {
//                     const healAmount = actor.heal({
//                         target: target,
//                         healingDice: '2d4',
//                         healingStatModifier: [new CharacterStatusModifier('charisma')],
//                         penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                         additionalHealing: (level-1)/2
//                     });
//                     targets.push(target);
//                     sequenceMessage.push(`(actor=${actor.name}) (skill=uses) Wild Growth to heal (target=${target.name}) for (heal=${healAmount.heal}) HP.`);
//                 }
//             }

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Geo_Cast],
//                 [],
//                 [TargetSkillEffect.heal],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [3,3,3,3,3,3,3],
//         sp: [5,5,5,5,5,5,5],
//         elements: [
//             new ElementConsume({ element: 'geo', amount: [2,2,2,2,2,2,2] }),
//             new ElementConsume({ element: 'water', amount: [2,2,2,2,2,2,2] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'order',
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_druid_06 = new Skill(
//     `skill_druid_06`,
//     `Poisoned Land`,
//     `Poison the land, dealing 1d4 damage to all enemies and poison them for 3 turns, this skill can not be dodge except from critical miss roll.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'geo', value: 2},
//             { element: 'chaos', value: 3}
//         ],
//         preRequireCharacterLevel: 8,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({}),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();

//             const castMessage = `(actor=${actor.name}) casts Poisoned Land to affect all enemies.`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) casts Poisoned Land on (target=${target.name}), `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d4',
//                     hitBonus: 1000, // Ensures hit unless critical miss
//                     damageType: DamageTypes.poison,
//                     damageMultiplier: 1,
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: (level-1)/2
//                 });
//                 attackResult.dHit ? targets.push(target) : {};
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) poison damage, ` : message += `but Missed!`;

//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.poison,
//                     effectDuration: 2 + (level >= 5 ? 1:0) + (level === 7 ? 1:0),
//                     effectDC: 1000
//                 });
//                 effectHit ? message += `and inflicting Poison.` : attackResult.dHit ? message += `but resisted Poison.` : message += '';
//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Poison_Cast],
//                 [TargetSkillEffect.Poison_1, TargetSkillEffect.poison],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,5,5,7,7,7],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'geo', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume({ element: 'chaos', amount: [2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]})
//         ]
//     }),
//     Tier.epic
// )

// SkillRepository.skill_druid_07 = new Skill(
//     `skill_druid_07`,
//     `Nature's Wrath`,
//     `Deals 2d4 damage to all enemies, if target is in entangled state, the damage will be doubled, and if target is poisoned, all poison stack will be erupted dealing 3*poison stack damage.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'geo', value: 1}
//         ],
//         preRequireCharacterLevel: 12,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();

//             const castMessage = `(actor=${actor.name}) casts Nature's Wrath to affect all enemies.`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) casts Nature's Wrath on (target=${target.name}), `;
//                 let damageMultiplier = 1;
//                 if (target.buffsAndDebuffs.entangled > 0) {
//                     damageMultiplier = 2;
//                 }

//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '2d4',
//                     hitBonus: 0,
//                     damageType: DamageTypes.pierce,
//                     damageMultiplier: damageMultiplier + ((level-1)/2),
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: target.buffsAndDebuffs.poison * 3
//                 });
//                 attackResult.dHit ? targets.push(target) : {};
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) pierce damage.` : message += `but Missed!`;
//                 target.buffsAndDebuffs.entangled > 0 ? message += ` the damage is doubled because the target is entangled.` : message += '';
//                 target.buffsAndDebuffs.poison > 0 ? message += ` included additional (damage=${target.buffsAndDebuffs.poison*3}) poison damage.` : message += '';
//                 target.buffsAndDebuffs.poison = 0;
//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Geo_Cast],
//                 [TargetSkillEffect.Geo_3],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//        }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [5,5,6,6,7,7,8,8,9,9],
//         sp: [5,5,6,6,7,7,8,8,9,9],
//         elements: [
//             new ElementConsume({ element: 'geo', amount: [2,2,2,2,2,2,2,2,2,2]}),
//             new ElementConsume({ element: 'chaos', amount: [2,2,2,2,2,2,2,2,2,2]}),
//             new ElementConsume({ element: 'fire', amount: [2,2,2,2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]}),
//         ]
//     }),
//     Tier.legendary
// )

// SkillRepository.skill_druid_08 = new Skill(
//     `skill_druid_08`,
//     `Rock Spike`,
//     `Summons a sharp rock on one enemy's location, dealing 2d6(+vitality) damage. target must throw a DC 10 save or suffer bleed for 2 turns.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [],
//         preRequireCharacterLevel: 0,
//         preRequireCharacterTrait: [TraitRepository.trait_motherEarthBlessing]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');

//             const castMessage = `(actor=${actor.name}) summons a Rock Spike on (target=${target.name}).`;
//             const sequenceMessage = [];
//             const targets = [];

//             let message = `(actor=${actor.name}) summons a Rock Spike on (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '2d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.geo,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('vitality')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalDamage: (level-1)
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) geo damage.` : message += `but Missed!`;

//             let effectApply = false;
//             if (attackResult.dHit) {
//                 actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.bleed,
//                     effectDuration: 2 + (level >= 5 ? 1:0),
//                     effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit()
//                 });
//                 effectApply = true;
//                 message += ` And inflicting Bleed.`;
//             }
//             targets.push(target);
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Geo_Cast],
//                 effectApply ? [TargetSkillEffect.Geo_1, TargetSkillEffect.bleed] : [TargetSkillEffect.Geo_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,5,5,6,7,8],
//         sp: [0,0,0,0,0,0,0],
//         elements: [new ElementConsume({
//             element: 'geo',
//             amount: [2,2,2,2,2,2,2]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'fire',
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_druid_09 = new Skill(
//     `skill_druid_09`,
//     `Lava Burst`,
//     `Attack with hit -2 and deals 1d12 damage to all enemies, all enemies must throw a DC 10 save or suffer burn for 2 turns even if it's not hit by the initial damage.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [],
//         preRequireCharacterLevel: 6,
//         preRequireCharacterTrait: [TraitRepository.trait_motherEarthBlessing]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();

//             const castMessage = `(actor=${actor.name}) casts Lava Burst to affect all enemies.`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) casts Lava Burst on (target=${target.name}), `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d12',
//                     hitBonus: -2 + actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.fire,
//                     damageMultiplier: 1,
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: (level > 5 ? (level-1) *2 : (level-1))
//                 });
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) fire damage, ` : message += `but Missed!`;
//                 attackResult.dHit ? targets.push(target) : {};

//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.burn,
//                     effectDuration: 2,
//                     effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit()
//                 });
//                 effectHit ? message += `and inflicting Burn.` : attackResult.dHit ? message += `but resisted Burn.` : message += '';
//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Geo_Cast, ActorSkillEffect.Fire_Cast],
//                 [TargetSkillEffect.Geo_1, TargetSkillEffect.Fire_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,5,5,5,7,7],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'geo', amount: [2,2,2,2,2,2,2] }),
//             new ElementConsume({ element: 'fire', amount: [1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]] }),
//             new ElementProduce({ element: 'order', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]] })
//         ]
//     }),
//     Tier.epic
// )

// SkillRepository.skill_druid_10 = new Skill(
//     `skill_druid_10`,
//     `Tidal Wave`,
//     `Attack with hit -2 and deals 1d12 damage to all enemies, all enemies must throw a DC 15 save or suffer soaked for 2 turns even if it's not hit by the initial damage.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [],
//         preRequireCharacterLevel: 6,
//         preRequireCharacterTrait: [TraitRepository.trait_motherEarthBlessing]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const castMessage = `(actor=${actor.name}) casts Tidal Wave to affect all enemies.`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) casts Tidal Wave on (target=${target.name}), `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d12',
//                     hitBonus: (level > 5 ? -2 : 0) + actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.water,
//                     damageMultiplier: 1,
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: (level > 5 ? (level-1) : 0)
//                 });
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) water damage, ` : message += `but Missed!`;
//                 attackResult.dHit ? targets.push(target) : {};

//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.soaked,
//                     effectDuration: 2,
//                     effectDC: 15 + actor.getArmorPenaltyForSpellCastingHit()
//                 });
//                 effectHit ? message += `and inflicting Soaked.` : attackResult.dHit ? message += `but resisted Soaked.` : message += '';
//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Geo_Cast, ActorSkillEffect.Water_Cast],
//                 [TargetSkillEffect.Water_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,5,5,5,10,10],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'geo', amount: [2,2,2,2,2,2,2] }),
//             new ElementConsume({ element: 'water', amount: [1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]] }),
//             new ElementProduce({ element: 'order', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]] })
//         ]
//     }),
//     Tier.epic
// )

// SkillRepository.skill_druid_11 = new Skill(
//     'skill_druid_11',
//     'Stone Skin',
//     `Increase user's armor by 1d4 (+willpower), the armor will decrease by 1 points every turn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'geo', value: 1}
//         ],
//         preRequireCharacterLevel: 0,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const armorIncrease = Dice.roll('1d4').sum + actor.getModifier('attributes', 'willpower') + (level > 5 ? level - 1 : level - 1 + 3);

//             actor.buffsAndDebuffs.stoneSkin += armorIncrease;

//             const castMessage = `(actor=${actor.name}) casts Stone Skin.`;
//             const sequenceMessage = [`(actor=${actor.name}) casts Stone Skin, increasing armor by ${armorIncrease} points, will decrease by 1 point every turn.`];
//             const targets = [actor];

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Geo_Cast],
//                 [],
//                 [TargetSkillEffect.stoneSkin],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,5,5,5,10,10],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'geo', amount: [1,1,1,1,1,1,1]}),
//             new ElementConsume({ element: 'none', amount: [1,1,1,1,1,1,1]})
//         ]
//     }),
//     new SkillProduce({
//         elements: []
//     }),
//     Tier.rare
// )

// // 12. Primal Roar
// SkillRepository.skill_druid_12 = new Skill(
//     'skill_druid_12',
//     'Primal Roar',
//     `Roar with the voice of primal beast, giving all party members bonus physical attack.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'geo', value: 1}
//         ],
//         preRequireCharacterLevel: 0,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             let duration = 3 + actor.getModifier('attributes', 'charisma');
//             let primalRoarLevel = 1
//             if (level >= 5) primalRoarLevel = 2;
//             if (level === 7) primalRoarLevel = 3;

//             const castMessage = `(actor=${actor.name}) roars with (skill=primal beast voice).`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of selfParty.characters) {
//                 if (target) {
//                     if (primalRoarLevel === 1) { target.buffsAndDebuffs.primalRoar_1 = duration, target.buffsAndDebuffs.primalRoar_2 = 0, target.buffsAndDebuffs.primalRoar_3 = 0; }
//                     if (primalRoarLevel === 2) { target.buffsAndDebuffs.primalRoar_1 = 0, target.buffsAndDebuffs.primalRoar_2 = duration, target.buffsAndDebuffs.primalRoar_3 = 0; }
//                     if (primalRoarLevel === 3) { target.buffsAndDebuffs.primalRoar_1 = 0, target.buffsAndDebuffs.primalRoar_2 = 0, target.buffsAndDebuffs.primalRoar_3 = duration; }
//                     sequenceMessage.push(`(actor=${actor.name}) (skill=roars) with primal beast voice, giving (target=${target.name}) additional pAtk for ${duration} turns.`);
//                     targets.push(target);
//                 }
//             }

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.NoElement_Cast],
//                 [],
//                 [TargetSkillEffect.primalRoar],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [3,3,3,3,5,5,7],
//         sp: [2,2,2,2,2,2,2],
//         elements: [
//             new ElementConsume({ element: 'fire', amount: [3,3,3,3,3,3,3]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]] }),
//             new ElementProduce({ element: 'order', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.rare
// )

// // 13. Cataclysm
// SkillRepository.skill_druid_13 = new Skill(
//     `skill_druid_13`,
//     `Cataclysm`,
//     `Deal 3d6(+vitality) damage to all enemies, all enemies must throw a DC 7 save or suffer 3 turns of bleed.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [],
//         preRequireCharacterLevel: 10,
//         preRequireCharacterTrait: [TraitRepository.trait_motherEarthBlessing]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();

//             const castMessage = `(actor=${actor.name}) casts Cataclysm to affect all enemies.`;
//             const sequenceMessage = [];
//             const targets = [];

//             let additionalDamage
//             if (level < 5) additionalDamage = level - 1;
//             if (level >= 5) additionalDamage = (level - 1) * 2;
//             if (level >= 7) additionalDamage = ((level - 1) * 2) + 3
//             if (level === 10) additionalDamage = ((level - 1) * 2) + 5

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) casts Cataclysm on (target=${target.name}), `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '3d6',
//                     hitBonus: 0,
//                     damageType: DamageTypes.geo,
//                     damageMultiplier: 1,
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: additionalDamage
//                 });
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) geo damage, ` : message += `but Missed!`;
//                 attackResult.dHit ? targets.push(target) : {};

//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.bleed,
//                     effectDuration: 3,
//                     effectDC: 7 + actor.getArmorPenaltyForSpellCastingHit() + level
//                 });
//                 effectHit ? message += `and inflicting Bleed.` : attackResult.dHit ? message += `but resisted Bleed.` : message += '';

//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Geo_Cast],
//                 [TargetSkillEffect.Geo_3],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [5,5,5,5,10,10,15,15,15,15],
//         sp: [5,5,5,5,5,5,5,5,5,5],
//         elements: [
//             new ElementConsume({ element: 'geo', amount: [3,3,3,3,3,3,3,3,3,3] }),
//             new ElementConsume({ element: 'fire', amount: [3,3,3,3,3,3,3,3,3,3] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]] }),
//         ]
//     }),
//     Tier.legendary
// )

// // // 14. Summon Familiar
// // SkillRepository.skill_druid_14 = new Skill(
// //     `skill_druid_14`,
// //     `Summon Wolf`,
// //     `Summon a wolf to help in your fight, you must have at least 1 slot available in your party to summon a wolf, after summoned the card will be discarded from the entire battle.`,
// //     new SkillLearningRequirement({
// //         preRequireSkillID: [],
// //         preRequireElements: [
// //             { element: 'geo', value: 1}
// //         ],
// //         preRequireCharacterLevel: 0,
// //         preRequireCharacterTrait: []
// //     }),
// //     new SkillEquipmentRequirement({
// //         weapon: [],
// //         armor: [],
// //         accessory: []
// //     }),
// //     new SkillActiveEffect(
// //         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {
// //             const partyFull = selfParty.isPartyFull();
// //             if (partyFull) {
// //                 return new ActionDetails(
// //                     actor,
// //                     SkillRepository.skill_druid_14,
// //                     [
// //                         new TargetDetails (
// //                             actor,
// //                             0,
// //                             'none',
// //                             false,
// //                             []
// //                         )
// //                     ],
// //                     [new TurnEvent(actor, 'Party is full, can not summon wolf.')],
// //                     'Party is full, can not summon wolf.'
// //                 );
// //             };

// //             const summon = new Summon (
// //                 `${actor.name}'s summoned Wolf`,
// //                 summon_wolf,
// //                 '',
// //             )
// //             selfParty.addCharacterToParty(summon);
// //             actor.removeSkillFromDeck(SkillRepository.skill_druid_14);

// //             game.battleManager.findActiveBattle(selfParty)?.allParticipants.push(summon);

// //             const message = `(actor=${actor.name}) (skill=Summons) a wolf to help in the fight.`;

// //             return new ActionDetails(
// //                 actor,
// //                 SkillRepository.skill_druid_14,
// //                 [
// //                     new TargetDetails(
// //                         actor,
// //                         0,
// //                         'none',
// //                         false,
// //                         []
// //                     )
// //                 ],
// //                 [new TurnEvent(actor, message)],
// //                 message
// //             );
// //         }
// //     ),
// //     new SkillConsume({
// //         hp: 0,
// //         mp: 5,
// //         sp: 0,
// //         elements: [
// //             new ElementConsume({ element: 'geo', amount: 1})
// //         ]
// //     }),
// //     new SkillProduce({
// //         hp: 0,
// //         mp: 0,
// //         sp: 0,
// //         elements: []
// //     })
// // )

// // // 15. Sylvain's Protection
