"use strict";

const globalGoals = () => {
  const goals = {
    '[GG] AddToCart S': 236177,
    '[GG] AddToCart M': 236178,
    '[GG] AddToCart L': 236179,
    '[GG] Order and Revenue S': 236197,
    '[GG] Order and Revenue M': 234174,
    '[GG] Order and Revenue L': 234175,
    '[GG] Order and Revenue M + L + S': 284431,
    '[GG] Order and Revenue S extra': 297195,
    '[GG] Contact form sent': 231207,
    '[GG] Daten all': 230952,
    '[GG] Homespot all': 230953,
    '[GG] VVL  in CSC': 212465,
    '[GG] A2C FairFlat': 226503,
    '[GG] FairFlat': 226528,
    '[GG] AddToCart L Prepaid': 239100,
    '[GG] AddToCart Iphone 12': 239101,
    '[GG] AddToCart Smartphone >=900€': 239103,
    '[GG] Order Extra Daten ': 273758,
    '[GG] Order Disney Option': 273759
  };
  if (/\/checkout\/warenkorb\/?(\?|#|$)/.test(window.location.href)) {
    Kameleoon.API.Core.runWhenConditionTrue(() => dataLayer.some(item => item.event && item.basketItems), () => {
      const {
        basketItems
      } = window.dataLayer.find(item => item.basketItems);
      basketItems.forEach(product => {
        if (/Allnet ?Flat ?S/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart S']);
        }
        if (/Allnet ?Flat ?M/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart M']);
        }
        if (/Allnet ?Flat ?L/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart L']);
        }

        // Takeover from T16ProduktanordnungPremiumsegment
        if (product.name.includes('PrepaidAllnetL')) {
          Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart L Prepaid']);
        }
        if (product.name.includes('AppleiPhone12') && !product.name.includes('Aktion') && !product.name.includes('Pro')) {
          Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart Iphone 12']);
        }
        if (parseFloat(product.productOnetimePrice) >= 900) {
          Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart Smartphone >=900€']);
        }
      });
    }, 200);
  }
  if (/\/checkout\/bestaetigung\/?(\?|#|$)/.test(window.location.href)) {
    Kameleoon.API.Core.runWhenConditionTrue(() => dataLayer.some(item => item.transactionProducts), () => {
      const {
        transactionProducts
      } = window.dataLayer.find(item => item.transactionProducts);
      transactionProducts.forEach(product => {
        const revenue = product.productMonthlyPrice * 24;
        if (/AllnetFlatSExtra/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue S extra'], revenue);
        } else if (/Allnet ?Flat ?S/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue S'], revenue);
        }
        if (/Allnet ?Flat ?M/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue M'], revenue);
        } else if (/Allnet ?Flat ?L/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue L'], revenue);
        }
        Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue M + L + S'], revenue);
        if (/Extra-Daten(2|5)GB/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order Extra Daten ']);
        }
        if (/VideoOption–Disney\+/.test(product.name)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order Disney Option']);
        }
      });
    });

    // Takeover from P07
    let currentId;

    // eslint-disable-next-line no-inner-declarations
    function findProductId(data) {
      const productsId = [300, 301, 302, 303, 304, 305, 414, 415, 418, 416, 417, 419, 6213, 6214, 6215, 6216, 6219, 6220, 6221, 6222, 6223, 6224, 6225, 6226];
      const basketItems = data && data.basketItems;
      if (basketItems) {
        for (let i = 0; i < basketItems.length; i++) {
          const tarrifId = basketItems[i].id;
          if (productsId.includes(tarrifId)) {
            currentId = tarrifId;
            return true;
          }
        }
      }
    }

    // eslint-disable-next-line no-inner-declarations
    function checkBoughtProduct(cb) {
      if (dataLayer) {
        return dataLayer.find(cb);
      }
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => checkBoughtProduct(findProductId), () => {
      if (String(currentId)[0] <= '4') {
        Kameleoon.API.Goals.processConversion(goals['[GG] Daten all']);
      } else {
        Kameleoon.API.Goals.processConversion(goals['[GG] Homespot all']);
      }
    });
    // end Takeover from P07
  }

  // Takeover from P06
  if (/www.congstar.de\/hilfe-service\/kontakt\/kontaktformular/.test(window.location.href)) {
    const addGoal = event => {
      if (event.data.form_submit === true) {
        if (!sessionStorage.getItem('kameleoon__contactFormSent')) {
          sessionStorage.setItem('kameleoon__contactFormSent', true);
        }
        Kameleoon.API.Goals.processConversion(goals['[GG] Contact form sent']);
      }
    };
    window.addEventListener('message', addGoal);
  }

  // Takeover from T06 Databoost
  if (/www.congstar.de\/meincongstar\/vertragsverlaengerung\/bestaetigung/.test(window.location.href)) {
    Kameleoon.API.Goals.processConversion(goals['[GG] VVL  in CSC']);
  }

  // Takeover from T10 BSP
  const url = 'www.congstar.de/handytarife/fair-flat/';
  const filterGoals = ['215327', '215328', '215329', '215330', '215331', '226503'];
  const selectors = {
    button: '.configurator-selection__actions .btn-icon.btn-icon--large.btn-icon--block.btn-icon--dark-transparent.btn-icon--multiline.icon--add-to-basket'
  };
  if (location.href.includes(url)) {
    Kameleoon.API.Core.runWhenElementPresent(selectors.button, ([button]) => {
      Kameleoon.API.Utils.addUniversalClickListener(button, () => Kameleoon.API.Goals.processConversion(goals['[GG] A2C FairFlat']));
    });
  }
  if (!Kameleoon.API.Data.readLocalData('Kam_Dev_Goal_Last_active')) {
    const defaultOptions = {};
    filterGoals.forEach(goalId => {
      defaultOptions[goalId] = 0;
    });
    Kameleoon.API.Data.writeLocalData('Kam_Dev_Goal_Last_active', defaultOptions, true);
  }
  Kameleoon.API.Core.runWhenConditionTrue(() => {
    const infoParse = Kameleoon.API.Data.readLocalData('Kam_Dev_Goal_Last_active');
    if (!infoParse) return;
    const {
      conversions
    } = Kameleoon.API.CurrentVisit;
    return filterGoals.some(id => conversions[id] && conversions[id].count !== infoParse[id]);
  }, () => {
    const {
      conversions
    } = Kameleoon.API.CurrentVisit;
    const options = {};
    filterGoals.forEach(goalId => {
      if (conversions[goalId]) {
        options[goalId] = conversions[goalId].count;
      }
    });
    Kameleoon.API.Data.writeLocalData('Kam_Dev_Goal_Last_active', options, true);
    Kameleoon.API.Goals.processConversion(goals['[GG] FairFlat']);
  });
  const sessionStorageNames = {
    wasExtraDatenOrdered: 'kameleoonDev__153079-wasExtraDatenOrdered',
    wasDisneyOrdered: 'kameleoonDev__153079-wasDisneyOrdered'
  };
  if (document.location.pathname === '/checkout/bestaetigung') {
    let orderDataLayer = null;
    Kameleoon.API.Core.runWhenConditionTrue(() => {
      const layer = dataLayer.find(item => item.transactionProducts);
      if (layer) {
        orderDataLayer = layer;
        return true;
      }
    }, () => {
      const {
        transactionProducts
      } = orderDataLayer;
      transactionProducts.forEach(product => {
        if (sessionStorage.getItem(sessionStorageNames.wasExtraDatenOrdered) !== 'true' && (product.name.includes('Extra-Daten5GB') || product.name.includes('Extra-Daten2GB'))) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order Extra Daten ']);
          sessionStorage.setItem(sessionStorageNames.wasExtraDatenOrdered, 'true');
        }
        if (sessionStorage.getItem(sessionStorageNames.wasDisneyOrdered) !== 'true' && product.name.includes('VideoOption–Disney+')) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order Disney Option']);
          sessionStorage.setItem(sessionStorageNames.wasDisneyOrdered, 'true');
        }
      });
    }, 200);
  } else {
    sessionStorage.setItem(sessionStorageNames.wasExtraDatenOrdered, 'false');
    sessionStorage.setItem(sessionStorageNames.wasDisneyOrdered, 'false');
  }
};
const globalMultiCookieSetup = () => {
  const getCookie = name => {
    const regex = new RegExp(`${name}=([^;]+)`);
    const value = document.cookie.match(regex);
    return value ? value[1] : false;
  };
  const multiTestCookie = 'kamCookieMultiTest';
  const currentExclusiveTestID = parseInt(getCookie(multiTestCookie), 10);
  if (currentExclusiveTestID) {
    window.kameleoonQueue = window.kameleoonQueue || [];
    window.kameleoonQueue.push(() => {
      if (!Kameleoon.API.Experiments.getById(currentExclusiveTestID)) {
        document.cookie = 'kamCookieMultiTest=; path=/;max-age=0';
      }
    });
  }
};
const globlaAiSetup = () => {
  if (/\/handytarife\/(allnet-flat-m|allnet-flat-s)\//.test(document.location.href)) {
    Kameleoon.API.Data.setCustomData('[AI]PlanSeenS,M,FF(5GB)', true);
  } else if (/\/handytarife\/fair-flat\//.test(document.location.href)) {
    Kameleoon.API.Core.runWhenElementPresent('.eft-shop-plan-configurator__settings', ([module]) => {
      Kameleoon.API.Data.setCustomData('[AI]PlanSeenS,M,FF(5GB)', true);
      module.addEventListener('click', () => {
        setTimeout(() => {
          const currentySlected = module.querySelector('.segment--selected .segment-text');
          const idNumber = currentySlected && currentySlected.id.match(/\d+/);
          if (idNumber && idNumber[0] < 8) {
            Kameleoon.API.Data.setCustomData('[AI]PlanSeenS,M,FF(5GB)', true);
          } else if (idNumber) {
            Kameleoon.API.Data.resetCustomData('[AI]PlanSeenS,M,FF(5GB)');
          }
        }, 99);
      });
    });
  }
  if (/\/handys\/details\//.test(document.location.href)) {
    Kameleoon.API.Core.runWhenElementPresent('device-price-selection', ([elem]) => {
      elem.addEventListener('click', ({
        target
      }) => {
        if (target.closest('.configurator-selection button.btn-icon--large')) {
          for (let i = dataLayer.length - 1; i > 0; i--) {
            if (dataLayer[i].ecommerce && dataLayer[i].ecommerce.detail.products[0]) {
              Kameleoon.API.Data.writeLocalData('KamDev_LastAdd2CartItem', dataLayer[i].ecommerce.detail.products[0], false);
            }
          }
        }
      }, true);
    });
  }
  const goals = {
    '[GG] Order and Revenue': 200517,
    '[GG] AddToCart': 200372
  };
  if (/congstar\.de\/checkout/.test(document.location.href)) {
    Kameleoon.API.Utils.addEventListener(document, 'kameleoonInit', Kameleoon.API.Core.load);
    const phoneStorage = Kameleoon.API.Data.readLocalData('KamDev_LastAdd2CartItem');
    const getCheckoutEvent = () => dataLayer.some(item => item.event && item.event.match(/ee\.(addToCart|purchase)/));
    const getBasketItemsEvent = () => dataLayer.some(item => item.event && item.event.match(/checkout\.basketItems/));
    const getCustomerAge = () => {
      for (let i = 0; i < dataLayer.length; i++) {
        const ageRange = dataLayer[i].customerAgeRange && dataLayer[i].customerAgeRange.match(/\d+/);
        if (ageRange) return Number(ageRange[0]);
      }
    };
    const getCartContentValue = () => {
      let monthSumm = 0;
      const dataLayerObject = dataLayer.find(item => item.basketItems).basketItems;
      dataLayerObject.forEach(item => {
        monthSumm += Number(item.productMonthlyPrice);
      });
      return {
        summ: monthSumm,
        option: dataLayerObject.some(item => item.type === 'option'),
        phone: phoneStorage ? dataLayerObject.some(item => item.id === phoneStorage.id) : false
      };
    };
    if (/\/checkout\/(warenkorb|bestaetigung)/.test(document.location.href)) {
      Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer && getCheckoutEvent() && getBasketItemsEvent(), () => {
        const cartValues = getCartContentValue();
        if (/\/checkout\/warenkorb/.test(document.location.href)) {
          Kameleoon.API.Data.setCustomData('[AI]A2CPlan', cartValues.summ);
          Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart'], cartValues.summ);
        } else if (/\/checkout\/bestaetigung/.test(document.location.href)) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue'], cartValues.summ);
          // console.log('[AI]OrderAge', getCustomerAge());
          if (getCustomerAge()) Kameleoon.API.Data.setCustomData('[AI]OrderAge', getCustomerAge());
          // console.log('[AI]OrderOption', cartValues.option);
          if (cartValues.option) Kameleoon.API.Data.setCustomData('[AI]OrderOption', true);
          if (cartValues.phone) {
            const phonePrice = phoneStorage.price;
            let CDname;
            if (phonePrice > 601) {
              CDname = '[AI]OrderPhoneSegment-premium';
            } else if (phonePrice > 301) {
              CDname = '[AI]OrderPhoneSegment-middel';
            } else {
              CDname = '[AI]OrderPhoneSegment-low';
            }
            Kameleoon.API.Data.setCustomData(CDname, true);
          }
        }
      });
    }
  }
};
const goals = {
  '[GG] Time spent >3 Min Handyseiten': 226509,
  '[GG] Time spent >3,6 Min Tarifseiten': 226510,
  '[GG] Extensive clicks tabs Handyseiten': 226511,
  '[GG] >3 tabs open with plan-related content': 226512,
  '[GG] >3 tabs open with handy-related content': 226513,
  '[GG] > 3 smartphone pages': 226514,
  '[GG] Starttext clicked in one level': 226515,
  '[GG] Click filter Nur Aktionsangebote': 226516,
  '[GG] Click Filter Einmalpreis <500€': 226517,
  '[GG] Filter monatlicher Preis <20€': 226518,
  '[GG] Filter Artikelzustand=neuwertig': 226519,
  '[GG] Sort by Preis aufsteigend': 226520,
  '[GG] Angebote-Seiten': 226521,
  '[GG] Smartphone pages <500€': 226522,
  '[GG] A2C Options': 226523,
  // '[GG] FF 8/12 interested': 226524,
  // '[GG] A2C FF 8/12 GB': 226536,
  '[GG] FF 18 interested': 282148,
  '[GG] A2C FF 18 GB': 282149,
  '[GG] Smartphone pages >=900€': 226537
};

/* eslint-disable no-use-before-define */

const scoreSegments = ['Schnappchenjager Segment', 'Premium Segment'];
function triggerValidate(values, cdName) {
  const data = localStorage.getItem(cdName);
  if (!data) return false;
  const dataParse = JSON.parse(data);
  // eslint-disable-next-line guard-for-in
  for (const key in values) {
    const currentKey = dataParse.find(value => value === key);
    if (currentKey) return cdName;
  }
  return false;
}
function pushScoreSegment(cdname) {
  const data = localData.get('Group Segment Behaviour');
  if (data.groupTwo !== cdname) {
    const anotherSegment = scoreSegments.filter(name => name !== cdname);
    Kameleoon.API.Data.setCustomData(cdname, true);
    Kameleoon.API.Data.resetCustomData(anotherSegment[0]);
    localStorage.removeItem(anotherSegment[0]);
    localData.set('Group Segment Behaviour', {
      ...data,
      groupTwo: cdname
    });
  }
}
function checkScoreForData(dataName, scoreValue) {
  const data = localStorage.getItem(dataName);
  if (!data) return false;
  const dataParse = JSON.parse(data);
  const isActiveSegment = dataParse.score >= scoreValue;
  return isActiveSegment ? dataName : false;
}
const localData = {
  get: name => {
    const data = localStorage.getItem(name);
    const defaultData = {
      score: 0
    };
    return data ? JSON.parse(data) : defaultData;
  },
  setSuccesCondition: (name, condition) => {
    const data = localStorage.getItem(name);
    const dataParse = data ? JSON.parse(data) : [];
    const findUsedCondition = dataParse.filter(term => term === condition);
    if (findUsedCondition.length) return;
    dataParse.push(condition);
    localStorage.setItem(name, JSON.stringify(dataParse));
  },
  set: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  },
  updateScore(name, sumScore) {
    const oldData = this.get(name);
    this.set(name, {
      ...oldData,
      score: oldData.score + sumScore
    });
    if (scoreSegments.includes(name) && this.get(name).score >= 6) {
      pushScoreSegment(name);
    }
  },
  updateScoreWithUrl(name, listName, url, score) {
    const isChecked = this.usedUrl(name, listName, url);
    if (isChecked) return;
    this.updateVisitedUrl(name, listName, url);
    this.updateScore(name, score);
  },
  updateVisitedUrl(name, listName, url) {
    const oldData = this.get(name);
    const list = oldData[listName] || [];
    const isUsed = this.usedUrl(name, listName, url);
    if (!isUsed) {
      list.push(url);
    }
    this.set(name, {
      ...oldData,
      [listName]: list
    });
    return this.get(name);
  },
  removeVisitedrUrl(name, listName) {
    const oldData = this.get(name);
    this.set(name, {
      ...oldData,
      [listName]: []
    });
  },
  successCondition(name, condition) {
    const data = this.get(name);
    data[condition] = true;
    this.set(name, data);
  },
  usedUrl(name, listName, url) {
    const oldData = this.get(name);
    const list = oldData[listName] || [];
    return list.filter(listUrl => listUrl === url).length;
  }
};
const pdpBehaviour = {
  getName: (titleWrap = false) => {
    const title = titleWrap || document.querySelector('h1.device-details__title');
    if (!title) return;
    const titleName = title.innerText.toLowerCase();
    const convertTitle = titleName.split(' ').join('-');
    return convertTitle;
  },
  getPrice: () => {
    const [totalPriceInfo] = window.dataLayer.filter(data => data.ecommerce && data.ecommerce.detail && data.ecommerce.detail.products && data.ecommerce.detail.products.length);
    const totalPrice = totalPriceInfo.ecommerce.detail.products[0].price;
    return totalPrice;
  },
  conditionFindTotalPrice: () => window.dataLayer && window.dataLayer.filter(data => data.ecommerce && data.ecommerce.detail && data.ecommerce.detail.products && data.ecommerce.detail.products.length).length,
  findUrl: () => {
    const isPhonePdp = window.location.href.match(/handys\/details\/.+/);
    const isExcludeDevice = window.location.href.match(/(router|watch|buds|airpods)/i);
    return isPhonePdp && !isExcludeDevice;
  }
};
function elementClickBehaviour(selector, cdName, trigger) {
  Kameleoon.API.Core.runWhenElementPresent(selector, elements => {
    elements.forEach(element => {
      Kameleoon.API.Utils.addUniversalClickListener(element, () => {
        localData.setSuccesCondition(cdName, trigger);
      });
    });
  });
}
function scrollFairFlatBehaviour(regex, goal = false) {
  const accessUrl = 'https://www.congstar.de/handytarife/fair-flat/';
  if (!window.location.href.includes(accessUrl)) return;
  Kameleoon.API.Core.runWhenElementPresent('.speedometer #segments', ([speedometerWrap]) => {
    let scoreBehaviour = false;
    let isSumScore = false;
    const observ = new MutationObserver(() => {
      const activeTarif = [...speedometerWrap.children].find(el => el.getAttribute('data-test-state') === 'selected');
      const isAccessTarif = activeTarif.querySelector('.segment-text').getAttribute('id').match(regex);
      if (isAccessTarif) {
        isSumScore = true;
      } else {
        if (isSumScore && scoreBehaviour) {
          localData.updateScore(this.cdName, -2);
        }
        isSumScore = false;
      }
      scoreBehaviour = false;
    });
    observ.observe(speedometerWrap, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-test-state']
    });
    Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
      const windowHeight = window.innerHeight;
      window.addEventListener('scroll', () => {
        const btnTop = btn.getBoundingClientRect().top;
        if (btnTop <= windowHeight && isSumScore && !scoreBehaviour) {
          localData.updateScore(this.cdName, 2);
          if (goal) {
            Kameleoon.API.Goals.processConversion(goals[goal]);
          }
          scoreBehaviour = true;
        }
      });
    });
  });
}
function tabOpenBehaviour({
  filt,
  folder,
  maxTab,
  tabActiveFolder,
  goalName,
  dataPath
}) {
  const accessUrls = filt;
  const url = window.location.href;
  const isAccessUrl = accessUrls.filter(regex => url.match(regex));
  if (isAccessUrl.length && (window.history.length === 1 || !document.referrer)) {
    localData.updateVisitedUrl(dataPath, folder, url);
    const data = localData.get(dataPath);
    if (data[folder].length >= maxTab) {
      Kameleoon.API.Goals.processConversion(goals[goalName]);
      localData.successCondition(dataPath, tabActiveFolder);
      localData.removeVisitedrUrl(dataPath, folder);
    }
  } else {
    localData.removeVisitedrUrl(dataPath, folder);
  }
}
class Bestandskunde {
  constructor() {
    this.names = {
      login: true,
      mail: true,
      goalOrder: true,
      app: true
    };
    this.cdName = 'Bestandskunde Segment';
    this.url = window.location.href;
    this.init();
  }
  criteriaOne() {
    const isLogin = Kameleoon.API.CurrentVisit.customData['[AI]Login'];
    if (isLogin) {
      localData.setSuccesCondition(this.cdName, 'login');
    }
  }
  criteriaTwo() {
    const crmLink = 'congstar.de/?utm_source=crm&utm_medium=email';
    const systemMail = 'congstar.de/?utm_source=systemmail&utm_medium=email';
    if (this.url.includes(crmLink) || this.url.includes(systemMail)) {
      localData.setSuccesCondition(this.cdName, 'mail');
    }
  }
  criteriaThree() {
    const goalId = 200517;
    const conversionGoals = Kameleoon.API.CurrentVisit.conversions;
    if (conversionGoals[goalId]) {
      localData.setSuccesCondition(this.cdName, 'goalOrder');
    }
  }
  criteriaFour() {
    const regexCongstarApp = /\/utm_source=app-congstar\//;
    const regexMediumApp = /\/utm_medium=app\//;
    if (regexCongstarApp.test(this.url) && regexMediumApp.test(this.url)) {
      localData.setSuccesCondition(this.cdName, 'app');
    }
  }
  check() {
    return triggerValidate(this.names, this.cdName);
  }
  init() {
    this.criteriaOne();
    this.criteriaTwo();
    this.criteriaThree();
    this.criteriaFour();
  }
}
class GooglePaid {
  constructor() {
    this.names = {
      clickLink: true,
      visitPage: true
    };
    this.cdName = 'Interessent Segment';
    this.init();
  }
  conditionOne() {
    const selectors = ['#c6819287 .btn-primary--service', '#c5768507 a', 'footer .footer-benefit a'];
    Kameleoon.API.Core.runWhenElementPresent('#c6592487[data-tracking-title*="homepage"]', () => {
      selectors.forEach(selector => elementClickBehaviour(selector, this.cdName, 'clickLink'));
    });
  }
  conditionTwo() {
    const visitPage = /https:\/\/www\.congstar\.de\/handytarife(\/?)(\?|#|$|lte-optionen)/;
    if (visitPage.test(window.location.href)) {
      localData.setSuccesCondition(this.cdName, 'visitPage');
    }
  }
  check() {
    return triggerValidate(this.names, this.cdName);
  }
  init() {
    this.conditionOne();
    this.conditionTwo();
  }
}
class GooglePaid$1 {
  constructor() {
    this.names = {
      googleCondition: true
    };
    this.cdName = 'Google Paid Segment';
    this.init();
  }
  conditionOne() {
    const url = window.location.href;
    const googleAdWordsCheckOne = /^.+\.google(\.com?)?\.[^/.]+\/aclk([\?&#].*|)$/;
    const googleAdWordsCheckTwo = /[?&#]gclid=/;
    const googleContentNetzwerk = /(\?gdnid=\d*)(&glid=\w*)?(&lpid=\d*)?(&dclid=.*)?/;
    if (url.match(googleAdWordsCheckOne) || url.match(googleAdWordsCheckTwo) || url.match(googleContentNetzwerk)) {
      localData.setSuccesCondition(this.cdName, 'googleCondition');
    }
  }
  check() {
    return triggerValidate(this.names, this.cdName);
  }
  init() {
    this.conditionOne();
  }
}
class Premium {
  constructor() {
    this.cdName = 'Premium Segment';
    this.maxScoreValue = 6;
    this.init();
  }
  conditionOne() {
    const visitPage = 'https://www.congstar.de/handytarife/allnet-flat-tarife/allnet-flat-l/';
    if (window.location.href.includes(visitPage)) {
      const sumScore = 6;
      localData.updateScore(this.cdName, sumScore);
      Kameleoon.API.Core.runWhenElementPresent('a[data-testid="cart-button"]', ([btn]) => {
        Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
          localData.updateScore(this.cdName, sumScore);
        });
      }, 500);
    }
  }
  conditionTwoBehaviour() {
    const fixedPrice = 800;
    const totalPrice = pdpBehaviour.getPrice();
    const sumScore = 2;
    Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
      const convertTitle = pdpBehaviour.getName();
      const visitedName = 'viewPdp';
      if (!convertTitle) return;
      if (totalPrice >= fixedPrice) {
        localData.updateScoreWithUrl(this.cdName, visitedName, convertTitle, sumScore);
      }
      if (totalPrice <= fixedPrice) {
        Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
          localData.updateScoreWithUrl(this.cdName, visitedName, convertTitle, sumScore);
        });
      }
    });
  }
  conditionTwo() {
    const isPhonePdp = pdpBehaviour.findUrl();
    if (!isPhonePdp) return;
    // eslint-disable-next-line max-len
    Kameleoon.API.Core.runWhenConditionTrue(pdpBehaviour.conditionFindTotalPrice, () => this.conditionTwoBehaviour());
  }
  conditionThree() {
    const chooseTarif = /\/(18gb)\/gi/;
    scrollFairFlatBehaviour.call(this, chooseTarif, '[GG] FF 18 interested');
  }
  conditionFour() {
    const accessUrl = 'https://www.congstar.de/handytarife/fair-flat/';
    if (!window.location.href.includes(accessUrl)) return;
    Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
      Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
        const isActiveTarif = document.querySelector('.speedometer #segments g[data-test-state] g[id="18GB"]');
        const isActiveTarifSelected = isActiveTarif && isActiveTarif.closest('[data-test-state="selected"]');
        if (isActiveTarifSelected) {
          Kameleoon.API.Goals.processConversion(goals['[GG] A2C FF 18 GB']);
          localData.updateScore(this.cdName, 6);
        }
      });
    });
  }
  conditionFive() {
    if (!window.location.href.match(/handytarife\/\w+/)) return;
    const sumScore = 2;
    Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
      const checkboxLTE = document.querySelector('#available-option-2571') || document.querySelector('#available-option-2557') || document.querySelector('.comp-checkbox__input[id="2571"]');
      const checkboxExtraDaten = document.querySelector('#available-option-2568') || document.querySelector('#available-option-2569') || document.querySelector('.comp-checkbox__input[id="2568"]') || document.querySelector('.comp-checkbox__input[id="2569"]');
      const checkBoxVideo = document.querySelector('#available-option-3556') || document.querySelector('.comp-checkbox__input[id="3556"]');
      const checkboxMusic = document.querySelector('#available-option-2424') || document.querySelector('.comp-checkbox__input[id="2424"]');
      Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
        if (checkboxLTE && checkboxLTE.checked) {
          localData.updateScore(this.cdName, sumScore);
        }
        if (checkboxExtraDaten && checkboxExtraDaten.checked) {
          localData.updateScore(this.cdName, sumScore);
        }
        // eslint-disable-next-line no-use-before-define
        checkboxGoalBehaviour(checkboxLTE, checkBoxVideo, checkboxMusic);
      });
    });
    function checkboxGoalBehaviour(...checkboxs) {
      const isActive = checkboxs.some(checkbox => checkbox && checkbox.checked);
      if (isActive) {
        Kameleoon.API.Goals.processConversion(goals['[GG] A2C Options']);
      }
    }
  }
  check() {
    return checkScoreForData(this.cdName, this.maxScoreValue);
  }
  init() {
    this.conditionOne();
    this.conditionTwo();
    this.conditionThree();
    this.conditionFour();
    this.conditionFive();
  }
}
class Schnappchenjager {
  constructor() {
    this.cdName = 'Schnappchenjager Segment';
    this.url = window.location.href;
    this.maxScoreValue = 6;
    this.prepraidSmallTarifUrl = 'https://www.congstar.de/prepaid/prepaid-wie-ich-will/basic-s/';
    this.tarifSmallTraifUrl = 'https://www.congstar.de/handytarife/allnet-flat-tarife/allnet-flat-s/';
    this.tarilLikeIWantUrl = 'https://www.congstar.de/prepaid/prepaid-wie-ich-will/prepaid-karte/';
    this.accessUrl = 'https://www.congstar.de/handytarife/fair-flat/';
    this.cartURL = 'https://www.congstar.de/checkout/warenkorb';
    this.init();
  }
  conditionOne() {
    const sumScore = 6;
    if (this.url.includes(this.prepraidSmallTarifUrl) || this.url.includes(this.tarifSmallTraifUrl)) {
      Kameleoon.API.Core.runWhenElementPresent(`a[data-testid="cart-button"], .configurator-selection__actions button`, ([btn]) => {
        Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
          localData.updateScore(this.cdName, sumScore);
        });
      }, 500);
    } else if (window.location.href.includes(this.accessUrl)) {
      Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
        Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
          const isActiveTarif = document.querySelector('.speedometer #segments g[data-test-state] g[id="5GB"]');
          const isActiveTarifSelected = isActiveTarif && isActiveTarif.closest('[data-test-state="selected"]');
          if (isActiveTarifSelected) {
            localData.updateScore(this.cdName, sumScore);
          }
        });
      });
    } else if (window.location.href.includes(this.cartURL)) {
      const [cartEvent] = window.dataLayer.filter(data => data.ecommerce && data.ecommerce.add && data.ecommerce.add.products && data.ecommerce.add.products);
      cartEvent.ecommerce.add.products.forEach(product => {
        if (product.id === 371 // Prepaid wie ich will (2. Generation) (id: 371)
        || product.id === 2603 // Datenstufe 5 GB" (id: 2603)
        || product.id === 432) {
          // Prepaid ANF M (id=432)
          localData.updateScore(this.cdName, sumScore);
        }
      });
    }
  }
  conditionTwo() {
    if (this.url === this.prepraidSmallTarifUrl || this.url === this.tarifSmallTraifUrl || this.url === this.tarilLikeIWantUrl) {
      const sumScore = 2;
      const listVisitedUrlName = 'tarifUrl';
      localData.updateScoreWithUrl(this.cdName, listVisitedUrlName, this.url, sumScore);
    }
  }
  conditionThree() {
    if (!pdpBehaviour.findUrl()) return;
    const listUrlName = 'visitedPdp';
    const maxSum = 2;
    Kameleoon.API.Core.runWhenConditionTrue(pdpBehaviour.conditionFindTotalPrice, () => {
      Kameleoon.API.Core.runWhenElementPresent('h1.device-details__title', ([titleElem]) => {
        const title = pdpBehaviour.getName(titleElem);
        const price = pdpBehaviour.getPrice();
        const maxPrice = 500;
        if (price <= maxPrice) {
          localData.updateScoreWithUrl(this.cdName, listUrlName, title, maxSum);
        }
      });
    });
  }
  conditionFour() {
    if (!this.url.includes('handys')) return;
    const activeUrls = ['https://www.congstar.de/handys/handy-angebote/', 'https://www.congstar.de/handys/handy-angebote/1-euro-anzahlung/', 'https://www.congstar.de/handys/technik-news-trends/smartphones-unter-400-euro/', 'https://www.congstar.de/handys/gebrauchte-handys/'];
    const isActiveUrl = activeUrls.filter(url => url === this.url).length;
    const maxSum = 2;
    const listHandysViewed = 'handysViewed';
    if (isActiveUrl) {
      Kameleoon.API.Goals.processConversion(goals['[GG] Angebote-Seiten']);
      localData.updateScoreWithUrl(this.cdName, listHandysViewed, this.url, maxSum);
    }
  }
  fiveConditionBehaviour() {
    const maxSum = 2;
    const sortActiveFolder = 'sortName';
    Kameleoon.API.Core.runWhenElementPresent('#sorting', selects => {
      const activeChange = 'priceAsc';
      selects.forEach(select => {
        select.addEventListener('change', () => {
          if (activeChange === select.value) {
            Kameleoon.API.Goals.processConversion(goals['[GG] Sort by Preis aufsteigend']);
            localData.updateScoreWithUrl(this.cdName, sortActiveFolder, activeChange, maxSum);
          }
        });
      });
    });
    Kameleoon.API.Core.runWhenElementPresent('input[name="price"]', inputs => {
      const radioGoalsBehaviour = {
        addScore: id => {
          localData.updateScoreWithUrl(this.cdName, 'rangeSlider', id, 2);
        },
        'radio-price-monthlyPrice': (num, id) => {
          if (num < 20) {
            Kameleoon.API.Goals.processConversion(goals['[GG] Filter monatlicher Preis <20€']);
            this.addScore(id);
          }
        },
        'radio-price-oneTimePrice': (num, id) => {
          if (num < 500) {
            Kameleoon.API.Goals.processConversion(goals['[GG] Click Filter Einmalpreis <500€']);
            this.addScore(id);
          }
        }
      };
      inputs.forEach(input => {
        input.addEventListener('change', () => this.rangeSliderBehaviour(inputs, radioGoalsBehaviour));
      });
      this.rangeSliderBehaviour(inputs, radioGoalsBehaviour);
    });
    this.checkboxFilterBehaviour({
      selector: 'input[value="is_like_new"]',
      visitedPath: sortActiveFolder,
      goal: '[GG] Filter Artikelzustand=neuwertig',
      score: 2
    });
    this.checkboxFilterBehaviour({
      selector: 'input[value="promotion"]',
      visitedPath: sortActiveFolder,
      goal: '[GG] Click filter Nur Aktionsangebote',
      score: 2,
      goalBehaviour: true
    });
  }
  conditionFive() {
    const allPhone = 'https://www.congstar.de/handys/alle-handys/';
    const producerPhone = /\/handys\/\w+\/$\//;
    if (this.url === allPhone || this.url.match(producerPhone)) {
      this.fiveConditionBehaviour();
    }
  }
  rangeSliderBehaviour(inputs, goalOptions) {
    Kameleoon.API.Core.runWhenElementPresent('.range-facet', ([slider]) => {
      const value = document.querySelector('.rz-model-value');
      if (!value) return;
      let oldValue = value.innerText;
      slider.addEventListener('mouseup', () => {
        if (value.innerText !== oldValue) {
          this.rangeSliderGoalBehaviour(inputs, value.innerText, goalOptions);
        }
        oldValue = value.innerText;
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  rangeSliderGoalBehaviour(inputs, value, goalOption) {
    const valueNum = parseInt(value, 10);
    const [currentInput] = inputs.filter(input => input.checked);
    const inputId = currentInput.getAttribute('id');
    if (goalOption[inputId]) goalOption[inputId](valueNum, inputId);
  }
  checkboxFilterBehaviour({
    selector,
    visitedPath,
    goal,
    score,
    goalBehaviour = false
  }) {
    Kameleoon.API.Core.runWhenElementPresent(selector, ([input]) => {
      input.addEventListener('change', () => {
        if (goalBehaviour) {
          Kameleoon.API.Goals.processConversion(goals[goal]);
        } else if (input.checked) {
          Kameleoon.API.Goals.processConversion(goals[goal]);
        }
        if (input.checked) {
          localData.updateScoreWithUrl(this.cdName, visitedPath, selector, score);
        }
      });
    });
  }
  conditionSix() {
    const chooseTarif = /\/(5gb)\/gi\//;
    scrollFairFlatBehaviour.call(this, chooseTarif);
  }
  check() {
    return checkScoreForData(this.cdName, this.maxScoreValue);
  }
  init() {
    this.conditionOne();
    this.conditionTwo();
    this.conditionThree();
    this.conditionFour();
    this.conditionFive();
    this.conditionSix();
  }
}
class Trendsetter {
  constructor() {
    this.url = window.location.href;
    this.cdName = 'Trendsetter Segment';
    this.names = {
      technikNews: true,
      neuePhone: true
    };
    this.init();
  }
  conditionOne() {
    const accessUrl = 'https://www.congstar.de/handys/technik-news-trends/';
    if (this.url === accessUrl) {
      localData.setSuccesCondition(this.cdName, 'technikNews');
    }
  }
  conditionTwo() {
    const accessUrl = 'https://www.congstar.de/handys/neue-handys-und-smartphones/';
    if (this.url === accessUrl) {
      localData.setSuccesCondition(this.cdName, 'neuePhone');
    }
  }
  check() {
    return triggerValidate(this.names, this.cdName);
  }
  init() {
    this.conditionOne();
    this.conditionTwo();
  }
}
class Unentschieden {
  constructor() {
    this.cdName = 'Unentschieden Tarif Segment';
    this.goalCdName = 'Perso Segments Goals';
    this.url = window.location.href;
    this.names = ['tarifPlanPage', 'tarifTimePage', 'tarifCurrentPage', 'tarifWithIcon', 'tarifTabBehaviour'];
    this.init();
  }
  conditionOne() {
    const isTarifPage = /\/(handytarife|prepaid)\/\w+\//;
    if (isTarifPage.test(this.url)) {
      const pathName = 'tarifPage';
      const isUser = localData.usedUrl(this.cdName, pathName, this.url);
      if (isUser) return;
      localData.updateVisitedUrl(this.cdName, pathName, this.url);
      const data = localData.get(this.cdName);
      if (data[pathName] && data[pathName].length > 3) {
        localData.successCondition(this.cdName, 'tarifPlanPage');
      }
    }
  }
  conditionTwo() {
    const tarifPrepaid = /\/prepaid\/\w+\//;
    const tarifHandy = /\/handytarife\/\w+\//;
    if (tarifPrepaid.test(this.url) || tarifHandy.test(this.url)) {
      const usedGoal = localData.get(this.goalCdName).tarifTimePage;
      if (usedGoal) return;
      const calcTime = 1180 * 60 * 3;
      const dateStart = Date.now();
      const dateEnd = dateStart + calcTime;
      const timerId = setInterval(() => {
        if (dateEnd <= Date.now()) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Time spent >3,6 Min Tarifseiten']);
          localData.successCondition(this.goalCdName, 'tarifTimePage');
          localData.successCondition(this.cdName, 'tarifTimePage');
          clearInterval(timerId);
        }
      }, 1000 * 5);
    }
  }
  conditionThree() {
    const smartphoneTarifeUrl = 'https://www.congstar.de/handytarife/smartphone-tarife-im-vergleich/';
    const prepaiTarifedUrl = 'https://www.congstar.de/prepaid/prepaid-tarife-vergleich/';
    if (smartphoneTarifeUrl === this.url || prepaiTarifedUrl === this.url) {
      localData.successCondition(this.cdName, 'tarifCurrentPage');
    }
  }
  conditionFour() {
    const accessUrl = 'https://www.congstar.de/handytarife/smartphone-tarife-im-vergleich';
    if (!this.url.includes(accessUrl)) return;
    const options = {
      'allnet-flat': {
        selector: '.btn-primary--postpaid[href*="allnet-flat"]',
        selectorMobile: ['#c6857464', '#c6857304', '#c6857144'],
        maxVisited: 2,
        list: [],
        goalActive: false
      },
      'prepaid-allnet': {
        selector: '.btn-primary--prepaid[href*="prepaid-wie-ich-will"]',
        selectorMobile: ['#c6859664', '#c6859344', '#c6859024', '#c6858764'],
        maxVisited: 3,
        list: [],
        goalActive: false
      },
      datentarife: {
        selector: '.btn-primary--postpaid[href*="datentarife/daten"]',
        selectorMobile: ['#c6861124', '#c6860824', '#c6860524'],
        maxVisited: 2,
        list: [],
        goalActive: false
      }
    };
    function clickTarifBehaviour(btn, maxVisited, key, id) {
      Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
        const isUsedId = options[key].list.filter(elementId => elementId === id).length;
        if (isUsedId) return;
        options[key].list.push(id);
        if (options[key].list.length >= maxVisited && !options[key].goalActive) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Starttext clicked in one level']);
          options[key].goalActive = true;
          localData.successCondition(this.cdName, 'tarifWithIcon');
        }
      });
    }
    function btnsTarifBehaviour({
      selector,
      maxVisited
    }, key) {
      Kameleoon.API.Core.runWhenElementPresent(selector, btns => {
        btns.forEach(btn => {
          const btnId = btn.closest('[id]');
          const icons = [...btnId.querySelectorAll('.footnote__icon')];
          if (!icons.length) return;
          icons.forEach(iconWrap => {
            const clickBorder = iconWrap.closest('td');
            if (!clickBorder) return;
            const productId = btnId.getAttribute('id');
            clickTarifBehaviour.call(this, clickBorder, maxVisited, key, productId);
          });
        });
      });
    }
    function mobileBtnBehaviour({
      selectorMobile,
      maxVisited
    }, key) {
      selectorMobile.forEach(selector => {
        Kameleoon.API.Core.runWhenElementPresent(selector, ([product]) => {
          const icons = [...product.querySelectorAll('.footnote__icon')];
          const productId = product.getAttribute('id');
          icons.forEach(icon => {
            const iconWrapper = icon.closest('li') || icon.closest('div.ce-text');
            if (!iconWrapper) return;
            clickTarifBehaviour.call(this, iconWrapper, maxVisited, key, productId);
          });
        });
      });
    }

    // eslint-disable-next-line guard-for-in
    for (const key in options) {
      btnsTarifBehaviour.call(this, options[key], key);
      mobileBtnBehaviour.call(this, options[key], key);
    }
  }
  conditionFive() {
    if (!/handytarife|prepaid/.test(window.location.href)) return;
    tabOpenBehaviour({
      filt: [/fair-flat\/$/, /handytarife\/$/, /handytarife\/allnet-flat-(l|m|s)\/$/, /\/prepaid\//],
      dataPath: this.cdName,
      goalName: '',
      folder: 'tarifTabNavigation',
      tabActiveFolder: 'tarifTabBehaviour',
      maxTab: 3
    });
    tabOpenBehaviour({
      filt: [/handytarife\//],
      dataPath: this.goalCdName,
      goalName: '[GG] >3 tabs open with plan-related content',
      folder: 'foldForGoalTabTarif',
      tabActiveFolder: 'foldForGoalTabTarifActive',
      maxTab: 3
    });
  }
  check() {
    const data = localData.get(this.cdName);
    const isActiveSegment = this.names.some(name => data[name]);
    return isActiveSegment ? this.cdName : false;
  }
  init() {
    this.conditionOne();
    this.conditionTwo();
    this.conditionThree();
    this.conditionFour();
    this.conditionFive();
  }
}
class UnentschiedenSmartphone {
  constructor() {
    this.cdName = 'Unentschieden Smartphone Segment';
    this.names = ['phoneTime', 'phonePage', 'phoneTabClick', 'phoneTabActive'];
    this.url = window.location.href;
    this.goalCdName = 'Perso Segments Goals';
    this.init();
  }
  conditionOne() {
    const isActiveUrl = 'https://www.congstar.de/handys/';
    if (!this.url.includes(isActiveUrl)) return;
    const threMins = 180;
    const startValue = 1;
    const isUsedGoal = localData.get(this.goalCdName).phoneTime;
    if (isUsedGoal) return;
    function comparingTime({
      threeMins,
      timeBehaviour
    }, timerId) {
      if (timeBehaviour >= threeMins) {
        Kameleoon.API.Goals.processConversion(goals['[GG] Time spent >3 Min Handyseiten']);
        localData.successCondition(this.cdName, 'phoneTime');
        localData.successCondition(this.goalCdName, 'phoneTime');
        clearInterval(timerId);
      }
    }
    const timerId = setInterval(() => {
      const data = localData.get(this.goalCdName);
      const value = data.timeBehaviour || startValue;
      localData.set(this.goalCdName, {
        ...data,
        timeBehaviour: value + 1,
        threMins
      });
      comparingTime.call(this, localData.get(this.goalCdName), timerId);
    }, 1000 * 1);
  }
  conditionTwo() {
    const isPhonePage = 'https://www.congstar.de/handys/';
    const isExcludeDevice = window.location.href.match(/(router|watch|buds|airpods)/i);
    if (!this.url.includes(isPhonePage) || isExcludeDevice) return;
    const phoneUrlsFolder = 'phonePageUrls';
    localData.updateVisitedUrl(this.cdName, phoneUrlsFolder, this.url);
    const data = localData.get(this.cdName);
    const usedGoal = localData.get(this.goalCdName).phonePdpPage;
    if (data[phoneUrlsFolder] && data[phoneUrlsFolder].length > 3 && !usedGoal) {
      localData.successCondition(this.cdName, 'phonePdpPage');
      localData.successCondition(this.goalCdName, 'phonePage');
      localData.removeVisitedrUrl(this.cdName, phoneUrlsFolder);
      Kameleoon.API.Goals.processConversion(goals['[GG] > 3 smartphone pages']);
    }
  }
  conditionThree() {
    const isPhonePage = 'https://www.congstar.de/handys/details/';
    if (!this.url.includes(isPhonePage)) return;
    let count = 0;
    const triggerCount = 3;
    let isActiveGoal = false;
    Kameleoon.API.Core.runWhenElementPresent('.device-detail-tab__title', tabTitles => {
      tabTitles.forEach(tabTitle => {
        Kameleoon.API.Utils.addUniversalClickListener(tabTitle, () => {
          count += 1;
          if (count >= triggerCount && !isActiveGoal) {
            isActiveGoal = true;
            localData.successCondition(this.cdName, 'phoneTabClick');
            Kameleoon.API.Goals.processConversion(goals['[GG] Extensive clicks tabs Handyseiten']);
          }
        });
      });
    });
  }
  conditionFour() {
    tabOpenBehaviour({
      filt: [/handys\//],
      dataPath: this.cdName,
      goalName: '[GG] >3 tabs open with handy-related content',
      folder: 'phoneTabUrls',
      tabActiveFolder: 'phoneTabActive',
      maxTab: 3
    });
  }
  check() {
    const data = localData.get(this.cdName);
    const isActiveSegment = this.names.some(name => data[name]);
    return isActiveSegment ? this.cdName : false;
  }
  init() {
    this.conditionOne();
    this.conditionTwo();
    this.conditionThree();
    this.conditionFour();
  }
}
const goalPdpPhoneBehaviour = () => {
  const isPhoneUrl = pdpBehaviour.findUrl();
  if (!isPhoneUrl) return;
  Kameleoon.API.Core.runWhenConditionTrue(pdpBehaviour.conditionFindTotalPrice, () => {
    Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
      const price = pdpBehaviour.getPrice();
      const name = pdpBehaviour.getName();
      const usedPhone900 = localData.usedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate900', name);
      const usedPhone500 = localData.usedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate500', name);
      if (price >= 900 && !usedPhone900) {
        Kameleoon.API.Goals.processConversion(goals['[GG] Smartphone pages >=900€']);
        localData.updateVisitedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate900', name);
      }
      if (price < 500 && !usedPhone500) {
        Kameleoon.API.Goals.processConversion(goals['[GG] Smartphone pages <500€']);
        localData.updateVisitedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate500', name);
      }
      Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
        if (price <= 900 && !usedPhone900) {
          Kameleoon.API.Goals.processConversion(goals['[GG] Smartphone pages >=900€']);
          localData.updateVisitedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate900', name);
        }
      });
    });
  });
};
const intiPersoSegmnets = () => {
  const isNewVisit = Kameleoon.API.CurrentVisit.pageViews === 1;
  if (isNewVisit) {
    localStorage.removeItem('Perso Segments Goals');
  }
  let isActiveSegments = false;
  const options = {
    groupOne: {
      group: [new Bestandskunde().check(), new GooglePaid().check()],
      prefer: 'Bestandskunde Segment'
    },
    groupTwo: {
      group: [new Schnappchenjager().check(), new Premium().check()],
      prefer: ''
    },
    groupThree: {
      group: [new Unentschieden().check(), new UnentschiedenSmartphone().check()],
      prefer: ''
    },
    groupFour: {
      group: [new Trendsetter().check()],
      prefer: ''
    },
    groupFive: {
      group: [new GooglePaid$1().check(), new GooglePaid$1().check()],
      prefer: 'Google Paid Segment'
    }
  };
  function preferSegmentBehaviour({
    group,
    prefer
  }) {
    const activeSegments = group.filter(segment => segment);
    if (!activeSegments.length) return;
    isActiveSegments = true;
    const isPreferSegment = activeSegments.find(segment => segment === prefer);
    if (isPreferSegment) {
      Kameleoon.API.Data.setCustomData(prefer, true);
    } else {
      Kameleoon.API.Data.setCustomData(activeSegments[0], true);
    }
  }
  function removeOldSegment(segments, oldSegment, groupName) {
    const data = localData.get('Group Segment Behaviour');
    const choosedSegment = segments.filter(segment => segment === oldSegment);
    const futureSegment = segments.filter(segment => segment !== oldSegment);
    localData.set('Group Segment Behaviour', {
      ...data,
      [groupName]: futureSegment[0]
    });
    Kameleoon.API.Data.resetCustomData(choosedSegment[0]);
    localStorage.removeItem(choosedSegment[0]);
    Kameleoon.API.Data.setCustomData(futureSegment[0], true);
  }
  function chooseSegment({
    group
  }, key) {
    const activeSegments = group.filter(segment => segment);
    if (activeSegments.length) {
      isActiveSegments = true;
      const data = localData.get('Group Segment Behaviour');
      if (data[key] && activeSegments.length > 1) {
        removeOldSegment(activeSegments, data[key], key);
      } else {
        localData.set('Group Segment Behaviour', {
          ...data,
          [key]: activeSegments[0]
        });
        Kameleoon.API.Data.setCustomData(activeSegments[0], true);
      }
    }
  }
  for (const groupName in options) {
    if (options[groupName].prefer) {
      preferSegmentBehaviour(options[groupName]);
    } else {
      chooseSegment(options[groupName], groupName);
    }
  }
  if (!isActiveSegments) {
    Kameleoon.API.Data.setCustomData('Unbekannt Segment', true);
  } else {
    Kameleoon.API.Data.resetCustomData('Unbekannt Segment');
  }
  goalPdpPhoneBehaviour();
};
const globalPersoSegment = () => {
  intiPersoSegmnets();
};
const globalGoalsForSegments = () => {
  const goals = {
    '[GG] Order Prepaid L': 272886,
    '[GG] Order Prepaid M': 272887,
    '[GG] Order Prepaid S': 272888,
    '[GG] Order Prepaid Wie ich will': 272889,
    '[GG] Order Prepaid all': 272890,
    '[GG] FairFlat all': 272942,
    '[GG] Order FF 5 GB': 272943,
    '[GG] Order FF 8 GB': 272944,
    '[GG] Order FF 12 GB': 272945,
    '[GG] Order FF 18 GB': 272947,
    '[GG] Phone > 900€ Order and Revenue': 272891,
    '[GG] Phone < 500€ Order and Revenue': 272892,
    '[GG] Phone 500€ - 900€ Order and Revenue': 272893,
    '[GG] Phone Order': 223344
  };
  const selectors = {
    btnPdp: 'button.btn-icon.btn-icon--large.btn-icon--block.btn-icon--dark'
  };
  const addToCartEventName = 'ee.addToCart';
  const orderEventName = 'checkout.purchase';
  const idsTarif = [367, 366, 365, 371, 420];
  const LOCAL_NAME_IDS_PRODUCT = 'Kameleoon-global-goals-for-segments';
  const LOCAL_NAME_PHONES = 'Kameleoon-global-goals-for-segments-add-basket-phone';
  const LOCAL_NAME_PRODUCTS = 'Kameleoon-global-goals-for-segments-add-basket';
  const isProducts = Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT) ? Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT) : [];
  const products = Kameleoon.API.Data.readLocalData(LOCAL_NAME_PRODUCTS) ? Kameleoon.API.Data.readLocalData(LOCAL_NAME_PRODUCTS) : [];
  const urlExclude = /(router|minirouter|watch|buds|airpods|ipad|airtag|homepod|fritzbox|tab)/i;
  const PhoneUrl = () => {
    const isPhonePdp = window.location.href.match(/handys\/details\/.+/);
    const isExcludeDevice = window.location.href.match(urlExclude);
    return isPhonePdp && !isExcludeDevice;
  };
  const findTarif = arr => arr.find(it => idsTarif.some(id => id === it.id));
  const findPhoneId = (arr, ids) => arr.find(it => ids.some(id => id === it.id));
  const findEvent = eventName => {
    const eventRegExp = new RegExp(`${eventName}`);
    return dataLayer.find(item => item.event && item.event.match(eventRegExp));
  };
  const getPhones = (arr, ids) => arr.find(product => ids.some(id => product.id === id));
  const getPrice = (arr, id) => arr.find(product => product.id === id);
  const writeProduct = product => {
    isProducts.push(product.id);
    products.push(product);
    Kameleoon.API.Data.writeLocalData(LOCAL_NAME_IDS_PRODUCT, isProducts, true);
    Kameleoon.API.Data.writeLocalData(LOCAL_NAME_PRODUCTS, products, true);
  };
  const findeProduct = () => {
    Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer && window.dataLayer.find(it => it.productItem), () => {
      const product = window.dataLayer.find(it => it.productItem);
      product && writeProduct(product.productItem);
    });
  };
  const goalsTarif = {
    367: goals['[GG] Order Prepaid L'],
    366: goals['[GG] Order Prepaid M'],
    365: goals['[GG] Order Prepaid S'],
    371: goals['[GG] Order Prepaid Wie ich will'],
    420: {
      5: goals['[GG] Order FF 5 GB'],
      8: goals['[GG] Order FF 8 GB'],
      12: goals['[GG] Order FF 12 GB'],
      18: goals['[GG] Order FF 18 GB'],
      all: goals['[GG] FairFlat all']
    }
  };
  const phoneFireGoal = (productsInfo, phones) => {
    const {
      productOnetimePrice
    } = getPrice(productsInfo, phones.id);
    Kameleoon.API.Goals.processConversion(goals['[GG] Phone Order']);
    if (productOnetimePrice) {
      if (+productOnetimePrice >= 900) {
        Kameleoon.API.Goals.processConversion(goals['[GG] Phone > 900€ Order and Revenue'], +productOnetimePrice);
      }
      if (+productOnetimePrice <= 500) {
        Kameleoon.API.Goals.processConversion(goals['[GG] Phone < 500€ Order and Revenue'], +productOnetimePrice);
      }
      if (+productOnetimePrice >= 501 && +productOnetimePrice <= 899) {
        // eslint-disable-next-line max-len
        Kameleoon.API.Goals.processConversion(goals['[GG] Phone 500€ - 900€ Order and Revenue'], +productOnetimePrice);
      }
    }
  };
  const tarifFireGoal = (gb, price) => {
    // eslint-disable-next-line default-case
    switch (gb) {
      case 'Datenstufe5GB':
        Kameleoon.API.Goals.processConversion(goalsTarif[420][5], price * 18);
        break;
      case 'Datenstufe8GB':
        Kameleoon.API.Goals.processConversion(goalsTarif[420][8], price * 18);
        break;
      case 'Datenstufe12GB':
        Kameleoon.API.Goals.processConversion(goalsTarif[420][12], price * 18);
        break;
      case 'Datenstufe18GB':
        Kameleoon.API.Goals.processConversion(goalsTarif[420][18], price * 18);
        break;
    }
  };
  if (PhoneUrl()) {
    Kameleoon.API.Utils.addUniversalClickListener(document, ({
      target
    }) => {
      if (target.closest(selectors.btnPdp)) {
        findeProduct();
      }
    });
  }
  if (/checkout\/warenkorb/.test(window.location.href)) {
    Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer && findEvent(addToCartEventName), () => {
      const addToCartProducts = findEvent(addToCartEventName);
      const addProducts = addToCartProducts.ecommerce.add.products;
      const ids = Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT);
      if (ids && ids.length) {
        const isPhone = findPhoneId(addProducts, ids);
        if (isPhone) {
          let productsPhones = [isPhone];
          if (Kameleoon.API.Data.readLocalData(LOCAL_NAME_PHONES)) {
            productsPhones = [...Kameleoon.API.Data.readLocalData(LOCAL_NAME_PHONES), isPhone];
            Kameleoon.API.Data.writeLocalData(LOCAL_NAME_PHONES, productsPhones, true);
            return;
          }
          Kameleoon.API.Data.writeLocalData(LOCAL_NAME_PHONES, productsPhones, true);
        }
      }
    });
  }
  if (/checkout/.test(window.location.href)) {
    Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer && findEvent(orderEventName), () => {
      const orderProducts = findEvent(orderEventName).transactionProducts;
      const ids = Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT);
      const productsInfo = Kameleoon.API.Data.readLocalData(LOCAL_NAME_PRODUCTS);
      const isTarif = orderProducts.some(product => product.category === 'prepaid' || product.category === 'postpaid');
      if (ids && ids.length) {
        const phones = getPhones(orderProducts, ids);
        if (phones && productsInfo && productsInfo.length) {
          phoneFireGoal(productsInfo, phones);
        }
      }
      if (isTarif) {
        const tarif = findTarif(orderProducts);
        const tarifOptions = orderProducts.find(product => (product.category === 'prepaid' || product.category === 'postpaid') && product.id !== 420);
        if (tarif && tarifOptions) {
          const {
            price,
            name
          } = tarifOptions;
          if (tarif.id === 420) {
            tarifFireGoal(name, price);
            Kameleoon.API.Goals.processConversion(goalsTarif[420].all, price * 18);
            return;
          }
          const finelyPrice = tarif.id === 371 ? 10 * 15 : price * 15;
          Kameleoon.API.Goals.processConversion(goals['[GG] Order Prepaid all'], finelyPrice);
          Kameleoon.API.Goals.processConversion(goalsTarif[tarif.id], finelyPrice);
        }
      }
    });
  }
};
const globalSegmentsRemarketingAndReach = () => {
  if (Kameleoon.API.CurrentVisit.landingPageURL.indexOf('DIS-RM') !== -1) {
    Kameleoon.API.Data.setCustomData('Remarketing Segment', true);
  }
  if (Kameleoon.API.CurrentVisit.landingPageURL.indexOf('DIS-R&') !== -1) {
    Kameleoon.API.Data.setCustomData('Reach Segment', true);
  }
};
const T23SchnappchenjagerCase2 = () => {
  const goals = {
    '[GG] A2C Smartphone': 277228
  };
  const fireGoal = name => Kameleoon.API.Goals.processConversion(goals[name]);
  const excludeDevice = /(router|watch|buds|airpods|galaxy tab|airtag|homepod|fritz!box)/i;
  if (window.location.href.match(/\/checkout\/warenkorb\/?(\?|#|$)/)) {
    Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer.find(item => item && item.event === 'ee.addToCart' && item.ecommerce && item.ecommerce.add && item.ecommerce.add.products), () => {
      const data = window.dataLayer.find(item => item.event === 'ee.addToCart');
      const {
        products
      } = data.ecommerce.add;
      const device = products.find(product => product.category === 'Endgerät');
      if (device && !excludeDevice.test(device.name)) fireGoal('[GG] A2C Smartphone');
    }, 200);
  }
};
const T21UmbennenWerbenVerdienen = () => {
  const goals = {
    '[T21] Klick auf Jetzt empfehlen CTA': 287760
  };
  if (document.location.pathname === '/for-friends') {
    Kameleoon.API.Core.runWhenElementPresent('a[href="/for-friends/#login"]', ([element]) => {
      element.addEventListener('click', () => {
        Kameleoon.API.Goals.processConversion(goals['[T21] Klick auf Jetzt empfehlen CTA']);
      });
    });
  }
};
const P09ReduktionBSPAllnetMundL = () => {
  const goals = {
    '[GG|P09] Order and Revenue M or L': 291351
  };
  if (/\/checkout\/bestaetigung\/?(\?|#|$)/.test(window.location.href)) {
    Kameleoon.API.Core.runWhenConditionTrue(() => {
      var _window$dataLayer;
      return window.dataLayer && ((_window$dataLayer = window.dataLayer) === null || _window$dataLayer === void 0 ? void 0 : _window$dataLayer.some(item => item.transactionProducts));
    }, () => {
      const {
        transactionProducts
      } = window.dataLayer.find(item => item.transactionProducts);
      transactionProducts.forEach(product => {
        const revenue = product.productMonthlyPrice * 24;
        if (product.name.includes('AllnetFlatM') || product.name.includes('AllnetFlatL')) {
          Kameleoon.API.Goals.processConversion(goals['[T13] Order and Revenue M + L'], revenue);
        }
      });
    });
  }
};
const T15GlueckwunschbannerWK2Iteration = () => {
  const goals = {
    '[T15] Access Persönliche Daten': 293485
  };
  if (document.location.pathname.includes('/checkout/persoenliche-daten')) {
    Kameleoon.API.Goals.processConversion(goals['[T15] Access Persönliche Daten']);
  }
};
globalGoals();
globalMultiCookieSetup();
globlaAiSetup();
globalPersoSegment();
globalGoalsForSegments();
globalSegmentsRemarketingAndReach();
T23SchnappchenjagerCase2();
T21UmbennenWerbenVerdienen();
P09ReduktionBSPAllnetMundL();
T15GlueckwunschbannerWK2Iteration();