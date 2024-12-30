import { clothRepository } from "./Cloth/Repository";
import { heavyArmorRepository } from "./Heavy/Repository";
import { lightArmorRepository } from "./Light/Repository";
import { mediumArmorRepository } from "./Medium/Repository";

export const armorRepository = {
    ...clothRepository,
    ...lightArmorRepository,
    ...mediumArmorRepository,
    ...heavyArmorRepository
}