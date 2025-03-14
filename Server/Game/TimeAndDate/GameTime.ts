import { DayOfWeek, TimeOfDay } from '../../../Common/DTOsEnumsInterfaces/TimeOfDay';
import { GameTimeInterface } from '../../../Common/DTOsEnumsInterfaces/GameTimeInterface';
export class GameTime {
    static inGameHoursPerDay: number = 4; // 4 phases in a game day: morning, afternoon, evening, night => 15 min per phase, 1 hour per day
    static inGameDaysPerMonth: number = 24; // 24 days in a game month => if we set 24 days per month, 1 month will be 1 real day, so if we separate in to week, 4 weeks per month, we should have 6 days per week; 6 days would go hand in hand with 6 firstborn gods!
    static inGameMonthsPerYear: number = 14; // 14 months in a game year

    static dayPassed: number = 0;
    static gameDateDay: number = 1;
    static gameDateHour: number = 1;
    static gameDateMonth: number = 1;
    static gameDateYear: number = 0;
    static timerInterval: NodeJS.Timeout | null = null;
    // game: Game;

    static setGameTime(
        dayPassed: number,
        gameDateDay: number,
        gameDateHour: number,
        gameDateMonth: number,
        gameDateYear: number
    ) {
        GameTime.dayPassed = dayPassed;
        GameTime.gameDateDay = gameDateDay;
        GameTime.gameDateHour = gameDateHour;
        GameTime.gameDateMonth = gameDateMonth;
        GameTime.gameDateYear = gameDateYear;
    }

    static getCurrentGameDate(): GameTimeInterface {
        return {
            dayPassed: GameTime.dayPassed,
            gameDateDay: GameTime.gameDateDay,
            gameDateHour: GameTime.gameDateHour,
            gameDateMonth: GameTime.gameDateMonth,
            gameDateYear: GameTime.gameDateYear,
            phase: GameTime.getCurrentGamePhase()
        };
    }

    static getCurrentGamePhase(): TimeOfDay {
        const phases = [TimeOfDay.night, TimeOfDay.morning, TimeOfDay.afternoon, TimeOfDay.evening];
        return phases[(GameTime.gameDateHour - 1) % phases.length] || TimeOfDay.night;
    } 

    static getCurrentGameDayOfWeek(): DayOfWeek {
        const days = [DayOfWeek.laoh, DayOfWeek.rowana, DayOfWeek.aftree, DayOfWeek.udur, DayOfWeek.matris, DayOfWeek.seethar];
        return days[(GameTime.gameDateDay - 1) % days.length];
    }

    static getCurrentGameSeason(): SeasonEnum {
        if (GameTime.gameDateMonth < 1 || GameTime.gameDateMonth > GameTime.inGameMonthsPerYear) {
            console.warn(`Unexpected gameDateMonth: ${GameTime.gameDateMonth}, defaulting to LongDark.`);
            return SeasonEnum.LongDark;
        }

        switch (GameTime.gameDateMonth) {
            case 1: case 2: return SeasonEnum.Seeding;
            case 3: case 4: return SeasonEnum.RainFall;
            case 5: case 6: return SeasonEnum.GreenTide;
            case 7: case 8: return SeasonEnum.HarvestMoon;
            case 9: case 10: return SeasonEnum.SunDry;
            case 11: case 12: return SeasonEnum.Frostveil;
            case 13: case 14: return SeasonEnum.LongDark;
            default: return SeasonEnum.LongDark;
        }
    }
}

export enum SeasonEnum {
    Seeding = "ฤดูหว่าน",
    RainFall = "ฤดูฝน",
    GreenTide = "ฤดูใบไม้ผลิ",
    HarvestMoon = "ฤดูเกี่ยว",
    SunDry = "ฤดูร้อน",
    Frostveil = "ฤดูหนาว",
    LongDark = "ฤดูมืด",
}