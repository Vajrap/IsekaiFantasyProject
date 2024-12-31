import { accessoryRepository } from "./Accessories/Repository";
import { armorRepository } from "./Armors/Repository";
import { weaponRepository } from "./Weapon/Repository";

export const equipmentRepository = {
    ...armorRepository,
    ...accessoryRepository,
    ...weaponRepository,
}