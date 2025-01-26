import { SimpleEventEmitter } from "./SimpleEventEmitter";

class Screamer {
    private yellStation: SimpleEventEmitter;

    constructor() {
        this.yellStation = new SimpleEventEmitter();
    }

    async scream(event: string, payload: any) {
        // TODO: Remove log later
        console.log(`Screamer is screaming ${event} with payload:`, payload);
        await this.yellStation.emit(event, payload);
    }

    listenToMe() {
        return this.yellStation;
    }

}

export const screamer = new Screamer();

