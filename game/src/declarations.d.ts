import Stage = createjs.Stage;
import MovieClip = createjs.MovieClip;

// Items auto included by webpack:
declare let _:any;

declare let stage:MovieClip;
/*declare let lib:{
    Game:MovieClip,
    Meteor:ObjectConstructor,
    Ship:MovieClip
};*/
declare namespace lib{
    export class Game extends MovieClip{}
    export class Meteor extends MovieClip{}
    export class Ship extends MovieClip{}
    export class Saucer extends MovieClip{}
    export class Shot extends MovieClip{}
    export class Planet extends MovieClip{}
    export class PlanetGuns extends MovieClip{}
}