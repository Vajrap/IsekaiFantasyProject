import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Character } from "../../../Entities/Character/Character";

class EffectAppenderFunction {
	static stun(character: Character, value: number) {
		character.buffsAndDebuffs.stun += value;
	}

	static blind(character: Character, value: number) {
		if (character.buffsAndDebuffs.blind === 0) {
			character.status.battlers.pHIT.battle -= 3;
			character.status.battlers.mHIT.battle -= 3;
		}
		character.buffsAndDebuffs.blind += value;
	}

	static slow(character: Character, value: number) {
		character.buffsAndDebuffs.slow += value;
	}

	static bleed(character: Character, value: number) {
		character.buffsAndDebuffs.bleed += value;
	}

	static poison(character: Character, value: number) {
		character.buffsAndDebuffs.poison += value;
	}

	static bound(character: Character, value: number) {
		if (character.buffsAndDebuffs.bound === 0) {
			character.status.attributes.agility.battle -= 2;
			character.status.battlers.dodge.battle -= 2;
		}
		character.buffsAndDebuffs.bound += value;
	}

	static paralyse(character: Character, value: number) {
		character.buffsAndDebuffs.paralyse += value;
	}

	static burn(character: Character, value: number) {
		character.buffsAndDebuffs.burn += value;
	}

	static awed(character: Character, value: number) {
		character.buffsAndDebuffs.awed += value;
	}

	static cursed(character: Character, value: number) {
		character.buffsAndDebuffs.cursed += value;
	}

	static freeze(character: Character, value: number) {
		if (character.buffsAndDebuffs.freeze === 0) {
			character.status.attributes.agility.battle -= 2;
		}
		character.buffsAndDebuffs.freeze += value;
	}

	static confuse(character: Character, value: number) {
		character.buffsAndDebuffs.confuse += value;
	}

	static fear(character: Character, value: number) {
		if (character.buffsAndDebuffs.fear === 0) {
			character.status.battlers.pHIT.battle -= 3;
			character.status.battlers.mHIT.battle -= 3;
		}
		character.buffsAndDebuffs.fear += value;
	}

	static entangled(character: Character, value: number) {
		if (character.buffsAndDebuffs.entangled === 0) {
			character.status.battlers.dodge.battle -= 2;
		}
		character.buffsAndDebuffs.entangled += value;
	}

	static soaked(character: Character, value: number) {
		character.buffsAndDebuffs.soaked += value;
	}

	static stoneSkin(character: Character, value: number) {
		character.status.battlers.pDEF.battle += value;
		if (character.buffsAndDebuffs.stoneSkin === 0) {
			character.status.attributes.agility.battle -= 2;
		}
		character.buffsAndDebuffs.stoneSkin += value;
	}

	static shield(character: Character, value: number) {
		character.buffsAndDebuffs.shield += value;
	}

	static stealth(character: Character, value: number) {
		character.buffsAndDebuffs.stealth += value;
	}

	static arcaneShield(character: Character, value: number) {
		character.buffsAndDebuffs.arcaneShield += value;
	}

	static divineShield(character: Character, value: number) {
		character.buffsAndDebuffs.divineShield += value;
	}

	static manaShield(character: Character, value: number) {
		character.buffsAndDebuffs.manaShield += value;
	}

	static counterAttack_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.counterAttack_2 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.counterAttack_1 === 0) {
			character.status.battlers.pCRT.battle += 1;
		}
		character.buffsAndDebuffs.counterAttack_1 += value;
	}

	static counterAttack_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.counterAttack_1 > 1) {
			character.buffsAndDebuffs.counterAttack_1 = 0;
			character.status.battlers.pCRT.battle -= 1;
		}
		if (character.buffsAndDebuffs.counterAttack_2 === 0) {
			character.status.battlers.pCRT.battle += 2;
		}
		character.buffsAndDebuffs.counterAttack_2 += value;
	}

	static counterAttackCharge_1(character: Character, value: number) {
		character.buffsAndDebuffs.counterAttackCharge_1 += value;
	}

	static counterAttackCharge_2(character: Character, value: number) {
		character.buffsAndDebuffs.counterAttackCharge_2 += value;
	}

	static taunt(character: Character, value: number) {
		character.buffsAndDebuffs.taunt += value;
	}

	static reflect(character: Character, value: number) {
		character.buffsAndDebuffs.reflect += value;
	}

	static ward(character: Character, value: number) {
		character.buffsAndDebuffs.ward += value;
	}

	static cautious(character: Character, value: number) {
		if (character.buffsAndDebuffs.cautious === 0) {
			character.status.battlers.dodge.battle += 1;
		}
		character.buffsAndDebuffs.cautious += value;
	}

	static focus(character: Character, value: number) {
		character.status.battlers.pHIT.battle += value;
		character.status.battlers.mHIT.battle += value;
		character.buffsAndDebuffs.focus += value;
	}

	static defensiveStance_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.defensiveStance_2 > 0 || character.buffsAndDebuffs.defensiveStance_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.defensiveStance_1 === 0) {
			character.status.battlers.pDEF.battle += 4;
		}
		character.buffsAndDebuffs.defensiveStance_1 += value;
	}

	static defensiveStance_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.defensiveStance_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.defensiveStance_1 > 0) {
			character.buffsAndDebuffs.defensiveStance_1 = 0;
			character.status.battlers.pDEF.battle -= 4;
		}

		if (character.buffsAndDebuffs.defensiveStance_2 === 0) {
			character.status.battlers.pDEF.battle += 6;
		}
		character.buffsAndDebuffs.defensiveStance_2 += value;
	}

	static defensiveStance_3(character: Character, value: number) {
		if (character.buffsAndDebuffs.defensiveStance_1 > 0) {
			character.buffsAndDebuffs.defensiveStance_1 = 0;
			character.status.battlers.pDEF.battle -= 4;
		}
		if (character.buffsAndDebuffs.defensiveStance_2 > 0) {
			character.buffsAndDebuffs.defensiveStance_2 = 0;
			character.status.battlers.pDEF.battle -= 6;
		}
		if (character.buffsAndDebuffs.defensiveStance_3 === 0) {
			character.status.battlers.pDEF.battle += 6;
			character.status.battlers.mDEF.battle += 2;
		}
		character.buffsAndDebuffs.defensiveStance_3 += value;
	}

	static fightingSpirit_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.fightingSpirit_2 > 0 || character.buffsAndDebuffs.fightingSpirit_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.fightingSpirit_1 === 0) {
			character.status.battlers.pATK.battle += 2;
			character.status.battlers.pDEF.battle += 2;
		}
		character.buffsAndDebuffs.fightingSpirit_1 += value;
	}

	static fightingSpirit_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.fightingSpirit_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.fightingSpirit_1 > 0) {
			character.buffsAndDebuffs.fightingSpirit_1 = 0;
			character.status.battlers.pATK.battle -= 2;
			character.status.battlers.pDEF.battle -= 2;
		}

		if (character.buffsAndDebuffs.fightingSpirit_2 === 0) {
			character.status.battlers.pATK.battle += 3;
			character.status.battlers.pDEF.battle += 3;
		}
		character.buffsAndDebuffs.fightingSpirit_2 += value;
	}

	static fightingSpirit_3(character: Character, value: number) {
		if (character.buffsAndDebuffs.fightingSpirit_1 > 0) {
			character.buffsAndDebuffs.fightingSpirit_1 = 0;
			character.status.battlers.pATK.battle -= 2;
			character.status.battlers.pDEF.battle -= 2;
		}
		if (character.buffsAndDebuffs.fightingSpirit_2 > 0) {
			character.buffsAndDebuffs.fightingSpirit_2 = 0;
			character.status.battlers.pATK.battle -= 3;
			character.status.battlers.pDEF.battle -= 3;
		}
		if (character.buffsAndDebuffs.fightingSpirit_3 === 0) {
			character.status.battlers.pATK.battle += 4;
			character.status.battlers.pDEF.battle += 4;
		}
		character.buffsAndDebuffs.fightingSpirit_3 += value;
	}

	static primalRoar_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.primalRoar_2 > 0 || character.buffsAndDebuffs.primalRoar_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.primalRoar_1 === 0) {
			character.status.battlers.pATK.battle += 3;
		}
		character.buffsAndDebuffs.primalRoar_1 += value;
	}

	static primalRoar_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.primalRoar_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.primalRoar_1 > 0) {
			character.buffsAndDebuffs.primalRoar_1 = 0;
			character.status.battlers.pATK.battle -= 3;
		}

		if (character.buffsAndDebuffs.primalRoar_2 === 0) {
			character.status.battlers.pATK.battle += 4;
			character.status.battlers.pCRT.battle += 1;
		}
		character.buffsAndDebuffs.primalRoar_2 += value;
	}

	static primalRoar_3(character: Character, value: number) {
		if (character.buffsAndDebuffs.primalRoar_1 > 0) {
			character.buffsAndDebuffs.primalRoar_1 = 0;
			character.status.battlers.pATK.battle -= 3;
		}
		if (character.buffsAndDebuffs.primalRoar_2 > 0) {
			character.buffsAndDebuffs.primalRoar_2 = 0;
			character.status.battlers.pATK.battle -= 4;
			character.status.battlers.pCRT.battle -= 1;
		}
		if (character.buffsAndDebuffs.primalRoar_3 === 0) {
			character.status.battlers.pATK.battle += 5;
			character.status.battlers.pCRT.battle += 2;
		}
		character.buffsAndDebuffs.primalRoar_3 += value;
	}

	static berserkerRage_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.berserkerRage_2 > 0 || character.buffsAndDebuffs.berserkerRage_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.berserkerRage_1 === 0) {
			character.status.battlers.pATK.battle += 3;
			character.status.battlers.pDEF.battle -= 3;
			character.status.battlers.mDEF.battle -= 3;
		}
		character.buffsAndDebuffs.berserkerRage_1 += value;
	}

	static berserkerRage_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.berserkerRage_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.berserkerRage_1 > 0) {
			character.buffsAndDebuffs.berserkerRage_1 = 0;
			character.status.battlers.pATK.battle -= 3;
			character.status.battlers.pDEF.battle += 3;
			character.status.battlers.mDEF.battle += 3;
		}

		if (character.buffsAndDebuffs.berserkerRage_2 === 0) {
			character.status.battlers.pATK.battle += 5;
			character.status.battlers.pDEF.battle -= 5;
			character.status.battlers.mDEF.battle -= 5;
		}
		character.buffsAndDebuffs.berserkerRage_2 += value;
	}

	static berserkerRage_3(character: Character, value: number) {
		if (character.buffsAndDebuffs.berserkerRage_1 > 0) {
			character.buffsAndDebuffs.berserkerRage_1 = 0;
			character.status.battlers.pATK.battle -= 3;
			character.status.battlers.pDEF.battle += 3;
			character.status.battlers.mDEF.battle += 3;
		}
		if (character.buffsAndDebuffs.berserkerRage_2 > 0) {
			character.buffsAndDebuffs.berserkerRage_2 = 0;
			character.status.battlers.pATK.battle -= 5;
			character.status.battlers.pDEF.battle += 5;
			character.status.battlers.mDEF.battle += 5;
		}
		if (character.buffsAndDebuffs.berserkerRage_3 === 0) {
			character.status.battlers.pATK.battle += 7;
			character.status.battlers.pDEF.battle -= 7;
			character.status.battlers.mDEF.battle -= 7;
		}
		character.buffsAndDebuffs.berserkerRage_3 += value;
	}

	static innerFocus_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.innerFocus_2 > 0 || character.buffsAndDebuffs.innerFocus_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.innerFocus_1 === 0) {
			character.status.battlers.pHIT.battle -= 1;
			character.status.battlers.pATK.battle -= 1;
			character.status.battlers.pDEF.battle -= 1;
			character.status.battlers.mATK.battle += 2;
		}
		character.buffsAndDebuffs.innerFocus_1 += value;
	}

	static innerFocus_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.innerFocus_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.innerFocus_1 > 0) {
			character.buffsAndDebuffs.innerFocus_1 = 0;
			character.status.battlers.pHIT.battle += 1;
			character.status.battlers.pATK.battle += 1;
			character.status.battlers.pDEF.battle += 1;
			character.status.battlers.mATK.battle -= 2;
		}

		if (character.buffsAndDebuffs.innerFocus_2 === 0) {
			character.status.battlers.pHIT.battle -= 2;
			character.status.battlers.pATK.battle -= 2;
			character.status.battlers.pDEF.battle -= 2;
			character.status.battlers.mATK.battle += 4;
		}
		character.buffsAndDebuffs.innerFocus_2 += value;
	}

	static innerFocus_3(character: Character, value: number) {
		if (character.buffsAndDebuffs.innerFocus_1 > 0) {
			character.buffsAndDebuffs.innerFocus_1 = 0;
			character.status.battlers.pHIT.battle += 1;
			character.status.battlers.pATK.battle += 1;
			character.status.battlers.pDEF.battle += 1;
			character.status.battlers.mATK.battle -= 2;
		}
		if (character.buffsAndDebuffs.innerFocus_2 > 0) {
			character.buffsAndDebuffs.innerFocus_2 = 0;
			character.status.battlers.pHIT.battle += 2;
			character.status.battlers.pATK.battle += 2;
			character.status.battlers.pDEF.battle += 2;
			character.status.battlers.mATK.battle -= 4;
		}
		if (character.buffsAndDebuffs.innerFocus_3 === 0) {
			character.status.battlers.pHIT.battle -= 3;
			character.status.battlers.pATK.battle -= 3;
			character.status.battlers.pDEF.battle -= 3;
			character.status.battlers.mATK.battle += 6;
		}
		character.buffsAndDebuffs.innerFocus_3 += value;
	}

	static battleCry_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.battleCry_2 > 0 || character.buffsAndDebuffs.battleCry_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.battleCry_1 === 0) {
			character.status.battlers.pATK.battle += 2;
			character.status.battlers.pDEF.battle += 2;
			character.status.battlers.mDEF.battle += 2;
		}
		character.buffsAndDebuffs.battleCry_1 += value;
	}

	static battleCry_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.battleCry_3 > 0) {
			return;
		}

		if (character.buffsAndDebuffs.battleCry_1 > 0) {
			character.buffsAndDebuffs.battleCry_1 = 0;
			character.status.battlers.pATK.battle -= 2;
			character.status.battlers.pDEF.battle -= 2;
			character.status.battlers.mDEF.battle -= 2;
		}

		if (character.buffsAndDebuffs.battleCry_2 === 0) {
			character.status.battlers.pATK.battle += 3;
			character.status.battlers.pDEF.battle += 3;
			character.status.battlers.mDEF.battle += 3;
		}
		character.buffsAndDebuffs.battleCry_2 += value;
	}

	static battleCry_3(character: Character, value: number) {
		if (character.buffsAndDebuffs.battleCry_1 > 0) {
			character.buffsAndDebuffs.battleCry_1 = 0;
			character.status.battlers.pATK.battle -= 2;
			character.status.battlers.pDEF.battle -= 2;
			character.status.battlers.mDEF.battle -= 2;
		}
		if (character.buffsAndDebuffs.battleCry_2 > 0) {
			character.buffsAndDebuffs.battleCry_2 = 0;
			character.status.battlers.pATK.battle -= 3;
			character.status.battlers.pDEF.battle -= 3;
			character.status.battlers.mDEF.battle -= 3;
		}
		if (character.buffsAndDebuffs.battleCry_3 === 0) {
			character.status.battlers.pATK.battle += 4;
			character.status.battlers.pDEF.battle += 4;
			character.status.battlers.mDEF.battle += 4;
		}
		character.buffsAndDebuffs.battleCry_3 += value;
	}

	static zealotsFury(character: Character, value: number) {
		if (character.buffsAndDebuffs.zealotsFury === 0) {
			character.status.battlers.pATK.battle += 4;
			character.status.battlers.pDEF.battle -= 3;
			character.status.battlers.mDEF.battle -= 3;
		}
		character.buffsAndDebuffs.zealotsFury += value;
	}

	static poisonCoating_1(character: Character, value: number) {
		if (character.buffsAndDebuffs.poisonCoating_2 > 0 || character.buffsAndDebuffs.poisonCoating_3 > 0) {
			return;
		}
		character.buffsAndDebuffs.poisonCoating_1 += value;
	}

	static poisonCoating_2(character: Character, value: number) {
		if (character.buffsAndDebuffs.poisonCoating_3 > 0) {
			return;
		}
		if (character.buffsAndDebuffs.poisonCoating_1 > 0) {
			character.buffsAndDebuffs.poisonCoating_1 = 0;
		}
		character.buffsAndDebuffs.poisonCoating_2 += value;
	}

	static poisonCoating_3(character: Character, value: number) {
		if (character.buffsAndDebuffs.poisonCoating_1 > 0) {
			character.buffsAndDebuffs.poisonCoating_1 = 0;
		}
		if (character.buffsAndDebuffs.poisonCoating_2 > 0) {
			character.buffsAndDebuffs.poisonCoating_2 = 0;
		}
		character.buffsAndDebuffs.poisonCoating_3 += value;
	}

	static haste(character: Character, value: number) {
		character.buffsAndDebuffs.haste += value;
	}

	static inspiration(character: Character, value: number) {
		character.buffsAndDebuffs.inspiration += value;
	}

	static bless(character: Character, value: number) {
		character.buffsAndDebuffs.bless += value;
	}

	static rejuvenate(character: Character, value: number) {
		character.buffsAndDebuffs.rejuvenate += value;
	}

	static cleanse(character: Character, value: number) {
		character.buffsAndDebuffs.cleanse += value;
	}

	static demoinc_empowerment(character: Character, value: number) {
		if (character.buffsAndDebuffs.demonic_empowerment === 0) {
			character.status.battlers.pATK.battle += 4;
			character.status.battlers.pDEF.battle -= 3;
			character.status.battlers.mDEF.battle -= 3;
		}
		character.buffsAndDebuffs.demonic_empowerment += value;
	}

	static mage_reflex(character: Character, value: number) {
		if (character.buffsAndDebuffs.mage_reflex === 0) {
			character.status.battlers.dodge.battle += 2;
		}
		character.buffsAndDebuffs.mage_reflex += value;
	}

	static timeWarp(character: Character, value: number) {
		character.buffsAndDebuffs.timeWarp += value;
	}

	static frost_shield(character: Character, value: number) {
		character.buffsAndDebuffs.frost_shield += value;
	}

	static petrify(character: Character, value: number) {
		if (character.buffsAndDebuffs.petrify === 0) {
			character.status.battlers.pDEF.battle += 5;
			character.status.battlers.mDEF.battle += 5;
		}
		character.buffsAndDebuffs.petrify += value;
	}

	static choking(character: Character, value: number) {
		character.buffsAndDebuffs.choking += value;
	}

	static corrupt(character: Character, value: number) {
		if (character.buffsAndDebuffs.corrupt === 0) {
			character.status.battlers.pDEF.battle -= 3;
			character.status.battlers.mDEF.battle -= 3;
		}
		character.buffsAndDebuffs.corrupt += value;
	}

	static wither(character: Character, value: number) {
		if (character.buffsAndDebuffs.wither === 0) {
			character.status.attributes.strength.battle += value;
			character.status.attributes.agility.battle += value;
			character.status.attributes.dexterity.battle += value;
			character.status.attributes.vitality.battle += value;
			character.status.attributes.endurance.battle += value;
			character.status.battlers.pATK.battle += value;
			character.status.battlers.pDEF.battle += value;
		}
		character.buffsAndDebuffs.wither += value;
	}
}


export const EffectAppender: Record<BuffsAndDebuffsEnum, (character: Character, value: number) => void> = {
	[BuffsAndDebuffsEnum.stun]: EffectAppenderFunction.stun,
	[BuffsAndDebuffsEnum.blind]: EffectAppenderFunction.blind,
	[BuffsAndDebuffsEnum.slow]: EffectAppenderFunction.slow,
	[BuffsAndDebuffsEnum.bleed]: EffectAppenderFunction.bleed,
	[BuffsAndDebuffsEnum.poison]: EffectAppenderFunction.poison,
	[BuffsAndDebuffsEnum.bound]: EffectAppenderFunction.bound,
	[BuffsAndDebuffsEnum.paralyse]: EffectAppenderFunction.paralyse,
	[BuffsAndDebuffsEnum.burn]: EffectAppenderFunction.burn,
	[BuffsAndDebuffsEnum.awed]: EffectAppenderFunction.awed,
	[BuffsAndDebuffsEnum.cursed]: EffectAppenderFunction.cursed,
	[BuffsAndDebuffsEnum.freeze]: EffectAppenderFunction.freeze,
	[BuffsAndDebuffsEnum.confuse]: EffectAppenderFunction.confuse,
	[BuffsAndDebuffsEnum.fear]: EffectAppenderFunction.fear,
	[BuffsAndDebuffsEnum.entangled]: EffectAppenderFunction.entangled,
	[BuffsAndDebuffsEnum.soaked]: EffectAppenderFunction.soaked,
	[BuffsAndDebuffsEnum.stoneSkin]: EffectAppenderFunction.stoneSkin,
	[BuffsAndDebuffsEnum.shield]: EffectAppenderFunction.shield,
	[BuffsAndDebuffsEnum.stealth]: EffectAppenderFunction.stealth,
	[BuffsAndDebuffsEnum.arcaneShield]: EffectAppenderFunction.arcaneShield,
	[BuffsAndDebuffsEnum.divineShield]: EffectAppenderFunction.divineShield,
	[BuffsAndDebuffsEnum.manaShield]: EffectAppenderFunction.manaShield,
	[BuffsAndDebuffsEnum.counterAttack_1]: EffectAppenderFunction.counterAttack_1,
	[BuffsAndDebuffsEnum.counterAttack_2]: EffectAppenderFunction.counterAttack_2,
	[BuffsAndDebuffsEnum.counterAttackCharge_1]: EffectAppenderFunction.counterAttackCharge_1,
	[BuffsAndDebuffsEnum.counterAttackCharge_2]: EffectAppenderFunction.counterAttackCharge_2,
	[BuffsAndDebuffsEnum.taunt]: EffectAppenderFunction.taunt,
	[BuffsAndDebuffsEnum.reflect]: EffectAppenderFunction.reflect,
	[BuffsAndDebuffsEnum.ward]: EffectAppenderFunction.ward,
	[BuffsAndDebuffsEnum.cautious]: EffectAppenderFunction.cautious,
	[BuffsAndDebuffsEnum.focus]: EffectAppenderFunction.focus,
	[BuffsAndDebuffsEnum.defensiveStance_1]: EffectAppenderFunction.defensiveStance_1,
	[BuffsAndDebuffsEnum.defensiveStance_2]: EffectAppenderFunction.defensiveStance_2,
	[BuffsAndDebuffsEnum.defensiveStance_3]: EffectAppenderFunction.defensiveStance_3,
	[BuffsAndDebuffsEnum.fightingSpirit_1]: EffectAppenderFunction.fightingSpirit_1,
	[BuffsAndDebuffsEnum.fightingSpirit_2]: EffectAppenderFunction.fightingSpirit_2,
	[BuffsAndDebuffsEnum.fightingSpirit_3]: EffectAppenderFunction.fightingSpirit_3,
	[BuffsAndDebuffsEnum.primalRoar_1]: EffectAppenderFunction.primalRoar_1,
	[BuffsAndDebuffsEnum.primalRoar_2]: EffectAppenderFunction.primalRoar_2,
	[BuffsAndDebuffsEnum.primalRoar_3]: EffectAppenderFunction.primalRoar_3,
	[BuffsAndDebuffsEnum.berserkerRage_1]: EffectAppenderFunction.berserkerRage_1,
	[BuffsAndDebuffsEnum.berserkerRage_2]: EffectAppenderFunction.berserkerRage_2,
	[BuffsAndDebuffsEnum.berserkerRage_3]: EffectAppenderFunction.berserkerRage_3,
	[BuffsAndDebuffsEnum.innerFocus_1]: EffectAppenderFunction.innerFocus_1,
	[BuffsAndDebuffsEnum.innerFocus_2]: EffectAppenderFunction.innerFocus_2,
	[BuffsAndDebuffsEnum.innerFocus_3]: EffectAppenderFunction.innerFocus_3,
	[BuffsAndDebuffsEnum.battleCry_1]: EffectAppenderFunction.battleCry_1,
	[BuffsAndDebuffsEnum.battleCry_2]: EffectAppenderFunction.battleCry_2,
	[BuffsAndDebuffsEnum.battleCry_3]: EffectAppenderFunction.battleCry_3,
	[BuffsAndDebuffsEnum.zealotsFury]: EffectAppenderFunction.zealotsFury,
	[BuffsAndDebuffsEnum.poisonCoating_1]: EffectAppenderFunction.poisonCoating_1,
	[BuffsAndDebuffsEnum.poisonCoating_2]: EffectAppenderFunction.poisonCoating_2,
	[BuffsAndDebuffsEnum.poisonCoating_3]: EffectAppenderFunction.poisonCoating_3,
	[BuffsAndDebuffsEnum.haste]: EffectAppenderFunction.haste,
	[BuffsAndDebuffsEnum.inspiration]: EffectAppenderFunction.inspiration,
	[BuffsAndDebuffsEnum.bless]: EffectAppenderFunction.bless,
	[BuffsAndDebuffsEnum.rejuvenate]: EffectAppenderFunction.rejuvenate,
	[BuffsAndDebuffsEnum.cleanse]: EffectAppenderFunction.cleanse,
	[BuffsAndDebuffsEnum.demonic_empowerment]: EffectAppenderFunction.demoinc_empowerment,
	[BuffsAndDebuffsEnum.mage_reflex]: EffectAppenderFunction.mage_reflex,
	[BuffsAndDebuffsEnum.timeWarp]: EffectAppenderFunction.timeWarp,
	[BuffsAndDebuffsEnum.frost_shield]: EffectAppenderFunction.frost_shield,
	[BuffsAndDebuffsEnum.petrify]: EffectAppenderFunction.petrify,
	[BuffsAndDebuffsEnum.choking]: EffectAppenderFunction.choking,
	[BuffsAndDebuffsEnum.corrupt]: EffectAppenderFunction.corrupt,
	[BuffsAndDebuffsEnum.wither]: EffectAppenderFunction.wither
};
