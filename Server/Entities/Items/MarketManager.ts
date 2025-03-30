import { GameTime } from "../../Game/TimeAndDate/GameTime";
import { Item } from "./Items";

export class MarketManager {
	private static itemRegistry: Map<string, Item> = new Map();
	private static globalStock: Map<string, number> = new Map();
	private static itemWeeklySales: Map<string, number> = new Map();
	private static itemPastSales: Map<string, number[]> = new Map(); // Stores past 4 weeks of sales

	static registerItem(item: Item, initialStock: number = 0) {
		this.itemRegistry.set(item.id, item);
		this.globalStock.set(item.id, initialStock);
		this.itemWeeklySales.set(item.id, 0);
		this.itemPastSales.set(item.id, [0, 0, 0, 0]); // Initialize past sales
	}

	// Get from database
    static updateItemData(id: string, globalStock: number, weeklySales: number, pastWeekSales: number) {
        this.globalStock.set(id, globalStock);
		this.itemWeeklySales.set(id, weeklySales);
	}

	static getItem(id: string): Item {
		const item = this.itemRegistry.get(id);
		if (!item) {
			throw new Error(`Item with id ${id} not found`);
		}
		return item;
	}

	static adjustStock(id: string, quantity: number) {
		const currentStock = this.globalStock.get(id) || 0;
		this.globalStock.set(id, Math.max(0, currentStock + quantity));
	}

	static recordSale(id: string, quantity: number) {
		const currentSales = this.itemWeeklySales.get(id) || 0;
		this.itemWeeklySales.set(id, currentSales + quantity);
	}

    /**
     * Get trading trend in percentage.
     * If past sales were zero, returns 0% (neutral effect).
     */
    static getTradingTrendPercentage(id: string): number {
        let weekly = this.itemWeeklySales.get(id) || 0;
        let pastSales = this.itemPastSales.get(id) || [0, 0, 0, 0];
        let avgPastSales = pastSales.reduce((sum, s) => sum + s, 0) / pastSales.length;
        return avgPastSales === 0 ? 0 : (weekly - avgPastSales) / avgPastSales;
    }
    
    /**
     * Get scarcity percentage.
     * If the item is rare (traded more than it is in stock), the price will increase.
     */
	static getScarcityPercentage(id: string): number {
        let globalStock = this.globalStock.get(id) || 1; // Ensure no division by zero
        let weeklySales = this.itemWeeklySales.get(id) || 0;
        return weeklySales / globalStock;
    }

    /**
     * Updates weekly sales records. This is called at the end of the week.
     */
    static updateWeeklySales() {
        for (const [id, item] of this.itemRegistry) {
            let weeklySales = this.itemWeeklySales.get(id) || 0;
            let pastSales = this.itemPastSales.get(id) || [0, 0, 0, 0];

            // Shift the sales data (keep last 4 weeks)
            pastSales.shift();
            pastSales.push(weeklySales);

            this.itemPastSales.set(id, pastSales);
            this.itemWeeklySales.set(id, 0);
        }
    }

    /**
     * Updates the market cost of all registered items.
     * Called **before** `updateWeeklySales()` at the end of the week.
     * 
     * **Formula:**
     * ```
     * newCost = baseCost + (baseCost * (seasonalPercentage + randomPercentage + trendPercentage + scarcityPercentage))
     * ```
     * 
     * - Seasonal Effect: Defined per season, affecting supply and demand.
     * - Random Deviation: Small weekly fluctuation.
     * - Trading Trend: If an item is trending (increasing sales), price rises.
     * - Scarcity: If an item is rare (low stock, high demand), price rises.
     * - Overstock: If stock is high but sales are low, price drops.
     */
	static updateMarketCosts() {
		for (const [id, item] of this.itemRegistry) {
			let baseCost = item.cost.baseCost + item.cost.bonusCost;

            // Seasonal effect (percentage-based)
			let seasonPercentage = item.cost.seasonalDeviation[GameTime.getCurrentGameSeason()];
            let seasonCostChange = baseCost * seasonPercentage;

            // Random deviation (percentage between -possibleDeviation and +possibleDeviation)
            let deviation = (Math.random() * 2 - 1) * item.cost.possibleDeviation;
            let randomCostChange = baseCost * deviation;

            // Moving average for sales trends (4-week average)
            let pastSales = this.itemPastSales.get(id) || [0, 0, 0, 0];
            let avgPastSales = pastSales.reduce((sum, s) => sum + s, 0) / pastSales.length;
            let trendPercentage = avgPastSales === 0 ? 0 : (this.itemWeeklySales.get(id) || 0 - avgPastSales) / avgPastSales;
            let trendCostChange = baseCost * trendPercentage;

            // Scarcity effect (percentage if stock is low)
            let globalStock = this.globalStock.get(id) || 1;
            let weeklySales = this.itemWeeklySales.get(id) || 0;
            let scarcityPercentage = weeklySales / globalStock;
            let scarcityCostChange = baseCost * scarcityPercentage;

            // Overstock effect (penalizes surplus inventory)
            let overstockPercentage = -Math.min(weeklySales / (globalStock + 1), 0.3);
            let overstockCostChange = baseCost * overstockPercentage;

            // Cap maximum price increase to 60% per week
            let maxIncrease = 0.6; // 60%
            let totalDynamicPercentage = trendPercentage + scarcityPercentage;
            if (totalDynamicPercentage > maxIncrease) {
                let scalingFactor = maxIncrease / totalDynamicPercentage;
                trendCostChange *= scalingFactor;
                scarcityCostChange *= scalingFactor;
            }

            // Calculate final market cost
            let newCost = baseCost + seasonCostChange + randomCostChange + trendCostChange + scarcityCostChange + overstockCostChange;
            item.cost.marketCost = Math.max(1, newCost); // Ensure price never drops below 1
		}
	}
}
