import { SkillRepository } from "../SkillRepository"
import { Skill } from "../Skill"
import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement"
import { SkillEquipmentRequirement } from "../SubClasses/SkillEquipmentRequirement"
import { Character } from "../../../Entities/Character/Character"
import { Party } from "../../Party/Party"
import { DamageMultiplierFromPosition } from "../../../Utility/DamageMultiplierFromPosition"
import { CharacterStatusModifier } from "../../../Entities/Character/Subclasses/CharacterStatusModifier"
import { SkillConsume, SkillProduce } from "../SubClasses/SkillConsume"
import { ElementConsume, ElementProduce } from "../SubClasses/SkillConsume"
import { TraitRepository } from "../../Traits/Trait"
import { Dice } from "../../../Utility/Dice"
import { K } from "../../../Utility/Constants"
import { ActionDetails, TargetSkillEffect, ActorSkillEffect } from "../../../API/BattleReportDTO"
import { Tier } from "../../../Utility/Tier"
import { DamageTypes } from "../../../Utility/Enum/DamageTypes"

//MARK: Fighter skills
/*
1. Shield Slam
2. Power Strike
3. Defensive Stance
4. Taunt
5. Double Strike
6. Battle Cry
7. First Aid
8. Counter Attack
9. Lacerate
10. Iai Slash
11. Bash
12. Ground Breaking Smash
13. Charge
14. Roar
15. Zealot's Fury
*/

// SkillRepository.skill_fighter_01 = new Skill(
//     `skill_fighter_01`,
//     `Power Strike`,
//     `Sacrifice the accuracy to deal a powerful strike that deals 1.5 times weapon damage which has a small chance to deal 2 times weapon. And the target will also have a small chance to be stun.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 1, 
//         preRequireCharacterTrait: []
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
//             const weapon = SkillRepository.skill_fighter_02.equipmentNeeded.getWeapon(actor) || WeaponRepository.bareHand;
//             if (!weapon) throw new Error('Exceptional: No weapon found.');
//             let modifier = 1.5;
    
//             const castingMessage = `(actor=${actor.name}) is using (skill=Power Strike) on (target=${target.name})`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) is using (skill=Power Strike) `;
//             if (actor.buffsAndDebuffs.fightingSpirit_1 > 0 || actor.buffsAndDebuffs.fightingSpirit_2 > 0 || actor.buffsAndDebuffs.fightingSpirit_3 > 0) {
//                 const diceRoll = Dice.roll('1d20').sum;
//                 if (diceRoll >= 10) {
//                     modifier = 2;
//                     message += `with special damage from fighting spirit, `;
//                 }
//             }
    
//             if (actor.position > 2) { 
//                 modifier = modifier / 2;
//             }
    
//             if (level === 5) { modifier += 0.15 }

//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: -4,
//                 damageType: weapon.weaponAttack.physicalType,
//                 damageMultiplier: modifier,
//                 damageStatModifier: [new CharacterStatusModifier('strength')],
//                 additionalDamage: level
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) ${weapon.weaponAttack.physicalType} damage` : message += `but Missed!`;        
    
//             let effectHit = false;
//             if (attackResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.stun,
//                     effectDuration: 2,
//                     effectDC: (level === 5) ? 7 : 5,
//                     savingStatModifier: new CharacterStatusModifier('endurance')
//                 });
//                 effectHit ? message += ` and successfully stun.` : message += ` but failed to stun.`;
//             }

//             sequenceMessage.push(message);
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.NoElement_Slash_2],
//                 [],
//                 castingMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,7,8,9,10], 
//         elements: [
//             new ElementConsume({ element: 'none', amount: [2,2,2,2,2]} ),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'fire', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]})
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_fighter_02 = new Skill(
//     `fighter_skill_02`,
//     `Defensive Stance`,
//     `Increases physical defense for 2 turns.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 1, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['shield'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             let buff = K.buffsAndDebuffs.defensiveStance_1;
//             if (level === 5) { buff = K.buffsAndDebuffs.defensiveStance_2; }

//             const castMessage = `(actor=${actor.name}) is using (skill=Defensive Stance)`;
//             const sequenceMessage = [];
//             const targets = [actor];

//             actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: buff,
//                 effectDuration: 2
//             });
            
//             let targetSkillEffect = TargetSkillEffect.defensiveStance_1;
//             if (buff = K.buffsAndDebuffs.defensiveStance_2) {
//                 targetSkillEffect = TargetSkillEffect.defensiveStance_2;
//             }

//             let message = `(actor=${actor.name}) get into (skill=Defensive Stance) increasing physical defense for 2 turns.`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.NoElement_Cast],
//                 [],
//                 [targetSkillEffect],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,5,5,5,5], 
//         elements: [
//             new ElementConsume({element: 'none', amount: [2,2,2,2,2]}),
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

// SkillRepository.skill_fighter_03 = new Skill(
//     `skill_fighter_03`,
//     `Shield Slam`,
//     `Slams the enemy with a shield, dealing small damage and has significant chance to stun the target. The skill scales with your level and strength.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 2, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['shield'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const shield = SkillRepository.skill_fighter_01.equipmentNeeded.getWeapon(actor);
//             if (!shield) throw new Error('Exceptional: No shield found.');
//             const damage = shield.weaponAttack.physicalDiceEnum;
//             const damageMultiplier = 1 + (level === 5? 0.1: 0);
//             const stunDC = 7 + (level-1) + actor.getModifier('attributes', 'strength');

//             const castMessage = `(actor=${actor.name}) is using (skill=Shield Slam) (target=${target.name})`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) (skill=Shield Slam) (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: damage,
//                 hitBonus: 0,
//                 damageType: DamageTypes.blunt,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('strength')],
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) blunt damage` : message += `but Missed!`;

//             let effectHit = false;
//             if (attackResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.stun,
//                     effectDuration: 2,
//                     effectDC: stunDC,
//                     savingStatModifier: new CharacterStatusModifier('endurance')
//                 });
//                 message += ` and ${effectHit ? 'successfully' : 'failing to'} stun.`;
//             }

//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.shielded],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,5,5,5,5], 
//         elements: [
//             new ElementConsume( {element: 'geo', amount: [2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1]] })
//         ]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_fighter_04 = new Skill(
//     `fighter_skill_04`,
//     `Taunt`,
//     `Taunts the enemy to attack only the user for 2 turn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 4, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const castMessage = `(actor=${actor.name}) is using (skill=Taunt)`;
//             const sequenceMessage = [];
//             const targets = [actor];

//             actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: K.buffsAndDebuffs.taunt,
//                 effectDuration: 2 + (level === 5 ? 1 : 0)
//             });
//             let message = `(actor=${actor.name}) is using (skill=Taunt) to taunt the enemy to attack only the user for 2 turns.`;
//             sequenceMessage.push(message);
    
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.NoElement_Cast],
//                 [],
//                 [TargetSkillEffect.taunt],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,5,5,5,5], 
//         elements: [
//             new ElementConsume({element: 'fire', amount: [1,1,1,1,1]}),
//             new ElementConsume({element: 'geo', amount: [1,1,1,1,1]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'fire', amountRange: [[0,1],[0,1],[1,1],[1,1],[1,2]] })
//         ]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_fighter_05 = new Skill(
//     `fighter_skill_05`,
//     `Double Strike`,
//     `Attack enemy twice with 0.7 times weapon damage each, the second strike has lower chance to hit. If user wears weapon in both hands, the attack will deal 1 times weapon damage each.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword', 'blade', 'spear', 'axe', 'mace'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             let modifier = 0.7;
//             let twoHanded = false;
//             if (actor.equipments.mainHand?.equipmentType === 'weapon' &&
//                 actor.equipments.mainHand?.weaponType !== 'shield' &&
//                 actor.equipments.offHand?.equipmentType === 'weapon' &&
//                 actor.equipments.offHand?.weaponType !== 'shield' &&
//                 actor.equipments.mainHand.handler === 1 &&
//                 actor.equipments.offHand.handler === 1) {
//                 twoHanded = true;
//             }
    
//             if (twoHanded) { modifier = 1; }
//             if (actor.position > 2) { modifier = modifier / 2; }
//             const weapon = SkillRepository.skill_fighter_05.equipmentNeeded.getWeapon(actor) || WeaponRepository.bareHand;
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
    
//             const castMessage = `(actor=${actor.name}) is using (skill=Double Strike)`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) attack (target=${target.name}), `;
//             const damage_1 = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: 0,
//                 damageType: weapon.weaponAttack.physicalType,
//                 damageMultiplier: modifier,
//                 damageStatModifier: [new CharacterStatusModifier('strength'), new CharacterStatusModifier('dexterity'), new CharacterStatusModifier('dexterity')],
//                 additionalDamage: level/2
//             });
//             damage_1.dHit ? message += `first hit deal (damage=${damage_1.damage}), ` : message += `first hit Missed! `;
    
//             const damage_2 = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: -4,
//                 damageType: weapon.weaponAttack.physicalType,
//                 damageMultiplier: modifier,
//                 damageStatModifier: [new CharacterStatusModifier('strength'), new CharacterStatusModifier('dexterity'), new CharacterStatusModifier('dexterity')],
//                 additionalDamage: level/2
//             });
//             damage_2.dHit ? message += `second hit deal (damage=${damage_2.damage}).` : message += `second hit Missed!`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.NoElement],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,5,5,5,5], 
//         elements: [
//             new ElementConsume({element: 'none', amount: [2,2,2,2,2]}),
//             new ElementConsume({element: 'fire', amount: [2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'air', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_fighter_06 = new Skill(
//     `fighter_skill_06`,
//     `Battle Cry`,
//     `Buff team with fighting spirit and enemies that are 5 level lower will get fear. The user then do leadership roll, if passed will and also deal minor damage to enemies while heal temmate for minor amount.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 10, 
//         preRequireCharacterTrait: [TraitRepository.trait_warLord]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const selfPartytargets = selfParty.getAllPossibleTargets();
//             const leadershipRoll = Dice.roll('1d20').sum + actor.getModifier('attributes', 'leadership');
//             let buffDuration = 2;
//             if (level >= 5) { buffDuration += 1 }
//             let buff = K.buffsAndDebuffs.fightingSpirit_1;
//             if (level >= 5) { buff = K.buffsAndDebuffs.fightingSpirit_2; }
    
//             const castMessage = `(actor=${actor.name}) is using (skill=Battle Cry)`;
//             const sequenceMessage = [];
//             const targets = [];
//             const positiveTargets = [];
            
//             for (const target of selfPartytargets) {
//                 let message = `(actor=${actor.name}) (skill=Battle Cry), buffing (target=${target.name}) with fighting spirit.`;
//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: buff,
//                     effectDuration: buffDuration
//                 });
    
//                 if (leadershipRoll >= 15) {
//                     actor.heal({
//                         target: target,
//                         healingDice: '1d4',
//                         penalty: 0,
//                         additionalHealing: actor.getModifier('attributes', 'leadership')
//                     });
//                     message += ` and heal for ${actor.getModifier('attributes', 'leadership')} hp.`
//                 }
//                 effectHit ? positiveTargets.push(target):{};
//                 sequenceMessage.push(message);
//             }
    
//             const oppositePartyTargets = oppositeParty.getAllPossibleTargets();
//             for (const target of oppositePartyTargets) {
//                 let message = `(target = ${target.name}) is affected by (skill=Battle Cry), `;
//                 let effectHit = false;
//                 if ((actor.level - target.level) >= 5) {
//                     effectHit = actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.fear,
//                         effectDuration: buffDuration
//                     });
//                     effectHit ? message += `and get feared.` : message += `but resisted feared.`;
//                 }
//                 let damage;
//                 if (leadershipRoll >= 15) {
//                     damage = actor.attack({
//                         actor: actor,
//                         target: target,
//                         damageDice: '1d4',
//                         hitBonus: 0,
//                         damageType: DamageTypes.chaos,
//                         damageMultiplier: 1,
//                         additionalDamage: actor.getModifier('attributes', 'leadership')
//                     });
//                     damage.dHit ? message += ` and deal ${damage.damage} chaos damage.` : message += ``;
//                 }
//                 damage?.dHit ? targets.push(target):{};
//                 sequenceMessage.push(message);
//             }
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 positiveTargets,
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.fear],
//                 [TargetSkillEffect.heal],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [5,5,5,5,5,5,5], 
//         elements: [
//             new ElementConsume({element: 'fire', amount: [3,3,3,3,3,3,3]}),
//             new ElementConsume({element: 'none', amount: [2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]]})
//         ]
//     }),
//     Tier.rare
// );

// SkillRepository.skill_fighter_07 = new Skill(
//     'skill_fighter_07',
//     'First Aid',
//     `Heal oneself for small amount of health.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
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
//             const castMessage = `(actor=${actor.name}) is using (skill=First Aid)`;
//             const sequenceMessage = [];
//             const targets = [actor];

//             const healing = actor.heal({
//                 target: actor,
//                 healingDice: '1d4',
//                 penalty: 0,
//                 additionalHealing: level/2
//             });
//             let message = `(actor=${actor.name}) is using (skill=First Aid) and heal for ${healing} hp.`;
//             sequenceMessage.push(message);
    
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.NoElement_Cast],
//                 [],
//                 [TargetSkillEffect.heal],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [3,3,3,3,1], 
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1,1,1,1,1]
//         })
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'order', 
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_fighter_08 = new Skill(
//     `skill_fighter_08`,
//     `counter attack`,
//     `Go into a counter attack stance, when attacked during this stance the user will gain 1 water resource, next Iai slash will also deal more damage, the more attack recieved during this stance the more damage the Iai strike will do.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword', 'blade', 'spear', 'axe', 'mace'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             let buff = K.buffsAndDebuffs.counterAttack_1;
//             if (level >= 5) { buff = K.buffsAndDebuffs.counterAttack_2; }
//             const castMessage = `(actor=${actor.name}) is using (skill=Counter Attack)`;
//             const sequenceMessage = [];
//             const targets = [actor];

//             actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: buff,
//                 effectDuration: 1
//             });

//             let message = `(actor=${actor.name}) is using (skill=Counter Attack) to go into counter attack stance.`;
//             sequenceMessage.push(message);
    
//             let targetSkillEffect = TargetSkillEffect.counterAttack_1;
//             if (buff = K.buffsAndDebuffs.counterAttack_2) {
//                 targetSkillEffect = TargetSkillEffect.counterAttack_2;
//             }
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.NoElement_Cast],
//                 [],
//                 [targetSkillEffect],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [7,7,7,7,5,4,3], 
//         elements: [
//             new ElementConsume( {element: 'none', amount: [2,2,2,2,2,2,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'water', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[1,1]] })
//         ]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_fighter_09 = new Skill(
//     `skill_fighter_09`,
//     `Lacerate`,
//     `Lacerate the enemy dealing weapon's physical damage. Have a chance to make the target bleed.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 3, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword', 'blade', 'axe', 'dagger'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const weapon = SkillRepository.skill_fighter_09.equipmentNeeded.getWeapon(actor);
//             if (!weapon) throw new Error('Exceptional: No Weapon found');
//             const damageMultiplier = DamageMultiplierFromPosition.get({
//                 preferPosition: 'front',
//                 rightModifier: 1,
//                 wrongModifier: 0.5,
//                 actor
//             });
//             let bleedStack = 2;
//             if (level >= 3) { bleedStack = 3 }
//             if (level >= 5) { bleedStack = 4 }
            
//             const castMessage = `(actor=${actor.name}) is using (skill=Lacerate)`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) (skill=Lacerate) (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: 0,
//                 damageType: DamageTypes.slash,
//                 damageMultiplier: damageMultiplier
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) slash damage` : message += `but Missed!`;
//             if (attackResult) {
//                 actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.bleed,
//                     effectDuration: bleedStack,
//                     effectDC: 10 + (level - 1),
//                     inflictorStatModifier: undefined,
//                     savingStatModifier: new CharacterStatusModifier('endurance')
//                 });
//                 message += ` and causing bleed.`;
//             }
    
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Slash],
//                 [TargetSkillEffect.NoElement_Slash_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,5,5,5,5], 
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1,1,1,1,1]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'air', 
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_fighter_10 = new Skill(
//     `skill_fighter_10`,
//     `Iai Slash`,
//     `Unsheath the weapon and slash the enemy dealing 1.2 times weapon's physical damage plus dexterity modifier, if user is in the counter attack state, the attack will deal 2 times weapon's physical damage instead.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [`skill_fighter_08`], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword', 'blade'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             let modifier = 1.2;
//             let charge_1 = actor.buffsAndDebuffs.counterAttackCharge_1;
//             let charge_2 = actor.buffsAndDebuffs.counterAttackCharge_2;
            
//             if (charge_1 > 0) { modifier += (charge_1/10) }
//             if (charge_2 > 0) { modifier += (charge_2/5) }

//             const weapon = SkillRepository.skill_fighter_10.equipmentNeeded.getWeapon(actor);
//             if (!weapon) throw new Error('Exceptional: No Weapon found');
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');

//             let penalty = actor.position > 2 ? 0.5 : 1;

//             const castMessage = `(actor=${actor.name}) is using (skill=Iai Slash)`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) (skill=Iai Slash) (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: 0,
//                 damageType: weapon.weaponAttack.physicalType,
//                 damageMultiplier: modifier,
//                 damageStatModifier: [new CharacterStatusModifier('dexterity'), new CharacterStatusModifier('dexterity'), new CharacterStatusModifier('dexterity'), new CharacterStatusModifier('strength')],
//                 penalty: penalty,
//                 additionalDamage: level
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) ${weapon.weaponAttack.physicalType} damage` : message += `but Missed!`;
//             sequenceMessage.push(message);
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.NoElement_Slash_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [7,7,7,7,7,7,7], 
//         elements: [new ElementConsume({
//             element: 'water', 
//             amount: [4,4,4,4,3,3,2]
//         })]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//             element: 'air', 
//             amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]
//             }),
//             new ElementProduce({
//                 element: 'fire', 
//                 amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]
//             })
//         ]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_fighter_11 = new Skill(
//     `skill_fighter_11`,
//     `Bash`,
//     `Bash the enemy dealing major weapon's physical damage plus strength modifier, but the accuracy is low`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'staff', 'tome', 'shield', 'mace'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const weapon = SkillRepository.skill_fighter_11.equipmentNeeded.getWeapon(actor);
//             if (!weapon) throw new Error('Exceptional: No Weapon found');
//             let modifier = 1.3;
//             modifier += (level-1)/10;

//             const castMessage = `(actor=${actor.name}) is using (skill=Bash)`;
//             const sequenceMessage = [];
//             const targets = [target];

//             const damageMultiplier = DamageMultiplierFromPosition.get({
//                 preferPosition: 'front',
//                 rightModifier: modifier,
//                 wrongModifier: modifier/2,
//                 actor
//             });

//             let message = `(actor=${actor.name}) (skill=Bash) (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: -5 + (level-1),
//                 damageType: DamageTypes.blunt,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('strength')],
//                 additionalDamage: (level-1)
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) blunt damage` : message += `but Missed!`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Blunt],
//                 [TargetSkillEffect.NoElement_Blunt_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,5,5,5,5], 
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1,1,1,1,1]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'geo', 
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_fighter_12 = new Skill(
//     `skill_fighter_12`,
//     `Ground Breaking Smash`,
//     `Smash the ground dealing geo damage plus strength modifier, and have a chance to stun target.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 4, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['mace'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
            
//             const damageMultiplier = DamageMultiplierFromPosition.get({
//                 preferPosition: 'front',
//                 rightModifier: 1,
//                 wrongModifier: 0.5,
//                 actor
//             });

//             const castMessage = `(actor=${actor.name}) is using (skill=Ground Breaking Smash)`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) (skill=Ground Breaking Smash) (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: (level >= 5? '3d4' : '1d8'),
//                 hitBonus: 0,
//                 damageType: DamageTypes.geo,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('strength')],
//                 additionalDamage: level-1
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) geo damage` : message += `but Missed!`;
    
//             let effectHit = false;
//             if (attackResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.stun,
//                     effectDuration: 1,
//                     effectDC: 4 + (level - 1),
//                     inflictorStatModifier: new CharacterStatusModifier('strength'),
//                     savingStatModifier: new CharacterStatusModifier('endurance')
//                 });
//                 effectHit ? message += ` and successfully stun.` : message += ` but failed to stun.`;
//             }

//             sequenceMessage.push(message);
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Blunt],
//                 [TargetSkillEffect.Geo_1, TargetSkillEffect.NoElement_Blunt_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [5,5,5,5,7,8,10], 
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1,1,1,1,2,2,2]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'geo', 
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_fighter_13 = new Skill(
//     `skill_fighter_13`,
//     `Charge`,
//     `Charge at the enemy dealing 1d4 blunt damage plus strength modifier, target must roll 6DC (+player's strength) endurance save or suffer 1 turn stun, if stun success and the target is in the front line, knocked it to the back line.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
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
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');

//             const castMessage = `(actor=${actor.name}) is using (skill=Charge)`;
//             const sequenceMessage = [];
//             const targets = [target];

//             const damageMultiplier = DamageMultiplierFromPosition.get({
//                 preferPosition: 'front',
//                 rightModifier: 1,
//                 wrongModifier: 0.5,
//                 actor
//             });

//             let message = `(actor=${actor.name}) (skill=Charge) (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: (level >= 5 ? '2d4' : '1d4'),
//                 hitBonus: 0,
//                 damageType: DamageTypes.blunt,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('strength')],
//                 additionalDamage: level-1
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) blunt damage` : message += `but Missed!`;
    
//             let effectHit = false;
//             if (attackResult) {
//                 const stun = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.stun,
//                     effectDuration: 1,
//                     effectDC: 4 + (level - 1),
//                     inflictorStatModifier: new CharacterStatusModifier('strength'),
//                     savingStatModifier: new CharacterStatusModifier('endurance')
//                 });
//                 stun? message += ` and successfully stun.` : message += ` but failed to stun.`;
//                 if (stun && target.position !== null && target.position < 3) {
//                     let possiblePosition = [3, 4, 5];
//                     for (const target of oppositeParty.characters) {
//                         if (!target) continue;
//                         if (possiblePosition.includes(target.position)) {
//                             possiblePosition.splice(possiblePosition.indexOf(target.position), 1);
//                         }
//                     }
//                     if (possiblePosition.length > 0) {
//                         switch (target.position) {
//                             case 0:
//                                 if (possiblePosition.includes(3)) {
//                                     target.position = 3;
//                                     message += ` and knocked back.`;
//                                 }
//                                 break;
//                             case 1:
//                                 if (possiblePosition.includes(4)) {
//                                     target.position = 4;
//                                     message += ` and knocked back.`;
//                                 }
//                                 break;
//                             case 2:
//                                 if (possiblePosition.includes(5)) {
//                                     target.position = 5;
//                                     message += ` and knocked back.`;
//                                 }
//                                 break;
//                         }
//                     }
//                 }
//             }
//             sequenceMessage.push(message);
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.NoElement_Blunt_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [5,5,5,5,5,5,5], 
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1,1,1,1,1,1,1]
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

// SkillRepository.skill_fighter_14 = new Skill(
//     `skill_fighter_14`,
//     `Roar`,
//     `Roar with fearsome cry, have a change to cause fear to all enemies for 1 turn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 3, 
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

//             const castMessage = `(actor=${actor.name}) is using (skill=Roar)`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 if (!target) continue;
//                 let message = `(actor=${actor.name}) (skill=Roar) at (target=${target.name}), `;
//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.fear,
//                     effectDuration: 1,
//                     effectDC: 5 + (level - 1),
//                     inflictorStatModifier: new CharacterStatusModifier('charisma'),
//                     savingStatModifier: new CharacterStatusModifier('willpower')
//                 });
//                 effectHit ? message += `and cause fear.` : message += `but (target=${target.name}) resisted fear.`;
//                 sequenceMessage.push(message);
//                 effectHit? targets.push(target):{};
//             }
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.fear],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [3,3,3,3,3,3,3], 
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1,1,1,1,1,1,1]
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

// SkillRepository.skill_fighter_15 = new Skill(
//     `skill_fighter_15`,
//     `Zealot's Fury`,
//     `Embrace the Zealot's Fury, increasing your damage dealt but reducing your defenses. Generates Order elements upon use.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 15, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
            
//             const castMessage = `(actor=${actor.name}) is using (skill=Zealot's Fury)`;
//             const sequenceMessage = [];
//             const targets = [actor];

//             actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: K.buffsAndDebuffs.zealotsFury,
//                 effectDuration: (level >= 5 ? 5 : 3),
//             });
//             sequenceMessage.push(`(actor=${actor.name}) is using (skill=Zealot's Fury) and embrace the fury, increasing damage dealt but reducing defenses.`);

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Fire_Physical],
//                 [],
//                 [TargetSkillEffect.Fire_1, TargetSkillEffect.NoElement],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [5,5,5,5,10,10,7], 
//         elements: [
//             new ElementConsume({element: 'none', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume({element: 'fire', amount: [1,1,1,1,1,1,1]})
//         ]
//     }),
//     new SkillProduce({ 
//         elements: [
//             new ElementProduce({element: 'order', amountRange: [[0,1],[0,1],[0,1],[0,1],[1,1],[1,2],[1,2]]})
//         ]
//     }),
//     Tier.rare
// );