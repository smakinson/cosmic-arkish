import {Sides} from "../views/Game";

export const ANGLE_LEFT: number = 270 * (Math.PI / 180);
export const ANGLE_RIGHT: number = 90 * (Math.PI / 180);
export const ANGLE_UP: number = 0;
export const ANGLE_DOWN: number = 180 * (Math.PI / 180);

export const ANGLE_DOWN_LEFT: number = 225 * (Math.PI / 180);
export const ANGLE_DOWN_RIGHT: number = 135 * (Math.PI / 180);

export const ANGLE_UP_LEFT: number = 315 * (Math.PI / 180);
export const ANGLE_UP_RIGHT: number = 45 * (Math.PI / 180);

export const ANGLE_FULL: number = 359 * (Math.PI / 180);
export const ANGLE_NONE: number = -1;


export class PlayerInput extends createjs.EventDispatcher {

    private static instance: PlayerInput = null;

    private direction: number = Sides.None;

    private _angle: number = ANGLE_NONE;
    get angle(): number {
        return this._angle;
    }

    private spacebarPressed: boolean = false;

    private _upPressed: boolean = false;
    get upPressed(): boolean {
        return this._upPressed;
    }

    private _downPressed: boolean = false;
    get downPressed(): boolean {
        return this._downPressed;
    }

    private _leftPressed: boolean = false;
    get leftPressed(): boolean {
        return this._leftPressed;
    }

    private _rightPressed: boolean = false;
    get rightPressed(): boolean {
        return this._rightPressed;
    }

    private _beamOn: boolean = false;
    get beamOn(): boolean {
        return this._beamOn;
    }

    private lastPressedKeyCode: number;

    static getInstance(): PlayerInput {

        if (PlayerInput.instance === null) {
            PlayerInput.instance = new PlayerInput();
        }

        return PlayerInput.instance;
    }

    private constructor() {
        super();

        $('html').bind('keyup', (event) => {

            switch (event.keyCode) {
                case 32:    // Space bar
                    this.spacebarPressed = false;
                    break;
                case 37:    // Left
                    this._leftPressed = false;
                    break;
                case 38:    // Up
                    this._upPressed = false;
                    break;
                case 39:    // Right
                    this._rightPressed = false;
                    break;
                case 40:    // Down
                    this._downPressed = false;
                    break;
            }

            switch (event.keyCode) {
                case 37:    // Left
                case 38:    // Up
                case 39:    // Right
                case 40:    // Down
                    this.direction = Sides.None;    // Allow the same direction again now that the key was released.
                    this.lastPressedKeyCode = null;
                    break;
            }
        });

        $('html').bind('keydown', (event) => {
            //console.log(event.keyCode);

            if (event.keyCode == 32) {    // Space bar
                this.spacebarPressed = true;
            }

            if (this.lastPressedKeyCode != event.keyCode) {
                switch (event.keyCode) {
                    case 37:    // Left
                        //console.log('LEFT');
                        this.direction = Sides.Left;
                        this._leftPressed = true;

                        break;
                    case 38:    // Up
                        //console.log('UP');
                        this.direction = Sides.Top;
                        this._upPressed = true;

                        break;
                    case 39:    // Right
                        //console.log('RIGHT');
                        this.direction = Sides.Right;
                        this._rightPressed = true;

                        break;
                    case 40:    // Down
                        //console.log('DOWN');
                        this.direction = Sides.Bottom;
                        this._downPressed = true;

                        break;
                }
            }

            this.lastPressedKeyCode = event.keyCode;
        });

        TweenMax.ticker.addEventListener("tick", this.handleGameTick, this);
    }

    destroy(): void {

        TweenMax.ticker.removeEventListener("tick", this.handleGameTick);

        $('html').unbind('keydown');
        $('html').unbind('keyup');

        // TODO: Unbind events. etc.
    }

    private handleGameTick(): void {

        this._beamOn = this.spacebarPressed;

        if (this._leftPressed && this._downPressed) {
            this._angle = ANGLE_DOWN_LEFT;
        } else if (this._rightPressed && this._downPressed) {
            this._angle = ANGLE_DOWN_RIGHT;
        } else if (this._leftPressed && this._upPressed) {
            this._angle = ANGLE_UP_LEFT;
        } else if (this._rightPressed && this._upPressed) {
            this._angle = ANGLE_UP_RIGHT;
        } else if (this._leftPressed) {
            this._angle = ANGLE_LEFT;
        } else if (this._rightPressed) {
            this._angle = ANGLE_RIGHT;
        } else if (this._upPressed) {
            this._angle = ANGLE_UP;
        } else if (this._downPressed) {
            this._angle = ANGLE_DOWN;
        } else {
            this._angle = ANGLE_NONE;
        }
    }

    getDirection(): number {
        let d: number = this.direction;
        this.direction = Sides.None;

        return d;
    }

}