// main JS file, handles loading all subsequent pages and houses global functions

var Main = (function () {
    /*public properties*/
    var pageHashes = {
        home: "#home"
    }
    var pageContainers = {
        homePageContainer: "homePageContainer"
    }
    var pageTitles = {
        home: "Model Civic Party"
    }
    /*end public properties*/

    /*private properties*/
    var _homeLoaded = false;
    /*end private properties*/

    /*public functions*/
    function DOMReady(callback) {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            return callback();
        }
        document.addEventListener('DOMContentLoaded', callback, false);
    }
    function renderPage(hash) {
        _hideAllPages();
        _loadHTML(function () {
            switch (hash) {
                case Main.pageHashes.home:
                    document.title = Main.pageTitles.home;
                    HomePagePresenter.renderPage();
                    break;
                default:
                    break;
            }
        });
    }
    function showPage(pageContainer) {
        var container = document.getElementById(pageContainer);
        if (container.classList.contains("hide")) {
            container.classList.remove("hide");
        }
        if (!container.classList.contains("show")) {
            container.classList.add("show");
        }
    }
    function hidePage(pageContainer) {
        var container = document.getElementById(pageContainer);
        if (container.classList.contains("show")) {
            container.classList.remove("show");
        }
        if (!container.classList.contains("hide")) {
            container.classList.add("hide");
        }
    }
    /*end public functions*/

    /*private functions*/
    function _hideAllPages() {
        var i;
        var l = Main.pageContainers.length;
        for (i; i < l; i++) {
            var container = document.getElementById(pageContainers[i]);
            Main.hidePage(container);
        }
    }
    function _loadHTML(callback) {
        _loadHomeHTML(function (html) {
            var homePage = document.getElementById(Main.pageContainers.homePageContainer);
            homePage.innerHTML = html;
            _homeLoaded = true;
            if (_isSiteLoaded()) {
                callback();
            }
        });
    }
    function _loadHomeHTML(callback) {
        var currentYear = new Date().getFullYear();
        var html = "<h1>ModelUSGov Civic Party Website</h1><p>This is the foundation for a great Party Website. Stay tuned for updates!</p><footer><p>&copy;" + currentYear + " - Model Civic Party</p></footer>";
        callback(html);
    }
    function _isSiteLoaded() {
        return _homeLoaded;
    }
    /*end private functions*/

    return {
        DOMReady: DOMReady,
        pageHashes: pageHashes,
        pageContainers: pageContainers,
        pageTitles: pageTitles,
        showPage: showPage,
        hidePage: hidePage,
        renderPage: renderPage
    }
})();

var initialHash = "#home";
var previousURL = null;
window.location.hash = initialHash;
window.onload = Main.DOMReady(function () { Main.renderPage(window.location.hash); });
window.onhashchange = function (e) {
    previousURL = e.oldURL;
    Main.renderPage(window.location.hash);
}