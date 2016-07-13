// renders homepage and handles activity there

var AlignmentQuizPresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    var _isPageSetup = false;
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        if (!_isPageSetup) {
            _isPageSetup = true;
            // set up any necessary events

        }
        Main.showPage(Main.pageContainers.alignmentQuizContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();