//some element is also used by other files, but due to the menu is all needed for displating and hiding 
//most of them are initialized here for simple navigation
let menu = document.getElementById("mainMenu"),
    shader = document.getElementById("shader"),
    gamePlay = document.getElementById("gamePlay"),
    settings = document.getElementById("settingsSection"),
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
    menu.style.display = "block";
    shader.style.display = "none";
    gamePlay.style.display = "none";

    settings.className = "subMenu";
    gameOverMenu.className = "subMenu";
    aboutSection.className = "subMenu";
    highScoreSection.className = "subMenu";
        
    //if the trigger is triggered from in-game reset every game data's and stop all game loops
    if (gameBoardShown && !settingFromPause) {
        gameBoardShown = !gameBoardShown;
        paused = false;
        restartGame();
    }else if (settingFromPause) {
        //if the goBack function is triggered from the settings setion while the setting previously from the pause menu 
        gamePlay.style.display = "block";
        menu.style.display = "none";
        //then reset the status where the setting is not longer visible for the user until next trigger from elsewhere
        settingFromPause = false;
        showPauseMenu();
    }
}