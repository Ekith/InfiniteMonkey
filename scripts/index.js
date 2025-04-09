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
    if (pause === false)
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


function buttonTruncate(listNumber) {
    for (let i=0; i < listNumber.length; i++) {
        let buttons = document.getElementById("charInfos");
        let button1 = document.createElement("button");
        button1.id = listNumber[i] + "";
        button1.innerHTML = listNumber[i];
        buttons.appendChild(button1);

        button1.addEventListener("click", function () {
            document.getElementById("nbWords").innerHTML = listNumber[i];

            document.getElementById("all").disabled = false;
            for (let j=0; j < listNumber.length; j++) {
                document.getElementById(listNumber[j]).disabled = j === i;
            }
            maxChar = listNumber[i];
        });
    }
    document.getElementById("all").addEventListener("click", function () {
        document.getElementById("nbWords").innerHTML = "All";

        document.getElementById("all").disabled = true;
        for (let j=0; j < listNumber.length; j++) {
            document.getElementById(listNumber[j] + "").disabled = false;
        }

        maxChar = 0
    });
}

function usefulButton() {
    document.getElementById("pauseButton").addEventListener("click", function () {
    pause = !pause;
    if (pause) {
        document.getElementById("pauseButton").innerHTML = "Play display";
    }
    else {
        document.getElementById("pauseButton").innerHTML = "Pause display";
    }
    });
    document.getElementById("searchButton").addEventListener("click", function () {
        searchInStr(document.getElementById("searchInput").value);
    });
}


function addChar() {
    let newChar = generateRandomChar(alphabet);
    monkey += newChar;
    writePage(monkey);
    writeFile("monkey.txt", newChar);
}




function init() {

    let interval1 = window.setInterval(addChar, 1);

    if (pause) {
        document.getElementById("pauseButton").innerHTML = "Play display";
    }
    else {
        document.getElementById("pauseButton").innerHTML = "Pause display";
    }


    buttonTruncate([10, 100, 500, 1000, 5000, 10000])
    document.getElementById("nbWords").innerHTML = "All";
    document.getElementById("all").disabled = true;

    usefulButton()

}