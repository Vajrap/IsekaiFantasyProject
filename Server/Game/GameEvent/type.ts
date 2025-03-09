import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { Character } from "../../Entities/Character/Character";
import { GameLocation } from "../../Entities/Location/GameLocation";
import { Party } from "../../Entities/Party/Party";
import { Skill } from "../../Entities/Skills/Skill";

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
    [LocationEventEnum.BattleEvent]: BattleEvent;
    [LocationEventEnum.StrollEvent]: StrollEvent;
    // Add all other event mappings here...
}


export { RestEvent, CampRestEvent, TrainEvent, SkillLearnEvent, RandomEvent, TravelEvent, BattleEvent, StrollEvent };
