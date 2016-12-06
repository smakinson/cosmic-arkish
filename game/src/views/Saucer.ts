import {
    PlayerInput, ANGLE_DOWN, ANGLE_DOWN_LEFT, ANGLE_DOWN_RIGHT, ANGLE_NONE, ANGLE_UP_LEFT,
    ANGLE_UP_RIGHT, ANGLE_UP, ANGLE_LEFT, ANGLE_RIGHT, ANGLE_FULL
} from "../io/PlayerInput";
import {Ship} from "./Ship";
import Rectangle = createjs.Rectangle;
import {State} from "../State";
import {Beast} from "./Beast";
import Point = createjs.Point;
import {BeastEvent} from "../events/BeastEvent";

export const SAUCER_DOCKED_EVENT: string = 'Saucer.SAUCER_DOCKED_EVENT';

const PHONE_TOLERANCE: number = 5;
const WIDTH: number = 65;
const HEIGHT: number = 17;
const BEAM_SPEED: number = 4;
const SAUCER_SPEED: number = 4.5;

export class Saucer extends lib.Saucer {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    private _inShip: boolean = true;
    get inShip(): boolean {
        return this._inShip;
    }

    private _docked: boolean = true;
    get docked(): boolean {
        return this._docked;
    }

    private blowingUp: boolean = false;
    private blowingUpTween: TweenMax = new TweenMax(this, 0, {});

    private beamingABeast: boolean = false;
    private beastBeingBeamedUp: Beast;

    private tickerListener: Function;

    private state: State = State.getInstance();
    private playerInput: PlayerInput = PlayerInput.getInstance();

    // on the stage:
    private saucer: MovieClip;
    private beam: MovieClip;
    private beamBeast: MovieClip;

    constructor(public ship: Ship, public flyZone: Rectangle, public beasts: Array<Beast>) {
        super();

        this.dock();

        this.tickerListener = createjs.Ticker.on('tick', this.handleGameTick, this);

        this.beam.visible = false;
        this.beamBeast.visible = false;
    }

    destroy(): void {
        console.log('destroyed saucer');
        createjs.Ticker.off('tick', this.tickerListener);

        this._destroyed = true;

        this.blowingUpTween.kill();

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    private dock(): void {

        if (this._docked == false && this.blowingUp == false) {
            this.dispatchEvent(SAUCER_DOCKED_EVENT);
        }

        this.x = this.ship.x;
        this.y = this.ship.y;
        this._docked = true;
        this._inShip = true;
    }

    blowUp(): TweenMax {

        if (this.blowingUp == false) {

            this.blowingUp = true;

            // TODO: Make this a better animation.
            this.blowingUpTween = TweenMax.to(this, .3, {
                alpha: 0,
                onStart: () => {
                    // TODO: Play saucer hit sound.
                },
                onComplete: () => {
                    this.alpha = 1;
                    this.dock();
                    this.blowingUp = false;
                }
            });
        }

        return this.blowingUpTween;
    }

    private beamUpBeast(beast: Beast): void {

        this.beamingABeast = true;

        let localBeastPosition: Point = beast.localToGlobal(beast.x, beast.y)
        localBeastPosition = this.globalToLocal(localBeastPosition.x, localBeastPosition.y);

        beast.reactToBeamTouch();

        this.beamBeast.y = localBeastPosition.y;
        this.beamBeast.visible = true;
        this.beastBeingBeamedUp = beast;
    }

    private captureBeastInBeam(): void {
        // TODO

        this.beamBeast.visible = false;
        this.beamingABeast = false;

        this.beastBeingBeamedUp.markAsCaptured();

        this.dispatchEvent(new BeastEvent(BeastEvent.CAPTURED, this.beastBeingBeamedUp));

        this.beastBeingBeamedUp = null;
    }

    private dropBeastInBeam(): void {
        // TODO

        this.beamBeast.visible = false;
        this.beamingABeast = false;

        this.beastBeingBeamedUp.reactToBeamRelease();
        this.beastBeingBeamedUp = null;
    }

    private handleGameTick(): void {

        if (this.state.paused || this.blowingUp)return;

        //let distance: number;
        let x: number = this.x, y: number = this.y;
        let angle: number = this.playerInput.angle;

        // Handle the saucer beam
        if (this.inShip == false && this.playerInput.beamOn) {
            this.beam.visible = true;

            if (this.beamingABeast) {   // The beast is in the beam the is on.
                // TODO: Play the beaming sound.
                this.beamBeast.y -= BEAM_SPEED;
                this.beastBeingBeamedUp.y -= BEAM_SPEED;    // Keep the beast at the same height.

                // Check to see if its in the saucer yet
                if (this.beamBeast.y <= this.beam.y - 5) {
                    this.captureBeastInBeam();
                }
            } else {
                let globalBeamPosition: Point = this.localToGlobal(this.beam.x, this.beam.y);

                // Check to see if the beam caught a beast.
                for (let beast of this.beasts) {
                    if (beast.visible && beast.captured == false) {
                        if (beast.x >= globalBeamPosition.x - 15 && beast.x <= globalBeamPosition.x + 15) {
                            this.beamUpBeast(beast);
                            break;
                        }
                    }
                }
            }
        } else {
            this.beam.visible = false;

            if (this.beastBeingBeamedUp) {  // A beast was dropped.
                this.dropBeastInBeam();
            }
        }

        if (angle != ANGLE_NONE && this.beam.visible == false) {

            //distance = 1.8;

            if (this.y < this.ship.y + this.ship.bottomDistance) {
                this._inShip = true;

                if (this.y < this.ship.y + 40) {

                    if (this._docked == false) {
                        // Just docked. Send a keydown for the up arrow key to allow a shot at a coming meteor right away.
                        // TODO: Don't do this if in phone as the controller mode?
                        $('html').trigger(jQuery.Event('keydown'), { keycode: 38 });

                        this.dispatchEvent(SAUCER_DOCKED_EVENT);
                    }

                    // Set docked to true but don't call dock().
                    this._docked = true;
                } else {
                    this._docked = false;
                }
            } else {
                this._inShip = false;
                this._docked = false;
            }

            if (this._inShip) {

                // Can only go down to leave the ship.
                // Leave leeway for phone based input to not be exactly at down angle.
                if (angle < ANGLE_DOWN_LEFT && angle > ANGLE_DOWN_RIGHT) {

                    y = this.y + (-SAUCER_SPEED * Math.cos(ANGLE_DOWN));
                    this.y = y;

                } else if (this.y > this.ship.y && (angle >= ANGLE_UP_LEFT || angle <= ANGLE_UP_RIGHT)) { // Still moving into docked position?

                    //if (this.x > this.ship.x - PHONE_TOLERANCE && this.x < this.ship.x + PHONE_TOLERANCE) {
                    y = this.y + (-SAUCER_SPEED * Math.cos(ANGLE_UP));
                    this.y = y;
                    //}
                }
            } else {

                // Lined up to go back into ship?
                // Leave leeway for phone based input to not be exactly at up angle.
                if ((angle >= ANGLE_UP_LEFT || angle <= ANGLE_UP_RIGHT) && (this.x > this.ship.x - PHONE_TOLERANCE && this.x < this.ship.x + PHONE_TOLERANCE)) {
                    this.y += (-SAUCER_SPEED * Math.cos(ANGLE_UP));
                } else {

                    x = this.x + (SAUCER_SPEED * Math.sin(angle));
                    y = this.y + (-SAUCER_SPEED * Math.cos(angle));

                    if (this.flyZone.contains(x, y)) {
                        // Normal movement.
                        this.set({ x: x, y: y });
                    } else {
                        // Movement on edges of flyzone.
                        let useAngle: number;
                        let move: boolean = true;

                        if (angle < ANGLE_RIGHT && angle > ANGLE_UP) {
                            useAngle = y <= this.flyZone.y ? ANGLE_RIGHT : ANGLE_UP;
                        } else if (angle > ANGLE_LEFT && angle < ANGLE_FULL) {
                            useAngle = y <= this.flyZone.y ? ANGLE_LEFT : ANGLE_UP;
                        } else if (angle < ANGLE_LEFT && angle > ANGLE_DOWN) {
                            useAngle = y > this.flyZone.y + this.flyZone.height ? ANGLE_LEFT : ANGLE_DOWN;
                        } else if (angle > ANGLE_RIGHT && angle < ANGLE_DOWN) {
                            useAngle = x >= this.flyZone.x + this.flyZone.width ? ANGLE_DOWN : ANGLE_RIGHT;
                        } else {
                            move = false;
                        }

                        if (move) {
                            x = this.x + (SAUCER_SPEED * Math.sin(useAngle));
                            y = this.y + (-SAUCER_SPEED * Math.cos(useAngle));

                            if (this.flyZone.contains(x, y)) {
                                this.set({ x: x, y: y });
                            }
                        }
                    }
                }
            }

            // TODO: Play saucer movement sound.
        }
    }

    getHeight(): number {
        return HEIGHT * this.scaleY;
    }

    getWidth(): number {
        return WIDTH * this.scaleX;
    }

}