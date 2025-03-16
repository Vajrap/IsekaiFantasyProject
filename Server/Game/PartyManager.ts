import { DayOfWeek, TimeOfDay } from "../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { Party } from "../Entities/Party/Party";

export class PartyManager {
    parties: Party[] = [];
    
    constructor() {
        this.parties = [];
    }

    getPartyByID(partyID: string): Party {
        const party = this.parties.find(p => p.partyID === partyID);
        if (!party) { throw new Error(`Party with ID ${partyID} not found`); }
        return party;
    }

    addParty(party: Party): void {
        this.parties.push(party);
    }
}