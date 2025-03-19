import { EventEmitter } from "events";
import { GameTime } from "./TimeAndDate/GameTime";
import { characterManager } from "./Managers/CharacterManager";
import { partyManager } from "./Managers/PartyManager";
import { locationManager } from "./Managers/LocationManager";
import { battleManager } from "./Battle/BattleManager";
import { travelManager } from "../Entities/Location/TravelManager";
import { screamer } from "../Utility/Screamer/Screamer";
import { BattlePayload } from "./GameEvent/enums/battlePayload";
import { REST_EVENT, RestEventEnum, RestEventPayload } from "../../Common/DTOsEnumsInterfaces/Events/RestEvents";
import { webSocketManager } from "./Managers/WebSocketManager";

export class EchoChamber {
	constructor() {
		const screamerStation = screamer.listenToMe();

		screamerStation.on("EVENT_BATTLE", (payload: BattlePayload) => {
			try {
				battleManager.startNewBattle(
					payload.partyA,
					payload.partyB,
					payload.location,
					GameTime.getCurrentGameDate()
				);
			} catch (error) {
				console.error("Error starting battle:", error);
			}
		});

		screamerStation.on(REST_EVENT, (payload: RestEventPayload) => {
			const client = webSocketManager.getClient(payload.party.partyID);
			if (client && client.readyState === WebSocket.OPEN) {
				client.send(
					JSON.stringify({
						type: RestEventEnum.REST,
						data: payload,
					})
				);
			}
		});
	}
}

export const echoChamber = new EchoChamber();
