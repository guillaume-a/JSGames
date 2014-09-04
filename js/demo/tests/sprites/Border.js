function Border() {

	this.update = function(step) {

	};

	this.render = function(dt, ctx, w, h) {
		//bordure noire
		ctx.strokeStyle = '#000000'; // black
		ctx.lineWidth = 5;

		ctx.strokeRect(0, 0, w, h);
	};
}