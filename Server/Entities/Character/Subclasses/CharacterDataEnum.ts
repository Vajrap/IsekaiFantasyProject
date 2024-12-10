export class StatusTypeEnum {
	static readonly ATTRIBUTE = "attribute" as const;
	static readonly PROFICIENCY = "proficiency" as const;
	static readonly ARTISAN = "artisan" as const;
	static readonly BATTLER = "battler" as const;
	static readonly ELEMENT = "element" as const;
}

export interface StatusTypeMap {
	[StatusTypeEnum.ATTRIBUTE]: AttributeEnum;
	[StatusTypeEnum.PROFICIENCY]: ProficiencyEnum;
	[StatusTypeEnum.ARTISAN]: ArtisanEnum;
	[StatusTypeEnum.BATTLER]: BattlerEnum;
	[StatusTypeEnum.ELEMENT]: ElementEnum;
}

export class AttributeEnum {
	static readonly CHARISMA = "charisma" as const;
	static readonly LUCK = "luck" as const;
	static readonly BREATH = "breath" as const;
	static readonly PLANAR = "planar" as const;
	static readonly DEXTERITY = "dexterity" as const;
	static readonly AGILITY = "agility" as const;
	static readonly INTELLIGENCE = "intelligence" as const;
	static readonly LEADERSHIP = "leadership" as const;
	static readonly STRENGTH = "strength" as const;
	static readonly ENDURANCE = "endurance" as const;
	static readonly VITALITY = "vitality" as const;
	static readonly WILLPOWER = "willpower" as const;
}

export interface AttributeMap {
	[AttributeEnum.CHARISMA]: number;
	[AttributeEnum.LUCK]: number;
	[AttributeEnum.BREATH]: number;
	[AttributeEnum.PLANAR]: number;
	[AttributeEnum.DEXTERITY]: number;
	[AttributeEnum.AGILITY]: number;
	[AttributeEnum.INTELLIGENCE]: number;
	[AttributeEnum.LEADERSHIP]: number;
	[AttributeEnum.STRENGTH]: number;
	[AttributeEnum.ENDURANCE]: number;
	[AttributeEnum.VITALITY]: number;
	[AttributeEnum.WILLPOWER]: number;
}

export class CoreElementEnum {
	static readonly ORDER = "order" as const;
	static readonly CHAOS = "chaos" as const;
	static readonly GEO = "geo" as const;
	static readonly WATER = "water" as const;
	static readonly AIR = "air" as const;
	static readonly FIRE = "fire" as const;
}

export interface CoreElementMap {
	[CoreElementEnum.ORDER]: number;
	[CoreElementEnum.CHAOS]: number;
	[CoreElementEnum.GEO]: number;
	[CoreElementEnum.WATER]: number;
	[CoreElementEnum.AIR]: number;
	[CoreElementEnum.FIRE]: number;
}

export class ElementEnum {
	static readonly ORDER = "order" as const;
	static readonly CHAOS = "chaos" as const;
	static readonly GEO = "geo" as const;
	static readonly WATER = "water" as const;
	static readonly AIR = "air" as const;
	static readonly FIRE = "fire" as const;
	static readonly ICE = "ice" as const;
	static readonly SPIRIT = "spirit" as const;
	static readonly LIGHTNING = "lightning" as const;
	static readonly DEMONIC = "demonic" as const;
	static readonly METAL = "metal" as const;
	static readonly ANGELIC = "angelic" as const;
	static readonly NATURE = "nature" as const;
	static readonly LIFE = "life" as const;
	static readonly DARK = "dark" as const;
	static readonly NECROTIC = "necrotic" as const;
	static readonly POISON = "poison" as const;
	static readonly HOLY = "holy" as const;
	static readonly NONE = "none" as const;
}

export interface ElementMap {
	[ElementEnum.ORDER]: number;
	[ElementEnum.CHAOS]: number;
	[ElementEnum.GEO]: number;
	[ElementEnum.WATER]: number;
	[ElementEnum.AIR]: number;
	[ElementEnum.FIRE]: number;
	[ElementEnum.ICE]: number;
	[ElementEnum.SPIRIT]: number;
	[ElementEnum.LIGHTNING]: number;
	[ElementEnum.DEMONIC]: number;
	[ElementEnum.METAL]: number;
	[ElementEnum.ANGELIC]: number;
	[ElementEnum.NATURE]: number;
	[ElementEnum.LIFE]: number;
	[ElementEnum.DARK]: number;
	[ElementEnum.NECROTIC]: number;
	[ElementEnum.POISON]: number;
	[ElementEnum.HOLY]: number;
	[ElementEnum.NONE]: number;
}

export class BattlerEnum {
	static readonly PATK = "pATK" as const;
	static readonly MATK = "mATK" as const;
	static readonly PDEF = "pDEF" as const;
	static readonly MDEF = "mDEF" as const;
	static readonly PHIT = "pHIT" as const;
	static readonly MHIT = "mHIT" as const;
	static readonly PCRT = "pCRT" as const;
	static readonly MCRT = "mCRT" as const;
	static readonly DODGE = "dodge" as const;
}

export interface BattlerMap {
	[BattlerEnum.PATK]: number;
	[BattlerEnum.MATK]: number;
	[BattlerEnum.PDEF]: number;
	[BattlerEnum.MDEF]: number;
	[BattlerEnum.PHIT]: number;
	[BattlerEnum.MHIT]: number;
	[BattlerEnum.PCRT]: number;
	[BattlerEnum.MCRT]: number;
	[BattlerEnum.DODGE]: number;
}

export class ProficiencyEnum {
	static readonly BAREHAND = "bareHand" as const;
	static readonly SWORD = "sword" as const;
	static readonly BLADE = "blade" as const;
	static readonly SPEAR = "spear" as const;
	static readonly AXE = "axe" as const;
	static readonly BOW = "bow" as const;
	static readonly DAGGER = "dagger" as const;
	static readonly MAGICWAND = "magicWand" as const;
	static readonly STAFF = "staff" as const;
	static readonly TOME = "tome" as const;
	static readonly ORB = "orb" as const;
	static readonly MACE = "mace" as const;
}

export interface ProficiencyMap {
	[ProficiencyEnum.BAREHAND]: number;
	[ProficiencyEnum.SWORD]: number;
	[ProficiencyEnum.BLADE]: number;
	[ProficiencyEnum.SPEAR]: number;
	[ProficiencyEnum.AXE]: number;
	[ProficiencyEnum.BOW]: number;
	[ProficiencyEnum.DAGGER]: number;
	[ProficiencyEnum.MAGICWAND]: number;
	[ProficiencyEnum.STAFF]: number;
	[ProficiencyEnum.TOME]: number;
	[ProficiencyEnum.ORB]: number;
	[ProficiencyEnum.MACE]: number;
}

export class ArtisanEnum {
	static readonly MINING = "mining" as const;
	static readonly SMITHING = "smithing" as const;
	static readonly WOODCUTTING = "woodcutting" as const;
	static readonly CARPENTRY = "carpentry" as const;
	static readonly FORAGING = "foraging" as const;
	static readonly WEAVING = "weaving" as const;
	static readonly SKINNING = "skinning" as const;
	static readonly TANNING = "tanning" as const;
	static readonly JEWELRY = "jewelry" as const;
	static readonly ALCHEMY = "alchemy" as const;
	static readonly COOKING = "cooking" as const;
	static readonly ENCHANTING = "enchanting" as const;
}

export interface ArtisanMap {
	[ArtisanEnum.MINING]: number;
	[ArtisanEnum.SMITHING]: number;
	[ArtisanEnum.WOODCUTTING]: number;
	[ArtisanEnum.CARPENTRY]: number;
	[ArtisanEnum.FORAGING]: number;
	[ArtisanEnum.WEAVING]: number;
	[ArtisanEnum.SKINNING]: number;
	[ArtisanEnum.TANNING]: number;
	[ArtisanEnum.JEWELRY]: number;
	[ArtisanEnum.ALCHEMY]: number;
	[ArtisanEnum.COOKING]: number;
	[ArtisanEnum.ENCHANTING]: number;
}