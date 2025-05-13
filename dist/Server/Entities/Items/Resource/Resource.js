import { Item } from "../Items";
import { ItemType } from "../../../../Common/DTOsEnumsInterfaces/Item/Enums";
export class Resource extends Item {
    constructor(dto) {
        super(dto.id, ItemType.resource, dto.name, dto.description, dto.image, dto.weight, dto.tier, dto.cost);
    }
}
