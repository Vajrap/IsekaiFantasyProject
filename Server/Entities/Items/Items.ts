import { ItemInterface } from "../../../Common/RequestResponse/characterWS";
import { ItemType } from "../../../Common/DTOsEnumsInterfaces/Item/Enums";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { ItemCost, ItemCostInterface } from "../../../Common/DTOsEnumsInterfaces/Item/ItemCost";

export class Item {
    id: string;
    itemType: ItemType;
    name: string;
    description: string;
    image: string;
    weight: number;
    tier:Tier;
    cost: ItemCost;
    constructor(
        id: string, 
        itemType: ItemType, 
        name: string, 
        description: string,
        image: string,
        weight: number,
        tier: Tier,
        cost: ItemCostInterface
    ) {
        this.id = id;
        this.itemType = itemType;
        this.name = name;
        this.description = description;
        this.image = image;
        this.weight = weight;
        this.tier = tier;
        this.cost = new ItemCost(cost.baseCost, cost.bonusCost);
    }
}

export class ItemBag {
	items: {item: Item, quantity: number}[] = [];

    constructor(){
        this.items = [];
    }
    
    intoInterface(): ItemInterface[] {
        return this.items.map(item => ({
            id: item.item.id,
            name: item.item.name,
            description: item.item.description,
            quantity: item.quantity,
            cost: item.item.cost,
            itemType: item.item.itemType,
            weight: item.item.weight
        }));
    }
}