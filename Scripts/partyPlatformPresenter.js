// renders homepage and handles activity there

var PartyPlatformPresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    var _platformSections = {
        economy: "econText",
        immigration: "immigrationText",
        domestic: "domSocText",
        foreign: "foreignPolText"
    };
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        // set up any necessary events
        Main.addClickEventToElement(document.getElementById("homeOptP"), function () {
            Main.changeHash(Main.pageHashes.home);
        });
        Main.addClickEventToElement(document.getElementById("infoOptP"), function () {
            Main.changeHash(Main.pageHashes.info);
        });
        Main.addClickEventToElement(document.getElementById("quizOptP"), function () {
            Main.changeHash(Main.pageHashes.quiz);
        });
        Main.addClickEventToElement(document.getElementById("econ"), function () {
            Main.sendAnalyticsEvent("UX", "click", "Economy");
            _loadPlatformSection(_platformSections.economy);
        });
        Main.addClickEventToElement(document.getElementById("immigration"), function () {
            Main.sendAnalyticsEvent("UX", "click", "Immigration");
            _loadPlatformSection(_platformSections.immigration);
        });
        Main.addClickEventToElement(document.getElementById("domSoc"), function () {
            Main.sendAnalyticsEvent("UX", "click", "Domestic Policy");
            _loadPlatformSection(_platformSections.domestic);
        });
        Main.addClickEventToElement(document.getElementById("foreignPol"), function () {
            Main.sendAnalyticsEvent("UX", "click", "Foreign Policy");
            _loadPlatformSection(_platformSections.foreign);
        });

        // show page
        Main.sendPageview(Main.analyticPageTitles.platform);
        Main.showPage(Main.pageContainers.partyPlatformContainer);
    }
    /*end public functions*/

    /*private properties*/
    function _loadPlatformSection(section) {
        var displayDiv = document.getElementById("sectionDisplay");
        var sectionToAppend = document.getElementById(section);
        if (displayDiv && sectionToAppend) {
            displayDiv.innerHTML = sectionToAppend.innerHTML;
        }
    }
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();