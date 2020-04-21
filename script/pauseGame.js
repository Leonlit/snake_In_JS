let paused = false;
let pauseMenu = document.getElementById("pauseMenu");

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

//this variable is used so that when the player closed the go back to menu sign, it'll go to pause menu instead of going straight to
//main menu
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
