// import { SkillRepository } from "../../../Skills/SkillRepository";
// import { CharacterAlignment } from "../../../../Entities/Character/Subclasses/CharacterAlignment";
// import { CharacterArchetype } from "../../../../Entities/Character/Subclasses/CharacterArchetype";
// import { CharacterType } from "../../../../Entities/Character/Subclasses/CharacterType";
// import { NPC } from "../NPC";

// const satoshi_ikeda_archetype = new CharacterArchetype({
//     type: new CharacterType("Humanoid"),
//     level: 8,
//     attributes: {
//         charisma: 10,
//         luck: 14,
//         intelligence: 10,
//         leadership: 12,
//         vitality: 14, 
//         willpower: 12,
//         breath: 10,
//         planar: 10,
//         dexterity: 17,
//         agility: 14,
//         strength: 14,
//         endurance: 12
//     },
//     proficiencies: {
//         bareHand: 7,
//         sword: 5,
//         blade: 16,
//         spear: 5,
//         axe: 2,
//         bow: 5,
//         dagger: 5,
//         magicWand: 2,
//         staff: 2,
//         tome: 1,
//         orb: 1,
//         mace: 2
//     },
//     battlers: {

//     },
//     elements: {

//     },
//     artisans: {

//     },
//     alignment: [new CharacterAlignment({lawVsChaos: 55, goodVsEvil: 55})],
//     skillSet: [
//         // [SkillRepository.skill_fighter_10, SkillRepository.skill_fighter_08, SkillRepository.skill_auto_physical]
//         [SkillRepository.skill_auto_air_physical.id]
//     ],
// 	internalSet: [],
// 	traitSet: [],
//     armorSet: [
//         ArmorRepository.armor_cloth_01
//     ],
//     accessorySet: [
//         AccessoryRepository.accessory_metal_02
//     ],
//     mainHandSet: [
//         new Weapon(WeaponRepository.blade)
//     ],
//     offHandSet: []
// })

// export const npc_satoshi = new NPC(
//     'Satoshi Ikeda', 
//     'male', 
//     satoshi_ikeda_archetype,
//     'A young warrior from western islands, from an esteem family of Ikeda learned in arts of blade. He travel to Aerolia, running from his family.',
//     'satoshi_ikeda',
// )
