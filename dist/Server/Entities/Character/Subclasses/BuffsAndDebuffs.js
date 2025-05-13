import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
export class BuffsAndDebuffs {
    constructor() {
        // 💥 Debuffs
        this.stun = 0;
        this.blind = 0;
        this.slow = 0;
        this.bleed = 0;
        this.poison = 0;
        this.bound = 0;
        this.paralyse = 0;
        this.burn = 0;
        this.awed = 0;
        this.cursed = 0;
        this.freeze = 0;
        this.confuse = 0;
        this.fear = 0;
        this.entangled = 0;
        this.soaked = 0;
        // 🛡️ Defensive Buffs
        this.stoneSkin = 0;
        this.shield = 0;
        this.stealth = 0;
        this.arcaneShield = 0;
        this.divineShield = 0;
        this.manaShield = 0;
        // ⚔️ Counter and Reactive
        this.counterAttack_1 = 0;
        this.counterAttack_2 = 0;
        this.counterAttackCharge_1 = 0;
        this.counterAttackCharge_2 = 0;
        this.taunt = 0;
        this.reflect = 0;
        this.ward = 0;
        // ⚔️ Combat Buffs
        this.cautious = 0;
        this.focus = 0;
        this.defensiveStance_1 = 0;
        this.defensiveStance_2 = 0;
        this.defensiveStance_3 = 0;
        this.fightingSpirit_1 = 0;
        this.fightingSpirit_2 = 0;
        this.fightingSpirit_3 = 0;
        this.primalRoar_1 = 0;
        this.primalRoar_2 = 0;
        this.primalRoar_3 = 0;
        this.berserkerRage_1 = 0;
        this.berserkerRage_2 = 0;
        this.berserkerRage_3 = 0;
        this.innerFocus_1 = 0;
        this.innerFocus_2 = 0;
        this.innerFocus_3 = 0;
        this.battleCry_1 = 0;
        this.battleCry_2 = 0;
        this.battleCry_3 = 0;
        this.zealotsFury = 0;
        this.poisonCoating_1 = 0;
        this.poisonCoating_2 = 0;
        this.poisonCoating_3 = 0;
        // ✨ Magic & Utility
        this.haste = 0;
        this.inspiration = 0;
        this.bless = 0;
        this.rejuvenate = 0;
        this.cleanse = 0;
        this.demonic_empowerment = 0;
        this.mage_reflex = 0;
        this.timeWarp = 0;
        this.frost_shield = 0;
        this.petrify = 0;
        this.choking = 0;
        this.corrupt = 0;
        this.wither = 0;
        // No need for duplicate initializations
    }
    getBuffsAndDebuffs() {
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
                this[key] = 0;
            }
        }
    }
}
