class Snake {
	
	constructor (newX, newY) {
		this.x = newX;
		this.y = newY;
		this.xSpeed = 1;
		this.ySpeed = 0;
		this.total = 0;
		this.tail = [];
		this.count = 1;
	}
	
	draw () {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(this.x, this.y, box, box);
		
		ctx.fillStyle = "#f2f23f";
		for (let i=0;i<this.tail.length;i++) {
			ctx.fillStyle = `rgb(${255-(2*i)},${255-(10*i)},0)`;
			ctx.fillRect(this.tail[i].x, this.tail[i].y, box, box);
		}
	}
	
	eat (food) {
		if (this.x === food.x*box && this.y === food.y*box) {
			this.total++;
			return true;
		}
		return false;
	}
	
	update () {
		let result;
		if (this.tail.find(i=>i.x===this.x && i.y ===this.y)) {
			console.log(this.tail.indexOf(i=>i.x===this.x && i.y ===this.y));
			gameOver();
		}
		
		for (let i = 0;i < this.tail.length - 1;i++) {
			this.tail[i] = this.tail[i+1];
		}
		
		this.tail[this.total - 1] = {x: this.x, y: this.y};
		
		this.x += this.xSpeed * box;
		this.y += this.ySpeed * box;
	}
	
	changeDirection (direction) {
		switch (direction) {
			case 38:
				if (this.ySpeed != 1) {
					this.xSpeed = 0;
					this.ySpeed = -1;
				}
			break;
			case 40:
				if (this.ySpeed != -1) {
					this.xSpeed = 0;
					this.ySpeed = 1;
				}
			break;
			case 37:
				if (this.xSpeed != 1) {
					this.xSpeed = -1;
					this.ySpeed = 0;
				}
			break;
			case 39:
				if (this.xSpeed != -1) {
					this.xSpeed = 1;
					this.ySpeed = 0;
				}
			break;
			default:
				console.log("something went wrong !!!");
		}
	}
	
}