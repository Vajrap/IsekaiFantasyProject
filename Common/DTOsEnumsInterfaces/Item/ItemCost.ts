export class ItemCost {
    baseCost: number;
    bonusCost: number;
    cost: number;
    marketCost: number;
    numberOfSellThisWeek: number;
    possibleDeviation: number; // Max % deviation from baseCost
    
    constructor(baseCost: number, bonusCost: number, possibleDeviation: number) {
        this.baseCost = baseCost;
        this.bonusCost = bonusCost;
        this.cost = baseCost + bonusCost;
        this.marketCost = this.cost;
        this.numberOfSellThisWeek = 0;
        this.possibleDeviation = possibleDeviation;
    }

    updateMarketCost() {
        let demandFactor = 1 + (this.numberOfSellThisWeek / 100);
        let randomFluctuation = 1 +(Math.random() * 2-1) * this.possibleDeviation;
        this.marketCost = Math.max(1, this.cost * demandFactor * randomFluctuation);
        this.numberOfSellThisWeek = 0;
    }
}

export interface ItemCostInterface {
    baseCost: number;
    bonusCost: number;
    possibleDeviation: number;
}