// import WebSocket from 'ws';

// type Message = StartTravelRequest | UpdateTravelRequest | ErrorResponse | TravelStartedResponse | TravelUpdatedResponse;

// type StartTravelRequest = {
//     type: 'START_TRAVEL';
//     partyId: string;
//     startingLocation: string;
//     destination: string;
//     travelMethod: TravelMethod;
// };

// type AddLocationRequest = {
//     type: 'ADD_LOCATION';
//     partyId: string;
//     location: string;
// };

// type UpdateTravelRequest = {
//     type: 'UPDATE_TRAVEL';
//     partyId: string;
// };

// type ErrorResponse = {
//     type: 'ERROR';
//     message: string;
// };

// type TravelStartedResponse = {
//     type: 'TRAVEL_STARTED';
//     payload: {
//         path: GameLocation[];
//     };
// };

// type TravelUpdatedResponse = {
//     type: 'TRAVEL_UPDATED';
//     payload: {
//         currentLocation: string;
//         distanceCovered: number;
//     };
// };


// export class TravelWebSocketService {
//     wss: WebSocket.Server;
//     game: Game;
//     constructor(wss: WebSocket.Server, game: Game) {
//         this.wss = wss;
//         this.game = game;

//         this.wss.on('connection', (ws: WebSocket) => {
//             console.log('Travel WebSocket client connected');

//             ws.on('message', async (message: Buffer) => {
//                 const data: Message = JSON.parse(message.toString());

//                 switch (data.type) {
//                     case 'START_TRAVEL':
//                         this.handleStartTravel(ws, data);
//                         break;
//                     case 'UPDATE_TRAVEL':
//                         this.handleUpdateTravel(ws, data);
//                         break;
//                     default:
//                         this.handleUnknownMessage(ws);
//                         break;
//                 }
//             });

//             ws.on('close', () => {
//                 console.log('Travel WebSocket client disconnected');
//             });

//             ws.on('error', (error: Error) => {
//                 console.error('WebSocket error:', error.message);
//             });
//         });
//     }


//     private addLocationToPath(ws: WebSocket, data: AddLocationRequest) {
//         const { partyId, location } = data;

//         const party = this.game.parties.find(p => p.partyID === partyId);
//         if (!party || !party.travelManager) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Party not found' }));
//             return;
//         }
//         let locationToAdd = this.game.getLocationByName(location);
//         if (!locationToAdd) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Location not found' }));
//             return;
//         }

//         let result = party.travelManager.addLocationToPath(locationToAdd);
//         if (!result) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Location not connected' }));
//             return;
//         } else if (result) {
//             ws.send(JSON.stringify({ type: 'LOCATION_ADDED', payload: { location: locationToAdd.name } }));
//         }
//     }

//     private removeLocationFromPath(ws: WebSocket, data: AddLocationRequest) {
//         const { partyId, location } = data;
//         const party = this.game.parties.find(p => p.partyID === partyId);
//         if (!party || !party.travelManager) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Party not found' }));
//             return;
//         }
//         let locationToRemove = this.game.getLocationByName(location);
//         if (!locationToRemove) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Location not found' }));
//             return;
//         }
        
//         let result = party.travelManager.removeLocationFromPath(locationToRemove);
//         if (!result) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Location not in path' }));
//             return;
//         } else if (result) {
//             ws.send(JSON.stringify({ type: 'LOCATION_REMOVED', payload: { location: locationToRemove.name } }));
//         }
//     }
        

//     private handleStartTravel(ws: WebSocket, data: StartTravelRequest) {
//         const { partyId, startingLocation, destination, travelMethod } = data;

//         const party = this.game.parties.find(p => p.partyID === partyId);
//         if (!party) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Party not found' }));
//             return;
//         }

//         const startLocation = this.game.getLocationByName(startingLocation);
//         const endLocation = this.game.getLocationByName(destination);

//         if (!startLocation || !endLocation) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid locations' }));
//             return;
//         }

//         party.initiateTravel(travelMethod);

//         ws.send(JSON.stringify({ type: 'TRAVEL_STARTED', payload: { path: party.travelManager.path } }));
//     }

//     private handleUpdateTravel(ws: WebSocket, data: UpdateTravelRequest) {
//         const { partyId } = data;

//         const party = this.game.parties.find(p => p.partyID === partyId);
//         if (!party || !party.travelManager) {
//             ws.send(JSON.stringify({ type: 'ERROR', message: 'Travel manager not found for party' }));
//             return;
//         }
        
//         ws.send(JSON.stringify({ type: 'TRAVEL_UPDATED', payload: { currentLocation: party.travelManager.currentLocation.name, distanceCovered: party.travelManager.distanceCovered } }));
//     }

//     private handleUnknownMessage(ws: WebSocket) {
//         const unknownMessage: ErrorResponse = {
//             type: 'ERROR',
//             message: 'Unknown message type',
//         };
//         ws.send(JSON.stringify(unknownMessage));
//     }

//     broadcast(message: string) {
//         console.log('Broadcasting message:', message);
//         this.wss.clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     }
// }