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

function calculateExpGained(winner: Party, loser: Party): { winnerExp: number, loserExp: number } {
    const baseExp = 30;
    let party_A_ps = winner.getPartyStrength();
    let party_B_ps = loser.getPartyStrength();

    let party_a_base_exp: number;
    let party_b_base_exp: number;
    let diff: number;

    if (party_A_ps > party_B_ps) {
        diff = party_A_ps - party_B_ps;
        let scale = diff * 0.05;
        party_a_base_exp = Math.max(baseExp - (baseExp * scale), baseExp * 0.1);
        party_b_base_exp = baseExp + (baseExp * scale);
    } else if (party_A_ps < party_B_ps) {
        diff = party_B_ps - party_A_ps;
        let scale = diff * 0.05;
        party_a_base_exp = baseExp + (baseExp * scale);
        party_b_base_exp = Math.max(baseExp - (baseExp * scale), baseExp * 0.1);
    } else {
        party_a_base_exp = baseExp;
        party_b_base_exp = baseExp;
    }

    let winnerExp = Math.floor(party_a_base_exp);
    let loserExp = Math.floor(party_b_base_exp / 2);

    return { winnerExp, loserExp };
}

// Create test cases
function testCalculateExpGained() {
    console.log("Running EXP Calculation Tests...\n");

    
    // Case 1: Balanced match level 1
    let statModValue = 1;
    let expNeeded = 50 + (Math.max(statModValue, 0) + 1) ** 2 * 20;
    console.log(`Exp needed for a stat to level up from statMod ${statModValue}: ${expNeeded}`);
    
    let matchLevel = 1
    let partyA = new Party([
        new Character(matchLevel, 100),
        new Character(matchLevel, 100),
        new Character(matchLevel, 100)
    ]);
    let partyB = new Party([
        new Character(matchLevel, 100),
        new Character(matchLevel, 100),
        new Character(matchLevel, 100)
    ]);
    let gainedExp = calculateExpGained(partyA, partyB);
    console.log(`Test 1 (Balanced Match with level ${matchLevel}, A wins):`, gainedExp);
    
    // Case 2: Stronger party wins (A is stronger)
    const strongLevel = 3;
    const weakLevel = 1
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

    // Case 4: Extremely strong party wins (A is stronger)
    const veryStrongLevel = 30;
    const veryWeakLevel = 1
    let veryStrongPartyA = new Party([
        new Character(veryStrongLevel, 100),
        new Character(veryStrongLevel, 100),
        new Character(veryStrongLevel, 100)
    ]);
    let veryWeakPartyB = new Party([
        new Character(veryWeakLevel, 100),
        new Character(veryWeakLevel, 100),
        new Character(veryWeakLevel, 100)
    ]);
    console.log(`Test 4 (Very Strong (${veryStrongLevel}*3) win against Very Weak (${veryWeakLevel}*3)):`, calculateExpGained(veryStrongPartyA, veryWeakPartyB));

    // Case 5: Extremely strong party wins (B is stronger, but A wins)
    console.log(`Test 5 (Very Weak (${veryWeakLevel}*3) win against Very Strong (${veryStrongLevel}*3)):`, calculateExpGained(veryWeakPartyB, veryStrongPartyA));
}

// Run tests
testCalculateExpGained();