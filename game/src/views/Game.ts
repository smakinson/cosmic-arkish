import {Ship} from "./Ship";
import {Meteor} from "./Meteor";
import Container = createjs.Container;
import {PlayerInput} from "../io/PlayerInput";
import {Shot} from "./Shot";
import {State} from "../State";
import Rectangle = createjs.Rectangle;
import {Planet, WARN_COMPLETE_EVENT} from "./Planet";

export enum Sides { Right, Left, Bottom, Top, None }

export const CANVAS_WIDTH: number = 1280;
export const CANVAS_HEIGHT: number = 800;
export const CANVAS_CENTER_X: number = CANVAS_WIDTH * .5;
export const CANVAS_CENTER_Y: number = CANVAS_HEIGHT * .5;

const SHIP_SPEED: number = .8;
const SHIP_REST_Y: number = CANVAS_CENTER_Y - 60;

const LABEL_METEOR: string = "meteor";
const LABEL_SHOT_ALL_METEORS: string = "shotAllMeteors";


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

    private handlePlanetWarnCompleteListener: Function;

    private numMeteorsToGenerate: number;

    private playerInput: PlayerInput = PlayerInput.getInstance();
    private state: State = State.getInstance();

    constructor() {
        super();

        this.gameTimeline = new TimelineMax({});

        this.meteorLayer = new Container();
        this.shotsLayer = new Container();
        this.planetLayer = new Container();

        // Add the layers in the desired stacking order.
        this.addChild(this.shotsLayer);
        this.addChild(this.meteorLayer);
        this.addChild(this.planetLayer);
    }

    destroy(): void {

        this.planet.off(WARN_COMPLETE_EVENT, this.handlePlanetWarnCompleteListener);

        this.clearSky();

        this.planet.destroy();
        this.ship.destroy();

        // TODO

    }

    private continueGame(): void {
        this.createShip();
        this.gotoSpaceScene();
    }

    private nextLevel(): void {
        this.state.level++;

        // TODO: Calculate this based on level.
        this.numMeteorsToGenerate = 5;

        this.gotoSpaceScene();
    }

    private createPlanet(): void {
        this.planet = new Planet();
        this.handlePlanetWarnCompleteListener = this.planet.on(WARN_COMPLETE_EVENT, this.handlePlanetWarnComplete, this);
    }

    private createShip(): void {
        this.shipIsNew = true;

        this.ship = new Ship();
        this.ship.x = CANVAS_CENTER_X;
        this.ship.y = -this.ship.getHeight() - 5;
        this.addChild(this.ship);
    }

    run(): void {
        this.createShip();
        this.createPlanet();

        this.nextLevel();

        TweenMax.ticker.addEventListener("tick", this.handleGameTickInSpace, this);
    }

    pause(): void {
        // TODO
        this.state.paused = true;
        this.gameTimeline.pause();
        this.planet.pause();
    }

    resume(): void {
        // TODO
        this.state.paused = false;
        this.gameTimeline.resume();
        this.planet.resume();
    }

    private handleGameTickInSpace(): void {

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

                    // TODO: Increase ship power? Research details...
                }

            }
        }
    }

    private handlePlanetWarnComplete(): void {

        this.gameTimeline.clear();
        this.gameTimeline = new TimelineMax({});

        // Only one meteor when on the planet.
        this.generateMeteors(1);
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

        this.gameTimeline.remove(meteor.tween);

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

        // TODO: Take away ship power.
        // TODO: What else?

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

        TweenMax.ticker.removeEventListener("tick", this.handleGameTickInSpace);

        // TODO: Play ending scene
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
                //this.gameTimeline.call(this.leaveSpaceScene, null, this, '+=.5');
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
        this.numMeteorsShot = 0;


        this.clearSky();

        this.gameTimeline.to(this.ship, SHIP_SPEED, {
            y: Math.abs(this.ship.topEdgeDistance),
            ease: Linear.easeNone,
            onStart: () => {
                this.ship.closePort();
            },
            onComplete: () => {
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

        // TODO: Remove other stuff?

        this.meteors = [];
        this.shots = [];
        this.currentMeteor = null;

        this.gameTimeline.clear();
        this.gameTimeline = new TimelineMax({});

        this.planet.clearSky();

        console.log('--- SKY CLEARED ---');
    }

    private generateMeteors(numToGenerate: number = 0): void {

        let count: number = 0;

        if (numToGenerate == 0) {
            if (this.numMeteorsShot == 0) {
                // First time generating meteors for the level.
                numToGenerate = this.numMeteorsToGenerate;
            } else {
                // Fewer to generate.
                // TODO: Research this to get formula.
                numToGenerate = this.numMeteorsToGenerate - this.numMeteorsShot + 1;
            }
        }

        //console.log('Generating', numToGenerate, 'meteors');

        while (count < numToGenerate) {
            let meteor: Meteor = this.createMeteor();

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

    private createMeteor(): Meteor {

        let side: number;

        // Pick a side randomly:
        if (this.state.inSpace) {
            side = _.sample([Sides.Top, Sides.Right, Sides.Bottom, Sides.Left]);
        } else {
            side = _.sample([Sides.Top, Sides.Right, Sides.Left]);
        }

        let meteor: Meteor;
        let position: { x: number, y: number };
        let wiggle: boolean = false;

        // TODO: Randomize wiggling meteors based on the level.
        // TODO: Does it make it possible for shot to miss it?
        //wiggle = true;

        meteor = new Meteor(side, LABEL_METEOR + this.meteors.length, wiggle);

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