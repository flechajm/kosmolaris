import Combination from "./classes/combination.js";

import GameLog from "./game_log.js";

import LanguageManager from "../../libs/language_manager.js";

class GameCombinationManager {
    static #combinations = [];
    static #elementsUnlocked = [];
    static #specialElementsUnlocked = [];

    static async init({ elementsUnlocked, specialElementsUnlocked }) {
        return new Promise((resolve) => {
            this.#elementsUnlocked = elementsUnlocked;
            this.#specialElementsUnlocked = specialElementsUnlocked;

            // Abstracts
            this.addCombination({ element1: 'human', element2: 'human', result: 'love' });
            this.addCombination({ element1: 'fire', element2: 'energy', result: 'heat' });
            this.addCombination({ element1: 'cold', element2: 'air', result: 'weather' });
            this.addCombination({ element1: 'heat', element2: 'air', result: 'weather' });
            this.addCombination({ element1: 'rain', element2: 'air', result: 'weather' });
            this.addCombination({ element1: 'air', element2: 'fire', result: 'energy' });
            this.addCombination({ element1: 'fire', element2: 'gas', result: 'explosion' });
            this.addCombination({ element1: 'air', element2: 'wind', result: 'cold' });
            this.addCombination({ element1: 'electricity', element2: 'air', result: 'light' });
            this.addCombination({ element1: 'magic-wand', element2: 'human', result: 'magic' });
            this.addCombination({ element1: 'tree', element2: 'sun', result: 'oxygen' });
            this.addCombination({ element1: 'air', element2: 'earth', result: 'pressure' });
            this.addCombination({ element1: 'sand', element2: 'glass', result: 'time' });

            // Space
            this.addCombination({ element1: 'gas', element2: 'pressure', result: 'star' });
            this.addCombination({ element1: 'planet', element2: 'planet', result: 'solar-system' });
            this.addCombination({ element1: 'solar-system', element2: 'nebula', result: 'milky-way' });
            this.addCombination({ element1: 'milky-way', element2: 'milky-way', result: 'galaxy' });
            this.addCombination({ element1: 'galaxy', element2: 'explosion', result: 'universe' });
            this.addCombination({ element1: 'planet', element2: 'fire', result: 'mercury' });
            this.addCombination({ element1: 'star', element2: 'explosion', result: 'nebula' });
            this.addCombination({ element1: 'continent', element2: 'continent', result: 'planet' });
            this.addCombination({ element1: 'planet', element2: 'oxygen', result: 'planet-earth' });
            this.addCombination({ element1: 'planet', element2: 'love', result: 'venus' });
            this.addCombination({ element1: 'star', element2: 'heat', result: 'sun' });
            this.addCombination({ element1: 'energy', element2: 'heat', result: 'sun' });
            this.addCombination({ element1: 'planet', element2: 'ice', result: 'uranus' });
            this.addCombination({ element1: 'solar-system', element2: 'stone', result: 'moon' });

            // Fiction
            this.addCombination({ element1: 'steel', element2: 'magic', result: 'valyrian-steel' });
            this.addCombination({ element1: 'wizard', element2: 'ray', result: 'harry-potter' });
            this.addCombination({ element1: 'zombie', element2: 'zombie', result: 'hord' });
            this.addCombination({ element1: 'valyrian-steel', element2: 'snow', result: 'jon-snow' });
            this.addCombination({ element1: 'zombie', element2: 'katana', result: 'michonne' });
            this.addCombination({ element1: 'lucille', element2: 'human', result: 'negan' });
            this.addCombination({ element1: 'human', element2: 'death', result: 'zombie' });

            // Lifeforms
            this.addCombination({ element1: 'plant', element2: 'time', result: 'tree' });
            this.addCombination({ element1: 'life', element2: 'microscope', result: 'bacterium' });
            this.addCombination({ element1: 'tree', element2: 'tree', result: 'forest' });
            this.addCombination({ element1: 'human', element2: 'love', result: 'family' });
            this.addCombination({ element1: 'monkey', element2: 'time', result: 'human' });
            this.addCombination({ element1: 'human', element2: 'magic', result: 'wizard' });
            this.addCombination({ element1: 'forest', element2: 'life', result: 'monkey' });
            this.addCombination({ element1: 'planet-earth', element2: 'population', result: 'world' });
            this.addCombination({ element1: 'family', element2: 'family', result: 'population' });
            this.addCombination({ element1: 'energy', element2: 'water', result: 'life' });
            this.addCombination({ element1: 'bacterium', element2: 'death', result: 'virus' });

            // Gaseous
            this.addCombination({ element1: 'fire', element2: 'steam', result: 'gas' });
            this.addCombination({ element1: 'fire', element2: 'wood', result: 'smoke' });
            this.addCombination({ element1: 'steam', element2: 'air', result: 'clouds' });
            this.addCombination({ element1: 'water', element2: 'fire', result: 'steam' });

            // Liquids
            this.addCombination({ element1: 'rain', element2: 'earth', result: 'lake' });
            this.addCombination({ element1: 'volcano', element2: 'pressure', result: 'lava' });
            this.addCombination({ element1: 'clouds', element2: 'water', result: 'rain' });
            this.addCombination({ element1: 'earth', element2: 'fire', result: 'magma' });
            this.addCombination({ element1: 'lake', element2: 'water', result: 'sea' });
            this.addCombination({ element1: 'sea', element2: 'sea', result: 'ocean' });
            this.addCombination({ element1: 'rain', element2: 'wind', result: 'storm' });
            this.addCombination({ element1: 'earthquake', element2: 'ocean', result: 'tsunami' });
            this.addCombination({ element1: 'earthquake', element2: 'sea', result: 'tsunami' });

            // Materials
            this.addCombination({ element1: 'iron', element2: 'fire', result: 'steel' });
            this.addCombination({ element1: 'metal', element2: 'blade', result: 'barbed-wire' });
            this.addCombination({ element1: 'metal', element2: 'metal', result: 'iron' });
            this.addCombination({ element1: 'light', element2: 'glass', result: 'lens' });
            this.addCombination({ element1: 'human', element2: 'forest', result: 'wood' });
            this.addCombination({ element1: 'fire', element2: 'stone', result: 'metal' });
            this.addCombination({ element1: 'wood', element2: 'tool', result: 'stick' });
            this.addCombination({ element1: 'tree', element2: 'tool', result: 'paper' });
            this.addCombination({ element1: 'mineral-rock', element2: 'water', result: 'stone' });

            // Minerals
            this.addCombination({ element1: 'wind', element2: 'stone', result: 'sand' });
            this.addCombination({ element1: 'mountain', element2: 'pickaxe', result: 'gem' });
            this.addCombination({ element1: 'coal', element2: 'pressure', result: 'diamond' });
            this.addCombination({ element1: 'lava', element2: 'water', result: 'mineral-rock' });
            this.addCombination({ element1: 'pressure', element2: 'plant', result: 'coal' });
            this.addCombination({ element1: 'sea', element2: 'sun', result: 'salt' });
            this.addCombination({ element1: 'ocean', element2: 'sun', result: 'salt' });
            this.addCombination({ element1: 'sand', element2: 'fire', result: 'glass' });

            // Natural
            this.addCombination({ element1: 'star', element2: 'sky', result: 'night' });
            this.addCombination({ element1: 'air', element2: 'air', result: 'sky' });
            this.addCombination({ element1: 'land', element2: 'land', result: 'continent' });
            this.addCombination({ element1: 'pandemic', element2: 'world', result: 'covid' });
            this.addCombination({ element1: 'energy', element2: 'energy', result: 'electricity' });
            this.addCombination({ element1: 'virus', element2: 'human', result: 'disease' });
            this.addCombination({ element1: 'cold', element2: 'water', result: 'ice' });
            this.addCombination({ element1: 'tornado', element2: 'strong-wind', result: 'hurricane' });
            this.addCombination({ element1: 'ice', element2: 'sea', result: 'iceberg' });
            this.addCombination({ element1: 'land', element2: 'beach', result: 'island' });
            this.addCombination({ element1: 'earthquake', element2: 'earth', result: 'mountain' });
            this.addCombination({ element1: 'human', element2: 'time', result: 'death' });
            this.addCombination({ element1: 'rain', element2: 'cold', result: 'snow' });
            this.addCombination({ element1: 'disease', element2: 'population', result: 'pandemic' });
            this.addCombination({ element1: 'earth', element2: 'water', result: 'soil' });
            this.addCombination({ element1: 'water', element2: 'soil', result: 'plant' });
            this.addCombination({ element1: 'sand', element2: 'sea', result: 'beach' });
            this.addCombination({ element1: 'rain', element2: 'electricity', result: 'ray' });
            this.addCombination({ element1: 'earth', element2: 'energy', result: 'earthquake' });
            this.addCombination({ element1: 'earth', element2: 'earth', result: 'land' });
            this.addCombination({ element1: 'storm', element2: 'strong-wind', result: 'tornado' });
            this.addCombination({ element1: 'sky', element2: 'air', result: 'wind' });
            this.addCombination({ element1: 'wind', element2: 'wind', result: 'strong-wind' });
            this.addCombination({ element1: 'magma', element2: 'mountain', result: 'volcano' });

            // Objects
            this.addCombination({ element1: 'baseball-bat', element2: 'barbed-wire', result: 'lucille' });
            this.addCombination({ element1: 'stick', element2: 'stick', result: 'baseball-bat' });
            this.addCombination({ element1: 'metal', element2: 'tool', result: 'blade' });
            this.addCombination({ element1: 'wood', element2: 'metal', result: 'tool' });
            this.addCombination({ element1: 'blade', element2: 'stick', result: 'sword' });
            this.addCombination({ element1: 'sword', element2: 'tool', result: 'katana' });
            this.addCombination({ element1: 'lens', element2: 'glass', result: 'microscope' });
            this.addCombination({ element1: 'earth', element2: 'tool', result: 'shovel' });
            this.addCombination({ element1: 'stone', element2: 'tool', result: 'pickaxe' });
            this.addCombination({ element1: 'stick', element2: 'star', result: 'magic-wand' });


            resolve();
        });
    }

    static addCombination({ element1, element2, result }) {
        const combination = new Combination({
            element1: element1,
            element2: element2,
            result: result,
        });

        this.#combinations.push(combination);
    }

    static checkExists(elementId) {
        return (this.#elementsUnlocked.includes(elementId) || this.#specialElementsUnlocked.includes(elementId));
    }

    static unlockElement(elementUnlocked, element1, element2) {
        if (!this.checkExists(elementUnlocked.id)) {

            if (elementUnlocked.isSpecial) {
                this.#specialElementsUnlocked.push(elementUnlocked.id);
            } else {
                this.#elementsUnlocked.push(elementUnlocked.id);
            }

            const spanColorText = "<span style='color: {color}'>{text}</span>";

            const langData = LanguageManager.getData();
            const fixedName = elementUnlocked.name.replaceAll('<br />', ' ').replaceAll('<br>', ' ');
            const emoji = elementUnlocked.isSpecial ? '🍭' : '✨';
            const special = elementUnlocked.isSpecial ? spanColorText.replace('{color}', 'var(--color-special)').replace('{text}', ` ${langData.console.specialElement}`) : '';

            GameLog.write(langData.console.newElement
                .replace('{emoji}', emoji)
                .replace('{special}', special)
                .replace('{element1}', spanColorText.replace('{color}', element1.color).replace('{text}', element1.name))
                .replace('{element2}', spanColorText.replace('{color}', element2.color).replace('{text}', element2.name))
                .replace('{result}', spanColorText.replace('{color}', elementUnlocked.color).replace('{text}', fixedName))
            );
        }
    }

    static getElementsUnlocked() {
        return this.#elementsUnlocked;
    }

    static getSpecialElementsUnlocked() {
        return this.#specialElementsUnlocked;
    }

    static findCombination({ element1, element2 }) {
        for (const combination of this.#combinations) {
            if (
                (combination.element1 === element1 && combination.element2 === element2) ||
                (combination.element1 === element2 && combination.element2 === element1)
            ) {
                return combination.result;
            }

        }
        return null;
    }
}

export default GameCombinationManager;