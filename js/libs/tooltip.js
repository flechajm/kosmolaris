
/**
 * Clase encargada del manejo de los tooltips.
 */
class Tooltip {
  /**
   * Representa el elemento DOM '#tooltip'.
   */
  static #tooltip;

  /**
   * Representa el elemento DOM 'div.header-wrapper'.
   */
  static #headerWrapper;

  /**
   * Representa el elemento DOM 'div.header-container'.
   */
  static #headerContainer;

  /**
   * Representa el elemento DOM 'div.cost'.
   */
  static #cost;

  /**
   * Representa el elemento DOM 'div.content'.
   */
  static #content;

  static #isHoldingCtrl;

  /**
   * Muestra un tooltip con información.
   *
   * El tooltip se muestra por defecto por encima del mouse y puede contener información tanto para los edificios y las mejoras como para cualquier elemento del juego al que se le quiera describir.
   * @param {event}   event         Evento de la función que lo llamó. Indispensable para obtener las coordenadas de movimiento del mouse.
   * @param {String}  title         Título.
   * @param {String}  subtitle      Subtítulo. [Opcional].
   * @param {String}  description   La descripción del tooltip puede ser texto plano o HTML.
   * @param {String}  icon          Ícono que se mostrará en la parte superior izquierda del tooltip. [Opcional].
   * @param {String}  iconSize      Tamaño del ícono. [Opcional]. 
   * @param {Number}  cost          Corresponde al valor de un edificio o mejora. [Opcional].
   * @param {String}  position      Indica en qué posición se mostrará tomando en cuenta las coordenadas del mouse. Los valores posibles son: 'top', 'right', 'bottom', 'left'. Valor por defecto: 'top'.
   * @param {Boolean} canBuy        Indica si se puede comprar o no un edificio. Tiene sentido únicamente cuando el parámetro {cost} valor.
   * @param {Number}  extraPadding  Añade un margen extra (al ya predefinido) entre el mouse y el tooltip. [Opcional].
   * @param {Number}  width         Especifica el ancho del tooltip. [Opcional].
   * @param {Arrays}  gameUnits     Unidades de números.
   */
  static setTooltip({
    event,
    title = null,
    subtitle = null,
    description = null,
    icon = null,
    iconSize = 'cover',
    cost = null,
    position = "top",
    canBuy = null,
    extraPadding = null,
    paddingLock = null,
    width = 330,
    gameUnits = null
  }) {
    extraPadding = extraPadding ?? 20;
    let padding = 26;
    let paddingTop;
    let paddingLeft;
    let center;
    let separator = '<div class="separator"></div>';

    this.event = event;
    this.#tooltip = $("#tooltip");
    this.#tooltip.css('width', cost ? 600 : width);
    this.#headerWrapper = this.#tooltip.find("div.header-wrapper");
    this.#headerContainer = this.#headerWrapper.find("div.container");
    this.#cost = this.#headerWrapper.find("div.cost");
    this.#content = this.#tooltip.find("div.content");

    this.#headerWrapper.find("div.icon").css({
      background: `url(${icon}) no-repeat center center / ${iconSize}`,
      display: icon ? "block" : "none",
    });

    this.#headerContainer.find("div.title").html(title ?? "");
    this.#headerContainer.find("div.subtitle").html(subtitle ?? "");
    this.#cost.find("div.hidden-value").html(cost ?? "");
    this.#cost.find("div.value").html(Number.pretty(cost, gameUnits) ?? "");
    this.#cost.find("div.value").toggleClass("unavailable", !canBuy);
    this.#content.html(description?.replaceAll("@separator@", separator));
    this.#content.toggleClass("no-margin", title == null);

    let paddingHeight = 0;
    let paddingWidth = 0;
    if (position == "top" || position == "bottom") {
      center = this.#tooltip.width() / 2;
      paddingHeight = this.#tooltip.height();
    } else if (position == "left" || position == "right") {
      center = this.#tooltip.height() / 2;
      paddingWidth = this.#tooltip.outerWidth();
    }

    if (!Tooltip.getShiftPressed()) {
      this.#tooltip.css({ top: "", right: "", bottom: "", left: "" });

      switch (position) {
        case "top":
          paddingTop = -paddingHeight - padding - extraPadding;
          paddingLeft = -center;

          this.#setPaddingLock(this.event, "bottom", paddingLock);
          break;
        case "right":
          paddingTop = -center;
          paddingLeft = padding + extraPadding;

          this.#setPaddingLock(this.event, "left", paddingLock);
          break;
        case "bottom":
          paddingTop = padding + extraPadding;
          paddingLeft = -center;

          this.#setPaddingLock(this.event, "top", paddingLock);
          break;
        case "left":
          paddingTop = -center;
          paddingLeft = -paddingWidth - padding - extraPadding;

          this.#setPaddingLock(this.event, "right", paddingLock);
          break;

        default:
          break;
      }

    }

    if (this.event != null) {
      if (paddingLock == null) {
        this.#mouseMove({ event: this.event, paddingTop: paddingTop, paddingLeft: paddingLeft });
      } else {
        if (position == "left" || position == "right") {
          this.#mouseMove({ event: this.event, paddingTop: paddingTop });
        } else if (position == "top" || position == "bottom") {
          this.#mouseMove({ event: this.event, paddingLeft: paddingLeft });
        }
      }

      this.show();

      const tooltipWidth = this.#tooltip.outerWidth();
      const tooltipHeight = this.#tooltip.outerHeight();
      const isOffsetX = ($(window).width() - $('#tooltip')[0].getBoundingClientRect().x) < tooltipWidth;
      const isOffsetY = ($(window).height() - $('#tooltip')[0].getBoundingClientRect().y) < tooltipHeight;

      if (isOffsetX) {
        this.#mouseMove({ event: this.event, paddingLeft: paddingLeft - tooltipWidth });
      }

      if (isOffsetY) {
        this.#mouseMove({ event: this.event, paddingTop: paddingTop - (tooltipHeight / 2) });
      }
    }
  }

  static setShiftPressed(pressed) {
    this.#isHoldingCtrl = pressed;
  }

  static getShiftPressed() {
    return this.#isHoldingCtrl;
  }


  static #setPaddingLock(event, paddingPosition, paddingLock) {
    if (event != null && paddingLock != null) {
      this.#tooltip.css(paddingPosition, `${paddingLock}px`);
    }
  }

  static #mouseMove({ event, paddingTop, paddingLeft }) {
    const gameHeight = parseInt($('#game').height(), 10);
    const tooltipHeight = parseInt(this.#tooltip.height(), 10);

    if (paddingTop) {
      this.#tooltip.css("top", `${event.pageY + paddingTop}px`);
    }

    if (paddingLeft) {
      this.#tooltip.css("left", `${event.pageX + paddingLeft}px`);
    }

    const positionTop = parseInt(this.#tooltip.css('top'), 10);
    if (positionTop < 0)
      this.#tooltip.css("top", 0);

    // 27px (footer).
    if (positionTop + tooltipHeight + 27 > gameHeight) {
      const newHeight = gameHeight - tooltipHeight - 27;
      this.#tooltip.css("top", newHeight);
    }
  }

  /**
   * Actualiza el cost del edificio y/o mejora actual mostrado en el tooltip.
   * @param {Number} coins Monedas actuales.
   */
  static updateCost(coins) {
    if (this.#headerWrapper) {
      let cost = this.#cost.find("div.hidden-value").html();
      this.#cost.find("div.value").toggleClass("unavailable", cost > coins);
    }
  }

  /**
   * Muestra el tooltip.
   */
  static show() {
    this.#tooltip.show();
  }

  /**
   * Oculta el tooltip.
   */
  static hide() {
    if (this.#tooltip != null && this.#tooltip.length == 1) this.#tooltip.hide();
  }

  static getEvent() {
    return this.event;
  }
}

export default Tooltip;