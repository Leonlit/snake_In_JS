let paused = false;
let pauseMenu = document.getElementById("pauseMenu");

//pausing the game by showing relevent menu  and image while stopping the game loop
//and play a sound when menu pressed
function pauseGame () {
    if (!paused && gameStatus != -1 ) {
        paused = true;
        showPauseMenu()
        stopGameLoop();
        playAudio(5)
    }else {
        hidePauseMenu();
        unpauseGame();
        paused = false;
        playAudio(5)
    }
}

//unpause the menu while restarting the game loop and timer loop
function unpauseGame () {
    if (gameStatus != -1 && gameStatus != 0) {
        timer = setInterval(timerCount,1000);
        interval = setInterval(update,speed);
    }
}

//simple restart game function, resetting datas and hiding the pause menu and stopping the game loop
function restartGame () {
    hidePauseMenu();
    stopGameLoop();
    reset();
    paused = false;
}

//this variable is used so that when the player closed the go back to menu sign,
//it'll go to pause menu instead of going straight to main menu
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
