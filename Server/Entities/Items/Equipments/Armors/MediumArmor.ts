import { ArmorType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { ArmorDTO } from "../InterfacesAndEnums/DTOs";
import { Armor } from "./Armor";

class MediumArmor extends Armor {
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