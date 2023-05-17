import {goals} from './goals'
Kameleoon.API.Core.runWhenElementPresent('.tariff-pricing__addition, .app-platform-tile-mobile, .app-platform-tile', () => {

        Kameleoon.API.Utils.querySelectorAll('.download-app__button-wrapper [alt*="Android App"]').forEach((el) => {
            el.closest('a').classList.add('bm-playStore');
        });
        Kameleoon.API.Utils.querySelectorAll('.download-app__button-wrapper [alt*="iOS App"]').forEach((el) => {
            el.closest('a').classList.add('bm-isoApp');
        });

        Kameleoon.API.Utils.querySelectorAll('.awards__link-list .link--light').forEach((el) => {
            if (el.textContent.trim(' ') == 'App-Download') {
                el.classList.add('bm-footer-appDownload');
            }
        });

        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
            const playStoreCta = target.closest('.bm-playStore');
            if (playStoreCta) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Header Click Google Play']);
            }

            const appleStoreCta = target.closest('.bm-isoApp');
            if (appleStoreCta) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Header Click App Store']);
            }

            const LowerplayStoreCta = target.closest('.app-platform-list a:first-child');
            if (LowerplayStoreCta) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Lower Click Google Play']);
            }

            const LowerappleStoreCta = target.closest('.app-platform-list a:first-child + a');
            if (LowerappleStoreCta) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Lower Click App Store']);
            }

            const appDownloadFooter = target.closest('.bm-footer-appDownload');
            if (appDownloadFooter) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click App Download Footer']);
            }

            const Jetzt = target.closest('.tariff-pricing__content-wrapper .tariff-pricing__cta');
            if (Jetzt) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click Jetzt loslegen']);
            }

            const nav = target.closest('.navigation__group .link');
            const flayoutNav = target.closest('.flyout__link-list .link');
            const flayoutNavApp = target.closest('.flyout__menu  .download-app a');
            const mobFlayoutNavApp = target.closest('.navigation__link-list .navigation__link');
            if (nav || flayoutNav || flayoutNavApp || mobFlayoutNavApp) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click Navi']);
            }

            const footerLinks = target.closest('.footer .awards__link-list .awards__link-item a');
            const footerSocial = target.closest('.footer .footer__link-wrapper .social-media .social-media__item');
            const footerimpressum = target.closest('.footer .footer__link-wrapper .footer__link-list .footer__link-item [href*="/impressum/"]');
            const footeragb = target.closest('.footer .footer__link-wrapper .footer__link-list .footer__link-item [href*="/agb/"]');
            const footerVerbraucherinformationen = target.closest('.footer .footer__link-wrapper .footer__link-list .footer__link-item [href*="/Verbraucherinformationen"]');
            // eslint-disable-next-line max-len
            if (footerLinks || footerSocial || footerimpressum || footeragb || footerVerbraucherinformationen) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click Footer']);
            }

            const videoContainer = target.closest('.video-section .video-section__teaser .video-section__content');
            if (videoContainer) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click Video']);
            }

            const mehrInfos = target.closest('.gruende-fraenk-tiles__cardlet .cardlet__wrapper .gruende-fraenk-tiles__link');
            if (mehrInfos) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click Mehr Infos']);
            }

            const chatIcon = target.closest('.helpButton');
            if (chatIcon) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click Chatbubble']);
            }

            const friends = target.closest('.paragraph [href*="/fraenk-for-friends/"]');
            if (friends) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Click 4 friends']);
            }
            const mobClick = target.closest('.smart-banner .smart-banner__button');
            if (mobClick) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Mobile Click Download']);
            }
        });

}, 200);
