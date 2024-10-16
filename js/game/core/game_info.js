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
      "version": "1.1.0",
      "date": new Date(2024, 10, 3),
      "changelog": {
        "es": [
          "¡Kosmolaris pasó a ser versión estable y está disponible en <a href='https://store.steampowered.com/app/3284610/Kosmolaris/' target='_blank'>Steam</a>! 🥳",
          "NEW: Se agregaron imágenes a todos los elementos.",
          "NEW: Se agregaron 2 nuevos elementos comunes (de 200 a 202).",
          "NEW: Se agregaron 4 nuevos elementos especiales (de 12 a 16).",
          "NEW: Se agregaron 9 nuevos logros (de 20 a 29).",
          "NEW: Se agregó un efecto especial al descubrir un nuevo elemento.",
          "FIX: Mejoras generales.",
          "FIX: Correcciones en las localizaciones.",
          "CHANGE: Se reorganizó la IU y se agregó una ventana de créditos.",
        ],
        "en": [
          "Kosmolaris has become a stable version and is available on <a href='https://store.steampowered.com/app/3284610/Kosmolaris/' target='_blank'>Steam</a>! 🥳",
          "NEW: Added images to all elements.",
          "NEW: Added 2 new common elements (from 200 to 202).",
          "NEW: Added 4 new special elements (from 12 to 16).",
          "NEW: Added 9 new achievements (from 20 to 29).",
          "NEW: Added a new special effect when discovering a new element.",
          "FIX: General improvements.",
          "FIX: Localization corrections.",
          "CHANGE: The UI was reorganized, and a credits window was added.",
        ],
      }
    },
    {
      "version": "1.0.4",
      "date": new Date(2023, 10, 20),
      "changelog": {
        "es": [
          "NEW: Se agregaron 96 nuevos elementos comunes (de 104 a 200).",
          "NEW: Se agregaron 5 nuevos elementos especiales (de 7 a 12).",
          "NEW: Se agregaron 5 nuevas categorías (de 11 a 16).",
          "NEW: Se agregaron 8 nuevos logros (de 12 a 20).",
          "NEW: Ahora el campo de búsqueda de elementos ignora las tildes.",
          "FIX: Corrección menor en la localización en Español.",
          "CHANGE: Se rehizo el sistema de logros para tener un mejor control de los mismos dentro del juego.",
        ],
        "en": [
          "NEW: Added 96 new common elements (from 104 to 200).",
          "NEW: Added 5 new special elements (from 7 to 12).",
          "NEW: Added 5 new categories (from 11 to 16).",
          "NEW: Added 8 new achievements (from 12 to 20).",
          "NEW: Elements search box now ignores accent marks in Spanish.",
          "FIX: Minor fix in Spanish localization.",
          "CHANGE: Achievement system was reworked for better tracking ingame.",
        ],
      }
    },
    {
      "version": "1.0.3",
      "date": new Date(2023, 10, 3),
      "changelog": {
        "es": [
          "¡Nuevo dominio: <a href='https://kosmolaris.com' target='_blank'>https://kosmolaris.com</a> 🤩!",
          "NEW: Se añadieron efectos de sonido a los botones de la UI.",
          "FIX: Se mejoró la animación de <i>glowing</i> cuando se superponen los elementos.",
          "FIX: Se corrigió un error en el cuál los fondos no se precargaban correctamente.",
        ],
        "en": [
          "New domain: <a href='https://kosmolaris.com' target='_blank'>https://kosmolaris.com</a> 🤩!",
          "NEW: Added SFX to the UI's buttons.",
          "FIX: Improved the <i>glowing</i> animation when elements overlap.",
          "FIX: Fixed a bug where background images were not preload correctly."
        ],
      }
    },
    {
      "version": "1.0.2",
      "date": new Date(2023, 9, 30),
      "changelog": {
        "es": [
          "NEW: Se rediseñó el sistema de drag and drop.",
          "NEW: Se agregaron 3 nuevos elementos (de 101 a 104).",
          "FIX: Se corrigió un error al validar la existencia de elementos especiales.",
        ],
        "en": [
          "NEW: Drag and drop system was reworked for better QoL.",
          "NEW: Added 3 new elements (from 101 a 104).",
          "FIX: Fixed a bug when validating the existence of special items.",
        ],
      }
    },
    {
      "version": "1.0.1",
      "date": new Date(2023, 9, 29),
      "changelog": {
        "es": [
          "NEW: Se agregaron 4 nuevos logros.",
          "NEW: Se agregaron 3 nuevos elementos.",
          "NEW: Se agregó 1 nuevo elemento especial.",
          "NEW: Ahora puedes hacer clic medio sobre un elemento para mostrar por consola con qué elementos lo creaste.",
          "NEW: Ahora puedes ver los logros desbloqueados.",
          "NEW: Ahora puedes ver el registro de cambios de versión.",
          "FIX: Corrección menor de localización."
        ],
        "en": [
          "NEW: Added 4 new achievements.",
          "NEW: Added 4 new elements.",
          "NEW: Added 1 new special element.",
          "NEW: Now you can do a middle click on an element to show in console which elements you used to created it.",
          "NEW: Now you can see the unlocked achievements.",
          "NEW: Now you can see the version changelog.",
          "FIX: Minor localization fix."
        ],
      }
    },
    {
      "version": "1.0.0",
      "date": new Date(2023, 9, 27),
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
    return {
      version: this.changelog[0].version,
      date: this.changelog[0].date,
    }
  }

  static getChangelog(lang) {
    const versioningList = [];

    for (let i = 0; i < GameInfo.changelog.length; i++) {
      const changelogData = GameInfo.changelog[i];
      const version = changelogData.version;
      const current = i === 0 ? ' current' : '';
      const date = changelogData.date.toLocaleString(lang, { year: "numeric", month: "long", day: "numeric" });

      const changelog = changelogData.changelog[lang].map((value, index, array) => {
        const newValue = `<span>${value}</span>`;

        return `<li>${newValue
          .replaceAll('NEW', this.#getColor('NEW'))
          .replaceAll('FIX', this.#getColor('FIX'))
          .replaceAll('CHANGE', this.#getColor('CHANGE'))
          }</li>`;
      });

      const template = `<div>
                          <div class="version${current}">v${version}:</div>
                          <div class="date">${date}</div>
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
        color = "var(--color-new)";
        break;

      case "FIX":
        color = "var(--color-fix)";
        break;

      case "CHANGE":
        color = "var(--color-change)";
        break;

      default:
        break;
    }

    return spanTextColor(text, color);
  }
}


export default GameInfo;