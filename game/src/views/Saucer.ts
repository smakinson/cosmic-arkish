import {
    PlayerInput, ANGLE_DOWN, ANGLE_DOWN_LEFT, ANGLE_DOWN_RIGHT, ANGLE_NONE, ANGLE_UP_LEFT,
    ANGLE_UP_RIGHT, ANGLE_UP, ANGLE_LEFT, ANGLE_RIGHT, ANGLE_FULL
} from "../io/PlayerInput";
import {Ship} from "./Ship";
import Rectangle = createjs.Rectangle;
import {State} from "../State";

const PHONE_TOLERANCE: number = 5;

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

    private state: State = State.getInstance();
    private playerInput: PlayerInput = PlayerInput.getInstance();

    // on the stage:
    private saucer: MovieClip;
    private beam: MovieClip;

    constructor(public ship: Ship, public flyZone: Rectangle) {
        super();

        TweenMax.ticker.addEventListener("tick", this.handleGameTick, this);

        this.beam.visible = false;
    }

    destroy(): void {
        this._destroyed = true;

        TweenMax.ticker.removeEventListener("tick", this.handleGameTick);

        this.playerInput = null;

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    private handleGameTick(): void {

        if (this.state.paused)return;

        let distance: number = 3;
        let x: number = this.x, y: number = this.y;
        let angle: number = this.playerInput.angle;

        // Handle the saucer beam
        if (this.inShip == false && this.playerInput.beamOn) {
            this.beam.visible = true;
            // TODO: Play beam sound
            // TODO: Check for alien
        }else{
            this.beam.visible = false;
        }

        if (angle != ANGLE_NONE && this.beam.visible == false) {

            if (this.y < this.ship.y + this.ship.bottomDistance) {
                this._inShip = true;

                if (this.y < this.ship.y + 30) {
                    if (this._docked == false) {
                        // Just docked. Send a keydown for the up arrow key
                        // TODO: Don't do this if in phone as the controller mode?
                        $('html').trigger(jQuery.Event('keydown'), { keycode: 38 });
                    }

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

                    y = this.y + (-distance * Math.cos(ANGLE_DOWN));
                    this.y = Math.round(y);

                } else if (this.y > this.ship.y && (angle >= ANGLE_UP_LEFT || angle <= ANGLE_UP_RIGHT)) { // Still moving into docked position?

                    //if (this.x > this.ship.x - PHONE_TOLERANCE && this.x < this.ship.x + PHONE_TOLERANCE) {
                    y = this.y + (-distance * Math.cos(ANGLE_UP));
                    this.y = Math.round(y);
                    //}
                }
            } else {

                // Lined up to go back into ship?
                // Leave leeway for phone based input to not be exactly at up angle.
                if ((angle >= ANGLE_UP_LEFT || angle <= ANGLE_UP_RIGHT) && (this.x > this.ship.x - PHONE_TOLERANCE && this.x < this.ship.x + PHONE_TOLERANCE)) {

                    this._inShip = true;

                    this.y += Math.round((-distance * Math.cos(ANGLE_UP)));
                } else {

                    x = this.x + (distance * Math.sin(angle));
                    y = this.y + (-distance * Math.cos(angle));

                    if (this.flyZone.contains(x, y)) {
                        // Normal movement.
                        this.set({ x: Math.round(x), y: Math.round(y) });
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
                            x = this.x + (distance * Math.sin(useAngle));
                            y = this.y + (-distance * Math.cos(useAngle));

                            if (this.flyZone.contains(x, y)) {
                                this.set({ x: Math.round(x), y: Math.round(y) });
                            }
                        }
                    }
                }
            }

            // TODO: Play saucer movement sound.
        }
    }

}