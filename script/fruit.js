//normal food, poison, speed, slow,
let foodColor = ["#4caf50","#f02222","#e6df1e","#166300"];

class Food {
	constructor() {
		this.x = 0, this.y = 0;
		this.color = foodColor[Math.floor(Math.random()* foodColor.length)];
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
