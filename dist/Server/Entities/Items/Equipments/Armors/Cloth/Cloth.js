import { ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Armor } from "../Armor";
export class Cloth extends Armor {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { armorType: ArmorType.cloth, spellCastingDamageMultiplier: 1, spellCastingPenaltyHit: 0 });
        super(updatedDto);
    }
}
