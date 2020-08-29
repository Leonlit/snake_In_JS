'use strict'

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let box = 20,
	rows = canvas.height / box,
	columns = canvas.width / box,
	snake, 
	interval, 
	direction, 
	xv, 
	yv,
	score = 0, 
	timer, 
	seconds=0,
	scoreCont, 
	timerCont, 
	gameStatus = 0, 
	startLabel,
	food = [], 
	maxFood = 5,
	speed = 100,
	gameBoardShown = false;

//game status is used to indicate the game status
//	1:game running,
//	-1: game Over,
//	0:game not running
//	game board means the canvas for the game

window.onload = () => {
	border();	//to draw the border for the canvas

	//timer and score elements selection
	timerCont = document.getElementById("timer");
	scoreCont = document.getElementById("scoreCount");
	startLabel = document.getElementsByClassName("onboardMsg")[0].style;

	//comstruct the leaderboard on document load
	constructTableData();

	//Since its dangerous to let the audio and music to be played on page load
	//disable music and audio initialy. 
	toggleAudio();
	toggleMusic();

	//add the sound effect to all menu btn
	let x = document.querySelectorAll(".menuBtn");
    x.forEach( ele => {
		ele.addEventListener("click", ()=> {
            playAudio(0);
        });
	});

	//adding event selection for the game
	//only let user be able to change status if and only if they are in the
	//correct gameStatus before changing to the next one
	window.addEventListener("keydown", (event) => {
		keyCodeCheck(event.keyCode);
	});
}

//check the keyCode
//check if player pressed space (key code : 32) while the stats of the game is not paused and that the main menu is not shown
//if yes then check for the in-game status, if its 0 means a new game is really to be played, if its -1 means that the player is at the
//game over menu

//next is check if 'p' is pressed (80) and if the game board is shown

//next statement is to accept direction for the snake when the game stats is paused and the game is ongoing
function keyCodeCheck (keycode) {
	if (keycode == 32 && gameBoardShown && !paused) {
		if (gameStatus == 0) {
			playAudio(7)
			start();
		}
		if (gameStatus == -1) {
			reset();
		}
	}else if (keycode == 80 && gameBoardShown) {
		pauseGame();
	}else if (gameStatus == 1 && !paused) {
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
	checkSnakeEatFood(food, snake);
	
	//adding colliding mechanism for the border with the snake, game over if true;
	if (snake.x >= canvas.width-box || snake.x <= 0 || snake.y >= canvas.height-box || snake.y <= 0 ) {
		gameOver();
		playAudio(6);
	}
}

function checkSnakeEatFood (food, snake) {
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
}

//reset everthing 
function reset () {
	paused = false;
	gameStatus = 0;
	seconds = 0;
	score=0;
	food = [];
	scoreCont.innerHTML = 0;
	timerCont.innerHTML = `0 : 0 : 0`;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	border();
	startLabel.visibility = "visible";
	speed = 100;
}

//showing the game over menu while clearing the interval for the game loop
function gameOver () {
	gameStatus = -1;
	direction = null;
	let score = Number(scoreCont.innerHTML);
	checkIfHighScore(score);
	stopGameLoop();
	paused = true;
}

//stopping the game loop, ussed when the game pause, returning to main menu, and restart the game
function stopGameLoop () {
	clearInterval(interval);
	clearInterval(timer);
}

//controlers for mobile user
function changeDirection (place) {
	switch (place) {
		case 1:
			direction = directionKey[0];
			break;
		case 2:
			direction = directionKey[1];
			break;
		case 3:
			direction = directionKey[2];
			break;
		case 4:
			direction = directionKey[3];
			break;
		case 5:
			keyCodeCheck(32);
		break;
	}
}