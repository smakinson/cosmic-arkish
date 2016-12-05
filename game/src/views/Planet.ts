import {PlanetGuns, SAUCER_HIT_EVENT} from "./PlanetGuns";
import {Saucer, SAUCER_DOCKED_EVENT} from "./Saucer";
import Rectangle = createjs.Rectangle;
import {CANVAS_HEIGHT, CANVAS_WIDTH, Sides} from "./Game";
import {Ship, SHIP_DESTROYED_EVENT} from "./Ship";
import {State} from "../State";
import {Beast} from "./Beast";

const GROUND_HEIGHT: number = 40;

export const WARN_COMPLETE_EVENT: string = 'Planet.WARN_COMPLETE_EVENT';
export const ALL_BEASTS_CAPTURED_EVENT: string = 'Planet.ALL_BEASTS_CAPTURED_EVENT';

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
    private beast1: Beast;
    private beast1Captured: boolean;
    private beast2: Beast;
    private beast2Captured: boolean;

    private handleSaucerDockedListener: Function;
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
            this._saucer.off(SAUCER_DOCKED_EVENT, this.handleSaucerDockedListener);
            this._saucer.destroy();
            if (this.contains(this._saucer)) {
                this.removeChild(this._saucer);
            }
        }
        this._saucer = null;
    }

    private destroyGuns(): void {
        if (this.guns) {
            this.guns.off(SAUCER_HIT_EVENT, this.handleSaucerHitListener);
            this.guns.destroy();
            if (this.contains(this.guns)) {
                this.removeChild(this.guns);
            }
        }
        this.guns = null;
    }

    private destroyBeasts(): void {
        if (this.beast1) {
            this.beast1.destroy();
            if (this.contains(this.beast1)) {
                this.removeChild(this.beast1);
            }
        }
        if (this.beast2) {
            this.beast2.destroy();
            if (this.contains(this.beast2)) {
                this.removeChild(this.beast2);
            }
        }
    }

    clearSky(): void {
        this.destroySaucer();
    }

    private createSaucer(): void {
        this._saucer = new Saucer(this.ship, this.saucerArea, [this.beast1, this.beast2]);
        this.addChildAt(this._saucer, 0);
        this.handleSaucerDockedListener = this._saucer.on(SAUCER_DOCKED_EVENT, this.handleSaucerDocked, this);
    }

    private createGuns(): void {
        // TODO: add guns on proper levels
        if (this.state.level > 1) {
            this.guns = new PlanetGuns(this._saucer, this.saucerArea);
            this.addChildAt(this.guns, 1);
            this.handleSaucerHitListener = this.guns.on(SAUCER_HIT_EVENT, this.handleSaucerHit, this);
            this.guns.run();
        }
    }

    private createBeasts(): void {
        this.beast1 = new Beast(Sides.Left, this._saucer);
        this.beast1.x = 200;

        this.beast2 = new Beast(Sides.Right, this._saucer);
        this.beast2.x = CANVAS_WIDTH - this.beast1.x;

        this.ground.addChild(this.beast1);
        this.ground.addChild(this.beast2);

        this.beast1.run(this.beast2);
        this.beast2.run(this.beast1);
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

    private handleSaucerDocked(): void {
        if (this.beast1Captured && this.beast2Captured) {

            // TODO: Anything else here?

            this.dispatchEvent(ALL_BEASTS_CAPTURED_EVENT);
        }
    }

    private handleSaucerHit(): void {
        this._saucer.blowUp();
        this.state.saucerHit();

        // TODO: Handle losing any collected beasts.
        // TODO:  Research if they are both lost if this was a return to the planet after one was collected.
    }

    pause(): void {
        if(this.guns)this.guns.pause();
        this.beast1.pause();
        this.beast2.pause();
        // TODO
    }

    resume(): void {
        if(this.guns)this.guns.resume();
        this.beast1.resume();
        this.beast2.resume();
        // TODO
    }

    run(ship: Ship): void {

        this.ship = ship;

        let xOffset: number = 42;
        let shipBottomY: number = this.ship.y + this.ship.bottomDistance;

        this.saucerArea = new Rectangle(xOffset, shipBottomY, CANVAS_WIDTH - xOffset * 2, CANVAS_HEIGHT - shipBottomY - GROUND_HEIGHT - 50);

        this.createBeasts();    // Create the beasts first so they can be handed to the saucer.
        this.createSaucer();
        this.createGuns();

        this.handleShipDestroyedListener = this.ship.on(SHIP_DESTROYED_EVENT, this.handleShipDestroyed, this);

        this.startWarningTimer();

        // TODO: More...
    }

    reset(): void {

        this.destroySaucer();
        this.destroyGuns();
        this.destroyBeasts();

        this.beast1Captured = false;
        this.beast2Captured = false;

        if (this.ship) {
            this.ship.off(SHIP_DESTROYED_EVENT, this.handleShipDestroyedListener);
        }

        // TODO: More to reset?
    }

    private startWarningTimer(): void {

        // TODO: Determine this delay by the level.
        let warningDelay: number = 300;

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