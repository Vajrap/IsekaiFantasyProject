import { Armor } from "./Armor";
import { ArmorType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { ArmorDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/DTOs";

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