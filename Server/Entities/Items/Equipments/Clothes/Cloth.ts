import { ArmorType, EquipmentType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../InterfacesAndEnums/ArmorDefense";
import { ClothDTO } from "../InterfacesAndEnums/DTOs";
import { EquipmentClass } from "../InterfacesAndEnums/EquipmentClass";

export class Cloth extends Equipment {
    constructor(dto: ClothDTO) {
        const updatedDto = {
            ...dto,
            equipmentType: EquipmentType.cloth,
            armorType: ArmorType.cloth,
            accessoryType: null,
            weaponType: null,
            weaponSpecificType: null,
            spellCastingDamageMultiplier: 1,
            spellCastingPenaltyHit: 0,
            class: EquipmentClass.cloth,
            specificType: EquipmentType.cloth,
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats }
        };
    super(updatedDto);
    }
}