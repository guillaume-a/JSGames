var gameScripts = [
	"js/demo/mine/sprites/Background.js",
	"js/demo/mine/sprites/Square.js",
	"js/demo/mine/sprites/Score.js",
	"js/demo/mine/sprites/Selection.js"
];

Game.load(gameScripts, bootStrap, 'screen', newGame);

//

var STATE_UNKNOW = "0";
var STATE_MINE = "1";
var STATE_FLAG = "2";
var STATE_CLEAR = "3";
var STATE_EXPLODE = "4";

var gw = 20;
var gh = 15;
var mines = 40;
var map;
var scoreSprite, selectionSprite;

var gameMode = "";
var gameModes = {
	'easy' : [8, 8, 10],
	'medium' : [8, 8, 20],
	'hard' : [16, 16, 40],
	'expert' : [16, 16, 80]
};

var player = "Anonymous";

function newGame(_mode) {
	gameMode = typeof _mode !== 'undefined' ? _mode : "easy";
	
	Game.removeSprites();
	Game.reset();

	gw = gameModes[gameMode][0];
	gh = gameModes[gameMode][1];
	mines = gameModes[gameMode][2];

	initMap();
	
	Game.addSprite(new Background(), 0);
	Game.addSprite(scoreSprite, 1000);
	Game.addSprite(selectionSprite, 1001);
	
	Game.setProp('exploded', false);
	Game.setProp('cheat', false);
	Game.setProp('cheated', false);
	Game.setProp('undiscoveredMines', mines);
	
	Game.invalidate();
	
	$('#scores')[0].contentDocument.location = "scoreboard/mine/get.php?mode=" + gameMode;
}

function bootStrap() {
	Game.addModule(Mouse);
	Game.setUpdater(update);

	scoreSprite = new Score();
	selectionSprite = new Selection();
}

// GLOBAL UPDATER

function update(step) {

	if (Mouse.justClicked()) {

		var total = (gw * gh) - mines;
		var cleared = 0;

		check: for (i = 0; i < gw; i++) {
			for (j = 0; j < gh; j++) {
				if (map[i][j].state === STATE_UNKNOW) {
					break check;
				}

				if (map[i][j].state === STATE_CLEAR) {
					cleared++;
				}
			}
		}

		if (total === cleared) {
			Game.setProp('gamewin', true);
			
			//*
			player = prompt("Congrats ! Please enter your name", player);

			if (player !== null) {
				$.post('scoreboard/mine/post.php', {
					name: player,
					mode: gameMode, 
					time: scoreSprite.secondes, 
					cheated: Game.getProp('cheated')
				}, 
				function(){
					$('#scores')[0].contentDocument.location.reload(true);
				});
			}
			//*/
			
			return true;
		}
	}

	var sp = Game.getSprites();

	if (Game.getProp('exploded') === true && Game.getProp('gameover') === false) {
		//*
		for (i = 0; i < gw; i++) {
			for (j = 0; j < gh; j++) {
				//Game.addSprite(new Square(i, j), i * gw + j);
				if (map[i][j].state === STATE_MINE) {
					map[i][j].state = STATE_EXPLODE;
					map[i][j].sprite.dirty = true;
				}
			}
		}

		Game.setProp('gameover', true);
		//*/
	}
}

//GAME LOGIC

function toggleCheat() {
	Game.setProp('cheated', true);
	Game.setProp('cheat', !Game.getProp('cheat'));
	Game.invalidate();
}

function initMap() {
	map = [];
	
	//Create empty map
	var i, j;

	for (i = 0; i < gw; i++) {
		map[i] = [];
		for (j = 0; j < gh; j++) {
			map[i][j] = {
				mine: false,
				state: STATE_UNKNOW,
				sprite: null
			};
		}
	}

	//Random add mines
	var m = mines;
	var rx, ry;
	var loop = 0;

	while (m > 0) {
		loop++;
		rx = parseInt(Math.random() * gw);
		ry = parseInt(Math.random() * gh);

		if (map[rx][ry].state === STATE_UNKNOW) {
			map[rx][ry].mine = true;
			map[rx][ry].state = STATE_MINE;
			m--;
		}
	}

	//Add sprites
	for (i = 0; i < gw; i++) {
		for (j = 0; j < gh; j++) {
			//console.log((i * gw + j));
			map[i][j].sprite = Game.addSprite(new Square(i, j), ((i+1) * gh + j + 1));
		}
	}

	//End
	//console.log("initMap", loop);
}

function detectMine(x, y) {
	count = 0;

	//console.log(x, y);
	if (map[x][y].mine === true) {
		return 9;
	}


	for (var i = x - 1; i <= x + 1; i++) {
		for (var j = y - 1; j <= y + 1; j++) {
			if (i < 0 || j < 0 || i >= gw || j >= gh || (i == x && j == y)) {
				//continue;
			} else {

				//console.log(i, j);

				if (map[i][j].mine === true) {
					count++;
				}
			}
		}
	}

	return count;
}

function doubleClick(x, y) {
	var detection = detectMine(x, y);
	var count = 0;

	var i,j;
	
	for (i = x - 1; i <= x + 1; i++) {
		for (j = y - 1; j <= y + 1; j++) {
			if (i < 0 || j < 0 || i >= gw || j >= gh || (i == x && j == y)) {
				//continue;
			} else {
				if (map[i][j].state === STATE_FLAG) {
					count++;
				}
			}
		}
	}

	if (count === detection) {
		for (i = x - 1; i <= x + 1; i++) {
			for (j = y - 1; j <= y + 1; j++) {
				if (i < 0 || j < 0 || i >= gw || j >= gh || (i == x && j == y)) {
					//continue;
				} else {
					detection = detectMine(i, j);
					
					if (map[i][j].mine === false) {
						map[i][j].state = STATE_CLEAR;
						map[i][j].sprite.label = detection;
						map[i][j].sprite.dirty = true;
						
						if(detection === 0) {
							clearNeighbors(i, j);
						}
					} else {
						if(map[i][j].state !== STATE_FLAG) {
							map[i][j].state = STATE_EXPLODE;
							map[i][j].sprite.dirty = true;

							Game.setProp('exploded', true);
						}
					}

					if (map[i][j].state === STATE_FLAG) {
						count++;
					}
				}
			}
		}
	}
}

function clearNeighbors(x, y) {
	for (var i = x - 1; i <= x + 1; i++) {
		for (var j = y - 1; j <= y + 1; j++) {
			if (i < 0 || j < 0 || i >= gw || j >= gh || (i == x && j == y)) {
				//continue;
			} else {
				var detection = detectMine(i, j);
				if (map[i][j].state === STATE_UNKNOW) {
					map[i][j].state = STATE_CLEAR;
					map[i][j].sprite.label = detection;
					map[i][j].sprite.dirty = true;

					if (detection === 0) {
						clearNeighbors(i, j);
					}

				}
			}
		}
	}
}