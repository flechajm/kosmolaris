/**
 * Clase que representa información básica del juego.
 */
class GameInfo {
  /**
   * Título del juego.
   */
  static title = "Kosmolaris";

  /**
   * Versión del juego.
   */
  static version = "1.0.0";

  /**
   * Fecha de creación del juego.
   */
  static created = new Date(2023, 9, 17);

  /**
   * Fecha de la última actualización del juego.
   */
  static lastUpdate = new Date(2023, 9, 27);

  /**
   * Nombre del item del storage.
   */
  static storageName = `${GameInfo.title}Game`;

  /**
   * Nombre del item del storage para la configuración
   */
  static storageNameConfig = `${GameInfo.title}GameConfig`;

  /**
   * Descripción corta del último cambio.
   */
  static briefChanges = {
    "es": [
      "Primera versión jugable.",
    ],
    "en": [
      "First playable version.",
    ]
  }

  static getBriefText(lang) {
    return `+ ${GameInfo.briefChanges[lang].join("<br />+ ")}`;
  }
}


export default GameInfo;