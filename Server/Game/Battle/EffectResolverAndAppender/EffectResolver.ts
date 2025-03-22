import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Character } from "../../../Entities/Character/Character";
import { Dice } from "../../../Utility/Dice";

class EffectResolverFunction {
    static stun(charcter: Character): boolean {
        const save = Dice.roll(DiceEnum.OneD20).sum + charcter.status.endurance();
        if (save < 15) { 
            return false
        } else {
            charcter.buffsAndDebuffs.stun = 0;
            return true;
        }
    }

	static blind(character: Character): boolean {
        character.buffsAndDebuffs.blind -= 1;
		if (character.buffsAndDebuffs.blind === 0) {
            character.status.battlers.pHIT.battle += 3;
            character.status.battlers.mHIT.battle += 3;
        }
        return true;
	}

    static slow(character: Character): boolean {
        character.buffsAndDebuffs.slow -= 1;
        return true;
    }

	static bleed(character: Character): boolean {
		const value = character.buffsAndDebuffs.bleed;
		if (value <= 0) return true;

		const damage = Dice.roll(DiceEnum.OneD4).sum + value;
		character.hpDown(character, damage, DamageTypes.slash);
		character.buffsAndDebuffs.bleed -= 1;

		return !character.isDead;
	}

	static poison(character: Character): boolean {
		const value = character.buffsAndDebuffs.poison;
		if (value <= 0) return true;

		const raw = Dice.roll(DiceEnum.OneD4).sum + value;
		const resistance = Math.floor((character.status.poisonDefense()) / 2);
		const damage = Math.max(0, raw - resistance);

		character.hpDown(character, damage, DamageTypes.poison);
		character.buffsAndDebuffs.poison -= 1;

		return !character.isDead;
	}

    static bound(character: Character): boolean {
        character.buffsAndDebuffs.bound -= 1;
        if (character.buffsAndDebuffs.bound === 0) {
            character.status.battlers.dodge.battle += 2;
            character.status.attributes.agility.battle += 2;
        }
        return true;
    }

	static paralyse(character: Character): boolean {
        const [diceRoll, baseModifier, buffModifier]  = character.saveRoll(CharacterStatusEnum.endurance)
        const save = diceRoll + baseModifier + buffModifier;
        if (save < 8 + character.buffsAndDebuffs.paralyse) {
            character.buffsAndDebuffs.paralyse -= 1;
            return false;
        } else {
            character.buffsAndDebuffs.paralyse -= 1;
            return true;
        }
    }

	static burn(character: Character): boolean {
        const value = character.buffsAndDebuffs.burn;
        if (value <= 0) return true;

        const raw = (Dice.roll(DiceEnum.OneD2).sum)*value;
        const resistance = Math.floor((character.status.fireDefense()) / 2);
        const damage = Math.max(0, raw - resistance);

        character.hpDown(character, damage, DamageTypes.fire);
        character.buffsAndDebuffs.burn -= 1;

        return !character.isDead;
    }

	static awed(character: Character): boolean {
        character.buffsAndDebuffs.awed -= 1;
        return true;
    }

    static cursed(character: Character): boolean {
        character.buffsAndDebuffs.cursed -= 1;
        return true;
    }

    static freeze(character: Character): boolean {
        const [diceRoll, baseModifier, buffModifier]  = character.saveRoll(CharacterStatusEnum.endurance)
        const save = diceRoll + baseModifier + buffModifier;
        if (save <10) {
            character.buffsAndDebuffs.freeze += 1;
        } else {
            character.buffsAndDebuffs.freeze -= 1;
            if (character.buffsAndDebuffs.freeze === 0) {
                character.status.attributes.agility.battle += 2;
            }
            return true
        }

        if (character.buffsAndDebuffs.freeze === 3) {
            const raw = Dice.roll(DiceEnum.OneD8).sum;
            const resistance = Math.floor(character.status.iceDefense());
            const damage = Math.max(0, raw - resistance);
            character.hpDown(character, damage, DamageTypes.ice);
            character.buffsAndDebuffs.freeze = 0;
            character.status.attributes.agility.battle += 2;
            return false;
        }

        return true;
    }


	static confuse(character: Character): boolean {
        character.buffsAndDebuffs.confuse -= 1;
        return true;
    }

    static fear(character: Character): boolean {
        const [diceRoll, baseModifier, buffModifier]  = character.saveRoll(CharacterStatusEnum.willpower)
        const save = diceRoll + baseModifier + buffModifier;
        character.buffsAndDebuffs.fear -= 1;
        if (character.buffsAndDebuffs.fear === 0) {
            character.status.battlers.pHIT.battle += 3;
            character.status.battlers.mHIT.battle += 3;
        }
        if (save < 10) {
            return false;
        } else {
            return true;
        }
    }

	static entangled(character: Character): boolean {
        character.buffsAndDebuffs.entangled -= 1;
        if (character.buffsAndDebuffs.entangled === 0) {
            character.status.battlers.dodge.battle += 2;
            return true;
        }
        const [diceRoll, baseModifier, buffModifier] = character.saveRoll(CharacterStatusEnum.strength);
        const save = diceRoll + baseModifier + buffModifier;
        if (save < 10) {
            return false;
        } else {
            return true;
        }
    }

	static soaked(character: Character): boolean {
        character.buffsAndDebuffs.soaked -= 1;
        return true;
    }

	static stoneSkin(character: Character): boolean {
		character.buffsAndDebuffs.stoneSkin -= 1;
        character.status.battlers.pDEF.battle -= 1;
        if (character.buffsAndDebuffs.stoneSkin === 0) {
            character.status.attributes.agility.battle += 2;
        }
        return true;
	}

    static shield(character: Character): boolean {
        character.buffsAndDebuffs.shield -= 1;
        return true;
    }

    static stealth(character: Character): boolean {
        character.buffsAndDebuffs.stealth -= 1;
        return true;
    }

    static arcaneShield(character: Character): boolean {
        // Duration does not tick down in turn
        return true;
    }

    static divineShield(character: Character): boolean {
        character.buffsAndDebuffs.divineShield -= 1
        return true;
    }

    static manaShield(character: Character): boolean {
        // Duration does not tick down in turn
        return true;
    }

    static counterAttack_1(character: Character): boolean {
        character.buffsAndDebuffs.counterAttack_1 -= 1;
        if (character.buffsAndDebuffs.counterAttack_1 === 0) {
            character.status.battlers.pCRT.battle -= 1;
        }
        return true;
    }

    static counterAttack_2(character: Character): boolean {
        character.buffsAndDebuffs.counterAttack_2 -= 1;
        if (character.buffsAndDebuffs.counterAttack_2 === 0) {
            character.status.battlers.pCRT.battle -= 2;
        }
        return true;
    }

    static counterAttackCharge_1(character: Character): boolean {
        return true;
    }

    static counterAttackCharge_2(character: Character): boolean {
        return true;
    }

    static taunt(character: Character): boolean {
        character.buffsAndDebuffs.taunt -= 1;
        return true;
    }

    static reflect(character: Character): boolean {
        character.buffsAndDebuffs.reflect -= 1;
        return true;
    }

    static ward(character: Character): boolean {
        // Duration does not tick down in turn
        return true;
    }

	static cautious(character: Character): boolean {
        character.buffsAndDebuffs.cautious -= 1;
        if (character.buffsAndDebuffs.cautious === 0) {
            character.status.battlers.dodge.battle -= 1;
        }
        return true;
    }

    static focus(character: Character): boolean {
        character.buffsAndDebuffs.focus -= 1;
        character.status.battlers.pHIT.battle -= 1;
        character.status.battlers.mHIT.battle -= 1;
        return true;
    } 

    static defensiveStance_1(character: Character): boolean {
        character.buffsAndDebuffs.defensiveStance_1 -= 1;
        if (character.buffsAndDebuffs.defensiveStance_1 === 0) {
            character.status.battlers.pDEF.battle -= 4;
        }
        return true;
    }

    static defensiveStance_2(character: Character): boolean {
        character.buffsAndDebuffs.defensiveStance_2 -= 1;
        if (character.buffsAndDebuffs.defensiveStance_2 === 0) {
            character.status.battlers.pDEF.battle -= 6;
        }
        return true;
    }

    static defensiveStance_3(character: Character): boolean {
        character.buffsAndDebuffs.defensiveStance_3 -= 1;
        if (character.buffsAndDebuffs.defensiveStance_3 === 0) {
            character.status.battlers.pDEF.battle -= 6;
            character.status.battlers.dodge.battle -= 2;
        }
        return true;
    }

    static fightingSpirit_1(character: Character): boolean {
        character.buffsAndDebuffs.fightingSpirit_1 -= 1;
        if (character.buffsAndDebuffs.fightingSpirit_1 === 0) {
            character.status.battlers.pATK.battle -= 2;
            character.status.battlers.pDEF.battle -= 2;
        }
        return true;
    }

    static fightingSpirit_2(character: Character): boolean {
        character.buffsAndDebuffs.fightingSpirit_2 -= 1;
        if (character.buffsAndDebuffs.fightingSpirit_2 === 0) {
            character.status.battlers.pATK.battle -= 3;
            character.status.battlers.pDEF.battle -= 3;
        }
        return true;
    }

    static fightingSpirit_3(character: Character): boolean {
        character.buffsAndDebuffs.fightingSpirit_3 -= 1;
        if (character.buffsAndDebuffs.fightingSpirit_3 === 0) {
            character.status.battlers.pATK.battle -= 4;
            character.status.battlers.pDEF.battle -= 4;
        }
        return true;
    }

    static primalRoar_1(character: Character): boolean {
        character.buffsAndDebuffs.primalRoar_1 -= 1;
        if (character.buffsAndDebuffs.primalRoar_1 === 0) {
            character.status.battlers.pATK.battle -= 3;
        }
        return true;
    }

    static primalRoar_2(character: Character): boolean {
        character.buffsAndDebuffs.primalRoar_2 -= 1;
        if (character.buffsAndDebuffs.primalRoar_2 === 0) {
            character.status.battlers.pATK.battle -= 4;
            character.status.battlers.pCRT.battle -= 1;
        }
        return true;
    }

    static primalRoar_3(character: Character): boolean {
        character.buffsAndDebuffs.primalRoar_3 -= 1;
        if (character.buffsAndDebuffs.primalRoar_3 === 0) {
            character.status.battlers.pATK.battle -= 5;
            character.status.battlers.pCRT.battle -= 2;
        }
        return true;
    }

    static berserkerRage_1(character: Character): boolean {
        character.buffsAndDebuffs.berserkerRage_1 -= 1;
        if (character.buffsAndDebuffs.berserkerRage_1 === 0) {
            character.status.battlers.pATK.battle -= 3;
            character.status.battlers.pDEF.battle += 3;
            character.status.battlers.mDEF.battle += 3;
        }
        return true;
    }

    static berserkerRage_2(character: Character): boolean {
        character.buffsAndDebuffs.berserkerRage_2 -= 1;
        if (character.buffsAndDebuffs.berserkerRage_2 === 0) {
            character.status.battlers.pATK.battle -= 5;
            character.status.battlers.pDEF.battle += 5;
            character.status.battlers.mDEF.battle += 5;
        }
        return true;
    }

    static berserkerRage_3(character: Character): boolean {
        character.buffsAndDebuffs.berserkerRage_3 -= 1;
        if (character.buffsAndDebuffs.berserkerRage_3 === 0) {
            character.status.battlers.pATK.battle -= 7;
            character.status.battlers.pDEF.battle += 7;
            character.status.battlers.mDEF.battle += 7;
        }
        return true;
    }

    static innerFocus_1(character: Character): boolean {
        character.buffsAndDebuffs.innerFocus_1 -= 1;
        if (character.buffsAndDebuffs.innerFocus_1 === 0) {
            character.status.battlers.pHIT.battle += 1;
            character.status.battlers.pATK.battle += 1;
            character.status.battlers.mDEF.battle += 1;
            character.status.battlers.mATK.battle -= 2;
        }
        return true;
    }

    static innerFocus_2(character: Character): boolean {
        character.buffsAndDebuffs.innerFocus_2 -= 1;
        if (character.buffsAndDebuffs.innerFocus_2 === 0) {
            character.status.battlers.pHIT.battle += 2;
            character.status.battlers.pATK.battle += 2;
            character.status.battlers.mDEF.battle += 2;
            character.status.battlers.mATK.battle -= 4;
        }
        return true;
    }

    static innerFocus_3(character: Character): boolean {
        character.buffsAndDebuffs.innerFocus_3 -= 1;
        if (character.buffsAndDebuffs.innerFocus_3 === 0) {
            character.status.battlers.pHIT.battle += 3;
            character.status.battlers.pATK.battle += 3;
            character.status.battlers.mDEF.battle += 3;
            character.status.battlers.mATK.battle -= 6;
        }
        return true;
    }

    static battleCry_1(character: Character): boolean {
        character.buffsAndDebuffs.battleCry_1 -= 1;
        if (character.buffsAndDebuffs.battleCry_1 === 0) {
            character.status.battlers.pATK.battle -= 2;
            character.status.battlers.pDEF.battle -= 2;
            character.status.battlers.mDEF.battle -= 2;
        }
        return true;
    }

    static battleCry_2(character: Character): boolean {
        character.buffsAndDebuffs.battleCry_2 -= 1;
        if (character.buffsAndDebuffs.battleCry_2 === 0) {
            character.status.battlers.pATK.battle -= 3;
            character.status.battlers.pDEF.battle -= 3;
            character.status.battlers.mDEF.battle -= 3;
        }
        return true;
    }

    static battleCry_3(character: Character): boolean {
        character.buffsAndDebuffs.battleCry_3 -= 1;
        if (character.buffsAndDebuffs.battleCry_3 === 0) {
            character.status.battlers.pATK.battle -= 4;
            character.status.battlers.pDEF.battle -= 4;
            character.status.battlers.mDEF.battle -= 4;
        }
        return true;
    }

    static zealotsFury(character: Character): boolean {
        character.buffsAndDebuffs.zealotsFury -= 1;
        if (character.buffsAndDebuffs.zealotsFury === 0) {
            character.status.battlers.pATK.battle -= 4;
            character.status.battlers.pDEF.battle += 3;
            character.status.battlers.mDEF.battle += 3;
        }
        return true;
    }

    static poisonCoating_1(character: Character): boolean {
        character.buffsAndDebuffs.poisonCoating_1 -= 1;
        return true;
    }

    static poisonCoating_2(character: Character): boolean {
        character.buffsAndDebuffs.poisonCoating_2 -= 1;
        return true;
    }

    static poisonCoating_3(character: Character): boolean {
        character.buffsAndDebuffs.poisonCoating_3 -= 1;
        return true;
    }

    static haste(character: Character): boolean {
        character.buffsAndDebuffs.haste -= 1;
        return true;
    }

    static inspiration(character: Character): boolean {
        character.buffsAndDebuffs.inspiration -= 1;
        return true;
    }

    static bless(character: Character): boolean {
        character.buffsAndDebuffs.bless -= 1;
        return true;
    }

    static rejuvenate(character: Character): boolean {
        character.buffsAndDebuffs.rejuvenate -= 1;
        const heal = Dice.roll(DiceEnum.TwoD4).sum;
        character.hpUp(heal);
        return true;
    }

    static cleanse(character: Character): boolean {
        character.buffsAndDebuffs.cleanse -= 1;
        const [diceRoll, baseModifier, buffModifier] = character.saveRoll(CharacterStatusEnum.willpower);
        const save = diceRoll + baseModifier + buffModifier;
    
        if (save >= 12) {
            const rollCleanse = (val: number) => Dice.rollTwenty() >= 10 ? 0 : val;
    
            character.buffsAndDebuffs.stun = rollCleanse(character.buffsAndDebuffs.stun);
            character.buffsAndDebuffs.blind = rollCleanse(character.buffsAndDebuffs.blind);
            character.buffsAndDebuffs.slow = rollCleanse(character.buffsAndDebuffs.slow);
            character.buffsAndDebuffs.bleed = rollCleanse(character.buffsAndDebuffs.bleed);
            character.buffsAndDebuffs.poison = rollCleanse(character.buffsAndDebuffs.poison);
            character.buffsAndDebuffs.bound = rollCleanse(character.buffsAndDebuffs.bound);
            character.buffsAndDebuffs.paralyse = rollCleanse(character.buffsAndDebuffs.paralyse);
            character.buffsAndDebuffs.burn = rollCleanse(character.buffsAndDebuffs.burn);
            character.buffsAndDebuffs.awed = rollCleanse(character.buffsAndDebuffs.awed);
            character.buffsAndDebuffs.cursed = rollCleanse(character.buffsAndDebuffs.cursed);
            character.buffsAndDebuffs.freeze = rollCleanse(character.buffsAndDebuffs.freeze);
            character.buffsAndDebuffs.confuse = rollCleanse(character.buffsAndDebuffs.confuse);
            character.buffsAndDebuffs.fear = rollCleanse(character.buffsAndDebuffs.fear);
            character.buffsAndDebuffs.entangled = rollCleanse(character.buffsAndDebuffs.entangled);
            character.buffsAndDebuffs.soaked = rollCleanse(character.buffsAndDebuffs.soaked);
            character.buffsAndDebuffs.stoneSkin = rollCleanse(character.buffsAndDebuffs.stoneSkin);
            character.buffsAndDebuffs.petrify = rollCleanse(character.buffsAndDebuffs.petrify);
            character.buffsAndDebuffs.choking = rollCleanse(character.buffsAndDebuffs.choking);
            character.buffsAndDebuffs.corrupt = rollCleanse(character.buffsAndDebuffs.corrupt);
            character.buffsAndDebuffs.wither = rollCleanse(character.buffsAndDebuffs.wither);
        }
    
        return true;
    }

    static demoinc_empowerment(character: Character): boolean {
        character.buffsAndDebuffs.demonic_empowerment -= 1;
        if (character.buffsAndDebuffs.demonic_empowerment === 0) {
            character.status.battlers.pATK.battle -= 4;
            character.status.battlers.pDEF.battle += 3;
            character.status.battlers.mDEF.battle += 3;
        }
        return true;
    }

    static mage_reflex(character: Character): boolean {
        character.buffsAndDebuffs.mage_reflex -= 1;
        if (character.buffsAndDebuffs.mage_reflex === 0) {
            character.status.battlers.dodge.battle -= 2;
        }
        return true;
    }

    static timeWarp(character: Character): boolean {
        character.buffsAndDebuffs.timeWarp -= 1;
        return true;
    }

    static frost_shield(character: Character): boolean {
        character.buffsAndDebuffs.frost_shield -= 1;
        return true;
    }

    static petrify(character: Character): boolean {
        character.buffsAndDebuffs.petrify -= 1;
        if (character.buffsAndDebuffs.petrify === 0) {
            character.status.battlers.pDEF.battle -= 5;
            character.status.battlers.mDEF.battle -= 5;
            return true;
        }
        return false;
    }

    static choking(character: Character): boolean {
        character.buffsAndDebuffs.choking -= 1;
        return true;
    }

    static corrupt(character: Character): boolean {
        character.buffsAndDebuffs.corrupt -= 1;
        const raw = Dice.roll(DiceEnum.OneD4).sum + character.buffsAndDebuffs.corrupt;
        const res = Math.floor(character.status.chaosDefense());
        const damage = Math.max(0, raw - res);
        character.hpDown(character, damage, DamageTypes.chaos);
        if (character.buffsAndDebuffs.corrupt === 0) {
            character.status.battlers.pDEF.battle += 3;
            character.status.battlers.mDEF.battle += 3;
        }
        return true;
    }
    
    static wither(character: Character): boolean {
        character.buffsAndDebuffs.wither -= 1;
        character.status.attributes.strength.battle += 1;
        character.status.attributes.agility.battle += 1;
        character.status.attributes.dexterity.battle += 1;
        character.status.attributes.vitality.battle += 1;
        character.status.attributes.endurance.battle += 1;
        character.status.battlers.pATK.battle += 1;
        character.status.battlers.pDEF.battle += 1;
        return true;
    }
}

export const EffectResolver: Record<BuffsAndDebuffsEnum, (character: Character) => boolean> = {
    [BuffsAndDebuffsEnum.stun]: EffectResolverFunction.stun,
    [BuffsAndDebuffsEnum.blind]: EffectResolverFunction.blind,
    [BuffsAndDebuffsEnum.slow]: EffectResolverFunction.slow,
    [BuffsAndDebuffsEnum.bleed]: EffectResolverFunction.bleed,
    [BuffsAndDebuffsEnum.poison]: EffectResolverFunction.poison,
    [BuffsAndDebuffsEnum.bound]: EffectResolverFunction.bound,
    [BuffsAndDebuffsEnum.paralyse]: EffectResolverFunction.paralyse,
    [BuffsAndDebuffsEnum.burn]: EffectResolverFunction.burn,
    [BuffsAndDebuffsEnum.awed]: EffectResolverFunction.awed,
    [BuffsAndDebuffsEnum.cursed]: EffectResolverFunction.cursed,
    [BuffsAndDebuffsEnum.freeze]: EffectResolverFunction.freeze,
    [BuffsAndDebuffsEnum.confuse]: EffectResolverFunction.confuse,
    [BuffsAndDebuffsEnum.fear]: EffectResolverFunction.fear,
    [BuffsAndDebuffsEnum.entangled]: EffectResolverFunction.entangled,
    [BuffsAndDebuffsEnum.soaked]: EffectResolverFunction.soaked,
    [BuffsAndDebuffsEnum.stoneSkin]: EffectResolverFunction.stoneSkin,
    [BuffsAndDebuffsEnum.shield]: EffectResolverFunction.shield,
    [BuffsAndDebuffsEnum.stealth]: EffectResolverFunction.stealth,
    [BuffsAndDebuffsEnum.arcaneShield]: EffectResolverFunction.arcaneShield,
    [BuffsAndDebuffsEnum.divineShield]: EffectResolverFunction.divineShield,
    [BuffsAndDebuffsEnum.manaShield]: EffectResolverFunction.manaShield,
    [BuffsAndDebuffsEnum.counterAttack_1]: EffectResolverFunction.counterAttack_1,
    [BuffsAndDebuffsEnum.counterAttack_2]: EffectResolverFunction.counterAttack_2,
    [BuffsAndDebuffsEnum.counterAttackCharge_1]: EffectResolverFunction.counterAttackCharge_1,
    [BuffsAndDebuffsEnum.counterAttackCharge_2]: EffectResolverFunction.counterAttackCharge_2,
    [BuffsAndDebuffsEnum.taunt]: EffectResolverFunction.taunt,
    [BuffsAndDebuffsEnum.reflect]: EffectResolverFunction.reflect,
    [BuffsAndDebuffsEnum.ward]: EffectResolverFunction.ward,
    [BuffsAndDebuffsEnum.cautious]: EffectResolverFunction.cautious,
    [BuffsAndDebuffsEnum.focus]: EffectResolverFunction.focus,
    [BuffsAndDebuffsEnum.defensiveStance_1]: EffectResolverFunction.defensiveStance_1,
    [BuffsAndDebuffsEnum.defensiveStance_2]: EffectResolverFunction.defensiveStance_2,
    [BuffsAndDebuffsEnum.defensiveStance_3]: EffectResolverFunction.defensiveStance_3,
    [BuffsAndDebuffsEnum.fightingSpirit_1]: EffectResolverFunction.fightingSpirit_1,
    [BuffsAndDebuffsEnum.fightingSpirit_2]: EffectResolverFunction.fightingSpirit_2,
    [BuffsAndDebuffsEnum.fightingSpirit_3]: EffectResolverFunction.fightingSpirit_3,
    [BuffsAndDebuffsEnum.primalRoar_1]: EffectResolverFunction.primalRoar_1,
    [BuffsAndDebuffsEnum.primalRoar_2]: EffectResolverFunction.primalRoar_2,
    [BuffsAndDebuffsEnum.primalRoar_3]: EffectResolverFunction.primalRoar_3,
    [BuffsAndDebuffsEnum.berserkerRage_1]: EffectResolverFunction.berserkerRage_1,
    [BuffsAndDebuffsEnum.berserkerRage_2]: EffectResolverFunction.berserkerRage_2,
    [BuffsAndDebuffsEnum.berserkerRage_3]: EffectResolverFunction.berserkerRage_3,
    [BuffsAndDebuffsEnum.innerFocus_1]: EffectResolverFunction.innerFocus_1,
    [BuffsAndDebuffsEnum.innerFocus_2]: EffectResolverFunction.innerFocus_2,
    [BuffsAndDebuffsEnum.innerFocus_3]: EffectResolverFunction.innerFocus_3,
    [BuffsAndDebuffsEnum.battleCry_1]: EffectResolverFunction.battleCry_1,
    [BuffsAndDebuffsEnum.battleCry_2]: EffectResolverFunction.battleCry_2,
    [BuffsAndDebuffsEnum.battleCry_3]: EffectResolverFunction.battleCry_3,
    [BuffsAndDebuffsEnum.zealotsFury]: EffectResolverFunction.zealotsFury,
    [BuffsAndDebuffsEnum.poisonCoating_1]: EffectResolverFunction.poisonCoating_1,
    [BuffsAndDebuffsEnum.poisonCoating_2]: EffectResolverFunction.poisonCoating_2,
    [BuffsAndDebuffsEnum.poisonCoating_3]: EffectResolverFunction.poisonCoating_3,
    [BuffsAndDebuffsEnum.haste]: EffectResolverFunction.haste,
    [BuffsAndDebuffsEnum.inspiration]: EffectResolverFunction.inspiration,
    [BuffsAndDebuffsEnum.bless]: EffectResolverFunction.bless,
    [BuffsAndDebuffsEnum.rejuvenate]: EffectResolverFunction.rejuvenate,
    [BuffsAndDebuffsEnum.cleanse]: EffectResolverFunction.cleanse,
    [BuffsAndDebuffsEnum.demonic_empowerment]: EffectResolverFunction.demoinc_empowerment,
    [BuffsAndDebuffsEnum.mage_reflex]: EffectResolverFunction.mage_reflex,
    [BuffsAndDebuffsEnum.timeWarp]: EffectResolverFunction.timeWarp,
    [BuffsAndDebuffsEnum.frost_shield]: EffectResolverFunction.frost_shield,
    [BuffsAndDebuffsEnum.petrify]: EffectResolverFunction.petrify,
    [BuffsAndDebuffsEnum.choking]: EffectResolverFunction.choking,
    [BuffsAndDebuffsEnum.corrupt]: EffectResolverFunction.corrupt,
    [BuffsAndDebuffsEnum.wither]: EffectResolverFunction.wither
};