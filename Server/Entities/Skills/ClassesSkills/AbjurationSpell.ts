// import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
// import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
// import { BuffsAndDebuffsEnum, TargetPartyType, TargetType } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
// import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
// import { NonAutoSpellNonWeapon } from "../Skill";
// import { SkillActionObject, SkillActionSubType, SkillActionType, SkillActiveEffect } from "../SubClasses/SkillActiveEffect";
// import { ElementConsume, ElementProduce, SkillConsume, SkillProduce } from "../SubClasses/SkillConsume";
// import { noEquipmentNeeded, noRequirementNeeded } from "../Utils";
// import { SkillApplyEffect } from "../SubClasses/SkillActiveEffect";
// import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
// import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";

// enum SkillNameEnum {
//     skill_aid = 'skill_aid',
//     skill_armor_of_frost = 'skill_armor_of_frost',
//     skill_shield = 'skill_shield',
// }

// const skill_aid = new NonAutoSpellNonWeapon({
//     id: SkillNameEnum.skill_aid,
//     name: 'รักษา',
//     baseDescription: 'รักษาความเจ็บปวด',
//     requirement: noRequirementNeeded,
//     equipmentNeeded: noEquipmentNeeded,
//     activeEffect: [
//         new SkillActiveEffect (
//             new TargetType(TargetPartyType.Ally),
//             [
//                 new SkillActionObject({
//                     type: SkillActionType.Positive,
//                     subType: SkillActionSubType.Heal,
//                     damageDiceBase: [DiceEnum.OneD2, DiceEnum.OneD2, DiceEnum.OneD2, DiceEnum.OneD2, DiceEnum.OneD4],
//                     damageType: [DamageTypes.nature],
//                     damageModifierStat: [],
//                     damageModifierBonus: [5, 5, 5, 5, 7],
//                     hitBase: [],
//                     hitStat: [],
//                     critBase: [],
//                     critStat: [],
//                     applyEffect: [],
//                 })
//             ]
//         ),
//     ],
//     consume: new SkillConsume({
//         mp: [3,3,3,3,5],
//         elements: [
//             new ElementConsume({element: FundamentalElementTypes.water, amount: [1,1,1,1,1]}),
//         ],
//     }),
//     produce: new SkillProduce({
//         elements: [
//             new ElementProduce({element: FundamentalElementTypes.none, amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1]]}),
//         ],
//     }),
//     tier: Tier.common
// })

// const skill_armor_of_frost = new NonAutoSpellNonWeapon({
//     id: SkillNameEnum.skill_armor_of_frost,
//     name: 'เกราะน้ำแข็ง',
//     baseDescription: 'เกราะน้ำแข็ง',
//     requirement: noRequirementNeeded,
//     equipmentNeeded: noEquipmentNeeded,
//     activeEffect: [
//         new SkillActiveEffect (
//             new TargetType(TargetPartyType.Self),
//             [
//                 new SkillActionObject({
//                     type: SkillActionType.Positive,
//                     subType: SkillActionSubType.Buff,
//                     damageDiceBase: [],
//                     damageType: [],
//                     damageModifierStat: [],
//                     damageModifierBonus: [],
//                     hitBase: [],
//                     hitStat: [],
//                     critBase: [],
//                     critStat: [],
//                     applyEffect: [
//                         [new SkillApplyEffect({
//                             applyWithoutHit: [true],
//                             effectName: [BuffsAndDebuffsEnum.frost_shield],
//                             effectHitBase: [],
//                             effectHitBonus: [],
//                             effectDuration: [3, 3, 3, 3, 4, 4, 5],
//                             effectDurationBonus: [],
//                             effectStatForResistance: CharacterStatusEnum.none,
//                         })]
//                     ],        
//                 })
//             ]
//         ),
//     ],
//     consume: new SkillConsume({
//         mp: [5,5,5,5,7,7,10],
//         elements: [
//             new ElementConsume({element: FundamentalElementTypes.water, amount: [1,1,1,1,1,1,1]}),
//             new ElementConsume({element: FundamentalElementTypes.order, amount: [1,1,1,1,1,1,1]}),
//         ],
//     }),
//     produce: new SkillProduce({
//         elements: [
//             new ElementProduce({element: FundamentalElementTypes.none, amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]}),
//         ],
//     }),
//     tier: Tier.uncommon
// })

// export { 
//     skill_aid,
//     skill_armor_of_frost,
// }
