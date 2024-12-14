import { GameTime } from "./TimeAndDate/GameTime";
import { CharacterManager } from "./CharacterManager";
import { PartyManager } from "./PartyManager";
import { db } from "../Database";
import { LocationManager } from "./LocationManager";
import { CharacterArchetype } from "../Entities/Character/Subclasses/CharacterArchetype";
import { Character } from "../Entities/Character/Character";
import { BattleManager } from "./Battle/BattleManager";
import { createCharacterTableIfNotExists } from "../Database/Character/Characters";
import { createItemResourceTableIfNotExists } from "../Database/Item/Resource/resource";
import { createItemConsumableTableIfNotExists } from "../Database/Item/Consumable/consumable";
import { createGameTimeTableIfNotExists } from "../Database/GameTime/GameTime";
import { createGearTableIfNotExists } from "../Database/Item/Gear/createGearTableIfNotExists";
import { createSkillTableIfNotExists } from "../Database/Skill/skill";
import { createUsersTableIfNotExist } from "../Database/User/CreateUsersTableIfNotExist";
import { createPartyTableIfNotExist } from "../Database/Party/Party";
import { createPlayerCharacterTableIfNotExists } from "../Database/Character/PlayerCharacter";

export class Game {
    characterManager: CharacterManager = new CharacterManager();
    partyManager: PartyManager = new PartyManager();
    locationManager: LocationManager = new LocationManager();
    battles: BattleManager = new BattleManager();
    gameTime: GameTime = new GameTime(0);
    db = db;
    constructor() {}

    public async start() {
        try {
            // Ensure database is initialized before the game starts
            await this.initializeDatabase();

            // Now that the DB is ready, initialize the game state
            await this.initialize();
            
            console.log('Game has started successfully.');
        } catch (error) {
            console.error('Error during game initialization:', error);
        }
    } 

    private async initializeDatabase() {
        try {
            console.log('Initializing database...');

            await Promise.all([
                createCharacterTableIfNotExists(),
                createUsersTableIfNotExist(),
                createGameTimeTableIfNotExists(),
                createItemResourceTableIfNotExists(),
                createItemConsumableTableIfNotExists(),
                createSkillTableIfNotExists(),
                createGearTableIfNotExists(),
                createPlayerCharacterTableIfNotExists(),
                createPartyTableIfNotExist(),
            ]);

            console.log('Database initialized successfully.');
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error; // If DB init fails, we throw an error to stop game startup
        }
    }

    private async initialize() {
        /*
        Conceptual, this initialize would be called when the server is started.
        This would set the game state and maybe also the database?
        Like if the db has no NPC, MOB, ITEMS data etc, it would populate those data into the DB.
        And then it would load those data into the game state.
        We would have.
        - GameTime: populatable - updateable
        NPC MOB PLAYER CHARACTER CAN BE LUMPED TOGETHER.
        - NPC Characters: populatable - updateable
        - MOB Characters: populatable
        - Items: populatable - updateable <--- update item database is the item created by player.
        - Locations: populatable - updateable <--- update location would only update the characters in the location.
        - Quests: populatable
        - Dialogues: populatable <--- implement later, use idres for text
        - Parties: non-populatable - updateable
        - Player Characters: non-populatable - updateable
        So we call each of the above to load the data from the database.
        each call, in the populatable would check if the data is already in the database, if not, it would populate it.

        TODO: Move these Database Operations into Database Folder and export the function here.
        */
        await this.loadGameTimeFromDB();
        await this.loadItemsFromDB();
        await this.loadNPCFromDB();
        await this.loadMOBFromDB();
        await this.loadLocationsFromDB();
        await this.loadQuestsFromDB();
        await this.loadDialoguesFromDB();
        await this.loadPartiesFromDB();
        await this.loadPlayerCharactersFromDB();
        this.gameTime.startTiming();
    }

    //MARK: DATABASE METHODS
    private async loadGameTimeFromDB() {
        try {
            // Ensure the GameTime table exists; create it if it doesn't
            await createGameTimeTableIfNotExists();

            // Attempt to read the game time from the database
            const result = await db.read('GameTime', 'id', 1); // Always read the first (and only) row with id=1
    
            if (result) {
                // If the game time exists in the database, initialize GameTime with the stored values
                const { dayPassed, day, hour, month, year } = result;
                this.gameTime = new GameTime(dayPassed);
                this.gameTime.gameDateDay = day;
                this.gameTime.gameDateHour = hour;
                this.gameTime.gameDateMonth = month;
                this.gameTime.gameDateYear = year;
            } else {
                // If no game time is found in the database, initialize it with default values (1, 1, 1, 0)
                console.log('No game time found in the database, initializing with default value (1-1-1-0).');
                this.gameTime = new GameTime(0); // Initialize with dayPassed = 0
                this.gameTime.gameDateDay = 1;
                this.gameTime.gameDateHour = 1;
                this.gameTime.gameDateMonth = 1;
                this.gameTime.gameDateYear = 0;
    
                // Save this default game time to the database
                await this.saveGameTimeToDB();
            }
        } catch (error) {
            console.error('Error loading game time from database:', error);
        }
    }
    
    private async saveGameTimeToDB() {
        try {
            const { dayPassed, day, hour, month, year } = this.gameTime.getCurrentGameDate();
            
            console.log(dayPassed)
            
            await db.writeOver(
                {tableName: 'GameTime', primaryKeyColumnName: 'id', primaryKeyValue: '1'},
                [
                    {dataKey: 'dayPassed', value: dayPassed},
                    {dataKey: 'day', value: day},
                    {dataKey: 'hour', value: hour},
                    {dataKey: 'month', value: month},
                    {dataKey: 'year', value: year}
                ]
            );
    
            console.log('Successfully saved game time to the database');
        } catch (error) {
            console.error('Error saving game time to the database:', error);
        }
    }

    //TODO: Implement the following methods
    private async loadNPCFromDB() {
        try {
            await createCharacterTableIfNotExists();
    
            const characters = await db.readAll('Characters');
    
            for (const character of characters) {
                // Parse the complex data that was stored as JSON strings in the database
                const alignment = JSON.parse(character.alignment);
                const attributes = JSON.parse(character.attributes);
                const proficiencies = JSON.parse(character.proficiencies);
                const battlers = JSON.parse(character.battlers);
                const elements = JSON.parse(character.elements);
                const artisans = JSON.parse(character.artisans);
                const equipments = JSON.parse(character.equipments);
                const internals = JSON.parse(character.internals);
                const traits = JSON.parse(character.traits);
                const skills = JSON.parse(character.skills);
                const activeSkills = JSON.parse(character.activeSkills);
                const itemsBag = JSON.parse(character.itemsBag);
    
                // Create the CharacterArchetype instance
                const archeType = new CharacterArchetype({
                    name: character.name,
                    gender: character.gender,
                    id: character.id,
                    type: character.type,
                    level: character.level,
                    portrait: character.portrait,
                    race: character.race,
                    background: character.background,
                    alignment: alignment, // parsed JSON data
                    mood: character.mood,
                    energy: character.energy,
                    fame: character.fame,
                    gold: character.gold,
                    exp: character.exp,
                    isDead: character.isDead === 1 ? true : false,
                    lastTarget: character.lastTarget,
                    currentHP: character.currentHP,
                    currentMP: character.currentMP,
                    currentSP: character.currentSP,
                    attributes: attributes, // parsed JSON data
                    proficiencies: proficiencies, // parsed JSON data
                    battlers: battlers, // parsed JSON data
                    elements: elements, // parsed JSON data
                    artisans: artisans, // parsed JSON data
                    equipments: equipments, // parsed JSON data
                    internals: internals, // parsed JSON data
                    activeInternal: character.activeInternal ? character.activeInternal : null,
                    traits: traits, // parsed JSON data
                    skills: skills, // parsed JSON data
                    activeSkills: activeSkills, // parsed JSON data
                    position: character.position ? character.position : 0,
                    itemsBag: itemsBag, // parsed JSON data
                    baseAC: character.baseAC,
                    location: character.location,
                    isSummoned: character.isSummoned === 1 ? true : false,
                    arcaneAptitude: character.arcaneAptitude
                });
    
                // Create a Character object from CharacterArchetype
                const newCharacter = new Character(
                    character.id,
                    character.name,
                    character.gender,
                    archeType
                );
    
                // Add the new character to the character manager
                this.characterManager.addCharacter(newCharacter);
            }
        } catch (error) {
            console.error('Error loading NPC from database:', error);
        }
    }
    
    private async loadMOBFromDB() {
        // Load MOB from database
    }

    private async loadItemsFromDB() {
        // Load items from database
        try {
            await createItemResourceTableIfNotExists();
            await createItemConsumableTableIfNotExists();
    
            // const resources = await db.readAll('ItemResources');
            // const consumables = await db.readAll('ItemConsumable');
        } catch (error) {
            console.error('Error loading items from database:', error);
        }
    }


    private async loadLocationsFromDB() {
        // Load locations from database
    }

    private async loadQuestsFromDB() {
        // Load quests from database
    }

    private async loadDialoguesFromDB() {
        // Load dialogues from database
    }

    private async loadPartiesFromDB() {
        // Load parties from database
    }

    private async loadPlayerCharactersFromDB() {
        // Load player characters from database
    }


    //MARK: GAME METHODS
    getPlayerCharacterByUserID(userID: string) {
        return this.characterManager.getPlayerCharacterByUserID(userID);
    }

    getPlayerCharacterByCharacterID(characterID: string) {
        return this.characterManager.getPlayerCharacterByCharacterID(characterID);
    }

    getCharacterByID(characterID: string) {
        return this.characterManager.getCharacterByID(characterID);
    }

    async saveGameStateToDB(): Promise<void> {
        try {
            // Save game time
            await this.saveGameTimeToDB();
            // Save characters
            for (const character of this.characterManager.characters) {
                // await db.writeOver('characters', 'characterID', character.characterID, 'data', JSON.stringify(character, db.circularReplacer()));
            }
            // Save players
            for (const player of this.characterManager.players) {
                // await db.writeOver('players', 'characterID', player.characterID, 'data', JSON.stringify(player, db.circularReplacer()));
            }
            // Save parties
            for (const party of this.partyManager.parties) {
                // await db.writeOver('parties', 'partyID', party.partyID, 'data', JSON.stringify(party, db.circularReplacer()));
            }
            console.log('Successfully saved game state to database');
        } catch (error) {
            console.error('Error saving game state to database', error);
        }
    }
    
    moveCharacterToAnotherParty(characterID: string, toPartyID: string) {
        const character = this.getCharacterByID(characterID);
        const toParty = this.partyManager.getPartyByID(toPartyID);
        if (character && toParty) {
            const fromParty = this.partyManager.getPartyByID(character.partyID);
            fromParty.characters = fromParty.characters.filter(char => char !== characterID);
            toParty.addCharacterToParty(character);
        }
    }
}
