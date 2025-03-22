import { CharacterType } from "../Enums/CharacterType";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { Enemy } from "./Enemy";


export class SkeletonEnemyArchetype {
    name: MobCharacterEnum = MobCharacterEnum.skeleton_archer;
    type: CharacterType = CharacterType.undead;
    description: string = "A reanimated skeleton, hostile and mindless.";
    portrait: string = "skeleton_portrait.png";
    race: RaceEnum = RaceEnum.UNDEAD;

    create(): Enemy {
        return new Enemy(
            this.name,
            "NONE",
            this.description,
            this.portrait,
            0,
            0,
            []
        );
    }
}

const skeletonArcher = new SkeletonEnemyArchetype();

export class SkeletonEnemyFighter {
    name: MobCharacterEnum = MobCharacterEnum.skeleton_fighter;
    type: CharacterType = CharacterType.undead;
    description: string = "A reanimated skeleton, hostile and mindless.";
    portrait: string = "skeleton_portrait.png";
    race: RaceEnum = RaceEnum.UNDEAD;

    create(): Enemy {
        return new Enemy(
            this.name,
            "NONE",
            this.description,
            this.portrait,
            0,
            0,
            []
        )
    }
}

const skeletonFighter = new SkeletonEnemyFighter();

export const skeletonEnemyRepository = [
    skeletonArcher,
    skeletonFighter,
]

// const archetype_enemy_skeleton_knight = new CharacterArchetype({
// 	type: new CharacterType("Undead"),
// 	level: 5,
// 	attributes: {
// 		charisma: 1,
// 		luck: 1,
// 		breath: 1,
// 		planar: 12,
// 		dexterity: 14,
// 		agility: 8,
// 		intelligence: 10,
// 		leadership: 1,
// 		strength: 18,
// 		endurance: 18,
// 		vitality: 18,
// 		willpower: 12,
// 	},
// 	proficiencies: {
// 		bareHand: 8,
// 		sword: 18,
// 		spear: 12,
// 		staff: 12,
// 		mace: 6,
// 		tome: 6,
// 		magicWand: 6,
// 		orb: 6,
// 		bow: 6,
// 		dagger: 6,
// 		blade: 6,
// 		axe: 12,
// 		shield: 18,
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
// 	skillSet: [
// 		[
// 			// SkillRepository.skill_fighter_02,
// 			// SkillRepository.skill_fighter_03,
// 			// SkillRepository.skill_fighter_10,
// 			SkillRepository.skill_auto_physical.id,
// 		],
// 	],
// 	internalSet: [InternalRepository.internal_none_01.id],
// 	traitSet: [TraitRepository.trait_skeleton.id],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [WeaponRepository.sword],
// 	offHandSet: [WeaponRepository.shield],
// });

// const archetype_enemy_skeleton_cleric = new CharacterArchetype({
// 	type: new CharacterType("Undead"),
// 	level: 4,
// 	attributes: {
// 		charisma: 7,
// 		luck: 7,
// 		breath: 8,
// 		planar: 10,
// 		dexterity: 14,
// 		agility: 10,
// 		intelligence: 10,
// 		leadership: 7,
// 		strength: 10,
// 		endurance: 12,
// 		vitality: 10,
// 		willpower: 14,
// 	},
// 	proficiencies: {
// 		bareHand: 6,
// 		sword: 6,
// 		spear: 6,
// 		staff: 6,
// 		mace: 12,
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
// 	skillSet: [
// 		[
// 			// SkillRepository.skill_cleric_07,
// 			// SkillRepository.skill_cleric_01,
// 			SkillRepository.skill_auto_order_physical.id,
// 		],
// 	],
// 	internalSet: [InternalRepository.internal_none_01.id],
// 	traitSet: [TraitRepository.trait_skeleton.id],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [WeaponRepository.mace],
// 	offHandSet: [WeaponRepository.shield],
// });

// const archetype_enemy_skeleton_thief = new CharacterArchetype({
// 	type: new CharacterType("Undead"),
// 	level: 4,
// 	attributes: {
// 		charisma: 6,
// 		luck: 6,
// 		breath: 6,
// 		planar: 10,
// 		dexterity: 14,
// 		agility: 14,
// 		intelligence: 8,
// 		leadership: 1,
// 		strength: 10,
// 		endurance: 12,
// 		vitality: 10,
// 		willpower: 10,
// 	},
// 	proficiencies: {
// 		bareHand: 6,
// 		sword: 6,
// 		spear: 6,
// 		staff: 6,
// 		mace: 6,
// 		tome: 6,
// 		magicWand: 6,
// 		orb: 6,
// 		bow: 6,
// 		dagger: 14,
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
// 	skillSet: [
// 		[
// 			// SkillRepository.skill_rogue_04,
// 			// SkillRepository.skill_rogue_01,
// 			SkillRepository.skill_auto_physical.id,
// 		],
// 	],
// 	internalSet: [InternalRepository.internal_none_01.id],
// 	traitSet: [TraitRepository.trait_skeleton.id],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [WeaponRepository.dagger],
// 	offHandSet: [WeaponRepository.dagger],
// });

// const archetype_enemy_skeleton_mage = new CharacterArchetype({
// 	type: new CharacterType("Undead"),
// 	level: 4,
// 	attributes: {
// 		charisma: 6,
// 		luck: 6,
// 		breath: 12,
// 		planar: 14,
// 		dexterity: 14,
// 		agility: 6,
// 		intelligence: 16,
// 		leadership: 1,
// 		strength: 10,
// 		endurance: 12,
// 		vitality: 10,
// 		willpower: 10,
// 	},
// 	proficiencies: {
// 		bareHand: 6,
// 		sword: 6,
// 		spear: 6,
// 		staff: 12,
// 		mace: 6,
// 		tome: 12,
// 		magicWand: 12,
// 		orb: 12,
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
// 	skillSet: [
// 		[
// 			// SkillRepository.skill_mage_07,
// 			// SkillRepository.skill_mage_03,
// 			SkillRepository.skill_auto_water_magical.id,
// 		],
// 	],
// 	internalSet: [InternalRepository.internal_none_01.id],
// 	traitSet: [TraitRepository.trait_skeleton.id],
// 	armorSet: [],
// 	accessorySet: [],
// 	mainHandSet: [
// 		WeaponRepository.staff,
// 		WeaponRepository.orb,
// 		WeaponRepository.magicWand,
// 		WeaponRepository.tome,
// 	],
// 	offHandSet: [],
// });

// export {
// 	archetype_enemy_skeleton_fighter,
// 	archetype_enemy_skeleton_knight,
// 	archetype_enemy_skeleton_cleric,
// 	archetype_enemy_skeleton_thief,
// 	archetype_enemy_skeleton_mage,
// };
