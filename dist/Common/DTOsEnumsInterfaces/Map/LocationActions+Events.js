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
    LocationActionEnum["Stroll"] = "Stroll";
    LocationActionEnum["Craft"] = "Craft";
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
    //Crafting events
    LocationEventEnum["Craft"] = "craft";
    //Explorations and Travel events
    LocationEventEnum["StrollEvent"] = "strollEvent";
    //Dialogue events
    LocationEventEnum["DialogueEvent"] = "dialogueEvent";
    //Quest events
    LocationEventEnum["QuestGiverEvent"] = "questGiverEvent";
    LocationEventEnum["QuestUpdateEvent"] = "questUpdateEvent";
    LocationEventEnum["QuestCompleteEvent"] = "questCompleteEvent";
    //Item events
    LocationEventEnum["ItemPickupEvent"] = "itemPickupEvent";
    LocationEventEnum["ItemShopEvent"] = "itemShopEvent";
    LocationEventEnum["None"] = "none";
})(LocationEventEnum || (LocationEventEnum = {}));
export class UserInputAction {
    constructor(type, detail) {
        this.type = type;
        this.detail = detail ? detail : "";
    }
}
