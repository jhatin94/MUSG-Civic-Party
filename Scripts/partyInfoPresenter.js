// renders homepage and handles activity there

var PartyInfoPresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    var _isPageSetup = false;
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        if (!_isPageSetup) {
            // set up any necessary events

        }
        Main.showPage(Main.pageContainers.partyInfoContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();