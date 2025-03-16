import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../../Entities/Party/Party";
import { screamer } from "../../Utility/Screamer/Screamer";

export enum BattleType {
    Random = 'Random',
    Encounter = 'Encounter',
};

export function event_battle(partyA: Party, partyB: Party, location: LocationName, battleType: BattleType): void {
    screamer.scream(
        `EVENT_BATTLE`,
        {
            partyA: partyA,
            partyB: partyB,
            location: location,
            battleType: battleType
        }
    )
};