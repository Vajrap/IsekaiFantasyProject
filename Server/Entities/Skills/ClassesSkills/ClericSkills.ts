import { Skill } from "../Skill"
import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement"
import { SkillEquipmentRequirement } from "../SubClasses/SkillEquipmentRequirement"
import { SkillActionObject, SkillActionSubType, SkillActionType, SkillActiveEffect, SkillApplyEffect, SpecialEffectResult } from "../SubClasses/SkillActiveEffect"
import { SkillConsume, SkillProduce } from "../SubClasses/SkillConsume"
import { ElementConsume, ElementProduce } from "../SubClasses/SkillConsume"
import { TraitEnum } from "../../Traits/TraitEnums"
import { Tier } from "../../../Utility/Tier"
import { DamageTypes } from "../../../../Common/Enums/DamageTypes"
import { FundamentalElementTypes } from "../../../../Common/Enums/ElementTypes"
import { TargetConditionFilters, TargetPartyType, TargetSelectionScope, TargetSortingOptions, TargetTauntConsideration, TargetType } from "../../../../Common/Enums/TargetTypes"
import { CharacterStatusEnum } from "../../../../Common/Enums/Character/CharacterStatusTypes"

//MARK: Cleric Skills
/*
1. Smite
2. Orderic Blast
3. Blessing
4. Holy Water
5. Ball of Light
6. Heal
7. Divine's Fury
8. Divine Shield
9. Divine Intervention
10. Harmony
11. Inspiration
12. Laoh's Blessing
13. Judgement of Laoh
14. Holy Nova
15. Smite Infidel
*/
// const skill_cleric_01 = new Skill(
//     id-string,
//     name-string,
//     baseDescription-string,
//     requirement-SkillLearningRequirement,
//     equipmentNeeded-SkillEquipmentRequirement,
//     activeEffect-SkillActiveEffect[],
//     consume-SkillConsume,
//     produce-SkillProduce,
// )

export const skill_cleric_01 = new Skill(
    `skill_cleric_01`,
    `Smite`,
    `Smite the enemy with orderic power dealing order damage equal to weapon's 1.2 times physical damage (+0.1 per level)  plus charisma and strength modifier. If target is undead, deal double damage.
    If the user is in the back row damage will redeuce by 50%.`,
    new SkillLearningRequirement({
        preRequireSkillID: [], 
        preRequireElements: [], 
        preRequireCharacterLevel: 1, 
        preRequireCharacterTrait: []
    }),
    new SkillEquipmentRequirement({
        weapon: ['sword', 'mace', 'tome'], 
    }),
    [
        new SkillActiveEffect(
            new TargetType(
                TargetPartyType.Enemy,
                TargetSelectionScope.Single,
                TargetConditionFilters.None,
                TargetSortingOptions.None,
                TargetTauntConsideration.NoTauntCount
            ),
            [
                new SkillActionObject({
                    type: SkillActionType.Negative,
                    subType: SkillActionSubType.DamageAndDebuff,
                    damageDiceBase: (level: number) => level >= 5 ? '2d6': "3d6",
                    damageType: (_: number) => DamageTypes.order,
                    damageModifierStat: (_: number) => [CharacterStatusEnum.charisma, CharacterStatusEnum.strength],
                    damageModifierBonus: (_: number) => 0,
                    hitBase: (_: number) => 0,
                    hitStat: (_: number) => [],
                    critBase: (_: number) => 0,
                    critStat: (_: number) => [],
                    applyEffect: (_: number) => [],
                    traitBasedModifier: (targetTraits: TraitEnum[], level: number) => { 
                        if (targetTraits.includes(TraitEnum.trait_undead)) {return 1.2} else {return 1} 
                    },
                    specialEffect(actor, target, skillLevel): SpecialEffectResult {
                        if (actor.actorBuffs.zealotsFury > 0) {
                            return {
                                damage: {
                                    type: DamageTypes.order,
                                    magnitude: 3
                                },
                                damageMultiplier: 1.3
                            }
                        }
                        return { };
                    },
                })
            ]

        )
    ],
    new SkillConsume({
        hp: [0,0,0,0,0], 
        mp: [0,0,0,0,0], 
        sp: [5,5,5,5,5], 
        elements: [new ElementConsume({
            element: FundamentalElementTypes.none, 
            amount: [2,2,2,2,2]
        })]
    }),
    new SkillProduce({
        elements: [new ElementProduce({
            element: FundamentalElementTypes.order, 
            amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
        })]
    }),
    Tier.common
)

// const skill_cleric_02 = new Skill(
//     `skill_cleric_02`,
//     `Heal`,
//     `Heal a party member with least HP percentage for some amount plus charisma modifier.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = selfParty.getRandomTargetWithLeastCurrentHPNotTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
            
//             const castMessage = `(actor=${actor.name}) cast (skill=heals) on (target=${target.name}).`;
//             const sequenceMessage = [];

//             let dices;
//             if (level < 3) {dices = 2}
//             if (level === 5) {dices = 3}
//             const healAmount = actor.heal({
//                 target: target,
//                 healingDice: `${dices}d4`,
//                 healingStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalHealing: level
//             });
    
//             const message = `(actor=${actor.name}) (skill=heals) (target=${target.name}) for (heal=${healAmount}) HP.`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 [],
//                 [target],
//                 [ActorSkillEffect.Life_Cast],
//                 [],
//                 [TargetSkillEffect.heal],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [5,5,7,7,10], 
//         sp: [0,0,0,0,0], 
//         elements: [
//             new ElementConsume({ 
//                 element: 'none', 
//                 amount: [2,2,2,2,2]
//             })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//                 element: 'order', 
//                 amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]
//             })
//         ]
//     }),
//     Tier.common
// )

// const skill_cleric_06 = new Skill(
//     `skill_cleric_06`,
//     `Orderic Blast`,
//     `Blast the enemy with order energy dealing 1.3 times weapon magical damage plus charisma modifier.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1 }
//         ], 
//         preRequireCharacterLevel: 3, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['magicWand', 'orb', 'staff', 'tome'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const weapon = const skill_cleric_06.equipmentNeeded.getWeapon(actor);
//             if (!weapon) throw new Error('Exceptional: No Weapon found');
            
//             const castMessage = `(actor=${actor.name}) using (skill=Orderic Blast) with (weapon=${weapon.name})`;
//             const sequenceMessage = [];
//             const targets = [];
            
//             const damageMultiplier = DamageMultiplierFromPosition.get({
//                 preferPosition: 'back',
//                 rightModifier: 1.3,
//                 wrongModifier: 0.65,
//                 actor
//             });
    
//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: weapon.weaponAttack.magicalDiceEnum,
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.order,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')]
//             });
//             targets.push(target);
//             sequenceMessage.push(`(actor=${actor.name}) attacked (target=${target.name}) ${attackResult.dHit? `dealing (damage=${attackResult.damage}) (elem_order) damage.`: `but Missed!`}`);
    
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Order_Cast],
//                 [TargetSkillEffect.Order_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [5,5,6,6,7], 
//         sp: [0,0,0,0,0], 
//         elements: [new ElementConsume({
//             element: 'order', 
//             amount: [1,1,1,1,1]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'fire', 
//             amountRange: [[0, 1],[0, 1],[1, 1],[1, 1],[1, 2]]
//         })]
//     }),
//     Tier.uncommon
// )

// const skill_cleric_03 = new Skill(
//     `skill_cleric_03`,
//     `Blessing`,
//     `Bless all party members for 1 turn, all blessed party members gain 1d4 to all rolls.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party): ActionDetails => {
//             const castMessage = `(actor=${actor.name}) (skill=blesses) all party members.`;
//             let sequenceMessage = [];
//             const targets = []
//             for (const target of selfParty.characters) {
//                 actor.inflictEffect({
//                     actor: actor,
//                     target: target,
//                     inflictEffect: K.buffsAndDebuffs.bless,
//                     effectDuration: 1
//                 });
//                 if (!target) continue;
//                 targets.push(target);
//                 const sequenceMessage_in = `(actor=${actor.name}) (skill=blesses) (target=${target.name}) for 1 turn.`;
//                 sequenceMessage.push(sequenceMessage_in);
//             }

    
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Order_Cast],
//                 [],
//                 [TargetSkillEffect.bless],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [7,6,5,4,3], 
//         sp: [0,0,0,0,0], 
//         elements: [new ElementConsume({
//             element: 'order', 
//             amount: [2,2,2,1,1]
//         })]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'water', 
//             amountRange: [[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]
//         })]
//     }),
//     Tier.uncommon
// )

// const skill_cleric_04 = new Skill(
//     `skill_cleric_04`,
//     `Holy Water`,
//     `Deals 1d3 damage to all enemies plus Charisma Modifier and has chance to inflict Awed for 2 turns. Awed target saving throws are -2`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 3, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const targets = [];
//             const castMessage = `(actor=${actor.name}) cast (skill=holy water) on all enemies.`;
//             const sequenceMessage = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with holy water, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '1d3',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.order,
//                     damageMultiplier: 1,
//                     damageStatModifier: [new CharacterStatusModifier('charisma')],
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage()
//                 });

//                 if (attackResult.dHit) {targets.push(target)}

//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) order damage.` : message += `but Missed!`;
    
//                 const effectHit = Math.random() < (0.5 - (level/10));

//                 if (effectHit) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.awed,
//                         effectDuration: 2,
//                         effectDC: 10
//                     });
//                     message += ` and inflicting Awed.`;
//                 } 

//                 sequenceMessage.push(message);
//             }
    
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Holy_Cast],
//                 [TargetSkillEffect.Holy_1, TargetSkillEffect.awed],
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
//         elements: [new ElementConsume({
//             element: 'water', 
//             amount: [2,2,2,2,2]
//         })]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//                 element: 'order', 
//                 amountRange: [[1, 2],[1, 2],[1, 2],[1, 2],[1, 2]]
//             }),
//             new ElementProduce({ 
//                 element: 'geo', 
//                 amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]
//             })
//         ]
//     }),
//     Tier.uncommon
// )

// const skill_cleric_05 = new Skill(
//     `skill_cleric_05`,
//     `Ball of Light`,
//     `Shoot a Ball of Light at the target, dealing 1d8 order damage at an enemy. If the target is in awed state, player may roll for 10DC if the roll is higher will attack again.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 3, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
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
    
//             const castMessage = `(actor=${actor.name}) cast (skill=ball of light) at (target=${target.name}).`;
//             const sequenceMessage = [];

//             let message = `(actor=${actor.name}) attack (target=${target.name}), `;
//             const firstAttack = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '1d8',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.order,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage()
//             });
//             firstAttack.dHit ? message += `dealing (damage=${firstAttack.damage}) order damage.` : message += `but Missed!`;
    
//             let secondAttackResult = null;
//             if (firstAttack.dHit && target.buffsAndDebuffs.awed > 0) {
//                 const roll = Dice.roll('1d20').sum + level;
//                 if (roll > 10) {
//                     message += ` since (target=${target.name}) is in Awed state, (actor=${actor.name}) attacks again, `;
//                     secondAttackResult = actor.attack({
//                         actor: actor,
//                         target: target,
//                         damageDice: '1d8',
//                         hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                         damageType: DamageTypes.order,
//                         damageMultiplier: 1,
//                         damageStatModifier: [new CharacterStatusModifier('charisma')]
//                     });
//                     secondAttackResult.dHit ? message += `dealing (damage=${secondAttackResult.damage}) order damage.` : message += `but Missed!`;
//                 }
//             }
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 [target],
//                 [],
//                 [ActorSkillEffect.Order_Cast],
//                 [TargetSkillEffect.Order_1],
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
//             new ElementConsume({ 
//                 element: 'order', 
//                 amount: [1,1,1,1,1]
//             }),
//             new ElementConsume({ 
//                 element: 'fire', 
//                 amount: [1,1,1,1,1] 
//             })
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'none', 
//             amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]
//         })]
//     }),
//     Tier.uncommon
// )

// const skill_cleric_07 = new Skill(
//     `skill_cleric_07`,
//     `Divine's Fury`,
//     `Deals 2d6 order damage to all enemies and has a 50% chance to inflict Awed for 2 turns.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 7, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();

//             const castMessage = `(actor=${actor.name}) cast (skill=Divine's Fury) on all enemies.`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with Divine's Fury, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '2d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.order,
//                     damageMultiplier: 1 + (level/20),
//                     damageStatModifier: [new CharacterStatusModifier('charisma')],
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage()
//                 });

//                 if (attackResult.dHit) {targets.push(target)}

//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) order damage.` : message += `but Missed!`;
    
//                 const effectHit = Math.random() < 0.5;
//                 if (effectHit) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.awed,
//                         effectDuration: 2,
//                         effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit()
//                     });
//                     message += ` and inflicting Awed.`;
//                 }

//                 sequenceMessage.push(message);
//             }
    
    
//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Order_Cast],
//                 [TargetSkillEffect.Order_3, TargetSkillEffect.awed],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [7,7,7,7,10,10,10], 
//         sp: [0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume({
//                 element: 'order', 
//                 amount: [2,2,2,2,2,2,2]
//             }),
//             new ElementConsume({
//                 element: 'fire', 
//                 amount: [2,2,2,2,2,2,2]
//             })
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'geo', 
//             amountRange: [[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]
//         })]
//     }),
//     Tier.rare
// )

// const skill_cleric_08 = new Skill(
//     `skill_cleric_08`,
//     `Divine Shield`,
//     `Create a Divine Shield for 3 turns, all damage taken will be reduced by 2 plus charisma modifier.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 5, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {

//             const castMessage = `(actor=${actor.name}) cast (skill=Divine Shield).`;
//             const sequenceMessage = [];
//             const targetsDetails = [];

//             actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: K.buffsAndDebuffs.divineShield,
//                 effectDuration: 3    
//             });

//             sequenceMessage.push(`(actor=${actor.name}) got (skill=Divine Shield) for 3 turns.`);
        
//             return new ActionDetails(
//                 actor,
//                 [],
//                 [actor],
//                 [ActorSkillEffect.Order_Cast],
//                 [],
//                 [TargetSkillEffect.divineShield],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [4,3,3,3,2,2,2], 
//         sp: [4,4,3,3,2,2,2], 
//         elements: [
//             new ElementConsume({element: 'order', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume({element: 'geo', amount: [1,1,1,1,1,1,1]})
//         ]
//     }),
//     new SkillProduce({ 
//         elements: [
//             new ElementProduce({
//                 element: 'water', 
//                 amountRange: [[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]
//             }),
//             new ElementProduce({
//                 element: 'order',
//                 amountRange: [[0,0],[0,0],[0,1],[0,1],[1,1],[1,1],[1,0]]
//             })
//         ]
//     }),
//     Tier.rare
// )

// const skill_cleric_09 = new Skill(
//     `skill_cleric_09`,
//     `Divine Intervention`,
//     `Revive a dead party member with 50% chance and heal for 20% hp.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 5 }
//         ], 
//         preRequireCharacterLevel: 0, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
    
// new SkillActiveEffect(
//     (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//         const target = selfParty.getOneDeadTarget(actor);
//         if (!target) {
//             console.log('No dead character in party.');
//             return new ActionDetails(actor, [], [], [], [], [], 'No dead character in party.');
//         }

//         const castMessage = `(actor=${actor.name}) cast (skill=Divine Intervention) on (target=${target.name}).`;
//         const sequenceMessage = [];

//         const penalty = actor.getArmorPentaltyForSpellCastingDamage();
//         const reviveChance = 4 + actor.getModifier('attributes', 'willpower') - penalty + (level-1);
//         const diceRoll = Dice.roll('1d20').sum;

//         let message;
//         let success = false;

//         if (diceRoll + reviveChance >= 15) {
//             target.isDead = false;
//             target.currentHP = Math.floor(target.maxHP() * (0.2 + (level/10))) - penalty;
//             message = `(actor=${actor.name}) cast (skill=Divine Intervention) to revive (target=${target.name}), restoring them to (heal=${target.currentHP}) HP.`;
//             success = true;
//             sequenceMessage.push(message);
//         } else {
//             message = `(actor=${actor.name}) cast (skill=Divine Intervention) on (target=${target.name}) but fails.`;
//             sequenceMessage.push(message);
//         }

//         return new ActionDetails(
//             actor,
//             [],
//             [target],
//             [ActorSkillEffect.Order_Cast],
//             [],
//             [TargetSkillEffect.heal],
//             castMessage,
//             sequenceMessage
//         );
//     }
// ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [0,0,0,0,0,0,0], 
//         sp: [3,3,3,3,3,3,3], 
//         elements: [
//             new ElementConsume({ element: 'order', amount: [3,3,3,3,3,3,3]}),
//             new ElementConsume({ element: 'air', amount: [2,2,2,2,2,2,2]}),
//         ]
//     }),
//     new SkillProduce({ 
//         elements: [
//             new ElementProduce({ element: 'geo', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]}),
//             new ElementProduce({ element: 'water', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]})
//         ]
//     })
//     ,
//     Tier.rare
// )

// const skill_cleric_10 = new Skill(
//     `skill_cleric_10`,
//     `Harmony`,
//     `Deals damge to enemy twice once with order and once with chaos, each attack deals 1d6 damage. If target is in awed status, the first attack will deal 2d6 damage. If target is in cursed status, the second attack will deal 2d6 damage.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 8, 
//         preRequireCharacterTrait: [TraitRepository.trait_enlightened]
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

//             const castMessage = `(actor=${actor.name}) cast (skill=Harmony) on (target=${target.name}).`;
//             const sequenceMessage = [];

//             let message = `(actor=${actor.name}) attack (target=${target.name}) with Harmony, `;
//             const firstAttack = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: target.buffsAndDebuffs.awed > 0 ? '2d6' : '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.order,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalDamage: level
//             });
//             firstAttack.dHit ? message += `dealing (damage=${firstAttack.damage}) order damage.` : message += `but Missed!`;

//             message += `(actor=${actor.name}) attack (target=${target.name}) again with Harmony, `;
//             const secondAttack = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: target.buffsAndDebuffs.cursed > 0 ? '2d6' : '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.chaos,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalDamage: level
//             });
//             secondAttack.dHit ? message += `dealing (damage=${secondAttack.damage}) chaos damage.` : firstAttack.dHit? `but Missed!` : message += `and Also Missed!`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 [target],
//                 [],
//                 [ActorSkillEffect.Order_Cast, ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Order_1, TargetSkillEffect.Chaos_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0], 
//         mp: [5,5,7,7,8,9,10], 
//         sp: [0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume({ element: 'order', amount: [2,2,2,2,2,2,2]}), 
//             new ElementConsume({ element: 'chaos', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume({ element: 'none', amount: [1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({ 
//         elements: [
//             new ElementProduce({ element: 'order', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]}), 
//             new ElementProduce({ element: 'chaos', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]})
//         ]
//     }),
//     Tier.epic
// )

// const skill_cleric_11 = new Skill(
//     `skill_cleric_11`,
//     `inspiration`,
//     `Give an inspriing speech to all party members, all party members get 
//     +2 bonus for all saving roll for 1 turn.`,
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
//             const targets = [];
//             const castMessage = `(actor=${actor.name}) give an (skill=inspiration) speech to all party members.`;
//             const sequenceMessage = [];

//             let effectDurationFromLevel = 1;
//             if (level < 3) {effectDurationFromLevel = 1}
//             if (level < 5) {effectDurationFromLevel = 2}
//             if (level === 5) {effectDurationFromLevel = 3}

//             for (const target of selfParty.characters) {
//                 if (target) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.inspiration,
//                         effectDuration: effectDurationFromLevel
//                     });
//                     targets.push(target);
//                     sequenceMessage.push(`(target=${target.name}) is feeling (skill=inspiring) and got inspired for ${effectDurationFromLevel} turns.`);
//                 }
//             }
        
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Order_Cast],
//                 [],
//                 [TargetSkillEffect.inspiration],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0], 
//         mp: [5,5,4,3,0], 
//         sp: [3,3,3,3,3], 
//         elements: [
//             new ElementConsume({ element: 'none', amount: [1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'order', amountRange: [[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]}),
//         ]
//     }),
//     Tier.uncommon
// )

// const skill_cleric_12 = new Skill(
//     'skill_cleric_12',
//     `Laoh's Blessing`,
//     `Heal all party members for 1d6 plus charisma modifier, and have a d6 chance to grant them bless status for 2 turn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 10}
//         ], 
//         preRequireCharacterLevel: 10, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const targets = [];
//             const castMessage = `(actor=${actor.name}) is asking for (skill=Laoh's Blessing) on all party members.`;
//             const sequenceMessage = [];
            
//             for (const target of selfParty.characters) {
//                 if (target) {
//                     const healAmount = actor.heal({
//                         target: target,
//                         healingDice: '1d6',
//                         healingStatModifier: [new CharacterStatusModifier('charisma')],
//                         penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                         additionalHealing: (level*2)
//                     });
//                     targets.push(target);
//                     let message = `(actor=${actor.name}) cast (skill=Laoh's Blessing) on (target=${target.name}), healing for (heal=${healAmount}) HP.`;

//                     const effectHit = Math.random() < 1 / 6;
//                     if (effectHit) {
//                         actor.inflictEffect({
//                             actor: actor,
//                             target: target,
//                             inflictEffect: K.buffsAndDebuffs.bless,
//                             effectDuration: 2
//                         });
//                         message += ` and granting them Bless status.`;
//                     }

//                     sequenceMessage.push(message);
//                 }
//             }
        
//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Order_Cast],
//                 [],
//                 [TargetSkillEffect.bless],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0], 
//         mp: [10,10,9,9,8,8,7,7,6,6], 
//         sp: [0,0,0,0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume({ element: 'order', amount: [4,4,4,4,4,4,4,4,4,4]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]}),
//             new ElementProduce({ element: 'geo', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]}),
//             new ElementProduce({ element: 'water', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]})
//         ]
//     }),
//     Tier.legendary
// )

// const skill_cleric_13 = new Skill(
//     `skill_cleric_13`,
//     `Judgement of Laoh`,
//     `Deals 3d6 order damage to all enemies, and have a 50% chance to inflict awed for 2 turns.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 10, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const targets = [];
//             const castMessage = `(actor=${actor.name}) chant for (skill=Judgement of Laoh) on all enemies.`;
//             const sequenceMessage = [];
    
//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with Judgement of Laoh, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '3d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.order,
//                     damageMultiplier: 1,
//                     damageStatModifier: [new CharacterStatusModifier('charisma')],
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: level*2
//                 });
//                 attackResult.dHit ? targets.push(target) : null;
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) order damage.` : message += `but Missed!`;
    
//                 const effectHit = Math.random() < 0.5;
//                 if (effectHit) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.awed,
//                         effectDuration: 2,
//                         effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit() + level/2
//                     });
//                     message += ` and inflicting Awed.`;
//                 }

//                 sequenceMessage.push(message);
//             }
    

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Order_Cast],
//                 [TargetSkillEffect.Order_3, TargetSkillEffect.awed],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0], 
//         mp: [15,15,15,15,15,10,10,10,10,10], 
//         sp: [0,0,0,0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume({ element: 'order', amount: [3,3,3,3,3,3,3,3,3,3]}),
//             new ElementConsume({ element: 'fire', amount: [2,2,2,2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'chaos', 
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.legendary
// )

// //Holy nova
// const skill_cleric_14 = new Skill(
//     `skill_cleric_14`,
//     `Holy Nova`,
//     `Deals 2d6 order damage to all enemies and heals all party members for 2d6 plus charisma modifier.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ], 
//         preRequireCharacterLevel: 10, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const targets: Character[] = [];
//             const positiveTargets: Character[] = [];
//             const castMessage = `(actor=${actor.name}) cast (skill=Holy Nova) on all enemies.`;
//             const sequenceMessage = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with Holy Nova, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '2d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.order,
//                     damageMultiplier: 1,
//                     damageStatModifier: [new CharacterStatusModifier('charisma')],
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: level/2
//                 });
//                 attackResult.dHit ? targets.push(target) : null;
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) order damage.` : message += `but Missed!`;
    
//                 const effectHit = Math.random() < 1 / 6;
//                 if (effectHit) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.awed,
//                         effectDuration: 2,
//                         effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit()
//                     });
//                     message += ` and inflicting Awed.`;
//                 }
    
//                 sequenceMessage.push(message);
//             }
    
//             for (const target of selfParty.characters) {
//                 if (target) {
//                     if (target.isDead) {continue}
//                     let healAmount = actor.heal({
//                         target: target,
//                         healingDice: '2d6',
//                         healingStatModifier: [new CharacterStatusModifier('charisma')],
//                         penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                         additionalHealing: level/2
//                     });
//                     positiveTargets.push(target);
//                     sequenceMessage.push(`(actor=${actor.name}) heal (target=${target.name}) for (heal=${healAmount}) HP.`)
//                 }
//             }


//             return new ActionDetails(
//                 actor,
//                 targets,
//                 positiveTargets,
//                 [ActorSkillEffect.Holy_Cast],
//                 [TargetSkillEffect.Holy_2, TargetSkillEffect.awed],
//                 [TargetSkillEffect.heal],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0], 
//         mp: [10,10,12,12,14,14,16,16,18,18], 
//         sp: [0,0,0,0,0,0,0,0,0,0], 
//         elements: [
//             new ElementConsume({ element: 'order', amount: [4,4,4,4,4,4,4,4,4,4]}),
//             new ElementConsume({ element: 'fire', amount: [2,2,2,2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'chaos', 
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.legendary
// )


// const skill_cleric_15 = new Skill(
//     'skill_cleric_15',
//     `Smite Infidel`,
//     `Deals 1.2 weapon damage as order damage to one enemy plus charisma modifier. If target's order element is less than half of the caster's order element, the damage will be doubled. If the user is in the back row damage will redeuce by 50%.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [], 
//         preRequireElements: [
//             { element: 'order', value: 5 }
//         ], 
//         preRequireCharacterLevel: 10, 
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['axe', 'blade', 'mace', 'sword', 'tome'], 
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const castMessage = `(actor=${actor.name}) use (skill=smite) on (target=${target.name}).`;
//             const sequenceMessage = [];
    
//             let damageMultiplier = 1.2 + (level / 10);

//             if (target.element('order') < actor.element('order') / 2) {
//                 damageMultiplier = 2 + (level / 10);
//             }

//             if (actor.position > 2) {
//                 damageMultiplier = (damageMultiplier + (level/10)) / 2 
//             }

//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.order,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage()
//             });

//             attackResult.dHit ? sequenceMessage.push(`(actor=${actor.name}) attack (target=${target.name}) with the power of order, dealing (damage=${attackResult.damage}) order damage.`) : sequenceMessage.push(`(actor=${actor.name}) attack (target=${target.name}) with the power of order, but Missed!`);
        
//             return new ActionDetails(
//                 actor,
//                 [target],
//                 [],
//                 [ActorSkillEffect.Holy_Cast],
//                 [TargetSkillEffect.Holy_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0], 
//         mp: [3,3,3,3,3,3,3,3,3,3], 
//         sp: [3,3,3,3,3,3,3,3,3,3], 
//         elements: [
//             new ElementConsume({ element: 'order', amount: [3,3,3,3,3,3,3,3,3,3]}),
//         ]
//     }),
//     new SkillProduce({

//         elements: [
//             new ElementProduce({ 
//                 element: 'fire', 
//                 amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//             })
//         ]
//     }),
//     Tier.unique
// )