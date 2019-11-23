class Food {
	
	constructor() {
		this.x = 0, this.y = 0;
	}
	
	pickLocation () {
		this.x = Math.floor(Math.random() * (rows - 2) + 1);
		this.y = Math.floor(Math.random()* (columns - 2) + 1);
		
	}
	
	draw () {
		ctx.fillStyle = "#4caf50";
		ctx.fillRect(this.x * box, this.y * box, box, box);
	}
}