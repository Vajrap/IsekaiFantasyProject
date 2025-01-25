import { Party } from "../../Entities/Party/Party";
import { CharacterData, ActionDetails } from "../../API/BattleReportDTO";
import { GameTimeInterface } from "../../../Common/DTOsEnumsInterfaces/GameTimeInterface";

export class BattleReport {
    startingPartyAMembers: CharacterData[] = [];
    startingPartyBMembers: CharacterData[] = [];
    battleTurn: ActionDetails[] = [];
    //TODO: Implementation of location, environment, gameTime on battle.
    //may not effect battle but would used to determine the BG in FE
    location: string;
    //may effect battle, not implemented yet, we should have location.weather system later
    environment: string;
    //may also effect battle, not implemented yet, gameTime is already in used, but effect on character in battle is not, right now FE would use GameTime to Filter the BG
    gameTime: GameTimeInterface;

    constructor(
        partyA: Party, 
        partyB: Party, 
        location: string = "Unknown", 
        environment: string = "Default",
        gameTime: GameTimeInterface
    ) {
        for (const character of partyA.characters) {
            if (character && character != "none") {
                const characterData = new CharacterData(character);
                this.startingPartyAMembers.push(characterData);
            }
        }
        for (const character of partyB.characters) {
            if (character && character != "none") {
                const characterData = new CharacterData(character);
                this.startingPartyBMembers.push(characterData);
            }
        }
        this.gameTime = gameTime;
        this.location = location;
        this.environment = environment;
    }

    addTurn(actionDetails: ActionDetails) {
        this.battleTurn.push(actionDetails);
    }

    toJSON() {
        return {
            startingPartyAMembers: this.startingPartyAMembers,
            startingPartyBMembers: this.startingPartyBMembers,
            battleTurn: this.battleTurn.map(actionDetails => actionDetails.toJSON()),
        };
    }
}

