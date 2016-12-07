import {Sides} from "./Game";
import DisplayObject = createjs.DisplayObject;
import {State} from "../State";

export class Meteor extends lib.Meteor {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    private _tween: TweenMax;
    get tween(): TweenMax {
        return this._tween;
    }

    private state: State = State.getInstance();

    constructor(public side: number, public label: string, public waver: boolean = false) {
        super();

        this.side = side;

        let frameName: string;

        switch (side) {
            case Sides.Top:
                frameName = 'top';
                break;
            case Sides.Right:
                frameName = 'right';
                break;
            case Sides.Bottom:
                frameName = 'bottom';
                break;
            case Sides.Left:
                frameName = 'left';
                break;
        }

        if (waver) frameName = 'wiggle_' + frameName;

        this.gotoAndStop(frameName);
    }

    destroy(): void {
        this._destroyed = true;
        this._tween.kill();

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    fireAt(target: DisplayObject): TweenMax {

        let time: number = this.state.meteorTweenDuration;

        // Make up for the slight bit of extra space under the ship.
        if(this.side == Sides.Bottom){
            time -= .4;
        }

        this._tween = TweenMax.to(this, time, {
            x: target.x,
            y: target.y,
            ease: Strong.easeOut,
            onStart: () => {
                if (this.waver) {
                    // TODO: Play meteor waver sound.
                } else {
                    // TODO: Play meteor sound.
                }
            }
        });

        return this._tween;
    }

}