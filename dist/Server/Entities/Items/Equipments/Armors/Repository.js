import { clothRepository } from "./Cloth/Repository";
import { heavyArmorRepository } from "./Heavy/Repository";
import { lightArmorRepository } from "./Light/Repository";
import { mediumArmorRepository } from "./Medium/Repository";
export const armorRepository = Object.assign(Object.assign(Object.assign(Object.assign({}, clothRepository), lightArmorRepository), mediumArmorRepository), heavyArmorRepository);
