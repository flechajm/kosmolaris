import Achievement, { achievementType } from "../core/classes/achievement.js";
import Rule from "../core/classes/rule.js";

class DbAchievements {
    #db;

    constructor() {
        this.#db = [
            // Welcome
            new Achievement({
                id: 1,
                discoveredElements: 1,
            }),

            // 10 Elements
            new Achievement({
                id: 2,
                discoveredElements: 10,
            }),

            // 25 Elements
            new Achievement({
                id: 3,
                discoveredElements: 25,
            }),

            // 50 Elements
            new Achievement({
                id: 4,
                discoveredElements: 50,
            }),

            // 75 Elements
            new Achievement({
                id: 5,
                discoveredElements: 75,
            }),

            // 100 Elements
            new Achievement({
                id: 6,
                discoveredElements: 100,
                type: achievementType.milestone,
            }),

            // 125 Elements
            new Achievement({
                id: 7,
                discoveredElements: 125,
            }),

            // 150 Elements
            new Achievement({
                id: 8,
                discoveredElements: 150,
            }),

            // 175 Elements
            new Achievement({
                id: 9,
                discoveredElements: 175,
            }),

            // 200 Elements
            new Achievement({
                id: 10,
                discoveredElements: 200,
                type: achievementType.milestone,
            }),

            // 225 Elements
            new Achievement({
                id: 11,
                discoveredElements: 225,
                enabled: false,
            }),

            // 250 Elements
            new Achievement({
                id: 12,
                discoveredElements: 250,
                enabled: false,
            }),

            // 275 Elements
            new Achievement({
                id: 13,
                discoveredElements: 275,
                enabled: false,
            }),

            // 300 Elements
            new Achievement({
                id: 14,
                discoveredElements: 300,
                enabled: false,
            }),

            // 325 Elements
            new Achievement({
                id: 15,
                discoveredElements: 325,
                enabled: false,
            }),

            // 350 Elements
            new Achievement({
                id: 16,
                discoveredElements: 350,
                enabled: false,
            }),

            // 375 Elements
            new Achievement({
                id: 17,
                discoveredElements: 375,
                enabled: false,
            }),

            // 400 Elements
            new Achievement({
                id: 18,
                discoveredElements: 400,
                enabled: false,
            }),

            // 425 Elements
            new Achievement({
                id: 19,
                discoveredElements: 425,
                enabled: false,
            }),

            // 450 Elements
            new Achievement({
                id: 20,
                discoveredElements: 450,
                enabled: false,
            }),

            // 475 Elements
            new Achievement({
                id: 21,
                discoveredElements: 475,
                enabled: false,
            }),

            // 500 Elements
            new Achievement({
                id: 22,
                discoveredElements: 500,
                enabled: false,
            }),

            // Michonne
            new Achievement({
                id: 23,
                rules: [
                    new Rule({ elementToUnlock: 'michonne' })
                ],
            }),

            // Harry Potter
            new Achievement({
                id: 24,
                rules: [
                    new Rule({ elementToUnlock: 'harry-potter' })
                ],
            }),

            // Jon Snow
            new Achievement({
                id: 25,
                rules: [
                    new Rule({ elementToUnlock: 'jon-snow' })
                ],
            }),

            // Negan & Lucille
            new Achievement({
                id: 26,
                rules: [
                    new Rule({ elementToUnlock: 'negan' })
                ],
            }),

            // COVID-19
            new Achievement({
                id: 27,
                rules: [
                    new Rule({ elementToUnlock: 'covid' })
                ],
                type: achievementType.rare,
            }),

            // Lucille
            new Achievement({
                id: 28,
                rules: [
                    new Rule({ elementToUnlock: 'lucille' })
                ],
            }),

            // World
            new Achievement({
                id: 29,
                rules: [
                    new Rule({ elementToUnlock: 'world' })
                ],
                type: achievementType.rare,
            }),

            // Planet of Apes
            new Achievement({
                id: 30,
                rules: [
                    new Rule({ elementToUnlock: 'planet-apes' })
                ],
            }),

            // Don't be cruel
            new Achievement({
                id: 31,
                rules: [
                    new Rule({
                        elementToUnlock: 'science',
                        elementRequired: 'monkey',
                    })
                ],
                type: achievementType.rare,
            }),

            // Bruce Lee
            new Achievement({
                id: 32,
                rules: [
                    new Rule({ elementToUnlock: 'bruce-lee' })
                ],
            }),

            // Frankenstein
            new Achievement({
                id: 33,
                rules: [
                    new Rule({ elementToUnlock: 'frankenstein' })
                ],
            }),

            // Leatherface
            new Achievement({
                id: 34,
                rules: [
                    new Rule({ elementToUnlock: 'leatherface' })
                ],
            }),

            // The Kosmolaris Chainsaw Massacre
            new Achievement({
                id: 35,
                rules: [
                    new Rule({
                        elementToUnlock: 'beef',
                        elementRequired: 'leatherface'
                    }),
                    new Rule({
                        elementToUnlock: 'pork',
                        elementRequired: 'leatherface'
                    })
                ],
                type: achievementType.ultraRare,
            }),

            // Apollo 11
            new Achievement({
                id: 36,
                rules: [
                    new Rule({ elementToUnlock: 'apollo-11' })
                ],
            }),

            // Challenger
            new Achievement({
                id: 37,
                rules: [
                    new Rule({ elementToUnlock: 'challenger' })
                ],
            }),

            // LOST
            new Achievement({
                id: 38,
                rules: [
                    new Rule({ elementToUnlock: 'lost' })
                ],
            }),


            // Titanic
            new Achievement({
                id: 39,
                rules: [
                    new Rule({ elementToUnlock: 'titanic' })
                ],
            }),

            // The Witcher
            new Achievement({
                id: 40,
                rules: [
                    new Rule({ elementToUnlock: 'the-witcher' })
                ],
            }),

            // Kosmolaris Park
            new Achievement({
                id: 41,
                rules: [
                    new Rule({
                        elementToUnlock: 'kosmolaris-park',
                        elementRequired: 'science'
                    })
                ],
                type: achievementType.rare,
            }),
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbAchievements;