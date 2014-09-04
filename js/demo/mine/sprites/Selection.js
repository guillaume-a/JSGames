//Constructor
function Selection() {
	//super
	Sprite.call(this);
	
	//
	this.visible = false;

	this.width = 20;
	this.height = 20;
	this.padding = 1;

	this.i = -1;
	this.j = -1;
}

//Inheritance
Object.inherit(Selection, Sprite);

//Override
Selection.prototype.update = function(step) {
	
	if (Game.getProp('gameover') === true || Game.getProp('gamewin') === true) {
		return false;
	}
	
	if (Mouse.isRightClicked()) {

		var i = parseInt(Mouse.pos().x / 21);
		var j = parseInt(Mouse.pos().y / 21);

		if (i<gw && j<gh && map[i][j].state === STATE_CLEAR) {

			if (i != this.i || j != this.j || this.visible === false) {

				this.i = i;
				this.j = j;

				this.visible = true;

				return true;
			}
		} else {
			this.visible = false;
			return true;
		}
	}
	else {
		if(this.visible) {
			this.visible = false;
			return true;
		}
	}
};

Selection.prototype.render = function(dt, ctx, w, h) {

	if (this.visible === false) {
		return;
	}

	var _x1, _y1, _x2, _y2, _w, _h;

	_x1 = 1 + (this.i - 1) * (this.width + this.padding);
	_y1 = 1 + (this.j - 1) * (this.height + this.padding);

	_x2 = 1 + (this.i + 2) * (this.width + this.padding);
	_y2 = 1 + (this.j + 2) * (this.height + this.padding);


	_x1 = Math.max(1, _x1);
	_y1 = Math.max(1, _y1);

	_x2 = Math.min(gw * (this.width + this.padding), _x2);
	_y2 = Math.min(gh * (this.height + this.padding), _y2);	
	
	_w = _x2 - _x1 - 3;
	_h = _y2 - _y1 - 3;

	ctx.lineWidth = 2;
	ctx.strokeStyle = "#666666";
	ctx.strokeRect(_x1, _y1, _w, _h);
};