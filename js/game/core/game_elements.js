import DbElements from "../db/db_elements.js";

import LanguageManager from "../../libs/language_manager.js";

/**
 * Clase que maneja los elementos.
 */
class GameElements {
    /**
     * Lista de elementos disponibles en el juego.
     */
    static #elements = [];

    /**
     * Instancia todos los elementos.
     */
    static create() {
        this.#elements = new DbElements().getDB();
        this.#populateElements();
    }

    static #populateElements() {
        const langData = LanguageManager.getData();

        for (let i = 0; i < this.#elements.length; i++) {
            const element = this.#elements[i];
            const elementInfo = langData.elements.find((b) => b.id == element.id);

            element.name = elementInfo.name;
            element.description = elementInfo.description;
        }
    }

    /**
     * Obtiene un elemento mediante su Id.
     * @param {String} id Id del elemento.
     * @returns {Element} Element.
     */
    static getById(id) {
        return this.#elements.find((b) => b.id == id);
    }

    static getAll() {
        return this.#elements;
    }

    static getTotalElements() {
        return this.#elements.filter((e) => !e.isSpecial).length;
    }

    static getTotalSpecialElements() {
        return this.#elements.filter((e) => e.isSpecial).length;
    }

    static getDOM(uuid) {
        return $(`#${uuid}`);
    }
}

export default GameElements;