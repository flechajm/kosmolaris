import GameInfo from "./game_info.js";

/**
 * Clase que representa la configuración del juego.
 */
class GameConfig {
  /**
   * Crea la instancia de Configuración.
   * @param {GameConfig} GameConfig Puede recibir una configuración para precargar o no, y crearla por defecto.
   */
  constructor(config) {
    /**
     * Volumen de la música del juego. Valor por defecto: 8.
     */
    this.bgmVolume = config?.bgmVolume ?? 50;

    /**
     * Volumen del juego. Valor por defecto: 8.
     */
    this.sfxVolume = config?.sfxVolume ?? 70;

    /**
     * Lenguage del juego. Valor por defecto: 'en'.
     */
    this.lang = config?.lang ?? "en";

    /**
     * Fecha en la que se guardó el juego, expresada en milisegundos.
     */
    this.saveDate = config?.saveDate ?? null;

    /**
     * Indica si se debe mostrar el cartel de bienvenida o no.
     */
    this.showWelcome = config?.showWelcome ?? true;

    /**
     * Indica si el juego debe jugarse en modo debug. Habilita un selector de elementos.
     */
    this.debugMode = true;
  }

  save() {
    localStorage.setItem(GameInfo.storageNameConfig, JSON.stringify(this).encrypt());
  }

  static load() {
    let gameConfig = localStorage.getItem(GameInfo.storageNameConfig);
    return gameConfig ? new GameConfig(JSON.parse(gameConfig.decrypt())) : new GameConfig({});
  }
}

export default GameConfig;