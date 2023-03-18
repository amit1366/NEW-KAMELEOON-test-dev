import { t06module } from './t06-module';
// import { t02CSC } from './CSCT02_messageboardDealcloser';
import { integrationKameleoonLegalConsent } from './Integration_kameleoonLegalConsent';
import { t04CSC } from './CSCT04_tarifwechsel';
import { initializeT21Goals } from './module-153079-T21_ENTEA_Tarifseiten';

integrationKameleoonLegalConsent();
t04CSC();
t06module();
// t02CSC();
initializeT21Goals();
