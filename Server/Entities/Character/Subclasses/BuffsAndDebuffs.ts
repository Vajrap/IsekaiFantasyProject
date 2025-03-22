import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";

export class BuffsAndDebuffs {
	// 💥 Debuffs
	stun: number = 0;
	blind: number = 0;
	slow: number = 0;
	bleed: number = 0;
	poison: number = 0;
	bound: number = 0;
	paralyse: number = 0;
	burn: number = 0;
	awed: number = 0;
	cursed: number = 0;
	freeze: number = 0;
	confuse: number = 0;
	fear: number = 0;
	entangled: number = 0;
	soaked: number = 0;

	// 🛡️ Defensive Buffs
	stoneSkin: number = 0;
	shield: number = 0;
	stealth: number = 0;
	arcaneShield: number = 0;
	divineShield: number = 0;
	manaShield: number = 0;

	// ⚔️ Counter and Reactive
	counterAttack_1: number = 0;
	counterAttack_2: number = 0;
	counterAttackCharge_1: number = 0;
	counterAttackCharge_2: number = 0;
	taunt: number = 0;
	reflect: number = 0;
	ward: number = 0;

	// ⚔️ Combat Buffs
	cautious: number = 0;
	focus: number = 0;
	defensiveStance_1: number = 0;
	defensiveStance_2: number = 0;
	defensiveStance_3: number = 0;
	fightingSpirit_1: number = 0;
	fightingSpirit_2: number = 0;
	fightingSpirit_3: number = 0;
	primalRoar_1: number = 0;
	primalRoar_2: number = 0;
	primalRoar_3: number = 0;
	berserkerRage_1: number = 0;
	berserkerRage_2: number = 0;
	berserkerRage_3: number = 0;
	innerFocus_1: number = 0;
	innerFocus_2: number = 0;
	innerFocus_3: number = 0;
	battleCry_1: number = 0;
	battleCry_2: number = 0;
	battleCry_3: number = 0;
	zealotsFury: number = 0;
	poisonCoating_1: number = 0;
	poisonCoating_2: number = 0;
	poisonCoating_3: number = 0;

	// ✨ Magic & Utility
	haste: number = 0;
	inspiration: number = 0;
	bless: number = 0;
	rejuvenate: number = 0;
	cleanse: number = 0;
	demonic_empowerment: number = 0;
	mage_reflex: number = 0;
	timeWarp: number = 0;
	frost_shield: number = 0;
	petrify: number = 0;
	choking: number = 0;
	corrupt: number = 0;
	wither: number = 0;

	constructor() {
		// No need for duplicate initializations
	}

	getBuffsAndDebuffs(): Record<BuffsAndDebuffsEnum, number> {
		return {
			[BuffsAndDebuffsEnum.stun]: this.stun,
			[BuffsAndDebuffsEnum.blind]: this.blind,
			[BuffsAndDebuffsEnum.slow]: this.slow,
			[BuffsAndDebuffsEnum.bleed]: this.bleed,
			[BuffsAndDebuffsEnum.poison]: this.poison,
			[BuffsAndDebuffsEnum.bound]: this.bound,
			[BuffsAndDebuffsEnum.paralyse]: this.paralyse,
			[BuffsAndDebuffsEnum.burn]: this.burn,
			[BuffsAndDebuffsEnum.awed]: this.awed,
			[BuffsAndDebuffsEnum.cursed]: this.cursed,
			[BuffsAndDebuffsEnum.freeze]: this.freeze,
			[BuffsAndDebuffsEnum.confuse]: this.confuse,
			[BuffsAndDebuffsEnum.fear]: this.fear,
			[BuffsAndDebuffsEnum.entangled]: this.entangled,
			[BuffsAndDebuffsEnum.soaked]: this.soaked,
			[BuffsAndDebuffsEnum.stoneSkin]: this.stoneSkin,
			[BuffsAndDebuffsEnum.shield]: this.shield,
			[BuffsAndDebuffsEnum.stealth]: this.stealth,
			[BuffsAndDebuffsEnum.arcaneShield]: this.arcaneShield,
			[BuffsAndDebuffsEnum.divineShield]: this.divineShield,
			[BuffsAndDebuffsEnum.manaShield]: this.manaShield,
			[BuffsAndDebuffsEnum.counterAttack_1]: this.counterAttack_1,
			[BuffsAndDebuffsEnum.counterAttack_2]: this.counterAttack_2,
			[BuffsAndDebuffsEnum.counterAttackCharge_1]: this.counterAttackCharge_1,
			[BuffsAndDebuffsEnum.counterAttackCharge_2]: this.counterAttackCharge_2,
			[BuffsAndDebuffsEnum.taunt]: this.taunt,
			[BuffsAndDebuffsEnum.reflect]: this.reflect,
			[BuffsAndDebuffsEnum.ward]: this.ward,
			[BuffsAndDebuffsEnum.cautious]: this.cautious,
			[BuffsAndDebuffsEnum.focus]: this.focus,
			[BuffsAndDebuffsEnum.defensiveStance_1]: this.defensiveStance_1,
			[BuffsAndDebuffsEnum.defensiveStance_2]: this.defensiveStance_2,
			[BuffsAndDebuffsEnum.defensiveStance_3]: this.defensiveStance_3,
			[BuffsAndDebuffsEnum.fightingSpirit_1]: this.fightingSpirit_1,
			[BuffsAndDebuffsEnum.fightingSpirit_2]: this.fightingSpirit_2,
			[BuffsAndDebuffsEnum.fightingSpirit_3]: this.fightingSpirit_3,
			[BuffsAndDebuffsEnum.primalRoar_1]: this.primalRoar_1,
			[BuffsAndDebuffsEnum.primalRoar_2]: this.primalRoar_2,
			[BuffsAndDebuffsEnum.primalRoar_3]: this.primalRoar_3,
			[BuffsAndDebuffsEnum.berserkerRage_1]: this.berserkerRage_1,
			[BuffsAndDebuffsEnum.berserkerRage_2]: this.berserkerRage_2,
			[BuffsAndDebuffsEnum.berserkerRage_3]: this.berserkerRage_3,
			[BuffsAndDebuffsEnum.innerFocus_1]: this.innerFocus_1,
			[BuffsAndDebuffsEnum.innerFocus_2]: this.innerFocus_2,
			[BuffsAndDebuffsEnum.innerFocus_3]: this.innerFocus_3,
			[BuffsAndDebuffsEnum.battleCry_1]: this.battleCry_1,
			[BuffsAndDebuffsEnum.battleCry_2]: this.battleCry_2,
			[BuffsAndDebuffsEnum.battleCry_3]: this.battleCry_3,
			[BuffsAndDebuffsEnum.zealotsFury]: this.zealotsFury,
			[BuffsAndDebuffsEnum.poisonCoating_1]: this.poisonCoating_1,
			[BuffsAndDebuffsEnum.poisonCoating_2]: this.poisonCoating_2,
			[BuffsAndDebuffsEnum.poisonCoating_3]: this.poisonCoating_3,
			[BuffsAndDebuffsEnum.haste]: this.haste,
			[BuffsAndDebuffsEnum.inspiration]: this.inspiration,
			[BuffsAndDebuffsEnum.bless]: this.bless,
			[BuffsAndDebuffsEnum.rejuvenate]: this.rejuvenate,
			[BuffsAndDebuffsEnum.cleanse]: this.cleanse,
			[BuffsAndDebuffsEnum.demonic_empowerment]: this.demonic_empowerment,
			[BuffsAndDebuffsEnum.mage_reflex]: this.mage_reflex,
			[BuffsAndDebuffsEnum.timeWarp]: this.timeWarp,
			[BuffsAndDebuffsEnum.frost_shield]: this.frost_shield,
			[BuffsAndDebuffsEnum.petrify]: this.petrify,
			[BuffsAndDebuffsEnum.choking]: this.choking,
			[BuffsAndDebuffsEnum.corrupt]: this.corrupt,
			[BuffsAndDebuffsEnum.wither]: this.wither,
		};
	}

	clearBuffsAndDebuffs() {
		for (const key in this) {
			if (this.hasOwnProperty(key)) {
				this[key as keyof this] = 0 as any;
			}
		}
	}
}
