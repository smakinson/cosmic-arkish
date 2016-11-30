import {Ship} from "./Ship";
import {Meteor} from "./Meteor";
import Container = createjs.Container;
import {PlayerInput} from "../io/PlayerInput";
import {Shot} from "./Shot";
import {State} from "../State";
import Rectangle = createjs.Rectangle;
import {Planet} from "./Planet";

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

    private ship: Ship;
    private shipIsNew: boolean = true;

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
        this.numMeteorsToGenerate = 1;

        this.gotoSpaceScene();
    }

    private createPlanet(): void {
        this.planet = new Planet();
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

        let hitShip: boolean = false;

        this.handleSpacePlayerInput();

        if (this.ship && this.ship.destroyed == false) {
            for (let meteor of this.meteors) {

                // Meteor hit ship?
                switch (meteor.side) {
                    case Sides.Top:
                        if (meteor.y > this.ship.y + this.ship.topEdgeDistance) {
                            this.destroyMeteor(meteor);
                            hitShip = true;
                        }
                        break;
                    case Sides.Right:
                        if (meteor.x < this.ship.x + this.ship.getWidth() * .5) {
                            this.destroyMeteor(meteor);
                            hitShip = true;
                        }
                        break;
                    case Sides.Bottom:
                        if (meteor.y < this.ship.y + this.ship.bottomDistance) {
                            this.destroyMeteor(meteor);
                            hitShip = true;
                        }
                        break;
                    case Sides.Left:
                        if (meteor.x > this.ship.x - this.ship.getWidth() * .5) {
                            this.destroyMeteor(meteor);
                            hitShip = true;
                        }
                        break;
                }

                if (hitShip) {
                    //console.log('BOOM')
                    this.state.allowShots = false;
                    this.clearSky();

                    // Play ship explosion and move on.
                    this.gameTimeline.add(this.ship.destroy());
                    this.gameTimeline.call(this.handleShipDestroyed, null, this);

                    break;
                } else {
                    // Shot hit meteor?
                    for (let shot of this.shots) {

                        if (this.currentMeteor == null)break;

                        let shotHit: boolean = false;

                        switch (this.currentMeteor.side) {
                            case Sides.Top:
                                if (shot.y <= this.currentMeteor.y) {
                                    shotHit = true;
                                }
                                break;
                            case Sides.Right:
                                if (shot.x >= this.currentMeteor.x) {
                                    shotHit = true;
                                }
                                break;
                            case Sides.Bottom:
                                if (shot.y >= this.currentMeteor.y) {
                                    shotHit = true;
                                }
                                break;
                            case Sides.Left:
                                if (shot.x <= this.currentMeteor.x) {
                                    shotHit = true;
                                }
                                break;
                        }

                        if (shotHit) {
                            shot.destroy();
                            this.destroyMeteor(this.currentMeteor);
                            this.currentMeteor = null;
                            this.removeShot(shot);
                            this.jumpToNextMeteor();

                            // TODO: Increase score.
                            // TODO: Increase ship power? Research details...
                        }

                    }
                }
            }
        }
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

                // TODO: Decrease ship power? Research details...
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

    private removeShot(shot: Shot): void {

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
            //console.log('TO: ', this.meteors[0].label)
            this.gameTimeline.seek(this.meteors[0].label);
        } else {
            // No more meteors, yay!
            this.gameTimeline.seek(LABEL_SHOT_ALL_METEORS);
        }
    }

    private handleShipDestroyed(): void {

        console.log('Ship Destroyed!!');

        this.state.allowShots = true;

        this.clearSky();

        if (this.contains(this.ship)) {
            this.removeChild(this.ship);
        }

        // TODO: Take away ship power.
        // TODO: What else?

        if (this.state.powerLevel <= 0) {
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

        // Slide down at center.
        this.gameTimeline.to(this.ship, SHIP_SPEED, {
            y: SHIP_REST_Y,
            ease: Back.easeOut.config(.8),
            onStart: () => {
                if (this.shipIsNew) {
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
        }, "+=.5");

        if (this.state.inSpace == false) {
            this.gameTimeline.add(this.planet.getExitAnimation());
        }
    }

    private leaveSpaceScene(): void {
        this.state.allowShots = false;

        if (this.state.inSpace) {
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
    }

    private gotoPlanetScene(): void {

        if (this.state.inSpace == false) {

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
    }

    private leavePlanetScene(): void {

        this.state.allowShots = false;

        if (this.state.inSpace == false) {
            this.clearSky();

            this.gameTimeline.to(this.ship, SHIP_SPEED, {
                y: Math.abs(this.ship.topEdgeDistance),
                ease: Linear.easeNone,
                onComplete: () => {
                    this.ship.closePort();
                    this.gotoSpaceScene();

                    this.planetLayer.removeChild(this.planet);
                    this.planet.reset();
                }
            }, this.gameTimeline.time());
        }
    }

    private clearSky(): void {
        // Remove all the meteors

        for (let m of this.meteors) {
            m.destroy();
            if (this.meteorLayer.contains(m)) {
                this.meteorLayer.removeChild(m);
            }
        }

        for (let s of this.shots) {
            s.destroy();
            if (this.shotsLayer.contains(s)) {
                this.shotsLayer.removeChild(s);
            }
        }

        // TODO: Remove other stuff?

        this.meteors = [];
        this.shots = [];

        this.gameTimeline.clear();
    }

    private generateMeteors(): void {

        let count: number = 0;

        this.gameTimeline.pause();

        while (count < this.numMeteorsToGenerate) {
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
        this.gameTimeline.call(this.leaveSpaceScene, null, this, '+=.1');

        this.gameTimeline.resume();
    }

    private createMeteor(): Meteor {

        // Pick a side randomly:
        let side: number = _.sample([Sides.Top, Sides.Right, Sides.Bottom, Sides.Left]);

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

        meteor.set(position);

        this.meteorLayer.addChild(meteor);

        this.meteors.push(meteor);

        return meteor;
    }

}