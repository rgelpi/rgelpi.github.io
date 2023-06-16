$(document).ready(function () {
    localStorage.clear();

    let curTrial = "";
    let curFunction = "";

    // TRIALS
    // practice trial
    $("#practice-button").click(function () {
        curTrial = "practice";
        $(this).toggleClass("pressed");

        // disable all other trials
        $(".trial-button").toggleClass("disabled");
        $("#practice-button").toggleClass("disabled");
    });

    // sample trial
    $("#sample-button").click(function () {
        curTrial = "sample";
        $(this).toggleClass("pressed");

        // disable all other trials and enable all functions
        $(".trial-button").toggleClass("disabled");
        $(".function-button").toggleClass("disabled");

        $("#sample-button").toggleClass("disabled");
    });

    // prediction trial
    $("#prediction-button").click(function () {
        curTrial = "prediction";
        $(this).toggleClass("pressed");

        // disable all other trials and enable all functions
        $(".trial-button").toggleClass("disabled");
        $(".function-button").toggleClass("disabled");

        $("#prediction-button").toggleClass("disabled");
    });

    // FUNCTIONS
    // gaussian function
    $("#gaussian").click(function () {
        curFunction = "gaussian";
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $("#gaussian").toggleClass("disabled");
    });

    // positive linear function
    $("#positive-linear").click(function () {
        curFunction = "positive-linear";
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $("#positive-linear").toggleClass("disabled");
    });

    // negative linear function
    $("#negative-linear").click(function () {
        curFunction = "negative-linear";
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $("#negative-linear").toggleClass("disabled");
    });

    // positive linear function
    $("#positive-exponential").click(function () {
        curFunction = "positive-exponential";
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $("#positive-exponential").toggleClass("disabled");
    });

    // negative linear function
    $("#negative-exponential").click(function () {
        curFunction = "negative-exponential";
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $("#negative-exponential").toggleClass("disabled");
    });

    // if function is pressed, disable previous pressed trial
    $(".function-button").click(function () {
        $("#" + curTrial + "-button").toggleClass("disabled");
    });

    // localStorage: keeps track of number of trials (maybe with hashmap)???

    // PAGE NAVIGATION
    $("#next-button").click(function () {
        // switch statement based on trial
        let trialLink = "";

        switch (curTrial) {
            case "sample":
                trialLink += "sampleApples/sample.html";
                break;

            case "prediction":
                trialLink += "predictApples/predict.html";
                break;

            case "practice":
                trialLink += "practiceApples/practice.html";
                break;

            default:
                trialLink = "";
                break;
        }

        // get number of samples
        let samplesLink = "";
        samplesLink += document.querySelector("input").value;

        // switch statement based on function
        let functionLink = "";

        switch (curFunction) {
            case "gaussian":
                functionLink += "gaussian";
                break;

            case "positive-linear":
                functionLink += "positive-linear";
                break;

            case "negative-linear":
                functionLink += "negative-linear";
                break;

            case "positive-exponential":
                functionLink += "positive-exponential";
                break;

            case "negative-exponential":
                functionLink += "negative-exponential";
                break;

            default:
                functionLink = "";
                break;
        }

        localStorage["familyFunction"] = functionLink;
        localStorage["numSamples"] = samplesLink;

        window.location.href =
            "../" +
            trialLink +
            "?c=" +
            samplesLink +
            "&function=" +
            functionLink;
    }); // use web sockets to go to next page
});
