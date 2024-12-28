import { ArmorType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { Equipment } from "../Equipment";
import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";
import { ClothDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/DTOs";
import { EquipmentClass } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";


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