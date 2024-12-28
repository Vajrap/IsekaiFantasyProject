import { Tier } from "../../../Utility/Tier";
import { createTableIfNotExists } from "../../Seeding";
// import { ConsumableEffect } from "../Consumable/consumable";
import { ConsumableEffect } from "../../../../Common/Enums/Item/ConsumableEffect";

export class ItemResourceInstance {
	id: string;
	name: string;
	description: string;
	type: ResourceType;
	image: string;
	cost: number;
	weight: number;
	resourceTraits: ResourceTrait[];
	tier: Tier;
	consumable: boolean;
	effects: ConsumableEffect[];
    baseEffectMagnitude: number; //determines the strength of the effect
    baseEffectDuration: number; //determines how long the effect lasts, normally this would be 1/4 day per 1 unit, but can be modified by other while get crafted: permanent effect gets 0 
    consumedAfterUse: boolean;
	
	constructor(dto: {
		id: string;
		name: string;
		description: string;
		type: ResourceType;
		image: string;
		cost: number;
		weight: number;
		resourceTraits: ResourceTrait[];
		tier: Tier;
		consumable: boolean;
		effects: ConsumableEffect[];
		baseEffectMagnitude: number;
		baseEffectDuration: number;
		consumedAfterUse: boolean;
	}) {
		this.id = dto.id;
		this.name = dto.name;
		this.description = dto.description;
		this.type = dto.type;
		this.image = dto.image;
		this.cost = dto.cost;
		this.weight = dto.weight;
		this.resourceTraits = dto.resourceTraits;
		this.tier = dto.tier;
		this.consumable = dto.consumable;
		this.effects = dto.effects;
		this.baseEffectMagnitude = dto.baseEffectMagnitude;
		this.baseEffectDuration = dto.baseEffectDuration;
		this.consumedAfterUse = dto.consumedAfterUse;
	}
}

export enum ResourceTrait {
	// Element Attack
	element_fire = "element_fire",
	element_water = "element_water",
	element_geo = "element_geo",
	element_air = "element_air",
	element_order = "element_order",
	element_chaos = "element_chaos",
	element_arcane = "element_arcane",
	element_chiWarm = "element_chiWarm",
	element_chiCold = "element_chiCold",
	element_chiHarmony = "element_chiHarmony",

	// Body Attributes
	body_hp = "body_hp",
	body_mp = "body_mp",
	body_sp = "body_sp",
	body_charisma = "body_charisma",
	body_luck = "body_luck",
	body_breath = "body_breath",
	body_planar = "body_planar",
	body_dexterity = "body_dexterity",
	body_agility = "body_agility",
	body_intelligence = "body_intelligence",
	body_leadership = "body_leadership",
	body_strength = "body_strength",
	body_endurance = "body_endurance",
	body_vitality = "body_vitality",
	body_willpower = "body_willpower",
	body_hp_permanent = "body_hp_permanent",
	body_mp_permanent = "body_mp_permanent",
	body_sp_permanent = "body_sp_permanent",
	body_charisma_permanent = "body_charisma_permanent",
	body_luck_permanent = "body_luck_permanent",
	body_breath_permanent = "body_breath_permanent",
	body_planar_permanent = "body_planar_permanent",
	body_dexterity_permanent = "body_dexterity_permanent",
	body_agility_permanent = "body_agility_permanent",
	body_intelligence_permanent = "body_intelligence_permanent",
	body_leadership_permanent = "body_leadership_permanent",
	body_strength_permanent = "body_strength_permanent",
	body_endurance_permanent = "body_endurance_permanent",
	body_vitality_permanent = "body_vitality_permanent",
	body_willpower_permanent = "body_willpower_permanent",


	// Cooking Traits
    cooking_spicy = "cooking_spicy",
	cooking_savory = "cooking_savory",
	cooking_sweet = "cooking_sweet",
	cooking_bitter = "cooking_bitter",
	cooking_sour = "cooking_sour",
	cooking_salty = "cooking_salty",

	cooking_crispy = "cooking_crispy",
	cooking_juicy = "cooking_juicy",
	cooking_chewy = "cooking_chewy",
	cooking_crunchy = "cooking_crunchy",
	cooking_tender = "cooking_tender",

	// Alchemy Traits
	alchemy_explosive = "alchemy_explosive",
	alchemy_corrosive = "alchemy_corrosive",
	alchemy_stabilizing = "alchemy_stabilizing",
	alchemy_toxic = "alchemy_toxic",
	alchemy_rejuvenating = "alchemy_rejuvenating",
	alchemy_planarsource = "alchemy_planarsource",
	alchemy_energizing = "alchemy_energizing",
	alchemy_freezing = "alchemy_freezing",
	alchemy_burning = "alchemy_burning",

	// Forging Traits
	forging_lightweight = "forging_lightweight",
	forging_heavy = "forging_heavy",
	forging_tough = "forging_tough",
	forging_fragile = "forging_fragile",
	forging_flexible = "forging_flexible",
	forging_heat_resistant = "forging_heat_resistant",
	forging_cold_resistant = "forging_cold_resistant",
	forging_conductive = "forging_conductive",
	forging_magicalConductive = "forging_magicalConductive",
	forging_magicalInsulated = "forging_magicalInsulated",
	forging_reflective = "forging_reflective",
	forging_radiant = "forging_radiant",
	forging_undeadProof = "forging_undeadProof",

	// Leatherwork Traits
	leatherwork_flexible = "leatherwork_flexible",
	leatherwork_tough = "leatherwork_tough",
	leatherwork_insulated = "leatherwork_insulated",
	leatherwork_magicalInsulated = "leatherwork_magicalInsulated",
	leatherwork_magicalConductive = "leatherwork_magicalConductive",
	
	// Weaving Traits
	weaving_rough = "weaving_rough",
	weaving_soft = "weaving_soft",
	weaving_insulated = "weaving_insulated",
	weaving_magicalConductive = "weaving_magicalConductive",
	weaving_magicalInsulated = "weaving_magicalInsulated",

	// Woodworking Traits
	woodworking_sturdy = "woodworking_sturdy",
	woodworking_flexible = "woodworking_flexible",
	woodworking_light = "woodworking_light",
	woodworking_magicalConductive = "woodworking_magicalConductive",
	woodworking_magicalInsulated = "woodworking_magicalInsulated",

	// Jewelwork Traits
	// Only apply randomly while doing resource conversion
	jewelwork_flawed = "jewelwork_flawed",
	jewelwork_cracked = "jewelwork_cracked",
	jewelwork_refined = "jewelwork_refined",
	jewelwork_pristine = "jewelwork_pristine",
	jewelwork_perfect = "jewelwork_perfect",

	// Magical Properties
	magical_healing = "magical_healing",
	magical_conditioning = "magical_conditioning",
	magical_planarFilling = "magical_planarFilling",
	magical_poisonous = "magical_poisonous", 
	magical_cursed = "magical_cursed",
	magical_blessed = "magical_blessed",
	magical_arcane = "magical_arcane",
	magical_purifying = "magical_purifying",
	magical_enchanted = "magical_enchanted",
}

export enum ResourceType {
	thread = 'thread',
	yarn = 'yarn',
	fabric = "fabric",
	cloth = 'cloth',

	skin = 'skin',
	leather = "leather",
	bone = 'bone',
	scale = 'scale',

	ore = "ore",
	ingot = 'ingot',

	wood = "wood",
	plank = 'plank',

	gem = 'gem',
	jewel = "jewel",

	culinary = 'culinary',
	ingredient = 'ingredient',
	alchemical = 'alchemical',

	parchment = 'parchment',
}

export enum ItemResourceEnum {
	// MARK:: Mining Resources
	//common
	ore_coal = 'ore_coal',
	ore_copper = 'ore_copper',
	//uncommon
	ore_tin = 'ore_tin',
	//rare
	ore_iron = 'ore_iron',
	//epic
	ore_silver = 'ore_silver',
	ore_gold = 'ore_gold',
	//legendary
	ore_mithril = 'ore_mithril',
	ore_starMetal = 'ore_starMetal',
	//unique
	ore_orichalcum = 'ore_orichalcum',
	ore_titanStone = 'ore_titanStone',
	//divine
	ore_aetherium = 'ore_aetherium',

	// MARK:: Smithing, from ore -> ingot
	// common
	ingot_copper = 'ingot_copper', // copper + coal
	// uncommon
	ingot_bronze = 'ingot_bronze', // copper + tin + coal
	// rare
	ingot_iron = 'ingot_iron', // iron + coal
	// epic
	ingot_steel = 'ingot_steel', // iron(more iron) + coal 
	ingot_silver = 'ingot_silver', // silver + coal
	ingot_gold = 'ingot_gold', // gold + coal
	ingot_electrum = 'ingot_electrum', // gold + silver + coal 
	// legendary
	ingot_mithril = 'ingot_mithril', // mithril + silver + coal
	ingot_starMetal = 'ingot_starMetal', // star metal + iron + copper + coal
	// unique
	ingot_orichalcum = 'ingot_orichalcum', // orichalcum + gold + silver + coal
	ingot_titanSteel = 'ingot_titalSteel', // titanStone + steel ingot + coal
	// divine
	ingot_aetherium = 'ingot_aetherium', // aetherium

	// MARK:: Foresting Resources
	// common
	wood_oak = 'wood_oak',
	wood_pine = 'wood_pine',
	// uncommon
	wood_maple = 'wood_maple',
	wood_birch = 'wood_birch',
	// rare
	wood_ash = 'wood_ash',
	wood_willow = 'wood_willow',
	// eipc
	wood_ironWood = 'wood_ironWood',
	wood_redWood = 'wood_redWood',
	// legendary
	wood_duskWood = 'wood_duskWood',
	// unique
	wood_moonOak = 'wood_moonOak',
	// divine
	wood_worldTreeWood = 'wood_worldTreeWood',

	// MARK:: Wood working
	// common
	plank_oak = 'plank_oak',
	plank_pine = 'plank_pine',
	// uncommon
	plank_maple = 'plank_maple',
	plank_birch = 'plank_birch',
	// rare
	plank_ash = 'plank_ash',
	plank_willow = 'plank_willow',
	// epic
	plank_ironWood = 'plank_ironWood',
	plank_redWood = 'plank_redWood',
	// legendary
	plank_duskWood = 'plank_duskWood',
	// unique
	plank_moonOak = 'plank_moonOak',
	// divine
	plank_worldTreeWood = 'plank_worldTreeWood',

	// MARK:: FORAGER (about clothes)
	// common
	thread_cotton = 'thread_cotton',
	thread_hemp = 'thread_hemp',
	yarn_wool = 'yarn_wool',
	// uncommon
	thread_silk = 'thread_silk',
	yarn_linen = 'yarn_linen',
	// rare
	thread_bambooFiber = 'thread_bambooFiber',
	yarn_jute = 'yarn_jute',
	// epic
	thread_spiderSilk = 'thread_spiderSilk',
	yarn_mammothWool = 'yarn_mammothWool',
	// legendary
	thread_moonlitCotton = 'thread_moonlitCotton',
	// unique
	thread_arcaneSilk = 'thread_arcaneSilk',
	yarn_eldritchMammothWool = 'yarn_eldritchMammothWool',
	// divine
	//NONE

	// MARK: WEAVER
	// Common
    fabric_cotton = 'fabric_cotton',
    fabric_hemp = 'fabric_hemp',
    cloth_wool = 'cloth_wool',
    // Uncommon
    fabric_silk = 'fabric_silk',
    cloth_linen = 'cloth_linen',
    // Rare
    fabric_bambooFiber = 'fabric_bambooFiber',
    cloth_jute = 'cloth_jute',
    // Epic
    fabric_spiderSilk = 'fabric_spiderSilk',
    cloth_mammothWool = 'cloth_mammothWool',
    // Legendary
    fabric_moonlitCotton = 'fabric_moonlitCotton',
    // Unique
    fabric_arcaneSilk = 'fabric_arcaneSilk',
    cloth_eldritchMammothWool = 'cloth_eldritchMammothWool',

	// MARK:: Skinner
	// common
	skinner_hide_cattle = 'skinner_hide_cattle',
	// uncommon
	skinner_hide_feline = 'skinner_hide_feline',
	skinner_hide_canine = 'skinner_hide_canine',
	skinner_hide_reptile = 'skinner_hide_reptile',
	skinner_fang = `skinner_fang`,
	skinner_talon = `skinner_talon`,
	skinner_scale = 'skinnger_scale',
	// rare
	skinner_hide_feline_tough = 'skinner_hide_feline_tough',
	skinner_hide_canine_tough = 'skinner_hide_canine_tough',
	skinner_hide_reptile_tough = 'skinner_hide_reptile_tough',
	skinner_fang_razor = `skinner_fang_razor`,
	skinner_talon_razor = `skinner_talon_razor`,
	skinner_scale_strong = 'skinnger_scale_strong',
	// epic
	skinner_hide_dragonling = 'skinner_hide_dragonling',
	// legendary
	skinner_hide_dragon = 'skinner_hide_dragon',
	skinner_scale_dragon = `skinner_scale_dragon`,

	// MARK:: Tanner
	// common
	leather_cured_cattle = 'leather_cured_cattle',
	// uncommon
	leather_feline = 'leather_feline',
	leather_canine = 'leather_canine',
	leather_reptile = 'leather_reptile',
	// rare
	leather_feline_tough = 'leather_feline_tough',
	leather_canine_tough = 'leather_canine_tough',
	leather_reptile_tough = 'leather_reptile_tough',
	// epic
	leather_dragonling = 'leather_dragonling',
	// legendary
	leather_dragon = 'leather_dragon',

	// jewelwork_flawed = "jewelwork_flawed",
	// jewelwork_cracked = "jewelwork_cracked",
	// jewelwork_refined = "jewelwork_refined",
	// jewelwork_pristine = "jewelwork_pristine",
	// jewelwork_perfect = "jewelwork_perfect",

	// MARK:: Jeweler Resources
	// Common
	// Rare
	gem_ruby = 'gem_ruby', // Fire
	gem_emerald = 'gem_emerald', // Geo
	gem_aquamarine = 'gem_aquamarine', // Water
	gem_sapphire = 'gem_sapphire', // Air

	// Epic
	gem_diamond = 'gem_diamond', // Order
	gem_onyx = 'gem_onyx', // Chaos

	// Legendary
	gem_flameRuby = 'gem_flameRuby', // Fire
	gem_earthstone = 'gem_earthstone', // Geo
	gem_tidalPearl = 'gem_tidalPearl', // Water
	gem_stormSapphire = 'gem_stormSapphire', // Air

	// Unique
	gem_celestialDiamond = 'gem_celestialDiamond', // Order
	gem_voidstone = 'gem_voidstone', // Chaos

	// Divine
	gem_harmonystone = 'gem_harmonystone', // All Elements (Order, Chaos, Geo, Water, Air, Fire)

	// MARK:: Jeweler Crafted Jewels
	// Rare
	jewel_ruby_flawed = 'jewel_ruby_flawed', // Fire
	jewel_ruby_cracked = 'jewel_ruby_cracked', // Fire
	jewel_ruby_refined = 'jewel_ruby_refined', // Fire
	jewel_ruby_pristine = 'jewel_ruby_pristine', // Fire
	jewel_ruby_perfect = 'jewel_ruby_perfect', // Fire
	jewel_emerald_flawed = 'jewel_emerald_flawed', // Geo
	jewel_emerald_cracked = 'jewel_emerald_cracked', // Geo
	jewel_emerald_refined = 'jewel_emerald_refined', // Geo
	jewel_emerald_pristine = 'jewel_emerald_pristine', // Geo
	jewel_emerald_perfect = 'jewel_emerald_perfect', // Geo
	jewel_aquamarine_flawed = 'jewel_aquamarine_flawed', // Water
	jewel_aquamarine_cracked = 'jewel_aquamarine_cracked', // Water
	jewel_aquamarine_refined = 'jewel_aquamarine_refined', // Water
	jewel_aquamarine_pristine = 'jewel_aquamarine_pristine', // Water
	jewel_aquamarine_perfect = 'jewel_aquamarine_perfect', // Water
	jewel_sapphire_flawed = 'jewel_sapphire_flawed', // Air
	jewel_sapphire_cracked = 'jewel_sapphire_cracked', // Air
	jewel_sapphire_refined = 'jewel_sapphire_refined', // Air
	jewel_sapphire_pristine = 'jewel_sapphire_pristine', // Air
	jewel_sapphire_perfect = 'jewel_sapphire_perfect', // Air
	// Epic
	jewel_diamond_flawed = 'jewel_diamond_flawed', // Order
	jewel_diamond_cracked = 'jewel_diamond_cracked', // Order
	jewel_diamond_refined = 'jewel_diamond_refined', // Order
	jewel_diamond_pristine = 'jewel_diamond_pristine', // Order
	jewel_diamond_perfect = 'jewel_diamond_perfect', // Order
	jewel_onyx_flawed = 'jewel_onyx_flawed', // Chaos
	jewel_onyx_cracked = 'jewel_onyx_cracked', // Chaos
	jewel_onyx_refined = 'jewel_onyx_refined', // Chaos
	jewel_onyx_pristine = 'jewel_onyx_pristine', // Chaos
	jewel_onyx_perfect = 'jewel_onyx_perfect', // Chaos
	// Legendary
	jewel_flameRuby = 'jewel_flameRuby', // Fire alway perfect
	jewel_earthstone = 'jewel_earthstone', // Geo alway perfect
	jewel_tidalPearl = 'jewel_tidalPearl', // Water alway perfect
	jewel_stormSapphire = 'jewel_stormSapphire', // Air alway perfect
	// Unique
	jewel_celestialDiamond = 'jewel_celestialDiamond', // Order alway perfect
	jewel_voidstone = 'jewel_voidstone', // Chaos alway perfect
	// Divine
	jewel_harmonystone = 'jewel_harmonystone', // All Elements (Order, Chaos, Geo, Water, Air, Fire) alway perfect
	
	// MARK:: SKINNER - (INGREDIENT and CULINARY- Cooking and Alchemy)
	// Common
	culinary_meat_rabbit = 'culinary_meat_rabbit',
	ingredient_blood_rabbit = 'ingredient_blood_rabbit',
	ingredient_meat_cattle = 'ingredient_meat_cattle',
	culinary_meat_cattle = 'culinary_meat_cattle',
	culinary_meat_fowl = 'culinary_meat_fowl',
	ingredient_blood_cattle = 'ingredient_blood_cattle',
	ingredient_innards_cattle = 'ingredient_innards_cattle',
	culinary_meat_pig = 'culinary_meat_pig',
	ingredient_blood_pig = 'ingredient_blood_pig',
	ingredient_meat_rabbit = 'ingredient_meat_rabbit',

	// Uncommon
	culinary_meat_wolf = 'culinary_meat_wolf',
	culinary_meat_boar = 'culinary_meat_boar',
	culinary_meat_bear = 'culinary_meat_bear',
	ingredient_blood_wolf = 'ingredient_blood_wolf',
	ingredient_innards_wolf = 'ingredient_innards_wolf',
	culinary_meat_serpent = 'culinary_meat_serpent',
	ingredient_blood_boar = 'ingredient_blood_boar',

	// Rare
	ingredient_innards_bear = 'ingredient_innards_bear',

	// Epic

	// Legendary
	culinary_meat_dragon = 'culinary_meat_dragon',
	ingredient_blood_dragon = 'ingredient_blood_dragon',
	ingredient_innards_dragon = 'ingredient_innards_dragon',
	alchemy_gland_fire_dragon = 'alchemy_gland_fire_dragon',



	// MARK:: Forager Ingredients - (Cooking and Alchemy)
	// Common
	culinary_wildBerry = 'culinary_wildBerry',
	culinary_mushroom = 'culinary_mushroom',
	culinary_carrot = 'culinary_carrot',
	culinary_potato = 'culinary_potato',
	culinary_cabbageLeaf = 'culinary_cabbageLeaf',
	culinary_wheatGrain = 'culinary_wheatGrain',
	culinary_apple = 'culinary_apple',
	culinary_onion = 'culinary_onion',
	culinary_garlic = 'culinary_garlic',
	culinary_turnip = 'culinary_turnip',
	culinary_cucumber = 'culinary_cucumber',
	culinary_corn = 'culinary_corn',
	culinary_pepper = 'culinary_pepper',
	culinary_herb_basil = 'culinary_herb_basil',
	culinary_herb_thyme = 'culinary_herb_thyme',
	culinary_squash = 'culinary_squash',
	culinary_tomato = 'culinary_tomato',
	culinary_rice = 'culinary_rice',
	culinary_spinach = 'culinary_spinach',
	culinary_eggplant = 'culinary_eggplant',
	culinary_lettuce = 'culinary_lettuce',
	culinary_parsnip = 'culinary_parsnip',
	culinary_zucchini = 'culinary_zucchini',
	culinary_greenBean = 'culinary_greenBean',
	culinary_blueberry = 'culinary_blueberry',
	culinary_blackberry = 'culinary_blackberry',
	culinary_chestnut = 'culinary_chestnut',
	culinary_acorn = 'culinary_acorn',
	culinary_celery = 'culinary_celery',
	culinary_mint = 'culinary_mint',
	culinary_pumpkin = 'culinary_pumpkin',
	culinary_pear = 'culinary_pear',
	culinary_grape = 'culinary_grape',
	culinary_honeydew = 'culinary_honeydew',
	culinary_plum = 'culinary_plum',
	culinary_raspberry = 'culinary_raspberry',
	culinary_basilLeaf = 'culinary_basilLeaf',

	// Uncommon
	culinary_wildGarlic = 'culinary_wildGarlic',
	culinary_wildMint = 'culinary_wildMint',
	culinary_truffle = 'culinary_truffle',
	ingredient_gingerRoot = 'ingredient_gingerRoot',
	ingredient_ginsengRoot = 'ingredient_ginsengRoot',
	ingredient_lavender = 'ingredient_lavender',
	ingredient_rosemary = 'ingredient_rosemary',
	ingredient_wildHerb = 'ingredient_wildHerb',
	ingredient_sageLeaf = 'ingredient_sageLeaf',
	ingredient_fennel = 'ingredient_fennel',
	alchemy_dandelionFlower = 'alchemy_dandelionFlower',
	alchemy_frostLotus = 'alchemy_frostLotus',
	alchemy_wolfBane = 'alchemy_wolfBane',
	alchemy_elvenLeaf = 'alchemy_elvenLeaf',
	ingredient_phoenixFruit = 'ingredient_phoenixFruit',
	ingredient_bloodroot = 'ingredient_bloodroot',
	ingredient_moonBerry = 'ingredient_moonBerry',
	ingredient_winterRoot = 'ingredient_winterRoot',
	ingredient_spiritMoss = 'ingredient_spiritMoss',

	// Rare
	alchemy_crimsonGrass = 'alchemy_crimsonGrass',
	ingredient_honeyComb = 'ingredient_honeyComb',
	ingredient_foxTailHerb = 'ingredient_foxTailHerb',
	culinary_goldenApple = 'culinary_goldenApple',

	// Epic
	ingredient_shadowMushroom = 'ingredient_shadowMushroom',
	ingredient_serpentEgg = 'ingredient_serpentEgg',
	alchemy_silverLeaf = 'alchemy_silverLeaf',
	alchemy_nightshade = 'alchemy_nightshade',

	// Legendary
	alchemy_frostBloomFlower = 'alchemy_frostBloomFlower',
	alchemy_emberRoot = 'alchemy_emberRoot',
	alchemy_mandrakeRoot = 'alchemy_mandrakeRoot',
	alchemy_phoenixFeather = 'alchemy_phoenixFeather',

	// Unique
	ingredient_dragonHeart = 'ingredient_dragonHeart',
	culinary_goldenHoney = 'culinary_goldenHoney',

	// Divine
	culinary_ambrosia = 'culinary_ambrosia',
	alchemy_godsblood = 'alchemy_godsblood',

}

export const ItemResourceSeed: ItemResourceInstance[] = [
	// MARK:: Mining Resources
	// common
	// ore_coal = 'ore_coal',
	// ore_copper = 'ore_copper',
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_coal,
		name: 'Coal',
		description: 'A lump of coal.',
		type: ResourceType.ore,
		image: 'ore_coal',
		cost: 10,
		weight: 20,
		resourceTraits: [],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_copper,
		name: 'Copper Ore',
		description: 'A lump of copper ore.',
		type: ResourceType.ore,
		image: 'ore_copper',
		cost: 40,
		weight: 60,
		resourceTraits: [],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	//uncommon
	// ore_tin = 'ore_tin',
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_tin,
		name: 'Tin Ore',
		description: 'A lump of tin ore.',
		type: ResourceType.ore,
		image: 'ore_tin',
		cost: 60,
		weight: 50,
		resourceTraits: [],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	//rare
	// ore_iron = 'ore_iron',
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_iron,
		name: 'Iron Ore',
		description: 'A lump of iron ore.',
		type: ResourceType.ore,
		image: 'ore_iron',
		cost: 150,
		weight: 80,
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	//epic
	// ore_silver = 'ore_silver',
	// ore_gold = 'ore_gold',
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_silver,
		name: 'Silver Ore',
		description: 'A lump of silver ore.',
		type: ResourceType.ore,
		image: 'ore_silver',
		cost: 500,
		weight: 90,
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_gold,
		name: 'Gold Ore',
		description: 'A lump of gold ore.',
		type: ResourceType.ore,
		image: 'ore_gold',
		cost: 1000,
		weight: 100,
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	//legendary
	// ore_mithril = 'ore_mithril',
	// ore_starMetal = 'ore_starMetal',
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_mithril,
		name: 'Mithril Ore',
		description: 'A lump of mithril ore.',
		type: ResourceType.ore,
		image: 'ore_mithril',
		cost: 58000,
		weight: 40,
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_starMetal,
		name: 'Star Metal Ore',
		description: 'A lump of star metal ore.',
		type: ResourceType.ore,
		image: 'ore_starMetal',
		cost: 60000,
		weight: 100,
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	//unique
	// ore_orichalcum = 'ore_orichalcum',
	// ore_titanStone = 'ore_titanStone',
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_orichalcum,
		name: 'Orichalcum Ore',
		description: 'A lump of orichalcum ore.',
		type: ResourceType.ore,
		image: 'ore_orichalcum',
		cost: 100000,
		weight: 75,
		resourceTraits: [],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_titanStone,
		name: 'Titan Stone Ore',
		description: 'A lump of titan stone ore.',
		type: ResourceType.ore,
		image: 'ore_titanStone',
		cost: 120000,
		weight: 130,
		resourceTraits: [],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	//divine
	// ore_aetherium = 'ore_aetherium',
	new ItemResourceInstance({
		id: ItemResourceEnum.ore_aetherium,
		name: 'Aetherium Ore',
		description: 'A lump of aetherium ore.',
		type: ResourceType.ore,
		image: 'ore_aetherium',
		cost: 2000000,
		weight: 10,
		resourceTraits: [],
		tier: Tier.divine,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: Smithing, from ore -> ingot
	// Ingot price would be equal to ore + coal + smelting level
	// Common Smelting price = 100; Uncommon = 200; Rare = 400; Epic = 600; Legendary = 3000; Unique = 7000; Divine = 12000;
	// common
	// ingot_copper = 'ingot_copper', // copper + coal
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_copper,
		name: 'Copper Ingot',
		description: 'A copper ingot.',
		type: ResourceType.ingot,
		image: 'ingot_copper',
		cost: 150,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_conductive, ResourceTrait.forging_lightweight],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	// uncommon
	// ingot_bronze = 'ingot_bronze', // copper + tin + coal
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_bronze,
		name: 'Bronze Ingot',
		description: 'A bronze ingot.',
		type: ResourceType.ingot,
		image: 'ingot_bronze',
		cost: 360,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_conductive, ResourceTrait.forging_lightweight],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	// rare
	// ingot_iron = 'ingot_iron', // iron + coal
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_iron,
		name: 'Iron Ingot',
		description: 'An iron ingot.',
		type: ResourceType.ingot,
		image: 'ingot_iron',
		cost: 660,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_tough, ResourceTrait.forging_conductive],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	// epic
	// ingot_steel = 'ingot_steel', // iron(more iron) + coal 
	// ingot_silver = 'ingot_silver', // silver + coal
	// ingot_gold = 'ingot_gold', // gold + coal
	// ingot_electrum = 'ingot_electrum', // gold + silver + coal
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_steel,
		name: 'Steel Ingot',
		description: 'A steel ingot.',
		type: ResourceType.ingot,
		image: 'ingot_steel',
		cost: 1310,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_tough, ResourceTrait.forging_heavy],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_silver,
		name: 'Silver Ingot',
		description: 'A silver ingot.',
		type: ResourceType.ingot,
		image: 'ingot_silver',
		cost: 1510,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_conductive, ResourceTrait.forging_undeadProof],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_gold,
		name: 'Gold Ingot',
		description: 'A gold ingot.',
		type: ResourceType.ingot,
		image: 'ingot_gold',
		cost: 2010,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_magicalConductive, ResourceTrait.forging_lightweight],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	//Use 1 gold and 1 silver to get 2 electrum
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_electrum,
		name: 'Electrum Ingot',
		description: 'An electrum ingot.',
		type: ResourceType.ingot,
		image: 'ingot_electrum',
		cost: 1760,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_magicalConductive, ResourceTrait.forging_undeadProof, ResourceTrait.forging_conductive, ResourceTrait.forging_lightweight],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	// legendary
	// ingot_mithril = 'ingot_mithril', // mithril + silver + coal
	// ingot_starMetal = 'ingot_starMetal', // star metal + iron + copper + coal
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_mithril,
		name: 'Mithril Ingot',
		description: 'A mithril ingot.',
		type: ResourceType.ingot,
		image: 'ingot_mithril',
		cost: 58000,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_radiant, ResourceTrait.forging_magicalConductive],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_starMetal,
		name: 'Star Metal Ingot',
		description: 'A star metal ingot.',
		type: ResourceType.ingot,
		image: 'ingot_starMetal',
		cost: 60000,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_tough, ResourceTrait.forging_magicalConductive],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	// unique
	// ingot_orichalcum = 'ingot_orichalcum', // orichalcum + gold + silver + coal
	// ingot_titanSteel = 'ingot_titalSteel', // titanStone + steel ingot + coal
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_orichalcum,
		name: 'Orichalcum Ingot',
		description: 'An orichalcum ingot.',
		type: ResourceType.ingot,
		image: 'ingot_orichalcum',
		cost: 126500,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_reflective, ResourceTrait.forging_magicalConductive],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_titanSteel,
		name: 'Titan Steel Ingot',
		description: 'A titan steel ingot.',
		type: ResourceType.ingot,
		image: 'ingot_titanSteel',
		cost: 145160,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_tough, ResourceTrait.forging_magicalInsulated, ResourceTrait.forging_heavy],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	// divine
	// ingot_aetherium = 'ingot_aetherium', // aetherium
	new ItemResourceInstance({
		id: ItemResourceEnum.ingot_aetherium,
		name: 'Aetherium Ingot',
		description: 'An aetherium ingot.',
		type: ResourceType.ingot,
		image: 'ingot_aetherium',
		cost: 2050010,
		weight: 1,
		resourceTraits: [ResourceTrait.forging_lightweight, ResourceTrait.forging_magicalConductive],
		tier: Tier.divine,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: Jeweler Resources
	// Rare (Precious but relatively common)
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_ruby,
		name: 'Ruby',
		description: 'A precious ruby, attuned to the element of Fire.',
		type: ResourceType.gem,
		image: 'gem_ruby',
		cost: 1200, // More expensive than ores due to rarity and value
		weight: 5,  // 0.5 kg, fairly small but valuable
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_emerald,
		name: 'Emerald',
		description: 'A radiant emerald, connected to the element of Geo.',
		type: ResourceType.gem,
		image: 'gem_emerald',
		cost: 1500,
		weight: 5, // 0.5 kg
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_aquamarine,
		name: 'Aquamarine',
		description: 'A mystical aquamarine, linked to the element of Water.',
		type: ResourceType.gem,
		image: 'gem_aquamarine',
		cost: 1300,
		weight: 4, // 0.4 kg, slightly lighter
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_sapphire,
		name: 'Sapphire',
		description: 'A vibrant sapphire, associated with the element of Air.',
		type: ResourceType.gem,
		image: 'gem_sapphire',
		cost: 1400,
		weight: 5, // 0.5 kg
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Epic (Rare, refined, and more valuable)
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_diamond,
		name: 'Diamond',
		description: 'A brilliant diamond, embodying the essence of Order.',
		type: ResourceType.gem,
		image: 'gem_diamond',
		cost: 3000,
		weight: 3,  // 0.3 kg, diamonds are lighter but extremely valuable
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_onyx,
		name: 'Onyx',
		description: 'A deep black onyx, infused with chaotic energy.',
		type: ResourceType.gem,
		image: 'gem_onyx',
		cost: 3500,
		weight: 4, // 0.4 kg, slightly denser
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Legendary (Exceptionally rare and powerful gems)
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_flameRuby,
		name: 'Flame Ruby',
		description: 'A rare ruby, burning with the essence of Fire.',
		type: ResourceType.gem,
		image: 'gem_flameRuby',
		cost: 10000,
		weight: 5,  // 0.5 kg
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_earthstone,
		name: 'Earthstone',
		description: 'A powerful gemstone tied to the depths of the earth.',
		type: ResourceType.gem,
		image: 'gem_earthstone',
		cost: 9000,
		weight: 6,  // 0.6 kg, denser gemstone
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_tidalPearl,
		name: 'Tidal Pearl',
		description: 'A rare pearl with deep ties to the ocean’s currents.',
		type: ResourceType.gem,
		image: 'gem_tidalPearl',
		cost: 9500,
		weight: 4,  // 0.4 kg, pearls are typically light
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_stormSapphire,
		name: 'Storm Sapphire',
		description: 'A rare sapphire charged with the energy of storms.',
		type: ResourceType.gem,
		image: 'gem_stormSapphire',
		cost: 11000,
		weight: 5, // 0.5 kg
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Unique (Incredibly rare and powerful, often with magical properties)
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_celestialDiamond,
		name: 'Celestial Diamond',
		description: 'A flawless diamond infused with celestial energy.',
		type: ResourceType.gem,
		image: 'gem_celestialDiamond',
		cost: 50000,
		weight: 3,  // 0.3 kg, extremely light but incredibly valuable
		resourceTraits: [],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_voidstone,
		name: 'Voidstone',
		description: 'A dark gemstone that holds the essence of the Void.',
		type: ResourceType.gem,
		image: 'gem_voidstone',
		cost: 60000,
		weight: 4,  //0.4 kg
		resourceTraits: [],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Divine (Ultimate, attuned to all elements)
	new ItemResourceInstance({
		id: ItemResourceEnum.gem_harmonystone,
		name: 'Harmonystone',
		description: 'A legendary gemstone embodying harmony of all elements.',
		type: ResourceType.gem,
		image: 'gem_harmonystone',
		cost: 200000,
		weight: 2,  // 0.2 kg, incredibly light for its divine properties
		resourceTraits: [],
		tier: Tier.divine,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: Jeweler Crafted Jewels (Refined from gems)
	// Rare
	// TODO
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_ruby_flawed,
		name: 'Flawed Ruby',
		description: 'A flawed ruby, with diminished fire properties.',
		type: ResourceType.jewel,
		image: 'jewel_ruby_flawed',
		cost: 1500,
		weight: 3,  // 0.3 kg, refined gems are lighter
		resourceTraits: [ResourceTrait.element_fire, ResourceTrait.jewelwork_flawed],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_ruby_cracked,
		name: 'Cracked Ruby',
		description: 'A finely cut ruby, enhancing its fiery properties.',
		type: ResourceType.jewel,
		image: 'jewel_ruby_cracked',
		cost: 3000,
		weight: 3,  // 0.3 kg, refined gems are lighter
		resourceTraits: [ResourceTrait.element_fire, ResourceTrait.jewelwork_cracked],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_ruby_refined,
		name: 'Refined Ruby',
		description: 'A finely cut ruby, enhancing its fiery properties.',
		type: ResourceType.jewel,
		image: 'jewel_ruby',
		cost: 5000, // Significantly higher due to refinement
		weight: 3,  // 0.3 kg, refined gems are lighter
		resourceTraits: [ResourceTrait.element_fire, ResourceTrait.jewelwork_refined],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_ruby_pristine,
		name: 'Pristine Ruby',
		description: 'A flawless ruby, radiating pure fire energy.',
		type: ResourceType.jewel,
		image: 'jewel_ruby_pristine',
		cost: 7000, // Significantly higher due to refinement
		weight: 3,  // 0.3 kg, refined gems are lighter
		resourceTraits: [ResourceTrait.element_fire, ResourceTrait.jewelwork_pristine],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_ruby_perfect,
		name: 'Perfect Ruby',
		description: 'A perfect ruby, glowing with intense fire magic.',
		type: ResourceType.jewel,
		image: 'jewel_ruby_perfect',
		cost: 10000, // Significantly higher due to refinement
		weight: 3,  // 0.3 kg, refined gems are lighter
		resourceTraits: [ResourceTrait.element_fire, ResourceTrait.jewelwork_perfect],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_emerald_flawed,
		name: 'Flawed Emerald',
		description: 'A flawed emerald with diminished geo-magical properties.',
		type: ResourceType.jewel,
		image: 'jewel_emerald_flawed',
		cost: 1500,
		weight: 3,
		resourceTraits: [ResourceTrait.element_geo, ResourceTrait.jewelwork_flawed],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_emerald_cracked,
		name: 'Cracked Emerald',
		description: 'A cracked emerald with enhanced geo-magical properties.',
		type: ResourceType.jewel,
		image: 'jewel_emerald_cracked',
		cost: 3000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_geo, ResourceTrait.jewelwork_cracked],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_emerald_refined,
		name: 'Refined Emerald',
		description: 'A finely cut emerald enhancing geo-magical properties.',
		type: ResourceType.jewel,
		image: 'jewel_emerald',
		cost: 5500,
		weight: 3,
		resourceTraits: [ResourceTrait.element_geo, ResourceTrait.jewelwork_refined],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_emerald_pristine,
		name: 'Pristine Emerald',
		description: 'A flawless emerald radiating pure geo-magical energy.',
		type: ResourceType.jewel,
		image: 'jewel_emerald_pristine',
		cost: 7000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_geo, ResourceTrait.jewelwork_pristine],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_emerald_perfect,
		name: 'Perfect Emerald',
		description: 'A perfect emerald glowing with intense geo-magical energy.',
		type: ResourceType.jewel,
		image: 'jewel_emerald_perfect',
		cost: 10000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_geo, ResourceTrait.jewelwork_perfect],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
    id: ItemResourceEnum.jewel_aquamarine_flawed,
    name: 'Flawed Aquamarine',
    description: 'A flawed aquamarine with diminished water magic.',
    type: ResourceType.jewel,
    image: 'jewel_aquamarine_flawed',
    cost: 1500,
    weight: 2.5,
    resourceTraits: [ResourceTrait.element_water, ResourceTrait.jewelwork_flawed],
    tier: Tier.rare,
    consumable: false,
    effects: [],
    baseEffectMagnitude: 0,
    baseEffectDuration: 0,
    consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_aquamarine_cracked,
		name: 'Cracked Aquamarine',
		description: 'A cracked aquamarine with enhanced water magic.',
		type: ResourceType.jewel,
		image: 'jewel_aquamarine_cracked',
		cost: 3000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_water, ResourceTrait.jewelwork_cracked],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_aquamarine_refined,
		name: 'Refined Aquamarine',
		description: 'A brilliant aquamarine, attuned to water magic.',
		type: ResourceType.jewel,
		image: 'jewel_aquamarine',
		cost: 5200,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_water, ResourceTrait.jewelwork_refined],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_aquamarine_pristine,
		name: 'Pristine Aquamarine',
		description: 'A flawless aquamarine radiating pure water energy.',
		type: ResourceType.jewel,
		image: 'jewel_aquamarine_pristine',
		cost: 7000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_water, ResourceTrait.jewelwork_pristine],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_aquamarine_perfect,
		name: 'Perfect Aquamarine',
		description: 'A perfect aquamarine glowing with intense water magic.',
		type: ResourceType.jewel,
		image: 'jewel_aquamarine_perfect',
		cost: 10000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_water, ResourceTrait.jewelwork_perfect],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_sapphire_flawed,
		name: 'Flawed Sapphire',
		description: 'A flawed sapphire with diminished air properties.',
		type: ResourceType.jewel,
		image: 'jewel_sapphire_flawed',
		cost: 1500,
		weight: 3,
		resourceTraits: [ResourceTrait.element_air, ResourceTrait.jewelwork_flawed],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_sapphire_cracked,
		name: 'Cracked Sapphire',
		description: 'A cracked sapphire with enhanced air properties.',
		type: ResourceType.jewel,
		image: 'jewel_sapphire_cracked',
		cost: 3000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_air, ResourceTrait.jewelwork_cracked],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_sapphire_refined,
		name: 'Refined Sapphire',
		description: 'A finely cut sapphire charged with the essence of air.',
		type: ResourceType.jewel,
		image: 'jewel_sapphire',
		cost: 5400,
		weight: 3,
		resourceTraits: [ResourceTrait.element_air, ResourceTrait.jewelwork_refined],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_sapphire_pristine,
		name: 'Pristine Sapphire',
		description: 'A flawless sapphire radiating pure air energy.',
		type: ResourceType.jewel,
		image: 'jewel_sapphire_pristine',
		cost: 7000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_air, ResourceTrait.jewelwork_pristine],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_sapphire_perfect,
		name: 'Perfect Sapphire',
		description: 'A perfect sapphire glowing with intense air magic.',
		type: ResourceType.jewel,
		image: 'jewel_sapphire_perfect',
		cost: 10000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_air, ResourceTrait.jewelwork_perfect],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Epic
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_diamond_flawed,
		name: 'Flawed Diamond',
		description: 'A flawed diamond with diminished order magic.',
		type: ResourceType.jewel,
		image: 'jewel_diamond_flawed',
		cost: 3500,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_order, ResourceTrait.jewelwork_flawed],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_diamond_cracked,
		name: 'Cracked Diamond',
		description: 'A cracked diamond that radiates strong order energy.',
		type: ResourceType.jewel,
		image: 'jewel_diamond_cracked',
		cost: 6000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_order, ResourceTrait.jewelwork_cracked],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_diamond_refined,
		name: 'Refined Diamond',
		description: 'A flawless diamond radiating pure Order energy.',
		type: ResourceType.jewel,
		image: 'jewel_diamond',
		cost: 10000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_order, ResourceTrait.jewelwork_refined],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_diamond_pristine,
		name: 'Pristine Diamond',
		description: 'A pristine diamond, perfectly cut to enhance order magic.',
		type: ResourceType.jewel,
		image: 'jewel_diamond_pristine',
		cost: 15000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_order, ResourceTrait.jewelwork_pristine],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_diamond_perfect,
		name: 'Perfect Diamond',
		description: 'A perfect diamond radiating divine order energy.',
		type: ResourceType.jewel,
		image: 'jewel_diamond_perfect',
		cost: 20000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.element_order, ResourceTrait.jewelwork_perfect],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
    id: ItemResourceEnum.jewel_onyx_flawed,
    name: 'Flawed Onyx',
    description: 'A flawed onyx, containing chaotic energy.',
    type: ResourceType.jewel,
    image: 'jewel_onyx_flawed',
    cost: 3500,
    weight: 3,
    resourceTraits: [ResourceTrait.element_chaos, ResourceTrait.jewelwork_flawed],
    tier: Tier.epic,
    consumable: false,
    effects: [],
    baseEffectMagnitude: 0,
    baseEffectDuration: 0,
    consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_onyx_cracked,
		name: 'Cracked Onyx',
		description: 'A cracked onyx, releasing chaotic energy.',
		type: ResourceType.jewel,
		image: 'jewel_onyx_cracked',
		cost: 6000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_chaos, ResourceTrait.jewelwork_cracked],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_onyx_refined,
		name: 'Refined Onyx',
		description: 'A dark onyx, emanating chaotic energy.',
		type: ResourceType.jewel,
		image: 'jewel_onyx',
		cost: 11000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_chaos, ResourceTrait.jewelwork_refined],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_onyx_pristine,
		name: 'Pristine Onyx',
		description: 'A pristine onyx, radiating chaotic energy.',
		type: ResourceType.jewel,
		image: 'jewel_onyx_pristine',
		cost: 15000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_chaos, ResourceTrait.jewelwork_pristine],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_onyx_perfect,
		name: 'Perfect Onyx',
		description: 'A perfect onyx containing immense chaotic power.',
		type: ResourceType.jewel,
		image: 'jewel_onyx_perfect',
		cost: 20000,
		weight: 3,
		resourceTraits: [ResourceTrait.element_chaos, ResourceTrait.jewelwork_perfect],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_flameRuby,
		name: 'Flame Ruby',
		description: 'A legendary ruby, blazing with fire magic.',
		type: ResourceType.jewel,
		image: 'jewel_flameRuby',
		cost: 25000,
		weight: 3,  // 0.3 kg
		resourceTraits: [ResourceTrait.element_fire, ResourceTrait.jewelwork_perfect],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_earthstone,
		name: 'Earthstone',
		description: 'A legendary jewel forged from the heart of the earth.',
		type: ResourceType.jewel,
		image: 'jewel_earthstone',
		cost: 24000,
		weight: 3.5,  // 0.35 kg, slightly heavier due to its density
		resourceTraits: [ResourceTrait.element_geo, ResourceTrait.jewelwork_perfect],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_tidalPearl,
		name: 'Tidal Pearl',
		description: 'A legendary pearl that pulses with the power of the tides.',
		type: ResourceType.jewel,
		image: 'jewel_tidalPearl',
		cost: 24500,
		weight: 2.5,  // 0.25 kg, light as a pearl
		resourceTraits: [ResourceTrait.element_water, ResourceTrait.jewelwork_perfect],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_stormSapphire,
		name: 'Storm Sapphire',
		description: 'A legendary sapphire charged with the power of a storm.',
		type: ResourceType.jewel,
		image: 'jewel_stormSapphire',
		cost: 26000,
		weight: 3,  // 0.3 kg
		resourceTraits: [ResourceTrait.element_air, ResourceTrait.jewelwork_perfect],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Unique
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_celestialDiamond,
		name: 'Celestial Diamond',
		description: 'A celestial diamond, infused with the power of the heavens.',
		type: ResourceType.jewel,
		image: 'jewel_celestialDiamond',
		cost: 50000,
		weight: 2.5, // 0.25 kg
		resourceTraits: [ResourceTrait.element_order, ResourceTrait.jewelwork_perfect],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_voidstone,
		name: 'Voidstone',
		description: 'A unique jewel that contains the chaotic power of the void.',
		type: ResourceType.jewel,
		image: 'jewel_voidstone',
		cost: 60000,
		weight: 3, // 0.3 kg
		resourceTraits: [ResourceTrait.element_chaos, ResourceTrait.jewelwork_perfect],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Divine
	new ItemResourceInstance({
		id: ItemResourceEnum.jewel_harmonystone,
		name: 'Harmonystone',
		description: 'The legendary Harmonystone, attuned to all elements.',
		type: ResourceType.jewel,
		image: 'jewel_harmonystone',
		cost: 200000,
		weight: 2,  // 0.2 kg, incredibly light but divine in nature
		resourceTraits: [ResourceTrait.element_arcane, ResourceTrait.jewelwork_perfect],
		tier: Tier.divine,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: FORAGER WOODS
	// Common
	new ItemResourceInstance({
		id: ItemResourceEnum.wood_oak,
		name: 'Oak Wood',
		description: 'A sturdy and versatile wood, commonly used in building and crafting.',
		type: ResourceType.wood,
		image: 'wood_oak',
		cost: 50,  // Common and easily found
		weight: 20, // 2 kg for a bundle
		resourceTraits: [],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.wood_pine,
		name: 'Pine Wood',
		description: 'A lightweight wood, commonly used for crafting and construction.',
		type: ResourceType.wood,
		image: 'wood_pine',
		cost: 45,  // Slightly cheaper than oak
		weight: 18, // 1.8 kg
		resourceTraits: [],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.wood_maple,
		name: 'Maple Wood',
		description: 'A flexible wood with smooth grain, ideal for fine crafting.',
		type: ResourceType.wood,
		image: 'wood_maple',
		cost: 250,  // Higher jump from common due to rarity
		weight: 22, // 2.2 kg
		resourceTraits: [],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.wood_birch,
		name: 'Birch Wood',
		description: 'A light yet durable wood, perfect for construction.',
		type: ResourceType.wood,
		image: 'wood_birch',
		cost: 240,  // Slightly cheaper than maple
		weight: 20, // 2 kg
		resourceTraits: [],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Rare
	new ItemResourceInstance({
		id: ItemResourceEnum.wood_ash,
		name: 'Ash Wood',
		description: 'A strong and flexible wood, valued for its durability.',
		type: ResourceType.wood,
		image: 'wood_ash',
		cost: 1000,  // Significant jump for rare-tier wood
		weight: 25, // 2.5 kg
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.wood_willow,
		name: 'Willow Wood',
		description: 'A lightweight wood with magical properties, used in mystical crafting.',
		type: ResourceType.wood,
		image: 'wood_willow',
		cost: 1100,  // Slightly higher than ash due to magical use
		weight: 22, // 2.2 kg
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Epic
	new ItemResourceInstance({
		id: ItemResourceEnum.wood_ironWood,
		name: 'Ironwood',
		description: 'A wood as tough as iron, perfect for crafting weapons and armor.',
		type: ResourceType.wood,
		image: 'wood_ironWood',
		cost: 5000,  // Large jump for epic-tier
		weight: 40, // 4 kg
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.wood_redWood,
		name: 'Redwood',
		description: 'A rare wood known for its resistance to decay, used in high-end furniture and magical artifacts.',
		type: ResourceType.wood,
		image: 'wood_redWood',
		cost: 5500,  // Slightly more valuable than ironwood
		weight: 30, // 3 kg
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.wood_duskWood,
		name: 'Duskwood',
		description: 'A mystical wood that absorbs light, used in crafting dark magic items.',
		type: ResourceType.wood,
		image: 'wood_duskWood',
		cost: 20000,  // Huge jump for legendary-tier
		weight: 35, // 3.5 kg
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Unique
	new ItemResourceInstance({
		id: ItemResourceEnum.wood_moonOak,
		name: 'Moon Oak',
		description: 'An ancient wood that radiates lunar energy, used in crafting rare magical items.',
		type: ResourceType.wood,
		image: 'wood_moonOak',
		cost: 50000,  // Large jump for unique-tier wood
		weight: 28, // 2.8 kg
		resourceTraits: [],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Divine
	new ItemResourceInstance({
		id: ItemResourceEnum.wood_worldTreeWood,
		name: 'World Tree Wood',
		description: 'A piece of wood from the World Tree, imbued with divine power.',
		type: ResourceType.wood,
		image: 'wood_worldTreeWood',
		cost: 200000,  // Massive value for divine-tier wood
		weight: 20, // 2 kg, surprisingly light
		resourceTraits: [],
		tier: Tier.divine,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: WOODWORKING.
	// Common
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_oak,
		name: 'Oak Plank',
		description: 'A sturdy plank made from oak wood.',
		type: ResourceType.plank,
		image: 'plank_oak',
		cost: 150,  // Processed wood is more expensive
		weight: 15, // 1.5 kg
		resourceTraits: [ResourceTrait.woodworking_sturdy],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_pine,
		name: 'Pine Plank',
		description: 'A lightweight plank made from pine wood.',
		type: ResourceType.plank,
		image: 'plank_pine',
		cost: 130,  // Slightly cheaper than oak
		weight: 13, // 1.3 kg
		resourceTraits: [ResourceTrait.woodworking_light],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_maple,
		name: 'Maple Plank',
		description: 'A smooth and flexible plank, ideal for fine craftsmanship.',
		type: ResourceType.plank,
		image: 'plank_maple',
		cost: 600,  // Larger price jump for uncommon processed wood
		weight: 16, // 1.6 kg
		resourceTraits: [ResourceTrait.woodworking_flexible],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_birch,
		name: 'Birch Plank',
		description: 'A durable plank made from birch wood, ideal for construction.',
		type: ResourceType.plank,
		image: 'plank_birch',
		cost: 580,
		weight: 16, // 1.6 kg
		resourceTraits: [ResourceTrait.woodworking_light, ResourceTrait.woodworking_sturdy],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Rare
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_ash,
		name: 'Ash Plank',
		description: 'A tough and flexible plank made from ash wood.',
		type: ResourceType.plank,
		image: 'plank_ash',
		cost: 2200,  // Significant jump
		weight: 18, // 1.8 kg
		resourceTraits: [ResourceTrait.woodworking_flexible, ResourceTrait.woodworking_sturdy],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_willow,
		name: 'Willow Plank',
		description: 'A lightweight plank made from magical willow wood.',
		type: ResourceType.plank,
		image: 'plank_willow',
		cost: 2300,
		weight: 17, // 1.7 kg
		resourceTraits: [ResourceTrait.woodworking_magicalConductive, ResourceTrait.woodworking_light],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Epic
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_ironWood,
		name: 'Ironwood Plank',
		description: 'A dense and nearly indestructible plank made from ironwood.',
		type: ResourceType.plank,
		image: 'plank_ironWood',
		cost: 10000,  // Huge price jump for epic planks
		weight: 30, // 3 kg
		resourceTraits: [ResourceTrait.woodworking_sturdy],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_redWood,
		name: 'Redwood Plank',
		description: 'A durable, decay-resistant plank made from redwood.',
		type: ResourceType.plank,
		image: 'plank_redWood',
		cost: 12000,
		weight: 25, // 2.5 kg
		resourceTraits: [ResourceTrait.woodworking_magicalInsulated, ResourceTrait.woodworking_sturdy],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_duskWood,
		name: 'Duskwood Plank',
		description: 'A mystical plank made from Duskwood, used in dark magic crafting.',
		type: ResourceType.plank,
		image: 'plank_duskWood',
		cost: 40000,  // Massive value for legendary-tier
		weight: 28, // 2.8 kg
		resourceTraits: [ResourceTrait.woodworking_magicalConductive, ResourceTrait.magical_arcane],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Unique
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_moonOak,
		name: 'Moon Oak Plank',
		description: 'A magical plank made from Moon Oak, perfect for rare crafting.',
		type: ResourceType.plank,
		image: 'plank_moonOak',
		cost: 80000,
		weight: 22, // 2.2 kg
		resourceTraits: [ResourceTrait.magical_arcane, ResourceTrait.woodworking_magicalConductive],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Divine
	new ItemResourceInstance({
		id: ItemResourceEnum.plank_worldTreeWood,
		name: 'World Tree Plank',
		description: 'A divine plank made from the wood of the World Tree.',
		type: ResourceType.plank,
		image: 'plank_worldTreeWood',
		cost: 300000,  // Massive value for divine-tier
		weight: 20, // 2 kg
		resourceTraits: [ResourceTrait.magical_blessed, ResourceTrait.woodworking_magicalConductive],
		tier: Tier.divine,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: FORAGER SILK YARN
	// Common
	new ItemResourceInstance({
		id: ItemResourceEnum.thread_cotton,
		name: 'Cotton Thread',
		description: 'A common thread spun from cotton fibers.',
		type: ResourceType.thread,
		image: 'thread_cotton',
		cost: 100,
		weight: 1, // 0.1 kg
		resourceTraits: [],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.thread_hemp,
		name: 'Hemp Thread',
		description: 'A sturdy thread spun from hemp fibers.',
		type: ResourceType.thread,
		image: 'thread_hemp',
		cost: 80,
		weight: 1,
		resourceTraits: [],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.yarn_wool,
		name: 'Wool Yarn',
		description: 'A soft and insulating yarn spun from wool.',
		type: ResourceType.yarn,
		image: 'yarn_wool',
		cost: 120,
		weight: 2, // 0.2 kg
		resourceTraits: [],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.thread_silk,
		name: 'Silk Thread',
		description: 'A smooth and luxurious thread spun from silk fibers.',
		type: ResourceType.thread,
		image: 'thread_silk',
		cost: 300,
		weight: 1,
		resourceTraits: [],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.yarn_linen,
		name: 'Linen Yarn',
		description: 'A breathable and durable yarn made from linen fibers.',
		type: ResourceType.yarn,
		image: 'yarn_linen',
		cost: 250,
		weight: 1.5, // 0.15 kg
		resourceTraits: [],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Rare
	new ItemResourceInstance({
		id: ItemResourceEnum.thread_bambooFiber,
		name: 'Bamboo Fiber Thread',
		description: 'A durable and hypoallergenic thread made from bamboo fibers.',
		type: ResourceType.thread,
		image: 'thread_bambooFiber',
		cost: 600,
		weight: 1,
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.yarn_jute,
		name: 'Jute Yarn',
		description: 'A rugged yarn used in crafting sturdy fabrics.',
		type: ResourceType.yarn,
		image: 'yarn_jute',
		cost: 500,
		weight: 1.8, // 0.18 kg
		resourceTraits: [],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Epic
	new ItemResourceInstance({
		id: ItemResourceEnum.thread_spiderSilk,
		name: 'Spider Silk Thread',
		description: 'A strong and flexible thread spun from spider silk.',
		type: ResourceType.thread,
		image: 'thread_spiderSilk',
		cost: 1200,
		weight: 1,
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.yarn_mammothWool,
		name: 'Mammoth Wool Yarn',
		description: 'An insulating yarn made from mammoth wool.',
		type: ResourceType.yarn,
		image: 'yarn_mammothWool',
		cost: 1400,
		weight: 2.5, // 0.25 kg
		resourceTraits: [],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.thread_moonlitCotton,
		name: 'Moonlit Cotton Thread',
		description: 'A rare and enchanted thread spun from moonlit cotton.',
		type: ResourceType.thread,
		image: 'thread_moonlitCotton',
		cost: 3000,
		weight: 1,
		resourceTraits: [],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Unique
	new ItemResourceInstance({
		id: ItemResourceEnum.thread_arcaneSilk,
		name: 'Arcane Silk Thread',
		description: 'An enchanted thread made from arcane silk.',
		type: ResourceType.thread,
		image: 'thread_arcaneSilk',
		cost: 8000,
		weight: 1,
		resourceTraits: [],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.yarn_eldritchMammothWool,
		name: 'Eldritch Mammoth Wool Yarn',
		description: 'A yarn infused with eldritch energy, made from the wool of mammoths.',
		type: ResourceType.yarn,
		image: 'yarn_eldritchMammothWool',
		cost: 9000,
		weight: 2.5,
		resourceTraits: [],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: Weaver
	// Common
	new ItemResourceInstance({
		id: ItemResourceEnum.fabric_cotton,
		name: 'Cotton Fabric',
		description: 'A soft and breathable fabric made from cotton.',
		type: ResourceType.fabric,
		image: 'fabric_cotton',
		cost: 200,
		weight: 1, // 0.1 kg
		resourceTraits: [ResourceTrait.weaving_soft],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.fabric_hemp,
		name: 'Hemp Fabric',
		description: 'A durable and rugged fabric made from hemp fibers.',
		type: ResourceType.fabric,
		image: 'fabric_hemp',
		cost: 180,
		weight: 1.5, // 0.15 kg
		resourceTraits: [ResourceTrait.weaving_rough],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.cloth_wool,
		name: 'Wool Cloth',
		description: 'An insulating cloth made from wool.',
		type: ResourceType.cloth,
		image: 'cloth_wool',
		cost: 220,
		weight: 2, // 0.2 kg
		resourceTraits: [ResourceTrait.weaving_insulated, ResourceTrait.weaving_soft],
		tier: Tier.common,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	//Uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.fabric_silk,
		name: 'Silk Fabric',
		description: 'A luxurious and lustrous fabric made from silk.',
		type: ResourceType.fabric,
		image: 'fabric_silk',
		cost: 450,
		weight: 1, // 0.1 kg
		resourceTraits: [ResourceTrait.weaving_soft],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.cloth_linen,
		name: 'Linen Cloth',
		description: 'A breathable and resilient cloth made from linen fibers.',
		type: ResourceType.cloth,
		image: 'cloth_linen',
		cost: 400,
		weight: 1.5, // 0.15 kg
		resourceTraits: [ResourceTrait.weaving_soft],
		tier: Tier.uncommon,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	//Rare
	new ItemResourceInstance({
		id: ItemResourceEnum.fabric_bambooFiber,
		name: 'Bamboo Fiber Fabric',
		description: 'A hypoallergenic and resilient fabric made from bamboo fibers.',
		type: ResourceType.fabric,
		image: 'fabric_bambooFiber',
		cost: 800,
		weight: 1, // 0.1 kg
		resourceTraits: [ResourceTrait.weaving_rough],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.cloth_jute,
		name: 'Jute Cloth',
		description: 'A rugged cloth, used in crafting durable garments.',
		type: ResourceType.cloth,
		image: 'cloth_jute',
		cost: 750,
		weight: 1.8, // 0.18 kg
		resourceTraits: [ResourceTrait.weaving_rough],
		tier: Tier.rare,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	//Epic
	new ItemResourceInstance({
		id: ItemResourceEnum.fabric_spiderSilk,
		name: 'Spider Silk Fabric',
		description: 'A strong and flexible fabric made from spider silk.',
		type: ResourceType.fabric,
		image: 'fabric_spiderSilk',
		cost: 2000,
		weight: 1,
		resourceTraits: [ResourceTrait.weaving_soft],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.cloth_mammothWool,
		name: 'Mammoth Wool Cloth',
		description: 'A highly insulating cloth made from mammoth wool.',
		type: ResourceType.cloth,
		image: 'cloth_mammothWool',
		cost: 2500,
		weight: 2.5, // 0.25 kg
		resourceTraits: [ResourceTrait.weaving_insulated, ResourceTrait.weaving_rough],
		tier: Tier.epic,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.fabric_moonlitCotton,
		name: 'Moonlit Cotton Fabric',
		description: 'An enchanted fabric made from moonlit cotton.',
		type: ResourceType.fabric,
		image: 'fabric_moonlitCotton',
		cost: 5000,
		weight: 1,
		resourceTraits: [ResourceTrait.weaving_magicalConductive, ResourceTrait.weaving_soft],
		tier: Tier.legendary,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Unique
	new ItemResourceInstance({
		id: ItemResourceEnum.fabric_arcaneSilk,
		name: 'Arcane Silk Fabric',
		description: 'An enchanted fabric made from arcane silk.',
		type: ResourceType.fabric,
		image: 'fabric_arcaneSilk',
		cost: 12000,
		weight: 1,
		resourceTraits: [ResourceTrait.weaving_soft, ResourceTrait.weaving_magicalConductive, ResourceTrait.magical_arcane],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	new ItemResourceInstance({
		id: ItemResourceEnum.cloth_eldritchMammothWool,
		name: 'Eldritch Mammoth Wool Cloth',
		description: 'A magical cloth made from eldritch mammoth wool.',
		type: ResourceType.cloth,
		image: 'cloth_eldritchMammothWool',
		cost: 15000,
		weight: 2.5,
		resourceTraits: [ResourceTrait.weaving_magicalConductive, ResourceTrait.weaving_rough, ResourceTrait.magical_arcane],
		tier: Tier.unique,
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: Skinner
	// common
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_cattle,
		name: 'Cattle Hide',
		description: 'A common hide sourced from cattle.',
		type: ResourceType.skin,
		image: 'skinner_hide_cattle',
		cost: 80,  // Common tier cost
		weight: 10,  // 1 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_feline,
		name: 'Feline Hide',
		description: 'A durable hide sourced from a large feline.',
		type: ResourceType.skin,
		image: 'skinner_hide_feline',
		cost: 180,  // Uncommon tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_canine,
		name: 'Canine Hide',
		description: 'A sturdy hide sourced from a canine.',
		type: ResourceType.skin,
		image: 'skinner_hide_canine',
		cost: 170,  // Uncommon tier cost
		weight: 9,  // 0.9 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_reptile,
		name: 'Reptile Hide',
		description: 'A tough hide from a reptilian creature.',
		type: ResourceType.skin,
		image: 'skinner_hide_reptile',
		cost: 190,  // Uncommon tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_fang,
		name: 'Fang',
		description: 'A sharp fang from a predator.',
		type: ResourceType.bone,
		image: 'skinner_fang',
		cost: 150,  // Uncommon tier cost
		weight: 2,  // 0.2 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_talon,
		name: 'Talon',
		description: 'A talon from a predator, sharp and deadly.',
		type: ResourceType.bone,
		image: 'skinner_talon',
		cost: 160,  // Uncommon tier cost
		weight: 2,  // 0.2 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_scale,
		name: 'Reptile Scale',
		description: 'A tough scale from a reptile.',
		type: ResourceType.scale,
		image: 'skinner_scale',
		cost: 200,  // Uncommon tier cost
		weight: 5,  // 0.5 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// rare
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_feline_tough,
		name: 'Tough Feline Hide',
		description: 'A rare, tough hide from a large feline.',
		type: ResourceType.skin,
		image: 'skinner_hide_feline_tough',
		cost: 600,  // Rare tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_canine_tough,
		name: 'Tough Canine Hide',
		description: 'A durable and rare hide from a large canine.',
		type: ResourceType.skin,
		image: 'skinner_hide_canine_tough',
		cost: 580,  // Rare tier cost
		weight: 9,  // 0.9 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_reptile_tough,
		name: 'Tough Reptile Hide',
		description: 'A rare, durable hide from a reptilian creature.',
		type: ResourceType.skin,
		image: 'skinner_hide_reptile_tough',
		cost: 620,  // Rare tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_fang_razor,
		name: 'Razor Fang',
		description: 'A razor-sharp fang from a rare predator.',
		type: ResourceType.bone,
		image: 'skinner_fang_razor',
		cost: 550,  // Rare tier cost
		weight: 2,  // 0.2 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_talon_razor,
		name: 'Razor Talon',
		description: 'A sharp, rare talon from a predator.',
		type: ResourceType.bone,
		image: 'skinner_talon_razor',
		cost: 560,  // Rare tier cost
		weight: 2,  // 0.2 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_scale_strong,
		name: 'Strong Reptile Scale',
		description: 'A rare, durable scale from a large reptile.',
		type: ResourceType.scale,
		image: 'skinner_scale_strong',
		cost: 650,  // Rare tier cost
		weight: 5,  // 0.5 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// epic
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_dragonling,
		name: 'Dragonling Hide',
		description: 'A hide sourced from a dragonling, tough and valuable.',
		type: ResourceType.skin,
		image: 'skinner_hide_dragonling',
		cost: 8000,  // Epic tier cost (huge jump due to creature rarity)
		weight: 15,  // 1.5 kg
		tier: Tier.epic,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_hide_dragon,
		name: 'Dragon Hide',
		description: 'A legendary hide sourced from an adult dragon.',
		type: ResourceType.skin,
		image: 'skinner_hide_dragon',
		cost: 30000,  // Legendary tier cost
		weight: 20,  // 2.0 kg
		tier: Tier.legendary,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.skinner_scale_dragon,
		name: 'Dragon Scale',
		description: 'A legendary scale from an adult dragon, incredibly strong.',
		type: ResourceType.scale,
		image: 'skinner_scale_dragon',
		cost: 35000,  // Legendary tier cost
		weight: 10,  // 1.0 kg
		tier: Tier.legendary,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: Tanner
	// common
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_cured_cattle,
		name: 'Cured Cattle Leather',
		description: 'Leather cured from common cattle hide.',
		type: ResourceType.leather,
		image: 'leather_cured_cattle',
		cost: 180,  // Common tier cost
		weight: 9,  // 0.9 kg
		tier: Tier.common,
		resourceTraits: [ResourceTrait.leatherwork_tough],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_feline,
		name: 'Feline Leather',
		description: 'Leather sourced from a large feline.',
		type: ResourceType.leather,
		image: 'leather_feline',
		cost: 350,  // Uncommon tier cost
		weight: 7,  // 0.7 kg
		tier: Tier.uncommon,
		resourceTraits: [ResourceTrait.leatherwork_flexible],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_canine,
		name: 'Canine Leather',
		description: 'Leather sourced from a large canine.',
		type: ResourceType.leather,
		image: 'leather_canine',
		cost: 340,  // Uncommon tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.uncommon,
		resourceTraits: [ResourceTrait.leatherwork_tough],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_reptile,
		name: 'Reptile Leather',
		description: 'Tough leather sourced from a large reptile.',
		type: ResourceType.leather,
		image: 'leather_reptile',
		cost: 360,  // Uncommon tier cost
		weight: 10,  // 1.0 kg
		tier: Tier.uncommon,
		resourceTraits: [ResourceTrait.leatherwork_insulated],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// rare
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_feline_tough,
		name: 'Tough Feline Leather',
		description: 'Rare and durable leather sourced from a tough feline.',
		type: ResourceType.leather,
		image: 'leather_feline_tough',
		cost: 1200,  // Rare tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.rare,
		resourceTraits: [ResourceTrait.leatherwork_flexible],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_canine_tough,
		name: 'Tough Canine Leather',
		description: 'Durable leather sourced from a tough canine.',
		type: ResourceType.leather,
		image: 'leather_canine_tough',
		cost: 1100,  // Rare tier cost
		weight: 9,  // 0.9 kg
		tier: Tier.rare,
		resourceTraits: [ResourceTrait.leatherwork_flexible],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_reptile_tough,
		name: 'Tough Reptile Leather',
		description: 'Rare and durable leather sourced from a reptile.',
		type: ResourceType.leather,
		image: 'leather_reptile_tough',
		cost: 1250,  // Rare tier cost
		weight: 11,  // 1.1 kg
		tier: Tier.rare,
		resourceTraits: [ResourceTrait.leatherwork_insulated],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// epic
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_dragonling,
		name: 'Dragonling Leather',
		description: 'Epic leather sourced from a dragonling, highly valuable.',
		type: ResourceType.leather,
		image: 'leather_dragonling',
		cost: 9000,  // Epic tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.epic,
		resourceTraits: [ResourceTrait.leatherwork_tough, ResourceTrait.leatherwork_magicalInsulated],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.leather_dragon,
		name: 'Dragon Leather',
		description: 'Legendary leather sourced from an adult dragon.',
		type: ResourceType.leather,
		image: 'leather_dragon',
		cost: 35000,  // Legendary tier cost
		weight: 15,  // 1.5 kg
		tier: Tier.legendary,
		resourceTraits: [ResourceTrait.leatherwork_tough, ResourceTrait.leatherwork_magicalInsulated, ResourceTrait.magical_arcane],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: SKINNER: Culinary, Ingredient and Alchemical
	// common
	// Culinary
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_rabbit,
		name: 'Rabbit Meat',
		description: 'Tender meat from a rabbit, commonly used in simple dishes.',
		type: ResourceType.culinary,
		image: 'culinary_meat_rabbit',
		cost: 30,  // Common tier cost
		weight: 10,  // 1 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Ingredient
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_blood_rabbit,
		name: 'Rabbit Blood',
		description: 'Blood collected from a rabbit, useful for alchemical mixtures.',
		type: ResourceType.ingredient,
		image: 'ingredient_blood_rabbit',
		cost: 15,  // Common tier cost
		weight: 5,  // 0.5 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Ingredient
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_meat_cattle,
		name: 'Cattle Meat (Ingredient)',
		description: 'Basic ingredient-quality cattle meat, used in alchemy or cooking.',
		type: ResourceType.ingredient,
		image: 'ingredient_meat_cattle',
		cost: 50,  // Common tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// Culinary
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_cattle,
		name: 'Cattle Meat',
		description: 'Meat from cattle, used in a wide variety of dishes.',
		type: ResourceType.culinary,
		image: 'culinary_meat_cattle',
		cost: 60,  // Common tier cost
		weight: 15,  // 1.5 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_fowl,
		name: 'Fowl Meat',
		description: 'A type of poultry meat, commonly used in roasts and stews.',
		type: ResourceType.culinary,
		image: 'culinary_meat_fowl',
		cost: 45,  // Common tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_blood_cattle,
		name: 'Cattle Blood',
		description: 'Blood collected from cattle, useful for both culinary and alchemical purposes.',
		type: ResourceType.ingredient,
		image: 'ingredient_blood_cattle',
		cost: 20,  // Common tier cost
		weight: 10,  // 1 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_innards_cattle,
		name: 'Cattle Innards',
		description: 'Various cattle innards, used in culinary or alchemical mixtures.',
		type: ResourceType.ingredient,
		image: 'ingredient_innards_cattle',
		cost: 25,  // Common tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_pig,
		name: 'Pig Meat',
		description: 'Rich meat from a pig, ideal for roasts and sausages.',
		type: ResourceType.culinary,
		image: 'culinary_meat_pig',
		cost: 55,  // Common tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_blood_pig,
		name: 'Pig Blood',
		description: 'Blood collected from a pig, used in culinary and alchemical purposes.',
		type: ResourceType.ingredient,
		image: 'ingredient_blood_pig',
		cost: 18,  // Common tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_meat_rabbit,
		name: 'Rabbit Meat (Ingredient)',
		description: 'Ingredient-quality rabbit meat, used in alchemy and cooking.',
		type: ResourceType.ingredient,
		image: 'ingredient_meat_rabbit',
		cost: 28,  // Common tier cost
		weight: 9,  // 0.9 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_wolf,
		name: 'Wolf Meat',
		description: 'Meat from a wild wolf, uncommon and slightly gamey.',
		type: ResourceType.culinary,
		image: 'culinary_meat_wolf',
		cost: 200,  // Uncommon tier cost
		weight: 10,  // 1 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_boar,
		name: 'Boar Meat',
		description: 'Savory and tough meat from a wild boar.',
		type: ResourceType.culinary,
		image: 'culinary_meat_boar',
		cost: 190,  // Uncommon tier cost
		weight: 11,  // 1.1 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_bear,
		name: 'Bear Meat',
		description: 'Rich and fatty meat from a wild bear, ideal for hearty meals.',
		type: ResourceType.culinary,
		image: 'culinary_meat_bear',
		cost: 210,  // Uncommon tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_blood_wolf,
		name: 'Wolf Blood',
		description: 'Collected blood from a wolf, useful in alchemical concoctions.',
		type: ResourceType.ingredient,
		image: 'ingredient_blood_wolf',
		cost: 160,  // Uncommon tier cost
		weight: 6,  // 0.6 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_innards_wolf,
		name: 'Wolf Innards',
		description: 'Various innards from a wolf, used in alchemy and cooking.',
		type: ResourceType.ingredient,
		image: 'ingredient_innards_wolf',
		cost: 170,  // Uncommon tier cost
		weight: 9,  // 0.9 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_serpent,
		name: 'Serpent Meat',
		description: 'Exotic meat from a large serpent, considered a delicacy.',
		type: ResourceType.culinary,
		image: 'culinary_meat_serpent',
		cost: 250,  // Uncommon tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_blood_boar,
		name: 'Boar Blood',
		description: 'Collected blood from a wild boar, used in alchemy.',
		type: ResourceType.ingredient,
		image: 'ingredient_blood_boar',
		cost: 170,  // Uncommon tier cost
		weight: 10,  // 1 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// rare
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_innards_bear,
		name: 'Bear Innards',
		description: 'Innards from a bear, used in rare alchemical recipes.',
		type: ResourceType.ingredient,
		image: 'ingredient_innards_bear',
		cost: 1200,  // Rare tier cost
		weight: 11,  // 1.1 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_meat_dragon,
		name: 'Dragon Meat',
		description: 'Meat from a dragon, legendary in flavor and power.',
		type: ResourceType.culinary,
		image: 'culinary_meat_dragon',
		cost: 35000,  // Legendary tier cost
		weight: 15,  // 1.5 kg
		tier: Tier.legendary,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_blood_dragon,
		name: 'Dragon Blood',
		description: 'Collected blood from a dragon, highly potent for alchemy.',
		type: ResourceType.ingredient,
		image: 'ingredient_blood_dragon',
		cost: 50000,  // Legendary tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.legendary,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_innards_dragon,
		name: 'Dragon Innards',
		description: 'Innards from a dragon, used in powerful alchemical mixtures.',
		type: ResourceType.ingredient,
		image: 'ingredient_innards_dragon',
		cost: 60000,  // Legendary tier cost
		weight: 18,  // 1.8 kg
		tier: Tier.legendary,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.alchemy_gland_fire_dragon,
		name: 'Fire Dragon Gland',
		description: 'A gland filled with fire energy, harvested from a dragon.',
		type: ResourceType.alchemical,
		image: 'alchemy_gland_fire_dragon',
		cost: 75000,  // Legendary tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.legendary,
		resourceTraits: [ResourceTrait.alchemy_explosive],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// MARK:: FORAGER; culinary, ingredient and alchemical
	// common
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_wildBerry,
		name: 'Wild Berry',
		description: 'A small, sweet berry found in the wild, commonly used in desserts.',
		type: ResourceType.culinary,
		image: 'culinary_wildBerry',
		cost: 25,  // Common tier cost
		weight: 5,  // 0.5 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: true,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: true
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_mushroom,
		name: 'Mushroom',
		description: 'A common edible mushroom, used in soups and stews.',
		type: ResourceType.culinary,
		image: 'culinary_mushroom',
		cost: 30,  // Common tier cost
		weight: 4,  // 0.4 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: true,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: true
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_carrot,
		name: 'Carrot',
		description: 'A crunchy root vegetable, often used in soups and salads.',
		type: ResourceType.culinary,
		image: 'culinary_carrot',
		cost: 20,  // Common tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: true,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: true
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_potato,
		name: 'Potato',
		description: 'A starchy root vegetable, ideal for roasting or boiling.',
		type: ResourceType.culinary,
		image: 'culinary_potato',
		cost: 20,  // Common tier cost
		weight: 15,  // 1.5 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_cabbageLeaf,
		name: 'Cabbage Leaf',
		description: 'A crisp and nutritious leaf from a cabbage, used in salads or soups.',
		type: ResourceType.culinary,
		image: 'culinary_cabbageLeaf',
		cost: 15,  // Common tier cost
		weight: 6,  // 0.6 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_wheatGrain,
		name: 'Wheat Grain',
		description: 'Basic wheat grains, used in making bread and other culinary dishes.',
		type: ResourceType.culinary,
		image: 'culinary_wheatGrain',
		cost: 20,  // Common tier cost
		weight: 12,  // 1.2 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_apple,
		name: 'Apple',
		description: 'A sweet and crunchy fruit, often eaten raw or used in desserts.',
		type: ResourceType.culinary,
		image: 'culinary_apple',
		cost: 25,  // Common tier cost
		weight: 7,  // 0.7 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: true,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: true
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_onion,
		name: 'Onion',
		description: 'A pungent vegetable used in a variety of dishes.',
		type: ResourceType.culinary,
		image: 'culinary_onion',
		cost: 18,  // Common tier cost
		weight: 6,  // 0.6 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_garlic,
		name: 'Garlic',
		description: 'A strong-flavored bulb, essential in many savory dishes.',
		type: ResourceType.culinary,
		image: 'culinary_garlic',
		cost: 15,  // Common tier cost
		weight: 3,  // 0.3 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_turnip,
		name: 'Turnip',
		description: 'A root vegetable, often used in soups and stews.',
		type: ResourceType.culinary,
		image: 'culinary_turnip',
		cost: 20,  // Common tier cost
		weight: 8,  // 0.8 kg
		tier: Tier.common,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// uncommon
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_wildGarlic,
		name: 'Wild Garlic',
		description: 'A pungent and aromatic herb, used in cooking and alchemy.',
		type: ResourceType.culinary,
		image: 'culinary_wildGarlic',
		cost: 60,  // Uncommon tier cost
		weight: 4,  // 0.4 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_wildMint,
		name: 'Wild Mint',
		description: 'A refreshing herb used in teas and desserts.',
		type: ResourceType.culinary,
		image: 'culinary_wildMint',
		cost: 55,  // Uncommon tier cost
		weight: 2,  // 0.2 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.culinary_truffle,
		name: 'Truffle',
		description: 'A rare and valuable mushroom used in gourmet cooking.',
		type: ResourceType.culinary,
		image: 'culinary_truffle',
		cost: 250,  // Uncommon tier cost
		weight: 3,  // 0.3 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: true,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: true
	}),
	
	// Ingredient
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_gingerRoot,
		name: 'Ginger Root',
		description: 'A spicy root, commonly used in cooking and alchemy.',
		type: ResourceType.ingredient,
		image: 'ingredient_gingerRoot',
		cost: 75,  // Uncommon tier cost
		weight: 5,  // 0.5 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	// Ingredient
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_ginsengRoot,
		name: 'Ginseng Root',
		description: 'A medicinal root, often used in potions and health elixirs.',
		type: ResourceType.ingredient,
		image: 'ingredient_ginsengRoot',
		cost: 90,  // Uncommon tier cost
		weight: 6,  // 0.6 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	// Ingredient
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_lavender,
		name: 'Lavender',
		description: 'A fragrant herb used in alchemy and cooking.',
		type: ResourceType.ingredient,
		image: 'ingredient_lavender',
		cost: 80,  // Uncommon tier cost
		weight: 3,  // 0.3 kg
		tier: Tier.uncommon,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	//rare
	new ItemResourceInstance({
		id: ItemResourceEnum.alchemy_crimsonGrass,
		name: 'Crimson Grass',
		description: 'A rare plant with magical healing properties.',
		type: ResourceType.alchemical,
		image: 'alchemy_crimsonGrass',
		cost: 1200,  // Rare tier cost
		weight: 5,  // 0.5 kg
		tier: Tier.rare,
		resourceTraits: [ResourceTrait.alchemy_rejuvenating],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),
	
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_honeyComb,
		name: 'Honey Comb',
		description: 'A rich source of honey, used in culinary and alchemical recipes.',
		type: ResourceType.ingredient,
		image: 'ingredient_honeyComb',
		cost: 1000,  // Rare tier cost
		weight: 6,  // 0.6 kg
		tier: Tier.rare,
		resourceTraits: [],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// epic
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_shadowMushroom,
		name: 'Shadow Mushroom',
		description: 'A rare, dark mushroom, often used in potent alchemical mixtures.',
		type: ResourceType.ingredient,
		image: 'ingredient_shadowMushroom',
		cost: 2500,  // Epic tier cost
		weight: 4,  // 0.4 kg
		tier: Tier.epic,
		resourceTraits: [ResourceTrait.alchemy_toxic],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	// legendary
	new ItemResourceInstance({
		id: ItemResourceEnum.alchemy_frostBloomFlower,
		name: 'Frost Bloom Flower',
		description: 'A rare and mystical flower, used in frost-related alchemy.',
		type: ResourceType.alchemical,
		image: 'alchemy_frostBloomFlower',
		cost: 15000,  // Legendary tier cost
		weight: 3,  // 0.3 kg
		tier: Tier.legendary,
		resourceTraits: [ResourceTrait.alchemy_freezing],
		consumable: false,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: false
	}),

	//unique
	new ItemResourceInstance({
		id: ItemResourceEnum.ingredient_dragonHeart,
		name: 'Dragon Heart',
		description: 'The heart of a dragon, used in the most powerful alchemical recipes.',
		type: ResourceType.ingredient,
		image: 'ingredient_dragonHeart',
		cost: 50000,  // Unique tier cost
		weight: 15,  // 1.5 kg
		tier: Tier.unique,
		resourceTraits: [ResourceTrait.alchemy_rejuvenating, ResourceTrait.body_strength],
		consumable: true,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: true
	}),

	//divine
	new ItemResourceInstance({
		id: ItemResourceEnum.alchemy_godsblood,
		name: 'Godsblood',
		description: 'A rare alchemical ingredient with divine properties.',
		type: ResourceType.alchemical,
		image: 'alchemy_godsblood',
		cost: 200000,  // Divine tier cost
		weight: 5,  // 0.5 kg
		tier: Tier.divine,
		resourceTraits: [ResourceTrait.alchemy_burning, ResourceTrait.alchemy_rejuvenating],
		consumable: true,
		effects: [],
		baseEffectMagnitude: 0,
		baseEffectDuration: 0,
		consumedAfterUse: true
	}),

];

export async function createItemResourceTableIfNotExists(){
	const tableName = 'ItemResources';
	const tableStructure = `
	    id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
    	description TEXT,
        type TEXT,
        image TEXT,
        cost INTEGER,
        weight INTEGER,
        resourceTraits TEXT,
        tier TEXT
		resourceTraits TEXT,
		consumable BOOLEAN,
		effects TEXT,
		baseEffectMagnitude INTEGER,
		baseEffectDuration INTEGER,
		consumedAfterUse BOOLEAN
	`;

	await createTableIfNotExists(tableName, tableStructure, ItemResourceSeed, 'id')
}