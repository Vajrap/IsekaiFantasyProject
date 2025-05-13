import { db } from "../Database";
import { characterManager } from "./Managers/CharacterManager";
import { partyManager } from "./Managers/PartyManager";
import { locationManager } from "./Managers/LocationManager";
import { travelManager } from "../Entities/Location/TravelManager";
import { webSocketManager } from "./Managers/WebSocketManager";
import { screamer } from "../Utility/Screamer/Screamer";
import { echoChamber } from "./EchoChamber";
import { skillRepository } from "../Entities/Skills/SkillRepository";
import { initializeDatabase, saveGameStateToDB } from "./DatabaseFunctions";
import { runSchedule } from "./GameLoop";

export class Game {
  db = db;
  characterManager = characterManager;
  partyManager = partyManager;
  locationManager = locationManager;
  webSocketManager = webSocketManager;
  skillRepository = skillRepository;
  travelManager = travelManager;
  screamer = screamer;
  echoChamber = echoChamber;
  isTestMode: boolean = false;

  constructor() {}

  public async start() {
    try {
      await initializeDatabase();
      await this.initialize();
      console.log("Game has started successfully.");
    } catch (error) {
      console.error("Error during game initialization:", error);
    }
  }

  private async initialize() {
    this.startTiming();
    console.log(`Server is up and running at ${new Date().toLocaleString()}`);
    console.log(
      `In game characters loaded: ${this.characterManager.characters.length} characters`,
    );
    console.log(
      `In game parties loaded: ${this.partyManager.parties.length} parties`,
    );
  }

  private startTiming() {
    console.log("Game Time Started");
    runSchedule();
  }

  public async save() {
    await saveGameStateToDB();
  }
}

export const game = new Game();
