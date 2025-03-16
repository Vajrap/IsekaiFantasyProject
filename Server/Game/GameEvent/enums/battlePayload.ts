import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../../../Entities/Party/Party";
import { BattleType } from "../battleEvent";

export interface BattlePayload {
    partyA: Party,
    partyB: Party,
    location: LocationName,
    battleType: BattleType
};