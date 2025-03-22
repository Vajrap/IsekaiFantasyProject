import { Item } from "../../Entities/Items/Items";
import { getItem, itemRepository } from "../../Entities/Items/Repository";
import { Party } from "../../Entities/Party/Party";
import { event_rest_force } from "./restEvents";

export function event_craft(party: Party): void {
    let canCraft = false;
    for (const order in party.behavior.craft.craftingList) {
        const itemID = party.behavior.craft.craftingList[order].bluePrintID;
        const item = getItem(itemID);
        if (!item) {
            console.error(`Item with ID ${itemID} not found in itemRepository`);
            continue;
        }

        const qaLow = party.behavior.craft.craftingList[order].quantityLow;
        const qaHigh = party.behavior.craft.craftingList[order].quantityHigh;
        const strategy = party.behavior.craft.craftingList[order].strategy;

        switch (strategy) {
            case "craftAll": {
                let result = craftAllStrategy(party, item);
                if (result) {
                    canCraft = true;
                }
                break;
            }
            case "craftInRange": {
                let result = craftInRangeStrategy(party, item, qaLow, qaHigh);
                if (result) {
                    canCraft = true;
                }
                break;
            }
            case "craftOne": {
                let result = craftOneStrategy(party, item);
                if (result) {
                    canCraft = true;
                }
                break;
            }
        }
    }

    // If can't craft anything, will call force rest event instead
    if (!canCraft) {
        event_rest_force(party);
    };
}

function craftInRangeStrategy(party: Party, item: Item, quantityLow: number, quantityHigh: number): boolean {
    const current = party.inventory[item.id] || 0;
    if (current >= quantityLow) return false;

    const allowed = quantityHigh - current;
    let totalCraftable = Infinity;
    for (const [resId, reqQty] of item.resource) {
        const available = party.inventory[resId] || 0;
        if (available < reqQty) {
            totalCraftable = 0;
            break;
        }
        totalCraftable = Math.min(totalCraftable, Math.floor(available / reqQty));
    }

    const craftCount = Math.min(totalCraftable, allowed);
    if (craftCount > 0) {
        for (const [resId, reqQty] of item.resource) {
            party.inventory[resId] -= reqQty * craftCount;
        }
        craftItem(party, item, craftCount);
        return true;
    }
    return false;
}

function craftOneStrategy(party: Party, item: Item): boolean {
    const current = party.inventory[item.id] || 0;
    if (current !== 0) return false;

    for (const [resId, reqQty] of item.resource) {
        if ((party.inventory[resId] || 0) < reqQty) {
            return false;
        }
    }

    for (const [resId, reqQty] of item.resource) {
        party.inventory[resId] -= reqQty;
    }
    craftItem(party, item, 1);
    return true;
}

function craftAllStrategy(party: Party, item: Item): boolean {
    let totalCraftable = Infinity;

    // Calculate how many can be crafted
    for (const [id, quantity] of item.resource) {
        if (party.inventory[id] < quantity) {
            totalCraftable = 0;
            break;
        }
        totalCraftable = Math.min(totalCraftable, Math.floor(party.inventory[id] / quantity));
    }

    if (totalCraftable > 0) {
        for (const [id, quantity] of item.resource) {
            party.inventory[id] -= quantity * totalCraftable;
        }
        craftItem(party, item, totalCraftable);
        return true;
    }
    return false;
}


function craftItem(party: Party, item: Item, quantity: number): void {
    if (quantity <= 0) return;

    // Deduct required resources
    for (const [resId, reqQty] of item.resource) {
        party.inventory[resId] -= reqQty * quantity;
    }

    // Add crafted item to inventory
    party.inventory[item.id] = (party.inventory[item.id] || 0) + quantity;
}