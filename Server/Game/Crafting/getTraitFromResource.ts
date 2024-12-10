import { ResourceTrait } from "../../Database/Item/Resource/resource";
import { Dice } from "../../Utility/Dice";

export enum TraitResultEnum {
	pATK = 'pATK',  // Physical Attack
    pDEF = 'pDEF',  // Physical Defense
    mATK = 'mATK',  // Magical Attack
    mDEF = 'mDEF',  // Magical Defense
    pCRT = 'pCRT',  // Physical Critical
    mCRT = 'mCRT',  // Magical Critical
    pHIT = 'pHIT',  // Physical Hit Rate
	mHIT = 'mHIT',  // Magical Hit Rate
    dodge = 'dodge',  // Dodge Rate
    HPRegen = 'HPRegen',  // HP Regeneration
    SPRegen = 'SPRegen',  // Stamina Regeneration
    MPRegen = 'MPRegen',  // Mana Regeneration

	// Permanent Stats traits only apply to cooking and alchemy, Don't use them with equipments
	permanent_charisma = 'permanent_charisma',  // Permanent Charisma
	permanent_luck = 'permanent_luck',  // Permanent Luck
	permanent_intelligence = 'permanent_intelligence',  // Permanent Intelligence
	permanent_leadership = 'permanent_leadership',  // Permanent Leadership
	permanent_vitality = 'permanent_vitality',  // Permanent Vitality
	permanent_willpower = 'permanent_willpower',  // Permanent Willpower
	permanent_breath = 'permanent_breath',  // Permanent Breath
	permanent_planar = 'permanent_planar',  // Permanent Planar
	permanent_dexterity = 'permanent_dexterity',  // Permanent Dexterity
	permanent_agility = 'permanent_agility',  // Permanent Agility
	permanent_strength = 'permanent_strength',  // Permanent Strength
	permanent_endurance = 'permanent_endurance',  // Permanent Endurance	
	permanent_maxHP = 'permanent_maxHP',  // Permanent Max HP
	permanent_maxMP = 'permanent_maxMP',  // Permanent Max MP
	permanent_maxSP = 'permanent_maxSP',  // Permanent Max SP
	temporary_charisma = 'temporary_charisma',  // Temporary Charisma
	temporary_luck = 'temporary_luck',  // Temporary Luck
	temporary_intelligence = 'temporary_intelligence',  // Temporary Intelligence
	temporary_leadership = 'temporary_leadership',  // Temporary Leadership
	temporary_vitality = 'temporary_vitality',  // Temporary Vitality
	temporary_willpower = 'temporary_willpower',  // Temporary Willpower
	temporary_breath = 'temporary_breath',  // Temporary Breath
	temporary_planar = 'temporary_planar',  // Temporary Planar
	temporary_dexterity = 'temporary_dexterity',  // Temporary Dexterity
	temporary_agility = 'temporary_agility',  // Temporary Agility
	temporary_strength = 'temporary_strength',  // Temporary Strength
	temporary_endurance = 'temporary_endurance',  // Temporary Endurance
	temporary_maxHP = 'temporary_maxHP',  // Temporary Max HP
	temporary_maxMP = 'temporary_maxMP',  // Temporary Max MP
	temporary_maxSP = 'temporary_maxSP',  // Temporary Max SP

	element_order = 'element_order',  // Order Element
	element_chaos = 'element_chaos',  // Chaos Element
	element_fire = 'element_fire',  // Fire Element
	element_water = 'element_water',  // Water Element
	element_geo = 'element_geo',  // Geo Element
	element_air = 'element_air',  // Air Element
	element_chiCold = 'element_chiCold',  // Chi Cold Element
	element_chiWarm = 'element_chiWarm',  // Chi Warm Element
	element_chiHarmony = 'element_chiHarmony',  // Chi Harmony Element
	element_arcane = 'element_arcane',  // Arcane Element

	arcane_aptitude_plus = 'arcane_aptitude_plus',  // Arcane Aptitude Plus
	arcane_aptitude_minus = 'arcane_aptitude_minus',  // Arcane Aptitude Minus

    // Skills
    smithing = 'smithing',
    woodcutting = 'woodcutting',
    alchemy = 'alchemy',
    enchanting = 'enchanting',
    weaving = 'weaving',
    cooking = 'cooking',

	// Alchemical effect
	// Alchemical idea: Add a common skill that would let character use (like throwing) alchemical items, and it'll use the item in quickslot (Add quickslot system)
	alchemy_explosive = 'alchemy_explosive',  // Explode, deal group fire damage
	alchemy_corrosive = 'alchemy_corrosive',  // Explode, deal small amount of poison damage and may apply poison
	alchemy_toxic = 'alchemy_toxic',  // No exploding damage add poison to all enemies
	alchemy_freeze = 'alchemy_freeze',  // No exploding damage add freeze to all enemies

	alchemy_replenishHP = 'alchemy_replenishHP',  // Replenish HP Alchemical Effect
	alchemy_replenishMP = 'alchemy_replenishMP',  // Replenish MP Alchemical Effect
	alchemy_replenishSP = 'alchemy_replenishSP',  // Replenish SP Alchemical Effect
	alchemy_replenishAll = 'alchemy_replenishAll',  // Replenish All Alchemical Effect
	alchemy_rejuvenateHP = 'alchemy_rejuvenateHP',  // Rejuvenate HP Alchemical Effect
	alchemy_rejuvenateMP = 'alchemy_rejuvenateMP',  // Rejuvenate MP Alchemical Effect
	alchemy_rejuvenateSP = 'alchemy_rejuvenateSP',  // Rejuvenate SP Alchemical Effect
}

export function getTraitResultFromResourceTrait(resourceTrait: ResourceTrait): TraitResultEnum {

	let diceRoll = Dice.roll('1d4').sum;

	switch (resourceTrait) {
		// Cooking cases
		case 'cooking_spicy':
			const traitArr = [TraitResultEnum.pATK, TraitResultEnum.element_fire,  TraitResultEnum.smithing];
			return traitArr[diceRoll - 1];
			case 'cooking_savory': {
				const traitArr = [TraitResultEnum.pDEF, TraitResultEnum.element_geo, TraitResultEnum.woodcutting];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_sweet': {
				const traitArr = [TraitResultEnum.mATK, TraitResultEnum.element_water, TraitResultEnum.alchemy];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_bitter': {
				const traitArr = [TraitResultEnum.mDEF, TraitResultEnum.element_air, TraitResultEnum.enchanting];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_sour': {
				const traitArr = [TraitResultEnum.pHIT, TraitResultEnum.element_chaos, TraitResultEnum.weaving];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_salty': {
				const traitArr = [TraitResultEnum.dodge, TraitResultEnum.element_order, TraitResultEnum.cooking];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_crispy': {
				const traitArr = [TraitResultEnum.pCRT, TraitResultEnum.element_fire,  TraitResultEnum.smithing];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_juicy': {
				const traitArr = [TraitResultEnum.HPRegen, TraitResultEnum.element_water, TraitResultEnum.alchemy];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_chewy': {
				const traitArr = [TraitResultEnum.SPRegen, TraitResultEnum.element_geo, TraitResultEnum.woodcutting];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_crunchy': {
				const traitArr = [TraitResultEnum.pDEF, TraitResultEnum.element_air, TraitResultEnum.enchanting];
				return traitArr[diceRoll - 1];
			}
			case 'cooking_tender': {
				const traitArr = [TraitResultEnum.MPRegen, TraitResultEnum.element_water, TraitResultEnum.weaving];
				return traitArr[diceRoll - 1];
			}
			// Element Defense cases
			case "element_fire":
				return TraitResultEnum.element_fire;
			case "element_water":
				return TraitResultEnum.element_water;
			case "element_geo":
				return TraitResultEnum.element_geo;
			case "element_air":
				return TraitResultEnum.element_air;
			case "element_order":
				return TraitResultEnum.element_order;
			case "element_chaos":
				return TraitResultEnum.element_chaos;
			case "element_arcane":
				return TraitResultEnum.element_arcane;
			case "element_chiCold":
				return TraitResultEnum.element_chiCold;
			case "element_chiWarm":
				return TraitResultEnum.element_chiWarm;
			case "element_chiHarmony":
				return TraitResultEnum.element_chiHarmony;
			// Body cases
			case "body_hp":
				return TraitResultEnum.temporary_maxHP;
			case "body_mp":
				return TraitResultEnum.temporary_maxMP;
			case "body_sp":
				return TraitResultEnum.temporary_maxSP;
			case "body_charisma":
				return TraitResultEnum.temporary_charisma;
			case "body_luck":
				return TraitResultEnum.temporary_luck;
			case "body_breath":
				return TraitResultEnum.temporary_breath;
			case "body_planar":
				return TraitResultEnum.temporary_planar;
			case "body_dexterity":
				return TraitResultEnum.temporary_dexterity;
			case "body_agility":
				return TraitResultEnum.temporary_agility;
			case "body_intelligence":
				return TraitResultEnum.temporary_intelligence;
			case "body_leadership":
				return TraitResultEnum.temporary_leadership;
			case "body_strength":
				return TraitResultEnum.temporary_strength;
			case "body_endurance":
				return TraitResultEnum.temporary_endurance;
			case "body_vitality":
				return TraitResultEnum.temporary_vitality;
			case "body_willpower":
				return TraitResultEnum.temporary_willpower;
			case "body_hp_permanent":
				return TraitResultEnum.permanent_maxHP;
			case "body_mp_permanent":
				return TraitResultEnum.permanent_maxMP;
			case "body_sp_permanent":
				return TraitResultEnum.permanent_maxSP;
			case "body_charisma_permanent":
				return TraitResultEnum.permanent_charisma;
			case "body_luck_permanent":
				return TraitResultEnum.permanent_luck;
			case "body_breath_permanent":
				return TraitResultEnum.permanent_breath;
			case "body_planar_permanent":
				return TraitResultEnum.permanent_planar;
			case "body_dexterity_permanent":
				return TraitResultEnum.permanent_dexterity;
			case "body_agility_permanent":
				return TraitResultEnum.permanent_agility;
			case "body_intelligence_permanent":
				return TraitResultEnum.permanent_intelligence;
			case "body_leadership_permanent":
				return TraitResultEnum.permanent_leadership;
			case "body_strength_permanent":
				return TraitResultEnum.permanent_strength;
			case "body_endurance_permanent":
				return TraitResultEnum.permanent_endurance;
			case "body_vitality_permanent":
				return TraitResultEnum.permanent_vitality;
			case "body_willpower_permanent":
				return TraitResultEnum.permanent_willpower;
			// Alchemy cases
			case "alchemy_explosive": {
				const traitArr = [TraitResultEnum.element_fire, TraitResultEnum.alchemy_explosive, TraitResultEnum.mATK, TraitResultEnum.smithing, TraitResultEnum.temporary_strength];
				return traitArr[diceRoll - 1];
			}
			case "alchemy_corrosive": {
				const traitArr = [TraitResultEnum.alchemy_corrosive, TraitResultEnum.element_chaos, TraitResultEnum.alchemy, TraitResultEnum.temporary_dexterity];
				return traitArr[diceRoll - 1];
			}
			case "alchemy_toxic": {
				const traitArr = [ TraitResultEnum.alchemy_freeze, TraitResultEnum.weaving, TraitResultEnum.temporary_charisma ];
				return traitArr[diceRoll - 1];
			}
			case "alchemy_rejuvenating": {
				const traitArr = [ TraitResultEnum.alchemy_rejuvenateHP, TraitResultEnum.alchemy_replenishHP, TraitResultEnum.cooking, TraitResultEnum.temporary_luck];
				return traitArr[diceRoll - 1];
			}
			case "alchemy_planarsource": {
				const traitArr = [TraitResultEnum.element_arcane, TraitResultEnum.alchemy_rejuvenateMP, TraitResultEnum.alchemy_replenishMP, TraitResultEnum.woodcutting, TraitResultEnum.temporary_willpower];
				return traitArr[diceRoll - 1];
			}
			///... Fill all the rest for me
			case "alchemy_energizing": {
				const traitArr = [TraitResultEnum.alchemy_replenishSP, TraitResultEnum.alchemy_rejuvenateSP, TraitResultEnum.mATK, TraitResultEnum.cooking, TraitResultEnum.temporary_agility];
				return traitArr[diceRoll - 1];
			}
			case "alchemy_freezing": {
				const traitArr = [TraitResultEnum.alchemy_freeze, TraitResultEnum.element_air, TraitResultEnum.enchanting, TraitResultEnum.temporary_endurance];
				return traitArr[diceRoll - 1];
			}
	
			// Forging cases
			case "forging_lightweight": {
				const traitArr = [TraitResultEnum.pHIT, TraitResultEnum.dodge, TraitResultEnum.mATK, TraitResultEnum.temporary_dexterity];
				return traitArr[diceRoll - 1];
			}
			case "forging_heavy": {
				const traitArr = [TraitResultEnum.pDEF, TraitResultEnum.mDEF, TraitResultEnum.pATK, TraitResultEnum.temporary_strength];
				return traitArr[diceRoll - 1];
			}
			case "forging_tough": {
				const traitArr = [TraitResultEnum.pDEF, TraitResultEnum.element_geo, TraitResultEnum.element_order, TraitResultEnum.temporary_endurance];
				return traitArr[diceRoll - 1];
			}
			case "forging_fragile": {
				const traitArr = [TraitResultEnum.mCRT, TraitResultEnum.pCRT, TraitResultEnum.mHIT, TraitResultEnum.temporary_charisma];
				return traitArr[diceRoll - 1];
			}
			case "forging_flexible": {
				const traitArr = [TraitResultEnum.dodge, TraitResultEnum.pHIT, TraitResultEnum.mCRT, TraitResultEnum.temporary_agility];
				return traitArr[diceRoll - 1];
			}
			case "forging_heat_resistant": {
				const traitArr = [ TraitResultEnum.pDEF, TraitResultEnum.smithing, TraitResultEnum.temporary_vitality];
				return traitArr[diceRoll - 1];
			}
			case "forging_cold_resistant": {
				const traitArr = [TraitResultEnum.element_water, TraitResultEnum.element_order, TraitResultEnum.mDEF, TraitResultEnum.enchanting, TraitResultEnum.temporary_intelligence];
				return traitArr[diceRoll - 1];
			}
			case "forging_conductive": {
				const traitArr = [TraitResultEnum.element_chaos, TraitResultEnum.element_air, TraitResultEnum.pATK, TraitResultEnum.temporary_charisma];
				return traitArr[diceRoll - 1];
			}
			case "forging_magicalConductive": {
				const traitArr = [TraitResultEnum.element_arcane, TraitResultEnum.arcane_aptitude_plus, TraitResultEnum.mATK, TraitResultEnum.temporary_intelligence];
				return traitArr[diceRoll - 1];
			}
			case "forging_magicalInsulated": {
				const traitArr = [TraitResultEnum.arcane_aptitude_minus,  TraitResultEnum.mDEF, TraitResultEnum.temporary_vitality];
				return traitArr[diceRoll - 1];
			}
			case "forging_reflective": {
				const traitArr = [TraitResultEnum.mCRT, TraitResultEnum.pCRT, TraitResultEnum.mHIT, TraitResultEnum.temporary_luck];
				return traitArr[diceRoll - 1];
			}
			case "forging_radiant": {
				const traitArr = [TraitResultEnum.element_order, TraitResultEnum.element_geo, TraitResultEnum.temporary_charisma];
				return traitArr[diceRoll - 1];
			}
			case "forging_undeadProof": {
				const traitArr = [TraitResultEnum.element_order, TraitResultEnum.element_fire, TraitResultEnum.mDEF, TraitResultEnum.temporary_willpower];
				return traitArr[diceRoll - 1];
			}
	
			// Leatherworking cases
			case "leatherwork_flexible": {
				const traitArr = [TraitResultEnum.dodge, TraitResultEnum.pHIT, TraitResultEnum.mCRT, TraitResultEnum.temporary_agility];
				return traitArr[diceRoll - 1];
			}
			case "leatherwork_tough": {
				const traitArr = [TraitResultEnum.pDEF, TraitResultEnum.mDEF, TraitResultEnum.pATK, TraitResultEnum.temporary_endurance];
				return traitArr[diceRoll - 1];
			}
			case "leatherwork_insulated": {
				const traitArr = [ TraitResultEnum.mDEF, TraitResultEnum.temporary_vitality];
				return traitArr[diceRoll - 1];
			}
			case "leatherwork_magicalInsulated": {
				const traitArr = [TraitResultEnum.arcane_aptitude_minus, TraitResultEnum.mDEF, TraitResultEnum.temporary_willpower];
				return traitArr[diceRoll - 1];
			}
			case "leatherwork_magicalConductive": {
				const traitArr = [TraitResultEnum.arcane_aptitude_plus, TraitResultEnum.mATK, TraitResultEnum.temporary_intelligence];
				return traitArr[diceRoll - 1];
			}
	
			// Weaving cases
			case "weaving_rough": {
				const traitArr = [TraitResultEnum.pDEF, TraitResultEnum.mDEF, TraitResultEnum.temporary_endurance];
				return traitArr[diceRoll - 1];
			}
			case "weaving_soft": {
				const traitArr = [TraitResultEnum.dodge, TraitResultEnum.pHIT, TraitResultEnum.mCRT, TraitResultEnum.temporary_dexterity];
				return traitArr[diceRoll - 1];
			}
			case "weaving_insulated": {
				const traitArr = [ TraitResultEnum.mDEF, TraitResultEnum.temporary_vitality];
				return traitArr[diceRoll - 1];
			}
			case "weaving_magicalConductive": {
				const traitArr = [TraitResultEnum.arcane_aptitude_plus, TraitResultEnum.element_fire, TraitResultEnum.mATK, TraitResultEnum.temporary_intelligence];
				return traitArr[diceRoll - 1];
			}
			case "weaving_magicalInsulated": {
				const traitArr = [TraitResultEnum.arcane_aptitude_minus, TraitResultEnum.mDEF, TraitResultEnum.temporary_willpower];
				return traitArr[diceRoll - 1];
			}
	
			// Woodworking cases
			case "woodworking_sturdy": {
				const traitArr = [TraitResultEnum.pDEF, TraitResultEnum.pATK, TraitResultEnum.temporary_strength];
				return traitArr[diceRoll - 1];
			}
			case "woodworking_flexible": {
				const traitArr = [TraitResultEnum.dodge, TraitResultEnum.pHIT, TraitResultEnum.mCRT, TraitResultEnum.temporary_dexterity];
				return traitArr[diceRoll - 1];
			}
			case "woodworking_light": {
				const traitArr = [TraitResultEnum.dodge, TraitResultEnum.mHIT, TraitResultEnum.pCRT, TraitResultEnum.temporary_agility];
				return traitArr[diceRoll - 1];
			}
			case "woodworking_magicalConductive": {
				const traitArr = [TraitResultEnum.arcane_aptitude_plus, TraitResultEnum.mATK, TraitResultEnum.temporary_intelligence];
				return traitArr[diceRoll - 1];
			}
			case "woodworking_magicalInsulated": {
				const traitArr = [TraitResultEnum.arcane_aptitude_minus, TraitResultEnum.mDEF, TraitResultEnum.temporary_willpower];
				return traitArr[diceRoll - 1];
			}

			default:
				throw new Error("Invalid trait");
	}
}

