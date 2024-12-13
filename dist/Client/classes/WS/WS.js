"use strict";
class WebSocketManager {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.eventListeners = {};
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);
            this.ws.addEventListener('open', () => {
                let userID = localStorage.getItem('isekaiFantasy_userID');
                if (userID) {
                    this.send({ type: 'CONNECT', userID });
                }
                resolve();
            });
            this.ws.addEventListener('message', (event) => {
                const message = JSON.parse(event.data);
                if (this.eventListeners[message.type]) {
                    this.eventListeners[message.type].forEach(callback => callback(message));
                }
            });
            this.ws.addEventListener('error', (error) => {
                console.error('WebSocket error:', error);
                reject(new Error('WebSocket error'));
            });
            this.ws.addEventListener('close', () => {
                console.log('Disconnected from the WS Server');
            });
        });
    }
    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            let userID = localStorage.getItem('isekaiFantasy_userID');
            message.userID = userID;
            this.ws.send(JSON.stringify(message));
        }
        else {
            console.error('WebSocket is not open');
        }
    }
    on(eventType, callback) {
        if (!this.eventListeners[eventType]) {
            this.eventListeners[eventType] = [];
        }
        this.eventListeners[eventType].push(callback);
    }
}
const characterWS = new WebSocketManager(`${server.ws()}/character-ws`);
const battleWS = new WebSocketManager(`${server.ws()}/battle-ws`);
const gameWS = new WebSocketManager(`${server.ws()}/game-ws`);
const characterCreationWS = new WebSocketManager(`${server.ws()}/character-creation-ws`);
battleWS.on('BATTLE_ENDED', (message) => {
    gameModel.battleReports.push(message);
});
