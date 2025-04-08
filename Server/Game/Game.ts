import { db } from "../Database";

import { characterManager } from "./Managers/CharacterManager";
import { partyManager } from "./Managers/PartyManager";
import { locationManager } from "./Managers/LocationManager";
import { travelManager } from "../Entities/Location/TravelManager";
import { webSocketManager } from "./Managers/WebSocketManager";

import { screamer } from "../Utility/Screamer/Screamer";
import { echoChamber } from "./EchoChamber";
import { skillRepository } from "../Entities/Skills/SkillRepository";

import { PartyType } from "../Entities/Party/PartyType";
import { initializeDatabase } from "./DatabaseFunctions";
import { runGameLoop } from "./GameLoop";

export class Game {
    characterManager = characterManager;
    partyManager = partyManager;
    locationManager = locationManager;
    webSocketManager = webSocketManager;
    db = db;
    skillRepository = skillRepository;
    travelManager = travelManager;
    screamer = screamer;
    echoChamber = echoChamber;

    constructor() { }

    public async start() {
        try {
            await initializeDatabase();
            await this.initialize();
            console.log('Game has started successfully.');
        } catch (error) {
            console.error('Error during game initialization:', error);
        }
    } 

    private async initialize() {
        this.startTiming();        
        console.log(`Server is up and running at ${new Date().toLocaleString()}`);
        console.log(`In game characters loaded: ${this.characterManager.characters.length} characters`);
        console.log(`In game parties loaded: ${this.partyManager.parties.length} parties`);
    }

    private startTiming() {
        console.log('Game Time Started');
        // runSchedule();
        // For testing purposes, we can use the following mock method to run the game loop every 10 seconds
        this.mockScheduleNextGameLoop();
        this.testBattleAndListener();
    }

    // MARK: TESTING METHODS
    private mockScheduleNextGameLoop() {
        const now = new Date();
        const secondNow = now.getSeconds();
        let minuteNow = now.getMinutes();
        let nextIntervalSecond = 0;
    
        if (secondNow >= 0 && secondNow < 9) {
            nextIntervalSecond = 10;
        } else if (secondNow >= 10 && secondNow < 19) {
            nextIntervalSecond = 20;
        } else if (secondNow >= 20 && secondNow < 29) {
            nextIntervalSecond = 30;
        } else if (secondNow >= 30 && secondNow < 39) {
            nextIntervalSecond = 40;
        } else if (secondNow >= 40 && secondNow < 49) {
            nextIntervalSecond = 50;
        } else if (secondNow >= 50) {
            nextIntervalSecond = 0;
            minuteNow += 1;
        }
    
        const nextScheduledTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            minuteNow,
            nextIntervalSecond
        );
    
        const timeUntilNextInterval = nextScheduledTime.getTime() - now.getTime();
        console.log(`Next mocked game loop scheduled for ${nextScheduledTime.toLocaleTimeString()}`);
    
        setTimeout(async () => {
            await runGameLoop();
            this.mockScheduleNextGameLoop();
        }, timeUntilNextInterval);
    }

    private testBattleAndListener() {
        this.partyManager.parties[0].behavior.partyType = PartyType.bandit;
        this.partyManager.parties[0].behavior.combatPolicy = 'engage';
        this.partyManager.parties[0].justArrived = true;
        this.partyManager.parties[1].behavior.partyType = PartyType.knight;
        this.partyManager.parties[1].behavior.combatPolicy = 'engage';
        this.partyManager.parties[1].justArrived = true;
        this.locationManager.locations[0].partyMoveIn(this.partyManager.parties[0]);
        this.locationManager.locations[0].partyMoveIn(this.partyManager.parties[1]);
    }
}

export const game = new Game();