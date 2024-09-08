import Achievement from "../core/classes/achievement.js";
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
            }),

            // 200 Elements
            new Achievement({
                id: 5,
                discoveredElements: 200,
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
                rules: [
                    new Rule({ elementToUnlock: 'michonne' })
                ],
                icon: 'michonne'
            }),

            // Harry Potter
            new Achievement({
                id: 13,
                rules: [
                    new Rule({ elementToUnlock: 'harry-potter' })
                ],
                icon: 'harry-potter'
            }),

            // Jon Snow
            new Achievement({
                id: 14,
                rules: [
                    new Rule({ elementToUnlock: 'jon-snow' })
                ],
                icon: 'jon-snow'
            }),

            // Negan & Lucille
            new Achievement({
                id: 15,
                rules: [
                    new Rule({ elementToUnlock: 'negan' })
                ],
                icon: 'negan'
            }),

            // COVID-19
            new Achievement({
                id: 16,
                rules: [
                    new Rule({ elementToUnlock: 'covid' })
                ]
            }),

            // Lucille
            new Achievement({
                id: 17,
                rules: [
                    new Rule({ elementToUnlock: 'lucille' })
                ],
                icon: 'lucille'
            }),

            // World
            new Achievement({
                id: 18,
                rules: [
                    new Rule({ elementToUnlock: 'world' })
                ],
                icon: 'world'
            }),

            // Planet of Apes
            new Achievement({
                id: 19,
                rules: [
                    new Rule({ elementToUnlock: 'planet-apes' })
                ],
                icon: 'planet-apes'
            }),

            // Don't be cruel
            new Achievement({
                id: 20,
                rules: [
                    new Rule({
                        elementToUnlock: 'science',
                        elementRequired: 'monkey',
                    })
                ],
                icon: 'science'
            }),

            // Bruce Lee
            new Achievement({
                id: 21,
                rules: [
                    new Rule({ elementToUnlock: 'bruce-lee' })
                ],
                icon: 'bruce-lee'
            }),

            // Frankenstein
            new Achievement({
                id: 22,
                rules: [
                    new Rule({ elementToUnlock: 'frankenstein' })
                ],
                icon: 'frankenstein'
            }),

            // Leatherface
            new Achievement({
                id: 23,
                rules: [
                    new Rule({ elementToUnlock: 'leatherface' })
                ]
            }),

            // The Kosmolaris Chainsaw Massacre
            new Achievement({
                id: 24,
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
            }),

            // Apollo 11
            new Achievement({
                id: 25,
                rules: [
                    new Rule({ elementToUnlock: 'apollo-11' })
                ],
                icon: 'apollo-11'
            }),

            // Challenger
            new Achievement({
                id: 26,
                rules: [
                    new Rule({ elementToUnlock: 'challenger' })
                ],
                icon: 'challenger'
            }),

            // LOST
            new Achievement({
                id: 27,
                rules: [
                    new Rule({ elementToUnlock: 'lost' })
                ],
                icon: 'lost'
            }),


            // Titanic
            new Achievement({
                id: 28,
                rules: [
                    new Rule({ elementToUnlock: 'titanic' })
                ],
                icon: 'titanic'
            }),
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbAchievements;