//need a counter for the timer
let timerCount = () => {
	seconds++;
	let hour = Math.floor(seconds/(60*60));
	let minute = Math.floor(seconds/60);
	let second = Math.floor(seconds % 60);
	timerCont.innerHTML = `${hour} : ${minute} : ${second}`;
}

//drawing the border out
let border = () => {
	ctx.fillStyle = "grey";
	for (let i=0;i<rows;i++) {
		if (i != 0 && i != rows-1) {
			ctx.fillRect(0, i*box, box, box);
			ctx.fillRect(canvas.width-box, i*box, box, box);
		}else {
			for (let j=0;j<columns;j++) {
				ctx.fillRect(j*box, i*box, box, box);
			}
		}
	}
}