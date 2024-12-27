import { EquipmentType, WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Tier } from "../../../../Utility/Tier";
import { TraitEnum } from "../../../Traits/TraitEnums";
import { ItemCostInterface } from "../../ItemCost";
import { defaultDefenseStats } from "./ArmorDefense";
import { EquipmentClass } from "./EquipmentClass";
import { JewelGrade } from "./JewelGrade";

export interface ArmorDTO {
    id: string, 
    name: string, 
    description: string, 
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    specificType: EquipmentType | WeaponType | null,
    jewelSlots: number,
    slottedJewels: [],
    maxJewelGrade: JewelGrade | null,
    material: string,
    spellCastingDamageMultiplier: number,
    spellCastingPenaltyHit: number,
    arcaneAptitude: number,
    specialTrait: TraitEnum[],
    class: EquipmentClass,
    defenseStats: Partial<typeof defaultDefenseStats>
}

export interface ClothDTO {
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
    arcaneAptitude: number,
    specialTrait: TraitEnum[],
    defenseStats: Partial<typeof defaultDefenseStats>
}

export interface AccessoryDTO {
    id: string,
    name: string,
    description: string,
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    material: string,
    specialTrait: TraitEnum[],

}