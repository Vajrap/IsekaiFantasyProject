export enum PartyType {
	wanderer = "wanderer",
	merchant = "merchant",
	rogue = "rogue",
	raider = "raider",
	bandit = "bandit",
	criminal = "criminal",
	mercenary = "mercenary",
	nobleRetinue = "nobleRetinue",
	pilgrim = "pilgrim",
	scholar = "scholar",
	hermit = "hermit",
	peasant = "peasant",
	artisan = "artisan",
	knight = "knight",
	soldier = "soldier",
	// Ocean Tide Kingdom
	oceanTideSoldier = "oceanTideSoldier",
	oceanTideKnight = "oceanTideKnight",
	// Fyonar
	fyonarSoldier = "fyonarSoldier",
	fyonarKnight = "fyonarKnight",
	// Jadinthar
	jadintharSoldier = "jadintharSoldier",
	jadintharKnight = "jadintharKnight",
}

export enum PartyRelation {
	friendly = "friendly",
	neutral = "neutral",
	hostile = "hostile",
}


const hostilePairs: [PartyType, PartyType][] = [
	[PartyType.knight, PartyType.rogue],
	[PartyType.soldier, PartyType.rogue],
	[PartyType.rogue, PartyType.merchant]
];

export function getPartiesRelation(partyA: PartyType, partyB: PartyType): PartyRelation {
	if (partyA === partyB) {
		return PartyRelation.friendly;
	};

	if (
		partyA === PartyType.bandit || partyB === PartyType.bandit ||
		partyA === PartyType.raider || partyB === PartyType.raider ||
		partyA === PartyType.criminal || partyB === PartyType.criminal
	) {
		return PartyRelation.hostile;
	}

	if (hostilePairs.some(([a, b]) => (a === partyA && b === partyB) || (a === partyB && b === partyA))) {		
		return PartyRelation.hostile;
	}

	return PartyRelation.neutral;
}
