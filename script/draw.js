'use strict'

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let box = 20;
let rows = canvas.height / box;
let columns = canvas.width / box;
let snake, food, interval;
let xv, yv;
let score = 0, timer, seconds=0;
let scoreCont, timerCont, gameStatus = 0;


//game status is used to indicate the game status 1:game running, -1: game Over, 
// 0:game not running
window.onload = () => {
	border();
	
	timerCont = document.getElementById("timer");
	scoreCont = document.getElementById("scoreCount");
	
	window.addEventListener("keydown", (event) => {
		if (event.keyCode == 32) {
			if (gameStatus == 0) {
				start();
			}
		}
	})
}

let start = () => {
	
	gameStatus = 1;
	
	food = new Food();
	snake = new Snake(box*5, box*5);
	
	food.pickLocation();
	
	timer = setInterval(timerCount,1000);
	interval = setInterval(update,100);
	snake.changeDirection(39);
	
	window.addEventListener("keydown", (event) => {
		let direction = event.keyCode;
		snake.changeDirection(direction);
	})
}

let update = () => {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	snake.update();
	
	border();
	food.draw();
	snake.draw();
	
	if (snake.eat(food)) {
		food.pickLocation();
		scoreCont.innerHTML = ++score * 10;
	}
	
	if (snake.x >= canvas.width-box || snake.x <= 0 || snake.y >= canvas.height-box || snake.y <= 0 ) {
		gameOver();
	}
}

let reset = () => {
	
	gameStatus = 0;

	seconds = 0;
	score=0;
	console.log("Game Over");
	
	scoreCont.innerHTML = 0;
	timerCont.innerHTML = `0 : 0 : 0`;
	
	console.log("resetted")
	start();
}

let gameOver = () => {
	gameStatus = -1;
	window.removeEventListener("keydown",()=>{});
	clearInterval(interval);
	clearInterval(timer);
	
	window.addEventListener("keydown", (event) => {
		if (event.keyCode == 32) {
			if (gameStatus == -1) {
				reset();
			}
		}
	})
}