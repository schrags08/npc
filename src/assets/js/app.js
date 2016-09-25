const CSS_PREFIX = 'npc';

window.onload = function () {
    initAskCheesyAnimation();
    initEasterEgg();
};

function initEasterEgg() {
    var isEggEnabled = false;

    new Konami(function () {
        var status = !isEggEnabled ? 'e]\[@bl3D' : 'diZ481Ed';
        $('body').toggleClass(`${CSS_PREFIX}--l33tMode`);
        console.log(`H4x0r l337 ]\/[0D3 ${status}...`);
        isEggEnabled = !isEggEnabled;
    });
}

function initAskCheesyAnimation() {
    $(`li.${CSS_PREFIX}__askCheesy`).hover(function() {
        $(this).toggleClass(`${CSS_PREFIX}__askCheesy--hover`);
    })
}