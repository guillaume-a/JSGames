function Hitmask() {
	this.type = "";
	this.sprite = null;

	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.r = 0;

	this.points = [];
}

Hitmask.newBox = function(_sprite, _x, _y, _w, _h) {
	var hitMask = new Hitmask();

	hitMask.type = "box";
	hitMask.sprite = _sprite;
	hitMask.x = _x;
	hitMask.y = _y;
	hitMask.w = _w;
	hitMask.h = _h;

	//console.log(hitMask);
	return hitMask;
};

Hitmask.newCircle = function(_sprite, _x, _y, _r) {
	var hitMask = new Hitmask();

	hitMask.type = "circle";
	hitMask.sprite = _sprite;
	hitMask.x = _x;
	hitMask.y = _y;
	hitMask.r = _r;

	//console.log(hitMask);
	return hitMask;
};

Hitmask.prototype.collidePoint = function(_x, _y) {

	//console.log("Hitmask.prototype.collidePoint", _x, this.x, this.w, this.sprite.x);
	//console.log("Hitmask.prototype.collidePoint", _y, this.y + this.sprite.y, (this.y + this.h + this.sprite.y));
	//console.log("======================", _y, this.y + this.sprite.y);

	if (this.type == "box") {
		if (_x < this.x + this.sprite.x || _y < this.y + this.sprite.y || _y > (this.y + this.sprite.y + this.h) || _x > (this.x + this.sprite.x + this.w)) {
			return false;
		}
	} else if (this.type == "circle") {

		var dist = Math.sqrt(Math.pow(_x - (this.x + this.sprite.x), 2) + Math.pow(_y - (this.y + this.sprite.y), 2));

		//console.log(dist, this.r);

		if (dist > this.r) {
			return false;
		}
	}

	return true;
};

Hitmask.prototype.collideMask = function(_mask) {
	if (this.type == "box" && _mask.type == "box") {
		return this.collideBoxBox(_mask);
	} else if (this.type == "circle" && _mask.type == "box") {
		return this.collideCircleBox(_mask);
	} else if (this.type == "circle" && _mask.type == "circle") {
		return this.collideCircleCircle(_mask);
	}

	return false;
};

Hitmask.prototype.collideBoxBox = function(_box) {
	if (_box.sprite.x + _box.x + _box.w < this.x + this.sprite.x || _box.sprite.y + _box.y + _box.h < this.y + this.sprite.y || _box.sprite.x + _box.x > this.x + this.w + this.sprite.x || _box.sprite.y + _box.y > this.y + this.h + this.sprite.y) {
		return false;
	}

	return true;
};

Hitmask.prototype.collideCircleBox = function(_box) {
	//closest x and y;
	var cx, cy;

	//http://lazyfoo.net/SDL_tutorials/lesson19/
	//Find closest x & y offset
	if (this.x + this.sprite.x < _box.x + _box.sprite.x) {
		cx = _box.x + _box.sprite.x;
	} else if (this.x + this.sprite.x > _box.x + _box.sprite.x + _box.w) {
		cx = _box.x + _box.sprite.x + _box.w;
	} else {
		cx = this.x + this.sprite.x;
	}
	
	if (this.y + this.sprite.y < _box.y + _box.sprite.y) {
		cy = _box.y + _box.sprite.y;
	} else if (this.y + this.sprite.y > _box.y + _box.sprite.y + _box.h) {
		cy = _box.y + _box.sprite.y + _box.h;
	} else {
		cy = this.y + this.sprite.y;
	}

	return this.collidePoint(cx, cy);
};

Hitmask.prototype.collideCircleCircle = function(_circle) {

	var dist = Math.sqrt(Math.pow((_circle.x + _circle.sprite.x) - (this.x + this.sprite.x), 2) + Math.pow((_circle.y + _circle.sprite.y) - (this.y + this.sprite.y), 2));
	//var dist = Math.sqrt(Math.abs(Math.pow((_circle.x + _circle.sprite.x) - this.x + this.sprite.x, 2)) + Math.abs(Math.pow((_circle.y + _circle.sprite.y) - this.y + this.sprite.y, 2)));

	//console.log(dist, this.r + _circle.r);
	
	if (dist < this.r + _circle.r) {
		return true;
	}

	return false;
};

Hitmask.prototype.draw = function() {
	//console.log(this);

	ctx.lineWidth = 1;
	ctx.strokeStyle = '#ff00ff';

	switch (this.type) {
		case "box":
			ctx.strokeRect(this.sprite.x + this.x, this.sprite.y + this.y, this.w, this.h);
			break;

		case "circle":
			ctx.beginPath();
			ctx.arc(this.sprite.x + this.x, this.sprite.y + this.y, this.r, 0, 2 * Math.PI);
			ctx.stroke();
			break;
	}
};