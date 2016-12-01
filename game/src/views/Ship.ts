import Rectangle = createjs.Rectangle;

const WIDTH: number = 350;
const HEIGHT: number = 110;

export class Ship extends lib.Ship {

    private _destroyed: boolean = false;
    get destroyed(): boolean {
        return this._destroyed;
    }

    get topEdgeDistance(): number {
        // TODO: Be sure this number is correct to artwork.
        return -71;
    }

    get bottomDistance(): number {
        // TODO: Be sure these numbers are correct to artwork.
        return this.portOpen ? 62 : 41;
    }

    portOpen: boolean = false;

    private warnTween: TweenMax = new TweenMax(this, 0, {});

    // on the stage:
    private port: MovieClip;
    private warning: MovieClip;

    constructor() {
        super();

        this.warning.visible = false;
    }

    destroy(): TweenMax {
        this._destroyed = true;

        this.stopWarn();

        // TODO: Stop sounds?
        // TODO: What else?

        // TODO: Make this a better animation.
        return TweenMax.to(this, .6, {
            alpha: 0,
            onStart: () => {
                // TODO: Play ship hit sound.
            },
            onComplete: () => {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        });
    }

    getHeight(): number {
        return HEIGHT * this.scaleY;
    }

    getWidth(): number {
        return WIDTH * this.scaleX;
    }

    openPort(): void {
        this.play();
        this.portOpen = true;
    }

    closePort(): void {
        this.play();
        this.portOpen = false;
    }

    warn(): void {
        this.warnTween = TweenMax.delayedCall(.3, this.toggleWarn, [], this);
        // TODO: Play warning sound
    }

    private toggleWarn(): void {
        this.warning.visible = !this.warning.visible;
        this.warn();
    }

    stopWarn(): void {
        this.warnTween.kill();
        this.warning.visible = false;
    }
}