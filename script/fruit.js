class Food {
	
	constructor() {
		this.x = 0, this.y = 0;
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
		ctx.fillStyle = "#4caf50";
		ctx.fillRect(this.x * box, this.y * box, box, box);
	}
}