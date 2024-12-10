// import { InternalRepository } from "../../../Internal/InternalsList";
// import { AccessoryRepository } from "../../../Items/Equipments/Accessory/AccessoryRepository";
// import { ArmorRepository } from "../../../Items/Equipments/Armor/ArmorRepository";
// import { WeaponRepository } from "../../../Items/Equipments/Weapon/WeaponRepository";
// import { SkillRepository } from "../../../Skills/SkillRepository";
// import { TraitRepository } from "../../../Traits/TraitRepository";
// import { CharacterAlignment } from "../CharacterAlignment";
// import { CharacterArchetype } from "../CharacterArchetype";
// import { CharacterType } from "../CharacterType";

// export const archetype_GM = new CharacterArchetype({
//     type: new CharacterType('Humanoid'),
//     level: 1,
//     attributes: {
//         charisma: 12,
//         luck: 12,
//         breath: 12,
//         planar: 12,
//         dexterity: 12,
//         agility: 12,
//         intelligence: 12,
//         leadership: 12,
//         strength: 12,
//         endurance: 12,
//         vitality: 12,
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
//         lawVsChaos: 30, 
//         goodVsEvil: 30
//     })],
//     skillSet: [
//         [
//             SkillRepository.skill_fighter_01,
//             SkillRepository.skill_fighter_02,
//             SkillRepository.skill_fighter_03,
//             SkillRepository.skill_fighter_04,
//             SkillRepository.skill_fighter_05,
//             SkillRepository.skill_fighter_06,
//             SkillRepository.skill_fighter_07,
//             SkillRepository.skill_fighter_08,
//             SkillRepository.skill_fighter_09,
//             SkillRepository.skill_fighter_10,
//             SkillRepository.skill_fighter_11,
//             SkillRepository.skill_fighter_12,
//             SkillRepository.skill_fighter_13,
//             SkillRepository.skill_fighter_14,
//             SkillRepository.skill_mage_01,
//             SkillRepository.skill_mage_02,
//             SkillRepository.skill_mage_03,
//             SkillRepository.skill_mage_04,
//             SkillRepository.skill_mage_05,
//             SkillRepository.skill_rogue_01,
//             SkillRepository.skill_rogue_02,
//             SkillRepository.skill_cleric_01,
//             SkillRepository.skill_cleric_02, 
//             SkillRepository.skill_cleric_03,
//             SkillRepository.skill_cleric_04,
//             SkillRepository.skill_cleric_05,
//             SkillRepository.skill_cleric_06,
//             SkillRepository.skill_cleric_07,
//             SkillRepository.skill_cleric_08, 
//             SkillRepository.skill_cleric_09,
//             SkillRepository.skill_cleric_10,
//             SkillRepository.skill_auto_order_magical
//         ],
//     ],
//     internalSet: [
//         InternalRepository.internal_order_01,
//         InternalRepository.internal_chaos_01,
//         InternalRepository.internal_geo_01,
//         InternalRepository.internal_water_01,
//         InternalRepository.internal_air_01,
//         InternalRepository.internal_fire_01
//     ],
//     traitSet: [
//         TraitRepository.trait_faithful,
//         TraitRepository.trait_agility_01,
//         TraitRepository.trait_charisma_01,
//         TraitRepository.trait_dexterity_01,
//         TraitRepository.trait_endurance_01,
//         TraitRepository.trait_intelligence_01,
//         TraitRepository.trait_luck_01,
//         TraitRepository.trait_strength_01,
//         TraitRepository.trait_vitality_01
//     ],
//     armorSet: [ArmorRepository.armor_cloth_01],
//     accessorySet: [AccessoryRepository.accessory_jewelry_01],
//     mainHandSet: [WeaponRepository.tome,],
//     offHandSet: []
// });

