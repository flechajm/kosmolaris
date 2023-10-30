import DbAchievements from "../db/db_achievements.js";
import GameLog from "./game_log.js";

import LanguageManager from "../../libs/language_manager.js";
import { audioManager } from "../main.js";

class GameAchievements {
    #achievements = [];
    unlockeds = [];

    constructor(achievements) {
        this.#achievements = new DbAchievements().getDB();
        this.unlockeds = achievements?.unlockeds.sort((a, b) => a - b) ?? [];
    }

    unlock(id) {
        const achievement = this.#achievements.find((a) => a.id == id);
        const isUnlocked = this.unlockeds.some((a) => a == id);

        if (achievement && !isUnlocked) {
            if (audioManager) {
                audioManager.play('levelup');
            }

            const achievementConsoleDOM = achievement.getDOM();

            GameLog.write(`🏆 <span class='achievement-unlocked'>${LanguageManager.getData().console.achievementUnlocked}</span>`);
            GameLog.write(achievementConsoleDOM);

            this.unlockeds.push(achievement.id);

            this.addAchievementToWindow(achievement);
        }
    }

    addAchievementToWindow(achievement) {
        const achievementWindowDOM = achievement.getDOM(true);

        const contentDOM = $('#window-achievements .content');
        contentDOM.append(achievementWindowDOM);
    }

    setLocalization() {
        const langData = LanguageManager.getData();

        this.#achievements.forEach((achievement) => {
            const achievementsInfo = langData.achievements.find((a) => a.id == achievement.id);
            if (achievementsInfo) {
                achievement.title = achievementsInfo.title;
                achievement.description = achievementsInfo.description;
            }
        });
    }

    getByReachDiscoveredElements(value) {
        return this.#achievements.find((a) => a.discoveredElements == value);
    }

    getByElementToUnlock({ elementToUnlock, element1, element2 }) {
        const achievement = this.#achievements.find((a) => a.elementToUnlock == elementToUnlock);

        if ((achievement != null && achievement.elementRequired == null) ||
            (achievement != null && achievement.elementRequired != null && (achievement.elementRequired == element1 || achievement.elementRequired == element2))) {
            return achievement;
        }
    }

    getById(achievementId) {
        return this.#achievements.find((a) => a.id == achievementId);
    }

    getTotalAchievements() {
        return this.#achievements.filter((a) => a.enabled).length;
    }
}

export default GameAchievements;