import { ResourceType } from "../../Database/Item/Resource/resource";

export interface ResourceRequirement {
    acceptableMaterials: ResourceType[];  // List of acceptable materials for crafting (e.g., ["Wood", "Iron"])
    quantity: number;
}