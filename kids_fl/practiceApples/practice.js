$(document).ready(function () {
    // const controller = new AbortController();  // mouse movement
    const urlParams = new URLSearchParams(window.location.search);

    // check how many samples
    var clicked = 1;

    // change defaults
    if (urlParams.get("c") !== "null" && urlParams.has("c")) {
        clicked = parseInt(urlParams.get("c")); // c = number of default clicks
    }

    // apple function
    var numApples = [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0];
    var allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var hiddenBars = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12];

    // in the very beginning, hide all the bars (except the middle one)
    var disableBars = hiddenBars.map((c) => {
        var bar = c + 1;
        var whichbar = ".container :nth-child(" + bar + ")";

        $(whichbar).toggleClass("clicked");
    });

    // in the very beginning, hide all the trees (except the middle one)
    for (let i = 0; i < 13; i++) {
        if (i !== 6) {
            $(".trees").append(
                '<div class="tree" style="opacity: 0"><img src="../images/tree.png"></div>'
            );
            // 			$('.roads').append('<div class="road"><img src="../images/road_segment.png"></div>')
        } else {
            $(".trees").append(
                '<div class="tree"><img src="../images/tree.png"></div>'
            );
            // 			$('.roads').append('<div class="road"><img src="../images/road_segment.png"></div>')
        }
    }

    // add "hidden" apples
    var addApples = allBars.map((c) => {
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
        if (clicked > 0) {
            $(this).toggleClass("clicked");
            $(this).children("div").children("img").toggle("show");
        }

        $("#default-button").removeClass("disabled");
        // $(".default-button").show(); // unhide the button
    });

    // after the bar is clicked, unhide the button
    // $(".default-button").hide();

    $(".default-button").click(function () {
        window.location.href =
            "../sampleApples/sample.html?c=" +
            urlParams.get("c") +
            "&function=" +
            urlParams.get("function");
    }); // use web sockets to go to next page

    // function isTouchDevice() {
    //     try {
    //         //We try to create TouchEvent. It would fail for desktops and throw error
    //         document.createEvent("TouchEvent");
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // }

    // const move = (e) => {
    //     let monkey = document.getElementById("monkey");
    //     //Try, catch to avoid any errors for touch screens (Error thrown when user doesn't move his finger)
    //     try {
    //         //PageX and PageY return the position of client's cursor from top left of screen
    //         var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    //         var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    //     } catch (e) {}
    //     //set left and top of div based on mouse position
    //     monkey.style.left = x + 50 + "px";
    //     //   monkey.style.top = y + 50 + "px";
    // };

    // //For mouse
    // document.addEventListener(
    //     "mousemove",
    //     (e) => {
    //         move(e);
    //     },
    //     { signal: controller.signal }
    // );
    // //For touch
    // document.addEventListener(
    //     "touchmove",
    //     (e) => {
    //         move(e);
    //     },
    //     { signal: controller.signal }
    // );
});
