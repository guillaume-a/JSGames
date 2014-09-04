function Background() {

	this.update = function(step) {

	};

	this.render = function(dt, ctx, w, h) {
		ctx.fillStyle = '#666666'; // red
		ctx.fillRect(0, 0, w, h);

		ctx.lineWidth = 1;
		ctx.font = "30px Verdana";
		// Create gradient
		var gradient = ctx.createLinearGradient(0, 0, w, 0);
		gradient.addColorStop("0", "red");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		// Fill with gradient
		ctx.strokeStyle = gradient;
		ctx.strokeText("JS13k 2014", 20, 50);
	};
}