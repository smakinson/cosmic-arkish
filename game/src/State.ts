export class State extends createjs.EventDispatcher {

    private static instance: State = null;

    // Allow shooting at meteors?
    allowShots: boolean = false;
    inSpace: boolean = false;

    paused: boolean = false;
    level: number = 0;
    powerLevel: number = 100;
    score: number = 0;


    static getInstance(): State {

        if (State.instance === null) {
            State.instance = new State();
        }

        return State.instance;
    }

    private constructor() {
        super();
    }

}