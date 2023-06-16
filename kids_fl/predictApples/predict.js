$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("predict")) {
        // get clicked bars
        var predictions = JSON.parse(urlParams.get("predict"));
    } else {
        // default clicked bars
        var predictions = [3, 5, 7, 9, 11];
    }

    localStorage["chosenSamples"] = predictions;

    $(".ghost-bars").hide();
    $(".ghost-bars")
        .children("div")
        .css("background-color", "rgba(255, 255, 255, 0)");

    // apple function
    var numApples = [];

    // specify which function
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
    } else {
        numApples = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    const allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    var barsChosen = predictions;

    // choose which bars to predict apples from
    var remainingBars = allBars.filter((value) => !barsChosen.includes(value));

    // add "shown" apples to clicked bars
    var addApples = barsChosen.map((c) => {
        var bar = c + 1;
        var whichbar = ".container :nth-child(" + bar + ")";
        var apples = numApples[c];

        $(whichbar).toggleClass("clicked");

        // adding apples up column
        for (let i = 0; i < apples; i++) {
            $(whichbar).each(function (idx, li) {
                var obj = $(li);
                if (obj.hasClass("bar")) {
                    obj.append(
                        '<div class="img"><img class="apple" src="../images/apple.png"></div>'
                    );
                }
            });
        }
    });

    // add trees
    for (let i = 0; i < 15; i++) {
        $(".trees").append(
            '<div class="tree"><img src="../images/tree.png"></div>'
        );

        // $(".lines").append(
        //     '<div class="line">' +
        //         (i + 1) +
        //         '<img src="../images/time.png"></div>'
        // );

        // $(".lines").append('<div class="line text">' + (i + 1) + "</div>");
        // let calendar = <img src="../images/tree.png"></img>;

        $(".lines").append(
            '<div class="line"><img src="../images/calendar/cal' +
                (i + 1) +
                '.jpg"></img></div>'
        );
    }

    // mark clickable bars
    remainingBars.map((c) => {
        var bar = c + 1;
        var whichbar = ".container :nth-child(" + bar + ")";
        $(whichbar).addClass("clickable");
        // $(".bar").addClass("add-mode");
    });

    let isAddingMode = true;

    // update display of apples being clicked and status of prediction button
    $(".clickable").click(function () {
        // display "clicked" apples to know how many are clicked already per bar
        if (isAddingMode) {
            $(this).append(
                '<div class="img"><img class="ghost-apple" src="../images/apple.png"></div>'
            );
        } else {
            $(this).children(".img").last().remove();
        }

        // enable button if there's at least one apple in each "selected" bar
        if (
            remainingBars
                .map((element) => {
                    var bar = element + 1;
                    var whichbar = ".container :nth-child(" + bar + ")";
                    return (
                        $(whichbar).children("div").children("img").length > 0
                    );
                })
                .every((v) => v === true)
        ) {
            $("#default-button").removeClass("disabled");
        } else {
            $("#default-button").addClass("disabled");
        }
    });

    let curMode = "add";

    $(".add-button").click(function () {
        isAddingMode = true;

        // $(".bar").removeClass("subtract-mode").addClass("add-mode");
        if (curMode !== "add") {
            $(".add-button").toggleClass("pressed");
            $(".subtract-button").toggleClass("pressed");
        }

        // enable button if there's at least one apple in each "selected" bar
        if (
            remainingBars
                .map((element) => {
                    var bar = element + 1;
                    var whichbar = ".container :nth-child(" + bar + ")";
                    return (
                        $(whichbar).children("div").children("img").length > 0
                    );
                })
                .every((v) => v === true)
        ) {
            $("#default-button").removeClass("disabled");
        } else {
            $("#default-button").addClass("disabled");
        }

        curMode = "add";
    });

    $(".subtract-button").click(function () {
        isAddingMode = false;

        // $(".bar").removeClass("add-mode").addClass("subtract-mode");
        if (curMode !== "subtract") {
            $(".subtract-button").toggleClass("pressed");
            $(".add-button").toggleClass("pressed");
        }

        // enable button if there's at least one apple in each "selected" bar
        if (
            remainingBars
                .map((element) => {
                    var bar = element + 1;
                    var whichbar = ".container :nth-child(" + bar + ")";
                    return (
                        $(whichbar).children("div").children("img").length > 0
                    );
                })
                .every((v) => v === true)
        ) {
            $("#default-button").removeClass("disabled");
        } else {
            $("#default-button").addClass("disabled");
        }

        curMode = "subtract";
    });

    // update number of errors with the number of apples clicked
    var isDone = false;
    $("#default-button").click(function () {
        // disable add and subtract buttons
        $(".add-button").toggleClass("disabled");
        $(".subtract-button").toggleClass("disabled");

        if (!isDone) {
            // calculate number of unclicked apples per bar
            var absoluteError = remainingBars.map((c) => {
                var bar = c + 1;
                var whichbar = ".container :nth-child(" + bar + ")";

                var trueApples = numApples[c];
                var guessedApples = $(whichbar)
                    .children("div")
                    .children("img").length;

                return Math.abs(trueApples - guessedApples);
            });

            var guessedApples = remainingBars.map((c) => {
                var bar = c + 1;
                var whichbar = ".container :nth-child(" + bar + ")";
                var guessedApples = $(whichbar)
                    .children("div")
                    .children("img").length;

                return guessedApples;
            });

            var trueApples = remainingBars.map((c) => {
                return numApples[c];
            });

            // reveal unclicked apples in the clickable bars
            remainingBars.map((c) => {
                var bar = c + 1;
                var whichbar = ".ghost-bars :nth-child(" + bar + ")";
                var apples = numApples[c];

                for (let i = 0; i < apples; i++) {
                    $(whichbar).each(function (idx, li) {
                        var obj = $(li);

                        if (obj.hasClass("bar")) {
                            obj.append(
                                '<div class="img"><img class="apple" src="../images/clear_apple_5.png"></div>'
                            );
                        }
                    });

                    $(whichbar).children("div").children("img");

                    $(whichbar)
                        .children("div")
                        .children("img")
                        .css("cursor", "not-allowed");

                    $(whichbar).css("background-color", "#9ec4e7");

                    $(".container :nth-child(" + bar + ")").removeClass(
                        "clickable"
                    );

                    $(".container :nth-child(" + bar + ")")
                        .children("div")
                        .children("img")
                        .css("cursor", "not-allowed");

                    $(".container :nth-child(" + bar + ")")
                        .children("div")
                        .children("img")
                        .css("pointer-events", "none");
                }
            });

            // reveal actual apples in the chosen bars
            var addApples = barsChosen.map((c) => {
                var bar = c + 1;
                var whichbar = ".ghost-bars :nth-child(" + bar + ")";
                var apples = numApples[c];

                // $(whichbar).toggleClass("");

                // adding apples up column
                for (let i = 0; i < apples; i++) {
                    $(whichbar).each(function (idx, li) {
                        var obj = $(li);

                        if (obj.hasClass("bar")) {
                            obj.append(
                                '<div class="img"><img class="clear-apple" src="../images/clear_apple_5.png"></div>'
                            );
                        }
                    });

                    $(whichbar).children("div").children("img");

                    $(whichbar)
                        .children("div")
                        .children("img")
                        .css("cursor", "not-allowed");

                    $(".container :nth-child(" + bar + ")").removeClass(
                        "clickable"
                    );

                    $(".container :nth-child(" + bar + ")")
                        .children("div")
                        .children("img")
                        .css("cursor", "not-allowed");

                    $(".container :nth-child(" + bar + ")")
                        .children("div")
                        .children("img")
                        .css("pointer-events", "none");
                }
            });

            localStorage["guessApples"] = JSON.stringify(guessedApples);
            localStorage["trueApples"] = JSON.stringify(trueApples);
            localStorage["errorApples"] = absoluteError
                .reduce((a, b) => a + b, 0)
                .toString();

            console.log(localStorage);

            $(".ghost-bars").show();
            isDone = true;

            document.getElementById("error").innerHTML =
                "This is How Many Apples There Really Were!";

            document.getElementById("buttontext").innerHTML = "Finish!";
        } else {
            // show ending page
            $("div").hide();
            $("#hooray").show();
        }
    });
});
