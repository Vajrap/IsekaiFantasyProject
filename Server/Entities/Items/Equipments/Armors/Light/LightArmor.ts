import { Armor } from "../Armor";
import { ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { ArmorDTO } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/DTOs";

export class LightArmor extends Armor {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            armorType: ArmorType.light,
            spellCastingDamageMultiplier: 0.75,
            spellCastingPenaltyHit: 2,
        };
        super(updatedDto);
    }
}
