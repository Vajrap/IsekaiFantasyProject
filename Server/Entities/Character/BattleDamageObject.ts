import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { TraitEnum } from "../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { DamageTypes } from "../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { BuffsAndDebuffsEnum } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import {
	SkillActionSubType,
	SkillApplyEffect,
	SpecialEffectResult,
} from "../Skills/SubClasses/SkillActiveEffect";

export interface BattleDamageObject {
	baseDamage: number;
	type: DamageTypes;
	crit: boolean;
	hit: number;
	trueHit: boolean;
	trueHitDice: DiceEnum;
	trueHitDC: number;
	trueHitFailDamageMultiplier: number;
	saveStat: CharacterStatusEnum;
	applyEffect: SkillApplyEffect[];
	skillActionSubType: SkillActionSubType;
	traitBasedModifier: {
		trait: TraitEnum;
		modifier: number;
	};
	buffBasedModifier: {
		buff: BuffsAndDebuffsEnum;
		stackNeeded: number;
		value: number;
	};
	specialEffect: {
		condition: {
			actor?: {
				stat: {
					type: CharacterStatusEnum;
					value: number;
				};
				trait: TraitEnum;
				buff: {
					type: BuffsAndDebuffsEnum;
					stack: number;
				};
			};
			target?: {
				stat: {
					type: CharacterStatusEnum;
					value: number;
				};
				trait: TraitEnum;
				buff: {
					type: BuffsAndDebuffsEnum;
					stack: number;
				};
			};
			skillLevel?: number;
		};
		effect: SpecialEffectResult;
	};
}
