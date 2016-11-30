import {Game} from "./views/Game";

let game:Game = new Game();

// exported items in this file are added as a global via webpack so it picks up the vars
// set by animate cc in the html.
export function run(){
    stage.addChild(game);
    game.run();
}