let song = document.getElementById("music"),
    audioBtn = document.getElementById("audioSprite"),
    musicBtn = document.getElementById("musicSprite");
    //half the current volume
    song.volume = 0.5;

//The available sound effects
const effects = ["btnClick", "score", "poison", "slow", "speed", "pause", "wallhit", "start"];

let audioVolume = 0.4,
    audioDisabled = false,
    musicDisabled = false;

//disable audio to play such as button click, eat fruit, game over and etc
function toggleAudio () {
    audioDisabled = !audioDisabled;
    if (!audioDisabled) {
        audioBtn.addEventListener("mouseenter", startAudioHower);
        audioBtn.addEventListener("mouseout", stopAudioHower);
        audioBtn.style.backgroundPosition = "-100px"
    }else {
        audioBtn.style.backgroundPosition = "-150px";
        audioBtn.style.animation = "none";
        audioBtn.removeEventListener("mouseenter", startAudioHower);
    }
}

//need seperate function as the remover of event need the same structure as when we created the listener at first
function startAudioHower () {
    audioBtn.style.animation = "animate50px 0.5s steps(3) infinite";
}

function stopAudioHower () {
    audioBtn.style.animation = "none";
}

//music is for the background music, need to change the song when entered the board.
function toggleMusic () {
    musicDisabled = !musicDisabled;
    if (!musicDisabled) {
        song.play();
        musicBtn.addEventListener("mouseenter", startMusicHower);
        musicBtn.addEventListener("mouseout", stopMusicHower);
        musicBtn.style.backgroundPosition = "0px"
    }else {
        song.pause();
        musicBtn.style.backgroundPosition = "-150px";
        musicBtn.style.animation = "none";
        musicBtn.removeEventListener("mouseenter", startMusicHower);
    }
}

function startMusicHower () {
    musicBtn.style.animation = "animate50px 0.5s steps(3) infinite";
}

function stopMusicHower () {
    musicBtn.style.animation = "none";
}

function changeMusicVolume(amount) {
    song.volume = amount;
}

function changeAudioVolume (amount) {
    audioVolume = amount;
}

//Sound effect for the whole game in an array
function playAudio (index) {
    if (!audioDisabled) {
        let winSound = new Audio(`asset/audio/${effects[index]}.mp3`);
        winSound.volume = audioVolume;
        winSound.play();
    }
}