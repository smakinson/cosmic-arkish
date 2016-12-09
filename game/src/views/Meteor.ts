import {Sides} from "./Game";
import DisplayObject = createjs.DisplayObject;
import {State} from "../State";
import {Sounds} from "../io/Sounds";
import AbstractSoundInstance = createjs.AbstractSoundInstance;

export class Meteor extends lib.Meteor {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    private _tween: TweenMax;
    get tween(): TweenMax {
        return this._tween;
    }

    private playingMeteorSound: AbstractSoundInstance;
    private playingMeteorTingSound: AbstractSoundInstance;

    private state: State = State.getInstance();
    private sounds: Sounds = Sounds.getInstance();

    constructor(public side: number, public label: string, public meteorNum: number, public ofTotalMeteors: number, public waver: boolean = false) {
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

        if(this.playingMeteorSound)this.playingMeteorSound.stop();
        if(this.playingMeteorTingSound)this.playingMeteorTingSound.stop();

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
                this.playingMeteorSound = this.sounds.playMeteorSound(this.waver, this.meteorNum, this.ofTotalMeteors);

                if(this.state.inSpace) {
                    if (this.meteorNum == this.ofTotalMeteors - 1) {
                        this.playingMeteorTingSound = this.sounds.playFinalMeteorSound();
                    }
                }
            }
        });

        return this._tween;
    }

}