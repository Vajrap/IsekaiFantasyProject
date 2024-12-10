// import { AccessoryRepository } from "../../../../classes/Items/Equipments/Accessory/AccessoryRepository";
// import { ArmorRepository } from "../../../../classes/Items/Equipments/Armor/ArmorRepository";
// import { WeaponRepository } from "../../../../classes/Items/Equipments/Weapon/WeaponRepository";
// import { SkillRepository } from "../../../../classes/Skills/SkillRepository";
// import { CharacterAlignment } from "../CharacterAlignment";
// import { CharacterArchetype } from "../CharacterArchetype";
// import { CharacterType } from "../CharacterType";

// export const archetype_rogue = new CharacterArchetype({
//     type: new CharacterType('Humanoid'),
//     level: 1,
//     attributes: {
//         charisma: 8,
//         luck: 10,
//         breath: 6,
//         planar: 8,
//         dexterity: 12,
//         agility: 12,
//         intelligence: 10,
//         leadership: 8,
//         strength: 8,
//         endurance: 8,
//         vitality: 8,
//         willpower: 6
//     },
//     proficiencies: {
//         bareHand: 8,
//         sword: 10,
//         shield: 8,
//         spear: 6,
//         staff: 6,
//         mace: 8,
//         tome: 6,
//         magicWand: 6,
//         orb: 6,
//         bow: 12,
//         dagger: 12,
//         blade: 10,
//         axe: 8,
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
//         dodge: 0   
//     },
//     elements: {
//         order: 0,
//         chaos: 0,
//         geo: 0,
//         water: 0,
//         air: 0,
//         fire: 0
//     },
//     artisans: {},
//     alignment: [
//         new CharacterAlignment({
//             lawVsChaos: 30,
//             goodVsEvil: 30
//         })
//     ],
//     skillSet: [
//         [
//             // SkillRepository.skill_rogue_06 ,
//             // SkillRepository.skill_rogue_05, 
//             SkillRepository.skill_auto_air_physical.id
//         ],
//     ],
//     internalSet: [],
//     traitSet: [],
//     armorSet: [ArmorRepository.armor_leather_01],
//     accessorySet: [AccessoryRepository.accessory_jewelry_01],
//     mainHandSet: [WeaponRepository.dagger,],
//     offHandSet: [WeaponRepository.dagger,]
// });
