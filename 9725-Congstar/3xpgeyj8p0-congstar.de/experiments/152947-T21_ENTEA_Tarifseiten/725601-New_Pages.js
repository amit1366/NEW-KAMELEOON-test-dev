if (!location.pathname.includes('/allnet-flat-tarife/')) {
    const tarifSlug = location.pathname.match(/allnet-flat-[sml]/);
    if (tarifSlug) {
        Kameleoon.API.Core.processRedirect(`https://www.congstar.de/handytarife/allnet-flat-tarife/${tarifSlug[0]}/${location.search}`);
    }
}
