/**
 * The EventEmitter class implements the PubSub pattern to make possible loose coupling of
 * the Todo List components.
 */
export class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Adds a new observer (subscriber) to a given event. Each event can store multiple observers.
     * @param {string} event - a custom event
     * @param {function} callback - a subscriber function
     */
    on(event, callback) {
        if (this.events[event] === undefined) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    /**
     * Emits a new event with the given payload. Any subscribers that are interested in this event
     * are getting invoked.
     * @param {string} event - a custom event
     * @param {any} payload - the data to be used by the subscribers
     */
    emit(event, payload) {
        if (this.events[event] === undefined) {
            this.events[event] = [];
        } else {
            this.events[event].forEach(callback => callback(payload));
        }
    }
}
