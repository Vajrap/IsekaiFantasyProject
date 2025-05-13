import { Accessory } from "../Accessory";
import { AccessoryType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
export class Ring extends Accessory {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { accessoryType: AccessoryType.ring });
        super(updatedDto);
    }
}
