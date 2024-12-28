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

export interface ItemCostInterface {
    baseCost: number;
    bonusCost: number;
}