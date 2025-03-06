import { Character } from "../../Entities/Character/Character";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { LocationActionEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { RegionNameEnum } from "../../../Common/DTOsEnumsInterfaces/Map/RegionNameEnum";
import { Party } from "../Party/Party";
import { PartyType } from "../Party/PartyType";
import { gameEvent_battleEvent } from "../../Game/GameEvent/GameEvent";
import { checkIfCombatInitiated } from "../../Game/Battle/Calculators/checkIfCombatInitiated";
import { getItem } from "../Items/Repository";

export class GameLocation {
    id: LocationName;
    description: string;
    actions: LocationActionEnum[];
    connectedLocations: { location: GameLocation, distance: number }[] = [];
    mainRegion: RegionNameEnum;
    region: RegionNameEnum;
    parties: Party[] = [];

    constructor(id: LocationName, description: string, actions: LocationActionEnum[], mainRegion: RegionNameEnum, region: RegionNameEnum) {
        this.id = id;
        this.description = description;
        this.actions = actions;
        this.mainRegion = mainRegion;
        this.region = region;
    }

    addConnection(location: GameLocation, distance: number) {
        this.connectedLocations.push({ location, distance });
    }

    calculateDistanceTo(location: GameLocation): number {
        let distanceToGo = 0
        for (const connectedLocation of this.connectedLocations) {
            if (connectedLocation.location === location) {
                distanceToGo = connectedLocation.distance
            }
        }
        if (distanceToGo === 0 ){ throw new Error('error Distance must not be 0') }
        return distanceToGo
    }

    partyMoveIn(party: Party) {
        const partyLeader = party.characters.find(character => character != 'none' && character.id === party.partyID);

        if (!partyLeader || partyLeader === undefined || partyLeader === 'none') { 
            throw new Error('Party leader not found') 
        }

        const isMoreThanOne = party.characters.filter(character => character !== 'none').length > 1;

        // TODO: Turns from console.log to logger that can be shown in the UI
        console.log(`${partyLeader.name} ${isMoreThanOne? 'and His party': ''} entered ${this.id}`);

        this.parties.push(party);

        // this.checkEncounterEvent(party);
    }

    partyMoveOut(party: Party) {
        const partyLeader = party.characters.find(character => character != 'none' && character.id === party.partyID);

        if (!partyLeader || partyLeader === undefined || partyLeader === 'none') { 
            throw new Error('Party leader not found') 
        }

        const isMoreThanOne = party.characters.filter(character => character !== 'none').length > 1;
        console.log(`${partyLeader.name} ${isMoreThanOne? 'and His party': ''} left ${this.id}`);

        this.parties = this.parties.filter(p => p !== party);
    }

    checkIfLocationConnected(location: GameLocation): boolean {
        return this.connectedLocations.some(loc => loc.location === location);
    }

    getAllCharactersInLocation(): Character[] {
        return this.parties.reduce((characters: Character[], party) => characters.concat(party.characters.filter(character => character !== 'none')), []);
    }

    getAllActions(): LocationActionEnum[] {
        return this.actions;
    }

    async checkAndTriggerEncounterEvent(party: Party): Promise<boolean> {
        if (!this.parties.includes(party)) { throw new Error('Party not in location'); }
        for (const otherParty of this.parties) {
            if (otherParty !== party) {
                if (checkIfCombatInitiated(party, otherParty, otherParty.behavior.combatPolicy)) {
                    gameEvent_battleEvent.execute({ 
                        party: party, 
                        enemyParty: otherParty, 
                        location: this.id 
                    });
                    return true;
                } 

                if (this.handleNeutralEncounter(party, otherParty)) {
                    return true;
                }
            }
        }
        return false;
    }

    private handleNeutralEncounter(partyA: Party, partyB: Party): boolean {
        const merchantTypes = new Set([PartyType.merchant]);
        const scholarTypes = new Set([PartyType.scholar, PartyType.hermit]);
        const militaryTypes = new Set([PartyType.knight, PartyType.soldier, PartyType.nobleRetinue]);
        const rogueTypes = new Set([PartyType.rogue, PartyType.bandit, PartyType.criminal, PartyType.raider]);
        const nobleTypes = new Set([PartyType.nobleRetinue]);
        const religiousTypes = new Set([PartyType.pilgrim, PartyType.hermit]);
        const laborTypes = new Set([PartyType.peasant, PartyType.artisan]);
    
        if (
            (merchantTypes.has(partyA.behavior.partyType) && !this.isHostile(partyB)) ||
            (merchantTypes.has(partyB.behavior.partyType) && !this.isHostile(partyA))
        ) {
            executeTradeEvent(partyA, partyB);
            return true;
        }
    
        if (scholarTypes.has(partyA.behavior.partyType) && scholarTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement knowledge exchange (increase intelligence, gain skills, share lore)
            return true;
        }
    
        if (militaryTypes.has(partyA.behavior.partyType) && militaryTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement friendly duels, combat training, or tactical discussions
            return true;
        }
    
        if (nobleTypes.has(partyA.behavior.partyType) && militaryTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement recruitment event where nobles hire knights or mercenaries
            return true;
        }
    
        if (rogueTypes.has(partyA.behavior.partyType) && rogueTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement underworld deals (black market trades, secretive missions, bounties)
            return true;
        }
    
        if (religiousTypes.has(partyA.behavior.partyType) && religiousTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement blessings, confessions, or divine favor system
            return true;
        }
    
        if (laborTypes.has(partyA.behavior.partyType) && merchantTypes.has(partyB.behavior.partyType)) {
            //TODO: Implement crafting offers, trade deals, or job assignments
            return true;
        }
    
        //TODO: Handle situations where no action occurs but relations improve slightly over time
    
        return false;
    }
    
    private isHostile(party: Party): boolean {
        return [PartyType.bandit, PartyType.raider, PartyType.criminal].includes(party.behavior.partyType);
    }
}

function executeTradeEvent(partyA: Party, partyB: Party) {
    if (partyA.behavior.trade.buying.strategy === "buyNone" && partyB.behavior.trade.buying.strategy === "buyNone") {
        return;
    }
    if (partyA.behavior.trade.selling.strategy === "sellNone" && partyB.behavior.trade.selling.strategy === "sellNone") {
        return;
    }

    if ((partyA.behavior.trade.buying.strategy === "buySome" || partyA.behavior.trade.buying.strategy === "buyAtDiscount") &&
        (partyB.behavior.trade.selling.strategy === "sellSome" || partyB.behavior.trade.selling.strategy === "sellAtMarkUp")) {

        for (const itemKey in partyA.behavior.trade.buying.itemList) {
            const wantToBuy = { itemID: itemKey, stockThreshold: partyA.behavior.trade.buying.itemList[itemKey] };
            
            if (!isInventoryBelowThreshold(partyA, wantToBuy.itemID, wantToBuy.stockThreshold)) {
                continue; // Buyer already has enough of this item
            }

            const wantToSell = { itemID: itemKey, stockThreshold: partyB.behavior.trade.selling.itemList[itemKey] };
            if (!isInventoryAboveThreshold(partyB, wantToSell.itemID, wantToSell.stockThreshold)) {
                continue; // Seller does not have enough stock to sell
            }

            // Get item reference for pricing calculations
            const item = getItem(wantToBuy.itemID); 
            if (!item) continue; // Skip if the item does not exist

            // Calculate true cost deviation
            const baseCost = item.cost.cost;
            const marketCost = item.cost.marketCost;
            const costDeviation = (marketCost - baseCost) / baseCost; // Percentage deviation

            // Apply buyer's discount preference
            let acceptableBuyPrice = marketCost;
            if (partyA.behavior.trade.buying.strategy === "buyAtDiscount") {
                let maxDiscount = partyA.behavior.trade.buying.discountPercentage / 100;
                acceptableBuyPrice = baseCost * (1 - maxDiscount);
            }

            // Apply seller's markup preference
            let requiredSellPrice = marketCost;
            if (partyB.behavior.trade.selling.strategy === "sellAtMarkUp") {
                let minMarkup = partyB.behavior.trade.selling.markupPercentage / 100;
                requiredSellPrice = baseCost * (1 + minMarkup);
            }

            // Check if the trade can occur within acceptable price ranges
            if (acceptableBuyPrice < requiredSellPrice) {
                continue; // No deal if buyer and seller don't agree on a price
            }

            // Determine quantity to trade
            let buyable = wantToBuy.stockThreshold - (partyA.inventory[wantToBuy.itemID] || 0);
            let sellable = (partyB.inventory[wantToSell.itemID] || 0) - wantToSell.stockThreshold;
            let quantity = Math.min(buyable, sellable);

            // Calculate final transaction price per item
            let tradePricePerItem = (acceptableBuyPrice + requiredSellPrice) / 2; // Middle ground

            let totalCost = tradePricePerItem * quantity;

            // Ensure buyer has enough funds
            if (partyA.gold < totalCost) {
                continue; // Buyer cannot afford the transaction
            }

            // Execute trade
            tradeItems(partyA, partyB, wantToBuy.itemID, quantity, totalCost);
        }
    }
}

function isInventoryAboveThreshold(party: Party, itemID: string, threshold: number): boolean {
    return (party.inventory[itemID] || 0) > threshold;
}

function isInventoryBelowThreshold(party: Party, itemID: string, threshold: number): boolean {
    return (party.inventory[itemID] || 0) < threshold;
}

function tradeItems(partyA: Party, partyB: Party, itemID: string, quantity: number, totalCost: number) {
    // Deduct money from buyer
    partyA.gold -= totalCost;
    partyB.gold += totalCost;

    // Adjust inventory
    partyA.inventory[itemID] = (partyA.inventory[itemID] || 0) + quantity;
    partyB.inventory[itemID] = Math.max(0, (partyB.inventory[itemID] || 0) - quantity);
}