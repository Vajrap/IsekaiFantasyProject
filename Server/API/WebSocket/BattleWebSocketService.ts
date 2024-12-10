// import WebSocket from 'ws';
// import { Battle } from '../classes/Battle/Battle';
// import { Party } from '../classes/Party';
// import { Enemy } from '../classes/Character/Enemy/Enemy';
// import { BattleReport } from '../classes/Battle/BattleReport';
// import { npc_satoshi } from '../classes/Character/NPCS/allNpcCharacters/SatoshiIkeda';
// import { SkillRepository } from '../classes/Skills/SkillRepository';
// import { SuccessResponse, ErrorResponse } from './ResponseType';
// import { archetype_enemy_skeleton_cleric, archetype_enemy_skeleton_fighter, archetype_enemy_skeleton_knight, archetype_enemy_skeleton_mage, archetype_enemy_skeleton_thief } from '../classes/Character/Enemy/Undead';
// import { WeaponRepository } from '../classes/Items/Equipments/Weapon/WeaponRepository';

// // Define type Response
// // type Message = StartBattle

// export type Message = StartBattleRequest | StartBattleDemoRequest | BattleEndedMessage;

// export type StartBattleDemoRequest = {
//     type: 'START_BATTLE_DEMO';
//     selectedClass: string;
// }

// export type StartBattleRequest = {
//     type: 'START_BATTLE';
//     partyAID: string;
//     partyBID: string;
// };

// export type BattleEndedMessage = {
//     type: 'BATTLE_ENDED';
//     winnerParty: string;
//     defeatedParty: string;
//     report: BattleReport;
// };

// export class BattleWebSocketService {
//     wss: WebSocket.Server;
//     constructor(wss: WebSocket.Server) {
//         this.wss = wss

//         this.wss.on('connection', (ws: WebSocket) => {
//             console.log('Client connected');

//             ws.on('message', async (message: Buffer) => {
//                 const data = JSON.parse(message.toString());

//                 switch (data.type) {
//                     case 'START_BATTLE' :
//                         this.handleStartBattle(ws, data);
//                         break;
//                     case 'START_BATTLE_DEMO':
//                         await this.handleStartBattleDemo(ws, data);
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
//         })
//     }

//     //Battle Demo
//     private async handleStartBattleDemo(ws: WebSocket, data: StartBattleDemoRequest) {
//         console.log('START_BATTLE_DEMO message received');
//         try {
//             const partyA = new Party([
//                 new PlayerCharacter(
//                     'm83', 
//                     "character1",
//                     '01', 
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     12,
//                     100,
//                     ['skill_auto_order_physical'],
//                     undefined
//                 ),
//             ])
//             partyA.characters[0]?.moveCardToBattle(SkillRepository.skill_auto_order_physical.id);

//             partyA.addCharacterToParty(npc_satoshi);
            
//             const enemy1 = new Enemy('skeleton knight', 'none', archetype_enemy_skeleton_knight, 'A skeleton knight', 'skeleton_knight');
//             enemy1.equip('mainHand', WeaponRepository.sword);
//             enemy1.equip('offHand', WeaponRepository.shield);
//             const enemy2 = new Enemy('skeleton fighter', 'none', archetype_enemy_skeleton_fighter, 'A skeleton fighter', 'skeleton_fighter');
//             enemy2.equip('mainHand', WeaponRepository.sword);
//             enemy2.equip('offHand', WeaponRepository.shield);

//             const partyB = new Party([enemy1]);
//             partyB.addCharacterToParty(enemy2);

//             game.parties.push(partyA);
//             game.parties.push(partyB);
    
//             const battleManager = game.battleWsManager;
//             const battle = new Battle(partyA, partyB, this).startBattle();
    
//             const response: SuccessResponse = {
//                 type: 'SUCCESS',
//                 message: 'Battle started',
//             };
//             ws.send(JSON.stringify(response));
    
//         } catch (error) {
//             console.log(error);
//             const response: ErrorResponse = {
//                 type: 'ERROR',
//                 message: 'Failed to start battle',
//             };
//             ws.send(JSON.stringify(response));
//         }
//     }

//     private async handleStartBattle(ws: WebSocket, data: StartBattleRequest) {
//         console.log('START_BATTLE message received');
//         try {
//             const partyA = game.getPartyByID(data.partyAID);
//             const partyB = game.getPartyByID(data.partyBID);

//             if (!partyA || !partyB) {
//                 throw new Error('Party not found');
//             }

//             const battleManager = game.battleWsManager;
//             const battle = new Battle(partyA, partyB, this);

//             const response: SuccessResponse = {
//                 type: 'SUCCESS',
//                 message: 'Battle started',
//             };
//             ws.send(JSON.stringify(response));
//         } catch (error) {
//             const response: ErrorResponse = {
//                 type: 'ERROR',
//                 message: 'Failed to start battle',
//             };
//             ws.send(JSON.stringify(response));
//         }
//     }

//     broadcast(message: BattleEndedMessage) {
//         this.wss.clients.forEach((client) => {
//             console.log(client.readyState);
//             if (client.readyState === WebSocket.OPEN) {
//                 console.log('Broadcasting message');
//                 client.send(JSON.stringify(message));
//             }
//         });
//     }

//     private handleUnknownMessage(ws: WebSocket) {
//         const unknownMessage: ErrorResponse = {
//             type: 'ERROR',
//             message: 'Unknown message type',
//         };
//         ws.send(JSON.stringify(unknownMessage));
//     }
// }