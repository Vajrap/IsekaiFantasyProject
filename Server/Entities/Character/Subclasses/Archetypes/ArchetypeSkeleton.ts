// import { CharacterArchetype } from "../CharacterArchetype";
// import { Dice } from "../../../../classes/Utility/Dice";
// import { WeaponRepository } from "../../../../classes/Items/Equipments/Weapon/WeaponRepository";
// import { CharacterAlignment } from "../CharacterAlignment";
// import { SkillRepository } from "../../../../classes/Skills/SkillRepository";
// import { CharacterType } from "../CharacterType";

// export const skeletonArchetype = new CharacterArchetype ({
//     type: new CharacterType('Undead'),
//     level: 1,
//     attributes: {
//         charisma: Dice.roll('1d4').sum,
//         luck: Dice.roll('1d4').sum,
//         intelligence: Dice.roll('1d4').sum,
//         leadership: Dice.roll('1d4').sum,
//         vitality: Dice.roll('3d4').sum,
//         willpower: Dice.roll('1d4').sum,
//         breath: Dice.roll('1d4').sum,
//         planar: Dice.roll('1d4').sum,
//         dexterity: Dice.roll('4d4').sum,
//         agility: Dice.roll('1d4').sum,
//         strength: Dice.roll('4d4').sum,
//         endurance: Dice.roll('3d4').sum
//     },
//     proficiencies: {
//         bareHand: 8,
//         sword: 0,
//         blade: 0,
//         spear: 0,
//         axe: 0,
//         bow: 0,
//         dagger: 0,
//         magicWand: 0,
//         staff: 0,
//         tome: 0,
//         orb: 0,
//         mace: 0,
//         shield: 0
//     },
//     battlers: {
//         pATK: 0,
//         pHIT: 0,
//         pDEF: 0,
//         pCRT: 0,
//         mATK: 0,
//         mHIT: 0,
//         mDEF: 0,
//         mCRT: 0,
//         dodge: 12   
//     },
//     elements: {},
//     artisans: {},
//     alignment: [new CharacterAlignment({
//         lawVsChaos: 30,
//         goodVsEvil: 10
//     })],
//     skillSet: [[]],
//     internalSet: [],
//     traitSet: [],
//     armorSet: [],
//     accessorySet: [],
//     mainHandSet: [],
//     offHandSet: []
    
// })

// export const skeletonFighterArchetype = new CharacterArchetype ({
//     type: new CharacterType('Undead'),
//     level: 1,
//     attributes: {
//         charisma: Dice.roll('1d4').sum,
//         luck: Dice.roll('1d4').sum,
//         intelligence: Dice.roll('1d4').sum,
//         leadership: Dice.roll('1d4').sum,
//         vitality: Dice.roll('3d4').sum,
//         willpower: Dice.roll('1d4').sum,
//         breath: Dice.roll('1d4').sum,
//         planar: Dice.roll('1d4').sum,
//         dexterity: Dice.roll('4d4').sum,
//         agility: Dice.roll('1d4').sum,
//         strength: Dice.roll('4d4').sum,
//         endurance: Dice.roll('3d4').sum
//     },
//     proficiencies: { sword: 10 },
//     battlers: { dodge: 12 },
//     elements: { },
//     artisans: { },
//     alignment: [
//         new CharacterAlignment({
//             lawVsChaos: 30,
//             goodVsEvil: 10
//         })
//     ],
//     skillSet: [ 
//         // [SkillRepository.skill_fighter_02, SkillRepository.skill_fighter_05,],
//         // [SkillRepository.skill_fighter_06, SkillRepository.skill_fighter_03, SkillRepository.skill_fighter_01],
//         [SkillRepository.skill_auto_physical.id]
//     ],
//     internalSet: [],
//     traitSet: [],
//     armorSet: [],
//     accessorySet: [],
//     mainHandSet: [ WeaponRepository.sword, WeaponRepository.blade],
//     offHandSet: [ WeaponRepository.shield],
// })

// export const skeletonMageArchetype = new CharacterArchetype ({
//     type: new CharacterType('Undead'),
//     level: 1,
//     attributes: {
//         charisma: Dice.roll('1d4').sum,
//         luck: Dice.roll('1d4').sum,
//         intelligence: Dice.roll('4d4').sum,
//         leadership: Dice.roll('1d4').sum,
//         vitality: Dice.roll('3d4').sum,
//         willpower: Dice.roll('1d4').sum,
//         breath: Dice.roll('1d4').sum,
//         planar: Dice.roll('4d4').sum,
//         dexterity: Dice.roll('4d4').sum,
//         agility: Dice.roll('1d4').sum,
//         strength: Dice.roll('1d4').sum,
//         endurance: Dice.roll('3d4').sum
//     },
//     proficiencies: { magicWand: 10 , staff: 10 },
//     battlers: { dodge: 12 },
//     elements: { },
//     artisans: { },
//     alignment: [
//         new CharacterAlignment({
//             lawVsChaos: 30,
//             goodVsEvil: 10
//         })
//     ],
//     skillSet: [ 
//         // [SkillRepository.skill_mage_02, SkillRepository.skill_mage_03,],
//         // [SkillRepository.skill_mage_04, SkillRepository.skill_mage_05, SkillRepository.skill_mage_01],
//         [SkillRepository.skill_auto_fire_magical.id]
//     ],
//     internalSet: [],
//     traitSet: [],
//     armorSet: [],
//     accessorySet: [],
//     mainHandSet: [ WeaponRepository.magicWand, WeaponRepository.orb],
//     offHandSet: [ WeaponRepository.tome],
// })
