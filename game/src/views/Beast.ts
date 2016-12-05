import {State} from "../State";
import {Sides, CANVAS_CENTER_X, CANVAS_WIDTH} from "./Game";
import {Saucer} from "./Saucer";

const EDGE_PAD: number = 50;
const BEAST_PAD: number = 175;
const SPEED: number = 3;

export class Beast extends lib.Beasts {

    private state: State = State.getInstance();

    private otherBeast: Beast;
    private xMax: number = CANVAS_WIDTH - EDGE_PAD;
    private count: number = 0;
    private countTo: number;
    private direction: number;
    private wiggle: boolean = false;
    private wiggleFor: number;
    private wiggleCount: number = 0;
    private waitOnDirChangeCount: number = 0;

    constructor(public side: Sides, public saucer: Saucer) {
        super();

        // TODO: Pick frame based on the current level.

        this.direction = this.side == Sides.Left ? SPEED : -SPEED;

        this.countTo = this.side == Sides.Left ? 25 : 40;
    }

    destroy(): void {
        TweenMax.ticker.removeEventListener("tick", this.handleGameTick);

        // TODO
    }

    private handleGameTick(): void {

        if (this.state.paused)return;

        let posX: number = this.x;
        let clampedX: number;

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
            console.log('OFF THE RIGHT EDGE')
            this.waitOnDirChangeCount = 4;
            this.direction = -SPEED;
        }

        posX += this.direction;

        // Keep a minimum gap between the beasts.
        if (this.side == Sides.Left) {
            clampedX = _.clamp(posX, EDGE_PAD, this.otherBeast.x - BEAST_PAD);

            if (clampedX != posX) {
                this.waitOnDirChangeCount = 5;
                this.direction = -SPEED;
            }
        } else {
            clampedX = _.clamp(posX, this.otherBeast.x + BEAST_PAD, this.xMax);

            if (clampedX != posX) {
                this.waitOnDirChangeCount = 5;
                this.direction = SPEED;
            }
        }

        // TODO: Avoid saucer beam.
        this.x = clampedX;
        this.count++;
    }

    private pickDirection(): void {

        // Do a wiggle?
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

    pause(): void {
        // TODO
    }

    resume(): void {
        // TODO
    }

    run(otherBeast: Beast): void {
        this.otherBeast = otherBeast;
        TweenMax.ticker.addEventListener("tick", this.handleGameTick, this);
    }

}