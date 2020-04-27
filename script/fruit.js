//Type of food,
//normal food, poison, speed, slow,
let foodType = [
	{color: "#4caf50", score: 10, speedChange: 0, audio: 1},
	{color: "#f02222", score: -20, speedChange: 0, audio: 2},
	{color: "#e6df1e", score: 5, speedChange: -10, audio: 4},
	{color: "#166300", score: 5, speedChange: 10, audio: 3}
];


class Food {
	constructor() {
		
		//x and y is the coordinate
		//color is the color of the food
		//score is the score obtained after consuming it
		//lifeSpan is used to indicate the age of the food
		//audio is to play the sound according to the food type
		//speedChange is used to change the speed of the snake
		this.x = 0, this.y = 0;
		let obj = foodType[Math.floor(Math.random() * foodType.length)]
		this.color = obj.color;
		this.score = obj.score;
		this.audio = obj.audio;
		this.lifeSpan = 0;
		this.speedChange = obj.speedChange;
	}

	pickLocation () {
		//the row is 30 where we need to minus 2 as
		//30-2 is 28 where the random will only get until
		//27 so after that we need to plus 1 as we don't
		//want the fruit to be spawned at the upper or lefthand
		//side of the game
		this.x = Math.floor(Math.random() * (rows - 2) + 1);
		this.y = Math.floor(Math.random()* (columns - 2) + 1);
	}

	draw () {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x * box, this.y * box, box, box);
	}
}
