import { Item } from "../Items";
import { ItemType } from "../../../../Common/Enums/Item/EquipmentTypes";
import { ConsumableEffect } from "../../../../Common/Enums/Item/ConsumableEffect";
import { ConsumableType } from "../../../Database/Item/Consumable/consumable";
import { ConsumableDTO } from "../Equipments/InterfacesAndEnums/DTOs";

export class Consumable extends Item {
    consumeType: ConsumableType;
    effects: ConsumableEffect[];
    consumeAfterUse: boolean;

    constructor(dto: ConsumableDTO) {
        const updatedDto = {
            ...dto,
            itemType: ItemType.consumable,
        }
        super(
            updatedDto.id,
            updatedDto.itemType,
            updatedDto.name,
            updatedDto.description,
            updatedDto.image,
            updatedDto.weight,
            updatedDto.tier,
            updatedDto.cost
        );
        this.consumeType = dto.consumeType;
        this.effects = dto.effects;
        this.consumeAfterUse = dto.consumeAfterUse;
    }
}