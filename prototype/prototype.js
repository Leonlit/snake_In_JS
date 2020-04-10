"use strict"

let currentFrame = 4;
let frameInterval;
let targetElement;
let animationStoped = false;
let audioDisabled = false;
let musicDisabled = false;

const fps = 3;

let stopAnimation = () =>{
    animationStoped = true;
    currentFrame = 4;
}

/*

let fpsInterval,
    startedTimeStamp, 
    currentTimeStamp, 
    lastTimeStamp, 
    elapsedTimeStamp;

let startAnimation = (event) => {
    animationStoped = false;
    console.log(event.target.id);
    if (!audioDisabled && !musicDisabled) {
        targetElement = event.target.id;
        fpsInterval = 1000 / fps;
        lastTimeStamp = Date.now();
        startedTimeStamp = lastTimeStamp;
        frameInterval = animationInterval();
    }
}

let animationInterval = () => {
    currentTimeStamp = Date.now();
    elapsedTimeStamp = currentTimeStamp - lastTimeStamp;
    if (elapsedTimeStamp > fpsInterval) {
        animateSprite();
        lastTimeStamp = currentTimeStamp - (elapsedTimeStamp % fpsInterval);
    }
    if(!animationStoped) window.requestAnimationFrame(animationInterval);
}

let setAttributes = (element, attrs) => {
    for (let key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
}

*/