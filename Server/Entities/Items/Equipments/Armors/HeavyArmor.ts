import { EquipmentType } from "../../../../Utility/Enum/EquipmentTypes";
import { ArmorDTO } from "../InterfacesAndEnums/DTOs";
import { EquipmentClass } from "../InterfacesAndEnums/EquipmentClass";
import { Armor } from "./Armor";

class HeavyArmor extends Armor {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            spellCastingDamageMultiplier: 0.25,
            spellCastingPenaltyHit: 6,
            specificType: EquipmentType.heavyArmor,
            class: EquipmentClass.heavy
        };
        super(updatedDto);
    }
}