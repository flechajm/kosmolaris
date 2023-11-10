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
            $('#log').find('.achievement').click(function () {
                $('#btn-achievements').click();
            });

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

    tryUnlockAchievement(allElementsUnlocked) {
        let matches = 0;

        const availableAchievements = this.#achievements.filter((a) => !this.unlockeds.includes(a.id));

        for (let i = 0; i < availableAchievements.length; i++) {
            const achievement = availableAchievements[i];

            if (achievement.rules) {
                for (let j = 0; j < achievement.rules.length; j++) {
                    const rule = achievement.rules[j];
                    let hasMatch = false;

                    if (rule.elementRequired) {
                        hasMatch = allElementsUnlocked.some((e) => e.result === rule.elementToUnlock &&
                            (e.element1 === rule.elementRequired || e.element2 === rule.elementRequired))
                    } else {
                        hasMatch = allElementsUnlocked.some((e) => e.result === rule.elementToUnlock);
                    }

                    if (hasMatch) {
                        matches++;

                        if (matches === achievement.rules.length) {
                            this.unlock(achievement.id);
                            return;
                        }
                    } else {
                        break;
                    }
                }
            }
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