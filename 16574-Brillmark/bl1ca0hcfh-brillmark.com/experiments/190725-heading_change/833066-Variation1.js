console.log("heading changes 1 hello Amit Bisht");
var kamleaoonel = Kameleoon.API.Utils
var abc = kamleaoonel.querySelectorAll('.animation-header')[0]
console.log(abc);
// get text other page
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var parse = new DOMParser();
        var doc = parse.parseFromString(this.response, 'text/html')
        console.log(doc)
        var docel = doc.querySelector('.header')
        console.log(docel)
    }
};
xhttp.open("GET", "https://www.congstar.de/", true);
xhttp.send()