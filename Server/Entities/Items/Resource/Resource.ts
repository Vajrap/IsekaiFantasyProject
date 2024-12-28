import { Item } from "../Items";
import { ItemType } from "../../../../Common/DTOsEnumsInterfaces/Item/Enums";
import { ResourceDTO } from "../../../../Common/DTOsEnumsInterfaces/Item/Resource/DTOs";

export class Resource extends Item {
    constructor(dto: ResourceDTO) {
        super(
            dto.id,
            ItemType.resource,
            dto.name,
            dto.description,
            dto.image,
            dto.weight,
            dto.tier,
            dto.cost
        );
    }
}