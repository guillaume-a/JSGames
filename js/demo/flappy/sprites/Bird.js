//Constructor
function Bird() {
	//super
	Sprite.call(this);

	//private
	var life = 10;
	var lifeOld = 100;
	var salt = "rayman";

	//
	this.x = 100;
	this.y = 200;
	this.width = 34;
	this.height = 24;

	//
	this.ghost = false;
	this.frames = [];

	//
	this.padding = 1;

	//
	this.setPhysic();
	this.mass = 210;

	//
	this.addHitMask(Hitmask.newCircle(this, this.width * 0.5, this.height * 0.5, this.width * 0.5 - 5));

	this.getLife = function() {
		return life;
	};

	this.resetLife = function() {
		life = 100;
		lifeOld = 100;
	};
	
	this.hitTest = function(_self) {
		Game.getSprites().forEach(function(sprite) {

			if (sprite instanceof Wall) {
				if (_self.collideSprite(sprite)) {
					life--;

					if (life === 0) {

						//ghost.frames = replay.slice(0);

						//console.log(raceFrame);
						Game.setProp('gameover', true);

						if (player !== null) {
							$.post('scoreboard/flappy/post.php', {
								name: player,
								mode: 'normal',
								score: Wall.getTotalScore(),
								replay: JSON.stringify(replay),
								gravestone: JSON.stringify({f:raceFrame,y:Math.round(_self.y)}),
								hash: md5(player+'normal'+Wall.getTotalScore()+salt).reverse()
							}, reloadScoreBoard);
						}
					}

					return true;
				}
			}
		});
	};
}

//Inheritance
Object.inherit(Bird, Sprite);

//Static
Sprite.setSpriteSheet(Bird, "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");

//Public
Bird.prototype.reset = function() {
	this.resetLife();

	this.x = 100;
	this.y = 200;
	this.velocity.y = 0;
	this.velocity.x = 0;
};

//Override
Bird.prototype.update = function(step) {
	//console.log("update bird");
	var oldY = this.y;

	if (Game.getProp('paused') === true || Game.getProp('gamestarted') === false || Game.getProp('gameover') === true || Game.getProp('gamewin') === true) {
		return false;
	}

	/*
	if (Game.getProp('debug') === true) {
		this.gravity.y = 0;
		this.velocity.y = 0;

		if(Mouse.hasMoved()) {
			this.x = Mouse.pos().x;
			this.y = Mouse.pos().y;
			
			return true;
		}
	}
	//*/

	if (this.ghost) {
		if ((typeof this.frames[raceFrame] !== 'undefined')) {
			this.y = this.frames[raceFrame].y;
			this.velocity.y = this.frames[raceFrame].vy;
		} else {
			this.velocity.y = 0;
			this.velocity.x = Wall.globalVelocityX;

			this.applyPhysic(step);
		}
	} else {

		if (Keyboard.justPressed(KEY_UP) || Mouse.justClicked()) {
			this.velocity.y = -400.0;
		}

		this.applyPhysic(step);

		this.y = Math.min(Math.max(0, this.y), Game.screenHeight - this.height);

		replay[raceFrame] = {
			y: Math.round(bird.y),
			vy: Math.round(bird.velocity.y)
		};
		
		return this.hitTest(this);
	}

	if (this.y !== oldY) {
		return true;
	}
};

Bird.prototype.render = function(dt, ctx, w, h) {
	var srcY = 0;
	var srcX = 0;

	if (this.lifeOld > this.life) {
		this.lifeOld = this.life;
		srcX = 34;
	}

	if (this.velocity.y < -5) {
		srcY = 24;
	}

	if (this.velocity.y > 5) {
		srcY = 48;
	}

	if (this.ghost) {
		srcX = 68;
	}

	ctx.drawImage(Bird.spriteSheet, srcX, srcY, 34, 24, this.x, this.y, this.width, this.height);
};