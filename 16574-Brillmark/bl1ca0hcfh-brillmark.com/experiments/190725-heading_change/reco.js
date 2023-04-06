/* eslint-disable */
export const getReco = (productId) => {
    require(['ui/base', 'nm/appbase', 'nm/checkout'], function () {
        require([
            'dojo/query',
            'nm/recommendation/econda/EcondaCrossSellService',
            'nm/recommendation/RecommendationComponent',
            'dojo/domReady!',
        ], function (query, EcondaCrossSellService, RecommendationComponent) {
            var recoService = new EcondaCrossSellService({
                crosssellAccountId: '00002a55-7284ccea-a290-3209-8e27-e425f96982d5-1',
            });
            query('#kam-add2cart-off_canvas-reco').forEach(function (elmt) {
                new RecommendationComponent({
                    element: elmt,
                    recommendationService: recoService,
                    isFlyoutWidget: true,
                    isTeaserWidget: false,
                    fallbackData: null,
                    options: {
                        id: '5',
                        emcs1: 'Econda Cross Sell WK_OC',
                        emcs2: `${productId}`,
                        context: {
                            products: [{ id: `${productId}` }],
                        },
                    },
                });
            });
        });
    });
};


export const getRecoCart = (productcartId) => {
    require(['ui/base', 'nm/appbase', 'nm/checkout'], function () {
        require([
            'dojo/query',
            'nm/recommendation/econda/EcondaCrossSellService',
            'nm/recommendation/RecommendationComponent',
            'dojo/domReady!',
        ], function (query, EcondaCrossSellService, RecommendationComponent) {
            var recoService = new EcondaCrossSellService({
                crosssellAccountId: '00002a55-7284ccea-a290-3209-8e27-e425f96982d5-1',
            });
            query('#kam-add2cart-off_canvas-reco').forEach(function (elmt) {
                new RecommendationComponent({
                    element: elmt,
                    recommendationService: recoService,
                    isFlyoutWidget: false,
                    isTeaserWidget: false,
                    fallbackData: null,
                    options: {
                        id: '5',
                        emcs1: 'Econda Cross Sell WK_OC',
                        emcs2: `${productcartId}`,
                        context: {
                            products: [{ id: `${productcartId}` }],
                        },
                    },
                });
            });
        });
    });
};