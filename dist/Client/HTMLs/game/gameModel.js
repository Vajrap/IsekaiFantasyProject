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
import { K } from "../../../Common/Constant.js";
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
            yield model.updateParty(partydata.data.party);
            return model;
        });
    }
    initiate() {
        return __awaiter(this, void 0, void 0, function* () {
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
    updateParty(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload || !Array.isArray(payload.characters)) {
                console.error('Invalid party payload:', payload);
                throw new Error('Invalid party data received');
            }
            if (this.user_id) {
                let userCharacter = payload.characters.find(character => character !== 'none' && character.id === this.user_id);
                if (userCharacter !== undefined && userCharacter !== 'none') {
                    //TODO: Proxy image for testing
                    userCharacter.portrait = 'test_port';
                    this.playerCharacter = userCharacter;
                }
                else {
                    console.error('User Character not found in party data:', payload.characters);
                    throw new Error('User Character not found');
                }
                this.companionCharacters = payload.characters.filter((character) => character !== 'none' && character.id !== this.user_id);
                this.screamer.scream('GAME_MODEL_UPDATE', null);
            }
            else {
                throw new Error('User ID not found');
            }
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
            screamerStation.on(K.SKILL_MENU_CLOSE, (payload) => __awaiter(this, void 0, void 0, function* () {
                if (!this.playerCharacter || this.playerCharacter === null) {
                    throw new Error('Player Character not found');
                }
                this.playerCharacter.skills = payload.skills;
                this.playerCharacter.activeSkills = payload.activeSkills;
            }));
            screamerStation.on(K.SKILL_MENU_UPDATE, (payload) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!this.playerCharacter || this.playerCharacter === null) {
                    throw new Error('Player Character not found');
                }
                const request = {
                    type: 'CHANGE_SKILL_DECK_REQUEST',
                    characterID: (_a = this.playerCharacter) === null || _a === void 0 ? void 0 : _a.id,
                    skills: payload.updateMessage.skills,
                    battleCards: payload.updateMessage.battleCards
                };
                const response = yield restAPI.send({
                    path: 'changeSkillDeck',
                    data: request
                });
                for (const res in response) {
                    console.log(res);
                }
                if (!response) {
                    console.error('Error changing skill deck:');
                    return;
                }
                const responseData = response;
                if (responseData.characterID !== this.playerCharacter.id) {
                    console.error('Character ID mismatch:', responseData.characterID, this.playerCharacter.id);
                    return;
                }
                this.playerCharacter.skills = responseData.skills;
                this.playerCharacter.activeSkills = [
                    responseData.battleCards.slot1,
                    responseData.battleCards.slot2,
                    responseData.battleCards.slot3,
                    responseData.battleCards.slot4,
                    responseData.battleCards.slot5,
                    responseData.battleCards.slot6,
                    responseData.battleCards.slot7
                ].filter((skill) => skill !== undefined);
                this.screamer.scream('GAME_MODEL_UPDATE', null);
            }));
        });
    }
}
