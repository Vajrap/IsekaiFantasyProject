import { Accessory } from "./Accessory";
import { AccessoryDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/DTOs";
import { AccessoryType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";

export class Necklace extends Accessory {
    constructor(dto: AccessoryDTO) {
        const updatedDto = {
            ...dto,
            accessoryType: AccessoryType.necklace,
        };
        super(updatedDto);
    }
}
