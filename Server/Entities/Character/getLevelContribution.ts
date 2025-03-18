import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { StatMod } from "../../Utility/StatMod";

export function getLevelContribution(skillLevel: number, tier: Tier): number {
	switch (tier) {
		case Tier.divine:
			if (skillLevel === 1) return 5;
			else if (skillLevel <= 4) return 6;
			else if (skillLevel <= 7) return 7;
			else if (skillLevel <= 10) return 8;
			else if (skillLevel <= 13) return 9;
			else if (skillLevel <= 15) return 10;
			return 0;
		case Tier.unique:
			if (skillLevel <= 4) return 5;
			else if (skillLevel <= 7) return 6;
			else if (skillLevel <= 10) return 7;
			return 0;
		case Tier.legendary:
			if (skillLevel <= 4) return 3;
			else if (skillLevel <= 7) return 4;
			else if (skillLevel <= 10) return 5;
			return 0;
		case Tier.epic:
			if (skillLevel <= 4) return 3;
			else if (skillLevel <= 7) return 4;
			return 0;
		case Tier.rare:
			if (skillLevel <= 4) return 2;
			else if (skillLevel <= 7) return 3;
			return 0;
		case Tier.uncommon:
			if (skillLevel <= 4) return 1;
			else if (skillLevel === 5) return 2;
			return 0;
		case Tier.common:
			return 1;
		default:
			return 0;
	}
}

export function getExpNeededForStatus(statValue: number) {
  return getExpNeeded(StatMod.value(statValue));
}

export function getExpNeededForSkill(skillLevel: number, tier: Tier) {
  const value = getLevelContribution(skillLevel, tier);
  return getExpNeeded(value);
}

function getExpNeeded(tier: number) {
  return 50 + (Math.max(tier, 0) + 1) ** 2 * 20;
}
