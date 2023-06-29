const curriculumData = JSON.parse(localStorage.getItem("curriculumMap"));

$(document).ready(function () {
    // restructure curriculum map
    const curriculumMap = new Map();

    for (const [curTrial, curData] of Object.entries(curriculumData)) {
        curriculumMap.set(curTrial, curData);
    }

    localStorage["curriculumSize"] = curriculumMap.size;

    // update current trial text
    let currentTrial = localStorage.getItem("currentTrial");
    const curData = curriculumMap.get(currentTrial);

    let trialText = document.getElementById("trialNumber");
    trialText.innerHTML = `<u>Trial #${currentTrial}</u>`;

    // update current trial description
    let currentDescription = document.getElementById("trialDescription");
    let trialDescription = "";

    switch (curData[0]) {
        case "sample":
            trialDescription = "Sample + Predict";
            break;

        case "prediction":
            trialDescription = "Predict Only";
            break;

        case "practice":
            trialDescription = "Practice";
            break;

        default:
            trialDescription = "";
            break;
    }

    currentDescription.innerHTML = trialDescription;

    // update status of start button
    if (currentTrial == curriculumMap.size) {
        $("#default-button").text("Last Trial!");
    } else if (currentTrial > 1) {
        $("#default-button").text("Next Trial!");
    }

    // PAGE NAVIGATION
    $("#skip-button").click(function () {
        // update local storage components
        const trial = `Trial #${currentTrial}`;
        const map = new Map();

        map.set("statusTrial", "skipped");
        map.set("curriculumTrial", JSON.stringify(curData));
        localStorage[trial] = JSON.stringify(Array.from(map.entries()));

        // increment to next trial number
        currentTrial++;
        localStorage["currentTrial"] = currentTrial;

        // update navigation of skip button
        if (currentTrial - 1 == curriculumMap.size) {
            window.location.href = "../finishApples/finish.html";
        } else if (currentTrial > 1) {
            window.location.href = "../startApples/start.html";
        }
    }); // use web sockets to go to next page

    $("#default-button").click(function () {
        // switch statement based on trial
        const curTrial = curData[0];
        let trialLink = "";

        switch (curTrial) {
            case "sample":
                trialLink = "sampleApples/sample.html";
                break;

            case "prediction":
                trialLink = "predictApples/predict.html";
                break;

            case "practice":
                trialLink = "practiceApples/practice.html";
                break;

            default:
                trialLink = "";
                break;
        }

        // get number of samples
        let samplesLink = curData[2];

        // switch statement based on function
        const curFunction = curData[1];
        let functionLink = "";

        switch (curFunction) {
            case "gaussian":
                functionLink = "gaussian";
                break;

            case "positive-linear":
                functionLink = "positive-linear";
                break;

            case "negative-linear":
                functionLink = "negative-linear";
                break;

            case "positive-exponential":
                functionLink = "positive-exponential";
                break;

            case "negative-exponential":
                functionLink = "negative-exponential";
                break;

            default:
                functionLink = "";
                break;
        }

        // increment to next trial number
        currentTrial++;
        localStorage["currentTrial"] = currentTrial;

        window.location.href =
            "../" +
            trialLink +
            "?c=" +
            samplesLink +
            "&function=" +
            functionLink;
    }); // use web sockets to go to next page
});
