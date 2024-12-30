import { GameTime } from "./TimeAndDate/GameTime";
import { CharacterManager } from "./CharacterManager";
import { PartyManager } from "./PartyManager";
import { db } from "../Database";
import { LocationManager } from "./LocationManager";
import { BattleManager } from "./Battle/BattleManager";
import { createCharacterTableIfNotExists } from "../Database/Character/Characters";
import { createGameTimeTableIfNotExists } from "../Database/GameTime/GameTime";
import { createGearTableIfNotExists } from "../Database/Item/Gear/createGearTableIfNotExists";
import { createSkillTableIfNotExists } from "../Database/Skill/skill";
import { createUsersTableIfNotExist } from "../Database/User/CreateUsersTableIfNotExist";
import { createPartyTableIfNotExist } from "../Database/Party/Party";
import { Party } from "../Entities/Party/Party";
import { createCharacterFromDB } from "../Entities/Character/createCharacterFromDB";
import { CharacterDB } from "../Database/Character/CharacterDB";

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
                createSkillTableIfNotExists(),
                createGearTableIfNotExists(),
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
        await this.loadCharactersFromDB();
        await this.loadLocationsFromDB();
        await this.loadQuestsFromDB();
        await this.loadDialoguesFromDB();
        await this.loadPartiesFromDB();
        this.gameTime.startTiming();

        console.log(`Server is up and running at ${new Date().toLocaleString()}`);
        console.log(`In game characters loaded: ${this.characterManager.characters.length} characters`);
        console.log(`In game parties loaded: ${this.partyManager.parties.length} parties`);
        
    }

    //MARK: DATABASE METHODS
    private async loadGameTimeFromDB() {
        try {
            // Ensure the GameTime table exists; create it if it doesn't
            await createGameTimeTableIfNotExists();

            // Attempt to read the game time from the database
            const result = await db.read<GameTime>('GameTime', 'id', 1); // Always read the first (and only) row with id=1
    
            if (result) {
                // If the game time exists in the database, initialize GameTime with the stored values
                const { dayPassed, gameDateDay, gameDateHour, gameDateMonth, gameDateYear } = result;
                this.gameTime = new GameTime(dayPassed);
                this.gameTime.gameDateDay = gameDateDay;
                this.gameTime.gameDateHour = gameDateHour;
                this.gameTime.gameDateMonth = gameDateMonth;
                this.gameTime.gameDateYear = gameDateYear;
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
                    {dataKey: 'gameDateDay', value: day},
                    {dataKey: 'gameDateHour', value: hour},
                    {dataKey: 'gameDateMonth', value: month},
                    {dataKey: 'gameDateYear', value: year}
                ]
            );
    
            console.log('Successfully saved game time to the database');
        } catch (error) {
            console.error('Error saving game time to the database:', error);
        }
    }

    //TODO: Implement the following methods
    private async loadCharactersFromDB() {
        try {
            await createCharacterTableIfNotExists();
    
            const characterDBs: CharacterDB[] = await db.readAll('Characters');
    
            for (const characterDB of characterDBs) {
                // Parse the complex data that was stored as JSON strings in the database
                const character = await createCharacterFromDB(characterDB);
                // Add the new character to the character manager
                this.characterManager.addCharacter(character);
            }
        } catch (error) {
            console.error('Error loading NPC from database:', error);
        }
    }

    private async loadItemsFromDB() {
        // Load items from database
        try {
    
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
        try {
            await createPartyTableIfNotExist();

            const parties = await db.readAll('Parties');
    
            for (const party of parties) {
                const partyLeader = this.characterManager.getCharacterByID(party.partyID);
                if (!partyLeader) {
                    console.error(`Party leader with ID ${party.partyID} not found.`);
                    continue;
                }
                const newParty = new Party([partyLeader]);
                if (party.character_1_id != "none" && party.character_1_id != undefined) {
                    const character = this.characterManager.getCharacterByID(party.character_1_id);
                    newParty.characters[0] = character;
                }
                if (party.character_2_id != "none" && party.character_2_id != undefined) {
                    const character = this.characterManager.getCharacterByID(party.character_2_id);
                    newParty.characters[1] = character;
                }
                if (party.character_3_id != "none" && party.character_3_id != undefined) {
                    const character = this.characterManager.getCharacterByID(party.character_3_id);
                    newParty.characters[2] = character;
                }
                if (party.character_4_id != "none" && party.character_4_id != undefined) {
                    const character = this.characterManager.getCharacterByID(party.character_4_id);
                    newParty.characters[3] = character;
                }
                if (party.character_5_id != "none" && party.character_5_id != undefined) {
                    const character = this.characterManager.getCharacterByID(party.character_5_id);
                    newParty.characters[4] = character;
                }
                if (party.character_6_id != "none" && party.character_6_id != undefined) {
                    const character = this.characterManager.getCharacterByID(party.character_6_id);
                    newParty.characters[5] = character;
                }
                newParty.isTraveling = party.isTraveling;
                newParty.actionsList = party.actionsList;
                
                this.partyManager.addParty(newParty);
            }
        } catch (error) {
            console.error('Error loading parties from database:', error);
        }
    }

    //MARK: GAME METHODS
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
