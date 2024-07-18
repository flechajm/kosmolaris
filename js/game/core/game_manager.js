import Element from "./classes/element.js";

import GameAchievements from "./game_achievements.js";
import GameCategories from "./game_categories.js";
import GameCombinationManager from "./game_combination_manager.js";
import GameConfig from "./game_config.js";
import GameElements from "./game_elements.js";
import GameStateManager from "./game_state_manager.js";

import LanguageManager from "../../libs/language_manager.js";
import { audioManager, gameManager } from "../main.js";
import GameLog from "./game_log.js";

class GameManager {
    #dragData;

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

        this.#fixDuplicatedElements();
        this.#loadBoard();
        this.#loadCategories();
        this.#loadAchievements();
        this.#bindInputSearch();
        this.#initialBind();
        this.#updateCurrentDiscoveredElements();

        if (this.config.debugMode)
            this.#debugElementSelector();
    }

    #fixDuplicatedElements() {
        GameCombinationManager.fixDuplicatedElements();

        this.elementsUnlocked = GameCombinationManager.getElementsUnlocked();
        this.specialElementsUnlocked = GameCombinationManager.getSpecialElementsUnlocked();
    }

    #debugElementSelector() {
        const gameManager = this;
        const elements = GameElements.getAll();
        const debugTemplate = `<div id="debug">
                                    <div id="btn-unlockall" class="button green achievements"></div>
                                    <select id="element-selector"></select>
                                </div>`;
        $('.board-container').prepend(debugTemplate);

        elements.sort((a, b) => a.name.localeCompare(b.name));

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            $('#element-selector').append(`<option value="${element.id}">${element.name} (${element.id})</option>`);
        }

        $('#element-selector').on('change', function (e) {
            const id = e.target.options[e.target.selectedIndex].value;
            const element = Element.fromId(id);

            gameManager.appendElementToBoard(element, { onBoard: false, shortcut: true });
            gameManager.saveGame();
            e.target.selectedIndex = -1;
        });

        $('#btn-unlockall').click(function () {
            gameManager.unlockAll();
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

                contentDOM.append(achievement.getDOM({ expand: true, showDisclaimer: true }));
            }
        }
    }

    #saveBoardData() {
        const auxBoard = $('board').clone(true);
        auxBoard.find('.ghost').remove();

        this.board = auxBoard.html();
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

        for (let i = 0; i < this.specialElementsUnlocked.length; i++) {
            const elementUnlocked = this.specialElementsUnlocked[i];

            const elementId = elementUnlocked.result;
            const combination = {
                element1: elementUnlocked.element1,
                element2: elementUnlocked.element2,
            }

            GameCategories.addElementToCategory(elementId, { combination });
        }
    }

    #bindInputSearch() {
        const gameManager = this;

        $('#search-element').bind('input', function () {
            const inputText = $(this).val().toLowerCase();
            const newLineInputText = gameManager.#replaceSpecialCharacters(inputText.replace(' ', "<br>").toLowerCase());

            $('.category-content').each(function () {
                const categoryContent = $(this);

                categoryContent.find('.element-button').each(function () {
                    const parent = $(this).parent();
                    const category = parent.parent().parent();
                    const elementName = gameManager.#replaceSpecialCharacters($(this).find('span').html().toLowerCase());

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

    #replaceSpecialCharacters(text) {
        return text.normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
            .normalize();
    }

    #bindBoard() {
        $('board').droppable({
            accept: "element",
            tolerance: "pointer",
            refreshPositions: true,
            drop: function (e, ui) {
                const elementDraggable = $(ui.draggable);

                if (gameManager.#dragData.from === 'sidebar') {
                    const elementId = elementDraggable.attr('data');

                    if (!elementDraggable.hasClass('on-board')) {
                        const newElement = Element.fromId(elementId);
                        // const newElementTemplate = newElement.createElementDOM({ onBoard: true, posX: ui.position.left, posY: ui.position.top, });

                        // $('board').append(newElementTemplate);
                        // gameManager.bindBoardElement($(`#${newElement.uuid}`));

                        const combination = gameManager.getCombinationAttribute(elementDraggable.find('.element-button'));
                        gameManager.appendElementToBoard(newElement, {
                            onBoard: true,
                            posX: ui.position.left,
                            posY: ui.position.top,
                            combination: combination,
                        });
                    }
                } else {
                    if (elementDraggable.hasClass('shortcut')) {
                        elementDraggable.removeClass('shortcut').addClass('on-board');
                        elementDraggable.css({
                            'position': '',
                            'left': ui.offset.left,
                            'top': ui.offset.top,
                        });
                    }
                }

                elementDraggable.css({
                    'z-index': '',
                    'transform': '',
                    'opacity': '',
                });

                gameManager.saveGame();
            }
        });
    }

    #updateCurrentDiscoveredElements() {
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

    saveGame() {
        this.#saveBoardData();
        GameStateManager.save();
    }

    dropElement({ elementFromDOM, elementToDOM, }) {
        const element1 = GameElements.getById(elementFromDOM[0].getAttribute('data'));
        const element2 = GameElements.getById(elementToDOM[0].getAttribute('data'));

        const elementResult = GameCombinationManager.findCombination({
            element1: element1,
            element2: element2,
        });

        if (elementResult != null) {
            const exists = GameCombinationManager.checkExists(elementResult);

            elementResult.uuid = Element.generateUUID();
            const position = {
                posX: elementToDOM.position().left,
                posY: elementToDOM.position().top,
            }

            if (!exists) {
                this.unlockElement(elementResult, element1, element2);
                if (this.#dragData.from === 'element') {
                    elementToDOM.remove();
                    elementFromDOM.remove();
                } else if (this.#dragData.from === 'sidebar') {
                    elementToDOM.remove();
                }

                const combination = {
                    element1: element1.id,
                    element2: element2.id
                }
                GameCategories.addElementToCategory(elementResult.id, { combination: combination });

                this.appendElementToSidebar(elementResult);
                this.appendElementToBoard(elementResult, {
                    posX: position.posX,
                    posY: position.posY,
                    combination: combination
                });

                this.saveGame();
            } else {
                this.showGhostElement(elementResult, position);
                this.revertElementPosition(elementFromDOM);
            }
        } else {
            audioManager.playMiss();
            this.revertElementPosition(elementFromDOM);
        }
    }

    revertElementPosition(elementDOM) {
        const gameManager = this;

        if (this.#dragData.from === 'element') {
            elementDOM.animate({
                left: gameManager.#dragData.originalPosition.left,
                top: gameManager.#dragData.originalPosition.top,
            }, 200);
        }
    }

    // unlockOneByOne(element1, element2) {
    //     const elementResult = GameCombinationManager.findCombination({
    //         element1: element1,
    //         element2: element2,
    //     });

    //     if (elementResult != null && !GameCombinationManager.checkExists(elementResult.result)) {
    //         this.unlockElement(elementResult, element1, element2);
    //         GameCategories.addElementToCategory(elementResult.id, { combination: combination });
    //     }
    // }

    unlockAll() {
        const combinations = GameCombinationManager.getAllCombinations();
        console.log(combinations.length);
        for (let i = 0; i < combinations.length; i++) {
            const combination = combinations[i];

            if (!GameCombinationManager.checkExists(combination.result)) {
                this.unlockElement(combination.result, combination.element1, combination.element2);
                GameCategories.addElementToCategory(combination.result.id, { combination: combination });
            }
        }
    }

    unlockElement(newElement, element1, element2) {
        audioManager.playPlop();
        GameCombinationManager.unlockElement(newElement, element1, element2);

        const achievementByCount = this.achievements.getByReachDiscoveredElements(this.elementsUnlocked.length);

        if (achievementByCount)
            this.achievements.unlock(achievementByCount.id);

        this.achievements.tryUnlockAchievement([...this.elementsUnlocked, ...this.specialElementsUnlocked]);

        this.#loadAchievements();
        this.#updateCurrentDiscoveredElements();
        this.#showPopupDiscoveredElement(newElement);

    }

    #showPopupDiscoveredElement(element) {
        const popupDiscoveredElementDOM = $('#popup-discovered-element');
        const discoveredElementDOM = popupDiscoveredElementDOM.find('div.discovered-element');
        const lightDOM = popupDiscoveredElementDOM.find('div.light');
        const nameDOM = discoveredElementDOM.find('div');

        discoveredElementDOM.find('img').attr('src', `../img/elements/${element.id}.png`);
        nameDOM.html(element.name);

        if (element.isSpecial) {
            nameDOM.removeClass('common').addClass('special');
            lightDOM.removeClass('common').addClass('special');
        } else {
            nameDOM.removeClass('special').addClass('common');
            lightDOM.removeClass('special').addClass('common');
        }

        popupDiscoveredElementDOM.show();
        discoveredElementDOM.find('img').animate({
            height: '200px',
            width: '200px',
        }, 1000, 'easeOutElastic');
        audioManager.playUnlock();
    }

    showGhostElement(element, position) {
        audioManager.playError();

        const auxElement = Element.fromId(element.id);
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

    getCombinationAttribute(elementDOM) {
        const attrCombination = elementDOM.attr('combination');
        let combination = '';

        if (typeof attrCombination !== 'undefined' && attrCombination !== false) {
            const combinationIds = attrCombination.split(";");

            combination = {
                element1: combinationIds[0],
                element2: combinationIds[1],
            }
        }

        return combination;
    }

    bindBoardElement(elementDOM) {
        const gameManager = this;

        elementDOM.droppable({
            refreshPositions: true,
            greedy: true,
            drop: function (event, ui) {
                const elementDroppable = $(this);
                const elementDraggable = $(ui.draggable);

                elementDroppable.find('div.element-image').removeClass('glow');
                elementDraggable.css('opacity', 1);

                gameManager.dropElement({
                    elementFromDOM: elementDraggable,
                    elementToDOM: elementDroppable,
                });
            },
            over: gameManager.alternateGlow,
            out: gameManager.alternateGlow,
        }).draggable({
            zIndex: 2,
            opacity: 0.8,
            revert: 'invalid',
            refreshPositions: true,
            revertDuration: 200,
            start: function (e, ui) {
                $(this).css('transform', 'scale(1)');

                gameManager.#dragData = {
                    from: 'element',
                    originalPosition: ui.originalPosition,
                };
            },
            stop: function () {
                gameManager.resetZIndex($(this));
                gameManager.saveGame();
            },
        });

        this.bindDefault({
            elementDOM: elementDOM,
            isSidebarElement: false,
        });
    }

    bindSidebarElement(elementDOM) {
        const gameManager = this;

        elementDOM.draggable({
            zIndex: 1,
            opacity: 0.8,
            helper: 'clone',
            appendTo: '#game',
            refreshPositions: true,
            tolerance: 'pointer',
            revert: false,
            start: function (e, ui) {
                const elementClone = $(ui.helper);
                elementClone.css('transform', 'scale(1)');
                gameManager.#dragData = { from: 'sidebar' };
            },
            stop: function () {
                $(this).removeClass('ui-draggable-dragging');
            }
        });

        this.bindDefault({
            elementDOM: elementDOM,
            isSidebarElement: true,
        });
    }

    bindDefault({ elementDOM, isSidebarElement }) {
        const gameManager = this;
        const elementId = elementDOM.attr('data');
        const elementButtonDOM = elementDOM.find('.element-button');
        const combination = this.getCombinationAttribute(elementButtonDOM);

        elementDOM.on('dblclick', function (e) {
            const copyElement = Element.fromId(elementId);
            elementDOM.css('z-index', '');

            if (isSidebarElement) {
                gameManager.appendElementToBoard(copyElement, {
                    onBoard: false,
                    shortcut: true,
                    combination: combination,
                });
            } else {
                gameManager.appendElementToBoard(copyElement, {
                    posX: elementDOM.position().left + 60,
                    posY: elementDOM.position().top - 20,
                    combination: combination,
                });
            }
            gameManager.saveGame();
        }).on('mousedown', function (e) {
            if (e.which === 1) {
                $(this).addClass('ui-draggable-dragging');
                audioManager.playClick();
            }
        }).on('mouseup', function (e) {
            if (e.which === 2) {
                e.preventDefault();
                gameManager.bindMiddleClick({
                    elementId: elementId,
                    combination: combination,
                });
            } else if (e.which === 1) {
                $(this).removeClass('ui-draggable-dragging');
            }
        }).on('contextmenu', function (e) {
            if (!isSidebarElement) {
                audioManager.playMiss();
                $(this).remove();
                gameManager.saveGame();
            }

            e.preventDefault();
        });
    }

    alternateGlow() {
        const elementDOM = $(this).find('div.element-image');
        const classGlow = 'glow';

        if (elementDOM.hasClass(classGlow)) {
            elementDOM.removeClass(classGlow);
        } else {
            elementDOM.addClass(classGlow);
        }
    }

    resetZIndex(elementDOM) {
        const exceptionId = elementDOM.attr('id');
        const elements = $('board').children();

        for (let i = 0; i < elements.length; i++) {
            const element = $(elements[i]);
            const id = element.attr('id');

            element.css({
                'z-index': id == exceptionId ? '1' : '0',
                'transform': ''
            });
        }
    }

    bindMiddleClick({ elementId, combination }) {
        if (combination) {
            const result = GameElements.getById(elementId);
            const element1 = GameElements.getById(combination.element1);
            const element2 = GameElements.getById(combination.element2);

            GameLog.write(GameElements.getCombinationText(result, element1, element2));
        }
    }

    appendElementToSidebar(element) {
        const categoryDOM = $(`#category-${element.category}`);
        const elementDOM = categoryDOM.find('.category-content').find(`[data=${element.id}`);

        this.bindSidebarElement(elementDOM);
    }

    appendElementToBoard(element, { onBoard = true, posX = null, posY = null, shortcut = false, combination } = {}) {
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

    #initialBind() {
        const gameManager = this;
        const board = $('board');
        const boardElements = board.find('element');
        const sidebarElements = $('#sidebar-elements').find('element');

        // BOARD
        boardElements.each(function () {
            gameManager.bindBoardElement($(this));
        });
        // SIDEBAR
        sidebarElements.each(function () {
            gameManager.bindSidebarElement($(this));
        });

        this.#bindBoard();
    }
}

export default GameManager;