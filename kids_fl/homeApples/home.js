$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);

    const sessionId = urlParams.get("sessionId");

    // restart curriculum and reset local storage
    $("#clear-button").click(function () {
        localStorage.clear();
        window.location.href = "../homeApples/home.html?sessionId=" + sessionId;
    });

    // key: trial number; value: [trial type, function type, number of samples]
    const curriculumMap = {};

    // initialize current trial, current function, and counter
    let curTrial = "";
    let curFunction = "";
    let curCounter = 0;

    // update next button status
    const updateNextStatus = function () {
        if (curTrial) {
            if (curTrial === "practice") {
                // practice trials do NOT need a function selected
                $("#next-button").toggleClass("disabled");
            } else {
                // non-practice trials need a function selected
                if (curFunction) {
                    $("#next-button").toggleClass("disabled");
                }
            }
        }
    };

    // TRIALS
    // practice trial
    $("#practice-button").click(function () {
        if (curTrial) {
            // current trial is "unpressed," so reset
            curTrial = "";
            $("#next-button").toggleClass("disabled");
        } else {
            curTrial = "practice";
        }

        // press all other trials
        $(".trial-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other trials
        $(".trial-button").toggleClass("disabled");
        $(this).toggleClass("disabled");

        updateNextStatus();
    });

    // sample trial
    $("#sample-button").click(function () {
        if (curTrial) {
            // current trial is "unpressed," so reset
            curTrial = "";
        } else {
            curTrial = "sample";
        }

        // press all other trials
        $(".trial-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other trials and enable all functions
        $(".trial-button").toggleClass("disabled");
        $(".function-button").toggleClass("disabled");

        $(this).toggleClass("disabled");
        updateNextStatus();
    });

    // prediction trial
    $("#prediction-button").click(function () {
        if (curTrial) {
            // current trial is "unpressed," so reset
            curTrial = "";
        } else {
            curTrial = "prediction";
        }

        // press all other trials
        $(".trial-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other trials and enable all functions
        $(".trial-button").toggleClass("disabled");
        $(".function-button").toggleClass("disabled");

        $(this).toggleClass("disabled");
        updateNextStatus();
    });

    // FUNCTIONS
    // gaussian function one
    $("#gaussian-one").click(function () {
        if (curFunction) {
            // current function is "unpressed," so reset
            curFunction = "";
            $("#next-button").toggleClass("disabled");
        } else {
            curFunction = "gaussian-one";
        }

        // press all other functions
        $(".function-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $(this).toggleClass("disabled");

        updateNextStatus();
    });

    // gaussian function two
    $("#gaussian-two").click(function () {
        if (curFunction) {
            // current function is "unpressed," so reset
            curFunction = "";
            $("#next-button").toggleClass("disabled");
        } else {
            curFunction = "gaussian-two";
        }

        // press all other functions
        $(".function-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $(this).toggleClass("disabled");

        updateNextStatus();
    });

    // positive linear function
    $("#positive-linear").click(function () {
        if (curFunction) {
            // current function is "unpressed," so reset
            curFunction = "";
            $("#next-button").toggleClass("disabled");
        } else {
            curFunction = "positive-linear";
        }

        // press all other functions
        $(".function-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $(this).toggleClass("disabled");

        updateNextStatus();
    });

    // negative linear function
    $("#negative-linear").click(function () {
        if (curFunction) {
            // current function is "unpressed," so reset
            curFunction = "";
            $("#next-button").toggleClass("disabled");
        } else {
            curFunction = "negative-linear";
        }

        // press all other functions
        $(".function-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $(this).toggleClass("disabled");

        updateNextStatus();
    });

    // positive linear function
    $("#positive-exponential").click(function () {
        if (curFunction) {
            // current function is "unpressed," so reset
            curFunction = "";
            $("#next-button").addClass("disabled");
        } else {
            curFunction = "positive-exponential";
        }

        // press all other functions
        $(".function-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $(this).toggleClass("disabled");

        // allow different samples ONLY for exponential functions
        if (curTrial === "prediction") {
            $(".sample-button").toggleClass("disabled");
        }

        // must choose type of sample
        if (curTrial !== "prediction") {
            updateNextStatus();
        }
    });

    // negative linear function
    $("#negative-exponential").click(function () {
        if (curFunction) {
            // current function is "unpressed," so reset
            curFunction = "";
            $("#next-button").addClass("disabled");
        } else {
            curFunction = "negative-exponential";
        }

        // press all other functions
        $(".function-button").toggleClass("pressed");
        $(this).toggleClass("pressed");

        // disable all other functions
        $(".function-button").toggleClass("disabled");
        $(this).toggleClass("disabled");

        // allow different samples ONLY for exponential functions
        if (curTrial === "prediction") {
            $(".sample-button").toggleClass("disabled");
        }

        // must choose type of sample
        if (curTrial !== "prediction") {
            updateNextStatus();
        }
    });

    // exponential sample buttons
    let curExpSample = "";

    $("#old-sample").click(function () {
        if (curExpSample) {
            // current sample is "unpressed," so reset next button
            curExpSample = "";
            $("#next-button").addClass("disabled");
        } else {
            curExpSample = "old";
            $("#next-button").removeClass("disabled");
        }

        $("#new-sample").toggleClass("pressed");
        $("#new-sample").toggleClass("disabled");
    });

    $("#new-sample").click(function () {
        if (curExpSample) {
            // current sample is "unpressed," so reset next button
            curExpSample = "";
            $("#next-button").addClass("disabled");
        } else {
            curExpSample = "new";
            $("#next-button").removeClass("disabled");
        }

        $("#old-sample").toggleClass("pressed");
        $("#old-sample").toggleClass("disabled");
    });

    if (!curExpSample) {
        $("#next-button").addClass("disabled");
    }

    // if a function is pressed, disable previous pressed trial
    $(".function-button").click(function () {
        $("#" + curTrial + "-button").toggleClass("disabled");
    });

    // if a function is pressed, disable previous pressed trial
    $(".sample-button").click(function () {
        $("#" + curFunction).toggleClass("disabled");
    });

    // CURRICULUM SCROLL LIST
    $("#next-button").click(function () {
        // switch statement based on trial
        let trialList = "N/A";

        switch (curTrial) {
            case "sample":
                trialList = "Sample + Predict";
                break;

            case "prediction":
                trialList = "Predict Only";
                break;

            case "practice":
                trialList = "Practice";
                break;

            default:
                trialList = "N/A";
                break;
        }

        // get number of samples
        let curSamples = document.querySelector("input").value.toString();

        // switch statement based on function
        let functionList = "N/A";

        switch (curFunction) {
            case "gaussian-one":
                functionList = "Gaussian-One";
                break;

            case "gaussian-two":
                functionList = "Gaussian-Two";
                break;

            case "positive-linear":
                functionList = "Positive-Linear";
                break;

            case "negative-linear":
                functionList = "Negative-Linear";
                break;

            case "positive-exponential":
                functionList = "Positive-Exponential";
                break;

            case "negative-exponential":
                functionList = "Negative-Exponential";
                break;

            default:
                functionList = "N/A";
                break;
        }

        // update curriculum map
        curCounter += 1;
        curriculumMap[curCounter] = [
            curTrial,
            curFunction,
            curSamples,
            curExpSample,
        ];

        // update finish button status
        if (curCounter === 1) {
            $("#finish-button").toggleClass("disabled");
        }

        // create the unordered list element
        const trialsList = document.createElement("ul");

        // create the list item
        const listItem = document.createElement("li");

        // create the main trial header
        const trialHeader = document.createElement("h3");
        trialHeader.innerHTML = `<u>Trial #${curCounter}:</u> ${trialList}`;
        listItem.appendChild(trialHeader);

        // create the function subitem
        const functionItem = document.createElement("p");

        if (curExpSample) {
            functionItem.innerHTML = `<em>Function:</em> ${functionList} (${curExpSample})
            `;
        } else {
            functionItem.innerHTML = `<em>Function:</em> ${functionList}`;
        }

        listItem.appendChild(functionItem);

        // create the number of samples subitem
        const samplesItem = document.createElement("p");
        samplesItem.innerHTML = `<em>Number of Samples:</em> ${curSamples}`;
        listItem.appendChild(samplesItem);

        // append the list item to the unordered list
        trialsList.appendChild(listItem);

        // append the unordered list to the container element
        const listContainer = document.querySelector("#curriculum-list");
        listContainer.append(trialsList);

        // reset buttons
        if (curTrial !== "practice") {
            $("#" + curFunction).toggleClass("pressed");
            $("#" + curFunction).toggleClass("disabled");
            $(".function-button").toggleClass("pressed");
        }

        if (
            curTrial === "prediction" &&
            (curFunction === "negative-exponential" ||
                curFunction === "positive-exponential")
        ) {
            $(".sample-button").addClass("disabled");
            $(".sample-button").removeClass("pressed");
        }

        $(".function-button").addClass("disabled");
        $(".function-button").removeClass("pressed");

        $("#" + curTrial + "-button").toggleClass("pressed");
        $(".trial-button").toggleClass("disabled");

        if (curTrial === "practice") {
            $("#" + curTrial + "-button").toggleClass("disabled");
        }

        $(".trial-button").toggleClass("pressed");

        curFunction = "";
        curTrial = "";
        curExpSample = "";

        $("#next-button").toggleClass("disabled");
    });

    // PAGE NAVIGATION
    $("#finish-button").click(function () {
        localStorage["curriculumMap"] = JSON.stringify(curriculumMap);
        localStorage["currentTrial"] = 1; // start curriculum
        localStorage["sessionId"] = sessionId;

        window.location.href = "../startApples/start.html";
    }); // use web sockets to go to next page
});
