export class Dice {
    static roll(dice) {
        let [diceCount, diceFace] = dice.split('d').map(Number);
        let results = [];
        for (let i = 0; i < diceCount; i++) {
            let result = Math.floor(Math.random() * diceFace) + 1;
            results.push(result);
        }
        return new DiceRollResult(results);
    }
}
class DiceRollResult {
    constructor(rolls) {
        this.rolls = rolls;
    }
    get sum() {
        return this.rolls.reduce((acc, curr) => acc + curr, 0);
    }
}
