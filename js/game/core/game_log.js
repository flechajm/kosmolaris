import LanguageManager from "../../libs/language_manager.js";

class GameLog {
  static logDOM = $("#log > div.text");
  static MAX_MESSAGES = 200;
  static countMessages = 0;

  static #append(html) {
    this.logDOM.append(html)
      .children(':last')
      .hide()
      .fadeIn(500);
    this.logDOM.animate(
      {
        scrollTop: this.logDOM[0].scrollHeight
      },
      0
    );
    if (this.countMessages >= this.MAX_MESSAGES) {
      this.logDOM.html('');
      this.countMessages = 0;
    } else {
      this.countMessages++;
    }
  }

  static write({ html, color, fontSize }) {
    this.#append(`<div class="message-log">
                    <span style="color: ${color ?? "inherit"}; font-size: ${fontSize ?? "inherit"};">${html}</span>
                    <br />
                  </div>`);
  }

  static newLine(cant) {
    this.#append(`<div class="message-log">
                    ${"<br />".repeat(cant ?? 1)}
                  </div>`);
  }

  static writeSaveProgress() {
    this.write({ html: `> ${LanguageManager.getData().saveProgress} [${new Date().toLocaleString()}]`, color: "grey" });
  }
}

export default GameLog;