import { Accessory } from "./Accessory";
import { AccessoryDTO } from "../InterfacesAndEnums/DTOs";
import { AccessoryType } from "../../../../../Common/Enums/Item/EquipmentTypes";

export class Ring extends Accessory {
    constructor(dto: AccessoryDTO) {
        const updatedDto = {
            ...dto,
            accessoryType: AccessoryType.ring,
        };
        super(updatedDto);
    }
}