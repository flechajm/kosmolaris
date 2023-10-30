import GameInfo from "./game_info.js";
import GameManager from "./game_manager.js";
import { gameManager } from "../main.js";

/**
 * Clase encargada del manejo del estado del juego.
 */
class GameStateManager {
  static save() {
    gameManager.config.saveDate = new Date().getTime();
    localStorage.setItem(GameInfo.storageName, JSON.stringify(gameManager).encrypt());
  }

  static load(gameConfig) {
    let jsonData = localStorage.getItem(GameInfo.storageName);
    return jsonData ? new GameManager(JSON.parse(jsonData.decrypt())) : new GameManager({ config: gameConfig });
  }
}

export default GameStateManager;