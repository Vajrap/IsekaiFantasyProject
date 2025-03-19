import { PartyInterface } from "../../../Common/RequestResponse/characterWS";


export const REST_EVENT = 'rest_event';

export enum RestEventEnum {
    REST = 'rest',
    CAMP_NO_SUPPLY = 'camp_no_supply',
    CAMP_SUPPLY = 'camp_supply',
    HOUSE = 'house',
    INN_POOR = 'inn_poor',
    INN_COMFORTABLE = 'inn_comfortable',
    INN_LUXURY = 'inn_luxury',
    INN_PREMIUM = 'inn_premium',
}

export interface RestEventPayload {
    type: RestEventEnum;
    party: PartyInterface;
}