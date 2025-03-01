
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

export enum Hostility {
	friendly = "friendly",
	neutral = "neutral",
	hostile = "hostile",
}


const hostilePairs: [PartyType, PartyType][] = [
	[PartyType.knight, PartyType.rogue],
	[PartyType.soldier, PartyType.rogue],
	[PartyType.rogue, PartyType.merchant]
];

export function getHostility(partyA: PartyType, partyB: PartyType): Hostility {
	if (partyA === partyB) {
		return Hostility.friendly;
	};

	if (
		partyA === PartyType.bandit || partyB === PartyType.bandit ||
		partyA === PartyType.raider || partyB === PartyType.raider ||
		partyA === PartyType.criminal || partyB === PartyType.criminal
	) {
		return Hostility.hostile;
	}

	if (hostilePairs.some(([a, b]) => (a === partyA && b === partyB) || (a === partyB && b === partyA))) {		
		return Hostility.hostile;
	}

	return Hostility.neutral;
}