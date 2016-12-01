import {Sides} from "./Game";
import DisplayObject = createjs.DisplayObject;

export class Meteor extends lib.Meteor {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    private static meteorsTimeline: TimelineMax = new TimelineMax();

    private _tween: TweenMax;
    get tween(): TweenMax {
        return this._tween;
    }

    constructor(public side: number, public label: string, public wiggle: boolean = false) {
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

        if (wiggle) frameName = 'wiggle_' + frameName;

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

        var time: number = 4;

        // TODO: Increase the speed as levels progress
        // TODO: Speed and increases differ for X & Y directions
        this._tween = TweenMax.to(this, time, {
            x: target.x,
            y: target.y,
            useFrames: true,
            ease: Linear.easeInOut,
            onStart: () => {
                if (this.wiggle) {
                    // TODO: Play meteor wiggle sound.
                } else {
                    // TODO: Play meteor sound.
                }
            }
        });

        return this._tween;
    }

    pause(): void {
        Meteor.meteorsTimeline.pause();
    }

    resume(): void {
        Meteor.meteorsTimeline.resume();
    }

}