import { Party } from "../../Entities/Party/Party";
import { GameTime } from "../TimeAndDate/GameTime";
import { Battle } from "./Battle";
import { BattleReport } from "./BattleReport";

export class BattleManager {
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
        location: string,
        environment: string,
        gameTime: GameTime
    ): Promise<BattleReport> {
        const newBattle = new Battle(partyA, partyB, location, environment, gameTime);
        this.activeBattles.push(newBattle);

        try {
            // Await the battle to complete and get the result
            const result = await newBattle.startBattle();
            
            // Remove the battle from active battles once it's over
            this.endBattle(newBattle);
            
            return result; // Return the battle result
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
}