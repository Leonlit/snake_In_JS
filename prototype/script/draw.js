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

	//for feeding data onto the table
	constructTableData();

	//adding event selection for the game
	//only let user be able to change status if and only if they are in the
	//correct gameStatus before changing to the next one
	//
	window.addEventListener("keydown", (event) => {
		keyCodeCheck(event.keyCode);
	});
}

function keyCodeCheck (keycode) {
	if (keycode == 32) {
		if (gameStatus == 0) {
			start();
		}
		if (gameStatus == -1) {
			reset();
		}
	}
	if (gameStatus == 1) {
		direction = keycode;
	}
}

function start () {
	startLabel.visibility = "hidden";
	gameStatus = 1;

	//creating food following the maximum number of food
	for (let x = 0; x < maxFood;x++) {
		food.push(new Food());
		food[x].pickLocation();
	}
	snake = new Snake(box*5, box*5);
	
	//game loop for the time Counter and the game timer
	timer = setInterval(timerCount,1000);
	interval = setInterval(update,speed);
	snake.changeDirection(39);

}

function update () {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	snake.update();
	
	//checking every element in the food array for food that has lifeSpan bigger than 2 (which is exactly 3)
	//Delete those food and create new food's to replace them.
	//this feature is added as maybe most of the food is colored in red (poison) which cause lose of points
	//and user will not need to consume them for a new food to be spawn
	food.forEach((currFood, index)=>{
		if (currFood.lifeSpan > 2) {
			food.splice(index, 1);
			food.push(new Food());
			food[food.length - 1].pickLocation();
		}
	});

	snake.changeDirection(direction);
	border();

	//drawing the food's
	food.forEach((currFood) => {
		currFood.draw();
	});

	snake.draw();

	//perform a check for all the element inside the food array 
	//whether the snake head has collided with them
	food.forEach ((currFood, index)=> {
		if (snake.eat(currFood)) {

			//update the score and the speed accordingly
			score += currFood.score;
			scoreCont.innerHTML = score;
			speed += currFood.speedChange;

			//delete the food and create a new food at the end of the array
			food.splice(index, 1);
			food.forEach((currFood2)=>{
				//increase the other food's lifespan count 
				currFood2.lifeSpan++;
			});
			food.push(new Food());
			food[food.length - 1].pickLocation();
			clearInterval(interval);
			interval = setInterval(update,speed);
		}
	});
	
	//adding colliding mechanism for the border with the snake, game over if true;
	if (snake.x >= canvas.width-box || snake.x <= 0 || snake.y >= canvas.height-box || snake.y <= 0 ) {
		gameOver();
	}
}

//reset everthing 
function reset () {
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

//showing the game over menu while clearing the interval for the game loop
function gameOver () {
	gameLabel.visibility = "visible";
	gameStatus = -1;

	clearInterval(interval);
	clearInterval(timer);
}

function changeDirection (newDirection) {
	switch (newDirection) {
		case 1:
			direction = 37;
			break;
		case 2:
			direction = 38;
			break;
		case 3:
			direction = 39;
			break;
		case 4:
			direction = 40;
			break;
		case 5:
			keyCodeCheck(32);
			break;
	}
}