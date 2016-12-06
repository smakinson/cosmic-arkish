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

    private _beastFrameNumber: number;  // Frame numbers are 0 based.
    get beastFrameNumber():number{
        return this._beastFrameNumber;
    }

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

        // The original lets me have 5 ships if I just let the meteors hit me till its game over.
        // So it must be letting the fuel go under 0 to mean game over.
        if (fuel < -1)
            fuel = -1;

        this.fuelLevel = fuel;

        // TODO: Show score & fuel on screen and update them.
    }

    nextLevel(): void {

        // The planet beasts change every other level.
        if (this.level % 2 == 0) {
            // Frame numbers are 0 based.
            this._beastFrameNumber++;

        }

        this.level++;
    }

    shotFiredAtMeteor(): void {

        // The original lets me have 5 ships if I just let the meteors hit me till its game over.
        // So it must be letting the fuel go under 0 to mean game over.
        if (this.fuelLevel > -1)
            this.fuelLevel--;
    }

    beastieCaptured(): void {

        let fuel: number = this.fuelLevel + 10;

        this.fuelLevel = fuel > MAX_FUEL ? MAX_FUEL : fuel;
    }

    saucerHit(): void {
        // TODO: Determine how much fuel is lost. etc
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
        this._beastFrameNumber = -1;
    }

}