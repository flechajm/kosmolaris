import LanguageManager from "./language_manager.js";

class ImageLoader {
    #totalImages = 0;
    #loadedImages = 0;
    #loaderDOM;

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
            "chevron.png",
            "popup_bg.png",
            "tooltip_border.png",
            "top_bar.jpg"
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

    async loadAll() {
        this.#loaderDOM = $('#loader').find('span');

        this.#totalImages = this.#backgroundImages.count
            + this.#logoImages.images.length
            + this.#miscImages.images.length
            + this.#socialMediaImages.images.length
            + this.#gifs.images.length;

        await this.#preloadImages(this.#backgroundImages);
        await this.#preloadImages(this.#logoImages);
        await this.#preloadImages(this.#miscImages);
        await this.#preloadImages(this.#socialMediaImages);
        await this.#preloadImages(this.#gifs);
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
                }
            } else {
                fileName = `${path}${image}`;
                await this.#loadImage(fileName);
            }
        };
    }
}

export default ImageLoader;