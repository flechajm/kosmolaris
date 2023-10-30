/**
 * Obtiene un elemento SPAN formateado con texto a color.
 * @param {String} text   Texto.
 * @param {String} color  Color del texto. 
 * @returns {HTMLElement} Span
 */

function spanTextColor(text, color) {
  return `<span style='color: ${color}'>${text}</span>`;
}

/**
 * Obtiene un número aleatorio entre dos.
 * @param {Number} num1 Número mínimo.
 * @param {Number} num2 Número máximo.
 * @returns {Number} Número aleatorio entre el mínimo y el máximo.
 */
function randomBetween(num1, num2) {
  let result = num2 - num1 + 1;
  return Math.floor(Math.random() * result + num1);
}
/**
 * Encripta una cadena de texto.
 * @returns {String} Cadena de texto encriptada.
 */
String.prototype.encrypt = function () {
  return window.btoa(this);
};

/**
 * Desencripta una cadena de texto encriptada.
 * @returns {String} Cadena de texto desencriptada.
 */
String.prototype.decrypt = function () {
  return window.atob(this);
};

/**
 * Concatena cadenas con varios parámetros. El primer parámetro es una cadena de string. Los demás parámetros son variables de cualquier tipo.
 * @returns
 */
String.format = function () {
  let string = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "g");
    // La expresión "g" al final de la declaración RegExp significa que la sustitución debería ocurrir más de una vez.
    string = string.replace(reg, arguments[i + 1]);
  }

  return string;
};