import { SimpleEventEmitter } from "./SimpleEventEmitter";

class Screamer {
    private yellStation: SimpleEventEmitter;

    constructor() {
        this.yellStation = new SimpleEventEmitter();
    }

    async scream(event: string, payload: any) {
        await this.yellStation.emit(event, payload);
    }

    listenToMe() {
        return this.yellStation;
    }

}

export const screamer = new Screamer();

