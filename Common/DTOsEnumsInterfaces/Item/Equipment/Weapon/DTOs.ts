import { Tier } from "Common/DTOsEnumsInterfaces/Tier";
import { ItemCostInterface } from "../../ItemCost";
import { JewelGrade } from "../../Jewel/Enums";
import { TraitEnum } from "Common/DTOsEnumsInterfaces/TraitEnums";
import { defaultAttackStats } from "../defaultAttackStats";
import { WeaponSpecificType, WeaponType } from "./Enums";
import { defaultDefenseStats } from "../defaultDefenseStats";

export interface WeaponDTO {
    id: string, 
    name: string, 
    description: string, 
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    jewelSlots: number,
    slottedJewels: [],
    maxJewelGrade: JewelGrade | null,
    material: string,
    specialTrait: TraitEnum[],
    attackStats: Partial<typeof defaultAttackStats>,
    defenseStats: Partial<typeof defaultDefenseStats>,
    weaponType?: WeaponType
    weaponSpecificType?: WeaponSpecificType,
}