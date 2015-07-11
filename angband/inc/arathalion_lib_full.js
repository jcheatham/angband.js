
// Arathalion's library of important generic stuff
// copyright (c) 2008-9 to Arathalion
// This file contains things which I see as important but non-application-specific


//quick document.getElementById reference.
function $(inId) {
	return document.getElementById(inId);
}

// returns rounded half of any number
Number.prototype.half = function () {
	return Math.round(this / 2);
};

// IE check. Very crude - should refine at some point.
if (document.all) {
	var IE = true; //stupid browser with its stupid incompatibilities and inefficiencies ¬_¬
}

// creates indexOf as an array prototype for browsers without it (ie, pre- Javascript 1.6 browsers)
var testArray = [0];
if (!testArray.indexOf) {
	Array.prototype.indexOf = function (targetElement, startIndex) {
		if (typeof startIndex == 'undefined') {
			startIndex = 0;
		}
		for (var I1 = startIndex; I1 <= this.length - 1; I1++) {
			if (this[I1] == targetElement) {
				return I1;
			}
		}
		return -1;
	};
}
testArray = undefined;
