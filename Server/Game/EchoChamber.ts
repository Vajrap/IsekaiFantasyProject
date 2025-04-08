import { GameTime } from "./TimeAndDate/GameTime";
import { screamer } from "../Utility/Screamer/Screamer";
import { BattlePayload } from "./GameEvent/enums/battlePayload";
import { REST_EVENT, RestEventEnum, RestEventPayload } from "../../Common/DTOsEnumsInterfaces/Events/RestEvents";
import { webSocketManager } from "./Managers/WebSocketManager";
import { EVENT_BATTLE } from "./GameEvent/battleEvent";
import { Battle, END_BATTLE } from "./Battle/Battle";

export class EchoChamber {
	constructor() {
		const screamerStation = screamer.listenToMe();

		screamerStation.on(EVENT_BATTLE, (payload: BattlePayload) => handleBattleStart(payload));
		screamerStation.on(END_BATTLE, (payload: BattlePayload) => handleBattleEnd(payload));
		screamerStation.on(REST_EVENT, (payload: RestEventPayload) => handleRestEvent(payload));
	}
}

export const echoChamber = new EchoChamber();

function handleBattleStart(payload: BattlePayload) {
	const battle = new Battle(
		payload.partyA,
		payload.partyB,
		payload.location,
		GameTime.getCurrentGameDate(),
		payload.battleType
	);
	battle.startBattle();
}

function handleBattleEnd(payload: BattlePayload) {
	sendToClient(payload.partyA.partyID, END_BATTLE, payload);
	sendToClient(payload.partyB.partyID, END_BATTLE, payload);
}

function handleRestEvent(payload: RestEventPayload) {
	sendToClient(payload.party.partyID, RestEventEnum.REST, payload);
}

function sendToClient(partyID: string, eventType: string, payload: any) {
	const client = webSocketManager.getClient(partyID);
	if (client && client.readyState === WebSocket.OPEN) {
		client.send(
			JSON.stringify({
				type: eventType,
				data: payload,
			})
		);
	}
}
