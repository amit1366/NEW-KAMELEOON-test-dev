export const goals = {
    'Click Banner iPhone 11': 218642,
    'Click Banner Huawei P30 lite': 218643,
    'Click Banner SAM Galaxy A51': 218644,
    'Click Banner iPhone 12 Pro Max': 218645,
    'Click Banner iPhone SE': 218646,
    'Click Banner iPhone 12 Pro': 218647,
    'Click Banner SAM Galaxy S10': 218648,
    'Click Banner SAM Galaxy A41': 218649,
    'Click Banner iPhone XR': 218651,

    'Click Banner Bestseller (SUM)': 218652,

    'Click Banner thankyou iPhone 11': 218653,
    'Click Banner thankyou Huawei P30 lite': 218654,
    'Click Banner thankyou SAM Galaxy A51': 218655,
    'Click Banner thankyou iPhone 12 Pro Max': 218656,
    'Click Banner thankyou iPhone SE': 218657,
    'Click Banner thankyou iPhone 12 Pro': 218658,
    'Click Banner thankyou SAM Galaxy S10': 218659,
    'Click Banner thankyou SAM Galaxy A41': 218660,
    'Click Banner thankyou iPhone XR': 218661,
    'Click Banner thankyou Huawei p40': 224557,
    'Click Banner thankyou Huawei p-smart': 224558,
    'Click Banner thankyou SAM A71': 224559,
    'Click Banner thankyou SAM S20': 224560,
    'Click Banner thankyou iPhone 12': 224561,

    'Click Banner Bestseller thankyou (SUM)': 218662,
};
const goalsValidate = [
    {
        goal: 'Click Banner iPhone 11',
        goalBanner: 'Click Banner thankyou iPhone 11',
        check: [/apple-iphone-11(?!(-)pro)/i, /appleiphone11(?!pro)/i],
        device: 'iphone',
        link: 'https://iconfoto.de/congstar/apple/iphone-11/'
    },
    {
        goal: '',
        goalBanner: 'Click Banner thankyou iPhone 12',
        check: [/appleiphone12(?!pro)/i],
        device: 'iphone',
        link: 'https://iconfoto.de/constar/apple/iphone12'
    },
    {
        goal: '',
        goalBanner: 'Click Banner thankyou Huawei p40',
        check: [/huaweip40(pro|lite)/i],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
    {
        goal: '',
        goalBanner: 'Click Banner thankyou Huawei p-smart',
        check: ['huaweipsmart2021'],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
    {
        goal: '',
        goalBanner: 'Click Banner thankyou SAM A71',
        check: ['samsunggalaxya71'],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
    {
        goal: '',
        goalBanner: 'Click Banner thankyou SAM S20',
        check: [/samsunggalaxys20(5g|fe)/i],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
    {
        goal: '',
        goalBanner: '',
        check: ['huaweip30pro'],
        device: 'android',
        link: 'https://iconfoto.de/congstar/huawei/'
    },
    {
        goal: 'Click Banner Huawei P30 lite',
        goalBanner: 'Click Banner thankyou Huawei P30 lite',
        check: ['huawei-p30-lite-new-edition', 'huaweip30litenewedition'],
        device: 'android',
        link: 'https://iconfoto.de/congstar/huawei/'
    },

    {
        goal: 'Click Banner SAM Galaxy A51',
        goalBanner: 'Click Banner thankyou SAM Galaxy A51',
        check: ['samsung-galaxy-a51', 'samsunggalaxya51'],
        device: 'android',
        link: 'https://iconfoto.de/congstar/samsung/galaxy-a51/'
    },
    {
        goal: 'Click Banner iPhone 12 Pro Max',
        goalBanner: 'Click Banner thankyou iPhone 12 Pro Max',
        check: ['apple-iphone-12-pro-max', 'appleiphone12promax'],
        device: 'iphone',
        link: 'https://iconfoto.de/constar/apple/iphone12'
    },
    {
        goal: 'Click Banner iPhone SE',
        goalBanner: 'Click Banner thankyou iPhone SE',
        check: ['apple-iphone-se-2020', 'appleiphonese2020'],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
    {
        goal: 'Click Banner iPhone 12 Pro',
        goalBanner: 'Click Banner thankyou iPhone 12 Pro',
        check: [/apple-iphone-12-pro(?!(-)max)/i, /appleiphone12pro(?!max)/i],
        device: 'iphone',
        link: 'https://iconfoto.de/constar/apple/iphone12'
    },
    {
        goal: 'Click Banner SAM Galaxy S10',
        goalBanner: 'Click Banner thankyou SAM Galaxy S10',
        check: ['samsung-galaxy-s10', 'samsunggalaxys10'],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
    {
        goal: 'Click Banner SAM Galaxy A41',
        goalBanner: 'Click Banner thankyou SAM Galaxy A41',
        check: ['samsung-galaxy-a41', 'samsunggalaxya41'],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
    {
        goal: 'Click Banner iPhone XR',
        goalBanner: 'Click Banner thankyou iPhone XR',
        check: ['apple-iphone-xr', 'appleiphonexr'],
        device: 'android',
        link: 'https://iconfoto.de/congstar'
    },
];

export function findCurrentGoals(url) {
    for (let i = 0; i < goalsValidate.length; i++) {
        const isUrl = goalsValidate[i].check.filter((regex) => url.match(regex));
        if (isUrl.length) return goalsValidate[i];
    }
}
