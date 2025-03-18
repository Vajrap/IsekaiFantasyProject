export var LocationActionEnum;
(function (LocationActionEnum) {
    LocationActionEnum["Rest"] = "Rest";
    LocationActionEnum["Inn"] = "Inn";
    LocationActionEnum["Camping"] = "Camping";
    LocationActionEnum["HouseRest"] = "House Rest";
    LocationActionEnum["Travel"] = "Travel";
    LocationActionEnum["TrainAttribute"] = "Train Attribute";
    LocationActionEnum["TrainProficiency"] = "Train Proficiency";
    LocationActionEnum["TrainArtisan"] = "Train Artisan";
    LocationActionEnum["TrainSkill"] = "Train Skill";
    LocationActionEnum["LearnSkill"] = "Learn Skill";
    // Blacksmith = 'Blacksmith',
    // Apothecary = 'Apothecary',
    // Tailor = 'Tailor',
    // Armorer = 'Armorer',
    // Jeweler = 'Jeweler',
    // Arcanist = 'Arcanist',
    // Grocery = 'Grocery',
    // Tavern = 'Tavern',
    // HeavensDecreeMeeting = 'Heavens Decree Meeting',
    // ChurchOfLaoh = 'Church of Laoh',
    // GreatTempleOfLaoh = 'Great Temple of Laoh',
    // CultOfNizarith = 'Cult of Nizarith',
    // ShrineOfGelthoran = 'Shrine of Gelthoran',
    // MajorShrineOfGelthoran = 'Major Shrine of Gelthoran',
    // ShrineOfAqorath = 'Shrine of Aqorath',
    // MajorShrineOfAqorath = 'Major Shrine of Aqorath',
    // ShrineOfValthoria = 'Shrine of Valthoria',
    // MajorShrineOfValthoria = 'Major Shrine of Valthoria',
    // ShrineOfPyrnthanas = 'Shrine of Pyrnthanas',
    // MajorShrineOfPyrnthanas = 'Major Shrine of Pyrnthanas',
    // Barrack = 'Barrack',
    // KnightOrder = 'Knight Order',
    // MagicSchool = 'Magic School',
    // MagicAcademy = 'Magic Academy',
    // ChurchOfLaohMagicLearning = 'Church of Laoh Magic Learning',
    // CultOfNizarithMagicLearning = 'Cult of Nizarith Magic Learning',
    // AdventureGuild = 'Adventure Guild',
    // BountyBoard = 'Bounty Board',
    // Arena = 'Arena',
    LocationActionEnum["None"] = "None";
})(LocationActionEnum || (LocationActionEnum = {}));
export var LocationEventEnum;
(function (LocationEventEnum) {
    LocationEventEnum["BattleEvent"] = "battleEvent";
    //Resting events
    LocationEventEnum["RestInnPoor"] = "restInnPoor";
    LocationEventEnum["RestInnComfortable"] = "restInnComfortable";
    LocationEventEnum["RestInnPremium"] = "restInnPremium";
    LocationEventEnum["RestInnLuxury"] = "restInnLuxury";
    LocationEventEnum["RestHouse"] = "restHouse";
    LocationEventEnum["RestCamp"] = "restCamp";
    //Training events
    LocationEventEnum["TrainAttribute"] = "trainAttribute";
    LocationEventEnum["TrainProficiency"] = "trainProficiency";
    LocationEventEnum["TrainArtisan"] = "trainArtisan";
    //Skill events
    LocationEventEnum["SkillLearn"] = "skillLearn";
    LocationEventEnum["SkillTrain"] = "skillTrain";
    //Explorations and Travel events
    // StrollEvent = "strollEvent", //Stroll event take 3 arguments, the party, the player, and the event() -> {} to execute, maybe about gaining insight or call a check to call for another event
    //Combat events
    // BattleEvent = "battleEvent", //Start combat, take party and pre-defined enemy party (needed implementation)
    //Dialogue events
    // DialogueEvent = "dialogueEvent", //Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome
    //Quest events
    // QuestGiverEvent = "questGiverEvent", //Take character and quest, might check if the character has the quest already, if true -> update quest instead.
    // QuestUpdateEvent = "questUpdateEvent",
    // QuestCompleteEvent = "questCompleteEvent",
    //Item events
    // ItemPickupEvent = "itemPickupEvent", //Take character and item, add item to character inventory
    // ItemShopEvent = "itemShopEvent", //Take character and shop, open shop interface, buy/sell items
    //Travel events
    // TravelEvent = "travelEvent",
    // TradeEvent = "tradeEvent", //Take 2 parties, execute trade event
    // QuestEvent = "questEvent", //Take 1 parties, execute quest event
    // ItemEvent = "itemEvent", //Take 1 parties, execute item event
    LocationEventEnum["None"] = "none";
})(LocationEventEnum || (LocationEventEnum = {}));
export class UserInputAction {
    constructor(type, detail) {
        this.type = type;
        this.detail = detail ? detail : "";
    }
}
