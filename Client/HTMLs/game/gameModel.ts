import { popup } from "../../classes/popup/popup.js";
import { CharacterInterface, PartyInterface } from "../../../Common/RequestResponse/characterWS.js";
import { WebSocketConnectRequest, WebSocketMessageType } from "../../../Common/RequestResponse/webSocket.js";
import { webSocketManager } from "../../API/WebSocket/WebSocket.js";
import { restAPI } from "../../../Client/API/Rest/RestAPI.js";
import { screamer } from "../../../Client/Screamer/Screamer.js";
import { Result, success } from "../../../Common/Lib/Result.js";

export class GameModel {
    playerCharacter: CharacterInterface | null;
    companionCharacters: CharacterInterface[];
    user_id: string | null;
    eventManager: EventManager | null;
    webSocketManager = webSocketManager;
    restAPI = restAPI;
    screamer = screamer;

    private constructor() {
        this.playerCharacter = null;
        this.companionCharacters = [];
        this.eventManager = null;
        this.user_id = null;
    }

    static async create(): Promise<GameModel> {
        const model = new GameModel();
        model.user_id = localStorage.getItem('isekaiFantasy_userID');
        if (!model.user_id) {
            throw new Error('User ID not found');
        }
        await model.initiate();
        await model.initializeEventListeners();

        const partydata = await model.restAPI.send({
            path: 'getParty',
            data: { user_id: model.user_id }
        });
        
        if (!partydata.success) {
            throw new Error('Party data not found');
        }

        await model.updateParty(partydata.data.result.party);

        return model;
    }

    private async initiate() {
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

    private async initializeEventListeners() {
        const screamerStation = this.screamer.listenToMe();

        screamerStation.on('PARTY_DATA', async (payload: PartyInterface) => {
            try {
                await this.updateParty(payload);
            } catch (error) {
                console.error('Error updating party:', error);
            }
        })
    } 

    private getUserID(): Result<string> {
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

    // Listeners
    private async updateParty(payload:PartyInterface) {
        if (this.user_id) {
            let userCharacter = payload.characters.find(character => character != 'none' && character.id === this.user_id);
            if (userCharacter !== undefined && userCharacter !== "none") {
                this.playerCharacter = userCharacter;
            } else {
                throw new Error('User Character not found');
            }
            this.companionCharacters = payload.characters.filter(
                character => character !== 'none' && character.id !== this.user_id && character == null
            );
            console.log(`Is going to scream GAME_MODEL_UPDATE`);
            screamer.scream('GAME_MODEL_UPDATE', this);
        } else {
            throw new Error('User ID not found');
        }
    }
}