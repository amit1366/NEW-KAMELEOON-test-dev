console.log('Newsletter-wording');
// import { discount } from "./html";









function init() {
    const kameleoon = Kameleoon.API.Utils


    const body = kameleoon.querySelectorAll('body')[0]
    body.classList.add('Newsletter-wording');


    if (kameleoon.querySelectorAll('.footer__flap-title')[0]) {
        kameleoon.querySelectorAll('.footer__flap-title')[0].innerHTML = 'Zum Lidl-Newsletter anmelden!'

    }

    if (kameleoon.querySelectorAll('.footer__accordion-newsletter .footer__textblock ')[0]) {
        kameleoon.querySelectorAll('.footer__accordion-newsletter .footer__textblock ')[0].innerHTML = 'Melde dich jetzt zum Lidl-Newsletter an & sichere dir dein Willkommensgeschenk – Dein Zugang zu exklusiven Angeboten & mehr wartet auf dich!'

    }

    if (kameleoon.querySelectorAll('.footer__newsletter-block .footer__info-link .footer__buttonlink')[0]) {
        kameleoon.querySelectorAll('.footer__newsletter-block .footer__info-link .footer__buttonlink')[0].innerHTML = 'Zum Lidl-Newsletter anmelden'

    }


    if (kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(3) h2')[0] && (!kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(3) h2')[0].textContent.indexOf('Deine')>-1)) {

        kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(3) h2')[0].innerHTML = 'Bestätige jetzt deine Anmeldung zum Lidl-Newsletter!'
    }

    if (kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(3) h2+p')[0]) {
        let documentBody = kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(3) h2+p')[0].textContent;       
           var newdoc= documentBody.replace(new RegExp('Lidl Insider', "g"), 'Lidl-Newsletter');
           console.log(newdoc);
           kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(3) h2+p')[0].innerHTML=newdoc

    }

    if (kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(1) h2')[0]) {

        kameleoon.querySelectorAll('.APageRoot__SectionWrapper.APageRoot__Section:nth-child(1) h2')[0].innerHTML = 'Du bist jetzt zum Lidl-Newsletter angemeldet!'
    }


    if (kameleoon.querySelectorAll('.footer__info-link[href*="newsletter-anmeldeseite"]')[0]) {

        kameleoon.querySelectorAll('.footer__info-link[href*="newsletter-anmeldeseite"]')[0].setAttribute('href', 'https://www.lidl.de/c/newsletter-anmeldung/s10021183')
    }

    if (kameleoon.querySelectorAll('.kam-newsletter-banner_text-wrapper h2.kam-newsletter-banner_title')[0]) {
        kameleoon.querySelectorAll('.kam-newsletter-banner_text-wrapper h2.kam-newsletter-banner_title')[0].innerHTML = 'Zum Lidl-Newsletter anmelden und viele Vorteile sichern!'

    }

    if (kameleoon.querySelectorAll('.kam-newsletter-banner_mobile-content-wrapper h2.kam-newsletter-banner_title')[0]) {
        kameleoon.querySelectorAll('.kam-newsletter-banner_mobile-content-wrapper h2.kam-newsletter-banner_title')[0].innerHTML = 'Lidl-Newsletter!'

    }


   




}

Kameleoon.API.Core.runWhenElementPresent(".footer__buttonlink", () => {
    init();
}, 200);
