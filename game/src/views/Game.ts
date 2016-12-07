import {Ship} from "./Ship";
import {Meteor} from "./Meteor";
import Container = createjs.Container;
import {PlayerInput} from "../io/PlayerInput";
import {Shot} from "./Shot";
import {State} from "../State";
import {Planet, WARN_COMPLETE_EVENT, ALL_BEASTS_CAPTURED_EVENT} from "./Planet";

export enum Sides { Right, Left, Bottom, Top, None }

export const CANVAS_WIDTH: number = 1280;
export const CANVAS_HEIGHT: number = 800;
export const CANVAS_CENTER_X: number = CANVAS_WIDTH * .5;
export const CANVAS_CENTER_Y: number = CANVAS_HEIGHT * .5;

const SHIP_SPEED: number = .8;
const SHIP_REST_Y: number = CANVAS_CENTER_Y - 60;

const LABEL_METEOR: string = "meteor";
const LABEL_SHOT_ALL_METEORS: string = "shotAllMeteors";

const MIN_NUM_METEORS: number = 8;
const MAX_NUM_METEORS: number = 30;
const MAX_WAVERING_METEORS: number = 8;

export class Game extends lib.Game {

    name: string = 'Game';  // This is just to give a name for console logs of Game.

    private gameTimeline: TimelineMax;

    // Layers
    private meteorLayer: Container;
    private meteors: Array<Meteor> = [];

    private shotsLayer: Container;
    private shots: Array<Shot> = [];

    private planetLayer: Container;
    private planet: Planet;

    // The meteor heading towards the ship.
    private currentMeteor: Meteor = null;
    private numMeteorsShot: number = 0;

    private ship: Ship;
    private shipIsNew: boolean = true;

    private numMeteorsToGenerate: number = MIN_NUM_METEORS;
    private numWaveringMeteorsToGenerate: number = 0;
    private numWaveringMeteorsRemaining: number = 0;

    private planetWarnCompleteListener: Function;
    private allBeastsCapturedListener: Function;
    private tickerListener: Function;

    private playerInput: PlayerInput = PlayerInput.getInstance();
    private state: State = State.getInstance();

    constructor() {
        super();

        this.createGameTimeline();

        this.meteorLayer = new Container();
        this.shotsLayer = new Container();
        this.planetLayer = new Container();

        // Add the layers in the desired stacking order.
        this.addChild(this.shotsLayer);
        this.addChild(this.meteorLayer);
        this.addChild(this.planetLayer);
    }

    destroy(): void {

        this.clearSky();

        if (this.tickerListener) {
            createjs.Ticker.off('tick', this.tickerListener);
            this.tickerListener = null;
        }

        this.destroyPlanet();
        this.destroyShip();

        // TODO: Anything else to destroy?

    }

    private continueGame(): void {
        this.createShip();
        this.gotoSpaceScene();
    }

    private createGameTimeline(): void {
        if (this.gameTimeline) {
            this.gameTimeline.kill();
            this.gameTimeline.clear();
        }
        this.gameTimeline = new TimelineMax({});
    }

    private destroyPlanet(): void {
        this.planet.off(WARN_COMPLETE_EVENT, this.planetWarnCompleteListener);
        this.planet.off(ALL_BEASTS_CAPTURED_EVENT, this.allBeastsCapturedListener);

        this.planet.destroy();
    }

    private nextLevel(): void {
        this.state.nextLevel();
        this.planet.nextLevel();

        this.numMeteorsToGenerate += this.numMeteorsToGenerate >= MAX_NUM_METEORS ? 0 : 1;

        // Calculate the number of wavering meteors for the wave.
        this.numWaveringMeteorsToGenerate += this.numWaveringMeteorsToGenerate >= MAX_WAVERING_METEORS ? 0 : 1;
    }

    private createPlanet(): void {
        this.planet = new Planet();
        this.planetWarnCompleteListener = this.planet.on(WARN_COMPLETE_EVENT, this.handlePlanetWarnComplete, this);
        this.allBeastsCapturedListener = this.planet.on(ALL_BEASTS_CAPTURED_EVENT, this.handleAllBeastsCaptured, this);
    }

    private createShip(): void {
        this.shipIsNew = true;

        this.ship = new Ship();
        this.ship.x = CANVAS_CENTER_X;
        this.ship.y = -this.ship.getHeight() - 5;
        this.addChild(this.ship);
    }

    private destroyShip(): void {
        this.ship.destroy();
    }

    run(): void {
        this.createShip();
        this.createPlanet();

        this.nextLevel();
        this.gotoSpaceScene();

        this.tickerListener = createjs.Ticker.on('tick', this.handleGameTick, this);
    }

    pause(): void {
        this.state.paused = true;
        this.gameTimeline.pause();
        this.planet.pause();
    }

    resume(): void {
        this.state.paused = false;
        this.gameTimeline.resume();
        this.planet.resume();
    }

    private handleGameTick(): void {

        if (this.state.paused)return;

        if (this.ship && this.ship.destroyed == false) {

            let meteorHitShip: boolean = false;

            this.handleSpacePlayerInput();

            for (let meteor of this.meteors) {

                // Meteor hit ship?
                switch (meteor.side) {
                    case Sides.Top:
                        if (meteor.y > this.ship.y + this.ship.topEdgeDistance + 14) {
                            this.destroyMeteor(meteor);
                            meteorHitShip = true;
                        }
                        break;
                    case Sides.Right:
                        if (meteor.x < this.ship.x + this.ship.getWidth() * .5 - 11) {
                            this.destroyMeteor(meteor);
                            meteorHitShip = true;
                        }
                        break;
                    case Sides.Bottom:
                        if (meteor.y < this.ship.y + this.ship.bottomDistance - 11) {
                            this.destroyMeteor(meteor);
                            meteorHitShip = true;
                        }
                        break;
                    case Sides.Left:
                        if (meteor.x > this.ship.x - this.ship.getWidth() * .5 + 11) {
                            this.destroyMeteor(meteor);
                            meteorHitShip = true;
                        }
                        break;
                }

                if (meteorHitShip) {

                    this.state.meteorHitShip();

                    this.clearSky();

                    // Play ship explosion and move on.
                    this.gameTimeline.add(this.ship.destroy());
                    this.gameTimeline.call(this.handleShipDestroyed, null, this);

                    break;
                }
            }

            // Shot hit meteor?
            for (let shot of this.shots) {

                if (this.currentMeteor == null)break;

                let shotHitMeteor: boolean = false;

                // TODO: Can miss wiggling meteor?

                switch (this.currentMeteor.side) {
                    case Sides.Top:
                        if (shot.y <= this.currentMeteor.y) {
                            shotHitMeteor = true;
                        }
                        break;
                    case Sides.Right:
                        if (shot.x >= this.currentMeteor.x) {
                            shotHitMeteor = true;
                        }
                        break;
                    case Sides.Bottom:
                        if (shot.y >= this.currentMeteor.y) {
                            shotHitMeteor = true;
                        }
                        break;
                    case Sides.Left:
                        if (shot.x <= this.currentMeteor.x) {
                            shotHitMeteor = true;
                        }
                        break;
                }

                if (shotHitMeteor) {

                    this.numMeteorsShot++;

                    // Increase score, etc.
                    this.state.meteorDestroyed(this.currentMeteor);

                    this.destroyMeteor(this.currentMeteor);
                    this.currentMeteor = null;

                    this.destroyShot(shot);

                    this.jumpToNextMeteor();

                    // TODO: Play a sound?
                }

            }
        }
    }

    private handlePlanetWarnComplete(): void {
        // Only one meteor when on the planet.
        this.generateMeteors(1);
    }

    private handleAllBeastsCaptured(): void {
        this.leavePlanetScene();
    }

    private handleSpacePlayerInput(): void {

        let direction: number = this.playerInput.getDirection();

        if (this.state.allowShots && direction != Sides.None) {

            if (this.state.inSpace || this.planet.saucerDocked) {

                // If on the planet and the saucer is docked.
                if (this.state.inSpace == false && this.planet.saucerDocked) {
                    // Can not shoot down in this scenario.
                    if (direction == Sides.Bottom)
                        return;
                }

                let shot: Shot = new Shot(direction);
                let position: { x: number, y: number };

                switch (direction) {
                    case Sides.Top:
                        position = { x: CANVAS_CENTER_X, y: this.ship.y + this.ship.topEdgeDistance };
                        break;
                    case Sides.Right:
                        position = { x: this.ship.x, y: this.ship.y };
                        break;
                    case Sides.Bottom:
                        position = { x: CANVAS_CENTER_X, y: this.ship.y + this.ship.bottomDistance };
                        break;
                    case Sides.Left:
                        position = { x: this.ship.x, y: this.ship.y };
                        break;
                }

                shot.set(position);
                this.shotsLayer.addChild(shot);

                this.shots.push(shot);

                this.gameTimeline.add(shot.fire(), this.gameTimeline.time());

                this.state.shotFiredAtMeteor();
            }
        }
    }

    private destroyMeteor(meteor: Meteor): void {

        //this.gameTimeline.remove(meteor.tween);

        // Remove it from the lists.

        let index = this.meteors.indexOf(meteor, 0);
        if (index > -1) {
            this.meteors.splice(index, 1);
        }

        if (this.meteorLayer.contains(meteor)) {
            this.meteorLayer.removeChild(meteor);
        }
    }

    private destroyShot(shot: Shot): void {

        // Remove it from the lists.

        let index = this.shots.indexOf(shot, 0);
        if (index > -1) {
            this.shots.splice(index, 1);
        }

        if (this.shotsLayer.contains(shot)) {
            this.shotsLayer.removeChild(shot);
        }
    }

    private jumpToNextMeteor(): void {
        //console.log('NEXT METEOR!');
        if (this.meteors.length > 0) {
            this.gameTimeline.seek(this.meteors[0].label);
        } else {
            // No more meteors, yay!
            if (this.state.inSpace) {
                this.leaveSpaceScene();
            } else {
                this.leavePlanetScene();
            }
        }
    }

    private handleShipDestroyed(): void {

        console.log('Ship Destroyed! Fuel left:', this.state.fuelLevel);

        this.state.allowShots = false;

        if (this.contains(this.ship)) {
            this.removeChild(this.ship);
        }

        // The original lets me have 5 ships if I just let the meteors hit me till its game over.
        // So it must be letting the fuel hit 0 and play once more.
        if (this.state.fuelLevel < 0) {
            this.gameOver();
        } else {
            this.continueGame();
        }
    }

    private gameOver(): void {

        console.log('GAME OVER!');

        this.clearSky();

        this.destroyPlanet();
        this.destroyShip();

        if (this.tickerListener) {
            createjs.Ticker.off('tick', this.tickerListener);
            this.tickerListener = null;
        }

        this.gotoEndingScene();
    }

    private gotoEndingScene(): void {
        // TODO: Play ending scene

        // TODO: Make a play again option and reset the game.
    }

    private gotoSpaceScene(): void {

        this.hidePlanet();

        // Slide down at center.
        this.gameTimeline.to(this.ship, SHIP_SPEED, {
            y: SHIP_REST_Y,
            ease: Linear.easeNone,
            onStart: () => {
                if (this.shipIsNew) {
                    this.shipIsNew = false;

                    // TODO: Play extra ship creation animation? Research...
                    // TODO: Play ship entry sound then
                    // TODO: Play ship moving sound
                } else {
                    // TODO: Play ship moving sound
                }
            },
            onComplete: () => {
                this.state.allowShots = true;
                this.state.inSpace = true;

                this.generateMeteors();
            }
        });

        if (this.state.inSpace == false) {
            this.gameTimeline.add(this.planet.getExitAnimation());
        }
    }

    private leaveSpaceScene(): void {
        this.state.allowShots = false;

        this.clearSky();

        this.state.inSpace = false;

        // Slide up to the top of the screen.
        this.gameTimeline.to(this.ship, SHIP_SPEED, {
            y: Math.abs(this.ship.topEdgeDistance),
            ease: Linear.easeNone,
            onComplete: () => {
                this.ship.openPort();
                this.gotoPlanetScene();
            }
        }, this.gameTimeline.time());
    }

    private gotoPlanetScene(): void {

        this.numMeteorsShot = 0;

        this.planetLayer.addChild(this.planet);

        this.gameTimeline.to(this.ship, SHIP_SPEED, {
            y: SHIP_REST_Y,
            ease: Linear.easeNone,
            onComplete: () => {
                this.planet.run(this.ship);
                this.state.allowShots = true;
            }
        }, this.gameTimeline.time());

        this.gameTimeline.add(this.planet.getEntryAnimation());
    }

    private leavePlanetScene(): void {

        this.state.allowShots = false;

        this.clearSky();

        this.gameTimeline.to(this.ship, SHIP_SPEED, {
            y: Math.abs(this.ship.topEdgeDistance),
            ease: Linear.easeNone,
            onStart: () => {
                this.ship.closePort();
            },
            onComplete: () => {

                if (this.planet.isClear) {
                    this.nextLevel();
                }

                this.numMeteorsShot = 0;
                this.numWaveringMeteorsRemaining = this.numWaveringMeteorsToGenerate;

                this.gotoSpaceScene();
            }
        }, this.gameTimeline.time());
    }

    private hidePlanet(): void {

        if (this.planetLayer.contains(this.planet)) {
            this.planetLayer.removeChild(this.planet);
        }

        this.planet.reset();
    }

    private clearSky(): void {

        for (let m of this.meteors) {
            this.destroyMeteor(m);
        }

        for (let s of this.shots) {
            this.destroyShot(s);
        }

        this.meteors = [];
        this.shots = [];
        this.currentMeteor = null;

        this.createGameTimeline();

        this.planet.clearSky();

        console.log('--- SKY CLEARED ---');
    }

    private generateMeteors(numToGenerate: number = 0): void {

        let count: number = 0;

        if (numToGenerate == 0) {   // Meaning base this on the level.
            if (this.numMeteorsShot == 0) {
                // First time generating meteors for the level.
                numToGenerate = this.numMeteorsToGenerate;
            } else {
                // Generate the missed meteors plus a penalty.
                numToGenerate = this.numMeteorsToGenerate - this.numMeteorsShot + 2;
            }
        }

        //console.log('Generating', numToGenerate, 'meteors');

        while (count < numToGenerate) {

            // Wavering or normal?
            let wavering: boolean = false;

            if (this.numWaveringMeteorsRemaining > 0) {
                wavering = _.sample([1, 2, 3, 4]) == 3; // About a 25% chance.
                if (wavering) this.numWaveringMeteorsRemaining--;
            }

            let meteor: Meteor = this.createMeteor(wavering);

            // Add a meteor and then a label to jump to if that meteor is shot.
            this.gameTimeline.call(() => {
                this.currentMeteor = meteor;
            });
            this.gameTimeline.add(meteor.fireAt(this.ship));
            this.gameTimeline.add(LABEL_METEOR + this.meteors.length);

            count++;
        }

        this.gameTimeline.add(LABEL_SHOT_ALL_METEORS);
    }

    private createMeteor(wavering: boolean): Meteor {

        let side: number;

        // Pick a side randomly:
        if (this.state.inSpace) {
            side = _.sample([Sides.Top, Sides.Right, Sides.Bottom, Sides.Left]);
        } else {
            side = _.sample([Sides.Top, Sides.Right, Sides.Left]);
        }

        let meteor: Meteor;
        let position: { x: number, y: number };

        meteor = new Meteor(side, LABEL_METEOR + this.meteors.length, wavering);

        switch (side) {
            case Sides.Top:
                position = { x: this.ship.x, y: 0 };
                break;
            case Sides.Right:
                position = { x: CANVAS_WIDTH, y: this.ship.y };
                break;
            case Sides.Bottom:
                position = { x: this.ship.x, y: CANVAS_HEIGHT };
                break;
            case Sides.Left:
                position = { x: 0, y: this.ship.y };
                break;
        }

        meteor.x = position.x;
        meteor.y = position.y;

        this.meteorLayer.addChild(meteor);

        this.meteors.push(meteor);

        return meteor;
    }

}