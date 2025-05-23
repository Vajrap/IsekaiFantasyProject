import { DiceEnum } from "../../Common/DTOsEnumsInterfaces/DiceEnum";

export class Dice {
  static roll(dice: DiceEnum): DiceRollResult {
    let [diceCount, diceFace] = dice.split("d").map(Number);
    let results: number[] = [];

    for (let i = 0; i < diceCount; i++) {
      let result = Math.floor(Math.random() * diceFace) + 1;
      results.push(result);
    }

    return new DiceRollResult(results);
  }

  static rollTwenty(): number {
    return Math.floor(Math.random() * 20) + 1;
  }
}

class DiceRollResult {
  rolls: number[];
  constructor(rolls: number[]) {
    this.rolls = rolls;
  }

  get sum(): number {
    return this.rolls.reduce((acc, curr) => acc + curr, 0);
  }
}
