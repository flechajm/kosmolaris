export const achievementType = { common: 1, milestone: 2, rare: 3, ultraRare: 4, }

class Achievement {
    constructor({ id, title, description, icon, discoveredElements, rules, disclaimer, type, enabled = true }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.discoveredElements = discoveredElements ?? null;
        this.rules = rules ?? null;
        this.disclaimer = disclaimer;
        this.type = type ?? achievementType.common;
        this.enabled = enabled;
    }

    getDOM({ expand, showDisclaimer }) {
        const expandClass = expand ? " expand" : '';
        const type = this.getTypeClass();
        const disclaimerDIV = showDisclaimer ? this.disclaimer ? `<div class='disclaimer'>${this.disclaimer}</div>` : '' : '';

        return `<div class='achievement-container'>
                    <div class='achievement${expandClass}'>
                        <div class='icon ${type}'>
                        <img draggable="false" src='img/achievements/${this.id}.png' />    
                        </div>
                        <div>
                            <div class='title'>${this.title}</div>
                            <div class='subtitle'>${this.description}</div>
                        </div>
                    </div>
                    ${disclaimerDIV}
                </div>`;
    }

    getTypeClass() {
        switch (this.type) {
            case achievementType.milestone:
                return 'flare milestone';

            case achievementType.rare:
                return 'flare rare';

            case achievementType.ultraRare:
                return 'flare ultra-rare';

            case achievementType.common:
            default:
                return '';
        }
    }

    getTypeText(langData) {
        switch (this.type) {
            case achievementType.milestone:
                return langData.console.achievements.milestone;

            case achievementType.rare:
                return langData.console.achievements.rare;

            case achievementType.ultraRare:
                return langData.console.achievements.ultraRare;

            case achievementType.common:
            default:
                return '';
        }
    }
}

export default Achievement;
