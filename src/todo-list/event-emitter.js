export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, func) {
        if (this.events[event] === undefined) {
            this.events[event] = [];
        }
        this.events[event].push(func);
        // console.log(this.events);
    }

    emit(event, payload) {
        this.events[event].forEach(callback => callback(payload));
    }
}
