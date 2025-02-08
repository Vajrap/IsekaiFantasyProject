import { DamageTypes } from "../../DamageTypes";
import { DiceEnum } from "../../DiceEnum";
import { AttributeEnum } from "../../Character/AttributeEnum";
import { PreferredPosition } from "./Weapon/Enums";
// import { DiceEnum } from "Common//DiceEnum.ts";
export const defaultAttackStats = {
    physicalType: DamageTypes.physical,
    magicalType: DamageTypes.magical,
    physicalDiceEnum: DiceEnum.OneD4,
    physicalDamageStat: AttributeEnum.strength,
    magicalDiceEnum: DiceEnum.OneD4,
    magicalDamageStat: AttributeEnum.intelligence,
    preferredPosition: PreferredPosition.both,
    handle: 0,
    bonus: {
        pATK: 0, pHIT: 0, pCRT: 0,
        slash: 0, pierce: 0, blunt: 0,
        mATK: 0, mHIT: 0, mCRT: 0,
        geo: 0, water: 0, air: 0,
        fire: 0, order: 0, chaos: 0
    },
    physicalHitModifier: 0,
    magicalHitModifier: 0,
};
