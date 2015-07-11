


var misc = {


	uniqueID : 0,

	//returns unique id, to ensure that indexOf picks up the right objects when used
	getUniqueId : function () {
		misc.uniqueID++;
		return misc.uniqueID;
	},


	// Random Number Generator
	//  generates random number between two inputted figures (inclusive for both)
	//  returns integers
	//  eg, RNG(1, 3) will return 1, 2 or 3 (So range of 3 really),
	RNG : function (min, max, type) {
		return Math.floor(min + (Math.random() * (max - min + 1)));
	},

	// *Floating* Random Number Generator
	//  generates random number between two inputted figures (inclusive for both)
	//  returns floating number
	//  eg, RNG(1, 3) will return 1.000 to 3.000 (so, range of 2 really)
	fRNG : function (min, max) {
		return min + (Math.random() * (max - min));
	},

	//returns a random roll of an x sided die
	dice : function (sides) {
		return misc.RNG(1, sides);
	},


	// *Weighted* Random Number Generator
	// generates weighted random number based on inputted array
	// Will return a number between 0 and array length, plus offset
	// a 0 in the array will mean that position is never picked.
	// only designed for ints in the array but a non-int will act as if rounded up.
	// example: wRNG([1,0,4],0) - return would be zero 1/5 of the time, one never and two 4/5 of the time
	wRNG : function (inArray, offset) {
		inArray = [].concat(inArray); //converts inArray from ref. to data
		var tempArray = [];

		while (inArray.length > 0) {
			while (inArray[inArray.length - 1] > 0) {
				tempArray.push(inArray.length - 1);
				inArray[inArray.length - 1]--;
			}
			inArray.pop();
		}
		if (typeOf(offset) == 'undefined') {	//makes function work even without offset entered
			offset = 0;
		}
		return tempArray[misc.RNG(0, tempArray.length - 1)];
	},


	//returns a string of 6 lower-case characters (a-z)
	generateRandString : function () {
		var checksumStr = "";
		for (var I1 = 0; I1 < 6; I1++) {
			checksumStr += String.fromCharCode(97 + Math.round(Math.random() * 25));
		}
		return checksumStr;
	}

};









