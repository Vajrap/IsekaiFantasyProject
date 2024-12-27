import { GearType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../InterfacesAndEnums/ArmorDefense";
import { ArmorDTO } from "../InterfacesAndEnums/DTOs";

export class Armor extends Equipment {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            gearType: GearType.armor,
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats }
        };    
        super(updatedDto);
    }
}
