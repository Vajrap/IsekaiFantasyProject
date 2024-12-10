// import { InternalRepository } from "../../../Internal/Internal";
// import { SkillRepository } from "../../../Skills/SkillRepository";
// import { CharacterAlignment } from "../../../../Entities/Character/Subclasses/CharacterAlignment";
// import { CharacterArchetype } from "../../../../Entities/Character/Subclasses/CharacterArchetype";
// import { CharacterType } from "../../../../Entities/Character/Subclasses/CharacterType";
// import { NPC } from "../NPC";

// const li_xueyue_archetype = new CharacterArchetype({
//     type: CharacterType.humanoid,
//     level: 20,
//     attributes: {
//         charisma: 28,
//         luck: 15,
//         intelligence: 23,
//         leadership: 8,
//         vitality: 16,
//         willpower: 16,
//         breath: 27,
//         planar: 17,
//         dexterity: 16,
//         agility: 19,
//         strength: 8,
//         endurance: 8 
//     },
//     proficiencies: {
//         bareHand: 2,
//         sword: 14,
//         blade: 2,
//         spear: 2,
//         axe: 2,
//         bow: 2,
//         dagger: 2,
//         magicWand: 2,
//         staff: 2,
//         tome: 2,
//         orb: 2,
//         mace: 2
//     },
//     battlers: {},
//     elements: {water: 1, chaos: 1, order: 1},
//     artisans: {},
//     alignment: [new CharacterAlignment({lawVsChaos: 30, goodVsEvil:50})],
//     skillSet: [
//         [
//             // SkillRepository.skill_li_xueyue_02, 
//             // SkillRepository.skill_li_xueyue_03, 
//             // SkillRepository.skill_li_xueyue_04, 
//             // SkillRepository.skill_li_xueyue_01
//             SkillRepository.skill_auto_physical.id
//         ]
//     ],
//     internalSet: [InternalRepository.internal_water_01.id],
//     traitSet: [],
//     armorSet: [ArmorRepository.armor_cloth_01],
//     accessorySet: [AccessoryRepository.accessory_jewelry_01],
//     mainHandSet: [WeaponRepository.sword],
//     offHandSet: []
// });

// export const npc_li_xueyue = new NPC(
//     "Li Xueyue",
//     'female',
//     li_xueyue_archetype,
//     'Daughter of Li Tianming, her mother died when she was still a baby, grown up with the survival sect member of Heaven\'s Decree and Her father\'s care, trained in swordmanship and her father\'s ice internal energy. Her father\'s always talk about revenge and push her to be stronger, she is a cold and quiet. She is a master of the Ice Sword Technique and the Ice Internal Energy.',
// );