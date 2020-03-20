'use strict'

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let box = 20;
let rows = canvas.height / box, columns = canvas.width / box;
let snake, interval, direction, xv, yv;
let score = 0, timer, seconds=0;
let scoreCont, timerCont, gameStatus = 0;
let gameLabel, startLabel;
let food = [], maxFood = 5;
let speed = 100;

//game status is used to indicate the game status
//	1:game running,
//	-1: game Over,
//	0:game not running

window.onload = () => {
	border();	//to draw the border for the canvas

	//timer and score elements selection
	timerCont = document.getElementById("timer");
	scoreCont = document.getElementById("scoreCount");
	gameLabel = document.getElementsByClassName("onboardMsg")[0].style;
	startLabel = document.getElementsByClassName("onboardMsg")[1].style;

	//adding event selection for the game
	//only let user be able to change status if and only if they are in the
	//correct gameStatus before changing to the next one
	//
	window.addEventListener("keydown", (event) => {
		if (event.keyCode == 32) {
			if (gameStatus == 0) {
				start();
			}
			if (gameStatus == -1) {
				reset();
			}
		}
		if (gameStatus == 1) {
			direction = event.keyCode;
		}
	});
}

let start = () => {
	startLabel.visibility = "hidden";
	gameStatus = 1;

	for (let x = 0; x < maxFood;x++) {
		food.push(new Food());
		food[x].pickLocation();
	}
	snake = new Snake(box*5, box*5);
	

	timer = setInterval(timerCount,1000);
	interval = setInterval(update,speed);
	snake.changeDirection(39);

}

let update = () => {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	snake.update();
	food.forEach((currFood, index)=>{
		if (currFood.lifeSpan > 2) {
			food.splice(index, 1);
			food.push(new Food());
			food[food.length - 1].pickLocation();
		}
	});

	snake.changeDirection(direction);
	border();

	food.forEach((currFood) => {
		currFood.draw();
	});
	snake.draw();

	food.forEach ((currFood, index)=> {
		if (snake.eat(currFood)) {

			score += currFood.score;
			scoreCont.innerHTML = score;
			speed += currFood.speedChange;

			food.splice(index, 1);
			food.forEach((currFood2)=>{
				currFood2.lifeSpan++;
			});
			food.push(new Food());
			food[food.length - 1].pickLocation();
			clearInterval(interval);
			interval = setInterval(update,speed);
		}
	});

	if (snake.x >= canvas.width-box || snake.x <= 0 || snake.y >= canvas.height-box || snake.y <= 0 ) {
		gameOver();
	}
}

let reset = () => {
	gameStatus = 0;
	seconds = 0;
	score=0;
	food = [];
	scoreCont.innerHTML = 0;
	timerCont.innerHTML = `0 : 0 : 0`;

	gameLabel.visibility = "hidden";
	startLabel.visibility = "visible";
	speed = 100;
}

let gameOver = () => {
	gameLabel.visibility = "visible";
	gameStatus = -1;

	clearInterval(interval);
	clearInterval(timer);
}
