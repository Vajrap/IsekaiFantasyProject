import { Armor } from "../Armor";
import { ArmorType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { ArmorDTO } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/DTOs";

export class MediumArmor extends Armor {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            armorType: ArmorType.medium,
            spellCastingDamageMultiplier: 0.5,
            spellCastingPenaltyHit: 4,
        };
        super(updatedDto);
    }
}