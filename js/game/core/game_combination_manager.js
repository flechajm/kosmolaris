import Combination from "./classes/combination.js";

import GameLog from "./game_log.js";

import LanguageManager from "../../libs/language_manager.js";
import GameCategories from "./game_categories.js";
import GameElements from "./game_elements.js";

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
            this.addCombination({ element1: 'air', element2: 'strong-wind', result: 'cold' });
            this.addCombination({ element1: 'electricity', element2: 'air', result: 'light' });
            this.addCombination({ element1: 'magic-wand', element2: 'human', result: 'magic' });
            this.addCombination({ element1: 'tree', element2: 'sun', result: 'oxygen' });
            this.addCombination({ element1: 'air', element2: 'earth', result: 'pressure' });
            this.addCombination({ element1: 'sand', element2: 'glass', result: 'time' });
            this.addCombination({ element1: 'monkey', element2: 'workbench', result: 'science' });
            this.addCombination({ element1: 'scientist', element2: 'life', result: 'science' });
            this.addCombination({ element1: 'plant', element2: 'sun', result: 'hydrogen' });
            this.addCombination({ element1: 'lava', element2: 'gas', result: 'sulphur' });
            this.addCombination({ element1: 'gas', element2: 'hydrogen', result: 'acid' });
            this.addCombination({ element1: 'sulphur', element2: 'acid', result: 'sulphuric-acid' });
            this.addCombination({ element1: 'gasoline', element2: 'oxygen', result: 'combustion' });

            // Space
            this.addCombination({ element1: 'gas', element2: 'pressure', result: 'star' });
            this.addCombination({ element1: 'solar-system', element2: 'nebula', result: 'milky-way' });
            this.addCombination({ element1: 'milky-way', element2: 'milky-way', result: 'galaxy' });
            this.addCombination({ element1: 'galaxy', element2: 'explosion', result: 'universe' });
            this.addCombination({ element1: 'star', element2: 'explosion', result: 'nebula' });
            this.addCombination({ element1: 'space', element2: 'stone', result: 'planet' });
            this.addCombination({ element1: 'sky', element2: 'sky', result: 'space' });
            this.addCombination({ element1: 'planet', element2: 'sun', result: 'solar-system' });
            this.addCombination({ element1: 'planet', element2: 'gas', result: 'jupiter' });
            this.addCombination({ element1: 'planet', element2: 'cold', result: 'neptune' });
            this.addCombination({ element1: 'planet', element2: 'explosion', result: 'moon' });
            this.addCombination({ element1: 'planet', element2: 'fire', result: 'mercury' });
            this.addCombination({ element1: 'planet', element2: 'oxygen', result: 'planet-earth' });
            this.addCombination({ element1: 'planet', element2: 'love', result: 'venus' });
            this.addCombination({ element1: 'planet', element2: 'ice', result: 'uranus' });
            this.addCombination({ element1: 'star', element2: 'heat', result: 'sun' });
            this.addCombination({ element1: 'energy', element2: 'heat', result: 'sun' });
            this.addCombination({ element1: 'galaxy', element2: 'stone', result: 'asteroid' });

            // Fiction
            this.addCombination({ element1: 'human', element2: 'death', result: 'zombie' });
            this.addCombination({ element1: 'zombie', element2: 'zombie', result: 'hord' });
            this.addCombination({ element1: 'wolf', element2: 'moon', result: 'werewolf' });
            this.addCombination({ element1: 'human', element2: 'electricity', result: 'monster' });
            this.addCombination({ element1: 'wolf', element2: 'wild-animal', result: 'direwolf' });
            this.addCombination({ element1: 'bird', element2: 'fire', result: 'phoenix' });

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
            this.addCombination({ element1: 'clouds', element2: 'acid', result: 'acid-rain' });
            this.addCombination({ element1: 'pressure', element2: 'water', result: 'fountain' });
            this.addCombination({ element1: 'petroleum', element2: 'workbench', result: 'gasoline' });
            this.addCombination({ element1: 'ocean', element2: 'pressure', result: 'oceanic-trench' });

            // Materials
            this.addCombination({ element1: 'iron', element2: 'fire', result: 'steel' });
            this.addCombination({ element1: 'metal', element2: 'blade', result: 'barbed-wire' });
            this.addCombination({ element1: 'metal', element2: 'metal', result: 'iron' });
            this.addCombination({ element1: 'light', element2: 'glass', result: 'lens' });
            this.addCombination({ element1: 'human', element2: 'forest', result: 'wood' });
            this.addCombination({ element1: 'fire', element2: 'stone', result: 'metal' });
            this.addCombination({ element1: 'wood', element2: 'workbench', result: 'stick' });
            this.addCombination({ element1: 'tree', element2: 'workbench', result: 'paper' });
            this.addCombination({ element1: 'mineral-rock', element2: 'water', result: 'stone' });
            this.addCombination({ element1: 'sheep', element2: 'scissors', result: 'wool' });
            this.addCombination({ element1: 'sheep', element2: 'farmer', result: 'wool' });
            this.addCombination({ element1: 'wool', element2: 'workbench', result: 'thread' });
            this.addCombination({ element1: 'thread', element2: 'thread', result: 'rope' });

            // Minerals
            this.addCombination({ element1: 'wind', element2: 'stone', result: 'sand' });
            this.addCombination({ element1: 'mountain', element2: 'pickaxe', result: 'gem' });
            this.addCombination({ element1: 'coal', element2: 'pressure', result: 'diamond' });
            this.addCombination({ element1: 'lava', element2: 'water', result: 'mineral-rock' });
            this.addCombination({ element1: 'pressure', element2: 'plant', result: 'coal' });
            this.addCombination({ element1: 'sea', element2: 'sun', result: 'salt' });
            this.addCombination({ element1: 'ocean', element2: 'sun', result: 'salt' });
            this.addCombination({ element1: 'sand', element2: 'fire', result: 'glass' });
            this.addCombination({ element1: 'fossil', element2: 'pressure', result: 'petroleum' });

            // Natural
            this.addCombination({ element1: 'plant', element2: 'time', result: 'tree' });
            this.addCombination({ element1: 'tree', element2: 'tree', result: 'forest' });
            this.addCombination({ element1: 'forest', element2: 'forest', result: 'jungle' });
            this.addCombination({ element1: 'star', element2: 'sky', result: 'night' });
            this.addCombination({ element1: 'air', element2: 'air', result: 'sky' });
            this.addCombination({ element1: 'land', element2: 'ocean', result: 'continent' });
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
            this.addCombination({ element1: 'sand', element2: 'sea', result: 'beach' });
            this.addCombination({ element1: 'rain', element2: 'electricity', result: 'ray' });
            this.addCombination({ element1: 'earth', element2: 'energy', result: 'earthquake' });
            this.addCombination({ element1: 'earth', element2: 'earth', result: 'land' });
            this.addCombination({ element1: 'storm', element2: 'strong-wind', result: 'tornado' });
            this.addCombination({ element1: 'sky', element2: 'air', result: 'wind' });
            this.addCombination({ element1: 'wind', element2: 'wind', result: 'strong-wind' });
            this.addCombination({ element1: 'magma', element2: 'mountain', result: 'volcano' });
            this.addCombination({ element1: 'death', element2: 'time', result: 'skeleton' });
            this.addCombination({ element1: 'skeleton', element2: 'workbench', result: 'bone' });
            this.addCombination({ element1: 'workbench', element2: 'soil', result: 'field' });
            this.addCombination({ element1: 'field', element2: 'domestic-animal', result: 'farm' });
            this.addCombination({ element1: 'soil', element2: 'plant', result: 'grass' });
            this.addCombination({ element1: 'wind', element2: 'earth', result: 'dust' });
            this.addCombination({ element1: 'dust', element2: 'water', result: 'dirt' });
            this.addCombination({ element1: 'dirt', element2: 'earth', result: 'mud' });
            this.addCombination({ element1: 'asteroid', element2: 'planet-earth', result: 'fossil' });
            this.addCombination({ element1: 'asteroid', element2: 'world', result: 'fossil' });
            this.addCombination({ element1: 'life', element2: 'death', result: 'ghost' });

            // Objects
            this.addCombination({ element1: 'wood', element2: 'metal', result: 'workbench' });
            this.addCombination({ element1: 'stick', element2: 'stick', result: 'baseball-bat' });
            this.addCombination({ element1: 'metal', element2: 'workbench', result: 'blade' });
            this.addCombination({ element1: 'metal', element2: 'stone', result: 'blade' });
            this.addCombination({ element1: 'saw', element2: 'wood', result: 'hand-saw' });
            /* NUEVOS
            this.addCombination({ element1: 'blade', element2: 'wood', result: 'knife' });
            this.addCombination({ element1: 'saw', element2: 'workbench', result: 'circular-saw-blade' });
            this.addCombination({ element1: 'circular-saw-blade', element2: 'engine', result: 'circular-saw' });
            */
            this.addCombination({ element1: 'saw', element2: 'wood', result: 'hand-saw' });
            this.addCombination({ element1: 'blade', element2: 'stick', result: 'sword' });
            this.addCombination({ element1: 'sword', element2: 'workbench', result: 'katana' });
            this.addCombination({ element1: 'lens', element2: 'glass', result: 'microscope' });
            this.addCombination({ element1: 'earth', element2: 'workbench', result: 'shovel' });
            this.addCombination({ element1: 'stone', element2: 'workbench', result: 'pickaxe' });
            this.addCombination({ element1: 'stick', element2: 'star', result: 'magic-wand' });
            this.addCombination({ element1: 'blade', element2: 'blade', result: 'scissors' });
            this.addCombination({ element1: 'rope', element2: 'metal', result: 'chain' });
            this.addCombination({ element1: 'chain', element2: 'stick', result: 'nunchaku' });
            this.addCombination({ element1: 'steel', element2: 'stick', result: 'hammer' });
            this.addCombination({ element1: 'wood', element2: 'carpenter', result: 'wheel' });
            this.addCombination({ element1: 'wheel', element2: 'wind', result: 'windmill' });
            this.addCombination({ element1: 'blade', element2: 'workbench', result: 'saw' });
            this.addCombination({ element1: 'combustion', element2: 'energy', result: 'engine' });
            this.addCombination({ element1: 'chain', element2: 'saw', result: 'chainsaw' });
            this.addCombination({ element1: 'engine', element2: 'saw', result: 'chainsaw' });
            this.addCombination({ element1: 'workbench', element2: 'fire', result: 'oven' });

            // Lifeforms
            this.addCombination({ element1: 'water', element2: 'soil', result: 'plant' });
            this.addCombination({ element1: 'life', element2: 'microscope', result: 'bacterium' });
            this.addCombination({ element1: 'human', element2: 'love', result: 'family' });
            this.addCombination({ element1: 'monkey', element2: 'time', result: 'human' });
            this.addCombination({ element1: 'jungle', element2: 'life', result: 'wild-animal' });
            this.addCombination({ element1: 'human', element2: 'wild-animal', result: 'domestic-animal' });
            this.addCombination({ element1: 'planet-earth', element2: 'population', result: 'world' });
            this.addCombination({ element1: 'family', element2: 'family', result: 'population' });
            this.addCombination({ element1: 'energy', element2: 'water', result: 'life' });
            this.addCombination({ element1: 'bacterium', element2: 'death', result: 'virus' });
            this.addCombination({ element1: 'life', element2: 'heat', result: 'egg' });
            this.addCombination({ element1: 'egg', element2: 'lake', result: 'larva' });

            // Animals
            this.addCombination({ element1: 'wild-animal', element2: 'tree', result: 'monkey' });
            this.addCombination({ element1: 'domestic-animal', element2: 'clouds', result: 'sheep' });
            this.addCombination({ element1: 'domestic-animal', element2: 'bone', result: 'dog' });
            this.addCombination({ element1: 'wild-animal', element2: 'dog', result: 'wolf' });
            this.addCombination({ element1: 'egg', element2: 'air', result: 'bird' });
            this.addCombination({ element1: 'tree', element2: 'egg', result: 'nest' });
            this.addCombination({ element1: 'planet-earth', element2: 'egg', result: 'dinosaur' });
            this.addCombination({ element1: 'world', element2: 'egg', result: 'dinosaur' });
            this.addCombination({ element1: 'egg', element2: 'sand', result: 'turtle' });
            this.addCombination({ element1: 'larva', element2: 'time', result: 'fly' });
            this.addCombination({ element1: 'egg', element2: 'ocean', result: 'fish' });
            this.addCombination({ element1: 'fish', element2: 'fish', result: 'big-fish' });
            this.addCombination({ element1: 'big-fish', element2: 'wild-animal', result: 'shark' });
            this.addCombination({ element1: 'big-fish', element2: 'ocean', result: 'whale' });
            this.addCombination({ element1: 'whale', element2: 'cold', result: 'orca' });
            this.addCombination({ element1: 'whale', element2: 'ice', result: 'orca' });
            this.addCombination({ element1: 'big-fish', element2: 'sword', result: 'swordfish' });
            this.addCombination({ element1: 'shark', element2: 'hammer', result: 'hammerhead-shark' });
            this.addCombination({ element1: 'life', element2: 'farm', result: 'livestock' });
            this.addCombination({ element1: 'grass', element2: 'livestock', result: 'cow' });
            this.addCombination({ element1: 'bird', element2: 'farm', result: 'poultry' });
            this.addCombination({ element1: 'poultry', element2: 'farmer', result: 'chicken' });
            this.addCombination({ element1: 'mud', element2: 'livestock', result: 'pig' });

            // Professions
            this.addCombination({ element1: 'human', element2: 'magic', result: 'wizard' });
            this.addCombination({ element1: 'human', element2: 'sword', result: 'swordsman' });
            this.addCombination({ element1: 'human', element2: 'katana', result: 'samurai' });
            this.addCombination({ element1: 'human', element2: 'farm', result: 'farmer' });
            this.addCombination({ element1: 'human', element2: 'wood', result: 'carpenter' });
            this.addCombination({ element1: 'human', element2: 'dough', result: 'baker' });
            this.addCombination({ element1: 'human', element2: 'beef', result: 'butcher' });
            this.addCombination({ element1: 'human', element2: 'pork', result: 'butcher' });
            this.addCombination({ element1: 'human', element2: 'microscope', result: 'scientist' });
            this.addCombination({ element1: 'human', element2: 'space', result: 'astronaut' });
            this.addCombination({ element1: 'human', element2: 'oven', result: 'chef' });

            // Special
            this.addCombination({ element1: 'baseball-bat', element2: 'barbed-wire', result: 'lucille' });
            this.addCombination({ element1: 'steel', element2: 'magic', result: 'valyrian-steel' });
            this.addCombination({ element1: 'wizard', element2: 'ray', result: 'harry-potter' });
            this.addCombination({ element1: 'valyrian-steel', element2: 'snow', result: 'jon-snow' });
            this.addCombination({ element1: 'zombie', element2: 'katana', result: 'michonne' });
            this.addCombination({ element1: 'lucille', element2: 'human', result: 'negan' });
            this.addCombination({ element1: 'monkey', element2: 'planet', result: 'planet-apes' });
            this.addCombination({ element1: 'nunchaku', element2: 'human', result: 'bruce-lee' });
            this.addCombination({ element1: 'monster', element2: 'workbench', result: 'frankenstein' });
            this.addCombination({ element1: 'human', element2: 'chainsaw', result: 'leatherface' });
            this.addCombination({ element1: 'astronaut', element2: 'moon', result: 'apollo-11' });
            this.addCombination({ element1: 'spacecraft', element2: 'explosion', result: 'challenger' });
            this.addCombination({ element1: 'airplane', element2: 'island', result: 'lost' });
            this.addCombination({ element1: 'ship', element2: 'iceberg', result: 'titanic' });
            this.addCombination({ element1: 'wizard', element2: 'swordsman', result: 'the-witcher' });
            this.addCombination({ element1: 'dinosaur', element2: 'science', result: 'kosmolaris-park' });

            // Food
            this.addCombination({ element1: 'plant', element2: 'field', result: 'wheat' });
            this.addCombination({ element1: 'windmill', element2: 'wheat', result: 'flour' });
            this.addCombination({ element1: 'flour', element2: 'water', result: 'dough' });
            this.addCombination({ element1: 'flour', element2: 'milk', result: 'batter' });
            this.addCombination({ element1: 'baker', element2: 'dough', result: 'bread' });
            this.addCombination({ element1: 'farmer', element2: 'cow', result: 'milk' });
            this.addCombination({ element1: 'milk', element2: 'time', result: 'cheese' });
            this.addCombination({ element1: 'cheese', element2: 'time', result: 'blue-cheese' });
            this.addCombination({ element1: 'workbench', element2: 'cow', result: 'beef' });
            this.addCombination({ element1: 'blade', element2: 'cow', result: 'beef' });
            this.addCombination({ element1: 'leatherface', element2: 'cow', result: 'beef' });
            this.addCombination({ element1: 'workbench', element2: 'pig', result: 'pork' });
            this.addCombination({ element1: 'blade', element2: 'pig', result: 'pork' });
            this.addCombination({ element1: 'leatherface', element2: 'pig', result: 'pork' });
            this.addCombination({ element1: 'oven', element2: 'dough', result: 'pizza' });
            this.addCombination({ element1: 'egg', element2: 'flour', result: 'pasta' });
            this.addCombination({ element1: 'beef', element2: 'bread', result: 'burger' });
            this.addCombination({ element1: 'pork', element2: 'oven', result: 'ham' });
            this.addCombination({ element1: 'ham', element2: 'smoke', result: 'smoked-ham' });
            this.addCombination({ element1: 'milk', element2: 'ice', result: 'milkshake' });

            // Vehicles
            this.addCombination({ element1: 'wheel', element2: 'wheel', result: 'bicycle' });
            this.addCombination({ element1: 'engine', element2: 'bicycle', result: 'motorcycle' });
            this.addCombination({ element1: 'engine', element2: 'wheel', result: 'car' });
            this.addCombination({ element1: 'car', element2: 'workbench', result: 'truck' });
            this.addCombination({ element1: 'engine', element2: 'sea', result: 'boat' });
            this.addCombination({ element1: 'engine', element2: 'ocean', result: 'boat' });
            this.addCombination({ element1: 'boat', element2: 'workbench', result: 'ship' });
            this.addCombination({ element1: 'ship', element2: 'ghost', result: 'ghost-ship' });
            this.addCombination({ element1: 'engine', element2: 'sky', result: 'helicopter' });
            this.addCombination({ element1: 'engine', element2: 'clouds', result: 'airplane' });
            this.addCombination({ element1: 'engine', element2: 'space', result: 'spacecraft' });
            this.addCombination({ element1: 'engine', element2: 'oceanic-trench', result: 'submarine' });

            resolve();
        });
    }

    static debugTableElements() {
        this.#combinations = this.#combinations.sort((a, b) => a.result.category - b.result.category);
        const table = [];

        for (let i = 0; i < this.#combinations.length; i++) {
            const combination = this.#combinations[i];
            const category = GameCategories.getById(combination.result.category).name;

            table.push({
                element1: combination.element1.name,
                element2: combination.element2.name,
                result: combination.result.name,
                category: category,
                isSpecial: combination.result.isSpecial,
            });
        }

        console.table(table);
    }

    static addCombination({ element1, element2, result }) {
        const combination = new Combination({
            element1: GameElements.getById(element1),
            element2: GameElements.getById(element2),
            result: GameElements.getById(result),
        });

        this.#combinations.push(combination);
    }

    static fixDuplicatedElements() {
        this.#elementsUnlocked = this.#elementsUnlocked.filter((element, index) => {
            return index === this.#elementsUnlocked.findIndex(e => element.result === e.result);
        });

        this.#specialElementsUnlocked = this.#specialElementsUnlocked.filter((element, index) => {
            return index === this.#specialElementsUnlocked.findIndex(e => element.result === e.result);
        });

        const allElements = GameElements.getAll();
        const specialElementsInCommonList = this.#elementsUnlocked.filter((element) => {
            return allElements.find((e) => e.id == element.result && e.isSpecial);
        });

        if (specialElementsInCommonList.length > 0) {
            this.#elementsUnlocked = this.#elementsUnlocked.filter((element) => {
                return specialElementsInCommonList.find((e) => e.result != element.result);
            });

            for (let i = 0; i < specialElementsInCommonList.length; i++) {
                const element = specialElementsInCommonList[i];
                this.#specialElementsUnlocked.push(element);
            }
        }
    }

    static checkExists(element) {
        return (this.#elementsUnlocked.some((e) => e.result == element.id) ||
            this.#specialElementsUnlocked.some((e) => e.result == element.id));
    }

    static unlockElement(elementUnlocked, element1, element2) {
        if (!this.checkExists(elementUnlocked.id)) {

            if (elementUnlocked.isSpecial) {
                this.#specialElementsUnlocked.push({ element1: element1.id, element2: element2.id, result: elementUnlocked.id });
            } else {
                this.#elementsUnlocked.push({ element1: element1.id, element2: element2.id, result: elementUnlocked.id });
            }

            const langData = LanguageManager.getData();
            const emoji = elementUnlocked.isSpecial ? '✨' : '🧪';
            const special = elementUnlocked.isSpecial ? ` ${spanTextColor(langData.console.specialElement, "var(--color-special)")}` : '';

            GameLog.write({
                html: langData.console.newElement
                    .replace('{emoji}', emoji)
                    .replace('{special}', special)
                    .replace('{element1}', element1.getFormattedColor())
                    .replace('{element2}', element2.getFormattedColor())
                    .replace('{result}', elementUnlocked.getFormattedColor(true))
            }
            );
        }
    }

    static getAllCombinations() {
        return this.#combinations;
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
                (combination.element1.id === element1.id && combination.element2.id === element2.id) ||
                (combination.element1.id === element2.id && combination.element2.id === element1.id)
            ) {
                return combination.result;
            }

        }
        return null;
    }
}

export default GameCombinationManager;