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

    constructor() {
        super();
        //this.setBounds(-226, -87, WIDTH, HEIGHT);
    }

    destroy(): TweenMax {
        this._destroyed = true;

        return TweenMax.to(this, .6, {
            alpha: 0,
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
}