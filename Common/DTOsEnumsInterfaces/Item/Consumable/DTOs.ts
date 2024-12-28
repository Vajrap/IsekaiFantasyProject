import { Tier } from "Common/DTOsEnumsInterfaces/Tier";
import { ItemCostInterface } from "../ItemCost";
import { ConsumableType } from "./Enums";
import { ConsumableEffect } from "./Interfaces";

export interface ConsumableDTO {
    id: string,
    name: string,
    description: string,
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    consumeType: ConsumableType,
    effects: ConsumableEffect[]
    consumeAfterUse: boolean,
}