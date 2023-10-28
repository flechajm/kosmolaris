import GameElements from "./game_elements.js";
import DbCategories from "../db/db_categories.js";

import LanguageManager from "../../libs/language_manager.js";

/**
 * Clase que maneja las categorías.
 */
class GameCategories {
    /**
     * Lista de categorías disponibles en el juego.
     */
    static #categories = [];

    /**
     * Instancia todos los elementos.
     */
    static create() {
        this.#categories = new DbCategories().getDB();
        this.#populateCategories();
        this.#createFourElementsCategoryDOM();
        this.#bindCategory(1);
    }

    static #populateCategories() {
        const langData = LanguageManager.getData();

        for (let i = 0; i < this.#categories.length; i++) {
            const category = this.#categories[i];
            const categoryInfo = langData.categories.find((b) => b.id == category.id);

            category.name = categoryInfo.name;
            category.description = categoryInfo.description;
        }
    }

    /**
     * Obtiene una categoría mediante su Id.
     * @param {String} id Id de la categoría.
     * @returns {Element} Categoría.
     */
    static getById(id) {
        return this.#categories.find((b) => b.id == id);
    }

    static getAll() {
        return this.#categories;
    }

    static #createFourElementsCategoryDOM() {
        const category = this.getById(1);
        const sidebar = $('#sidebar-elements');

        const air = GameElements.getById('air');
        const fire = GameElements.getById('fire');
        const earth = GameElements.getById('earth');
        const water = GameElements.getById('water');

        sidebar.append(`<div id="category-1" class="category">
                            <div class="category-header">
                                <span>${category.name}</span>
                                <div class="chevron">
                                    <img />
                                </div>
                            </div>
                            <div class="category-content">
                                ${air.createElementDOM({})}
                                ${fire.createElementDOM({})}
                                ${earth.createElementDOM({})}
                                ${water.createElementDOM({})}
                            </div>
                        </div>`);
    }

    static addElementToCategory(elementId) {
        const element = GameElements.getById(elementId);
        const sidebar = $('#sidebar-elements');
        const categoryDOM = $(`#category-${element.category}`);

        if (categoryDOM.length > 0) {
            categoryDOM.find('.category-content').append(element.createElementDOM({}));
        } else {
            const category = this.getById(element.category);

            sidebar.append(`<div id="category-${element.category}" class="category">
                                <div class="category-header">
                                    <span>${category.name}</span>
                                    <div class="chevron">
                                        <img />
                                    </div>
                                </div>
                                <div class="category-content">
                                    ${element.createElementDOM({})}
                                </div>
                            </div>`);

            this.#bindCategory(element.category);
        }
    }

    static #bindCategory(categoryId) {
        const categoryDOM = $(`#category-${categoryId}`);
        const header = categoryDOM.find(".category-header");
        const content = categoryDOM.find(".category-content");

        header.click(function () {
            if (categoryDOM.hasClass('open')) {
                content.slideUp(100, function () {
                    categoryDOM.removeClass('open');
                });
            } else {
                categoryDOM.addClass('open');
                content.slideDown(100);
            }
        });

        header.click();
    }

    // static #bindSidebar() {
    //     const categoriesDOM = $('.category');

    //     categoriesDOM.each(function () {
    //         const categoryDOM = $(this);
    //         const header = categoryDOM.find(".category-header");
    //         const content = categoryDOM.find(".category-content");

    //         header.click(function () {
    //             if (categoryDOM.hasClass('open')) {
    //                 content.slideUp(100, function () {
    //                     categoryDOM.removeClass('open');
    //                 });
    //             } else {
    //                 categoryDOM.addClass('open');
    //                 content.slideDown(100);
    //             }
    //         });
    //     });

    //     categoriesDOM.find('.category-header:last').click();
    // }
}

export default GameCategories;