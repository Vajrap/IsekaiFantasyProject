export class TimeTracker {
    serverStartTime: number;
    gameTime: number;

    constructor(gameTime: number) {
        this.serverStartTime = Date.now();
        this.gameTime = gameTime;
    }

    currentTime(): number {
        return Date.now();
    }

    gameTimeSinceServerStart(): number {
        return this.gameTime - this.serverStartTime;
    }
}