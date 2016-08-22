// renders homepage and handles activity there

var AlignmentQuizPresenter = (function () {
    /*public properties*/
    /*end public properties*/

    /*private properties*/
    var _questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21"];
    var _econQuestions = 0;
    var _domQuestions = 0;
    var _fpQuestions = 0;
    var _econScore = 0;
    var _domScore = 0;
    var _fpScore = 0;
    var _totalScore = 0;
    var _questionTypes = {
        econ: "econ",
        dom: "domestic",
        fp: "fp"
    }
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
        Main.addClickEventToElement(document.getElementById("submitBtn"), function () {
            Main.sendAnalyticsEvent("UX", "click", "Submit Quiz");
            if (_areAllQuestionsAnswered()) {
                _calculateResults();
            }
            else {
                Main.sendAnalyticsEvent("UX", "Quiz Result", "Quiz Incomplete");
                _showHideNotFinishedWarning(true);
            }
        });

        // show page
        Main.sendPageview(Main.analyticPageTitles.quiz);
        Main.showPage(Main.pageContainers.alignmentQuizContainer);
    }
    /*end public functions*/

    /*private properties*/
    function _areAllQuestionsAnswered() {
        _clearScores();
        var i = 0;
        var l = _questionNames.length;
        for (i; i < l; i++) {
            var questionAnswered = false;
            var questionAnswers = document.getElementsByName(_questionNames[i]);
            var j = 0;
            var jLeng = questionAnswers ? questionAnswers.length : 0;
            for (j; j < jLeng; j++) {
                var answer = questionAnswers[j];
                if (answer.checked) { // tally score totals to make calculating results quicker
                    var questionType = answer.className;
                    switch (questionType) {
                        case _questionTypes.econ:
                            _econQuestions++;
                            _econScore += parseInt(answer.value);
                            break;
                        case _questionTypes.dom:
                            _domQuestions++;
                            _domScore += parseInt(answer.value);
                            break;
                        case _questionTypes.fp:
                            _fpQuestions++;
                            _fpScore += parseInt(answer.value);
                            break;
                    }

                    questionAnswered = true;
                    break;
                }
            }
            if (!questionAnswered) {
                return false;
            }
        }
        return true;
    }
    function _calculateResults() {
        _showHideNotFinishedWarning(false);
        _econScore = parseFloat((_econScore / _econQuestions).toFixed(2));
        _domScore = parseFloat((_domScore / _domQuestions).toFixed(2));
        _fpScore = parseFloat((_fpScore / _fpQuestions).toFixed(2));
        _totalScore = parseFloat(((_econScore + _domScore + _fpScore) / 3).toFixed(2));
        Main.sendAnalyticsEvent("UX", "Quiz Result", "Score: " + _totalScore + "%");
        _displayResults();
    }
    function _displayResults() {
        var eScore = document.getElementById("esc");
        var dScore = document.getElementById("dsc");
        var fScore = document.getElementById("fsc");
        var tScore = document.getElementById("tsc");
        if (eScore && dScore && fScore && tScore) {
            eScore.innerHTML = _econScore + "%";
            dScore.innerHTML = _domScore + "%";
            fScore.innerHTML = _fpScore + "%";
            tScore.innerHTML = _totalScore + "%";
            var resultsContainer = document.getElementById("quizResult");
            if (resultsContainer && resultsContainer.classList.contains("hide")) {
                resultsContainer.classList.remove("hide");
            }
            if (_totalScore > 69) {
                var joinLink = document.getElementById("joinPartyLinkRec");
                if (joinLink && joinLink.classList.contains("hide")) {
                    joinLink.classList.remove("hide");
                }
            }
        }
    }
    function _showHideNotFinishedWarning(show) {
        var warning = document.getElementById("notFinishedWarning");
        if (warning && show && warning.classList.contains("hide")) {
            warning.classList.remove("hide");
        }
        else if (warning && !show && !warning.classList.contains("hide")) {
            warning.classList.add("hide");
        }
    }
    function _clearScores() {
        _econQuestions = 0;
        _domQuestions = 0;
        _fpQuestions = 0;
        _econScore = 0;
        _domScore = 0;
        _fpScore = 0;
    }
    /*end private functions*/
    return {
        renderPage: renderPage
    }
})();