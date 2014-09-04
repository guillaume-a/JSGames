//Constructor
function Score() {
	//super
	Sprite.call(this);
	
	//
	this.x = 0;
	this.y = (gh + 1) * 23;

	this.label = "";
	
	this.now = new Date().getTime();
	this.chrono = 0;
	this.secondes = 0;
}

//Inheritance
Object.inherit(Score, Sprite);

//Public
Score.prototype.reset = function() {
	this.now = new Date().getTime();
};

//Override
Score.prototype.update = function(step) {

	if (Game.getProp('gameover') === true || Game.getProp('gamewin') === true) {
		return false;
	}

	//console.log(step);
	this.chrono += step;
	
	if(Math.floor(this.chrono) !== this.secondes) {
		this.secondes = Math.floor(this.chrono);
		return true;
	}
	
	//this.secondes = this.chrono;
	//return true;
	
	/*
	var s = parseInt((new Date().getTime() - this.now) / 1000);
	if(s !== this.secondes) {
		this.secondes = s;
		return true;
	}
	//*/

};

Score.prototype.render = function(dt, ctx, w, h) {

	ctx.font = "12px Verdana";

	this.label = "Mines : " + Game.getProp('undiscoveredMines');

	if (Game.getProp('gameover') === true) {
		this.label = "GAMEOVER :(";
	}

	if (Game.getProp('gamewin') === true) {
		this.label = "YOU WIN :)";
	}

	this.label += " | Temps : " + this.secondes + "s";

	ctx.fillStyle = "#000000";
	ctx.fillText(this.label, this.x, this.y);

};