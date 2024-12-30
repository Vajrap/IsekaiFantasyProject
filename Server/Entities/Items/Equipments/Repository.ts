import { accessoryRepository } from "./Accessories/Repository";
import { armorRepository } from "./Armors/Repository";

export const equipmentRepository = {
    ...armorRepository,
    ...accessoryRepository,
    // ...weaponRepository
}