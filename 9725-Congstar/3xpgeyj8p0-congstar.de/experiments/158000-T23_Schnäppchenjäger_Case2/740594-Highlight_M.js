import pages from './pages';
import regexComposer from './regexComposer';
import checkUrl from './checkUrl';

const tarif = /Allnet Flat M/;
const smartphone = /Apple iPhone SE .*2022.* Aktion$/;
const highlighted = regexComposer(tarif, smartphone);
const message = 'Preis-Leistungs-Sieger';

checkUrl(highlighted, message, {
    ...pages,
    planPage: /handytarife\/allnet-flat-m/,
    planPageAdditional: /handytarife\/allnet-flat-tarife\/allnet-flat-m/,
});
