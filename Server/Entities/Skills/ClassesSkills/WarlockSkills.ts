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
// import { TraitRepository } from "../../Traits/Trait"
// import { K } from "../../Utility/Constants"
// import { ActionDetails, TargetSkillEffect, ActorSkillEffect } from "../../DTO/BattleReportDTO"
// import { Tier } from "../../Utility/Tier"

// //MARK: warlock skills
// /*
// 1. Curse
// 2. Drain Life
// 3. Shadow Bolt
// 4. Flame Sword Burst
// 5. Dark
// 6. Banish
// 7. Eldritch Fire
// */
// SkillRepository.skill_warlock_01 = new Skill(
//     `skill_warlock_01`,
//     `Curse`,
//     `Curse the target for 2 turns, target must roll for willpower save ot be cursed, cursed target suffer -2 to all saving rolls`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({}),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOneRandomTargetTauntNotCount(actor)
//             if (!target) { throw new Error(`No available target, should be dealt with in the battle process already`) }
    
//             const castMessage = `${actor.name} casts a curse on ${target.name}.`
//             const sequenceMessage = [];
//             const targets = [target];
            
//             const effectHit = actor.inflictEffect({
//                 actor: actor,
//                 target: target,
//                 inflictEffect: K.buffsAndDebuffs.curse,
//                 effectDuration: 2,
//                 effectDC: 6 + actor.getArmorPenaltyForSpellCastingHit() + (level-1),
//                 inflictorStatModifier: new CharacterStatusModifier('intelligence'),
//                 savingStatModifier: new CharacterStatusModifier('willpower')
//             })

//             sequenceMessage.push(`${actor.name} casts a curse on ${target.name}. ${effectHit ? `${target.name} is cursed for 2 turns, suffering -2 to all saving rolls.` : `${target.name} resists the curse.`}`)
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.cursed],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [5,5,5,5,5],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'none', amount: [2,2,2,2,2] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[0,1], [0,1], [0,1], [0,1], [1,1]] })
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_warlock_02 = new Skill(
//     `warlock_skill_02`,
//     `Shadow Bolt`,
//     `Launch a shadow bolt at the target, dealing 1d8 damage.`,
//     new SkillLearningRequirement({       
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 1, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({}),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOneRandomTargetTauntCount(actor)
//             if (!target) { throw new Error(`No target found! Must be handled in Battle's turn method.`) }
            
//             const castMessage = `${actor.name} launches a shadow bolt at ${target.name}.`
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `${actor.name} launches a shadow bolt at ${target.name}, `
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '1d8',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: 'chaos',
//                 damageMultiplier: 1,
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 hitStatModifier: new CharacterStatusModifier('intelligence'),
//                 additionalDamage: level-1
//             })
//             attackResult.dHit ? message+= `dealing ${attackResult.damage} damage.` : message+= `but misses.`
//             sequenceMessage.push(message)

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Chaos_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [5,7,8,9,10],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'none', amount: [2,2,2,2,2] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//         ]
//     }),
//     Tier.common
// )

// SkillRepository.skill_warlock_03 = new Skill(
//     `warlock_skill_03`,
//     `Drain Life`,
//     `Drain the target life fot small amount of damage and heal self for the same amount.`,
//     new SkillLearningRequirement({
//         preRequireCharacterLevel: 5,
//         preRequireCharacterTrait: [
//             TraitRepository.trait_hexbinder_01
//         ]
//     }),
//     new SkillEquipmentRequirement({}),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOneRandomTargetTauntCount(actor)
//             if (!target) { throw new Error(`No target found! Must be handled in Battle's turn method.`) }
            
//             const castMessage = `${actor.name} drains life from ${target.name}.`
//             const sequenceMessage = [];
//             const targets = [target];
            
//             let message = `${actor.name} drains life from ${target.name}, `
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: (level >= 5 ? '2d6' : '1d6'),
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit() - 3,
//                 damageType: 'chaos',
//                 damageMultiplier: 1,
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 additionalDamage: (level-1)
//             })
//             attackResult.dHit ? message+= `dealing ${attackResult.damage} damage, ` : message+= `but misses.`
        
//             let healedAmount = 0
//             if (attackResult.dHit) {
//                 actor.hpUp(actor, attackResult.damage)
//                 healedAmount = attackResult.damage
//                 message += `and heals self for ${healedAmount} hp.`
//             }

//             sequenceMessage.push(message)
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Chaos_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [10,10,10,10,10,10,10],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'chaos', amount: [3,3,3,3,4,4,4] }),
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

// SkillRepository.skill_warlock_04 = new Skill(
//     `warlock_skill_04`,
//     `Flame Sword Burst`,
//     `Deal chaos damage equal 1.5 times weapon magical damage. The target must roll endurance save or suffer 2 turns burn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 3, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['sword']
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const weapon = SkillRepository.skill_warlock_04.equipmentNeeded.getWeapon(actor)
//             if (!weapon) { throw new Error('No weapon found, should have been taken care of in the getWeapon method.') }
//             const target = oppositeParty.getOneRandomTargetTauntCount(actor)
//             if (!target) { throw new Error('No target found, should have been taken care of in the getTarget method.') }
//             const damageMultiplier = DamageMultiplierFromPosition.get({
//                 preferPosition: 'front',
//                 rightModifier: 1.5,
//                 wrongModifier: 1,
//                 actor: actor
//             })

//             const castMessage = `${actor.name} bursts flame from their sword at ${target.name}.`
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `${actor.name} bursts flame from their sword at ${target.name}, `
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.magicalDiceEnum,
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: 'chaos',
//                 damageMultiplier: damageMultiplier,
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 additionalDamage: level-1
//             })
//             attackResult.dHit ? message+= `dealing ${attackResult.damage} damage, ` : message+= `but misses.`
    
//             let effectHit = false
//             if (attackResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.burn,
//                     effectDuration: 2,
//                     effectDC: 6 + actor.getArmorPenaltyForSpellCastingHit() + (level-1),
//                 })
//                 effectHit ? message+= `${target.name} is burned.` : message+= `${target.name} resists the burn effect.`
//             }

//             sequenceMessage.push(message)
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast, ActorSkillEffect.Fire_Cast],
//                 [TargetSkillEffect.Chaos_1, TargetSkillEffect.burn],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,5,5,5,5,5],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'chaos', amount: [1,1,1,1,1,1,1] }),
//             new ElementConsume({ element: 'fire', amount: [1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]] }),
//         ]
//     }),
//     Tier.rare
// )


// SkillRepository.skill_warlock_05 = new Skill(
//     `warlock_skill_05`,
//     `Dark`,
//     `Cause darkness to fall over the area, all characters including the caster must roll intelligence save or suffer blindness for 3 turns. except character with dark vision won't be targeted.`,
//     new SkillLearningRequirement({
//         preRequireCharacterLevel: 7,
//     }),
//     new SkillEquipmentRequirement({}),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets()
//             const possiblePositiveTargets = selfParty.getAllPossibleTargets()
//             let allPossibleTargets = possibleTargets.concat(possiblePositiveTargets)
//             allPossibleTargets = allPossibleTargets.filter(target => !target.traits.includes(TraitRepository.trait_darkVision))
//             if (level === 5) { allPossibleTargets = allPossibleTargets.filter(target => target === actor) }

//             const castMessage = `${actor.name} casts darkness over the area.`
//             const sequenceMessage = [];
//             const targets = [];
//             for (const target of allPossibleTargets) {
//                 if (!target.traits.includes(TraitRepository.trait_darkVision)) {
//                     const effectHit = actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.blind,
//                         effectDuration: 3,
//                         effectDC: 12,
//                         inflictorStatModifier: new CharacterStatusModifier('intelligence'),
//                         savingStatModifier: new CharacterStatusModifier('intelligence')
//                     })
//                     effectHit ? targets.push(target) : {}
//                     effectHit ? sequenceMessage.push(`${target.name} is blinded for 3 turns.`) : sequenceMessage.push(`${target.name} resists the blindness.`)
//                 }
//             }
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.blind],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [10,10,10,10,5],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'chaos', amount: [3,3,3,3,3] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'air', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//             new ElementProduce({ element: 'fire', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_warlock_06 = new Skill(
//     `warlock_skill_06`,
//     `Banish`,
//     `Deal moderate arcane damage, if target type is 'summon' or 'magic' deal huge damage instead.`,
//     new SkillLearningRequirement({
//         preRequireCharacterLevel: 9,
//     }),
//     new SkillEquipmentRequirement({}),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOneRandomTargetTauntCount(actor)
//             if (!target) { throw new Error('No target found, should have been taken care of in the getTarget method.') }
    
//             const isTargetSummonOrMagic = target.type?.type === 'Summoned' || target.type?.type === 'Magical'
//             const damageDice = isTargetSummonOrMagic ? '3d10' : '1d10'
    
//             const castMessage = `${actor.name} banishes ${target.name}.`
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `${actor.name} banishes ${target.name}, `
//             const actionResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: damageDice,
//                 hitBonus: 0,
//                 damageType: 'chaos',
//                 damageMultiplier: 1,
//                 penalty: 0,
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 additionalDamage: level-1
//             })
//             actionResult.dHit ? message+= `dealing ${actionResult.damage} damage.` : message+= `but misses.`
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Chaos_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [5,5,5,5,5],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'chaos', amount: [2,2,2,2,2] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//             new ElementProduce({ element: 'fire', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_warlock_07 = new Skill(
//     `Skill_warlock_07`,
//     `Eldritch Blast`,
//     `Shoot an Eldritch Blast at the target dealing 1d6 damage plus intelligence modifier.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: [TraitRepository.trait_pactWithDevil]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'orb', 'staff', 'tome'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor)
    
//             const castMessage = `${actor.name} shoots an Eldritch Blast at ${target.name}.`
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `${actor.name} shoots an Eldritch Blast at ${target.name}, `
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: level === 5 ? '2d6' : '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: 'chaos',
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalDamage: level-1
//             })
//             attackResult.dHit ? message+= `dealing ${attackResult.damage} damage.` : message+= `but misses.`
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Chaos_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [3,3,3,3,3], 
//         sp: [0,0,0,0,0], 
//         elements: []
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'chaos', 
//             amountRange: [ [1,1], [1,1], [1,1], [1,1], [1,1] ]
//         })]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_warlock_08 = new Skill(
//     `Skill_warlock_08`,
//     `Eldritch Fire`,
//     `Shoot an Eldritch Fire at the target dealing moderate fire damage plus intelligence modifier, target must roll endurance save or suffer burn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: [TraitRepository.trait_pactWithDevil]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'orb', 'staff', 'tome'], 
//         armor: [],
//         accessory: []
//     }),

//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor)

//             const castMessage = `${actor.name} shoots an Eldritch Fire at ${target.name}.`
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `${actor.name} shoots an Eldritch Fire at ${target.name}, `
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: level === 5 ? '3d6' : '2d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: 'fire',
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage()
//             })
//             attackResult.dHit ? message+= `dealing ${attackResult.damage} fire damage.` : message+= `but misses!`

//             let effectHit = false
//             if (attackResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.burn,
//                     effectDuration: 1 + (level >= 5 ? 3 : 0),
//                     effectDC: 6,
//                     inflictorStatModifier: new CharacterStatusModifier('intelligence'),
//                     savingStatModifier: new CharacterStatusModifier('endurance')
//                 })
//                 effectHit ? message+= ` ${target.name} is burned.` : message+= ` ${target.name} resists the burn effect.`
//             }
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Fire_Cast, ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.burn, TargetSkillEffect.Fire_1, TargetSkillEffect.Chaos_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//     }
// ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [5,5,5,5,5,5,5], 
//         sp: [0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume( {element: 'chaos', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume( {element: 'fire', amount: [2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce( {element: 'fire', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]}),
//         ]
//     }),
//     Tier.rare
// )