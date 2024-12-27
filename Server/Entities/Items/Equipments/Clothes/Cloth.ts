import { EquipmentType, GearType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../InterfacesAndEnums/ArmorDefense";
import { ClothDTO } from "../InterfacesAndEnums/DTOs";
import { EquipmentClass } from "../InterfacesAndEnums/EquipmentClass";

export class Cloth extends Equipment {
    constructor(dto: ClothDTO) {
        const updatedDto = {
            ...dto,
            gearType: GearType.cloth,
            spellCastingDamageMultiplier: 1,
            spellCastingPenaltyHit: 0,
            class: EquipmentClass.cloth,
            specificType: EquipmentType.cloth,
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats }
        };
    super(updatedDto);
    }
}