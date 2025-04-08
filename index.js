const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


window.addEventListener("DOMContentLoaded",init)

let monkey = ""
let maxChar = 0
let pause = false

function generateRandomChar(alphabet) {
    let n = alphabet.length;
    let rdm = getRandomInt(n);
    return alphabet[rdm];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



// return the content of the file give in argument
function readFile(filename) {
    return 'Gnagnagna'
}
// write data into a github file
function writeFile(filename, data) {

}


function writePage(text) {
    if (pause == false)
        if (maxChar > 0) {
            let len = text.length;
            document.getElementById("monkey").innerHTML = text.substring(len - maxChar, len)
        }
        else {
            document.getElementById("monkey").innerHTML = text;
        }
    document.getElementById("nbChar").innerHTML = text.length;
}

function searchInStr(part) {
    if (part !== "") {
        let strComp = document.getElementById("monkey").innerHTML;
        if (strComp.includes(part)) {
            document.getElementById("resSearch").innerHTML = "Trouvé";
        }
        else {
            document.getElementById("resSearch").innerHTML = "Non trouvé";
        }
    }
    else {
        document.getElementById("resSearch").innerHTML = "";
    }
}


function addChar() {
    let newChar = generateRandomChar(alphabet);
    monkey += newChar;
    writePage(monkey);
    writeFile("monkey.txt", newChar);
}


function init() {


    console.log("2 " + readFile("monkey.txt"));

    let interval1 = window.setInterval(addChar, 10);

    if (pause) {
        document.getElementById("pauseButton").innerHTML = "Pause";
    }
    else {
        document.getElementById("pauseButton").innerHTML = "Play";
    }


    document.getElementById("pauseButton").addEventListener("click", function () {
        pause = !pause;
        if (pause) {
            document.getElementById("pauseButton").innerHTML = "Pause";
        }
        else {
            document.getElementById("pauseButton").innerHTML = "Play";
        }
    });
    document.getElementById("searchButton").addEventListener("click", function () {
       searchInStr(document.getElementById("searchInput").value);
    });
    document.getElementById("all").addEventListener("click", function () {
        document.getElementById("nbWords").innerHTML = "All";

        document.getElementById("all").disabled = true;
        document.getElementById("1000").disabled = false;
        document.getElementById("100").disabled = false;

        maxChar = 0
    });
    document.getElementById("1000").addEventListener("click", function () {
        document.getElementById("nbWords").innerHTML = "1000";

        document.getElementById("all").disabled = false;
        document.getElementById("1000").disabled = true;
        document.getElementById("100").disabled = false;

        maxChar = 1000
    });
    document.getElementById("100").addEventListener("click", function () {
        document.getElementById("nbWords").innerHTML = "100";

        document.getElementById("all").disabled = false;
        document.getElementById("1000").disabled = false;
        document.getElementById("100").disabled = true;

        maxChar = 100
    });


}