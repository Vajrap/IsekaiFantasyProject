import { PartyInterface } from "./characterWS";

export enum WebSocketMessageType {
    CONNECT = 'CONNECT',
    PING = 'PING',
    PONG = 'PONG',
    PARTY_DATA = 'PARTY_DATA',
    GET_PARTY_DATA = 'GET_PARTY_DATA',
}

export interface WebSocketConnectRequest {
    type: WebSocketMessageType.CONNECT;
    userID: string;
}

export interface WebSocketPartyData {
    type: WebSocketMessageType.PARTY_DATA;
    data: PartyInterface;
}