import { Tier } from "Common/DTOsEnumsInterfaces/Tier";
import { ItemCostInterface } from "../ItemCost";
import { ConsumableEffect } from "../Consumable/Interfaces";
import { ResourceType, ResourceTrait } from "../../../../Server/Database/Item/Resource/resource";

export interface ResourceDTO {
    id: string,
    name: string,
    description: string,
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    type?: ResourceType,
    resourceTraits?: ResourceTrait[],
    consumable?: boolean,
    effects?: ConsumableEffect[],
    baseEffectMagnitude?: number,
    baseEffectDuration?: number,
    consumedAfterUse?: boolean
}