// import { popup } from "../../classes/popup/popup.js";
import { popup } from "../../classes/popup/popup.js";
import { WebSocketManager } from "../../classes/WebSocket/WebSocket.js";
// import { Result, success } from "../../../Common/Lib/Result.js";
import { CharacterInterface } from "../../../Common/RequestResponse/characterWS.js";
import { WebSocketConnectRequest, WebSocketMessageType } from "../../../Common/RequestResponse/webSocket.js";
import { Result, success } from "../../../Common/Lib/Result.js";

export class GameModel {
    playerCharacter: CharacterInterface | null;
    companionCharacters: CharacterInterface[];
    // battleReports: BattlerReport[];
    eventManager: EventManager | null;
    webSocketManager: WebSocketManager = new WebSocketManager();

    private constructor() {
        this.playerCharacter = null;
        this.companionCharacters = [];
        // this.battleReports = [];
        this.eventManager = null;
        // this.battleManager = null;
    }

    static async create(): Promise<GameModel> {
        const model = new GameModel();
        await model.initiate();
        return model;
    }

    async initiate() {
        console.log(`GameModel initiated`);

        const userID = this.getUserID();
        if (!userID.success) { 
            popup.show(
                'อุ๊ปส์ เกิดปัญหาบางอย่าง',
                'ไม่พบ User ID ในระบบ กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง',
                [
                    { label: 'ลองอีกครั้ง', action: () => window.location.href = '/index.html' },
                ]
            )
            return; 
        }
       
        // Connect WebSocket
        const webSocketConnection = await this.webSocketManager.connect();

        if (!webSocketConnection.success) {
            popup.show(
                'อุ๊ปส์! ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
                'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง',
                [
                    { label: 'ลองอีกครั้ง', action: () => window.location.reload() },
                    { label: 'ออกจากเกม', action: () => window.location.href = '/index.html' }
                ]
            );
            return;
        } else {
            const connectMessage: WebSocketConnectRequest = {
                type: WebSocketMessageType.CONNECT,
                userID: userID.data
            };
            this.webSocketManager.send(connectMessage);
        };
    }

    getUserID(): Result<string> {
        const userID = localStorage.getItem('isekaiFantasy_userID');
        if (!userID || userID === '' || userID === 'undefined' || userID === null) {
            popup.show(
                'อุ๊ปส์ เกิดปัญหาบางอย่าง',
                'ไม่พบ User ID ในระบบ กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง',
                [
                    { label: 'ลองอีกครั้ง', action: () => window.location.href = '/index.html' },
                ]
                
            )
            return fail('User ID not found');
        }
        return success(userID);
    }
}

export const gameModel = GameModel.create();