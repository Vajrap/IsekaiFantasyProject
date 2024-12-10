// import { AccessoryRepository } from "../../../../classes/Items/Equipments/Accessory/AccessoryRepository";
// import { ArmorRepository } from "../../../../classes/Items/Equipments/Armor/ArmorRepository";
// import { WeaponRepository } from "../../../../classes/Items/Equipments/Weapon/WeaponRepository";
// import { SkillRepository } from "../../../../classes/Skills/SkillRepository";
// import { CharacterAlignment } from "../CharacterAlignment";
// import { CharacterArchetype } from "../CharacterArchetype";
// import { CharacterType } from "../CharacterType";
// import { TraitRepository } from "../../../../classes/Traits/Trait";
// import { InternalRepository } from "../../../../classes/Internal/Internal";

// export const archetype_cleric = new CharacterArchetype({
//     type: new CharacterType('Humanoid'),
//     level: 1,
//     attributes: {
//         charisma: 6,
//         luck: 8,
//         breath: 10,
//         planar: 12,
//         dexterity: 8,
//         agility: 6,
//         intelligence: 8,
//         leadership: 8,
//         strength: 8,
//         endurance: 8,
//         vitality: 10,
//         willpower: 12
//     },
//     proficiencies: {
//         bareHand: 8,
//         sword: 6,
//         spear: 12,
//         staff: 12,
//         mace: 6,
//         tome: 6,
//         magicWand: 8,
//         orb: 8,
//         bow: 10,
//         dagger: 10,
//         blade: 6,
//         axe: 10,
//         shield: 6
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
//     artisans: {
//         tailoring: 0,
//         leatherWorking: 0,
//         smithing: 0,
//         woodWorking: 0,
//         jewelCrafting: 0,
//         alchemy: 0,
//         cooking: 0,
//         enchanting: 0
//     },
//     alignment: [new CharacterAlignment({
//         lawVsChaos: 50, 
//         goodVsEvil: 30
//     })],
//     skillSet: [
//         [
//             // SkillRepository.skill_cleric_05 ,
//             // SkillRepository.skill_cleric_02, 
//             SkillRepository.skill_auto_order_magical.id
//         ],
//     ],
//     internalSet: [InternalRepository.internal_order_01.id,],
//     traitSet: [TraitRepository.trait_faithful.id],
//     armorSet: [ArmorRepository.armor_cloth_01],
//     accessorySet: [AccessoryRepository.accessory_jewelry_01],
//     mainHandSet: [WeaponRepository.tome,],
//     offHandSet: []
// });

