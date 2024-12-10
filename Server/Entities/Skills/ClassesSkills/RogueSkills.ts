// import { SkillRepository } from "../SkillRepository"
// import { Skill } from "../Skill"
// import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement"
// import { SkillEquipmentRequirement } from "../SubClasses/SkillEquipmentRequirement"
// import { SkillActiveEffect } from "../SubClasses/SkillActiveEffect"
// import { Character } from "../../../Entities/Character/Character"
// import { Party } from "../../Party"
// import { DamageMultiplierFromPosition } from "../../Utility/DamageMultiplierFromPosition"
// import { CharacterStatusModifier } from "../../../Entities/Character/Subclasses/CharacterStatusModifier"
// import { SkillConsume, SkillProduce } from "../SubClasses/SkillConsume"
// import { ElementConsume, ElementProduce } from "../SubClasses/SkillConsume"
// import { K } from "../../Utility/Constants"
// import { Dice } from "../../Utility/Dice"
// import { ActionDetails, TargetSkillEffect, ActorSkillEffect } from "../../DTO/BattleReportDTO"
// import { Tier } from "../../Utility/Tier"
// import { DamageTypes } from "../../Utility/Enum/DamageTypes"

// //MARK: Rogue skills
// /*
// 1. Stealth
// 2. Disruption
// 3. Poisoned Blade
// 4. Backstab
// 5. Triple Slash
// 6. Cautions
// */

// SkillRepository.skill_rogue_01 = new Skill(
//     `skill_rogue_01`,
//     `Triple Slash`,
//     `Attack a target 3 times with 0.4 weapon damage each, each hit increase critical chance.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 3, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword', 'blade', 'dagger'],
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const weapon = actor.equipments.mainHand
//             if (!weapon) { throw new Error('No weapon found, should have been taken care of from the getWeapon method') }
    
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor)
//             if (!target) throw new Error('Exceptional: No target found, should have been taken care of from the getTarget method')
    
//             const castMessage = `(actor=${actor.name} use (skill=triple slash) on (target=${target.name}))`
//             const sequenceMessage = [];
//             const targets = [target];

//             const damageMultiplier = DamageMultiplierFromPosition.get({
//                 preferPosition: 'front',
//                 rightModifier: (level >= 5 ? 0.5 : 0.4),
//                 wrongModifier: 0.25,
//                 actor: actor
//             })

//             let critChanceBonus = (level >= 5 ? 2 : 1)
    
//             let message = `(actor=${actor.name} attack (target=${target.name}) with triple slash, `
//             for (let i = 0; i < 3; i++) {
//                 message += `hit ${i+1}, `
//                 actor.status.battlers.pCRT.bonus += critChanceBonus
//                 const hit = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: weapon.weaponAttack.physicalDiceEnum,
//                     hitBonus: 0,
//                     damageType: weapon.weaponAttack.physicalType,
//                     damageMultiplier: damageMultiplier,
//                     damageStatModifier: [new CharacterStatusModifier('dexterity')],
//                     hitStatModifier: new CharacterStatusModifier('dexterity')
//                 })
//                 hit.dHit ? message += `dealing ${hit.damage} damage.` : message += `Missed! `
//             }
//             actor.status.battlers.pCRT.bonus -= critChanceBonus * 3
//             sequenceMessage.push(message)
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.NoElement_Slash_1, TargetSkillEffect.NoElement_Slash_1, TargetSkillEffect.NoElement_Slash_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [0,0,0,0,0],
//         sp: [5,6,7,8,9],
//         elements: [
//             new ElementConsume({ element: 'none', amount: [2,2,2,2,2] }),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'air', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_rogue_02 = new Skill(
//     `skill_rogue_02`,
//     `Disruption`,
//     `Throw a smoke bomb at the enemy party, target must roll an intelligence saving throw to avoid being slowed for 2 turns.`,
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
//             const possibleTargets = oppositeParty.getAllPossibleTargets()
//             if (!possibleTargets) throw new Error('Exceptional: No target found.')

//             const castMessage = `(actor=${actor.name} throw a (skill=Disruption bomb)`
//             const sequenceMessage = [];
//             const targets = []
    
//             for (const target of possibleTargets) {
//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.slow,
//                     effectDuration: 2 + (level === 5 ? 1: 0),
//                     effectDC: 8 + (level -1) + (level === 5 ? 2 : 0),
//                     inflictorStatModifier: new CharacterStatusModifier('dexterity'),
//                     savingStatModifier: new CharacterStatusModifier('intelligence')
//                 })
//                 effectHit ? targets.push(target) : {}
//                 let message = effectHit ? `(target=${target.name}) was slowed by the bomb` : `(target=${target.name}) avoided the bomb.`
                
//                 if (level >= 5 && effectHit) {
//                     const effectHit_second = actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.burn,
//                         effectDuration: 2,
//                         effectDC: 100,
//                     })
//                     effectHit_second ? message += `And was burned for 2 turns` : ``
//                 }

//                 sequenceMessage.push(message)
//             }
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.NoElement_Cast],
//                 [TargetSkillEffect.slow, TargetSkillEffect.Chaos_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
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
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_rogue_03 = new Skill(
//     `skill_rogue_03`,
//     `Poisoned Blade`,
//     `Attack with a weapon imbued with poison, dealing damage and poisoning the target for 3 turns. if the target is poisoned, deal 2 times weapon damage instead. and increase the poison duration by 1 turn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 4, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['dagger'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const weapon = SkillRepository.skill_rogue_03.equipmentNeeded.getWeapon(actor)
//             if (!weapon) { throw new Error('No weapon found, should have been taken care of from the getWeapon method') }
    
//             const target = oppositeParty.getOneRandomTargetTauntCount(actor)
//             if (!target) throw new Error('Exceptional: No target found, should have been taken care of from the getTarget method')
    
//             const castMessage = `(actor=${actor.name} use (skill=poisoned blade) on (target=${target.name}))`
//             const sequenceMessage = [];
//             const targets = [target];
            
//             let message = `(actor=${actor.name} attack (target=${target.name} with his poisoned blade, ))`
//             const isTargetPoisoned = target.buffsAndDebuffs.poison > 0

//             const actionResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: 0,
//                 damageType: DamageTypes.pierce,
//                 damageMultiplier: isTargetPoisoned ? 2 : 1,
//                 damageStatModifier: [new CharacterStatusModifier('dexterity')],
//                 hitStatModifier: new CharacterStatusModifier('dexterity'),
//                 additionalDamage: level-1
//             })

//             actionResult.dHit ? message += isTargetPoisoned ? message += `since the target is already poisoned the damage is higher, dealing ${actionResult.damage} poison damage and extended the poison duration for 1 turn.` : message += `dealing ${actionResult.damage} poison damage.` : message += `But Missed!`
    
//             let effectHit = false
//             if (isTargetPoisoned === false && actionResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.poison,
//                     effectDuration: isTargetPoisoned ? target.buffsAndDebuffs.poison + 1 : 3
//                 })
//                 effectHit ? message += `and poisoned the target.` : message += `but failed to poisoned the target.`
//             }
    
//             sequenceMessage.push(message)
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Poison_Cast],
//                 [TargetSkillEffect.poison, TargetSkillEffect.NoElement_Pierce_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [5,5,5,5,5,5,5], 
//         elements: [
//             new ElementConsume({ element: 'chaos', amount: [1,1,1,1,1,1,1] }),
//             new ElementConsume({ element: 'geo', amount: [1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'air', amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]] }),
//         ]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_rogue_04 = new Skill(
//     `skill_rogue_04`,
//     `Back Stab`,
//     `Attack the target from behind, dealing 1.2 weapon damage. If used while in stealth, deal additional 80% damage, and remove stealth. if the target is poisoned, each turn of poison left will increase the damage by 40% and remove the poison.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 7, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['dagger'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const weapon = SkillRepository.skill_rogue_04.equipmentNeeded.getWeapon(actor)
//             if (!weapon) { throw new Error('No weapon found, should have been taken care of from the getWeapon method') }
    
//             const target = oppositeParty.getOnePreferredBackRowTauntCount(actor)
//             if (!target) throw new Error('Exceptional: No target found, should have been taken care of from the getTarget method')
    
//             const isTargetPoisoned = target.buffsAndDebuffs.poison > 0
//             const damageMultiplier = (level >= 5 ? 1.5 : 1.2) + (actor.buffsAndDebuffs.stealth ? 0.8 : 0) + (isTargetPoisoned ? 0.4 * target.buffsAndDebuffs.poison : 0)
    
//             const castMessage = actor.buffsAndDebuffs.stealth > 0 ? `While in stealth (actor=${actor.name} (skill=back stab) (target=${target.name})` : `(actor=${actor.name} (skill=back stab) (target=${target.name})`
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name} attack (target=${target.name}) with back stab), `
//             const actionResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.physicalDiceEnum,
//                 hitBonus: 0,
//                 damageType: DamageTypes.pierce,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('dexterity')],
//                 additionalDamage: level-1
//             })

//             actionResult.dHit && isTargetPoisoned ? message += `(target=${target.name} is poisoned, dealing more damage, )` : {}
//             actionResult.dHit && actor.buffsAndDebuffs.stealth > 0 ? message += `(actor=${actor.name} is in stealth mode, dealing more damage)` : {}
//             actionResult.dHit ? message += `dealing ${actionResult.damage} poison damage` : message += `but Missed!`

//             sequenceMessage.push(message);

//             if (actionResult.dHit) {
//                 actor.buffsAndDebuffs.stealth = 0
//                 target.buffsAndDebuffs.poison = 0
//             }
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Chaos_1, TargetSkillEffect.NoElement_Pierce_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [5,5,5,5,5,5,5], 
//         elements: [
//             new ElementConsume({ element: 'air', amount: [2,2,2,2,1,1,1] }),
//             new ElementConsume({ element: 'fire', amount: [1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]] }),
//         ]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_rogue_05 = new Skill(
//     `skill_rogue_05`,
//     `Stealth`,
//     `Get into stealth mode, While in stealth mode, most enemies will not be able to target you. Stealth mode active longer if the user has higher agility.`,
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
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const diceRoll = Dice.roll('1d20').sum + actor.getModifier('attributes', 'agility')
//             const effectHit = diceRoll > 5
    
//             const castMessage = `${actor.name} use stealth.`
//             const sequenceMessage = [];
//             const targets = [actor];

//             let message = `(actor=${actor.name}) attempts to go into stealth mode.`
//             effectHit? message += `and stealth for 2 turns.` : `but failed! Remains visible.`
//             if (effectHit) {
//                 actor.inflictEffect({
//                     actor: actor,
//                     target: actor,
//                     inflictEffect: K.buffsAndDebuffs.stealth,
//                     effectDuration: 2 + (level >= 5 ? 1 : 0) + actor.getModifier('attributes', 'agility')
//                 })
//             }
//             sequenceMessage.push(message)
    
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Chaos_Cast],
//                 [],
//                 [TargetSkillEffect.stealth],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [5,5,5,5,5,5,5], 
//         elements: [
//             new ElementConsume({ element: 'none', amount: [3,3,3,3,3,3,3] }),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'air', amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]] }),
//             new ElementProduce({ element: 'fire', amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]] })
//         ]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_rogue_06 = new Skill(
//     `skill_rogue_06`,
//     `Cautious`,
//     `Prepare for the incoming attack, gain extra dodge, each stack of cautious increase dodge by 1 and will be decreased by 1 each turn.`,
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
//             const castMessage = `(actor=${actor.name} use (skill=cautious))`
//             const sequenceMessage = [];
//             const targets = [actor];

//             let message = `(actor=${actor.name}) prepare for the incoming attack.`
//             const effectHit = actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: K.buffsAndDebuffs.cautious,
//                 effectDuration: 2 + (level >= 5 ? 1 : 0),
//                 effectDC: 10,
//                 inflictorStatModifier: new CharacterStatusModifier('agility'),
//             })
//             effectHit ? message += `and gain extra dodge.` : message += `but failed!`
//             sequenceMessage.push(message);
        
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.NoElement_Cast],
//                 [],
//                 [TargetSkillEffect.cautious],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [5,5,5,5,5],
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1, 1, 1, 1, 1]
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