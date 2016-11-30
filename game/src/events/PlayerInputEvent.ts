
export class PlayerInputEvent extends createjs.Event{

    static ON_INPUT:string = 'events.PlayerInputEvent.onInput';
    static ON_INPUT_STOP:string = 'events.PlayerInputEvent.onInputStop';

    direction:number;
    angle:number;

    constructor(type:string, direction?:number, angle?:number, bubbles?:boolean, cancelable?:boolean){
        super(type, bubbles, cancelable);

        this.direction = direction;
        this.angle = angle;
    }

    clone():PlayerInputEvent{
        return new PlayerInputEvent(this.type, this.direction, this.angle, this.bubbles, this.cancelable);
    }
}