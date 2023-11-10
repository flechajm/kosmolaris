class Achievement {
    constructor({ id, title, description, icon, discoveredElements, rules, enabled = true }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.discoveredElements = discoveredElements ?? null;
        this.rules = rules ?? null;
        this.enabled = enabled;
    }

    getDOM(expand) {
        const expandClass = expand ? " expand" : '';
        return `<div class='achievement${expandClass}'>
                    <div class='icon'>
                        🏆
                        <!-- <img src='img/${this.icon}.png' /> -->
                    </div>
                    <div>
                        <div class='title'>${this.title}</div>
                        <div class='subtitle'>${this.description}</div>
                    </div>
                </div>`;
    }
}

export default Achievement;