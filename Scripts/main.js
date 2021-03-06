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
    var analyticPageTitles = {
        home: "Home Page",
        info: "Party Info Page",
        platform: "Party Platform Page",
        quiz: "Alignment Quiz Page"
    }
    /*end public properties*/

    /*private properties*/
    var _homeLoaded = false;
    var _infoLoaded = false;
    var _platformLoaded = false;
    var _quizLoaded = false;
    var _containers = ["homePageContainer", "partyInfoContainer", "partyPlatformContainer", "alignmentQuizContainer"];
    var _currentYear;
    var _shouldLoadImages = true;
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
    function sendAnalyticsEvent(category, action, label, value) {
        if (value) {
            ga('send', 'event', category, action, label, value);
        }
        else {
            ga('send', 'event', category, action, label);
        }
    }
    function sendPageview(page) {
        ga('set', {
            page: page,
            title: page
        });
        ga('send', 'pageview', page);
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
        if (!_isSiteLoaded()) {
            _shouldLoadImages = window.screen.width > 654;
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
        else {
            callback();
        }
    }
    function _loadHomeHTML(loadedCallback) {
        // do html modifications
        var homePage = document.getElementById(Main.pageContainers.homePageContainer);
        if (homePage) {
            var homePageHTML = homePage.innerHTML;
            _currentYear = new Date().getFullYear();
            homePageHTML = homePageHTML.replace("{currentYear}", _currentYear);
            homePage.innerHTML = homePageHTML;
            if (_shouldLoadImages) {
                var bannerImg = new Image();
                bannerImg.src = "Content/capitol.jpg";
                bannerImg.onload = function () {
                    homePage.style.background = 'url(' + bannerImg.src + ')' + " no-repeat center center fixed";
                    homePage.style.backgroundSize = "cover";
                    _homeLoaded = true;
                    loadedCallback();
                };
            }
            else {
                homePage.classList.add("altBackground");
                _homeLoaded = true;
                loadedCallback();
            }
        }
    }
    function _loadInfoHTML(loadedCallback) {
        var infoPage = document.getElementById(Main.pageContainers.partyInfoContainer);
        if (infoPage) {
            var infoPageHTML = infoPage.innerHTML;
            infoPageHTML = infoPageHTML.replace("{currentYear}", _currentYear);
            infoPage.innerHTML = infoPageHTML;
            _infoLoaded = true;
            loadedCallback();
        }
    }
    function _loadPlatformHTML(loadedCallback) {
        var platformPage = document.getElementById(Main.pageContainers.partyPlatformContainer);
        if (platformPage) {
            var platformPageHTML = platformPage.innerHTML;
            platformPageHTML = platformPageHTML.replace("{currentYear}", _currentYear);
            platformPage.innerHTML = platformPageHTML;
            if (_shouldLoadImages) {
                var platBgImg = new Image();
                platBgImg.src = "Content/capitalRear.jpg";
                platBgImg.onload = function () {
                    platformPage.style.background = 'url(' + platBgImg.src + ')' + " no-repeat center center fixed";
                    platformPage.style.backgroundSize = "cover";
                    _platformLoaded = true;
                    loadedCallback();
                }
            }
            else {
                platformPage.classList.add("altBackground");
                _platformLoaded = true;
                loadedCallback();
            }
        }
    }
    function _loadQuizHTML(loadedCallback) {
        var quizPage = document.getElementById(Main.pageContainers.alignmentQuizContainer);
        if (quizPage) {
            var quizPageHTML = quizPage.innerHTML;
            quizPageHTML = quizPageHTML.replace("{currentYear}", _currentYear);
            quizPage.innerHTML = quizPageHTML;
            _quizLoaded = true;
            loadedCallback();
        }
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
        analyticPageTitles: analyticPageTitles,
        showPage: showPage,
        hidePage: hidePage,
        changeHash: changeHash,
        addClickEventToElement: addClickEventToElement,
        sendAnalyticsEvent: sendAnalyticsEvent,
        sendPageview: sendPageview,
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