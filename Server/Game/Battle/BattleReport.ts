import { Party } from "../../Entities/Party/Party";
import { GameTimeInterface } from "../../../Common/DTOsEnumsInterfaces/GameTimeInterface";
import { CharacterDataInterface, ActionDetailsInterface } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { createCharacterDataInterface } from "../../API/BattleReportDTO";
import { TurnReport } from "../../Entities/Skills/Skill";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";

export class BattleReport {
    startingPartyAMembers: CharacterDataInterface[] = [];
    startingPartyBMembers: CharacterDataInterface[] = [];
    battleTurn: TurnReport[] = [];
    location: LocationName;
    gameTime: GameTimeInterface;

    constructor(
        partyA: Party, 
        partyB: Party, 
        location: LocationName, 
        gameTime: GameTimeInterface
    ) {
        for (const character of partyA.characters) {
            if (character && character != "none") {
                const characterData = createCharacterDataInterface(character);
                // const characterData = new CharacterData(character);
                this.startingPartyAMembers.push(characterData);
            }
        }
        for (const character of partyB.characters) {
            if (character && character != "none") {
                const characterData = createCharacterDataInterface(character);
                this.startingPartyBMembers.push(characterData);
            }
        }
        this.gameTime = gameTime;
        this.location = location;
    }

    addTurn(turnReport: TurnReport) {
        this.battleTurn.push(turnReport);
    }

    toJSON() {
        return {
            startingPartyAMembers: this.startingPartyAMembers,
            startingPartyBMembers: this.startingPartyBMembers,
            battleTurn: this.battleTurn,
        };
    }
}