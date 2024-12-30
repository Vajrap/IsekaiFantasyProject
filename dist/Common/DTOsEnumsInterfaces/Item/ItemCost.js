export class ItemCost {
    constructor(baseCost, bonusCost) {
        this.baseCost = baseCost;
        this.bonusCost = bonusCost;
        this.cost = baseCost + bonusCost;
    }
}
