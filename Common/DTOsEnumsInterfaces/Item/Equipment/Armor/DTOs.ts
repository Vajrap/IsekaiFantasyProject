import { Tier } from "Common/DTOsEnumsInterfaces/Tier";
import { ItemCostInterface } from "../../ItemCost";
import { ArmorType } from "./Enums";
import { EquipmentType } from "../Enums";
import { JewelEnum, JewelGrade } from "../../Jewel/Enums";
import { TraitEnum } from "Common/DTOsEnumsInterfaces/TraitEnums";
import { defaultDefenseStats } from "../defaultDefenseStats";

export interface ArmorDTO {
    id: string, 
    name: string, 
    description: string, 
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    armorType: ArmorType | null,
    jewelSlots?: number,
    slottedJewels?: JewelEnum[], 
    maxJewelGrade?: JewelGrade | null,
    material: string,
    spellCastingDamageMultiplier?: number,
    spellCastingPenaltyHit?: number,
    arcaneAptitude?: number,
    specialTrait?: TraitEnum[],
    defenseStats: Partial<typeof defaultDefenseStats>
}
