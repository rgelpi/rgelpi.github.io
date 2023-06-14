$(document).ready(function () {
    const controller = new AbortController();
    const urlParams = new URLSearchParams(window.location.search);

    // check how many samples
    var clicked = 5;

    // change defaults
    if (urlParams.get("c") !== "null" && urlParams.has("c")) {
        clicked = parseInt(urlParams.get("c")); // c = number of default clicks
    }

    // apple function
    var numApples = [1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1];

    // specify which function
    if (urlParams.get("function") === "gaussian") {
        numApples = [1, 2, 5, 8, 11, 13, 14, 14, 13, 11, 8, 5, 2, 1];
    } else if (urlParams.get("function") === "neglin") {
        numApples = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    } else if (urlParams.get("function") === "expon") {
        numApples = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 6, 9, 14];
    }

    var allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    barsChosen = []; // keep track of which bas have been clicked

    $(".trees").append('<div class="whitespace"></div>');
    for (let i = 0; i < 14; i++) {
        // add trees
        $(".trees").append(
            '<div class="tree"><img src="../images/tree.png"></div>'
        );
        $(".lines").append(
            '<div class="line">' +
                (i + 1) +
                '<img src="../images/time.png"></div>'
        );
    }
    $(".trees").append('<div class="whitespace"></div>');

    // add apples
    var addApples = allBars.map((c) => {
        var bar = c + 1;
        var whichbar = ".container :nth-child(" + bar + ")";
        var apples = numApples[c];

        // adding apples up column
        for (let i = 0; i < apples; i++) {
            $(whichbar).each(function (idx, li) {
                var obj = $(li);

                if (obj.hasClass("bar")) {
                    obj.append(
                        '<div class="img"><img hidden class="apple" src="../images/apple.png"></div>'
                    );
                }
            });
        }
    });

    document.getElementById("howmany").innerHTML = clicked + " Bars Left!";

    // check how many bars are left to check
    $(".bar").click(function () {
        // still have bars to click
        if (clicked > 0) {
            $(this).toggleClass("clicked");
            $(this).children("div").children("img").toggle("show");
            barsChosen.push($(".bar").index(this)); // keep track of which bar was clicked
        }

        clicked -= 1;

        // update amount of bars left
        if (clicked > 1) {
            document.getElementById("howmany").innerHTML =
                clicked + " Bars Left!";
        } else if (clicked == 1) {
            document.getElementById("howmany").innerHTML = "Last Bar!";
        } else {
            document.getElementById("howmany").innerHTML = "No More Bars!";
            // controller.abort();
        }

        // no more bars to click
        if (clicked == 0) {
            $("#default-button").removeClass("disabled");
            // $(".default-button").show();

            var remainingBars = allBars.filter(
                (value) => !barsChosen.includes(value)
            );

            console.log(barsChosen, "CLICKED BARS");
            console.log(remainingBars, "REMAINING BARS");

            localStorage["barsChosen"] = barsChosen;
            localStorage["remainingBars"] = remainingBars;
        }
    });

    // after the last bar is clicked, unhide the button
    // $(".default-button").hide();

    $(".default-button").click(function () {
        var predictions = JSON.stringify(barsChosen);

        window.location.href =
            "../predictApples/predict.html?predict=" +
            predictions +
            "&function=" +
            urlParams.get("function");
    }); // use web sockets to go to next page

    // function isTouchDevice() {
    //   try {
    //     //We try to create TouchEvent. It would fail for desktops and throw error
    //     document.createEvent("TouchEvent");
    //     return true;
    //   } catch (e) {
    //     return false;
    //   }
    // }
    //
    // const move = (e) => {
    // 	let monkey = document.getElementById('monkey')
    //   //Try, catch to avoid any errors for touch screens (Error thrown when user doesn't move his finger)
    //   try {
    //     //PageX and PageY return the position of client's cursor from top left of screen
    //     var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    //     var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    //   } catch (e) {}
    //   //set left and top of div based on mouse position
    //   monkey.style.left = x + 50 + "px";
    // //   monkey.style.top = y + 50 + "px";
    // };
    //
    // //For mouse
    // document.addEventListener("mousemove", (e) => {
    //   move(e);
    // }, { signal: controller.signal });
    // //For touch
    // document.addEventListener("touchmove", (e) => {
    //   move(e);
    // }, { signal: controller.signal });
});
