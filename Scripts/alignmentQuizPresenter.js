// renders homepage and handles activity there

var AlignmentQuizPresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        // set up any necessary events
        Main.addClickEventToElement(document.getElementById("homeOptQ"), function () {
            Main.changeHash(Main.pageHashes.home);
        });
        Main.addClickEventToElement(document.getElementById("infoOptQ"), function () {
            Main.changeHash(Main.pageHashes.info);
        });
        Main.addClickEventToElement(document.getElementById("platformOptQ"), function () {
            Main.changeHash(Main.pageHashes.platform);
        });

        // show page
        Main.showPage(Main.pageContainers.alignmentQuizContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();