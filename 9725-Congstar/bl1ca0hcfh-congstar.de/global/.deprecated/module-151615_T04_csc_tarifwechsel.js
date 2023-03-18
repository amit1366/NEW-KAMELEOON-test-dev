import { globalCSC } from '../../_helpers/csc/CSC_global_user';

export const T04CscTarifwechsel = () => {
    const goals = {
        '[GG|CSC|T04] A2C Tarifwechsel': 271587
    };

    if (
        /\/meincongstar\/tarifwechsel\/tarifkonfigurator(\?back=unset&contractid=|\?contractid=)/
            .test(window.location.href)
    ) {
        Kameleoon.API.Core.runWhenElementPresent(
            'button[data-test-action="addToCart"]', ([elements]) => {
                elements.addEventListener('click', () => {
                    Kameleoon.API.Goals.processConversion(
                        goals['[GG|CSC|T04] A2C Tarifwechsel']
                    );
                });
            }
        );
    }

    function setCSCData(customerProfileID) {
        if (customerProfileID !== '') {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const url = `https://customers.kameleoon.com/congstarcsc_t04/${customerProfileID}`;

            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    window.kam_results = result;
                    if (typeof result.name !== 'undefined') {

                        if (typeof Kameleoon.API.CurrentVisit
                            .customData['CSC T04'] !== 'undefined'
                            && Kameleoon.API.CurrentVisit
                                .customData['CSC T04'] !== result.name) {

                            if (result.name.match('_KG')) {
                                Kameleoon.API.Experiments.assignVariation(151615, 723613, true);
                                console.log('assign this user to => TW-Freiheit|Reference');
                            } else if (result.name.match('_TG')) {
                                console.log('assign this user to => TW-Freiheit|Variation');
                                Kameleoon.API.Experiments.assignVariation(151615, 723617, true);
                            }
                            dataLayer.push({
                                kameleoon_audience: result.name,
                                kameleoon_experiment: '[T04|CSC] Tarifwechselfreiheit'
                            });
                        } else {
                            console.log('Nutzer Tarif/Variante identisch - OK ');
                        }
                        Kameleoon.API.Data.setCustomData('CSC T04', result.name);
                    }

                    if (typeof result.purchased !== 'undefined') {
                        Kameleoon.API.Data.setCustomData('CSC T04 Purchased', result.purchased);
                    }

                })
                .catch((error) => console.log('error', error));
        }
    }

    globalCSC(setCSCData);

    function setClientPurchase() {
        Kameleoon.API.Data.setCustomData('CSC T04 Purchased', true);
    }

    if (/\/meincongstar\/tarifwechsel\/bestaetigung/.test(window.location.href)) {
        setClientPurchase();
    }
};
