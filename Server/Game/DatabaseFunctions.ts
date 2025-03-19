import { db } from "../Database";
import { GameTimeInterface } from "../../Common/DTOsEnumsInterfaces/GameTimeInterface";
import { createCharacterTableIfNotExists } from "../Database/Character/Characters";
import { createUsersTableIfNotExist } from "../Database/User/CreateUsersTableIfNotExist";
import { createGameTimeTableIfNotExists } from "../Database/GameTime/GameTime";
import { createSkillTableIfNotExists } from "../Database/Skill/skill";
import { createGearTableIfNotExists } from "../Database/Item/Gear/createGearTableIfNotExists";
import { createPartyTableIfNotExist } from "../Database/Party/Party";
import { skillRepository } from "../Entities/Skills/SkillRepository";
import { CharacterDB } from "../Database/Character/CharacterDB";
import { createCharacterFromDB } from "../Entities/Character/createCharacterFromDB";
import { Character } from "../Entities/Character/Character";
import { Party } from "../Entities/Party/Party";
import { characterManager } from "./Managers/CharacterManager";
import { partyManager } from "./Managers/PartyManager";
import { GameTime } from "./TimeAndDate/GameTime";

export async function initializeDatabase() {
	try {
		console.log("Initializing database...");
		await Promise.all([
			createCharacterTableIfNotExists(),
			createUsersTableIfNotExist(),
			createGameTimeTableIfNotExists(),
			createSkillTableIfNotExists(),
			createGearTableIfNotExists(),
			createPartyTableIfNotExist(),
		]);
		console.log(`All Database operation completed successfully.`);
		await skillRepository.loadSkillsFromDB();
		
        await loadGameStateFromDB();
        
	} catch (error) {
		console.error("Error initializing database:", error);
		throw error;
	}
}

export async function saveGameStateToDB(): Promise<void> {
    try {
        console.log("Saving game state to database...");
        await Promise.all([
            saveGameTimeToDB(),
            saveItemsToDB(),
            saveCharactersToDB(),
            saveLocationsToDB(),
            saveQuestsToDB(),
            saveDialoguesToDB(),
            savePartiesToDB(),
            saveSkillsToDB(),
        ]);
        console.log("Successfully saved game state to database");
    } catch (error) {
        console.error("Error saving game state to database", error);
    }
}

async function loadGameStateFromDB() {
    try {
        // Load game state from database
        await loadGameTimeFromDB();
        await loadItemsFromDB();
        await loadCharactersFromDB();
        await loadLocationsFromDB();
        await loadQuestsFromDB();
        await loadDialoguesFromDB();
        await loadPartiesFromDB();
        await loadSkillsFromDB();
    } catch (error) {
        console.error("Error loading game state from database:", error);
    }
}

// =======================
// Game Time Functions
// =======================
async function loadGameTimeFromDB() {
	try {
		await createGameTimeTableIfNotExists();
		const result = await db.read<GameTimeInterface>("GameTime", "id", 1);
		if (result) {
			const {
				dayPassed,
				gameDateDay,
				gameDateHour,
				gameDateMonth,
				gameDateYear,
			} = result;
			GameTime.setGameTime(
				dayPassed,
				gameDateDay,
				gameDateHour,
				gameDateMonth,
				gameDateYear
			);
		} else {
			GameTime.setGameTime(1, 1, 1, 1, 0);
			await saveGameTimeToDB();
		}
	} catch (error) {
		console.error("Error loading game time from database:", error);
	}
}

async function saveGameTimeToDB() {
	try {
		const {
			dayPassed,
			gameDateDay,
			gameDateHour,
			gameDateMonth,
			gameDateYear,
		} = GameTime.getCurrentGameDate();
		await db.writeOver(
			{
				tableName: "GameTime",
				primaryKeyColumnName: "id",
				primaryKeyValue: "1",
			},
			[
				{ dataKey: "dayPassed", value: dayPassed },
				{ dataKey: "gameDateDay", value: gameDateDay },
				{ dataKey: "gameDateHour", value: gameDateHour },
				{ dataKey: "gameDateMonth", value: gameDateMonth },
				{ dataKey: "gameDateYear", value: gameDateYear },
			]
		);
		console.log("Successfully saved game time to the database");
	} catch (error) {
		console.error("Error saving game time to the database:", error);
	}
}

// =======================
// Character Functions
// =======================
async function loadCharactersFromDB() {
	try {
		await createCharacterTableIfNotExists();

		const characterDBs: CharacterDB[] = await db.readAll("Characters");

		for (const characterDB of characterDBs) {
			// Parse the complex data that was stored as JSON strings in the database
			const character = await createCharacterFromDB(characterDB);
			// Add the new character to the character manager
			characterManager.addCharacter(character);
		}
	} catch (error) {
		console.error("Error loading NPC from database:", error);
	}
}

async function saveCharactersToDB() {
	try {
		// Save characters from character manager to database?
	} catch (error) {
		console.error("Error saving NPC to database:", error);
	}
}

// =======================
// Item Functions
// =======================
async function loadItemsFromDB() {
	try {
		// Load Item from database and put into ItemRepository?
	} catch (error) {
		console.error("Error loading items from database:", error);
	}
}

async function saveItemsToDB() {
	try {
		// Save Item from ItemRepository to database?
	} catch (error) {
		console.error("Error saving items to database:", error);
	}
}

// =======================
// Location Functions
// =======================
async function loadLocationsFromDB() {
	try {
		// Load locations from database and put into LocationManager?
	} catch (error) {
		console.error("Error loading locations from database:", error);
	}
}

async function saveLocationsToDB() {
	try {
		// Save locations from LocationManager to database?
	} catch (error) {
		console.error("Error saving locations to database:", error);
	}
}

// =======================
// Quest Functions
// =======================
async function loadQuestsFromDB() {
	try {
		// Load quests from database and put into QuestManager?
	} catch (error) {
		console.error("Error loading quests from database:", error);
	}
}

async function saveQuestsToDB() {
	try {
		// Save quests from QuestManager to database?
	} catch (error) {
		console.error("Error saving quests to database:", error);
	}
}

// =======================
// Dialogue Functions
// =======================
async function loadDialoguesFromDB() {
	try {
		// Load dialogues from database and put into DialogueManager?
	} catch (error) {
		console.error("Error loading dialogues from database:", error);
	}
}

async function saveDialoguesToDB() {
	try {
		// Save dialogues from DialogueManager to database?
	} catch (error) {
		console.error("Error saving dialogues to database:", error);
	}
}

// =======================
// Party Functions
// =======================
async function loadPartiesFromDB() {
	// Load parties from database
	try {
		await createPartyTableIfNotExist();

		const parties = await db.readAll("Parties");

		for (const party of parties) {
			const partyLeader: Character = characterManager.getCharacterByID(
				party.partyID
			);
			if (!partyLeader) {
				console.error(`Party leader with ID ${party.partyID} not found.`);
				continue;
			}
			const newParty = new Party([partyLeader]);
			if (party.character_1_id != "none" && party.character_1_id != undefined) {
				const character = characterManager.getCharacterByID(
					party.character_1_id
				);
				newParty.characters[0] = character;
			}
			if (party.character_2_id != "none" && party.character_2_id != undefined) {
				const character = characterManager.getCharacterByID(
					party.character_2_id
				);
				newParty.characters[1] = character;
			}
			if (party.character_3_id != "none" && party.character_3_id != undefined) {
				const character = characterManager.getCharacterByID(
					party.character_3_id
				);
				newParty.characters[2] = character;
			}
			if (party.character_4_id != "none" && party.character_4_id != undefined) {
				const character = characterManager.getCharacterByID(
					party.character_4_id
				);
				newParty.characters[3] = character;
			}
			if (party.character_5_id != "none" && party.character_5_id != undefined) {
				const character = characterManager.getCharacterByID(
					party.character_5_id
				);
				newParty.characters[4] = character;
			}
			if (party.character_6_id != "none" && party.character_6_id != undefined) {
				const character = characterManager.getCharacterByID(
					party.character_6_id
				);
				newParty.characters[5] = character;
			}
			newParty.isTraveling = party.isTraveling;
			newParty.actionSequence = party.actionSequence;

			partyManager.addParty(newParty);
		}
	} catch (error) {
		console.error("Error loading parties from database:", error);
	}
}

async function savePartiesToDB() {
    // Save parties to database
    try {
        // Save parties from PartyManager to database?
    } catch (error) {
        console.error("Error saving parties to database:", error);
    }
}

// =======================
// Skill Functions
// =======================
async function loadSkillsFromDB() {
    try {
        // Load skills from database and put into SkillRepository?
    } catch (error) {
        console.error("Error loading skills from database:", error);
    }
}

async function saveSkillsToDB() {
    try {
        // Save skills from SkillRepository to database?
    } catch (error) {
        console.error("Error saving skills to database:", error);
    }
}
