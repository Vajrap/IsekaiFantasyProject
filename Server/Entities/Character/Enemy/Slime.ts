import { CharacterType } from "../Enums/CharacterType";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { EnemyArchetype, Enemy } from "./Enemy";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ResourceNameEnum } from "../../Items/Resource/ResourceNameEnum";

// Base slime archetype with common traits and stats
const baseSlimeArchetype = {
	type: CharacterType.slime,
	gender: "NONE" as const,
	race: RaceEnum.SLIME,
	level: 1,
	alignment: { good: 0, evil: 0, law: -10, chaos: 10 }, // Slimes are chaotic but not inherently evil
	HPrange: { min: 10, max: 15 },
	MPrange: { min: 5, max: 10 },
	SPrange: { min: 8, max: 12 },
	attributeRange: {
		strength: { min: 6, max: 8 },
		dexterity: { min: 4, max: 6 },
		agility: { min: 4, max: 6 },
		vitality: { min: 8, max: 10 },
		endurance: { min: 8, max: 10 },
		intelligence: { min: 2, max: 4 },
		willpower: { min: 4, max: 6 },
		charisma: { min: 1, max: 3 },
		luck: { min: 4, max: 6 },
		leadership: { min: 1, max: 3 },
		breath: { min: 4, max: 6 },
		planar: { min: 2, max: 4 }
	},
	baseACRange: { min: 6, max: 8 },
	arcaneAptitudeRange: { min: 0, max: 2 },
	traits: [TraitEnum.trait_bodySize_small],
	dropList: [
		{ itemID: ResourceNameEnum.resource_slime_core, chance: 0.5 },
		{ itemID: ResourceNameEnum.resource_slime_jelly, chance: 0.8 }
	]
};

// Basic Slime - most common type
export class BasicSlimeArchetype extends EnemyArchetype {
	constructor() {
		super({
			name: MobCharacterEnum.slime_basic,
			type: baseSlimeArchetype.type,
			gender: baseSlimeArchetype.gender,
			level: baseSlimeArchetype.level,
			race: baseSlimeArchetype.race,
			alignment: baseSlimeArchetype.alignment,
			HPrange: baseSlimeArchetype.HPrange,
			MPrange: baseSlimeArchetype.MPrange,
			SPrange: baseSlimeArchetype.SPrange,
			attributeRange: baseSlimeArchetype.attributeRange,
			proficiencyRange: {
				bareHand: { min: 1, max: 3 }
			},
			equipments: {
				mainHand: null,
				offHand: null,
				armor: null,
				headWear: null,
				necklace: null,
				ring: null
			},
			baseACRange: baseSlimeArchetype.baseACRange,
			traits: [...baseSlimeArchetype.traits],
			dropList: baseSlimeArchetype.dropList,
			preferredPosition: 'front'
		});
	}
}

// Fire Slime - elemental variant with fire affinity
export class FireSlimeArchetype extends EnemyArchetype {
	constructor() {
		super({
			name: MobCharacterEnum.slime_fire,
			type: baseSlimeArchetype.type,
			gender: baseSlimeArchetype.gender,
			level: baseSlimeArchetype.level + 2,
			race: baseSlimeArchetype.race,
			alignment: baseSlimeArchetype.alignment,
			HPrange: { min: 12, max: 18 },
			MPrange: { min: 10, max: 15 },
			SPrange: baseSlimeArchetype.SPrange,
			attributeRange: {
				...baseSlimeArchetype.attributeRange,
				intelligence: { min: 6, max: 8 },
				willpower: { min: 6, max: 8 }
			},
			elementRange: {
				fire: { min: 4, max: 6 }
			},
			proficiencyRange: {
				bareHand: { min: 2, max: 4 }
			},
			equipments: {
				mainHand: null,
				offHand: null,
				armor: null,
				headWear: null,
				necklace: null,
				ring: null
			},
			baseACRange: baseSlimeArchetype.baseACRange,
			arcaneAptitudeRange: { min: 2, max: 4 },
			traits: [
				...baseSlimeArchetype.traits
			],
			dropList: [
				...baseSlimeArchetype.dropList,
				{ itemID: ResourceNameEnum.resource_fire_slime_essence, chance: 0.4 }
			],
			preferredPosition: 'front'
		});
	}
}

// Giant Slime - larger, tougher variant
export class GiantSlimeArchetype extends EnemyArchetype {
	constructor() {
		super({
			name: MobCharacterEnum.slime_giant,
			type: baseSlimeArchetype.type,
			gender: baseSlimeArchetype.gender,
			level: baseSlimeArchetype.level + 3,
			race: baseSlimeArchetype.race,
			alignment: baseSlimeArchetype.alignment,
			HPrange: { min: 25, max: 35 },
			MPrange: baseSlimeArchetype.MPrange,
			SPrange: { min: 15, max: 20 },
			attributeRange: {
				...baseSlimeArchetype.attributeRange,
				strength: { min: 10, max: 12 },
				vitality: { min: 12, max: 14 },
				endurance: { min: 12, max: 14 }
			},
			proficiencyRange: {
				bareHand: { min: 3, max: 5 }
			},
			battlerRange: {
				pATK: { min: 3, max: 5 },
				pDEF: { min: 3, max: 5 }
			},
			equipments: {
				mainHand: null,
				offHand: null,
				armor: null,
				headWear: null,
				necklace: null,
				ring: null
			},
			baseACRange: { min: 10, max: 12 },
			traits: [
				TraitEnum.trait_bodySize_large
			],
			dropList: [
				{ itemID: ResourceNameEnum.resource_slime_core, chance: 1.0 },
				{ itemID: ResourceNameEnum.resource_slime_jelly, chance: 1.0 },
				{ itemID: ResourceNameEnum.resource_giant_slime_core, chance: 0.3 }
			],
			preferredPosition: 'front'
		});
	}
}

const basicSlime = new BasicSlimeArchetype();
const fireSlime = new FireSlimeArchetype();
const giantSlime = new GiantSlimeArchetype();

export const slimeEnemyRepository = [
	basicSlime,
	fireSlime,
	giantSlime
];
