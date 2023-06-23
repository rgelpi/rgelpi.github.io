$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);

    let curriculumMap = JSON.parse(localStorage.getItem("curriculumMap"));
    let currentTrial = localStorage.getItem("currentTrial");

    // update defaults (number of samples) based on URL link
    let numSamples = 5;

    if (urlParams.get("c") !== "null" && urlParams.has("c")) {
        numSamples = parseInt(urlParams.get("c"));
    }

    // apple function
    const numApples = [0, 0, 0, 0, 0, 0, 0, numSamples, 0, 0, 0, 0, 0, 0, 0];
    const allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const hiddenBars = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];

    // in the very beginning, hide all the bars (except the middle one)
    hiddenBars.map((index) => {
        const curBar = index + 1;
        const childBar = ".container :nth-child(" + curBar + ")";

        $(childBar).toggleClass("clicked");
    });

    // in the very beginning, hide all the trees (except the middle one)
    for (let i = 0; i < 15; i++) {
        if (i !== 7) {
            // shown
            $(".trees").append(
                '<div class="tree" style="opacity: 0"><img src="../images/trees/tree0.png"></div>'
            );
        } else {
            // hidden
            $(".trees").append(
                '<div class="tree"><img src="../images/trees/tree0.png"></div>'
            );
        }
    }

    // add "hidden" apples
    allBars.map((index) => {
        const curBar = index + 1;
        const childBar = ".container :nth-child(" + curBar + ")";
        const curApples = numApples[index];

        // adding apples up column
        for (let i = 0; i < curApples; i++) {
            $(childBar).append(
                '<div class="img"><img hidden class="apple" src="../images/apple.png"></div>'
            );
        }
    });

    // after the bar is clicked, show the "hidden" apples
    $(".bar").click(function () {
        $(this).toggleClass("clicked");
        $(this).children("div").children("img").toggle("show");

        $("#default-button").removeClass("disabled");
    });

    // PAGE NAVIGATION
    $(".default-button").click(function () {
        // update local storage components
        localStorage["curriculumTrial"] = JSON.stringify(
            curriculumMap[currentTrial - 1]
        );

        const trial = `Trial #${currentTrial - 1}`;
        const map = new Map();

        map.set("statusTrial", "valid");
        map.set("curriculumTrial", localStorage.getItem("curriculumTrial"));
        localStorage[trial] = JSON.stringify(Array.from(map.entries()));

        window.location.href = "../startApples/start.html";
    }); // use web sockets to go to next page
});
