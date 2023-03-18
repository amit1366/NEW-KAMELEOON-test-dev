const selectors = {
    mainContainer: '.wrapper',
    header: '.header',
    headerMenu: '.header-menu',
    headerNav: '.header-nav',
    popup_container: '.kam-popupIE__container',
    popup_closeBtn: '.kam-popupIE__closeBtn',
    popup_content: '.kam-popupIE__content',
    popup_content_short: '.kam-popupIE__content_short',
    popup_browserLink: '.kam-popupIE__browser__link',
    popup_browserLinkText: '.kam-popupIE__browser__name'
};

if ((navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i))) {
  
    runWhenConditionTrue(
        () => (window.location.href.indexOf('congstar.de') !== -1) && document.querySelector(selectors.mainContainer) && localStorage.length,
        () => {
            runWhenConditionTrue(
                () => document.querySelector('head'),
                () => {
                    const styles  = document.createElement('style');
                    styles.innerHTML = returnStyles();
                    document.querySelector('head').appendChild(styles);
                }
            );

            const popupIE = createPopupIE();
            const mainContainer = document.querySelector(selectors.mainContainer);
            mainContainer.insertAdjacentHTML('beforeBegin', popupIE);

            document.querySelector(selectors.popup_container).style.position = 'fixed';
            mainContainer.style.top = sessionStorage.getItem('KameleoonDev__popupIE_showed') ? '90px' : '240px';

            //iteraction with header
            runWhenConditionTrue(() => document.querySelector(selectors.header),
                () => interactionWithHeader());

            //close popup
            document
                .querySelector(selectors.popup_closeBtn)
                .addEventListener('mousedown', () => {
                    mainContainer.style.top = '90px';
                    document.querySelector(selectors.popup_content).style.display = 'none';
                    document.querySelector(selectors.popup_content_short).style.display =
                        'block';
                    sessionStorage.setItem('KameleoonDev__popupIE_showed', true);
                }); 
        }
    );
}

function interactionWithHeader() {
    const header = document.querySelector(selectors.header);
    let headerMenus = document.querySelectorAll(selectors.headerMenu);
    headerMenus = [].slice.call(headerMenus);
    header.style.top = 'auto';
    header.style.position = 'absolute';
    headerMenus.forEach((menu) => (menu.style.top = 'auto'));

    document.addEventListener('scroll', () => {
        if (sessionStorage.getItem('KameleoonDev__popupIE_showed')) {
            if (document.documentElement.scrollTop === 0) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`90px`, 'fixed', `auto`);
            } else if (document.documentElement.scrollTop >= 90) {
                setParamsForHeader('90px', 'fixed', '150px');
            }

        } else {
            if (document.documentElement.scrollTop === 0) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`246px`, 'fixed', `auto`);
            } else if (document.documentElement.scrollTop >= 250) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`246px`, 'fixed', `308px`);
            } else if (0 < document.documentElement.scrollTop < 250) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`246px`, 'fixed', `308px`);
            }
        }
    });

    function setParamsForHeader(top, position, menusTop) {
        header.style.top = top;
        header.style.position = position;
        headerMenus.forEach(menu => {
            menu.style.top = menusTop;
        });
    }
}

//show short popup if closed
runWhenConditionTrue(
    () => {
        return (sessionStorage.getItem('KameleoonDev__popupIE_showed') && document.querySelector(selectors.popup_container));
    },
    () => {
        document.querySelector(selectors.popup_content).style.display = 'none';
        document.querySelector(selectors.popup_content_short).style.display =
            'block';
    }
);

function runWhenConditionTrue(condition, callback) {
    const interval = setInterval(()=>{
        if (condition()) {
            clearInterval(interval);
            return callback();
        }
    }, 50);
}

function createPopupIE  () {
    return `
        <div class='kam-popupIE__container'>
            <div class='kam-popupIE__content'>
                <p class='kam-popupIE__title'>Bitte aktualisiere deinen Browser.</p>
                <p class='kam-popupIE__text'>Dein Internetbrowser ist leider veraltet. Das kann dazu führen, dass diese Webseite nicht korrekt dargestellt wird. <br/> 
                Um mit den aktuellsten Sicherheitsstandards durchs Internet zu surfen, empfiehlt congstar einen der folgenden aktuellen Browser:</p>

                <a class='kam-popupIE__closeBtn' href='#' type='button'></a>

                <div class='kam-popupIE__browsers'>
                    <div class='kam-popupIE__browser'>
                        <a class='kam-popupIE__browser__link' target="_blank"  href='https://www.google.com/intl/de_de/chrome/'><img src='https://storage.kameleoon.eu/congstar/popup_IE/chrome.png'></a>
                        <a class='kam-popupIE__browser__name' target="_blank"  href='https://www.google.com/intl/de_de/chrome/'>Google Chrome</a>
                    </div>
                    <div class='kam-popupIE__browser'>
                        <a class='kam-popupIE__browser__link' href='https://www.mozilla.org/de/firefox/new/' target="_blank"><img src='https://storage.kameleoon.eu/congstar/popup_IE/ff.png'></a>
                        <a class='kam-popupIE__browser__name' href='https://www.mozilla.org/de/firefox/new/' target="_blank">Mozilla Firefox</a>
                    </div>
                    <div class='kam-popupIE__browser'>
                        <a class='kam-popupIE__browser__link' target="_blank"  href='https://www.microsoft.com/de-de/edge'><img src='https://storage.kameleoon.eu/congstar/popup_IE/edge.png'></a>
                        <a class='kam-popupIE__browser__name' target="_blank"  href='https://www.microsoft.com/de-de/edge'>Microsoft Edge</a>
                    </div>
                </div>
            </div>

            <div class='kam-popupIE__content_short kam-popupIE__content'>
                <div class='kam-popupIE__content_short__container'>
                    <img class='kam-popupIE__content_short__info' src='https://storage.kameleoon.eu/congstar/popup_IE/Info_icon.svg'>
                    <p class='kam-popupIE__title kam-popupIE__content_short__text'>Bitte aktualisiere deinen Browser.</p>
                </div>
            </div>
        </div>
    `;
}

function returnStyles () {
    return  `
            .kam-popupIE {
  font-family: "Interstate",Helvetica,Arial,sans-serif;
}

.kam-popupIE__container {
  background-color: #ffffff;
  margin: 0 auto;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
}

.kam-popupIE__content {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  max-width: 1440px;
  padding: 20px 135px;
  margin: 0 auto;
  position: relative;
}

.kam-popupIE__content_short {
  display: none;
  max-height: 120px;
  padding-left: 80px;
}

.kam-popupIE__content_short__info {
  display: inline;
  max-width: 40px;
  margin-left: 5px;
}

.kam-popupIE__content_short__text {
  margin-top: 10px;
  font-size: 22px;
  margin-left: 10px;
}

.kam-popupIE__content_short__container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.kam-popupIE__title {
  font-size: 22px;
  font-weight: bold;
  color: #000000;
}

.kam-popupIE__text {
  color: #000000;
  margin-bottom: 30px;
  font-size: 16px;
}

.kam-popupIE__closeBtn {
  position: absolute;
  top: 30px;
  right: 145px;
  -ms-flex-item-align: start;
  -ms-grid-row-align: start;
  align-self: start;
  width: 30px;
  height: 30px;
  text-align: center;
}

.kam-popupIE__closeBtn:hover {
  opacity: 0.7;
}

.kam-popupIE__closeBtn:before,
.kam-popupIE__closeBtn:after {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 30px;
  margin-top: -15px;
  content: " ";
  height: 25px;
  width: 4px;
  background-color: #000000;
}

.kam-popupIE__closeBtn:before {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.kam-popupIE__closeBtn:after {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.kam-popupIE__browsers {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
}

.kam-popupIE__browser {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 70px;
}

.kam-popupIE__browser__link {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.kam-popupIE__browser__name {
  font-weight: bold;
  color: #000000;
  margin-bottom: 0;
  font-size: 16px;
  text-decoration: none;
}

.kam-popupIE__browser__name:hover {
  text-decoration: none;
  color: #000000;
}
        `;
}
