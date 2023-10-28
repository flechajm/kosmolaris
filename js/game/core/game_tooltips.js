class GameTooltips {

    static bind({ element, text, position }) {
        const tooltipDOM = element.find('tooltip');
        const className = tooltipDOM.attr('class');
        const viewportWidth = $(window).width();
        const viewportHeight = $(window).height();

        tooltipDOM.html(text);

        let posX;
        let posY;
        if (element.length > 0) {
            if (position == 'topRight') {
                const rect = element[0].getBoundingClientRect();
                posY = rect.height / 1.5;
                posX = rect.width;
            }
        }

        element.mouseenter(function () {
            element.css('z-index', '11');
            const screenPadding = 16;
            const rect = tooltipDOM[0].getBoundingClientRect();
            const offsetRight = rect.right < 0 ? rect.right : viewportWidth - rect.right;
            const offsetLeft = rect.left < 0 ? rect.left : viewportWidth - rect.left;
            const offsetBotom = rect.bottom < 0 ? rect.bottom : viewportHeight - rect.bottom;
            const offsetTop = rect.top < 0 ? rect.top : viewportHeight - rect.top;

            if (posX !== undefined && posY != undefined) {
                tooltipDOM.css({
                    'top': -posY,
                    'left': posX,
                });
            } else {
                if (offsetLeft < 0) {
                    tooltipDOM.css('left', (tooltipDOM.width() / 2) + screenPadding);
                } else if (offsetRight < 0) {
                    tooltipDOM.css('left', -screenPadding);
                }

                if (offsetBotom < 0 && (offsetTop < -screenPadding)) {
                    tooltipDOM.css({
                        'top': '100%',
                        'bottom': 'auto',
                    });
                } else if (offsetTop < 0 && (offsetBotom < screenPadding)) {
                    tooltipDOM.css('top', '-100%');
                }
            }

            tooltipDOM.stop().animate({ opacity: 1 }, 300);
        }).mouseleave(function () {
            tooltipDOM.stop().animate({ opacity: 0 }, 50, function () {
                if (className !== undefined) {
                    tooltipDOM.addClass(className);
                    tooltipDOM.css({
                        'left': '50%'
                    });
                } else {
                    tooltipDOM.css({
                        'top': '110%',
                        'left': '50%'
                    });
                }
                element.css('z-index', '10');
            });
        });
    }
}

export default GameTooltips;