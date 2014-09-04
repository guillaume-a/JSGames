//Constructor
function Background() {
	Sprite.call(this);

	this.lifeOld = 100;
}

//Inheritance
Object.inherit(Background, Sprite);

//Override
Background.prototype.reset = function() {
	this.lifeOld = 100;
};

Background.prototype.render = function(dt, ctx, w, h) {
	//248
	//190

	if (this.lifeOld > bird.getLife()) {
		this.lifeOld = bird.getLife();
		ctx.fillStyle = '#dc143c';
	} else {
		var color = Math.round((248-190)/100 * bird.getLife()) + 190;
		ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
	}
	
	ctx.fillRect(0, 0, w, h);
	
	//ctx.fillStyle = '#dc143c';

	/*
	
	life = 0 => Game.screenHeight + 50
	life = 100 => 100
	Math.linearTween = function (life/100, b, c, d) {
		return Game.screenHeight + 50*(life/100) + 100;
	};
	
	*/
	
	///var moonY =  (100 - Game.screenHeight - 50) * (bird.life / 100) + (Game.screenHeight + 50);
	//console.log(moonY);
	
	/*

	ctx.beginPath();
	ctx.arc(600, moonY, 50, 0, 2 * Math.PI);
	ctx.fillStyle = '#ffffff';
	ctx.fill();
	//*/
};