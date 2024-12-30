import { ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { ArmorDTO } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/DTOs";
import { Armor } from "../Armor";

export class Cloth extends Armor {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            armorType: ArmorType.cloth,
            spellCastingDamageMultiplier: 1,
            spellCastingPenaltyHit: 0,
        };
        super(updatedDto);
    }
}
