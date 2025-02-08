import { AttributeEnum } from "Common/DTOsEnumsInterfaces/Character/AttributeEnum"
import { PreferredPosition } from "./Enums"
import { DiceEnum } from "Common/DTOsEnumsInterfaces/DiceEnum"
import { DamageTypes } from "Common/DTOsEnumsInterfaces/DamageTypes"

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
    },
    physicalHitModifier: number,
    magicalHitModifier: number
}