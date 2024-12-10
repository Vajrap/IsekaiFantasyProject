// import WebSocket from 'ws';
// import { GameTime } from '../classes/TimeAndDate/GameTime';
// import { SuccessResponse, ErrorResponse } from './ResponseType';

// export type GameMessage = GameTimeUpdateRequest | GameStateResponse | ErrorResponse;

// export type GameTimeUpdateRequest = {
//     type: 'UPDATE_GAME_TIME';
//     currentTime: string;
// };

// type TimeUpdate = {
//     dayPassed: number;
//     gameDateDay: number;
//     gameDateHour: number;
//     gameDateMonth: number;
//     gameDateYear: number;
// };

// export type GameStateResponse = {
//     type: 'GAME_STATE';
//     gameState: any;
// };

// export class GameWebSocketService {
//     wss: WebSocket.Server;

//     constructor(wss: WebSocket.Server) {
//         console.log('trying to create game websocket service')
//         this.wss = wss;

//         this.wss.on('connection', (ws: WebSocket) => {
//             console.log('Client connected');

//             ws.on('message', async (message: Buffer) => {
//                 const data: GameMessage = JSON.parse(message.toString());

//                 switch (data.type) {
//                     case 'UPDATE_GAME_TIME':
//                         this.handleUpdateGameTime(ws, data);
//                         break;

//                     default:
//                         this.handleUnknownMessage(ws);
//                         break;
//                 }
//             });

//             ws.on('close', () => {
//                 console.log('Client disconnected');
//             });

//             ws.on('error', (error) => {
//                 console.error('WebSocket error:', error);
//             });
//         });
//     }

//     private handleUpdateGameTime(ws: WebSocket, data: GameTimeUpdateRequest) {
//         console.log('UPDATE_GAME_TIME message received');
//         try {

//             const response: SuccessResponse = {
//                 type: 'SUCCESS',
//                 message: 'Game time updated',
//             };
//             ws.send(JSON.stringify(response));
//         } catch (error) {
//             const response: ErrorResponse = {
//                 type: 'ERROR',
//                 message: 'Failed to update game time',
//             };
//             ws.send(JSON.stringify(response));
//         }
//     }

//     private handleUnknownMessage(ws: WebSocket) {
//         const unknownMessage: ErrorResponse = {
//             type: 'ERROR',
//             message: 'Unknown message type',
//         };
//         ws.send(JSON.stringify(unknownMessage));
//     }

//     broadcastGameState() {
//         const gameState = {
//             characters: game.characters,
//             players: game.players,
//             parties: game.parties,
//             locations: game.map.locations,
//             gameTime: game.gameTime,
//         };

//         const message: GameStateResponse = {
//             type: 'GAME_STATE',
//             gameState,
//         };

//         this.wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify(message));
//             }
//         });
//     }

//     broadcastGameTime(gameTime: GameTime) {
//         const timeUpdate: TimeUpdate = {
//             dayPassed: gameTime.dayPassed,
//             gameDateDay: gameTime.gameDateDay,
//             gameDateHour: gameTime.gameDateHour,
//             gameDateMonth: gameTime.gameDateMonth,
//             gameDateYear: gameTime.gameDateYear,
//         };

//         const message: GameTimeUpdateRequest = {
//             type: 'UPDATE_GAME_TIME',
//             currentTime: JSON.stringify(timeUpdate),
//         };

//         this.wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify(message));
//             }
//         });
//     }
// }