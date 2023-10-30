import Element from "./classes/element.js";

import GameElements from "./game_elements.js";
import GameCategories from "./game_categories.js";
import GameAchievements from "./game_achievements.js";
import GameConfig from "./game_config.js";

import GameCombinationManager from "./game_combination_manager.js";

import { GameStateManager, audioManager } from "../main.js";
import GameLog from "./game_log.js";
import LanguageManager from "../../libs/language_manager.js";

class GameManager {
    /**
     * @param {Array}               elementsUnlocked        Array de elementos descubiertos.
     * @param {Array}               specialElementsUnlocked Array de elementos descubiertos.
     * @param {HTMLElement}         board                   Tablero HTML con los elementos.
     * @param {GameConfig}          config                  Configuración del juego.
     * @param {DateTime}            initDate                Fecha y hora de inicio del juego.
     * @param {GameAchievements}    achievements            Manejador de logros.
     */
    constructor({
        elementsUnlocked,
        specialElementsUnlocked,
        board,
        config,
        initDate,
        achievements,
    }) {
        this.elementsUnlocked = elementsUnlocked ?? [];
        this.specialElementsUnlocked = specialElementsUnlocked ?? [];
        this.board = board ?? '';
        this.config = new GameConfig(config);
        this.initDate = initDate;
        this.achievements = new GameAchievements(achievements);
    }

    init() {
        this.achievements.setLocalization();

        this.#loadBoard();
        this.#loadCategories();
        this.#loadAchievements();
        this.bindInputSearch();
        this.initialBind();
        this.updateCurrentDiscoveredElements();

        if (this.config.debugMode)
            this.#debugElementSelector();
    }


    #debugElementSelector() {
        const gameManager = this;
        const elements = GameElements.getAll();
        const debugTemplate = `<div id="debug">
                                    <select id="element-selector"></select>
                                </div>`;
        $('.option-buttons').prepend(debugTemplate);

        elements.sort((a, b) => a.name.localeCompare(b.name));

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            $('#element-selector').append(`<option value="${element.id}">${element.getFixedName()} (${element.id})</option>`);
        }

        $('#element-selector').on('change', function (e) {
            const id = e.target.options[e.target.selectedIndex].value;
            const element = Element.fromId(id);

            gameManager.bindBoardElementFromDragAndDrop(element, { onBoard: false, shortcut: true });
            gameManager.saveGame();
            e.target.selectedIndex = -1;
        });
    }

    #loadAchievements() {
        const windowAchievementsDOM = $('#window-achievements');
        const contentDOM = windowAchievementsDOM.find('.content');
        const langData = LanguageManager.getData();

        const currentTextColor = spanTextColor(this.achievements.unlockeds.length, "var(--color-green-light)");
        const totalTextColor = spanTextColor(this.achievements.getTotalAchievements(), "var(--color-gold)");

        const title = langData.windows.achievements.title
            .replace('{current}', currentTextColor)
            .replace('{total}', totalTextColor);

        windowAchievementsDOM.find('.popup > .container > .title').html(title);
        windowAchievementsDOM.find('.button').html(langData.windows.achievements.ok);

        if (this.achievements.unlockeds.length === 0) {
            contentDOM.addClass('empty');
            contentDOM.append(langData.windows.achievements.empty);
        } else {
            contentDOM.removeClass('empty');
            contentDOM.html('');

            for (let i = 0; i < this.achievements.unlockeds.length; i++) {
                const achievementId = this.achievements.unlockeds[i];
                const achievement = this.achievements.getById(achievementId);

                contentDOM.append(achievement.getDOM(true));
            }
        }
    }

    #saveBoardData() {
        const auxBoard = $('board').clone(true);
        auxBoard.find('.ghost').remove();

        this.board = auxBoard.html();
    }

    saveGame() {
        this.#saveBoardData();
        GameStateManager.save();
    }

    /**
     * Graba la fecha y hora en que se guardó el juego.
     * @param {DateTime} date Fecha de guardado.
     */
    setSaveDate(date) {
        this.config.saveDate = date;
    }

    /**
     * Obtiene la fecha y hora en la que se guardó el juego.
     * @returns {DateTime} Fecha de guardado.
     */
    getSaveDate() {
        return this.config.saveDate;
    }

    updateCurrentDiscoveredElements() {
        const langData = LanguageManager.getData();

        const commonTextColor = spanTextColor(langData.common.discoveredElements.common, "var(--color-common)");
        const commonCurrentColor = spanTextColor(this.elementsUnlocked.length, "var(--color-green-light)");
        const commonTotalColor = spanTextColor(GameElements.getTotalElements(), "var(--color-common)");

        const specailTextColor = spanTextColor(langData.common.discoveredElements.special, "var(--color-special)");
        const specialCurrentColor = spanTextColor(this.specialElementsUnlocked.length, "var(--color-green-light)");
        const specialTotalColor = spanTextColor(GameElements.getTotalSpecialElements(), "var(--color-special)");

        const commonTemplate = `${commonTextColor}: ${commonCurrentColor} / ${commonTotalColor}`;
        const specialTemplate = `${specailTextColor}: ${specialCurrentColor} / ${specialTotalColor}`;

        const title = langData.common.discoveredElements.title;

        $('#unlocked-container > span').html(title);
        $('#unlocked-elements').html(`${commonTemplate}<br />${specialTemplate}`);
    }


    #loadBoard() {
        const elementsOnBoard = $(this.board);
        elementsOnBoard.each(function () {
            const id = $(this).attr('data');
            const elementName = GameElements.getById(id).name;

            $(this).find('.element-button > span').html(elementName);
        });

        $('board').html(elementsOnBoard);
    }

    #loadCategories() {
        for (let i = 0; i < this.elementsUnlocked.length; i++) {
            const elementUnlocked = this.elementsUnlocked[i];

            const elementId = elementUnlocked.result;
            const combination = {
                element1: elementUnlocked.element1,
                element2: elementUnlocked.element2,
            }

            GameCategories.addElementToCategory(elementId, { combination });
        }
    }

    drag(e) {
        e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = 'move';
    }

    dragStart({ event, elementId, from }) {
        this.setTransferData({
            event: event,
            elementId: elementId,
            from: from,
        });
    }

    dropOnElement(e) {
        e.preventDefault();
        e.stopPropagation();

        const data = this.getTransferData(e);

        if (data.from.type === 'sidebar') {
            if (data.to.type === 'element') {
                const elementDOM = GameElements.getDOM(data.to.id);
                const element1 = GameElements.getById(elementDOM[0].getAttribute('data'));
                const element2 = GameElements.getById(data.from.id);

                const result = GameCombinationManager.findCombination({
                    element1: element1.id,
                    element2: data.from.id,
                });

                if (result != null) {
                    const exists = GameCombinationManager.checkExists(result);
                    const newElement = Element.fromId(result);
                    const position = {
                        posX: elementDOM.position().left,
                        posY: elementDOM.position().top,
                    }

                    if (!exists) {
                        this.unlockElement(newElement, element1, element2);
                        elementDOM.remove();

                        const combination = {
                            element1: element1.id,
                            element2: element2.id
                        }
                        GameCategories.addElementToCategory(newElement.id, { combination: combination });

                        this.bindSidebarElementFromDragAndDrop(newElement);
                        this.bindBoardElementFromDragAndDrop(newElement, {
                            posX: position.posX,
                            posY: position.posY,
                            combination: combination
                        });

                        this.saveGame();
                    } else {
                        this.showGhostElement(result, position);
                    }
                } else {
                    audioManager.playMiss();
                }
            }
        } else if (data.from.type === 'element' && data.to.type === 'element' && data.from.id != data.to.id) {
            const elementFromDOM = GameElements.getDOM(data.from.id);
            const elementToDOM = GameElements.getDOM(data.to.id);
            const element1 = GameElements.getById(elementFromDOM[0].getAttribute('data'));
            const element2 = GameElements.getById(elementToDOM[0].getAttribute('data'));

            const result = GameCombinationManager.findCombination({
                element1: element1.id,
                element2: element2.id,
            });

            if (result != null) {
                const exists = GameCombinationManager.checkExists(result);
                const newElement = Element.fromId(result);
                const position = {
                    posX: elementToDOM.position().left,
                    posY: elementToDOM.position().top,
                }

                if (!exists) {
                    this.unlockElement(newElement, element1, element2);
                    elementFromDOM.remove();
                    elementToDOM.remove();

                    const combination = {
                        element1: element1.id,
                        element2: element2.id
                    }
                    GameCategories.addElementToCategory(newElement.id, { combination: combination });

                    this.bindSidebarElementFromDragAndDrop(newElement);
                    this.bindBoardElementFromDragAndDrop(newElement, { posX: position.posX, posY: position.posY, combination: combination });

                    this.saveGame();
                } else {
                    this.showGhostElement(result, position);
                }
            } else {
                audioManager.playMiss();
            }
        } else {
            const elementDOM = GameElements.getDOM(data.from.id);
            this.moveElement({ event: e, elementDOM });

            this.saveGame();
        }

        this.bindBoard(true);

        return false;
    }

    dropOnBoard(e) {
        e.preventDefault();
        e.stopPropagation();

        const data = this.getTransferData(e);

        if (data.from.type === 'element') {
            const elementDOM = $(`#${data.from.id}`);
            elementDOM.find('.element-button').addClass('shadow');
            if (elementDOM.hasClass('shortcut')) {
                elementDOM.removeClass('shortcut').addClass('on-board');
            }
            this.moveElement({ event: e, elementDOM });

        } else if (data.from.type === 'sidebar') {
            const newElement = Element.fromId(data.from.id);
            this.bindBoardElementFromDragAndDrop(newElement, { posX: e.clientX - 36, posY: e.clientY - 36 });
        }

        this.saveGame();

        return false;
    }

    unlockElement(newElement, element1, element2) {
        audioManager.playPlop();
        GameCombinationManager.unlockElement(newElement, element1, element2);

        const achievementByCount = this.achievements.getByReachDiscoveredElements(this.elementsUnlocked.length);
        const achievementByElement = this.achievements.getByElementToUnlock({ elementToUnlock: newElement.id, element1: element1.id, element2: element2.id });

        if (achievementByCount)
            this.achievements.unlock(achievementByCount.id);

        if (achievementByElement) {
            this.achievements.unlock(achievementByElement.id);

        }

        this.#loadAchievements();
        this.updateCurrentDiscoveredElements();
    }

    moveElement({ event, elementDOM }) {
        const elementButtonDOM = elementDOM.find('.element-button');
        if (!elementButtonDOM.hasClass('shadow')) {
            elementButtonDOM.addClass('shadow');
        }

        elementDOM.css({
            'left': `${event.clientX - 36}px`,
            'top': `${event.clientY - 36}px`,
        });
    }

    showGhostElement(elementId, position) {
        audioManager.playError();
        const auxElement = Element.fromId(elementId);
        const auxElementTemplate = auxElement.createElementDOM({
            onBoard: true,
            posX: position.posX,
            posY: position.posY - 50,
            ghost: true,
        });
        $('board').append(auxElementTemplate);
        const auxElementDOM = GameElements.getDOM(auxElement.uuid);
        auxElementDOM.animate({
            top: "-=100px",
            opacity: "-=0.8",
        }, 2000, function () {
            $(this).remove();
        });
    }

    setTransferData({ event, elementId, from }) {
        event.originalEvent.dataTransfer.setData(from === 'sidebar' ? 'data' : 'id', elementId);
        event.originalEvent.dataTransfer.setData("from", from);
    }

    getTransferData(e) {
        const from = e.originalEvent.dataTransfer.getData("from");
        const id = e.originalEvent.dataTransfer.getData(from === 'sidebar' ? 'data' : 'id');
        const to = String(e.currentTarget.tagName).toLowerCase();
        const toId = e.currentTarget.getAttribute('id');

        return {
            from: {
                type: from,
                id: id,
            },
            to: {
                type: to,
                id: toId,
            },
        }
    }

    bindSidebarElement(elementDOM) {
        const gameManager = this;
        const id = elementDOM.parent().attr('data');

        elementDOM.on('dragstart', function (e) {
            elementDOM.removeClass('shadow');
            gameManager.dragStart({
                event: e,
                elementId: id,
                from: 'sidebar'
            });
        }).on('mouseenter', function () {
            audioManager.playMouseHover();
        }).on('mousedown', function (e) {
            if (e.which === 1) {
                audioManager.playClick();
            } else if (e.which === 2) {
                e.preventDefault();
                gameManager.bindMiddleClick(elementDOM.parent());
            }
        }).on('contextmenu', function (e) {
            e.preventDefault();
        }).on('dblclick', function () {
            const element = Element.fromId(id);
            gameManager.bindBoardElementFromDragAndDrop(element, { onBoard: false, shortcut: true });
            gameManager.saveGame();
        });
    }

    bindSidebarElementFromDragAndDrop(element) {
        const categoryDOM = $(`#category-${element.category}`);
        const elementDOM = categoryDOM.find('.category-content').find(`[data=${element.id}`).children().first();

        this.bindSidebarElement(elementDOM);
    }

    bindBoardElement(elementDOM) {
        const gameManager = this;
        const elementButtonDOM = elementDOM.find('.element-button');
        const elementId = elementDOM.attr('data');
        const uuid = elementDOM.attr('id');

        elementDOM.on('dragstart', function (e) {
            elementButtonDOM.removeClass('shadow');
            gameManager.dragStart({
                event: e,
                elementId: uuid,
                from: 'element'
            });
        }).on('drop', function (e) {
            gameManager.bindBoard(false);
            gameManager.dropOnElement(e);
        }).on('dragover', function (e) {
            gameManager.drag(e);
        }).on('dragenter', function (e) {
            gameManager.drag(e);
        }).on('dblclick', function (e) {
            const copyElement = Element.fromId(elementId);
            gameManager.bindBoardElementFromDragAndDrop(copyElement, { posX: elementDOM.position().left + 60, posY: elementDOM.position().top - 20 });
        }).on('mouseenter', function () {
            audioManager.playMouseHover();
        }).on('mousedown', function (e) {
            if (e.which === 1) {
                audioManager.playClick();
            } else if (e.which === 2) {
                e.preventDefault();
                gameManager.bindMiddleClick(elementDOM);
            }
        }).on('contextmenu', function (e) {
            audioManager.playMiss();
            $(this).remove();
            gameManager.saveGame();
            e.preventDefault();

        });
    }

    bindMiddleClick(elementDOM) {
        const elementButtonDOM = elementDOM.find('.element-button');
        const elementId = elementDOM.attr('data');
        const attrCombination = elementButtonDOM.attr('combination');

        if (attrCombination) {
            const combination = String(attrCombination).split(";");

            if (combination) {
                const result = GameElements.getById(elementId);
                const element1 = GameElements.getById(combination[0]);
                const element2 = GameElements.getById(combination[1]);

                GameLog.write(GameElements.getCombinationText(result, element1, element2));
            }
        }
    }

    bindBoardElementFromDragAndDrop(element, { onBoard = true, posX = null, posY = null, shortcut = false, combination } = {}) {
        const board = $('board');
        const elementTemplate = element.createElementDOM({
            onBoard: onBoard,
            posX: posX,
            posY: posY,
            shortcut: shortcut,
            combination: combination,
        });
        board.append(elementTemplate);
        const elementDOM = GameElements.getDOM(element.uuid);
        this.bindBoardElement(elementDOM);
    }

    bindBoard(allowDrop) {
        const board = $('board');
        const gameManager = this;

        if (allowDrop) {
            board.on('drop', function (e) {
                gameManager.dropOnBoard(e);
            });
        } else {
            board.unbind('drop');
        }
    }

    bindInputSearch() {
        $('#search-element').bind('input', function () {
            const inputText = $(this).val().toLowerCase();
            const newLineInputText = inputText.replace(' ', "<br>").toLowerCase();

            $('.category-content').each(function () {
                const categoryContent = $(this);

                categoryContent.find('.element-button').each(function () {
                    const parent = $(this).parent();
                    const category = parent.parent().parent();
                    const elementName = $(this).find('span').html().toLowerCase();

                    if (!elementName.includes(inputText) && !elementName.includes(newLineInputText)) {
                        parent.addClass('hidden');
                    } else {
                        const categoryDOM = categoryContent.parent();
                        if (!categoryDOM.hasClass('open')) {
                            categoryDOM.find('.category-header').click();
                        }
                        parent.removeClass('hidden');
                    }

                    if (categoryContent.children().length == categoryContent.children('.hidden').length) {
                        category.addClass('hidden');
                    } else {
                        category.removeClass('hidden');
                    }
                });
            });
        });

    }

    initialBind() {
        const gameManager = this;
        const board = $('board');
        const boardElements = board.find('element');
        const sidebarElements = $('#sidebar-elements').find('.element-button');

        // BOARD
        boardElements.each(function () {
            gameManager.bindBoardElement($(this));
        });
        // SIDEBAR
        sidebarElements.each(function () {
            gameManager.bindSidebarElement($(this));
        });

        board.on('drop', function (e) {
            gameManager.dropOnBoard(e);
        }).on('dragover', function (e) {
            gameManager.drag(e);
        });
    }
}

export default GameManager;