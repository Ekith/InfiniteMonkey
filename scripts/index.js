

const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
const numbers = '0123456789';
const specialCase = "éèêëôîïçàâä";



const alphabet = lowerCase + upperCase + specialChars + numbers + specialCase;


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

function calculateProbability(str) {
    let prob = 1;
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        let index = alphabet.indexOf(char);
        if (index !== -1) {
            prob *= 1 / alphabet.length;
        } else {
            prob *= 0;
        }
    }
    return prob;
}


// Escaping for Insertion in HTML
function escapeForHTML(str) {
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
            document.getElementById("monkeyText").innerHTML = text.substring(len - maxChar, len)
        }
        else {
            document.getElementById("monkeyText").innerHTML = text;
        }
    document.getElementById("nbChar").innerHTML = text.length;
}


function allIndex(str, part) {
    let indices = [];
    let index = str.indexOf(part);
    while (index < str.length && index > 0) {
        indices.push(index);
        index = str.indexOf(part, index + part.length);
    }
    return indices;
}


function searchInStr(strComp, strPart) {
    let newStrComp = escapeForHTML(strComp);
    let indices = allIndex(newStrComp, strPart);
    if (strPart !== "") {
        if (indices.length > 0) {
            document.getElementById("resSearch").innerHTML = "Trouvé (x" + indices.length + ")";
            document.getElementById("proba").innerHTML = "Probability : " + calculateProbability(strPart);
            // console.log(indices);
            let res = newStrComp.substring(0, indices[0]);
            for (let i = 0; i < indices.length - 1; i++) {
                res += "<span class='highlight'>" + newStrComp.substring(indices[i], indices[i] + strPart.length) + "</span>";
                res += newStrComp.substring(indices[i] + strPart.length, indices[i + 1]);
            }
            res += "<span class='highlight'>" + newStrComp.substring(indices[indices.length - 1], indices[indices.length - 1] + strPart.length) + "</span>";
            res += newStrComp.substring(indices[indices.length - 1] + strPart.length, newStrComp.length);
            return res;
        } else {
            document.getElementById("resSearch").innerHTML = "Non trouvé";
            document.getElementById("proba").innerHTML = "Probability : " + calculateProbability(strPart);
        }
    }
    else {
        document.getElementById("resSearch").innerHTML = "";
        document.getElementById("proba").innerHTML = "";
    }
    return newStrComp;
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
}


function addChar() {
    let newChar = generateRandomChar(alphabet);
    monkey += newChar;
    let part = document.getElementById("searchInput").value;
    let monkeyWithHighlight = searchInStr(monkey, part);
    writePage(monkeyWithHighlight);
    console.log(monkey);
    // writeFile("monkey.txt", newChar);
}



function init() {

    let interval1 = window.setInterval(addChar, 100);

    document.getElementById("alphabetText").innerHTML += " " + alphabet + " (" + alphabet.length + " chars)";

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