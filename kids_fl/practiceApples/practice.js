$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    var numSamples = 5;

    // update defaults (number of samples) based on URL link
    if (urlParams.get("c") !== "null" && urlParams.has("c")) {
        numSamples = parseInt(urlParams.get("c"));
    }

    // apple function
    var numApples = [0, 0, 0, 0, 0, 0, 0, numSamples, 0, 0, 0, 0, 0, 0, 0];
    var allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    var hiddenBars = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];

    // in the very beginning, hide all the bars (except the middle one)
    hiddenBars.map((c) => {
        var bar = c + 1;
        var whichbar = ".container :nth-child(" + bar + ")";

        $(whichbar).toggleClass("clicked");
    });

    // in the very beginning, hide all the trees (except the middle one)
    for (let i = 0; i < 15; i++) {
        if (i !== 7) {
            $(".trees").append(
                '<div class="tree" style="opacity: 0"><img src="../images/tree.png"></div>'
            );
        } else {
            $(".trees").append(
                '<div class="tree"><img src="../images/tree.png"></div>'
            );
        }
    }

    // add "hidden" apples
    allBars.map((c) => {
        var bar = c + 1;
        var whichbar = ".container :nth-child(" + bar + ")";
        var apples = numApples[c];

        // adding apples up column
        for (let i = 0; i < apples; i++) {
            $(whichbar).append(
                '<div class="img"><img hidden class="apple" src="../images/apple.png"></div>'
            );
        }
    });

    document.getElementById("howmany").innerHTML = "Click the Bar!";

    // after the bar is clicked, show the "hidden" apples
    $(".bar").click(function () {
        $(this).toggleClass("clicked");
        $(this).children("div").children("img").toggle("show");

        $("#default-button").removeClass("disabled");
    });

    $(".default-button").click(function () {
        window.location.href = "../homeApples/home.html";
    }); // use web sockets to go to next page
});
