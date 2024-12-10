// import { AccessoryRepository } from "../../../Items/Equipments/Accessory/AccessoryRepository";
// import { ArmorRepository } from "../../../Items/Equipments/Armor/ArmorRepository";
// import { WeaponRepository } from "../../../Items/Equipments/Weapon/WeaponRepository";
// import { SkillRepository } from "../../../Skills/SkillRepository";
// import { CharacterAlignment } from "../../Subclasses/CharacterAlignment";
// import { CharacterArchetype } from "../../Subclasses/CharacterArchetype";
// import { CharacterType } from "../../Subclasses/CharacterType";
// import { NPC } from "../NPC";

// const karin_Farsee_archetype = new CharacterArchetype({
//     type: new CharacterType("Humanoid"),
//     level: 8,
//     attributes: {
//         charisma: 15,
//         luck: 10,
//         intelligence: 17,
//         leadership: 6,
//         vitality: 10, 
//         willpower: 10,
//         breath: 14,
//         planar: 14,
//         dexterity: 6,
//         agility: 7,
//         strength: 8,
//         endurance: 8
//     },
//     proficiencies: {
//         bareHand: 2,
//         sword: 2,
//         blade: 2,
//         spear: 2,
//         axe: 2,
//         bow: 3,
//         dagger: 5,
//         magicWand: 10,
//         staff: 5,
//         tome: 14,
//         orb: 7,
//         mace: 2
//     },
//     battlers: {

//     },
//     elements: {
//         fire: 4
//     },
//     artisans: {

//     },
//     alignment: [new CharacterAlignment({lawVsChaos: 30, goodVsEvil:50})],
//     skillSet: [
//         [
//             // SkillRepository.skill_mage_10, 
//             // SkillRepository.skill_mage_02, 
//             SkillRepository.skill_auto_fire_magical.id
//         ]
//     ],
// 	internalSet: [],
// 	traitSet: [],
//     armorSet: [
//         ArmorRepository.armor_cloth_01
//     ],
//     accessorySet: [
//         AccessoryRepository.accessory_magic_02
//     ],
//     mainHandSet: [
//         WeaponRepository.magicWand
//     ],
//     offHandSet: []
// })

// export const npc_karin = new NPC(
//     'Karin', 
//     'female', 
//     karin_Farsee_archetype,
//     'A powerful fire mage from remote village. Born with rare aptitute for fire magic, her raw potential and fire power rivals that of the high mages in the academy. But because of her low status, she was never given the chance to enter the academy. She is now on a journey to prove her worth and to find her place in the world.'
// )
