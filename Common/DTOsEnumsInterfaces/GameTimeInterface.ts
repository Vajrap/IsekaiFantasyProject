import { TimeOfDay } from "./TimeOfDay"

export interface GameTimeInterface {
    dayPassed: number,
    day: number,
    hour: number,
    month: number,
    year: number,
    phase: TimeOfDay
};