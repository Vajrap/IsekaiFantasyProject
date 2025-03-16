import { LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { event_battle } from "./battleEvent";
import { event_rest_camp, event_rest_house, event_rest_inn_comfortable, event_rest_inn_luxury, event_rest_inn_poor, event_rest_inn_premium } from "./restEvents";
import { event_train } from "./trains";

export const eventRepository: { [key in LocationEventEnum]: Function } = {
    [LocationEventEnum.None]: () => { },
    [LocationEventEnum.BattleEvent]: event_battle,
    [LocationEventEnum.RestCamp]: event_rest_camp,
    [LocationEventEnum.RestHouse]: event_rest_house,
    [LocationEventEnum.RestInnPoor]: event_rest_inn_poor,
    [LocationEventEnum.RestInnComfortable]: event_rest_inn_comfortable,
    [LocationEventEnum.RestInnLuxury]: event_rest_inn_luxury,
    [LocationEventEnum.RestInnPremium]: event_rest_inn_premium,
    
    [LocationEventEnum.AttributeTrain]: event_train,
    [LocationEventEnum.ArtisanTrain]: event_train,
    [LocationEventEnum.ProficiencyTrain]: event_train,
    [LocationEventEnum.SkillTrain]: event_train,
}
