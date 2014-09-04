var scripts = [
	"js/demo/flappy/sprites/Background.js",
	"js/demo/flappy/sprites/Bird.js",
	"js/demo/flappy/sprites/Wall.js",
	"js/demo/flappy/sprites/Score.js"
];

Game.load(scripts, bootStrap, 'screen', newGame);

//
var bird;
var ghost;
var player = null;
var startFrame = 0;
var raceFrame = 0;
var replay = [];

function newGame() {
	//For seed
	var today = new Date();

	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	
	Math.setSeed(today.valueOf() / 1000);
	
	//
	Game.setProp('replayLoading', false);
	Game.setProp('paused', false);
	//
	
	startFrame = 0;
	endFrame = 0;
	replay = [];
	
	Wall.initialized  = false;
	
	Game.reset();
	Game.invalidate();
}

function bootStrap() {
	//
	Game.addModule(Keyboard);
	Game.addModule(Mouse);
	Game.setUpdater(update);

	//
	Keyboard.setCapturedKeys([KEY_UP, "P", "R", "N"]);

	//
	Game.addSprite(new Background(), 0);

	Game.addSprite(new Wall(), 10);
	Game.addSprite(new Wall(), 12);
	Game.addSprite(new Wall(), 13);
	Game.addSprite(new Wall(), 14);

	bird = new Bird();
	Game.addSprite(bird, 22);
	
	ghost = new Bird();
	ghost.ghost = true;
	Game.addSprite(ghost, 20);

	Game.addSprite(new Score(), 30);
}

function update(step) {
	//do nothing, replay is loading
	if(Game.getProp('replayLoading') === true) {
		return false;
	}
	
	//Gestion de la pause
	if(Keyboard.justPressed("N")) {
		newGame();
	}	
	
	//Gestion de la pause
	if(Keyboard.justPressed("R")) {
		removeReplay();
	}		
	
	if (Game.getProp('gamestarted') === false) {
		if (Mouse.justClicked() || Keyboard.justPressed(KEY_UP)) {
			Game.setProp('gamestarted', true);
			startFrame = Game.currentFrame();
		}
		else {
			return false;
		}
	}
	
	//Gestion de la pause
	if(Keyboard.justPressed("P")) {
		Game.setProp('paused', !Game.getProp('paused'));
		return true;
		
		//console.log(Game.getProp('paused'));
		
	}
	
	if(Game.getProp('paused') === true) {
		if (Mouse.justClicked() || Keyboard.justPressed(KEY_UP)) {
			Game.setProp('paused', false);
			return true;
		}		
		return false;
	}
	
	Wall.biggestX += Wall.globalVelocityX * step;
	raceFrame = Game.currentFrame() - startFrame;
}

function removeReplay() {
	ghost.frames = [];
}

function loadReplay(uid, date) {
	//Pas de chargement pendant la partie
	if (Game.getProp('gamestarted') === true) {
		return;
	}
	
	Game.setProp('replayLoading', true);
	Game.invalidate();
	
	$.post("scoreboard/flappy/replay.php", {uid: uid, date: date}, function(data){
		ghost.frames = JSON.parse(data);
		Game.setProp('replayLoading', false);
		Game.invalidate();
	});
}