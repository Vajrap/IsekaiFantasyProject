import { equipmentRepository } from "./Equipments/Repository";
import { resourcesRepository } from "./Resource/Repository";
export const itemRepository = Object.assign(Object.assign({}, equipmentRepository), resourcesRepository);
export function getItem(id) {
    // When get item, we get it from the repository first, if it's not there, we get it from the database
    let item = itemRepository[id];
    /*
    if (!item) {
        item = db.getItem(id);
    }
    */
    return item;
}
