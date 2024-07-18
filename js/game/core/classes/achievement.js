class Achievement {
    constructor({ id, title, description, icon, discoveredElements, rules, disclaimer, enabled = true }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.discoveredElements = discoveredElements ?? null;
        this.rules = rules ?? null;
        this.disclaimer = disclaimer;
        this.enabled = enabled;
    }

    getDOM({ expand, showDisclaimer }) {
        const expandClass = expand ? " expand" : '';
        const disclaimerDIV = showDisclaimer ? this.disclaimer ? `<div class='disclaimer'>${this.disclaimer}</div>` : '' : '';

        return `<div class='achievement-container'>
                    <div class='achievement${expandClass}'>
                        <div class='icon'>
                            🏆
                            <!-- <img src='img/${this.icon}.png' /> -->
                        </div>
                        <div>
                            <div class='title'>${this.title}</div>
                            <div class='subtitle'>${this.description}</div>
                        </div>
                    </div>
                    ${disclaimerDIV}
                </div>`;
    }
}

export default Achievement;