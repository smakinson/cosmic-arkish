import {PlanetGuns, SAUCER_HIT_EVENT} from "./PlanetGuns";
import {Saucer} from "./Saucer";
import Rectangle = createjs.Rectangle;
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./Game";
import {Ship, SHIP_DESTROYED_EVENT} from "./Ship";
import {State} from "../State";
import {Beasts} from "./Beasts";

const GROUND_HEIGHT: number = 40;

export const WARN_COMPLETE_EVENT: string = 'Planet.WARN_COMPLETE_EVENT';

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
    private beast1: Beasts;
    private beast2: Beasts;

    private handleSaucerHitListener: Function;
    private handleShipDestroyedListener: Function;

    private warnTween: TweenMax = new TweenMax(this, 0, {});

    private state: State = State.getInstance();

    // on the stage:
    private ground: MovieClip;

    constructor() {
        super();
    }

    destroy(): void {
        this._destroyed = true;

        this.reset();

        // TODO: Stop sounds?

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    private destroySaucer(): void {
        if (this._saucer) {
            this._saucer.destroy();
            if (this.contains(this._saucer)) {
                this.removeChild(this._saucer);
            }
        }
        this._saucer = null;
    }

    private destroyGuns(): void {
        if (this.guns) {
            this.guns.off(SAUCER_HIT_EVENT, this.handleSaucerHit);
            this.guns.destroy();
            if (this.contains(this.guns)) {
                this.removeChild(this.guns);
            }
        }
        this.guns = null;
    }

    clearSky(): void {
        this.destroySaucer();
    }

    private createSaucer(): void {
        this._saucer = new Saucer(this.ship, this.saucerArea);
        this.addChildAt(this._saucer, 0);
    }

    private createGuns(): void {
        // TODO: add guns on proper levels
        if (this.state.level >= 1) {
            this.guns = new PlanetGuns(this._saucer, this.saucerArea);
            this.addChildAt(this.guns, 1);
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

    private handleSaucerHit(): void {
        this._saucer.blowUp();
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

        this.handleSaucerHitListener = this.guns.on(SAUCER_HIT_EVENT, this.handleSaucerHit, this);
        this.handleShipDestroyedListener = this.ship.on(SHIP_DESTROYED_EVENT, this.handleShipDestroyed, this);

        this.startWarningTimer();

        // TODO: More...
    }

    reset(): void {

        this.destroySaucer();
        this.destroyGuns();

        if (this.ship) {
            this.ship.off(SHIP_DESTROYED_EVENT, this.handleShipDestroyed);
        }

        // TODO: More to reset?
    }

    private startWarningTimer(): void {

        // TODO: Determine this delay by the level.
        let warningDelay: number = 10;

        this.warnTween = TweenMax.delayedCall(warningDelay, this.handleWarningTime, [], this);
    }

    private handleShipDestroyed(): void {
        this.destroySaucer();
    }

    private handleWarningTime(): void {
        this.warnTween.kill();
        this.ship.warn();

        // TODO: Determine this delay by the level?
        let warningDelay: number = 3;

        this.warnTween = TweenMax.delayedCall(warningDelay, this.handleWarningComplete, [], this);
    }

    private handleWarningComplete(): void {
        this.warnTween.kill();
        this.ship.stopWarn();

        this.dispatchEvent(WARN_COMPLETE_EVENT);
    }

}