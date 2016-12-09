import Sound = createjs.Sound;
import {MAX_NUM_METEORS} from "../views/Game";
import AbstractSoundInstance = createjs.AbstractSoundInstance;

export const SOUNDS_LOADED_EVENT: string = 'Sounds.SOUNDS_LOADED_EVENT';

export class Sounds extends createjs.EventDispatcher {

    private static instance: Sounds = null;

    static getInstance(): Sounds {

        if (Sounds.instance === null) {
            Sounds.instance = new Sounds();
        }

        return Sounds.instance;
    }

    private constructor() {
        super();
    }

    private handleSoundsLoaded(): void {
        this.dispatchEvent(SOUNDS_LOADED_EVENT);
    }

    run(): void {
        Sound.on('fileload', () => this.handleSoundsLoaded());
        Sound.registerSounds([{
            src: 'cosmic-arkish.mp3', data: {
                audioSprite: [
                    { id: 'meteor0', startTime: 0, duration: 330 },
                    { id: 'meteor1', startTime: .35 * 1000, duration: 330 },
                    { id: 'meteor2', startTime: .7 * 1000, duration: 330 },
                    { id: 'meteor3', startTime: 1.05 * 1000, duration: 330 },
                    { id: 'meteor4', startTime: 1.4 * 1000, duration: 330 },
                    { id: 'meteor5', startTime: 1.75 * 1000, duration: 330 },
                    { id: 'meteor6', startTime: 2.1 * 1000, duration: 330 },
                    { id: 'meteor7', startTime: 2.45 * 1000, duration: 330 },
                    { id: 'meteor8', startTime: 2.8 * 1000, duration: 330 },
                    { id: 'meteor9', startTime: 3.15 * 1000, duration: 330 },
                    { id: 'meteor10', startTime: 3.5 * 1000, duration: 330 },
                    { id: 'meteor11', startTime: 3.85 * 1000, duration: 330 },
                    { id: 'meteor12', startTime: 4.2 * 1000, duration: 330 },
                    { id: 'meteor13', startTime: 4.55 * 1000, duration: 330 },
                    { id: 'meteor14', startTime: 4.9 * 1000, duration: 330 },
                    { id: 'meteor15', startTime: 5.25 * 1000, duration: 330 },
                    { id: 'meteor16', startTime: 5.6 * 1000, duration: 330 },
                    { id: 'meteor17', startTime: 5.95 * 1000, duration: 330 },
                    { id: 'meteor18', startTime: 6.3 * 1000, duration: 330 },
                    { id: 'meteor19', startTime: 6.65 * 1000, duration: 330 },
                    { id: 'meteor20', startTime: 7 * 1000, duration: 330 },
                    { id: 'meteor21', startTime: 7.35 * 1000, duration: 330 },
                    { id: 'meteor22', startTime: 7.7 * 1000, duration: 330 },
                    { id: 'meteor23', startTime: 8.05 * 1000, duration: 330 },
                    { id: 'meteor24', startTime: 8.4 * 1000, duration: 330 },
                    { id: 'meteor25', startTime: 8.75 * 1000, duration: 330 },
                    { id: 'meteor26', startTime: 9.1 * 1000, duration: 330 },
                    { id: 'meteor27', startTime: 9.45 * 1000, duration: 330 },
                    { id: 'meteor28', startTime: 9.8 * 1000, duration: 330 },
                    { id: 'meteor29', startTime: 10.15 * 1000, duration: 330 },

                    { id: 'waver0', startTime: 11.46 * 1000, duration: 330 },
                    { id: 'waver1', startTime: 11.81 * 1000, duration: 330 },
                    { id: 'waver2', startTime: 12.16 * 1000, duration: 330 },
                    { id: 'waver3', startTime: 12.5 * 1000, duration: 330 },
                    { id: 'waver4', startTime: 12.85 * 1000, duration: 330 },
                    { id: 'waver5', startTime: 13.2 * 1000, duration: 330 },
                    { id: 'waver6', startTime: 13.54 * 1000, duration: 330 },
                    { id: 'waver7', startTime: 13.89 * 1000, duration: 330 },
                    { id: 'waver8', startTime: 14.24 * 1000, duration: 330 },
                    { id: 'waver9', startTime: 14.58 * 1000, duration: 330 },
                    { id: 'waver10', startTime: 14.93 * 1000, duration: 330 },
                    { id: 'waver11', startTime: 15.28 * 1000, duration: 330 },
                    { id: 'waver12', startTime: 15.62 * 1000, duration: 330 },
                    { id: 'waver13', startTime: 15.9 * 1000, duration: 330 },
                    { id: 'waver14', startTime: 16.32 * 1000, duration: 330 },
                    { id: 'waver15', startTime: 16.67 * 1000, duration: 330 },
                    { id: 'waver16', startTime: 17.01 * 1000, duration: 330 },
                    { id: 'waver17', startTime: 17.37 * 1000, duration: 330 },
                    { id: 'waver18', startTime: 17.72 * 1000, duration: 330 },
                    { id: 'waver19', startTime: 18.07 * 1000, duration: 330 },
                    { id: 'waver20', startTime: 18.42 * 1000, duration: 330 },
                    { id: 'waver21', startTime: 18.77 * 1000, duration: 330 },
                    { id: 'waver22', startTime: 19.12 * 1000, duration: 330 },
                    { id: 'waver23', startTime: 19.48 * 1000, duration: 330 },
                    { id: 'waver24', startTime: 19.83 * 1000, duration: 330 },
                    { id: 'waver25', startTime: 20.18 * 1000, duration: 330 },
                    { id: 'waver26', startTime: 20.53 * 1000, duration: 330 },
                    { id: 'waver27', startTime: 20.88 * 1000, duration: 330 },
                    { id: 'waver28', startTime: 21.23 * 1000, duration: 330 },
                    { id: 'waver29', startTime: 21.58 * 1000, duration: 330 },

                    { id: 'meteor-ting', startTime: 10.5 * 1000, duration: 390 },
                    { id: 'ship-shot', startTime: 10.89 * 1000, duration: 250 }
                ]
            }
        }]);
    }

    playMeteorSound(waver: boolean, meteorNumber: number, ofTotal: number): AbstractSoundInstance {

        let pitchIndex: number = 0;

        if (meteorNumber > 0) {
            pitchIndex = Math.floor((meteorNumber / ofTotal) * MAX_NUM_METEORS) - 1;
        }

        console.log('PLAY SOUND:', 'meteor' + pitchIndex);

        if (waver) {
            return Sound.play('waver' + pitchIndex, { delay: 300 });
        } else {
            return Sound.play('meteor' + pitchIndex, { delay: 300 });
        }

    }

    playFinalMeteorSound(): AbstractSoundInstance {
        return Sound.play('meteor-ting');
    }

    playShipShotSound(): AbstractSoundInstance {
        return Sound.play('ship-shot');
    }

}