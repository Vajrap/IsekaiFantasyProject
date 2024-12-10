export class GameTime {
    private inGameHoursPerDay: number = 4; // 4 phases in a game day: morning, afternoon, evening, night
    private inGameDaysPerMonth: number = 24; // 24 days in a game month
    private inGameMonthsPerYear: number = 14; // 14 months in a game year

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

    private setGameTime() {
        const totalDaysPassed = this.dayPassed;
        const totalMonthsPassed = Math.floor(totalDaysPassed / this.inGameDaysPerMonth);
        const totalYearsPassed = Math.floor(totalMonthsPassed / this.inGameMonthsPerYear);

        this.gameDateYear = totalYearsPassed;
        this.gameDateMonth = (totalMonthsPassed % this.inGameMonthsPerYear) + 1; // Months are 1-indexed
        this.gameDateDay = (totalDaysPassed % this.inGameDaysPerMonth) + 1; // Days are 1-indexed
        this.gameDateHour = 1; // Initialize to start of day (1 for morning)
    }

    getCurrentGameDate(): { dayPassed: number, day: number, hour: number, month: number, year: number } {
        return {
            dayPassed: this.dayPassed,
            day: this.gameDateDay,
            hour: this.gameDateHour,
            month: this.gameDateMonth,
            year: this.gameDateYear
        };
    }

    getCurrentGamePhase(): string {
        const phases = ['morning', 'afternoon', 'evening', 'night'];
        return phases[this.gameDateHour - 1]; // Adjusting for 0-indexed array
    }

    startTiming() {
        console.log('Game Time Started')
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            this.gameDateHour += 1;

            if (this.gameDateHour > this.inGameHoursPerDay) {
                this.dayPassed += 1;
                this.gameDateHour = 1;
                this.gameDateDay += 1;
            }

            if (this.gameDateDay > this.inGameDaysPerMonth) {
                this.gameDateDay = 1;
                this.gameDateMonth += 1;
            }

            if (this.gameDateMonth > this.inGameMonthsPerYear) {
                this.gameDateMonth = 1;
                this.gameDateYear += 1;
            }

            console.log(`Game Time Updated: ${this.getCurrentGameDate().year}-${this.getCurrentGameDate().month}-${this.getCurrentGameDate().day} ${this.getCurrentGamePhase()}`);

            // Trigger travel updates
            // this.game.parties.forEach(party => {
            //     if (party.isTravelling) {
            //         const playerCharacter = party.getPlayerCharacter();
            //         party.travelManager.travel(playerCharacter.status, party.travelManager.currentTravelMethod);
            //     }
            // });
            
            // this.game.broadCastGameTime();
        }, 1000 * 60 * 15); // 15 minutes in milliseconds
        // }, 1000); // 1 second in milliseconds used for testing only.
    }

    stopTiming() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
}
