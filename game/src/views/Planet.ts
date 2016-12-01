import {PlanetGuns} from "./PlanetGuns";
import {Saucer} from "./Saucer";
import Rectangle = createjs.Rectangle;
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./Game";
import {Ship} from "./Ship";
import {State} from "../State";

const GROUND_HEIGHT: number = 40;

export const WARN_COMPLETE:string = 'Planet.WARN_COMPLETE';

export class Planet extends lib.Planet {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    private guns: PlanetGuns;
    private _saucer: Saucer;

    get saucerDocked(): Boolean {
        if (this._saucer)
            return this._saucer.docked;

        return false;
    }

    private saucerArea: Rectangle;
    private ship: Ship;

    private warnTween: TweenMax = new TweenMax(this, 0, {});

    private state: State = State.getInstance();

    // on the stage:
    private ground: MovieClip;

    constructor() {
        super();
    }

    destroy(): void {
        this._destroyed = true;

        this.guns.destroy();
        this._saucer.destroy();

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    private createSaucer(): void {

        this._saucer = new Saucer(this.ship, this.saucerArea);
        this._saucer.x = this.ship.x;
        this._saucer.y = this.ship.y;

        this.addChildAt(this._saucer, 0);
    }

    private createGuns(): void {
        // TODO: add guns on proper levels
        if (this.state.level >= 1) {
            this.guns = new PlanetGuns(this._saucer, this.saucerArea);
            this.addChildAt(this.guns, 0);
        }

        this.guns.run();
    }

    getEntryAnimation(): TweenMax {
        return TweenMax.to(this.ground, .3, {
            y: '-=' + GROUND_HEIGHT
        });
    }

    getExitAnimation(): TweenMax {
        return TweenMax.to(this.ground, .3, {
            y: CANVAS_HEIGHT
        });
    }

    pause(): void {
        this.guns.pause();
        // TODO
    }

    resume(): void {
        this.guns.resume();
        // TODO
    }

    run(ship: Ship): void {

        this.ship = ship;

        let xOffset: number = 42;
        let shipBottomY: number = this.ship.y + this.ship.bottomDistance;

        this.saucerArea = new Rectangle(xOffset, shipBottomY, CANVAS_WIDTH - xOffset * 2, CANVAS_HEIGHT - shipBottomY - GROUND_HEIGHT - 50);

        this.createSaucer();
        this.createGuns();

        this.startWarningTimer();

        // TODO: More...
    }

    reset(): void {
        this._saucer.destroy();
        if (this.contains(this._saucer)) {
            this.removeChild(this._saucer);
        }
        this._saucer = null;

        this.guns.destroy();
        if (this.contains(this.guns)) {
            this.removeChild(this.guns);
        }
        this.guns = null;

        // TODO: More to reset?
    }

    private startWarningTimer(): void {

        // TODO: Determine this delay by the level.
        let warningDelay: number = 10;

        this.warnTween = TweenMax.delayedCall(warningDelay, this.handleWarningTime, [], this);
    }

    private handleWarningTime(): void {
        this.warnTween.kill();
        this.ship.warn();

        // TODO: Determine this delay by the level?
        let warningDelay: number = 7;

        this.warnTween = TweenMax.delayedCall(warningDelay, this.handleWarningComplete, [], this);
    }

    private handleWarningComplete(): void {
        this.warnTween.kill();
        this.ship.stopWarn();

        this.dispatchEvent(WARN_COMPLETE);
    }

}