import { popup } from "Client/classes/popup/popup";
import { WebSocketManager } from "Client/classes/WS/WS";
import { Result, success } from "Common/Lib/Result";
import { CharacterInterface } from "Common/RequestResponse/characterWS";

class GameModel {
    playerCharacter: CharacterInterface | null;
    companionCharacters: CharacterInterface[];
    // battleReports: BattlerReport[];
    eventManager: EventManager | null;
    webSocketManager: WebSocketManager;

    constructor() {
        this.playerCharacter = null;
        this.companionCharacters = [];
        // this.battleReports = [];
        this.eventManager = null;
        // this.battleManager = null;
        this.webSocketManager = new WebSocketManager();

        this.initiate();
    }

    async initiate() {
        try {
            const userID = this.getUserID();
            if (!userID.success) {
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
                return; // Exit initialization if WebSocket fails
            }
            
            // Fetch character data
            const characterResult = await this.fetchCharacterData(userID.data);
            if (!characterResult.success) {
                popup.show(
                    'อุ๊ปส์! ไม่สามารถดึงข้อมูลตัวละครได้',
                    'เกิดข้อผิดพลาดในการดึงข้อมูลตัวละคร กรุณาลองใหม่อีกครั้ง',
                    [
                        { label: 'ลองอีกครั้ง', action: () => window.location.reload() },
                        { label: 'ออกจากเกม', action: () => window.location.href = '/index.html' }
                    ]
                );
                return;
            }

            this.initializeEventManager();
        } catch (error) {
            console.error('Initialization failed:', error);
            popup.show(
                'เกิดข้อผิดพลาด',
                'การเริ่มต้นระบบล้มเหลว กรุณาลองใหม่',
                [
                    { label: 'ลองอีกครั้ง', action: () => window.location.reload() },
                    { label: 'ออกจากเกม', action: () => window.location.href = '/index.html' }
                ]
            );
        }        
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

    async fetchCharacterData(userID: string): Promise<Result<CharacterInterface>> {
        return new Promise((resolve) => {
            this.webSocketManager.send({
                type: 'GET_CHARACTER',
                userID: userID
            });

            this.webSocketManager.on('CHARACTER_RESPONSE', (message: any) => {
                console.log('Character data received:', message);
                this.playerCharacter = message.character;
                resolve(success(message.character));
            });

            this.webSocketManager.on('ERROR', (message: any) => {
                console.error('Server Error:', message.message);
                resolve(fail('message.message'));
            });
        });
    }

    initializeEventManager() {
        this.eventManager = new EventManager(this);
    }
}

const gameModel = new GameModel();

