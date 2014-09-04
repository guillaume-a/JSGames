//Constructor
function Score() {
	Sprite.call(this);
	
	this.x = 3;
	this.y = 13;
}

//Inheritance
Object.inherit(Score, Sprite);

//Override
Score.prototype.render = function(dt, ctx, w, h) {
	var label = "";
	
	ctx.font = "12px Verdana";

	if(Game.getProp('replayLoading') === true) {
		this.label = "--> GHOST LOADING, PLEASE WAIT <--";
	}
	else if (Game.getProp('gamestarted') === false) {
		this.label = "--> CLICK TO START <--";
	} else {

		this.label = "Score : " + Wall.getTotalScore();

		if (Game.getProp('gameover') === true) {
			this.label += " | GAMEOVER :(";
		} else {
			this.label += " | Live : " + bird.getLife();
			
			if (Game.getProp('paused') === true) {
				this.label += " | PAUSED";
			}
			
		}
	}

	ctx.fillStyle = "#000000";
	ctx.fillText(this.label, this.x, this.y);

};