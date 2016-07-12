// renders homepage and handles activity there

var HomePagePresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    var _isPageSetup = false;
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        if (!_isPageSetup) {
            // set up any necessary events
            Main.addClickEventToElement(document.getElementById("homeOpt"), function () {
                Main.changeHash(Main.pageHashes.home);
            });
            Main.addClickEventToElement(document.getElementById("infoOpt"), function () {
                Main.changeHash(Main.pageHashes.info);
            });
            Main.addClickEventToElement(document.getElementById("platformOpt"), function () {
                Main.changeHash(Main.pageHashes.platform);
            });
            Main.addClickEventToElement(document.getElementById("quizOpt"), function () {
                Main.changeHash(Main.pageHashes.quiz);
            });
        }
        Main.showPage(Main.pageContainers.homePageContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();