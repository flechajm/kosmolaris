import GameCategories from './core/game_categories.js';
import GameCombinationManager from './core/game_combination_manager.js';
import GameConfig from './core/game_config.js';
import GameElements from "./core/game_elements.js";
import GameInfo from "./core/game_info.js";
import GameLog from './core/game_log.js';
import GameStateManager from './core/game_state_manager.js';
import GameTooltips from './core/game_tooltips.js';

import AudioManager from '../libs/audio_manager.js';
import ImageLoader from '../libs/image_loader.js';
import LanguageManager from "../libs/language_manager.js";

var gameManager;
var audioManager;
let gameConfig;
let imageLoader;

(async () => {
    gameConfig = GameConfig.load();

    gameManager = GameStateManager.load(gameConfig);
    audioManager = new AudioManager();

    await LanguageManager.setLanguage(gameConfig.lang);
    const langData = LanguageManager.getData();

    imageLoader = new ImageLoader();
    const loader = $('#loader');

    loader.find('span').html(langData.common.loading.replace('{percent}', 0));
    setInterval(() => {
        loader.find('span').fadeToggle(1500);
    }, 1500);

    await imageLoader.loadAll().then(async () => {
        await initialConfig(langData);

        loader.fadeOut(300, function () {
            loader.remove();
        });
    });
})();

function welcome(langData) {
    const gameName = `<span style='color: var(--color-green-light);'><b>${GameInfo.title}</b></span>`;
    const options = { year: "numeric", month: "long", day: "numeric" };
    const versionData = GameInfo.getCurrentVersion();
    const version = langData.console.version
        .replace('{version}', versionData.version)
        .replace('{date}', versionData.date.toLocaleString(gameConfig.lang, options))


    GameLog.write({ html: langData.console.welcome.replace('{game}', gameName), fontSize: 'larger' });
    GameLog.newLine(1);
    GameLog.write({ html: `<span id="show-changelog">${version}</span>`, color: "grey" });
    GameLog.newLine(1);
}

function setBackground() {
    let number = randomBetween(1, 17);
    let src = imageLoader.getPreloadedBackgrounds()[number - 1].src;

    $(".background").css("background-image", `url(${src})`);
}

function setTooltips(langData) {
    GameTooltips.bind({ element: $('#btn-clear'), text: langData.tooltips.clear });
    GameTooltips.bind({ element: $('#btn-settings'), text: langData.tooltips.settings });
    GameTooltips.bind({ element: $('#btn-achievements'), text: langData.tooltips.achievements });
    GameTooltips.bind({ element: $('#btn-help'), text: langData.tooltips.help });
    GameTooltips.bind({ element: $('#btn-changelog'), text: langData.tooltips.changelog });
    GameTooltips.bind({ element: $('#btn-credits'), text: langData.tooltips.credits });
    GameTooltips.bind({ element: $('#btn-wipe'), text: langData.tooltips.wipeData });
    GameTooltips.bind({ element: $('#quit'), text: langData.tooltips.closeGame });
}

function setupButtons(langData) {
    const windowSettingsDOM = $('#window-settings');
    const windowAchievementsDOM = $('#window-achievements');
    const windowHelpDOM = $('#window-help');
    const windowChangelogDOM = $('#window-changelog');
    const windowCreditsDOM = $('#window-credits');
    const popupDiscoveredElementDOM = $('#popup-discovered-element');

    $('.button').on('mouseenter', function () {
        audioManager.playMouseHover();
    }).on('mouseup', function () {
        audioManager.playClick();
    });

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
        windowAchievementsDOM.hide();
        windowHelpDOM.hide();
        windowChangelogDOM.hide();
        windowCreditsDOM.hide();

        windowSettingsDOM.fadeIn();
    });

    $('#btn-achievements').click(function () {
        windowSettingsDOM.hide();
        windowHelpDOM.hide();
        windowChangelogDOM.hide();
        windowCreditsDOM.hide();

        windowAchievementsDOM.fadeIn();
    });

    $('#btn-credits').click(function () {
        windowAchievementsDOM.hide();
        windowSettingsDOM.hide();
        windowHelpDOM.hide();
        windowChangelogDOM.hide();

        windowCreditsDOM.fadeIn();
        windowCreditsDOM.find('.content').scrollTop(0);
    });

    $('#btn-help').click(function () {
        windowAchievementsDOM.hide();
        windowSettingsDOM.hide();
        windowChangelogDOM.hide();
        windowCreditsDOM.hide();

        windowHelpDOM.fadeIn();
        windowHelpDOM.find('.content').scrollTop(0);

    });

    $('#show-changelog, #btn-changelog').click(function () {
        windowAchievementsDOM.hide();
        windowSettingsDOM.hide();
        windowHelpDOM.hide();
        windowCreditsDOM.hide();

        windowChangelogDOM.fadeIn();
    });

    $('#btn-wipe').click(function () {
        if (confirm(langData.windows.settings.promptWipe) == true) {
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

    $('#btn-apply').unbind('click').click(function () {
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
        windowSettingsDOM.fadeOut();
    });

    $('.button.ok').click(function () {
        $(this).parent().parent().parent().fadeOut();
    });

    $('.close-x').click(function () {
        $(this).parent().parent().fadeOut();
    }).on('mouseup', function () {
        audioManager.playClick();
    });

    $('#quit').unbind().click(function () {
        window.close();
    }).on('mouseup', function () {
        audioManager.playClick();
    });

    $("#volume-control").bind("input", function (e) {
        gameConfig.bgmVolume = e.currentTarget.value;

        audioManager.setBGMVolume(gameConfig.bgmVolume);
        $('#volume-bgm').val(gameConfig.bgmVolume);
        updateVolumeText('bgm', gameConfig.bgmVolume);
        gameConfig.save();
    });


    function hidePopupDiscoveredElement() {
        const iconDOM = popupDiscoveredElementDOM.find('img');
        popupDiscoveredElementDOM.find('.discovered-element').fadeOut({
            'start': function () {
                $(this).css('transform', 'scale(0)');
                popupDiscoveredElementDOM.fadeOut(200);
            },
            'duration': 200,
            'complete': function () {
                $(this).attr('style', '');
                iconDOM.css({
                    'width': 0,
                    'height': 0,
                });
            }
        });
    }

    popupDiscoveredElementDOM.find('.discovered-element').mouseenter(function () {
        popupDiscoveredElementDOM.find('.light').addClass('lightHard');
    }).mouseleave(function () {
        popupDiscoveredElementDOM.find('.light').removeClass('lightHard');
    }).click(function () {
        hidePopupDiscoveredElement();
    }).mouseup(function () {
        audioManager.playClick();
    });

    $(document).mousedown(function (e) {
        if ($(e.target).closest("#popup-discovered-element").length === 0) {
            hidePopupDiscoveredElement();
        }
    });
}

function updateVolumeText(type, volume) {
    $(`#option-${type}`).find('.slide-volume-container > span:last').html(volume);
}

function setupDonation(langData) {
    const donate = $('footer > .content > .donate');

    donate.html(`${langData.common.footer.donate}: ☕
          <a href="https://cafecito.app/kosmolaris" target="_blank">${langData.common.footer.coffee}</a>`)
}

function setupWindowSettings(langData) {
    $('#search-element').attr('placeholder', langData.common.searchElement);

    $('#select-lang').val(gameConfig.lang);
    $('#volume-bgm').val(gameConfig.bgmVolume);
    $('#volume-sfx').val(gameConfig.sfxVolume);
    $('#volume-control').val(gameConfig.bgmVolume);

    updateVolumeText('bgm', gameConfig.bgmVolume);
    updateVolumeText('sfx', gameConfig.sfxVolume);

    $('#window-settings > .popup > .container > .title').html(langData.windows.settings.title);
    $('#option-lang > div > .text').html(langData.windows.settings.language);
    $('#option-sfx > div > .text').html(langData.windows.settings.sfx);
    $('#option-bgm > div > .text').html(langData.windows.settings.bgm);
    $('#option-wipe > div > .text').html(langData.windows.settings.resetGame);
    $('#btn-wipe > span').html(langData.windows.settings.wipeData);
    $('#btn-apply > span').html(langData.windows.settings.apply);
}

function setupWindowChangelog(langData) {
    $('#window-changelog > .popup > .container > .title').html(langData.windows.changelog.title);
    $('#window-changelog .button').html(langData.windows.changelog.ok);

    $('#window-changelog .content').html(GameInfo.getChangelog(gameConfig.lang));
}

function setupWindowHelp(langData) {
    $('#window-help > .popup > .container > .title').html(langData.windows.help.title);
    $('#window-help .button').html(langData.windows.help.ok);

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

    const game = spanTextColor(GameInfo.title, "var(--color-green-light)");
    const air = spanTextColor(langData.windows.help.elements[0], 'var(--color-air)');
    const fire = spanTextColor(langData.windows.help.elements[1], 'var(--color-fire)');
    const earth = spanTextColor(langData.windows.help.elements[2], 'var(--color-earth)');
    const water = spanTextColor(langData.windows.help.elements[3], 'var(--color-water)');

    const welcomeDescription = langData.windows.help.welcome
        .replace("{game}", game)
        .replace('{air}', air)
        .replace('{fire}', fire)
        .replace('{earth}', earth)
        .replace('{water}', water);

    const commonCapital = spanTextColor(langData.windows.help.elementTypes.types[0], "var(--color-common)");
    const specialCapital = spanTextColor(langData.windows.help.elementTypes.types[1], "var(--color-special)");
    const commonLowerCase = spanTextColor(langData.windows.help.elementTypes.types[0].toLowerCase(), "var(--color-common)");
    const specialLowerCase = spanTextColor(langData.windows.help.elementTypes.types[1].toLowerCase(), "var(--color-special)");

    const elementTypesDescription = langData.windows.help.elementTypes.description
        .replace('{common}', commonLowerCase)
        .replace('{special}', specialLowerCase);

    const commonDescription = langData.windows.help.elementTypes.commonElementDesc.replace('{common}', commonCapital);
    const specialDescription = langData.windows.help.elementTypes.specialElementDesc.replace('{special}', specialCapital);

    const templateLi = `<li>
                            <div>{text}</div>
                            <img src="img/gif/{image}.gif" alt="" />
                        </li>`;

    const templateLiDv = `<li>
                            <div>{text}</div>
                            <br />
                        </li>`;

    const dragAndDropHighlight = spanTextColor(langData.windows.help.guide.highlights.dragAndDrop, "var(--color-green-light)");
    const doubleClickHighlight = spanTextColor(langData.windows.help.guide.highlights.doubleClick, "var(--color-green-light)");
    const copyHighlight = spanTextColor(langData.windows.help.guide.highlights.copy, "var(--color-common)");
    const rightClickHighlight = spanTextColor(langData.windows.help.guide.highlights.rightClick, "var(--color-green-light)");
    const deleteHighlight = spanTextColor(langData.windows.help.guide.highlights.delete, "var(--color-negative)");
    const twoElementsHighlight = spanTextColor(langData.windows.help.guide.highlights.twoElements, "var(--color-green-light)")
    const dragHighlight = spanTextColor(langData.windows.help.guide.highlights.drag, "var(--color-common)");
    const dropHighlight = spanTextColor(langData.windows.help.guide.highlights.drop, "var(--color-common)");
    const middleClickHighlight = spanTextColor(langData.windows.help.guide.highlights.middleClick, "var(--color-green-light)");

    const tipOne = templateLi
        .replace('{text}', langData.windows.help.guide.list[0].text.replace('{dragAndDrop}', dragAndDropHighlight))
        .replace('{image}', langData.windows.help.guide.list[0].gif);

    const tipTwo = templateLi
        .replace('{text}', langData.windows.help.guide.list[1].text
            .replaceAll('{doubleClick}', doubleClickHighlight)
            .replace('{copy}', copyHighlight))
        .replace('{image}', langData.windows.help.guide.list[1].gif);

    const tipThree = templateLi
        .replace('{text}', langData.windows.help.guide.list[2].text
            .replace('{rightClick}', rightClickHighlight)
            .replace('{delete}', deleteHighlight))
        .replace('{image}', langData.windows.help.guide.list[2].gif);

    const tipFour = templateLi
        .replace('{text}', langData.windows.help.guide.list[3].text
            .replace('{twoElements}', twoElementsHighlight)
            .replace('{drag}', dragHighlight)
            .replace('{drop}', dropHighlight))
        .replace('{image}', langData.windows.help.guide.list[3].gif);

    const tipFive = templateLiDv
        .replace('{text}', langData.windows.help.guide.list[4].text);

    const tipSix = templateLiDv
        .replace('{text}', langData.windows.help.guide.list[5].text
            .replace('{middleClick}', middleClickHighlight)
        );


    $('#welcome').html(helpTemplate
        .replace('{welcome}', welcomeDescription)
        .replace('{description}', elementTypesDescription)
        .replace('{commonDescription}', commonDescription)
        .replace('{specialDescription}', specialDescription)
        .replace('{guideTitle}', langData.windows.help.guide.title)
        .replace('{list}', tipOne + tipTwo + tipThree + tipFour + tipFive + tipSix)
        .replace('{footer}', langData.windows.help.footer.replace('{game}', game))
    );
}

function setupWindowCredits(langData) {
    $('#window-credits > .popup > .container > .title').html(langData.windows.credits.title);
    $('#window-credits .button').html(langData.windows.changelog.ok);

    const programming = getCreditSection(langData.windows.credits.programming);
    const art = getCreditSection(langData.windows.credits.art);
    const testers = getCreditSection(langData.windows.credits.testers);
    const bgm = getCreditSection(langData.windows.credits.bgm);
    const disclaimerTemplate = `<div class='achievement-container'><div class='disclaimer'>{disclaimer}</div></div>`;
    const footerTemplate = `<div class="made-with-love">
                                 <span>{madeWithLove}</span>
                                 <img src="img/misc/ar.png" />
                                 <span>{argentina}</span>
                            </div >`;

    const footer = footerTemplate.replace('{madeWithLove}', langData.windows.credits.footer.madeWithLove).replace('{argentina}', langData.windows.
        credits.footer.argentina);
    const disclaimer = disclaimerTemplate.replace('{disclaimer}', langData.windows.credits.disclaimer);

    $('#window-credits .content').html(`${programming}${art}${testers}${bgm}${disclaimer}`);
    $('#window-credits .made-with-love').html(footer);

}

function getCreditSection(section) {
    const template = `<div class='section'>
                                    <p>{title}</p>
                                    {authors}
                            </div>`;

    let title = spanTextColor(section.title, "var(--color-green-light)");
    let authors = '';

    section.authors.forEach(author => {
        authors += `<span>${author}</span>`
    });

    return template.replace('{title}', title).replace('{authors}', authors);
}

async function initialConfig(langData) {
    const minutesIntervalBackground = (4 * 60) * 1000;
    $('html').on('contextmenu', function (e) {
        e.preventDefault();
    });

    welcome(langData);
    setupDonation(langData);
    setupWindowSettings(langData);
    setupWindowHelp(langData);
    setupWindowChangelog(langData);
    setupWindowCredits(langData);
    setupButtons(langData);
    setTooltips(langData);
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

    await GameCombinationManager.init({
        elementsUnlocked: gameManager.elementsUnlocked,
        specialElementsUnlocked: gameManager.specialElementsUnlocked
    });

    if (gameConfig.debugMode) {
        GameCombinationManager.debugTableElements();
    }

    gameManager.init();

    $('#game').css('display', 'flex');

    if (gameConfig.showWelcome) {
        gameConfig.showWelcome = false;
        gameConfig.save();

        $('#window-help').fadeIn();
    }
}

export { audioManager, gameManager };

