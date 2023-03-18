import pages from './pages';
import regexComposer from './regexComposer';
import checkUrl from './checkUrl';

const tarif = /Allnet Flat S/;
const smartphone = /Apple iPhone SE .*2022.* Aktion$/;
const highlighted = regexComposer(tarif, smartphone);
const message = 'Preis-Leistungs-Tipp';

checkUrl(highlighted, message, {
    ...pages,
    planPage: /handytarife\/allnet-flat-s/,
    planPageAdditional: /handytarife\/allnet-flat-tarife\/allnet-flat-s/,
});
