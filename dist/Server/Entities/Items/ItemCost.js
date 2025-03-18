import { SeasonEnum } from "../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
export class ItemCost {
    constructor(baseCost, bonusCost, possibleDeviation, seasonalDeviation = {
        [SeasonEnum.Seeding]: 1,
        [SeasonEnum.RainFall]: 1,
        [SeasonEnum.GreenTide]: 1,
        [SeasonEnum.HarvestMoon]: 1,
        [SeasonEnum.SunDry]: 1,
        [SeasonEnum.Frostveil]: 1,
        [SeasonEnum.LongDark]: 1
    }) {
        this.baseCost = baseCost;
        this.bonusCost = bonusCost;
        this.cost = baseCost + bonusCost;
        this.marketCost = this.cost;
        this.numberOfSellThisWeek = 0;
        this.possibleDeviation = possibleDeviation;
        this.seasonalDeviation = seasonalDeviation;
    }
}
