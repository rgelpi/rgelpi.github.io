$(document).ready(function () {
    // remove items that are already in each trial map
    localStorage.removeItem("curriculumMap");
    localStorage.removeItem("curriculumTrial");
    localStorage.removeItem("chosenSamples");
    localStorage.removeItem("sampleToApples");
    localStorage.removeItem("guessApples");
    localStorage.removeItem("trueApples");
    localStorage.removeItem("errorApples");
    localStorage.removeItem("currentTrial");

    const curLength = localStorage.getItem("curriculumSize");

    console.log(localStorage, "ALL");

    for (var i = 1; i <= curLength; i++) {
        const curMap = new Map(JSON.parse(localStorage["Trial #" + i]));
        console.log(curMap, "TRIAL #" + i);
    }

    // WEB SOCKET
    const webSocket = new WebSocket("wss://somata.inf.ed.ac.uk/chunks/ws");
    let isError = false;
    let isOpen = false;

    webSocket.onopen = function () {
        console.log("WebSocket Connection Opening!");
        isOpen = true;

        // add last details for each session
        localStorage["experimentId"] = "functions_100";

        const currentDate = new Date();

        localStorage["submitDateTime"] = currentDate.toUTCString();
        localStorage["timezoneOffset"] = currentDate
            .getTimezoneOffset()
            .toString();
        localStorage["isComplete"] = true;

        // send final data
        const finalData = JSON.stringify(localStorage);
        console.log(JSON.parse(finalData), "FINAL");

        if (!isError) {
            console.log("Sending Data...");
            webSocket.send(finalData);
            console.log("Data Transfer Complete!");
        }

        if (isOpen) {
            webSocket.close();
            isOpen = false;
        }
    };

    webSocket.onmessage = function (event) {
        wsMessage = JSON.parse(event.data);
        console.log("WebSocket Message: " + event.data);
    };

    webSocket.onerror = function (error) {
        console.log(
            "WebSocket Error Detected: " +
                JSON.stringify(error, ["message", "arguments", "type", "name"])
        );

        isError = true;
    };

    webSocket.onclose = function () {
        console.log("WebSocket Connection Closing!");
    };

    $("#default-button").click(function () {
        window.location.href = "../homeApples/home.html";
        localStorage.clear();
    });
});
