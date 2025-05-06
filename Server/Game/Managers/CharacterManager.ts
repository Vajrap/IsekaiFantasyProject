import { Character } from "../../Entities/Character/Character";
import { db } from "../../Database";

export class CharacterManager {
    characters: Character[] = [];
    constructor() {
        this.characters = [];
    }
    
    getCharacterByID(id: string): Character {
        const character = this.characters.find(c => c.id === id);
        if (!character) { throw new Error(`Character with ID ${id} not found`); }
        return character;
    }

    addCharacter(character: Character) {
        this.characters.push(character);
    }

    public async saveCharacter(character: Character): Promise<void> {
        try {
            // Save basic character data
            await db.writeOver(
                { tableName: "characters", primaryKeyColumnName: "id", primaryKeyValue: character.id },
                [
                    { dataKey: "name", value: character.name },
                    { dataKey: "level", value: character.level },
                    { dataKey: "currentHP", value: character.currentHP },
                    { dataKey: "currentMP", value: character.currentMP },
                    { dataKey: "currentSP", value: character.currentSP },
                    { dataKey: "gold", value: character.gold },
                    { dataKey: "statTracker", value: character.statTracker },
                    { dataKey: "isDead", value: character.isDead ? 1 : 0 },
                    { dataKey: "location", value: character.location }
                ]
            );

            // Save character status
            await db.writeOver(
                { tableName: "character_status", primaryKeyColumnName: "characterId", primaryKeyValue: character.id },
                [
                    { dataKey: "attributes", value: character.status.attributes },
                    { dataKey: "proficiencies", value: character.status.proficiencies },
                    { dataKey: "battlers", value: character.status.battlers },
                    { dataKey: "elements", value: character.status.elements },
                    { dataKey: "artisans", value: character.status.artisans }
                ]
            );

            // Save equipment state
            await db.writeOver(
                { tableName: "character_equipment", primaryKeyColumnName: "characterId", primaryKeyValue: character.id },
                [
                    { dataKey: "mainHand", value: character.equipments.mainHand?.id || null },
                    { dataKey: "offHand", value: character.equipments.offHand?.id || null },
                    { dataKey: "armor", value: character.equipments.armor?.id || null },
                    { dataKey: "headwear", value: character.equipments.headwear?.id || null },
                    { dataKey: "gloves", value: character.equipments.gloves?.id || null },
                    { dataKey: "boots", value: character.equipments.boots?.id || null },
                    { dataKey: "necklace", value: character.equipments.necklace?.id || null },
                    { dataKey: "ring_R", value: character.equipments.ring_R?.id || null },
                    { dataKey: "ring_L", value: character.equipments.ring_L?.id || null }
                ]
            );

            // Save inventory
            await db.writeOver(
                { tableName: "character_inventory", primaryKeyColumnName: "characterId", primaryKeyValue: character.id },
                [
                    { dataKey: "items", value: character.itemsBag }
                ]
            );

            console.log(`Character ${character.name} (${character.id}) saved successfully`);
        } catch (error) {
            console.error(`Error saving character ${character.name} (${character.id}):`, error);
            throw error;
        }
    }
}

export const characterManager = new CharacterManager();