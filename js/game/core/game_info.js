/**
 * Clase que representa información básica del juego.
 */
class GameInfo {
  /**
   * Título del juego.
   */
  static title = "Kosmolaris";

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
  static changelog = [
    {
      "version": "1.0.1",
      "changelog": {
        "es": [
          "NEW: Se agregaron 4 nuevos logros.",
          "NEW: Se agregaron 4 nuevos elementos.",
          "NEW: Ahora puedes hacer clic medio sobre un elemento para mostrar por consola con qué elementos lo creaste.",
          "NEW: Ahora puedes ver los logros desbloqueados.",
          "NEW: Ahora puedes ver el registro de cambios de versión.",
          "FIX: Corrección menor de localización."
        ],
        "en": [
          "NEW: Added 4 more achievements.",
          "NEW: Added 4 more elements.",
          "NEW: Now you can do a middle click on an element to show in console which elements you used to created it.",
          "NEW: Now you can see the unlocked achievements.",
          "NEW: Now you can see the version changelog.",
          "FIX: Minor localization fix."
        ],
      }
    },
    {
      "version": "1.0.0",
      "changelog": {
        "es": [
          "Primera versión jugable.",
        ],
        "en": [
          "First playable version.",
        ],
      }
    }
  ]

  /**
   * Obtiene la versión del juego.
   * @returns {String} Versión del juego.
   */
  static getCurrentVersion() {
    return this.changelog[0].version;
  }

  static getChangelog(lang) {
    const versioningList = [];

    for (let i = 0; i < GameInfo.changelog.length; i++) {
      const changelogData = GameInfo.changelog[i];
      const version = changelogData.version;
      const current = i === 0 ? ' current' : '';

      const changelog = changelogData.changelog[lang].map((value, index, array) => {
        const newValue = `<span>${value}</span>`;

        return `<li>${newValue
          .replaceAll('NEW', this.#getColor('NEW'))
          .replaceAll('FIX', this.#getColor('FIX'))
          }</li>`;
      });

      const template = `<div>
                          <div class="version${current}">v${version}:</div>
                          <ul>
                            ${changelog.join('')}
                          </ul>
                        </div>`;

      versioningList.push(template);
    }

    return versioningList.join("<br />");
  }

  static #getColor(text) {
    let color;

    switch (text) {
      case "NEW":
        color = "var(--color-common)";
        break;

      case "FIX":
        color = "var(--color-negative)";
        break;

      default:
        break;
    }

    return spanTextColor(text, color);
  }
}


export default GameInfo;