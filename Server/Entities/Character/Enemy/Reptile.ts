import { CharacterType } from "../Enums/CharacterType";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { EnemyArchetype } from "./Enemy";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ResourceNameEnum } from "../../Items/Resource/ResourceNameEnum";

// Base reptile archetype with common traits and stats
const baseReptileArchetype = {
	type: CharacterType.beast,
	gender: "NONE" as const,
	race: RaceEnum.BEAST,
	alignment: { good: 0, evil: 5, law: 0, chaos: 5 }, // Reptiles are somewhat chaotic and slightly evil
	baseACRange: { min: 8, max: 10 },
	arcaneAptitudeRange: { min: 0, max: 1 },
	traits: [TraitEnum.trait_coldblooded]
};

// Basic Snake - poisonous reptile
export class BasicSnakeArchetype extends EnemyArchetype {
	constructor() {
		super({
			name: MobCharacterEnum.snake_basic,
			type: baseReptileArchetype.type,
			gender: baseReptileArchetype.gender,
			level: 2,
			race: baseReptileArchetype.race,
			alignment: baseReptileArchetype.alignment,
			HPrange: { min: 8, max: 12 },
			MPrange: { min: 0, max: 5 },
			SPrange: { min: 10, max: 15 },
			attributeRange: {
				strength: { min: 6, max: 8 },
				dexterity: { min: 12, max: 14 },
				agility: { min: 12, max: 14 },
				vitality: { min: 6, max: 8 },
				endurance: { min: 6, max: 8 },
				intelligence: { min: 2, max: 4 },
				willpower: { min: 4, max: 6 },
				charisma: { min: 1, max: 3 },
				luck: { min: 4, max: 6 },
				leadership: { min: 1, max: 2 },
				breath: { min: 3, max: 5 },
				planar: { min: 0, max: 2 }
			},
			proficiencyRange: {
				bareHand: { min: 2, max: 4 }
			},
			battlerRange: {
				initiative: { min: 5, max: 7 },
				pATK: { min: 3, max: 5 },
				mATK: { min: 0, max: 1 },
				pDEF: { min: 2, max: 4 },
				mDEF: { min: 1, max: 3 },
				dodge: { min: 4, max: 6 },
				hit: { min: 4, max: 6 }
			},
			equipments: {
				mainHand: null,
				offHand: null,
				armor: null,
				headWear: null,
				necklace: null,
				ring: null
			},
			baseACRange: baseReptileArchetype.baseACRange,
			arcaneAptitudeRange: baseReptileArchetype.arcaneAptitudeRange,
			traits: [
				...baseReptileArchetype.traits,
				TraitEnum.trait_venomous
			],
			dropList: [
				{ itemID: ResourceNameEnum.resource_snake_skin, chance: 0.7 },
				{ itemID: ResourceNameEnum.resource_snake_fang, chance: 0.5 },
				{ itemID: ResourceNameEnum.resource_venom_sac, chance: 0.3 }
			],
			activeSkills: [
				{ skillID: "skill_venom_bite", level: 1 }
			],
			preferredPosition: 'front'
		});
	}
	
	create() {
		return this.createEnemy('A venomous snake with sharp fangs and quick reflexes.', 'snake_basic.png');
	}
}

// Giant Constrictor Snake - larger, stronger snake variant
export class GiantSnakeArchetype extends EnemyArchetype {
	constructor() {
		super({
			name: MobCharacterEnum.snake_giant,
			type: baseReptileArchetype.type,
			gender: baseReptileArchetype.gender,
			level: 4,
			race: baseReptileArchetype.race,
			alignment: baseReptileArchetype.alignment,
			HPrange: { min: 18, max: 25 },
			MPrange: { min: 0, max: 5 },
			SPrange: { min: 15, max: 20 },
			attributeRange: {
				strength: { min: 14, max: 16 },
				dexterity: { min: 10, max: 12 },
				agility: { min: 8, max: 10 },
				vitality: { min: 10, max: 12 },
				endurance: { min: 10, max: 12 },
				intelligence: { min: 2, max: 4 },
				willpower: { min: 6, max: 8 },
				charisma: { min: 1, max: 3 },
				luck: { min: 4, max: 6 },
				leadership: { min: 1, max: 2 },
				breath: { min: 5, max: 7 },
				planar: { min: 0, max: 2 }
			},
			proficiencyRange: {
				bareHand: { min: 3, max: 5 }
			},
			battlerRange: {
				initiative: { min: 3, max: 5 },
				pATK: { min: 5, max: 7 },
				mATK: { min: 0, max: 1 },
				pDEF: { min: 4, max: 6 },
				mDEF: { min: 2, max: 4 },
				dodge: { min: 2, max: 4 },
				hit: { min: 4, max: 6 }
			},
			equipments: {
				mainHand: null,
				offHand: null,
				armor: null,
				headWear: null,
				necklace: null,
				ring: null
			},
			baseACRange: { min: 12, max: 14 },
			arcaneAptitudeRange: baseReptileArchetype.arcaneAptitudeRange,
			traits: [
				...baseReptileArchetype.traits,
				TraitEnum.trait_bodySize_large,
				TraitEnum.trait_constrictor
			],
			dropList: [
				{ itemID: ResourceNameEnum.resource_snake_skin, chance: 1.0 },
				{ itemID: ResourceNameEnum.resource_snake_fang, chance: 0.7 },
				{ itemID: ResourceNameEnum.resource_giant_snake_skin, chance: 0.5 }
			],
			activeSkills: [
				{ skillID: "skill_venom_bite", level: 2 },
				{ skillID: "skill_constrictive_coil", level: 1 }
			],
			preferredPosition: 'front'
		});
	}
	
	create() {
		return this.createEnemy('A massive constrictor snake capable of crushing prey with its powerful coils.', 'snake_giant.png');
	}
}

const basicSnake = new BasicSnakeArchetype();
const giantSnake = new GiantSnakeArchetype();

export const reptileEnemyRepository = [
	basicSnake,
	giantSnake
]; 