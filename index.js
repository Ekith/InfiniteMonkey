const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


window.addEventListener("DOMContentLoaded",init)


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

function writeFile(filename, data) {

}

function writePage() {
    let letter = generateRandomChar(alphabet);
    document.getElementById("monkey").innerHTML += letter;
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


function init() {


    console.log("2 " + readFile("monkey.txt"));

    let interval1 = window.setInterval(writePage, 1);

    document.getElementById("resetButton").addEventListener("click", function () {
        window.clearInterval(interval1);
    });

    document.getElementById("searchButton").addEventListener("click", function () {
       searchInStr(document.getElementById("searchInput").value);
    });

}