var Loader = (function() {

	var count = 0;
	var _callback = null;
	
	function loadHandler(e) {
		count--;

		//console.log("scripts restant", count);

		if (count === 0 && typeof(_callback) == "function") {
			//console.log("bim callback");

			_callback();
		}
	}

	return {
		require: function(scripts, callback) {
			_callback = callback;
			
			count = scripts.length;

			var htmlHead = document.getElementsByTagName('head')[0];

			//console.log("scripts à charger", count);

			scripts.forEach(function(script) {
				var htmlScript = document.createElement('script');

				htmlScript.setAttribute('language', 'javascript');
				htmlScript.setAttribute('type', 'text/javascript');
				htmlScript.setAttribute('src', script);
				htmlScript.onload = loadHandler;

				htmlHead.appendChild(htmlScript);
			});
		}
	};
})();