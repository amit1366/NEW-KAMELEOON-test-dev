import { goals } from './goals';
export const common = () =>{
Kameleoon.API.Core.runWhenElementPresent('.tariff-pricing__addition', () => {

    Kameleoon.API.Utils.querySelectorAll('.download-app__button-wrapper [alt*="Android App"]').forEach(function(el){
        el.closest('a').classList.add('bm-playStore');
    })
    Kameleoon.API.Utils.querySelectorAll('.download-app__button-wrapper [alt*="iOS App"]').forEach(function(el){
        el.closest('a').classList.add('bm-isoApp');
    })
    Kameleoon.API.Utils.querySelectorAll('.app-platform-list__grid [alt*="Android App"]')[0].closest('.app-platform-tile-mobile' || '.app-platform-tile').classList.add('bm-lower-playStore');
    Kameleoon.API.Utils.querySelectorAll('.app-platform-list__grid [alt*="iOS App"]')[0].closest('.app-platform-tile-mobile' || '.app-platform-tile').classList.add('bm-lower-iosApp');
    Kameleoon.API.Utils.querySelectorAll('.awards__link-list .link--light').forEach(function(el){
        if(el.textContent.trim(' ') == 'App-Download'){
            el.classList.add('bm-footer-appDownload')
        }
    })

    Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
        let playStoreCta = target.closest('.bm-playStore');
        if(playStoreCta){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Header Click Google Play']);
            console.log('[GG] Header Click Google Play');
        }

        let appleStoreCta = target.closest('.bm-isoApp');
        if(appleStoreCta){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Header Click App Store']);
            console.log('[GG] Header Click App Store');
        }

        let LowerplayStoreCta = target.closest('.bm-lower-playStore');
        if(LowerplayStoreCta){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Lower Click Google Play']);
            console.log('[GG] Lower Click Google Play');
        }

        let LowerappleStoreCta = target.closest('.bm-lower-iosApp')
        if(LowerappleStoreCta){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Lower Click App Store']);
            console.log('[GG] Lower Click App Store');
        }

        let appDownloadFooter = target.closest('.bm-footer-appDownload')
        if(appDownloadFooter){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click App Download Footer']);
            console.log('[GG] Click App Download Footer');
        }

        let Jetzt = target.closest('.tariff-pricing__content-wrapper .tariff-pricing__cta')
        if(Jetzt){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click Jetzt loslegen']);
            console.log('[GG] Click Jetzt loslegen');
        }

        let nav = target.closest('.navigation__group .link')
        let flayoutNav = target.closest('.flyout__link-list .link')
        let flayoutNavApp = target.closest('.flyout__menu  .download-app a')
        if(nav || flayoutNav || flayoutNavApp){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click Navi']);
            console.log('[GG] Click Navi');
        }

        let footerLinks = target.closest('.footer .awards__link-list .awards__link-item a')
        let footerSocial = target.closest('.footer .footer__link-wrapper .social-media .social-media__item')
        let footerimpressum = target.closest('.footer .footer__link-wrapper .footer__link-list .footer__link-item [href*="/impressum/"]')
        let footeragb = target.closest('.footer .footer__link-wrapper .footer__link-list .footer__link-item [href*="/agb/"]')
        let footerVerbraucherinformationen = target.closest('.footer .footer__link-wrapper .footer__link-list .footer__link-item [href*="/Verbraucherinformationen"]')
        if(footerLinks || footerSocial || footerimpressum || footeragb || footerVerbraucherinformationen){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click Footer']);
            console.log('[GG] Click Footer');
        }

        let videoContainer = target.closest('.video-section .video-section__teaser .video-section__content')
        if(videoContainer){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click Video']);
            console.log('[GG] Click Video');
        }

        let mehrInfos = target.closest('.gruende-fraenk-tiles__cardlet .cardlet__wrapper .gruende-fraenk-tiles__link')
        if(mehrInfos){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click Mehr Infos']);
            console.log('[GG] Click Mehr Infos');
        }

        let chatIcon = target.closest('.helpButton')
        if(chatIcon){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click Chatbubble']);
            console.log('[GG] Click Chatbubble');
        }

        let friends = target.closest('.paragraph [href*="/fraenk-for-friends/"]')
        if(friends){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Click 4 friends']);
            console.log('[GG] Click 4 friends');
        }
        let mobClick = target.closest('.smart-banner .smart-banner__button')
        if(mobClick){
            // Kameleoon.API.Goals.processConversion(goals['[GG] Mobile Click Download']);
            console.log('[GG] Mobile Click Download');
        }
    });

   
}, 200);
}