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

            // Michonne
            new Achievement({
                id: 2,
                elementToUnlock: 'michonne',
            }),

            // Harry Potter
            new Achievement({
                id: 3,
                elementToUnlock: 'harry-potter',
            }),

            // Jon Snow
            new Achievement({
                id: 4,
                elementToUnlock: 'jon-snow',
            }),

            // Negan & Lucille
            new Achievement({
                id: 5,
                elementToUnlock: 'negan',
            }),

            // COVID-19
            new Achievement({
                id: 6,
                elementToUnlock: 'covid',
            }),

            // Lucille
            new Achievement({
                id: 7,
                elementToUnlock: 'lucille',
            }),

            // World
            new Achievement({
                id: 8,
                elementToUnlock: 'world',
            }),
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbAchievements;