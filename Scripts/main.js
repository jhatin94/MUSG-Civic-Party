// main JS file, handles loading all subsequent pages and houses global functions

var Main = (function () {
    /*public properties*/
    var pageHashes = {
        home: "#home",
        info: "#info",
        platform: "#platform",
        quiz: "#quiz"
    }
    var pageContainers = {
        homePageContainer: "homePageContainer",
        partyInfoContainer: "partyInfoContainer",
        partyPlatformContainer: "partyPlatformContainer",
        alignmentQuizContainer: "alignmentQuizContainer"
    }
    var pageTitles = {
        home: "Model Civic Party",
        info: "About the Party",
        platform: "Party Platform",
        quiz: "Alignment Quiz"
    }
    /*end public properties*/

    /*private properties*/
    var _homeLoaded = false;
    var _infoLoaded = false;
    var _platformLoaded = false;
    var _quizLoaded = false;
    var _containers = ["homePageContainer", "partyInfoContainer", "partyPlatformContainer", "alignmentQuizContainer"];
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
                case Main.pageHashes.info:
                    document.title = Main.pageTitles.info;
                    PartyInfoPresenter.renderPage();
                    break;
                case Main.pageHashes.platform:
                    document.title = Main.pageTitles.platform;
                    PartyPlatformPresenter.renderPage();
                    break;
                case Main.pageHashes.quiz:
                    document.title = Main.pageTitles.quiz;
                    AlignmentQuizPresenter.renderPage();
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
        var container = pageContainer;
        if (container) {
            if (container.classList.contains("show")) {
                container.classList.remove("show");
            }
            if (!container.classList.contains("hide")) {
                container.classList.add("hide");
            }
        }
    }
    function addClickEventToElement(element, event) {
        element.addEventListener("click", event);
    }
    function changeHash(hash) {
        if (window.location.hash != hash) {
            window.location.hash = hash;
        }
    }
    /*end public functions*/

    /*private functions*/
    function _hideAllPages() {
        var i = 0;
        var l = _containers.length;
        for (i; i < l; i++) {
            var container = document.getElementById(_containers[i]);
            Main.hidePage(container);
        }
    }
    function _loadHTML(callback) {
        _loadHomeHTML(function () {
            if (_isSiteLoaded()) {
                callback();
            }
        });
        _loadInfoHTML(function () {
            if (_isSiteLoaded()) {
                callback();
            }
        });
        _loadPlatformHTML(function () {
            if (_isSiteLoaded()) {
                callback();
            }
        });
        _loadQuizHTML(function () {
            if (_isSiteLoaded()) {
                callback();
            }
        });
    }
    function _loadHomeHTML(loadedCallback) {
        // do html modifications
        var homePage = document.getElementById(Main.pageContainers.homePageContainer);
        var homePageHTML = homePage.innerHTML;
        var currentYear = new Date().getFullYear();
        homePageHTML = homePageHTML.replace("{currentYear}", currentYear);
        homePage.innerHTML = homePageHTML;

        // site loaded - callback
        _homeLoaded = true;
        loadedCallback();
    }
    function _loadInfoHTML(loadedCallback) {
        _infoLoaded = true;
        loadedCallback();
    }
    function _loadPlatformHTML(loadedCallback) {
        _platformLoaded = true;
        loadedCallback();
    }
    function _loadQuizHTML(loadedCallback) {
        _quizLoaded = true;
        loadedCallback();
    }
    function _isSiteLoaded() {
        return _homeLoaded && _infoLoaded && _platformLoaded && _quizLoaded;
    }
    /*end private functions*/

    return {
        DOMReady: DOMReady,
        pageHashes: pageHashes,
        pageContainers: pageContainers,
        pageTitles: pageTitles,
        showPage: showPage,
        hidePage: hidePage,
        changeHash: changeHash,
        addClickEventToElement: addClickEventToElement,
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