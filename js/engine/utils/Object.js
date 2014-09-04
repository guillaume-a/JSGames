/**
 * JS Inheritance
 * Thx to : http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
 */

if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

if (typeof Object.inherit !== 'function') {
	Object.inherit = function(childObject, parentObject) {
		var copyOfParent = Object.create(parentObject.prototype);
		copyOfParent.constructor = childObject;
		childObject.prototype = copyOfParent;
	};
}
