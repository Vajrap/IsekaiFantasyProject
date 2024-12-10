export class StoryFlags {
    //the flags that are used to determine if the player has already started (or completed) an event.
    finishedStartingEvent: boolean;
    constructor(){
        this.finishedStartingEvent = false;
    }
}