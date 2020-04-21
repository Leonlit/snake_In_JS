let 
    noHighScore = true;

//some element is also used by other files 
let menu = document.getElementById("mainMenu"),
    shader = document.getElementById("shader"),
    settings = document.getElementById("settingsSection"),
    gamePlay = document.getElementById("gamePlay"),
    aboutSection = document.getElementById("aboutSection"),
    highScoreBoard = document.getElementById("highScoreBoard"),
    highScoreSection = document.getElementById("highScoreSection");

function showGameBoard () {    
    gamePlay.style.display = "block";
    menu.style.display = "none";
    gameBoardShown = !gameBoardShown;
}

function showAboutSection () {
    aboutSection.className = "menus";
    menu.style.display = "none";
}

function showHighscore () {
    highScoreSection.className = "menus";;
    menu.style.display = "none";
    constructTableData();
}

function showSettings () {
    settings.className = "menus";
    menu.style.display = "none";
}

function goBack() {
    aboutSection.className = "subMenu";
    highScoreSection.className = "subMenu";
    gamePlay.style.display = "none"
    settings.className = "subMenu";
    menu.style.display = "block";
    gameOverMenu.className = "subMenu";
    shader.style.display = "none";
    //if the trigger is triggered from in-game reset every game data's and stop all game loops
    if (gameBoardShown && !settingFromPause) {
        gameBoardShown = !gameBoardShown;
        paused = false;
        restartGame();
    }else if (settingFromPause) {
        gamePlay.style.display = "block";
        menu.style.display = "none";
        showPauseMenu();
        settingFromPause = false;
    }
}