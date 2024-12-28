import { ArmorType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { ArmorDTO } from "../InterfacesAndEnums/DTOs";
import { Armor } from "./Armor";

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