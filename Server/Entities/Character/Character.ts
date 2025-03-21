import { CharacterStatus } from "./Subclasses/CharacterStatus";
import { CharacterResources } from "./Subclasses/CharacterResources";
import { CharacterEquipments } from "./Subclasses/CharacterEquipments";
import { StatMod } from "../../Utility/StatMod";
import { Dice } from "../../Utility/Dice";
import { EffectAppender } from "../../Game/Battle/EffectResolverAndAppender/EffectAppender";
import { EffectResolver } from "../../Game/Battle/EffectResolverAndAppender/EffectResolver";
import { BuffsAndDebuffs } from "./Subclasses/BuffsAndDebuffs";
import { ItemBag } from "../Items/Items";
import { CharacterAlignment } from "./Subclasses/CharacterAlignment";
import { CharacterType } from "./Enums/CharacterType";
import { Trait, TraitRepository } from "../Traits/Trait";
import { TraitEnum } from "../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ArmorDefense } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/interfaces";
import { CharacterArcaneAptitude } from "./Subclasses/CharacterArcaneAptitude";
import {
	SuccessResponse,
	ErrorResponse,
} from "../../API/WebSocket/ResponseType";
import {
	EffectAppenderSendObject,
	EffectResolverSendObject,
	EffectReturnObject,
} from "../../Game/Battle/EffectResolverAndAppender/EffectSend + Receive Objects";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import {
	ArtisanMap,
	AttributeMap,
	CoreElementMap,
	ProficiencyMap,
} from "./Subclasses/CharacterDataEnum";
import { DamageTypes } from "../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { StoryFlags } from "../../Game/StoryEvent/StoryFlags";
import { Skill } from "../Skills/Skill";
import { db } from "../../Database";
import {
	SkillActionObject,
	SkillApplyEffect,
	SkillActionType,
	SkillActionSubType,
	SpecialEffectResult,
} from "../Skills/SubClasses/SkillActiveEffect";
import { BuffsAndDebuffsEnum } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { SkillConsume, SkillProduce } from "../Skills/SubClasses/SkillConsume";
import { calculateBaseStat } from "./CalculateHPMPSP";
import {
	CharacterClass,
	class_cleric,
	class_fighter,
	class_guardian,
	class_hexbinder,
	class_mage,
	class_occultist,
	class_scout,
	class_skirmisher,
	class_soldier,
	class_spellblade,
	class_templar,
	class_warden,
} from "../../API/Routes/CreateCharacter/ClassEnum";
import {
	RaceEnum,
	ClassEnum,
	BackgroundEnum,
} from "../../../Common/RequestResponse/characterCreation";
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
	backgroundWanderingMusician,
} from "../../../Common/Entity/raceClassBackground";
import { CharacterInterface } from "../../../Common/RequestResponse/characterWS";
import { Weapon } from "../Items/Equipments/Weapon/Weapon";
import { Armor } from "../Items/Equipments/Armors/Armor";
import { getItem } from "../Items/Repository";
import { Equipment } from "../Items/Equipments/Equipment";
import { skillRepository } from "../Skills/SkillRepository";
import {
	SkillConsumeInterface,
	SkillProduceInterface,
} from "../../../Common/DTOsEnumsInterfaces/Skill/Consume+Produce";
import { SkillResponseType } from "../../API/ResponseTypes/Skill";
import { getAutoSkill } from "../../Game/Battle/Calculators/getAutoSkill";
import { isSkillPlayable } from "../../Game/Battle/Calculators/isSkillPlayable";
import { calculateAttackModifiers } from "../../Game/Battle/Calculators/calculateAttckModifiers";
import { CharacterBattleContext } from "./CharacterBattleContext";
import { EquipmentType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { AccessoryType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { WeaponType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ArmorType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { BattleDamageObject } from "./BattleDamageObject";
import { RelationShipStatusEnum } from "./RelationshipStatusEnum";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { getExpNeededForSkill, getExpNeededForStatus, getLevelContribution } from "./getLevelContribution";

export class Character {
	id: string;
	partyID: string | "none" = "none";
	name: string;
	type: CharacterType;
	gender: "MALE" | "FEMALE" | "NONE";
	portrait: any = null;
	background: string = "";
	race: RaceEnum;
	alignment: CharacterAlignment = new CharacterAlignment({
		good: 0,
		evil: 0,
		law: 0,
		chaos: 0,
	});
	mood: number = 100;
	energy: number = 100;
	satiety: number = 100;
	fame: number = 0;
	level: number = 1;
	gold: number = 0;
	statTracker: number = 0;
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
	traits: Trait[] = [];
	skills: { skill: Skill; level: number; exp: number }[] = [];
	activeSkills: { skill: Skill; level: number; exp: number }[] = [];
	buffsAndDebuffs: BuffsAndDebuffs = new BuffsAndDebuffs();
	resources: CharacterResources = new CharacterResources();
	position: number = 0;
	itemsBag: ItemBag = new ItemBag();
	baseAC: number = 7;
	location: string = "none";
	isSummoned: boolean = false;
	arcaneAptitude: CharacterArcaneAptitude = new CharacterArcaneAptitude();
	bagSize: number = 20;
	storyFlags: StoryFlags;
	// Relationship to other characters, key = character ID, value = relation value from -100 to 100, and status is the relationship status enum
	relation: { [key: string]: { value: number; status: RelationShipStatusEnum } } = {};
	isPlayerCharacter: boolean = false;
	constructor(data: {
		id: string;
		name: string;
		gender: "MALE" | "FEMALE" | "NONE";
		portrait: string;
	}) {
		this.id = data.id;
		this.name = data.name;
		this.type = CharacterType.none;
		this.gender = data.gender;
		this.race = RaceEnum.UNDEFINED;
		this.portrait = data.portrait || null;
		this.background = "";
		this.alignment = new CharacterAlignment({
			good: 0,
			evil: 0,
			law: 0,
			chaos: 0,
		});
		this.mood = 100;
		this.energy = 100;
		this.fame = 0;
		this.level = 1;
		this.gold = 0;
		this.statTracker = 0;
		this.isDead = false;
		this.abGauge = 0;
		this.lastTarget = null;
		this.raceHP = 0;
		this.raceMP = 0;
		this.raceSP = 0;
		this.baseHP = 1;
		this.baseMP = 1;
		this.baseSP = 1;
		this.bonusHP = 0;
		this.bonusMP = 0;
		this.bonusSP = 0;
		this.currentHP = 1;
		this.currentMP = 1;
		this.currentSP = 1;
		this.status = new CharacterStatus();
		this.equipments = new CharacterEquipments();
		this.traits = [];
		this.skills = [];
		this.activeSkills = [];
		this.buffsAndDebuffs = new BuffsAndDebuffs();
		this.resources = new CharacterResources();
		this.position = 0;
		this.itemsBag = new ItemBag();
		this.baseAC = 7;
		this.location = "none";
		this.isSummoned = false;
		this.arcaneAptitude = new CharacterArcaneAptitude();
		this.bagSize = 15;
		this.storyFlags = new StoryFlags();
	}

	setBodyValue(): Character {
		this.setBaseHP().setBaseMP().setBaseSP();
		this.currentHP = this.maxHP();
		this.currentMP = this.maxMP();
		this.currentSP = this.maxSP();
		return this;
	}

	setBaseHP(): Character {
		this.baseHP = calculateBaseStat(
			this.baseHP,
			this.level,
			this.attribute("vitality")
		);
		return this;
	}
	setBaseMP(): Character {
		this.baseMP = calculateBaseStat(
			this.baseMP,
			this.level,
			this.attribute("planar")
		);
		return this;
	}
	setBaseSP(): Character {
		this.baseSP = calculateBaseStat(
			this.baseSP,
			this.level,
			this.attribute("endurance")
		);
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
			(this.status.elements[element as keyof CharacterStatus["elements"]].base +
				this.status.elements[element as keyof CharacterStatus["elements"]]
					.bonus +
				this.status.elements[element as keyof CharacterStatus["elements"]]
					.battle) /
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
		
		if (this.buffsAndDebuffs.cursed > 0) {
			let cursedRoll = Dice.roll(DiceEnum.OneD4).sum;
			buffModifier -= cursedRoll;
			console.log(`${this.name} get -${cursedRoll} from cursed roll`);
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

	gainStatTracker(statValue: number): void {
		let levelUpStatNeeded = this.getLevelUpStatNeeded();

		if (this.level >= 30) {
			this.statTracker = levelUpStatNeeded; // Level capped at 30
			return;
		}

		this.statTracker += statValue;

		while (this.statTracker >= levelUpStatNeeded && this.level < 30) {
			this.statTracker -= levelUpStatNeeded; // Keep excess points
			this.levelUp();
			levelUpStatNeeded = this.getLevelUpStatNeeded(); // Update required stats for new level
		}

		if (this.level === 30) {
			this.statTracker = levelUpStatNeeded; // Ensure exp is maxed at level 20
		}
	}

	// Method to get the experience needed for the next level
	getLevelUpStatNeeded(): number {
		return 5 + (this.level * 2);
	}

	levelUp(): Character {
		this.level += 1;
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
			this.status.artisans[artisan as keyof CharacterStatus["artisans"]].base +=
				artisanRolls[index] === 20 ? 1 : 0;
		});
		this.setBodyValue();
		return this;
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
	async learnSkill(skillID: string): Promise<void> {
		const skill = await skillRepository.getSkill(skillID);

		if (
			this.skills.some((s) => s.skill.id === skillID) ||
			this.activeSkills.some((s) => s.skill.id === skillID)
		) {
			console.log(`Skill with id ${skillID} is already learned`);
		}

		if (!this.validateSkillLearning(skill)) {
			console.log(`Not eligible to learn skill with id ${skillID}`);
		}

		this.gainStatTracker(getLevelContribution(1, skill.tier));
		this.skills.push({ skill: skill, level: 1, exp: 0 });
	}

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

	async trainSkill(
		skillID: string,
	): Promise<SkillResponseType> {
		let skill = this.skills.find((s) => s.skill.id === skillID);
		if (!skill) {
			skill = this.activeSkills.find((s) => s.skill.id === skillID);
		}
		if (!skill) {
			throw new Error(`Skill with id ${skillID} not found in this character`);
		}

		function tierToMaxLevel(tier: Tier) {
			switch (tier) {
				case Tier.common || Tier.uncommon: return 5 ;
				case Tier.rare || Tier.epic: return 7;
				case Tier.legendary || Tier.unique: return 10;
				case Tier.divine: return 15;
				default: return 5;
			}
		}

		let maxLevel = tierToMaxLevel(skill.skill.tier);

		if (skill.level >= maxLevel) {
			return SkillResponseType.SuccessButMaxLevelReached;
		} 

		const expNeeded = getExpNeededForSkill(skill.level, skill.skill.tier);

		const expGained = Dice.rollTwenty() + StatMod.value(this.attribute(CharacterStatusEnum.intelligence));
		skill.exp += expGained;
		if (skill.exp >= expNeeded) {
			skill.level++;
			skill.exp -= expNeeded;
			this.gainStatTracker(getLevelContribution(skill.level, skill.skill.tier));
			return SkillResponseType.SuccessTrainingWithLevelUp;
		}
		return SkillResponseType.SuccessTrainingWithoutLevelUp;
	}

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
			const skillObject = await skillRepository.getSkill(skill.skill.id);

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
			const skillObject = await skillRepository.getSkill(skill.skill.id);
			for (const element of skillObject.consume.elements) {
				if (element.amount[skill.level - 1] > 0) {
					elementNeededArray.push(element.element);
				}
			}
		}

		let elementProducedArray = [];
		for (const skill of this.activeSkills) {
			const skillObject = await skillRepository.getSkill(skill.skill.id);
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

	async moveCardToBattle(skillID: string): Promise<{
		character: Character;
		response: SuccessResponse;
	}> {
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

	async moveCardToSkills(skillID: string): Promise<{
		character: Character;
		response: SuccessResponse | ErrorResponse;
	}> {
		const skillObject = await skillRepository.getSkill(skillID);
		if (skillObject.isAuto) {
			let autoCardCount = 0;
			for (const skill of this.activeSkills) {
				const skillObject = await skillRepository.getSkill(skill.skill.id);
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
	replenishResources() {
		this.calculateElementReplenish();
		this.calculateSPandMPReplenish();		
	}

	private calculateSPandMPReplenish() {
		let staminaDice = Dice.roll(DiceEnum.OneD3).sum;
		let manaDice = Dice.roll(DiceEnum.OneD3).sum;
		let breathModifier = Math.max(this.getModifier(CharacterStatusEnum.breath), 0);
		let planarModifier = Math.max(this.getModifier(CharacterStatusEnum.planar), 0);
		let enduranceModifier = Math.max(this.getModifier(CharacterStatusEnum.endurance), 0);
		
		const armorPenaltyMap: Record<ArmorType, number> = {
			[ArmorType.cloth]: 0,
			[ArmorType.light]: 1,
			[ArmorType.medium]: 2,
			[ArmorType.heavy]: 3,
		};
		
		let armorpenalty = 0;
		if (this.equipments.armor !== undefined && this.equipments.armor.armorType !== null) {
			armorpenalty = armorPenaltyMap[this.equipments.armor?.armorType]
		}

		this.currentSP += Math.max(staminaDice - armorpenalty + breathModifier + enduranceModifier, 0);
		this.currentMP += Math.max(manaDice - armorpenalty + breathModifier + planarModifier, 0);
	}

	private calculateElementReplenish() {
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
	}

	async getSkillThatCanBePlay(skillPosition?: number): Promise<{
		skillThatCanBePlay: Skill;
		skillLevel: number;
		skillPosition: number;
	}> {
		if (!skillPosition) {
			skillPosition = 0;
		}

		if (skillPosition >= this.activeSkills.length) {
			return await getAutoSkill(this.status.strength(), this.status.planar());
		}

		const { skill, level } = this.activeSkills[skillPosition];

		if (!isSkillPlayable(this.resources, this.currentHP, this.currentMP, this.currentSP, this.equipments, skill, level)) {
			return this.moveToNextSkill(skillPosition);
		}

		return {
			skillThatCanBePlay: skill,
			skillLevel: level,
			skillPosition: skillPosition,
		};
	}

	private async moveToNextSkill(skillPosition: number): Promise<{
		skillThatCanBePlay: Skill;
		skillLevel: number;
		skillPosition: number;
	}> {
		skillPosition++;
		return await this.getSkillThatCanBePlay(skillPosition);
	}

	//MARK:: ATTACK
	playNegativeSkill({
		target,
		damageObject,
		skillLevel,
		isWeaponAttack,
	}: {
		target: Character;
		damageObject: BattleDamageObject;
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
			`${this.name} is attacking ${target.name}(HP:${
				target.currentHP
			}/${target.maxHP()}) with ${damageObject.baseDamage} ${damageObject.type} damage`
		);

		let isHit = false;
		let isCrit = damageObject.crit;
		let finalDamage = damageObject.baseDamage;
		let effectResults: EffectReturnObject[] = [];
		let damageType: DamageTypes[] = [];

		// This only calculate 'Target' modifier from buff and trait, that means we only support skill with 'target' condition for onw
		// TODO: Add 'actor' condition for skill
		const { traitModifier, buffModifier } = calculateAttackModifiers(
			damageObject,
			target.intoBattleContext()
		);

		// Check for a critical miss
		if (damageObject.hit === 1 && !damageObject.trueHit) {
			console.log(`Critical Miss!`);
			return {
				actor: this,
				target: target,
				damageObjectResult: {
					isHit: false,
					isCrit: false,
					baseDamage: 0,
					damageType: [],
				},
				effectRecorded: [],
				skillActionSubType: damageObject.skillActionSubType,
			};
		}

		// Check for a critical hit
		if (isCrit && !damageObject.trueHit) {
			finalDamage = getCriticalModifiedDamage(this, finalDamage); 
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

		finalDamage *= traitModifier * buffModifier;
		
		// Special Effect Condition
		let additionalApplyEffect:
			| { type: BuffsAndDebuffsEnum; duration: number }
			| undefined = undefined;

		if (damageObject.specialEffect !== undefined) {
			const specialEffect = damageObject.specialEffect;
			const isSkillLevelMet = skillLevel >= (specialEffect.condition?.skillLevel ?? 1);
			
			if (				
				this.checkSpecialEffectCondition(
					specialEffect.condition.actor?.stat,
					specialEffect.condition.actor?.trait,
					specialEffect.condition.actor?.buff
				) && isSkillLevelMet
			) {
				console.log(`Special Effect Condition Met`);
				if (specialEffect.effect.damage) finalDamage += specialEffect.effect.damage;
				if (specialEffect.effect.damageMultiplier) finalDamage *= specialEffect.effect.damageMultiplier;
				if (specialEffect.effect.buffsOrDebuffs) {
					additionalApplyEffect = {
						type: specialEffect.effect.buffsOrDebuffs.type,
						duration: specialEffect.effect.buffsOrDebuffs.duration,
					};
				}
			}
		}

		// Attempt to deal damage to the target
		console.log(`Damage: ${finalDamage}, type: ${damageObject.type}, hit: ${damageObject.hit}`);

		const afterAttackResult = target.receiveDamage({
			attacker: this,
			damage: finalDamage,
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
			let effectResult = weaponAttackAdditionalEffect(this, target, skillLevel);
			effectResults.push(...effectResult)
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
		let dodgeChance = this.battler("dodge") + this.getModifier(CharacterStatusEnum.agility) + this.baseAC;
		if (dodgeChance >= hitChance) {
    		console.log(`${this.name} dodged the attack!`);
    		return { actor: attacker, target: this, damage: 0, damageType, dHit: false };
		}

		let isNotStoppedByReaction: boolean = true;
		let reactive_skills = this.activeSkills.filter(
			(skill) => skill.skill.isReaction
		);
		if (reactive_skills.length > 0) {
			for (const skill of reactive_skills) {
				if (
					isSkillPlayable(this.resources, this.currentHP, this.currentMP, this.currentSP, this.equipments, skill.skill, skill.level)
				) {
					for (const activeEffect of skill.skill.activeEffect) {
						for (const actionObject of activeEffect.skillActionObjects) {
							switch (
								actionObject.type
								// Playing reaction skill might return a boolean value, to decided if the attacker should continue attacking or not
							) {
							}
						}
					}
				}
			}
		}

		if (!isNotStoppedByReaction) {
			// TODO: Should add a message that the attack is stopped by a reaction skill.
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
			this.buffsAndDebuffs.divineShield > 0
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
			let arcaneShieldAbsorb =
				damage - arcaneShieldCapacity > 0 ? arcaneShieldCapacity : damage;
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
		let finalHealing = -damageObject.baseDamage;
		let effectResults: EffectReturnObject[] = [];

		if (damageObject.crit) {
			finalHealing *= 1.5;
			console.log(`Critical Heal!`);
		}

		let specialHealing = 0;
		// TODO: Special healing traits

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

		console.log(
			`${this.name} healed for ${healing}: ${this.currentHP}/${this.maxHP()}`
		);
		return this.hpUp(healing);
	}

	//MARK: INFLICT EFFECT
	inflictEffect(
		target: Character,
		applyEffect: SkillApplyEffect,
		skillLevel: number
	): EffectReturnObject {
		const totalHitChance = this.calculateTotalHitChance(applyEffect, skillLevel);
		const duration = this.calculateEffectDuration(applyEffect, skillLevel);

		console.log(
			`${this.name} is trying to inflict ${applyEffect.effectName} to ${target?.name} with DC ${totalHitChance}`
		);

		return target.effectInflicted(
			this.getEffectName(applyEffect, skillLevel),
			totalHitChance,
			duration,
			applyEffect.effectStatForResistance,
			this.shouldApplyWithoutHit(applyEffect, skillLevel)
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
		if (applyWithoutHit) {
			return this.applyEffect(effect, effectDuration);
		}

		let [diceRoll, baseModifier, buffModifier] = this.saveRoll(savingStatModifier);

		if (this.isNaturalSave(diceRoll, effect)) {
			return this.createEffectReturnObject();
		}

		let totalSaves = this.calculateTotalSaves(diceRoll, baseModifier, buffModifier);

		if (this.shouldRerollSave(totalSaves, hitChance, diceRoll, "cursed")) {
			[diceRoll, baseModifier, buffModifier] = this.saveRoll(savingStatModifier);
			totalSaves = this.calculateTotalSaves(diceRoll, baseModifier, buffModifier);
		}

		if (this.shouldRerollSave(totalSaves, hitChance, diceRoll, "bless")) {
			[diceRoll, baseModifier, buffModifier] = this.saveRoll(savingStatModifier);
			totalSaves = this.calculateTotalSaves(diceRoll, baseModifier, buffModifier);
		}

		totalSaves = this.applyBuffModifiers(totalSaves);

		if (totalSaves >= hitChance) {
			console.log(`${this.name} saved from ${effect}`);
			return this.createEffectReturnObject();
		}

		return this.applyEffect(effect, effectDuration);
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

				const result: EffectReturnObject = resolverFunction(this);
				//Unwrapping result
				this.buffsAndDebuffs = result.buffsAndDebuffs;
				this.status = result.status;

				// if (result.damage !== undefined && result.type === 'hpDown') {
				// 	this.receiveDamage({
				// 		attacker: this,
				// 		damage: result.damage.amount,
				// 		hitChance: 1000,
				// 		damageType: result.damage.type,
				// 	});
				// }

				// Or should we just brute forcing health down buff here?

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
	async equip(
		position:
			| "mainHand"
			| "offHand"
			| "armor"
			| "headwear"
			| "gloves"
			| "boots"
			| "necklace"
			| "ring_R"
			| "ring_L",
		equipment: string
	): Promise<Character> {
		let equipmentInstance = getItem(equipment) as Equipment;

		if (equipmentInstance === undefined || equipmentInstance === null) {
			switch (position) {
				case "mainHand":
					equipmentInstance = await db.getWeapon(equipment);
					break;
				case "offHand":
					equipmentInstance = await db.getWeapon(equipment);
					break;
				case "armor":
					equipmentInstance = await db.getArmor(equipment);
					break;
				case "headwear":
					equipmentInstance = await db.getArmor(equipment);
					break;
				case "gloves":
					equipmentInstance = await db.getArmor(equipment);
					break;
				case "boots":
					equipmentInstance = await db.getArmor(equipment);
					break;
				case "necklace":
					equipmentInstance = await db.getAccessory(equipment);
					break;
				case "ring_R":
					equipmentInstance = await db.getAccessory(equipment);
					break;
				case "ring_L":
					equipmentInstance = await db.getAccessory(equipment);
					break;
			}
		}

		// If equipment is still undefined, throw an error
		if (equipmentInstance === undefined) {
			throw new Error(`Equipment ${equipment} not found in database!`);
		}

		if (this.equipments[position] !== undefined) {
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
					equipmentInstance.attackStats?.handle === 2 &&
					this.equipments.offHand !== undefined
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
					equipmentInstance.attackStats?.handle === 2 &&
					this.equipments.mainHand !== undefined
				) {
					//can't equip this
					return this;
				}
				break;
		}

		// Apply ArcaneAptitude
		if (equipmentInstance.arcaneAptitude > 0) {
			this.arcaneAptitude.increaseAptitude(equipmentInstance.arcaneAptitude);
		} else if (equipmentInstance.arcaneAptitude < 0) {
			this.arcaneAptitude.decreaseAptitude(-equipmentInstance.arcaneAptitude);
		}

		// Apply Attack Bonuses
		if (equipmentInstance.attackStats?.bonus != null) {
			for (const stat in equipmentInstance.attackStats.bonus) {
				const bonusValue =
					equipmentInstance.attackStats.bonus[
						stat as keyof typeof equipmentInstance.attackStats.bonus
					];
				if (bonusValue && this.status.battlers.hasOwnProperty(stat)) {
					this.status.battlers[
						stat as keyof typeof this.status.battlers
					].bonus += bonusValue;
				}
			}
		}

		// Applying Attack Stats
		if (equipmentInstance.attackStats?.bonus != null) {
			for (const stat in equipmentInstance.attackStats.bonus) {
				const bonusValue =
					equipmentInstance.attackStats.bonus[
						stat as keyof typeof equipmentInstance.attackStats.bonus
					];
				if (bonusValue != null) {
					if (
						stat === "order" ||
						stat === "chaos" ||
						stat === "geo" ||
						stat === "water" ||
						stat === "air" ||
						stat === "fire"
					) {
						let statTarget = stat + "ATK";
						this.status.battlers[
							statTarget as keyof typeof this.status.battlers
						].bonus += bonusValue;
					} else if (this.status.battlers.hasOwnProperty(stat)) {
						// Handle regular stats
						this.status.battlers[
							stat as keyof typeof this.status.battlers
						].bonus += bonusValue;
					} else {
						throw new Error(`Stat ${stat} not found in character battlers.`);
					}
				}
			}
		}

		// Apply defense stats
		if (equipmentInstance.defenseStats != null) {
			for (const stat in equipmentInstance.defenseStats) {
				const defenseValue =
					equipmentInstance.defenseStats[
						stat as keyof typeof equipmentInstance.defenseStats
					];

				if (defenseValue != null) {
					if (this.status.battlers.hasOwnProperty(stat)) {
						this.status.battlers[
							stat as keyof typeof this.status.battlers
						].bonus += defenseValue;
					} else {
						throw new Error(`Stat ${stat} not found in character battlers.`);
					}
				}
			}
		}

		this.equipments[position] = equipmentInstance;

		return this;
	}

	unequip(
		position:
			| "mainHand"
			| "offHand"
			| "armor"
			| "headwear"
			| "gloves"
			| "boots"
			| "necklace"
			| "ring_R"
			| "ring_L"
	): Character {
		if (this.equipments[position] === undefined) {
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
			this.arcaneAptitude.decreaseAptitude(equipment.arcaneAptitude);
		} else if (equipment.arcaneAptitude < 0) {
			this.arcaneAptitude.increaseAptitude(-equipment.arcaneAptitude);
		}

		// Reduce Attack Bonuses
		if (equipment.attackStats?.bonus != null) {
			for (const stat in equipment.attackStats.bonus) {
				const bonusValue =
					equipment.attackStats.bonus[
						stat as keyof typeof equipment.attackStats.bonus
					];
				if (bonusValue && this.status.battlers.hasOwnProperty(stat)) {
					this.status.battlers[
						stat as keyof typeof this.status.battlers
					].bonus -= bonusValue;
				}
			}
		}

		// Reduce Attack Stats
		if (equipment.attackStats?.bonus != null) {
			for (const stat in equipment.attackStats.bonus) {
				const bonusValue =
					equipment.attackStats.bonus[
						stat as keyof typeof equipment.attackStats.bonus
					];
				if (bonusValue != null) {
					if (
						stat === "order" ||
						stat === "chaos" ||
						stat === "geo" ||
						stat === "water" ||
						stat === "air" ||
						stat === "fire"
					) {
						let statTarget = stat + "ATK";
						this.status.battlers[
							statTarget as keyof typeof this.status.battlers
						].bonus -= bonusValue;
					} else if (this.status.battlers.hasOwnProperty(stat)) {
						// Handle regular stats
						this.status.battlers[
							stat as keyof typeof this.status.battlers
						].bonus -= bonusValue;
					} else {
						throw new Error(`Stat ${stat} not found in character battlers.`);
					}
				}
			}
		}

		// Reduce Defense Stats
		if (position === "armor") {
			if (equipment instanceof Armor) {
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

		this.equipments[position] = undefined;
		//TODO: add to inventory, if equipment.materail is 'magic_summoned' then destroy

		return this;
	}

	getWeapon(): Weapon | "none" {
		return this.equipments.mainHand || this.equipments.offHand || "none";
	}

	//MARK: Training
	train(status: CharacterStatusEnum) {
		if (this.level >= 20) {
			return;
		}

		let statObject: { base: number; bonus: number; exp: number };

		if (status in this.status.attributes) {
			statObject = this.status.attributes[status as keyof CharacterStatus["attributes"]];
		} else if (status in this.status.proficiencies) {
			statObject = this.status.proficiencies[status as keyof CharacterStatus["proficiencies"]];
		} else if (status in this.status.artisans) {
			statObject = this.status.artisans[status as keyof CharacterStatus["artisans"]];
		} else {
			throw new Error(`Invalid stat type: ${status}`);
		}

		const currentStat = statObject.base;

		if (currentStat >= 30) {
			return;
		}

		const expNeeded = getExpNeededForStatus(currentStat);

		const expGained = Dice.rollTwenty() + StatMod.value(this.attribute(CharacterStatusEnum.intelligence));

		statObject.exp += expGained;

		if (statObject.exp >= expNeeded) {
			statObject.exp -= expNeeded;
			statObject.base++;
			// Increase stat tracker for level up, 
			const statTrackGain = Math.max(StatMod.value(statObject.base), 0) + 1; 

			this.gainStatTracker(statTrackGain)
		}
	}

	setAllBattleBonusToZero() {
		for (const key in this.status.attributes) {
			this.status.attributes[
				key as keyof CharacterStatus["attributes"]
			].battle = 0;
		}

		for (const key in this.status.proficiencies) {
			this.status.proficiencies[
				key as keyof CharacterStatus["proficiencies"]
			].battle = 0;
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
			exp: this.statTracker,
			isDead: this.isDead,
			baseHP: this.baseHP,
			baseMP: this.baseMP,
			baseSP: this.baseSP,
			currentHP: this.currentHP,
			currentMP: this.currentMP,
			currentSP: this.currentSP,
			status: this.status,
			equipments: this.equipments,
			traits: this.traits,
			skills: this.skills,
			activeSkills: this.activeSkills,
			position: this.position,
			itemsBag: this.itemsBag,
			baseAC: this.baseAC,
			location: this.location,
			arcaneAptitude: this.arcaneAptitude,
		});
	}

	intoInterface(): CharacterInterface {
		return {
			id: this.id,
			partyID: this.partyID,
			name: this.name,
			type: this.type,
			gender: this.gender,
			portrait: this.portrait,
			background:
				BackgroundEnum[this.background as keyof typeof BackgroundEnum],
			race: RaceEnum[this.race as keyof typeof RaceEnum],
			alignment: this.alignment.intoInterface(),
			mood: this.mood,
			energy: this.energy,
			fame: this.fame,
			level: this.level,
			gold: this.gold,
			isDead: this.isDead,
			status: this.status.intoInterface(),
			equipment: this.equipments.intoInterface(),
			traits: this.traits.map((trait) => ({
				id: trait.id,
				name: trait.name,
				description: trait.description,
			})),
			skills: this.skills.map((skill) => ({
				id: skill.skill.id,
				name: skill.skill.name,
				level: skill.level,
				description: skill.skill.baseDescription,
				tier: skill.skill.tier,
				consume: turnConsumeIntoInterface(skill.skill.consume),
				produce: turnProduceIntoInterface(skill.skill.produce),
				isSpell: skill.skill.isSpell,
				equipmentRequirements: skill.skill.equipmentNeeded.weapon
					? skill.skill.equipmentNeeded.weapon
					: [],
			})),
			activeSkills: this.activeSkills.map((skill) => ({
				id: skill.skill.id,
				name: skill.skill.name,
				level: skill.level,
				description: skill.skill.baseDescription,
				tier: skill.skill.tier,
				consume: turnConsumeIntoInterface(skill.skill.consume),
				produce: turnProduceIntoInterface(skill.skill.produce),
				isSpell: skill.skill.isSpell,
				equipmentRequirements: skill.skill.equipmentNeeded.weapon
					? skill.skill.equipmentNeeded.weapon
					: [],
			})),
			position: this.position,
			itemsBag: this.itemsBag.intoInterface(),
			arcaneAptitude: this.arcaneAptitude.intoInterface(),
			bagSize: this.bagSize,
			currentHP: this.currentHP,
			currentMP: this.currentMP,
			currentSP: this.currentSP,
			maxHP: this.maxHP(),
			maxMP: this.maxMP(),
			maxSP: this.maxSP(),
		};
	}

	intoBattleContext(): CharacterBattleContext {
		return {
			actorID: this.id,
			actorPosition: this.position,
			actorEquipment: {
				mainHand: this.equipments.mainHand?.weaponSpecificType ?? null,
				offHand: this.equipments.offHand?.weaponSpecificType ?? null,
				armor: this.equipments.armor?.armorType ?? null,
				Headwear: this.equipments.headwear ? EquipmentType.Headwear : null,
				gloves: this.equipments.gloves ? EquipmentType.gloves : null,
				boots: this.equipments.boots ? EquipmentType.boots : null,
				necklace: this.equipments.necklace ? AccessoryType.necklace : null,
				ring_R: this.equipments.ring_R ? AccessoryType.ring : null,
				ring_L: this.equipments.ring_L ? AccessoryType.ring : null,
			},
			actorStats: this.status.getStats(),
			actorBuffs: this.buffsAndDebuffs.getBuffsAndDebuffs(),
			actorTraits: this.getTraits(),
		};
	}

	// MARK: PRIVATE METHODS + HELPERS
	private calculateTotalHitChance(
		applyEffect: SkillApplyEffect,
		skillLevel: number
	): number {
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

		if (this.shouldApplyWithoutHit(applyEffect, skillLevel)) {
			totalHitChance = 9999;
		}

		return totalHitChance;
	}

	private calculateEffectDuration(
		applyEffect: SkillApplyEffect,
		skillLevel: number
	): number {
		let duration =
			applyEffect.effectDuration.length === 0
				? 0
				: applyEffect.effectDuration.length === 1
				? applyEffect.effectDuration[0]
				: applyEffect.effectDuration[skillLevel - 1];

		const durationBonuses =
			applyEffect.effectDurationBonus.length === 1
				? [applyEffect.effectDurationBonus[0]]
				: applyEffect.effectDurationBonus.length > 0
				? [applyEffect.effectDurationBonus[skillLevel - 1]]
				: [];

		for (const bonus of durationBonuses) {
			duration += this.getModifier(bonus);
		}

		return duration;
	}

	private getEffectName(
		applyEffect: SkillApplyEffect,
		skillLevel: number
	): BuffsAndDebuffsEnum {
		return applyEffect.effectName[
			applyEffect.effectName.length === 1 ? 0 : skillLevel - 1
		];
	}

	private shouldApplyWithoutHit(
		applyEffect: SkillApplyEffect,
		skillLevel: number
	): boolean {
		return (
			applyEffect.applyWithoutHit.length === 1
				? applyEffect.applyWithoutHit[0]
				: applyEffect.applyWithoutHit[skillLevel - 1]
		) === true;
	}


	private isNaturalSave(diceRoll: number, effect: BuffsAndDebuffsEnum): boolean {
		if (diceRoll === 20) {
			console.log(`${this.name} rolled a natural 20 and saved from ${effect}.`);
			return true;
		}
		if (diceRoll === 1) {
			console.log(`${this.name} rolled a natural 1 and failed from ${effect}.`);
			return false;
		}
		return false;
	}

	private calculateTotalSaves(
		diceRoll: number,
		baseModifier: number,
		buffModifier: number
	): number {
		const total = diceRoll + baseModifier + buffModifier;
		console.log(
			`${this.name} rolls ${diceRoll} for saving throw, plus ${baseModifier} modifier, and ${buffModifier} from Buff. Total: ${total}.`
		);
		return total;
	}

	private shouldRerollSave(
		totalSaves: number,
		hitChance: number,
		diceRoll: number,
		buffType: "cursed" | "bless"
	): boolean {
		if (
			(buffType === "cursed" && totalSaves >= hitChance && this.buffsAndDebuffs.cursed > 0 && diceRoll !== 20) ||
			(buffType === "bless" && totalSaves < hitChance && this.buffsAndDebuffs.bless > 0 && diceRoll !== 1)
		) {
			console.log(`${this.name} must reroll a ${buffType === "cursed" ? "saved" : "failed"} throw because of ${buffType}.`);
			this.buffsAndDebuffs[buffType] -= 1;
			return true;
		}
		return false;
	}

	private applyBuffModifiers(totalSaves: number): number {
		if (this.buffsAndDebuffs.inspiration > 0) {
			totalSaves += 2;
		}
		if (this.buffsAndDebuffs.desperation > 0) {
			totalSaves -= 2;
		}
		return totalSaves;
	}

	private createEffectReturnObject(): EffectReturnObject {
		return {
			enableTurnOrder: true,
			buffsAndDebuffs: this.buffsAndDebuffs,
			type: "buffsAndDebuffs",
			damage: undefined,
			status: this.status,
		};
	}

	private applyEffect(effect: BuffsAndDebuffsEnum, effectDuration: number) {
		console.log(`Effect ${effect} is applied to ${this.name}`);
		const appenderFunction = EffectAppender[effect];

		if (typeof appenderFunction !== "function") {
			/*Panic!*/ throw new Error(
				`Effect ${effect} not found in EffectAppender!`
			);
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

}

function turnConsumeIntoInterface(
	consume: SkillConsume
): SkillConsumeInterface {
	return {
		hp: consume.hp,
		mp: consume.mp,
		sp: consume.sp,
		elements: consume.elements.map((element) => ({
			element: element.element,
			amount: element.amount,
		})),
	};
}

function turnProduceIntoInterface(
	produce: SkillProduce
): SkillProduceInterface {
	return {
		elements: produce.elements.map((element) => ({
			element: element.element,
			amount: element.amountRange,
		})),
	};
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
			throw new Error("class: " + selectedClass + " not found in switchClass!");
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
			throw new Error("race: " + selectedRace + " not found in switchRace!");
			break;
	}
}

function switchBackground(selectedBackground?: BackgroundEnum) {
	switch (selectedBackground) {
		case BackgroundEnum.ABANDONED_FARMHAND:
			return backgroundAbandonedFarmhand;
			break;
		case BackgroundEnum.APPRENTICE_SCRIBE:
			return backgroundApprenticeScribe;
			break;
		case BackgroundEnum.FALLEN_NOBILITY:
			return backgroundFallenNobility;
			break;
		case BackgroundEnum.FAILED_CRAFTSMAN:
			return backgroundFailedCraftsman;
			break;
		case BackgroundEnum.INNKEEPERS_CHILD:
			return backgroundInnkeepersChild;
			break;
		case BackgroundEnum.DESERTED_MILITARY:
			return backgroundDesertedMilitary;
			break;
		case BackgroundEnum.MAGE_APPRENTICE:
			return backgroundMageApprentice;
			break;
		case BackgroundEnum.MERCS_CHILD:
			return backgroundMercsChild;
			break;
		case BackgroundEnum.STREET_URCHIN:
			return backgroundStreetUrchin;
			break;
		case BackgroundEnum.TAVERN_BRAWLER:
			return backgroundTavernBrawler;
			break;
		case BackgroundEnum.TRAINEE_IN_CARAVAN:
			return backgroundTraineeInCaravan;
			break;
		case BackgroundEnum.WANDERING_MUSICIAN:
			return backgroundWanderingMusician;
			break;
		default:
			throw new Error(
				"background: " + selectedBackground + " not found in switchBackground!"
			);
			break;
	}
}

export async function setCharacterStatus(
	character: Character,
	classSelected?: ClassEnum,
	raceSelected?: RaceEnum,
	backGroundSelected?: BackgroundEnum
): Promise<Character> {
	if (raceSelected != null && raceSelected != undefined) {
		let characterRace = switchRace(raceSelected);
		if (characterRace != null) {
			for (const attribute in characterRace.attributes) {
				character.status.attributes[
					attribute as keyof CharacterStatus["attributes"]
				].base +=
					characterRace.attributes[
						attribute as keyof CharacterStatus["attributes"]
					];
			}
			character.raceHP = characterRace.hp;
			character.raceMP = characterRace.mp;
			character.raceSP = characterRace.sp;
			for (const traitEnum of characterRace.traits) {
				let trait = TraitRepository[traitEnum as keyof typeof TraitRepository];
				character.gainTrait(trait);
			}
		}
		character.race = raceSelected;
	}

	if (classSelected != null && classSelected != undefined) {
		let characterClass = switchClass(classSelected);
		if (characterClass != null) {
			for (const attribute in characterClass.bonusStats.attribute) {
				character.status.attributes[
					attribute as keyof CharacterStatus["attributes"]
				].base +=
					characterClass.bonusStats.attribute[
						attribute as keyof CharacterStatus["attributes"]
					];
			}
			for (const proficiency in characterClass.bonusStats.proficiency) {
				character.status.proficiencies[
					proficiency as keyof CharacterStatus["proficiencies"]
				].base +=
					characterClass.bonusStats.proficiency[
						proficiency as keyof CharacterStatus["proficiencies"]
					];
			}
			for (const artisan in characterClass.bonusStats.artisan) {
				character.status.artisans[
					artisan as keyof CharacterStatus["artisans"]
				].base +=
					characterClass.bonusStats.artisan[
						artisan as keyof CharacterStatus["artisans"]
					];
			}
			for (const skill of characterClass.skills) {
				console.log("Learning Skill: " + skill);
				await character.learnSkill(skill);
			}
			for (let i = character.skills.length - 1; i >= 0; i--) {
				let skill = character.skills[i];
				character.moveCardToBattle(skill.skill.id);
			}
			if (characterClass.gears.mainHand != null) {
				character.equip("mainHand", characterClass.gears.mainHand);
			}
			if (characterClass.gears.offHand != null) {
				character.equip("offHand", characterClass.gears.offHand);
			}
			if (characterClass.gears.armor != null) {
				character.equip("armor", characterClass.gears.armor);
			}
			if (characterClass.gears.Headwear != null) {
				character.equip("headwear", characterClass.gears.Headwear);
			}
			if (characterClass.gears.gloves != null) {
				character.equip("gloves", characterClass.gears.gloves);
			}
			if (characterClass.gears.boots != null) {
				character.equip("boots", characterClass.gears.boots);
			}
			if (characterClass.gears.necklace != null) {
				character.equip("necklace", characterClass.gears.necklace);
			}
			if (characterClass.gears.ring_R != null) {
				character.equip("ring_R", characterClass.gears.ring_R);
			}
			if (characterClass.gears.ring_L != null) {
				character.equip("ring_L", characterClass.gears.ring_L);
			}
			if (characterClass.traits.length > 0) {
				for (const traitID of characterClass.traits) {
					let trait = TraitRepository[traitID as keyof typeof TraitRepository];
					character.gainTrait(trait);
				}
			}
		}
	}

	if (backGroundSelected != null && backGroundSelected != undefined) {
		let characterBackground = switchBackground(backGroundSelected);
		if (characterBackground != null) {
			if (characterBackground.attributes != null) {
				for (const attribute in characterBackground.attributes) {
					character.status.attributes[
						attribute as keyof CharacterStatus["attributes"]
					].base += 1;
					(characterBackground.attributes as Record<string, number>)[attribute];
				}
			}
			if (characterBackground.proficiencies != null) {
				for (const proficiency in characterBackground.proficiencies) {
					character.status.proficiencies[
						proficiency as keyof CharacterStatus["proficiencies"]
					].base += 1;
					(characterBackground.proficiencies as Record<string, number>)[
						proficiency
					];
				}
			}
			if (characterBackground.artisans != null) {
				for (const artisan in characterBackground.artisans) {
					character.status.artisans[
						artisan as keyof CharacterStatus["artisans"]
					].base += 1;
					(characterBackground.artisans as Record<string, number>)[artisan];
				}
			}

			if (
				characterBackground.trait != null &&
				characterBackground.trait != undefined
			) {
				let trait =
					TraitRepository[
						characterBackground.trait as keyof typeof TraitRepository
					];
				character.gainTrait(trait);
			}
		}

		character.background = backGroundSelected;
	}

	character.setBodyValue();

	return character;
}

function calculateBaseDamage(
	character: Character,
	skillActionObject: SkillActionObject,
	level: number,
	damageType: DamageTypes,
	isWeaponAttack: boolean,
	isSpell: boolean
): number {
	let baseDamage: number = 0;
	// In case of using Weapon DMG
	if (
		skillActionObject.damageDiceBase[0] === DiceEnum.Weapon_Physical ||
		skillActionObject.damageDiceBase[0] === DiceEnum.Weapon_Magical
	) {
		if (character.equipments.mainHand === null) {
			baseDamage = Dice.roll(DiceEnum.OneD6).sum;
		} else if (character.equipments.mainHand !== null) {
			baseDamage = calculateWeaponDamage(
				character,
				skillActionObject.damageDiceBase[0]
			);
		}
	}

	// Case it's not weapon damage
	if (
		skillActionObject.damageDiceBase[0] !== DiceEnum.Weapon_Physical &&
		skillActionObject.damageDiceBase[0] !== DiceEnum.Weapon_Magical
	) {
		baseDamage = Dice.roll(
			skillActionObject.damageDiceBase.length === 1
				? skillActionObject.damageDiceBase[0]
				: skillActionObject.damageDiceBase[level - 1]
		).sum;
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
		baseDamage += character.getModifier(
			skillModfierBonus as CharacterStatusEnum
		);
	}

	// Additional damage from damage type
	switch (damageType) {
		case DamageTypes.blunt:
			baseDamage += character.status.bluntAttack();
			break;
		case DamageTypes.pierce:
			baseDamage += character.status.pierceAttack();
			break;
		case DamageTypes.slash:
			baseDamage += character.status.slashAttack();
			break;
		case DamageTypes.arcane:
			baseDamage += character.status.arcaneAttack();
			break;
		case DamageTypes.fire:
			baseDamage += character.status.fireAttack();
			break;
		case DamageTypes.water:
			baseDamage += character.status.waterAttack();
			break;
		case DamageTypes.air:
			baseDamage += character.status.airAttack();
			break;
		case DamageTypes.geo:
			baseDamage += character.status.geoAttack();
			break;
		case DamageTypes.order:
			baseDamage += character.status.orderAttack();
			break;
		case DamageTypes.chaos:
			baseDamage += character.status.chaosAttack();
			break;
		case DamageTypes.angelic:
			baseDamage += character.status.angelicAttack();
			break;
		case DamageTypes.demonic:
			baseDamage += character.status.demonicAttack();
			break;
		case DamageTypes.holy:
			baseDamage += character.status.holyAttack();
			break;
		case DamageTypes.dark:
			baseDamage += character.status.darkAttack();
			break;
		case DamageTypes.ice:
			baseDamage += character.status.iceAttack();
			break;
		case DamageTypes.lightning:
			baseDamage += character.status.lightningAttack();
			break;
		case DamageTypes.poison:
			baseDamage += character.status.poisonAttack();
			break;
		case DamageTypes.life:
			baseDamage += character.status.lifeAttack();
			break;
		case DamageTypes.necrotic:
			baseDamage += character.status.necroticAttack();
			break;
		case DamageTypes.metal:
			baseDamage += character.status.metalAttack();
			break;
		case DamageTypes.nature:
			baseDamage += character.status.natureAttack();
			break;
		case DamageTypes.spirit:
			baseDamage += character.status.spiritAttack();
			break;
		case DamageTypes.chiCold:
			baseDamage += character.status.chiColdAttack();
			break;
		case DamageTypes.chiWarm:
			baseDamage += character.status.chiWarmAttack();
			break;
		case DamageTypes.chiHarmony:
			baseDamage += character.status.chiHarmonyAttack();
			break;
		default:
			break;
	}

	//Additional Damage from proficiency
	if (isWeaponAttack === true) {
		switch (character.equipments.mainHand?.weaponType) {
			case WeaponType.axe:
				baseDamage += character.getModifier(CharacterStatusEnum.axe);
				break;
			case WeaponType.sword:
				baseDamage += character.getModifier(CharacterStatusEnum.sword);
				break;
			case WeaponType.blade:
				baseDamage += character.getModifier(CharacterStatusEnum.blade);
				break;
			case WeaponType.bow:
				baseDamage += character.getModifier(CharacterStatusEnum.bow);
				break;
			case WeaponType.dagger:
				baseDamage += character.getModifier(CharacterStatusEnum.dagger);
				break;
			case WeaponType.mace:
				baseDamage += character.getModifier(CharacterStatusEnum.mace);
				break;
			case WeaponType.orb:
				baseDamage += character.getModifier(CharacterStatusEnum.orb);
				break;
			case WeaponType.spear:
				baseDamage += character.getModifier(CharacterStatusEnum.spear);
				break;
			case WeaponType.staff:
				baseDamage += character.getModifier(CharacterStatusEnum.staff);
				break;
			case WeaponType.tome:
				baseDamage += character.getModifier(CharacterStatusEnum.tome);
				break;
			case WeaponType.wand:
				baseDamage += character.getModifier(CharacterStatusEnum.magicWand);
				break;
			// Will character automatically means BareHand?
			default:
				baseDamage += character.getModifier(CharacterStatusEnum.bareHand);
				break;
		}
	}

	// TODO: ADD Triatsbased Damage Modifier and BuffBased Damage Modifier

	// isSpell? character is damage penalty if wearing armor

	return baseDamage;
}

function calculateWeaponDamage(
	character: Character,
	diceType: DiceEnum.Weapon_Magical | DiceEnum.Weapon_Physical
): number {
	const weapon = character.equipments.mainHand ?? character.equipments.offHand;

	if (weapon) {
		const dice =
			diceType === DiceEnum.Weapon_Magical
				? weapon.attackStats?.magicalDiceEnum ?? DiceEnum.OneD6
				: weapon.attackStats?.physicalDiceEnum ?? DiceEnum.OneD6;
		return Dice.roll(dice).sum;
	}

	// Fallback: no weapon equipped
	return Dice.roll(DiceEnum.OneD6).sum;
}

export function consumeActionObject(
	character: Character,
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
	let damageType = skillActionObject.damageType.length === 1
			? skillActionObject.damageType[0]
			: skillActionObject.damageType[level - 1];

	if (isWeaponAttack) {
		damageType = isSpell
			? character.equipments.mainHand?.attackStats?.magicalType || DamageTypes.arcane
			: character.equipments.mainHand?.attackStats?.physicalType || DamageTypes.blunt;
	}

	if (isAuto) {
		damageType = isSpell
			? character.equipments.mainHand?.attackStats?.magicalType || DamageTypes.arcane
			: character.equipments.mainHand?.attackStats?.physicalType || DamageTypes.blunt;
	}

	let baseDamage = calculateBaseDamage(
		character,
		skillActionObject,
		level,
		damageType,
		isWeaponAttack,
		isSpell
	);

	let [hit, crit] = calculateCritAndHit(character, skillActionObject, level);

	if (isSpell) {
		baseDamage *= getArmorPenaltyForSpellCastingDamage(character);
	}

	if (isSpell) {
		hit += getArmorPenaltyForSpellCastingHit(character);
	}

	if (isSpell) {
		baseDamage *= character.arcaneAptitude.getSpellEffectivenessAptitude();
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
		if (character.buffsAndDebuffs.weaponMagicalCoating > 0) {
			damageObject.baseDamage += 3;
		}
	}

	if (isSpell) {
		// *Put additional spell attack buff here
	}

	switch (skillActionObject.type) {
		case SkillActionType.Negative:
			return character.playNegativeSkill({
				target,
				damageObject,
				skillLevel: level,
				isWeaponAttack,
			});
		case SkillActionType.Positive:
			return character.playPositiveSkill({
				target,
				damageObject,
				skillLevel: level,
			});
	}
}

export function calculateCritAndHit(
	character: Character,
	skillActionObject: SkillActionObject,
	level: number
): [number, boolean] {
	if (skillActionObject.trueHit) return [9999, false];

	const hitRoll = Dice.rollTwenty();
	// Critical Rolls
	if (hitRoll === 20) return [20, true];
	if (hitRoll === 1) return [1, false];

	const averageHitModifier = calculateAverageHitModifier(
		character,
		skillActionObject.hitStat,
		level
	);
	const requiredCritScore = calculateRequiredCritScore(
		character,
		skillActionObject,
		level
	);
	const totalHitScore = hitRoll + averageHitModifier;
	
	return [totalHitScore, totalHitScore >= requiredCritScore];
}

function calculateAverageHitModifier(
	character: Character,
	hitStat: CharacterStatusEnum[][],
	level: number
): number {
	if (hitStat.length === 0) return 0;
	const selectedStats = hitStat.length === 1 ? hitStat[0] : hitStat[level - 1];
	const totalModifier = selectedStats.reduce(
		(sum, stat) => sum + character.getModifier(stat),
		0
	);
	return totalModifier / selectedStats.length;
}

function calculateRequiredCritScore(
	character: Character,
	skillActionObject: SkillActionObject,
	level: number
): number {
	if (skillActionObject.critBase.length === 0) return 0;

	let baseCritScore =
		skillActionObject.critBase[
			skillActionObject.critBase.length === 1 ? 0 : level - 1
		];
	
	const critBonusStats =
		skillActionObject.critStat.length === 1
			? skillActionObject.critStat[0]
			: skillActionObject.critStat.length > 0
			? skillActionObject.critStat[level - 1]
			: [];

	if (critBonusStats.length > 0) {
		let critStatsCount = critBonusStats.length;
		let critStatsSum = 0;
		for (const bonusStat of critBonusStats) {
			critStatsSum += character.getModifier(bonusStat);
		}
		baseCritScore += critStatsSum / critStatsCount;
	}

	baseCritScore = Math.max(baseCritScore, 0);
	
	return 20 - baseCritScore;
}

export function getArmorPenaltyForSpellCastingDamage(
	character: Character
): number {
	let spellDamageMultiPlier =
		character.equipments.armor?.spellCastingDamageMultiplier || 1;

	let armotType = character.equipments.armor?.armorType;

	if (armotType != undefined) {
		switch (armotType) {
			case "light":
				if (
					character.traits.includes(
						TraitRepository.trait_hexbinder_01 ||
							TraitRepository.trait_hexbinder_02 ||
							TraitRepository.trait_hexbinder_03
					)
				) {
					spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.2, 1);
				}
				if (
					character.traits.includes(
						TraitRepository.trait_spellblade_01 ||
							TraitRepository.trait_spellblade_02 ||
							TraitRepository.trait_spellblade_03
					)
				) {
					spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.4, 1);
				}
				return spellDamageMultiPlier;

			case "medium":
				if (
					character.traits.includes(
						TraitRepository.trait_hexbinder_01 ||
							TraitRepository.trait_hexbinder_02 ||
							TraitRepository.trait_hexbinder_03
					)
				) {
					spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.3, 1);
				}
				if (
					character.traits.includes(
						TraitRepository.trait_spellblade_01 ||
							TraitRepository.trait_spellblade_02 ||
							TraitRepository.trait_spellblade_03
					)
				) {
					spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.3, 1);
				}
				return spellDamageMultiPlier;

			case "heavy":
				if (
					character.traits.includes(
						TraitRepository.trait_hexbinder_01 ||
							TraitRepository.trait_hexbinder_02 ||
							TraitRepository.trait_hexbinder_03
					)
				) {
					spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.4, 1);
				}
				if (
					character.traits.includes(
						TraitRepository.trait_spellblade_01 ||
							TraitRepository.trait_spellblade_02 ||
							TraitRepository.trait_spellblade_03
					)
				) {
					spellDamageMultiPlier = Math.min(spellDamageMultiPlier + 0.2, 1);
				}
				return spellDamageMultiPlier;
			default:
				return spellDamageMultiPlier;
		}
	}
	return spellDamageMultiPlier;
}

export function getArmorPenaltyForSpellCastingHit(
	character: Character
): number {
	let armorPenalty = character.equipments.armor?.spellCastingPenaltyHit || 0; // Default penalty from the armor
	let armorType = character.equipments.armor?.armorType; // 'light', 'medium', or 'heavy'

	if (armorType != undefined) {
		switch (armorType) {
			case "light":
				if (
					character.traits.includes(
						TraitRepository.trait_hexbinder_01 ||
							TraitRepository.trait_hexbinder_02 ||
							TraitRepository.trait_hexbinder_03
					)
				) {
					armorPenalty = Math.max(armorPenalty + 1, 0); // Warlock improves light armor hit up to 0
				}
				if (
					character.traits.includes(
						TraitRepository.trait_spellblade_01 ||
							TraitRepository.trait_spellblade_02 ||
							TraitRepository.trait_spellblade_03
					)
				) {
					armorPenalty = Math.max(armorPenalty + 3, 0); // Swordmage boosts light armor hit further up to 0
				}
				break;

			case "medium":
				if (
					character.traits.includes(
						TraitRepository.trait_hexbinder_01 ||
							TraitRepository.trait_hexbinder_02 ||
							TraitRepository.trait_hexbinder_03
					)
				) {
					armorPenalty = Math.max(armorPenalty + 2, 0); // Warlock mitigates medium armor penalty to max 0
				}
				if (
					character.traits.includes(
						TraitRepository.trait_spellblade_01 ||
							TraitRepository.trait_spellblade_02 ||
							TraitRepository.trait_spellblade_03
					)
				) {
					armorPenalty = Math.max(armorPenalty + 2, 0); // Swordmage improves medium armor hit to max 0
				}
				break;

			case "heavy":
				if (
					character.traits.includes(
						TraitRepository.trait_hexbinder_01 ||
							TraitRepository.trait_hexbinder_02 ||
							TraitRepository.trait_hexbinder_03
					)
				) {
					armorPenalty = Math.max(armorPenalty + 3, 0); // Warlock mitigates heavy armor penalty to max 0
				}
				if (
					character.traits.includes(
						TraitRepository.trait_spellblade_01 ||
							TraitRepository.trait_spellblade_02 ||
							TraitRepository.trait_spellblade_03
					)
				) {
					armorPenalty = Math.max(armorPenalty + 1, 0); // Swordmage slightly mitigates heavy armor penalty
				}
				break;

			default:
				break;
		}
	}
	return armorPenalty;
}

export function getCriticalModifiedDamage(
	character: Character,
	damage: number
): number {
	// This will be used for critical hit damage calculation, normally it will be 1.5 times the damage
	// But some triats or skills can modify this value, right now there's none
	let baseModifier = 1.5;

	// TODO: Placeholders for traits or skills that can modify this value

	return damage * baseModifier;
}

export function processSpecialEffect(
    actor: Character,
    damageObject: {
        specialEffect: {
            condition: {
                actor?: {
                    stat: { type: CharacterStatusEnum; value: number };
                    trait: TraitEnum;
                    buff: { type: BuffsAndDebuffsEnum; stack: number };
                };
                target?: {
                    stat: { type: CharacterStatusEnum; value: number };
                    trait: TraitEnum;
                    buff: { type: BuffsAndDebuffsEnum; stack: number };
                };
                skillLevel?: number;
            };
            effect: SpecialEffectResult;
        };
    },
    skillLevel: number
) {
    if (!damageObject.specialEffect) return undefined;
    const specialEffect = damageObject.specialEffect;
    const isSkillLevelMet = skillLevel >= (specialEffect.condition?.skillLevel ?? 1);
    const conditionMet =
        actor.checkSpecialEffectCondition(
            specialEffect.condition.actor?.stat,
            specialEffect.condition.actor?.trait,
            specialEffect.condition.actor?.buff
        ) && isSkillLevelMet;
    if (conditionMet) {
        const result = specialEffect.effect;
        return {
            damage: result.damage,
            damageMultiplier: result.damageMultiplier,
            buffsOrDebuffs: result.buffsOrDebuffs,
        };
    }
    return undefined;
}

export function weaponAttackAdditionalEffect(
    actor: Character,
    target: Character,
    skillLevel: number,
): EffectReturnObject [] {
    let returnEffects: EffectReturnObject[] = [];

    if (actor.buffsAndDebuffs.poisonCoating_1 > 0) {
        let effectResult = actor.inflictEffect(
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
        returnEffects.push(effectResult);
    }

    if (actor.buffsAndDebuffs.poisonCoating_2 > 0) {
        let effectResult = actor.inflictEffect(
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
        returnEffects.push(effectResult);
    }

    if (actor.buffsAndDebuffs.poisonCoating_3 > 0) {
        let effectResult = actor.inflictEffect(
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
        returnEffects.push(effectResult);
    }

    return returnEffects
}


/*
ตัวละคร
skills
Deck: [skill, skill, skill *7]
skill.consume
skill.produce


*/