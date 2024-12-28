import { RelationEnum } from "../../../Common/DTOsEnumsInterfaces/Character/RelationEnums";
import { RaceEnum } from "../../../Common/RequestResponse/characterCreation";
import { CharacterType } from "../../Entities/Character/Subclasses/CharacterType";

export type CharacterDB = {
	id: string;
	partyID: string | "none";
	name: string;
	type: CharacterType;
	gender: "MALE" | "FEMALE" | "NONE";
	portrait: any; // Serialized form, likely a URL or base64 string
	background: string;
	race: RaceEnum;
	alignment: {
		good: number;
		evil: number;
		law: number;
		chaos: number;
	};
	mood: number;
	energy: number;
	fame: number;
	level: number;
	gold: number;
	exp: number;
	isDead: boolean;
	lastTarget: string | null;
	raceHP: number;
	raceMP: number;
	raceSP: number;
	baseHP: number;
	baseMP: number;
	baseSP: number;
	bonusHP: number;
	bonusMP: number;
	bonusSP: number;
	currentHP: number;
	currentMP: number;
	currentSP: number;
	status: CharacterStatusDB; // Nested type placeholder
	equipments: CharacterEquipmentDB; // Serialized or nested
	internals: { internal: string; level: number; exp: number }[]; //user id instead of the whole internal object
	activeInternal: { internal: string; level: number; exp: number } | null;
	traits: string[]; // List of trait ids
	skills: { skill: string; level: number; exp: number }[]; //use id instead of the whole skill object
	activeSkills: { skill: string; level: number; exp: number }[];
	position: number;
	itemsBag: ItemBagDB; // used id match with qunatity
	baseAC: number;
	location: string;
	isSummoned: boolean;
	arcaneAptitude: number;
	bagSize: number;
	storyFlags: StoryFlagsDB; // Flags for story progression
	relation: { [key: string]: { value: number; status: RelationEnum } }; // Relationship map
};

export type CharacterStatusDB = {
    attributes: {
        charisma: { base: number; bonus: number; battle: number; exp: number };
        luck: { base: number; bonus: number; battle: number; exp: number };
        intelligence: { base: number; bonus: number; battle: number; exp: number };
		leadership: { base: number; bonus: number; battle: number; exp: number };
		vitality: { base: number; bonus: number; battle: number; exp: number };
		willpower: { base: number; bonus: number; battle: number; exp: number };
		breath: { base: number; bonus: number; battle: number; exp: number };
		planar: { base: number; bonus: number; battle: number; exp: number };
		dexterity: { base: number; bonus: number; battle: number; exp: number };
		agility: { base: number; bonus: number; battle: number; exp: number };
		strength: { base: number; bonus: number; battle: number; exp: number };
		endurance: { base: number; bonus: number; battle: number; exp: number };
    };

    proficiencies: {
		bareHand: { base: number; bonus: number; battle: number; exp: number };
		sword: { base: number; bonus: number; battle: number; exp: number };
		blade: { base: number; bonus: number; battle: number; exp: number };
        dagger: { base: number; bonus: number; battle: number; exp: number };
		spear: { base: number; bonus: number; battle: number; exp: number };
		axe: { base: number; bonus: number; battle: number; exp: number };
        mace: { base: number; bonus: number; battle: number; exp: number };
        shield: { base: number; bonus: number; battle: number; exp: number };
		bow: { base: number; bonus: number; battle: number; exp: number };
		magicWand: { base: number; bonus: number; battle: number; exp: number };
		staff: { base: number; bonus: number; battle: number; exp: number };
		tome: { base: number; bonus: number; battle: number; exp: number };
		orb: { base: number; bonus: number; battle: number; exp: number };
	};
 
	battlers: {
		pATK: { base: number; bonus: number; battle: number; exp: number };
		pHIT: { base: number; bonus: number; battle: number; exp: number };
		pCRT: { base: number; bonus: number; battle: number; exp: number };
		pDEF: { base: number; bonus: number; battle: number; exp: number };
        mATK: { base: number; bonus: number; battle: number; exp: number };
		mHIT: { base: number; bonus: number; battle: number; exp: number };
		mCRT: { base: number; bonus: number; battle: number; exp: number };
		mDEF: { base: number; bonus: number; battle: number; exp: number };
        chiWarmATK: { base: number; bonus: number; battle: number; exp: number };
        chiColdATK: { base: number; bonus: number; battle: number; exp: number };
        chiWarmDEF: { base: number; bonus: number; battle: number; exp: number };
        chiColdDEF: { base: number; bonus: number; battle: number; exp: number };
        slash: { base: number; bonus: number; battle: number; exp: number };
        pierce: { base: number; bonus: number; battle: number; exp: number };
        blunt: { base: number; bonus: number; battle: number; exp: number };        
        slashDEF: { base: number; bonus: number; battle: number; exp: number };
        pierceDEF: { base: number; bonus: number; battle: number; exp: number };
        bluntDEF: { base: number; bonus: number; battle: number; exp: number };
		dodge: { base: number; bonus: number; battle: number; exp: number };
        orderATK: { base: number; bonus: number; battle: number; exp: number };
        chaosATK: { base: number; bonus: number; battle: number; exp: number };
        geoATK: { base: number; bonus: number; battle: number; exp: number };
        waterATK: { base: number; bonus: number; battle: number; exp: number };
        airATK: { base: number; bonus: number; battle: number; exp: number };
        fireATK: { base: number; bonus: number; battle: number; exp: number };
        orderDEF: { base: number; bonus: number; battle: number; exp: number };
        chaosDEF: { base: number; bonus: number; battle: number; exp: number };
        geoDEF: { base: number; bonus: number; battle: number; exp: number };
        waterDEF: { base: number; bonus: number; battle: number; exp: number };
        airDEF: { base: number; bonus: number; battle: number; exp: number };
        fireDEF: { base: number; bonus: number; battle: number; exp: number };
	};

	elements: {
		order: { base: number; bonus: number; battle: number; exp: number };
		chaos: { base: number; bonus: number; battle: number; exp: number };
		geo: { base: number; bonus: number; battle: number; exp: number };
		water: { base: number; bonus: number; battle: number; exp: number };
		air: { base: number; bonus: number; battle: number; exp: number };
		fire: { base: number; bonus: number; battle: number; exp: number };
	};

    artisans: {
        mining: { base: number; bonus: number; battle: number; exp: number };
        smithing: { base: number; bonus: number; battle: number; exp: number };
        woodcutting: { base: number; bonus: number; battle: number; exp: number };
        carpentry: { base: number; bonus: number; battle: number; exp: number };
        foraging: { base: number; bonus: number; battle: number; exp: number };
        weaving: { base: number; bonus: number; battle: number; exp: number };
        skinning: { base: number; bonus: number; battle: number; exp: number };
        tanning: { base: number; bonus: number; battle: number; exp: number };
        jewelry: { base: number; bonus: number; battle: number; exp: number };
        cooking: { base: number; bonus: number; battle: number; exp: number };
        alchemy: { base: number; bonus: number; battle: number; exp: number };
        enchanting: { base: number; bonus: number; battle: number; exp: number };
    };
};

export type CharacterEquipmentDB = {
    mainHand: string | null;
    offHand: string | null;
    armor: string | null;
    cloth: string | null;
    headWear: string | null;
    necklace: string | null;
    ring: string | null;
};

export type CharacterActiveInternalBonusDB = {
    attributes: {
        charisma: number;
        luck: number;
        intelligence: number;
        leadership: number;
        vitality: number;
        willpower: number;
        breath: number;
        planar: number;
        dexterity: number;
        agility: number;
        strength: number;
        endurance: number;
    };
    proficiencies: {
        bareHand: number;
        sword: number;
        blade: number;
        spear: number;
        axe: number;
        bow: number;
        dagger: number;
        magicWand: number;
        staff: number;
        tome: number;
        orb: number;
        mace: number;
    };
    battlers: {
        pATK: number;
        pHIT: number;
        pDEF: number;
        pCRT: number;
        mATK: number;
        mHIT: number;
        mDEF: number;
        mCRT: number;
        dodge: number;
    };
    elements: {
        order: number;
        chaos: number;
        geo: number;
        water: number;
        air: number;
        fire: number;
    };
};

export type InternalBuffs = {
    lectioDivina_01: boolean;
    lectioDivina_02: boolean;
    lectioDivina_03: boolean;
    aquaVitae_01: boolean;
    aquaVitae_02: boolean;
    aquaVitae_03: boolean;
    aeromancy_01: boolean;
    aeromancy_02: boolean;
    aeromancy_03: boolean;
    eldritchHexBreathingTechnique_01: boolean;
    eldritchHexBreathingTechnique_02: boolean;
    eldritchHexBreathingTechnique_03: boolean;
    pyromancy_01: boolean;
    pyromancy_02: boolean;
    pyromancy_03: boolean;
    geomancy_01: boolean;
    geomancy_02: boolean;
    geomancy_03: boolean;
    innerFire_01: boolean;
    innerFire_02: boolean;
    innerFire_03: boolean
}

export type ItemBagDB = {
    [key: string]: number;
};

export type StoryFlagsDB = {
    finishedStartingEvent: boolean;
};