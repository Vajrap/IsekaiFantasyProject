// import { Character } from "../../Character/Character"
import {
	EffectAppenderSendObject,
	EffectResolverSendObject,
	EffectReturnObject,
} from "./EffectSend + Receive Objects";
import {
	EffectAppenderMethods,
	EffectResolverMethods,
} from "./EffectAppenderAndResolverInterface";
import { BuffsAndDebuffs } from "../../../Entities/Character/Subclasses/BuffsAndDebuffs";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";



export class EffectAppender {
	static applyEffect (
        appender: EffectAppenderSendObject,
        effectKey: keyof BuffsAndDebuffs,
        modifyStatus: (() => boolean | void) | null = null
    ): EffectReturnObject {
		console.log("EffectAppender: applyEffect");
		if (typeof appender.buffsAndDebuffs[effectKey] === 'number') {
			(appender.buffsAndDebuffs[effectKey] as number) += appender.duration;
		}

		let enableTurnOrder = true;
		
        if (modifyStatus) {
            const modifyStatResult = modifyStatus();
			if (modifyStatResult === false) {
				enableTurnOrder = false;
			}
        }

        return new EffectReturnObject(
            enableTurnOrder,
            appender.buffsAndDebuffs,
            "buffsAndDebuffs",
            appender.status
        );
    };

	// Nothing to do here, just return the object
	static none(appender: EffectAppenderSendObject): EffectReturnObject {
		return new EffectReturnObject(
			true,
			appender.buffsAndDebuffs,
			"buffsAndDebuffs",
			appender.status
		);
	}

	static stun(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "stun");
	}

	static blind(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "blind", () => {
			if (appender.buffsAndDebuffs.blind === 0) {
				appender.status.battlers.pHIT.battle -= 2;
				appender.status.battlers.mHIT.battle -= 2;
			}
		});
	}

	static slow(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "slow");
	}

	static bleed(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "bleed");
	}

	static poison(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "poison");
	}

	static bound(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "bound", () => {
			if (appender.buffsAndDebuffs.bound === 0) {
				appender.status.battlers.dodge.battle -= 2;
			}
		});
	}

	static paralyse(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "paralyse")
	}

	//Burn; damage over time, nothing at apply
	static burn(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "burn");
	}

	static awed(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "awed");
	}

	static cursed(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "cursed");
	}

	static freeze(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "freeze")
	}

	static confuse(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "confuse");
	}

	static fear(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "fear", () => {
			if (appender.buffsAndDebuffs.defend === 0) {
				appender.status.battlers.pHIT.battle -= 3;
				appender.status.battlers.mHIT.battle -= 3;
			}
		});
    }

	static entangled(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "entangled");
	}

	static soaked(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "soaked");
	}
	
	static stoneSkin(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "stoneSkin")
	}

	static counterAttack_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "counterAttack_1", () => {
			if (appender.buffsAndDebuffs.counterAttack_2 > 0) {
				return;
			}
			if (appender.buffsAndDebuffs.counterAttack_1 === 0) {
				appender.status.battlers.pCRT.battle += 1;
			}
		});
	}

	static counterAttack_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "counterAttack_2", () => {
			if (appender.buffsAndDebuffs.counterAttack_1 > 0) {
				return;
			}
			if (appender.buffsAndDebuffs.counterAttack_2 === 0) {
				appender.status.battlers.pCRT.battle += 2;
			}
		});
	}

	static counterAttackCharge_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "counterAttackCharge_1", () => {
			if (appender.buffsAndDebuffs.counterAttackCharge_2 > 0) {
				return;
			}
		});
	}

	static counterAttackCharge_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "counterAttackCharge_2", () => {
			if (appender.buffsAndDebuffs.counterAttackCharge_1 > 0) {
				return;
			}
		});
	}

	static cautious(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "cautious", () => {
			if (appender.buffsAndDebuffs.defend === 0) {
				appender.status.battlers.dodge.battle += 1;
			}
		});
	}

	static focus(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "focus", () => {
			if (appender.buffsAndDebuffs.focus === 0) {
				appender.status.battlers.mHIT.battle += 1;
				appender.status.battlers.pHIT.battle += 1;
			}
		});
	}

	static defend(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "defend", () => {
			if (appender.buffsAndDebuffs.defend === 0) {
				appender.status.battlers.pDEF.battle += 3;
			}
		});
	}
	
	static defensiveStance_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "defensiveStance_1", () => {
			if (appender.buffsAndDebuffs.defensiveStance_2 > 0 ||
				appender.buffsAndDebuffs.defensiveStance_3 > 0) {
				return;
			}
			if (appender.buffsAndDebuffs.defensiveStance_1 === 0) {
				appender.status.battlers.pDEF.battle += 4;
			}
		})
	}

	static defensiveStance_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "defensiveStance_2", () => {
			if (appender.buffsAndDebuffs.defensiveStance_3 > 0) {
				return;
			}
			if (appender.buffsAndDebuffs.defensiveStance_1 > 0) {
				appender.buffsAndDebuffs.defensiveStance_1 = 0;
				appender.status.battlers.pDEF.battle -= 4;
			}
			if (appender.buffsAndDebuffs.defensiveStance_2 === 0) {
				appender.status.battlers.pDEF.battle += 6;
			}
		});
	}

	static defensiveStance_3(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "defensiveStance_3", () => {
			if (appender.buffsAndDebuffs.defensiveStance_1 > 0) {
				appender.buffsAndDebuffs.defensiveStance_1 = 0;
				appender.status.battlers.pDEF.battle -= 4
			}
			if (appender.buffsAndDebuffs.defensiveStance_2 > 0) {
				appender.buffsAndDebuffs.defensiveStance_2 = 0;
				appender.status.battlers.pDEF.battle -= 6
			}
			if (appender.buffsAndDebuffs.defensiveStance_3 === 0) {
				appender.status.battlers.pDEF.battle += 6;
				appender.status.battlers.dodge.battle += 2
			}
		})
	}

	static taunt(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "taunt");
	}

	static arcaneShield(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "arcaneShield");
	}

	static timeWarp(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "timeWarp");
	}

	static weaponMagicalCoating(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "weaponMagicalCoating");
	}

	static stealth (appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "stealth");
	}

	static bless(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "bless");
	}
	
	static haste(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "haste");
	}

	// Add 3 to pDEF, mDEF
	static shielded(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "shielded", () => {
			if (appender.buffsAndDebuffs.shielded === 0) {
				appender.status.battlers.pDEF.battle += 3;
				appender.status.battlers.mDEF.battle += 3;
			}
		});
	}

	static inspiration(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "inspiration");
	}

	static fightingSpirit_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "fightingSpirit_1", () => {
			if (appender.buffsAndDebuffs.fightingSpirit_2 > 0 || appender.buffsAndDebuffs.fightingSpirit_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.fightingSpirit_1 === 0) {
				appender.status.battlers.pATK.battle += 2
				appender.status.battlers.pDEF.battle += 2
			}
		})
	}

	static fightingSpirit_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "fightingSpirit_2", () => {
			if (appender.buffsAndDebuffs.fightingSpirit_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.fightingSpirit_1 > 0) {
				appender.buffsAndDebuffs.fightingSpirit_1 = 0;
				appender.status.battlers.pATK.battle -= 2
				appender.status.battlers.pDEF.battle -= 2
			}
			if (appender.buffsAndDebuffs.fightingSpirit_2 === 0) {
				appender.status.battlers.pATK.battle += 3
				appender.status.battlers.pDEF.battle += 3
			}
		})
	}

	static fightingSpirit_3(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "fightingSpirit_3", () => {
			if (appender.buffsAndDebuffs.fightingSpirit_1 > 0) {
				appender.buffsAndDebuffs.fightingSpirit_1 = 0;
				appender.status.battlers.pATK.battle -= 2
				appender.status.battlers.pDEF.battle -= 2
			}
			if (appender.buffsAndDebuffs.fightingSpirit_2 > 0) {
				appender.buffsAndDebuffs.fightingSpirit_2 = 0;
				appender.status.battlers.pATK.battle -= 3
				appender.status.battlers.pDEF.battle -= 3
			}
			if (appender.buffsAndDebuffs.fightingSpirit_3 === 0) {
				appender.status.battlers.pATK.battle += 4
				appender.status.battlers.pDEF.battle += 4
			}
		})
	}
	
	static divineShield(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "divineShield");
	}	

	static manaShield(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "manaShield")
	}

	static zealotsFury(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "zealotsFury", () => {
			if (appender.buffsAndDebuffs.zealotsFury === 0) {
				appender.status.battlers.pATK.battle += 4;
				appender.status.battlers.pDEF.battle -= 2;
				appender.status.battlers.mDEF.battle -= 2
			}
		})
	}

	static primalRoar_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "primalRoar_1", () => {
			if (appender.buffsAndDebuffs.primalRoar_2 > 0 || appender.buffsAndDebuffs.primalRoar_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.primalRoar_1 === 0) {
				appender.status.battlers.pATK.battle += 2
			}
		})
	}

	static primalRoar_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "primalRoar_2", () => {
			if (appender.buffsAndDebuffs.primalRoar_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.primalRoar_1 > 0) {
				appender.buffsAndDebuffs.primalRoar_1 = 0;
				appender.status.battlers.pATK.battle -= 2
			}
			if (appender.buffsAndDebuffs.primalRoar_2 === 0) {
				appender.status.battlers.pATK.battle += 3
			}
		})
	}

	static primalRoar_3(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "primalRoar_3", () => {
			if (appender.buffsAndDebuffs.primalRoar_1 > 0) {
				appender.buffsAndDebuffs.primalRoar_1 = 0;
				appender.status.battlers.pATK.battle -= 2
			}
			if (appender.buffsAndDebuffs.primalRoar_2 > 0) {
				appender.buffsAndDebuffs.primalRoar_2 = 0;
				appender.status.battlers.pATK.battle -= 3
			}
			if (appender.buffsAndDebuffs.primalRoar_3 === 0) {
				appender.status.battlers.pATK.battle += 4
				appender.status.battlers.pDEF.battle += 2
			}
		})
	}

	static poisonCoating_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "poisonCoating_1", () => {
			if (appender.buffsAndDebuffs.poisonCoating_2 > 0 || appender.buffsAndDebuffs.poisonCoating_3 > 0) {
				return
			}
		})
	}

	static poisonCoating_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "poisonCoating_2", () => {
			if (appender.buffsAndDebuffs.poisonCoating_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.poisonCoating_1 > 0) {
				appender.buffsAndDebuffs.poisonCoating_1 = 0;
			}
		})
	}

	static poisonCoating_3(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "poisonCoating_3", () => {
			if (appender.buffsAndDebuffs.poisonCoating_1 > 0) {
				appender.buffsAndDebuffs.poisonCoating_1 = 0;
			}
			if (appender.buffsAndDebuffs.poisonCoating_2 > 0) {
				appender.buffsAndDebuffs.poisonCoating_2 = 0;
			}
		})
	}

	// Berserk Rage give +pATK, -pDEF, -mDEF
	static berserkerRage_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "berserkerRage_1", () => {
			if (appender.buffsAndDebuffs.berserkerRage_2 > 0 || appender.buffsAndDebuffs.berserkerRage_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.berserkerRage_1 === 0) {
				appender.status.battlers.pATK.battle += 3
				appender.status.battlers.pDEF.battle -= 3
				appender.status.battlers.mDEF.battle -= 3
			}
		})
	}

	static berserkerRage_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "berserkerRage_2", () => {
			if (appender.buffsAndDebuffs.berserkerRage_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.berserkerRage_1 > 0) {
				appender.buffsAndDebuffs.berserkerRage_1 = 0;
				appender.status.battlers.pATK.battle -= 3
				appender.status.battlers.pDEF.battle += 3
				appender.status.battlers.mDEF.battle += 3
			}
			if (appender.buffsAndDebuffs.berserkerRage_2 === 0) {
				appender.status.battlers.pATK.battle += 5
				appender.status.battlers.pDEF.battle -= 5
				appender.status.battlers.mDEF.battle -= 5
			}
		})
	}

	static berserkerRage_3(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "berserkerRage_3", () => {
			if (appender.buffsAndDebuffs.berserkerRage_1 > 0) {
				appender.buffsAndDebuffs.berserkerRage_1 = 0;
				appender.status.battlers.pATK.battle -= 3
				appender.status.battlers.pDEF.battle += 3
				appender.status.battlers.mDEF.battle += 3
			}
			if (appender.buffsAndDebuffs.berserkerRage_2 > 0) {
				appender.buffsAndDebuffs.berserkerRage_2 = 0;
				appender.status.battlers.pATK.battle -= 5
				appender.status.battlers.pDEF.battle += 5
				appender.status.battlers.mDEF.battle += 5
			}
			if (appender.buffsAndDebuffs.berserkerRage_3 === 0) {
				appender.status.battlers.pATK.battle += 7
				appender.status.battlers.pDEF.battle -= 7
				appender.status.battlers.mDEF.battle -= 7
			}
		})
	}

	// Innerfocus gives slightly +pHIT +pATK +mDEF hugely -mATK
	static innerFocus_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "innerFocus_1", () => {
			if (appender.buffsAndDebuffs.innerFocus_2 > 0 || appender.buffsAndDebuffs.innerFocus_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.innerFocus_1 === 0) {
				appender.status.battlers.pHIT.battle += 1
				appender.status.battlers.pATK.battle += 1
				appender.status.battlers.mDEF.battle += 1
				appender.status.battlers.mATK.battle -= 2
			}
		})
	}

	static innerFocus_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "innerFocus_2", () => {
			if (appender.buffsAndDebuffs.innerFocus_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.innerFocus_1 > 0) {
				appender.buffsAndDebuffs.innerFocus_1 = 0;
				appender.status.battlers.pHIT.battle -= 1
				appender.status.battlers.pATK.battle -= 1
				appender.status.battlers.mDEF.battle -= 1
				appender.status.battlers.mATK.battle += 2
			}
			if (appender.buffsAndDebuffs.innerFocus_2 === 0) {
				appender.status.battlers.pHIT.battle += 2
				appender.status.battlers.pATK.battle += 2
				appender.status.battlers.mDEF.battle += 2
				appender.status.battlers.mATK.battle -= 4
			}
		})
	}

	static innerFocus_3(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "innerFocus_3", () => {
			if (appender.buffsAndDebuffs.innerFocus_1 > 0) {
				appender.buffsAndDebuffs.innerFocus_1 = 0;
				appender.status.battlers.pHIT.battle -= 1
				appender.status.battlers.pATK.battle -= 1
				appender.status.battlers.mDEF.battle -= 1
				appender.status.battlers.mATK.battle += 2
			}
			if (appender.buffsAndDebuffs.innerFocus_2 > 0) {
				appender.buffsAndDebuffs.innerFocus_2 = 0;
				appender.status.battlers.pHIT.battle -= 2
				appender.status.battlers.pATK.battle -= 2
				appender.status.battlers.mDEF.battle -= 2
				appender.status.battlers.mATK.battle += 4
			}
			if (appender.buffsAndDebuffs.innerFocus_3 === 0) {
				appender.status.battlers.pHIT.battle += 3
				appender.status.battlers.pATK.battle += 3
				appender.status.battlers.mDEF.battle += 3
				appender.status.battlers.mATK.battle -= 6
			}
		})
	}

	static chiCirculation(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "chiCirculation");
	}

	static battleCry_1(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "battleCry_1", () => {
			if (appender.buffsAndDebuffs.battleCry_2 > 0 || appender.buffsAndDebuffs.battleCry_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.battleCry_1 === 0) {
				appender.status.battlers.pATK.battle += 2
				appender.status.battlers.pDEF.battle += 2
				appender.status.battlers.mDEF.battle += 2
			}
		})
	}

	static battleCry_2(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "battleCry_2", () => {
			if (appender.buffsAndDebuffs.battleCry_3 > 0) {
				return
			}
			if (appender.buffsAndDebuffs.battleCry_1 > 0) {
				appender.buffsAndDebuffs.battleCry_1 = 0;
				appender.status.battlers.pATK.battle -= 2
				appender.status.battlers.pDEF.battle -= 2
				appender.status.battlers.mDEF.battle -= 2
			}
			if (appender.buffsAndDebuffs.battleCry_2 === 0) {
				appender.status.battlers.pATK.battle += 3
				appender.status.battlers.pDEF.battle += 3
				appender.status.battlers.mDEF.battle += 3
			}
		})
	}

	static battleCry_3(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "battleCry_3", () => {
			if (appender.buffsAndDebuffs.battleCry_1 > 0) {
				appender.buffsAndDebuffs.battleCry_1 = 0;
				appender.status.battlers.pATK.battle -= 2
				appender.status.battlers.pDEF.battle -= 2
				appender.status.battlers.mDEF.battle -= 2
			}
			if (appender.buffsAndDebuffs.battleCry_2 > 0) {
				appender.buffsAndDebuffs.battleCry_2 = 0;
				appender.status.battlers.pATK.battle -= 3
				appender.status.battlers.pDEF.battle -= 3
				appender.status.battlers.mDEF.battle -= 3
			}
			if (appender.buffsAndDebuffs.battleCry_3 === 0) {
				appender.status.battlers.pATK.battle += 4
				appender.status.battlers.pDEF.battle += 4
				appender.status.battlers.mDEF.battle += 4
			}
		})
	}

	static isSummoned(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "isSummoned");
	}

	static rejuvenate(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "rejuvenate");
	}

	static cleanse(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "cleanse");
	}

	static desperation(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "desperation");
	}

	static mage_reflex(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "mage_reflex", () => {
			if (appender.buffsAndDebuffs.mage_reflex === 0) {
				appender.status.battlers.dodge.battle += 2;
			}
		});
	}

	static demonic_empowerment(appender: EffectAppenderSendObject): EffectReturnObject {
		return EffectAppender.applyEffect(appender, "demonic_empowerment", () => {
			if (appender.buffsAndDebuffs.demonic_empowerment === 0) {
				appender.status.battlers.pATK.battle += 2;
				appender.status.battlers.pDEF.battle += 2;
			}
		});
	}
}

export class EffectResolver {
	static resolveEffect(
        resolver: EffectResolverSendObject,
        effectKey: keyof BuffsAndDebuffs,
        modifyStatus: (() => {
			enableTurnOrder: boolean | void, 
			durationDecrease?: number,
			type?: "hpUp" | "hpDown" | "mpUp" | "mpDown" | "spUp" | "spDown" | "buffsAndDebuffs" | "damage",
			damage?: { amount: number; type: DamageTypes }
		}) | null = null
    ): EffectReturnObject {

		let enableTurnOrder = true;
		let durationDecrease = 1;

		let returnObject = new EffectReturnObject(
			enableTurnOrder,
			resolver.buffsAndDebuffs,
			"buffsAndDebuffs",
			resolver.status,
		);

        if (modifyStatus) {
            const modifyStatResult = modifyStatus();
			if (modifyStatResult.enableTurnOrder === false) {
				returnObject.enableTurnOrder = false;
			}
			if (modifyStatResult.durationDecrease) {
				durationDecrease = modifyStatResult.durationDecrease;
			}
			if (modifyStatResult.type) {
				returnObject.type = modifyStatResult.type;
			}
			if (modifyStatResult.damage) {
				returnObject.damage = modifyStatResult.damage;
			}
        }

		if (typeof returnObject.buffsAndDebuffs[effectKey] === 'number') {
			if (typeof returnObject.buffsAndDebuffs[effectKey] === 'number') {
				(returnObject.buffsAndDebuffs[effectKey] as number) -= durationDecrease;
			}
		}

        return returnObject;
    }

	static none(resolver: EffectResolverSendObject): EffectReturnObject {
		return new EffectReturnObject(
			true, 
			resolver.buffsAndDebuffs, 
			"buffsAndDebuffs", 
			resolver.status
		);
	}

	static stun(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "stun", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			StatMod.value(resolver.status.endurance())
			const save = Dice.roll(DiceEnum.OneD20).sum + StatMod.value(resolver.status.endurance());
			if (save < 15) {
				returnObject.enableTurnOrder = false;
			} else {
				returnObject.enableTurnOrder = true;
				returnObject.durationDecrease = resolver.buffsAndDebuffs.stun;
			}
			return returnObject;
		})
	}

	static blind(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.blind - 1;
		return EffectResolver.resolveEffect(resolver, "blind", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pHIT.battle += 2;
				resolver.status.battlers.mHIT.battle += 2;
			}
			return returnObject;
		})
	}

	static slow(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "slow")
	}

	static bleed(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "bleed", () => {
			const returnObject = {
				enableTurnOrder: true, 
				durationDecrease: 1,
				type: "hpDown" as const,
				damage: {
					amount: Dice.roll(DiceEnum.OneD4).sum + resolver.buffsAndDebuffs.bleed,
					type: DamageTypes.slash
				}
			};
		
			return returnObject;
		});
	}

	static poison(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "poison", () => {
			const defense = StatMod.value(resolver.status.geo() + resolver.status.chaos()/2);
			const damageTaken = Dice.roll(DiceEnum.OneD4).sum + resolver.buffsAndDebuffs.poison - defense;
			const returnObject = {
				enableTurnOrder: true, 
				durationDecrease: 1,
				type: "hpDown" as const,
				damage: {
					amount: damageTaken > 0? damageTaken: 0,
					type: DamageTypes.poison
				}
			};
		
			return returnObject;
		});
	}

	// Bounded get -2 dodge, return to normal after duration ends
	static bound(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "bound", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (resolver.buffsAndDebuffs.bound === 0) {
				resolver.status.battlers.dodge.battle += 2;
			}
			return returnObject;
		})
	};

	static paralyse(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "paralyse", () => {
			const save = Dice.roll(DiceEnum.OneD20).sum + resolver.status.endurance();
			const returnObject = {
				enableTurnOrder: true, 
				durationDecrease: 1
			};

			if (save < 8) {
				returnObject.enableTurnOrder = false;
			}

			return returnObject;
		})
	}

	static burn(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "burn", () => {
			const returnObject = {
				enableTurnOrder: true, 
				durationDecrease: 1,
				type: "hpDown" as const,
				damage: {
					amount: Dice.roll(DiceEnum.OneD4).sum + resolver.buffsAndDebuffs.burn,
					type: DamageTypes.fire
				}
			};
		
			return returnObject;
		});
	}

	static awed(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "awed")
	}

	static cursed(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "cursed")
	}

	static freeze(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "freeze", () => {
			if (resolver.buffsAndDebuffs.freeze >= 3) {
				const returnObject = {
					enableTurnOrder: false, 
					durationDecrease: resolver.buffsAndDebuffs.freeze,
					type: "hpDown" as const,
					damage: {
						amount: Dice.roll(DiceEnum.OneD8).sum,
						type: DamageTypes.ice
					}
				};
				return returnObject;
			} else {
				const save = Dice.roll(DiceEnum.OneD20).sum + resolver.status.endurance();
				const returnObject = {
					enableTurnOrder: true, 
					durationDecrease: 1
				};

				if (save < 10) {
					returnObject.enableTurnOrder = false;
				}

				return returnObject;
			}
		})
	}

	static confuse(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "confuse")
	}

	static fear(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.fear - 1;
		return EffectResolver.resolveEffect(resolver, "fear", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pHIT.battle += 3;
				resolver.status.battlers.mHIT.battle += 3;
			}
			return returnObject;
		})
	}

	static entangled(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "entangled", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			const save = Dice.roll(DiceEnum.OneD20).sum + resolver.status.strength();
			if (save < 5) {
				returnObject.enableTurnOrder = false;
			}
			return returnObject;
		})
	}

	static soaked(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "soaked")
	}

	static stoneSkin(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "stoneSkin", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			resolver.status.battlers.pDEF.battle -= 1;
			resolver.status.battlers.mDEF.battle -= 1;
			return returnObject;
		});
	}

	static counterAttack_1(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.counterAttack_1 - 1;
		return EffectResolver.resolveEffect(resolver, "counterAttack_1", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pCRT.battle -= 1;
			}
			return returnObject;
		})
	}
	
	static counterAttack_2(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.counterAttack_2 - 1;
		return EffectResolver.resolveEffect(resolver, "counterAttack_2", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pCRT.battle -= 2;
			}
			return returnObject;
		})
	}

	static counterAttackCharge_1(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "counterAttackCharge_1")
	}

	static counterAttackCharge_2(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "counterAttackCharge_2")
	}

	static cautious(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.cautious - 1;
		return EffectResolver.resolveEffect(resolver, "cautious", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.dodge.battle -= 1;
			}
			return returnObject;
		})
	}

	static focus(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.focus - 1;
		return EffectResolver.resolveEffect(resolver, "focus", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.mHIT.battle -= 1;
				resolver.status.battlers.pHIT.battle -= 1;
			}
			return returnObject;
		})
	}
	
	static defend(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.defend - 1;
		return EffectResolver.resolveEffect(resolver, "defend", () => {
			const returningObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pDEF.battle -= 3;
			}
			return returningObject;
		})
	}

	static defensiveStance_1(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.defensiveStance_1 - 1;
		return EffectResolver.resolveEffect(resolver, "defensiveStance_1", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pDEF.battle -= 4;
			}
			return returnObject;
		})
	}

	static defensiveStance_2(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.defensiveStance_2 - 1;
		return EffectResolver.resolveEffect(resolver, "defensiveStance_2", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pDEF.battle -= 6;
			}
			return returnObject;
		})
	}

	static defensiveStance_3(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.defensiveStance_3 - 1;
		return EffectResolver.resolveEffect(resolver, "defensiveStance_3", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pDEF.battle -= 6;
				resolver.status.battlers.dodge.battle -= 2;
			}
			return returnObject;
		})
	}

	static taunt(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "taunt")
	}

	static arcaneShield(resolver: EffectResolverSendObject): EffectReturnObject {
		// This means, the arcane shile will not withered down each turn
		return EffectResolver.resolveEffect(resolver, "arcaneShield", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 0};
			return returnObject;
		})
	}	
	
	static timeWarp(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "timeWarp")
	}

	static weaponMagicalCoating(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "weaponMagicalCoating")
	}

	static stealth(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "stealth")
	}

	static bless(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "bless")
	}

	static haste(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "haste")
	}

	static shielded(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.shielded - 1;
		return EffectResolver.resolveEffect(resolver, "shielded", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pDEF.battle -= 2;
				resolver.status.battlers.mDEF.battle -= 2;
			}
			return returnObject;
		})
	}

	static inspiration(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "inspiration")
	}

	static fightingSpirit_1(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "fightingSpirit_1", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			const remainingDuration = resolver.buffsAndDebuffs.fightingSpirit_1 - 1;
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 2;
				resolver.status.battlers.pDEF.battle -= 2;
			}
			return returnObject;
		})
	}
	static fightingSpirit_2(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "fightingSpirit_2", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			const remainingDuration = resolver.buffsAndDebuffs.fightingSpirit_2 - 1;
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 3;
				resolver.status.battlers.pDEF.battle -= 3;
			}
			return returnObject;
		})
	}

	static fightingSpirit_3(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "fightingSpirit_3", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			const remainingDuration = resolver.buffsAndDebuffs.fightingSpirit_3 - 1;
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 4;
				resolver.status.battlers.pDEF.battle -= 4;
			}
			return returnObject;
		})
	}

	static divineShield(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "divineShield", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 0};
			return returnObject;		
		})
	}

	static manaShield(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "manaShield", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 0};
			return returnObject;
		})
	}

	static zealotsFury(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "zealotsFury", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (resolver.buffsAndDebuffs.zealotsFury === 0) {
				resolver.status.battlers.pATK.battle -= 4;
				resolver.status.battlers.pDEF.battle += 2;
				resolver.status.battlers.mDEF.battle += 2;
			}
			return returnObject;
		});
	}

	static primalRoar_1(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "primalRoar_1", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (resolver.buffsAndDebuffs.primalRoar_2 > 0 || resolver.buffsAndDebuffs.primalRoar_3 > 0) {
				return returnObject;
			}
			if (resolver.buffsAndDebuffs.primalRoar_1 === 0) {
				resolver.status.battlers.pATK.battle -= 3;
			}
			return returnObject;
		});
	}

	static primalRoar_2(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "primalRoar_2", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			const remainingDuration = resolver.buffsAndDebuffs.primalRoar_2 - 1;
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 4;
				resolver.status.battlers.pCRT.battle -= 1;
			}
			return returnObject;
		});
	}

	static primalRoar_3(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "primalRoar_3", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			const remainingDuration = resolver.buffsAndDebuffs.primalRoar_3 - 1;
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 5;
				resolver.status.battlers.pCRT.battle -= 2;
			}
			return returnObject;
		})
	}

	static poisonCoating_1(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "poisonCoating_1")
	}

	static poisonCoating_2(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "poisonCoating_2")
	}

	static poisonCoating_3(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "poisonCoating_3")
	}

	static berserkerRage_1(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.berserkerRage_1 - 1;
		return EffectResolver.resolveEffect(resolver, "berserkerRage_1", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 3;
				resolver.status.battlers.pDEF.battle += 3;
				resolver.status.battlers.mDEF.battle += 3;
			}
			return returnObject;
		})
	}

	static berserkerRage_2(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.berserkerRage_2 - 1;
		return EffectResolver.resolveEffect(resolver, "berserkerRage_2", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 5;
				resolver.status.battlers.pDEF.battle += 5;
				resolver.status.battlers.mDEF.battle += 5;
			}
			return returnObject;
		})
	}

	static berserkerRage_3(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.berserkerRage_3 - 1;
		return EffectResolver.resolveEffect(resolver, "berserkerRage_3", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 7;
				resolver.status.battlers.pDEF.battle += 7;
				resolver.status.battlers.mDEF.battle += 7;
			}
			return returnObject;
		})
	}

	static innerFocus_1(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.innerFocus_1 - 1;
		return EffectResolver.resolveEffect(resolver, "innerFocus_1", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pHIT.battle -= 1;
				resolver.status.battlers.pATK.battle -= 1;
				resolver.status.battlers.mDEF.battle -= 1;
				resolver.status.battlers.mATK.battle += 2;
			}
			return returnObject;
		})
	}

	static innerFocus_2(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.innerFocus_2 - 1;
		return EffectResolver.resolveEffect(resolver, "innerFocus_2", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pHIT.battle -= 2;
				resolver.status.battlers.pATK.battle -= 2;
				resolver.status.battlers.mDEF.battle -= 2;
				resolver.status.battlers.mATK.battle += 4;
			}
			return returnObject;
		})
	}

	static innerFocus_3(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.innerFocus_3 - 1;
		return EffectResolver.resolveEffect(resolver, "innerFocus_3", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pHIT.battle -= 3;
				resolver.status.battlers.pATK.battle -= 3;
				resolver.status.battlers.mDEF.battle -= 3;
				resolver.status.battlers.mATK.battle += 6;
			}
			return returnObject;
		})
	}

	static chiCirculation(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "chiCirculation")
	}

	static battleCry_1(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.battleCry_1 - 1;
		return EffectResolver.resolveEffect(resolver, "battleCry_1", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 2;
				resolver.status.battlers.pDEF.battle -= 2;
				resolver.status.battlers.mDEF.battle -= 2;
			}
			return returnObject;
		})
	}

	static battleCry_2(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.battleCry_2 - 1;
		return EffectResolver.resolveEffect(resolver, "battleCry_2", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 3;
				resolver.status.battlers.pDEF.battle -= 3;
				resolver.status.battlers.mDEF.battle -= 3;
			}
			return returnObject;
		})
	}

	static battleCry_3(resolver: EffectResolverSendObject): EffectReturnObject {
		const remainingDuration = resolver.buffsAndDebuffs.battleCry_3 - 1;
		return EffectResolver.resolveEffect(resolver, "battleCry_3", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (remainingDuration === 0) {
				resolver.status.battlers.pATK.battle -= 4;
				resolver.status.battlers.pDEF.battle -= 4;
				resolver.status.battlers.mDEF.battle -= 4;
			}
			return returnObject;
		})
	}

	static isSummoned(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "isSummoned", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 0};
			return returnObject;
		})
	}

	// Roll 2D4 to heal
	static rejuvenate(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "rejuvenate", () => {
			const healAmount = Dice.roll(DiceEnum.TwoD4).sum;
			const returnObject = {
				enableTurnOrder: true, 
				durationDecrease: 1,
				type: "hpUp" as const,
				damage: {
					amount: healAmount,
					type: DamageTypes.poison
				}
			};
		
			return returnObject;
		})
	}

	//Cleanse has chance to remove all debuffs
	static cleanse(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "cleanse", () => {
			const save = Dice.roll(DiceEnum.OneD20).sum + resolver.status.luck();
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (save >= 20) {
				if (resolver.buffsAndDebuffs.stun > 0) { resolver.buffsAndDebuffs.stun = 0 };
				if (resolver.buffsAndDebuffs.blind > 0) { resolver.buffsAndDebuffs.blind = 0 };
				if (resolver.buffsAndDebuffs.slow > 0) { resolver.buffsAndDebuffs.slow = 0 };
				if (resolver.buffsAndDebuffs.bleed > 0) { resolver.buffsAndDebuffs.bleed = 0 };
				if (resolver.buffsAndDebuffs.poison > 0) { resolver.buffsAndDebuffs.poison = 0 };
				if (resolver.buffsAndDebuffs.bound > 0) { resolver.buffsAndDebuffs.bound = 0 };
				if (resolver.buffsAndDebuffs.paralyse > 0) { resolver.buffsAndDebuffs.paralyse = 0 };
				if (resolver.buffsAndDebuffs.burn > 0) { resolver.buffsAndDebuffs.burn = 0 };
				if (resolver.buffsAndDebuffs.awed > 0) { resolver.buffsAndDebuffs.awed = 0 };
				if (resolver.buffsAndDebuffs.cursed > 0) { resolver.buffsAndDebuffs.cursed = 0 };
				if (resolver.buffsAndDebuffs.freeze > 0) { resolver.buffsAndDebuffs.freeze = 0 };
				if (resolver.buffsAndDebuffs.confuse > 0) { resolver.buffsAndDebuffs.confuse = 0 };
				if (resolver.buffsAndDebuffs.fear > 0) { resolver.buffsAndDebuffs.fear = 0 };
				if (resolver.buffsAndDebuffs.entangled > 0) { resolver.buffsAndDebuffs.entangled = 0 };
				if (resolver.buffsAndDebuffs.soaked > 0) { resolver.buffsAndDebuffs.soaked = 0 };
			}
			return returnObject;
		})
	}
	
	static desperation(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "desperation")
	}

	static mage_reflex(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "mage_reflex", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (resolver.buffsAndDebuffs.mage_reflex === 0) {
				resolver.status.battlers.dodge.battle -= 2;
			}
			return returnObject;
		})
	}

	static demonic_empowerment(resolver: EffectResolverSendObject): EffectReturnObject {
		return EffectResolver.resolveEffect(resolver, "demonic_empowerment", () => {
			const returnObject = {enableTurnOrder: true, durationDecrease: 1};
			if (resolver.buffsAndDebuffs.demonic_empowerment === 0) {
				resolver.status.battlers.pATK.battle -= 2;
				resolver.status.battlers.pDEF.battle -= 2;
			}
			return returnObject;
		})
	}
}

//Paralyse target must roll 8DC endurance save or unable to act for that turn.
//Freeze target must roll D10 saves, if failed, the freeze stack will be increased by 1. If the freeze stack reach 3 the target won't be able to take action for that turn and dealth 1d8 ice damage.`
//manaShieldStack won't decrease by turn but will decrease by damage taken.
//defensive stance 1 add 4 pDEF
//Defensive stance 2, add 6 pDEF
//Defensive stance 3, add 6 pDEF, add 2 mDEF
//entangled target must roll 5DC strength save, if fail will be unable to move.
//awed target get -2 to all saving roll
//bless target get +1d4 to all saving roll
//poison target take 1d4 + poison stack poison damage at the start of their turn, (poison damage may reduce by geo+chaos defense / 2)
//bleed target take 1d4 + bleeding stack at the start of their turn
//Soaked target don't get any effect, but take 1.5x damage from lightning attack
//Divine shield all damage taken is reduce by 2 + order modifier, if damage is Chaos, reducing magnitude * 2
//Stealth character prone to be unseen and not be targeted by enemy.
//If CharacterInterface with counter attack stand in front row and got attack by a front row enemy, will attack the enemy back with sure hit and counter attack buff will decrease by one.
//fear target get -1 to hit
//cautious target get +1 to dodge
//inspiration target get +2 to all modifier
//stun target must roll 15DC endurance save, if fail will be unable to act, if passed, remove the stun.
//add pAtk 4 points while reduce mDef and pDef by 2
//Stone skin, will add the armor the same amount as turn left
//Primal roar 1, add 3 pATK
//Primal roar 2, add 4 pAtk add 1 pCRT
//Primal Rora 3, add 5 pAtk, add 2 pCRT
//FightingSpirit 1 add 2 pATK and 2 pDEF
//FightingSpirit 2 add 3 pATK and 3 pDEF
//FightingSpirit 3 add 4 pATK and 4 pDEF