class LanguageManager {
  static #data;

  static getData() {
    return this.#data;
  }

  static async setLanguage(lang) {
    const date = new Date().getTime();
    await fetch(`./js/game/lang/${lang}.json?v=${date}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        this.#data = jsonData;
      });
  }
}

export default LanguageManager;