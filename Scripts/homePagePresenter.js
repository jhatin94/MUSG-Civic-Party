// renders homepage and handles activity there

var HomePagePresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    /*end private properties*/

    /*public functions*/
    function renderPage() {
        Main.showPage(Main.pageContainers.homePageContainer);
    }
    /*end public functions*/

    /*private properties*/
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();