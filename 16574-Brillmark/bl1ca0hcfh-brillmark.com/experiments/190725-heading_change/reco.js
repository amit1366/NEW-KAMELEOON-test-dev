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
                    isFlyoutWidget: false,
                    isTeaserWidget: false,
                    fallbackData: null,
                    options: {
                        id: '6',
                        emcs1: 'Econda Cross Sell Add2Cart Layer',
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