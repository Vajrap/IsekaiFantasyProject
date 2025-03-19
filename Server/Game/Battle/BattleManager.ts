import { BattleReportInterface } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { GameTimeInterface } from "../../../Common/DTOsEnumsInterfaces/GameTimeInterface";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Party } from "../../Entities/Party/Party";
import { screamer } from "../../Utility/Screamer/Screamer";
import { Battle } from "./Battle";
import { BattleReport } from "./BattleReport";

export const END_BATTLE = "EndBattle";

class BattleManager {
    activeBattles: Battle[];
    constructor() {
        this.activeBattles = []
    }

    findActiveBattle(party: Party): Battle | undefined {
        return this.activeBattles.find(battle => battle.partyA === party || battle.partyB === party);
    }

    async startNewBattle(
        partyA: Party,
        partyB: Party,
        location: LocationName,
        gameTime: GameTimeInterface
    ): Promise<BattleReportInterface> {
        const newBattle = new Battle(partyA, partyB, location, gameTime);
        this.activeBattles.push(newBattle);

        try {
            // Await the battle to complete and get the result
            const battle = await newBattle.startBattle();
            const result = this.makeReportInterface(battle);
            
            // Remove the battle from active battles once it's over
            this.endBattle(newBattle);
            
            screamer.scream(END_BATTLE, result);
            return result; // Return the battle result as BattleReport
        } catch (error) {
            console.error("Error during battle:", error);
            this.endBattle(newBattle); // Ensure cleanup in case of error
            throw error; // Propagate error for upstream handling
        }
    }

    endBattle(battle: Battle) {
        const index = this.activeBattles.indexOf(battle);
        if (index !== -1) {
            this.activeBattles.splice(index, 1);
        }
    }

    makeReportInterface(battle: BattleReport): BattleReportInterface {
        return {
            startingPartyAMembers: battle.startingPartyAMembers,
            startingPartyBMembers: battle.startingPartyBMembers,
            battleTurn: battle.battleTurn,
            location: battle.location,
            gameTime: battle.gameTime
        };
    }
}

export const battleManager = new BattleManager();