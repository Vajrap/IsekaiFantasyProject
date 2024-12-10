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

// //Slime 01 - Spit poison
// //Slime 02 - Acidic Splash
// //Slime 03 - Regenerate
// //Slime 04 - Combustion

// SkillRepository.skill_slime_01 = new Skill(
//     `slime_01`,
//     `Spit poison`,
//     `Spit poison at the enemy, dealing poison damage and has a chance to inflict poison effect.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 2, 
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
            
//             const castMessage = `(actor=${actor.name}) (skill=spit poison) on to (target=${target.name})`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) (skill=spit poison) on to (target=${target.name}), `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '1d6',
//                 hitBonus: 0,
//                 damageType: DamageTypes.poison,
//                 damageMultiplier: 1,
//                 penalty: 1
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) poison damage ` : message += `but missed the target.`;

//             let effectHit: boolean = false;

//             if (attackResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.poison,
//                     effectDuration: 2,
//                     effectDC: 8,
//                     savingStatModifier: new CharacterStatusModifier('planar')
//                 })
//                 effectHit ? message += `and poison them for 2 turns.` : message += `but failed to poison them.`;
//             }
//             sequenceMessage.push(message);

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
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [0,0,0,0,0], 
//         elements: [
//             new ElementConsume({element: 'none', amount: [0,0,0,0,0]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//                 element: 'chaos', 
//                 amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//             }),
//             new ElementProduce({
//                 element: 'geo',
//                 amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//             })
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_slime_02 = new Skill(
//     `slime_02`,
//     `Acidic Splash`,
//     `Splash poisonous liquid at the enemies, dealing acid damage and has a chance to inflict poison effect.`,
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
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             if (!possibleTargets) throw new Error('Exceptional: No target found.');
           
//             const castMessage = `(actor=${actor.name}) (skill=acidic splash)`;
//             const sequenceMessage = [];
//             const targets = [];
            
//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) (skill=acidic splash) on to (target=${target.name}), `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d8',
//                     hitBonus: 0,
//                     damageType: DamageTypes.poison,
//                     damageMultiplier: 1,
//                     penalty: 1
//                 });
//                 attackResult.dHit ? targets.push(target) : {};
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) acid damage ` : message += `but missed the target.`;

//                 if (attackResult.dHit) {
//                     const effectHit = actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.poison,
//                         effectDuration: 2,
//                         effectDC: 10,
//                         savingStatModifier: new CharacterStatusModifier('planar')
//                     })
//                     effectHit ? message += `and poison them for 2 turns.` : message += `but failed to poison them.`;
//                 }
//                 sequenceMessage.push(message);
//             }
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Poison_Cast],
//                 [TargetSkillEffect.Poison_2, TargetSkillEffect.poison],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({element: 'chaos', amount: [2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//                 element: 'fire', 
//                 amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//             })
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_slime_03 = new Skill(
//     `slime_03`,
//     `Regenerate`,
//     `Regenerate health over time.`,
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
//             const castMessage = `(actor=${actor.name}) (skill=regenerate)`;
//             const sequenceMessage = [];
//             const targets = [actor];
            
//             let message = `(actor=${actor.name}) (skill=regenerate), `;
//             const healResult = actor.heal({
//                 target: actor,
//                 healingDice: '1d6',
//                 penalty: 0
//             });
//             message += `healing for (heal=${healResult.heal}) health.`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Life_Cast],
//                 [],
//                 [TargetSkillEffect.Life_1],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({element: 'geo', amount: [2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//                 element: 'fire', 
//                 amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//             })
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_slime_04 = new Skill(
//     `slime_04`,
//     `Combustion`,
//     `Explode, dealing fire damage to all enemies and has a chance to inflict burn effect.`,
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
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             if (!possibleTargets) throw new Error('Exceptional: No target found.');
            
//             const castMessage = `(actor=${actor.name}) use (skill=combustion)`;
//             const sequenceMessage = [];
//             const targets = [];
            
//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) (skill=combustion) on to (target=${target.name}), `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d8',
//                     hitBonus: 0,
//                     damageType: DamageTypes.fire,
//                     damageMultiplier: 1,
//                     penalty: 1
//                 });
//                 attackResult.dHit ? targets.push(target) : {};
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) fire damage ` : message += `but missed the target.`;

//                 if (attackResult.dHit) {
//                     const effectHit = actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.burn,
//                         effectDuration: 2,
//                         effectDC: 10,
//                         savingStatModifier: new CharacterStatusModifier('planar')
//                     })
//                     effectHit ? message += `and burn them for 2 turns.` : message += `but failed to burn them.`;
//                 }
//                 sequenceMessage.push(message);
//             }
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Fire_Cast],
//                 [TargetSkillEffect.Fire_1, TargetSkillEffect.burn],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({element: 'fire', amount: [1,1,1,1,1]}),
//             new ElementConsume({element: 'geo', amount: [1,1,1,1,1]}),
//             new ElementConsume({element: 'chaos', amount: [1,1,1,1,1]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//                 element: 'none', 
//                 amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//             })
//         ]
//     }),
//     Tier.common
// )