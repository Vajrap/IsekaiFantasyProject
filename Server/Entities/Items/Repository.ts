import { equipmentRepository } from "./Equipments/Repository";
import { Item } from "./Items";
import { resourcesRepository } from "./Resource/Repository";

type ItemRepository = {
    [key: string]: any;
};

export const itemRepository: ItemRepository = {
    ...equipmentRepository,
    // ...consumableRepository
    ...resourcesRepository
}

export function getItem(id: string): Item  {
    // When get item, we get it from the repository first, if it's not there, we get it from the database
    let item = itemRepository[id];
    /*
    if (!item) {
        item = db.getItem(id);
    }
    */
    return item;
}
