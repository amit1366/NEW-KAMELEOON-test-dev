export const T14Entea = () => {
    if (window.location.href.match(/\/handytarife\/sim-only\/?(\?|#|$)/)) {
        const allnetLinks = document.querySelectorAll('a[href="/handytarife/allnet-flat-tarife/"]');
        allnetLinks.forEach((allnetLink) => {
            allnetLink.addEventListener('click', (event) => {
                event.preventDefault();
                Kameleoon.API.Events.trigger('T14_ENTEA');
                window.location.href = allnetLink.getAttribute('href');
            });
        });
    }
};
