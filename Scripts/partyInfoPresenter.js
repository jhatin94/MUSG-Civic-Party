// renders homepage and handles activity there

var PartyInfoPresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        // set up any necessary events
        Main.addClickEventToElement(document.getElementById("homeOptI"), function () {
            Main.changeHash(Main.pageHashes.home);
        });
        Main.addClickEventToElement(document.getElementById("platformOptI"), function () {
            Main.changeHash(Main.pageHashes.platform);
        });
        Main.addClickEventToElement(document.getElementById("quizOptI"), function () {
            Main.changeHash(Main.pageHashes.quiz);
        });

        // show page
        Main.showPage(Main.pageContainers.partyInfoContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();