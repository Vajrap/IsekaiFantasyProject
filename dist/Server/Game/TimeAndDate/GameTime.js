import { DayOfWeek, TimeOfDay } from '../../../Common/DTOsEnumsInterfaces/TimeOfDay';
export class GameTime {
    // game: Game;
    static setGameTime(dayPassed, gameDateDay, gameDateHour, gameDateMonth, gameDateYear) {
        GameTime.dayPassed = dayPassed;
        GameTime.gameDateDay = gameDateDay;
        GameTime.gameDateHour = gameDateHour;
        GameTime.gameDateMonth = gameDateMonth;
        GameTime.gameDateYear = gameDateYear;
    }
    static getCurrentGameDate() {
        return {
            dayPassed: GameTime.dayPassed,
            gameDateDay: GameTime.gameDateDay,
            gameDateHour: GameTime.gameDateHour,
            gameDateMonth: GameTime.gameDateMonth,
            gameDateYear: GameTime.gameDateYear,
            phase: GameTime.getCurrentGamePhase()
        };
    }
    static getCurrentGamePhase() {
        const phases = [TimeOfDay.night, TimeOfDay.morning, TimeOfDay.afternoon, TimeOfDay.evening];
        return phases[(GameTime.gameDateHour - 1) % phases.length] || TimeOfDay.night;
    }
    static getCurrentGameDayOfWeek() {
        const days = [DayOfWeek.laoh, DayOfWeek.rowana, DayOfWeek.aftree, DayOfWeek.udur, DayOfWeek.matris, DayOfWeek.seethar];
        return days[(GameTime.gameDateDay - 1) % days.length];
    }
    static getCurrentGameSeason() {
        if (GameTime.gameDateMonth < 1 || GameTime.gameDateMonth > GameTime.inGameMonthsPerYear) {
            console.warn(`Unexpected gameDateMonth: ${GameTime.gameDateMonth}, defaulting to LongDark.`);
            return SeasonEnum.LongDark;
        }
        switch (GameTime.gameDateMonth) {
            case 1:
            case 2: return SeasonEnum.Seeding;
            case 3:
            case 4: return SeasonEnum.RainFall;
            case 5:
            case 6: return SeasonEnum.GreenTide;
            case 7:
            case 8: return SeasonEnum.HarvestMoon;
            case 9:
            case 10: return SeasonEnum.SunDry;
            case 11:
            case 12: return SeasonEnum.Frostveil;
            case 13:
            case 14: return SeasonEnum.LongDark;
            default: return SeasonEnum.LongDark;
        }
    }
}
GameTime.inGameHoursPerDay = 4; // 4 phases in a game day: morning, afternoon, evening, night => 15 min per phase, 1 hour per day
GameTime.inGameDaysPerMonth = 24; // 24 days in a game month => if we set 24 days per month, 1 month will be 1 real day, so if we separate in to week, 4 weeks per month, we should have 6 days per week; 6 days would go hand in hand with 6 firstborn gods!
GameTime.inGameMonthsPerYear = 14; // 14 months in a game year
GameTime.dayPassed = 0;
GameTime.gameDateDay = 1;
GameTime.gameDateHour = 1;
GameTime.gameDateMonth = 1;
GameTime.gameDateYear = 0;
GameTime.timerInterval = null;
export var SeasonEnum;
(function (SeasonEnum) {
    SeasonEnum["Seeding"] = "\u0E24\u0E14\u0E39\u0E2B\u0E27\u0E48\u0E32\u0E19";
    SeasonEnum["RainFall"] = "\u0E24\u0E14\u0E39\u0E1D\u0E19";
    SeasonEnum["GreenTide"] = "\u0E24\u0E14\u0E39\u0E43\u0E1A\u0E44\u0E21\u0E49\u0E1C\u0E25\u0E34";
    SeasonEnum["HarvestMoon"] = "\u0E24\u0E14\u0E39\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27";
    SeasonEnum["SunDry"] = "\u0E24\u0E14\u0E39\u0E23\u0E49\u0E2D\u0E19";
    SeasonEnum["Frostveil"] = "\u0E24\u0E14\u0E39\u0E2B\u0E19\u0E32\u0E27";
    SeasonEnum["LongDark"] = "\u0E24\u0E14\u0E39\u0E21\u0E37\u0E14";
})(SeasonEnum || (SeasonEnum = {}));
