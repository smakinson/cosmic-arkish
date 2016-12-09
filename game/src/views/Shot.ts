import {Sides, CANVAS_WIDTH, CANVAS_HEIGHT} from "./Game";
import {Sounds} from "../io/Sounds";

export class Shot extends lib.Shot {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    private tween: TweenMax = new TweenMax(this, 0, {});

    private sounds: Sounds = Sounds.getInstance();

    constructor(public direction: Sides) {
        super();
        this.gotoAndStop(direction);
    }

    destroy(): void {
        this._destroyed = true;

        this.tween.kill();

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    fire(): TweenMax {

        let tweenProps: any = {
            x: this.x, y: this.y,
            ease: Linear.easeNone,
            onStart: () => {
                this.sounds.playShipShotSound();

            },
            onComplete: () => this.destroy()
        };

        switch (this.direction) {
            case Sides.Top:
                tweenProps.y = -100;
                break;
            case Sides.Right:
                tweenProps.x = CANVAS_WIDTH + 100;
                break;
            case Sides.Bottom:
                tweenProps.y = CANVAS_HEIGHT + 100;
                break;
            case Sides.Left:
                tweenProps.x = -100;
                break;
        }

        this.tween = TweenMax.to(this, .3, tweenProps);

        return this.tween;
    }
}