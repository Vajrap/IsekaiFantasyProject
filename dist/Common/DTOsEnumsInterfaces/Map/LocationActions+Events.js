export var LocationActionEnum;
(function (LocationActionEnum) {
    LocationActionEnum["MoveIn"] = "Move In";
    LocationActionEnum["MoveOut"] = "Move Out";
    LocationActionEnum["Rest"] = "Rest";
    LocationActionEnum["Inn"] = "Inn";
    LocationActionEnum["Camping"] = "Camping";
    LocationActionEnum["HouseRest"] = "House Rest";
    LocationActionEnum["Blacksmith"] = "Blacksmith";
    LocationActionEnum["Apothecary"] = "Apothecary";
    LocationActionEnum["Tailor"] = "Tailor";
    LocationActionEnum["Armorer"] = "Armorer";
    LocationActionEnum["Jeweler"] = "Jeweler";
    LocationActionEnum["Arcanist"] = "Arcanist";
    LocationActionEnum["Grocery"] = "Grocery";
    LocationActionEnum["Tavern"] = "Tavern";
    LocationActionEnum["HeavensDecreeMeeting"] = "Heavens Decree Meeting";
    LocationActionEnum["ChurchOfLaoh"] = "Church of Laoh";
    LocationActionEnum["GreatTempleOfLaoh"] = "Great Temple of Laoh";
    LocationActionEnum["CultOfNizarith"] = "Cult of Nizarith";
    LocationActionEnum["ShrineOfGelthoran"] = "Shrine of Gelthoran";
    LocationActionEnum["MajorShrineOfGelthoran"] = "Major Shrine of Gelthoran";
    LocationActionEnum["ShrineOfAqorath"] = "Shrine of Aqorath";
    LocationActionEnum["MajorShrineOfAqorath"] = "Major Shrine of Aqorath";
    LocationActionEnum["ShrineOfValthoria"] = "Shrine of Valthoria";
    LocationActionEnum["MajorShrineOfValthoria"] = "Major Shrine of Valthoria";
    LocationActionEnum["ShrineOfPyrnthanas"] = "Shrine of Pyrnthanas";
    LocationActionEnum["MajorShrineOfPyrnthanas"] = "Major Shrine of Pyrnthanas";
    LocationActionEnum["Barrack"] = "Barrack";
    LocationActionEnum["KnightOrder"] = "Knight Order";
    LocationActionEnum["MagicSchool"] = "Magic School";
    LocationActionEnum["MagicAcademy"] = "Magic Academy";
    LocationActionEnum["ChurchOfLaohMagicLearning"] = "Church of Laoh Magic Learning";
    LocationActionEnum["CultOfNizarithMagicLearning"] = "Cult of Nizarith Magic Learning";
    LocationActionEnum["AdventureGuild"] = "Adventure Guild";
    LocationActionEnum["BountyBoard"] = "Bounty Board";
    LocationActionEnum["Arena"] = "Arena";
})(LocationActionEnum || (LocationActionEnum = {}));
export var LocationEventEnum;
(function (LocationEventEnum) {
    //Random event
    LocationEventEnum["RanomEvent"] = "randomEvent";
    //Resting events
    LocationEventEnum["RestEvent"] = "rest";
    LocationEventEnum["InnRest"] = "innRest";
    LocationEventEnum["HouseRest"] = "houseRest";
    LocationEventEnum["CampRest"] = "campRest";
    //Training events
    LocationEventEnum["AttributeTrain"] = "attributeTrain";
    LocationEventEnum["ArtisanTrain"] = "artisanTrain";
    LocationEventEnum["ProficiencyTrain"] = "proficiencyTrain";
    LocationEventEnum["SkillTrain"] = "skillTrain";
    LocationEventEnum["InternalSkillTrain"] = "internalSkillTrain";
    //Learning events
    LocationEventEnum["SkillLearn"] = "skillLearn";
    LocationEventEnum["InternalSkillLearn"] = "internalSkillLearn";
    //Explorations and Travel events
    LocationEventEnum["StrollEvent"] = "strollEvent";
    //Combat events
    LocationEventEnum["BattleEvent"] = "battleEvent";
    //Dialogue events
    LocationEventEnum["DialogueEvent"] = "dialogueEvent";
    //Quest events
    LocationEventEnum["QuestGiverEvent"] = "questGiverEvent";
    LocationEventEnum["QuestUpdateEvent"] = "questUpdateEvent";
    LocationEventEnum["QuestCompleteEvent"] = "questCompleteEvent";
    //Item events
    LocationEventEnum["ItemPickupEvent"] = "itemPickupEvent";
    LocationEventEnum["ItemShopEvent"] = "itemShopEvent";
    //Travel events
    LocationEventEnum["TravelEvent"] = "travelEvent";
})(LocationEventEnum || (LocationEventEnum = {}));
