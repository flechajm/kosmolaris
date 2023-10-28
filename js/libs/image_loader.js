class ImageLoader {
    #backgroundImages = {
        path: "img/bg/",
        count: 17,
        images: [
            "bg{index}.jpg",
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
        path: "images/elements/",
        images: [

        ],
    };

    async loadAll() {
        await this.#preloadImages(this.#elements);
        await this.#preloadImages(this.#backgroundImages);
        await this.#preloadImages(this.#socialMediaImages);
        await this.#preloadImages(this.#gifs);
    }

    async #loadImage(src) {
        const img = new Image();

        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
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