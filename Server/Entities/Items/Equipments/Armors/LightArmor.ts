import { EquipmentType } from "../../../../Utility/Enum/EquipmentTypes";
import { ArmorDTO } from "../InterfacesAndEnums/DTOs";
import { EquipmentClass } from "../InterfacesAndEnums/EquipmentClass";
import { Armor } from "./Armor";

export class LightArmor extends Armor {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            spellCastingDamageMultiplier: 0.75,
            spellCastingPenaltyHit: 2,
            specificType: EquipmentType.lightArmor,
            class: EquipmentClass.light
        };
        super(updatedDto);
    }
}