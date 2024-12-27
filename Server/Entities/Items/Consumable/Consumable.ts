import { Item } from "../Items";
import { ItemType } from "../../../Utility/Enum/EquipmentTypes";
import { ConsumableEffect } from "./ConsumableEffect";
import { ConsumableType } from "../../../Database/Item/Consumable/consumable";
import { Tier } from "../../../Utility/Tier";
import { ItemCostInterface } from "../ItemCost";

export class Consumable extends Item {
    consumeType: ConsumableType;
    effects: ConsumableEffect[];
    consumeAfterUse: boolean;

    constructor(
        id: string, 
        name: string, 
        description: string, 
        consumeType: ConsumableType,
        image: string,
        cost: ItemCostInterface,
        weight: number,
        tier: Tier,
        effects: ConsumableEffect[], 
        consumedAfterUse: boolean
    ) {

        super(
            id, 
            ItemType.consumable, 
            name, 
            description,
            image, 
            weight,
            tier,
            cost
        );

        this.consumeType = consumeType;
        this.effects = effects;
        this.consumeAfterUse = consumedAfterUse;
    
    }
}