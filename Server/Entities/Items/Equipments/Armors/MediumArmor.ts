import { EquipmentType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { ArmorDTO } from "../InterfacesAndEnums/DTOs";
import { EquipmentClass } from "../InterfacesAndEnums/EquipmentClass";
import { Armor } from "./Armor";

class MediumArmor extends Armor {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            spellCastingDamageMultiplier: 0.5,
            spellCastingPenaltyHit: 4,
            specificType: EquipmentType.mediumArmor,
            class: EquipmentClass.medium
        };
        super(updatedDto);
    }
}