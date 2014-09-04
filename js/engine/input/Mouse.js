var Mouse = (function() {

	var singleton = false;
	var frame = 0;

	var leftButtonPressed = 0;
	var rightButtonPressed = 0;
	
	var mousePos = {
		x: -1,
		y: -1
	};
	var mouseMoved = false;
	var debug;

	function mouseDownHandler(e) {

		e.preventDefault();

		//console.log(debug);
		
		var isRightButton;

		if ("which" in e) isRightButton = e.which == 3; // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
		else if ("button" in e) isRightButton = e.button == 2; // IE, Opera 

		if (isRightButton) {
			if (rightButtonPressed === 0) {
				rightButtonPressed = frame + 1;
			}
		} else {
			if (leftButtonPressed === 0) {
				leftButtonPressed = frame + 1;
			}
		}
	}

	function mouseUpHandler(e) {
		e.preventDefault();
		
		leftButtonPressed = 0;
		rightButtonPressed = 0;
	}

	function mouseMoveHandler(e) {
		e.preventDefault();

		//debug = e;

        var rect = e.target.getBoundingClientRect();

		mousePos.x = e.clientX - rect.left;
		mousePos.y = e.clientY - rect.top;

		mouseMoved = frame + 1;
		//console.log(e);
	}

	return {

		init: function(canvas) {
			if (singleton) {
				return;
			}

			singleton = true;

			document.getElementById(canvas).addEventListener('mousedown', mouseDownHandler);
			document.getElementById(canvas).addEventListener('mouseup', mouseUpHandler);
			document.getElementById(canvas).addEventListener('mousemove', mouseMoveHandler);
			document.getElementById(canvas).addEventListener('contextmenu', function(e){ e.preventDefault();return false; });
			//document.addEventListener('mousemove', mouseMoveHandler);
		},

		update: function(f) {
			frame = f;
		},

		hasMoved: function() {
			return (mouseMoved === frame);
		},

		pos: function() {
			return mousePos;
		},

		isClicked: function() {
			if (leftButtonPressed !== 0) {
				return true;
			}

			return false;
		},

		justClicked: function() {
			if (leftButtonPressed === frame) {
				return true;
			}

			return false;
		},
		
		isRightClicked: function() {
			if (rightButtonPressed !== 0) {
				return true;
			}

			return false;
		},

		justRightClicked: function() {
			if (rightButtonPressed === frame) {
				return true;
			}

			return false;
		}
	};
})();