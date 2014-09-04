//Constructor
function Background() {
	//super
	Sprite.call(this);
}

//Inheritance
Object.inherit(Background, Sprite);

//Override
Background.prototype.render = function(dt, ctx, w, h) {
	ctx.fillStyle = '#fafafa';
	ctx.fillRect(0, 0, w, h);
};