import { Item } from "../../Entities/Items/Item";
import { Equipment } from "../../Entities/Items/Equipments/Equipment";
import { Weapon } from "../../Entities/Items/Equipments/Weapon/Weapon";
import { Consumable } from "../../Entities/Items/Consumable/Consumable";
import { db } from "../../Database";

export class ItemManager {
    items: Item[] = [];

    constructor() {
        this.items = [];
    }

    public async saveItem(item: Item): Promise<void> {
        try {
            // Save basic item data
            await db.writeOver(
                { tableName: "items", primaryKeyColumnName: "id", primaryKeyValue: item.id },
                [
                    { dataKey: "name", value: item.name },
                    { dataKey: "description", value: item.description },
                    { dataKey: "type", value: item.type },
                    { dataKey: "rarity", value: item.rarity },
                    { dataKey: "value", value: item.value },
                    { dataKey: "weight", value: item.weight },
                    { dataKey: "quantity", value: item.quantity },
                    { dataKey: "isStackable", value: item.isStackable },
                    { dataKey: "maxStackSize", value: item.maxStackSize },
                    { dataKey: "condition", value: item.condition },
                    { dataKey: "durability", value: item.durability }
                ]
            );

            // Save equipment specific data if it's an equipment
            if (item instanceof Equipment) {
                await db.writeOver(
                    { tableName: "equipment", primaryKeyColumnName: "itemId", primaryKeyValue: item.id },
                    [
                        { dataKey: "slot", value: item.slot },
                        { dataKey: "level", value: item.level },
                        { dataKey: "defense", value: item.defense },
                        { dataKey: "magicDefense", value: item.magicDefense },
                        { dataKey: "attributes", value: item.attributes },
                        { dataKey: "requirements", value: item.requirements },
                        { dataKey: "bonusEffects", value: item.bonusEffects }
                    ]
                );

                // If it's a weapon, save weapon specific data
                if (item instanceof Weapon) {
                    await db.writeOver(
                        { tableName: "weapons", primaryKeyColumnName: "equipmentId", primaryKeyValue: item.id },
                        [
                            { dataKey: "damage", value: item.damage },
                            { dataKey: "damageType", value: item.damageType },
                            { dataKey: "range", value: item.range },
                            { dataKey: "accuracy", value: item.accuracy },
                            { dataKey: "attackSpeed", value: item.attackSpeed },
                            { dataKey: "criticalRate", value: item.criticalRate },
                            { dataKey: "criticalDamage", value: item.criticalDamage }
                        ]
                    );
                }
            }

            // Save consumable specific data if it's a consumable
            if (item instanceof Consumable) {
                await db.writeOver(
                    { tableName: "consumables", primaryKeyColumnName: "itemId", primaryKeyValue: item.id },
                    [
                        { dataKey: "effects", value: item.effects },
                        { dataKey: "duration", value: item.duration },
                        { dataKey: "cooldown", value: item.cooldown },
                        { dataKey: "usageLimit", value: item.usageLimit },
                        { dataKey: "remainingUses", value: item.remainingUses }
                    ]
                );
            }

            console.log(`Item ${item.name} (${item.id}) saved successfully`);
        } catch (error) {
            console.error(`Error saving item ${item.name} (${item.id}):`, error);
            throw error;
        }
    }
}

export const itemManager = new ItemManager(); 