import GameElements from "../game_elements.js";

class Element {
    constructor({
        id,
        name,
        description,
        category,
        color,
        isSpecial,
        uuid,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.color = color;
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
            color: element.color,
            isSpecial: element.isSpecial,
            uuid: this.generateUUID(),
        });
    }

    static generateUUID() {
        return Math.random().toString(36).slice(-8);
    }

    getFixedName() {
        return this.name.replaceAll('<br />', ' ').replaceAll('<br>', ' ');
    }

    createElementDOM({ onBoard, posX, posY, ghost, shortcut }) {
        let uuid = this.uuid ? `id="${this.uuid}"` : '';
        let classOnBoard = `${onBoard ? ' on-board' : ''}`;
        let classGhost = `${ghost ? ' ghost' : ''}`;
        let position = `${onBoard ? `style="left:${posX}px; top:${posY};"` : ""}`;
        let classShortcut = `${shortcut ? ' shortcut' : ''}`;
        let styleColor = `style="background-color: ${this.color}; border-color: ${this.color};"`;

        return `<element
                    ${uuid} 
                    data="${this.id}"
                    class="element-wrapper${classOnBoard}${classGhost}${classShortcut}"
                    ${position}
                >
                    <div class="element-button color shadow" ${styleColor} draggable="true">
                        <!-- <div class="element-image"></div>-->
                        <span>${this.name}</span>
                    </div>
                    <!-- <span>${this.name}</span> -->
                </element>`;
    }
}

export default Element;