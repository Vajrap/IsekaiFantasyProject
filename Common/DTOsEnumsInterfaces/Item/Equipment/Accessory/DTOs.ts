import { Tier } from "Common/DTOsEnumsInterfaces/Tier";
import { ItemCostInterface } from "../../ItemCost";
import { EquipmentType } from "../Enums";
import { AccessoryType } from "./Enums";
import { TraitEnum } from "Common/DTOsEnumsInterfaces/TraitEnums";
import { defaultDefenseStats } from "../defaultDefenseStats";
import { defaultAttackStats } from "../defaultAttackStats";

export interface AccessoryDTO {
    id: string,
    name: string,
    description: string,
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    equipmentType: EquipmentType | null,
    accessoryType: AccessoryType | null,
    material: string,
    specialTrait: TraitEnum[],
    defenseStats: Partial<typeof defaultDefenseStats>,
    attackStats: Partial<typeof defaultAttackStats>,
}