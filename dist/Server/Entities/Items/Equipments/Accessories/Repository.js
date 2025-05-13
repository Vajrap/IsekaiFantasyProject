import { necklaceRepository } from "./Necklace/Repository";
import { ringRepository } from "./Ring/Repository";
export const accessoryRepository = Object.assign(Object.assign({}, ringRepository), necklaceRepository);
