import { Accessory } from "../Accessory";
import { AccessoryType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { AccessoryDTO } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/DTOs";

export class Ring extends Accessory {
    constructor(dto: AccessoryDTO) {
        const updatedDto = {
            ...dto,
            accessoryType: AccessoryType.ring,
        };
        super(updatedDto);
    }
}