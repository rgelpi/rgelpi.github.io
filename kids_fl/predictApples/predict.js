$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);

    let currentTrial = localStorage.getItem("currentTrial");
    let curriculumMap = JSON.parse(localStorage.getItem("curriculumMap"));
    let curriculumSize = localStorage.getItem("curriculumSize");

    // choose tree image
    let treeImageNum = currentTrial;

    if (treeImageNum > 6) {
        treeImageNum = treeImageNum % 6;
    }

    // update defaults (sampled bars) based on URL link
    let chosenSamples = [3, 5, 7, 9, 11];

    if (urlParams.has("predict")) {
        chosenSamples = JSON.parse(urlParams.get("predict"));
    }

    // hide ghost bars
    $(".ghost-bars").hide();
    $(".ghost-bars")
        .children("div")
        .css("background-color", "rgba(255, 255, 255, 0)");

    // apple function
    let numApples = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    if (urlParams.get("function") === "gaussian") {
        numApples = [1, 2, 5, 8, 11, 13, 14, 15, 14, 13, 11, 8, 5, 2, 1];
    } else if (urlParams.get("function") === "positive-linear") {
        numApples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    } else if (urlParams.get("function") === "negative-linear") {
        numApples = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    } else if (urlParams.get("function") === "positive-exponential") {
        numApples = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 7, 13, 23];
    } else if (urlParams.get("function") === "negative-exponential") {
        numApples = [23, 13, 7, 4, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    const allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // choose which bars to predict apples from
    const remainingBars = allBars.filter(
        (index) => !chosenSamples.includes(index)
    );

    // add "shown" apples to clicked bars
    chosenSamples.map((index) => {
        const curBar = index + 1;
        const childBar = ".container :nth-child(" + curBar + ")";
        const curApples = numApples[index];

        $(childBar).toggleClass("clicked");

        // adding apples up column
        for (let i = 0; i < curApples; i++) {
            $(childBar).each(function (index, li) {
                const obj = $(li);

                if (obj.hasClass("bar")) {
                    obj.append(
                        '<div class="img"><img class="apple" src="../images/apples/apple.png"></div>'
                    );
                }
            });
        }
    });

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

    // mark clickable bars
    remainingBars.map((index) => {
        const curBar = index + 1;
        const childBar = ".container :nth-child(" + curBar + ")";

        $(childBar).addClass("clickable");
    });

    // ADDING AND SUBTRACTING MODE
    const checkIfDone = function () {
        // enable button if there's at least one apple in each "selected" bar
        if (
            remainingBars
                .map((element) => {
                    const curBar = element + 1;
                    const childBar = ".container :nth-child(" + curBar + ")";
                    return (
                        $(childBar).children("div").children("img").length > 0
                    );
                })
                .every((v) => v === true)
        ) {
            $("#default-button").removeClass("disabled");
        } else {
            $("#default-button").addClass("disabled");
        }
    };

    let isAddingMode = true;

    // update display of apples being clicked and status of prediction button
    $(".clickable").click(function () {
        // display "clicked" apples to know how many are clicked already per bar
        if (isAddingMode) {
            $(this).append(
                '<div class="img"><img class="ghost-apple" src="../images/apples/apple.png"></div>'
            );
        } else {
            $(this).children(".img").last().remove();
        }

        checkIfDone();
    });

    let curMode = "add"; // checks which mode

    $(".add-button").click(function () {
        isAddingMode = true;

        if (curMode !== "add") {
            $(".add-button").toggleClass("pressed");
            $(".subtract-button").toggleClass("pressed");
        }

        checkIfDone();
        curMode = "add";
    });

    $(".subtract-button").click(function () {
        isAddingMode = false;

        if (curMode !== "subtract") {
            $(".subtract-button").toggleClass("pressed");
            $(".add-button").toggleClass("pressed");
        }

        checkIfDone();
        curMode = "subtract";
    });

    // update number of errors with the number of apples clicked
    let isAllDone = false;

    $("#default-button").click(function () {
        // disable add and subtract buttons
        $(".add-button").toggleClass("disabled");
        $(".subtract-button").toggleClass("disabled");

        if (!isAllDone) {
            // calculate number of unclicked apples per bar
            const guessedApples = remainingBars.map((index) => {
                const curBar = index + 1;
                const childBar = ".container :nth-child(" + curBar + ")";

                const guessedApples = $(childBar)
                    .children("div")
                    .children("img").length;

                return guessedApples;
            });

            const trueApples = remainingBars.map((index) => {
                return numApples[index];
            });

            const absoluteError = remainingBars.map((index) => {
                const curBar = index + 1;
                const childBar = ".container :nth-child(" + curBar + ")";

                const trueApples = numApples[index];
                const guessedApples = $(childBar)
                    .children("div")
                    .children("img").length;

                return Math.abs(trueApples - guessedApples);
            });

            // reveal unclicked apples in the clickable bars
            remainingBars.map((index) => {
                const curBar = index + 1;
                const childBar = ".ghost-bars :nth-child(" + curBar + ")";
                const curApples = numApples[index];

                const realBar = ".container :nth-child(" + curBar + ")";
                const guessedApples = $(realBar)
                    .children("div")
                    .children("img").length;

                if (guessedApples - curApples < 0) {
                    // underpredict (Os)
                    for (let i = guessedApples; i < curApples; i++) {
                        $(childBar).each(function (index, li) {
                            const obj = $(li);

                            if (obj.hasClass("bar")) {
                                obj.append(
                                    '<div class="img"><img class="apple" src="../images/apples/apple.png"><img class="circle-apple" src="../images/apples/circle.png"></div>'
                                );
                            }
                        });
                    }

                    for (let i = 0; i < guessedApples; i++) {
                        $(childBar).each(function (index, li) {
                            const obj = $(li);

                            if (obj.hasClass("bar")) {
                                obj.append(
                                    '<div class="img"><img class="apple" src="../images/apples/apple.png"></div>'
                                );
                            }
                        });
                    }
                } else if (guessedApples - curApples > 0) {
                    // overpredict (Xs)
                    for (let i = curApples; i < guessedApples; i++) {
                        $(childBar).each(function (index, li) {
                            const obj = $(li);

                            if (obj.hasClass("bar")) {
                                obj.append(
                                    '<div class="img"><img class="apple" src="../images/apples/cross.png"></div>'
                                );
                            }
                        });
                    }

                    for (let i = 0; i < curApples; i++) {
                        $(childBar).each(function (index, li) {
                            const obj = $(li);

                            if (obj.hasClass("bar")) {
                                obj.append(
                                    '<div class="img"><img class="apple" src="../images/apples/apple.png"></div>'
                                );
                            }
                        });
                    }
                } else {
                    // correct amount
                    for (let i = 0; i < curApples; i++) {
                        $(childBar).each(function (index, li) {
                            const obj = $(li);

                            if (obj.hasClass("bar")) {
                                obj.append(
                                    '<div class="img"><img class="apple" src="../images/apples/apple.png"></div>'
                                );
                            }
                        });
                    }
                }

                $(childBar).children("div").children("img");

                $(childBar)
                    .children("div")
                    .children("img")
                    .css("cursor", "not-allowed");

                $(".container :nth-child(" + curBar + ")").removeClass(
                    "clickable"
                );

                $(".container :nth-child(" + curBar + ")")
                    .children("div")
                    .children("img")
                    .css("cursor", "not-allowed");

                $(".container :nth-child(" + curBar + ")")
                    .children("div")
                    .children("img")
                    .css("pointer-events", "none");
            });

            // update local storage components
            localStorage["curriculumTrial"] = JSON.stringify(
                curriculumMap[currentTrial - 1]
            );
            localStorage["chosenSamples"] = JSON.stringify(chosenSamples);
            localStorage["guessApples"] = JSON.stringify(guessedApples);
            localStorage["trueApples"] = JSON.stringify(trueApples);
            localStorage["errorApples"] = absoluteError
                .reduce((a, b) => a + b, 0)
                .toString();

            // add trial component to local storage
            const trial = `Trial #${currentTrial - 1}`;
            const map = new Map();

            map.set("statusTrial", "valid");
            map.set("curriculumTrial", localStorage.getItem("curriculumTrial"));
            map.set("chosenSamples", localStorage.getItem("chosenSamples"));
            map.set("guessApples", localStorage.getItem("guessApples"));
            map.set("trueApples", localStorage.getItem("trueApples"));
            map.set("errorApples", localStorage.getItem("errorApples"));

            localStorage[trial] = JSON.stringify(Array.from(map.entries()));

            document.getElementById("error").innerHTML =
                "This is How Many Apples There Really Were!";

            if (currentTrial >= 1) {
                $("#default-button").text("Continue!");
            }

            if (currentTrial > curriculumSize) {
                $("#default-button").text("Finish!");
            }

            // reveal correct apples
            $(".ghost-bars").show();
            isAllDone = true;
        } else {
            if (currentTrial > curriculumSize) {
                // completed last trial
                window.location.href = "../finishApples/finish.html";
            } else {
                // still have trials to complete
                window.location.href = "../startApples/start.html";
            }
        }
    });
});
