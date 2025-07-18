

const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
const numbers = '0123456789';
const specialCase = "éèêëôîïçàâä";



const alphabet = lowerCase + upperCase + specialChars + numbers + specialCase;


window.addEventListener("DOMContentLoaded",init)

let interval1

let monkey = ""
let maxChar = 0
let pause = false
let personalizeMode = false;
const timerSpeedDefault = 0.1

function generateRandomChar(alphabet) {
    let n = alphabet.length;
    let rdm = getRandomInt(n);
    return alphabet[rdm];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function calculateProbabilityOld(str) {
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

function calculateProbability(str) {
    return 1-Math.pow(1-1/Math.pow(alphabet.length, str.length), monkey.length-str.length+1);
}


// Escaping for Insertion in HTML
function escapeForHTML(str) {
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
            document.getElementById("personalize").disabled = false;
            maxChar = listNumber[i];

            document.getElementById("personalizeEntry").disabled = true;
            personalizeMode = false;

        });
    }
    document.getElementById("all").addEventListener("click", function () {
        document.getElementById("nbWords").innerHTML = "All";

        document.getElementById("all").disabled = true;
        for (let j=0; j < listNumber.length; j++) {
            document.getElementById(listNumber[j] + "").disabled = false;
        }
        document.getElementById("personalize").disabled = false;
        maxChar = 0

        document.getElementById("personalizeEntry").disabled = true;
        personalizeMode = false;
    });

    let buttons = document.getElementById("charInfos");
    let button1 = document.createElement("button");
    button1.id = "personalize"
    button1.innerHTML = "Personalize";
    buttons.appendChild(button1);

    let input1 = document.createElement("input");
    input1.id = "personalizeEntry";
    input1.type = "text"
    input1.value = "100";
    input1.onchange = function () {
        let value = input1.value;
        if (value <= 0 || isNaN(parseInt(value))) {
            value = 1;
            input1.value = value;
        }
        if (input1.value === "") {
            maxChar = 100;
        }
        else {
            maxChar = parseInt(value);
        }
        document.getElementById("nbWords").innerHTML = "Personalize - " + maxChar;
    }
    buttons.appendChild(input1);

    document.getElementById("personalize").addEventListener("click", function () {
        maxChar = document.getElementById("personalizeEntry").value;
        document.getElementById("nbWords").innerHTML = "Personalize - " + maxChar;

        document.getElementById("all").disabled = false;
        for (let j=0; j < listNumber.length; j++) {
            document.getElementById(listNumber[j]).disabled = false;
        }
        document.getElementById("personalize").disabled = true;

        document.getElementById("personalizeEntry").disabled = false;
        personalizeMode = true;
    })


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

function create_input_interval(){
    let input_speed = document.getElementById("intervalSpeed")
    input_speed.value = timerSpeedDefault;
    input_speed.onchange = function () {
        let value
        if (input_speed.value === "") {
            value = 0.5;
        }
        else if (parseInt(input_speed.value) < 0) {
            input_speed.value = 0.5;
            value = 0.5;
        }
        else {
            value = parseInt(input_speed.value);
        }

        clearInterval(interval1);
        interval1 = setInterval(addChar, value*1000)
    }
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

    interval1 = window.setInterval(addChar, timerSpeedDefault*1000);

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
    document.getElementById("personalizeEntry").disabled = true;

    create_input_interval()

    usefulButton()

}