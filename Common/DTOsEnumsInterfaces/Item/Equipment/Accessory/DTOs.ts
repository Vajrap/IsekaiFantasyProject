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
    material: string,
    specialTrait?: TraitEnum[],
    equipmentType?: EquipmentType | null,
    accessoryType?: AccessoryType | null,
    defenseStats?: Partial<typeof defaultDefenseStats>,
    attackStats?: Partial<typeof defaultAttackStats>,
}