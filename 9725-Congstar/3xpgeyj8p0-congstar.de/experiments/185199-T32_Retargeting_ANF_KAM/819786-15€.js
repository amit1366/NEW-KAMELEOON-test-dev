import { logic } from './export/logic';

const campaignParameter = 'sp=cweb&cc=bsp-19bdgf';
const promotionListText = '15 € Bereitstellungspreis sparen bei Buchung bis zum 28.2.2023.';
const addtionalFootnoteText = 'Aktion: Einmaliger Bereitstellungspreis entfällt bei Buchung eines Vertrages mit 24-monatiger Mindestvertragslaufzeit und 20€ statt 35€ bei Buchung eines Vertrages ohne Mindestvertragslaufzeit.';

logic(campaignParameter, addtionalFootnoteText, promotionListText);
