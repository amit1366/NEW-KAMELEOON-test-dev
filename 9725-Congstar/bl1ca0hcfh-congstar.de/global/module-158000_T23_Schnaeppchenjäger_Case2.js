export const T23SchnappchenjagerCase2 = () => {
    const goals = {
        '[GG] A2C Smartphone': 277228,
    };
    const fireGoal = (name) => Kameleoon.API.Goals.processConversion(goals[name]);

    const excludeDevice = /(router|watch|buds|airpods|galaxy tab|airtag|homepod|fritz!box)/i;

    if (window.location.href.match(/\/checkout\/warenkorb\/?(\?|#|$)/)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => window.dataLayer.find((item) => item && item.event === 'ee.addToCart'
                && item.ecommerce && item.ecommerce.add && item.ecommerce.add.products),
            () => {
                const data = window.dataLayer.find((item) => item.event === 'ee.addToCart');
                const { products } = data.ecommerce.add;
                const device = products.find((product) => product.category === 'Endgerät');
                if (device && !excludeDevice.test(device.name)) fireGoal('[GG] A2C Smartphone');
            },
            200
        );
    }
};
