import { LocationEventEnum } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { event_battle } from "./battleEvent";
import { event_skill_learn } from "./skillEvents";
import {
  event_rest_camp,
  event_rest_house,
  event_rest_inn_comfortable,
  event_rest_inn_luxury,
  event_rest_inn_poor,
  event_rest_inn_premium,
} from "./restEvents";
import { event_train } from "./trains";

// Now EventRepostiry is just a dictionary.
// We don't need to export them anymore, used only for checking.
const eventRepository: { [key in LocationEventEnum]: Function } = {
  [LocationEventEnum.None]: () => { },
  [LocationEventEnum.BattleEvent]: event_battle,
  [LocationEventEnum.RestCamp]: event_rest_camp,
  [LocationEventEnum.RestHouse]: event_rest_house,
  [LocationEventEnum.RestInnPoor]: event_rest_inn_poor,
  [LocationEventEnum.RestInnComfortable]: event_rest_inn_comfortable,
  [LocationEventEnum.RestInnLuxury]: event_rest_inn_luxury,
  [LocationEventEnum.RestInnPremium]: event_rest_inn_premium,
  [LocationEventEnum.TrainAttribute]: event_train,
  [LocationEventEnum.TrainProficiency]: event_train,
  [LocationEventEnum.TrainArtisan]: event_train,
  [LocationEventEnum.SkillTrain]: event_battle,
  [LocationEventEnum.SkillLearn]: event_skill_learn,
  [LocationEventEnum.Craft]: () => { },
};
