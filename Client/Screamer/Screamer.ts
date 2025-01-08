import { SimpleEventEmitter } from "../../Client/Screamer/SimpleEventEmitter.js"

class Screamer {
    private yellStation: SimpleEventEmitter;

    constructor() {
        this.yellStation = new SimpleEventEmitter();
    }

    scream(event: string, payload: any) {
        console.log(`Screamer is screaming ${event} with payload:`, payload);
        this.yellStation.emit(event, payload);
    }

    listenToMe() {
        return this.yellStation;
    }

}

export const screamer = new Screamer();

