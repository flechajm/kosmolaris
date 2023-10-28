class Achievement {
    constructor({ id, title, description, icon, discoveredElements, elementToUnlock }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.discoveredElements = discoveredElements ?? null;
        this.elementToUnlock = elementToUnlock ?? null;
    }
}

export default Achievement;