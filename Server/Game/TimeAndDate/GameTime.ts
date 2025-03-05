import { DayOfWeek, TimeOfDay } from '../../../Common/DTOsEnumsInterfaces/TimeOfDay';
import { GameTimeInterface } from '../../../Common/DTOsEnumsInterfaces/GameTimeInterface';
export class GameTime {
    inGameHoursPerDay: number = 4; // 4 phases in a game day: morning, afternoon, evening, night => 15 min per phase, 1 hour per day
    inGameDaysPerMonth: number = 24; // 24 days in a game month => if we set 24 days per month, 1 month will be 1 real day, so if we separate in to week, 4 weeks per month, we should have 6 days per week; 6 days would go hand in hand with 6 firstborn gods!
    inGameMonthsPerYear: number = 14; // 14 months in a game year

    dayPassed: number;
    gameDateDay: number = 1; // 1-indexed
    gameDateHour: number = 1; // 1-indexed
    gameDateMonth: number = 1; // 1-indexed
    gameDateYear: number = 0;
    timerInterval: NodeJS.Timeout | null = null;
    // game: Game;

    constructor(dayPassed: number) {
        this.dayPassed = dayPassed;
        this.setGameTime();
    }

    setGameTime() {
        const totalDaysPassed = this.dayPassed;
        const totalMonthsPassed = Math.floor(totalDaysPassed / this.inGameDaysPerMonth);
        const totalYearsPassed = Math.floor(totalMonthsPassed / this.inGameMonthsPerYear);

        this.gameDateYear = totalYearsPassed;
        this.gameDateMonth = (totalMonthsPassed % this.inGameMonthsPerYear) + 1; // Months are 1-indexed
        this.gameDateDay = (totalDaysPassed % this.inGameDaysPerMonth) + 1; // Days are 1-indexed
        this.gameDateHour = 1; // Initialize to start of day (1 for morning)
    }

    getCurrentGameDate(): GameTimeInterface {
        return {
            dayPassed: this.dayPassed,
            day: this.gameDateDay,
            hour: this.gameDateHour,
            month: this.gameDateMonth,
            year: this.gameDateYear,
            phase: this.getCurrentGamePhase()
        };
    }

    getCurrentGamePhase(): TimeOfDay {
        const phases = [TimeOfDay.night, TimeOfDay.morning, TimeOfDay.afternoon, TimeOfDay.evening];
        return phases[this.gameDateHour - 1]; // Adjusting for 0-indexed array
    } 

    getCurrentGameDayOfWeek(): DayOfWeek {
        const days = [DayOfWeek.laoh, DayOfWeek.rowana, DayOfWeek.aftree, DayOfWeek.udur, DayOfWeek.matris, DayOfWeek.seethar];
        return days[this.gameDateDay % 6]; // Adjusting for 0-indexed array
    }
}
