import { Armor } from "../Armor";
import { ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
export class MediumArmor extends Armor {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { armorType: ArmorType.medium, spellCastingDamageMultiplier: 0.5, spellCastingPenaltyHit: 4 });
        super(updatedDto);
    }
}
