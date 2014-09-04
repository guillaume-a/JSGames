var KEY_ESCAPE = 27;
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var Keyboard = (function() {

	var singleton = false;
	var frame = 0;

	var pressedKeys = [];
	var capturedKeys = [];

	function keyDownHandler(e) {
		key = e.keyCode;

		if (capturedKeys.indexOf(key) !== -1) {
			e.preventDefault();

			if (pressedKeys[key] === 0) {
				pressedKeys[key] = frame + 1;

				//console.log("down", key, frame+1, pressedKeys);
			}
		}
	}

	function keyUpHandler(e) {
		e.preventDefault();
		pressedKeys[e.keyCode] = 0;

		//console.log("up", e.keyCode, frame, pressedKeys);
	}

	return {

		init: function(canvas) {
			if (singleton) {
				return;
			}

			singleton = true;

			document.addEventListener('keydown', keyDownHandler);
			document.addEventListener('keyup', keyUpHandler);
		},

		update: function(f) {
			frame = f;
		},

		isPressed: function(key) {
			var code;

			if (typeof key === "string") {
				code = key.charCodeAt(0);
			} else {
				code = key;
			}
			
			//key nevers was pressed
			if (capturedKeys.indexOf(code) == -1) {
				return false;
			}

			//key is pressed
			if (pressedKeys[code] !== 0) {
				return true;
			}

			return false;
		},

		justPressed: function(key) {
			var code;

			if (typeof key === "string") {
				code = key.charCodeAt(0);
				//console.log(code, capturedKeys, pressedKeys);
			} else {
				code = key;
			}

			//console.log(code, pressedKeys[code]);
			
			//key nevers was pressed
			if (capturedKeys.indexOf(code) == -1) {
				return false;
			}

			//key is just pressed
			if (pressedKeys[code] === frame) {
				return true;
			}

			return false;
		},

		setCapturedKeys: function(keys) {
			capturedKeys = [];
			pressedKeys = [];

			var code;

			for (var i = 0; i < keys.length; i++) {


				if (typeof keys[i] === "string") {
					code = keys[i].charCodeAt(0);

					if (code >= 65 && code <= 90) {
						capturedKeys.push(code + 32);
						pressedKeys[code + 32] = 0;
					}

					if (code >= 97 && code <= 122) {
						capturedKeys.push(code - 32);
						pressedKeys[code - 32] = 0;
					}
				} else {
					code = keys[i];
				}

				capturedKeys.push(code);
				pressedKeys[code] = 0;

				//console.log(capturedKeys);
			}
		}
	};
})();