import { ItemType } from "../../../../Common/Enums/Item/EquipmentTypes";
import { ResourceDTO } from "../Equipments/InterfacesAndEnums/DTOs";
import { Item } from "../Items";

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