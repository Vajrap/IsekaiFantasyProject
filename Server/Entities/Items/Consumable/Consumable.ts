import { Item } from "../Items";
import { ItemType } from "../../../../Common/DTOsEnumsInterfaces/Item/Enums";
import { ConsumableEffect } from "../../../../Common/DTOsEnumsInterfaces/Item/Consumable/Interfaces";
import { ConsumableType } from "../../../../Common/DTOsEnumsInterfaces/Item/Consumable/Enums";
import { ConsumableDTO } from "../../../../Common/DTOsEnumsInterfaces/Item/Consumable/DTOs";

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