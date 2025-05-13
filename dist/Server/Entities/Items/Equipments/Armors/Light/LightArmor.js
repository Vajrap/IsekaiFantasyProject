import { Armor } from "../Armor";
import { ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
export class LightArmor extends Armor {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { armorType: ArmorType.light, spellCastingDamageMultiplier: 0.75, spellCastingPenaltyHit: 2 });
        super(updatedDto);
    }
}
