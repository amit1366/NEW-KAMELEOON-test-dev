Kameleoon.API.Data.writeLocalData('kam-number-of-tiles', 5);
let tileList = [];
const tileIdList = () => {
    let deviceList = !!localStorage.getItem('kam_deviceList') ? JSON.parse(localStorage.getItem('kam_deviceList')) : null;
    let planList = !!localStorage.getItem('kam_planList') ? JSON.parse(localStorage.getItem('kam_planList')) : null;
    actualTile(deviceList, 'device');
    actualTile(planList, 'plan');
    return tileList.map(item => item.id);
};
function actualTile(data, tile) {
    if (data) {
        if (data.length) {
            data.sort((a,b) => {
                if (b.PV === a.PV) return b.time_spent - a.time_spent;
                return b.PV - a.PV;
            });
        } 
        tileList.push(data[0]);
        if (tile === 'device' && Kameleoon.API.Data.readLocalData('kam-number-of-tiles') && Kameleoon.API.Data.readLocalData('kam-number-of-tiles') === 5) {
            let dataLength = data.length < 4 ? data.length : 4;
            for (let i = 1; i < dataLength; i++) {
                tileList.push(data[i]);
            }
        }
    }
}


localStorage.setItem('kam-actual-viewed-products', tileIdList());
