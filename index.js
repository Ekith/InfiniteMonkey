const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


window.addEventListener("DOMContentLoaded",init)

let monkey = ""
let maxChar = 0

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
    if (maxChar > 0) {
        let len = text.length;
        document.getElementById("monkey").innerHTML = text.substring(len - maxChar, len)
    }
    else {
        document.getElementById("monkey").innerHTML = text;
    }
    document.getElementById("nbChar").innerHTML = document.getElementById("monkey").innerHTML.length;
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


    document.getElementById("stopButton").addEventListener("click", function () {
        window.clearInterval(interval1);
    });
    document.getElementById("searchButton").addEventListener("click", function () {
       searchInStr(document.getElementById("searchInput").value);
    });
    document.getElementById("all").addEventListener("click", function () {
        maxChar = 0
    });
    document.getElementById("1000").addEventListener("click", function () {
        maxChar = 1000
    });
    document.getElementById("100").addEventListener("click", function () {
        maxChar = 100
    });


}