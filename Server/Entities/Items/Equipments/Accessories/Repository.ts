import { necklaceRepository } from "./Necklace/Repository";
import { ringRepository } from "./Ring/Repository";

export const accessoryRepository = {
    ...ringRepository,
    ...necklaceRepository
}