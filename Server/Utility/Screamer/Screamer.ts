import { SimpleEventEmitter } from "./SimpleEventEmitter";

class Screamer {
    private yellStation: SimpleEventEmitter;

    constructor() {
        this.yellStation = new SimpleEventEmitter();
    }

    scream(event: string, payload: any) {
        // TODO: Remove log later
        console.log(`Screamer is screaming ${event} with payload:`, payload);
        this.yellStation.emit(event, payload);
    }

    listenToMe() {
        return this.yellStation;
    }

}

export const screamer = new Screamer();

