export class SimpleEventEmitter {
    private events: { [key: string]: Function[] };

    constructor() {
        this.events = {};
    }

    /**
     * Register a listener for a specific event
     * @param event The name of the event
     * @param listener The callback function to be executed
     */
    on(event: string, listener: Function) {
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
    off(event: string, listener: Function) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(fn => fn !== listener);
    }

    /**
     * Emit an event with optional data
     * @param event The name of the event
     * @param args Data to pass to the listeners
     */
    async emit(event: string, ...args: any[]) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(...args));
    }

    /**
     * Remove all listeners for a specific event or all events
     * @param event Optional: The name of the event
     */
    removeAllListeners(event?: string) {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
    }
}