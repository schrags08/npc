const CSS_PREFIX = 'npc';

$(function() {
    initAskCheesyAnimation();
    initFlickity();
    initMacy();
    initCountdown();
    initEasterEgg();
});

function initAskCheesyAnimation() {
    $(`li.${CSS_PREFIX}__askCheesy`).hover(function() {
        $(this).toggleClass(`${CSS_PREFIX}__askCheesy--hover`);
    })
}

function initEasterEgg() {
    var isEggEnabled = false;

    new Konami(function () {
        var status = !isEggEnabled ? 'e]\[@bl3D' : 'diZ481Ed';
        $('body').toggleClass(`${CSS_PREFIX}--l33tMode`);
        console.log(`H4x0r l337 ]\/[0D3 ${status}...`);
        isEggEnabled = !isEggEnabled;
    });
}

function initFlickity() {
    $(`.${CSS_PREFIX}__flickity-gallery`).flickity({
        autoPlay: false,
        cellAlign: 'left',
        freeScroll: true,
        imagesLoaded: true,
        lazyLoad: 3,
        pageDots: false,
        setGallerySize: false,
        wrapAround: true
    });
}

function initMacy() {
    Macy.init({
        container: `.${CSS_PREFIX}__macy-gallery`,
        trueOrder: true,
        waitForImages: false,
        margin: 16,
        columns: 5,
        breakAt: {
            1024: 3,
            640: 1
        }
    });
}

function initCountdown() {
    if (document.getElementById('countdown')) {
        var timerId =
            countdown(
                new Date(window.schrags.global.eventDate),
                function(ts) {
                    document.getElementById('countdown').innerHTML = ts.toHTML();
                },
                countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
    }
}