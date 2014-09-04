//Constructor
function Sprite() {
	//Dim
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;

	//Render
	this.dirty = true;
	this.hitMasks = [];

	//Physics
	this.velocity = {x: 0,y: 0};
	this.gravity = {x: 0,y: 0}; // this.setPhysic() to define
	this.mass = 1000;
}

//Static
Sprite.drawHitBoxes = false;
Sprite.drawBoxes = false;

Sprite.setSpriteSheet = function(spriteClass, b64) {
	spriteClass.spriteSheet = new Image();
	spriteClass.spriteSheet.src = "data:image/png;base64," + b64;
	spriteClass.spriteSheet.onload = function() {
		//Wall_spriteStatus = "loaded";
	};
};

//Public

/* COMMON */
Sprite.prototype.reset = function() {};
Sprite.prototype.update = function(step) {};

Sprite.prototype.render = function(dt, ctx, w, h) {
	if (Sprite.drawBoxes) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#00ffff';
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

	if (Sprite.drawHitBoxes) {
		var nbBox = this.hitMasks.length;
		for (var i = 0; i < nbBox; i++) {
			this.hitMasks[i].draw();
		}
	}
};

/* PHYSICAL */
Sprite.prototype.setPhysic = function() {
	this.gravity.y = 9.81;
};

Sprite.prototype.applyPhysic = function(step) {
	this.y += this.velocity.y * step; // Apply vertical velocity to X position
	this.x += this.velocity.x * step; // Apply horizontal velocity to X position	
	
	this.velocity.y += (this.mass * this.gravity.y) * step; // Apply gravity to vertical velocity
};

/* HITBOXES */
Sprite.prototype.addHitMask = function(mask) {
	this.hitMasks.push(mask);
	return mask;
};

/* COLLISION */
Sprite.prototype.collidePoint = function(_x, _y) {
	var nbBox = this.hitMasks.length;
	var i;

	for (i = 0; i < nbBox; i++) {
		if (this.hitMasks[i].collidePoint(_x, _y)) {
			return true;
		}
	}

	return false;
};

Sprite.prototype.collideSprite = function(_sprite) {
	var nbBox1 = this.hitMasks.length;
	var nbBox2 = _sprite.hitMasks.length;

	for (var i = 0; i < nbBox1; i++) {
		for (var j = 0; j < nbBox2; j++) {
			if (this.hitMasks[i].collideMask(_sprite.hitMasks[j])) {
				return true;
			}
		}
	}

	return false;
};