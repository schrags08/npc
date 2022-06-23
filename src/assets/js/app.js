import $ from 'jquery';
import 'what-input';
import * as countdown from './lib/countdown';
import * as Flickity from 'flickity';
import * as Konami from 'konami';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

const CSS_PREFIX = 'npc';

$(function () {
    $(document).foundation();

    initFlickity();
    initCountdown();
    initEasterEgg();
    initSignUp();
    initRegistration();
});

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
    const elem = document.querySelector(`.${CSS_PREFIX}__flickity-gallery`);

    if (!elem) {
        return;
    }

    const gallery = new Flickity(elem, {
        autoPlay: false,
        cellAlign: "left",
        freeScroll: true,
        imagesLoaded: true,
        lazyLoad: 3,
        pageDots: false,
        setGallerySize: false,
        wrapAround: true,
    });
}

function initCountdown() {
    const elem = document.getElementById('countdown');

    if (!elem) {
        return;
    }

    var timerId =
        countdown(
            new Date(window.schrags.global.eventDate),
            function (ts) {
               elem.innerHTML = ts.toHTML();
            },
            countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);

}

function initSignUp() {
    var button = document.querySelector('button[name="signup"]');

    if (button) {
        button.addEventListener('click', e => {
            var nameElem = document.querySelector('input[name="name"]');
            var name = nameElem.value;
            var emailElem = document.querySelector('input[name="email"]');
            var email = emailElem.value;
            var updatesForm = document.querySelector(`.${CSS_PREFIX}__updates-form`);
            var updatesMessage = document.querySelector(`.${CSS_PREFIX}__updates-message`);
            var payload = {
                name,
                email,
            };
            var url = `https://silken-cottony-nickel.glitch.me/patron`;
            var hasValidValues = name.length > 0 && email.length > 0;

            if (!hasValidValues) {
                return;
            }

            button.disabled = true;
            button.innerHTML = 'Processing';
            updatesForm.style.display = 'block';
            updatesMessage.classList.remove('success', 'alert');
            updatesMessage.innerHTML = '';
            updatesMessage.style.display = 'none';

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then(data => {
                    console.debug("add patron success", JSON.stringify(payload));

                    updatesMessage.classList.add('success');
                    updatesMessage.innerHTML = `<p>Welcome aboard!</p>`;
                })
                .catch(error => {
                    console.error(error);

                    updatesMessage.classList.add('alert');
                    updatesMessage.innerHTML = `<p>Oops, something went wrong! Try again later.</p>`;
                }).finally(() => {
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

        switch (index) {
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

        var url = `https://venmo.com/?txn=pay&audience=private&recipients=schrags08&amount=35&note=NPC2022-${sizeOption}`;

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
