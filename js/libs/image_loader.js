import LanguageManager from "./language_manager.js";

class ImageLoader {
    #totalImages = 0;
    #loadedImages = 0;
    #loaderDOM;
    #preloadedBackgrounds = [];

    #backgroundImages = {
        path: "img/bg/",
        count: 17,
        images: [
            "bg{index}.jpg",
        ],
    };

    #logoImages = {
        path: "img/logo/",
        images: [
            "logo_s.png",
            "logo_m.png",
            "logo_xl.png",
        ],
    };

    #miscImages = {
        path: "img/misc/",
        images: [
            "ar.png",
            "chevron.png",
            "cursor_default.png",
            "flare.png",
            "pointer_close.png",
            "pointer_default.png",
            "pointer_open.png",
            "pointer_point.png",
            "popup_bg.png",
            "tooltip_border.png",
            "top_bar.jpg",
            "trophy.png",
        ],
    };

    #socialMediaImages = {
        path: "img/social/",
        images: [
            "github.png",
            "twitter.png",
            "youtube.png",
        ],
    };

    #gifs = {
        path: "img/gif/",
        images: [
            "combine.gif",
            "dblclick.gif",
            "drag.gif",
            "rightclick.gif"
        ],
    };

    #elements = {
        path: "img/elements/",
        images: [
            "acid-rain.png",
            "acid.png",
            "air.png",
            "airplane.png",
            "apollo-11.png",
            "asteroid.png",
            "astronaut.png",
            "bacterium.png",
            "baker.png",
            "barbed-wire.png",
            "baseball-bat.png",
            "batter.png",
            "beach.png",
            "beef.png",
            "bicycle.png",
            "big-fish.png",
            "bird.png",
            "blade.png",
            "blue-cheese.png",
            "boat.png",
            "bone.png",
            "bread.png",
            "bruce-lee.png",
            "burger.png",
            "butcher.png",
            "car.png",
            "carpenter.png",
            "chain.png",
            "chainsaw.png",
            "challenger.png",
            "cheese.png",
            "chef.png",
            "chicken.png",
            "clouds.png",
            "coal.png",
            "cold.png",
            "combustion.png",
            "continent.png",
            "covid.png",
            "cow.png",
            "dagger.png",
            "death.png",
            "diamond.png",
            "dinosaur.png",
            "direwolf.png",
            "dirt.png",
            "disease.png",
            "dog.png",
            "domestic-animal.png",
            "dough.png",
            "dust.png",
            "earth.png",
            "earthquake.png",
            "egg.png",
            "electricity.png",
            "energy.png",
            "engine.png",
            "explosion.png",
            "family.png",
            "farm.png",
            "farmer.png",
            "field.png",
            "fire.png",
            "fish.png",
            "flour.png",
            "fly.png",
            "forest.png",
            "fossil.png",
            "fountain.png",
            "frankenstein.png",
            "galaxy.png",
            "gas.png",
            "gasoline.png",
            "gem.png",
            "ghost-ship.png",
            "ghost.png",
            "glass.png",
            "grass.png",
            "ham.png",
            "hammer.png",
            "hammerhead-shark.png",
            "hand-saw.png",
            "harry-potter.png",
            "heat.png",
            "helicopter.png",
            "hord.png",
            "human.png",
            "human_bkp.png",
            "hurricane.png",
            "hydrogen.png",
            "ice.png",
            "iceberg.png",
            "iron.png",
            "island.png",
            "jon-snow.png",
            "jungle.png",
            "jupiter.png",
            "kosmolaris-park.png",
            "katana.png",
            "lake.png",
            "land.png",
            "larva.png",
            "lava.png",
            "leatherface.png",
            "lens.png",
            "life.png",
            "light.png",
            "livestock.png",
            "lost.png",
            "love.png",
            "lucille.png",
            "magic-wand.png",
            "magic-wand_bkp.png",
            "magic.png",
            "magma.png",
            "mercury.png",
            "metal.png",
            "michonne.png",
            "michonne_bkp.png",
            "microscope.png",
            "milk.png",
            "milkshake.png",
            "milky-way.png",
            "mineral-rock.png",
            "monkey.png",
            "monster.png",
            "moon.png",
            "motorcycle.png",
            "mountain.png",
            "mud.png",
            "nebula.png",
            "negan.png",
            "neptune.png",
            "nest.png",
            "night.png",
            "nunchaku.png",
            "ocean.png",
            "oceanic-trench.png",
            "orca.png",
            "oven.png",
            "oxygen.png",
            "pandemic.png",
            "paper.png",
            "pasta.png",
            "petroleum.png",
            "phoenix.png",
            "pickaxe.png",
            "pig.png",
            "pizza.png",
            "planet-apes.png",
            "planet-earth.png",
            "planet.png",
            "plant.png",
            "population.png",
            "pork.png",
            "poultry.png",
            "pressure.png",
            "rain.png",
            "ray.png",
            "rope.png",
            "salt.png",
            "samurai.png",
            "sand.png",
            "saw.png",
            "science.png",
            "scientist.png",
            "scissors.png",
            "sea.png",
            "shark.png",
            "sheep.png",
            "ship.png",
            "shovel.png",
            "skeleton.png",
            "sky.png",
            "smoke.png",
            "smoked-ham.png",
            "snow.png",
            "soil.png",
            "solar-system.png",
            "space.png",
            "spacecraft.png",
            "star.png",
            "steam.png",
            "steel.png",
            "stick.png",
            "stone.png",
            "storm.png",
            "strong-wind.png",
            "submarine.png",
            "sulphur.png",
            "sulphuric-acid.png",
            "sun.png",
            "sword.png",
            "swordfish.png",
            "swordsman.png",
            "the-witcher.png",
            "thread.png",
            "time.png",
            "titanic.png",
            "tornado.png",
            "tree.png",
            "truck.png",
            "tsunami.png",
            "turtle.png",
            "universe.png",
            "uranus.png",
            "valyrian-steel.png",
            "venus.png",
            "virus.png",
            "volcano.png",
            "water.png",
            "weather.png",
            "werewolf.png",
            "whale.png",
            "wheat.png",
            "wheel.png",
            "wild-animal.png",
            "wind.png",
            "windmill.png",
            "wizard.png",
            "wolf.png",
            "wood.png",
            "wool.png",
            "workbench.png",
            "world.png",
            "zombie.png",
        ]
    }

    async loadAll() {
        this.#loaderDOM = $('#loader').find('span');

        this.#totalImages = this.#backgroundImages.count
            + this.#logoImages.images.length
            + this.#miscImages.images.length
            + this.#socialMediaImages.images.length
            + this.#gifs.images.length
            + this.#elements.images.length;

        await this.#preloadImages(this.#backgroundImages);
        await this.#preloadImages(this.#logoImages);
        await this.#preloadImages(this.#miscImages);
        await this.#preloadImages(this.#socialMediaImages);
        await this.#preloadImages(this.#gifs);
        await this.#preloadImages(this.#elements);
    }

    async #loadImage(src) {
        const img = new Image();
        const langData = LanguageManager.getData();


        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.#loadedImages += 1;
                const percent = ((100 * this.#loadedImages) / this.#totalImages).toFixed(0);
                this.#loaderDOM.html(langData.common.loading.replace('{percent}', percent));

                resolve(img);
            };
            img.onerror = e => reject(e);
            img.src = src;
        });
    }

    async #preloadImages(arrayImages) {
        for (const image of arrayImages.images) {
            let path = arrayImages.path;
            let fileName = '';
            if (arrayImages.count !== undefined) {
                for (let index = 1; index <= arrayImages.count; index++) {
                    fileName = `${path}${image.replace('{index}', index)}`;
                    await this.#loadImage(fileName);
                    this.#preloadedBackgrounds.push(fileName);
                }
            } else {
                fileName = `${path}${image}`;
                await this.#loadImage(fileName);
            }
        };
    }

    getPreloadedBackgrounds() {
        return this.#preloadedBackgrounds;
    }
}

export default ImageLoader;