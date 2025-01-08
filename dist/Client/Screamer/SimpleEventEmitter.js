export class SimpleEventEmitter {
    constructor() {
        this.events = {};
    }
    /**
     * Register a listener for a specific event
     * @param event The name of the event
     * @param listener The callback function to be executed
     */
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    /**
     * Remove a specific listener for an event
     * @param event The name of the event
     * @param listener The callback function to be removed
     */
    off(event, listener) {
        if (!this.events[event])
            return;
        this.events[event] = this.events[event].filter(fn => fn !== listener);
    }
    /**
     * Emit an event with optional data
     * @param event The name of the event
     * @param args Data to pass to the listeners
     */
    emit(event, ...args) {
        if (!this.events[event])
            return;
        this.events[event].forEach(listener => listener(...args));
    }
    /**
     * Remove all listeners for a specific event or all events
     * @param event Optional: The name of the event
     */
    removeAllListeners(event) {
        if (event) {
            delete this.events[event];
        }
        else {
            this.events = {};
        }
    }
}
