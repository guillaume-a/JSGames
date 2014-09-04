//http://gamedevelopment.tutsplus.com/tutorials/how-to-create-a-custom-2d-physics-engine-the-core-engine--gamedev-7493#timestepping

var Game = (function() {
	var fps = 60,
		dt = 1 / fps,
		accumulator = 0,
		startTime = timestamp(),
		currentTime;

	var frame = 1;
	var modules = [];
	var cache = null;
	var invalid = true;

	var newGameFunction;
	var updateFunction;
	var renderFunction;
	var renderCanvas;

	var meter;
	var properties = {};

	var sprites = [];

	function timestamp() {
		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	}

	function loop() {
		//if(frame > 1000)
		//	return;

		currentTime = timestamp();
		accumulator += (currentTime - startTime) / 1000;
		startTime = currentTime;

		// Avoid spiral of death and clamp dt, thus clamping
		// how many times the UpdatePhysics can be called in
		// a single game loop.
		if (accumulator > 0.2) {
			accumulator = 0.2;
		}

		while (accumulator > dt) {

			update(dt);
			accumulator -= dt;
		}

		render(accumulator / dt);

		if (meter !== null) {
			meter.tick();
		}

		requestAnimationFrame(loop);

		// linear interpolation for a from 0 to 1
		// from t1 to t2
		//t1 * a + t2(1.0f - a)
	}

	function update(step) {

		modules.forEach(function(mod) {
			mod.update(frame);
		});
		
		if (typeof(updateFunction) == "function") {
			invalid = updateFunction(step) || invalid;
		}		

		sprites.forEach(function(sprite) {
			invalid = sprite.update(step) || invalid || sprite.dirty;
		});

		frame++;
	}

	function render(dt) {

		if (invalid) {
			ctx = renderCanvas.getContext('2d');
			ctx.clearRect(0, 0, renderCanvas.width, renderCanvas.height);

			sprites.forEach(function(sprite) {
				sprite.render(dt, ctx, renderCanvas.width, renderCanvas.height);
				Sprite.prototype.render.call(sprite, dt, ctx, renderCanvas.width, renderCanvas.height);
				sprite.dirty = false;
			});

			if (typeof(renderFunction) == "function") {
				renderFunction(dt, ctx, renderCanvas.width, renderCanvas.height);
			}

			//cache = renderCanvas;
			invalid = false;
		}
		
		return renderCanvas;
	}

	return {

		load: function(gameScripts, callback, canvas, _newGameFunction) {
			newGameFunction = _newGameFunction;

			var scripts = [
				"js/engine/vendor/fpsmeter.js",

				"js/engine/utils/Object.js",
				"js/engine/utils/Math.js",
				"js/engine/utils/String.js",

				"js/engine/input/Keyboard.js",
				"js/engine/input/Mouse.js",

				"js/engine/Sprite.js",
				"js/engine/Hitmask.js",
			];

			// Load engine scripts
			Loader.require(scripts, function() {
				// Load game scripts
				Loader.require(gameScripts, function() {
					if (typeof(callback) == "function") {
						callback();
					}

					window.addEventListener('load', function() {
						Game.init(canvas);
						Game.start();
						Game.newGame();
					});
				});
			});
		},

		init: function(canvas) {
			properties = {};
			//*
			meter = new FPSMeter({
				left: 'auto',
				right: '5px'
			});
			//*/

			renderCanvas = document.getElementById(canvas);
				
			Game.screenWidth = renderCanvas.width;
			Game.screenHeight = renderCanvas.height;
				
			modules.forEach(function(mod) {
				mod.init(canvas);
			});
		},
				
				
		start: function() {
			requestAnimationFrame(loop);
		},

		newGame: function() {
			newGameFunction();
		},

		reset: function() {
			sprites.forEach(function(sprite) {
				sprite.reset();
				sprite.dirty = true;
			});
				
			Game.setProp('gamestarted', false);
			Game.setProp('gameover', false);
			Game.setProp('gamewin', false);
			Game.setProp('score', 0);
			Game.setProp('debug', false);
		},

		//loop
		addModule: function(mod) {
			modules.push(mod);

			return mod;
		},

		//main engine
		setUpdater: function(funct) {
			updateFunction = funct;
		},

		setRender: function(funct) {
			renderFunction = funct;
		},

		//Sprite
		invalidate: function() {
			invalid = true;
		},

		addSprite: function(sprite, depth) {
			sprites[depth] = sprite;

			return sprite;
		},

		removeSprites: function() {
			sprites = [];
		},

		getSprites: function() {
			return sprites;
		},
		
		currentFrame: function() {
			return frame;
		},

		//properties
		setProp: function(key, value) {
			properties[key] = value;
		},

		getProp: function(key) {
			return properties[key];
		}
	};
})();