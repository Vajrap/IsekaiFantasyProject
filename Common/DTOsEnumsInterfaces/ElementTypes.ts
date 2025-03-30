export enum ElementTypes {
	// Fundamental
	order = "order",
	chaos = "chaos",
	geo = "geo",
	water = "water",
	air = "air",
	fire = "fire",

	// Secondary
	ice = "ice",
	mist = "mist",
	lightning = "lightning",
	ash = "ash",
	metal = "metal",
	crystal = "crystal",

	// Tertiary
	nature = "nature",
	spirit = "spirit",
	dark = "dark",
	blight = "blight",
	poison = "poison",
	holy = "holy",

	// Arcane
	arcane = "arcane",

	// None
	none = "none",
}

const ElementTierGroups = {
	primary: new Set<ElementTypes>([
		ElementTypes.order,
		ElementTypes.chaos,
		ElementTypes.geo,
		ElementTypes.water,
		ElementTypes.air,
		ElementTypes.fire,
	]),
	secondary: new Set<ElementTypes>([
		ElementTypes.ice,
		ElementTypes.mist,
		ElementTypes.lightning,
		ElementTypes.ash,
		ElementTypes.metal,
		ElementTypes.crystal,
	]),
	tertiary: new Set<ElementTypes>([
		ElementTypes.nature,
		ElementTypes.spirit,
		ElementTypes.dark,
		ElementTypes.blight,
		ElementTypes.poison,
		ElementTypes.holy,
	]),
	arcane: new Set<ElementTypes>([ElementTypes.arcane]),
	none: new Set<ElementTypes>([ElementTypes.none]),
};

export enum ElementTier {
	primary = "primary",
	secondary = "secondary",
	tertiary = "tertiary",
	none = "none",
	arcane = "arcane",
}

export function getElementTier(element: ElementTypes): ElementTier {
	for (const [tier, group] of Object.entries(ElementTierGroups)) {
		if (group.has(element)) return tier as ElementTier;
	}
	return ElementTier.none;
}

export enum FundamentalElementTypes {
	order = ElementTypes.order,
	chaos = ElementTypes.chaos,
	geo = ElementTypes.geo,
	water = ElementTypes.water,
	air = ElementTypes.air,
	fire = ElementTypes.fire,
	none = ElementTypes.none,
}

export enum SecondaryElementTypes {
	ice = ElementTypes.ice,
	mist = ElementTypes.mist,
	lightning = ElementTypes.lightning,
	ash = ElementTypes.ash,
	metal = ElementTypes.metal,
	crystal = ElementTypes.crystal,
}

export enum TertiaryElementTypes {
	nature = ElementTypes.nature,
	spirit = ElementTypes.spirit,
	dark = ElementTypes.dark,
	blight = ElementTypes.blight,
	poison = ElementTypes.poison,
	holy = ElementTypes.holy,
}