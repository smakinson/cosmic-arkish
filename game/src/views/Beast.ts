import {State} from "../State";
import {Sides, CANVAS_WIDTH} from "./Game";
import {Saucer} from "./Saucer";

const EDGE_PAD: number = 50;
const BEAST_PAD: number = 35;
const SPEED: number = 6;
const FALL_SPEED: number = 20;

export class Beast extends lib.Beasts {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    get onGround(): boolean {
        return this.y == 0;
    }

    private otherBeast: Beast;
    private xMax: number = CANVAS_WIDTH - EDGE_PAD;
    private count: number = 0;
    private countTo: number;
    private direction: number;
    private wiggle: boolean = false;
    private wiggleFor: number;
    private wiggleCount: number = 0;
    private waitOnDirChangeCount: number = 0;

    private caughtInBeam: boolean = false;
    private droppedFromBeam: boolean = false;

    private _width: number;  // The values for this are set on the timeline.
    get width(): number {
        return this._width;
    }

    private _captured: boolean = false;
    get captured(): boolean {
        return this._captured;
    }

    private tickerListener: Function;

    private state: State = State.getInstance();

    // on the stage:
    private beast: MovieClip;

    constructor(public side: Sides, public saucer: Saucer) {
        super();

        // Show the appropriate beast for the level.
        if (this.state.beastFrameNumber >= this.totalFrames) {
            this.state.restartBeastFrameNumber();
        }
        this.gotoAndStop(this.state.beastFrameNumber);

        this.direction = this.side == Sides.Left ? SPEED : -SPEED;
        this.countTo = this.side == Sides.Left ? 25 : 40;
    }

    destroy(): void {
        if (this.tickerListener) {
            createjs.Ticker.off('tick', this.tickerListener);
            this.tickerListener = null;
        }

        this._destroyed = true;

        if (this.parent) {
            this.parent.removeChild(this);
        }
        // TODO
    }

    private handleGameTick(): void {

        if (this.state.paused || this.caughtInBeam || this._captured)return;

        let posX: number = this.x;
        let clampedX: number;

        if (this.droppedFromBeam) {
            this.y += FALL_SPEED;

            if (this.y >= 0) {
                this.y = 0;
                this.droppedFromBeam = false;
                this.beast.visible = true;
            }
        } else {
            if (this.wiggle) {
                if (this.count > 5) {
                    this.direction *= -1;
                    this.wiggleCount++;
                    this.count = 0;
                }

                if (this.wiggleCount >= this.wiggleFor) {
                    this.wiggle = false;
                }
            } else {
                if (this.count > this.countTo) {
                    this.pickDirection();
                    this.count = 0;
                }
            }

            // TODO: Avoid saucer beam.

            if (this.x <= EDGE_PAD) {
                this.direction = Math.abs(this.direction);
                this.waitOnDirChangeCount = 4;
            } else if (this.x >= this.xMax) {
                this.waitOnDirChangeCount = 4;
                this.direction = -SPEED;
            }

            posX += this.direction;

            // Keep a minimum gap between the beasts.
            if (this.side == Sides.Left) {
                if (this.otherBeast) {
                    clampedX = _.clamp(posX, EDGE_PAD, this.otherBeast.x - BEAST_PAD);
                } else {
                    clampedX = _.clamp(posX, EDGE_PAD, this.xMax);
                }

                if (clampedX != posX) {
                    this.waitOnDirChangeCount = 5;
                    this.direction = -SPEED;
                }
            } else {
                if (this.otherBeast) {
                    clampedX = _.clamp(posX, this.otherBeast.x + BEAST_PAD, this.xMax);
                } else {
                    clampedX = _.clamp(posX, EDGE_PAD, this.xMax);
                }

                if (clampedX != posX) {
                    this.waitOnDirChangeCount = 5;
                    this.direction = SPEED;
                }
            }

            // TODO: Avoid saucer beam.

            // face the correct direction for the movement.
            this.scaleX = clampedX < this.x ? -1 : 1;

            this.x = clampedX;
            this.count++;
        }
    }

    private pickDirection(): void {

        // Do a waver?
        if (_.random(1, 10) > 3) {
            this.wiggle = true;
            this.wiggleCount = 0;
            this.wiggleFor = _.random(3, 6);
        } else if (this.waitOnDirChangeCount == 0) {

            if (_.random(1, 7) > 3) {
                this.direction *= -1;
            }
        } else {
            this.waitOnDirChangeCount--;
        }
    }

    markAsCaptured(): void {
        this._captured = true;

        if (this.tickerListener) {
            createjs.Ticker.off('tick', this.tickerListener);
            this.tickerListener = null;
        }
    }

    releaseFromCapture(): void {
        if(this._captured == false)return;

        this._captured = false;
        this.caughtInBeam = false;
        this.y = 0;
        this.visible = true;

        this.tickerListener = createjs.Ticker.on('tick', this.handleGameTick, this);
    }

    reactToBeamTouch(): void {
        if (this._captured)return;

        this.caughtInBeam = true;
        this.visible = false;
    }

    reactToBeamRelease(): void {
        if (this._captured)return;

        this.caughtInBeam = false;

        // Drop the beast back to the ground.
        this.droppedFromBeam = true;

        //this.beast.visible = false;
        this.visible = true;
    }

    pause(): void {
        // TODO
    }

    resume(): void {
        // TODO
    }

    run(otherBeast: Beast = null): void {
        this.otherBeast = otherBeast;
        this.tickerListener = createjs.Ticker.on('tick', this.handleGameTick, this);
    }

}