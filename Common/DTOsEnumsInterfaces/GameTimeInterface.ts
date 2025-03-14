import { TimeOfDay } from "./TimeOfDay"

export interface GameTimeInterface {
    dayPassed: number,
    gameDateDay: number,
    gameDateHour: number,
    gameDateMonth: number,
    gameDateYear: number,
    phase: TimeOfDay
};