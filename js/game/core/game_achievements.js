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
            GameLog.write(`🏆 <span class='achievement-unlocked'>${LanguageManager.getData().console.achievementUnlocked}</span>`);
            GameLog.write(`<div class='achievement'>
                                <div class='icon'>
                                    🏆
                                    <!-- <img src='img/${achievement.icon}.png' /> -->
                                </div>
                                <div>
                                    <div class='title'>${achievement.title}</div>
                                    <div class='subtitle'>${achievement.description}</div>
                                </div>
                            </div>`);

            this.unlockeds.push(achievement.id);
        }
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

    getByElementToUnlock(element) {
        return this.#achievements.find((a) => a.elementToUnlock == element);
    }
}

export default GameAchievements;