import { Character, PlayerCharacter } from "../Entities/Character/Character";

export class CharacterManager {
    players: PlayerCharacter[] = [];
    characters: Character[] = [];
    constructor() {
        this.characters = [];
    }
    getPlayerCharacterByUserID(userID: string): PlayerCharacter {
        const player = this.players.find(p => p.userID === userID);
        if (!player) { throw new Error(`Player with ID ${userID} not found`); }
        return player;
    }
    getPlayerCharacterByCharacterID(characterID: string): PlayerCharacter {
        const player = this.players.find(p => p.id === characterID);
        if (!player) { throw new Error(`Player with ID ${characterID} not found`); }
        return player;
    }
    getCharacterByID(id: string): Character {
        const character = this.characters.find(c => c.id === id);
        if (!character) { throw new Error(`Character with ID ${id} not found`); }
        return character;
    }

    addPlayerCharacter(player: PlayerCharacter) {
        this.players.push(player);
    }

    addCharacter(character: Character) {
        this.characters.push(character);
    }
}