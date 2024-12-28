import { ConsumableEffect } from "../../../../../Common/Enums/Item/ConsumableEffect";
import { AccessoryType, ArmorType, EquipmentType, WeaponSpecificType, WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { ConsumableType } from "../../../../Database/Item/Consumable/consumable";
import { Tier } from "../../../../Utility/Tier";
import { TraitEnum } from "../../../Traits/TraitEnums";
import { ItemCostInterface } from "../../ItemCost";
import { defaultDefenseStats } from "./ArmorDefense";
import { JewelGrade } from "./JewelGrade";
import { defaultAttackStats } from "./WeaponAttack";

export interface ResourceDTO {
    id: string,
    name: string,
    description: string,
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
}

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
export interface ArmorDTO {
    id: string, 
    name: string, 
    description: string, 
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    armorType: ArmorType | null,
    jewelSlots: number,
    slottedJewels: [],
    maxJewelGrade: JewelGrade | null,
    material: string,
    spellCastingDamageMultiplier: number,
    spellCastingPenaltyHit: number,
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
    equipmentType: EquipmentType | null,
    accessoryType: AccessoryType | null,
    material: string,
    specialTrait: TraitEnum[],
    defenseStats: Partial<typeof defaultDefenseStats>,
    attackStats: Partial<typeof defaultAttackStats>,
}

export interface ClothDTO {
    id: string, 
    name: string, 
    description: string, 
    image: string,
    cost: ItemCostInterface,
    weight: number,
    tier: Tier,
    equipmentType: EquipmentType | null,
    jewelSlots: number,
    slottedJewels: [],
    maxJewelGrade: JewelGrade | null,
    material: string,
    arcaneAptitude: number,
    specialTrait: TraitEnum[],
    defenseStats: Partial<typeof defaultDefenseStats>
}

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