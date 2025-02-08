import { SimpleEventEmitter } from "../../Client/Screamer/SimpleEventEmitter.js";
class Screamer {
    constructor() {
        this.yellStation = new SimpleEventEmitter();
    }
    scream(event, payload) {
        // TODO: Remove log later
        this.yellStation.emit(event, payload);
    }
    listenToMe() {
        return this.yellStation;
    }
}
export const screamer = new Screamer();
