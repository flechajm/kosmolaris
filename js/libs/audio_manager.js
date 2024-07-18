import Howl from "./howler.js";


class AudioManager {
    #index;
    #bgm;
    #sfx;
    #shuffledMusic = [];
    #bgmVolume;
    #sfxVolume;

    /**
     * Constructor of AudioManager.
     */
    constructor() {
        this.bgmOn = true;
        this.sfxOn = true;

        this.#index = 0;
        this.#bgm;
        this.#sfx;
        this.#bgmVolume;
        this.#sfxVolume;
        this.#shuffledMusic = this.shuffle();
    }

    /**
     * Inits and configure the Audio Manager.
     */
    init({ bgmVolume, sfxVolume }) {
        this.bindControls();
        this.setBGMVolume(bgmVolume);
        this.setSFXVolume(sfxVolume);
        this.playBGM(this.#index);
    }

    bindControls() {
        const audioManager = this;

        $('#previous-track').click(function () {
            audioManager.previousTrack();
        });

        $('#play-track').click(function () {
            audioManager.playResume();
        });

        $('#pause-track').click(function () {
            audioManager.playResume();
        });

        $('#next-track').click(function () {
            audioManager.nextTrack();
        });
    }

    /**
     * Plays the selected sound.
     * @param {soundTypes} sound Sound to play.
     */
    play(sound, volume) {
        const audioManager = this;
        volume = volume < 0 ? 0 : audioManager.getSFXVolume();

        this.#sfx = new Howl({
            src: [`audio/sfx/${sound}.ogg`],
            preload: true,
            volume: volume,
        });

        this.#sfx.play();
    }

    /**
     * Gets the music name.
     * @param {String} bgm BGM file.
     */
    getMusicName(bgm) {
        let indexOfSlash = bgm.lastIndexOf('/') + 1;
        let audionNameLength = bgm.length - 4;
        return `<span class='material'>   &nbsp;&nbsp;${bgm.substring(indexOfSlash, audionNameLength)}`;
    }

    /**
     * Stops the BGM and SFX.
     */
    stop() {
        if (this.#bgm != null) this.#bgm.unload();
        if (this.#sfx != null) this.#sfx.unload();
    }

    playResume() {
        if (this.#bgm != null) {
            if (this.#bgm.playing()) {
                this.#bgm.pause();
                $('#pause-track').hide();
                $('#play-track').show();

            } else {
                this.#bgm.play();
                $('#pause-track').show();
                $('#play-track').hide();
            }
        }
    }

    /**
     * Shuffles the music files.
     */
    shuffle() {
        if (this.#shuffledMusic.length == 0) {
            let musicFiles = [
                'Light Music - Floating Memories.ogg',
                'Light Music - Foggy Morning.ogg',
                'Light Music - Levitating Thoughts.ogg',
                'Light Music - Foggy Morning.ogg',
                'Relaxing Time - Relaxing Music Vol. 1.ogg',
                'Relaxing Time - Relaxing Music Vol. 12.ogg',
            ];
            let randomMusicFiles = this.#shuffleArray(musicFiles);
            for (var i = 0; i < randomMusicFiles.length; i++) {
                this.#shuffledMusic.push(`audio/bgm/${randomMusicFiles[i]}`);
            }
        }

        return this.#shuffledMusic;
    }

    nextTrack() {
        this.#index = this.#index + 1 > this.#shuffledMusic.length - 1 ? 0 : this.#index + 1;
        this.stop();
        this.playBGM(this.#index);
    }

    previousTrack() {
        this.#index = this.#index - 1 < 0 ? this.#shuffledMusic.length - 1 : this.#index - 1;
        this.stop();
        this.playBGM(this.#index);
    }

    playClick() {
        this.play('click', this.#sfxVolume);
    }

    playMouseHover() {
        this.play('mouse_hover', this.#sfxVolume);
    }

    playPlop() {
        this.play('plop', this.#sfxVolume);
    }

    playError() {
        this.play('error', this.#sfxVolume);
    }

    playMiss() {
        this.play('miss', this.#sfxVolume);
    }

    playUnlock() {
        this.play('unlock', this.#sfxVolume);
    }

    #shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    /**
     * Gets the SFX volume
     */
    getSFXVolume() {
        return this.#sfxVolume;
    }

    /**
     * Sets the SFX volume
     * @param {Number} volume Volume.
     */
    setSFXVolume(volume) {
        this.#sfxVolume = volume / 100;
        if (this.#sfx) {
            this.#sfx.volume(this.#sfxVolume);
        }
    }

    /**
     * Sets the BGM volume
     * @param {Number} volume Volume.
     */
    setBGMVolume(volume) {
        this.#bgmVolume = volume / 500;
        if (this.#bgm) {
            this.#bgm.volume(this.#bgmVolume);
        }
    }

    /**
     * Gets the BGM volume
     */
    getBGMVolume() {
        return this.#bgmVolume;
    }

    /**
     * Sets and configure the BGM with the selected sound.
     * @param {Number} index Sound index.
     */
    playBGM(index) {
        $('#play-track').hide();

        const audioManager = this;
        const randomList = this.#shuffledMusic;
        const actualBGM = randomList[index];
        const actualBGMName = this.getMusicName(actualBGM);

        $('.music').find('span').eq(0).html("Cargando...");

        this.#bgm = new Howl({
            src: [actualBGM],
            preload: true,
            autoplay: true,
            volume: audioManager.getBGMVolume(),
            onplay: function () {
                $('.music').css('display', 'flex');
                $('.music').find('span').eq(0).html(actualBGMName);
            },
            onend: function () {
                $('.music').css('display', 'none');
                audioManager.nextTrack(0);
            }
        });

        this.#bgm.play();
    }

    playMainMenu() {
        const audioManager = this;

        this.#bgm = new Howl({
            src: [],
            preload: true,
            autoplay: true,
            loop: true,
            volume: audioManager.getBGMVolume(),
        });

        this.#bgm.play();
    }
}

export default AudioManager;