import { Party } from "../Party/Party";
import { Item } from "./Items";
import { MarketManager } from "./MarketManager";
import { itemRepository } from "./Repository";


export class ItemPool {
    private static poll: Map<string, number> = new Map();

    static addItem(id: string, quantity: number): void {
        if (this.poll.has(id)) {
            this.poll.set(id, (this.poll.get(id) ?? 0) + quantity);
        }
        else {
            this.poll.set(id, quantity);
        }
    }

    static giveItemToParty(party: Party, itemID: string, quantity: number, isTrade: boolean = false): void {
        if (!itemRepository[itemID]) {
            throw new Error(`Item with id ${itemID} not found`);
        }
        const actualQuantity = this.poll.get(itemID) ?? 0;
        
        let givableQuantity = 0;

        if (actualQuantity < quantity) {
            givableQuantity = this.poll.get(itemID) ?? 0;
        } else {
            givableQuantity = quantity;
        }
        
        party.inventory[itemID] += givableQuantity;
        this.poll.set(itemID, (this.poll.get(itemID) ?? 0) - givableQuantity);

        if (isTrade) {
            this.recordItemTrade(itemID, "pool", party.partyID);
        }
    }

    static moveItemBetweenParties(from: Party, to: Party, itemID: string, quantity: number, isTrade: boolean = false): void {
        const itemQuantity = from.inventory[itemID];
        if (itemQuantity < quantity) {
            throw new Error(`Party does not have enough ${itemID} to move.`);
        }
        from.inventory[itemID] -= quantity;
        to.inventory[itemID] += quantity;

        if (isTrade) {
            this.recordItemTrade(itemID, from.partyID, to.partyID);
        }
    }

    private static recordItemTrade(itemID: string, from: string, to: string) {
        // For now, simply notify MarketManager if needed
        MarketManager.recordSale(itemID, 1);
    }
}