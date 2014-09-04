//Constructor
function Square(_i, _j) {
	//Super
	Sprite.call(this);

	//
	this.clear = false;
	this.explode = false;
	this.label = "";
	this.flag = false;

	this.i = _i;
	this.j = _j;

	this.width = 20;
	this.height = 20;
	this.padding = 1;

	this.x = _i * (this.width + this.padding);
	this.y = _j * (this.height + this.padding);

	this.addHitMask(Hitmask.newBox(this, 0, 0, this.width, this.height));
}

//Inheritance
Object.inherit(Square, Sprite);

//Static
Sprite.setSpriteSheet(Square, "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");

//Override
Square.prototype.update = function(step) {

	if (Game.getProp('gameover') === true || Game.getProp('gamewin') === true) {
		return false;
	}

	if (Mouse.justRightClicked()) {
		if (this.collidePoint(Mouse.pos().x, Mouse.pos().y)) {
			if (map[this.i][this.j].state !== STATE_CLEAR) {


				var m = Game.getProp('undiscoveredMines');

				var newState = "";

				if (map[this.i][this.j].state === STATE_FLAG) {
					newState = (map[this.i][this.j].mine === true) ? STATE_MINE : STATE_UNKNOW;
					m++;
				} else {
					if (m !== 0) {
						newState = STATE_FLAG;
						m--;
					}
				}

				if (newState !== "") {
					map[this.i][this.j].state = newState;
					Game.setProp('undiscoveredMines', m);

					return true;
				}


			}
		}
	}

	if (Mouse.justClicked()) {

		if (this.collidePoint(Mouse.pos().x, Mouse.pos().y)) {

			if (Mouse.isRightClicked() && (map[this.i][this.j].state === STATE_CLEAR)) {
				doubleClick(this.i, this.j);
			}

			if (map[this.i][this.j].state !== STATE_UNKNOW && map[this.i][this.j].state !== STATE_MINE)
				return false;

			var detection = (detectMine(this.i, this.j));

			if (detection == 9) {
				map[this.i][this.j].state = STATE_EXPLODE;
				Game.setProp('exploded', true);
			} else {
				if (detection === 0) {
					clearNeighbors(this.i, this.j);
				}

				map[this.i][this.j].state = STATE_CLEAR;

				this.label = detection;
			}

			return true;
		}
	}
};

Square.prototype.render = function(dt, ctx, w, h) {

	var srcX = 0;
	var srcY = 0;

	switch (map[this.i][this.j].state) {
		case STATE_MINE:
			srcX = 0 * 21;

			if (Game.getProp('cheat') === true) {
				srcX = 4 * 21;
			}
			break;

		case STATE_UNKNOW:
			srcX = 0 * 21;
			break;

		case STATE_FLAG:
			srcX = 1 * 21;

			if (Game.getProp('exploded') === true && map[this.i][this.j].mine === false) {
				srcX = 5 * 21;
			}

			break;

		case STATE_CLEAR:
			srcX = 2 * 21;
			break;

		case STATE_EXPLODE:
			srcX = 3 * 21;
			break;
	}

	ctx.drawImage(Square.spriteSheet, srcX, srcY, 20, 20, this.x, this.y, this.width, this.height);

	if (this.label !== "" && this.label != "0") {
		ctx.font = "Bold 10px Arial";
		//ctx.lineWidth = 1;
		//ctx.strokeStyle = "#000000";
		//ctx.strokeText(this.label, this.x + 7, this.y + 13);

		ctx.fillStyle = "#000000";
		ctx.fillText(this.label, this.x + 7, this.y + 13);
	}
};