import { ArmorType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { ArmorDTO } from "../InterfacesAndEnums/DTOs";
import { Armor } from "./Armor";

class HeavyArmor extends Armor {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            armorType: ArmorType.heavy,
            spellCastingDamageMultiplier: 0.25,
            spellCastingPenaltyHit: 6,
        };
        super(updatedDto);
    }
}