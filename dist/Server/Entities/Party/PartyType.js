export var PartyType;
(function (PartyType) {
    PartyType["wanderer"] = "wanderer";
    PartyType["merchant"] = "merchant";
    PartyType["rogue"] = "rogue";
    PartyType["raider"] = "raider";
    PartyType["bandit"] = "bandit";
    PartyType["criminal"] = "criminal";
    PartyType["mercenary"] = "mercenary";
    PartyType["nobleRetinue"] = "nobleRetinue";
    PartyType["pilgrim"] = "pilgrim";
    PartyType["scholar"] = "scholar";
    PartyType["hermit"] = "hermit";
    PartyType["peasant"] = "peasant";
    PartyType["artisan"] = "artisan";
    PartyType["knight"] = "knight";
    PartyType["soldier"] = "soldier";
    // Ocean Tide Kingdom
    PartyType["oceanTideSoldier"] = "oceanTideSoldier";
    PartyType["oceanTideKnight"] = "oceanTideKnight";
    // Fyonar
    PartyType["fyonarSoldier"] = "fyonarSoldier";
    PartyType["fyonarKnight"] = "fyonarKnight";
    // Jadinthar
    PartyType["jadintharSoldier"] = "jadintharSoldier";
    PartyType["jadintharKnight"] = "jadintharKnight";
})(PartyType || (PartyType = {}));
export var PartyRelation;
(function (PartyRelation) {
    PartyRelation["friendly"] = "friendly";
    PartyRelation["neutral"] = "neutral";
    PartyRelation["hostile"] = "hostile";
})(PartyRelation || (PartyRelation = {}));
const hostilePairs = [
    [PartyType.knight, PartyType.rogue],
    [PartyType.soldier, PartyType.rogue],
    [PartyType.rogue, PartyType.merchant]
];
export function getPartiesRelation(partyA, partyB) {
    if (partyA === partyB) {
        return PartyRelation.friendly;
    }
    ;
    if (partyA === PartyType.bandit || partyB === PartyType.bandit ||
        partyA === PartyType.raider || partyB === PartyType.raider ||
        partyA === PartyType.criminal || partyB === PartyType.criminal) {
        return PartyRelation.hostile;
    }
    if (hostilePairs.some(([a, b]) => (a === partyA && b === partyB) || (a === partyB && b === partyA))) {
        return PartyRelation.hostile;
    }
    return PartyRelation.neutral;
}
