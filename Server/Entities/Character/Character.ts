import { CharacterStatus } from "./Subclasses/CharacterStatus";
import { CharacterResources } from "./Subclasses/CharacterResources";
import { CharacterEquipments } from "./Subclasses/CharacterEquipments";
import { StatMod } from "../../Utility/StatMod";
import { Dice } from "../../Utility/Dice";
import { BuffsAndDebuffs } from "./Subclasses/BuffsAndDebuffs";
import { ItemBag } from "../Items/Items";
import { CharacterAlignment } from "./Subclasses/CharacterAlignment";
import { CharacterType } from "./Enums/CharacterType";
import { Trait, TraitRepository } from "../Traits/Trait";
import { TraitEnum } from "../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ArmorDefense } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/interfaces";
import { CharacterArcaneAptitude } from "./Subclasses/CharacterArcaneAptitude";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import {
	ArtisanMap,
	AttributeMap,
	CoreElementMap,
	ProficiencyMap,
} from "./Subclasses/CharacterDataEnum";
import { DamageTypes } from "../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { StoryFlags } from "../../Game/StoryEvent/StoryFlags";
import { db } from "../../Database";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { calculateBaseStat } from "./CalculateHPMPSP";
import { RaceEnum } from "../../../Common/RequestResponse/characterCreation";

import { Weapon } from "../Items/Equipments/Weapon/Weapon";
import { Armor } from "../Items/Equipments/Armors/Armor";
import { getItem } from "../Items/Repository";
import { Equipment } from "../Items/Equipments/Equipment";
import { ArmorType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { RelationShipStatusEnum } from "./RelationshipStatusEnum";
import { getExpNeededForStatus } from "./getLevelContribution";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
	CharacterSkills,
	SkillMeta,
} from "../../../Common/DTOsEnumsInterfaces/Character/SkillType";

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
	skills: CharacterSkills = {};
	activeSkills: SkillMeta[] = [];
	skillLearningProgress: {
		[skillID: string]: {process: number;}
	} = {};
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
	relation: {
		[key: string]: { value: number; status: RelationShipStatusEnum };
	} = {};
	isPlayerCharacter: boolean = false;
    character: any;
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
		this.skills = {};
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
		return 5 + this.level * 2;
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
		let breathModifier = Math.max(
			this.getModifier(CharacterStatusEnum.breath),
			0
		);
		let planarModifier = Math.max(
			this.getModifier(CharacterStatusEnum.planar),
			0
		);
		let enduranceModifier = Math.max(
			this.getModifier(CharacterStatusEnum.endurance),
			0
		);

		const armorPenaltyMap: Record<ArmorType, number> = {
			[ArmorType.cloth]: 0,
			[ArmorType.light]: 1,
			[ArmorType.medium]: 2,
			[ArmorType.heavy]: 3,
		};

		let armorpenalty = 0;
		if (
			this.equipments.armor !== undefined &&
			this.equipments.armor.armorType !== null
		) {
			armorpenalty = armorPenaltyMap[this.equipments.armor?.armorType];
		}

		this.currentSP += Math.max(
			staminaDice - armorpenalty + breathModifier + enduranceModifier,
			0
		);
		this.currentMP += Math.max(
			manaDice - armorpenalty + breathModifier + planarModifier,
			0
		);
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

	//MARK: RECEIVE DAMAGE
	receiveDamage({
		attacker,
		damage,
		hitChance,
		damageType,
		locationName,
	}: {
		attacker: Character;
		damage: number;
		hitChance: number;
		damageType: DamageTypes;
		locationName: LocationName;
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
		if (dodgeChance >= hitChance) {
			console.log(`${this.name} dodged the attack!`);
			return {
				actor: attacker,
				target: this,
				damage: 0,
				damageType,
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
			statObject =
				this.status.attributes[status as keyof CharacterStatus["attributes"]];
		} else if (status in this.status.proficiencies) {
			statObject =
				this.status.proficiencies[
					status as keyof CharacterStatus["proficiencies"]
				];
		} else if (status in this.status.artisans) {
			statObject =
				this.status.artisans[status as keyof CharacterStatus["artisans"]];
		} else {
			throw new Error(`Invalid stat type: ${status}`);
		}

		const currentStat = statObject.base;

		if (currentStat >= 30) {
			return;
		}

		const expNeeded = getExpNeededForStatus(currentStat);

		const expGained =
			Dice.rollTwenty() +
			StatMod.value(this.attribute(CharacterStatusEnum.intelligence));

		statObject.exp += expGained;

		if (statObject.exp >= expNeeded) {
			statObject.exp -= expNeeded;
			statObject.base++;
			// Increase stat tracker for level up,
			const statTrackGain = Math.max(StatMod.value(statObject.base), 0) + 1;

			this.gainStatTracker(statTrackGain);
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
}
