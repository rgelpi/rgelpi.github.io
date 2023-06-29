$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);

    let currentTrial = localStorage.getItem("currentTrial");

    // choose tree image
    let treeImageNum = currentTrial;

    if (treeImageNum > 6) {
        treeImageNum = treeImageNum % 6;
    }

    // update defaults (number of samples) based on URL link
    let numSamples = 5;

    if (urlParams.get("c") !== "null" && urlParams.has("c")) {
        numSamples = parseInt(urlParams.get("c"));
    }

    // apple function
    let numApples = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    if (urlParams.get("function") === "gaussian") {
        numApples = [1, 2, 5, 8, 11, 13, 14, 15, 14, 13, 11, 8, 5, 2, 1];
    } else if (urlParams.get("function") === "positive-linear") {
        numApples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    } else if (urlParams.get("function") === "negative-linear") {
        numApples = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    } else if (urlParams.get("function") === "positive-exponential") {
        numApples = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 6, 9, 15];
    } else if (urlParams.get("function") === "negative-exponential") {
        numApples = [15, 9, 6, 5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1];
    }

    const allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const chosenSamples = []; // keep track of which bas have been clicked

    // add all decorations
    for (let i = 0; i < 15; i++) {
        // add trees
        const treeImagePath = "../images/trees/tree" + treeImageNum + ".png";

        $(".trees").append(
            '<div class="tree"><img src=' + treeImagePath + "></div>"
        );

        // add calendar times
        $(".calendars").append(
            '<div class="calendar"><img src="../images/calendar/cal' +
                (i + 1) +
                '.jpg"></img></div>'
        );
    }

    // add all apples
    allBars.map((index) => {
        const curBar = index + 1;
        const childBar = ".container :nth-child(" + curBar + ")";
        const curApples = numApples[index];

        // adding apples up column
        for (let i = 0; i < curApples; i++) {
            $(childBar).each(function (index, li) {
                const obj = $(li);

                if (obj.hasClass("bar")) {
                    obj.append(
                        '<div class="img"><img hidden class="apple" src="../images/apples/apple.png"></div>'
                    );
                }
            });
        }
    });

    // update how many bars are left
    document.getElementById("howMany").innerHTML = numSamples + " Bars Left!";

    // check how many bars are left to check
    $(".bar").click(function () {
        // still have bars to click
        if (numSamples > 0) {
            $(this).toggleClass("clicked");
            $(this).children("div").children("img").toggle("show");

            // keep track of which bar was clicked
            chosenSamples.push($(".bar").index(this));
        }

        numSamples -= 1; // decrement when clicked

        // update amount of bars left
        if (numSamples > 1) {
            document.getElementById("howMany").innerHTML =
                numSamples + " Bars Left!";
        } else if (numSamples == 1) {
            document.getElementById("howMany").innerHTML = "Last Bar!";
        } else {
            document.getElementById("howMany").innerHTML = "No More Bars!";
            $("#default-button").removeClass("disabled"); // enable button
        }
    });

    // PAGE NAVIGATION
    $(".default-button").click(function () {
        const predictions = JSON.stringify(chosenSamples);

        window.location.href =
            "../predictApples/predict.html?predict=" +
            predictions +
            "&function=" +
            urlParams.get("function");
    }); // use web sockets to go to next page
});
