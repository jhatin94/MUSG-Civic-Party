// renders homepage and handles activity there

var HomePagePresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        // set up any necessary events
        Main.addClickEventToElement(document.getElementById("infoSquare"), function () {
            Main.changeHash(Main.pageHashes.info);
        });
        Main.addClickEventToElement(document.getElementById("platSquare"), function () {
            Main.changeHash(Main.pageHashes.platform);
        });
        Main.addClickEventToElement(document.getElementById("quizSquare"), function () {
            Main.changeHash(Main.pageHashes.quiz);
        });

        // show page
        Main.showPage(Main.pageContainers.homePageContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();