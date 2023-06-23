$(document).ready(function () {
    $("#default-button").click(function () {
        // remove items that are already in map
        localStorage.removeItem("curriculumMap");
        localStorage.removeItem("curriculumTrial");
        localStorage.removeItem("chosenSamples");
        localStorage.removeItem("guessApples");
        localStorage.removeItem("trueApples");
        localStorage.removeItem("errorApples");

        console.log(localStorage, "LOCAL");

        console.log(
            new Map(JSON.parse(localStorage.getItem("Trial #1"))),
            "TRIAL #1"
        );

        console.log(
            new Map(JSON.parse(localStorage.getItem("Trial #2"))),
            "TRIAL #2"
        );
        console.log(
            new Map(JSON.parse(localStorage.getItem("Trial #3"))),
            "TRIAL #3"
        );

        // WEB SOCKET
        //         <script type="text/javascript">
        //         var wso = new WebSocket("wss://somata.inf.ed.ac.uk/chunks/ws");
        //         var sentData = 0;
        //         var wsError = 0; // Keeps track of whether any websocket errors have occurred
        //         var prolificCode = "2D12D249";
        //         wso.onopen = function () {
        //             /*Send a small message to the console once the connection is established */
        //             console.log('chunk ws connection open.');
        //         }

        //         wso.onmessage = function (event) {
        //             message = JSON.parse(event.data);
        //             console.log('webSocket message: ' + event.data);
        //             if (sentData == 1) {
        //                 document.getElementById("codediv").innerHTML = "The survey is now complete. Thank you for your participation. Your completion code is " + prolificCode;
        //             }
        //         }

        //         wso.onerror = function (error) {
        //             console.log('webSocket error detected: ' + JSON.stringify(error, ["message", "arguments", "type", "name"]));
        //             wsError = 1;
        //         }
        //     </script>

        // <script type="text/javascript">

        //         $(function () {
        //             function nextButton() {
        //                 localStorage["experimentId"] = "functions_100";
        //                 var currentDate = new Date();
        //                 localStorage["submitDateTime"] = currentDate.toUTCString();
        //                 localStorage["timezoneOffset"] = currentDate.getTimezoneOffset().toString();
        //                 localStorage["isComplete"] = true;
        //                 var dataStr = JSON.stringify(localStorage);
        //                 if (sentData == 0) {
        //                     console.log("Sending data...")
        //                     wso.send(dataStr);
        //                     sentData = 1;
        //					   console.log("Data transfer complete.")
        //                 }
        //             };
        //             document.getElementById("button").onclick = nextButton;
        //         })
        //     </script>

        // window.location.href = "../homeApples/home.html";
    });
});
