// import { CharacterArchetype } from "../Subclasses/CharacterArchetype";
// import { CharacterType } from "../Subclasses/CharacterType";
// import { CharacterAlignment } from "../Subclasses/CharacterAlignment";
// import { SkillRepository } from "../../Skills/SkillRepository";
// import { InternalRepository } from "../../Internal/Internal";

// //Green Slime is the weakest of the slimes, low level no special skills
// //Blue Slime is a bit stronger, can spit acid
// //Red Slime is more stronger, can spit fire and have magic resistance
// //Black Slime is the strongest, can spit poison and fire and have high physical and magic resistance

// const archetype_enemy_slime_green = new CharacterArchetype({
// 	type: new CharacterType("Ooze"),
// 	level: 1,
// 	attributes: {
// 		charisma: 1,
// 		luck: 1,
// 		breath: 1,
// 		planar: 10,
// 		dexterity: 7,
// 		agility: 5,
// 		intelligence: 5,
// 		leadership: 1,
// 		strength: 7,
// 		endurance: 8,
// 		vitality: 8,
// 		willpower: 5,
// 	},
// 	proficiencies: {
// 		bareHand: 8,
// 		sword: 6,
// 		spear: 6,
// 		staff: 6,
// 		mace: 6,
// 		tome: 6,
// 		magicWand: 6,
// 		orb: 6,
// 		bow: 6,
// 		dagger: 6,
// 		blade: 6,
// 		axe: 6,
// 		shield: 6,
// 	},
// 	battlers: {
// 		pATK: 0,
// 		pHIT: 0,
// 		pDEF: 0,
// 		pCRT: 0,
// 		mATK: 0,
// 		mHIT: 0,
// 		mDEF: 0,
// 		mCRT: 0,
// 		dodge: 0,
// 	},
// 	elements: {
// 		order: 0,
// 		chaos: 0,
// 		geo: 0,
// 		water: 0,
// 		air: 0,
// 		fire: 0,
// 	},
// 	artisans: {
// 		tailoring: 0,
// 		leatherWorking: 0,
// 		smithing: 0,
// 		woodWorking: 0,
// 		jewelCrafting: 0,
// 		alchemy: 0,
// 		cooking: 0,
// 		enchanting: 0,
// 	},
// 	alignment: [
// 		new CharacterAlignment({
// 			lawVsChaos: 30,
// 			goodVsEvil: 30,
// 		}),
// 	],
// 	skillSet: [[SkillRepository.skill_slime_01.id]],
// 	internalSet: [InternalRepository.internal_none_01],
// 	traitSet: [],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [],
// 	offHandSet: [],
// });

// const archetype_enemy_slime_blue = new CharacterArchetype({
// 	type: new CharacterType("Ooze"),
// 	level: 2,
// 	attributes: {
// 		charisma: 1,
// 		luck: 1,
// 		breath: 1,
// 		planar: 10,
// 		dexterity: 10,
// 		agility: 5,
// 		intelligence: 5,
// 		leadership: 1,
// 		strength: 10,
// 		endurance: 10,
// 		vitality: 10,
// 		willpower: 5,
// 	},
// 	proficiencies: {
// 		bareHand: 8,
// 		sword: 6,
// 		spear: 6,
// 		staff: 6,
// 		mace: 6,
// 		tome: 6,
// 		magicWand: 6,
// 		orb: 6,
// 		bow: 6,
// 		dagger: 6,
// 		blade: 6,
// 		axe: 6,
// 		shield: 6,
// 	},
// 	battlers: {
// 		pATK: 0,
// 		pHIT: 0,
// 		pDEF: 0,
// 		pCRT: 0,
// 		mATK: 0,
// 		mHIT: 0,
// 		mDEF: 0,
// 		mCRT: 0,
// 		dodge: 0,
// 	},
// 	elements: {
// 		order: 0,
// 		chaos: 0,
// 		geo: 0,
// 		water: 0,
// 		air: 0,
// 		fire: 0,
// 	},
// 	artisans: {
// 		tailoring: 0,
// 		leatherWorking: 0,
// 		smithing: 0,
// 		woodWorking: 0,
// 		jewelCrafting: 0,
// 		alchemy: 0,
// 		cooking: 0,
// 		enchanting: 0,
// 	},
// 	alignment: [
// 		new CharacterAlignment({
// 			lawVsChaos: 30,
// 			goodVsEvil: 30,
// 		}),
// 	],
// 	skillSet: [[SkillRepository.skill_slime_02, SkillRepository.skill_slime_01]],
// 	internalSet: [InternalRepository.internal_none_01],
// 	traitSet: [],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [],
// 	offHandSet: [],
// });

// const archetype_enemy_slime_red = new CharacterArchetype({
// 	type: new CharacterType("Ooze"),
// 	level: 3,
// 	attributes: {
// 		charisma: 1,
// 		luck: 1,
// 		breath: 1,
// 		planar: 10,
// 		dexterity: 12,
// 		agility: 5,
// 		intelligence: 5,
// 		leadership: 1,
// 		strength: 12,
// 		endurance: 12,
// 		vitality: 12,
// 		willpower: 5,
// 	},
// 	proficiencies: {
// 		bareHand: 8,
// 		sword: 6,
// 		spear: 6,
// 		staff: 6,
// 		mace: 6,
// 		tome: 6,
// 		magicWand: 6,
// 		orb: 6,
// 		bow: 6,
// 		dagger: 6,
// 		blade: 6,
// 		axe: 6,
// 		shield: 6,
// 	},
// 	battlers: {
// 		pATK: 0,
// 		pHIT: 0,
// 		pDEF: 0,
// 		pCRT: 0,
// 		mATK: 0,
// 		mHIT: 0,
// 		mDEF: 4,
// 		mCRT: 0,
// 		dodge: 0,
// 	},
// 	elements: {
// 		order: 0,
// 		chaos: 0,
// 		geo: 0,
// 		water: 0,
// 		air: 0,
// 		fire: 0,
// 	},
// 	artisans: {
// 		tailoring: 0,
// 		leatherWorking: 0,
// 		smithing: 0,
// 		woodWorking: 0,
// 		jewelCrafting: 0,
// 		alchemy: 0,
// 		cooking: 0,
// 		enchanting: 0,
// 	},
// 	alignment: [
// 		new CharacterAlignment({
// 			lawVsChaos: 30,
// 			goodVsEvil: 30,
// 		}),
// 	],
// 	skillSet: [
// 		[
// 			SkillRepository.skill_slime_03,
// 			SkillRepository.skill_slime_02,
// 			SkillRepository.skill_slime_01,
// 		],
// 	],
// 	internalSet: [InternalRepository.internal_none_01],
// 	traitSet: [],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [],
// 	offHandSet: [],
// });

// const archetype_enemy_slime_black = new CharacterArchetype({
// 	type: new CharacterType("Ooze"),
// 	level: 4,
// 	attributes: {
// 		charisma: 1,
// 		luck: 1,
// 		breath: 1,
// 		planar: 10,
// 		dexterity: 14,
// 		agility: 5,
// 		intelligence: 5,
// 		leadership: 1,
// 		strength: 14,
// 		endurance: 14,
// 		vitality: 14,
// 		willpower: 5,
// 	},
// 	proficiencies: {
// 		bareHand: 8,
// 		sword: 6,
// 		spear: 6,
// 		staff: 6,
// 		mace: 6,
// 		tome: 6,
// 		magicWand: 6,
// 		orb: 6,
// 		bow: 6,
// 		dagger: 6,
// 		blade: 6,
// 		axe: 6,
// 		shield: 6,
// 	},
// 	battlers: {
// 		pATK: 0,
// 		pHIT: 0,
// 		pDEF: 4,
// 		pCRT: 0,
// 		mATK: 0,
// 		mHIT: 0,
// 		mDEF: 4,
// 		mCRT: 0,
// 		dodge: 0,
// 	},
// 	elements: {
// 		order: 0,
// 		chaos: 0,
// 		geo: 0,
// 		water: 0,
// 		air: 0,
// 		fire: 0,
// 	},
// 	artisans: {
// 		tailoring: 0,
// 		leatherWorking: 0,
// 		smithing: 0,
// 		woodWorking: 0,
// 		jewelCrafting: 0,
// 		alchemy: 0,
// 		cooking: 0,
// 		enchanting: 0,
// 	},
// 	alignment: [
// 		new CharacterAlignment({
// 			lawVsChaos: 30,
// 			goodVsEvil: 30,
// 		}),
// 	],
// 	skillSet: [
// 		[
// 			SkillRepository.skill_slime_04,
// 			SkillRepository.skill_slime_03,
// 			SkillRepository.skill_slime_02,
// 			SkillRepository.skill_slime_01,
// 		],
// 	],
// 	internalSet: [InternalRepository.internal_none_01],
// 	traitSet: [],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [],
// 	offHandSet: [],
// });

// export {
// 	archetype_enemy_slime_green,
// 	archetype_enemy_slime_blue,
// 	archetype_enemy_slime_red,
// 	archetype_enemy_slime_black,
// };
