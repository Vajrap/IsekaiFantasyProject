var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { env } from "../../env.js";
import { success, failure } from "../../../Common/Lib/Result.js";
import { WebSocketMessageType } from "../../../Common/RequestResponse/webSocket.js";
import { screamer } from "../../../Client/Screamer/Screamer.js";
class WebSocketManager {
    constructor() {
        this.screamer = screamer;
        this.ws = null;
        this.heartbeatInterval = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.ws = new WebSocket(env.ws());
                this.ws.addEventListener('open', () => {
                    this.startHeartbeat();
                    resolve(success(true));
                });
                this.ws.addEventListener('message', (event) => {
                    const message = JSON.parse(event.data);
                    this.handleMessage(message);
                });
                this.ws.addEventListener('error', (error) => {
                    console.error('WebSocket error:', error);
                    this.stopHeartbeat();
                    reject(failure('WS_ERROR', 'WebSocket encountered an error.'));
                });
                this.ws.addEventListener('close', () => {
                    console.warn('WebSocket connection closed.');
                    this.stopHeartbeat();
                    reject(failure('WS_CLOSED', 'WebSocket connection was closed.'));
                });
            });
        });
    }
    // TODO: Add returning type?
    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
        else {
            console.error('WebSocket is not open');
        }
    }
    startHeartbeat(interval = 30000) {
        this.stopHeartbeat();
        this.heartbeatInterval = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                const message = { type: WebSocketMessageType.PING };
                this.send(message);
            }
        }, interval);
    }
    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }
    handleMessage(message) {
        const [category, subType] = message.type.split('_'); // Example: "CHARACTER_CREATE"
        switch (category) {
            case 'PONG':
                break;
            case 'PARTY':
                screamer.scream('PARTY_DATA', message.data);
                break;
            default:
                console.warn(`Unhandled message type: ${message.type}`);
        }
    }
}
export const webSocketManager = new WebSocketManager();
