// import WebSocket from 'ws';
// import { Party } from '../classes/Party';
// import { Character } from '../classes/Character/Character';
// import { LocationAction } from '../classes/Location/LocationAction';

// //Define types for messages
// type Message = SetAddCharacter | SetRemoveCharacter | SetUpdatePartyMember | SetPartyActions | GetPartyMember | ErrorResponse;

// type SetAddCharacter = {
//     type: 'SET_ADD_CHARACTER';
//     character: Character;
// };

// type SetRemoveCharacter = {
//     type: 'SET_REMOVE_CHARACTER';
//     character: Character;
// };

// type SetUpdatePartyMember = {
//     type: 'SET_UPDATE_PARTY_MEMBER';
//     newPartyPosition: Character[];
// };

// type SetPartyActions = {
//     type: 'SET_PARTY_ACTIONS';
//     time: number;
//     actions: LocationAction;
// };

// type GetPartyMember = {
//     type: 'GET_PARTY_MEMBER';
//     characterID: string;
// };

// type ErrorResponse = {
//     type: 'ERROR';
//     message: string;
// };

// export class PartyWebSocketService {
//     wss: WebSocket.Server;
//     party: Party;
//     constructor(wss: WebSocket.Server, party: Party) {
//         this.wss = wss;
//         this.party = party;
            
//         this.wss.on('connection', (ws: WebSocket) => {
//             console.log('Client connected');
    
//             ws.on('message', async (message: Buffer) => {
//                 const data: Message = JSON.parse(message.toString());
    
//                 switch (data.type) {
//                     case 'SET_ADD_CHARACTER':
//                         this.handleAddCharacter(ws, data);
//                         break;
    
//                     case 'SET_REMOVE_CHARACTER':
//                         this.handleRemoveCharacter(ws, data);
//                         break;
    
//                     case 'SET_UPDATE_PARTY_MEMBER':
//                         this.handleUpdatePartyMember(ws, data);
//                         break;

//                     case 'SET_PARTY_ACTIONS':
//                         this.handleSetPartyActions(ws, data);
//                         break;
    
//                     case 'GET_PARTY_MEMBER':
//                         this.handleGetPartyMember(ws, data);
//                         break;
    
//                     default:
//                         this.handleUnknownMessage(ws);
//                         break;
//                 }
//             });
    
//             ws.on('close', () => {
//                 console.log('Client disconnected');
//             });
    
//             ws.on('error', (error: Error) => {
//                 console.error('WebSocket error:', error.message);
//             });
//         });
//     }

//     private handleAddCharacter(ws: WebSocket, data: SetAddCharacter) {
//         this.party.addCharacterToParty(data.character);
//         this.broadcastCharacterUpdate(data.character);
//     }

//     private handleRemoveCharacter(ws: WebSocket, data: SetRemoveCharacter) {
//         this.party.removeCharacterFromParty(data.character);
//         this.broadcastCharacterUpdate(data.character);
//     }

//     private handleUpdatePartyMember(ws: WebSocket, newPartyPosition: SetUpdatePartyMember) {
//         this.party.characters = newPartyPosition.newPartyPosition;
//         this.broadcastPartyUpdate(this.party.characters as Character[]);
//     }

//     private handleSetPartyActions(ws: WebSocket, data: SetPartyActions) {
//         this.party.setActions(data.time, data.actions);
//     }

//     private handleGetPartyMember(ws: WebSocket, data: GetPartyMember) {
//         const character = this.party.getPartyMember(data.characterID);
//         if (character) {
//             ws.send(JSON.stringify({ type: 'SET_ADD_CHARACTER', character }));
//         } else {
//             const errorResponse: ErrorResponse = {
//                 type: 'ERROR',
//                 message: 'Character not found',
//             };
//             ws.send(JSON.stringify(errorResponse));
//         }
//     }

//     private handleUnknownMessage(ws: WebSocket) {
//         const unknownMessage: ErrorResponse = {
//             type: 'ERROR',
//             message: 'Unknown message type',
//         };
//         ws.send(JSON.stringify(unknownMessage));
//     }

//     private broadcastCharacterUpdate(character: Character) {
//         const message: SetAddCharacter = {
//             type: 'SET_ADD_CHARACTER',
//             character,
//         };
//         this.wss.clients.forEach(client => {
//             client.send(JSON.stringify(message));
//         });
//     }

//     private broadcastPartyUpdate(newPartyPosition: Character[]) {
//         const message: SetUpdatePartyMember = {
//             type: 'SET_UPDATE_PARTY_MEMBER',
//             newPartyPosition,
//         };
//         this.wss.clients.forEach(client => {
//             client.send(JSON.stringify(message));
//         });
//     }
// }