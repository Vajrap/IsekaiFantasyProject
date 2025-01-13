import { WebSocketServer, WebSocket, EventEmitter } from "ws";
import { WebSocketConnectRequest, WebSocketMessageType } from "../../../Common/RequestResponse/webSocket";
import { PartyInterface } from "../../../Common/RequestResponse/characterWS";

export const wss = new WebSocketServer({ port: 8080 });
export const webSocketEvents = new EventEmitter();

const userConnections = new Map<string, WebSocket>();

// We need no Routing for WS because the sole purpose of our WS is to broadcast game state, all inboud messages will use REST API.

wss.on('connection', (ws) => {
    console.log('A client connected.');

    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            handleWebsocketMessage(parsedMessage, ws);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    // Handle connection close
    ws.on('close', () => {
        console.log('Client disconnected.');
        userConnections.forEach((connection, userID) => {
            if (connection === ws) {
                userConnections.delete(userID);
                console.log(`User connection removed: ${userID}`);
            }
        });
    });
});

export function broadcast(message: string) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Routing for WebSocket messages
function handleWebsocketMessage(message: any, ws: WebSocket) {
    switch (message.type) {
        case WebSocketMessageType.CONNECT:
            setUpUserConnection(ws, message);
            break;
        case WebSocketMessageType.PING:
            sendPong(ws);
            break;
        default:
            console.log('Unknown message type:', message.type);
    }
}

function setUpUserConnection(ws: WebSocket, message: WebSocketConnectRequest) {
    userConnections.set(message.userID, ws);
    webSocketEvents.emit("userConnected", { userID: message.userID, ws });
}

function sendInitialConnectedGameDate(ws: WebSocket, message: PartyInterface) {
    
}

function sendPong(ws: WebSocket) {
    const message = { type: WebSocketMessageType.PONG };
    ws.send(JSON.stringify(message));
}