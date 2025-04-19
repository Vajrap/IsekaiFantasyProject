export enum LocationActionEnum {
  Rest = "Rest",
  Inn = "Inn",
  Camping = "Camping",
  HouseRest = "House Rest",
  Travel = "Travel",
  TrainAttribute = "Train Attribute",
  TrainProficiency = "Train Proficiency",
  TrainArtisan = "Train Artisan",
  TrainSkill = "Train Skill",
  LearnSkill = "Learn Skill",

  Craft = "Craft",
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
  None = "None",
}

export enum LocationEventEnum {
  BattleEvent = "battleEvent",

  //Resting events
  RestInnPoor = "restInnPoor",
  RestInnComfortable = "restInnComfortable",
  RestInnPremium = "restInnPremium",
  RestInnLuxury = "restInnLuxury",
  RestHouse = "restHouse",
  RestCamp = "restCamp",

  //Training events
  TrainAttribute = "trainAttribute",
  TrainProficiency = "trainProficiency",
  TrainArtisan = "trainArtisan",

  //Skill events
  SkillLearn = "skillLearn",
  SkillTrain = "skillTrain",

  //Crafting events
  Craft = "craft",

  //Explorations and Travel events
  StrollEvent = "strollEvent", //Stroll event take 3 arguments, the party, the player, and the event() -> {} to execute, maybe about gaining insight or call a check to call for another event

  //Dialogue events
  DialogueEvent = "dialogueEvent", //Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome

  //Quest events
  QuestGiverEvent = "questGiverEvent", //Take character and quest, might check if the character has the quest already, if true -> update quest instead.
  QuestUpdateEvent = "questUpdateEvent",
  QuestCompleteEvent = "questCompleteEvent",

  //Item events
  ItemPickupEvent = "itemPickupEvent", //Take character and item, add item to character inventory
  ItemShopEvent = "itemShopEvent", //Take character and shop, open shop interface, buy/sell items

  None = "none",
}

export class UserInputAction {
  type: LocationActionEnum;
  detail: string; // Use mostly for specific id for events like train and learn
  constructor(type: LocationActionEnum, detail?: string) {
    this.type = type;
    this.detail = detail ? detail : "";
  }
}
