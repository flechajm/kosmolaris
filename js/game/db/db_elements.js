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
                color: '#b8a4c4',
                category: 1,
            }),

            // Fire
            new Element({
                id: 'fire',
                color: 'crimson',
                category: 1,
            }),

            // Earth
            new Element({
                id: 'earth',
                color: '#b67048',
                category: 1,
            }),

            // Water
            new Element({
                id: 'water',
                color: '#6baee7',
                category: 1,
            }),

            // ============================
            // ABSTRACTS
            // ============================

            // Love
            new Element({
                id: 'love',
                color: '#f35978',
                category: 2,
            }),

            // Heat
            new Element({
                id: 'heat',
                color: '#ff7b00',
                category: 2,
            }),

            // Weather
            new Element({
                id: 'weather',
                color: '#add8e6',
                category: 2,
            }),

            // Energy
            new Element({
                id: 'energy',
                color: '#e2d030',
                category: 2,
            }),

            // Explosion
            new Element({
                id: 'explosion',
                color: '#ff4500',
                category: 2,
            }),

            // Cold
            new Element({
                id: 'cold',
                color: '#015791',
                category: 2,
            }),

            // Light
            new Element({
                id: 'light',
                color: '#f5deb3',
                category: 2,
            }),

            // Magic
            new Element({
                id: 'magic',
                color: '#9000ad',
                category: 2,
            }),

            // Oxygen
            new Element({
                id: 'oxygen',
                color: '#afd6e6',
                category: 2,
            }),

            // Pressure
            new Element({
                id: 'pressure',
                color: '#a9a9a9',
                category: 2,
            }),

            // Time
            new Element({
                id: 'time',
                color: '#c0c0c0',
                category: 2,
            }),

            // Science
            new Element({
                id: 'science',
                color: '#8fa2ff',
                category: 2,
            }),

            // Hydrogen
            new Element({
                id: 'hydrogen',
                color: '#8fffdd',
                category: 2,
            }),

            // Sulphur
            new Element({
                id: 'sulphur',
                color: '#9b8d3d',
                category: 2,
            }),

            // Acid
            new Element({
                id: 'acid',
                color: '#3d989b',
                category: 2,
            }),

            // Sulphuric Acid
            new Element({
                id: 'sulphuric-acid',
                color: '#74c056',
                category: 2,
            }),

            // Combustion
            new Element({
                id: 'combustion',
                color: '#c06f56',
                category: 2,
            }),

            // ============================
            // SPACE
            // ============================

            // Space
            new Element({
                id: 'space',
                color: '#2a375a',
                category: 3,
            }),

            // Jupiter
            new Element({
                id: 'jupiter',
                color: '#212a58',
                category: 3,
            }),

            // Neptune
            new Element({
                id: 'neptune',
                color: '#daa88b',
                category: 3,
            }),

            // Moon
            new Element({
                id: 'moon',
                color: '#2e2828',
                category: 3,
            }),

            // Star
            new Element({
                id: 'star',
                color: '#3e4374',
                category: 3,
            }),

            // Solar System
            new Element({
                id: 'solar-system',
                color: '#743e3e',
                category: 3,
            }),

            // Milky Way
            new Element({
                id: 'milky-way',
                color: '#dab8da',
                category: 3,
            }),

            // Galaxy
            new Element({
                id: 'galaxy',
                color: '#34333f',
                category: 3,
            }),

            // Universe
            new Element({
                id: 'universe',
                color: '#111116',
                category: 3,
            }),

            // Mercury
            new Element({
                id: 'mercury',
                color: '#c0c0c0',
                category: 3,
            }),

            // Nebula
            new Element({
                id: 'nebula',
                color: '#c91c95',
                category: 3,
            }),

            // Planet
            new Element({
                id: 'planet',
                color: '#412d24',
                category: 3,
            }),

            // Planet Earth
            new Element({
                id: 'planet-earth',
                color: '#416cbd',
                category: 3,
            }),

            // Venus
            new Element({
                id: 'venus',
                color: '#d83a00',
                category: 3,
            }),

            // Sun
            new Element({
                id: 'sun',
                color: '#ff7300',
                category: 3,
            }),

            // Uranus
            new Element({
                id: 'uranus',
                color: '#21427e',
                category: 3,
            }),

            // Asteroid
            new Element({
                id: 'asteroid',
                color: '#7e2138',
                category: 3,
            }),

            // ============================
            // FICTION
            // ============================

            // Hord
            new Element({
                id: 'hord',
                color: '#3f4432',
                category: 4,
            }),

            // Zombie
            new Element({
                id: 'zombie',
                color: '#545c3f',
                category: 4,
            }),

            // Werewolf
            new Element({
                id: 'werewolf',
                color: '#cbdadb',
                category: 4,
            }),

            // Monster
            new Element({
                id: 'monster',
                color: '#dbcdcb',
                category: 4,
            }),

            // Direwolf
            new Element({
                id: 'direwolf',
                color: '#ace2e6',
                category: 4,
            }),

            // Phoenix
            new Element({
                id: 'phoenix',
                color: '#a73c3c',
                category: 4,
            }),

            // ============================
            // GASEOUS
            // ============================

            // Gas
            new Element({
                id: 'gas',
                color: '#9dbba8',
                category: 5,
            }),

            // Smoke
            new Element({
                id: 'smoke',
                color: '#ffffff',
                category: 5,
            }),

            // Cloudss
            new Element({
                id: 'clouds',
                color: '#87ceeb',
                category: 5,
            }),

            // Steam
            new Element({
                id: 'steam',
                color: '#ffffff',
                category: 5,
            }),

            // ============================
            // LIQUIDS
            // ============================

            // Lake
            new Element({
                id: 'lake',
                color: '#3aa9ca',
                category: 6,
            }),

            // Lava
            new Element({
                id: 'lava',
                color: '#ac310c',
                category: 6,
            }),

            // Rain
            new Element({
                id: 'rain',
                color: '#7e90b8',
                category: 6,
            }),

            // Magma
            new Element({
                id: 'magma',
                color: '#ce1818',
                category: 6,
            }),

            // Sea
            new Element({
                id: 'sea',
                color: '#4444b6',
                category: 6,
            }),

            // Ocean
            new Element({
                id: 'ocean',
                color: '#47487e',
                category: 6,
            }),

            // Storm
            new Element({
                id: 'storm',
                color: '#6e6e72',
                category: 6,
            }),

            // Tsunami
            new Element({
                id: 'tsunami',
                color: '#b3b8d4',
                category: 6,
            }),

            // Fountain
            new Element({
                id: 'fountain',
                color: '#c6eff5',
                category: 6,
            }),

            // Acid Rain
            new Element({
                id: 'acid-rain',
                color: '#788572',
                category: 6,
            }),

            // Gasoline
            new Element({
                id: 'gasoline',
                color: '#ffa3af',
                category: 6,
            }),

            // Oceanic Trench
            new Element({
                id: 'oceanic-trench',
                color: '#2a2c89',
                category: 6,
            }),

            // ============================
            // MATERIALS
            // ============================

            // Steel
            new Element({
                id: 'steel',
                color: '#c0c0c0',
                category: 7,
            }),

            // Barbed Wire
            new Element({
                id: 'barbed-wire',
                color: '#ad988c',
                category: 7,
            }),

            // Iron
            new Element({
                id: 'iron',
                color: '#c0c0c0',
                category: 7,
            }),

            // Lens
            new Element({
                id: 'lens',
                color: '#87ceeb',
                category: 7,
            }),

            // Wood
            new Element({
                id: 'wood',
                color: '#805133',
                category: 7,
            }),

            // Metal
            new Element({
                id: 'metal',
                color: '#626f6e',
                category: 7,
            }),

            // Stick
            new Element({
                id: 'stick',
                color: '#aa7b5d',
                category: 7,
            }),

            // Paper
            new Element({
                id: 'paper',
                color: '#f5deb3',
                category: 7,
            }),

            // Stone
            new Element({
                id: 'stone',
                color: '#808080',
                category: 7,
            }),

            // Wool
            new Element({
                id: 'wool',
                color: '#f7d16b',
                category: 7,
            }),

            // Thread
            new Element({
                id: 'thread',
                color: '#ecbcbc',
                category: 7,
            }),

            // Rope
            new Element({
                id: 'rope',
                color: '#d46626',
                category: 7,
            }),

            // ============================
            // MINERALS
            // ============================

            // Sand
            new Element({
                id: 'sand',
                color: '#e6be75',
                category: 8,
            }),

            // Gem
            new Element({
                id: 'gem',
                color: '#ff8fb4',
                category: 8,
            }),

            // Diamond
            new Element({
                id: 'diamond',
                color: '#e0edf0',
                category: 8,
            }),

            // Mineral Rock
            new Element({
                id: 'mineral-rock',
                color: '#808080',
                category: 8,
            }),

            // Coal
            new Element({
                id: 'coal',
                color: '#474747',
                category: 8,
            }),

            // Salt
            new Element({
                id: 'salt',
                color: '#edefff',
                category: 8,
            }),

            // Glass
            new Element({
                id: 'glass',
                color: '#add8e6',
                category: 8,
            }),

            // Petroleum
            new Element({
                id: 'petroleum',
                color: '#4e5c61',
                category: 8,
            }),

            // ============================
            // NATURAL
            // ============================

            // Tree
            new Element({
                id: 'tree',
                color: '#4c744c',
                category: 9,
            }),

            // Forest
            new Element({
                id: 'forest',
                color: '#215a21',
                category: 9,
            }),

            // Jungle
            new Element({
                id: 'jungle',
                color: '#262e26',
                category: 9,
            }),

            // Night
            new Element({
                id: 'night',
                color: '#0a0618',
                category: 9,
            }),

            // Sky
            new Element({
                id: 'sky',
                color: '#87ceeb',
                category: 9,
            }),

            // Continent
            new Element({
                id: 'continent',
                color: '#6e9e41',
                category: 9,
            }),

            // Covid
            new Element({
                id: 'covid',
                color: '#d31b43',
                category: 9,
            }),

            // Electricity
            new Element({
                id: 'electricity',
                color: '#f0f032',
                category: 9,
            }),

            // Disease
            new Element({
                id: 'disease',
                color: '#778d42',
                category: 9,
            }),

            // Ice
            new Element({
                id: 'ice',
                color: '#008cff',
                category: 9,
            }),

            // Hurricane
            new Element({
                id: 'hurricane',
                color: '#cae2e6',
                category: 9,
            }),

            // Iceberg
            new Element({
                id: 'iceberg',
                color: '#9bdcf3',
                category: 9,
            }),

            // Island
            new Element({
                id: 'island',
                color: '#8bad4b',
                category: 9,
            }),

            // Mountain
            new Element({
                id: 'mountain',
                color: '#6b4036',
                category: 9,
            }),

            // Death
            new Element({
                id: 'death',
                color: '#808080',
                category: 9,
            }),

            // Snow
            new Element({
                id: 'snow',
                color: '#92a2b1',
                category: 9,
            }),

            // Pandemic
            new Element({
                id: 'pandemic',
                color: '#873354',
                category: 9,
            }),

            // Soil
            new Element({
                id: 'soil',
                color: '#a74708',
                category: 9,
            }),

            // Beach
            new Element({
                id: 'beach',
                color: '#fad88e',
                category: 9,
            }),

            // Ray
            new Element({
                id: 'ray',
                color: '#ced175',
                category: 9,
            }),

            // Earthquake
            new Element({
                id: 'earthquake',
                color: '#554220',
                category: 9,
            }),

            // Land
            new Element({
                id: 'land',
                color: '#7e6539',
                category: 9,
            }),

            // Tornado
            new Element({
                id: 'tornado',
                color: '#c0c0c0',
                category: 9,
            }),

            // Wind
            new Element({
                id: 'wind',
                color: '#b4d3dd',
                category: 9,
            }),

            // Strong Wind
            new Element({
                id: 'strong-wind',
                color: '#b4c2dd',
                category: 9,
            }),

            // Volcano
            new Element({
                id: 'volcano',
                color: '#c53b08',
                category: 9,
            }),

            // Skeleton
            new Element({
                id: 'skeleton',
                color: '#efe8df',
                category: 9,
            }),

            // Bone
            new Element({
                id: 'bone',
                color: '#efe8df',
                category: 9,
            }),

            // Field
            new Element({
                id: 'field',
                color: '#4aa533',
                category: 9,
            }),

            // Farm
            new Element({
                id: 'farm',
                color: '#e49d3a',
                category: 9,
            }),

            // Grass
            new Element({
                id: 'grass',
                color: '#7ee43a',
                category: 9,
            }),

            // Dust
            new Element({
                id: 'dust',
                color: '#f35d49',
                category: 9,
            }),

            // Dirt
            new Element({
                id: 'dirt',
                color: '#f38749',
                category: 9,
            }),

            // Mud
            new Element({
                id: 'mud',
                color: '#773915',
                category: 9,
            }),

            // Fossil
            new Element({
                id: 'fossil',
                color: '#cca7b1',
                category: 9,
            }),

            // Ghost
            new Element({
                id: 'ghost',
                color: '#e4d0d6',
                category: 9,
            }),

            // ============================
            // OBJECTS
            // ============================

            // Baseball Bat
            new Element({
                id: 'baseball-bat',
                color: '#b3975b',
                category: 10,
            }),

            // Blade
            new Element({
                id: 'blade',
                color: '#c0c0c0',
                category: 10,
            }),

            // Sword
            new Element({
                id: 'sword',
                color: '#c0c0c0',
                category: 10,
            }),

            // Tool
            new Element({
                id: 'workbench',
                color: '#c27957',
                category: 10,
            }),

            // Katana
            new Element({
                id: 'katana',
                color: '#c0c0c0',
                category: 10,
            }),

            // Microscoope
            new Element({
                id: 'microscope',
                color: '#555b72',
                category: 10,
            }),

            // Shovel
            new Element({
                id: 'shovel',
                color: '#c0c0c0',
                category: 10,
            }),

            // Pickaxe
            new Element({
                id: 'pickaxe',
                color: '#c0c0c0',
                category: 10,
            }),

            // Magic Wand
            new Element({
                id: 'magic-wand',
                color: '#4b396b',
                category: 10,
            }),

            // Scissors
            new Element({
                id: 'scissors',
                color: '#b59edb',
                category: 10,
            }),

            // Chain
            new Element({
                id: 'chain',
                color: '#736f79',
                category: 10,
            }),

            // Nunchaku
            new Element({
                id: 'nunchaku',
                color: '#ca8536',
                category: 10,
            }),

            // Hammer
            new Element({
                id: 'hammer',
                color: '#756b5f',
                category: 10,
            }),

            // Wheel
            new Element({
                id: 'wheel',
                color: '#bdb385',
                category: 10,
            }),

            // Windmill
            new Element({
                id: 'windmill',
                color: '#95bd85',
                category: 10,
            }),

            // Saw
            new Element({
                id: 'saw',
                color: '#95a18f',
                category: 10,
            }),

            // Engine
            new Element({
                id: 'engine',
                color: '#6f7386',
                category: 10,
            }),

            // Chainsaw
            new Element({
                id: 'chainsaw',
                color: '#af9574',
                category: 10,
            }),

            // Oven
            new Element({
                id: 'oven',
                color: '#b8472a',
                category: 10,
            }),

            // ============================
            // LIFEFORMS
            // ============================

            // Plant
            new Element({
                id: 'plant',
                color: '#2ba82b',
                category: 11,
            }),

            // Bacterium
            new Element({
                id: 'bacterium',
                color: '#af2033',
                category: 11,
            }),

            // Family
            new Element({
                id: 'family',
                color: '#e46d9f',
                category: 11,
            }),

            // Human
            new Element({
                id: 'human',
                color: '#c79a76',
                category: 11,
            }),

            // Wild Animal
            new Element({
                id: 'wild-animal',
                color: '#ceab8b',
                category: 11,
            }),

            // Domestic Animal
            new Element({
                id: 'domestic-animal',
                color: '#b4ce8b',
                category: 11,
            }),

            // World
            new Element({
                id: 'world',
                color: '#398ccf',
                category: 11,
            }),

            // Population
            new Element({
                id: 'population',
                color: '#c79a76',
                category: 11,
            }),

            // Life
            new Element({
                id: 'life',
                color: '#d89dff',
                category: 11,
            }),

            // Virus
            new Element({
                id: 'virus',
                color: '#c76161',
                category: 11,
            }),

            // Egg
            new Element({
                id: 'egg',
                color: '#dbd3b0',
                category: 11,
            }),

            // Larva
            new Element({
                id: 'larva',
                color: '#cabc76',
                category: 11,
            }),

            // ============================
            // ANIMALS
            // ============================

            // Monkey
            new Element({
                id: 'monkey',
                color: '#422c12',
                category: 12,
            }),

            // Sheep
            new Element({
                id: 'sheep',
                color: '#ecd5bf',
                category: 12,
            }),

            // Dog
            new Element({
                id: 'dog',
                color: '#81542a',
                category: 12,
            }),

            // Wolf
            new Element({
                id: 'wolf',
                color: '#ada7a1',
                category: 12,
            }),

            // Bird
            new Element({
                id: 'bird',
                color: '#3b5495',
                category: 12,
            }),

            // Nest
            new Element({
                id: 'nest',
                color: '#b89473',
                category: 12,
            }),

            // Dinosaur
            new Element({
                id: 'dinosaur',
                color: '#335343',
                category: 12,
            }),

            // Turtle
            new Element({
                id: 'turtle',
                color: '#4a5c40',
                category: 12,
            }),

            // Fly
            new Element({
                id: 'fly',
                color: '#3e433d',
                category: 12,
            }),

            // Fish
            new Element({
                id: 'fish',
                color: '#5277c0',
                category: 12,
            }),

            // Big Fish
            new Element({
                id: 'big-fish',
                color: '#2c3b5a',
                category: 12,
            }),

            // Shark
            new Element({
                id: 'shark',
                color: '#a4aab6',
                category: 12,
            }),

            // Whale
            new Element({
                id: 'whale',
                color: '#51596b',
                category: 12,
            }),

            // Orca
            new Element({
                id: 'orca',
                color: '#262729',
                category: 12,
            }),

            // Swordfish
            new Element({
                id: 'swordfish',
                color: '#314875',
                category: 12,
            }),

            // Hammerhead Shark
            new Element({
                id: 'hammerhead-shark',
                color: '#a4aab6',
                category: 12,
            }),

            // Livestock
            new Element({
                id: 'livestock',
                color: '#cca2ac',
                category: 12,
            }),

            // Cow
            new Element({
                id: 'cow',
                color: '#785483',
                category: 12,
            }),

            // Poultry
            new Element({
                id: 'poultry',
                color: '#e0664b',
                category: 12,
            }),

            // Chicken
            new Element({
                id: 'chicken',
                color: '#97594c',
                category: 12,
            }),

            // Pig
            new Element({
                id: 'pig',
                color: '#53312a',
                category: 12,
            }),

            // ============================
            // PROFESSIONS
            // ============================

            // Wizard
            new Element({
                id: 'wizard',
                color: '#0d41b1',
                category: 13,
            }),

            // Swordsman
            new Element({
                id: 'swordsman',
                color: '#7d92be',
                category: 13,
            }),

            // Samurai
            new Element({
                id: 'samurai',
                color: '#c53636',
                category: 13,
            }),

            // Farmer
            new Element({
                id: 'farmer',
                color: '#1aac79',
                category: 13,
            }),

            // Carpenter
            new Element({
                id: 'carpenter',
                color: '#a79378',
                category: 13,
            }),

            // Baker
            new Element({
                id: 'baker',
                color: '#5d3b28',
                category: 13,
            }),

            // Butcher
            new Element({
                id: 'butcher',
                color: '#6b1818',
                category: 13,
            }),

            // Scientist
            new Element({
                id: 'scientist',
                color: '#446ab1',
                category: 13,
            }),

            // Astronaut
            new Element({
                id: 'astronaut',
                color: '#9fbaec',
                category: 13,
            }),

            // Chef
            new Element({
                id: 'chef',
                color: '#569659',
                category: 13,
            }),

            // ============================
            // SPECIAL
            // ============================

            // Valyrian Steel
            new Element({
                id: 'valyrian-steel',
                color: '#81deff',
                category: 14,
                isSpecial: true,
            }),

            // Harry Potter
            new Element({
                id: 'harry-potter',
                color: '#ffa500',
                category: 14,
                isSpecial: true,
            }),

            // Jon Snow
            new Element({
                id: 'jon-snow',
                color: '#3f5474',
                category: 14,
                isSpecial: true,
            }),

            // Michonne
            new Element({
                id: 'michonne',
                color: '#917b33',
                category: 14,
                isSpecial: true,
            }),

            // Lucille
            new Element({
                id: 'lucille',
                color: '#be5252',
                category: 14,
                isSpecial: true,
            }),

            // Negan
            new Element({
                id: 'negan',
                color: '#633942',
                category: 14,
                isSpecial: true,
            }),

            // Planet of the Apes
            new Element({
                id: 'planet-apes',
                color: '#867257',
                category: 14,
                isSpecial: true,
            }),

            // Bruce Lee
            new Element({
                id: 'bruce-lee',
                color: '#eb981b',
                category: 14,
                isSpecial: true,
            }),

            // Frankenstein
            new Element({
                id: 'frankenstein',
                color: '#9ee961',
                category: 14,
                isSpecial: true,
            }),

            // Leatherface
            new Element({
                id: 'leatherface',
                color: '#f3f579',
                category: 14,
                isSpecial: true,
            }),

            // Apollo 11
            new Element({
                id: 'apollo-11',
                color: '#d6dff8',
                category: 14,
                isSpecial: true,
            }),

            // Challenger
            new Element({
                id: 'challenger',
                color: '#d38567',
                category: 14,
                isSpecial: true,
            }),

            // ============================
            // FOOD
            // ============================

            // Wheat
            new Element({
                id: 'wheat',
                color: '#f5deb2',
                category: 15,
            }),

            // Flour
            new Element({
                id: 'flour',
                color: '#c0974a',
                category: 15,
            }),

            // Dough
            new Element({
                id: 'dough',
                color: '#f8a100',
                category: 15,
            }),

            // Bread
            new Element({
                id: 'bread',
                color: '#999180',
                category: 15,
            }),

            // Batter
            new Element({
                id: 'batter',
                color: '#ffd17b',
                category: 15,
            }),

            // Milk
            new Element({
                id: 'milk',
                color: '#d4cbb3',
                category: 15,
            }),

            // Cheese
            new Element({
                id: 'cheese',
                color: '#6d5907',
                category: 15,
            }),

            // Blue Cheese
            new Element({
                id: 'blue-cheese',
                color: '#4e526b',
                category: 15,
            }),

            // Beef
            new Element({
                id: 'beef',
                color: '#892626',
                category: 15,
            }),

            // Pork
            new Element({
                id: 'pork',
                color: '#753e47',
                category: 15,
            }),

            // Pizza
            new Element({
                id: 'pizza',
                color: '#ab6b61',
                category: 15,
            }),

            // Pasta
            new Element({
                id: 'pasta',
                color: '#fdcdc6',
                category: 15,
            }),

            // Burger
            new Element({
                id: 'burger',
                color: '#73421f',
                category: 15,
            }),

            // Ham
            new Element({
                id: 'ham',
                color: '#a76084',
                category: 15,
            }),

            // Smoked Ham
            new Element({
                id: 'smoked-ham',
                color: '#9c7a95',
                category: 15,
            }),

            // ============================
            // VEHICLES
            // ============================

            // Bicycle
            new Element({
                id: 'bicycle',
                color: '#975a87',
                category: 16,
            }),

            // Motorcycle
            new Element({
                id: 'motorcycle',
                color: '#b1969a',
                category: 16,
            }),

            // Car
            new Element({
                id: 'car',
                color: '#565867',
                category: 16,
            }),

            // Truck
            new Element({
                id: 'truck',
                color: '#3b5759',
                category: 16,
            }),

            // Boat
            new Element({
                id: 'boat',
                color: '#6d6053',
                category: 16,
            }),

            // Ship
            new Element({
                id: 'ship',
                color: '#43394b',
                category: 16,
            }),

            // Ghost Ship
            new Element({
                id: 'ghost-ship',
                color: '#b5b5b5',
                category: 16,
            }),

            // Helicopter
            new Element({
                id: 'helicopter',
                color: '#73835b',
                category: 16,
            }),

            // Airplane
            new Element({
                id: 'airplane',
                color: '#57909d',
                category: 16,
            }),

            // Spaceship
            new Element({
                id: 'spaceship',
                color: '#855542',
                category: 16,
            }),

            // Submarine
            new Element({
                id: 'submarine',
                color: '#3e4c75',
                category: 16,
            }),
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbElements;