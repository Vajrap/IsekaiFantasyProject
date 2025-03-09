export interface ItemCostInterface {
    baseCost: number;
    bonusCost: number;
    possibleDeviation: number;
}


export enum SeasonEnum {
    Seeding = "ฤดูหว่าน",
    RainFall = "ฤดูฝน",
    GreenTide = "ฤดูใบไม้ผลิ",
    HarvestMoon = "ฤดูเกี่ยว",
    SunDry = "ฤดูร้อน",
    Frostveil = "ฤดูหนาว",
    LongDark = "ฤดูมืด",
}