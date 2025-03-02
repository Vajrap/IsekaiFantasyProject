class Character {
    level: number;
    hpPercentage: number;
    constructor(
        level: number,
        hpPercentage: number
    ) {
        this.level = level;
        this.hpPercentage = hpPercentage;
    }
}

class Party {
    characters: Character[];
    constructor(
        characters: Character[]
    ) {
        this.characters = characters;
    }

    getExperiencePool(): number {
        return this.getPartyStrength() * this.getAverageHpPercentage();
    }

    getPartyStrength(): number {
        return this.getAverageLevel() * this.characters.length;
    }
    
    private getAverageLevel(): number {
        let sum = 0;
        for (let i = 0; i < this.characters.length; i++) {
            sum += this.characters[i].level;
        }
        return sum / this.characters.length;
    }

    private getAverageHpPercentage(): number {
        let sum = 0;
        for (let i = 0; i < this.characters.length; i++) {
            sum += this.characters[i].hpPercentage;
        }
        return (sum / this.characters.length) / 100;
    }
}

function calculateExpGained(winner: Party, loser: Party): {winnerExp: number, loserExp: number} {
    let winnerPS = winner.getPartyStrength();
    let loserPS = loser.getPartyStrength();
    let isWinnerStronger = winnerPS > loserPS;
    let winnerExpGained_base = loser.getExperiencePool();
    let loserExpGained_base = winner.getExperiencePool();

    const strengthRatio = winnerPS / loserPS;  // Normalize power difference
    const weakerBonus = 1 + (1 - strengthRatio); // Bonus if the weaker party wins
    const strongWinPenalty = Math.max(0.5, 1 - (strengthRatio - 1) * 0.5); // Reduce exp for stronger winners

    let winnerExp: number;
    let loserExp: number;

    if (isWinnerStronger) {
        // Stronger wins → gets less EXP, loser gets slightly less than normal
        winnerExp = winnerExpGained_base * strongWinPenalty;  
        loserExp = loserExpGained_base * 0.4; 
    } else {
        // Weaker wins → gets a big EXP boost
        winnerExp = winnerExpGained_base * weakerBonus; 
        loserExp = loserExpGained_base * 0.5; 
    }

    return { winnerExp, loserExp };
}

// Create test cases
function testCalculateExpGained() {
    console.log("Running EXP Calculation Tests...\n");

    // Case 1: Balanced match (Both have equal strength)
    const mathcLevel = 20
    let partyA = new Party([
        new Character(mathcLevel, 100),
        new Character(mathcLevel, 100),
        new Character(mathcLevel, 100)
    ]);
    let partyB = new Party([
        new Character(mathcLevel, 100),
        new Character(mathcLevel, 100),
        new Character(mathcLevel, 100)
    ]);
    console.log(`Test 1 (Balanced Match with level ${mathcLevel}, A wins):`, calculateExpGained(partyA, partyB));

    const strongLevel = 20;
    const weakLevel = 15
    // Case 2: Stronger party wins (A is stronger)
    let strongPartyA = new Party([
        new Character(strongLevel, 100),
        new Character(strongLevel, 100),
        new Character(strongLevel, 100)
    ]);
    let weakPartyB = new Party([
        new Character(weakLevel, 100),
        new Character(weakLevel, 100),
        new Character(weakLevel, 100)
    ]);
    console.log(`Test 2 (Stronger (${strongLevel}*3) win aginst (${weakLevel}*3)):`, calculateExpGained(strongPartyA, weakPartyB));

    // Case 3: Weaker party wins (B is stronger, but A wins)
    console.log(`Test 3 (Weaker (${weakLevel}*3) win against (${strongLevel}*3)):`, calculateExpGained(weakPartyB, strongPartyA));

    // Case 4: Uneven team sizes (A has more members)
    let unevenPartyA = new Party([
        new Character(1, 100),
        new Character(1, 100),
        new Character(1, 100),
        new Character(1, 100),
        new Character(1, 100),
        new Character(1, 100)
    ]);
    let unevenPartyB = new Party([
        new Character(1, 100),
        new Character(1, 100),
        new Character(1, 100),
    ]);
    // console.log("Test 4 (Uneven team sizes, B wins):", calculateExpGained(unevenPartyB, unevenPartyA));
}

// Run tests
testCalculateExpGained();