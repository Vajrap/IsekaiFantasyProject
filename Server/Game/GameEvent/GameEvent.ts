import { Internal } from "../../Entities/Internal/Internal";
import { Skill } from "../../Entities/Skills/Skill";
import { Dice } from "../../Utility/Dice";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { Character } from "../../Entities/Character/Character";
import { Party } from "../../Entities/Party/Party";
import { GameLocation } from "../../Entities/Location/GameLocation";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { screamer } from "../../Utility/Screamer/Screamer";

export class GameEvent<T extends keyof GameEventParams> {
    name: T;
    execute: (params: GameEventParams[T]) => Promise<any>;
    
    constructor(
        name: T,
        execute: (params: GameEventParams[T]) => Promise<any>
    ) {
        this.name = name;
        this.execute = execute;
    }
    
    async executeWithParams(params: GameEventParams[T]): Promise<any> {
        return await this.execute(params);
    }
}

enum EventType {
    //Random event
    RanomEvent = "randomEvent", //Not sure if this is needed yet

    //Resting events
    RestEvent = "rest", //Resting only take 1 argument, the party
    InnRest = "innRest", //InnResting only take 1 argument, the party
    HouseRest = "houseRest", //HouseResting only take 1 argument, the party
    CampRest = "campRest", //CampResting take 2 arguments, the party and a boolean to determine if the party use item to rest

    //Training events
    AttributeTrain = "attributeTrain", //Attribute training take 2 arguments, the actor and the attribute to train
    ArtisanTrain = "artisanTrain", //Artisan training take 2 arguments, the actor and the artisan to train
    ProficiencyTrain = "proficiencyTrain", //Proficiency training take 2 arguments, the actor and the proficiency to train
    SkillTrain = "skillTrain", //Skill training take 2 arguments, the actor and the skill to train
    InternalSkillTrain = "internalSkillTrain", //Internal skill training take 2 arguments, the actor and the internal skill to train

    //Learning events
    SkillLearn = "skillLearn", //Skill learning take 2 arguments, the actor and the skill to learn
    InternalSkillLearn = "internalSkillLearn", //Internal skill learning take 2 arguments, the actor and the internal skill to learn

    //Explorations and Travel events
    StrollEvent = "strollEvent", //Stroll event take 3 arguments, the party, the player, and the event() -> {} to execute, maybe about gaining insight or call a check to call for another event

    //Combat events
    BattleEvent = "battleEvent", //Start combat, take party and pre-defined enemy party (needed implementation)

    //Dialogue events
    DialogueEvent = "dialogueEvent", //Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome

    //Quest events
    QuestGiverEvent = "questGiverEvent", //Take character and quest, might check if the character has the quest already, if true -> update quest instead.
    QuestUpdateEvent = "questUpdateEvent",
    QuestCompleteEvent = "questCompleteEvent",

    //Item events
    ItemPickupEvent = "itemPickupEvent", //Take character and item, add item to character inventory
    ItemShopEvent = "itemShopEvent", //Take character and shop, open shop interface, buy/sell items
}

type RandomEvent = {
    party: Party;
    actor: Character;
}

type RestEvent = {
    party: Party;
}

type CampRestEvent = {
    party: Party;
    useItem: boolean;
}

type TrainEvent = {
    actor: Character;
    trainTarget: CharacterStatusEnum;
    bonusTrainingExp?: number;
}

type SkillLearnEvent = {
    actor: Character;
    skillToLearn: Skill;
}

type InternalSkillLearnEvent = {
    actor: Character;
    internalToLearn: Internal;
}

type TravelEvent = {
    party: Party;
    player: Character;
    startingLocation: GameLocation;
    destination: GameLocation;
}

type StrollEvent = {
    party: Party;
    player: Character;
    event: RandomEvent;
}

type BattleEvent = {
    party: Party;
    enemyParty: Party;
    location: LocationName;
}


//These events are not include the random events chance, these are the base events themselves.
const gameEvent_rest = new GameEvent<LocationEventEnum.RestEvent>(
    LocationEventEnum.RestEvent, 
    async ({ party }) => {
        if (party === undefined || party === null) { throw new Error("Party is undefined"); }

        for (const character of party.characters) {
            if (character === undefined || character === null || character === 'none') {
                continue;
            }
            character.hpUp(character.maxHP()! * (Dice.rollTwenty() / 15) + character.getModifier(CharacterStatusEnum.vitality));
            character.mpUp(character.maxMP()! * (Dice.rollTwenty() / 15) + character.getModifier(CharacterStatusEnum.intelligence));
            character.spUp(character.maxSP()! * (Dice.rollTwenty() / 15) + character.getModifier(CharacterStatusEnum.endurance));
            character.moodUp(Math.max(Math.floor(
                (Dice.rollTwenty()) + (character.attribute('willpower')/2)), 0) + 10
            );
            character.energyUp(Math.max(Math.floor(
                (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 50
            );
        }

        return true;
    }
);

const gameEvent_innRest = new GameEvent<LocationEventEnum.InnRest>(
    LocationEventEnum.InnRest,
    async ({ party }) => {
        if (party === undefined || party === null) { throw new Error("Party is undefined"); }
        
        for (const character of party.characters) {
            if (character === undefined || character === null || character === 'none') {
                continue;
            }
            character.hpUp((character.maxHP()! * (Dice.rollTwenty() / 10)) + character.getModifier(CharacterStatusEnum.vitality));
            character.mpUp((character.maxMP()! * (Dice.rollTwenty() / 10)) + character.getModifier(CharacterStatusEnum.intelligence));
            character.spUp((character.maxSP()! * (Dice.rollTwenty() / 10)) + character.getModifier(CharacterStatusEnum.endurance));
            character.moodUp(Math.max(Math.floor(
                (Dice.rollTwenty()/5) + (character.attribute('willpower')/2)), 0) + 25
            );
            character.energyUp(Math.max(Math.floor(
                (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 65
            );
        }

        return true;
    }
);

const gameEvent_houseRest = new GameEvent<LocationEventEnum.HouseRest>(
    LocationEventEnum.HouseRest,
    async ({ party }) => {
        if (party === undefined || party === null) { throw new Error("Party is undefined"); }

        for (const character of party.characters) {
            if (character === undefined || character === null || character === 'none') {
                continue;
            }
            character.hpUp((character.maxHP()! * (Dice.rollTwenty() / 5)) + character.getModifier(CharacterStatusEnum.vitality));
            character.mpUp((character.maxMP()! * (Dice.rollTwenty() / 5)) + character.getModifier(CharacterStatusEnum.intelligence));
            character.spUp((character.maxSP()! * (Dice.rollTwenty() / 5)) + character.getModifier(CharacterStatusEnum.endurance));
            character.moodUp(Math.max(Math.floor(
                (Dice.rollTwenty()/5) + (character.attribute('willpower')/2)), 0) + 30
            );
            character.energyUp(Math.max(Math.floor(
                (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 70
            );
        }

        return true;
    }
);

const gameEvent_campRest = new GameEvent<LocationEventEnum.CampRest>(
    LocationEventEnum.CampRest,
    async ({ party, useItem }) => {
        if (party === undefined || party === null) { throw new Error("Party is undefined"); }
        if (useItem === undefined || useItem === null) { throw new Error("Need to assign useItem value to campRest"); }

        for (const character of party.characters) {
            if (character === undefined || character === null || character === 'none') {
                continue;
            }
            character.hpUp((character.maxHP()! * (Dice.rollTwenty() / (useItem ? 20 : 15))) + character.getModifier(CharacterStatusEnum.vitality));
            character.mpUp((character.maxMP()! * (Dice.rollTwenty() / (useItem ? 20 : 15))) + character.getModifier(CharacterStatusEnum.intelligence));
            character.spUp((character.maxSP()! * (Dice.rollTwenty() / (useItem ? 20 : 15))) + character.getModifier(CharacterStatusEnum.endurance));
            character.moodUp(Math.max(Math.floor(
                (Dice.rollTwenty()/5) + (character.attribute('willpower')/2)), 0) + 15
            );
            character.energyUp(Math.max(Math.floor(
                (Dice.rollTwenty()/5) + (character.attribute('vitality')/2)),0) + 55
            );
        }

        return true;
    }
);

const gameEvent_attributeTrain = new GameEvent<LocationEventEnum.AttributeTrain>(
    LocationEventEnum.AttributeTrain,
    async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
        if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
        if (trainTarget === undefined || trainTarget === null) { throw new Error("AttributeName is undefined, needed to verify the attribute trained"); }

        const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
        const learningDice = Dice.rollTwenty();
        const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

        actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);
        
        return true;
    }
);

const gameEvent_artisanTrain = new GameEvent<LocationEventEnum.ArtisanTrain>(
    LocationEventEnum.ArtisanTrain,
    async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
        if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
        if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the artisan trained"); }
        
        const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
        const learningDice = Dice.rollTwenty();
        const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

        actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);

        return true;
    }
);

const gameEvent_proficiencyTrain = new GameEvent<LocationEventEnum.ProficiencyTrain>(
    LocationEventEnum.ProficiencyTrain,
    async ({ actor, trainTarget, bonusTrainingExp = 1}) => {
        if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
        if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the proficiency trained"); }
        
        const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
        const learningDice = Dice.rollTwenty();
        const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

        actor.train(CharacterStatusEnum[trainTarget], trainingExpGain);

        return true;
    }
);

const gameEvent_skillTrain = new GameEvent<LocationEventEnum.SkillTrain>(
    LocationEventEnum.SkillTrain,
    async ({ actor, trainTarget, bonusTrainingExp = 1 }) => {
        if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
        if (trainTarget === undefined || trainTarget === null) { throw new Error("ExtraArgForString is undefined, needed to verify the skill trained"); }
        
        const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
        const learningDice = Dice.rollTwenty();
        const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

        const skill = actor.skills.find(skill => skill.skill.id === trainTarget);
        if (skill === undefined || skill === null) { throw new Error("Skill is undefined"); }

        actor.trainSkill(skill.skill.id, trainingExpGain);   

        actor.skills

        return true;
    }
)

const gameEvent_skillLearn = new GameEvent<LocationEventEnum.SkillLearn>(
    LocationEventEnum.SkillLearn,
    async ({ actor, skillToLearn }) => {
        if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
        if (skillToLearn === undefined || skillToLearn === null) { throw new Error("Skill is undefined"); }
        
        return actor.learnSkill(skillToLearn.id);
    }
)

const gameEvent_battleEvent = new GameEvent<LocationEventEnum.BattleEvent>(
    LocationEventEnum.BattleEvent,
    async ({ party, enemyParty, location }) => { 
        try {
            await screamer.scream(
                'START_BATTLE_EVENT',
                {
                    party: party,
                    enemyParty: enemyParty,
                    location: location,
                }
            )
            // TODO: This means the screamer needed to return battle result, long way to go.
        } catch (error) {
            console.error(error);
            return false;
        }
    }
)

export { RestEvent, CampRestEvent, TrainEvent, SkillLearnEvent, InternalSkillLearnEvent, EventType, RandomEvent, TravelEvent, BattleEvent };
export { gameEvent_rest, gameEvent_innRest, gameEvent_houseRest, gameEvent_campRest, gameEvent_attributeTrain, gameEvent_artisanTrain, gameEvent_proficiencyTrain, gameEvent_skillTrain, gameEvent_skillLearn, gameEvent_battleEvent };

export const gameEvents = [
    gameEvent_rest, gameEvent_innRest, gameEvent_houseRest, gameEvent_campRest, gameEvent_attributeTrain, gameEvent_artisanTrain, gameEvent_proficiencyTrain, gameEvent_skillTrain, gameEvent_skillLearn, gameEvent_battleEvent
]

export interface GameEventParams {
    [LocationEventEnum.RestEvent]: RestEvent;
    [LocationEventEnum.CampRest]: CampRestEvent;
    [LocationEventEnum.InnRest]: RestEvent;
    [LocationEventEnum.HouseRest]: RestEvent;
    [LocationEventEnum.AttributeTrain]: TrainEvent;
    [LocationEventEnum.ArtisanTrain]: TrainEvent;
    [LocationEventEnum.ProficiencyTrain]: TrainEvent;
    [LocationEventEnum.SkillTrain]: TrainEvent;
    [LocationEventEnum.SkillLearn]: SkillLearnEvent;
    [LocationEventEnum.InternalSkillLearn]: InternalSkillLearnEvent;
    [LocationEventEnum.BattleEvent]: BattleEvent;
    [LocationEventEnum.StrollEvent]: StrollEvent;
    // Add all other event mappings here...
}
