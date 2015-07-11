

var display = {
	map : [],		// keeps a record of what's on screen where.
	sizeX : 80,		//screen size. I reccommend against making it larger due to speed.
	sizeY : 24,
	posX : 0,		//where the top left of the screen is over in the dungeon
	posY : 0,
	toUpdateX : [],	//array of squares which need updating.
	toUpdateY : [],
	updateChar : '.',	//temp holding of a screen tile's character
	updateClass : 'w',	//temp holding of a screen tile's class
	rebuildString : '',		// string used for rebuilding entire screen
	tmpUpdatePosX : 0,		// temporary stuff used by
	tmpUpdatePosY : 0,
	screenWidth : 0,

		//builds the HTML for the display based on parameters
	buildHTML : function () {
		var dungeonString = '';
		for (var I1 = 0; I1 <= display.sizeY - 1; I1++) {		// y coordinate
			for (var I2 = 0; I2 <= display.sizeX - 1; I2++) {	// x coordinate
				dungeonString += '<span class=\'w\' id=\'x' + I2 + 'y' + I1 + '\'>.</span>';
			}
			dungeonString += '<br />';
		}
		$('dungeon').innerHTML = dungeonString;
	},

		//shows the dungeon and side-bits which are hidden by default.
	showHTML : function () {
		$('mainGame').style.display = 'block';
	},

		//reloads whichever parts of the board are necessary based on screenToUpdate arrays; will wipe them once coordinates are updated
	updateScreen : function () {
		while (display.toUpdateX.length > 0) {
			display.tmpUpdatePosX = display.toUpdateX.pop();
			display.tmpUpdatePosY = display.toUpdateY.pop();

			display.calculateCoordChars(display.posX + display.tmpUpdatePosX, display.posY + display.tmpUpdatePosY);
			display.updateCoordHTML(display.tmpUpdatePosX, display.tmpUpdatePosY);
		}
	},


	rebuildScreenArray : [],
		// recalculates and redrawsentire screen
	updateWholeScreen : function () {
		if (IE) {//an array/string based solution, fast in IE
			display.rebuildScreenArray = [];
			for (var I1 = 0; I1 <= display.sizeY - 1; I1++) {		// y coordinate
				for (var I2 = 0; I2 <= display.sizeX - 1; I2++) {		// x coordinate
					display.calculateCoordChars(display.posX + I2, display.posY + I1);
					display.map[I2][I1] = [display.updateChar, display.updateClass];
					display.rebuildScreenArray.push('<span class=\'' + display.updateClass +
							'\' id=\'x' + I2 + 'y' + I1 + '\'>' + display.updateChar + '</span>');
				}
				display.rebuildScreenArray.push('<br />');
			}
			$('dungeon').innerHTML = display.rebuildScreenArray.join('');
		}
		else {	//minimally updates each square as needed, fast in FF
			for (var I1 = 0; I1 <= display.sizeY - 1; I1++) {		// y coordinate
				for (var I2 = 0; I2 <= display.sizeX - 1; I2++) {		// x coordinate

					display.calculateCoordChars(display.posX + I2, display.posY + I1);

					if (display.updateChar != display.map[I2][I1][0]) {
						$('x' + I2 + 'y' + I1).textContent = display.updateChar;
					}
					if (display.updateClass != display.map[I2][I1][1]) {
						$('x' + I2 + 'y' + I1).className = display.updateClass;
					}
					display.map[I2][I1] = [display.updateChar, display.updateClass];
				}
			}
		}
	},



	// the main function called by something else (eg move()) to get part of a screen updated
	// checks if inputted *dungeon* coords are on-screen, if yes, add them to screenToUpdate arrays as *screen* coords
	addCoordUpdate : function (x, y) {
		if (display.checkIfDungeonCoordOnScreen(x, y) === true) {
			display.toUpdateX.push((0 - display.posX) + x);		//adding to 'to be updated' array
			display.toUpdateY.push((0 - display.posY) + y);
		}
	},

	// will work out the correct class and character for any given **dungeon** coordinate.
	//Returns char, also puts in display.updateChar, puts class in display.updateClass
	calculateCoordChars : function (x, y) {
		if (dungeon.map[x] && dungeon.map[x][y]) {	//if the dungeon.map exists there

			if (player.posX == x && player.posY == y) {	//player
				display.updateChar = '@';
				display.updateClass = 'w';
			}
			else if (typeof dungeon.map[x][y].monster != 'undefined') {	//any monsters
				display.updateChar = dungeon.map[x][y].monster.symbol;
				display.updateClass = dungeon.map[x][y].monster.colour;
			}
			else {	//otherwise, floor.
				display.updateChar = lib.terrain[dungeon.map[x][y].floor].chr;
				display.updateClass = lib.terrain[dungeon.map[x][y].floor].cls;
			}
		}
		else {
			display.updateChar = lib.terrain[1].chr;  // show permanent rock if there's no dungeon.map there! Important for large screens or v small levels
			display.updateClass = lib.terrain[1].cls;
		}
		return display.updateChar;
	},

	updateCoordHTML : function (x, y) {		//will update the HTML and display.map of the given **screen** coordinates
		if (IE) {
			$('x' + x + 'y' + y).innerText = display.updateChar;
		}
		else {
			$('x' + x + 'y' + y).textContent = display.updateChar;
		}
		$('x' + x + 'y' + y).className = display.updateClass;
		display.map[x][y] = [display.updateChar, display.updateClass];
	},




	//checks whether a dungeon coordinate is on screen; returns boolean
	checkIfDungeonCoordOnScreen : function (x, y) {
		if (x >= display.posX && x < display.posX + display.sizeX && y >= display.posY && y < display.posY + display.sizeY) {
			return true;
		}
		else {
			return false;
		}
	},

	//will re-centre the screen on given *dungeon* coordinate, trying to keep within the dungeon bounds
	recentreScreen : function (x, y) {
		display.posX = x - display.sizeX.half();
		if (display.posX < 0) {
			display.posX = 0;
		}
		else if (display.posX + display.sizeX > dungeon.sizeX) {
			display.posX = dungeon.sizeX - display.sizeX;
		}
		display.posY = y - display.sizeY.half();
		if (display.posY < 0) {
			display.posY = 0;
		}
		else if (display.posY + display.sizeY > dungeon.sizeY) {
			display.posY = dungeon.sizeY - display.sizeY;
		}
	},

	//checks the position of the player - if it's too near to the display edge, *AND* can move towards that edge, will recentre screen
	proxCheckLimit : 3, //will move screen when you get this number from edge
	checkPlayerEdgeProximity : function () {
		if (((player.posX < (display.posX + display.proxCheckLimit)) && display.posX > 0) ||
					((player.posX >= (display.posX + display.sizeX - display.proxCheckLimit)) &&
					(display.posX + display.sizeX < dungeon.sizeX)) ||
					((player.posY < (display.posY + display.proxCheckLimit)) && (display.posY > 0)) ||
					((player.posY >= (display.posY + display.sizeY - display.proxCheckLimit)) &&
					((display.posY + display.sizeY) < dungeon.sizeY))) {
			//if (player.posX < display.posX+display.proxCheckLimit && display.posX > 0)
			display.recentreScreen(player.posX, player.posY);
			display.updateWholeScreen();
		}
	},


	consoleLinesLimit : 5,
	consoleArray : [],
	// will update console. Hold max of 5 messages ATM
	updateConsole : function (inText) {
		if (display.consoleArray.length >= display.consoleLinesLimit) {		//limit console lines
			display.consoleArray.shift();
		}
		display.consoleArray.push(turn.gameTurns + ': ' + inText + '<br />');
		$('console').innerHTML = display.consoleArray.join('');
	},


	updateStats : function () {
		$('nowHP').innerHTML = player.HP;
		$('maxHP').innerHTML = player.maxHP;
		$('nowXP').innerHTML = player.XP;
		$('playerLevel').innerHTML = player.level;
	},

	updateWindowWidth : function () {
		if (typeof window.innerWidth != 'undefined') {		 // Non-IE
			display.screenWidth = window.innerWidth;
			return window.innerWidth;
		}
		else {		 //IE
			display.screenWidth = document.documentElement.clientWidth;
			return document.documentElement.clientWidth;
		}
	},


	//creates the array display.map to remember what's meant to be currently displayed. Much quicker to
	//access than actually checking the HTML
	initiate : function () {
		for (var I1 = 0; I1 <= display.sizeX - 1; I1++) {
			display.map[I1] = [];

			for (var I2 = 0; I2 <= display.sizeY - 1; I2++) {
				display.map[I1][I2] = ['.', 'w']; // text, class
			}
		}
	}

};

display.initiate();
display.updateWindowWidth();




//******************
// Whole screen update functions:
// I have 4 here because I am not sure which will be fastest when things are more developed
// the timing to be called twice on a ##x## screen is noted by the functions (ff 20x15, ff 80*24)
// 1 checks the class/char of each new cell against screenArray, only updates if needed (46)(unusably slow in IE7)
// 2 rebuilds HTML into array, joins and is put into 'dungeon' (58)(usable in IE7, too slow for FF)
// 3 rebuilds square by square (156)
// 4 rebuilds HTML with a string, no array (78)

// The plain function does 1 or 2 depending upon browser.
//******************

/*
//should recalculate and redraw entire screen  (46)(108)(crap in FF, good in IE)
function redrawWholeDisplay1()
{
	for (var I1 = 0; I1 <= display.sizeY-1; I1++) // y coordinate
	{
		for (var I2 = 0; I2 <= display.sizeX-1; I2++) // x coordinate
		{
			display.calculateCoordChars(display.posX+I2,display.posY+I1);

			if (display.updateChar != display.map[I2][I1][0])
			{
				$('x'+I2+'y'+I1).textContent = display.updateChar;
			}
			if (display.updateClass != display.map[I2][I1][1])
			{
				$('x'+I2+'y'+I1).className = display.updateClass;
			}
			display.map[I2][I1] = [display.updateChar,display.updateClass];
		}
	}
}

//should recalculate and redraw entire screen  (58)(780)(crap in FF, good in IE)
function redrawWholeDisplay2()
{
	display.rebuildScreenArray = [];
	for (var I1 = 0; I1 <= display.sizeY-1; I1++) // y coordinate
	{
		for (var I2 = 0; I2 <= display.sizeX-1; I2++) // x coordinate
		{
			display.calculateCoordChars(display.posX+I2,display.posY+I1);
			display.map[I2][I1] = [display.updateChar,display.updateClass];
			display.rebuildScreenArray.push('<span class=\''+display.updateClass+'\' id=\'x'+I2+'y'+I1+'\'>'+display.updateChar+'</span>');
		}
		display.rebuildScreenArray.push('<br />');
	}
	$('dungeon').innerHTML = display.rebuildScreenArray.join('');
}

//should recalculate and redraw entire screen (156)(718) (crap in both!)
function redrawWholeDisplay3()
{
	for (var I1 = 0; I1 <= display.sizeY-1; I1++) // y coordinate
	{
		for (var I2 = 0; I2 <= display.sizeX-1; I2++) // x coordinate
		{
			display.calculateCoordChars(display.posX+I2,display.posY+I1);
			display.updateCoordHTML(display.posX+I2,display.posY+I1);
		}
	}
}

//should recalculate and redraw entire screen  (78)(420) (crap in both)
function redrawWholeDisplay4()
{
	display.rebuildString = '';
	for (var I1 = 0; I1 <= display.sizeY-1; I1++) // y coordinate
	{
		for (var I2 = 0; I2 <= display.sizeX-1; I2++) // x coordinate
		{
			display.calculateCoordChars(display.posX+I2,display.posY+I1);
			display.map[I2][I1] = [display.updateChar,display.updateClass];
			display.rebuildString += '<span class=\''+display.updateClass+'\' id=\'x'+I2+'y'+I1+'\'>'+display.updateChar+'</span>';
		}
		display.rebuildString += '<br />';
	}
	$('dungeon').innerHTML = display.rebuildString;
}
*/





