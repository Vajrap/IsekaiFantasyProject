// import { SkillRepository } from "../SkillRepository"
// import { Skill } from "../Skill"
// import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement"
// import { SkillEquipmentRequirement } from "../SubClasses/SkillEquipmentRequirement"
// import { Character } from "../../../Entities/Character/Character"
// import { CharacterStatusModifier } from "../../../Entities/Character/Subclasses/CharacterStatusModifier"
// import { SkillConsume, SkillProduce } from "../SubClasses/SkillConsume"
// import { ElementConsume, ElementProduce } from "../SubClasses/SkillConsume"
// import { TraitRepository } from "../../Traits/Trait"
// import { ItemCost } from "../../Items/Items"
// import { DiceEnum, DamageTypes } from "../../Utility/Enum/DamageTypes"
// import { WeaponType } from "../../Utility/Enum/EquipmentTypes"
// import { CharacterStatusEnum } from "../../Utility/Enum/CharacterStatusTypes"
// import { TargetConditionFilters, TargetPartyType, TargetSelectionScope, TargetSortingOptions, TargetTauntConsideration, TargetType } from "../../Utility/Enum/TargetTypes"

// //MARK: Mage skills
// /*
// 1. Mana surge
// 2. Burning Hand
// 3. Cold Ray
// 4. Chain Lightning
// 5. Spirit Sword
// 6. Mana Shield
// 7. Blizzard
// 8. Thunder Strike
// 9. Magic Missile
// 10. Fire Ball
// 11. Time Warp
// 12. Arcane Explosion
// 13. Soul Drain
// 14. Dimensional Rift
// 15. Ethereal Form

// */
// export const skill_mage_01 = new Skill(
//     `mage_skill_01`,
//     `Mana surge`,
//     `casts a spell that shoots a ball of mana at a random enemy dealing arcane damage. The target must roll Planar saving throw to avoid being paralyzed for 2 turns.`,
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
//     [
//         new SkillActiveEffect(
//             new TargetType(
//                 TargetPartyType.Enemy,
//                 TargetSelectionScope.Single,
//                 TargetConditionFilters.None,
//                 TargetSortingOptions.None,
//                 TargetTauntConsideration.NoTauntCount
//             ),
//             [
//                 new SkillActionObject({
//                     damage: (level) => DiceEnum.c1d6,
//                     damageType: (level) => DamageTypes.arcane,
//                     statForDamage: (level) => [CharacterStatusEnum.intelligence],
//                     damageBonus: (level) => (level-1)/2,
//                     hitBase: (level) => 0,
//                     statBonusForHit: (level) => [CharacterStatusEnum.intelligence],
//                     critBase: (level) => 0,
//                     statBonusForCrit: (level) => [],
//                     applyEffect: (level) => []
//                 })
//             ]
//         )
//     ],
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [5,7,7,9,9], 
//         sp: [0,0,0,0,0], 
//         elements: [
//             new ElementConsume({element: 'none', amount: [2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'water', 
//             amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//         })]
//     }),
//     Tier.common
// )

// SkillRepository.skill_mage_02 = new Skill(
//     `mage_skill_02`,
//     `Burning Hand`,
//     `Cast a spell to attack all enemies on the front row, if there are no front row enemies, the attack will hit the back row instead. The attack deals moderate fire damage and target must roll saving throw on Planar to avoid being burned for 2 turns.`,
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
//     // new SkillActiveEffect(
//     //     (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//     //         let possibleTargets = oppositeParty.getAllFrontRowTargets();
//     //         if (possibleTargets.length === 0) {
//     //             possibleTargets = oppositeParty.getAllBackRowTargets();
//     //         }
//     //         const damageMultiplier = DamageMultiplierFromPosition.get({
//     //             preferPosition: 'front',
//     //             rightModifier: 1,
//     //             wrongModifier: 0.5,
//     //             actor
//     //         });

//     //         const castMessage = `(actor=${actor.name}) cast (skill=Burning Hand).`;
//     //         const sequenceMessage = [];
//     //         const targets = [];

//     //         for (const target of possibleTargets) {
//     //             let message = `(actor=${actor.name}) attack (target=${target.name}) with (skill=Burning Hand) `;
//     //             const attackResult = actor.attack({
//     //                 actor: actor,
//     //                 target: target,
//     //                 damageDice: '2d6',
//     //                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//     //                 damageType: DamageTypes.fire,
//     //                 damageMultiplier: damageMultiplier,
//     //                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//     //                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//     //                 additionalDamage: (level-1)/2
//     //             });
//     //             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) fire damage.` : message += `but missed!`;
//     //             attackResult.dHit ? targets.push(target) : {};
//     //             const effectHit = actor.inflictEffect({
//     //                 actor: actor,
//     //                 target: target,
//     //                 inflictEffect: K.buffsAndDebuffs.burn,
//     //                 effectDuration: 2,
//     //                 effectDC: 6 + actor.getArmorPenaltyForSpellCastingHit() + (level-1),
//     //                 inflictorStatModifier: new CharacterStatusModifier('planar'),
//     //                 savingStatModifier: new CharacterStatusModifier('planar')
//     //             });
//     //             effectHit ? message += ` ${target.name} was burned.` : message += ` ${target.name} resisted the burn.`;

//     //             sequenceMessage.push(message);
//     //         }

//     //         return new ActionDetails(
//     //             actor,
//     //             targets,
//     //             [],
//     //             [ActorSkillEffect.Fire_Cast],
//     //             [TargetSkillEffect.Fire_1, TargetSkillEffect.burn],
//     //             [],
//     //             castMessage,
//     //             sequenceMessage
//     //         );
//     //     }
//     // ),
//     new SkillActiveEffect(
//         TargetType.AllFrontRowEnemyShiftable,
//         [
//             new SkillActionObject({

//             })
//         ]
//     )
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [5,6,7,8,10], 
//         sp: [0,0,0,0,0], 
//         elements: [
//             new ElementConsume({element: 'none', amount: [2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'fire', 
//             amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]
//         })]
//     }),
//     Tier.common
// )

// SkillRepository.skill_mage_03 = new Skill(
//     `mage_skill_03`,
//     `Cold Ray`,
//     `Shoot cone of cold energy at an enemy dealing moderate ice damage, target must roll saving throw on Planar to avoid being frozen for 2 turns.`,
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
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
    
//             const castMessage = `(actor=${actor.name}) cast (skill=Cold Ray).`;
//             const sequenceMessage = [];
//             const targets = [];

//             let message = `(actor=${actor.name}) attack (target=${target.name}) with (skill=Cold Ray) `;
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '2d4',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.ice,
//                 damageMultiplier: 1,
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 additionalDamage: (level-1)/2
//             });
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) ice damage.` : message += `but missed!`;
    
//             const effectHit = actor.inflictEffect({
//                 actor: actor,
//                 target: target,
//                 inflictEffect: K.buffsAndDebuffs.freeze,
//                 effectDuration: 2,
//                 effectDC: 6 + actor.getArmorPenaltyForSpellCastingHit() + (level-1) + (level === 5 ? 2 : 0),
//                 inflictorStatModifier: new CharacterStatusModifier('planar'),
//                 savingStatModifier: new CharacterStatusModifier('planar')
//             });
//             effectHit ? message += ` ${target.name} was frozen.` : message += ` ${target.name} resisted the freeze.`;
            
//             sequenceMessage.push(message);
//             targets.push(target);
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Ice_Cast],
//                 [TargetSkillEffect.Ice_1, TargetSkillEffect.freeze],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [5,5,5,5,5], 
//         sp: [0,0,0,0,0], 
//         elements: [
//             new ElementConsume({element: 'water', amount: [2,2,2,2,2]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'order', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.uncommon
// )


// SkillRepository.skill_mage_04 = new Skill(
//     `mage_skill_04`,
//     `Chain Lightning`,
//     `casts a spell that randomly shoots chain lightnight at multiple random enemies each deal minor damage. with chance to chain to another enemy, minus 10% chance for each chain.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             let possibleTargets = oppositeParty.getAllPossibleTargetsAsParty()
//             let target = possibleTargets.getOneRandomTargetTauntNotCount(actor)
//             if (!target) throw new Error('Exceptional: No target found.')
    
//             const castMessage = `(actor=${actor.name}) cast (skill=Chain Lightning).`;
//             const sequenceMessage = [];
//             const targets = [target];

//             let message = `(actor=${actor.name}) attack (target=${target.name}) with (skill=Chain Lightning) `;
//             let attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.lightning,
//                 damageMultiplier: 1,
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 additionalDamage: (level-1)/2
//             })
//             attackResult.dHit ? targets.push(target) : {};
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) lightning damage.` : message += `but missed!`;
//             sequenceMessage.push(message);
            
//             let lastTarget = target
//             let chainChance = 0.6 + ((level-1) * 0.1)
    
//             while (attackResult.dHit && Math.random() < chainChance) {
//                 target = possibleTargets.getOneRandomTargetExceptExceptionsTauntNotCount(actor, [lastTarget])
//                 let message = `(Lightning chain from ${lastTarget.name} to ${target.name} ) `;
//                 attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.lightning,
//                     damageMultiplier: 1,
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                     additionalDamage: (level-1)/2
//                 })
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) lightning damage.` : message += `but missed!`;
//                 lastTarget = target
//                 chainChance -= 0.1
//                 sequenceMessage.push(message);
//             }
                        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Lightning_Cast],
//                 [TargetSkillEffect.Lightning_1],
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
//             new ElementConsume({element: 'air', amount: [2,2,2,2,2]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]})
//         ]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_mage_05 = new Skill(
//     `mage_skill_05`,
//     `Spirit Sword`,
//     `Summon a spirit sword and equip it, the sword damage increase with breath and intelligence, and will be equipped until the end of battle.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: [TraitRepository.trait_spellblade_01]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const penalty = actor.getArmorPentaltyForSpellCastingDamage()
//             let damageDice = 1
//             let bonuses = actor.getModifier('attributes', 'intelligence') + actor.getModifier('attributes', 'breath') + level - penalty
//             let dice
//             switch (true) {
//                 case (bonuses < 10):
//                     dice = '2d4';
//                     break;
//                 case (bonuses < 15):
//                     dice = '3d4';
//                     break;
//                 case (bonuses < 20):
//                     dice = '4d4';
//                     break;
//                 default:
//                     dice = '1d4';
//                     break;
//             }

//             const castMessage = `(actor=${actor.name}) cast (skill=Spirit Sword).`;
//             const sequenceMessage = [];
//             const targets = [actor];
    
//             const spiritSword = new Sword({
//                 id: actor.characterID + '_' + 'spiritSword',
//                 name: 'Spirit Sword',
//                 description: 'A magical sword made of spirit element',
//                 itemCost: new ItemCost(0, 0),
//                 handler: 1,
//                 weaponAttack: new WeaponAttack({
//                     physicalType: DamageTypes.spirit,
//                     physicalDiceEnum: dice,
//                     magicalType: DamageTypes.spirit,
//                     magicalDiceEnum: dice,
//                 }),
//                 requirement: new EquipmentRequirement({}),
//                 mainWeaponAttackType: 'magical',
//                 material: 'magic',
//                 preferredPosition: 'front',
//                 physicalDamageModifier: new CharacterStatusModifier('planar'),
//                 physicalHitModifier: new CharacterStatusModifier('dexterity'),
//                 magicalDamageModifier: new CharacterStatusModifier('planar'),
//                 magicalHitModifier: new CharacterStatusModifier('intelligence')
//             })
    
//             if (actor.equipments.mainHand) { actor.unequip('mainHand') }
//             if (actor.equipments.offHand?.handler === 2) { actor.unequip('offHand') }
    
//             actor.equip('mainHand', spiritSword)
//             const thisCard = actor.battleCards.find(card => card.id === 'mage_skill_05')
//             if (thisCard) actor.moveCardToSkills(thisCard)
                
//             sequenceMessage.push(`(actor=${actor.name}) summoned a spirit sword with ${dice} damage.`)
            
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Spirit_Cast],
//                 [],
//                 [TargetSkillEffect.SpiritSword],
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
//             new ElementConsume({element: 'order', amount: [1,1,1,1,1,1,1]}),
//             new ElementConsume({element: 'air', amount: [1,1,1,1,1,1,1]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'none', 
//             amountRange: [[0,1],[0,1],[0,1],[0,1],[0,2],[0,2],[0,2]]
//         })]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_mage_06 = new Skill(
//     `mage_skill_06`,
//     `Mana Shield`,
//     `casts a spell that creates a shield made of mana around the user, The shield stack is equal to half of user current mana, the shield will absorb damage until it's broken or the battle ends.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 8, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const halfOfCurrentMana = Math.floor(actor.currentMP / 2)
//             const penalty = actor.getArmorPentaltyForSpellCastingDamage() * 2
//             let shieldAmount = halfOfCurrentMana - penalty
//             if (level >= 5) shieldAmount = shieldAmount * 1.2
            
//             const castMessage = `(actor=${actor.name}) cast (skill=Mana Shield).`;
//             const sequenceMessage = [];
//             const targets = [actor];
    
//             actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: K.buffsAndDebuffs.manaShield,
//                 effectDuration: shieldAmount,
//             })
//             actor.mpDown(halfOfCurrentMana)

//             sequenceMessage.push(`(actor=${actor.name}) created a mana shield with ${shieldAmount} shield amount.`)
                
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Arcane_Cast],
//                 [TargetSkillEffect.manaShield],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume({element: 'water', amount: [2,2,2,2,1,1,1]}),
//             new ElementConsume({element: 'air', amount: [2,2,2,2,1,1,1]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'none', 
//             amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]]
//         })]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_mage_07 = new Skill(
//     `mage_skill_07`,
//     `Blizzard`,
//     `casts a blizzard strom dealing 2d4 damage, target must roll D10 saves or suffer 2 stack of freeze. When taking turn, frozen target must roll D10 saves, if failed, the freeze stack will be increased by 1. If the freeze stack reach 3 the target won't be able to take action for that turn and dealth 1d8 ice damage.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 12, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'orb', 'tome', 'staff'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets()
    
//             const castMessage = `(actor=${actor.name}) cast (skill=Blizzard).`
//             const sequenceMessage = []
//             const targets = []
    
//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with (skill=Blizzard) `
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: level >= 5 ? '2d6' : '2d4',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.ice,
//                     damageMultiplier: 1,
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                     additionalDamage: (level-1)
//                 })
//                 attackResult.dHit ? targets.push(target) : {};
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) ice damage.` : message += `but missed!`
    
//                 const effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.freeze,
//                     effectDuration: (level >= 5) ? 3 : 2,
//                     effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit(),
//                     savingStatModifier: new CharacterStatusModifier('planar')
//                 })
//                 effectHit ? message += ` ${target.name} is frozen.` : message += ` ${target.name} resisted the freeze.`
//                 sequenceMessage.push(message)    
//             }
        
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Ice_Cast],
//                 [TargetSkillEffect.Ice_3, TargetSkillEffect.freeze],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [10,10,10,10,15,15,15], 
//         sp: [0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume({element: 'water', amount: [3,3,3,3,3,3,3]}),
//             new ElementConsume({element: 'order', amount: [3,3,3,3,3,3,3]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'none', amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]] })
//         ]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_mage_08 = new Skill(
//     `mage_skill_08`,
//     `Thunder Strike`,
//     `casts a spell that strikes a random enemy with thunder dealing significant damage, and has a chance to make the target paralyze. If the target is being frozen the damage and change to paralyzed will be increased.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 9, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'orb', 'tome', 'staff'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOneRandomTargetTauntCount(actor)
//             if (!target) throw new Error('Exceptional: No target found.')
    
//             const DC = target.buffsAndDebuffs.freeze ? 10 : 6
//             const damage = target.buffsAndDebuffs.freeze ? '3d6' : '2d6'

//             const castMessage = `(actor=${actor.name}) cast (skill=Thunder Strike).`
//             const sequenceMessage = []
//             const targets = [target]

//             let message = `(actor=${actor.name}) attack (target=${target.name}) with (skill=Thunder Strike) `
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: damage,
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.lightning,
//                 damageMultiplier: 1,
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 additionalDamage: (level-1)*2
//             })
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) lightning damage.` : message += `but missed!`

//             let effectHit = false
//             if (attackResult.dHit) {
//                 effectHit = actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.paralyse,
//                     effectDuration: 2,
//                     effectDC: DC + actor.getArmorPenaltyForSpellCastingHit(),
//                     savingStatModifier: new CharacterStatusModifier('planar')
//                 })
//             }
//             effectHit ? message += ` ${target.name} is paralyzed.` : message += ` ${target.name} resisted the paralyze.`
    
//             sequenceMessage.push(message)

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Lightning_Cast],
//                 [TargetSkillEffect.Lightning_3, TargetSkillEffect.paralyse],
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
//             new ElementConsume({element: 'air', amount: [3,3,3,3,3,3,3]}),
//             new ElementConsume({element: 'chaos', amount: [2,2,2,2,2,2,2]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'water', 
//             amountRange: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]]
//         })]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_mage_09 = new Skill(
//     `skill_mage_09`,
//     `Magic Missile`,
//     `Shoot magic missiles at the target dealing small amount damage. The amount of magic missiles can be increased from user intelligence and skill's level.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'orb', 'staff', 'tome'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             let missilesCount = 1
//             missilesCount += Math.max(0, actor.getModifier('attributes', 'intelligence')) + (level >= 5 ? 2 : 1)
//             let targetRecorder = []
    
//             const castMassage = `(actor=${actor.name}) cast (skill=Magic Missile).`
//             const sequenceMessage = []
//             const targets =[]

//             for (let i = 0; i < missilesCount; i++) {
//                 const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor)
//                 if (!target) throw new Error('Exceptional: No target found.')
//                 targets.push(target)
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with (skill=Magic Missile) `
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.chaos,
//                     damageMultiplier: 1,
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: (level-1)/2
//                 })
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) chaos damage.` : message += `but missed!`
//                 sequenceMessage.push(message)
//             }
    
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Chaos_1],
//                 [],
//                 castMassage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [7,7,7,7,7], 
//         sp: [0,0,0,0,0], 
//         elements: [
//             new ElementConsume({ element: 'none', amount: [2,2,2,2,2] }),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'air', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//             new ElementProduce({ element: 'water', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]] }),
//         ]
//     }),
//     Tier.uncommon
// )

// SkillRepository.skill_mage_10 = new Skill(
//     `skill_mage_10`,
//     `Fire Ball`,
//     `Shoot a fire ball at the target dealing huge fire damage. If the target is burned, the damage will be doubled.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'orb', 'staff', 'tome'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor)
//             if (!target) throw new Error('Exceptional: No target found.')
    
//             const isTargetBurned = target.buffsAndDebuffs.burn > 0
            
//             const castMessage = `(actor=${actor.name}) cast (skill=Fire Ball).`
//             const sequenceMessage = []
//             const targets = [target]

//             let message = `(actor=${actor.name}) attack (target=${target.name}) with (skill=Fire Ball) `
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: level >= 5 ? '2d8' : '1d12',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.fire,
//                 damageMultiplier: isTargetBurned ? 2 : 1,
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 damageStatModifier: [new CharacterStatusModifier('intelligence')],
//                 additionalDamage: level-1
//             })
//             attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) fire damage.` : message += `but missed!`
//             sequenceMessage.push(message)

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Fire_Cast],
//                 [TargetSkillEffect.Fire_2],
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
//             new ElementConsume({ element: 'fire', amount: [2,2,2,2,2,2,2] }),
//             new ElementConsume({ element: 'none', amount: [2,2,2,2,2,2,2] }),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]] })
//         ]
//     }),
//     Tier.rare
// )

// SkillRepository.skill_mage_11 = new Skill(
//     `skill_mage_11`,
//     `Meditate`,
//     `Meditate for 1 turn, restore some mana, the amount of mana restored is increased by user planar attribute.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const modifier = actor.getModifier('attributes', 'planar')
//             const restoredMana = 10 + modifier + (level*2)
//             actor.mpUp(restoredMana)
            
//             const castMessage = `(actor=${actor.name}) (skill=Meditate).`
//             const sequenceMessage = [`(actor=${actor.name}) meditated and restored ${restoredMana} mana.`]
//             const targets = [actor]
    
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Air_Cast],
//                 [],
//                 [TargetSkillEffect.Medidtate],
//                 castMessage,
//                 sequenceMessage
//             )
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [0,0,0,0,0], 
//         sp: [0,0,0,0,0], 
//         elements: [new ElementConsume({
//             element: 'none', 
//             amount: [1,1,1,1,1]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'water', 
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.uncommon
// )

// // SkillRepository.skill_mage_11 = new Skill(
// //     `mage_skill_11`,
// //     `Time Warp`,
// //     `Manipulate the fabric of time, allowing the mage to take an additional turn immediately. This skill consumes 10 MP and has a cooldown of 3 turns.`,
// //     new SkillLearningRequirement({
// //         preRequireSkillID: [], 
// //         preRequireElements: [], 
// //         preRequireCharacterLevel: 15, 
// //         preRequireCharacterTrait: []
// //     }),
// //     new SkillEquipmentRequirement({
// //         weapon: [], 
// //         armor: [],
// //         accessory: []
// //     }),
// //     new SkillActiveEffect(
// //         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {

// //         }
// //     ),
// //     new SkillConsume({
// //         hp: 0, 
// //         mp: 10, 
// //         sp: 0, 
// //         elements: [
// //             new ElementConsume({element: 'none', amount: 0})
// //         ]
// //     }),
// //     new SkillProduce({
// //         hp: 0, 
// //         mp: 0, 
// //         sp: 0, 
// //         elements: [new ElementProduce({
// //             element: 'none', 
// //             amountRange: [0, 2]
// //         })]
// //     })
// // )

// // SkillRepository.skill_mage_12 = new Skill(
// //     `mage_skill_12`,
// //     `Arcane Explosion`,
// //     `Unleash a powerful explosion of arcane energy, dealing 2d6 damage to all enemies. This skill consumes 15 MP and has a 50% chance to stun each target for 1 turn.`,
// //     new SkillLearningRequirement({
// //         preRequireSkillID: [], 
// //         preRequireElements: [], 
// //         preRequireCharacterLevel: 18, 
// //         preRequireCharacterTrait: []
// //     }),
// //     new SkillEquipmentRequirement({
// //         weapon: [], 
// //         armor: [],
// //         accessory: []
// //     }),
// //     new SkillActiveEffect(
// //         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {…}
// //     ),
// //     new SkillConsume({
// //         hp: 0, 
// //         mp: 15, 
// //         sp: 0, 
// //         elements: [
// //             new ElementConsume({element: 'none', amount: 0})
// //         ]
// //     }),
// //     new SkillProduce({
// //         hp: 0, 
// //         mp: 0, 
// //         sp: 0, 
// //         elements: [new ElementProduce({
// //             element: 'none', 
// //             amountRange: [0, 2]
// //         })]
// //     })
// // )

// // SkillRepository.skill_mage_13 = new Skill(
// //     `mage_skill_13`,
// //     `Soul Drain`,
// //     `Drain the life force of a target enemy, dealing 1d8 damage and healing the mage for the same amount. This skill consumes 10 MP and has a 25% chance to instantly kill the target if their health is below 25%.`,
// //     new SkillLearningRequirement({
// //         preRequireSkillID: [], 
// //         preRequireElements: [], 
// //         preRequireCharacterLevel: 20, 
// //         preRequireCharacterTrait: []
// //     }),
// //     new SkillEquipmentRequirement({
// //         weapon: [], 
// //         armor: [],
// //         accessory: []
// //     }),
// //     new SkillActiveEffect(
// //         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {…}
// //     ),
// //     new SkillConsume({
// //         hp: 0, 
// //         mp: 10, 
// //         sp: 0, 
// //         elements: [
// //             new ElementConsume({element: 'none', amount: 0})
// //         ]
// //     }),
// //     new SkillProduce({
// //         hp: 0, 
// //         mp: 0, 
// //         sp: 0, 
// //         elements: [new ElementProduce({
// //             element: 'none', 
// //             amountRange: [0, 2]
// //         })]
// //     })
// // )

// // SkillRepository.skill_mage_14 = new Skill(
// //     `mage_skill_14`,
// //     `Dimensional Rift`,
// //     `Open a rift in space, summoning a random creature from another dimension to aid the mage in battle. The summoned creature has random stats and abilities. This skill consumes 20 MP and has a cooldown of 5 turns.`,
// //     new SkillLearningRequirement({
// //         preRequireSkillID: [], 
// //         preRequireElements: [], 
// //         preRequireCharacterLevel: 25, 
// //         preRequireCharacterTrait: []
// //     }),
// //     new SkillEquipmentRequirement({
// //         weapon: [], 
// //         armor: [],
// //         accessory: []
// //     }),
// //     new SkillActiveEffect(
// //         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {…}
// //     ),
// //     new SkillConsume({
// //         hp: 0, 
// //         mp: 20, 
// //         sp: 0, 
// //         elements: [
// //             new ElementConsume({element: 'none', amount: 0})
// //         ]
// //     }),
// //     new SkillProduce({
// //         hp: 0, 
// //         mp: 0, 
// //         sp: 0, 
// //         elements: [new ElementProduce({
// //             element: 'none', 
// //             amountRange: [0, 2]
// //         })]
// //     })
// // )

// // SkillRepository.skill_mage_15 = new Skill(
// //     `mage_skill_15`,
// //     `Ethereal Form`,
// //     `Transform into an ethereal being, gaining immunity to physical attacks and increasing magic damage by 50% for 3 turns. This skill consumes 15 MP and has a cooldown of 4 turns.`,
// //     new SkillLearningRequirement({
// //         preRequireSkillID: [], 
// //         preRequireElements: [], 
// //         preRequireCharacterLevel: 30, 
// //         preRequireCharacterTrait: []
// //     }),
// //     new SkillEquipmentRequirement({
// //         weapon: [], 
// //         armor: [],
// //         accessory: []
// //     }),
// //     new SkillActiveEffect(
// //         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {…}
// //     ),
// //     new SkillConsume({
// //         hp: 0, 
// //         mp: 15, 
// //         sp: 0, 
// //         elements: [
// //             new ElementConsume({element: 'none', amount: 0})
// //         ]
// //     }),
// //     new SkillProduce({
// //         hp: 0, 
// //         mp: 0, 
// //         sp: 0, 
// //         elements: [new ElementProduce({
// //             element: 'none', 
// //             amountRange: [0, 2]
// //         })]
// //     })
// // )