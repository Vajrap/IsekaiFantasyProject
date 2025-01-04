import { env } from "../../env.js";
import { characterHandler } from "./characterHandler.js";
import { battleHandler } from "./battlerHandler.js";
import { gameHandler } from "./gameHandler.js";
import { Result, success, failure } from "../../../Common/Lib/Result.js";
import { WebSocketMessageType } from "../../../Common/RequestResponse/webSocket.js";

export class WebSocketManager {
    ws: WebSocket | null;
    eventListeners: { [key: string]: Function[] };
    heartbeatInterval: NodeJS.Timeout | null;

    constructor() {
        this.ws = null;
        this.eventListeners = {};
        this.heartbeatInterval = null;
    }

    async connect(): Promise<Result<true>> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(env.ws());
    
            this.ws.addEventListener('open', () => {
                console.log('WebSocket connection opened.');
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
    }

    // TODO: Add returning type?
    send(message: { type: string; [key: string]: any }) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open');
        }
    }

    on(type: string, callback: Function) {
        if (!this.eventListeners[type]) {
            this.eventListeners[type] = [];
        }
        this.eventListeners[type].push(callback);
    }

    trigger(type: string, data: any) {
        if (this.eventListeners[type]) {
            this.eventListeners[type].forEach((callback) => callback(data));
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

    handleMessage(message: { type: string; [key: string]: any }) {
        const [category, subType] = message.type.split('_'); // Example: "CHARACTER_CREATE"
        switch (category) {
            case 'PONG':
                break;
            case 'CHARACTER':
                characterHandler.process(subType, message);
                break;
            case 'BATTLE':
                battleHandler.process(subType, message);
                break;
            case 'GAME':
                gameHandler.process(subType, message);
                break;
            case 'PARTY':
                console.log('Party data:', message.data);
                break;
            default:
                console.warn(`Unhandled message type: ${message.type}`);
        }
    }
}