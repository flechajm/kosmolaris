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

            // Cience
            new Element({
                id: 'cience',
                color: '#8fa2ff',
                category: 2,
            }),

            // ============================
            // SPACE
            // ============================

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

            // ============================
            // FICTION
            // ============================

            // Valyrian Steel
            new Element({
                id: 'valyrian-steel',
                color: '#81deff',
                category: 4,
                isSpecial: true,
            }),

            // Harry Potter
            new Element({
                id: 'harry-potter',
                color: '#ffa500',
                category: 4,
                isSpecial: true,
            }),

            // Hord
            new Element({
                id: 'hord',
                color: '#3f4432',
                category: 4,
            }),

            // Jon Snow
            new Element({
                id: 'jon-snow',
                color: '#3f5474',
                category: 4,
                isSpecial: true,
            }),

            // Michonne
            new Element({
                id: 'michonne',
                color: '#917b33',
                category: 4,
                isSpecial: true,
            }),

            // Lucille
            new Element({
                id: 'lucille',
                color: '#be5252',
                category: 4,
                isSpecial: true,
            }),

            // Negan
            new Element({
                id: 'negan',
                color: '#633942',
                category: 4,
                isSpecial: true,
            }),

            // Zombie
            new Element({
                id: 'zombie',
                color: '#545c3f',
                category: 4,
            }),

            // Planet of the Apes
            new Element({
                id: 'planet-apes',
                color: '#867257',
                category: 4,
                isSpecial: true,
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

            // ============================
            // NATURAL
            // ============================

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

            // ============================
            // Lifeforms
            // ============================

            // Tree
            new Element({
                id: 'tree',
                color: '#4c744c',
                category: 11,
            }),

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

            // Forest
            new Element({
                id: 'forest',
                color: '#215a21',
                category: 11,
            }),

            // Jungle
            new Element({
                id: 'jungle',
                color: '#262e26',
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

            // Wizard
            new Element({
                id: 'wizard',
                color: '#0d41b1',
                category: 11,
            }),

            // Wild Animal
            new Element({
                id: 'wild-animal',
                color: '#ceab8b',
                category: 11,
            }),

            // Monkey
            new Element({
                id: 'monkey',
                color: '#422c12',
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
        ];
    }

    getDB() {
        return this.#db;
    }
}

export default DbElements;