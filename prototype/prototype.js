'use strict'

let audioDisabled = false,
    musicDisabled = false,
    noHighScore = true;

let menu = document.getElementById("mainMenu"),
    settings = document.getElementById("settings"),
    gamePlay = document.getElementById("gamePlay"),
    aboutSection = document.getElementById("aboutSection"),
    highScoreSection = document.getElementById("highScoreSection"),
    highScoreBoard = document.getElementById("highScoreBoard");


//need implementation (not enough assets)
let playAudio = () => {}
let stopAudio = () => {}
let playMusic = () => {}
let stopMusic = () => {}

function toggleAudio () {
    audioDisabled = !audioDisabled;
    if (audioDisabled) {
        playAudio();
    }else {
        stopAudio();
    }
    console.log(audioDisabled)
}

function toggleMusic () {
    musicDisabled = !musicDisabled;
    if (musicDisabled) {
        playMusic();
    }else {
        stopMusic();
    }
    console.log(musicDisabled)
}

function showGameBoard () {    
    gamePlay.style.display = "block";
    menu.style.display = "none";
}

function showAboutSection () {
    aboutSection.classList.remove("subMenu");
    aboutSection.classList.add("menus");
    menu.style.display = "none";
}

function showHighscore () {
    highScoreSection.classList.remove("subMenu");
    highScoreSection.classList.add("menus");
    menu.style.display = "none";
}

function goBackToMenu () {
    aboutSection.className = "subMenu";
    highScoreSection.className = "subMenu";
    gamePlay.className = "subMenu"
    settings.className = "subMenuy";
    menu.style.display = "block";
}

//storing scores so that the system could know whether player curret score is a new high records
let scores = [],
    highScores,
    parsedJSON;
function constructTableData () {
    let JSONData = localStorage.getItem("highScore");
    if (JSONData != null) {
        parsedJSON = JSON.parse(JSONData);
        highScores = parsedJSON["highScores"];
        console.log(parsedJSON);
        console.log(highScores)
        for (let i = 0; i< highScores.length;i++) {
            let currentRecord = highScores[i];
            scores.push(currentRecord["score"]);
            let element = `<tr>
                                <td>${i+1}</td>
                                <td>${currentRecord["name"]}</td>
                                <td>${currentRecord["score"]}</td>
                                <td>${formatCurrentTime(currentRecord["date"])}</td>
                           </tr>`;
            highScoreBoard.innerHTML += element;
        }
    }else {
        console.log("Records empty")
    }
}

function formatCurrentTime () {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDay();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();
    return `${day}/${month}/${year} , ${hour}:${minute}`;
}

function saveNewHighScore() {

}