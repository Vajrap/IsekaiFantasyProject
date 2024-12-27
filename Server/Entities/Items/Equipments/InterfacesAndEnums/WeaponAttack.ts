import { DiceEnum } from "../../../../../Common/DamageDIce";
import { DamageTypes } from "../../../../../Common/Enums/DamageTypes";
import { AttributeEnum } from "../../../Character/Subclasses/CharacterDataEnum";
import { PreferredPosition } from "./PreferredPosition";

export interface WeaponAttack {
    physicalType: DamageTypes,
    magicalType: DamageTypes,
    physicalDiceEnum: DiceEnum,
    physicalDamageStat: AttributeEnum,
    magicalDiceEnum: DiceEnum,
    magicalDamageStat: AttributeEnum,
    preferredPosition: PreferredPosition,
    handle: 0 | 1 | 2,
    bonus: {
        pATK: number,
        pHIT: number,
        pCRT: number,
        slash: number,
        pierce: number,
        blunt: number,
        mATK: number,
        mHIT: number,
        mCRT: number,
        geo: number,
        water: number,
        air: number,
        fire: number,
        order: number,
        chaos: number
    }
}

export const defaultAttackStats: WeaponAttack = {
    physicalType: DamageTypes.physical,
    magicalType: DamageTypes.magical,
    physicalDiceEnum: DiceEnum.OneD4,
    physicalDamageStat: AttributeEnum.STRENGTH,
    magicalDiceEnum: DiceEnum.OneD4,
    magicalDamageStat: AttributeEnum.INTELLIGENCE,
    preferredPosition: PreferredPosition.both,
    handle: 0,
    bonus: {
        pATK: 0, pHIT: 0, pCRT: 0, 
        slash: 0, pierce: 0, blunt: 0, 
        mATK: 0, mHIT: 0, mCRT: 0, 
        geo: 0, water: 0, air: 0, 
        fire: 0, order: 0, chaos: 0
    }
};