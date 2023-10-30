import Achievement from "../core/classes/achievement.js";

class DbAchievements {
    #db;

    constructor() {
        this.#db = [
            // Welcome
            new Achievement({
                id: 1,
                discoveredElements: 1,
            }),

            // 50 Elements
            new Achievement({
                id: 2,
                discoveredElements: 50,
            }),

            // 100 Elements
            new Achievement({
                id: 3,
                discoveredElements: 100,
            }),

            // 150 Elements
            new Achievement({
                id: 4,
                discoveredElements: 150,
                enabled: false,
            }),

            // 200 Elements
            new Achievement({
                id: 5,
                discoveredElements: 200,
                enabled: false,
            }),

            // 250 Elements
            new Achievement({
                id: 6,
                discoveredElements: 250,
                enabled: false,
            }),

            // 300 Elements
            new Achievement({
                id: 7,
                discoveredElements: 300,
                enabled: false,
            }),

            // 350 Elements
            new Achievement({
                id: 8,
                discoveredElements: 350,
                enabled: false,
            }),

            // 400 Elements
            new Achievement({
                id: 9,
                discoveredElements: 400,
                enabled: false,
            }),

            // 450 Elements
            new Achievement({
                id: 10,
                discoveredElements: 450,
                enabled: false,
            }),

            // 500 Elements
            new Achievement({
                id: 11,
                discoveredElements: 500,
                enabled: false,
            }),

            // Michonne
            new Achievement({
                id: 12,
                elementToUnlock: 'michonne',
            }),

            // Harry Potter
            new Achievement({
                id: 13,
                elementToUnlock: 'harry-potter',
            }),

            // Jon Snow
            new Achievement({
                id: 14,
                elementToUnlock: 'jon-snow',
            }),

            // Negan & Lucille
            new Achievement({
                id: 15,
                elementToUnlock: 'negan',
            }),

            // COVID-19
            new Achievement({
                id: 16,
                elementToUnlock: 'covid',
            }),

            // Lucille
            new Achievement({
                id: 17,
                elementToUnlock: 'lucille',
            }),

            // World
            new Achievement({
                id: 18,
                elementToUnlock: 'world',
            }),

            // Planet of Apes
            new Achievement({
                id: 19,
                elementToUnlock: 'planet-apes',
            }),

            // Don't be cruel
            new Achievement({
                id: 20,
                elementToUnlock: 'cience',
                elementRequired: 'monkey',
            }),
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbAchievements;