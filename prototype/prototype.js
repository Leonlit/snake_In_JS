'use strict'

let audioDisabled = false,
    musicDisabled = false;

let menu = document.getElementById("mainMenu"),
    settings = document.getElementById("settings"),
    gamePlay = document.getElementById("gamePlay"),
    aboutSection = document.getElementById("aboutSection"),
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
}

function hideGameBoard () {
    gamePlay.style.display = "none";
    menu.style.display = "block";
}

function showAboutSection () {
    aboutSection.classList.remove("subMenu");
    aboutSection.classList.add("menus");
    menu.style.display = "none";
}

function hideAboutSection () {
    aboutSection.classList.remove("menus");
    aboutSection.classList.add("subMenu");
    menu.style.display = "block";
}

