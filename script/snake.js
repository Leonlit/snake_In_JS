//left, up, right, down
const defaultDirectionKey = [37, 38, 39, 40];
let directionKey = defaultDirectionKey.slice();

class Snake {
	constructor (newX, newY) {
		//x and y - coordination of the snake head
		//xSpeed and ySpeed - the direction the new block will be drawed
		//total - the length of the snake
		//tail - the position of its tail, the last element will be the one after the snake head.
		//Since the snake head has it's own coordination, the tail coordination will follow on the heads coord
		this.x = newX;
		this.y = newY;
		this.xSpeed = 1;
		this.ySpeed = 0;
		this.total = 0;
		this.tail = [];
	}

	draw () {
		//color change from yellow to dark brown
		for (let i=0;i<this.tail.length;i++) {
			ctx.fillStyle = `rgb(${255-(2*i)},${255-(5*i)},0)`;
			ctx.fillRect(this.tail[i].x, this.tail[i].y, box, box);
		}
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(this.x, this.y, box, box);
	}

	//if the snake is on-top of a food return true
	eat (food) {
		if (this.x === food.x*box && this.y === food.y*box) {
			//play food sound effect
			playAudio(food["audio"]);
			//if the food is "poison", decrease the length of snake by taking out the first element (end of snake tail)
			if (food.score == -20 && this.tail.length > 0) {
				this.total--;
				this.tail.shift();
			}else if (food.score != -20) {
				this.total++;
			}
			return true;
		}
		return false;
	}

	update () {
		//snake eat itself, as it's on-top of one of it's body part
		if (this.tail.find(i=>i.x==this.x && i.y ==this.y)) {
			gameOver();
		}else {
			//replace current box with next snake block, applicable to tail only, head is ignored as 
			//its coordinate is controlled by this.x and this.y.
			for (let i = 0;i < this.tail.length - 1;i++) {
				this.tail[i] = this.tail[i+1];
			}
			//if the size of the snake increase, put current location to it
			//of if the size remain the same as previous, the newly created tail
			//will surely have null for it's x and y so add the current location to them
			this.tail[this.total - 1] = {x: this.x, y: this.y};
			this.x += this.xSpeed * box;
			this.y += this.ySpeed * box;
		}
	}

	changeDirection (direction) {
		switch (direction) {
			//up, down, left, right
			//think of an 2D array
			// -----------------------
			// |   	  y-- ^			 | 
			// | 		  |----> x++ |
			// | x-- <----|			 |
			// |		  v y++		 |
			// -----------------------
			case directionKey[1]:
				if (this.ySpeed != 1) {
					this.xSpeed = 0;
					this.ySpeed = -1;
				}
			break;
			case directionKey[3]:
				if (this.ySpeed != -1) {
					this.xSpeed = 0;
					this.ySpeed = 1;
				}
			break;
			case directionKey[0]:
				if (this.xSpeed != 1) {
					this.xSpeed = -1;
					this.ySpeed = 0;
				}
			break;
			case directionKey[2]:
				if (this.xSpeed != -1) {
					this.xSpeed = 1;
					this.ySpeed = 0;
				}
			break;
		}
	}
}
