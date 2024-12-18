var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { popup } from "./../../classes/popup/popup.js";
import { WebSocketManager } from "./../../classes/WS/WS.js";
import { success } from "./../../../Common/Lib/Result.js";
export class GameModel {
    constructor() {
        this.playerCharacter = null;
        this.companionCharacters = [];
        // this.battleReports = [];
        this.eventManager = null;
        // this.battleManager = null;
        this.webSocketManager = new WebSocketManager();
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new GameModel();
            yield model.initiate();
            return model;
        });
    }
    initiate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = this.getUserID();
                console.log('User ID:', userID);
                if (!userID.success) {
                    return;
                }
                // Connect WebSocket
                const webSocketConnection = yield this.webSocketManager.connect();
                console.log('WebSocket Connection:', webSocketConnection);
                if (!webSocketConnection.success) {
                    popup.show('อุ๊ปส์! ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้', 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง', [
                        { label: 'ลองอีกครั้ง', action: () => window.location.reload() },
                        { label: 'ออกจากเกม', action: () => window.location.href = '/index.html' }
                    ]);
                    return; // Exit initialization if WebSocket fails
                }
                // Fetch character data
                const characterResult = yield this.fetchCharacterData(userID.data);
                if (!characterResult.success) {
                    popup.show('อุ๊ปส์! ไม่สามารถดึงข้อมูลตัวละครได้', 'เกิดข้อผิดพลาดในการดึงข้อมูลตัวละคร กรุณาลองใหม่อีกครั้ง', [
                        { label: 'ลองอีกครั้ง', action: () => window.location.reload() },
                        { label: 'ออกจากเกม', action: () => window.location.href = '/index.html' }
                    ]);
                    return;
                }
                this.initializeEventManager();
            }
            catch (error) {
                console.error('Initialization failed:', error);
                popup.show('เกิดข้อผิดพลาด', 'การเริ่มต้นระบบล้มเหลว กรุณาลองใหม่', [
                    { label: 'ลองอีกครั้ง', action: () => window.location.reload() },
                    { label: 'ออกจากเกม', action: () => window.location.href = '/index.html' }
                ]);
            }
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
    fetchCharacterData(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.webSocketManager.send({
                    type: 'GET_CHARACTER',
                    userID: userID
                });
                this.webSocketManager.on('CHARACTER_RESPONSE', (message) => {
                    console.log('Character data received:', message);
                    this.playerCharacter = message.character;
                    resolve(success(message.character));
                });
                this.webSocketManager.on('ERROR', (message) => {
                    console.error('Server Error:', message.message);
                    resolve(fail('message.message'));
                });
            });
        });
    }
    initializeEventManager() {
        this.eventManager = new EventManager(this);
    }
}
export const gameModel = GameModel.create();
