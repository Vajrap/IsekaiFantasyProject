import { accessoryRepository } from "./Accessories/Repository";
import { armorRepository } from "./Armors/Repository";
import { bootsRepository } from "./Boots/Repository";
import { glovesRepository } from "./Gloves/Repository";
import { headwearRepository } from "./Headwear/Repository";
import { weaponRepository } from "./Weapon/Repository";

export const equipmentRepository = {
    ...armorRepository,
    ...accessoryRepository,
    ...weaponRepository,
    ...headwearRepository,
    ...bootsRepository,
    ...glovesRepository
}