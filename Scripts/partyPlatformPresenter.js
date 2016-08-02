// renders homepage and handles activity there

var PartyPlatformPresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
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

        // show page
        Main.showPage(Main.pageContainers.partyPlatformContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();