import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { db } from '../../Database';
import { ErrorResponse, SuccessResponse } from './ResponseType';
import { PlayerCharacter } from '../../Entities/Character/Character';
import { game } from '../../server';
import { GetCharacterRequest, GetCharacterResponse, UpdateSkillListRequest, UpdateSkillListResponse } from '../../../Common/RequestResponse/characterWS';
import { failure, Result, success } from '../../../Common/Lib/Result';

export class CharacterWebSocketService extends EventEmitter {
    private userSessions: Map<string, CharacterSession> = new Map();
    private wsConnections: Map<string, WebSocket> = new Map();
    wss: WebSocket.Server;

    constructor(wss: WebSocket.Server) {
        super();
        this.wss = wss;

        this.wss.on('connection', (ws: WebSocket, request: GetCharacterRequest | UpdateSkillListRequest) => {
            ws.on('message', async (message: Buffer) => {
                try {
                    // const parsedMessage = JSON.parse(message.toString()) as Message;
                    // const userID = (parsedMessage as any).userID;
                    const userID = request.userID;

                    if (!userID) {
                        ws.send(JSON.stringify({ type: 'ERROR', message: 'User ID not found' }));
                        return;
                    }

                    this.wsConnections.set(userID, ws);

                    if (!this.userSessions.has(userID)) {
                        const session = new CharacterSession(this, userID);
                        this.userSessions.set(userID, session);
                    }

                    const session = this.userSessions.get(userID);
                    if (session) {
                        session.handleMessage(ws, request);
                    } else {
                        ws.send(JSON.stringify({ type: 'ERROR', message: 'User session not found' }));
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                    ws.close();
                }
            });

            ws.on('close', () => {
                this.wsConnections.forEach((wsConn, userID) => {
                    if (wsConn === ws) {
                        this.userSessions.delete(userID);
                        this.wsConnections.delete(userID);
                    }
                });
            });

            ws.on('error', (error: Error) => {
                console.error('WebSocket error:', error.message);
            });
        });
    }

    public sendUpdate(
        updateData: GetCharacterResponse | UpdateSkillListResponse, 
        userID: string
    ) {
        const ws = this.wsConnections.get(userID);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(updateData));
        } else {
            console.error('Error sending update: WebSocket not open');
        }
    }
}

class CharacterSession {
    private service: CharacterWebSocketService;
    private userID: string;

    constructor(service: CharacterWebSocketService, userID: string) {
        this.service = service;
        this.userID = userID;
    }

    handleMessage(ws: WebSocket, data: GetCharacterRequest | UpdateSkillListRequest) {
        switch (data.type) {
            case 'GET_CHARACTER':
                this.handleGetCharacter(ws, data);
                break;
            case 'UPDATE_SKILL_LIST':
                this.handleUpdateSkillList(ws, data);
                break;
            default:
                this.handleUnknownMessage(ws);
                break;
        }
    }

    async handleGetCharacter(ws: WebSocket, data: GetCharacterRequest) {
        try {
            if (this.userID !== data.userID) {
                throw new Error('Fatal Error: Unauthorized, user ID does not match; should not happen');
            }

            const character = game.getPlayerCharacterByUserID(this.userID);
            
            const response: GetCharacterResponse = {
                type: 'GET_CHARACTER_RESPONSE',
                status: 'SUCCESS',
                message: 'Success',
                character: character.intoInterface(),
            };

            this.service.sendUpdate(response, this.userID);
        } catch (error) {
            const response: GetCharacterResponse = {
                type: 'GET_CHARACTER_RESPONSE',
                status: 'FAILURE',
                message: 'Unknown Error',
            };
            this.service.sendUpdate(response, this.userID);
        }
    }

    private async handleUpdateSkillList(ws: WebSocket, data: UpdateSkillListRequest): Promise<Result<UpdateSkillListResponse>> {
        try {
            let actor = game.getPlayerCharacterByCharacterID(data.userID);
            if (!actor) {
                // Fatal Error?
                throw new Error('Character not found');
            }
            // The hard part is here, we need to update the skill list of the character
            // First we might need to remove all skills from the character activeSkills, then add the new ones back, this is the easiest way to deal with, else we need to compare the old list with the new list and update the difference
            for (const skill of actor.activeSkills) {
                actor.moveCardToSkills(skill.skill.id);
            }
            for (const skillID of data.skills) {
                actor.moveCardToBattle(skillID);
            }
            
            await db.writeOver(
                {
                    tableName: 'playerCharacters', 
                    primaryKeyColumnName: 'id', 
                    primaryKeyValue: actor.id, 
                },
                [
                    {dataKey: 'activeSkills', value: JSON.stringify(actor.activeSkills)},
                    {dataKey: 'skills', value: JSON.stringify(actor.skills)}
                ]
            );

            return success({
                type: 'UPDATE_SKILL_LIST_RESPONSE',
                status: 'SUCCESS',
                message: 'Success',
                character: actor.intoInterface(),
            });

        } catch (error) {
            return failure('Fail', 'Unknown Error');
        }
    }

    private handleUnknownMessage(ws: WebSocket) {
        const unknownMessage: ErrorResponse = {
            type: 'ERROR',
            message: 'Unknown message type',
        };
        this.service.sendUpdate(unknownMessage, this.userID);
    }
}