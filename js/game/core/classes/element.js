import GameElements from "../game_elements.js";

class Element {
    constructor({
        id,
        name,
        description,
        category,
        isSpecial,
        uuid,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.isSpecial = isSpecial ?? false;
        this.uuid = uuid;
    }

    static fromId(elementId) {
        const element = GameElements.getById(elementId);
        return new Element({
            id: element.id,
            name: element.name,
            description: element.description,
            category: element.category,
            isSpecial: element.isSpecial,
            uuid: this.generateUUID(),
        });
    }

    static generateUUID() {
        return Math.random().toString(36).slice(-8);
    }

    getFormattedColor(useTypeColor = false) {
        let color = useTypeColor ? this.isSpecial ? '--color-special' : '--color-common' : '--color-green-light';
        return `<span style='color: var(${color})'>${this.name}</span>`;
    }

    createElementDOM({ onBoard, posX, posY, ghost, shortcut, combination }) {
        const randomIcon = ['fire', 'water', 'earth', 'air', 'bruce-lee', 'pressure', 'sulphuric-acid'];


        const uuid = this.uuid ? `id="${this.uuid}"` : '';
        const classOnBoard = `${onBoard ? ' on-board' : ''}`;
        const classGhost = `${ghost ? ' ghost' : ''}`;
        const position = `${onBoard ? `style="left:${posX}px; top:${posY};"` : ""}`;
        const classShortcut = `${shortcut ? ' shortcut' : ''}`;
        const elementIcon = `style="background-image: url('img/elements/${this.id}.png')"`;
        const attrCombination = combination ? `combination="${combination.element1};${combination.element2}"` : '';

        return `<element
                    ${uuid} 
                    data="${this.id}"
                    class="element-wrapper${classOnBoard}${classGhost}${classShortcut}"
                    ${position}
                >
                    <div class="element-button color shadow" ${attrCombination}>
                        <div class="element-image" ${elementIcon}></div>
                        <span>${this.name}</span>
                    </div>
                    <!-- <span>${this.name}</span> -->
                </element>`;
    }
}

export default Element;