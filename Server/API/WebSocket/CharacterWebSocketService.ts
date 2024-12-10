// import WebSocket from 'ws';
// import { EventEmitter } from 'events';
// import { db } from '../Database';
// import { ErrorResponse, SuccessResponse } from './ResponseType';

// // Define types for messages
// type Message = GetCharacterRequest | MoveSkillToBattleCardsRequest | MoveBattleCardToSkillsRequest;
// type Response = CharacterResponse | MoveSkillSuccessResponse;

// type GetCharacterRequest = {
//     type: 'GET_CHARACTER';
//     userID: string;
// };

// type CharacterResponse = {
//     type: 'CHARACTER_RESPONSE';
//     character: PlayerCharacter | null;
// };

// type MoveSkillToBattleCardsRequest = {
//     type: 'MOVE_SKILL_TO_BATTLE_CARDS';
//     characterID: string;
//     skillID: string;
// };

// type MoveBattleCardToSkillsRequest = {
//     type: 'MOVE_BATTLE_CARD_TO_SKILLS';
//     characterID: string;
//     skillID: string;
// };

// type MoveSkillSuccessResponse = {
//     type: 'MOVE_SKILL_SUCCESS';
//     character: PlayerCharacter;
// };

// export class CharacterWebSocketService extends EventEmitter {
//     private userSessions: Map<string, CharacterSession> = new Map();
//     private wsConnections: Map<string, WebSocket> = new Map();
//     wss: WebSocket.Server;

//     constructor(wss: WebSocket.Server) {
//         super();
//         this.wss = wss;

//         this.wss.on('connection', (ws: WebSocket, request: any) => {
//             ws.on('message', async (message: Buffer) => {
//                 try {
//                     const parsedMessage = JSON.parse(message.toString()) as Message;
//                     const userID = (parsedMessage as any).userID;

//                     if (!userID) {
//                         ws.send(JSON.stringify({ type: 'ERROR', message: 'User ID not found' }));
//                         return;
//                     }

//                     this.wsConnections.set(userID, ws);

//                     if (!this.userSessions.has(userID)) {
//                         const session = new CharacterSession(this, userID);
//                         this.userSessions.set(userID, session);
//                         session.handleGetCharacter(ws, parsedMessage as GetCharacterRequest);
//                     }

//                     const session = this.userSessions.get(userID);
//                     if (session) {
//                         session.handleMessage(ws, parsedMessage);
//                     } else {
//                         ws.send(JSON.stringify({ type: 'ERROR', message: 'User session not found' }));
//                     }
//                 } catch (error) {
//                     console.error('Error parsing message:', error);
//                     ws.close();
//                 }
//             });

//             ws.on('close', () => {
//                 this.wsConnections.forEach((wsConn, userID) => {
//                     if (wsConn === ws) {
//                         this.userSessions.delete(userID);
//                         this.wsConnections.delete(userID);
//                     }
//                 });
//             });

//             ws.on('error', (error: Error) => {
//                 console.error('WebSocket error:', error.message);
//             });
//         });
//     }

//     public sendUpdate(updateData: Response | ErrorResponse | SuccessResponse, userID: string) {
//         const ws = this.wsConnections.get(userID);
//         if (ws && ws.readyState === WebSocket.OPEN) {
//             ws.send(JSON.stringify(updateData));
//         } else {
//             console.error('Error sending update: WebSocket not open');
//         }
//     }
// }

// class CharacterSession {
//     private service: CharacterWebSocketService;
//     private userID: string;

//     constructor(service: CharacterWebSocketService, userID: string) {
//         this.service = service;
//         this.userID = userID;
//     }

//     handleMessage(ws: WebSocket, data: Message) {
//         switch (data.type) {
//             case 'GET_CHARACTER':
//                 this.handleGetCharacter(ws, data);
//                 break;
//             case 'MOVE_BATTLE_CARD_TO_SKILLS':
//                 this.handleMoveBattleCardToSkills(ws, data);
//                 break;
//             case 'MOVE_SKILL_TO_BATTLE_CARDS':
//                 this.handleMoveSkillToBattleCards(ws, data);
//                 break;
//             default:
//                 this.handleUnknownMessage(ws);
//                 break;
//         }
//     }

//     async handleGetCharacter(ws: WebSocket, data: GetCharacterRequest) {
//         try {
//             const character = game.getPlayerCharacterByUserID(this.userID);
//             console.log(`Got character: ${character?.name}`);
//             console.log(`userID: ${this.userID}`);
//             const response: CharacterResponse = {
//                 type: 'CHARACTER_RESPONSE',
//                 character: character || null,
//             };
//             console.log(`Sending character: ${response}`);
//             this.service.sendUpdate(response, this.userID);
//         } catch (error) {
//             const response: ErrorResponse = {
//                 type: 'ERROR',
//                 message: 'Unknown Error',
//             };
//             this.service.sendUpdate(response, this.userID);
//         }
//     }

//     private async handleMoveBattleCardToSkills(ws: WebSocket, data: MoveBattleCardToSkillsRequest) {
//         try {
//             let actor = game.getPlayerCharacterByCharacterID(data.characterID);
//             if (!actor) {
//                 throw new Error('Character not found');
//             }
//             const skill = actor?.activeSkills.find((skill) => skill.skillID === data.skillID);
//             if (!skill) {
//                 throw new Error('Skill not found');
//             }

//             let res = actor.moveCardToSkills(skill.skillID).response;

//             if (res.type === 'ERROR') {
//                 this.service.sendUpdate(res, this.userID);
//             } else {
//                 await db.writeOver('players', 'characterID', actor.characterID, 'data', JSON.stringify(actor));
//                 this.service.sendUpdate(res, this.userID);
//             }
//         } catch (error) {
//             const response: ErrorResponse = {
//                 type: 'ERROR',
//                 message: 'Unknown Error',
//             };
//             this.service.sendUpdate(response, this.userID);
//         }
//     }

//     private async handleMoveSkillToBattleCards(ws: WebSocket, data: MoveSkillToBattleCardsRequest) {
//         try {
//             let actor = game.getPlayerCharacterByCharacterID(data.characterID);
//             if (!actor) {
//                 throw new Error('Character not found');
//             }
//             const skill = actor?.skills.find((skill) => skill.skillID === data.skillID);
//             if (!skill) {
//                 throw new Error('Skill not found');
//             }

//             let res = actor.moveCardToBattle(skill.skillID).response;

//             await db.writeOver('players', 'characterID', actor.characterID, 'data', JSON.stringify(actor));
//             this.service.sendUpdate(res, this.userID);
//         } catch (error) {
//             const response: ErrorResponse = {
//                 type: 'ERROR',
//                 message: 'Unknown Error',
//             };
//             this.service.sendUpdate(response, this.userID);
//         }
//     }

//     private handleUnknownMessage(ws: WebSocket) {
//         const unknownMessage: ErrorResponse = {
//             type: 'ERROR',
//             message: 'Unknown message type',
//         };
//         this.service.sendUpdate(unknownMessage, this.userID);
//     }
// }