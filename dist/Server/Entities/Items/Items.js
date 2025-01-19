import { ItemCost } from "../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
export class Item {
    constructor(id, itemType, name, description, image, weight, tier, cost) {
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
    constructor() {
        this.items = [];
        this.items = [];
    }
    intoInterface() {
        return this.items.map(item => ({
            id: item.item.id,
            name: item.item.name,
            description: item.item.description,
            quantity: item.quantity,
        }));
    }
}
