export default (function () {

    const goals = {
        '[T01] AddToBasket relevant products': 200367,
        '[T01] Order relevant products': 200368
    }

    class BuildData {
        constructor() {
            this.state = JSON.parse(localStorage.getItem('kamdevState'))
            this.timer = new Date();

            this.checkPage()
        }

        checkPage() {

            Kameleoon.API.Core.runWhenConditionTrue(
                () => dataLayer && dataLayer.some(el => el.pageStep && el.pageStep.match(/handydetails|tarifauswahl/)),
                () => {

                    let { pageStep } = dataLayer.find(el => el.pageStep);
                    let typeTile = pageStep === 'handydetails' ? 'device' : pageStep === 'tarifauswahl' && location.pathname.match(/handytarife/) ? 'plan' : ''

                    if (typeTile) {
                        this.findTiles(typeTile)
                    }

                }
            )
        }

        async findTiles(action) {

            const data = {}
            let currentProductPV;

            switch (action) {
                case 'plan':

                    let planName = dataLayer && dataLayer.find(el => el.productItem) && dataLayer.find(el => el.productItem).productItem && dataLayer.find(el => el.productItem).productItem.name;
                    if (!planName) return

                    currentProductPV = this.state && this.state.plan && this.state.plan.filter(obj => obj.plan_name === planName).length && this.state.plan.filter(obj => obj.plan_name === planName)[0].pv;

                    data.plan_name = planName;

                    break;

                case 'device':

                    let deviceID = dataLayer.find(el => el.productItem) && dataLayer.find(el => el.productItem).productItem.id
                    if (!deviceID) return

                    try {
                        let deviceGroupResp = await fetch('https://www.congstar.de/data-feed/kameleoon-device-groups.json')
                        let deviceGroupJson = await deviceGroupResp.json()

                        let deviceGroup = deviceGroupJson.filter(item => item.devices && item.devices.some(id => id === deviceID)).length && deviceGroupJson.filter(item => item.devices && item.devices.some(id => id === deviceID))[0].itemGroupId

                        currentProductPV = this.state && this.state.device && this.state.device.filter(obj => obj.deviceGroup == deviceGroup).length && this.state.device.filter(obj => obj.deviceGroup == deviceGroup)[0].pv;

                        data.deviceID = deviceID;
                        data.deviceGroup = deviceGroup

                    } catch (error) {
                        throw error;
                    }

                    break;
            }


            window.addEventListener('beforeunload', () => {
                let currenTime = new Date() - this.timer;

                let views = (currentProductPV && currentProductPV.views) ? ++currentProductPV.views : 1;
                let time = (currentProductPV && currentProductPV.time) ? currentProductPV.time + currenTime : currenTime;
                data.pv = { views, time };

                this.setState(action, data);
            })

        }

        setState(action, data) {

            if (this.state && this.state[action]) {

                if (this.state[action].some(el => action === 'plan' ? el.plan_name === data.plan_name : el.deviceGroup === data.deviceGroup)) {
                    this.state[action] = [...this.state[action].filter(el => action === 'plan' ? el.plan_name !== data.plan_name : el.deviceGroup !== data.deviceGroup), data]
                } else {
                    this.state[action] = [...this.state[action], data]
                }

            } else {
                this.state = { ...this.state, [action]: [data] }
            }

            localStorage.setItem('kamdevState', JSON.stringify(this.state))
        }
    }
    new BuildData()


    if (window.location.href.match('/checkout')) {
        waitCheckoutEvents('warenkorb', 'addToCart', addToCart);
        waitCheckoutEvents('bestaetigung', 'checkout.purchase', order);
    }

    function waitCheckoutEvents(pageName, eventName, callback) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => window.location.href.match(`/checkout/${pageName}`)
                && dataLayer && dataLayer.filter(item => item.event && item.event.match(eventName)).length, callback
        )
    }

    function addToCart() {

        const eventAddToCart = dataLayer.filter(item => item.event && item.event.match('addToCart'))[0];
        if (eventAddToCart && eventAddToCart.ecommerce && eventAddToCart.ecommerce.add && eventAddToCart.ecommerce.add.products) {
            const prodList = eventAddToCart.ecommerce.add.products;

            if (localStorage.getItem('kam-actual-viewed-products')) {
                const actualProdList = localStorage.getItem('kam-actual-viewed-products');
                if (prodList.some(item => actualProdList.includes(item.id))) {
                    Kameleoon.API.Goals.processConversion(goals['[T01] AddToBasket relevant products']);
                }
            }

        }
    }

    function order() {
        const eventOrder = dataLayer.filter(item => item.event && item.event.match('checkout.purchase'))[0];
        if (eventOrder) {
            let revenue = '0.00';
            let quantityMonth = 24;
            if (eventOrder.transactionProducts) {
                const existFairFlatProd = eventOrder.transactionProducts.filter(item => item.name && item.name.match('FairFlat'));
                if (existFairFlatProd.length) quantityMonth = 18;
            }
            if (eventOrder.orderTotalOnetimePrice && eventOrder.orderTotalMonthlyPrice) {
                revenue = +eventOrder.orderTotalOnetimePrice + +eventOrder.orderTotalMonthlyPrice * quantityMonth;
            }
            if (eventOrder.transactionProducts && localStorage.getItem('kam-actual-viewed-products')) {
                const prodList = eventOrder.transactionProducts;
                const actualProdList = localStorage.getItem('kam-actual-viewed-products');

                if (prodList.some(item => actualProdList.includes(item.id))) {
                    Kameleoon.API.Goals.processConversion(goals['[T01] Order relevant products'], revenue);
                }
            }
        }
    }

}());