import { popup } from "../../classes/popup/popup.js";
import { CharacterInterface, CharacterSkillInterface, PartyInterface } from "../../../Common/RequestResponse/characterWS.js";
import { WebSocketConnectRequest, WebSocketMessageType } from "../../../Common/RequestResponse/webSocket.js";
import { webSocketManager } from "../../API/WebSocket/WebSocket.js";
import { restAPI } from "../../../Client/API/Rest/RestAPI.js";
import { screamer } from "../../../Client/Screamer/Screamer.js";
import { Result, success } from "../../../Common/Lib/Result.js";
import { K } from "../../../Common/Constant.js";
import { ChangeSkillDeckRequest, ChangeSkillDeckResponse } from "../../../Common/DTOsEnumsInterfaces/Character/ChangeSkillREQRES.js";

export class GameModel {
    party: PartyInterface | null;
    playerCharacterID: string | null;
    user_id: string | null;
    eventManager: EventManager | null;
    webSocketManager = webSocketManager;
    restAPI = restAPI;
    screamer = screamer;

    private constructor() {
        this.party = null;
        this.playerCharacterID = null;
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
        
        await model.updateParty(partydata.data.party);

        return model;
    }

    private async initiate() {
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

    private async updateParty(payload: PartyInterface) {
        if (!payload || !Array.isArray(payload.characters)) {
            console.error('Invalid party payload:', payload);
            throw new Error('Invalid party data received');
        }

        this.party = payload;
    
        if (this.user_id) {
            let userCharacter = payload.characters.find(character => character !== 'none' && character.id === this.user_id);
            if (userCharacter !== undefined && userCharacter !== 'none') {
                //TODO: Proxy image for testing
                userCharacter.portrait = 'test_port';
                this.playerCharacterID = userCharacter.id;
            } else {
                console.error('User Character not found in party data:', payload.characters);
                throw new Error('User Character not found');
            }
        
            this.screamer.scream('GAME_MODEL_UPDATE', null);
        } else {
            throw new Error('User ID not found');
        }
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

        screamerStation.on(K.SKILL_MENU_CLOSE, async (payload: {
            skills: CharacterSkillInterface[],
            activeSkills: CharacterSkillInterface[]
        }) => {
            if (!this.playerCharacterID || this.playerCharacterID === null) {
                throw new Error('Player Character not found');
            }
            const character = this.getPlayerCharacter();
            
            character.skills = payload.skills;
            character.activeSkills = payload.activeSkills;
        })
        
        screamerStation.on(K.SKILL_MENU_UPDATE, async (payload: {
            comingFrom: string,
            updateMessage: {
                skills: CharacterSkillInterface[]
                battleCards: {
                    slot1: CharacterSkillInterface | undefined,
                    slot2: CharacterSkillInterface | undefined,
                    slot3: CharacterSkillInterface | undefined,
                    slot4: CharacterSkillInterface | undefined,
                    slot5: CharacterSkillInterface | undefined,
                    slot6: CharacterSkillInterface | undefined,
                    slot7: CharacterSkillInterface | undefined,
                }
            }
        }) => {
            if (!this.playerCharacterID || this.playerCharacterID === null) {
                throw new Error('Player Character not found');
            }

            const request: ChangeSkillDeckRequest = {
                type: 'CHANGE_SKILL_DECK_REQUEST',
                characterID: this.playerCharacterID,
                skills: payload.updateMessage.skills,
                battleCards: payload.updateMessage.battleCards
            }

            const response = await restAPI.send({
                path: 'changeSkillDeck',
                data: request
            })
            
            if (!response) {
                console.error('Error changing skill deck:');
                return;
            }

            const responseData = response as unknown as ChangeSkillDeckResponse;

            if (responseData.characterID !== this.playerCharacterID) {
                console.error('Character ID mismatch:', responseData.characterID, this.playerCharacterID);
                return;
            }

            const character = this.getPlayerCharacter();
            character.skills = responseData.skills;
            character.activeSkills = [
                responseData.battleCards.slot1,
                responseData.battleCards.slot2,
                responseData.battleCards.slot3,
                responseData.battleCards.slot4,
                responseData.battleCards.slot5,
                responseData.battleCards.slot6,
                responseData.battleCards.slot7
            ].filter((skill): skill is CharacterSkillInterface => skill !== undefined);
            this.screamer.scream('GAME_MODEL_UPDATE', null);
        })
    }

    getPlayerCharacter(): CharacterInterface {
        if (!this.playerCharacterID) {
            throw new Error('Player Character not found');
        }

        const playerCharacter = this.party?.characters.find(character => character !== "none" && character.id === this.playerCharacterID);
        if (playerCharacter === "none" || playerCharacter === undefined) {
            throw new Error('Player Character not found');
        }

        return playerCharacter;
    }

    getCharacter(characterID: string): CharacterInterface {
        if (!this.party) {
            throw new Error('Party data not found');
        }

        const character = this.party.characters.find(character => character !== "none" && character.id === characterID);
        if (character === "none" || character === undefined) {
            throw new Error('Character not found');
        }

        return character;
    }

    getAllCompanionCharacters(): CharacterInterface[] {
        if (!this.party) {
            throw new Error('Party data not found');
        }

        return this.party.characters.filter((character): character is CharacterInterface => character !== "none" && character.id !== this.playerCharacterID);
    }
}