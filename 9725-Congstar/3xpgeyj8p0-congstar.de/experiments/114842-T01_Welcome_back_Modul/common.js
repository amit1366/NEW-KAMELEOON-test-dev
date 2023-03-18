function relevantTiles() {
    let data = JSON.parse(localStorage.getItem('kamdevState'));
    let relevantProducts = [];
    const actions = Object.keys(data);

    for (const action of actions) {
        data[action].sort((a, b) => b.pv.views === a.pv.views ? b.pv.time - a.pv.time : b.pv.views - a.pv.views)
        data[action] = data[action].filter((tile, index) => action === 'plan' ? index < 1 : index < 4) //count tiles

        for (let i = 0; i < data[action].length; i++) {
            relevantProducts.push(data[action][i].plan_id || data[action][i].deviceID)
        }
    }

    localStorage.setItem('kam-actual-viewed-products', JSON.stringify(relevantProducts))
}

if (localStorage.getItem('kamdevState')) relevantTiles();