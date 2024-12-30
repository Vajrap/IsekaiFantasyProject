import { db } from "../../Database";
import { equipmentRepository } from "./Equipments/Repository";
import { Item } from "./Items";

type ItemRepository = {
    [key: string]: any;
};

export const itemRepository: ItemRepository = {
    ...equipmentRepository,
    // ...consumableRepository
    // ...resourceRepository
}

export function getItem(id: string): Item  {
    return itemRepository[id];
}
