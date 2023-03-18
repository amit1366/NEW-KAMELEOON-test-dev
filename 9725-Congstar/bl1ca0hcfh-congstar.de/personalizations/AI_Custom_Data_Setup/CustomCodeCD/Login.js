if (/congstar\.de\/login/.test(document.referrer) && /congstar\.de\/meincongstar/.test(document.location.href)) {
    return {"value": true, "overwrite": false};
} else if (/congstar\.de\/login\?r=\/checkout\/uebersicht/.test(document.referrer) && /congstar\.de\/checkout\/uebersicht/.test(document.location.href)){
    return {"value": true, "overwrite": false};
} else {
    return {"value": null, "overwrite": false};
}