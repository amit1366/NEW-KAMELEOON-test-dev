//KamDev_T07-VATBanner_BannerMeincongstar - localData for meincongstar targeting 
//KamDev_T07-VATBanner_BannerCongstar - localData for all congstar targeting 
import {bannerHTML, device} from './vars';

if (!sessionStorage.getItem('KamDev_T07-VATBanner_BannerMeincongstar')) {  
    Kameleoon.API.Core.runWhenElementPresent('.container-fluid.wrapper', (elements) => {
        const body = document.body,
            container = elements[0];
    
        if (!document.querySelector(`.kam-VATBanner`)) {
            container.insertAdjacentHTML(`beforebegin`, bannerHTML);
        } 
    
        const banner = document.querySelector(`.kam-VATBanner`),
            cross = banner.querySelector(`.kam-VATBanner__container_close`);

        body.classList.add(`kam_add-VATBanner`);

        cross.addEventListener(`mousedown`, ()=> {
            body.classList.remove(`kam_add-VATBanner`, `kam_VATBanner-tarifwechsel`, `kam_deleteTop-VATBanner-meincongstar`, `kam_addTop-VATBanner_mobile`);
            banner.classList.add(`kam_hide-VATBanner`);
            sessionStorage.setItem('KamDev_T07-VATBanner_BannerMeincongstar', `BannerNotShow`);
            if (device !== 'Phone' && menu) {
                menu.unblockTop(); 
                scroll.remove();
                menu.scrollTo(0);
                window.dispatchEvent(new Event('scroll'));
            }
        });

            

        Kameleoon.API.Core.runWhenElementPresent(`.kam-smart-banner`, () => {
            body.classList.add(`kam_addTop-VATBanner_mobile`);                
        });

        if (body.classList.contains(`tarifwechsel`)) {
            body.classList.add(`kam_VATBanner-tarifwechsel`);
        }

        class Scroll {
            constructor (bannerHeight, header) {
                this.handler = this.scrollHandler.bind(this);
                this.bannerHeight = bannerHeight;
                this.header = header;
                window.addEventListener('scroll', this.handler);
                this.scrollIsStop;
            }
            
            scrollHandler (e) {
                clearTimeout(this.scrollIsStop);
                this.scrollIsStop = setTimeout(() => {
                    let delta = window.scrollY - 40 - this.bannerHeight - Helpers.getHeight(this.header);
                    const menuY = menu.menu.parentNode.getBoundingClientRect().y;
                    let deltaY = menuY - this.bannerHeight - Helpers.getHeight(this.header);
                    const menuHeight = Helpers.getHeight(menu.menu);
                    const menuParentNodeHeight = Helpers.getHeight(menu.menu.parentNode);
 
                    if (location.href.match(`congstar.de/meincongstar/`)) {
                        delta = window.scrollY - 40 - this.bannerHeight;
                        deltaY = menuY - this.bannerHeight;
                    } 
                        
                    if (delta + menuHeight - menuParentNodeHeight > 0) {
                        menu.scrollTo(menuParentNodeHeight - menuHeight);
                    } else if (deltaY < 0) {
                        menu.scrollTo(Math.abs(deltaY));
                    } else {
                        menu.scrollTo(0);
                    }
                }, 200);
            }
            
            add () {
                window.addEventListener('scroll', this.handler);
            }
            
            remove () {
                window.removeEventListener('scroll', this.handler);
            }
        }
            
        class Wait {
            static header (callback) {
                Kameleoon.API.Core.runWhenElementPresent('header.header', callback);
            }
            static menu (callback) {
                Kameleoon.API.Core.runWhenElementPresent('.device-teasers-filter-facets:not(.kameleoonDev_is-menu)', callback);
            }
        }
            
        class Menu {
            constructor (menu) {
                this.menu = menu;
            }
            scrollTo (px) {
                this.menu.style.transform = `translate3d(0, ${ px }px, 0)`;
            }
            blockTop () {
                this.menu.classList.add('kameleoonDev_block-top');
            }
            unblockTop () {
                this.menu.classList.remove('kameleoonDev_block-top', 'kameleoonDev_is-menu');
            }
            
            setNewMenu (menu) {
                if (menu) { 
                    this.menu = menu;
                } 

                this.menu.classList.add('kameleoonDev_is-menu');
                    
                Wait.menu(([scrollMenu]) => {
                    this.setNewMenu(scrollMenu);
                    if (body.classList.contains(`kam_add-VATBanner`)) {
                        this.menu.classList.add('kameleoonDev_block-top');
                    }
                });
                    
            }
        }
            
        class Helpers {
            static getHeight (element) {
                return element.getBoundingClientRect().height;
            }
        }
            
        let menu;
        let scroll;
            
        if (banner.className === 'kam-VATBanner' && device !== 'Phone') {
            Wait.header(([header]) => {
                Wait.menu(([scrollMenu]) => {
                    const bannerHeight = Helpers.getHeight(banner);
                    menu = new Menu(scrollMenu);

                    scroll = new Scroll(bannerHeight, header);

                    menu.setNewMenu();
                    menu.blockTop();

                    scrollMenu.addEventListener('click', () => {
                        window.dispatchEvent(new Event('scroll'));
                    });
                });
            });
        }

            
        if (location.href.match(`congstar.de/login/passwort-vergessen-sms/`)) {
            Wait.header(() => {
                body.classList.add(`kam_deleteTop-VATBanner-meincongstar`);
            });
        }

        if (location.href.match(`https://www.congstar.de/meincongstar`)) {
            Wait.header(([header]) => {
                if (!header.classList.contains(`animation-header`)) {
                    body.classList.add(`kam_deleteTop-VATBanner-meincongstar`);
                }
            });
        }

    });
}  