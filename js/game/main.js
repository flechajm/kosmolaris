import GameManager from './core/game_manager.js';
import GameInfo from "./core/game_info.js";
import GameElements from "./core/game_elements.js";
import GameLog from './core/game_log.js';
import GameCategories from './core/game_categories.js';
import GameTooltips from './core/game_tooltips.js';
import GameCombinationManager from './core/game_combination_manager.js';
import GameStateManager from './core/game_state_manager.js';
import GameConfig from './core/game_config.js';

import ImageLoader from '../libs/image_loader.js';
import LanguageManager from "../libs/language_manager.js";
import AudioManager from '../libs/audio_manager.js';

var gameManager;
var audioManager;
let gameConfig;

(async () => {
    gameConfig = GameConfig.load();

    gameManager = GameStateManager.load() ?? new GameManager({ config: gameConfig });
    audioManager = new AudioManager();

    await LanguageManager.setLanguage(gameConfig.lang);
    const langData = await LanguageManager.getData();
    const imageLoader = new ImageLoader();
    const loader = $('#loader');

    loader.find('span').html(langData.common.loading);
    setInterval(() => {
        loader.find('span').fadeToggle(1500);
    }, 1500);

    await GameCombinationManager.init({
        elementsUnlocked: gameManager.elementsUnlocked,
        specialElementsUnlocked: gameManager.specialElementsUnlocked
    });
    await imageLoader.loadAll().then(() => {
        initialConfig(langData);

        loader.fadeOut(300, function () {
            loader.remove();
        });
    });
})();

function welcome(langData) {
    const gameName = `<span style='color: var(--color-tooltip-description);'><b>${GameInfo.title}</b></span>`;
    const options = { year: "numeric", month: "long", day: "numeric" };
    const lastUpdate = `${langData.console.lastUpdate} ${GameInfo.lastUpdate.toLocaleString(gameConfig.lang, options)}`;

    GameLog.write(langData.console.welcome.replace('{game}', gameName));
    GameLog.newLine(1);
    GameLog.write(
        `${langData.console.version} ${GameInfo.version} | ${lastUpdate}`, "grey");
    GameLog.write(GameInfo.getBriefText(gameConfig.lang), "lightslategrey");
    GameLog.newLine(1);
}

function setBackground() {
    let number = randomBetween(1, 17);
    $(".background").css("background-image", "url('img/bg/bg" + number + ".jpg')");
}

function setTooltips(langData) {
    GameTooltips.bind({ element: $('#btn-clear'), text: langData.tooltips.clear });
    GameTooltips.bind({ element: $('#btn-settings'), text: langData.tooltips.settings });
    GameTooltips.bind({ element: $('#btn-help'), text: langData.tooltips.help });
    GameTooltips.bind({ element: $('#btn-wipe'), text: langData.tooltips.wipeData });
}

function setupButtons(langData) {
    $('#btn-clear').click(function () {
        const boardElements = $('board').children();

        if (boardElements.length > 0) {
            audioManager.playMiss();
            boardElements.each(function (index) {
                $(this).fadeOut('fast', function () {
                    $(this).remove();
                });
            });
        }
    });

    $('#btn-settings').click(function () {
        $('#help').hide();
        $('#settings').fadeIn();
    });

    $('#btn-help').click(function () {
        $('#settings').hide();
        $('#help').fadeIn();
    });

    $('#btn-wipe').click(function () {
        if (confirm(langData.settings.promptWipe) == true) {
            localStorage.removeItem(GameInfo.storageName);
            location.reload();
        }
    });

    $('#volume-sfx').bind("input", function (e) {
        updateVolumeText('sfx', e.currentTarget.value);
    });

    $('#volume-bgm').bind("input", function (e) {
        updateVolumeText('bgm', e.currentTarget.value);
    });

    $('#btn-ok').click(function () {
        $('#help').fadeOut();
    });

    $('#btn-apply').click(function () {
        const actualLang = gameManager.config.lang;

        gameConfig.lang = $('#select-lang').val();
        gameConfig.bgmVolume = $('#volume-bgm').val();
        gameConfig.sfxVolume = $('#volume-sfx').val();
        gameConfig.saveDate = gameManager.config.saveDate;

        gameManager.config = gameConfig;
        gameManager.saveGame();
        gameConfig.save();

        $('#volume-control').val(gameConfig.bgmVolume);
        audioManager.setBGMVolume(gameConfig.bgmVolume);
        audioManager.setSFXVolume(gameConfig.sfxVolume);

        if (actualLang != gameConfig.lang) {
            location.reload();
        }
        $('#settings').fadeOut();
    });

    $('.close-x').click(function () {
        $(this).parent().parent().fadeOut();
    });

    $("#volume-control").bind("input", function (e) {
        gameConfig.bgmVolume = e.currentTarget.value;

        audioManager.setBGMVolume(gameConfig.bgmVolume);
        $('#volume-bgm').val(gameConfig.bgmVolume);
        updateVolumeText('bgm', gameConfig.bgmVolume);
        gameConfig.save();
    });
}

function updateVolumeText(type, volume) {
    $(`#option-${type}`).find('.slide-volume-container > span:last').html(volume);
}

function setupSettings(langData) {
    $('#search-element').attr('placeholder', langData.common.searchElement);

    $('#select-lang').val(gameConfig.lang);
    $('#volume-bgm').val(gameConfig.bgmVolume);
    $('#volume-sfx').val(gameConfig.sfxVolume);
    $('#volume-control').val(gameConfig.bgmVolume);

    updateVolumeText('bgm', gameConfig.bgmVolume);
    updateVolumeText('sfx', gameConfig.sfxVolume);

    $('#settings > .popup > .container > .title').html(langData.settings.title);
    $('#option-lang > div > .text').html(langData.settings.language);
    $('#option-sfx > div > .text').html(langData.settings.sfx);
    $('#option-bgm > div > .text').html(langData.settings.bgm);
    $('#option-wipe > div > .text').html(langData.settings.resetGame);
    $('#btn-wipe > span').html(langData.settings.wipeData);
    $('#btn-apply > span').html(langData.settings.close);
}

function setupHelp(langData) {
    $('#btn-ok').html(langData.help.close);
    $('#help > .popup > .container > .title').html(langData.help.title);

    const helpTemplate = `{welcome}
                            <br /><br />
                            {description}
                            <ul>
                                <li>{commonDescription}</li>
                                <li>{specialDescription}</li>
                            </ul>
                            <br />
                            <div class="horizontal-band"></div>
                            <br />
                            <br />
                            {guideTitle}
                            <br />
                            <br />
                            <ul>
                                {list}
                            </ul>                            
                            {footer}`;


    const spanColorText = "<span style='color: {color}'>{text}</span>";

    const game = spanColorText.replace('{color}', 'var(--color-tooltip-description)').replace('{text}', GameInfo.title);
    const air = spanColorText.replace('{color}', 'var(--e-color-air)').replace('{text}', langData.help.elements[0]);
    const fire = spanColorText.replace('{color}', 'var(--e-color-fire)').replace('{text}', langData.help.elements[1]);
    const earth = spanColorText.replace('{color}', 'var(--e-color-earth)').replace('{text}', langData.help.elements[2]);
    const water = spanColorText.replace('{color}', 'var(--e-color-water)').replace('{text}', langData.help.elements[3]);

    const welcomeDescription = langData.help.welcome
        .replace("{game}", game)
        .replace('{air}', air)
        .replace('{fire}', fire)
        .replace('{earth}', earth)
        .replace('{water}', water);

    const commonCapital = spanColorText
        .replace('{color}', 'var(--color-common)')
        .replace('{text}', langData.help.elementTypes.types[0]);
    const specialCapital = spanColorText
        .replace('{color}', 'var(--color-special)')
        .replace('{text}', langData.help.elementTypes.types[1]);
    const commonLowerCase = spanColorText
        .replace('{color}', 'var(--color-common)')
        .replace('{text}', langData.help.elementTypes.types[0].toLowerCase());
    const specialLowerCase = spanColorText
        .replace('{color}', 'var(--color-special)')
        .replace('{text}', langData.help.elementTypes.types[1].toLowerCase());


    const elementTypesDescription = langData.help.elementTypes.description
        .replace('{common}', commonLowerCase)
        .replace('{special}', specialLowerCase);

    const commonDescription = langData.help.elementTypes.commonElementDesc.replace('{common}', commonCapital);
    const specialDescription = langData.help.elementTypes.specialElementDesc.replace('{special}', specialCapital);

    const templateLi = `<li>
                            <div>{text}</div>
                            <img src="img/gif/{image}.gif" alt="" />
                        </li>`;

    const templateLiDv = `<li>
                            <div>{text}</div>
                            <br />
                        </li>`;

    const dragAndDropHighlight = spanColorText
        .replace('{color}', 'var(--color-tooltip-description)')
        .replace('{text}', langData.help.guide.highlights.dragAndDrop);

    const doubleClickHighlight = spanColorText
        .replace('{color}', 'var(--color-tooltip-description)')
        .replace('{text}', langData.help.guide.highlights.doubleClick);

    const copyHighlight = spanColorText
        .replace('{color}', 'var(--color-common)')
        .replace('{text}', langData.help.guide.highlights.copy);

    const rightClickHighlight = spanColorText
        .replace('{color}', 'var(--color-tooltip-description)')
        .replace('{text}', langData.help.guide.highlights.rightClick);

    const deleteHighlight = spanColorText
        .replace('{color}', 'var(--color-negative)')
        .replace('{text}', langData.help.guide.highlights.delete);

    const twoElementsHighlight = spanColorText
        .replace('{color}', 'var(--color-tooltip-description)')
        .replace('{text}', langData.help.guide.highlights.twoElements);

    const dragHighlight = spanColorText
        .replace('{color}', 'var(--color-common)')
        .replace('{text}', langData.help.guide.highlights.drag);

    const dropHighlight = spanColorText
        .replace('{color}', 'var(--color-common)')
        .replace('{text}', langData.help.guide.highlights.drop);

    const tipOne = templateLi
        .replace('{text}', langData.help.guide.list[0].text.replace('{dragAndDrop}', dragAndDropHighlight))
        .replace('{image}', langData.help.guide.list[0].gif);

    const tipTwo = templateLi
        .replace('{text}', langData.help.guide.list[1].text
            .replaceAll('{doubleClick}', doubleClickHighlight)
            .replace('{copy}', copyHighlight))
        .replace('{image}', langData.help.guide.list[1].gif);

    const tipThree = templateLi
        .replace('{text}', langData.help.guide.list[2].text
            .replace('{rightClick}', rightClickHighlight)
            .replace('{delete}', deleteHighlight))
        .replace('{image}', langData.help.guide.list[2].gif);

    const tipFour = templateLi
        .replace('{text}', langData.help.guide.list[3].text
            .replace('{twoElements}', twoElementsHighlight)
            .replace('{drag}', dragHighlight)
            .replace('{drop}', dropHighlight))
        .replace('{image}', langData.help.guide.list[3].gif);

    const tipFive = templateLiDv
        .replace('{text}', langData.help.guide.list[4].text);


    $('#welcome').html(helpTemplate
        .replace('{welcome}', welcomeDescription)
        .replace('{description}', elementTypesDescription)
        .replace('{commonDescription}', commonDescription)
        .replace('{specialDescription}', specialDescription)
        .replace('{guideTitle}', langData.help.guide.title)
        .replace('{list}', tipOne + tipTwo + tipThree + tipFour + tipFive)
        .replace('{footer}', langData.help.footer)
    );
}

function initialConfig(langData) {
    const minutesIntervalBackground = (4 * 60) * 1000;

    setTooltips(langData);
    setupHelp(langData);
    setupSettings(langData);
    setupButtons(langData);
    welcome(langData);
    setBackground();
    setInterval(() => {
        setBackground();
    }, minutesIntervalBackground);

    audioManager.init({
        bgmVolume: gameConfig.bgmVolume,
        sfxVolume: gameConfig.sfxVolume
    });
    GameElements.create();
    GameCategories.create();

    gameManager.init();

    if (gameConfig.showWelcome) {
        gameConfig.showWelcome = false;
        gameConfig.save();

        $('#help').fadeIn();
    }
}

export { gameManager, audioManager, GameStateManager };