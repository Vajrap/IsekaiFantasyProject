import { axeRepository } from "./Axe/Repository";
import { bladeRepository } from "./Blade/Repository";
import { bowRepository } from "./Bow/Repository";
import { daggerRepository } from "./Dagger/Repository";
import { maceRepository } from "./Mace/Repository";
import { orbRepository } from "./Orb/Repository";
import { shieldRepository } from "./Shield/Repository";
import { spearRepository } from "./Spear/Repository";
import { staffRepository } from "./Staff/Repository";
import { swordRepository } from "./Sword/Repository";
import { tomeRepository } from "./Tome/Repository";
import { wandRepository } from "./Wand/Repository";

export const weaponRepository = {
    ...swordRepository,
    ...bladeRepository,
    ...axeRepository,
    ...bowRepository,
    ...daggerRepository,
    ...maceRepository,
    ...orbRepository,
    ...spearRepository,
    ...staffRepository,
    ...tomeRepository,
    ...wandRepository,
    ...shieldRepository
}