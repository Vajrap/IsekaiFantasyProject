// import { SkillRepository } from "../SkillRepository"
// import { Skill } from "../Skill"
// import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement"
// import { SkillEquipmentRequirement } from "../SubClasses/SkillEquipmentRequirement"
// import { SkillActiveEffect } from "../SubClasses/SkillActiveEffect"
// import { Character } from "../../../Entities/Character/Character"
// import { Party } from "../../Party"
// import { CharacterStatusModifier } from "../../../Entities/Character/Subclasses/CharacterStatusModifier"
// import { SkillConsume, SkillProduce } from "../SubClasses/SkillConsume"
// import { ElementConsume, ElementProduce } from "../SubClasses/SkillConsume"
// import { K } from "../../Utility/Constants"
// import { ActionDetails, TargetSkillEffect, ActorSkillEffect } from "../../DTO/BattleReportDTO"
// import { Tier } from "../../Utility/Tier"
// import { DamageTypes } from "../../Utility/Enum/DamageTypes"

// //MARK: LI XUEYUE SKILLS
// /*
// 1. Heaven's decree sword play (normal attack, consume only 2 stamina, produce randomly between water order and chaos )
// 2. Blizzard's edge
// 3. Thousand miles frost
// 4. Frozen moon sword dance
// */

// SkillRepository.skill_li_xueyue_01 = new Skill(
//     `skill_li_xueyue_01`,
//     `Heaven's decree sword play`,
//     `A normal form of Heaven's decree sword play`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [],
//         preRequireCharacterLevel: 1,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error(`No target found for ${actor.name}`);
//             const weapon = actor.equipments.mainHand;
//             if (!weapon) throw new Error(`No weapon found for ${actor.name}`);
//             const damageDice = '3d4';

//             const castMessage = `${actor.name} uses Heaven's decree sword play on ${target.name}`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `${actor.name} uses Heaven's decree sword play on ${target.name}, `;
//             const actionResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: damageDice,
//                 hitBonus: 0,
//                 damageType: DamageTypes.slash,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('dexterity')],
//                 additionalDamage: level-1
//             });
//             actionResult.dHit ? message += `deals ${actionResult.damage} slash damage!` : message += `but misses!`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Slash],
//                 [TargetSkillEffect.NoElement_Slash_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [0,0,0,0,0,0,0],
//         sp: [2,2,2,2,2,2,2],
//         elements: [
//             new ElementConsume( {element: 'none', amount: [0,0,0,0,0,0,0]} )
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'water', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//             new ElementProduce({ element: 'order', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//             new ElementProduce({ element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.epic,
//     true
// )

// SkillRepository.skill_li_xueyue_02 = new Skill(
//     `skill_li_xueyue_02`,
//     `Blizzard's edge`,
//     `A powerful ice attack that deals 3d6 damage to all enemies, enemy hit by this skill must roll a DC 10 saving throw or be frozen for 2 turns`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [SkillRepository.skill_li_xueyue_01.id],
//         preRequireElements: [],
//         preRequireCharacterLevel: 5,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const weapon = actor.equipments.mainHand;
//             if (!weapon) throw new Error(`No weapon found for ${actor.name}`);
//             const damageDice = '3d6';

//             const castMessage = `${actor.name} uses Blizzard's edge on all enemies`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `${actor.name} uses Blizzard's edge on ${target.name}, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: damageDice,
//                     hitBonus: 0,
//                     damageType: DamageTypes.chiCold,
//                     damageMultiplier: 1,
//                     damageStatModifier: [new CharacterStatusModifier('breath')],
//                     additionalDamage: level-1 + (level >= 5 ? 2 : 0) + (level >= 10 ? 2 : 0)
//                 });
//                 attackResult.dHit ? targets.push(target) : {};
//                 attackResult.dHit ? message += `deals ${attackResult.damage} chiCold damage!` : message += `but misses!`;

//                 let effectHit = false;
//                 if (attackResult.dHit) {
//                     effectHit  = actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.freeze,
//                         effectDuration: 2 + (level >= 5 ? 1 : 0) + (level >= 10 ? 1 : 0),
//                         effectDC: 10 + (level-1)
//                     })
//                     effectHit ? message += ` ${target.name} is frozen for ${2 + (level >= 5 ? 1 : 0) + (level >= 10 ? 1 : 0)} turns!` : message += ` ${target.name} resists the freeze!`;
//                 }
//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Ice_Chi],
//                 [TargetSkillEffect.Ice_1, TargetSkillEffect.chiCold_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [0,0,0,0,0,0,0,0,0,0],
//         sp: [7,7,7,7,7,7,7,7,7,7],
//         elements: [
//             new ElementConsume({ element: 'water', amount: [2,2,2,2,2,2,2,2,2,2] }),
//             new ElementConsume({ element: 'order', amount: [2,2,2,2,2,2,2,2,2,2] }),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.legendary
// )

// SkillRepository.skill_li_xueyue_03 = new Skill(
//     `skill_li_xueyue_03`,
//     `Thousand miles frost`,
//     `A powerful ice attack that deals massive damage to all enemies`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [SkillRepository.skill_li_xueyue_02.id],
//         preRequireElements: [],
//         preRequireCharacterLevel: 10,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const weapon = actor.equipments.mainHand;
//             if (!weapon) throw new Error(`No weapon found for ${actor.name}`);
//             let damageDice = '3d8';
//             if (level >= 10) { damageDice = '4d8' }

//             const castMessage = `${actor.name} uses Thousand miles frost on all enemies`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `${actor.name} uses Thousand miles frost on ${target.name}, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: damageDice,
//                     hitBonus: 0,
//                     damageType: DamageTypes.chiCold,
//                     damageMultiplier: 1,
//                     damageStatModifier: [new CharacterStatusModifier('breath')],
//                     additionalDamage: level-1 + (level >= 5 ? 2 : 0) + (level >= 10 ? 2 : 0)
//                 });
//                 attackResult.dHit ? targets.push(target) : {};            
//                 attackResult.dHit ? message += `deals ${attackResult.damage} chiCold damage!` : message += `but misses!`;
//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Ice_Chi],
//                 [TargetSkillEffect.Ice_1, TargetSkillEffect.chiCold_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [0,0,0,0,0,0,0,0,0,0],
//         sp: [10,10,10,10,10,10,10,10,10,10],
//         elements: [
//             new ElementConsume({ element: 'water', amount: [2,2,2,2,2,2,2,2,2,2] }),
//             new ElementConsume({ element: 'chaos', amount: [2,2,2,2,2,2,2,2,2,2] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'order', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.legendary
// )

// SkillRepository.skill_li_xueyue_04 = new Skill(
//     `skill_li_xueyue_04`,
//     `Frozen moon sword dance`,
//     `A powerful sword play focusing on the deadly point of enemy, deal massive damage to one target and has a chance to inflict bleed`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [SkillRepository.skill_li_xueyue_03.id],
//         preRequireElements: [],
//         preRequireCharacterLevel: 15,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error(`No target found for ${actor.name}`);
//             const weapon = actor.equipments.mainHand;
//             if (!weapon) throw new Error(`No weapon found for ${actor.name}`);
//             let damageDice = '2d8';
//             if (level >= 5) { damageDice = '3d8' }

//             const castMessage = `${actor.name} uses Frozen moon sword dance on ${target.name}`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `${actor.name} uses Frozen moon sword dance on ${target.name}, `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: damageDice,
//                 hitBonus: 0,
//                 damageType: DamageTypes.pierce,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('dexterity'), new CharacterStatusModifier('breath')],
//                 additionalDamage: level-1 + (level >= 5 ? 2 : 0) + (level >= 10 ? 2 : 0)
//             });
//             attackResult.dHit ? message += `deals ${attackResult.damage} damage!` : message += `but misses!`;

//             if (attackResult.dHit) {
//                 const bleedHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.bleed,
//                     effectDuration: 3,
//                     effectDC: 10
//                 })
//                 bleedHit ? message += ` ${target.name} is bleeding!` : message += ` ${target.name} resists the bleed!`;
//             }
//             sequenceMessage.push(message);
            
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Slash],
//                 [TargetSkillEffect.NoElement_Slash_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [0,0,0,0,0,0,0,0,0,0],
//         sp: [5,5,5,5,5,5,5,5,5,5],
//         elements: [
//             new ElementConsume({ element: 'order', amount: [1,1,1,1,1,1,1,1,1,1] }),
//             new ElementConsume({ element: 'chaos', amount: [1,1,1,1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'water', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[1,1]] })
//         ]
//     }),
//     Tier.unique
// )

