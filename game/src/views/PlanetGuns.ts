import Rectangle = createjs.Rectangle;
import {CANVAS_HEIGHT} from "./Game";
import {Saucer} from "./Saucer";
import Point = createjs.Point;
import {State} from "../State";

export const SAUCER_HIT_EVENT: string = 'PlanetGuns.SAUCER_HIT_EVENT';

export class PlanetGuns extends lib.PlanetGuns {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    private tween: TweenMax = new TweenMax(this, 0, {});
    private shootQueueTween: TweenMax = new TweenMax(this, 0, {});

    private tickerListener: Function;

    private state: State = State.getInstance();

    // on the stage:
    private laser: MovieClip;
    private leftGun: MovieClip;
    private rightGun: MovieClip;

    constructor(public saucer: Saucer, public shootZone: Rectangle) {
        super();

        this.y = CANVAS_HEIGHT;

        this.laser.visible = false;

        this.tickerListener = createjs.Ticker.on('tick', this.handleGameTick, this);
    }

    destroy(): void {

        createjs.Ticker.off('tick', this.tickerListener);

        this._destroyed = true;

        this.laser.visible = false;

        this.tween.kill();
        TweenMax.killDelayedCallsTo(this.shoot);

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    private handleGameTick(): void {

        if (this.state.paused)return;

        // See if the saucer was hit
        let laserPosition: Point = this.localToGlobal(this.laser.x, this.laser.y);
        if (this.laser.visible && this.saucer.blowingUp == false) {
            if (laserPosition.y >= this.saucer.y - 5 && laserPosition.y <= this.saucer.y + this.saucer.getHeight()) {
                console.log('---> BLASTED the saucer! <---');
                this.dispatchEvent(SAUCER_HIT_EVENT);
            }
        }
    }

    pause(): void {

        this.tween.pause();
        this.shootQueueTween.pause();
        // TODO
    }

    resume(): void {

        this.tween.resume();
        this.shootQueueTween.resume();
        // TODO
    }

    run(): void {

        // Bring the guns to the repeat height.
        TweenMax.to(this, .5, { y: this.shootZone.y + this.shootZone.height, delay: .5 });

        // Begin the repeating up/down movement.
        // TODO: Vary speed by level?
        // TODO: Match the gun speed with the saucer speed?
        this.tween = TweenMax.to(this, 4, {
            y: this.shootZone.y,
            yoyo: true,
            repeat: -1,
            ease: Linear.easeNone,
            delay: 1
        });

        this.queueShot();
    }

    private queueShot(): void {
        // Begin shooting timer.
        // TODO: Speed this up by level.
        let shotDelay: number = 2;
        this.shootQueueTween = TweenMax.delayedCall(shotDelay, this.shoot, [], this);
    }

    private shoot(): void {
        this.laser.visible = true;
        this.shootQueueTween = TweenMax.delayedCall(.08, this.hideShot, [], this);


        // TODO: Play planet gun shot sound.
    }

    private hideShot(): void {
        this.laser.visible = false;
        this.queueShot();
    }
}