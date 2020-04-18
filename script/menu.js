'use strict'

let audioDisabled = false,
    musicDisabled = false,
    noHighScore = true;

let menu = document.getElementById("mainMenu"),
    shader = document.getElementById("shader"),
    settings = document.getElementById("settingsSection"),
    gamePlay = document.getElementById("gamePlay"),
    pauseMenu = document.getElementById("pauseMenu"),
    aboutSection = document.getElementById("aboutSection"),
    highScoreBoard = document.getElementById("highScoreBoard"),
    highScoreSection = document.getElementById("highScoreSection");
    


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
    gameBoardShown = !gameBoardShown;
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

function showSettings () {
    settings.classList.remove("subMenu");
    settings.classList.add("menus");
    menu.style.display = "none";
}

function goBack() {
    aboutSection.className = "subMenu";
    highScoreSection.className = "subMenu";
    gamePlay.style.display = "none"
    settings.className = "subMenu";
    menu.style.display = "block";
    //if the trigger is triggered from in-game reset every game data's and stop all game loops
    if (gameBoardShown && !settingFromPause) {
        gameBoardShown = !gameBoardShown;
        paused = false;
        stopGameLoop();
        reset();
        restartGame();
    }else if (settingFromPause) {
        gamePlay.style.display = "block";
        menu.style.display = "none";
        showPauseMenu();
        settingFromPause = false;
    }
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
    let dateObj = new Date(),
        year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        day = dateObj.getDay(),
        hour = dateObj.getHours(),
        minute = dateObj.getMinutes();
    return `${day}/${month}/${year} , ${hour}:${minute}`;
}

function saveNewHighScore(newScore) {
    if (scores.length != 0) {
        for (let i = 0; i< scores.length;i++) {
            if (scores[i] <= newScore["score"]) {
                for (let x = scores.length - 1; x > i ;x--) {
                    highScores[x] = highScores[x-1];
                }
                highScores[i] = newScore;
            }
        }
    }else highScores[0] = newScore;

    parsedJSON["highScores"] = highScores;
    localStorage.setItem("highScore", parsedJSON);
    //updating the table data
    constructTableData();
}

let paused = false;
function pauseGame () {
    if (!paused) {
        paused = true;
        showPauseMenu()
        stopGameLoop();
    }else {
        hidePauseMenu();
        unpauseGame();
        paused = false;
    }
}

function unpauseGame () {
    if (gameStatus != -1 && gameStatus != 0) {
        timer = setInterval(timerCount,1000);
        interval = setInterval(update,speed);
    }
}

function restartGame () {
    hidePauseMenu();
    stopGameLoop();
    reset();
    paused = false;
}

let settingFromPause = false;
function showSettingFromPause () {
    settingFromPause = true;
    hidePauseMenu();
    shader.style.display="block";
    showSettings();
}

function hidePauseMenu() {
    pauseMenu.style.display = "none";
    shader.style.display = "none";
}

function showPauseMenu () {
    pauseMenu.style.display = "block";
    shader.style.display = "block";
}

window.addEventListener("keydown", (event) => {
    let key = event.keyCode;
    if (key == 9 || key == 18) event.preventDefault();
});

function changeDirectionKey (event) {
    let target = event.target.id,
        inputField = document.getElementById(target),
        text = inputField.value,
        code = event.keyCode;

    //check whether there's a same key inside the direction array, if yes then dont change the key
    if (!directionKey.includes(code)) {
        console.log("doesnt exists");

        if (text.length > 1) {
            text = text.slice(text.length - 1);
        }

        //dont support shift , ctrl and alt
        if ((code >= 16 && code <= 18) || (code >= 112 && code <= 123)) {
            text = "";
        }else if (code < 48 || code > 90 ) {
            text = event.code;
        }

        switch (target) {
            case "keyForLeft":
                directionKey[0] = code;
                break;

            case "keyForUp":
                directionKey[1] = code;
                break;

            case "keyForRight":
                directionKey[2] = code;
                break;
            
            case "keyForDown":
                directionKey[3] = code;
                break;

                default:
                    console.log("something went wrong");
        }
    }else {
        console.log("exists")
        text = text.slice(0, text.length - 1);
    }

    inputField.value = text;
}