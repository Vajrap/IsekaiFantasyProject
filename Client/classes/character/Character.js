class Character {
    constructor(data) {
        this.name = data.name;
        this.characterID = data.characterID;
        this.gender = data.gender;
        this.portrait = data.portrait;
        this.alignment = this.getCharacterAlignment(data.alignment);
        this.title = data.title? data.title : "Commoner";
        this.mood = data.mood;
        this.fame = data.fame;
        this.level = data.level;
        this.gold = data.gold;
        this.exp = data.exp;
        this.isDead = data.isDead;
        this.maxHP = data.baseHP + data.bonusHP;
        this.currentHP = data.currentHP;
        this.maxMP = data.baseMP + data.bonusMP;
        this.currentMP = data.currentMP;
        this.maxSP = data.baseSP + data.bonusSP;
        this.currentSP = data.currentSP;
        this.attributes = data.status.attributes;
        this.proficiencies = data.status.proficiencies;
        this.battlers = data.status.battlers;
        this.elements = data.status.elements;
        this.artisans = data.status.artisans;
        this.equipments = data.equipments;
        this.allInternal = data.internals;
        this.activeInternal = data.activeInternal;
        this.traits = data.traits;
        this.skills = data.skills;
        this.battleCards = data.battleCards;
        this.position = data.position;
        this.baseAC = data.baseAC;
        this.storyFlags = data.storyFlags;
        this.itemsBag = data.itemsBag
        this.bagSize = data.bagSize
        this.location = data.location
    }

    getCharacterAlignment(alignment) {
        const { lawVSChaos, goodVSEvil } = alignment;
        let alignmentString = "";
        if (lawVSChaos <= 20) {
            alignmentString += "Chaotic ";
        }
        if (lawVSChaos > 21 && lawVSChaos <= 40) {
            alignmentString += "Neutral ";
        }
        if (lawVSChaos > 41) {
            alignmentString += "Lawful ";
        }
        if (goodVSEvil <= 20) {
            alignmentString += "Evil";
        }
        if (goodVSEvil > 21 && goodVSEvil <= 40) {
            alignmentString += "Neutral";
        }
        if (goodVSEvil > 41) {
            alignmentString += "Good";
        }
        if (alignmentString === "" || alignmentString === "Neutral Neutral") {
            alignmentString = "Neutral";
        }
        return alignmentString;
    }
}

