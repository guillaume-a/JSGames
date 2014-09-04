Game.preload(loadScripts);

function loadScripts() {
	var scripts = [
		"js/demo/sprites/RedSquare.js",
		"js/demo/sprites/Background.js",
		"js/demo/sprites/Border.js"
	];
	Loader.require(scripts, bootStrap);

}

function bootStrap() {

	Game.addModule(Keyboard);
	Game.addModule(Mouse);

	Game.setUpdater(update);
	Game.setRender(render);

	Keyboard.setCapturedKeys([27, 32]);

	Game.addSprite(new Background(), 0);
	Game.addSprite(new RedQuare(), 10);
	Game.addSprite(new Border(), 20);

	window.addEventListener('load', function() {
		Game.init('screen');
		Game.start();
	});
}

function update(step) {

	if (Keyboard.justPressed(KEY_ESCAPE)) {
		//console.log("justPressed escape");
	} else if (Keyboard.isPressed(KEY_ESCAPE)) {
		//console.log("isPressed escape");
	}
}

function render(dt, ctx, w, h) {

}