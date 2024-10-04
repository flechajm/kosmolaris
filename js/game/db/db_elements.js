import Element from "../core/classes/element.js";

class DbElements {
    #db;

    constructor() {
        this.#db = [
            // ============================
            // FOUR ELEMENTS
            // ============================
            // Air
            new Element({
                id: 'air',
                category: 1,
            }),

            // Fire
            new Element({
                id: 'fire',
                category: 1,
            }),

            // Earth
            new Element({
                id: 'earth',
                category: 1,
            }),

            // Water
            new Element({
                id: 'water',
                category: 1,
            }),

            // ============================
            // ABSTRACTS
            // ============================

            // Love
            new Element({
                id: 'love',
                category: 2,
            }),

            // Heat
            new Element({
                id: 'heat',
                category: 2,
            }),

            // Weather
            new Element({
                id: 'weather',
                category: 2,
            }),

            // Energy
            new Element({
                id: 'energy',
                category: 2,
            }),

            // Explosion
            new Element({
                id: 'explosion',
                category: 2,
            }),

            // Cold
            new Element({
                id: 'cold',
                category: 2,
            }),

            // Light
            new Element({
                id: 'light',
                category: 2,
            }),

            // Magic
            new Element({
                id: 'magic',
                category: 2,
            }),

            // Oxygen
            new Element({
                id: 'oxygen',
                category: 2,
            }),

            // Pressure
            new Element({
                id: 'pressure',
                category: 2,
            }),

            // Time
            new Element({
                id: 'time',
                category: 2,
            }),

            // Science
            new Element({
                id: 'science',
                category: 2,
            }),

            // Hydrogen
            new Element({
                id: 'hydrogen',
                category: 2,
            }),

            // Sulphur
            new Element({
                id: 'sulphur',
                category: 2,
            }),

            // Acid
            new Element({
                id: 'acid',
                category: 2,
            }),

            // Sulphuric Acid
            new Element({
                id: 'sulphuric-acid',
                category: 2,
            }),

            // Combustion
            new Element({
                id: 'combustion',
                category: 2,
            }),

            // ============================
            // SPACE
            // ============================

            // Space
            new Element({
                id: 'space',
                category: 3,
            }),

            // Jupiter
            new Element({
                id: 'jupiter',
                category: 3,
            }),

            // Neptune
            new Element({
                id: 'neptune',
                category: 3,
            }),

            // Moon
            new Element({
                id: 'moon',
                category: 3,
            }),

            // Star
            new Element({
                id: 'star',
                category: 3,
            }),

            // Solar System
            new Element({
                id: 'solar-system',
                category: 3,
            }),

            // Milky Way
            new Element({
                id: 'milky-way',
                category: 3,
            }),

            // Galaxy
            new Element({
                id: 'galaxy',
                category: 3,
            }),

            // Universe
            new Element({
                id: 'universe',
                category: 3,
            }),

            // Mercury
            new Element({
                id: 'mercury',
                category: 3,
            }),

            // Nebula
            new Element({
                id: 'nebula',
                category: 3,
            }),

            // Planet
            new Element({
                id: 'planet',
                category: 3,
            }),

            // Planet Earth
            new Element({
                id: 'planet-earth',
                category: 3,
            }),

            // Venus
            new Element({
                id: 'venus',
                category: 3,
            }),

            // Sun
            new Element({
                id: 'sun',
                category: 3,
            }),

            // Uranus
            new Element({
                id: 'uranus',
                category: 3,
            }),

            // Asteroid
            new Element({
                id: 'asteroid',
                category: 3,
            }),

            // ============================
            // FICTION
            // ============================

            // Hord
            new Element({
                id: 'hord',
                category: 4,
            }),

            // Zombie
            new Element({
                id: 'zombie',
                category: 4,
            }),

            // Werewolf
            new Element({
                id: 'werewolf',
                category: 4,
            }),

            // Monster
            new Element({
                id: 'monster',
                category: 4,
            }),

            // Direwolf
            new Element({
                id: 'direwolf',
                category: 4,
            }),

            // Phoenix
            new Element({
                id: 'phoenix',
                category: 4,
            }),

            // ============================
            // GASEOUS
            // ============================

            // Gas
            new Element({
                id: 'gas',
                category: 5,
            }),

            // Smoke
            new Element({
                id: 'smoke',
                category: 5,
            }),

            // Cloudss
            new Element({
                id: 'clouds',
                category: 5,
            }),

            // Steam
            new Element({
                id: 'steam',
                category: 5,
            }),

            // ============================
            // LIQUIDS
            // ============================

            // Lake
            new Element({
                id: 'lake',
                category: 6,
            }),

            // Lava
            new Element({
                id: 'lava',
                category: 6,
            }),

            // Rain
            new Element({
                id: 'rain',
                category: 6,
            }),

            // Magma
            new Element({
                id: 'magma',
                category: 6,
            }),

            // Sea
            new Element({
                id: 'sea',
                category: 6,
            }),

            // Ocean
            new Element({
                id: 'ocean',
                category: 6,
            }),

            // Storm
            new Element({
                id: 'storm',
                category: 6,
            }),

            // Tsunami
            new Element({
                id: 'tsunami',
                category: 6,
            }),

            // Fountain
            new Element({
                id: 'fountain',
                category: 6,
            }),

            // Acid Rain
            new Element({
                id: 'acid-rain',
                category: 6,
            }),

            // Gasoline
            new Element({
                id: 'gasoline',
                category: 6,
            }),

            // Oceanic Trench
            new Element({
                id: 'oceanic-trench',
                category: 6,
            }),

            // ============================
            // MATERIALS
            // ============================

            // Steel
            new Element({
                id: 'steel',
                category: 7,
            }),

            // Barbed Wire
            new Element({
                id: 'barbed-wire',
                category: 7,
            }),

            // Iron
            new Element({
                id: 'iron',
                category: 7,
            }),

            // Lens
            new Element({
                id: 'lens',
                category: 7,
            }),

            // Wood
            new Element({
                id: 'wood',
                category: 7,
            }),

            // Metal
            new Element({
                id: 'metal',
                category: 7,
            }),

            // Stick
            new Element({
                id: 'stick',
                category: 7,
            }),

            // Paper
            new Element({
                id: 'paper',
                category: 7,
            }),

            // Stone
            new Element({
                id: 'stone',
                category: 7,
            }),

            // Wool
            new Element({
                id: 'wool',
                category: 7,
            }),

            // Thread
            new Element({
                id: 'thread',
                category: 7,
            }),

            // Rope
            new Element({
                id: 'rope',
                category: 7,
            }),

            // ============================
            // MINERALS
            // ============================

            // Sand
            new Element({
                id: 'sand',
                category: 8,
            }),

            // Gem
            new Element({
                id: 'gem',
                category: 8,
            }),

            // Diamond
            new Element({
                id: 'diamond',
                category: 8,
            }),

            // Mineral Rock
            new Element({
                id: 'mineral-rock',
                category: 8,
            }),

            // Coal
            new Element({
                id: 'coal',
                category: 8,
            }),

            // Salt
            new Element({
                id: 'salt',
                category: 8,
            }),

            // Glass
            new Element({
                id: 'glass',
                category: 8,
            }),

            // Petroleum
            new Element({
                id: 'petroleum',
                category: 8,
            }),

            // ============================
            // NATURAL
            // ============================

            // Tree
            new Element({
                id: 'tree',
                category: 9,
            }),

            // Forest
            new Element({
                id: 'forest',
                category: 9,
            }),

            // Jungle
            new Element({
                id: 'jungle',
                category: 9,
            }),

            // Night
            new Element({
                id: 'night',
                category: 9,
            }),

            // Sky
            new Element({
                id: 'sky',
                category: 9,
            }),

            // Continent
            new Element({
                id: 'continent',
                category: 9,
            }),

            // Covid
            new Element({
                id: 'covid',
                category: 9,
            }),

            // Electricity
            new Element({
                id: 'electricity',
                category: 9,
            }),

            // Disease
            new Element({
                id: 'disease',
                category: 9,
            }),

            // Ice
            new Element({
                id: 'ice',
                category: 9,
            }),

            // Hurricane
            new Element({
                id: 'hurricane',
                category: 9,
            }),

            // Iceberg
            new Element({
                id: 'iceberg',
                category: 9,
            }),

            // Island
            new Element({
                id: 'island',
                category: 9,
            }),

            // Mountain
            new Element({
                id: 'mountain',
                category: 9,
            }),

            // Death
            new Element({
                id: 'death',
                category: 9,
            }),

            // Snow
            new Element({
                id: 'snow',
                category: 9,
            }),

            // Pandemic
            new Element({
                id: 'pandemic',
                category: 9,
            }),

            // Soil
            new Element({
                id: 'soil',
                category: 9,
            }),

            // Beach
            new Element({
                id: 'beach',
                category: 9,
            }),

            // Ray
            new Element({
                id: 'ray',
                category: 9,
            }),

            // Earthquake
            new Element({
                id: 'earthquake',
                category: 9,
            }),

            // Land
            new Element({
                id: 'land',
                category: 9,
            }),

            // Tornado
            new Element({
                id: 'tornado',
                category: 9,
            }),

            // Wind
            new Element({
                id: 'wind',
                category: 9,
            }),

            // Strong Wind
            new Element({
                id: 'strong-wind',
                category: 9,
            }),

            // Volcano
            new Element({
                id: 'volcano',
                category: 9,
            }),

            // Skeleton
            new Element({
                id: 'skeleton',
                category: 9,
            }),

            // Bone
            new Element({
                id: 'bone',
                category: 9,
            }),

            // Field
            new Element({
                id: 'field',
                category: 9,
            }),

            // Farm
            new Element({
                id: 'farm',
                category: 9,
            }),

            // Grass
            new Element({
                id: 'grass',
                category: 9,
            }),

            // Dust
            new Element({
                id: 'dust',
                category: 9,
            }),

            // Dirt
            new Element({
                id: 'dirt',
                category: 9,
            }),

            // Mud
            new Element({
                id: 'mud',
                category: 9,
            }),

            // Fossil
            new Element({
                id: 'fossil',
                category: 9,
            }),

            // Ghost
            new Element({
                id: 'ghost',
                category: 9,
            }),

            // ============================
            // OBJECTS
            // ============================

            // Baseball Bat
            new Element({
                id: 'baseball-bat',
                category: 10,
            }),

            // Blade
            new Element({
                id: 'blade',
                category: 10,
            }),

            // Sword
            new Element({
                id: 'sword',
                category: 10,
            }),

            // Tool
            new Element({
                id: 'workbench',
                category: 10,
            }),

            // Katana
            new Element({
                id: 'katana',
                category: 10,
            }),

            // Microscoope
            new Element({
                id: 'microscope',
                category: 10,
            }),

            // Shovel
            new Element({
                id: 'shovel',
                category: 10,
            }),

            // Pickaxe
            new Element({
                id: 'pickaxe',
                category: 10,
            }),

            // Magic Wand
            new Element({
                id: 'magic-wand',
                category: 10,
            }),

            // Scissors
            new Element({
                id: 'scissors',
                category: 10,
            }),

            // Chain
            new Element({
                id: 'chain',
                category: 10,
            }),

            // Nunchaku
            new Element({
                id: 'nunchaku',
                category: 10,
            }),

            // Hammer
            new Element({
                id: 'hammer',
                category: 10,
            }),

            // Wheel
            new Element({
                id: 'wheel',
                category: 10,
            }),

            // Windmill
            new Element({
                id: 'windmill',
                category: 10,
            }),

            // Saw
            new Element({
                id: 'saw',
                category: 10,
            }),

            // Hand Saw
            new Element({
                id: 'hand-saw',
                category: 10,
            }),

            // Engine
            new Element({
                id: 'engine',
                category: 10,
            }),

            // Chainsaw
            new Element({
                id: 'chainsaw',
                category: 10,
            }),

            // Oven
            new Element({
                id: 'oven',
                category: 10,
            }),

            // ============================
            // LIFEFORMS
            // ============================

            // Plant
            new Element({
                id: 'plant',
                category: 11,
            }),

            // Bacterium
            new Element({
                id: 'bacterium',
                category: 11,
            }),

            // Family
            new Element({
                id: 'family',
                category: 11,
            }),

            // Human
            new Element({
                id: 'human',
                category: 11,
            }),

            // Wild Animal
            new Element({
                id: 'wild-animal',
                category: 11,
            }),

            // Domestic Animal
            new Element({
                id: 'domestic-animal',
                category: 11,
            }),

            // World
            new Element({
                id: 'world',
                category: 11,
            }),

            // Population
            new Element({
                id: 'population',
                category: 11,
            }),

            // Life
            new Element({
                id: 'life',
                category: 11,
            }),

            // Virus
            new Element({
                id: 'virus',
                category: 11,
            }),

            // Egg
            new Element({
                id: 'egg',
                category: 11,
            }),

            // Larva
            new Element({
                id: 'larva',
                category: 11,
            }),

            // ============================
            // ANIMALS
            // ============================

            // Monkey
            new Element({
                id: 'monkey',
                category: 12,
            }),

            // Sheep
            new Element({
                id: 'sheep',
                category: 12,
            }),

            // Dog
            new Element({
                id: 'dog',
                category: 12,
            }),

            // Wolf
            new Element({
                id: 'wolf',
                category: 12,
            }),

            // Bird
            new Element({
                id: 'bird',
                category: 12,
            }),

            // Nest
            new Element({
                id: 'nest',
                category: 12,
            }),

            // Dinosaur
            new Element({
                id: 'dinosaur',
                category: 12,
            }),

            // Turtle
            new Element({
                id: 'turtle',
                category: 12,
            }),

            // Fly
            new Element({
                id: 'fly',
                category: 12,
            }),

            // Fish
            new Element({
                id: 'fish',
                category: 12,
            }),

            // Big Fish
            new Element({
                id: 'big-fish',
                category: 12,
            }),

            // Shark
            new Element({
                id: 'shark',
                category: 12,
            }),

            // Whale
            new Element({
                id: 'whale',
                category: 12,
            }),

            // Orca
            new Element({
                id: 'orca',
                category: 12,
            }),

            // Swordfish
            new Element({
                id: 'swordfish',
                category: 12,
            }),

            // Hammerhead Shark
            new Element({
                id: 'hammerhead-shark',
                category: 12,
            }),

            // Livestock
            new Element({
                id: 'livestock',
                category: 12,
            }),

            // Cow
            new Element({
                id: 'cow',
                category: 12,
            }),

            // Poultry
            new Element({
                id: 'poultry',
                category: 12,
            }),

            // Chicken
            new Element({
                id: 'chicken',
                category: 12,
            }),

            // Pig
            new Element({
                id: 'pig',
                category: 12,
            }),

            // ============================
            // PROFESSIONS
            // ============================

            // Wizard
            new Element({
                id: 'wizard',
                category: 13,
            }),

            // Swordsman
            new Element({
                id: 'swordsman',
                category: 13,
            }),

            // Samurai
            new Element({
                id: 'samurai',
                category: 13,
            }),

            // Farmer
            new Element({
                id: 'farmer',
                category: 13,
            }),

            // Carpenter
            new Element({
                id: 'carpenter',
                category: 13,
            }),

            // Baker
            new Element({
                id: 'baker',
                category: 13,
            }),

            // Butcher
            new Element({
                id: 'butcher',
                category: 13,
            }),

            // Scientist
            new Element({
                id: 'scientist',
                category: 13,
            }),

            // Astronaut
            new Element({
                id: 'astronaut',
                category: 13,
            }),

            // Chef
            new Element({
                id: 'chef',
                category: 13,
            }),

            // ============================
            // SPECIAL
            // ============================

            // Valyrian Steel
            new Element({
                id: 'valyrian-steel',
                category: 14,
                isSpecial: true,
            }),

            // Harry Potter
            new Element({
                id: 'harry-potter',
                category: 14,
                isSpecial: true,
            }),

            // Jon Snow
            new Element({
                id: 'jon-snow',
                category: 14,
                isSpecial: true,
            }),

            // Michonne
            new Element({
                id: 'michonne',
                category: 14,
                isSpecial: true,
            }),

            // Lucille
            new Element({
                id: 'lucille',
                category: 14,
                isSpecial: true,
            }),

            // Negan
            new Element({
                id: 'negan',
                category: 14,
                isSpecial: true,
            }),

            // Planet of the Apes
            new Element({
                id: 'planet-apes',
                category: 14,
                isSpecial: true,
            }),

            // Bruce Lee
            new Element({
                id: 'bruce-lee',
                category: 14,
                isSpecial: true,
            }),

            // Frankenstein
            new Element({
                id: 'frankenstein',
                category: 14,
                isSpecial: true,
            }),

            // Leatherface
            new Element({
                id: 'leatherface',
                category: 14,
                isSpecial: true,
            }),

            // Apollo 11
            new Element({
                id: 'apollo-11',
                category: 14,
                isSpecial: true,
            }),

            // Challenger
            new Element({
                id: 'challenger',
                category: 14,
                isSpecial: true,
            }),

            // LOST
            new Element({
                id: 'lost',
                category: 14,
                isSpecial: true,
            }),

            // Titanic
            new Element({
                id: 'titanic',
                category: 14,
                isSpecial: true,
            }),

            // The Witcher
            new Element({
                id: 'the-witcher',
                category: 14,
                isSpecial: true,
            }),

            // Jurassic Park
            new Element({
                id: 'jurassic-park',
                category: 14,
                isSpecial: true,
            }),

            // ============================
            // FOOD
            // ============================

            // Wheat
            new Element({
                id: 'wheat',
                category: 15,
            }),

            // Flour
            new Element({
                id: 'flour',
                category: 15,
            }),

            // Dough
            new Element({
                id: 'dough',
                category: 15,
            }),

            // Bread
            new Element({
                id: 'bread',
                category: 15,
            }),

            // Batter
            new Element({
                id: 'batter',
                category: 15,
            }),

            // Milk
            new Element({
                id: 'milk',
                category: 15,
            }),

            // Cheese
            new Element({
                id: 'cheese',
                category: 15,
            }),

            // Blue Cheese
            new Element({
                id: 'blue-cheese',
                category: 15,
            }),

            // Beef
            new Element({
                id: 'beef',
                category: 15,
            }),

            // Pork
            new Element({
                id: 'pork',
                category: 15,
            }),

            // Pizza
            new Element({
                id: 'pizza',
                category: 15,
            }),

            // Pasta
            new Element({
                id: 'pasta',
                category: 15,
            }),

            // Burger
            new Element({
                id: 'burger',
                category: 15,
            }),

            // Ham
            new Element({
                id: 'ham',
                category: 15,
            }),

            // Smoked Ham
            new Element({
                id: 'smoked-ham',
                category: 15,
            }),

            // Milkshake
            new Element({
                id: 'milkshake',
                category: 15,
            }),

            // ============================
            // VEHICLES
            // ============================

            // Bicycle
            new Element({
                id: 'bicycle',
                category: 16,
            }),

            // Motorcycle
            new Element({
                id: 'motorcycle',
                category: 16,
            }),

            // Car
            new Element({
                id: 'car',
                category: 16,
            }),

            // Truck
            new Element({
                id: 'truck',
                category: 16,
            }),

            // Boat
            new Element({
                id: 'boat',
                category: 16,
            }),

            // Ship
            new Element({
                id: 'ship',
                category: 16,
            }),

            // Ghost Ship
            new Element({
                id: 'ghost-ship',
                category: 16,
            }),

            // Helicopter
            new Element({
                id: 'helicopter',
                category: 16,
            }),

            // Airplane
            new Element({
                id: 'airplane',
                category: 16,
            }),

            // Spacecraft
            new Element({
                id: 'spacecraft',
                category: 16,
            }),

            // Submarine
            new Element({
                id: 'submarine',
                category: 16,
            }),
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbElements;