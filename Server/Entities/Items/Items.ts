import { ItemType } from "../../Utility/Enum/EquipmentTypes";

export class ItemCost {
    baseCost: number;
    bonusCost: number;
    cost: number;
    constructor(baseCost: number, bonusCost: number) {
        this.baseCost = baseCost;
        this.bonusCost = bonusCost;
        this.cost = baseCost + bonusCost;
    }
}

export class Item {
    id: string;
    itemType: ItemType;
    name: string;
    description: string;
    itemCost: ItemCost;
    constructor(id: string, itemType: ItemType, name: string, description: string, itemCost: ItemCost) {
        this.id = id;
        this.itemType = itemType;
        this.name = name;
        this.description = description;
        this.itemCost = itemCost;
    }
}

export class ItemBag {
	items: string[] = [];
}