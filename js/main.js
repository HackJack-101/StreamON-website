/* global bowser */
var int;

function setBrowserData(element, currentBrowser) {
    document.querySelector("#browser").innerHTML = currentBrowser.name;
    if (currentBrowser.version)
        document.querySelector("#version").innerHTML = "v" + currentBrowser.version;
    if (currentBrowser.osversion)
        document.querySelector("#operatingSystem").innerHTML = currentBrowser.osversion;
    window.setTimeout(function () {
        var desc = document.getElementById("browser-description");
        desc.setAttribute("data-visibility", "visible");
        desc.setAttribute("class", desc.getAttribute("class").toString() + " slideInUp");
        window.setTimeout(function () {
            element.setAttribute("data-visibility", "visible");
            element.setAttribute("class", element.getAttribute("class").toString() + " slideInUp");
            window.setTimeout(loadVideos, 300);
        }, 500);
    }, 250);
}

function loadVideos() {
    var extVideo = document.getElementById("extVideo");
    var appVideo = document.getElementById("appVideo");
    extVideo.innerHTML = '<source src="assets/extension.mp4" type="video/mp4" />';
    appVideo.innerHTML = '<source src="assets/miniplayer.mp4" type="video/mp4" />';
    extVideo.load();
    extVideo.play();
    appVideo.load();
    appVideo.play();
}

function httpGET(url, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            if (typeof success === 'function') {
                success(req.responseText);
            }
        } else {
            if (typeof error === 'function') {
                error();
            }
        }
    };
    req.send(null);
}

function getExtVersion(data) {
    var manifest = JSON.parse(data);
    var ext = document.querySelectorAll(".extVersion");
    for (var i in ext) {
        var element = ext[i];
        element.innerHTML = "v" + manifest.version;
    }
}

function getAppVersion(data) {
    var manifest = JSON.parse(data);
    var ext = document.querySelectorAll(".appVersion");
    for (var i in ext) {
        var element = ext[i];
        element.innerHTML = "v" + manifest.version;
    }
}

function changeLanguage(locale) {
    int.translate(locale);
}

window.addEventListener('load', function () {
    int = new i18n();
    int.translate();

    var n = new bowser();
    var currentBrowser = n.detect();
    var browserName = currentBrowser.name.toLowerCase();
    var dwn = document.getElementById(browserName);
    if (!(dwn && typeof dwn !== 'undefined' && dwn !== null)) {
        dwn = document.getElementById("other");
    }
    setBrowserData(dwn, currentBrowser);
    httpGET("https://raw.githubusercontent.com/Jack3113/StreamON/master/extension/manifest.json", getExtVersion);
    httpGET("https://raw.githubusercontent.com/Jack3113/StreamON/master/app/manifest.json", getAppVersion);

    document.getElementById("language").addEventListener("click", function (e) {
        e.preventDefault();
        int.switchLocale();
    });
});