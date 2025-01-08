var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { popup } from "../../classes/popup/popup.js";
import { WebSocketMessageType } from "../../../Common/RequestResponse/webSocket.js";
import { webSocketManager } from "../../API/WebSocket/WebSocket.js";
import { restAPI } from "../../../Client/API/Rest/RestAPI.js";
import { screamer } from "../../../Client/Screamer/Screamer.js";
import { success } from "../../../Common/Lib/Result.js";
export class GameModel {
    constructor() {
        this.webSocketManager = webSocketManager;
        this.restAPI = restAPI;
        this.screamer = screamer;
        this.playerCharacter = null;
        this.companionCharacters = [];
        this.eventManager = null;
        this.user_id = null;
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new GameModel();
            model.user_id = localStorage.getItem('isekaiFantasy_userID');
            if (!model.user_id) {
                throw new Error('User ID not found');
            }
            yield model.initiate();
            yield model.initializeEventListeners();
            const partydata = yield model.restAPI.send({
                path: 'getParty',
                data: { user_id: model.user_id }
            });
            if (!partydata.success) {
                throw new Error('Party data not found');
            }
            yield model.updateParty(partydata.data.result.party);
            return model;
        });
    }
    initiate() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`GameModel initiated`);
            const userID = this.getUserID();
            if (!userID.success) {
                popup.show('อุ๊ปส์ เกิดปัญหาบางอย่าง', 'ไม่พบ User ID ในระบบ กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง', [
                    { label: 'ลองอีกครั้ง', action: () => window.location.href = '/index.html' },
                ]);
                return;
            }
            // Connect WebSocket
            const webSocketConnection = yield this.webSocketManager.connect();
            if (!webSocketConnection.success) {
                popup.show('อุ๊ปส์! ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้', 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง', [
                    { label: 'ลองอีกครั้ง', action: () => window.location.reload() },
                    { label: 'ออกจากเกม', action: () => window.location.href = '/index.html' }
                ]);
                return;
            }
            else {
                const connectMessage = {
                    type: WebSocketMessageType.CONNECT,
                    userID: userID.data
                };
                this.webSocketManager.send(connectMessage);
            }
            ;
        });
    }
    initializeEventListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            const screamerStation = this.screamer.listenToMe();
            screamerStation.on('PARTY_DATA', (payload) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.updateParty(payload);
                }
                catch (error) {
                    console.error('Error updating party:', error);
                }
            }));
        });
    }
    getUserID() {
        const userID = localStorage.getItem('isekaiFantasy_userID');
        if (!userID || userID === '' || userID === 'undefined' || userID === null) {
            popup.show('อุ๊ปส์ เกิดปัญหาบางอย่าง', 'ไม่พบ User ID ในระบบ กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง', [
                { label: 'ลองอีกครั้ง', action: () => window.location.href = '/index.html' },
            ]);
            return fail('User ID not found');
        }
        return success(userID);
    }
    // Listeners
    updateParty(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.user_id) {
                let userCharacter = payload.characters.find(character => character != 'none' && character.id === this.user_id);
                if (userCharacter !== undefined && userCharacter !== "none") {
                    this.playerCharacter = userCharacter;
                }
                else {
                    throw new Error('User Character not found');
                }
                this.companionCharacters = payload.characters.filter(character => character !== 'none' && character.id !== this.user_id && character == null);
                console.log(`Is going to scream GAME_MODEL_UPDATE`);
                screamer.scream('GAME_MODEL_UPDATE', this);
            }
            else {
                throw new Error('User ID not found');
            }
        });
    }
}
