import { SimpleEventEmitter } from "./SimpleEventEmitter";

class Screamer {
  private yellStation: SimpleEventEmitter;

  constructor() {
    this.yellStation = new SimpleEventEmitter();
  }

  scream(event: string, payload: any) {
    this.yellStation.emit(event, payload);
  }

  listenToMe() {
    return this.yellStation;
  }
}

export const screamer = new Screamer();
