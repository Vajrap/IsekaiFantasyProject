import { DropEntry, monsterDropTables } from './DropTables';
import { ResourceNameEnum } from '../../Entities/Items/Resource/ResourceNameEnum';
import { itemRepository } from '../../Entities/Items/Repository';

export interface LootItem {
    resourceId: ResourceNameEnum;
    name: string;
    quantity: number;
    value: number; // Total value in copper coins
}

export class LootGenerator {
    /**
     * Generate loot from a monster based on its type
     * @param monsterType The type of monster (e.g., 'wolf', 'dragon')
     * @param monsterLevel The level of the monster
     * @param luckModifier Luck modifier to adjust drop chances (default: 0)
     * @returns Array of loot items
     */
    static generateLoot(monsterType: string, monsterLevel: number, luckModifier: number = 0): LootItem[] {
        const dropTable = monsterDropTables[monsterType];
        
        if (!dropTable) {
            console.warn(`No drop table found for monster type: ${monsterType}`);
            return [];
        }
        
        const loot: LootItem[] = [];
        
        // Process guaranteed drops first
        if (dropTable.guaranteed) {
            for (const drop of dropTable.guaranteed) {
                this.processDropEntry(drop, loot, monsterLevel, luckModifier);
            }
        }
        
        // Process common drops
        for (const drop of dropTable.common) {
            this.processDropEntry(drop, loot, monsterLevel, luckModifier);
        }
        
        // Process uncommon drops
        for (const drop of dropTable.uncommon) {
            this.processDropEntry(drop, loot, monsterLevel, luckModifier, 0.75); // Reduce base chance for uncommon
        }
        
        // Process rare drops
        for (const drop of dropTable.rare) {
            this.processDropEntry(drop, loot, monsterLevel, luckModifier, 0.5); // Reduce base chance for rare
        }
        
        return loot;
    }
    
    /**
     * Process a single drop entry and add to loot if successful
     */
    private static processDropEntry(
        drop: DropEntry, 
        loot: LootItem[], 
        monsterLevel: number, 
        luckModifier: number,
        chanceMultiplier: number = 1
    ): void {
        // Calculate adjusted drop chance
        // Higher level monsters and luck increase chance
        const levelBonus = (monsterLevel * 0.5); // 0.5% per level
        const luckBonus = luckModifier * 2; // 2% per luck point
        const adjustedChance = drop.chance * chanceMultiplier + levelBonus + luckBonus;
        
        // Roll for drop chance
        if (Math.random() * 100 <= adjustedChance) {
            // Calculate quantity
            let quantity = Math.floor(Math.random() * (drop.maxQuantity - drop.minQuantity + 1)) + drop.minQuantity;
            
            // Apply level bonus to quantity for higher level monsters (small chance for more items)
            if (Math.random() < monsterLevel * 0.02) {
                quantity += 1;
            }
            
            // Find the resource in the repository
            const resourceKey = Object.keys(itemRepository).find(key => 
                itemRepository[key as keyof typeof itemRepository].id === drop.resourceId
            );
            if (resourceKey) {
                const resource = itemRepository[resourceKey as keyof typeof itemRepository];
                // Calculate total value
                const value = Math.floor(resource.cost.baseCost * quantity);
                
                loot.push({
                    resourceId: drop.resourceId,
                    name: resource.name,
                    quantity,
                    value
                });
            }
        }
    }
    
    /**
     * Generate a string representation of the loot for display
     */
    static formatLootForDisplay(loot: LootItem[]): string {
        if (loot.length === 0) {
            return "No loot found.";
        }
        
        let result = "Loot:\n";
        let totalValue = 0;
        
        loot.forEach(item => {
            result += `- ${item.quantity}x ${item.name} (${item.value} copper)\n`;
            totalValue += item.value;
        });
        
        result += `\nTotal value: ${totalValue} copper`;
        return result;
    }
    
    /**
     * Test method to generate and display loot from a specified monster
     */
    static testLootGeneration(monsterType: string, monsterLevel: number = 1, trials: number = 1): void {
        console.log(`Testing loot generation for ${monsterType} (Level ${monsterLevel}):`);
        
        for (let i = 0; i < trials; i++) {
            const loot = this.generateLoot(monsterType, monsterLevel);
            console.log(`\nTrial ${i + 1}:`);
            console.log(this.formatLootForDisplay(loot));
        }
    }
} 