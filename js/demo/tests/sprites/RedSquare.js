RedQuare.prototype = new Sprite(); // Here's where the inheritance occurs 
RedQuare.prototype.constructor = RedQuare; // Otherwise instances of Cat would have a constructor of Mammal 

function RedQuare() {
	this.minSize = 40;
	this.maxSize = 100;
	this.size = this.minSize;
}

RedQuare.prototype.update = function(step) {
	oldSize = this.size;

	if (Mouse.isClicked()) {
		this.size = Math.min(++this.size, this.maxSize);
	} else {
		this.size = Math.max(--this.size, this.minSize);
	}

	if (this.size != oldSize || Mouse.hasMoved()) {
		return true;
	}
};

RedQuare.prototype.render = function(dt, ctx, w, h) {

	var sqX = Math.max(3, Mouse.pos().x - (this.size * 0.5));
	var sqY = Math.max(3, Mouse.pos().y - (this.size * 0.5));

	sqX = Math.min(sqX, w - this.size - 3);
	sqY = Math.min(sqY, h - this.size - 3);

	//carre rouge
	ctx.fillStyle = '#FF0000'; // red
	ctx.fillRect(sqX, sqY, this.size, this.size);
};