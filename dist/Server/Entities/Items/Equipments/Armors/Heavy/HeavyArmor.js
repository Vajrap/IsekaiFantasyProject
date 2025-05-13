import { Armor } from "../Armor";
import { ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
export class HeavyArmor extends Armor {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { armorType: ArmorType.heavy, spellCastingDamageMultiplier: 0.25, spellCastingPenaltyHit: 6 });
        super(updatedDto);
    }
}
