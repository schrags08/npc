const CSS_PREFIX = 'npc';

$(function() {
    // initAskCheesyAnimation();
    initFlickity();
    // initMacy();
    initCountdown();
    initEasterEgg();
    initSignUp();
    initRegistration();
});

function initAskCheesyAnimation() {
    $(`li.${CSS_PREFIX}__askCheesy`).hover(function() {
        $(this).toggleClass(`${CSS_PREFIX}__askCheesy--hover`);
    })
}

function initEasterEgg() {
    var isEggEnabled = false;

    if (document.cookie.split(';').filter((item) => {
        return item.includes('npcEgg=true');
    }).length) {
        console.log('The cookie "npcEgg" has "true" for value');
        isEggEnabled = true;
    }

    updateEggMode(isEggEnabled);

    new Konami(function () {
        isEggEnabled = !isEggEnabled;
        document.cookie = `npcEgg=${isEggEnabled ? 'true' : 'false'}`;

        var status = isEggEnabled ? 'e]\[@bl3D' : 'diZ481Ed';
        console.log(`H4x0r l337 ]\/[0D3 ${status}...`);

        updateEggMode(isEggEnabled);
    });
}

function updateEggMode(enabled) {
    if (enabled) {
        enableEggMode();
    } else {
        disableEggMode();
    }
}

function enableEggMode() {
    $('body').addClass(`${CSS_PREFIX}--l33tMode`);
}

function disableEggMode() {
    $('body').removeClass(`${CSS_PREFIX}--l33tMode`);
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

// function initMacy() {
//     var container = document.querySelector(`.${CSS_PREFIX}__macy-gallery`);

//     if (container) {
//         Macy.init({
//             container: `.${CSS_PREFIX}__macy-gallery`,
//             trueOrder: true,
//             waitForImages: false,
//             margin: 16,
//             columns: 5,
//             breakAt: {
//                 1024: 3,
//                 640: 1
//             }
//         });
//     }
// }

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

function initSignUp() {
    var button = document.querySelector('button[name="signup"]');

    if (button) {
        button.addEventListener('click', e => {
            var name = document.querySelector('input[name="name"]');
            var email = document.querySelector('input[name="email"]');
            var updatesForm = document.querySelector(`.${CSS_PREFIX}__updates-form`);
            var updatesMessage = document.querySelector(`.${CSS_PREFIX}__updates-message`);
            var url = `https://neighborhoodpubcrawl.azurewebsites.net/api/AddPatronTest?name=${encodeURIComponent(name.value)}&email=${encodeURIComponent(email.value)}`;
            var hasValidValues = name.value.length > 0 && email.value.length > 0;

            if (!hasValidValues) {
                return;
            }

            button.disabled = true;
            button.innerHTML = 'Processing';
            updatesForm.style.display = 'block';
            updatesMessage.classList.remove('success', 'alert');
            updatesMessage.innerHTML = '';
            updatesMessage.style.display = 'none';

            $.get(url)
                .done(data => {
                    updatesMessage.classList.add('success');
                    updatesMessage.innerHTML = `<p>Welcome aboard!</p>`;
                })
                .fail(data => {
                    updatesMessage.classList.add('alert');
                    updatesMessage.innerHTML = `<p>Oops, something went wrong! Try again later.</p>`;
                }).always(() => {
                    updatesMessage.style.display = 'block';
                    updatesForm.style.display = 'none';
                });
        });
    }
}

function initRegistration() {
    var payment = document.querySelector('select[name="payment"]');
    var size = document.querySelector('select[name="size"]');

    if (payment) {
        payment.addEventListener('change', paymentChange);
    }

    if (size) {
        size.addEventListener('change', sizeChange);
    }

    function paymentChange() {
        let index = payment.selectedIndex;

        reset();

        switch(index) {
            case 1:
                showVenmo();
                break;
            case 2:
                showPayPal();
                break;
            default:
                reset();
                break;
        }
    }

    function sizeChange() {
        var sizeIndex = size.selectedIndex;
        var sizeOption = size.options[sizeIndex].value;

        var url = `https://venmo.com/?txn=pay&audience=private&recipients=schrags08&amount=30&note=NPC2018-${sizeOption}`;

        if (sizeIndex > 0) {
            $('.checkout--venmo').show();
            $('.checkout--venmo').find('a').attr('href', url);
        } else {
            $('.checkout--venmo').hide();
        }
    }

    function reset() {
        size.selectedIndex = 0;

        $('.modifier').hide();
        $('.checkout').hide();
    }

    function showVenmo() {
        $('.modifier').show();
        $('.checkout').hide();
    }

    function showPayPal() {
        $('.modifier').hide();
        $('.checkout').hide();
        $('.checkout--paypal').show();
    }
}