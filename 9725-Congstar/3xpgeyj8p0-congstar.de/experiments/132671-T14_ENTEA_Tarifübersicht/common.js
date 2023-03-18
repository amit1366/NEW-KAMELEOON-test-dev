const t14Entea = Kameleoon.API.Experiments.getById(-1) ? Kameleoon.API.Experiments.getById(-1) 
    : Kameleoon.API.Experiments.getById(132671);

if (window.location.href.match(/\/handytarife\/sim-only\/?(\?|#|$)/) 
    && t14Entea.associatedVariation.id === 585509) {
    const allnetLinks = document.querySelectorAll(
        'a[href="/handytarife/allnet-flat-tarife-im-vergleich/"]'
    );
    allnetLinks.forEach((allnetLink) => {
        allnetLink.setAttribute('href', '/handytarife/allnet-flat-vergleich/');
    });
}
