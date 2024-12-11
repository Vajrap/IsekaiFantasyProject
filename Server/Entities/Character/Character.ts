import { CharacterStatus } from "./Subclasses/CharacterStatus";
import { CharacterActiveInternalBonus } from "./Subclasses/CharacterActiveInternalBonus";
// import { Internal, InternalRepository } from "../../Internal/Internal"
import { Internal, InternalRepository } from "../Internal/Internal";
import { CharacterResources } from "./Subclasses/CharacterResources";
import { CharacterEquipments } from "./Subclasses/CharacterEquipments";
import { StatMod } from "../../Utility/StatMod";
import { Dice } from "../../Utility/Dice";
import {
	EffectAppender,
	EffectResolver,
} from "../../Game/Battle/EffectResolverAndAppender/EffectAppenderAndResolver";
import { CharacterArchetype } from "./Subclasses/CharacterArchetype";
import { BuffsAndDebuffs } from "./Subclasses/BuffsAndDebuffs";
import { InternalBuffs } from "./Subclasses/InternalBuffs";
import { ItemBag } from "../Items/Items";
import { CharacterAlignment } from "./Subclasses/CharacterAlignment";
import { CharacterType } from "./Subclasses/CharacterType";
import { Trait, TraitRepository } from "../Traits/Trait";
import { TraitEnum } from "../Traits/TraitEnums";
import { ArmorDefense } from "../Items/Equipments/ArmorDefense";
import { SkillRepository } from "../Skills/SkillRepository";
import { CharacterArcaneAptitude } from "./Subclasses/CharacterArcaneAptitude";
import { v4 as uuidv4 } from "uuid";
import {
	SuccessResponse,
	ErrorResponse,
} from "../../API/WebSocket/ResponseType";
import {
	EffectAppenderSendObject,
	EffectResolverSendObject,
	EffectReturnObject,
} from "../../Game/Battle/EffectResolverAndAppender/EffectSend + Receive Objects";
import { CharacterStatusEnum } from "../../Utility/Enum/CharacterStatusTypes";
import {
	ArtisanMap,
	AttributeMap,
	BattlerMap,
	CoreElementMap,
	ProficiencyMap,
} from "./Subclasses/CharacterDataEnum";
import { DamageTypes } from "../../Utility/Enum/DamageTypes";
// import { InternalResponseType } from "../../../Common/ResponseTypes/Internal";
// import { SkillResponseType } from "../../../Common/ResponseTypes/Skill";
import { StoryFlags } from "../../Game/StoryEvent/StoryFlags";
import { getSkillFromDB, Skill } from "../Skills/Skill";
import { EquipmentType, WeaponType } from "../../Utility/Enum/EquipmentTypes";
import { db } from "../../Database";
import { GearInstance } from "../Items/GearInstance/GearInstance";
import {
	SkillActionObject,
	SkillApplyEffect,
	SkillActionType,
	SkillActionSubType,
	SpecialEffectResult,
} from "../Skills/SubClasses/SkillActiveEffect";
import { BuffsAndDebuffsEnum } from "../../Utility/Enum/TargetTypes";
import { CharacterBattleContext } from "./CharacterBattleContext";
import { DiceEnum } from "../../Utility/Enum/DamageDIce";
import { SkillConsume } from "../Skills/SubClasses/SkillConsume";
import { calculateBaseStat } from "./CalculateHPMPSP";
import { CharacterClass, class_cleric, class_fighter, class_guardian, class_hexbinder, class_mage, class_occultist, class_scout, class_skirmisher, class_soldier, class_spellblade, class_templar, class_warden } from "../../API/Routes/CreateCharacter/ClassEnum";
import { RaceEnum, ClassEnum, BackgroundEnum } from "../../../Common/RequestResponse/characterCreation";
import { dwarflingRace, dwarfRace, elvenRace, elvonRace, halfElvenRace, halflingRace, halfOrcRace, halfTritonRace, humanRace, orcRace, tritonRace } from "../../Database/Character/RacesStatus";
import { 
    raceDwarf, 
    raceDwarfling, 
    raceElven, 
    raceElvon, 
    raceHalfElf, 
    raceHalfOrc, 
    raceHalfTriton,
    raceHalfling, 
    raceHuman, 
    raceOrc, 
    raceTriton,
    classCleric,
    classFighter,
    classGuardian,
    classHexbinder,
    classMage,
    classOccultist,
    classScout,
    classSkirmisher,
    classSoldier,
    classSpellblade,
    classTemplar,
    classWarden,
    backgroundAbandonedFarmhand,
    backgroundApprenticeScribe,
    backgroundFallenNobility,
    backgroundFailedCraftsman,
    backgroundInnkeepersChild,
    backgroundDesertedMilitary,
    backgroundMageApprentice,
    backgroundMercsChild,
    backgroundStreetUrchin,
    backgroundTavernBrawler,
    backgroundTraineeInCaravan,
    backgroundWanderingMusician 
} from '../../../Common/Entity/raceClassBackground';

export class Character {
	id: string;
	partyID: string | "none" = "none";
	name: string;
	type: CharacterType | undefined = undefined;
	gender: "male" | "female" | "none" | undefined = undefined;
	portrait: any = null;
	background: string = '';
	race: RaceEnum;
	alignment: CharacterAlignment = new CharacterAlignment({
		good: 0,
		evil: 0,
		law: 0,
		chaos: 0,
	});
	mood: number = 100;
	energy: number = 100;
	fame: number = 0;
	level: number = 1;
	gold: number = 0;
	exp: number = 0;
	isDead: boolean = false;
	abGauge: number = 0;
	lastTarget: string | null;
	raceHP: number = 0;
	raceMP: number = 0;
	raceSP: number = 0;
	baseHP: number = 1;
	baseMP: number = 1;
	baseSP: number = 1;
	bonusHP: number = 0;
	bonusMP: number = 0;
	bonusSP: number = 0;
	currentHP: number = 1;
	currentMP: number = 1;
	currentSP: number = 1;
	status: CharacterStatus = new CharacterStatus();
	equipments: CharacterEquipments = new CharacterEquipments();
	internals: { internal: Internal; level: number; exp: number }[] = [];
	activeInternal: Internal | null = null;
	activeInternalBonus: CharacterActiveInternalBonus =
		new CharacterActiveInternalBonus();
	traits: Trait[] = [];
	skills: { skill: Skill; level: number; exp: number }[] = [];
	activeSkills: { skill: Skill; level: number; exp: number }[] = [];
	buffsAndDebuffs: BuffsAndDebuffs = new BuffsAndDebuffs();
	internalBuffs: InternalBuffs = new InternalBuffs();
	resources: CharacterResources = new CharacterResources();
	position: number = 0;
	itemsBag: ItemBag = new ItemBag();
	baseAC: number = 7;
	location: string = "none";
	isSummoned: boolean = false;
	arcaneAptitude: CharacterArcaneAptitude = new CharacterArcaneAptitude();
	bagSize: number = 20;
	constructor(
		id: string,
		name: string,
		gender?: "male" | "female" | "none",
		archetype?: CharacterArchetype,
		race?: RaceEnum,
	) {
		this.id = id;
		this.name = name;
		this.type = archetype?.type || undefined;
		this.gender = gender;
		this.race = race? race: RaceEnum.UNDEFINED;
		this.portrait = null;
		this.background = '';
		this.mood = 0;
		this.gold = 0;
		this.level = 1;
		this.exp = 0;
		this.isDead = false;
		this.abGauge = 0;
		this.lastTarget = null;
		this.baseHP = 1;
		this.baseMP = 1;
		this.baseSP = 1;
		this.bonusHP = 0;
		this.bonusMP = 0;
		this.bonusSP = 0;
		this.currentHP = 1;
		this.currentMP = 1;
		this.currentSP = 1;
		this.itemsBag = new ItemBag();
		this.status = new CharacterStatus();
		this.equipments = new CharacterEquipments();
		this.activeInternalBonus = new CharacterActiveInternalBonus();
		this.buffsAndDebuffs = new BuffsAndDebuffs();
		this.internalBuffs = new InternalBuffs();
		this.resources = {
			order: 0,
			chaos: 0,
			geo: 0,
			water: 0,
			air: 0,
			fire: 0,
			none: 0,
		};
		this.position = 0;

		if (archetype) {
			this.setCharacterFromArcheType(archetype);
		}
	}

	async setCharacterFromArcheType(archetype: CharacterArchetype) {
		this.type = archetype.type;
		this.level = archetype.level;
		this.portrait = archetype.portrait;
		this.race = archetype.race
		this.background = archetype.background;
		this.alignment.good = archetype.alignment.good;
		this.alignment.evil = archetype.alignment.evil;
		this.alignment.law = archetype.alignment.law;
		this.alignment.chaos = archetype.alignment.chaos;
		this.mood = archetype.mood;
		this.energy = archetype.energy;
		this.fame = archetype.fame;
		this.gold = archetype.gold;
		this.exp = archetype.exp;
		this.isDead = archetype.isDead;
		this.lastTarget = archetype.lastTarget;

		for (const key in archetype.attributes) {
			this.status.attributes[key as keyof CharacterStatus["attributes"]].base = 
				archetype.attributes[key as keyof CharacterStatus["attributes"]].base;
			this.status.attributes[key as keyof CharacterStatus["attributes"]].exp = 
				archetype.attributes[key as keyof CharacterStatus["attributes"]].exp;
		}

		for (const key in archetype.proficiencies) {
			this.status.proficiencies[key as keyof CharacterStatus["proficiencies"]].base = 
				archetype.proficiencies[ key as keyof CharacterStatus["proficiencies"]].base;
			this.status.proficiencies[key as keyof CharacterStatus["proficiencies"]].exp = 
				archetype.proficiencies[ key as keyof CharacterStatus["proficiencies"]].exp
		}

		for (const key in archetype.battlers) {
			this.status.battlers[key as keyof CharacterStatus["battlers"]].base = 
				archetype.battlers[key as keyof CharacterStatus["battlers"]].base;
			this.status.battlers[key as keyof CharacterStatus["battlers"]].exp = 
				archetype.battlers[key as keyof CharacterStatus["battlers"]].exp;
		}
		for (const key in archetype.elements) {
			this.status.elements[key as keyof CharacterStatus["elements"]].base =
				archetype.elements[key as keyof CharacterStatus["elements"]].base;
			this.status.elements[key as keyof CharacterStatus["elements"]].exp =
				archetype.elements[key as keyof CharacterStatus["elements"]].exp;
		}
		for (const key in archetype.artisans) {
			this.status.artisans[key as keyof CharacterStatus["artisans"]].base =
				archetype.artisans[key as keyof CharacterStatus["artisans"]].base;
			this.status.artisans[key as keyof CharacterStatus["artisans"]].exp =
				archetype.artisans[key as keyof CharacterStatus["artisans"]].exp;
		}
		//TODO: create get itemFromID method to fetch the item from database.
		this.equipments.constructFromDB(
			archetype.equipments.mainHand,
			archetype.equipments.offHand,
			archetype.equipments.armor,
			archetype.equipments.cloth,
			archetype.equipments.headWear,
			archetype.equipments.necklace,
			archetype.equipments.ring
		);

		if (archetype.internals.length > 0) {
			for (const internal of archetype.internals) {
				const internalObj = await db.getInternal(internal.internalID);
				this.internals.push({
					internal: internalObj,
					level: internal.level,
					exp: internal.exp,
				});
			}
		}

		if (archetype.activeInternal != null) {
			const internalObj = await db.getInternal(archetype.activeInternal);
			this.activeInternal = internalObj;
		}

		for (const trait in archetype.traits) {
			const traitObj =
				TraitRepository[
					archetype.traits[trait] as keyof typeof TraitRepository
				];
			this.gainTrait(traitObj);
		}

		if (archetype.skills.length > 0) {
			for (const skill of archetype.skills) {
				const skillObj = await db.getSkill(skill.skillID);
				this.skills.push({
					skill: skillObj,
					level: skill.level,
					exp: skill.exp,
				});
			}
		}

		if (archetype.activeSkills.length > 0) {
			for (const skill of archetype.activeSkills) {
				const skillObj = await db.getSkill(skill.skillID);
				this.activeSkills.push({
					skill: skillObj,
					level: skill.level,
					exp: skill.exp,
				});
			}
		}

		this.position = archetype.position ? archetype.position : 0;
		this.itemsBag.items = archetype.itemsBag;
		this.baseAC = archetype.baseAC;
		this.location = archetype.location;
		this.isSummoned = archetype.isSummoned;
		this.arcaneAptitude.aptitude = archetype.arcaneAptitude;
		this.setBodyValue();
		this.currentHP = archetype.currentHP ? archetype.currentHP : this.maxHP();
		this.currentMP = archetype.currentMP ? archetype.currentMP : this.maxMP();
		this.currentSP = archetype.currentSP ? archetype.currentSP : this.maxSP();
	}

	setBodyValue(): Character {
		this.setBaseHP().setBaseMP().setBaseSP();
		this.currentHP = this.maxHP();
		this.currentMP = this.maxMP();
		this.currentSP = this.maxSP();
		return this;
	}

	setBaseHP(): Character {
		this.baseHP = calculateBaseStat(this.attribute("vitality"));
		return this;
	}
	setBaseMP(): Character {
		this.baseMP = calculateBaseStat(this.attribute("planar"));
		return this;
	}
	setBaseSP(): Character {
		this.baseSP = calculateBaseStat(this.attribute("endurance"));
		return this;
	}

	maxHP(): number {
		return this.baseHP + this.bonusHP + this.raceHP;
	}
	hpPercentage(): number {
		return this.currentHP / this.maxHP();
	}
	maxMP(): number {
		return this.baseMP + this.bonusMP + this.raceMP;
	}
	mpPercentage(): number {
		return this.currentMP / this.maxMP();
	}
	maxSP(): number {
		return this.baseSP + this.bonusSP + this.raceSP;
	}
	spPercentage(): number {
		return this.currentSP / this.maxSP();
	}

	attribute(attribute: keyof CharacterStatus["attributes"]): number {
		return (
			this.status.attributes[attribute].base +
			this.status.attributes[attribute].bonus +
			this.status.attributes[attribute].battle
		);
	}

	proficiency(proficiency: keyof CharacterStatus["proficiencies"]): number {
		return (
			this.status.proficiencies[proficiency].base +
			this.status.proficiencies[proficiency].bonus +
			this.status.proficiencies[proficiency].battle
		);
	}

	battler(battler: keyof CharacterStatus["battlers"]): number {
		return (
			this.status.battlers[battler].base + 
			this.status.battlers[battler].bonus +
			this.status.battlers[battler].battle
		);
	}

	element(element: string): number {
		if (element === "physical") {
			return 0;
		}
		if (element === "ice") {
			return (this.element("order") + this.element("water")) / 2;
		}
		if (element === "spirit") {
			return (this.element("water") + this.element("air")) / 2;
		}
		if (element === "lightning") {
			return (this.element("air") + this.element("chaos")) / 2;
		}
		if (element === "demonic") {
			return (this.element("chaos") + this.element("fire")) / 2;
		}
		if (element === "metal") {
			return (this.element("fire") + this.element("geo")) / 2;
		}
		if (element === "angelic") {
			return (this.element("geo") + this.element("order")) / 2;
		}
		if (element === "nature") {
			return (this.element("geo") + this.element("water")) / 2;
		}
		if (element === "life") {
			return (this.element("order") + this.element("air")) / 2;
		}
		if (element === "dark") {
			return (this.element("water") + this.element("chaos")) / 2;
		}
		if (element === "necrotic") {
			return (this.element("air") + this.element("fire")) / 2;
		}
		if (element === "poison") {
			return (this.element("chaos") + this.element("geo")) / 2;
		}
		if (element === "holy") {
			return (this.element("fire") + this.element("order")) / 2;
		}
		if (element === "none") {
			return 0;
		}
		if (element === "arcane" || element === "magical") {
			return (
				(this.element("order") +
					this.element("chaos") +
					this.element("geo") +
					this.element("water") +
					this.element("air") +
					this.element("fire")) /
				6
			);
		}
		return (
			(
				this.status.elements[element as keyof CharacterStatus["elements"]].base +
				this.status.elements[element as keyof CharacterStatus["elements"]].bonus +
				this.status.elements[element as keyof CharacterStatus["elements"]].battle +
				this.activeInternalBonus.elements[element]
			) /
			2
		);
	}

	artisan(artisan: keyof CharacterStatus["artisans"]): number {
		return (
			this.status.artisans[artisan].base + 
			this.status.artisans[artisan].bonus + 
			this.status.artisans[artisan].battle
		);
	}

	getModifier(status: CharacterStatusEnum): number {
		let stat = 0;
		if (
			status === CharacterStatusEnum.charisma ||
			status === CharacterStatusEnum.luck ||
			status === CharacterStatusEnum.intelligence ||
			status === CharacterStatusEnum.leadership ||
			status === CharacterStatusEnum.vitality ||
			status === CharacterStatusEnum.willpower ||
			status === CharacterStatusEnum.breath ||
			status === CharacterStatusEnum.planar ||
			status === CharacterStatusEnum.dexterity ||
			status === CharacterStatusEnum.agility ||
			status === CharacterStatusEnum.strength ||
			status === CharacterStatusEnum.endurance
		) {
			stat = this.attribute(status);
		}

		if (
			status === CharacterStatusEnum.bareHand ||
			status === CharacterStatusEnum.sword ||
			status === CharacterStatusEnum.blade ||
			status === CharacterStatusEnum.dagger ||
			status === CharacterStatusEnum.spear ||
			status === CharacterStatusEnum.axe ||
			status === CharacterStatusEnum.mace ||
			status === CharacterStatusEnum.shield ||
			status === CharacterStatusEnum.bow ||
			status === CharacterStatusEnum.magicWand ||
			status === CharacterStatusEnum.staff ||
			status === CharacterStatusEnum.tome ||
			status === CharacterStatusEnum.orb
		) {
			stat = this.proficiency(status);
		}

		if (
			status === CharacterStatusEnum.pATK ||
			status === CharacterStatusEnum.pHIT ||
			status === CharacterStatusEnum.pCRT ||
			status === CharacterStatusEnum.pDEF ||
			status === CharacterStatusEnum.mATK ||
			status === CharacterStatusEnum.mHIT ||
			status === CharacterStatusEnum.mCRT ||
			status === CharacterStatusEnum.mDEF ||
			status === CharacterStatusEnum.chiWarmATK ||
			status === CharacterStatusEnum.chiColdATK ||
			status === CharacterStatusEnum.chiWarmDEF ||
			status === CharacterStatusEnum.chiColdDEF ||
			status === CharacterStatusEnum.slash ||
			status === CharacterStatusEnum.pierce ||
			status === CharacterStatusEnum.blunt ||
			status === CharacterStatusEnum.dodge
		) {
			stat = this.battler(status);
		}

		if (
			status === CharacterStatusEnum.order ||
			status === CharacterStatusEnum.chaos ||
			status === CharacterStatusEnum.geo ||
			status === CharacterStatusEnum.water ||
			status === CharacterStatusEnum.air ||
			status === CharacterStatusEnum.fire
		) {
			stat = this.element(status);
		}

		if (
			status === CharacterStatusEnum.mining ||
			status === CharacterStatusEnum.smithing ||
			status === CharacterStatusEnum.woodcutting ||
			status === CharacterStatusEnum.carpentry ||
			status === CharacterStatusEnum.foraging ||
			status === CharacterStatusEnum.weaving ||
			status === CharacterStatusEnum.skinning ||
			status === CharacterStatusEnum.tanning ||
			status === CharacterStatusEnum.jewelry ||
			status === CharacterStatusEnum.alchemy ||
			status === CharacterStatusEnum.cooking ||
			status === CharacterStatusEnum.enchanting
		) {
			stat = this.artisan(status);
		}

		let mod = StatMod.value(stat);

		if (this.buffsAndDebuffs.inspiration > 0) {
			mod += 2;
		}

		return mod;
	}

	//MARK: Add, remove
	/*given string for all, attributes, proficiencies, battlers, and even artisan + amount*/
	/*
	New status idea. Status should have
	- Base: Base value of the status, used in putting status up and down, training and leveling
	- Bonus: Bonus value, gained from equipments, traits: These are almost permanent and only be change with intention at least in coding.
	- BattleBonus: Bonus value, gained from buffs, debuffs, and other temporary effects. These will always be clear to 0 after battle.
	- Exp: Experience value, used in training and leveling the Base value.
	*/

	statUp(stat: string, amount: number): void {
		if (stat in this.status.attributes) {
			this.status.attributes[
				stat as keyof CharacterStatus["attributes"]
			].base += amount;
		} else if (stat in this.status.proficiencies) {
			this.status.proficiencies[
				stat as keyof CharacterStatus["proficiencies"]
			].base += amount;
		} else if (stat in this.status.battlers) {
			this.status.battlers[stat as keyof CharacterStatus["battlers"]].base +=
				amount;
		} else if (stat in this.status.elements) {
			this.status.elements[stat as keyof CharacterStatus["elements"]].base +=
				amount;
		} else {
			throw new Error(`Invalid stat type: ${stat}`);
		}
	}

	//MARK:: Character Methods
	hpUp(amount: number) {
		if (this.isDead === true) {
			return {
				actor: this,
				heal: amount,
				healHit: false,
			};
		}
		this.currentHP = Math.min(
			this.currentHP + amount || this.maxHP(),
			this.maxHP()
		);
		return {
			actor: this,
			heal: amount,
			healHit: true,
		};
	}

	hpDown(
		attacker: Character,
		damage: number,
		damageType: DamageTypes
	): {
		actor: Character;
		target: Character;
		damage: number;
		damageType: DamageTypes;
		dHit: boolean;
	} {
		if (this.isDead === true) {
			return {
				actor: attacker,
				target: this,
				damage: 0,
				damageType: damageType,
				dHit: false,
			};
		}
		damage = damage % 1 === 0.5 ? Math.ceil(damage) : Math.round(damage);
		if (this.currentHP < damage) {
			damage = this.currentHP;
		}
		this.currentHP = Math.max(this.currentHP - damage || 0, 0);
		this.checkIfHealthDepleated();
		return {
			actor: attacker,
			target: this,
			damage: damage,
			damageType: damageType,
			dHit: true,
		};
	}

	mpUp(amount: number): boolean {
		if (this.isDead === true) {
			return false;
		}
		this.currentMP = Math.min(
			this.currentMP + amount || this.maxMP(),
			this.maxMP()
		);
		return true;
	}

	mpDown(amount: number): boolean {
		if (this.isDead === true) {
			return false;
		}
		this.currentMP = Math.max(this.currentMP - amount || 0, 0);
		return true;
	}

	spUp(amount: number): boolean {
		if (this.isDead === true) {
			return false;
		}
		this.currentSP = Math.min(
			this.currentSP + amount || this.maxMP(),
			this.maxMP()
		);
		return true;
	}

	spDown(amount: number): boolean {
		if (this.isDead === true) {
			return false;
		}
		this.currentSP = Math.max(this.currentSP - amount || 0, 0);
		return true;
	}

	checkIfHealthDepleated(): boolean {
		if (this.currentHP <= 0) {
			this.currentHP = 0;
			this.isDead = true;
			return true;
		} else {
			return false;
		}
	}

	saveRoll(
		saveStat: CharacterStatusEnum | null
	): [diceRoll: number, baseModifier: number, buffModifier: number] {
		let diceRoll = Dice.roll(DiceEnum.OneD20).sum;

		console.log(`${this.name} rolls ${diceRoll} for saving throw`);

		let baseModifier = 0;

		if (saveStat) {
			baseModifier = this.getModifier(saveStat);
		}
		console.log(`${this.name} get +${baseModifier} from ${saveStat} modifier`);

		let buffModifier = 0;
		if (this.buffsAndDebuffs.inspiration > 0) {
			buffModifier += 2;
			console.log(`${this.name} get +2 from inspiration`);
		}
		if (this.buffsAndDebuffs.bless > 0) {
			let blessRoll = Dice.roll(DiceEnum.OneD4).sum;
			buffModifier += blessRoll;
			console.log(`${this.name} get +${blessRoll} from bless roll`);
		}
		if (this.buffsAndDebuffs.awed > 0) {
			buffModifier -= 2;
			console.log(`${this.name} get -2 from awed`);
		}

		return [diceRoll, baseModifier, buffModifier];
	}

	moodUp(value: number): void {
		this.mood = Math.min(this.mood + value, 100);
	}

	moodDown(value: number): void {
		this.mood = Math.max(this.mood - value, 0);
	}

	fameUp(value: number): void {
		this.fame += value;
	}

	fameDown(value: number): void {
		this.fame -= value;
	}

	energyUp(value: number): void {
		this.energy = Math.min(this.energy + value, 100);
	}

	energyDown(value: number): void {
		this.energy = Math.max(this.energy - value, 0);
	}

	updateAlignment(alignment: string, value: number): void {
		(this.alignment[alignment as keyof CharacterAlignment] as number) += value;
	}

	private getArmorPentaltyForSpellCastingDamage(): number {
		let spellDamageMultiPlier = this.equipments.armor?.spellCastingDamageMultiplier || 1;

		let armorClass = this.equipments.armor?.class;

		if (armorClass != undefined) {
			switch (armorClass) {
				case "light":
					if (this.traits.includes(
						TraitRepository.trait_hexbinder_01 || 
						TraitRepository.trait_hexbinder_02 || 
						TraitRepository.trait_hexbinder_03)) 
					{
						spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.2, 1);
					}
					if (this.traits.includes(
						TraitRepository.trait_spellblade_01 || 
						TraitRepository.trait_spellblade_02 || 
						TraitRepository.trait_spellblade_03)) 
					{
						spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.4, 1);
					}
					return spellDamageMultiPlier;
		
				case "medium":
					if (this.traits.includes(
						TraitRepository.trait_hexbinder_01 || 
						TraitRepository.trait_hexbinder_02 || 
						TraitRepository.trait_hexbinder_03)) 
					{
						spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.3, 1);
					}
					if (this.traits.includes(
						TraitRepository.trait_spellblade_01 || 
						TraitRepository.trait_spellblade_02 || 
						TraitRepository.trait_spellblade_03)) 
					{
						spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.3, 1);
					}
					return spellDamageMultiPlier;
		
				case "heavy":
					if (this.traits.includes(
						TraitRepository.trait_hexbinder_01 || 
						TraitRepository.trait_hexbinder_02 || 
						TraitRepository.trait_hexbinder_03)) 
					{
						spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.4, 1);
					}
					if (this.traits.includes(
						TraitRepository.trait_spellblade_01 || 
						TraitRepository.trait_spellblade_02 || 
						TraitRepository.trait_spellblade_03)) 
					{
						spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.2, 1);
					}
					return spellDamageMultiPlier;
				default:
					return spellDamageMultiPlier;
			}
		}
		return spellDamageMultiPlier;
	}

	getArmorPenaltyForSpellCastingHit(): number {
		let armorPenalty = this.equipments.armor?.spellCastingPenaltyHit || 0; // Default penalty from the armor
		let armorClass = this.equipments.armor?.class; // 'light', 'medium', or 'heavy'
	
		if (armorClass != undefined) {
			switch (armorClass) {
				case "light":
					if (this.traits.includes(TraitRepository.trait_hexbinder_01 || TraitRepository.trait_hexbinder_02 || TraitRepository.trait_hexbinder_03)) {
						armorPenalty = Math.max(armorPenalty + 1, 0); // Warlock improves light armor hit up to 0
					}
					if (this.traits.includes(TraitRepository.trait_spellblade_01 || TraitRepository.trait_spellblade_02 || TraitRepository.trait_spellblade_03)) {
						armorPenalty = Math.max(armorPenalty + 3, 0); // Swordmage boosts light armor hit further up to 0
					}
					break;
	
				case "medium":
					if (this.traits.includes(TraitRepository.trait_hexbinder_01 || TraitRepository.trait_hexbinder_02 || TraitRepository.trait_hexbinder_03)) {
						armorPenalty = Math.max(armorPenalty + 2, 0); // Warlock mitigates medium armor penalty to max 0
					}
					if (this.traits.includes(TraitRepository.trait_spellblade_01 || TraitRepository.trait_spellblade_02 || TraitRepository.trait_spellblade_03)) {
						armorPenalty = Math.max(armorPenalty + 2, 0); // Swordmage improves medium armor hit to max 0
					}
					break;
	
				case "heavy":
					if (this.traits.includes(TraitRepository.trait_hexbinder_01 || TraitRepository.trait_hexbinder_02 || TraitRepository.trait_hexbinder_03)) {
						armorPenalty = Math.max(armorPenalty + 3, 0); // Warlock mitigates heavy armor penalty to max 0
					}
					if (this.traits.includes(TraitRepository.trait_spellblade_01 || TraitRepository.trait_spellblade_02 || TraitRepository.trait_spellblade_03)) {
						armorPenalty = Math.max(armorPenalty + 1, 0); // Swordmage slightly mitigates heavy armor penalty
					}
					break;
	
				default:
					break;
			}
		}
		return armorPenalty;
	}

	private getCriticalModifiedDamage(damage: number): number {
		// This will be used for critical hit damage calculation, normally it will be 1.5 times the damage
		// But some triats or skills can modify this value, right now there's none
		let baseModifier = 1.5;

		// TODO: Placeholders for traits or skills that can modify this value

		return damage * baseModifier;
	}

	gainExp(exp: number): void {
		const levelUpExp = this.getLevelUpExp();
		if (this.level >= 20) {
			this.exp = levelUpExp; // Ensure exp is maxed at level 20
			return;
		}
	
		this.exp += exp;
	
		if (this.exp >= levelUpExp && this.level < 20) {
			this.levelUp();
		}
	
		if (this.level === 20) {
			this.exp = levelUpExp; // Ensure exp is maxed at level 20
		}
	}
	
	// Method to get the experience needed for the next level
	getLevelUpExp(): number {
		const baseExp = 100; // Starting XP for level 1 to 2
		const growthRate = 1.7; // Growth rate for exponential scaling
	
		return Math.round(baseExp * Math.pow(growthRate, this.level - 1));
	}

	levelUp(): Character {
		this.level += 1;
		this.exp = 0;
		let attributeRolls = Dice.roll(DiceEnum.TwelveD20).rolls;
		Object.keys(this.status.attributes).forEach((attribute, index) => {
			this.status.attributes[
				attribute as keyof CharacterStatus["attributes"]
			].base += attributeRolls[index] === 20 ? 1 : 0;
		});
		let proficiencyRolls = Dice.roll(DiceEnum.ThirteenD20).rolls;
		Object.keys(this.status.proficiencies).forEach((proficiency, index) => {
			this.status.proficiencies[
				proficiency as keyof CharacterStatus["proficiencies"]
			].base += proficiencyRolls[index] === 20 ? 1 : 0;
		});
		let artisanRolls = Dice.roll(DiceEnum.EightD20).rolls;
		Object.keys(this.status.artisans).forEach((artisan, index) => {
			this.status.artisans[
				artisan as keyof CharacterStatus["artisans"]
			].base += artisanRolls[index] === 20 ? 1 : 0;
		});
		this.setBodyValue();
		return this;
	}

	//MARK: INTERNAL
	//We start with methods that can be called from others
	// learnInternal(internalID: string): InternalResponseType {
	// 	const internal =
	// 		InternalRepository[internalID as keyof typeof InternalRepository];
	// 	if (!internal) {
	// 		throw new Error(`Internal with id:${internalID} not exist.`);
	// 	}
	// 	for (const learnedInternal of this.internals) {
	// 		if (learnedInternal.internal === internal) {
	// 			return InternalResponseType.SuccessAlreadyLearned;
	// 		}
	// 	}
	// 	if (!this.validateInternalLearning(internal)) {
	// 		return InternalResponseType.SuccessNotEligibleToLearn;
	// 	}
	// 	const newInternal = { internal: internal, level: 1, exp: 0 };
	// 	this.internals.push(newInternal);
	// 	this.applyInternalPassiveBonuses(internal, 1);
	// 	return InternalResponseType.SuccessLearning;
	// }

	validateInternalLearning(internal: Internal): boolean {
		if (internal.requirement) {
			if (
				internal.requirement.preRequireCharacterLevel &&
				this.level < internal.requirement.preRequireCharacterLevel
			) {
				return false;
			}
			if (internal.requirement.preRequireElements) {
				for (const element of internal.requirement.preRequireElements) {
					if (this.element(element.element) < element.value) {
						return false;
					}
				}
			}
		}
		return true;
	}

	// trainInternal(internalID: string, expGained: number): InternalResponseType {
	// 	const internal = this.internals.find((i) => i.internal.id === internalID);
	// 	if (!internal) {
	// 		throw new Error(
	// 			`Character ${this.id} didn't learned internal with id:${internalID}`
	// 		);
	// 	}
	// 	const internalObj =
	// 		InternalRepository[internalID as keyof typeof InternalRepository];
	// 	const expNeeded = internalObj.neededExp(internal.level);
	// 	internal.exp += expGained;
	// 	if (internal.exp >= expNeeded) {
	// 		this.levelUpInternal(internal);
	// 		return InternalResponseType.SuccessTrainingWithLevelUp;
	// 	}
	// 	return InternalResponseType.SuccessTrainingWithoutLevelUp;
	// }

	levelUpInternal(internal: {
		internal: Internal;
		level: number;
		exp: number;
	}) {
		const isActiveInternal = this.activeInternal === internal.internal;
		if (isActiveInternal) {
			this.removeActiveInternalBonus(internal.internal, internal.level);
		}
		internal.level++;
		internal.exp -= internal.internal.neededExp(internal.level - 1);
		this.applyInternalPassiveBonuses(internal.internal, internal.level);
		if (isActiveInternal) {
			this.applyInternalActiveBonus(internal.internal, internal.level);
		}
	}

	applyInternalPassiveBonuses(internal: Internal, level: number) {
		const bonuses = internal.passiveBonus[level - 1];
		if (level > 1)
			for (const bonus in bonuses.attributes) {
				this.status.attributes[bonus as keyof AttributeMap].bonus +=
					bonuses.attributes[bonus as keyof AttributeMap] ?? 0;
			}
		for (const bonus in bonuses.proficiencies) {
			this.status.proficiencies[bonus as keyof ProficiencyMap].bonus +=
				bonuses.proficiencies[bonus as keyof ProficiencyMap] ?? 0;
		}
		for (const bonus in bonuses.battlers) {
			this.status.battlers[bonus as keyof BattlerMap].bonus +=
				bonuses.battlers[bonus as keyof BattlerMap] ?? 0;
		}
		for (const bonus in bonuses.elements) {
			this.status.elements[bonus as keyof CoreElementMap].bonus +=
				bonuses.elements[bonus as keyof CoreElementMap] ?? 0;
		}
	}

	chooseActiveInternal(internalID: string) {
		const internal =
			InternalRepository[internalID as keyof typeof InternalRepository];
		if (!internal) {
			throw new Error(`Internal with id ${internalID} is not found.`);
		}
		if (this.activeInternal) {
			this.removeActiveInternalBonus(
				this.activeInternal,
				this.internals.find((i) => i.internal === this.activeInternal)?.level ||
					1
			);
		}

		let internalLearned = false;
		for (const learnedInternal of this.internals) {
			if (learnedInternal.internal === internal) {
				internalLearned = true;
				this.applyInternalActiveBonus(
					learnedInternal.internal,
					learnedInternal.level
				);
				this.activeInternal = learnedInternal.internal;
			}
		}

		if (!internalLearned) {
			throw new Error("Internal not learned, should not be able to call this");
		}
	}

	removeActiveInternal() {
		if (!this.activeInternal) {
			throw new Error("No active internal, shouldn't be able to call this");
		}
		this.removeActiveInternalBonus(
			this.activeInternal,
			this.internals.find((i) => i.internal === this.activeInternal)?.level || 1
		);
		this.activeInternal = null;
	}

	applyInternalActiveBonus(internal: Internal, level: number) {
		const activeBonus = internal.getInternalActiveTraits(level);
		for (const traitString of activeBonus) {
			const trait =
				TraitRepository[traitString as keyof typeof TraitRepository];
			this.gainTrait(trait);
		}
	}

	removeActiveInternalBonus(internal: Internal, level: number) {
		if (this.activeInternal != internal) {
			throw new Error(
				`Intermal with id ${internal.id} is not an active internal of ${this.id}`
			);
		}
		const activeBonus = internal.getInternalActiveTraits(level);
		for (const traitString of activeBonus) {
			const trait =
				TraitRepository[traitString as keyof typeof TraitRepository];
			this.removeTrait(trait);
		}
	}

	//MARK: TRAIT
	gainTrait(trait: Trait) {
		if (trait === undefined) {
			return;
		}
		if (this.traits.includes(trait)) {
			return this;
		}
		if (trait.passiveBonus?.artisans) {
			for (const bonus in trait.passiveBonus.artisans) {
				this.status.artisans[bonus as keyof ArtisanMap].bonus +=
					trait.passiveBonus.artisans[bonus as keyof ArtisanMap] ?? 0;
			}
		}
		if (trait.passiveBonus?.attributes) {
			for (const bonus in trait.passiveBonus.attributes) {
				this.status.attributes[bonus as keyof AttributeMap].bonus +=
					trait.passiveBonus.attributes[bonus as keyof AttributeMap] ?? 0;
			}
		}
		if (trait.passiveBonus?.proficiencies) {
			for (const bonus in trait.passiveBonus.proficiencies) {
				this.status.proficiencies[bonus as keyof ProficiencyMap].bonus +=
					trait.passiveBonus.proficiencies[bonus as keyof ProficiencyMap] ?? 0;
			}
		}
		if (trait.passiveBonus?.elements) {
			for (const bonus in trait.passiveBonus.elements) {
				this.status.elements[bonus as keyof CoreElementMap].bonus +=
					trait.passiveBonus.elements[bonus as keyof CoreElementMap] ?? 0;
			}
		}
		this.traits.push(trait);
		return this;
	}

	removeTrait(trait: Trait): Character {
		if (trait.passiveBonus?.artisans) {
			for (const bonus in trait.passiveBonus.artisans) {
				this.status.artisans[bonus as keyof ArtisanMap].bonus -=
					trait.passiveBonus.artisans[bonus as keyof ArtisanMap] ?? 0;
			}
		}
		if (trait.passiveBonus?.attributes) {
			for (const bonus in trait.passiveBonus.attributes) {
				this.status.attributes[bonus as keyof AttributeMap].bonus -=
					trait.passiveBonus.attributes[bonus as keyof AttributeMap] ?? 0;
			}
		}
		if (trait.passiveBonus?.proficiencies) {
			for (const bonus in trait.passiveBonus.proficiencies) {
				this.status.proficiencies[bonus as keyof ProficiencyMap].bonus -=
					trait.passiveBonus.proficiencies[bonus as keyof ProficiencyMap] ?? 0;
			}
		}
		if (trait.passiveBonus?.elements) {
			for (const bonus in trait.passiveBonus.elements) {
				this.status.elements[bonus as keyof CoreElementMap].bonus -=
					trait.passiveBonus.elements[bonus as keyof CoreElementMap] ?? 0;
			}
		}
		this.traits.splice(this.traits.indexOf(trait), 1);
		return this;
	}

	getTraits(): TraitEnum[] {
		return this.traits.map((trait) => trait.id);
	}

	getBuffsAndDebuffs(): BuffsAndDebuffs {
		return this.buffsAndDebuffs;
	}

	//MARK: SKILL
	// async learnSkill(skillID: string): Promise<SkillResponseType> {
	// 	let skill;

	// 	if (skillID.includes("auto")) {
	// 		skill = SkillRepository[skillID as keyof typeof SkillRepository];
	// 	} else {
	// 		skill = await getSkillFromDB(skillID);
	// 	}

	// 	if (!skill) {
	// 		throw new Error(
	// 			`Skill with id ${skillID} not found in SkillRepository or database.`
	// 		);
	// 	}

	// 	if (
	// 		this.skills.some((s) => s.skill.id === skillID) ||
	// 		this.activeSkills.some((s) => s.skill.id === skillID)
	// 	) {
	// 		console.log(`Skill with id ${skillID} is already learned`);
	// 		return SkillResponseType.SuccessAlreadyLearned;
	// 	}

	// 	if (!this.validateSkillLearning(skill)) {
	// 		console.log(`Not eligible to learn skill with id ${skillID}`);
	// 		return SkillResponseType.SuccessNotEligibleToLearn;
	// 	}

	// 	this.skills.push({ skill: skill, level: 1, exp: 0 });

	// 	return SkillResponseType.SuccessLearning;
	// }

	validateSkillLearning(skill: Skill): boolean {
		const traitIDArray = [];
		for (const trait of this.traits) {
			if (trait) {
				traitIDArray.push(trait.id);
			}
		}

		return skill.validateSkillLearning(
			this.level,
			this.status,
			[...this.skills, ...this.activeSkills].map((skill) => skill.skill.id),
			traitIDArray
		);
	}

	// async trainSkill(
	// 	skillID: string,
	// 	expGained: number
	// ): Promise<SkillResponseType> {
	// 	//We need to find first if the skill is in skills or in activeSkills?
	// 	let skill = this.skills.find((s) => s.skill.id === skillID);
	// 	if (!skill) {
	// 		skill = this.activeSkills.find((s) => s.skill.id === skillID);
	// 	}
	// 	if (!skill) {
	// 		throw new Error(`Skill with id ${skillID} not found in this character`);
	// 	}

	// 	let skillObject;

	// 	if (skillID.includes("auto")) {
	// 		skillObject = SkillRepository[skillID as keyof typeof SkillRepository];
	// 	} else {
	// 		skillObject = await getSkillFromDB(skillID);
	// 	}
	// 	if (!skillObject) {
	// 		throw new Error(`Skill with id ${skillID} not found`);
	// 	}

	// 	const expNeeded = skillObject.neededExp(skill.level);
	// 	skill.exp += expGained;
	// 	if (skill.exp >= expNeeded) {
	// 		skill.level++;
	// 		skill.exp -= expNeeded;
	// 		return SkillResponseType.SuccessTrainingWithLevelUp;
	// 	}
	// 	return SkillResponseType.SuccessTrainingWithoutLevelUp;
	// }

	//Instead of Validate as a 'must' we may use this to help player see how the deck should be built
	async validateActiveSkills(): Promise<SuccessResponse | ErrorResponse> {
		//So This will return 'SUGGESTION'

		const firstSkill = this.activeSkills[0].skill;
		if (!firstSkill.isAuto) {
			return {
				type: "ERROR",
				message: "Last card in battle deck should be an auto card",
			};
		}

		let autoCardCount = 0;
		for (const skill of this.activeSkills) {
			const skillObject =
				SkillRepository[skill.skill.id as keyof typeof SkillRepository];
			if (skillObject.isAuto) {
				autoCardCount++;
			}
			if (autoCardCount > 1) {
				return {
					type: "ERROR",
					message: "Battle deck better have only one auto card",
				};
			}
		}

		let elementNeededArray = [];
		for (const skill of this.activeSkills) {
			const skillObject =
				SkillRepository[skill.skill.id as keyof typeof SkillRepository];
			for (const element of skillObject.consume.elements) {
				if (element.amount[skill.level - 1] > 0) {
					elementNeededArray.push(element.element);
				}
			}
		}

		let elementProducedArray = [];
		for (const skill of this.activeSkills) {
			const skillObject =
				SkillRepository[skill.skill.id as keyof typeof SkillRepository];
			for (const element of skillObject.produce.elements) {
				if (element.amountRange[skill.level - 1][1] > 0) {
					elementProducedArray.push(element.element);
				}
			}
		}

		let elementNeededSet = new Set(elementNeededArray);
		let elementProducedSet = new Set(elementProducedArray);

		if (elementNeededSet.size > elementProducedSet.size) {
			return {
				type: "ERROR",
				message:
					"Element Produce is less than Element Needed, some card may not be able to play",
			};
		}

		if (elementNeededSet.size < elementProducedSet.size) {
			return {
				type: "ERROR",
				message:
					"Element Produce is more than Element Needed, some element may not be used",
			};
		}

		return { type: "SUCCESS", message: "Your Battle deck is Good to go!" };
	}

	moveCardToBattle(skillID: string): {
		character: Character;
		response: SuccessResponse;
	} {
		const skillIndex = this.skills.findIndex((s) => s.skill.id === skillID);
		if (skillIndex === -1) {
			throw new Error(`Skill not learned`);
		}
		const [skillToAdd] = this.skills.splice(skillIndex, 1);
		this.activeSkills.push(skillToAdd);
		return {
			character: this,
			response: { type: "SUCCESS", message: "Skill moved to battle deck" },
		};
	}

	moveCardToSkills(skillID: string): {
		character: Character;
		response: SuccessResponse | ErrorResponse;
	} {
		const skillObject =
			SkillRepository[skillID as keyof typeof SkillRepository];
		if (skillObject.isAuto) {
			let autoCardCount = 0;
			for (const skill of this.activeSkills) {
				const skillObject =
					SkillRepository[skill.skill.id as keyof typeof SkillRepository];
				if (skillObject.isAuto) {
					autoCardCount++;
				}
			}
			if (autoCardCount === 1) {
				return {
					character: this,
					response: {
						type: "ERROR",
						message: "Battle deck can't have more than one auto card",
					},
				};
			}
		}

		const skillIndex = this.activeSkills.findIndex(
			(s) => s.skill.id === skillID
		);
		if (skillIndex === -1) {
			throw new Error(`Skill not in battleCards`);
		}
		const [skillToRemove] = this.activeSkills.splice(skillIndex, 1);
		this.skills.push(skillToRemove);
		return {
			character: this,
			response: { type: "SUCCESS", message: "Skill moved to skills" },
		};
	}

	//MARK: BATTLE
	//New Battle system needed to be implement
	/*
		The battle start with Battle updating abgauge for all characters in turn and get one active character
		After that, it should be the character responsibility to calculate his turn, we normally use the battle to do that but it's give us too much dependency cycle
	*/
	intoBattleContext(): CharacterBattleContext {
		return {
			actorID: this.id,
			actorPosition: this.position,
			actorEquipment: {
				mainHand:
					(this.equipments.mainHand?.specificType as WeaponType) || null,
				offHand: (this.equipments.offHand?.specificType as WeaponType) || null,
				cloth: (this.equipments.cloth?.specificType as EquipmentType) || null,
				armor: (this.equipments.armor?.specificType as EquipmentType) || null,
				headWear:
					(this.equipments.headWear?.specificType as EquipmentType) || null,
				necklace:
					(this.equipments.necklace?.specificType as EquipmentType) || null,
				ring: (this.equipments.ring?.specificType as EquipmentType) || null,
			},
			actorStats: this.status.getStats(),
			actorBuffs: this.buffsAndDebuffs.getBuffsAndDebuffs(),
			actorTraits: this.getTraits(),
		};
	}

	addResourcesFromElementsModifier(): Character {
		const coreElement: (keyof typeof this.status.elements)[] = [
			"air",
			"water",
			"fire",
			"geo",
			"order",
			"chaos",
		];
		for (const element of coreElement) {
			const resourceBonusFromElement = this.getModifier(
				CharacterStatusEnum[element]
			);
			if (resourceBonusFromElement > 0) {
				this.resources[element as keyof typeof this.status.elements] +=
					resourceBonusFromElement;
			}
		}
		return this;
	}

	getSkillThatCanBePlay(skillPosition?: number): {
		skillThatCanBePlay: Skill;
		skillLevel: number;
		skillPosition: number;
	} {
		if (!skillPosition) {
			skillPosition = 0;
		}

		//If skill position exceed the activeSkills length, we need to return normal attack
		if (skillPosition >= this.activeSkills.length) {
			let skill = this.status.strength > this.status.planar ? SkillRepository.skill_auto_physical : SkillRepository.skill_auto_magical;

			return {
				skillThatCanBePlay: skill,
				skillLevel: 1,
				skillPosition: -1,
			}
		};

		const skillInSuspect = this.activeSkills[skillPosition].skill;
		if (
			!skillInSuspect.validateEquipment({
				weapon: [
					this.equipments.mainHand?.specificType || "none",
					this.equipments.offHand?.specificType || "none",
				],
			})
		) {
			console.log(
				`${this.name} is not eligible to play skill ${skillInSuspect.id}/ Weapon not match`
			);
			return this.moveToNextSkill(skillPosition);
		}

		let consume = new SkillConsume(skillInSuspect.consume);

		if (
			!consume.validateConsume(
				this.activeSkills[skillPosition].level,
				{
					none: this.resources.none,
					order: this.resources.order,
					chaos: this.resources.chaos,
					geo: this.resources.geo,
					water: this.resources.water,
					air: this.resources.air,
					fire: this.resources.fire,
				},
				this.currentHP,
				this.currentMP,
				this.currentSP
			)
		) {
			return this.moveToNextSkill(skillPosition);
		}

		return {
			skillThatCanBePlay: skillInSuspect,
			skillLevel: this.activeSkills[skillPosition].level,
			skillPosition: skillPosition,
		};
	}

	private moveToNextSkill(skillPosition: number): {
		skillThatCanBePlay: Skill;
		skillLevel: number;
		skillPosition: number;
	} {
		skillPosition++;
		return this.getSkillThatCanBePlay(skillPosition);
	}

	consumeActionObject(
		skillActionObject: SkillActionObject,
		level: number,
		target: Character,
		isSpell: boolean,
		isWeaponAttack: boolean,
		isAuto: boolean
	): {
		actor: Character;
		target: Character;
		damageObjectResult: {
			isHit: boolean;
			isCrit: boolean;
			baseDamage: number;
			damageType: DamageTypes[];
		};
		effectRecorded: EffectReturnObject[];
		skillActionSubType: SkillActionSubType;
	} {
		let damageType = skillActionObject.damageType.length === 1 ? skillActionObject.damageType[0] : skillActionObject.damageType[level - 1];

		if (isWeaponAttack === true) {
			if (isSpell === true) {
				damageType = this.equipments.mainHand?.attackStats?.magicalType || DamageTypes.arcane;
			} else {
				damageType = this.equipments.mainHand?.attackStats?.physicalType || DamageTypes.blunt;
			}
		}

		if (isAuto === true) {
			if (isSpell === true) {
				damageType = this.equipments.mainHand?.attackStats?.magicalType || DamageTypes.arcane;
			} else {
				damageType = this.equipments.mainHand?.attackStats?.physicalType || DamageTypes.blunt;
			}
		}

		let baseDamage = this.calculateBaseDamage(skillActionObject, level, damageType, isWeaponAttack, isSpell);

		let [hit, crit] = this.calculateCritAndHit(skillActionObject, level)

		if (isSpell) {
			baseDamage *= this.getArmorPentaltyForSpellCastingDamage();
		}

		if (isSpell) {
			hit += this.getArmorPenaltyForSpellCastingHit();
		}

		if (isSpell) {
			baseDamage *= this.arcaneAptitude.getSpellEffectivenessAptitude();
		}

		const damageObject = {
			baseDamage: baseDamage,
			type: damageType,
			crit: crit,
			hit: hit,
			trueHit: skillActionObject.trueHit,
			trueHitDice: skillActionObject.trueHitDice,
			trueHitDC: skillActionObject.trueHitDC,
			trueHitFailDamageMultiplier: skillActionObject.trueHitFailDamageMultiplier,
			saveStat: skillActionObject.saveStat,
			applyEffect:
				skillActionObject.applyEffect[
					skillActionObject.applyEffect.length === 1 ? 0 : level - 1
				],
			skillActionSubType: skillActionObject.subType,
			traitBasedModifier:
				skillActionObject.traitBasedModifier[
					skillActionObject.traitBasedModifier.length === 1 ? 0 : level - 1
				],
			buffBasedModifier:
				skillActionObject.buffBasedModifier[
					skillActionObject.buffBasedModifier.length === 1 ? 0 : level - 1
				],
			specialEffect:
				skillActionObject.specialEffect[
					skillActionObject.specialEffect.length === 1 ? 0 : level - 1
				],
		};

		// Implement Damage additional Buffs and Debuffs here
		// Weapon Magical Coating, if attacking with Weapon, damage + 3
		if (isWeaponAttack) {
			// *Put additional weapon attack buff here
			if (this.buffsAndDebuffs.weaponMagicalCoating > 0) { damageObject.baseDamage += 3 };	
			
		}

		if (isSpell) {
			// *Put additional spell attack buff here

		}

		switch (skillActionObject.type) {
			case SkillActionType.Negative:
				return this.playNegativeSkill({
					target,
					damageObject,
					skillLevel: level,
					isWeaponAttack
				});
			case SkillActionType.Positive:
				return this.playPositiveSkill({
					target,
					damageObject,
					skillLevel: level,
				});
		}
	}

	private calculateBaseDamage(
		skillActionObject: SkillActionObject,
		level: number,
		damageType: DamageTypes,
		isWeaponAttack: boolean,
		isSpell: boolean
	): number {
		let baseDamage: number = 0;
		// In case of using Weapon DMG
		if (skillActionObject.damageDiceBase[0] === DiceEnum.Weapon_Physical || skillActionObject.damageDiceBase[0] === DiceEnum.Weapon_Magical) {
			if (this.equipments.mainHand === null) {
				baseDamage = Dice.roll(DiceEnum.OneD6).sum;
			} else if (this.equipments.mainHand !== null) {
				baseDamage = this.calculateWeaponDamage(skillActionObject.damageDiceBase[0]);
			}
		}

		// Case it's not weapon damage
		if (skillActionObject.damageDiceBase[0] !== DiceEnum.Weapon_Physical && skillActionObject.damageDiceBase[0] !== DiceEnum.Weapon_Magical) {
			baseDamage = Dice.roll(skillActionObject.damageDiceBase.length === 1 ? skillActionObject.damageDiceBase[0] : skillActionObject.damageDiceBase[level - 1]).sum;
		}

		// We multiply the base damage by the damage multiplier
		baseDamage *=
			skillActionObject.damageMultiplier[
				skillActionObject.damageMultiplier.length === 1 ? 0 : level - 1
			];

		// We add the damage modifier stat to the base damage
		if (
			skillActionObject.damageModifierStat[
				skillActionObject.damageModifierStat.length === 1 ? 0 : level - 1
			].length > 0
		) {
			const skillModfierBonus =
				skillActionObject.damageModifierStat[
					skillActionObject.damageModifierStat.length === 1 ? 0 : level - 1
				];
			baseDamage += this.getModifier(skillModfierBonus as CharacterStatusEnum);
		}

		// Additional damage from damage type
		switch (damageType) {
			case DamageTypes.blunt:
				baseDamage += this.status.bluntAttack();
				break;
			case DamageTypes.pierce:
				baseDamage += this.status.pierceAttack()
				break;
			case DamageTypes.slash:
				baseDamage += this.status.slashAttack();
				break;
			case DamageTypes.arcane:
				baseDamage += this.status.arcaneAttack();
				break;
			case DamageTypes.fire:
				baseDamage += this.status.fireAttack();
				break;
			case DamageTypes.water:
				baseDamage += this.status.waterAttack();
				break;
			case DamageTypes.air:
				baseDamage += this.status.airAttack();
				break;
			case DamageTypes.geo:
				baseDamage += this.status.geoAttack();
				break;
			case DamageTypes.order:
				baseDamage += this.status.orderAttack();
				break;
			case DamageTypes.chaos:
				baseDamage += this.status.chaosAttack();
				break;
			case DamageTypes.angelic:
				baseDamage += this.status.angelicAttack();
				break;
			case DamageTypes.demonic:
				baseDamage += this.status.demonicAttack();
				break;
			case DamageTypes.holy:
				baseDamage += this.status.holyAttack();
				break;
			case DamageTypes.dark:
				baseDamage += this.status.darkAttack();
				break;
			case DamageTypes.ice:
				baseDamage += this.status.iceAttack();
				break;
			case DamageTypes.lightning:
				baseDamage += this.status.lightningAttack();
				break;
			case DamageTypes.poison:
				baseDamage += this.status.poisonAttack();
				break;
			case DamageTypes.life:
				baseDamage += this.status.lifeAttack();
				break;
			case DamageTypes.necrotic:
				baseDamage += this.status.necroticAttack();
				break;
			case DamageTypes.metal:
				baseDamage += this.status.metalAttack();
				break;
			case DamageTypes.nature:
				baseDamage += this.status.natureAttack();
				break;
			case DamageTypes.spirit:
				baseDamage += this.status.spiritAttack();
				break;
			case DamageTypes.chiCold:
				baseDamage += this.status.chiColdAttack();
				break;
			case DamageTypes.chiWarm:
				baseDamage += this.status.chiWarmAttack();
				break;
			case DamageTypes.chiHarmony:
				baseDamage += this.status.chiHarmonyAttack();
				break;
			default:
				break;
		}

		//Additional Damage from proficiency
		if (isWeaponAttack === true) {
			switch (this.equipments.mainHand?.specificType) {
				case WeaponType.axe_broad || WeaponType.axe_great || WeaponType.axe_shepherd || WeaponType.axe_spliitingMaul || WeaponType.axe_war:
					baseDamage += this.getModifier(CharacterStatusEnum.axe);
					break;
				case WeaponType.sword_bastard || WeaponType.sword_broad || WeaponType.sword_claymore || WeaponType.sword_flamberge || WeaponType.sword_great || WeaponType.sword_jian || WeaponType.sword_long || WeaponType.sword_rapier || WeaponType.sword_short || WeaponType.sword_zweihander:
					baseDamage += this.getModifier(CharacterStatusEnum.sword);
					break;
				case WeaponType.blade_broadblade || WeaponType.blade_cutlass || WeaponType.blade_dao || WeaponType.blade_falchion || WeaponType.blade_katana || WeaponType.blade_khopesh || WeaponType.blade_machete || WeaponType.blade_randao || WeaponType.blade_saber || WeaponType.blade_scimitar || WeaponType.blade_zhanmadao:
					baseDamage += this.getModifier(CharacterStatusEnum.blade);
					break;
				case WeaponType.bow_compound || WeaponType.bow_cross || WeaponType.bow_long || WeaponType.bow_compound || WeaponType.bow_short:
					baseDamage += this.getModifier(CharacterStatusEnum.bow);
					break;
				case WeaponType.dagger_dirk || WeaponType.dagger_khukuri || WeaponType.dagger_knife || WeaponType.dagger_kris || WeaponType.dagger_rondel || WeaponType.dagger_stiletto:
					baseDamage += this.getModifier(CharacterStatusEnum.dagger);
					break;
				case WeaponType.mace_club || WeaponType.mace_flail || WeaponType.mace_morningStar || WeaponType.mace_warHammer:
					baseDamage += this.getModifier(CharacterStatusEnum.mace);
					break;
				case WeaponType.orb:
					baseDamage += this.getModifier(CharacterStatusEnum.orb);
					break;
				case WeaponType.spear_Brandistock || WeaponType.spear_dory || WeaponType.spear_glaive || WeaponType.spear_guisarme || WeaponType.spear_halberd || WeaponType.spear_javelin || WeaponType.spear_ji || WeaponType.spear_partisan || WeaponType.spear_trident:
					baseDamage += this.getModifier(CharacterStatusEnum.spear);
					break;
				case WeaponType.staff_long || WeaponType.staff_quarter || WeaponType.staff_magic:
					baseDamage += this.getModifier(CharacterStatusEnum.staff);
					break;
				case WeaponType.tome_bible || WeaponType.tome_grimoire || WeaponType.tome_codex:
					baseDamage += this.getModifier(CharacterStatusEnum.tome);
					break;
				case WeaponType.wand_magic || WeaponType.wand_scepter:
					baseDamage += this.getModifier(CharacterStatusEnum.magicWand);
					break;
				// Will this automatically means BareHand?
				default:
					baseDamage += this.getModifier(CharacterStatusEnum.bareHand);
					break;
			}
		}


		return baseDamage;
	}

	private calculateWeaponDamage(diceType: DiceEnum.Weapon_Physical | DiceEnum.Weapon_Magical): number {
		let weaponDiceEnum: DiceEnum = DiceEnum.OneD6;
		if (this.equipments.mainHand !== null) {
			switch (diceType) {
				case DiceEnum.Weapon_Physical:
					weaponDiceEnum =
						this.equipments.mainHand.attackStats?.physicalDiceEnum ||
						DiceEnum.OneD6;
					break;
				case DiceEnum.Weapon_Magical:
					weaponDiceEnum =
						this.equipments.mainHand.attackStats?.magicalDiceEnum ||
						DiceEnum.OneD6;
					break;
			}
			return Dice.roll(weaponDiceEnum).sum;
		} else if (this.equipments.offHand !== null) {
			switch (diceType) {
				case DiceEnum.Weapon_Physical:
					weaponDiceEnum =
						this.equipments.offHand.attackStats?.physicalDiceEnum ||
						DiceEnum.OneD6;
					break;
				case DiceEnum.Weapon_Magical:
					weaponDiceEnum =
						this.equipments.offHand.attackStats?.magicalDiceEnum ||
						DiceEnum.OneD6;
					break;
			}
			return Dice.roll(weaponDiceEnum).sum;
		} else {
			return Dice.roll(DiceEnum.OneD6).sum;
		}
	}

	private calculateCritAndHit(
		skillActionObject: SkillActionObject,
		level: number,
	): [number, boolean] {
		if (skillActionObject.trueHit) {
			return [9999, false]; // True hit skill garantee hit but can't crit
		}
		let hitRoll = Dice.roll(DiceEnum.OneD20).sum;

		if (hitRoll === 20) {
			return [20, true];
		}
		if (hitRoll === 1) {
			return [1, false];
		}

		let hitModifier = 0;

		if (skillActionObject.hitStat.length > 0) {
			if (skillActionObject.hitStat.length === 1 ) {
				for (const hitStat of skillActionObject.hitStat[0]) {
					hitModifier += this.getModifier(hitStat);
				}
			} else if (skillActionObject.hitStat.length > 1) {
				for (const hitStat of skillActionObject.hitStat[level - 1]) {
					hitModifier += this.getModifier(hitStat);
				}
			}
		};

		let critThreshold =
			skillActionObject.critBase[
				skillActionObject.critBase.length === 1 ? 0 : level - 1
			];
		if (skillActionObject.critStat.length > 0) {
			for (const critBonus of skillActionObject.critStat[
				skillActionObject.critStat.length === 1 ? 0 : level - 1
			]) {
				critThreshold += this.getModifier(critBonus);
			}
		}

		return [hitRoll, (hitRoll + critThreshold >= 20)];
	}

	//MARK:: ATTACK
	playNegativeSkill({
		target,
		damageObject,
		skillLevel,
		isWeaponAttack,
	}: {
		target: Character;
		damageObject: {
			baseDamage: number;
			type: DamageTypes;
			crit: boolean;
			hit: number;
			trueHit: boolean;
			trueHitDice: DiceEnum;
			trueHitDC: number;
			trueHitFailDamageMultiplier: number;
			saveStat: CharacterStatusEnum;
			applyEffect: SkillApplyEffect[];
			skillActionSubType: SkillActionSubType;
			traitBasedModifier: {
				trait: TraitEnum;
				modifier: number;
			};
			buffBasedModifier: {
				buff: BuffsAndDebuffsEnum;
				stackNeeded: number;
				value: number;
			};
			specialEffect: {
				condition: {
					actor?: {
						stat: {
							type: CharacterStatusEnum;
							value: number;
						};
						trait: TraitEnum;
						buff: {
							type: BuffsAndDebuffsEnum;
							stack: number;
						};
					};
					target?: {
						stat: {
							type: CharacterStatusEnum;
							value: number;
						};
						trait: TraitEnum;
						buff: {
							type: BuffsAndDebuffsEnum;
							stack: number;
						};
					};
					skillLevel?: number;
				};
				effect: SpecialEffectResult;
			};
		};
		skillLevel: number;
		isWeaponAttack: boolean;
	}): {
		actor: Character;
		target: Character;
		damageObjectResult: {
			isHit: boolean;
			isCrit: boolean;
			baseDamage: number;
			damageType: DamageTypes[];
		};
		effectRecorded: EffectReturnObject[];
		skillActionSubType: SkillActionSubType;
	} {
		console.log(
			`${this.name} is attacking ${target.name}(HP:${target.currentHP}/${target.maxHP()}) with ${damageObject.type} damage`
		);

		let isHit = false;
		let isCrit = damageObject.crit;
		let finalDamage = 0;
		let effectResults: EffectReturnObject[] = [];
		let damageType: DamageTypes[] = [];

		const targetTraits = target.getTraits();
		const traitModifier =
			damageObject.traitBasedModifier.trait in targetTraits
				? damageObject.traitBasedModifier.modifier
				: 1;
		const targetBuffs = target.getBuffsAndDebuffs();
		// const buffModifier = damageObject.buffBasedModifier(targetBuffs, skillLevel);
		const buffModifier =
			damageObject.buffBasedModifier.buff == BuffsAndDebuffsEnum.none
				? 1
				: targetBuffs[damageObject.buffBasedModifier.buff] >=
				  damageObject.buffBasedModifier.stackNeeded
				? damageObject.buffBasedModifier.value
				: 1;

		// Check for a critical miss
		if (damageObject.hit === 1 && !damageObject.trueHit) {
			console.log(`Critical Miss!`);
			// No damage is dealt on a critical miss
			target.receiveDamage({
				attacker: this,
				damage: 0,
				hitChance: 0,
				damageType: damageObject.type,
			});
		} else {
			// Check for a critical hit
			if (isCrit && !damageObject.trueHit) {
				isCrit = true;
				damageObject.baseDamage = this.getCriticalModifiedDamage(damageObject.baseDamage); // Critical hit multiplier
				console.log(`Critical Hit!`);
			}

			if (damageObject.trueHit) {
				const saveStat = target.getModifier(damageObject.saveStat);
				const saveRoll = Dice.roll(damageObject.trueHitDice).sum;
				const totalSaves = saveStat + saveRoll;
				if (totalSaves >= damageObject.trueHitDC) {
					damageObject.baseDamage *= damageObject.trueHitFailDamageMultiplier;	
				}
			}

			let damageWithModifier =
				damageObject.baseDamage * traitModifier * buffModifier;

			let additionalApplyEffect:
			| { type: BuffsAndDebuffsEnum; duration: number }
			| undefined = undefined;

			if (damageObject.specialEffect !== undefined) {
				let specialEffect = damageObject.specialEffect;
				let isSkillLevelMet = true;
				if (specialEffect!== undefined) {
					if (specialEffect.condition !== undefined) {
						isSkillLevelMet = skillLevel >= (specialEffect.condition?.skillLevel ?? 1);
					}
				};

				let specialEffectConditionMet =
					this.checkSpecialEffectCondition(
						specialEffect.condition.actor?.stat,
						specialEffect.condition.actor?.trait,
						specialEffect.condition.actor?.buff
					) && isSkillLevelMet;

				if (specialEffectConditionMet) {
					let result = specialEffect.effect;

					if (result.damage !== undefined) {
						damageWithModifier += result.damage;
					}
					if (result.damageMultiplier !== undefined) {
						damageWithModifier *= result.damageMultiplier;
					}
					if (result.buffsOrDebuffs !== undefined) {
						additionalApplyEffect = {
							type: result.buffsOrDebuffs.type,
							duration: result.buffsOrDebuffs.duration,
						};
					}
				}
			}	

			// Attempt to deal damage to the target
			console.log(
				`Damage: ${damageObject.baseDamage}, type: ${damageObject.type}, hit: ${damageObject.hit}`
			);

			const afterAttackResult = target.receiveDamage({
				attacker: this,
				damage: damageWithModifier,
				hitChance: damageObject.hit,
				damageType: damageObject.type,
			});

			isHit = afterAttackResult.dHit;
			finalDamage = afterAttackResult.damage;
			damageType.push(damageObject.type);
			
			// Record effects applied
			// Attacking skill that applied some buff also needed to be done her
			// *Apply Buffs Effect that create Debuff to target hits
			// TODO: ADD is weaponAttack flag to check if the attack is from weapon
			if (isWeaponAttack) {
				// Poison Coating 1
				if (this.buffsAndDebuffs.poisonCoating_1 > 0) {
					let effectResult = this.inflictEffect(
						target,
						new SkillApplyEffect({
							applyWithoutHit: [false],
							effectName: [BuffsAndDebuffsEnum.poison],
							effectHitBase: [9999],
							effectHitBonus: [],
							effectDuration: [3],
							effectDurationBonus: [],
							effectStatForResistance: CharacterStatusEnum.none,
						}),
						skillLevel
					);
					effectResults.push(effectResult);
				}
				// Poison Coating 2
				if (this.buffsAndDebuffs.poisonCoating_2 > 0) {
					let effectResult = this.inflictEffect(
						target,
						new SkillApplyEffect({
							applyWithoutHit: [false],
							effectName: [BuffsAndDebuffsEnum.poison],
							effectHitBase: [9999],
							effectHitBonus: [],
							effectDuration: [4],
							effectDurationBonus: [],
							effectStatForResistance: CharacterStatusEnum.none,
						}),
						skillLevel
					);
					effectResults.push(effectResult);
				}
				// Poison Coating 3
				if (this.buffsAndDebuffs.poisonCoating_3 > 0) {
					let effectResult = this.inflictEffect(
						target,
						new SkillApplyEffect({
							applyWithoutHit: [false],
							effectName: [BuffsAndDebuffsEnum.poison],
							effectHitBase: [9999],
							effectHitBonus: [],
							effectDuration: [5],
							effectDurationBonus: [],
							effectStatForResistance: CharacterStatusEnum.none,
						}),
						skillLevel
					);
					effectResults.push(effectResult);
				}
				
			}

			if (additionalApplyEffect !== undefined) {
				let effectResult = this.inflictEffect(
					target,
					new SkillApplyEffect({
						applyWithoutHit: [false],
						effectName: [additionalApplyEffect.type],
						effectHitBase: [9999],
						effectHitBonus: [],
						effectDuration: [additionalApplyEffect.duration],
						effectDurationBonus: [],
						effectStatForResistance: CharacterStatusEnum.none,
					}),
					skillLevel
				);
				effectResults.push(effectResult);
			}

			if (damageObject.applyEffect !== undefined) {
				let applyEffect = false;
				for (const effect of damageObject.applyEffect) {
					if (
						effect.applyWithoutHit !== undefined &&
						effect.applyWithoutHit.length != 0
					) {
						if (effect.applyWithoutHit.length === 1) {
							if (effect.applyWithoutHit[0] === true) {
								applyEffect = true;
							} else {
								applyEffect = isHit;
							}
						} else {
							if (effect.applyWithoutHit[skillLevel - 1] === true) {
								applyEffect = true;
							} else {
								applyEffect = isHit;
							}
						}
					}
					if (applyEffect) {
						const effectResult = this.inflictEffect(target, effect, skillLevel);
						effectResults.push(effectResult);
					}
				}
			}
		}

		console.log(`target HP after attack: ${target.currentHP}`);

		return {
			actor: this,
			target: target,
			damageObjectResult: {
				isHit,
				isCrit,
				baseDamage: finalDamage,
				damageType: damageType,
			},
			effectRecorded: effectResults,
			skillActionSubType: damageObject.skillActionSubType,
		};
	}
	//MARK: Special Effect condition check
	checkSpecialEffectCondition(
		stat?: {
			type: CharacterStatusEnum;
			value: number;
		},
		trait?: TraitEnum,
		buff?: {
			type: BuffsAndDebuffsEnum;
			stack: number;
		}
	): boolean {
		let isConditionMet = false;

		if (stat) {
			if (this.status.getStats()[stat.type] >= stat.value) {
				isConditionMet = true;
			} else {
				return false;
			}
		}

		if (trait) {
			if (this.getTraits().includes(trait)) {
				isConditionMet = true;
			} else {
				return false;
			}
		}

		if (buff) {
			if (
				this.getBuffsAndDebuffs().getBuffsAndDebuffs()[buff.type] >= buff.stack
			) {
				isConditionMet = true;
			} else {
				return false;
			}
		}

		return isConditionMet;
	}
	//MARK: RECEIVE DAMAGE
	receiveDamage({
		attacker,
		damage,
		hitChance,
		damageType,
	}: {
		attacker: Character;
		damage: number;
		hitChance: number;
		damageType: DamageTypes;
	}): {
		actor: Character;
		target: Character;
		damage: number;
		damageType: DamageTypes;
		dHit: boolean;
	} {
		//TODO: Implement buffs and debuffs that affect saving rolls
		//IMPORTANT DODGE CALCULATION GOES HERE, BUFFS AND DEBUFFS THAT AFFECTED SAVING ROLLS GOES HERE!!!
		let dodgeChance =
			this.battler("dodge") +
			this.getModifier(CharacterStatusEnum.agility) +
			this.baseAC;
		if (dodgeChance > 20) {
			dodgeChance = 20;
		}
		if (dodgeChance >= hitChance) {
			console.log(`${this.name} dodged the attack!`);
			return {
				actor: attacker,
				target: this,
				damage: 0,
				damageType: damageType,
				dHit: false,
			};
		}
		//IMPORTANT DAMAGE CALCULATION METHODS GOING HERE, ALL DAMAGE MODIFIER GOES HERE!!!
		//Soaked target don't get any effect, but take 1.5x damage from lightning attack
		if (this.buffsAndDebuffs.soaked > 0 && damageType === "lightning") {
			damage *= 1.5;
		}

		//Divine shield all damage taken is reduce by 2 + order modifier
		if (this.buffsAndDebuffs.divineShield > 0) {
			damage -= 2 + this.getModifier(CharacterStatusEnum.order);
		}
		if (this.buffsAndDebuffs.divineShield > 0 && damageType === "chaos") {
			damage -= 2 + this.getModifier(CharacterStatusEnum.order);
		}

		// Calculate damage mitigate by damageType
		let damageMitigator = 0;
		if (
			damageType === "pierce" ||
			damageType === "slash" ||
			damageType === "blunt"
		) {
			damageMitigator =
				this.battler("pDEF") + this.getModifier(CharacterStatusEnum.endurance);
			if (damageMitigator < 0) {
				damageMitigator = 0;
			}
		} else if (damageType === "chiWarm") {
			damageMitigator = this.battler("chiWarmDEF");
		} else if (damageType === "chiCold") {
			damageMitigator = this.battler("chiColdDEF");
		} else if (damageType === "chiHarmony") {
			damageMitigator =
				(this.battler("chiColdDEF") + this.battler("chiWarmDEF")) / 2;
		} else {
			damageMitigator =
				this.battler("mDEF") +
				StatMod.value(
					this.element(damageType as keyof CharacterStatus["elements"])
				) +
				this.getModifier(CharacterStatusEnum.planar);
			if (damageMitigator < 0) {
				damageMitigator = 0;
			}
		}

		damage = Math.max(damage - damageMitigator, 0);

		// Divine Shield reduce chaos, dark, evil damage, for 70%
		if (
			(damageType === DamageTypes.chaos || 
			damageType === DamageTypes.demonic ||
			damageType === DamageTypes.lightning ||
			damageType === DamageTypes.dark || 
			damageType === DamageTypes.poison) &&
			(this.buffsAndDebuffs.divineShield > 0)
		) {
			damage = Math.floor(damage * 0.3);
		}

		// *Damage Absorber Buffs
		//ManaShield can absorb damage taken, 2 manaShield = 1 damage absorbed, rounded down
		//Ex. damage = 10  manashield stack = 6 then 6/2 = 3 damage absorbed, manashield stack - 6 = 0; damage taken = 7
		//Ex2. damage = 3 manashield stack = 6 then 6/2 = 3 damage absorbed, manashield stack - 6 = 0; damage taken = 0
		//Ex3. damage = 3 manashield stack = 20 then 20/2 = 10 damage can be absorbed, but we only needed 3, so we'll just use 6 stack, manashield stack - 6 = 14; damage taken = 0
		let manaShieldAbsorb = 0;
		if (this.buffsAndDebuffs.manaShield > 0) {
			manaShieldAbsorb = Math.floor(this.buffsAndDebuffs.manaShield / 2);
			if (manaShieldAbsorb > damage) {
				manaShieldAbsorb = damage;
			}
			this.buffsAndDebuffs.manaShield -= manaShieldAbsorb * 2;
			damage -= manaShieldAbsorb;
		}
		//Arcane shield: Arcane shield absorb 2 damage per stack, rounded down
		if (this.buffsAndDebuffs.arcaneShield > 0) {
			let arcaneShieldCapacity = this.buffsAndDebuffs.arcaneShield * 2;
			// Calculate the amount of damage the arcane shield can absorb
			let arcaneShieldAbsorb = damage - arcaneShieldCapacity > 0 ? arcaneShieldCapacity : damage;
			// Reduce the damage by the amount absorbed by the arcane shield
			damage -= arcaneShieldAbsorb;
			// Reduce the arcane shield stacks by the amount absorbed divided by 2
			this.buffsAndDebuffs.arcaneShield -= arcaneShieldAbsorb / 2;
		}

		//If Character with counter attack stand in front row and got attack by a front row enemy, will attack the enemy back with sure hit and counter attack buff will decrease by one.
		if (this.buffsAndDebuffs.counterAttack_1 > 0) {
			this.buffsAndDebuffs.counterAttackCharge_1 += 1;
			this.resources.water += 1;
		}
		if (this.buffsAndDebuffs.counterAttack_2 > 0) {
			this.buffsAndDebuffs.counterAttackCharge_2 += 1;
			this.resources.water += 1;
		}

		//TODO: Notify total damage taken
		return this.hpDown(attacker, damage, damageType);
	}

	playPositiveSkill({
		target,
		damageObject,
		skillLevel,
	}: {
		target: Character;
		damageObject: {
			baseDamage: number;
			type: DamageTypes;
			crit: boolean;
			hit: number;
			applyEffect: SkillApplyEffect[];
			skillActionSubType: SkillActionSubType;
		};
		skillLevel: number;
	}): {
		actor: Character;
		target: Character;
		damageObjectResult: {
			isHit: boolean;
			isCrit: boolean;
			baseDamage: number;
			damageType: DamageTypes[];
		};
		effectRecorded: EffectReturnObject[];
		skillActionSubType: SkillActionSubType;
	} {
		let isHit = true;
		let isCrit = false;
		let finalHealing = -(damageObject.baseDamage);
		let effectResults: EffectReturnObject[] = [];

		if (damageObject.crit) {
			isCrit = true;
			finalHealing *= 1.5;
			console.log(`Critical Heal!`);
		}

		let specialHealing = 0;
		if (this.internalBuffs.lectioDivina_01 === true) {
			specialHealing = 2;
		}
		if (this.internalBuffs.lectioDivina_02 === true) {
			specialHealing = 4;
		}
		if (this.internalBuffs.lectioDivina_03 === true) {
			specialHealing = 6;
		}

		finalHealing += specialHealing;

		if (damageObject.applyEffect != undefined) {
			for (const effect of damageObject.applyEffect) {
				const effectResult = this.inflictEffect(target, effect, skillLevel);
				effectResults.push(effectResult);
			}	
		}

		target.recieveHeal({ actor: this, healing: finalHealing });

		return {
			actor: this,
			target: target,
			damageObjectResult: {
				isHit: true,
				isCrit: false,
				baseDamage: finalHealing,
				damageType: [damageObject.type],
			},
			effectRecorded: effectResults,
			skillActionSubType: damageObject.skillActionSubType,
		};
	}

	//MARK: RECEIVE HEAL
	recieveHeal({ healing }: { actor: Character; healing: number }) {
		if (this.isDead === true) {
			return this.hpUp(healing);
		}
		this.currentHP = Math.min(
			this.currentHP + healing || this.maxHP(),
			this.maxHP()
		);

		console.log(`${this.name} healed for ${healing}: ${this.currentHP}/${this.maxHP()}`);
		return this.hpUp(healing);
	}

	//MARK: INFLICT EFFECT
	inflictEffect(
		target: Character,
		applyEffect: SkillApplyEffect,
		skillLevel: number
	): EffectReturnObject {
		let totalHitChance =
			applyEffect.effectHitBase[
				applyEffect.effectHitBase.length === 1 ? 0 : skillLevel - 1
			];

		const statBonuses =
			applyEffect.effectHitBonus[
				applyEffect.effectHitBonus.length === 1 ? 0 : skillLevel - 1
			];

		if (statBonuses.length > 0) {
			for (const bonus of statBonuses) {
				totalHitChance += this.getModifier(bonus);
			}
		}

		if (
			applyEffect.applyWithoutHit.length === 1 &&
			applyEffect.applyWithoutHit[0] === true
		) {
			totalHitChance = 9999;
		}

		let duration = applyEffect.effectDuration.length === 0 ? 0 
			: applyEffect.effectDuration.length === 1 ? applyEffect.effectDuration[0]
				: applyEffect.effectDuration[skillLevel - 1];


		const durationBonuses:CharacterStatusEnum[] = [];
		if (applyEffect.effectDurationBonus.length > 0) {
			if (applyEffect.effectDurationBonus.length === 1) {
				durationBonuses.push(applyEffect.effectDurationBonus[0]);
			} else {
				durationBonuses.push(applyEffect.effectDurationBonus[skillLevel - 1]);
			}
		}
				
		if (durationBonuses.length > 0) {
			for (const bonus of durationBonuses) {
				duration += this.getModifier(bonus);
			}
		}

		console.log(
			`${this.name} is trying to inflict ${applyEffect.effectName} to ${target?.name} with DC ${totalHitChance}`
		);


		return target.effectInflicted(
			applyEffect.effectName[
				applyEffect.effectName.length === 1 ? 0 : skillLevel - 1
			],
			totalHitChance,
			duration,
			applyEffect.effectStatForResistance,
			applyEffect.applyWithoutHit[
				applyEffect.applyWithoutHit.length === 1 ? 0 : skillLevel - 1
			]
		);
	}

	//MARK: EFFECT INFLICTED
	effectInflicted(
		effect: BuffsAndDebuffsEnum,
		hitChance: number,
		effectDuration: number,
		savingStatModifier: CharacterStatusEnum,
		applyWithoutHit: boolean
	): EffectReturnObject {

		// Apply the effect directly if applyWithoutHit is true
		if (applyWithoutHit === true) {
			return this.applyEffect(effect, effectDuration);
		}

		// Initial save roll
		let [diceRoll, baseModifier, buffModifier] =
			this.saveRoll(savingStatModifier);

		// Natural 20 always save
		if (diceRoll === 20) {
			console.log(`${this.name} rolled a natural 20 and saved from ${effect}.`);
			return {
				enableTurnOrder: true,
				buffsAndDebuffs: this.buffsAndDebuffs,
				type: "buffsAndDebuffs",
				damage: undefined,
				status: this.status,
			};
		}

		// Natural 1 always fail
		if (diceRoll === 1) {
			console.log(`${this.name} rolled a natural 1 and failed from ${effect}.`);
			return this.applyEffect(effect, effectDuration);
		}

		let totalSaves = diceRoll + baseModifier + buffModifier;

		console.log(
			`${
				this.name
			} rolls ${diceRoll} for saving throw, plus ${baseModifier} modifier, and ${buffModifier} from Buff. Total: ${
				diceRoll + baseModifier + buffModifier
			}.`
		);

		// Reroll because of curse
		if (totalSaves >= hitChance && this.buffsAndDebuffs.cursed > 0 && diceRoll !== 20) {
			console.log(`${this.name} must reroll a saved throw because of curse.`);
			this.buffsAndDebuffs.cursed -= 1;
			[diceRoll, baseModifier, buffModifier] = this.saveRoll(savingStatModifier);
			totalSaves = diceRoll + baseModifier + buffModifier;
		}

		// Reroll because of bless
		if (totalSaves < hitChance && this.buffsAndDebuffs.bless > 0 && diceRoll !== 1) {
			console.log(`${this.name} must reroll a failed throw because of bless.`);
			this.buffsAndDebuffs.bless -= 1;
			[diceRoll, baseModifier, buffModifier] = this.saveRoll(savingStatModifier);
			totalSaves = diceRoll + baseModifier + buffModifier;
		}

		//*Inspiration and Desperation Buffs, give +2 or -2 to saving throw
		if (this.buffsAndDebuffs.inspiration > 0) { totalSaves += 2 };
		if (this.buffsAndDebuffs.desperation > 0) { totalSaves -= 2 };
		
		// this one determine if the effect is applied or not
		if (totalSaves >= hitChance) {
			console.log(`${this.name} saved from ${effect}`);
			return {
				enableTurnOrder: true,
				buffsAndDebuffs: this.buffsAndDebuffs,
				type: "buffsAndDebuffs",
				damage: undefined,
				status: this.status,
			};
		};

		return this.applyEffect(effect, effectDuration);
	}

	private applyEffect(
		effect: BuffsAndDebuffsEnum,
		effectDuration: number
	) {
		console.log(`Effect ${effect} is applied to ${this.name}`);
		const appenderFunction = EffectAppender[effect];
		
		if (typeof appenderFunction !== "function") {
			/*Panic!*/ throw new Error(`Effect ${effect} not found in EffectAppender!`);
		}

		const appenderObject = new EffectAppenderSendObject(
        	this.status,
        	this.buffsAndDebuffs,
        	effectDuration
    	);

    	const result: EffectReturnObject = appenderFunction(appenderObject);

		//unwrapping result
		this.buffsAndDebuffs = result.buffsAndDebuffs;
		this.status = result.status;

		if (result.damage !== undefined) {
			this.receiveDamage({
				attacker: this,
				damage: result.damage.amount,
				hitChance: 1000,
				damageType: result.damage.type,
			});
		}

		return result;
	}

	//MARK: RESOLVE EFFECT
	resolveEffect(): {
		character: Character;
		success: boolean;
		effectData: {
			effectSuccess: boolean;
			effectName: string;
		}[];
	} {
		let success = true;
		let effectData: {
			effectSuccess: boolean;
			effectName: string;
		}[] = [];

		for (const effect in this.buffsAndDebuffs) {
			const effectValue = this.buffsAndDebuffs[effect as keyof BuffsAndDebuffs];
			if (typeof effectValue === "number" && effectValue > 0) {
				
				const resolverFunction = EffectResolver[effect as BuffsAndDebuffsEnum];

				console.log(`Trying to resolve ${effect}`);

				if (typeof resolverFunction !== "function") {
					throw new Error(`Effect ${effect} not found in EffectResolver!`);
				}

				const resolverObject = new EffectResolverSendObject(
					this.status,
					this.buffsAndDebuffs
				);

				const result: EffectReturnObject = resolverFunction(resolverObject);
				//Unwrapping result
				this.buffsAndDebuffs = result.buffsAndDebuffs;
				this.status = result.status;

				if (result.damage !== undefined) {
					this.receiveDamage({
						attacker: this,
						damage: result.damage.amount,
						hitChance: 1000,
						damageType: result.damage.type,
					});
				}

				if (success === true && result.enableTurnOrder === false) {
					success = false;
				}

				effectData.push({
					effectSuccess: result.enableTurnOrder,
					effectName: effect,
				});
			}
		}

		return { character: this, success, effectData };
	}

	//MARK: EQUIPMENTS
	equip(
		position:
			| "mainHand"
			| "offHand"
			| "armor"
			| "cloth"
			| "headWear"
			| "necklace"
			| "ring",
		equipment: GearInstance
	): Character {
		if (this.equipments[position] !== null) {
			this.unequip(position);
		}

		//This switch case is to prevent dual wield weapon with 2 handle
		switch (position) {
			case "mainHand":
				if (this.equipments.offHand?.attackStats?.handle === 2) {
					//can't equip this
					return this;
				}
				if (
					equipment.attackStats?.handle === 2 &&
					this.equipments.offHand !== null
				) {
					//can't equip this
					return this;
				}
				break;
			case "offHand":
				if (this.equipments.mainHand?.attackStats?.handle === 2) {
					//can't equip this
					return this;
				}
				if (
					equipment.attackStats?.handle === 2 &&
					this.equipments.mainHand !== null
				) {
					//can't equip this
					return this;
				}
				break;
		}

		// Apply ArcaneAptitude
		if (equipment.arcaneAptitude > 0) {
			this.arcaneAptitude.increaseAptitude(equipment.arcaneAptitude)
		} else if (equipment.arcaneAptitude < 0) {
			this.arcaneAptitude.decreaseAptitude(-(equipment.arcaneAptitude))
		}

		// Apply Attack Bonuses
		if (equipment.attackStats?.bonus != null) {
			for (const stat in equipment.attackStats.bonus) {
				const bonusValue = equipment.attackStats.bonus[stat as keyof typeof equipment.attackStats.bonus];
				if (bonusValue && this.status.battlers.hasOwnProperty(stat)) {
					this.status.battlers[stat as keyof typeof this.status.battlers].bonus += bonusValue;
				}
			}
		}

		// Applying Attack Stats
		if (equipment.attackStats?.bonus != null) {
			for (const stat in equipment.attackStats.bonus) {
				const bonusValue = equipment.attackStats.bonus[stat as keyof typeof equipment.attackStats.bonus];
				if (bonusValue != null) {
					if (
						stat === "order" ||
						stat === "chaos" ||
						stat === "geo" ||
						stat === "water" ||
						stat === "air" ||
						stat === "fire"
					) {
						let statTarget = stat+"ATK"
						this.status.battlers[statTarget as keyof typeof this.status.battlers].bonus += bonusValue;
					} else if (this.status.battlers.hasOwnProperty(stat)) {
						// Handle regular stats
						this.status.battlers[stat as keyof typeof this.status.battlers].bonus += bonusValue;
					} else {
						throw new Error(`Stat ${stat} not found in character battlers.`);
					}
				}
			}
		}

		// Apply defense stats
		if (equipment.defenseStats != null) {
			for (const stat in equipment.defenseStats) {
				const defenseValue = equipment.defenseStats[stat as keyof typeof equipment.defenseStats];

				if (defenseValue != null){
					if (this.status.battlers.hasOwnProperty(stat)) {
						this.status.battlers[stat as keyof typeof this.status.battlers].bonus += defenseValue;
					} else {
						throw new Error(`Stat ${stat} not found in character battlers.`);
					}
				}
			}
		}

		this.equipments[position] = equipment;

		return this;
	}

	unequip(
		position:
			| "mainHand"
			| "offHand"
			| "armor"
			| "cloth"
			| "headWear"
			| "necklace"
			| "ring"
	): Character {
		if (this.equipments[position] === null) {
			throw new Error("No equipment to unequip");
		}

		const equipment = this.equipments[position];

		if (!equipment) {
			throw new Error("Equipment is null or undefined");
		}

		if (equipment && equipment.specialTrait != null) {
			for (const traitID of equipment.specialTrait) {
				const trait = TraitRepository[traitID as keyof typeof TraitRepository];
				if (!trait) {
					throw new Error(`Trait with id: ${traitID} not found.`);
				}
				this.removeTrait(trait);
			}
		}

		// Reduce ArcaneAptitude
		if (equipment.arcaneAptitude > 0) {
			this.arcaneAptitude.decreaseAptitude(equipment.arcaneAptitude)
		} else if (equipment.arcaneAptitude < 0) {
			this.arcaneAptitude.increaseAptitude(-(equipment.arcaneAptitude))
		}

		// Reduce Attack Bonuses
		if (equipment.attackStats?.bonus != null) {
			for (const stat in equipment.attackStats.bonus) {
				const bonusValue = equipment.attackStats.bonus[stat as keyof typeof equipment.attackStats.bonus];
				if (bonusValue && this.status.battlers.hasOwnProperty(stat)) {
					this.status.battlers[stat as keyof typeof this.status.battlers].bonus -= bonusValue;
				}
			}
		}

		// Reduce Attack Stats
		if (equipment.attackStats?.bonus != null) {
			for (const stat in equipment.attackStats.bonus) {
				const bonusValue = equipment.attackStats.bonus[stat as keyof typeof equipment.attackStats.bonus];
				if (bonusValue != null) {
					if (
						stat === "order" ||
						stat === "chaos" ||
						stat === "geo" ||
						stat === "water" ||
						stat === "air" ||
						stat === "fire"
					) {
						let statTarget = stat+"ATK"
						this.status.battlers[statTarget as keyof typeof this.status.battlers].bonus -= bonusValue;
					} else if (this.status.battlers.hasOwnProperty(stat)) {
						// Handle regular stats
						this.status.battlers[stat as keyof typeof this.status.battlers].bonus -= bonusValue;
					} else {
						throw new Error(`Stat ${stat} not found in character battlers.`);
					}
				}
			}
		}

		// Reduce Defense Stats
		if (position === "armor") {
			if (equipment instanceof GearInstance) {
				for (const defenseType in equipment.defenseStats) {
					if (defenseType !== null && defenseType !== undefined) {
						if (this.status.battlers.hasOwnProperty(defenseType)) {
							this.status.battlers[
								defenseType as keyof typeof this.status.battlers
							].bonus -=
								equipment.defenseStats[defenseType as keyof ArmorDefense]!;
						}
					}
				}
			}
		}

		this.equipments[position] = null;
		//TODO: add to inventory, if equipment.materail is 'magic_summoned' then destroy
		
		return this;
	}

	getWeapon(): GearInstance | "none" {
		return this.equipments.mainHand || this.equipments.offHand || "none";
	}

	//MARK: Training
	train(status: CharacterStatusEnum, amount: number) {
		if (this.level >= 20) { return; }

		let statObject: { base: number; bonus: number; exp: number };

		if (status in this.status.attributes) {
			statObject =
				this.status.attributes[status as keyof CharacterStatus["attributes"]];
		} else if (status in this.status.proficiencies) {
			statObject =
				this.status.proficiencies[
					status as keyof CharacterStatus["proficiencies"]
				];
		} else if (status in this.status.battlers) {
			statObject =
				this.status.battlers[status as keyof CharacterStatus["battlers"]];
		} else if (status in this.status.elements) {
			statObject =
				this.status.elements[status as keyof CharacterStatus["elements"]];
		} else {
			throw new Error(`Invalid stat type: ${status}`);
		}

		// Get the current stat base value
		const currentStat = statObject.base;

		if (currentStat >= 30) { return; } // Max stat is 30

		// Determine the stat range modifier
		const statRange = StatMod.value(currentStat);

		// Determine the amount of experience needed to level up based on the stat range
		let expNeeded: number;
		switch (statRange) {
			case -5:
				expNeeded = 100;
				break;
			case -4:
				expNeeded = 110;
				break;
			case -3:
				expNeeded = 120;
				break;
			case -2:
				expNeeded = 140;
				break;
			case -1:
				expNeeded = 160;
				break;
			case 0:
				expNeeded = 190;
				break;
			case 1:
				expNeeded = 220;
				break;
			case 2:
				expNeeded = 250;
				break;
			case 3:
				expNeeded = 290;
				break;
			case 4:
				expNeeded = 330;
				break;
			case 5:
				expNeeded = 380;
				break;
			case 6:
				expNeeded = 430;
				break;
			case 7:
				expNeeded = 490;
				break;
			case 8:
				expNeeded = 550;
				break;
			case 9:
				expNeeded = 620;
				break;
			case 10:
				expNeeded = 8000;
				break;
			default:
				expNeeded = 10000; // Just in case
				break;
		}

		// Calculate the experience gained
		const expGained = amount + Dice.roll(DiceEnum.TwoD10).sum;

		// Add the experience gained to the current stat's experience
		statObject.exp += expGained;

		// Check if the experience threshold for leveling up is met or exceeded
		if (statObject.exp >= expNeeded) {
			statObject.exp -= expNeeded; // Subtract the required experience from the current experience
			statObject.base++; // Increment the base stat
		}

		// give exp to player too
		if (this.level < 20) {
			this.gainExp(expGained);
		}
	}

	setAllBattleBonusToZero() {
		for (const key in this.status.attributes) {
			this.status.attributes[key as keyof CharacterStatus["attributes"]].battle = 0;
		}

		for (const key in this.status.proficiencies) {
			this.status.proficiencies[key as keyof CharacterStatus["proficiencies"]].battle = 0;
		}

		for (const key in this.status.battlers) {
			this.status.battlers[key as keyof CharacterStatus["battlers"]].battle = 0;
		}

		for (const key in this.status.elements) {
			this.status.elements[key as keyof CharacterStatus["elements"]].battle = 0;
		}

		for (const key in this.status.artisans) {
			this.status.artisans[key as keyof CharacterStatus["artisans"]].battle = 0;
		}
		return this;
	}

	clearBuffsAndDebuffs() {
		this.buffsAndDebuffs.clearBuffsAndDebuffs();
		return this;
	}

	toJson(): string {
		return JSON.stringify({
			id: this.id,
			partyID: this.partyID,
			name: this.name,
			type: this.type,
			gender: this.gender,
			portrait: this.portrait,
			background: this.background,
			alignment: this.alignment,
			mood: this.mood,
			energy: this.energy,
			fame: this.fame,
			level: this.level,
			gold: this.gold,
			exp: this.exp,
			isDead: this.isDead,
			baseHP: this.baseHP,
			baseMP: this.baseMP,
			baseSP: this.baseSP,
			currentHP: this.currentHP,
			currentMP: this.currentMP,
			currentSP: this.currentSP,
			status: this.status,
			equipments: this.equipments,
			internals: this.internals,
			activeInternal: this.activeInternal,
			traits: this.traits,
			skills: this.skills,
			activeSkills: this.activeSkills,
			internalBuffs: this.internalBuffs,
			position: this.position,
			itemsBag: this.itemsBag,
			baseAC: this.baseAC,
			location: this.location,
			arcaneAptitude: this.arcaneAptitude,
		});
	}
}

export class PlayerCharacter extends Character {
	bagSize: number;
	storyFlags: StoryFlags;
	userID: string;
	constructor(
		dto: {
			gender: "male" | "female" | "none",
			portrait: string,
			name: string,
			userID: string,
			charisma: number,
			luck: number,
			intelligence: number,
			leadership: number,
			vitality: number,
			willpower: number,
			breath: number,
			planar: number,
			dexterity: number,
			agility: number,
			strength: number,
			endurance: number,
			bareHand: number,
			sword: number,
			blade: number,
			dagger: number,
			spear: number,
			axe: number,
			mace: number,
			shield: number,
			bow: number,
			magicWand: number,
			staff: number,
			tome: number,
			orb: number,
			mining: number,
			smithing: number,
			woodcutting: number,
			carpentry: number,
			foraging: number,
			weaving: number,
			skinning: number,
			tanning: number,
			jewelry: number,
			alchemy: number,
			cooking: number,
			enchanting: number,
			selectedClass?: ClassEnum,
			selectedRace?: RaceEnum,
			selectedBackground?: BackgroundEnum,
		}
	) {
		super(uuidv4(), dto.name, dto.gender);
		this.userID = dto.userID;
		this.portrait = dto.portrait;
		this.bagSize = 15;
		this.storyFlags = new StoryFlags();
		this.status.attributes.agility.base = dto.agility;
		this.status.attributes.breath.base = dto.breath;
		this.status.attributes.charisma.base = dto.charisma;
		this.status.attributes.dexterity.base = dto.dexterity;
		this.status.attributes.endurance.base = dto.endurance;
		this.status.attributes.intelligence.base = dto.intelligence;
		this.status.attributes.leadership.base = dto.leadership;
		this.status.attributes.luck.base = dto.luck;
		this.status.attributes.planar.base = dto.planar;
		this.status.attributes.strength.base = dto.strength;
		this.status.attributes.vitality.base = dto.vitality;
		this.status.attributes.willpower.base = dto.willpower;
		this.status.proficiencies.bareHand.base = dto.bareHand;
		this.status.proficiencies.sword.base = dto.sword;
		this.status.proficiencies.blade.base = dto.blade;
		this.status.proficiencies.dagger.base = dto.dagger;
		this.status.proficiencies.spear.base = dto.spear;
		this.status.proficiencies.axe.base = dto.axe;
		this.status.proficiencies.mace.base = dto.mace;
		this.status.proficiencies.shield.base = dto.shield;
		this.status.proficiencies.bow.base = dto.bow;
		this.status.proficiencies.magicWand.base = dto.magicWand;
		this.status.proficiencies.staff.base = dto.staff;
		this.status.proficiencies.tome.base = dto.tome;
		this.status.proficiencies.orb.base = dto.orb;
		this.status.artisans.mining.base = dto.mining;
		this.status.artisans.smithing.base = dto.smithing;
		this.status.artisans.woodcutting.base = dto.woodcutting;
		this.status.artisans.carpentry.base = dto.carpentry;
		this.status.artisans.foraging.base = dto.foraging;
		this.status.artisans.weaving.base = dto.weaving;
		this.status.artisans.skinning.base = dto.skinning;
		this.status.artisans.tanning.base = dto.tanning;
		this.status.artisans.jewelry.base = dto.jewelry;
		this.status.artisans.alchemy.base = dto.alchemy;
		this.status.artisans.cooking.base = dto.cooking;
		this.status.artisans.enchanting.base = dto.enchanting;
		this.gold = 50;
		// Method for class selection
		setCharacterStatus(this, dto.selectedClass, dto.selectedRace, dto.selectedBackground)
	}
}


function switchClass(selectedClass?: ClassEnum): CharacterClass | null {
		switch (selectedClass) {
			case ClassEnum.CLERIC:
				return class_cleric;
			break;
			case ClassEnum.MAGE:
				return class_mage;
			break;
			case ClassEnum.SCOUT:
				return class_scout;
			break;
			case ClassEnum.HEXBINDER:
				return class_hexbinder;
			break;
			case ClassEnum.FIGHTER:
				return class_fighter;
			break;
			case ClassEnum.WARDEN:
				return class_warden;
			break;
			case ClassEnum.GUARDIAN:
				return class_guardian;
			break;
			case ClassEnum.SPELLBLADE:
				return class_spellblade;
			break;
			case ClassEnum.SKIRMISHER:
				return class_skirmisher;
			break;
			case ClassEnum.OCCULTIST:
				return class_occultist;
			break;
			case ClassEnum.SOLDIER:
				return class_soldier;
			break;
			case ClassEnum.TEMPLAR:
				return class_templar;
			break;
			default:
				return null;
			break;
		}
	return null;
}

function switchRace(selectedRace?: RaceEnum) {
	switch (selectedRace) {
		case RaceEnum.DWARF:
			return raceDwarf;
		break;
		case RaceEnum.DWARFLING:
			return raceDwarfling;
		break;
		case RaceEnum.ELVEN:
			return raceElven;
		break;
		case RaceEnum.ELVON:
			return raceElvon;
		break;
		case RaceEnum.HALFLING:
			return raceHalfling;
		break;
		case RaceEnum.HALF_ELF:
			return raceHalfElf;
		break;
		case RaceEnum.HALF_ORC:
			return raceHalfOrc;
		break;
		case RaceEnum.HALF_TRITON:
			return raceHalfTriton;
		break;
		case RaceEnum.HUMAN:
			return raceHuman;
		break;
		case RaceEnum.ORC:
			return raceOrc;
		break;
		case RaceEnum.TRITON:
			return raceTriton;
		break;
		default:
			return null;
		break;
	}
}

function switchBackground(selectedBackground?: BackgroundEnum) {
	switch (selectedBackground) {
		case BackgroundEnum.ABANDONED_FARMHAND:
			return backgroundAbandonedFarmhand;
		case BackgroundEnum.APPRENTICE_SCRIBE:
			return backgroundApprenticeScribe;
		case BackgroundEnum.FALLEN_NOBILITY:
			return backgroundFallenNobility;
		case BackgroundEnum.FAILED_CRAFTSMAN:
			return backgroundFailedCraftsman;
		case BackgroundEnum.INNKEEPERS_CHILD:
			return backgroundInnkeepersChild;
		case BackgroundEnum.DESERTED_MILITARY:
			return backgroundDesertedMilitary;
		case BackgroundEnum.MAGE_APPRENTICE:
			return backgroundMageApprentice;
		case BackgroundEnum.MERCS_CHILD:
			return backgroundMercsChild;
		case BackgroundEnum.STREET_URCHIN:
			return backgroundStreetUrchin;
		case BackgroundEnum.TAVERN_BRAWLER:
			return backgroundTavernBrawler;
		case BackgroundEnum.TRAINEE_IN_CARAVAN:
			return backgroundTraineeInCaravan;
		case BackgroundEnum.WANDERING_MUSICIAN:
			return backgroundWanderingMusician;
		default:
			return null;
	}
}



export async function setCharacterStatus(
	character: Character,
	classSelected?: ClassEnum ,
	raceSelected?: RaceEnum,
	backGroundSelected?: BackgroundEnum
) {
	let characterClass = switchClass(classSelected);
	let characterRace = switchRace(raceSelected);
	let characterBackground = switchBackground(backGroundSelected);

	if (characterClass != null) {
		for (const attribute in characterClass.bonusStats.attribute) {
			character.status.attributes[attribute as keyof CharacterStatus["attributes"]].base += 
			characterClass.bonusStats.attribute[attribute as keyof CharacterStatus["attributes"]];
		};
		for (const proficiency in characterClass.bonusStats.proficiency) {
			character.status.proficiencies[proficiency as keyof CharacterStatus["proficiencies"]].base += 
			characterClass.bonusStats.proficiency[proficiency as keyof CharacterStatus["proficiencies"]];
		};
		for (const artisan in characterClass.bonusStats.artisan) {
			character.status.artisans[artisan as keyof CharacterStatus["artisans"]].base += 
			characterClass.bonusStats.artisan[artisan as keyof CharacterStatus["artisans"]];
		};

		// for (const skill of characterClass.skills) {
		// 	await character.learnSkill(skill);
		// };
	
		for (let i = character.skills.length - 1; i >=0; i--) {
			let skill = character.skills[i];
			character.moveCardToBattle(skill.skill.id);
		};
	
		if (characterClass.gears.mainHand != null) {
			let mainHand = await db.getWeapon(characterClass.gears.mainHand);
			character.equip("mainHand", mainHand);
		}
	
		if (characterClass.gears.offHand != null) {
			let offHand = await db.getWeapon(characterClass.gears.offHand);
			character.equip("offHand", offHand);
		}
	
		if (characterClass.gears.armor != null) {
			let armor = await db.getArmor(characterClass.gears.armor);
			character.equip("armor", armor);
		}
	
		if (characterClass.gears.cloth != null) {
			let cloth = await db.getArmor(characterClass.gears.cloth);
			character.equip("cloth", cloth);
		}
	
		if (characterClass.traits.length > 0) {
			for (const traitID of characterClass.traits) {
				let trait = TraitRepository[traitID as keyof typeof TraitRepository];
				character.gainTrait(trait);
			}
		}
	}
	
	const raceAttributes = {
		[RaceEnum.DWARF]: dwarfRace,
		[RaceEnum.DWARFLING]: dwarflingRace,
		[RaceEnum.ELVEN]: elvenRace,
		[RaceEnum.ELVON]: elvonRace,
		[RaceEnum.HALFLING]: halflingRace,
		[RaceEnum.HALF_ELF]: halfElvenRace,
		[RaceEnum.HALF_ORC]: halfOrcRace,
		[RaceEnum.HALF_TRITON]: halfTritonRace,
		[RaceEnum.HUMAN]: humanRace,
		[RaceEnum.ORC]: orcRace,
		[RaceEnum.TRITON]: tritonRace,
	};

	if (raceSelected != null) {
		for (const attribute in character.status.attributes) {
			character.status.attributes[attribute as keyof CharacterStatus["attributes"]].base += 
			raceAttributes[raceSelected as keyof typeof raceAttributes][attribute as keyof CharacterStatus["attributes"]];
		}
	
		character.raceHP = raceAttributes[raceSelected as keyof typeof raceAttributes].hp;
		character.raceMP = raceAttributes[raceSelected as keyof typeof raceAttributes].mp;
		character.raceSP = raceAttributes[raceSelected as keyof typeof raceAttributes].sp;
	
		for (const traitEnum of raceAttributes[raceSelected as keyof typeof raceAttributes].traits) {
			let trait = TraitRepository[traitEnum as keyof typeof TraitRepository];
			character.gainTrait(trait);
		}	
	}
}

