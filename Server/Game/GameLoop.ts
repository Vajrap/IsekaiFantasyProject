import { GameTime } from "./TimeAndDate/GameTime";
import { locationManager } from "./Managers/LocationManager";
import { travelManager } from "../Entities/Location/TravelManager";
import {
  DayOfWeek,
  TimeOfDay,
} from "../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { webSocketManager } from "./Managers/WebSocketManager";
import { partyManager } from "./Managers/PartyManager";
import { config } from "dotenv";

export async function runSchedule() {
  config();

  const isTestMode = process.env.TEST_MODE === "true";

  const now = new Date();
  let nextScheduledTime: Date;

  if (isTestMode) {
    nextScheduledTime = new Date(now.getTime() + 10_000);
  } else {
    const next = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() + (15 - (now.getMinutes() % 15)),
      0,
      0,
    );
    nextScheduledTime = next;
  }

  const delay = nextScheduledTime.getTime() - now.getTime();
  console.log(
    `Next game loop scheduled for ${nextScheduledTime.toLocaleTimeString()}`,
  );

  setTimeout(async () => {
    await runGameLoop();
    runSchedule();
  }, delay);
}

export async function runGameLoop() {
  try {
    incrementGameTime();
    handleGameMilestones();
    await processEvents(
      GameTime.getCurrentGameDayOfWeek(),
      GameTime.getCurrentGamePhase(),
    );
    webSocketManager.userConnections.forEach((ws, userID) => {
      if (ws.readyState !== ws.OPEN) return;
      const clientParty = partyManager.getPartyByID(userID);
      if (clientParty) {
        const partyData = clientParty.intoInterface();
        const message = {
          type: "PARTY_DATA",
          data: partyData,
        };
        ws.send(JSON.stringify(message));
      }
    });
    console.log("Game loop executed successfully.");
  } catch (error) {
    console.error("Error during game loop:", error);
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

  switch (gameDateHour) {
    case 1:
      console.log("GamePhase: Morning");
      break;
    case 2:
      console.log("GamePhase: Afternoon");
      break;
    case 3:
      console.log("GamePhase: Evening");
      break;
    case 4:
      console.log("GamePhase: Night");
      break;
  }

  if (gameDateHour === 1)
    console.log(`Start of a new day: ${gameDateDay}/${gameDateMonth}`);
  if (gameDateDay === 1 && gameDateHour === 1)
    console.log("Start of a new week");
  if (gameDateDay === 7 && gameDateHour === GameTime.inGameHoursPerDay)
    console.log("End of the week");
  if (
    gameDateDay === GameTime.inGameDaysPerMonth &&
    gameDateDay === GameTime.inGameDaysPerMonth &&
    gameDateHour === GameTime.inGameHoursPerDay
  )
    console.log("End of the month");
  if (gameDateMonth === 1 && gameDateDay === 1 && gameDateHour === 1)
    console.log("Start of the new year");
}

async function processEvents(day: DayOfWeek, phase: TimeOfDay) {
  await locationManager.processEncounters(day, phase);
  await locationManager.processActions(day, phase);
  await travelManager.allTravel(day, phase);
}
