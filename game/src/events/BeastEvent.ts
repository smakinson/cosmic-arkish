import {Beast} from "../views/Beast";

export class BeastEvent extends createjs.Event {

    static CAPTURED: string = 'events.BeastEvent.beastCaptured';

    beast: Beast;

    constructor(type: string, beast: Beast, bubbles?: boolean, cancelable?: boolean) {
        super(type, bubbles, cancelable);

        this.beast = beast;
    }

    clone(): BeastEvent {
        return new BeastEvent(this.type, this.beast, this.bubbles, this.cancelable);
    }
}