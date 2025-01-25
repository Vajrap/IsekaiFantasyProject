export class LocationEvent {
    
};



// export enum LocationEventEnum {
//     //Random event
//     RanomEvent = "randomEvent", //Not sure if this is needed yet

//     //Resting events
//     RestEvent = "rest", //Resting only take 1 argument, the party
//     InnRest = "innRest", //InnResting only take 1 argument, the party
//     HouseRest = "houseRest", //HouseResting only take 1 argument, the party
//     CampRest = "campRest", //CampResting take 2 arguments, the party and a boolean to determine if the party use item to rest

//     //Training events
//     AttributeTrain = "attributeTrain", //Attribute training take 2 arguments, the actor and the attribute to train
//     ArtisanTrain = "artisanTrain", //Artisan training take 2 arguments, the actor and the artisan to train
//     ProficiencyTrain = "proficiencyTrain", //Proficiency training take 2 arguments, the actor and the proficiency to train
//     SkillTrain = "skillTrain", //Skill training take 2 arguments, the actor and the skill to train
//     InternalSkillTrain = "internalSkillTrain", //Internal skill training take 2 arguments, the actor and the internal skill to train

//     //Learning events
//     SkillLearn = "skillLearn", //Skill learning take 2 arguments, the actor and the skill to learn
//     InternalSkillLearn = "internalSkillLearn", //Internal skill learning take 2 arguments, the actor and the internal skill to learn

//     //Explorations and Travel events
//     StrollEvent = "strollEvent", //Stroll event take 3 arguments, the party, the player, and the event() -> {} to execute, maybe about gaining insight or call a check to call for another event

//     //Combat events
//     BattleEvent = "battleEvent", //Start combat, take party and pre-defined enemy party (needed implementation)

//     //Dialogue events
//     DialogueEvent = "dialogueEvent", //Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome

//     //Quest events
//     QuestGiverEvent = "questGiverEvent", //Take character and quest, might check if the character has the quest already, if true -> update quest instead.
//     QuestUpdateEvent = "questUpdateEvent",
//     QuestCompleteEvent = "questCompleteEvent",

//     //Item events
//     ItemPickupEvent = "itemPickupEvent", //Take character and item, add item to character inventory
//     ItemShopEvent = "itemShopEvent", //Take character and shop, open shop interface, buy/sell items
// }