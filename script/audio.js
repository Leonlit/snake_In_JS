let song = document.getElementById("music"),
    audioBtn = document.getElementById("audioSprite"),
    musicBtn = document.getElementById("musicSprite"),
    disableSectionSetting = document.getElementById("settingAudioAndMusicToggle"),
    musicCheckox = disableSectionSetting.getElementsByTagName("input")[0],
    audioCheckox = disableSectionSetting.getElementsByTagName("input")[1];
    //half the current volume
    song.volume = 0.5;

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
        audioCheckox.checked = false;
    }else {
        audioBtn.style.backgroundPosition = "-150px";
        audioBtn.style.animation = "none";
        audioBtn.removeEventListener("mouseenter", startAudioHower);
        audioCheckox.checked = true;
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
        musicCheckox.checked = false;
    }else {
        song.pause();
        musicBtn.style.backgroundPosition = "-150px";
        musicBtn.style.animation = "none";
        musicBtn.removeEventListener("mouseenter", startMusicHower);
        musicCheckox.checked = true;
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
//The available sound effects
//["btnClick", "score", "poison", "slow", "speed", "pause", "wallhit", "start"];
function playAudio (index) {
    if (!audioDisabled) {
        let audio = document.getElementById("soundEffects");
        let source = audio.getElementsByTagName("audio")[index];
        source.volume = audioVolume;
        source.play();
    }
}