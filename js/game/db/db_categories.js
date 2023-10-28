import Category from "../core/classes/category.js";

class DbCategories {
    #db;

    constructor() {
        this.#db = [
            // Four elements
            new Category({
                id: 1,
                color: '#be85df',
            }),

            // Abstracts
            new Category({
                id: 2,
                color: '#c9a965',
            }),

            // Space
            new Category({
                id: 3,
                color: '#c9a965',
            }),

            // Fiction
            new Category({
                id: 4,
                color: '#c9a965',
            }),

            // Gaseous
            new Category({
                id: 5,
                color: '#c9a965',
            }),

            // Liquids
            new Category({
                id: 6,
                color: '#c9a965',
            }),

            // Materials
            new Category({
                id: 7,
                color: '#c9a965',
            }),

            // Minerals
            new Category({
                id: 8,
                color: '#c9a965',
            }),

            // Natural
            new Category({
                id: 9,
                color: '#c9a965',
            }),

            // Objects
            new Category({
                id: 10,
                color: '#c9a965',
            }),

            // Life
            new Category({
                id: 11,
                color: '#c9a965',
            }),
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbCategories;