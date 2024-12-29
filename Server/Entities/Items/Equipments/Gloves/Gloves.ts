import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { Equipment } from "../Equipment";
import { ArmorDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/DTOs";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";

export class Gloves extends Equipment {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            equipmentType: EquipmentType.gloves,
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats },
            accessoryType: null,
            weaponType: null,
            weaponSpecificType: null,
        };    
        super(updatedDto);
    }
}