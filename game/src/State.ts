import {Meteor} from "./views/Meteor";

const MAX_FUEL: number = 40;

// scoring, fuel, etc details from:
// http://www.gamesdatabase.org//Media/SYSTEM/Atari_2600/Manual/formated/Cosmic_Ark_-_1982_-_Imagic.pdf

export class State extends createjs.EventDispatcher {

    private static instance: State = null;

    // Allow shooting at meteors?
    allowShots: boolean;
    inSpace: boolean;

    paused: boolean;
    level: number;
    fuelLevel: number;
    score: number;

    static getInstance(): State {

        if (State.instance === null) {
            State.instance = new State();
            State.instance.reset();
        }

        return State.instance;
    }

    private constructor() {
        super();
    }

    meteorDestroyed(meteor: Meteor): void {

        this.score += meteor.wiggle ? 30 : 10;

        if (this.fuelLevel < MAX_FUEL)
            this.fuelLevel++;

        // TODO: Show score & fuel on screen and update them.
    }

    meteorHitShip(): void {

        let fuel: number = this.fuelLevel - 10;

        if (this.fuelLevel < 0)
            this.fuelLevel = 0;

        // TODO: Show score & fuel on screen and update them.
    }

    shotFiredAtMeteor(): void {

        if (this.fuelLevel > 0)
            this.fuelLevel--;
    }

    beastieCaptured(): void {

        let fuel: number = this.fuelLevel + 10;

        this.fuelLevel = fuel > MAX_FUEL ? MAX_FUEL : fuel;
    }

    planetCleared(warningGiven: boolean): void {

        this.score += 1000;

        if (warningGiven == false)
            this.fuelLevel = MAX_FUEL;

        // TODO: Show score & fuel on screen and update them.
    }

    reset(): void {
        this.allowShots = false;
        this.inSpace = true;
        this.paused = false;

        this.level = 0;
        this.fuelLevel = MAX_FUEL;
        this.score = 0;
    }

}