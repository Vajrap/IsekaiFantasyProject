import { GameTime } from "./TimeAndDate/GameTime";
import { locationManager } from "./Managers/LocationManager";
import { travelManager } from "../Entities/Location/TravelManager";
import { DayOfWeek, TimeOfDay } from "../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { webSocketManager } from "../API/WebSocket/WebSocketServer";
import { partyManager } from "./Managers/PartyManager";

export async function runSchedule() {
    runGameLoop();

    const now = new Date();
    const minuteNow = now.getMinutes();
    const hourNow = now.getHours();

    let nextQuarterMinute = 0;
    let nextQuarterHour = hourNow;

    if (minuteNow >= 0 && minuteNow < 14) { nextQuarterMinute = 15};
    if (minuteNow >= 15 && minuteNow < 29) { nextQuarterMinute = 30};
    if (minuteNow >= 30 && minuteNow < 44) { nextQuarterMinute = 45};
    if (minuteNow >= 45) {
        nextQuarterMinute = 0;
        nextQuarterHour += 1
        if (nextQuarterHour >= 24) { nextQuarterHour = 0 }
    }

    const nextScheduledTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        nextQuarterHour,
        nextQuarterMinute,
        0
    );

    let timeUntilNextQuarter = nextScheduledTime.getTime() - now.getTime();
    
    if (timeUntilNextQuarter < 5000) {
        console.warn(`⚠️ Next execution time is too close (${timeUntilNextQuarter}ms). Adding buffer...`);
        timeUntilNextQuarter = 5000;
    }

    setTimeout(async () => {
        await runSchedule();
    }
    , timeUntilNextQuarter);
}

export async function runGameLoop() {
    try {
        incrementGameTime();
        handleGameMilestones();
        await processEvents(
            GameTime.getCurrentGameDayOfWeek(), 
            GameTime.getCurrentGamePhase()
        );
        webSocketManager.userConnections.forEach((ws, userID) => {
            if (ws.readyState !== ws.OPEN) return;
            const clientParty = partyManager.getPartyByID(userID);
            if (clientParty) {
                const partyData = clientParty.intoInterface();
                const message = {
                    type: 'PARTY_DATA',
                    data: partyData
                };
                ws.send(JSON.stringify(message));
            }
        })
        // TODO: If we have anything to send,
        console.log("Game loop executed successfully.");
    } catch (error) {
        console.error('Error during game loop:', error);
    }
}

function incrementGameTime() {
    GameTime.gameDateHour += 1;
    if (GameTime.gameDateHour > GameTime.inGameHoursPerDay) {
        GameTime.dayPassed += 1;
        GameTime.gameDateHour = 1;
        GameTime.gameDateDay += 1;
    }
}

function handleGameMilestones() {
    const { gameDateHour, gameDateDay, gameDateMonth } = GameTime;

    // Handle hourly milestones
    switch (gameDateHour) {
        case 1: console.log("GamePhase: Morning"); break;
        case 2: console.log("GamePhase: Afternoon"); break;
        case 3: console.log("GamePhase: Evening"); break;
        case 4: console.log("GamePhase: Night"); break;
    }

    // Handle daily, weekly, monthly, and yearly milestones
    if (gameDateHour === 1) console.log(`Start of a new day: ${gameDateDay}/${gameDateMonth}`);
    if (gameDateDay === 1 && 
        gameDateHour === 1
    ) console.log("Start of a new week");
    if (gameDateDay === 7 && 
        gameDateHour === GameTime.inGameHoursPerDay
    ) console.log("End of the week");
    if (gameDateDay === GameTime.inGameDaysPerMonth && 
        gameDateDay === GameTime.inGameDaysPerMonth && 
        gameDateHour === GameTime.inGameHoursPerDay
    ) console.log("End of the month");
    if (gameDateMonth === 1 &&
        gameDateDay === 1 &&
        gameDateHour === 1
    ) console.log("Start of the new year");
}

async function processEvents(day: DayOfWeek, phase:TimeOfDay) {
    console.log(`Processing encounters for ${day} ${phase}`);
    await locationManager.processEncounters(day, phase);
    await locationManager.processActions(day, phase);
    await travelManager.allTravel(day, phase);
}
