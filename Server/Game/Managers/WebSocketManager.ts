import { WebSocket, WebSocketServer } from "ws";
import {
	WebSocketPartyData,
	WebSocketMessageType,
} from "../../../Common/RequestResponse/webSocket";
import { partyManager, PartyManager } from "./PartyManager";

class WebSocketManager {
	public wss: WebSocketServer;
	public userConnections: Map<string, WebSocket> = new Map();
	private partyManager: PartyManager;

	constructor(partyManager: PartyManager) {
		this.partyManager = partyManager;
		this.wss = new WebSocketServer({ noServer: true }); // Allow external upgrade handling
		this.setupWebSocketServer();	
	}

	private setupWebSocketServer() {
		this.wss.on("connection", (ws: WebSocket) => {
			ws.on("message", (message: string) => {
				this.handleMessage(ws, message);
			});

			ws.on("close", () => {
				for (const [userID, connection] of this.userConnections.entries()) {
					if (connection === ws) {
						this.userConnections.delete(userID);
						console.log(`User connection removed: ${userID}`);
					}
				}
			});
		});
	}

	private handleMessage(ws: WebSocket, message: any) {
		try {
			const parsedMessage = JSON.parse(message.toString());
			this.routeMessage(parsedMessage, ws);
		} catch (error) {
			console.error("Error parsing message:", error);
		}
	}

	private routeMessage(message: any, ws: WebSocket) {
		if (message.type === WebSocketMessageType.CONNECT) {
			this.setUpUserConnection(ws, message.userID);
		}
	}

	private setUpUserConnection(ws: WebSocket, userID: string) {
		this.userConnections.set(userID, ws);
		this.wss.emit("userConnected", { userID, ws });
	}

	private handleUserConnected({
		userID,
		ws,
	}: {
		userID: string;
		ws: WebSocket;
	}) {
		this.userConnections.set(userID, ws);

		const party = this.partyManager.getPartyByID(userID);
		if (party) {
			const partyData = party.intoInterface();
			const message: WebSocketPartyData = {
				type: WebSocketMessageType.PARTY_DATA,
				data: partyData,
			};
			ws.send(JSON.stringify(message));
		}

		ws.on("close", () => {
			this.userConnections.delete(userID);
		});
	}

	public getClient(userID: string): WebSocket | undefined {
        return this.userConnections.get(userID);
    }
}


export const webSocketManager = new WebSocketManager(partyManager);