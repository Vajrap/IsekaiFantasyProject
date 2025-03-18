import { ItemManager } from "../../Entities/Items/ItemManager";
import { getItem } from "../../Entities/Items/Repository";
import { Party } from "../../Entities/Party/Party";

export function executeTradeEvent(partyA: Party, partyB: Party) {
  if (
    partyA.behavior.trade.buying.strategy === "buyNone" &&
    partyB.behavior.trade.buying.strategy === "buyNone"
  ) {
    return;
  }
  if (
    partyA.behavior.trade.selling.strategy === "sellNone" &&
    partyB.behavior.trade.selling.strategy === "sellNone"
  ) {
    return;
  }

  if (
    (partyA.behavior.trade.buying.strategy === "buySome" ||
      partyA.behavior.trade.buying.strategy === "buyAtDiscount") &&
    (partyB.behavior.trade.selling.strategy === "sellSome" ||
      partyB.behavior.trade.selling.strategy === "sellAtMarkUp")
  ) {
    for (const itemKey in partyA.behavior.trade.buying.itemList) {
      const wantToBuy = {
        itemID: itemKey,
        stockThreshold: partyA.behavior.trade.buying.itemList[itemKey],
      };

      if (
        !isInventoryBelowThreshold(
          partyA,
          wantToBuy.itemID,
          wantToBuy.stockThreshold,
        )
      ) {
        continue; // Buyer already has enough of this item
      }

      const wantToSell = {
        itemID: itemKey,
        stockThreshold: partyB.behavior.trade.selling.itemList[itemKey],
      };
      if (
        !isInventoryAboveThreshold(
          partyB,
          wantToSell.itemID,
          wantToSell.stockThreshold,
        )
      ) {
        continue; // Seller does not have enough stock to sell
      }

      // Get item reference for pricing calculations
      const item = getItem(wantToBuy.itemID);
      if (!item) continue; // Skip if the item does not exist

      // Calculate true cost deviation
      const baseCost = item.cost.cost;
      const marketCost = item.cost.marketCost;
      const currentDeviation = (marketCost - baseCost) / baseCost; // Percentage deviation

      if (
        currentDeviation <= partyA.behavior.trade.buying.discountPercentage &&
        currentDeviation >= partyB.behavior.trade.selling.markupPercentage
      ) {
        // This means the price is within the acceptable range for both parties
        // Determine quantity to trade
        let buyable =
          wantToBuy.stockThreshold - (partyA.inventory[wantToBuy.itemID] || 0);
        let sellable =
          (partyB.inventory[wantToSell.itemID] || 0) -
          wantToSell.stockThreshold;
        let quantity = Math.min(buyable, sellable);
        let totalCost = marketCost * quantity;

        // Ensure buyer has enough funds
        if (partyA.gold < totalCost) {
          continue; // Buyer cannot afford the transaction
        }

        // Execute trade
        tradeItems(partyA, partyB, wantToBuy.itemID, quantity, totalCost);
      }
    }
  }
}

function isInventoryAboveThreshold(
  party: Party,
  itemID: string,
  threshold: number,
): boolean {
  return (party.inventory[itemID] || 0) > threshold;
}

function isInventoryBelowThreshold(
  party: Party,
  itemID: string,
  threshold: number,
): boolean {
  return (party.inventory[itemID] || 0) < threshold;
}

function tradeItems(
  partyA: Party,
  partyB: Party,
  itemID: string,
  quantity: number,
  totalCost: number,
) {
  // Deduct money from buyer
  partyA.gold -= totalCost;
  partyB.gold += totalCost;

  // Adjust inventory
  partyA.inventory[itemID] = (partyA.inventory[itemID] || 0) + quantity;
  partyB.inventory[itemID] = Math.max(
    0,
    (partyB.inventory[itemID] || 0) - quantity,
  );

  ItemManager.recordSale(itemID, quantity);
}
