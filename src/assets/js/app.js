window.onload = function () {
    initEasterEgg();
};

function initEasterEgg() {
    var isEggEnabled = false;

    new Konami(function () {
        var status = !isEggEnabled ? 'e]\[@bl3D' : 'diZ481Ed';
        $('body').toggleClass('npc--dosMode');
        console.log(`H4x0r Le3t ]\/[0D3 ${status}...`);
        isEggEnabled = !isEggEnabled;
    });
}