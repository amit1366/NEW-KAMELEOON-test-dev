((clb) => {
    const { pathname, search, hash } = document.location;
    if (!pathname.includes('/handys/details/') && pathname.includes('/geraete/')) return;
    const decodeSearch = decodeURI(search);
    const [, , , device, variant] = pathname.split('/');
    const [, memorySize, color] = variant.match(/(\d+).*-([a-zA-Z]+)-(.*)/) || ['', '', ''];
    const paymentMode = hash.includes('Einmalzahlung') ? 'onetime' : 'monthly-installment';
    const searchRgxArr = [
        {
            name: 'planId',
            rgx: /(?:.*\[planId\]=)(\d+)/,
        },
        {
            name: 'planOptionIds',
            rgx: /(?:.*\[planOptionIds\]=)([\d,]+)/,
        },
        {
            name: 'simCardType',
            rgx: /(?:.*\[simCardType\]=)(\w+)/,
        },
    ];
    const permSearchArr = [{
        name: 'color',
        val: color,
    }, {
        name: 'memorySize',
        val: `${memorySize}+GB`,
    }, {
        name: 'paymentMode',
        val: paymentMode,
    }];

    const permReducer = (acc, {
        val,
        name,
    }) => {
        if (val) return `${acc}${acc.length === 1 ? '' : '&'}${name}=${val}`;
        return acc;
    };

    const optionalReducer = (acc, { rgx, name }) => {
        const val = decodeSearch.match(rgx)?.[1];
        if (val) return `${acc}&${name}=${val}`;
        return acc;
    };

    const permSearch = permSearchArr.reduce(permReducer, '?');
    const optionalSearch = searchRgxArr.reduce(optionalReducer, '');
    const newPathname = `/geraete/${device.split('-')[0]}/${device}/`;
    clb(`${newPathname}${permSearch}${optionalSearch}`);
})(Kameleoon.API.Core.processRedirect);
